import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
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
  '/business/intake/preview': 'GENERAL_BUSINESS_REQUEST',
  '/business/intake/drafts': 'GENERAL_BUSINESS_REQUEST'
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

function ReadinessBar({ value }) {
  return (
    <div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-primary" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
      <p className="mt-1 text-xs font-bold text-on-surface">{value}%</p>
    </div>
  );
}

function ReadinessReviewPanel({ readiness }) {
  if (!readiness) {
    return (
      <BusinessPanel title="Readiness Review" description="Save the draft locally to generate a final readiness review by draft ID.">
        <div className="rounded-lg border border-white/10 bg-surface-container p-4 text-sm font-semibold text-outline">
          Readiness review requires a stored local/mock draft. No backend persistence or submission is available.
        </div>
      </BusinessPanel>
    );
  }

  return (
    <BusinessPanel title="Readiness Review" description="Final runtime readiness review before any future review queue. This is analysis only and cannot submit the draft.">
      <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-surface-container p-3">
          <p className="text-[11px] font-bold uppercase tracking-widest text-outline">Readiness score</p>
          <ReadinessBar value={readiness.readinessScore} />
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-container p-3">
          <p className="text-[11px] font-bold uppercase tracking-widest text-outline">Blocking issues</p>
          <p className="mt-1 text-2xl font-black text-on-surface">{readiness.blockers.length}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-container p-3">
          <p className="text-[11px] font-bold uppercase tracking-widest text-outline">Required reviews</p>
          <p className="mt-1 text-sm font-bold text-on-surface">{readiness.requiredReviews.join(' / ') || 'none'}</p>
        </div>
      </div>

      <div className="mb-5 rounded-lg border border-white/10 bg-surface-container p-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-outline">Next Recommended Step</p>
        <p className="mt-2 text-sm font-semibold text-on-surface">{readiness.nextRecommendedStep}</p>
      </div>

      <BusinessLifecycleTable rows={readiness.categories} columns={[
        { key: 'category', label: 'Category', render: (row) => <span className="font-mono text-xs font-bold text-on-surface">{row.category}</span> },
        { key: 'ready', label: 'Ready', render: (row) => <BusinessStatusBadge status={row.ready ? 'APPROVED' : 'UNDER_REVIEW'} /> },
        { key: 'score', label: 'Score', render: (row) => <ReadinessBar value={row.score} /> },
        { key: 'blockers', label: 'Blockers', render: (row) => <span className="text-outline">{row.blockers.join(' / ') || 'none'}</span> },
        { key: 'warnings', label: 'Warnings', render: (row) => <span className="text-outline">{row.warnings.join(' / ') || 'none'}</span> }
      ]} />

      <section className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-lg border border-amber-300/30 bg-amber-300/10 p-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-amber-100">Blockers</p>
          <ul className="mt-3 space-y-2 text-sm font-semibold text-amber-100">
            {(readiness.blockers.length ? readiness.blockers : ['No blocking issue detected for future review.']).map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-container p-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-outline">Disabled Future Actions</p>
          <p className="mt-3 text-sm font-semibold text-outline">{readiness.disabledFutureActions.join(' / ')}</p>
        </div>
      </section>
    </BusinessPanel>
  );
}

function SubmissionSimulationPanel({ storedRecord, submissionResult, onSimulate }) {
  if (!storedRecord) {
    return (
      <BusinessPanel title="Submission Simulation" description="Save the draft locally before simulation can evaluate a stable draft ID.">
        <div className="rounded-lg border border-white/10 bg-surface-container p-4 text-sm font-semibold text-outline">
          Simulation requires a stored local/mock draft. No external submission path exists.
        </div>
      </BusinessPanel>
    );
  }

  const validation = businessRuntimeClient.validateDraftSubmissionReadiness(storedRecord.id);
  const submission = businessRuntimeClient.getBusinessDraftSubmission(storedRecord.id);
  const receipt = submissionResult?.receipt || submission.latestReceipt;
  const canSimulate = validation.canSubmit;

  return (
    <BusinessPanel title="Submission Simulation" description="Local/mock submission simulation creates a receipt and links the draft to the Review Queue. It cannot submit to governance, treasury, ACS, contracts or backend services.">
      <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-surface-container p-3">
          <p className="text-[11px] font-bold uppercase tracking-widest text-outline">Submission status</p>
          <p className="mt-1 text-sm font-bold text-on-surface">{receipt?.submissionStatus || validation.status}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-container p-3">
          <p className="text-[11px] font-bold uppercase tracking-widest text-outline">Simulation allowed</p>
          <p className="mt-1 text-sm font-bold text-on-surface">{String(canSimulate)}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-container p-3">
          <p className="text-[11px] font-bold uppercase tracking-widest text-outline">Receipts</p>
          <p className="mt-1 text-sm font-bold text-on-surface">{submission.history.length}</p>
        </div>
      </div>

      {canSimulate ? (
        <button className="mb-5 rounded-lg border border-primary bg-primary/15 px-4 py-2 text-sm font-bold text-on-surface" onClick={onSimulate} type="button">
          Simulate Submission
        </button>
      ) : (
        <div className="mb-5 rounded-lg border border-amber-300/30 bg-amber-300/10 p-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-amber-100">Simulation Blockers</p>
          <ul className="mt-3 space-y-2 text-sm font-semibold text-amber-100">
            {validation.errors.map((entry) => <li key={entry.code}>{entry.message}</li>)}
          </ul>
        </div>
      )}

      {submissionResult && !submissionResult.success ? (
        <div className="mb-5 rounded-lg border border-amber-300/30 bg-amber-300/10 p-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-amber-100">Simulation Rejected</p>
          <p className="mt-2 text-sm font-semibold text-amber-100">{submissionResult.errors.map((entry) => entry.message).join(' / ')}</p>
        </div>
      ) : null}

      {receipt ? (
        <div className="space-y-4" data-testid="business-submission-receipt">
          <BusinessSummaryCards cards={[
            { id: 'submission-id', label: 'Submission Receipt', value: receipt.submissionId, detail: `Draft ${receipt.draftId}.`, status: 'NOTICE' },
            { id: 'submission-type', label: 'Submission Type', value: receipt.submissionType, detail: 'Generated by runtime simulation only.', status: 'INFO' },
            { id: 'submission-score', label: 'Readiness Score', value: `${receipt.readinessScore}%`, detail: `${receipt.requiredReviews.length} required review groups.`, status: 'APPROVED' },
            { id: 'submission-queue', label: 'Review Queue Item', value: receipt.reviewQueueItemId, detail: 'Queue item is derived locally from the stored draft.', status: 'NOTICE' }
          ]} />
          <div className="rounded-lg border border-white/10 bg-surface-container p-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-outline">Required Reviews</p>
            <div className="mt-3 flex flex-wrap gap-2">{receipt.requiredReviews.map((review) => <BusinessBadge key={review}>{review}</BusinessBadge>)}</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-surface-container p-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-outline">Non-Execution Guarantee</p>
            <p className="mt-2 text-sm leading-6 text-outline">{receipt.nonExecutionGuarantee}</p>
          </div>
          <Link className="inline-flex rounded-lg border border-white/10 bg-surface-container px-4 py-2 text-sm font-bold text-on-surface hover:border-primary" to="/business/review-queue">Open Review Queue</Link>
        </div>
      ) : null}
    </BusinessPanel>
  );
}

function DraftPreview({ draft, prepared, storedRecord, submissionResult, onSimulateSubmission }) {
  const preview = storedRecord?.preview || businessRuntimeClient.getDraftPreviewModel(draft);
  const review = preview.runtimeReview;
  const readiness = storedRecord ? businessRuntimeClient.getDraftReadinessReview(storedRecord.id) : undefined;

  return (
    <div className="space-y-6" data-testid="business-draft-preview">
      <BusinessSummaryCards cards={[
        { id: 'draft-type', label: 'Draft Type', value: draftLabel(draft.draftType), detail: 'Runtime template rendered as local form state.', status: 'INFO' },
        { id: 'draft-valid', label: 'Validation', value: preview.validation.valid ? 'READY' : 'REVIEW', detail: `${preview.validation.missingFields.length} missing fields detected by runtime validation.`, status: preview.validation.valid ? 'APPROVED' : 'WARNING' },
        { id: 'draft-mode', label: 'Execution Mode', value: review.executionReview.policy.mode, detail: review.executionReview.policy.reason, status: 'NOTICE' },
        { id: 'draft-prepared', label: 'Local Draft', value: storedRecord?.status || (prepared ? 'PREPARED' : 'PREVIEW'), detail: storedRecord ? `Stored as ${storedRecord.id}.` : 'No backend mutation, wallet signing or contract call.', status: 'INFO' }
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

      <ReadinessReviewPanel readiness={readiness} />

      <SubmissionSimulationPanel onSimulate={onSimulateSubmission} storedRecord={storedRecord} submissionResult={submissionResult} />

      <BusinessPanel title="Non-Execution Notice" description="Sprint 11 preview model is runtime-owned and still non-executable.">
        <p className="text-sm leading-6 text-outline">{preview.nonExecutionNotice}</p>
      </BusinessPanel>
    </div>
  );
}

export function BusinessIntakePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { draftId } = useParams();
  const intakeRuntime = useBusinessIntakeRuntime();
  const isDraftList = location.pathname === '/business/intake/drafts';
  const storedRecord = draftId ? businessRuntimeClient.getDraftStoreRecordById(draftId) : undefined;
  const initialDraftType = storedRecord?.draft.draftType || draftTypeByPath[location.pathname] || 'ECOSYSTEM_INFRASTRUCTURE_REQUEST';
  const [selectedDraftType, setSelectedDraftType] = useState(initialDraftType);
  const [draft, setDraft] = useState(() => storedRecord?.draft || createDraft(initialDraftType));
  const [prepared, setPrepared] = useState(false);
  const [draftRecords, setDraftRecords] = useState(() => businessRuntimeClient.listDraftStoreRecords());
  const [submissionResult, setSubmissionResult] = useState(undefined);

  const runtime = intakeRuntime.data;
  const activeTemplate = useMemo(() => runtime?.templates.find((template) => template.draftType === selectedDraftType), [runtime?.templates, selectedDraftType]);

  useEffect(() => {
    if (storedRecord) {
      setSelectedDraftType(storedRecord.draft.draftType);
      setDraft(storedRecord.draft);
      setSubmissionResult(undefined);
    }
  }, [storedRecord]);

  if (intakeRuntime.isLoading) return <BusinessLoadingState />;
  if (intakeRuntime.isError) return <BusinessErrorState message="Business intake runtime unavailable." />;

  const identityOptions = runtime.identities.map((identity) => ({ label: `${identity.displayName} / ${identity.identityType}`, value: identity.id }));
  const refreshDraftRecords = () => setDraftRecords(businessRuntimeClient.listDraftStoreRecords());

  const onDraftTypeChange = (draftType) => {
    setSelectedDraftType(draftType);
    setDraft(createDraft(draftType));
    setPrepared(false);
    setSubmissionResult(undefined);
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
    setSubmissionResult(undefined);
  };

  const saveDraft = () => {
    const record = storedRecord
      ? businessRuntimeClient.updateDraftStoreRecord(storedRecord.id, { draft })
      : businessRuntimeClient.createDraftStoreRecord(draft);

    refreshDraftRecords();
    setPrepared(true);
    if (record?.id) navigate(`/business/intake/preview/${record.id}`);
  };

  const discardDraft = (recordId) => {
    businessRuntimeClient.deleteDraftStoreRecord(recordId);
    refreshDraftRecords();
    if (draftId === recordId) navigate('/business/intake/drafts');
  };

  const prepareDraft = () => setPrepared(true);
  const simulateSubmission = () => {
    if (!storedRecord) return;
    setSubmissionResult(businessRuntimeClient.simulateDraftSubmission(storedRecord.id));
    refreshDraftRecords();
  };

  if (isDraftList) {
    return (
      <BusinessPageShell
        title="Business Drafts"
        description="Local/mock Business drafts stored in the runtime draft store. Records are reusable for preview and review only."
        actions={<Link className="rounded-lg border border-white/10 bg-surface-container px-4 py-2 text-sm font-bold text-on-surface hover:border-primary" to="/business/intake/new">Prepare Draft</Link>}
      >
        <BusinessSummaryCards cards={[
          { id: 'drafts-total', label: 'Stored Drafts', value: draftRecords.length, detail: 'Local mock records in the runtime draft store.', status: 'INFO' },
          { id: 'drafts-mode', label: 'Store Mode', value: 'LOCAL', detail: 'No backend persistence or external side effects.', status: 'APPROVED' },
          { id: 'drafts-preview', label: 'Preview Source', value: 'BY ID', detail: 'Preview can be generated from stored draft records.', status: 'NOTICE' },
          { id: 'drafts-execution', label: 'Execution', value: 'DISABLED', detail: 'No submission path exists in this sprint.', status: 'APPROVED' }
        ]} />
        <BusinessPanel title="Prepared Draft Records" description="Open, preview or discard local/mock records. Discard only changes local draft store state.">
          <BusinessLifecycleTable rows={draftRecords} columns={[
            { key: 'id', label: 'Draft id', render: (row) => <Link className="font-mono text-xs font-bold text-primary" to={`/business/intake/drafts/${row.id}`}>{row.id}</Link> },
            { key: 'title', label: 'Title' },
            { key: 'draftType', label: 'Type', render: (row) => <span className="text-outline">{row.draft.draftType}</span> },
            { key: 'status', label: 'Status', render: (row) => <BusinessStatusBadge status={row.status} /> },
            { key: 'valid', label: 'Valid', render: (row) => <span className="text-outline">{String(row.validation.valid)}</span> },
            { key: 'updatedAt', label: 'Updated', render: (row) => <span className="text-outline">{new Date(row.updatedAt).toLocaleString()}</span> },
            { key: 'preview', label: 'Preview', render: (row) => <Link className="text-sm font-bold text-primary" to={`/business/intake/preview/${row.id}`}>Preview Request</Link> },
            { key: 'discard', label: 'Discard', render: (row) => <button className="rounded-lg border border-white/10 bg-surface-container px-3 py-1 text-xs font-bold text-outline" onClick={() => discardDraft(row.id)} type="button">Discard Draft</button> }
          ]} />
        </BusinessPanel>
      </BusinessPageShell>
    );
  }

  if (draftId && !storedRecord) {
    return <BusinessErrorState message="Stored Business draft not found." />;
  }

  return (
    <BusinessPageShell
      title="Business Intake"
      description="Prepare local Business request drafts and preview governance, treasury, ACS, capability, permission and execution-policy requirements without submitting or mutating anything."
      actions={<div className="flex flex-wrap gap-2"><Link className="rounded-lg border border-white/10 bg-surface-container px-4 py-2 text-sm font-bold text-on-surface hover:border-primary" to="/business/intake/drafts">Stored Drafts</Link><Link className="rounded-lg border border-white/10 bg-surface-container px-4 py-2 text-sm font-bold text-on-surface hover:border-primary" to={storedRecord ? `/business/intake/preview/${storedRecord.id}` : '/business/intake/preview'}>Preview Request</Link></div>}
    >
      <BusinessSummaryCards cards={[
        { id: 'intake-mode', label: 'Intake Mode', value: 'LOCAL', detail: 'Draft state is local/mock; draft rules and store helpers live in @axodus/business-runtime.', status: 'INFO' },
        { id: 'intake-policy', label: 'Execution', value: 'DISABLED', detail: 'Runtime policies remain non-executable.', status: 'APPROVED' },
        { id: 'intake-routes', label: 'Stored Drafts', value: draftRecords.length, detail: 'Prepared local/mock drafts available for preview by ID.', status: 'NOTICE' },
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
              <button className="rounded-lg border border-primary bg-primary/15 px-4 py-2 text-sm font-bold text-on-surface" onClick={saveDraft} type="button">{storedRecord ? 'Update Draft' : 'Save Draft'}</button>
              <button className="rounded-lg border border-white/10 bg-surface-container px-4 py-2 text-sm font-bold text-on-surface" onClick={prepareDraft} type="button">Validate Structure</button>
              {storedRecord ? <button className="rounded-lg border border-white/10 bg-surface-container px-4 py-2 text-sm font-bold text-outline" onClick={() => discardDraft(storedRecord.id)} type="button">Discard Draft</button> : null}
              <span className="self-center text-xs font-semibold text-outline">Simulation Only / Mock / Read-only</span>
            </div>
          </form>
        </BusinessPanel>

        <div className="space-y-6">
          <DraftPreview
            draft={draft}
            onSimulateSubmission={simulateSubmission}
            prepared={prepared || location.pathname.includes('/preview')}
            storedRecord={storedRecord}
            submissionResult={submissionResult}
          />
        </div>
      </section>
    </BusinessPageShell>
  );
}
