import { CardShell } from '@/components/ui';

export default function GovernanceReadinessPanel({ readiness }) {
  return (
    <CardShell
      title="Governance Readiness"
      subtitle="Readiness indicates review state only. It is not an execution permission."
      scope="operator"
      maturity="prototype"
      executionMode={readiness.executionMode}
      status={readiness.label}
    >
      <div className="grid gap-3 md:grid-cols-[180px_1fr]">
        <div className="rounded-lg border border-white/5 bg-surface-container-high p-4">
          <p className="text-[10px] font-black uppercase text-slate-500">Readiness score</p>
          <p className="mt-2 text-4xl font-black text-on-surface">{readiness.score}%</p>
          <p className="mt-2 text-sm text-outline">{readiness.label}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <List title="Blockers" items={readiness.blockers} empty="No blockers visible." />
          <List title="Warnings" items={readiness.warnings} empty="No warnings visible." />
          <List title="Missing approvals" items={readiness.missingApprovals} empty="No missing approvals visible." />
        </div>
      </div>
      <div className="mt-4 rounded-lg border border-white/5 bg-surface-container-high p-3">
        <p className="text-[10px] font-black uppercase text-slate-500">Dependencies</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {readiness.dependencies.map((dependency) => <span key={dependency} className="ax-meta-chip">{dependency}</span>)}
        </div>
      </div>
    </CardShell>
  );
}

function List({ title, items, empty }) {
  return (
    <div className="rounded-lg border border-white/5 bg-surface-container-high p-3">
      <p className="text-[10px] font-black uppercase text-slate-500">{title}</p>
      {items.length ? (
        <ul className="mt-2 space-y-2 text-xs leading-5 text-outline">
          {items.map((item) => <li key={item}>- {item}</li>)}
        </ul>
      ) : (
        <p className="mt-2 text-xs text-outline">{empty}</p>
      )}
    </div>
  );
}
