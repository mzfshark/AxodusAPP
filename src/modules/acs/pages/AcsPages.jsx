import { useMemo } from 'react';
import { AcsBadge, AcsMetric, AcsPageShell, AcsPanel, CapabilityGrid, ErrorState, LoadingState, ReadinessPipeline, acsIcons } from '../components/AcsUi';
import {
  useAcsCapabilities,
  useAcsHealth,
  useAcsOperationalState,
  useAcsPolicyCheck,
  useAcsPolicyMatrix,
  useAcsPerformanceRecords,
  useAcsProductAccess,
  useAcsReadiness,
  useAcsReceipts,
  useAcsStatus,
  useAcsTenantServices,
  useAcsUserStatus
} from '../hooks/useAcsData';

const demoWallet = '0xlicensed';
const demoTenant = 'dao-alpha';
const tradingIgnition = 'product.trading-ignition';

function queryFailed(...queries) {
  return queries.find((query) => query.isError);
}

export function AcsOverview() {
  const health = useAcsHealth();
  const capabilities = useAcsCapabilities();
  const tenantServices = useAcsTenantServices(demoTenant);
  const productAccess = useAcsProductAccess(demoWallet, tradingIgnition);

  if (health.isLoading || capabilities.isLoading || tenantServices.isLoading || productAccess.isLoading) return <LoadingState />;
  const failed = queryFailed(health, capabilities, tenantServices, productAccess);
  if (failed) return <ErrorState message={failed.error?.message || 'ACS data unavailable'} />;

  const capabilityList = capabilities.data?.capabilities || [];
  const activeServices = tenantServices.data?.tenants?.[0]?.services?.filter((service) => service.allowed) || [];
  const product = productAccess.data?.products?.[0];

  return (
    <AcsPageShell
      title="Operational Intelligence"
      description="ACS is the read-only source of truth for capability availability, tenant services, product access, governance requirements and operational states."
      query={capabilities}
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AcsMetric icon={acsIcons.Network} label="ACS health" value={health.data?.status || 'ok'} detail="Inspection API only; automation remains disabled." />
        <AcsMetric icon={acsIcons.Boxes} label="Capabilities" value={String(capabilityList.length)} detail="Core, service and product capabilities from ACS." />
        <AcsMetric icon={acsIcons.ShieldCheck} label="Tenant services" value={String(activeServices.length)} detail={`Allowed services for ${demoTenant}.`} />
        <AcsMetric icon={acsIcons.BadgeCheck} label="Trading Ignition" value={product?.allowed ? 'Allowed' : 'Blocked'} detail={product?.blockedReason || 'Product access comes from ACS.'} />
      </section>
      <AcsPanel title="Governance Notices" description="This surface displays ACS policy. It does not execute workflows, trade, or call CEX APIs.">
        <div className="flex flex-wrap gap-2">
          <AcsBadge tone="policy">sandbox</AcsBadge>
          <AcsBadge tone="policy">mock</AcsBadge>
          <AcsBadge tone="warning">restricted</AcsBadge>
          <AcsBadge tone="warning">internal-validation</AcsBadge>
          <AcsBadge tone="blocked">autonomous execution blocked</AcsBadge>
        </div>
      </AcsPanel>
    </AcsPageShell>
  );
}

export function AcsCapabilities() {
  const capabilities = useAcsCapabilities();
  if (capabilities.isLoading) return <LoadingState />;
  if (capabilities.isError) return <ErrorState message={capabilities.error?.message || 'Capabilities unavailable'} />;

  const grouped = ['core', 'service', 'product'].map((level) => ({
    level,
    items: (capabilities.data?.capabilities || []).filter((capability) => capability.consumptionLevel === level)
  }));

  return (
    <AcsPageShell title="Capability Explorer" description="Capabilities are grouped by ACS consumption level and rendered directly from ACS inspection responses." query={capabilities}>
      {grouped.map((group) => (
        <AcsPanel key={group.level} title={`${group.level.toUpperCase()} capabilities`} description="Automation level, governance requirements, telemetry and receipt requirements are ACS-owned.">
          <CapabilityGrid capabilities={group.items} />
        </AcsPanel>
      ))}
    </AcsPageShell>
  );
}

export function AcsTenantServices() {
  const services = useAcsTenantServices(demoTenant);
  if (services.isLoading) return <LoadingState />;
  if (services.isError) return <ErrorState message={services.error?.message || 'Tenant services unavailable'} />;

  const tenant = services.data?.tenants?.[0];

  return (
    <AcsPageShell title="Tenant Service Explorer" description="Tenant services remain isolated by tenant context, governance status, federation tier and restrictions." query={services}>
      <AcsPanel title={tenant?.tenantId || 'Tenant'} description={`Governance: ${tenant?.governanceStatus || 'unknown'} / Federation: ${tenant?.federationTier || 'unknown'}`}>
        <div className="mb-4 flex flex-wrap gap-2">
          {(tenant?.restrictions?.length ? tenant.restrictions : ['no active restrictions']).map((restriction) => <AcsBadge key={restriction} tone={restriction === 'no active restrictions' ? 'allowed' : 'blocked'}>{restriction}</AcsBadge>)}
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {(tenant?.services || []).map((service) => (
            <article key={service.serviceId} className="rounded-lg border border-white/10 bg-surface-container p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-on-surface">{service.name}</p>
                  <p className="mt-1 text-xs text-outline">{service.serviceId}</p>
                </div>
                <AcsBadge tone={service.allowed ? 'allowed' : 'blocked'}>{service.allowed ? 'allowed' : 'blocked'}</AcsBadge>
              </div>
              <p className="mt-3 text-sm text-outline">{service.blockedReason || 'Available under current tenant policy.'}</p>
            </article>
          ))}
        </div>
      </AcsPanel>
    </AcsPageShell>
  );
}

export function AcsProducts() {
  const products = useAcsProductAccess(demoWallet);
  const userStatus = useAcsUserStatus('0xexpired', { tenantId: demoTenant, productId: tradingIgnition });
  if (products.isLoading || userStatus.isLoading) return <LoadingState />;
  if (products.isError || userStatus.isError) return <ErrorState message="Product access unavailable" />;

  return (
    <AcsPageShell title="Product Access" description="Product eligibility, license requirements, blocked reasons and readiness state are read from ACS." query={products}>
      <AcsPanel title={`Wallet ${products.data?.walletAddress || demoWallet}`} description="Trading Ignition appears as one ACS Product Capability.">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {(products.data?.products || []).map((product) => (
            <article key={product.productId} className="rounded-lg border border-white/10 bg-surface-container p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-on-surface">{product.name}</h2>
                  <p className="mt-1 text-xs text-outline">{product.productId}</p>
                </div>
                <AcsBadge tone={product.allowed ? 'allowed' : 'blocked'}>{product.allowed ? 'allowed' : 'blocked'}</AcsBadge>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.requiresUserLicense ? <AcsBadge tone="warning">License required</AcsBadge> : null}
                {product.requiresGovernanceApproval ? <AcsBadge tone="policy">Governance required</AcsBadge> : null}
                <AcsBadge>{product.automationLevel}</AcsBadge>
              </div>
              <p className="mt-4 text-sm leading-6 text-outline">{product.blockedReason || 'Access is currently allowed by ACS mock policy.'}</p>
            </article>
          ))}
        </div>
      </AcsPanel>
      <AcsPanel title="License Loss State" description="Blocked access is rendered from ACS user-status policy output.">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <AcsMetric icon={acsIcons.BadgeCheck} label="License" value={userStatus.data?.license?.valid ? 'Valid' : 'Blocked'} detail={userStatus.data?.license?.blockedReason || 'License state supplied by ACS.'} />
          <AcsMetric icon={acsIcons.Activity} label="Operational state" value={userStatus.data?.operationalState || 'unknown'} detail="State reflects readiness, license and policy context." />
          <AcsMetric icon={acsIcons.ShieldCheck} label="Policy" value={userStatus.data?.policy?.allowed ? 'Allowed' : 'Blocked'} detail={userStatus.data?.policy?.blockedReason || userStatus.data?.policy?.automationLevel || 'Policy decision supplied by ACS.'} />
        </div>
      </AcsPanel>
    </AcsPageShell>
  );
}

export function AcsPolicy() {
  const matrix = useAcsPolicyMatrix();
  const check = useAcsPolicyCheck(tradingIgnition, demoTenant);
  if (matrix.isLoading || check.isLoading) return <LoadingState />;
  if (matrix.isError || check.isError) return <ErrorState message="ACS policy unavailable" />;

  return (
    <AcsPageShell title="Policy Visibility" description="AxodusAPP does not hardcode access rules. This page renders ACS policy and policy-check responses." query={matrix}>
      <AcsPanel title="Trading Ignition Policy Check" description="This is a read-only inspection result for the demo tenant.">
        <div className="flex flex-wrap gap-2">
          <AcsBadge tone={check.data?.allowed ? 'allowed' : 'blocked'}>{check.data?.allowed ? 'allowed' : 'blocked'}</AcsBadge>
          <AcsBadge>{check.data?.automationLevel}</AcsBadge>
          {check.data?.requiresGovernanceApproval ? <AcsBadge tone="policy">Governance required</AcsBadge> : null}
          {check.data?.requiresUserLicense ? <AcsBadge tone="warning">License required</AcsBadge> : null}
        </div>
      </AcsPanel>
      <AcsPanel title="Policy Matrix" description="Automation and approval metadata exposed by ACS.">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead><tr className="text-xs uppercase tracking-widest text-outline"><th className="px-3 py-3">Capability</th><th className="px-3 py-3">Automation</th><th className="px-3 py-3">Governance</th><th className="px-3 py-3">Telemetry</th><th className="px-3 py-3">Receipts</th></tr></thead>
            <tbody className="divide-y divide-white/10">
              {(matrix.data?.policies || []).map((policy) => (
                <tr key={policy.capabilityId}>
                  <td className="px-3 py-4 font-bold text-on-surface">{policy.capabilityId}</td>
                  <td className="px-3 py-4 text-outline">{policy.automationLevel}</td>
                  <td className="px-3 py-4 text-outline">{policy.requiresGovernanceApproval ? 'required' : 'visible'}</td>
                  <td className="px-3 py-4 text-outline">{policy.telemetryRequired ? 'required' : 'optional'}</td>
                  <td className="px-3 py-4 text-outline">{policy.receiptsRequired ? 'required' : 'optional'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AcsPanel>
    </AcsPageShell>
  );
}

export function AcsStatus() {
  const status = useAcsStatus(demoWallet);
  const operationalState = useAcsOperationalState(demoWallet);
  const userStatus = useAcsUserStatus(demoWallet, { tenantId: demoTenant, productId: tradingIgnition });
  const stoppedStatus = useAcsUserStatus('0xstopped', { tenantId: demoTenant, productId: tradingIgnition });
  const performance = useAcsPerformanceRecords();
  const receipts = useAcsReceipts();
  if (status.isLoading || operationalState.isLoading || userStatus.isLoading || stoppedStatus.isLoading || performance.isLoading || receipts.isLoading) return <LoadingState />;
  if (status.isError || operationalState.isError || userStatus.isError || stoppedStatus.isError || performance.isError || receipts.isError) return <ErrorState message="ACS status unavailable" />;

  const performanceRecords = performance.data?.records || [];
  const receiptItems = receipts.data?.receipts || [];

  return (
    <AcsPageShell title="Operational Status" description="Operational state, mock environment and coordination notices are provided by ACS." query={status}>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <AcsMetric icon={acsIcons.Activity} label="State" value={operationalState.data?.state || 'unknown'} detail="State is computed by ACS readiness and policy mocks." />
        <AcsMetric icon={acsIcons.Gauge} label="Mode" value={status.data?.integrationMode || 'mock'} detail="No real execution, CEX API or automation is enabled." />
        <AcsMetric icon={acsIcons.FileCheck2} label="Automation" value={status.data?.automation || 'manual'} detail="Sensitive actions require explicit approval." />
      </section>
      <AcsPanel title="Notices">
        <div className="space-y-2">
          {(status.data?.notices || []).map((notice) => <p key={notice} className="text-sm text-outline">{notice}</p>)}
        </div>
      </AcsPanel>
      <AcsPanel title="User Status Summary" description="A single ACS object for product readiness, license, API safety, risk, policy and emergency stop state.">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <AcsMetric icon={acsIcons.BadgeCheck} label="License" value={userStatus.data?.license?.valid ? 'Valid' : 'Blocked'} detail={userStatus.data?.license?.licenseId || userStatus.data?.license?.blockedReason || 'License state from ACS.'} />
          <AcsMetric icon={acsIcons.ShieldCheck} label="API safety" value={userStatus.data?.apiSafety?.status || 'unknown'} detail={(userStatus.data?.apiSafety?.warnings || [])[0] || 'Withdrawal disabled and IP permission expected.'} />
          <AcsMetric icon={acsIcons.Gauge} label="Risk preset" value={userStatus.data?.risk?.preset || 'unknown'} detail={(userStatus.data?.risk?.warnings || [])[0] || 'Risk state from ACS.'} />
        </div>
      </AcsPanel>
      <AcsPanel title="Emergency Stop Status" description="Emergency stop state is an ACS policy blocker, not a frontend override.">
        <div className="flex flex-wrap gap-2">
          <AcsBadge tone={stoppedStatus.data?.emergencyStop?.active ? 'blocked' : 'allowed'}>{stoppedStatus.data?.emergencyStop?.active ? 'emergency_stop_active' : 'no active stop'}</AcsBadge>
          <AcsBadge tone="policy">{stoppedStatus.data?.policy?.automationLevel || 'blocked'}</AcsBadge>
          <AcsBadge tone="warning">{stoppedStatus.data?.emergencyStop?.reason || 'mock emergency stop inspection'}</AcsBadge>
        </div>
      </AcsPanel>
      <AcsPanel title="Performance Records" description="Mock/internal-validation records only. No return claim or live trading metric is represented.">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {performanceRecords.map((record) => (
            <article key={record.recordId} className="rounded-lg border border-white/10 bg-surface-container p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-on-surface">{record.capabilityId}</p>
                  <p className="mt-1 text-xs text-outline">{record.recordId}</p>
                </div>
                <AcsBadge tone="warning">{record.mode}</AcsBadge>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-outline">
                <span>Trades: {record.tradeCount ?? 0}</span>
                <span>Drawdown: {record.drawdown ?? 0}</span>
                <span>Emergency stops: {record.emergencyStops ?? 0}</span>
                <span>Preset: {record.preset || 'n/a'}</span>
              </div>
              <p className="mt-4 text-sm text-outline">{record.warnings?.[0]}</p>
            </article>
          ))}
        </div>
      </AcsPanel>
      <AcsPanel title="Receipt Audit Preview" description="Receipts expose correlation, tenant, wallet, policy and telemetry metadata without secrets.">
        <div className="space-y-3">
          {receiptItems.map((receipt) => (
            <article key={receipt.receiptId} className="rounded-lg border border-white/10 bg-surface-container p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-bold text-on-surface">{receipt.actionType}</p>
                  <p className="mt-1 text-xs text-outline">{receipt.receiptId} / {receipt.correlationId}</p>
                </div>
                <AcsBadge tone={receipt.policyDecision?.allowed ? 'allowed' : 'blocked'}>{receipt.policyDecision?.allowed ? 'allowed' : 'blocked'}</AcsBadge>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <AcsBadge>{receipt.consumptionLevel}</AcsBadge>
                <AcsBadge>{receipt.tenantId || 'core'}</AcsBadge>
                <AcsBadge>{receipt.wallet || 'no wallet'}</AcsBadge>
                <AcsBadge tone="policy">{receipt.policyDecision?.automationLevel}</AcsBadge>
              </div>
            </article>
          ))}
        </div>
      </AcsPanel>
      <AcsPanel title="API Secret Safety" description="AxodusAPP must never receive, store or display exchange API secrets.">
        <div className="flex flex-wrap gap-2">
          <AcsBadge tone="blocked">no frontend secrets</AcsBadge>
          <AcsBadge tone="warning">disable withdrawal</AcsBadge>
          <AcsBadge tone="warning">use IP permission</AcsBadge>
          <AcsBadge tone="policy">secretRef only</AcsBadge>
        </div>
      </AcsPanel>
    </AcsPageShell>
  );
}

export function AcsReadiness() {
  const readiness = useAcsReadiness(demoWallet);
  if (readiness.isLoading) return <LoadingState />;
  if (readiness.isError) return <ErrorState message="ACS readiness unavailable" />;

  return (
    <AcsPageShell title="Readiness Dashboard" description="Wallet, Academy, Proof of Knowledge, License, Risk, API Safety and Product Eligibility are rendered from ACS readiness state." query={readiness}>
      <AcsPanel title={`Next state: ${readiness.data?.nextState || 'unknown'}`} description="Pending gates block product activation until ACS marks them complete.">
        <ReadinessPipeline checks={readiness.data?.checks || []} />
      </AcsPanel>
    </AcsPageShell>
  );
}
