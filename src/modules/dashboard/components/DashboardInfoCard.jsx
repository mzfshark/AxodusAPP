import { Link } from 'react-router-dom';
import { CardShell } from '@/components/ui';

export default function DashboardInfoCard({ card, scope, maturity = 'mock', executionMode = 'read-only' }) {
  return (
    <CardShell
      title={card.title}
      scope={scope}
      maturity={maturity}
      executionMode={executionMode}
      status={card.status}
    >
      <p className="text-2xl font-black text-on-surface">{card.value}</p>
      <p className="mt-2 text-sm leading-6 text-outline">{card.detail}</p>
      {card.route ? (
        <Link to={card.route} className="mt-5 inline-flex rounded-lg border border-white/10 bg-surface-container px-3 py-2 text-sm font-black text-on-surface hover:border-primary">
          View details
        </Link>
      ) : null}
    </CardShell>
  );
}
