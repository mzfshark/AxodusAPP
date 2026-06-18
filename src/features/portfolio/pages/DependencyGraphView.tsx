import PageShell from '@/components/layout/PageShell';
import SectionShell from '@/components/layout/SectionShell';
import { CardShell } from '@/components/ui';
import DependencyGraph from '../components/DependencyGraph';
import { portfolioRegistryService } from '../portfolioRegistryService';

export default function DependencyGraphView() {
  const snapshot = portfolioRegistryService.getPortfolioSnapshot();
  const dependencies = portfolioRegistryService.getDependencies();
  const nuclei = portfolioRegistryService.getNuclei();

  return (
    <PageShell
      title="Dependency Graph"
      subtitle="Read-only dependency exploration for portfolio chains, blocking status, burden and ecosystem hubs."
      module="Portfolio"
      scope="protocol"
      maturity="L4 Readiness / D3"
      executionMode="read-only"
    >
      <SectionShell
        scope="protocol"
        title="Dependency Graph Viewer"
        description="Visualization layer over portfolio dependency intelligence. No dependency is resolved and no integration is executed."
      >
        <DependencyGraph dependencies={dependencies} nuclei={nuclei} snapshot={snapshot} />
      </SectionShell>

      <SectionShell
        scope="protocol"
        title="Dependency Boundary"
        description="The graph is a visibility layer only."
      >
        <CardShell
          title="Visualization Only"
          subtitle="No dependency execution boundary"
          scope="protocol"
          maturity="read-only"
          executionMode="disabled"
          status="no production behavior"
        >
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-surface-container p-4">
              <p className="text-sm font-black text-on-surface">No integration execution</p>
              <p className="mt-2 text-sm leading-6 text-outline">The viewer does not call APIs, adapters, workflows or backend integration paths.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-4">
              <p className="text-sm font-black text-on-surface">No dependency resolution</p>
              <p className="mt-2 text-sm leading-6 text-outline">Blocking dependencies remain unresolved and owner gates are not changed.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-4">
              <p className="text-sm font-black text-on-surface">Execution Disabled</p>
              <p className="mt-2 text-sm leading-6 text-outline">No authority is granted by this graph viewer.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-4">
              <p className="text-sm font-black text-on-surface">No production behavior</p>
              <p className="mt-2 text-sm leading-6 text-outline">No production readiness, credentials, settlement, payout, trading or on-chain behavior is enabled.</p>
            </div>
          </div>
        </CardShell>
      </SectionShell>
    </PageShell>
  );
}
