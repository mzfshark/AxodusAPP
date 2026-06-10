import ContentGrid from '@/components/layout/ContentGrid';
import { CardShell } from '@/components/ui';
import type { PortfolioNucleusSummary } from '../types';

type DistributionProps = {
  title: string;
  description: string;
  groups: Array<{
    level: string;
    nuclei: PortfolioNucleusSummary[];
  }>;
};

export default function PortfolioMaturityDistribution({
  title,
  description,
  groups,
}: DistributionProps) {
  return (
    <CardShell
      title={title}
      subtitle={description}
      scope="protocol"
      maturity="portfolio"
      executionMode="read-only"
      status="service-derived"
    >
      <ContentGrid columns="auto">
        {groups.map((group) => (
          <div key={group.level} className="rounded-lg border border-white/10 bg-surface-container p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-black uppercase tracking-[0.14em] text-outline">{group.level}</p>
              <span className="ax-meta-chip">{group.nuclei.length}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.nuclei.map((nucleus) => (
                <span key={nucleus.nucleus} className="ax-meta-chip">
                  {nucleus.nucleus}
                </span>
              ))}
            </div>
          </div>
        ))}
      </ContentGrid>
    </CardShell>
  );
}
