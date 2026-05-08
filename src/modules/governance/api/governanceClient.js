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

export async function fetchGovernanceProposals({ daoId, signal } = {}) {
  if (!daoId) {
    return { items: [], metadata: null };
  }

  const query = toQuery({ daoId, page: 1, pageSize: 20, sort: 'incrementalId', direction: 'desc' });
  const response = await requestJson(`/proposals?${query}`, { signal });
  return normalizePaginated(response);
}

export async function fetchGovernanceProposal({ proposalId, signal } = {}) {
  if (!proposalId) {
    return null;
  }

  return requestJson(`/proposals/${encodeURIComponent(proposalId)}`, { signal });
}

export async function fetchGovernanceProposalActions({ proposalId, signal } = {}) {
  if (!proposalId) {
    return [];
  }

  return requestJson(`/proposals/${encodeURIComponent(proposalId)}/actions`, { signal });
}

export async function fetchGovernancePlugins({ dao, signal } = {}) {
  if (!dao?.address || !dao?.network) {
    return [];
  }

  return requestJson(`/plugins/by-dao/${dao.network}/${dao.address}?${toQuery({ status: 'installed', isSupported: true })}`, {
    signal,
  });
}
