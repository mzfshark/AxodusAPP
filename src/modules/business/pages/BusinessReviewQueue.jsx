import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
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
import { useBusinessReviewQueue } from '../hooks/useBusinessData';
import { businessRuntimeClient } from '../services/businessRuntimeClient';

function scoreBar(value = 0) {
  return (
    <div className="min-w-[120px]">
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-primary" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
      <p className="mt-1 text-xs font-bold text-on-surface">{value}%</p>
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }) {
  return (
    <label className="block">
      <span className="text-[11px] font-bold uppercase tracking-widest text-outline">{label}</span>
      <select
        className="mt-2 w-full rounded-lg border border-white/10 bg-surface-container px-3 py-2 text-sm font-bold text-on-surface outline-none focus:border-primary"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        <option value="">All</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function RequiredReviewsList({ reviews = [] }) {
  return (
    <div className="flex max-w-md flex-wrap gap-2">
      {reviews.map((review) => <BusinessBadge key={review}>{review}</BusinessBadge>)}
    </div>
  );
}

function QueueEmptyState() {
  return (
    <div className="rounded-lg border border-white/10 bg-surface-container p-5 text-sm leading-6 text-outline">
      No local/mock drafts are currently available in the review queue. Prepare and save a draft in Business Intake to generate queue items.
    </div>
  );
}

export function BusinessReviewQueue() {
  const filterOptions = businessRuntimeClient.getReviewQueueFilterOptions();
  const [status, setStatus] = useState('');
  const [reviewType, setReviewType] = useState('');
  const [priority, setPriority] = useState('');
  const filter = useMemo(() => ({
    ...(status ? { status } : {}),
    ...(reviewType ? { reviewType } : {}),
    ...(priority ? { priority } : {})
  }), [priority, reviewType, status]);
  const queue = useBusinessReviewQueue(filter);

  if (queue.isLoading) return <BusinessLoadingState />;
  if (queue.isError) return <BusinessErrorState message="Business review queue unavailable." />;

  const view = queue.data;
  const summary = view.summary;

  return (
    <BusinessPageShell
      title="Business Review Queue"
      description="Operational mock/read-only queue derived from stored Business drafts and runtime readiness reviews. It organizes review needs without submitting, approving or executing anything."
      actions={<Link className="rounded-lg border border-white/10 bg-surface-container px-4 py-2 text-sm font-bold text-on-surface hover:border-primary" to="/business/intake/drafts">Stored Drafts</Link>}
    >
      <BusinessSummaryCards cards={[
        { id: 'queue-total', label: 'Queue Items', value: summary.totalItems, detail: 'Derived from local/mock draft store records.', status: 'INFO' },
        { id: 'queue-ready', label: 'Ready For Review', value: summary.readyForReview, detail: 'Drafts with sufficient readiness and no blockers.', status: 'APPROVED' },
        { id: 'queue-blocked', label: 'Blocked', value: summary.blocked, detail: 'Drafts with blocking readiness issues.', status: summary.blocked ? 'WARNING' : 'INFO' },
        { id: 'queue-critical', label: 'Critical Priority', value: summary.criticalPriority, detail: 'Critical priority remains analysis-only.', status: summary.criticalPriority ? 'CRITICAL' : 'INFO' },
        { id: 'queue-governance', label: 'Governance Review', value: summary.governanceReview, detail: 'Requires future governance review preparation.', status: 'NOTICE' },
        { id: 'queue-treasury', label: 'Treasury Review', value: summary.treasuryReview, detail: 'Requires future treasury review preparation.', status: 'WARNING' },
        { id: 'queue-acs', label: 'ACS Review', value: summary.acsReview, detail: 'Requires future ACS readiness review.', status: 'NOTICE' },
        { id: 'queue-identity', label: 'Identity Review', value: summary.identityReview, detail: 'Requires identity or permission review.', status: 'NOTICE' }
      ]} />

      <BusinessPanel title="Review Queue Filters" description="Filters are local view controls over runtime-derived queue items. They do not assign reviewers or mutate drafts.">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <FilterSelect label="Status" onChange={setStatus} options={filterOptions.statuses} value={status} />
          <FilterSelect label="Review type" onChange={setReviewType} options={filterOptions.reviewTypes} value={reviewType} />
          <FilterSelect label="Priority" onChange={setPriority} options={filterOptions.priorities} value={priority} />
          <div className="flex items-end">
            <button
              className="w-full rounded-lg border border-white/10 bg-surface-container px-4 py-2 text-sm font-bold text-on-surface"
              onClick={() => {
                setStatus('');
                setReviewType('');
                setPriority('');
              }}
              type="button"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </BusinessPanel>

      <BusinessPanel title="Queue Table" description="Every item is generated from draft readiness. No approval, rejection, assignment, governance, treasury, ACS or contract execution exists here.">
        {view.items.length === 0 ? <QueueEmptyState /> : (
          <BusinessLifecycleTable
            rows={view.items}
            columns={[
              { key: 'queueItemId', label: 'Queue item', render: (row) => <span className="font-mono text-xs font-bold text-on-surface">{row.queueItemId}</span> },
              { key: 'title', label: 'Title' },
              { key: 'status', label: 'Status', render: (row) => <BusinessStatusBadge status={row.status} /> },
              { key: 'priority', label: 'Priority', render: (row) => <BusinessStatusBadge status={row.priority} /> },
              { key: 'riskTier', label: 'Risk', render: (row) => <BusinessRiskBadge riskTier={row.riskTier} /> },
              { key: 'readinessScore', label: 'Readiness', render: (row) => scoreBar(row.readinessScore) },
              { key: 'requiredReviews', label: 'Required reviews', render: (row) => <RequiredReviewsList reviews={row.requiredReviews} /> },
              { key: 'blockers', label: 'Blockers', render: (row) => <span className="text-outline">{row.blockers.length ? row.blockers.map((blocker) => blocker.message).join(' / ') : 'none'}</span> },
              { key: 'nextRecommendedStep', label: 'Next step', render: (row) => <span className="text-outline">{row.nextRecommendedStep}</span> },
              { key: 'draftId', label: 'Preview', render: (row) => <Link className="text-sm font-bold text-primary" to={`/business/intake/preview/${row.draftId}`}>Preview Draft</Link> }
            ]}
          />
        )}
      </BusinessPanel>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <BusinessPanel title="Review Blockers" description="Blockers come from runtime readiness categories and remain informational only.">
          <div className="space-y-3">
            {view.items.flatMap((item) => item.blockers.map((blocker) => ({ ...blocker, title: item.title }))).length === 0 ? (
              <div className="rounded-lg border border-white/10 bg-surface-container p-4 text-sm font-semibold text-outline">No blocking issues in the current queue view.</div>
            ) : view.items.flatMap((item) => item.blockers.map((blocker) => ({ ...blocker, title: item.title }))).map((blocker) => (
              <div className="rounded-lg border border-amber-300/30 bg-amber-300/10 p-4" key={blocker.blockerId}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="text-sm text-amber-100">{blocker.title}</strong>
                  <BusinessStatusBadge status={blocker.severity} />
                </div>
                <p className="mt-2 text-sm font-semibold text-amber-100">{blocker.message}</p>
                <p className="mt-1 font-mono text-xs text-amber-100/80">{blocker.reviewType}</p>
              </div>
            ))}
          </div>
        </BusinessPanel>

        <BusinessPanel title="Queue Safety" description="Sprint 19 is a local operational queue only. It creates no review workflow authority.">
          <dl className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-surface-container p-3"><dt className="text-outline">Runtime mode</dt><dd className="mt-1 font-bold text-on-surface">{view.mock && view.readOnly ? 'mock/read-only' : 'review'}</dd></div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-3"><dt className="text-outline">Submission</dt><dd className="mt-1 font-bold text-on-surface">disabled</dd></div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-3"><dt className="text-outline">Review assignment</dt><dd className="mt-1 font-bold text-on-surface">unassigned mock</dd></div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-3"><dt className="text-outline">External effects</dt><dd className="mt-1 font-bold text-on-surface">none</dd></div>
          </dl>
        </BusinessPanel>
      </section>
    </BusinessPageShell>
  );
}
