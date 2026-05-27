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

const draftTypeByPath = {
  '/business/intake': 'ECOSYSTEM_INFRASTRUCTURE_REQUEST',
  '/business/intake/new': 'GENERAL_BUSINESS_REQUEST',
  '/business/intake/dao-plugin': 'DAO_PLUGIN_REQUEST',
  '/business/intake/acs-service': 'ACS_SERVICE_REQUEST',
  '/business/intake/treasury-sponsorship': 'TREASURY_SPONSORSHIP_REQUEST',
  '/business/intake/debenture-funding': 'DEBENTURE_FUNDING_REQUEST',
  '/business/intake/preview': 'GENERAL_BUSINESS_REQUEST'
};

const draftLabel = (draftType) => draftType.replaceAll('_', ' ').replace(' REQUEST', '');

function createDraft(draftType) {
  return businessRuntimeClient.createDraftTemplate(draftType);
}

function fieldValue(draft, name) {
  return draft.values[name] ?? '';
}

function Field({ field, draft, onChange, identityOptions }) {
  const commonClass = 'mt-2 w-full rounded-lg border border-white/10 bg-surface-container px-3 py-2 text-sm text-on-surface outline-none focus:border-primary';
  const options = field.name.toLowerCase().includes('identity') || field.name === 'requesterIdentity'
    ? identityOptions
    : field.options || [];

  if (field.fieldType === 'BOOLEAN') {
    return (
      <label className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-surface-container px-3 py-3">
        <span className="text-sm font-semibold text-on-surface">{field.label}</span>
        <input checked={Boolean(fieldValue(draft, field.name))} name={field.name} onChange={onChange} type="checkbox" />
      </label>
    );
  }

  if (field.fieldType === 'TEXTAREA') {
    return (
      <label className="block md:col-span-2">
        <span className="text-[11px] font-bold uppercase tracking-widest text-outline">{field.label}</span>
        <textarea className={`${commonClass} min-h-24`} name={field.name} onChange={onChange} value={fieldValue(draft, field.name)} />
      </label>
    );
  }

  if (field.fieldType === 'SELECT') {
    return (
      <label className="block">
        <span className="text-[11px] font-bold uppercase tracking-widest text-outline">{field.label}</span>
        <select className={commonClass} name={field.name} onChange={onChange} value={fieldValue(draft, field.name)}>
          <option value="">Select</option>
          {options.map((option) => <option key={option.value || option} value={option.value || option}>{option.label || option}</option>)}
        </select>
      </label>
    );
  }

  return (
    <label className="block">
      <span className="text-[11px] font-bold uppercase tracking-widest text-outline">{field.label}</span>
      <input className={commonClass} name={field.name} onChange={onChange} type={field.fieldType === 'NUMBER' ? 'number' : 'text'} value={fieldValue(draft, field.name)} />
    </label>
  );
}

function PreviewPanel({ panel }) {
  return (
    <BusinessPanel title={panel.title}>
      <dl className="grid grid-cols-1 gap-3">
        {panel.items.map((item) => (
          <div key={item.label} className="rounded-lg border border-white/10 bg-surface-container p-3">
            <dt className="text-[11px] font-bold uppercase tracking-widest text-outline">{item.label}</dt>
            <dd className="mt-1 break-words text-sm font-semibold text-on-surface">{Array.isArray(item.value) ? item.value.join(' / ') || 'none' : String(item.value ?? 'n/a')}</dd>
          </div>
        ))}
      </dl>
    </BusinessPanel>
  );
}

function DraftPreview({ draft, prepared }) {
  const preview = businessRuntimeClient.getDraftPreviewModel(draft);
  const review = preview.runtimeReview;

  return (
    <div className="space-y-6" data-testid="business-draft-preview">
      <BusinessSummaryCards cards={[
        { id: 'draft-type', label: 'Draft Type', value: draftLabel(draft.draftType), detail: 'Runtime template rendered as local form state.', status: 'INFO' },
        { id: 'draft-valid', label: 'Validation', value: preview.validation.valid ? 'READY' : 'REVIEW', detail: `${preview.validation.missingFields.length} missing fields detected by runtime validation.`, status: preview.validation.valid ? 'APPROVED' : 'WARNING' },
        { id: 'draft-mode', label: 'Execution Mode', value: review.executionReview.policy.mode, detail: review.executionReview.policy.reason, status: 'NOTICE' },
        { id: 'draft-prepared', label: 'Local Draft', value: prepared ? 'PREPARED' : 'PREVIEW', detail: 'No backend mutation, wallet signing or contract call.', status: 'INFO' }
      ]} />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <BusinessPanel title="Draft Summary" description="Preview is generated by @axodus/business-runtime from local field values.">
          <dl className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-surface-container p-3"><dt className="text-outline">Inferred request type</dt><dd className="mt-1 font-bold text-on-surface">{review.inferredRequestCategory}</dd></div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-3"><dt className="text-outline">Estimated risk tier</dt><dd className="mt-1"><BusinessRiskBadge riskTier={review.riskReview.inferredRiskTier} /></dd></div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-3"><dt className="text-outline">Governance requirement</dt><dd className="mt-1 font-bold text-on-surface">{String(review.governanceRequirement)}</dd></div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-3"><dt className="text-outline">Treasury requirement</dt><dd className="mt-1 font-bold text-on-surface">{String(review.treasuryRequirement)}</dd></div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-3"><dt className="text-outline">ACS requirement</dt><dd className="mt-1 font-bold text-on-surface">{String(review.acsRequirement)}</dd></div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-3"><dt className="text-outline">Telemetry requirement</dt><dd className="mt-1 font-bold text-on-surface">{String(review.telemetryRequirement)}</dd></div>
          </dl>
        </BusinessPanel>

        <BusinessPanel title="Validation Warnings" description="Issues are structured by runtime validation.">
          <div className="space-y-3">
            {preview.validation.issues.map((issue) => (
              <div key={`${issue.code}-${issue.field || 'draft'}`} className={`rounded-lg border px-3 py-2 text-sm font-semibold ${issue.blocking ? 'border-amber-300/30 bg-amber-300/10 text-amber-100' : 'border-white/10 bg-surface-container text-outline'}`}>
                {issue.message}
              </div>
            ))}
            {!preview.validation.issues.length ? <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-sm font-semibold text-emerald-100">Draft structure is complete for preview.</div> : null}
          </div>
        </BusinessPanel>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <BusinessPanel title="Capability And Permission Review">
          <div className="mb-4 flex flex-wrap gap-2">
            {review.capabilityReview.requiredCapabilities.map((capability) => <BusinessBadge key={capability}>{capability}</BusinessBadge>)}
          </div>
          <div className="rounded-lg border border-white/10 bg-surface-container p-4 text-sm">
            <p className="font-bold text-on-surface">{review.permissionReview.decision.mode} / {String(review.permissionReview.decision.allowed)}</p>
            <p className="mt-2 text-outline">{review.permissionReview.decision.reason}</p>
          </div>
        </BusinessPanel>

        <BusinessPanel title="Execution Policy">
          <BusinessLifecycleTable rows={[review.executionReview.policy]} columns={[
            { key: 'action', label: 'Action' },
            { key: 'mode', label: 'Mode', render: (row) => <BusinessStatusBadge status={row.mode} /> },
            { key: 'executable', label: 'Executable', render: (row) => <span className="text-outline">{String(row.executable)}</span> },
            { key: 'reason', label: 'Reason' }
          ]} />
        </BusinessPanel>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <PreviewPanel panel={preview.riskPanel} />
        <PreviewPanel panel={preview.validationPanel} />
      </section>

      <BusinessPanel title="Non-Execution Notice" description="Sprint 11 preview model is runtime-owned and still non-executable.">
        <p className="text-sm leading-6 text-outline">{preview.nonExecutionNotice}</p>
      </BusinessPanel>
    </div>
  );
}

export function BusinessIntakePage() {
  const location = useLocation();
  const intakeRuntime = useBusinessIntakeRuntime();
  const initialDraftType = draftTypeByPath[location.pathname] || 'ECOSYSTEM_INFRASTRUCTURE_REQUEST';
  const [selectedDraftType, setSelectedDraftType] = useState(initialDraftType);
  const [draft, setDraft] = useState(() => createDraft(initialDraftType));
  const [prepared, setPrepared] = useState(false);

  const runtime = intakeRuntime.data;
  const activeTemplate = useMemo(() => runtime?.templates.find((template) => template.draftType === selectedDraftType), [runtime?.templates, selectedDraftType]);

  if (intakeRuntime.isLoading) return <BusinessLoadingState />;
  if (intakeRuntime.isError) return <BusinessErrorState message="Business intake runtime unavailable." />;

  const identityOptions = runtime.identities.map((identity) => ({ label: `${identity.displayName} / ${identity.identityType}`, value: identity.id }));

  const onDraftTypeChange = (draftType) => {
    setSelectedDraftType(draftType);
    setDraft(createDraft(draftType));
    setPrepared(false);
  };

  const onFieldChange = (event) => {
    const { checked, name, type, value } = event.target;
    setDraft((current) => ({
      ...current,
      requesterIdentityId: name === 'requesterIdentity' ? value : current.requesterIdentityId,
      values: {
        ...current.values,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
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
        { id: 'intake-mode', label: 'Intake Mode', value: 'LOCAL', detail: 'Draft state lives in React; draft rules live in @axodus/business-runtime.', status: 'INFO' },
        { id: 'intake-policy', label: 'Execution', value: 'DISABLED', detail: 'Runtime policies remain non-executable.', status: 'APPROVED' },
        { id: 'intake-routes', label: 'Route Contracts', value: runtime.routeCatalog.length, detail: 'Future API metadata is visible for review.', status: 'NOTICE' },
        { id: 'intake-validators', label: 'Validators', value: runtime.safety.valid ? 'PASS' : 'REVIEW', detail: 'Business runtime validator status.', status: runtime.safety.valid ? 'APPROVED' : 'WARNING' }
      ]} />

      <BusinessPanel title="Draft Type" description="Choose a runtime-owned intake template. No option creates a real request.">
        <div className="flex flex-wrap gap-2">
          {runtime.templates.map((template) => (
            <button
              className={`rounded-lg border px-3 py-2 text-sm font-bold ${selectedDraftType === template.draftType ? 'border-primary bg-primary/15 text-on-surface' : 'border-white/10 bg-surface-container text-outline'}`}
              key={template.draftType}
              onClick={() => onDraftTypeChange(template.draftType)}
              type="button"
            >
              {draftLabel(template.draftType)}
            </button>
          ))}
        </div>
      </BusinessPanel>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.8fr)]">
        <BusinessPanel title={activeTemplate?.title} description={activeTemplate?.description}>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
            {activeTemplate?.fields.map((field) => <Field draft={draft} field={field} identityOptions={identityOptions} key={field.name} onChange={onFieldChange} />)}
            <div className="flex flex-wrap gap-3 md:col-span-2">
              <button className="rounded-lg border border-primary bg-primary/15 px-4 py-2 text-sm font-bold text-on-surface" onClick={prepareDraft} type="button">Prepare Draft</button>
              <button className="rounded-lg border border-white/10 bg-surface-container px-4 py-2 text-sm font-bold text-on-surface" onClick={prepareDraft} type="button">Validate Structure</button>
              <span className="self-center text-xs font-semibold text-outline">Simulation Only / Mock / Read-only</span>
            </div>
          </form>
        </BusinessPanel>

        <div className="space-y-6">
          <DraftPreview draft={draft} prepared={prepared || location.pathname.endsWith('/preview')} />
        </div>
      </section>
    </BusinessPageShell>
  );
}
