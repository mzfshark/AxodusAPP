import { Link } from 'react-router-dom';
import { APRComparisonBadge, FederationStatusBadge, RiskIndicator } from '../TenantDiscoveryCards';

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

function MiniMetric({ label, value, detail, tone = 'neutral' }) {
  const toneClass =
    tone === 'positive'
      ? 'border-emerald-300/20 bg-emerald-950/10'
      : tone === 'warning'
        ? 'border-amber-300/20 bg-amber-950/10'
        : tone === 'critical'
          ? 'border-rose-300/20 bg-rose-950/10'
          : 'border-white/5 bg-surface-container-high';

  return (
    <div className={`rounded-md border p-3 ${toneClass}`}>
      <div className="text-[10px] font-black uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 font-mono text-sm font-black text-on-surface">{value}</div>
      {detail ? <div className="mt-1 text-[11px] leading-4 text-on-surface-variant">{detail}</div> : null}
    </div>
  );
}

export function MetricSummaryCard({ label, value, detail, tone = 'neutral' }) {
  const accentClass =
    tone === 'success'
      ? 'from-emerald-300/70'
      : tone === 'warning'
        ? 'from-amber-300/70'
        : tone === 'critical'
          ? 'from-rose-300/70'
          : 'from-cyan-300/70';

  return (
    <article className="glass-card relative overflow-hidden rounded-lg p-4 shadow-axodus">
      <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${accentClass} to-transparent`} />
      <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className="mt-2 font-mono text-2xl font-black tracking-tight text-on-surface">{value}</div>
      <div className="mt-1 min-h-[2rem] text-xs leading-5 text-on-surface-variant">{detail}</div>
    </article>
  );
}

export function GovernanceStatusCard({ label, value, detail, severity = 'info' }) {
  const severityClass =
    severity === 'critical'
      ? 'border-rose-300/25 bg-rose-950/10 text-rose-100'
      : severity === 'warning'
        ? 'border-amber-300/25 bg-amber-950/10 text-amber-100'
        : severity === 'success'
          ? 'border-emerald-300/25 bg-emerald-950/10 text-emerald-100'
          : 'border-cyan-300/25 bg-cyan-950/10 text-cyan-100';

  return (
    <article className="rounded-lg border border-white/5 bg-surface-container-highest p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{label}</div>
          <div className="mt-2 text-base font-black text-on-surface">{value}</div>
        </div>
        <span className={`rounded-md border px-2 py-1 text-[10px] font-black uppercase ${severityClass}`}>{severity}</span>
      </div>
      <p className="mt-3 text-xs leading-5 text-on-surface-variant">{detail}</p>
    </article>
  );
}

export function APRComparisonCard({ tenantApr, coreApr, label = 'APR vs CORE' }) {
  const delta = Number(tenantApr ?? 0) - Number(coreApr ?? 0);
  const tone = delta > 0 ? 'positive' : delta < 0 ? 'warning' : 'neutral';

  return (
    <MiniMetric
      label={label}
      value={`${delta > 0 ? '+' : ''}${formatPercent(delta)}`}
      detail={delta > 0 ? 'Above CORE baseline' : delta < 0 ? 'Below CORE baseline' : 'Matches CORE baseline'}
      tone={tone}
    />
  );
}

export function FeaturedTenantCard({ tenant, coreApr }) {
  return (
    <article className="glass-card relative flex h-full flex-col overflow-hidden rounded-lg border-cyan-300/20 shadow-axodus">
      <div className="primary-gradient px-5 py-3 text-on-primary">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-xs font-black uppercase">{tenant.symbol}</span>
          <span className="rounded-md border border-white/30 bg-white/10 px-2 py-1 text-[10px] font-black uppercase">Featured</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-on-surface">{tenant.name}</h3>
            <p className="mt-1 text-xs font-bold text-on-surface-variant">{tenant.category}</p>
          </div>
          <RiskIndicator riskLevel={tenant.riskLevel} />
        </div>
        <p className="mt-4 min-h-[72px] text-sm leading-6 text-on-surface-variant">{tenant.description}</p>
        <div className="mt-4">
          <APRComparisonBadge tenantApr={tenant.apr} coreApr={coreApr} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <MiniMetric label="APR" value={formatPercent(tenant.apr)} detail="Tenant strategy" tone={tenant.apr >= coreApr ? 'positive' : 'warning'} />
          <MiniMetric label="TVL" value={formatCurrency(tenant.tvl)} detail="Tenant treasury" />
          <APRComparisonCard tenantApr={tenant.apr} coreApr={coreApr} />
          <MiniMetric label="Risk" value={tenant.riskLevel} detail={tenant.governanceStatus} tone={tenant.riskLevel === 'high' ? 'warning' : 'neutral'} />
        </div>
        <Link to={tenant.route} className="mt-5 block rounded-lg bg-primary px-3 py-2 text-center text-sm font-black text-on-primary">
          View DAO
        </Link>
      </div>
    </article>
  );
}

export function TenantDiscoveryCard({ tenant, coreApr }) {
  return (
    <article className="rounded-lg border border-white/5 bg-surface-container-highest">
      <div className="grid gap-0 lg:grid-cols-[1.1fr_1.2fr_auto]">
        <div className="border-b border-white/5 p-5 lg:border-b-0 lg:border-r">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] font-black uppercase text-cyan-200">{tenant.symbol}</span>
            {tenant.featured ? (
              <span className="rounded-md border border-cyan-300/20 bg-cyan-950/20 px-2 py-1 text-[10px] font-black uppercase text-cyan-100">Featured</span>
            ) : null}
          </div>
          <h2 className="mt-2 text-xl font-black text-on-surface">{tenant.name}</h2>
          <p className="mt-1 text-xs font-bold text-on-surface-variant">{tenant.category}</p>
          <p className="mt-3 text-sm leading-6 text-on-surface-variant">{tenant.description}</p>
        </div>

        <div className="grid gap-3 p-5 md:grid-cols-3">
          <MiniMetric label="APR" value={formatPercent(tenant.apr)} detail="Tenant rate" tone={tenant.apr >= coreApr ? 'positive' : 'warning'} />
          <APRComparisonCard tenantApr={tenant.apr} coreApr={coreApr} />
          <MiniMetric label="TVL" value={formatCurrency(tenant.tvl)} detail={`${tenant.members.toLocaleString('en-US')} members`} />
          <div className="rounded-md border border-white/5 bg-surface-container-high p-3 md:col-span-2">
            <div className="text-[10px] font-black uppercase text-slate-500">Investment types</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {tenant.investmentTypes.map((type) => (
                <span key={type} className="rounded-md border border-white/10 px-2 py-1 text-[11px] font-bold text-slate-300">
                  {type}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-md border border-white/5 bg-surface-container-high p-3">
            <div className="text-[10px] font-black uppercase text-slate-500">Chains</div>
            <div className="mt-2 font-mono text-[11px] leading-5 text-on-surface-variant">{tenant.chains.join(' / ')}</div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-white/5 p-5 lg:min-w-[190px] lg:border-l lg:border-t-0">
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <RiskIndicator riskLevel={tenant.riskLevel} />
            <FederationStatusBadge status={tenant.governanceStatus} tier={tenant.federationTier} />
          </div>
          <Link to={tenant.route} className="rounded-lg border border-white/10 bg-surface-container-high px-4 py-2 text-center text-sm font-black text-on-surface">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export function UserTenantPositionCard({ tenant, allocation, coreApr }) {
  return (
    <article className="rounded-lg border border-cyan-300/15 bg-surface-container-highest p-5 shadow-axodus">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="font-mono text-[11px] font-black uppercase text-cyan-200">{tenant.symbol}</div>
          <h3 className="mt-2 text-lg font-black text-on-surface">{tenant.name}</h3>
          <p className="mt-1 text-xs text-on-surface-variant">{allocation.recentDaoActivity}</p>
        </div>
        <APRComparisonBadge tenantApr={tenant.apr} coreApr={coreApr} />
      </div>
      <div className="mt-4 grid gap-2 md:grid-cols-5">
        <MiniMetric label="Allocated" value={formatCurrency(allocation.allocatedCapital)} detail="Capital" />
        <MiniMetric label="PnL" value={formatCurrency(allocation.pnl)} detail="Position" tone={allocation.pnl >= 0 ? 'positive' : 'warning'} />
        <MiniMetric label="Rewards" value={formatCurrency(allocation.rewards)} detail="Accrued" tone="positive" />
        <MiniMetric label="Share" value={formatRatioAsPercent(allocation.daoSharePercent, 2)} detail="DAO stake" />
        <MiniMetric label="Voting Power" value={allocation.votingPower} detail={allocation.governanceRights} />
      </div>
      <div className="mt-4 rounded-md border border-white/5 bg-surface-container-high p-3">
        <div className="text-[10px] font-black uppercase text-slate-500">Treasury exposure</div>
        <div className="mt-1 text-sm font-bold text-on-surface">{allocation.treasuryExposure}</div>
      </div>
    </article>
  );
}
