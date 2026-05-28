import { CardShell } from '@/components/ui';

const maturities = ['mock', 'prototype', 'api-ready', 'production'];

export default function ModuleMaturitySummary({ moduleHealth }) {
  return (
    <CardShell
      title="Module Maturity"
      subtitle="Current frontend readiness by nucleus."
      scope="protocol"
      maturity="prototype"
      executionMode="read-only"
    >
      <div className="grid gap-3 md:grid-cols-4">
        {maturities.map((maturity) => (
          <div key={maturity} className="rounded-lg border border-white/10 bg-surface-container p-3">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-outline">{maturity}</p>
            <p className="mt-2 text-2xl font-black text-on-surface">{moduleHealth.maturityCounts[maturity] ?? 0}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {moduleHealth.modules.map((module) => (
          <span key={module.id} className="ax-meta-chip">
            {module.name}: {module.maturity}
          </span>
        ))}
      </div>
    </CardShell>
  );
}
