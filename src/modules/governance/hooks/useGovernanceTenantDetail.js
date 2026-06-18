import { useEffect, useMemo, useState } from 'react';
import { governanceTenantsMock } from '@/data/mock';
import { fetchGovernanceTenant, fetchGovernanceTenantOperations, fetchGovernanceTenantReceipts } from '../api/governanceClient';

function findMockTenant(tenantId) {
  return governanceTenantsMock.tenants.find(
    (tenant) =>
      tenant.id === tenantId ||
      tenant.daoId === tenantId ||
      tenant.symbol?.toLowerCase() === tenantId?.toLowerCase() ||
      tenant.route?.endsWith(`/${tenantId}`),
  );
}

function normalizeTenantDetail(tenant) {
  if (!tenant) return null;

  const members = typeof tenant.members === 'number' ? tenant.members : tenant.members?.total;

  return {
    ...tenant,
    id: tenant.id ?? tenant.tenantId ?? tenant.daoId,
    daoId: tenant.daoId ?? tenant.id,
    name: tenant.name ?? tenant.legalOrPublicName ?? 'Unnamed DAO tenant',
    symbol: tenant.symbol ?? 'DAO',
    category: tenant.category ?? tenant.tenantType ?? 'DAO Tenant',
    description: tenant.description ?? 'Observed DAO tenant record.',
    strategy: tenant.strategy ?? 'Tenant strategy has not been indexed yet.',
    tvl: tenant.tvl ?? tenant.treasuryTvl ?? 0,
    treasuryTvl: tenant.treasuryTvl ?? tenant.tvl ?? 0,
    members: members ?? 0,
    apr: tenant.apr ?? tenant.coreApr ?? 0,
    aprDeltaVsCore: tenant.aprDeltaVsCore ?? Number((Number(tenant.apr ?? 0) - Number(governanceTenantsMock.coreMetrics.apr)).toFixed(2)),
    riskLevel: tenant.riskLevel ?? 'under-review',
    governanceStatus: tenant.governanceStatus ?? tenant.constitutionalStanding ?? 'under-review',
    federationTier: tenant.federationTier ?? 'observer',
    governanceMaturity: tenant.governanceMaturity ?? tenant.governanceStatus ?? 'under-review',
    treasuryHealth: tenant.treasuryHealth ?? tenant.treasury?.policyStatus ?? 'not-configured',
    performanceTrend: tenant.performanceTrend ?? 'not indexed',
    productsEnabled: tenant.productsEnabled ?? tenant.supportedProducts ?? [],
    supportedProducts: tenant.supportedProducts ?? tenant.productsEnabled ?? [],
    chains: tenant.chains ?? [],
    agentsAssigned: tenant.agentsAssigned ?? [],
    activeProposals: tenant.activeProposals ?? tenant.proposalQueue?.length ?? 0,
    pendingOperations: tenant.pendingOperations ?? tenant.operationsQueue?.length ?? 0,
    executionReceipts: tenant.executionReceipts ?? tenant.executionReceiptFeed?.length ?? 0,
    treasuryAllocation: tenant.treasuryAllocation ?? [],
    historicalPerformance: tenant.historicalPerformance ?? [],
    riskMetrics: tenant.riskMetrics ?? {},
    proposalQueue: tenant.proposalQueue ?? [],
    operationsQueue: tenant.operationsQueue ?? [],
    executionReceiptFeed: tenant.executionReceiptFeed ?? [],
    reasonCodes: tenant.reasonCodes ?? [],
    governanceModel: tenant.governanceModel ?? 'Tenant governance model not indexed',
    localGovernanceModel: tenant.localGovernanceModel ?? 'Local governance model not indexed',
  };
}

function withObservedFeeds(tenant, operations, receipts) {
  if (!tenant) return null;

  return normalizeTenantDetail({
    ...tenant,
    operationsQueue: operations?.length ? operations : tenant.operationsQueue,
    executionReceiptFeed: receipts?.length ? receipts : tenant.executionReceiptFeed,
    pendingOperations: operations?.length ? operations.length : tenant.pendingOperations,
    executionReceipts: receipts?.length ? receipts.length : tenant.executionReceipts,
  });
}

export function useGovernanceTenantDetail(tenantId) {
  const fallbackTenant = useMemo(() => normalizeTenantDetail(findMockTenant(tenantId)), [tenantId]);
  const [tenant, setTenant] = useState(fallbackTenant);
  const [source, setSource] = useState(fallbackTenant ? 'frontend-dev-fixture' : 'not-found');
  const [status, setStatus] = useState(fallbackTenant ? 'success' : 'loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setTenant(fallbackTenant);
    setSource(fallbackTenant ? 'frontend-dev-fixture' : 'loading');
    setStatus(fallbackTenant ? 'success' : 'loading');
    setError(null);

    async function loadTenant() {
      const result = await fetchGovernanceTenant({ tenantId, signal: controller.signal });
      if (controller.signal.aborted) return;

      const normalizedTenant = normalizeTenantDetail(result.item);
      const resolvedTenantId = result.metadata?.resolvedTenantId ?? normalizedTenant?.id ?? tenantId;
      let operations = normalizedTenant?.operationsQueue ?? [];
      let receipts = normalizedTenant?.executionReceiptFeed ?? [];

      if (normalizedTenant && result.source !== 'frontend-dev-fixture') {
        const [operationResult, receiptResult] = await Promise.allSettled([
          fetchGovernanceTenantOperations({ tenantId: resolvedTenantId, signal: controller.signal }),
          fetchGovernanceTenantReceipts({ tenantId: resolvedTenantId, signal: controller.signal }),
        ]);

        if (controller.signal.aborted) return;

        operations = operationResult.status === 'fulfilled' ? operationResult.value.items : operations;
        receipts = receiptResult.status === 'fulfilled' ? receiptResult.value.items : receipts;
      }

      setTenant(withObservedFeeds(normalizedTenant, operations, receipts));
      setSource(result.source ?? (normalizedTenant ? 'governance-api' : 'not-found'));
      setStatus(normalizedTenant ? 'success' : 'not-found');
      setError(result.error ?? null);
    }

    loadTenant();

    return () => controller.abort();
  }, [fallbackTenant, tenantId]);

  return {
    tenant,
    source,
    status,
    error,
    coreMetrics: governanceTenantsMock.coreMetrics,
    tenantPerformance: governanceTenantsMock.tenantPerformance,
    userAllocations: governanceTenantsMock.userAllocations,
  };
}
