function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    notation: value >= 1000000 ? 'compact' : 'standard',
  }).format(value ?? 0);
}

function formatPercent(value, digits = 2) {
  return `${Number(value ?? 0).toFixed(digits)}%`;
}

function formatRatioAsPercent(value, digits = 2) {
  return formatPercent(Number(value ?? 0) * 100, digits);
}

function aprDifference(tenantApr, coreApr) {
  return Number(tenantApr ?? 0) - Number(coreApr ?? 0);
}

export function APRComparisonBadge({ tenantApr, coreApr }) {
  const difference = aprDifference(tenantApr, coreApr);
  const positive = difference >= 0;

  return (
    <span
      className={`rounded-md border px-2 py-1 font-mono text-[11px] font-black ${
        positive ? 'border-emerald-300/20 bg-emerald-950/20 text-emerald-100' : 'border-amber-300/20 bg-amber-950/20 text-amber-100'
      }`}
    >
      {positive ? '+' : ''}
      {formatPercent(difference)} {positive ? 'above' : 'below'} CORE APR
    </span>
  );
}

export function FederationStatusBadge({ status, tier }) {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="rounded-md border border-cyan-300/20 bg-cyan-950/20 px-2 py-1 text-[11px] font-black uppercase text-cyan-100">
        {tier}
      </span>
      <span className="rounded-md border border-emerald-300/20 bg-emerald-950/20 px-2 py-1 text-[11px] font-black uppercase text-emerald-100">
        {status}
      </span>
    </div>
  );
}

export function RiskIndicator({ riskLevel }) {
  const tone =
    riskLevel === 'high'
      ? 'border-rose-300/20 bg-rose-950/20 text-rose-100'
      : riskLevel === 'medium'
        ? 'border-amber-300/20 bg-amber-950/20 text-amber-100'
        : 'border-emerald-300/20 bg-emerald-950/20 text-emerald-100';

  return <span className={`rounded-md border px-2 py-1 text-[11px] font-black uppercase ${tone}`}>{riskLevel} risk</span>;
}

function TenantMetric({ label, value, mono = false }) {
  return (
    <div className="rounded-md bg-surface-container-high p-3">
      <div className="text-[10px] font-black uppercase text-slate-500">{label}</div>
      <div className={`mt-1 text-sm font-black text-on-surface ${mono ? 'font-mono' : ''}`}>{value}</div>
    </div>
  );
}

export function TenantCard({ tenant, coreApr }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-white/5 bg-surface-container-highest p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-[11px] font-black uppercase text-cyan-200">{tenant.symbol}</div>
          <h3 className="mt-2 text-lg font-black text-on-surface">{tenant.name}</h3>
          <div className="mt-1 text-xs font-bold text-on-surface-variant">{tenant.category}</div>
        </div>
        <RiskIndicator riskLevel={tenant.riskLevel} />
      </div>

      <p className="mt-4 min-h-[72px] text-sm leading-6 text-on-surface-variant">{tenant.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <FederationStatusBadge status={tenant.governanceStatus} tier={tenant.federationTier} />
        <APRComparisonBadge tenantApr={tenant.apr} coreApr={coreApr} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <TenantMetric label="DAO APR" value={formatPercent(tenant.apr)} mono />
        <TenantMetric label="Treasury TVL" value={formatCurrency(tenant.treasuryTvl)} mono />
        <TenantMetric label="Members" value={tenant.members.toLocaleString('en-US')} mono />
        <TenantMetric label="Trend" value={tenant.performanceTrend} mono />
      </div>

      <div className="mt-4">
        <div className="text-[10px] font-black uppercase text-slate-500">Supported products</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {tenant.supportedProducts.map((product) => (
            <span key={product} className="rounded-md border border-white/10 px-2 py-1 text-[11px] font-bold text-slate-300">
              {product}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-[10px] font-black uppercase text-slate-500">Chains</div>
        <div className="mt-2 font-mono text-[11px] leading-5 text-on-surface-variant">{tenant.chains.join(' / ')}</div>
      </div>

      <div className="mt-auto pt-5">
        <Link
          to={`/governance/dao/${encodeURIComponent(tenant.id)}`}
          className="block w-full rounded-lg border border-white/10 bg-surface-container-high px-3 py-2 text-center text-sm font-black text-on-surface"
          aria-label={`View ${tenant.name} tenant details`}
        >
          View DAO Tenant
        </Link>
      </div>
    </article>
  );
}

export function DAOAllocationCard({ tenant, allocation, coreApr }) {
  return (
    <article className="rounded-lg border border-cyan-300/15 bg-surface-container-highest p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="font-mono text-[11px] font-black uppercase text-cyan-200">{tenant.symbol}</div>
          <h3 className="mt-2 text-lg font-black text-on-surface">{tenant.name}</h3>
          <p className="mt-1 text-xs text-on-surface-variant">{allocation.recentDaoActivity}</p>
        </div>
        <APRComparisonBadge tenantApr={tenant.apr} coreApr={coreApr} />
      </div>
      <div className="mt-4 grid gap-2 md:grid-cols-4">
        <TenantMetric label="Allocated capital" value={formatCurrency(allocation.allocatedCapital)} mono />
        <TenantMetric label="DAO share" value={formatRatioAsPercent(allocation.daoSharePercent, 2)} mono />
        <TenantMetric label="Rewards" value={formatCurrency(allocation.rewards)} mono />
        <TenantMetric label="PnL" value={formatCurrency(allocation.pnl)} mono />
      </div>
      <div className="mt-4 grid gap-2 md:grid-cols-3">
        <TenantMetric label="Governance rights" value={allocation.governanceRights} />
        <TenantMetric label="Voting power" value={allocation.votingPower} mono />
        <TenantMetric label="Treasury exposure" value={allocation.treasuryExposure} />
      </div>
    </article>
  );
}

export function TenantTreasuryWidget({ coreMetrics, treasuryMetrics }) {
  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Axodus CORE baseline</span>
          <h2 className="mt-2 text-2xl font-black text-on-surface">{coreMetrics.name}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-on-surface-variant">{coreMetrics.description}</p>
        </div>
        <APRComparisonBadge tenantApr={coreMetrics.apr} coreApr={coreMetrics.apr} />
      </div>
      <div className="mt-5 grid gap-2 md:grid-cols-4">
        <TenantMetric label="CORE APR" value={formatPercent(coreMetrics.apr)} mono />
        <TenantMetric label="CORE Treasury" value={formatCurrency(coreMetrics.treasuryTvl)} mono />
        <TenantMetric label="Tenant Treasury" value={formatCurrency(treasuryMetrics.tenantTreasuryTvl)} mono />
        <TenantMetric label="Total Treasury" value={formatCurrency(treasuryMetrics.totalTreasuryTvl)} mono />
      </div>
    </section>
  );
}
import { Link } from 'react-router-dom';
