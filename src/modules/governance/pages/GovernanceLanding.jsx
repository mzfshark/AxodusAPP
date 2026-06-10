import { Link } from 'react-router-dom';
import ConstitutionalLayerPanel from '../components/ConstitutionalLayerPanel';
import { FeaturedTenantCard, GovernanceStatusCard, MetricSummaryCard } from '../components/cards';
import { useChainRegistry } from '../hooks/useChainRegistry';
import { governanceTenantsMock } from '@/data/mock';
import { ScopeSection } from '@/components/uiScope';
import { GovernanceReadOnlyOverviewPanel } from '../readOnly';

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    notation: value >= 1000000 ? 'compact' : 'standard',
  }).format(value ?? 0);
}

function formatPercent(value) {
  return `${Number(value ?? 0).toFixed(2)}%`;
}

export default function GovernanceLanding() {
  const { chains, summary, source } = useChainRegistry();
  const { tenants, coreMetrics, federationStats, treasuryMetrics, governanceMetrics } = governanceTenantsMock;
  const executionChain = chains.find((chain) => chain.roles?.includes('execution'));
  const featuredTenants = tenants
    .filter((tenant) => tenant.featured)
    .sort((a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999))
    .slice(0, 3);

  return (
    <main className="min-h-full bg-background p-4 md:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="rounded-lg border border-cyan-300/15 bg-surface-container-highest p-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Governance Overview</span>
              <h1 className="mt-3 max-w-4xl text-3xl font-black tracking-tight text-on-surface md:text-4xl">
                Executive summary of Axodus federated governance.
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-on-surface-variant">
                A compact operating snapshot for DAO tenants, CORE baseline, proposal activity, treasury footprint and constitutional standing.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/governance/tenants" className="rounded-lg bg-primary px-4 py-2 text-sm font-black text-on-primary">
                Browse DAO Tenants
              </Link>
              <Link to="/governance/console" className="rounded-lg border border-white/10 px-4 py-2 text-sm font-black text-on-surface">
                Open Console
              </Link>
            </div>
          </div>
        </section>

        <ScopeSection
          scope="protocol"
          title="Protocol governance state"
          description="Constitutional standing, federation metrics and chain registry data apply to Axodus as a protocol, not to a single wallet or tenant."
        >
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            <MetricSummaryCard label="Total TVL" value={formatCurrency(treasuryMetrics.totalTreasuryTvl)} detail="CORE + tenant treasury footprint" tone="success" />
            <MetricSummaryCard label="DAO Tenants" value={federationStats.tenantCount} detail="Federated economic organizations" />
            <MetricSummaryCard label="Axodus CORE APR" value={formatPercent(coreMetrics.apr)} detail="Federal baseline" tone="success" />
            <MetricSummaryCard label="Open Proposals" value={governanceMetrics.openProposals} detail="Active governance actions" tone="warning" />
            <MetricSummaryCard label="Recently Finalized" value={governanceMetrics.recentlyFinalizedProposals} detail="Recent proposal outcomes" />
          </section>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <GovernanceStatusCard label="Federal Treasury Status" value={coreMetrics.treasuryHealth} detail="Rendered from mock registry state" severity="warning" />
            <GovernanceStatusCard label="Active Chains" value={summary.totalChains} detail={`Execution source: ${executionChain?.name ?? 'pending'}`} severity="info" />
            <GovernanceStatusCard label="Governance Health" value={governanceMetrics.governanceHealth} detail={`Registry source: ${source}`} severity="success" />
            <GovernanceStatusCard label="Constitutional Standing" value={coreMetrics.governanceStatus} detail="Federal DAO standing" severity="success" />
          </section>
        </ScopeSection>

        <ScopeSection
          scope="tenant"
          title="Featured DAO tenants"
          description="Tenant previews represent federated organizations, not the protocol root."
          actions={<Link to="/governance/tenants" className="rounded-lg border border-white/10 px-3 py-2 text-sm font-black text-on-surface">View all tenants</Link>}
        >
        <section className="rounded-lg border border-white/5 bg-surface-container-highest p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Featured</span>
              <h2 className="mt-2 text-2xl font-black text-on-surface">Featured DAO Tenants</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-on-surface-variant">
                Preview of up to three tenants selected by mock/admin data. Full discovery and filters live in DAO Tenants.
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {featuredTenants.map((tenant) => (
              <FeaturedTenantCard key={tenant.id} tenant={tenant} coreApr={coreMetrics.apr} />
            ))}
          </div>
        </section>
        </ScopeSection>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-lg border border-white/5 bg-surface-container-highest p-5">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Federation Snapshot</span>
            <h2 className="mt-2 text-xl font-black text-on-surface">Overview only</h2>
            <p className="mt-3 text-sm leading-6 text-on-surface-variant">
              The Overview stays intentionally synthetic. Tenant discovery, filtering and detailed strategy evaluation are separated into dedicated pages.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <MetricSummaryCard label="Average Tenant APR" value={formatPercent(federationStats.averageTenantApr)} detail="Mock tenant set" />
              <MetricSummaryCard label="Tenant TVL" value={formatCurrency(treasuryMetrics.tenantTreasuryTvl)} detail="Across discoverable tenants" />
            </div>
          </section>
          <ConstitutionalLayerPanel chain={executionChain} />
        </section>

        <ScopeSection
          scope="tenant"
          title="Read-only Governance backend foundation"
          description="Local mock read-model rendering for the selected tenant. This is not a backend API integration and cannot mutate Governance state."
        >
          <GovernanceReadOnlyOverviewPanel />
        </ScopeSection>
      </div>
    </main>
  );
}
