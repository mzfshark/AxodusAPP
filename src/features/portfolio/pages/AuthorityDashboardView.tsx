import PageShell from '@/components/layout/PageShell';
import SectionShell from '@/components/layout/SectionShell';
import { CardShell } from '@/components/ui';
import AuthorityDashboard from '../components/AuthorityDashboard';
import { portfolioRegistryService } from '../portfolioRegistryService';

export default function AuthorityDashboardView() {
  const snapshot = portfolioRegistryService.getPortfolioSnapshot();
  const authorities = portfolioRegistryService.getExecutionAuthority();
  const nuclei = portfolioRegistryService.getNuclei();

  return (
    <PageShell
      title="Authority & Boundary Dashboard"
      subtitle="Read-only ecosystem authority, blocker and boundary visibility for Axodus."
      module="Portfolio"
      scope="protocol"
      maturity="L4 Readiness / D3"
      executionMode="read-only"
    >
      <SectionShell
        scope="protocol"
        title="Authority Dashboard"
        description="Answers who owns, who approves, who executes and what remains blocked or gated. This view grants no authority."
      >
        <AuthorityDashboard authorities={authorities} nuclei={nuclei} snapshot={snapshot} />
      </SectionShell>

      <SectionShell
        scope="protocol"
        title="Authority Boundary"
        description="The dashboard is a visibility layer only."
      >
        <CardShell
          title="This Dashboard Grants No Authority"
          subtitle="No execution boundary"
          scope="protocol"
          maturity="read-only"
          executionMode="disabled"
          status="authority disabled"
        >
          <div className="grid gap-3 md:grid-cols-4">
            <div className="rounded-lg border border-white/10 bg-surface-container p-4">
              <p className="text-sm font-black text-on-surface">Visibility only</p>
              <p className="mt-2 text-sm leading-6 text-outline">All authority data is display-only.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-4">
              <p className="text-sm font-black text-on-surface">No governance execution</p>
              <p className="mt-2 text-sm leading-6 text-outline">No proposal, vote, DAO mutation or executor path is enabled.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-4">
              <p className="text-sm font-black text-on-surface">No treasury execution</p>
              <p className="mt-2 text-sm leading-6 text-outline">No movement, custody, settlement, payout or exposure action is enabled.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-4">
              <p className="text-sm font-black text-on-surface">No production authority</p>
              <p className="mt-2 text-sm leading-6 text-outline">No production credentials, wallet signing or on-chain behavior is enabled.</p>
            </div>
          </div>
        </CardShell>
      </SectionShell>
    </PageShell>
  );
}
