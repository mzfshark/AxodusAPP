import PageShell from '@/components/layout/PageShell';
import SectionShell from '@/components/layout/SectionShell';
import { CardShell } from '@/components/ui';
import OpportunityRegistry from '../components/OpportunityRegistry';
import { portfolioRegistryService } from '../portfolioRegistryService';

export default function OpportunityRegistryView() {
  const snapshot = portfolioRegistryService.getPortfolioSnapshot();
  const opportunities = portfolioRegistryService.getOpportunities();
  const dependencies = portfolioRegistryService.getDependencies();
  const nuclei = portfolioRegistryService.getNuclei();

  return (
    <PageShell
      title="Opportunity Registry"
      subtitle="Read-only product intelligence for official Axodus portfolio opportunities."
      module="Portfolio"
      scope="protocol"
      maturity="L4 Readiness / D3"
      executionMode="read-only"
    >
      <SectionShell
        scope="protocol"
        title="Opportunity Registry Viewer"
        description="Portfolio opportunity intelligence from the registry service. Filtering is client-side only and does not request approvals, promotions or workflow execution."
      >
        <OpportunityRegistry
          opportunities={opportunities}
          dependencies={dependencies}
          nuclei={nuclei}
          snapshot={snapshot}
        />
      </SectionShell>

      <SectionShell
        scope="protocol"
        title="Opportunity Boundary"
        description="The opportunity registry viewer is visibility only."
      >
        <CardShell
          title="Viewing Opportunity Intelligence Only"
          subtitle="No authority boundary"
          scope="protocol"
          maturity="read-only"
          executionMode="disabled"
          status="authority disabled"
        >
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-surface-container p-4">
              <p className="text-sm font-black text-on-surface">No approval authority</p>
              <p className="mt-2 text-sm leading-6 text-outline">No opportunity can be approved from this view.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-4">
              <p className="text-sm font-black text-on-surface">No promotion authority</p>
              <p className="mt-2 text-sm leading-6 text-outline">No opportunity can be promoted or advanced from AxodusAPP.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-4">
              <p className="text-sm font-black text-on-surface">No execution authority</p>
              <p className="mt-2 text-sm leading-6 text-outline">No workflow, wallet, treasury, trading, settlement, payout or on-chain behavior is enabled.</p>
            </div>
          </div>
        </CardShell>
      </SectionShell>
    </PageShell>
  );
}
