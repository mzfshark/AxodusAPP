import { ContentGrid, SectionShell } from '@/components/layout';
import DashboardInfoCard from './DashboardInfoCard';

export default function MyAxodusSection({ data }) {
  const disconnected = !data.walletState.connected;

  return (
    <SectionShell
      scope="user"
      title="My Axodus"
      description="Connected wallet, learning progress, personal access and user-level mock activity."
    >
      {disconnected ? (
        <div className="rounded-lg border border-white/10 bg-surface-container p-4 text-sm leading-6 text-outline">
          Wallet is disconnected. Protocol overview remains public; user-specific data is shown as mock/read-only until a wallet is connected.
        </div>
      ) : null}
      <ContentGrid columns="three">
        {data.cards.map((card) => (
          <DashboardInfoCard key={card.id} card={card} scope="user" maturity="mock" executionMode="read-only" />
        ))}
      </ContentGrid>
    </SectionShell>
  );
}
