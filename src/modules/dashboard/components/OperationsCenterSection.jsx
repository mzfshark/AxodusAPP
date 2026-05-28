import { Link } from 'react-router-dom';
import { ContentGrid, SectionShell } from '@/components/layout';
import { CardShell } from '@/components/ui';
import DashboardInfoCard from './DashboardInfoCard';

export default function OperationsCenterSection({ data }) {
  return (
    <SectionShell
      scope="operator"
      title="Operations Center"
      description="ACS reviews, blocked actions, runtime safety and readiness signals. No execution is available from this dashboard."
    >
      <ContentGrid columns="three">
        {data.cards.map((card) => (
          <DashboardInfoCard key={card.id} card={card} scope="operator" maturity="prototype" executionMode="simulation" />
        ))}
      </ContentGrid>
      <CardShell
        title="Recommended Reviews"
        subtitle="Safe navigation actions only. No transfer, mint, trade, deploy or on-chain approval is triggered."
        scope="operator"
        maturity="prototype"
        executionMode="simulation"
      >
        <div className="flex flex-wrap gap-3">
          {data.recommendedActions.map((action) => (
            <Link key={action.id} to={action.route} className="rounded-lg border border-white/10 bg-surface-container px-3 py-2 text-sm font-black text-on-surface hover:border-primary">
              {action.label}
            </Link>
          ))}
        </div>
      </CardShell>
    </SectionShell>
  );
}
