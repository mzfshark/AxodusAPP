import { Link, useParams } from 'react-router-dom';
import { governanceTenantsMock } from '@/data/mock';
import { APRComparisonBadge, FederationStatusBadge, RiskIndicator } from '../components/TenantDiscoveryCards';

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

function DetailMetric({ label, value, detail }) {
  return (
    <div className="rounded-lg border border-white/5 bg-surface-container-high p-4">
      <div className="text-[10px] font-black uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-2 text-xl font-black text-on-surface">{value}</div>
      {detail ? <div className="mt-1 text-xs leading-5 text-on-surface-variant">{detail}</div> : null}
    </div>
  );
}

function DetailPanel({ title, eyebrow, children }) {
  return (
    <section className="rounded-lg border border-white/5 bg-surface-container-highest p-5">
      {eyebrow ? <div className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">{eyebrow}</div> : null}
      <h2 className={eyebrow ? 'mt-2 text-lg font-black text-on-surface' : 'text-lg font-black text-on-surface'}>{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function ListPills({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {(items ?? []).map((item) => (
        <span key={item} className="rounded-md border border-white/10 px-2 py-1 text-[11px] font-bold text-slate-300">
          {item}
        </span>
      ))}
    </div>
  );
}

function AllocationBreakdown({ items }) {
  return (
    <div className="space-y-3">
      {(items ?? []).map((item) => (
        <div key={item.label}>
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="font-bold text-on-surface">{item.label}</span>
            <span className="font-mono text-on-surface-variant">{item.value}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-container">
            <div className="h-full rounded-full bg-primary" style={{ width: `${item.value}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function NotFoundState({ tenantId }) {
  return (
    <main className="min-h-full bg-background p-4 md:p-8">
      <section className="mx-auto max-w-3xl rounded-lg border border-white/5 bg-surface-container-highest p-8 text-center">
        <span className="material-symbols-outlined text-cyan-200">domain_disabled</span>
        <h1 className="mt-4 text-2xl font-black text-on-surface">DAO Tenant not found</h1>
        <p className="mt-3 text-sm leading-6 text-on-surface-variant">
          The tenant id <span className="font-mono text-on-surface">{tenantId}</span> is not available in the current mock registry source.
        </p>
        <Link to="/governance" className="mt-6 inline-flex rounded-lg border border-white/10 px-4 py-2 text-sm font-black text-on-surface">
          Back to Governance
        </Link>
      </section>
    </main>
  );
}

export default function DaoTenantDetail() {
  const { daoId } = useParams();
  const { tenants, coreMetrics, tenantPerformance } = governanceTenantsMock;
  const tenant = tenants.find((item) => item.id === daoId || item.daoId === daoId || item.symbol?.toLowerCase() === daoId?.toLowerCase());

  if (!tenant) {
    return <NotFoundState tenantId={daoId} />;
  }

  return (
    <main className="min-h-full bg-background p-4 md:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Link to="/governance" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-200">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Governance Federation
          </Link>
          <Link to="/governance/console" className="inline-flex rounded-lg border border-white/10 px-3 py-2 text-sm font-black text-on-surface">
            Open Operations Center
          </Link>
        </div>

        <section className="rounded-lg border border-cyan-300/15 bg-surface-container-highest p-5">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="font-mono text-xs font-black uppercase tracking-[0.18em] text-cyan-200">{tenant.symbol}</div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-on-surface md:text-4xl">{tenant.name}</h1>
              <p className="mt-3 max-w-4xl text-sm leading-6 text-on-surface-variant">{tenant.description}</p>
              <p className="mt-4 max-w-4xl text-sm leading-6 text-on-surface">{tenant.strategy}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <FederationStatusBadge status={tenant.governanceStatus} tier={tenant.federationTier} />
                <RiskIndicator riskLevel={tenant.riskLevel} />
                <APRComparisonBadge tenantApr={tenant.apr} coreApr={coreMetrics.apr} />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <DetailMetric label="Tenant APR" value={formatPercent(tenant.apr)} detail={`${tenantPerformance.comparisonWindow} performance window`} />
              <DetailMetric label="CORE APR" value={formatPercent(coreMetrics.apr)} detail="Federal baseline" />
              <DetailMetric label="Treasury TVL" value={formatCurrency(tenant.treasuryTvl)} detail={tenant.treasuryHealth} />
              <DetailMetric label="Members" value={tenant.members.toLocaleString('en-US')} detail={tenant.governanceMaturity} />
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DetailMetric label="Active proposals" value={tenant.activeProposals} detail="Tenant-local governance queue" />
          <DetailMetric label="Pending operations" value={tenant.pendingOperations} detail="Execution or review required" />
          <DetailMetric label="Execution receipts" value={tenant.executionReceipts} detail="Observable execution history" />
          <DetailMetric label="Performance trend" value={tenant.performanceTrend} detail="Mock tenant performance" />
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <DetailPanel title="Treasury Allocation" eyebrow="Treasury">
            <AllocationBreakdown items={tenant.treasuryAllocation} />
          </DetailPanel>

          <DetailPanel title="APR & Performance" eyebrow="Economic State">
            <div className="grid gap-3 md:grid-cols-3">
              {tenant.historicalPerformance.map((item) => (
                <DetailMetric key={item.period} label={item.period} value={formatPercent(item.apr)} detail={`PnL ${item.pnl}`} />
              ))}
            </div>
          </DetailPanel>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <DetailPanel title="Products Enabled" eyebrow="Modules">
            <ListPills items={tenant.productsEnabled ?? tenant.supportedProducts} />
          </DetailPanel>

          <DetailPanel title="Chains" eyebrow="Multichain Surface">
            <ListPills items={tenant.chains} />
          </DetailPanel>

          <DetailPanel title="Agents Assigned" eyebrow="AI Governance">
            <ListPills items={tenant.agentsAssigned} />
          </DetailPanel>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <DetailPanel title="Risk Metrics" eyebrow="Guarded Operations">
            <div className="grid gap-3 sm:grid-cols-2">
              {Object.entries(tenant.riskMetrics ?? {}).map(([key, value]) => (
                <DetailMetric key={key} label={key} value={value} />
              ))}
            </div>
          </DetailPanel>

          <DetailPanel title="Constitutional Context" eyebrow="Federation Standing">
            <div className="space-y-3 text-sm leading-6 text-on-surface-variant">
              <p>
                This page renders tenant state from mock registry data only. It does not infer compliance, execute governance logic or decide sanctions.
              </p>
              <p>
                Production truth must come from registry, contracts, indexers, guardrails and backend execution layers before any on-chain allocation or
                operation is enabled.
              </p>
            </div>
          </DetailPanel>
        </section>
      </div>
    </main>
  );
}
