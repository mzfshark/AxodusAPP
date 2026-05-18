import { useEffect, useMemo, useState } from 'react';
import { getCreateProposalIntegrationStatus, listCreateProposalReviewRequests } from '../api/createProposalContract';
import { ReasonSeverityBadge } from './GovernanceStanding';

function countDraftStates(proposalDrafts) {
  return proposalDrafts.reduce(
    (counts, draft) => ({
      ...counts,
      [draft.submissionState ?? 'draft']: (counts[draft.submissionState ?? 'draft'] ?? 0) + 1,
    }),
    {},
  );
}

function ReviewRequestList({ reviewRequestsState }) {
  if (reviewRequestsState.status === 'disabled') {
    return (
      <div className="rounded-md border border-cyan-300/20 bg-cyan-950/10 px-3 py-2 text-xs leading-5 text-cyan-100">
        Backend review request listing is inactive in mock review mode.
      </div>
    );
  }

  if (reviewRequestsState.status === 'loading') {
    return <div className="rounded-md border border-white/5 bg-surface-container px-3 py-2 text-xs text-on-surface-variant">Loading backend review requests...</div>;
  }

  if (reviewRequestsState.status === 'error') {
    return (
      <div className="rounded-md border border-amber-300/20 bg-amber-950/20 px-3 py-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black uppercase text-amber-100">Review request listing unavailable</span>
          <ReasonSeverityBadge severity={reviewRequestsState.error?.reasonSeverity ?? 'warning'} />
        </div>
        <p className="mt-1 text-xs leading-5 text-amber-50">{reviewRequestsState.error?.message ?? 'The backend did not return createProposal review requests.'}</p>
        {reviewRequestsState.error?.reasonCode && <div className="mt-1 font-mono text-[11px] text-amber-100">{reviewRequestsState.error.reasonCode}</div>}
      </div>
    );
  }

  const requests = reviewRequestsState.data?.items ?? [];

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap items-center gap-2 text-xs text-on-surface-variant">
        <span>
          {reviewRequestsState.data?.count ?? requests.length} observed review request{(reviewRequestsState.data?.count ?? requests.length) === 1 ? '' : 's'}
        </span>
        <span className="rounded border border-white/10 px-2 py-0.5 font-mono text-[11px] text-slate-300">{reviewRequestsState.data?.source ?? 'unknown-source'}</span>
      </div>
      {requests.length > 0 ? (
        requests.slice(0, 3).map((request) => (
          <div key={request.id} className="rounded-md border border-white/5 bg-surface-container px-3 py-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] font-black text-on-surface">{request.id}</span>
              <span className="rounded border border-white/10 px-2 py-0.5 text-[10px] font-black uppercase text-slate-300">{request.status ?? 'observed'}</span>
            </div>
            <p className="mt-1 text-xs leading-5 text-on-surface-variant">{request.message ?? 'Backend createProposal review receipt observed.'}</p>
          </div>
        ))
      ) : (
        <div className="rounded-md border border-white/5 bg-surface-container px-3 py-2 text-xs leading-5 text-on-surface-variant">
          No backend createProposal review requests are currently observed.
        </div>
      )}
    </div>
  );
}

export default function CreateProposalIntegrationStatus({ proposalDrafts = [], reviewRequestsState: providedReviewRequestsState }) {
  const integration = getCreateProposalIntegrationStatus();
  const draftStateEntries = Object.entries(countDraftStates(proposalDrafts));
  const [reviewRequestsState, setReviewRequestsState] = useState(
    providedReviewRequestsState ?? {
      status: integration.backendEnabled ? 'loading' : 'disabled',
      data: null,
      error: null,
    },
  );
  const effectiveReviewRequestsState = providedReviewRequestsState ?? reviewRequestsState;
  const reviewFilters = useMemo(() => ({ status: 'backend-review-queued', limit: 5 }), []);

  useEffect(() => {
    if (providedReviewRequestsState || !integration.backendEnabled) {
      setReviewRequestsState({ status: integration.backendEnabled ? 'idle' : 'disabled', data: null, error: null });
      return undefined;
    }

    const controller = new AbortController();
    setReviewRequestsState({ status: 'loading', data: null, error: null });

    listCreateProposalReviewRequests({ filters: reviewFilters, signal: controller.signal })
      .then((data) => {
        setReviewRequestsState({ status: 'success', data, error: null });
      })
      .catch((error) => {
        if (error?.name === 'AbortError') return;
        setReviewRequestsState({ status: 'error', data: null, error });
      });

    return () => controller.abort();
  }, [integration.backendEnabled, providedReviewRequestsState, reviewFilters]);

  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest">
      <div className="flex flex-col gap-3 border-b border-white/5 px-5 py-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-lg font-bold text-on-surface">Create Proposal Integration Status</h2>
          <p className="mt-1 text-xs leading-5 text-on-surface-variant">
            Observed integration mode for proposal creation. This panel reports routing state only; it does not evaluate governance validity.
          </p>
        </div>
        <span
          className={`rounded-md border px-3 py-1 text-xs font-black uppercase ${
            integration.backendEnabled ? 'border-emerald-300/20 bg-emerald-950/20 text-emerald-100' : 'border-cyan-300/20 bg-cyan-950/20 text-cyan-100'
          }`}
        >
          {integration.backendEnabled ? 'backend enabled' : 'mock review'}
        </span>
      </div>

      <div className="grid gap-4 p-5 lg:grid-cols-[1fr_1.2fr]">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-white/5 bg-surface-container-high p-4">
            <div className="text-[11px] font-black uppercase text-slate-500">Submission mode</div>
            <div className="mt-2 font-mono text-sm font-black text-on-surface">{integration.submissionMode}</div>
          </div>
          <div className="rounded-lg border border-white/5 bg-surface-container-high p-4">
            <div className="text-[11px] font-black uppercase text-slate-500">Backend endpoint</div>
            <div className="mt-2 break-all font-mono text-xs font-semibold text-on-surface">{integration.endpoint}</div>
          </div>
          <div className="rounded-lg border border-white/5 bg-surface-container-high p-4 md:col-span-2">
            <div className="text-[11px] font-black uppercase text-slate-500">Local draft states</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {draftStateEntries.length > 0 ? (
                draftStateEntries.map(([state, count]) => (
                  <span key={state} className="rounded-md border border-white/10 px-2 py-1 text-[11px] font-bold text-slate-300">
                    {state}: {count}
                  </span>
                ))
              ) : (
                <span className="text-xs text-on-surface-variant">No local drafts in this browser context.</span>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/5 bg-surface-container-high p-4">
          <div className="text-[11px] font-black uppercase text-slate-500">Active create-proposal reason codes</div>
          <div className="mt-3 grid gap-2">
            {integration.reasonCodes.length > 0 ? (
              integration.reasonCodes.map((reason) => (
                <div key={reason.reasonCode} className="rounded-md border border-white/5 bg-surface-container px-3 py-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] font-black uppercase text-on-surface">{reason.reasonCode}</span>
                    <ReasonSeverityBadge severity={reason.reasonSeverity} />
                  </div>
                  <p className="mt-1 text-xs leading-5 text-on-surface-variant">{reason.message}</p>
                </div>
              ))
            ) : (
              <div className="rounded-md border border-emerald-300/20 bg-emerald-950/10 px-3 py-2 text-xs leading-5 text-emerald-100">
                No frontend create-proposal integration reason codes are active.
              </div>
            )}
          </div>
          <p className="mt-3 text-xs leading-5 text-on-surface-variant">{integration.boundary}</p>
        </div>

        <div className="rounded-lg border border-white/5 bg-surface-container-high p-4 lg:col-span-2">
          <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="text-[11px] font-black uppercase text-slate-500">Backend review requests</div>
              <p className="mt-1 text-xs leading-5 text-on-surface-variant">
                Observable createProposal receipts accepted by the Governance API. This is review state only, not indexed or on-chain proposal truth.
              </p>
            </div>
            <span className="rounded border border-white/10 px-2 py-1 font-mono text-[11px] text-slate-300">{integration.reviewRequestsEndpoint}</span>
          </div>
          <div className="mt-3">
            <ReviewRequestList reviewRequestsState={effectiveReviewRequestsState} />
          </div>
        </div>
      </div>
    </section>
  );
}
