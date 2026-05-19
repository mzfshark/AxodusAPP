import BbaBadge from './BbaBadge';

export default function AcsWorkflowPanel({ workflows }) {
  return (
    <section className="rounded-lg border border-white/10 bg-surface-container-low p-6">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-on-surface">ACS Workflow Visibility</h2>
        <p className="mt-1 text-sm text-outline">Embedded workflow observability only. ACS execution remains outside the BBA MVP.</p>
      </div>
      <div className="space-y-3">
        {workflows.map((workflow) => (
          <article key={workflow.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{workflow.phase}</p>
                <h3 className="mt-1 font-bold text-on-surface">{workflow.title}</h3>
                <p className="mt-1 text-sm text-outline">Agents: {workflow.assignedAgents.join(', ')}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <BbaBadge value={workflow.governanceStatus} />
                <BbaBadge value={workflow.operationalRisk} label="Risk" />
              </div>
            </div>
            {workflow.blockers.length > 0 && (
              <p className="mt-3 rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm text-red-100">
                Blocker: {workflow.blockers.join(', ')}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
