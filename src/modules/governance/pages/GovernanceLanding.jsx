import { Link } from 'react-router-dom';
import ConstitutionalLayerPanel from '../components/ConstitutionalLayerPanel';
import { APRComparisonBadge, RiskIndicator } from '../components/TenantDiscoveryCards';
import { useChainRegistry } from '../hooks/useChainRegistry';
import { governanceTenantsMock } from '@/data/mock';

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

function OverviewMetric({ label, value, detail }) {
  return (
    <div className="rounded-lg border border-white/5 bg-surface-container-highest p-5">
      <div className="text-xs font-black uppercase tracking-wider text-slate-500">{label}</div>
      <div className="mt-3 text-3xl font-black text-on-surface">{value}</div>
      <div className="mt-2 text-xs leading-5 text-on-surface-variant">{detail}</div>
    </div>
  );
}

function FeaturedTenantPreview({ tenant, coreApr }) {
  return (
    <article className="rounded-lg border border-white/5 bg-surface-container-highest p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-[11px] font-black uppercase text-cyan-200">{tenant.symbol}</div>
          <h3 className="mt-2 text-lg font-black text-on-surface">{tenant.name}</h3>
          <p className="mt-1 text-xs font-bold text-on-surface-variant">{tenant.category}</p>
        </div>
        <RiskIndicator riskLevel={tenant.riskLevel} />
      </div>
      <p className="mt-4 min-h-[72px] text-sm leading-6 text-on-surface-variant">{tenant.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <APRComparisonBadge tenantApr={tenant.apr} coreApr={coreApr} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <OverviewMetric label="APR" value={formatPercent(tenant.apr)} detail="Tenant strategy" />
        <OverviewMetric label="TVL" value={formatCurrency(tenant.tvl)} detail="Tenant treasury" />
      </div>
      <Link
        to={tenant.route}
        className="mt-5 block rounded-lg border border-white/10 bg-surface-container-high px-3 py-2 text-center text-sm font-black text-on-surface"
      >
        View DAO
      </Link>
    </article>
  );
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

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          <OverviewMetric label="Total TVL" value={formatCurrency(treasuryMetrics.totalTreasuryTvl)} detail="CORE + tenant treasury footprint" />
          <OverviewMetric label="DAO Tenants" value={federationStats.tenantCount} detail="Federated economic organizations" />
          <OverviewMetric label="Axodus CORE APR" value={formatPercent(coreMetrics.apr)} detail="Federal baseline" />
          <OverviewMetric label="Open Proposals" value={governanceMetrics.openProposals} detail="Active governance actions" />
          <OverviewMetric label="Recently Finalized" value={governanceMetrics.recentlyFinalizedProposals} detail="Recent proposal outcomes" />
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <OverviewMetric label="Federal Treasury Status" value={coreMetrics.treasuryHealth} detail="Rendered from mock registry state" />
          <OverviewMetric label="Active Chains" value={summary.totalChains} detail={`Execution source: ${executionChain?.name ?? 'pending'}`} />
          <OverviewMetric label="Governance Health" value={governanceMetrics.governanceHealth} detail={`Registry source: ${source}`} />
          <OverviewMetric label="Constitutional Standing" value={coreMetrics.governanceStatus} detail="Federal DAO standing" />
        </section>

        <section className="rounded-lg border border-white/5 bg-surface-container-highest p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Featured</span>
              <h2 className="mt-2 text-2xl font-black text-on-surface">Featured DAO Tenants</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-on-surface-variant">
                Preview of up to three tenants selected by mock/admin data. Full discovery and filters live in DAO Tenants.
              </p>
            </div>
            <Link to="/governance/tenants" className="rounded-lg border border-white/10 px-3 py-2 text-sm font-black text-on-surface">
              View all tenants
            </Link>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {featuredTenants.map((tenant) => (
              <FeaturedTenantPreview key={tenant.id} tenant={tenant} coreApr={coreMetrics.apr} />
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-lg border border-white/5 bg-surface-container-highest p-5">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Federation Snapshot</span>
            <h2 className="mt-2 text-xl font-black text-on-surface">Overview only</h2>
            <p className="mt-3 text-sm leading-6 text-on-surface-variant">
              The Overview stays intentionally synthetic. Tenant discovery, filtering and detailed strategy evaluation are separated into dedicated pages.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <OverviewMetric label="Average Tenant APR" value={formatPercent(federationStats.averageTenantApr)} detail="Mock tenant set" />
              <OverviewMetric label="Tenant TVL" value={formatCurrency(treasuryMetrics.tenantTreasuryTvl)} detail="Across discoverable tenants" />
            </div>
          </section>
          <ConstitutionalLayerPanel chain={executionChain} />
        </section>
      </div>
    </main>
  );
}
