import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BusinessBadge,
  BusinessErrorState,
  BusinessLifecycleTable,
  BusinessLoadingState,
  BusinessPageShell,
  BusinessPanel,
  BusinessRiskBadge,
  BusinessStatusBadge,
  BusinessSummaryCards
} from '../components/BusinessUi';
import { useBusinessIntakeRuntime } from '../hooks/useBusinessData';
import { businessRuntimeClient } from '../services/businessRuntimeClient';

const draftTypes = [
  { id: 'GENERAL', path: '/business/intake/new', label: 'General Request', title: 'General Business Request Draft' },
  { id: 'DAO_PLUGIN', path: '/business/intake/dao-plugin', label: 'DAO Plugin', title: 'DAO Plugin Request Draft' },
  { id: 'ACS_SERVICE', path: '/business/intake/acs-service', label: 'ACS Service', title: 'ACS Service Request Draft' },
  { id: 'TREASURY_SPONSORSHIP', path: '/business/intake/treasury-sponsorship', label: 'Treasury Sponsorship', title: 'Treasury Sponsorship Request Draft' },
  { id: 'DEBENTURE_FUNDING', path: '/business/intake/debenture-funding', label: 'Debenture Funding', title: 'Debenture Funding Request Draft' },
  { id: 'ECOSYSTEM_INFRASTRUCTURE', path: '/business/intake', label: 'Ecosystem Infra', title: 'Ecosystem Infrastructure Request Draft' },
  { id: 'PRIVATE_DEVELOPMENT', path: '/business/intake', label: 'Private Dev', title: 'Private Development Request Draft' }
];

const draftTypeByPath = {
  '/business/intake/new': 'GENERAL',
  '/business/intake/dao-plugin': 'DAO_PLUGIN',
  '/business/intake/acs-service': 'ACS_SERVICE',
  '/business/intake/treasury-sponsorship': 'TREASURY_SPONSORSHIP',
  '/business/intake/debenture-funding': 'DEBENTURE_FUNDING',
  '/business/intake/preview': 'GENERAL'
};

const draftTitleByType = Object.fromEntries(draftTypes.map((type) => [type.id, type.title]));

const requestTypeByDraft = {
  GENERAL: 'ENTERPRISE_DEVELOPMENT',
  DAO_PLUGIN: 'DAO_INFRASTRUCTURE',
  ACS_SERVICE: 'ENTERPRISE_DEVELOPMENT',
  TREASURY_SPONSORSHIP: 'ECOSYSTEM_INFRASTRUCTURE',
  DEBENTURE_FUNDING: 'INTERNAL_AXODUS_PRODUCT',
  ECOSYSTEM_INFRASTRUCTURE: 'ECOSYSTEM_INFRASTRUCTURE',
  PRIVATE_DEVELOPMENT: 'ENTERPRISE_DEVELOPMENT'
};

const defaultDraftFor = (draftType, runtime) => ({
  draftType,
  title: draftType === 'GENERAL' ? 'Business runtime expansion request' : '',
  description: '',
  requesterIdentity: draftType === 'DAO_PLUGIN' ? 'id-harmony-dao' : draftType === 'ACS_SERVICE' ? 'id-enterprise-sample' : 'id-axodus-core',
  requesterType: draftType === 'DAO_PLUGIN' ? 'DAO' : draftType === 'ACS_SERVICE' ? 'ENTERPRISE' : 'REQUESTER',
  requestCategory: requestTypeByDraft[draftType],
  ecosystemImpact: '',
  fundingModel: draftType === 'DEBENTURE_FUNDING' ? 'DEBENTURE' : draftType === 'TREASURY_SPONSORSHIP' ? 'TREASURY' : 'HYBRID',
  estimatedBudget: '',
  maintenanceNeeds: '',
  acsRequired: draftType === 'ACS_SERVICE',
  governanceRequired: ['DAO_PLUGIN', 'TREASURY_SPONSORSHIP', 'DEBENTURE_FUNDING'].includes(draftType),
  treasuryExposureExpected: ['TREASURY_SPONSORSHIP', 'DEBENTURE_FUNDING'].includes(draftType),
  telemetryRequirements: 'Runtime events, lifecycle telemetry and security validator visibility.',
  daoIdentity: 'id-harmony-dao',
  daoName: 'Harmony DAO',
  chainNetwork: 'Harmony',
  pluginType: 'GOVERNANCE',
  pluginPurpose: 'Voting plugin preparation with governance review only.',
  governanceScope: 'Proposal lifecycle and voting model compatibility.',
  votingModelAffected: draftType === 'DAO_PLUGIN' ? 'HIP / RP voting' : '',
  treasuryInteractionExpected: false,
  federationLevel: 'LEVEL_3_FEDERATED_DAO',
  maintenanceOwner: 'id-axodus-core',
  fundingSource: 'DAO treasury review',
  acsRuntimeType: 'DEDICATED_BUSINESS_RUNTIME',
  isolationProfile: 'TENANT_ISOLATED',
  memoryScope: 'PROJECT_SCOPED_MEMORY',
  permissionProfile: 'READ_ONLY_ANALYSIS',
  computeProfile: 'STANDARD_REVIEW_RUNTIME',
  humanReviewRequirement: true,
  workflowObjective: 'Classify request, summarize requirements and prepare human review.',
  operatingScope: draftType === 'ACS_SERVICE' ? 'ENTERPRISE' : 'DAO',
  projectTitle: '',
  projectCategory: requestTypeByDraft[draftType],
  strategicJustification: '',
  requestedAmount: '',
  currency: 'USD',
  riskTier: runtime?.options?.riskTiers?.[1] || 'TIER_2_ECOSYSTEM_STRATEGIC',
  expectedReturn: 'Operational visibility only; no yield promise.',
  repaymentModel: 'Revenue-backed review draft',
  revenueModel: 'Infrastructure service revenue',
  governanceReference: 'mock://governance/reference/preparatory',
  milestoneFundingPreference: 'Milestone review before allocation.',
  debentureType: 'CONVERTIBLE',
  convertible: true,
  targetAmount: '',
  aprModel: 'FIXED_MODEL_DRAFT_ONLY',
  maturityEstimate: '24 months',
  repaymentSource: 'Operational revenue forecast',
  fundingPurpose: 'Runtime and infrastructure development',
  treasuryExposureExpectation: 'Exposure visible for review only.'
});

function Field({ label, name, value, onChange, type = 'text', placeholder }) {
  return (
    <label className="block">
      <span className="text-[11px] font-bold uppercase tracking-widest text-outline">{label}</span>
      <input
        className="mt-2 w-full rounded-lg border border-white/10 bg-surface-container px-3 py-2 text-sm text-on-surface outline-none focus:border-primary"
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value ?? ''}
      />
    </label>
  );
}

function TextareaField({ label, name, value, onChange }) {
  return (
    <label className="block md:col-span-2">
      <span className="text-[11px] font-bold uppercase tracking-widest text-outline">{label}</span>
      <textarea
        className="mt-2 min-h-24 w-full rounded-lg border border-white/10 bg-surface-container px-3 py-2 text-sm text-on-surface outline-none focus:border-primary"
        name={name}
        onChange={onChange}
        value={value ?? ''}
      />
    </label>
  );
}

function SelectField({ label, name, value, onChange, options = [] }) {
  return (
    <label className="block">
      <span className="text-[11px] font-bold uppercase tracking-widest text-outline">{label}</span>
      <select
        className="mt-2 w-full rounded-lg border border-white/10 bg-surface-container px-3 py-2 text-sm text-on-surface outline-none focus:border-primary"
        name={name}
        onChange={onChange}
        value={value ?? ''}
      >
        {options.map((option) => <option key={option.value || option} value={option.value || option}>{option.label || option}</option>)}
      </select>
    </label>
  );
}

function ToggleField({ label, name, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-surface-container px-3 py-3">
      <span className="text-sm font-semibold text-on-surface">{label}</span>
      <input checked={Boolean(checked)} name={name} onChange={onChange} type="checkbox" />
    </label>
  );
}

function DraftFormFields({ draft, runtime, onChange }) {
  const identityOptions = runtime.identities.map((identity) => ({ label: `${identity.displayName} / ${identity.identityType}`, value: identity.id }));
  const commonFields = (
    <>
      <Field label="Request title" name="title" onChange={onChange} value={draft.title} />
      <SelectField label="Requester identity" name="requesterIdentity" onChange={onChange} options={identityOptions} value={draft.requesterIdentity} />
      <SelectField label="Request category" name="requestCategory" onChange={onChange} options={runtime.options.requestTypes} value={draft.requestCategory} />
      <SelectField label="Preferred funding model" name="fundingModel" onChange={onChange} options={runtime.options.fundingTypes} value={draft.fundingModel} />
      <Field label="Estimated budget" name="estimatedBudget" onChange={onChange} placeholder="0" type="number" value={draft.estimatedBudget} />
      <Field label="Expected maintenance needs" name="maintenanceNeeds" onChange={onChange} value={draft.maintenanceNeeds} />
      <TextareaField label="Request description" name="description" onChange={onChange} value={draft.description} />
      <TextareaField label="Expected ecosystem impact" name="ecosystemImpact" onChange={onChange} value={draft.ecosystemImpact} />
      <ToggleField checked={draft.acsRequired} label="ACS required" name="acsRequired" onChange={onChange} />
      <ToggleField checked={draft.governanceRequired} label="Governance required" name="governanceRequired" onChange={onChange} />
      <ToggleField checked={draft.treasuryExposureExpected} label="Treasury exposure expected" name="treasuryExposureExpected" onChange={onChange} />
      <Field label="Telemetry requirements" name="telemetryRequirements" onChange={onChange} value={draft.telemetryRequirements} />
    </>
  );

  if (draft.draftType === 'DAO_PLUGIN') {
    return (
      <>
        <SelectField label="DAO identity" name="daoIdentity" onChange={onChange} options={identityOptions} value={draft.daoIdentity} />
        <Field label="DAO name" name="daoName" onChange={onChange} value={draft.daoName} />
        <Field label="Chain / network" name="chainNetwork" onChange={onChange} value={draft.chainNetwork} />
        <SelectField label="Plugin type" name="pluginType" onChange={onChange} options={runtime.options.pluginTypes} value={draft.pluginType} />
        <TextareaField label="Plugin purpose" name="pluginPurpose" onChange={onChange} value={draft.pluginPurpose} />
        <Field label="Governance scope" name="governanceScope" onChange={onChange} value={draft.governanceScope} />
        <Field label="Voting model affected" name="votingModelAffected" onChange={onChange} value={draft.votingModelAffected} />
        <ToggleField checked={draft.treasuryInteractionExpected} label="Treasury interaction expected" name="treasuryInteractionExpected" onChange={onChange} />
        <Field label="Federation level" name="federationLevel" onChange={onChange} value={draft.federationLevel} />
        <Field label="Maintenance owner" name="maintenanceOwner" onChange={onChange} value={draft.maintenanceOwner} />
        <Field label="Funding source" name="fundingSource" onChange={onChange} value={draft.fundingSource} />
      </>
    );
  }

  if (draft.draftType === 'ACS_SERVICE') {
    return (
      <>
        <SelectField label="Requester identity" name="requesterIdentity" onChange={onChange} options={identityOptions} value={draft.requesterIdentity} />
        <Field label="ACS runtime type" name="acsRuntimeType" onChange={onChange} value={draft.acsRuntimeType} />
        <Field label="Isolation profile" name="isolationProfile" onChange={onChange} value={draft.isolationProfile} />
        <Field label="Memory scope" name="memoryScope" onChange={onChange} value={draft.memoryScope} />
        <Field label="Permission profile" name="permissionProfile" onChange={onChange} value={draft.permissionProfile} />
        <Field label="Compute profile" name="computeProfile" onChange={onChange} value={draft.computeProfile} />
        <ToggleField checked={draft.humanReviewRequirement} label="Human review requirement" name="humanReviewRequirement" onChange={onChange} />
        <Field label="Enterprise or DAO scope" name="operatingScope" onChange={onChange} value={draft.operatingScope} />
        <TextareaField label="Workflow objective" name="workflowObjective" onChange={onChange} value={draft.workflowObjective} />
        <Field label="Telemetry requirements" name="telemetryRequirements" onChange={onChange} value={draft.telemetryRequirements} />
      </>
    );
  }

  if (draft.draftType === 'TREASURY_SPONSORSHIP') {
    return (
      <>
        <Field label="Project title" name="projectTitle" onChange={onChange} value={draft.projectTitle} />
        <SelectField label="Project category" name="projectCategory" onChange={onChange} options={runtime.options.requestTypes} value={draft.projectCategory} />
        <TextareaField label="Strategic justification" name="strategicJustification" onChange={onChange} value={draft.strategicJustification} />
        <Field label="Requested amount" name="requestedAmount" onChange={onChange} type="number" value={draft.requestedAmount} />
        <Field label="Currency" name="currency" onChange={onChange} value={draft.currency} />
        <SelectField label="Risk tier" name="riskTier" onChange={onChange} options={runtime.options.riskTiers} value={draft.riskTier} />
        <Field label="Expected return" name="expectedReturn" onChange={onChange} value={draft.expectedReturn} />
        <Field label="Repayment model" name="repaymentModel" onChange={onChange} value={draft.repaymentModel} />
        <Field label="Revenue model" name="revenueModel" onChange={onChange} value={draft.revenueModel} />
        <Field label="Governance reference" name="governanceReference" onChange={onChange} value={draft.governanceReference} />
        <Field label="Milestone funding preference" name="milestoneFundingPreference" onChange={onChange} value={draft.milestoneFundingPreference} />
      </>
    );
  }

  if (draft.draftType === 'DEBENTURE_FUNDING') {
    return (
      <>
        <Field label="Project title" name="projectTitle" onChange={onChange} value={draft.projectTitle} />
        <SelectField label="Debenture type" name="debentureType" onChange={onChange} options={runtime.options.debentureTypes} value={draft.debentureType} />
        <ToggleField checked={draft.convertible} label="Convertible flag" name="convertible" onChange={onChange} />
        <Field label="Target amount" name="targetAmount" onChange={onChange} type="number" value={draft.targetAmount} />
        <Field label="Currency" name="currency" onChange={onChange} value={draft.currency} />
        <Field label="APR model" name="aprModel" onChange={onChange} value={draft.aprModel} />
        <Field label="Maturity estimate" name="maturityEstimate" onChange={onChange} value={draft.maturityEstimate} />
        <Field label="Repayment source" name="repaymentSource" onChange={onChange} value={draft.repaymentSource} />
        <TextareaField label="Funding purpose" name="fundingPurpose" onChange={onChange} value={draft.fundingPurpose} />
        <SelectField label="Risk tier" name="riskTier" onChange={onChange} options={runtime.options.riskTiers} value={draft.riskTier} />
        <ToggleField checked={draft.governanceRequired} label="Governance requirement" name="governanceRequired" onChange={onChange} />
        <Field label="Treasury exposure expectation" name="treasuryExposureExpectation" onChange={onChange} value={draft.treasuryExposureExpectation} />
      </>
    );
  }

  return commonFields;
}

function validateDraft(draft) {
  const requiredByType = {
    GENERAL: ['title', 'description', 'requesterIdentity', 'requestCategory', 'fundingModel'],
    DAO_PLUGIN: ['daoIdentity', 'daoName', 'chainNetwork', 'pluginType', 'pluginPurpose', 'governanceScope', 'maintenanceOwner', 'fundingSource'],
    ACS_SERVICE: ['requesterIdentity', 'acsRuntimeType', 'isolationProfile', 'memoryScope', 'permissionProfile', 'computeProfile', 'workflowObjective'],
    TREASURY_SPONSORSHIP: ['projectTitle', 'strategicJustification', 'requestedAmount', 'currency', 'riskTier', 'revenueModel', 'governanceReference'],
    DEBENTURE_FUNDING: ['projectTitle', 'debentureType', 'targetAmount', 'currency', 'aprModel', 'maturityEstimate', 'repaymentSource', 'fundingPurpose', 'riskTier'],
    ECOSYSTEM_INFRASTRUCTURE: ['title', 'description', 'requestCategory', 'ecosystemImpact'],
    PRIVATE_DEVELOPMENT: ['title', 'description', 'requesterIdentity', 'fundingModel']
  };

  const missingFields = requiredByType[draft.draftType].filter((field) => !String(draft[field] ?? '').trim());
  const amount = Number(draft.requestedAmount || draft.targetAmount || draft.estimatedBudget || 0);
  const warnings = [
    ...missingFields.map((field) => `Missing required field: ${field}.`),
    amount < 0 ? 'Financial amount cannot be negative.' : null,
    draft.draftType === 'DEBENTURE_FUNDING' ? 'Debenture draft is preparatory only; issuance, purchase, conversion and repayment are unavailable.' : null,
    draft.draftType === 'TREASURY_SPONSORSHIP' ? 'Treasury sponsorship preview cannot move or allocate funds.' : null,
    draft.draftType === 'ACS_SERVICE' ? 'ACS request preview cannot provision MCP, deploy agents or cross tenant boundaries.' : null,
    draft.draftType === 'DAO_PLUGIN' ? 'DAO plugin request preview cannot deploy plugin code or create governance proposals.' : null
  ].filter(Boolean);

  return { missingFields, warnings, valid: missingFields.length === 0 && amount >= 0 };
}

function estimateRiskTier(draft, runtime) {
  if (draft.riskTier) return draft.riskTier;
  const amount = Number(draft.requestedAmount || draft.targetAmount || draft.estimatedBudget || 0);
  if (draft.draftType === 'ACS_SERVICE') return runtime.options.riskTiers[0];
  if (amount >= 500000) return runtime.options.riskTiers[1];
  if (draft.draftType === 'DAO_PLUGIN') return runtime.options.riskTiers[2];
  return runtime.options.riskTiers[3];
}

function DraftPreview({ draft, runtime, prepared }) {
  const review = businessRuntimeClient.getDraftRuntimeReview(draft);
  const validation = validateDraft(draft);
  const riskTier = estimateRiskTier(draft, runtime);
  const policyRows = [review.executionPolicy];

  return (
    <div className="space-y-6" data-testid="business-draft-preview">
      <BusinessSummaryCards cards={[
        { id: 'draft-type', label: 'Draft Type', value: draft.draftType.replaceAll('_', ' '), detail: 'Local preparation state only.', status: 'INFO' },
        { id: 'draft-valid', label: 'Validation', value: validation.valid ? 'READY' : 'REVIEW', detail: `${validation.missingFields.length} missing fields detected.`, status: validation.valid ? 'APPROVED' : 'WARNING' },
        { id: 'draft-mode', label: 'Execution Mode', value: review.executionPolicy.mode, detail: review.executionPolicy.reason, status: 'NOTICE' },
        { id: 'draft-prepared', label: 'Local Draft', value: prepared ? 'PREPARED' : 'PREVIEW', detail: 'No backend mutation, wallet signing or contract call.', status: 'INFO' }
      ]} />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <BusinessPanel title="Draft Summary" description="Preview is generated in the browser from runtime contracts and local fields.">
          <dl className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-surface-container p-3"><dt className="text-outline">Inferred request type</dt><dd className="mt-1 font-bold text-on-surface">{draft.requestCategory}</dd></div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-3"><dt className="text-outline">Estimated risk tier</dt><dd className="mt-1"><BusinessRiskBadge riskTier={riskTier} /></dd></div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-3"><dt className="text-outline">Governance requirement</dt><dd className="mt-1 font-bold text-on-surface">{String(review.executionPolicy.governanceRequired || draft.governanceRequired)}</dd></div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-3"><dt className="text-outline">Treasury requirement</dt><dd className="mt-1 font-bold text-on-surface">{String(review.executionPolicy.treasuryApprovalRequired || draft.treasuryExposureExpected)}</dd></div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-3"><dt className="text-outline">ACS requirement</dt><dd className="mt-1 font-bold text-on-surface">{String(draft.acsRequired || draft.draftType === 'ACS_SERVICE')}</dd></div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-3"><dt className="text-outline">Telemetry profile</dt><dd className="mt-1 font-bold text-on-surface">{draft.telemetryRequirements || 'Runtime telemetry required'}</dd></div>
          </dl>
        </BusinessPanel>

        <BusinessPanel title="Validation Warnings" description="Warnings are local guidance and do not block experimentation.">
          <div className="space-y-3">
            {validation.warnings.map((warning) => (
              <div key={warning} className="rounded-lg border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-sm font-semibold text-amber-100">{warning}</div>
            ))}
            {!validation.warnings.length ? <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-sm font-semibold text-emerald-100">Draft structure is complete for preview.</div> : null}
          </div>
        </BusinessPanel>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <BusinessPanel title="Capability And Permission Review">
          <div className="mb-4 flex flex-wrap gap-2">
            {review.requiredCapabilities.map((capability) => <BusinessBadge key={capability}>{capability}</BusinessBadge>)}
          </div>
          <div className="rounded-lg border border-white/10 bg-surface-container p-4 text-sm">
            <p className="font-bold text-on-surface">{review.permissionDecision.mode} / {String(review.permissionDecision.allowed)}</p>
            <p className="mt-2 text-outline">{review.permissionDecision.reason}</p>
          </div>
        </BusinessPanel>

        <BusinessPanel title="Execution Policy">
          <BusinessLifecycleTable rows={policyRows} columns={[
            { key: 'action', label: 'Action' },
            { key: 'mode', label: 'Mode', render: (row) => <BusinessStatusBadge status={row.mode} /> },
            { key: 'executable', label: 'Executable', render: (row) => <span className="text-outline">{String(row.executable)}</span> },
            { key: 'reason', label: 'Reason' }
          ]} />
        </BusinessPanel>
      </section>

      <BusinessPanel title="Non-Execution Notice" description="Sprint 10 prepares intake structure only.">
        <p className="text-sm leading-6 text-outline">
          This draft cannot create governance proposals, move treasury, issue debentures, accept funding, distribute revenue, provision ACS/MCP, execute billing, require wallet signing or call contracts.
        </p>
      </BusinessPanel>
    </div>
  );
}

export function BusinessIntakePage() {
  const location = useLocation();
  const intakeRuntime = useBusinessIntakeRuntime();
  const initialDraftType = draftTypeByPath[location.pathname] || 'ECOSYSTEM_INFRASTRUCTURE';
  const [selectedDraftType, setSelectedDraftType] = useState(initialDraftType);
  const runtime = intakeRuntime.data;
  const [draft, setDraft] = useState(() => defaultDraftFor(initialDraftType));
  const [prepared, setPrepared] = useState(false);

  const activeDraft = useMemo(() => draftTypes.find((type) => type.id === selectedDraftType) || draftTypes[0], [selectedDraftType]);

  if (intakeRuntime.isLoading) return <BusinessLoadingState />;
  if (intakeRuntime.isError) return <BusinessErrorState message="Business intake runtime unavailable." />;

  const onDraftTypeChange = (draftType) => {
    setSelectedDraftType(draftType);
    setDraft(defaultDraftFor(draftType, runtime));
    setPrepared(false);
  };

  const onFieldChange = (event) => {
    const { checked, name, type, value } = event.target;
    setDraft((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    setPrepared(false);
  };

  const prepareDraft = () => setPrepared(true);

  return (
    <BusinessPageShell
      title="Business Intake"
      description="Prepare local Business request drafts and preview governance, treasury, ACS, capability, permission and execution-policy requirements without submitting or mutating anything."
      actions={<Link className="rounded-lg border border-white/10 bg-surface-container px-4 py-2 text-sm font-bold text-on-surface hover:border-primary" to="/business/intake/preview">Preview Request</Link>}
    >
      <BusinessSummaryCards cards={[
        { id: 'intake-mode', label: 'Intake Mode', value: 'LOCAL', detail: 'Draft state lives in React only for this sprint.', status: 'INFO' },
        { id: 'intake-policy', label: 'Execution', value: 'DISABLED', detail: 'Runtime policies remain non-executable.', status: 'APPROVED' },
        { id: 'intake-routes', label: 'Route Contracts', value: runtime.routeCatalog.length, detail: 'Future API metadata is visible for review.', status: 'NOTICE' },
        { id: 'intake-validators', label: 'Validators', value: runtime.safety.valid ? 'PASS' : 'REVIEW', detail: 'Business runtime validator status.', status: runtime.safety.valid ? 'APPROVED' : 'WARNING' }
      ]} />

      <BusinessPanel title="Draft Type" description="Choose a preparatory intake model. No option creates a real request.">
        <div className="flex flex-wrap gap-2">
          {draftTypes.map((type) => (
            <button
              className={`rounded-lg border px-3 py-2 text-sm font-bold ${selectedDraftType === type.id ? 'border-primary bg-primary/15 text-on-surface' : 'border-white/10 bg-surface-container text-outline'}`}
              key={type.id}
              onClick={() => onDraftTypeChange(type.id)}
              type="button"
            >
              {type.label}
            </button>
          ))}
        </div>
      </BusinessPanel>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.8fr)]">
        <BusinessPanel title={draftTitleByType[selectedDraftType] || activeDraft.title} description="Fields are structural and local. Use preview to inspect requirements before future backend integration.">
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
            <DraftFormFields draft={draft} onChange={onFieldChange} runtime={runtime} />
            <div className="flex flex-wrap gap-3 md:col-span-2">
              <button className="rounded-lg border border-primary bg-primary/15 px-4 py-2 text-sm font-bold text-on-surface" onClick={prepareDraft} type="button">Prepare Draft</button>
              <button className="rounded-lg border border-white/10 bg-surface-container px-4 py-2 text-sm font-bold text-on-surface" onClick={prepareDraft} type="button">Validate Structure</button>
              <span className="self-center text-xs font-semibold text-outline">Simulation Only / Mock / Read-only</span>
            </div>
          </form>
        </BusinessPanel>

        <div className="space-y-6">
          <DraftPreview draft={draft} prepared={prepared || location.pathname.endsWith('/preview')} runtime={runtime} />
        </div>
      </section>
    </BusinessPageShell>
  );
}
