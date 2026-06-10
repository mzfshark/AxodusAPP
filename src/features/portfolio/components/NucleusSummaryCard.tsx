import { CardShell } from '@/components/ui';
import type { PortfolioNucleusSummary } from '../types';

type NucleusSummaryCardProps = {
  nucleus: PortfolioNucleusSummary;
};

export default function NucleusSummaryCard({ nucleus }: NucleusSummaryCardProps) {
  return (
    <CardShell
      title={nucleus.nucleus}
      subtitle="Portfolio registry nucleus summary"
      scope="protocol"
      maturity={nucleus.lLevel}
      executionMode="read-only"
      status={nucleus.dLevel}
    >
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-surface-container p-3">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-outline">Status</p>
          <p className="mt-2 text-sm font-black text-on-surface">{nucleus.status}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-container p-3">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-outline">Risk</p>
          <p className="mt-2 text-sm font-black text-on-surface">{nucleus.risk}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-container p-3">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-outline">Readiness</p>
          <p className="mt-2 text-sm font-black text-on-surface">{nucleus.readiness}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="ax-meta-chip">{nucleus.lLevel}</span>
        <span className="ax-meta-chip">{nucleus.dLevel}</span>
        <span className="ax-meta-chip">read-only</span>
      </div>
    </CardShell>
  );
}
