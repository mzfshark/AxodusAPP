import { CardShell } from '@/components/ui';

export default function GovernanceProposalStateSummary({ proposals }) {
  const countEntries = Object.entries(proposals.counts ?? {});

  return (
    <CardShell
      title="Proposal State Summary"
      subtitle="Proposal lifecycle state is shown separately from readiness and ACS review state."
      scope="tenant"
      maturity="prototype"
      executionMode="executable-disabled"
      status={`${proposals.total} visible`}
    >
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {countEntries.length ? (
          countEntries.map(([status, count]) => (
            <div key={status} className="rounded-lg border border-white/5 bg-surface-container-high p-3">
              <p className="text-[10px] font-black uppercase text-slate-500">{status}</p>
              <p className="mt-1 text-xl font-black text-on-surface">{count}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-outline">No proposals are visible for this tenant context.</p>
        )}
      </div>

      {proposals.items.length ? (
        <div className="mt-4 overflow-hidden rounded-lg border border-white/5">
          {proposals.items.map((proposal) => (
            <div key={proposal.id} className="grid gap-3 border-b border-white/5 p-3 text-sm last:border-b-0 md:grid-cols-[1fr_0.5fr_0.5fr_0.5fr]">
              <div>
                <p className="font-bold text-on-surface">{proposal.title}</p>
                <p className="text-xs text-outline">{proposal.owner} · {proposal.category}</p>
              </div>
              <Meta label="Status" value={proposal.status} />
              <Meta label="Readiness" value={proposal.readiness} />
              <Meta label="Execution" value={proposal.executionMode} />
            </div>
          ))}
        </div>
      ) : null}
    </CardShell>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase text-slate-500">{label}</p>
      <p className="mt-1 font-bold text-on-surface">{value}</p>
    </div>
  );
}
