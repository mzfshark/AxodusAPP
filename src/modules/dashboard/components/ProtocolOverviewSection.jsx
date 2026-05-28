import { ContentGrid, SectionShell } from '@/components/layout';
import DashboardInfoCard from './DashboardInfoCard';
import ModuleMaturitySummary from './ModuleMaturitySummary';

export default function ProtocolOverviewSection({ data, moduleHealth }) {
  return (
    <SectionShell
      scope="protocol"
      title="Protocol Overview"
      description="Global Axodus ecosystem state, constitutional posture, ACS readiness and read-only treasury status."
    >
      <ContentGrid columns="four">
        {data.cards.map((card) => (
          <DashboardInfoCard key={card.id} card={card} scope="protocol" maturity="mock" executionMode="read-only" />
        ))}
      </ContentGrid>
      <ModuleMaturitySummary moduleHealth={moduleHealth} />
      <div className="grid gap-3 md:grid-cols-2">
        {data.warnings.map((warning) => (
          <div key={warning} className="rounded-lg border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
            {warning}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
