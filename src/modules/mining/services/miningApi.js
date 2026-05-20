import { miningService } from './miningService';

const DEFAULT_MINING_API_URL = 'http://localhost:8787';
const API_BASE = (import.meta.env.VITE_MINING_API_URL || DEFAULT_MINING_API_URL).replace(/\/$/, '');
const FORCE_MOCKS = import.meta.env.VITE_MINING_USE_MOCKS === 'true';

function attachMeta(data, meta) {
  if (data && (typeof data === 'object' || Array.isArray(data))) {
    return Object.defineProperty(data, '__miningMeta', {
      value: meta,
      enumerable: false,
      configurable: true
    });
  }

  return data;
}

function fallbackMeta(error) {
  return {
    source: 'fallback',
    readOnly: true,
    apiBase: API_BASE,
    message: 'Using local mock fallback — Mining API unavailable.',
    error: error?.message || 'Mining API unavailable'
  };
}

async function requestMining(path, fallback) {
  if (FORCE_MOCKS) {
    return attachMeta(fallback(), {
      source: 'fallback',
      readOnly: true,
      apiBase: API_BASE,
      message: 'Using local mock fallback — Mining API unavailable.',
      forced: true
    });
  }

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Mining API ${response.status} for ${path}`);
    }

    const envelope = await response.json();
    return attachMeta(envelope.data, {
      ...(envelope.meta || {}),
      source: 'api',
      apiBase: API_BASE,
      message: null
    });
  } catch (error) {
    return attachMeta(fallback(), fallbackMeta(error));
  }
}

export function getMiningMeta(data) {
  return data?.__miningMeta || null;
}

export const miningApi = {
  getSummary: () => requestMining('/api/mining/summary', miningService.getSummary),
  getProviders: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    const query = params.toString();
    return requestMining(`/api/mining/providers${query ? `?${query}` : ''}`, () => miningService.getProviders(filters));
  },
  getProviderBySlug: (slug) => requestMining(`/api/mining/providers/${slug}`, () => miningService.getProviderBySlug(slug)),
  getHashTokens: () => requestMining('/api/mining/hash-tokens', miningService.getHashTokens),
  getVaults: () => requestMining('/api/mining/vaults', miningService.getVaults),
  getAllocations: () => requestMining('/api/mining/allocations', miningService.getAllocations),
  getTreasury: () => requestMining('/api/mining/treasury', miningService.getTreasury),
  getRisk: () => requestMining('/api/mining/risk', miningService.getRisk),
  getGovernanceValidations: () => requestMining('/api/mining/governance-validations', miningService.getGovernanceValidations),
  getProviderDueDiligence: () => requestMining('/api/mining/provider-due-diligence', miningService.getProviderDueDiligence),
  getReports: () => requestMining('/api/mining/reports', miningService.getReports)
};

