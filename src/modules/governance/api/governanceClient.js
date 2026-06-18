import {
  getMockGovernancePlugins,
  getMockGovernanceProposal,
  getMockGovernanceProposalActions,
  getMockGovernanceProposals,
  getMockGovernanceTenants,
} from './mockGovernanceData';
import { governanceTenantsMock } from '@/data/mock';

const governanceApiBase = import.meta.env.VITE_GOVERNANCE_API_URL || '/governance-api';
const apiBase = `${governanceApiBase}/v2`;

async function requestJson(path, { signal } = {}) {
  const response = await fetch(`${apiBase}${path}`, {
    headers: { Accept: 'application/json' },
    signal,
  });

  if (!response.ok) {
    throw new Error(`${path} failed with HTTP ${response.status}`);
  }

  return response.json();
}

function toQuery(params) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value == null || value === '') return;
    query.set(key, String(value));
  });
  return query.toString();
}

function normalizePaginated(response) {
  if (Array.isArray(response)) {
    return { items: response, metadata: null };
  }

  return {
    items: Array.isArray(response?.data) ? response.data : [],
    metadata: response?.metadata ?? null,
  };
}

export function getFederalDaoRecord() {
  return {
    id: 'axodus-federal-governance',
    name: 'Axodus Federal Governance',
    description: 'Central constitutional governance authority for the Axodus DAO federation.',
    network: 'ethereum-sepolia',
    address: null,
    chainRole: 'execution',
    federationRole: 'federal',
    federationMember: true,
    federationTier: 'root',
    governanceStatus: 'compliant',
    constitutionalStanding: { status: 'compliant', reasonCodes: [], reasonSeverity: null },
    status: 'bootstrap',
    isVirtual: true,
  };
}

export async function fetchGovernanceDaos({ memberAddress, signal } = {}) {
  const query = toQuery({ page: 1, pageSize: 50 });
  const path = memberAddress ? `/daos/member/${memberAddress}?${query}` : `/daos?${query}`;
  const response = await requestJson(path, { signal });
  return normalizePaginated(response);
}

export async function fetchGovernanceTenants({ signal } = {}) {
  try {
    const response = await requestJson('/governance/tenants', { signal });
    const normalized = normalizePaginated(response);
    return {
      ...normalized,
      source: response?.metadata?.source ?? 'governance-api',
    };
  } catch (error) {
    return {
      items: getMockGovernanceTenants(),
      metadata: null,
      source: 'frontend-dev-fixture',
      error,
    };
  }
}

function getMockGovernanceTenantDetail(tenantId) {
  return governanceTenantsMock.tenants.find(
    (tenant) =>
      tenant.id === tenantId ||
      tenant.daoId === tenantId ||
      tenant.symbol?.toLowerCase() === tenantId?.toLowerCase() ||
      tenant.route?.endsWith(`/${tenantId}`),
  );
}

const mockExecutorRecords = [
  {
    governanceExecutorRef: 'governance-executor://tenant-axodus-root/mock-canonical-executor',
    executorId: 'mock-canonical-root-executor',
    executorStatus: 'mock_only',
    executorScope: 'federation',
    daoId: 'axodus-federal-governance',
    tenantId: 'tenant-axodus-root',
    chainId: 11155111,
    policyVersion: 'governance-executor-policy-v0.mock',
    supportedProposalTypes: ['constitutional-review', 'capability-change', 'treasury-policy-review'],
    executionMode: 'mock_execution',
    executionAuthority: 'Constitutional Governance mock executor boundary',
    isProductionExecutor: false,
    address: null,
    addressStatus: 'not_configured',
    emergencyDisabled: false,
    reasonCodes: [{ reasonCode: 'MOCK_EXECUTOR_ONLY', reasonSeverity: 'warning', source: 'canonical governance executor registry' }],
  },
  {
    governanceExecutorRef: 'governance-executor://tenant-executive-dao/mock-tenant-executor',
    executorId: 'mock-tenant-executive-executor',
    executorStatus: 'mock_only',
    executorScope: 'tenant',
    daoId: 'dao-executive-001',
    tenantId: 'tenant-executive-dao',
    chainId: 11155111,
    policyVersion: 'governance-executor-policy-v0.mock',
    supportedProposalTypes: ['local-proposal', 'treasury-policy-review', 'capability-change', 'product-access'],
    executionMode: 'mock_execution',
    executionAuthority: 'Local DAO mock executor bounded by Constitutional Governance',
    isProductionExecutor: false,
    address: null,
    addressStatus: 'not_configured',
    emergencyDisabled: false,
    reasonCodes: [{ reasonCode: 'MOCK_EXECUTOR_ONLY', reasonSeverity: 'warning', source: 'canonical governance executor registry' }],
  },
  {
    governanceExecutorRef: 'governance-executor://tenant-community-dao/legacy-observer',
    executorId: 'blocked-legacy-community-observer',
    executorStatus: 'blocked',
    executorScope: 'legacy-spoke',
    daoId: 'dao-community-001',
    tenantId: 'tenant-community-dao',
    chainId: 1666600000,
    policyVersion: 'governance-executor-policy-v0.mock',
    supportedProposalTypes: ['legacy-voting-observation'],
    executionMode: 'documentation_only',
    executionAuthority: 'Legacy voting/spoke observer only',
    isProductionExecutor: false,
    address: null,
    addressStatus: 'blocked',
    emergencyDisabled: true,
    reasonCodes: [{ reasonCode: 'EXECUTION_CHAIN_NOT_AUTHORIZED', reasonSeverity: 'constitutional', source: 'canonical governance executor registry' }],
  },
];

function getMockExecutorForTenant(tenantId) {
  return mockExecutorRecords.find((executor) => executor.tenantId === tenantId || executor.daoId === tenantId) ?? null;
}

export async function fetchGovernanceTenant({ tenantId, signal } = {}) {
  if (!tenantId) {
    return {
      item: null,
      metadata: null,
      source: 'frontend-empty-request',
    };
  }

  try {
    const response = await requestJson(`/governance/tenants/${encodeURIComponent(tenantId)}`, { signal });
    return {
      item: response?.data ?? response?.tenant ?? response,
      metadata: response?.metadata ?? null,
      source: response?.metadata?.source ?? response?.source ?? 'governance-api',
    };
  } catch (error) {
    return {
      item: getMockGovernanceTenantDetail(tenantId) ?? null,
      metadata: null,
      source: 'frontend-dev-fixture',
      error,
    };
  }
}

export async function fetchGovernanceTenantExecutor({ tenantId, signal } = {}) {
  if (!tenantId) {
    return {
      item: null,
      metadata: null,
      source: 'frontend-empty-request',
    };
  }

  try {
    const response = await requestJson(`/governance/tenants/${encodeURIComponent(tenantId)}/executor`, { signal });
    return {
      item: response?.data?.executor ?? response?.data ?? null,
      resolution: response?.data ?? null,
      metadata: response?.metadata ?? null,
      source: response?.metadata?.source ?? 'governance-api',
    };
  } catch (error) {
    const item = getMockExecutorForTenant(tenantId);
    return {
      item,
      resolution: item
        ? {
            executor: item,
            supported: true,
            blocked: item.executorStatus === 'blocked' || item.emergencyDisabled === true,
            reasonCodes: item.reasonCodes ?? [],
          }
        : null,
      metadata: null,
      source: 'frontend-dev-fixture',
      error,
    };
  }
}

export async function fetchGovernanceTenantOperations({ tenantId, signal } = {}) {
  if (!tenantId) {
    return {
      items: [],
      metadata: null,
      source: 'frontend-empty-request',
    };
  }

  const response = await requestJson(`/governance/tenants/${encodeURIComponent(tenantId)}/operations`, { signal });
  const normalized = normalizePaginated(response);

  return {
    ...normalized,
    source: response?.metadata?.source ?? 'governance-api',
  };
}

export async function fetchGovernanceTenantReceipts({ tenantId, signal } = {}) {
  if (!tenantId) {
    return {
      items: [],
      metadata: null,
      source: 'frontend-empty-request',
    };
  }

  const response = await requestJson(`/governance/tenants/${encodeURIComponent(tenantId)}/receipts`, { signal });
  const normalized = normalizePaginated(response);

  return {
    ...normalized,
    source: response?.metadata?.source ?? 'governance-api',
  };
}

export async function fetchGovernanceProposals({ daoId, signal } = {}) {
  if (!daoId) {
    return { items: [], metadata: null };
  }

  const query = toQuery({ daoId, page: 1, pageSize: 20, sort: 'incrementalId', direction: 'desc' });
  const response = await requestJson(`/proposals?${query}`, { signal });
  const normalized = normalizePaginated(response);
  const mockItems = normalized.items.length > 0 ? [] : getMockGovernanceProposals();

  return {
    ...normalized,
    items: [...normalized.items, ...mockItems],
  };
}

export async function fetchGovernanceProposal({ proposalId, signal } = {}) {
  if (!proposalId) {
    return null;
  }

  const mockProposal = getMockGovernanceProposal(proposalId);
  if (mockProposal) return mockProposal;

  return requestJson(`/proposals/${encodeURIComponent(proposalId)}`, { signal });
}

export async function fetchGovernanceProposalActions({ proposalId, signal } = {}) {
  if (!proposalId) {
    return [];
  }

  const mockActions = getMockGovernanceProposalActions(proposalId);
  if (mockActions.length > 0) return mockActions;

  return requestJson(`/proposals/${encodeURIComponent(proposalId)}/actions`, { signal });
}

export async function fetchGovernanceTransactionIndexingStatus({ network, txHash, type, signal } = {}) {
  if (!network || !txHash || !type) {
    return { isProcessed: false };
  }

  const query = toQuery({ type });
  return requestJson(`/transactions/${encodeURIComponent(network)}/${encodeURIComponent(txHash)}/status?${query}`, { signal });
}

export async function fetchGovernancePlugins({ dao, signal } = {}) {
  if (!dao?.address || !dao?.network) {
    return getMockGovernancePlugins();
  }

  const response = await requestJson(`/plugins/by-dao/${dao.network}/${dao.address}?${toQuery({ status: 'installed', isSupported: true })}`, {
    signal,
  });
  const items = Array.isArray(response) ? response : response?.data;

  if (Array.isArray(items) && items.length > 0) return response;

  return getMockGovernancePlugins();
}
