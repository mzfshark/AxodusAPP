import { getCreateProposalIntegrationStatus } from '../api/createProposalContract';
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

export default function CreateProposalIntegrationStatus({ proposalDrafts = [] }) {
  const integration = getCreateProposalIntegrationStatus();
  const draftStateEntries = Object.entries(countDraftStates(proposalDrafts));

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
      </div>
    </section>
  );
}
