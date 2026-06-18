import { Link, useParams } from 'react-router-dom';
import { APRComparisonBadge, FederationStatusBadge, RiskIndicator } from '../components/TenantDiscoveryCards';
import { useGovernanceTenantDetail } from '../hooks/useGovernanceTenantDetail';

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

function StatusPill({ value, severity = 'info' }) {
  const normalizedSeverity = severity ?? 'info';
  const tone =
    normalizedSeverity === 'constitutional' || normalizedSeverity === 'critical'
      ? 'border-rose-300/25 bg-rose-950/20 text-rose-100'
      : normalizedSeverity === 'warning'
        ? 'border-amber-300/25 bg-amber-950/20 text-amber-100'
        : 'border-cyan-300/20 bg-cyan-950/20 text-cyan-100';

  return <span className={`rounded-md border px-2 py-1 text-[10px] font-black uppercase ${tone}`}>{value}</span>;
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

function UserPositionPanel({ tenant, userAllocation }) {
  if (!userAllocation) {
    return (
      <DetailPanel title="User Position" eyebrow="Portfolio Context">
        <div className="rounded-lg border border-white/5 bg-surface-container-high p-4">
          <div className="text-sm font-black text-on-surface">No tenant allocation detected</div>
          <p className="mt-2 text-xs leading-5 text-on-surface-variant">
            This mock user remains outside this tenant and can stay allocated only to Axodus CORE until a future allocation flow is enabled.
          </p>
        </div>
      </DetailPanel>
    );
  }

  return (
    <DetailPanel title="User Position" eyebrow="Portfolio Context">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <DetailMetric label="Allocated capital" value={formatCurrency(userAllocation.allocatedCapital)} detail={userAllocation.userPosition} />
        <DetailMetric label="PnL" value={formatCurrency(userAllocation.pnl)} detail="Mock position result" />
        <DetailMetric label="Rewards" value={formatCurrency(userAllocation.rewards)} detail="Accrued tenant rewards" />
        <DetailMetric label="DAO share" value={formatPercent(Number(userAllocation.daoSharePercent ?? 0) * 100)} detail="Tenant voting exposure" />
        <DetailMetric label="Voting power" value={userAllocation.votingPower} detail={userAllocation.governanceRights} />
        <DetailMetric label="APR vs CORE" value={`${tenant.aprDeltaVsCore > 0 ? '+' : ''}${formatPercent(tenant.aprDeltaVsCore)}`} detail="Relative tenant performance" />
      </div>
      <div className="mt-3 rounded-lg border border-cyan-300/10 bg-cyan-950/10 p-4">
        <div className="text-[10px] font-black uppercase tracking-wide text-cyan-200">Treasury exposure</div>
        <div className="mt-2 text-sm font-bold text-on-surface">{userAllocation.treasuryExposure}</div>
        <div className="mt-1 text-xs text-on-surface-variant">{userAllocation.recentDaoActivity}</div>
      </div>
    </DetailPanel>
  );
}

function OperationalFeed({ items, emptyLabel }) {
  if (!items?.length) {
    return <div className="rounded-lg border border-white/5 bg-surface-container-high p-4 text-sm text-on-surface-variant">{emptyLabel}</div>;
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="rounded-lg border border-white/5 bg-surface-container-high p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="text-sm font-black text-on-surface">{item.title ?? item.label ?? item.source ?? item.type ?? 'Observed governance record'}</div>
              <div className="mt-1 font-mono text-[11px] text-on-surface-variant">{item.id}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusPill value={item.status} severity={item.riskSeverity ?? item.reasonSeverity} />
              {item.reasonCode ? <StatusPill value={item.reasonCode} severity={item.reasonSeverity} /> : null}
            </div>
          </div>
          <div className="mt-3 grid gap-2 text-xs text-on-surface-variant sm:grid-cols-3">
            {item.category ? <span>Category: {item.category}</span> : null}
            {item.chain ?? item.executionChain ? <span>Chain: {item.chain ?? item.executionChain}</span> : null}
            {item.treasuryImpact ? <span>Treasury: {item.treasuryImpact}</span> : null}
            {item.source ? <span>Source: {item.source}</span> : null}
          </div>
        </div>
      ))}
    </div>
  );
}

function ReasonCodeList({ items }) {
  return (
    <div className="space-y-3">
      {(items ?? []).map((item) => (
        <div key={`${item.reasonCode}-${item.source}`} className="rounded-lg border border-white/5 bg-surface-container-high p-4">
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill value={item.reasonCode} severity={item.reasonSeverity} />
            <StatusPill value={item.reasonSeverity ?? 'info'} severity={item.reasonSeverity} />
          </div>
          <div className="mt-3 grid gap-2 text-xs text-on-surface-variant sm:grid-cols-2">
            <span>Source: {item.source}</span>
            <span>Scope: {item.scope}</span>
          </div>
        </div>
      ))}
    </div>
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

function SourceBadge({ source, status, error }) {
  const isFallback = source === 'frontend-dev-fixture';

  return (
    <div className="rounded-lg border border-white/5 bg-surface-container-high px-3 py-2 text-xs text-on-surface-variant">
      <span className="font-black uppercase text-slate-500">Tenant source: </span>
      <span className="font-mono text-on-surface">{source}</span>
      <span className="mx-2 text-slate-600">/</span>
      <span className="font-mono text-on-surface">{status}</span>
      {isFallback && error ? <span className="ml-2 text-amber-100">backend unavailable, rendering fallback</span> : null}
    </div>
  );
}

export default function DaoTenantDetail() {
  const { daoId } = useParams();
  const { tenant, coreMetrics, tenantPerformance, userAllocations, source, status, error } = useGovernanceTenantDetail(daoId);
  const userAllocation = userAllocations.find((allocation) => allocation.tenantId === tenant?.id);

  if (status === 'loading' && !tenant) {
    return (
      <main className="min-h-full bg-background p-4 md:p-8">
        <section className="mx-auto max-w-3xl rounded-lg border border-white/5 bg-surface-container-highest p-8 text-center">
          <span className="material-symbols-outlined animate-spin text-cyan-200">progress_activity</span>
          <h1 className="mt-4 text-2xl font-black text-on-surface">Loading DAO Tenant</h1>
          <p className="mt-3 text-sm leading-6 text-on-surface-variant">Resolving tenant registry source for {daoId}.</p>
        </section>
      </main>
    );
  }

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
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <SourceBadge source={source} status={status} error={error} />
            <Link to="/governance/console" className="inline-flex rounded-lg border border-white/10 px-3 py-2 text-sm font-black text-on-surface">
              Open Operations Center
            </Link>
          </div>
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

        <UserPositionPanel tenant={tenant} userAllocation={userAllocation} />

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

        <section className="grid gap-6 xl:grid-cols-3">
          <DetailPanel title="Active Proposals" eyebrow="Governance Queue">
            <OperationalFeed items={tenant.proposalQueue} emptyLabel="No tenant proposals are available in the current mock source." />
          </DetailPanel>

          <DetailPanel title="Pending Operations" eyebrow="Execution Queue">
            <OperationalFeed items={tenant.operationsQueue} emptyLabel="No tenant operations are pending in the current mock source." />
          </DetailPanel>

          <DetailPanel title="Execution Receipts" eyebrow="Indexer State">
            <OperationalFeed items={tenant.executionReceiptFeed} emptyLabel="No execution receipts are available in the current mock source." />
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

          <DetailPanel title="Governance Reason Codes" eyebrow="Constitutional Guardrails">
            <ReasonCodeList items={tenant.reasonCodes} />
          </DetailPanel>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <DetailPanel title="Local Governance Model" eyebrow="Tenant Authority">
            <div className="space-y-3 text-sm leading-6 text-on-surface-variant">
              <p className="font-bold text-on-surface">{tenant.localGovernanceModel}</p>
              <p>{tenant.governanceModel}</p>
              <p>
                Tenant-local authority controls treasury strategy, member permissions, product modules and proposal operations inside the observed
                constitutional boundary.
              </p>
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
