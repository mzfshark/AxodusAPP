import { Link } from 'react-router-dom';

const freshnessTone = {
  fresh: 'border-emerald-400/25 bg-emerald-500/10 text-emerald-100',
  stale: 'border-amber-400/25 bg-amber-500/10 text-amber-100',
  rebuilding: 'border-cyan-400/25 bg-cyan-500/10 text-cyan-100',
  unknown: 'border-slate-400/25 bg-slate-500/10 text-slate-100',
  failed: 'border-red-400/25 bg-red-500/10 text-red-100',
};

export function GovernanceFreshnessBadge({ freshness = 'unknown' }) {
  return (
    <span className={`inline-flex w-fit items-center rounded-md border px-2.5 py-1 text-xs font-black uppercase ${freshnessTone[freshness] ?? freshnessTone.unknown}`}>
      {freshness}
    </span>
  );
}

export function GovernanceStatusBadge({ value = 'unknown' }) {
  return (
    <span className="inline-flex w-fit items-center rounded-md border border-cyan-300/20 bg-cyan-950/20 px-2.5 py-1 text-xs font-black uppercase text-cyan-100">
      {String(value).replaceAll('-', ' ')}
    </span>
  );
}

export function GovernanceReadOnlyBanner({ freshness = 'unknown' }) {
  return (
    <section className="rounded-lg border border-cyan-300/15 bg-cyan-950/15 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Governance read-only mock</div>
          <p className="mt-2 text-sm leading-6 text-cyan-50">
            Local mock read model rendering only. No backend query API, proposal mutation, wallet signing, treasury execution or on-chain write is enabled.
          </p>
        </div>
        <GovernanceFreshnessBadge freshness={freshness} />
      </div>
    </section>
  );
}

export function NoGovernanceActionsNotice() {
  return (
    <section className="rounded-lg border border-amber-300/20 bg-amber-950/15 p-4">
      <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-100">Actions unavailable</div>
      <p className="mt-2 text-sm leading-6 text-amber-50">
        Create, submit, vote, review, approve, reject, execute, sign and treasury actions are not available in read-only mode.
      </p>
    </section>
  );
}

export function GovernanceOverviewCards({ summary }) {
  const counts = summary?.proposalCountsByStatus ?? {};
  const cards = [
    { label: 'Open reviews', value: summary?.openReviews ?? 0, detail: 'Review records only' },
    { label: 'Pending decisions', value: summary?.pendingDecisions ?? 0, detail: 'No execution implied' },
    { label: 'Emergency notices', value: summary?.activeEmergencyActions ?? 0, detail: 'Sanitized visibility' },
    { label: 'Blocked execution intents', value: summary?.blockedExecutionIntents ?? 0, detail: 'Execution disabled' },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article key={card.label} className="rounded-lg border border-white/5 bg-surface-container-highest p-4">
          <div className="text-xs font-black uppercase text-slate-500">{card.label}</div>
          <div className="mt-3 text-3xl font-black text-on-surface">{card.value}</div>
          <p className="mt-2 text-xs leading-5 text-on-surface-variant">{card.detail}</p>
        </article>
      ))}
      <article className="rounded-lg border border-white/5 bg-surface-container-highest p-4 md:col-span-2 xl:col-span-4">
        <div className="text-xs font-black uppercase text-slate-500">Proposal counts</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.keys(counts).length === 0 ? (
            <span className="text-sm text-on-surface-variant">No proposal status counts in this mock tenant.</span>
          ) : Object.entries(counts).map(([status, count]) => (
            <span key={status} className="rounded-md border border-white/10 px-3 py-1.5 text-xs font-bold text-on-surface">
              {status}: {count}
            </span>
          ))}
        </div>
      </article>
    </section>
  );
}

export function ProposalListTable({ proposals = [] }) {
  if (proposals.length === 0) {
    return (
      <section className="rounded-lg border border-white/5 bg-surface-container-highest p-6 text-center">
        <h2 className="text-lg font-black text-on-surface">No read-only proposals</h2>
        <p className="mt-2 text-sm text-on-surface-variant">This tenant has no local mock proposal records.</p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-lg border border-white/5 bg-surface-container-highest">
      <div className="border-b border-white/5 px-4 py-3">
        <h2 className="text-lg font-black text-on-surface">Read-only proposals</h2>
      </div>
      <div className="divide-y divide-white/5">
        {proposals.map((proposal) => (
          <article key={proposal.proposalId} className="grid gap-3 px-4 py-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <GovernanceStatusBadge value={proposal.status} />
                <span className="rounded-md border border-white/10 px-2 py-1 text-xs font-bold text-slate-300">
                  execution intent: {proposal.executionIntentStatus}
                </span>
              </div>
              <h3 className="mt-3 text-base font-black text-on-surface">{proposal.title}</h3>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">{proposal.summary}</p>
              <p className="mt-2 text-xs text-slate-500">Updated {proposal.updatedAt}</p>
            </div>
            <Link
              to={`/governance/proposals/${proposal.proposalId}`}
              className="inline-flex h-fit w-fit items-center justify-center rounded-lg border border-white/10 px-3 py-2 text-sm font-black text-cyan-100"
            >
              View read-only
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProposalTimelinePreview({ entries = [] }) {
  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest p-5">
      <h2 className="text-lg font-black text-on-surface">Timeline preview</h2>
      <div className="mt-4 space-y-3">
        {entries.length === 0 ? <p className="text-sm text-on-surface-variant">No timeline entries in local mock data.</p> : entries.map((entry) => (
          <div key={entry.timelineId} className="rounded-lg border border-white/5 bg-surface-container-high p-3">
            <div className="text-xs font-black uppercase text-cyan-200">{entry.eventType}</div>
            <p className="mt-2 text-sm text-on-surface">{entry.summary}</p>
            <p className="mt-2 text-xs text-slate-500">{entry.occurredAt}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function DecisionHistoryPreview({ decisions = [] }) {
  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest p-5">
      <h2 className="text-lg font-black text-on-surface">Decision history</h2>
      <div className="mt-4 space-y-3">
        {decisions.length === 0 ? <p className="text-sm text-on-surface-variant">No decisions in local mock data.</p> : decisions.map((decision) => (
          <div key={decision.decisionId} className="rounded-lg border border-white/5 bg-surface-container-high p-3">
            <GovernanceStatusBadge value={decision.outcome} />
            <p className="mt-2 text-sm text-on-surface">{decision.decisionType} by {decision.authority}</p>
            <p className="mt-2 text-xs text-slate-500">Execution impact: {decision.executionImpact}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function EmergencyNoticeCard({ notice }) {
  return (
    <article className="rounded-lg border border-amber-300/20 bg-amber-950/15 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <GovernanceStatusBadge value={notice.severity} />
        <GovernanceStatusBadge value={notice.status} />
      </div>
      <h3 className="mt-3 text-base font-black text-amber-50">{notice.actionType}</h3>
      <p className="mt-2 text-sm leading-6 text-amber-50">{notice.reason}</p>
      <p className="mt-2 text-xs text-amber-100">Ratification: {notice.ratificationStatus ?? 'not required'}</p>
    </article>
  );
}

export function ProposalDetailPanel({ detail }) {
  const proposal = detail?.proposal;
  if (!proposal) return null;
  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest p-5">
      <div className="flex flex-wrap items-center gap-2">
        <GovernanceStatusBadge value={proposal.status} />
        <span className="rounded-md border border-white/10 px-2 py-1 text-xs font-bold text-slate-300">
          {proposal.proposalId}
        </span>
      </div>
      <h1 className="mt-4 text-2xl font-black text-on-surface">{proposal.title}</h1>
      <p className="mt-3 max-w-4xl text-sm leading-6 text-on-surface-variant">{proposal.summary}</p>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-white/5 bg-surface-container-high p-3">
          <div className="text-xs font-black uppercase text-slate-500">Review</div>
          <div className="mt-2 text-sm font-bold text-on-surface">{proposal.reviewStatus ?? 'none'}</div>
        </div>
        <div className="rounded-lg border border-white/5 bg-surface-container-high p-3">
          <div className="text-xs font-black uppercase text-slate-500">Decision</div>
          <div className="mt-2 text-sm font-bold text-on-surface">{proposal.decisionStatus ?? 'pending'}</div>
        </div>
        <div className="rounded-lg border border-white/5 bg-surface-container-high p-3">
          <div className="text-xs font-black uppercase text-slate-500">Execution intent</div>
          <div className="mt-2 text-sm font-bold text-on-surface">{proposal.executionIntentStatus}</div>
        </div>
      </div>
    </section>
  );
}
