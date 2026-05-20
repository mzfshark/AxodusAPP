import { acsInspectionMock } from '../mock/acsInspectionMock';

const DEFAULT_ACS_API_URL = 'http://localhost:8788';
const API_BASE = (import.meta.env.VITE_ACS_API_URL || DEFAULT_ACS_API_URL).replace(/\/$/, '');
const FORCE_MOCKS = import.meta.env.VITE_ACS_USE_MOCKS === 'true';

function attachMeta(data, meta) {
  if (data && (typeof data === 'object' || Array.isArray(data))) {
    return Object.defineProperty(data, '__acsMeta', {
      value: meta,
      enumerable: false,
      configurable: true
    });
  }

  return data;
}

function mockEnvelope(data) {
  return {
    success: true,
    correlationId: 'corr_mock_frontend',
    timestamp: new Date().toISOString(),
    version: 'mock',
    data
  };
}

function fallbackFor(path) {
  if (path.startsWith('/acs/capabilities')) {
    const url = new URL(`${API_BASE}${path}`);
    const level = url.searchParams.get('level');
    const capabilities = level
      ? acsInspectionMock.capabilities.filter((capability) => capability.consumptionLevel === level)
      : acsInspectionMock.capabilities;
    return mockEnvelope({ capabilities });
  }

  if (path.startsWith('/acs/tenant-services/')) {
    const tenantId = decodeURIComponent(path.split('/').pop());
    return mockEnvelope({ tenants: acsInspectionMock.tenants.filter((tenant) => tenant.tenantId === tenantId) });
  }

  if (path === '/acs/tenant-services') {
    return mockEnvelope({ tenants: acsInspectionMock.tenants });
  }

  if (path.startsWith('/acs/product-access/')) {
    const segments = path.split('/').filter(Boolean);
    const walletAddress = segments[2];
    const productId = segments[3];
    const licensed = walletAddress === '0xlicensed';
    const products = acsInspectionMock.products
      .filter((product) => !productId || product.productId === productId)
      .map((product) => licensed ? { ...product, allowed: true, blockedReason: undefined } : product);
    return mockEnvelope({ walletAddress, products });
  }

  if (path === '/acs/product-access') {
    return mockEnvelope({ products: acsInspectionMock.products });
  }

  if (path === '/acs/policy-matrix') {
    return mockEnvelope({ policies: acsInspectionMock.capabilities.map((capability) => ({ ...capability, capabilityId: capability.id })) });
  }

  if (path.startsWith('/acs/policy-check')) {
    const url = new URL(`${API_BASE}${path}`);
    const capabilityId = url.searchParams.get('capabilityId') || 'product.trading-ignition';
    const capability = acsInspectionMock.capabilities.find((item) => item.id === capabilityId) || acsInspectionMock.capabilities[0];
    return mockEnvelope({ ...capability, capabilityId, allowed: capability.automationLevel !== 'blocked', warnings: [] });
  }

  if (path.startsWith('/acs/user-status/')) {
    const url = new URL(`${API_BASE}${path}`);
    const wallet = decodeURIComponent(url.pathname.split('/').filter(Boolean)[2] || '0xunlicensed');
    const productId = url.searchParams.get('productId') || 'product.trading-ignition';
    const tenantId = url.searchParams.get('tenantId') || 'dao-alpha';
    const base = wallet === '0xexpired' ? acsInspectionMock.blockedUserStatus : acsInspectionMock.userStatus;
    return mockEnvelope({ ...base, wallet, tenantId, productId });
  }

  if (path === '/acs/performance-records') {
    return mockEnvelope({ records: acsInspectionMock.performanceRecords });
  }

  if (path === '/acs/receipts') {
    return mockEnvelope({ receipts: acsInspectionMock.receipts });
  }

  if (path.startsWith('/acs/status/')) {
    return mockEnvelope({
      walletAddress: decodeURIComponent(path.split('/').pop()),
      consumptionLevels: ['core', 'service', 'product'],
      environment: 'sandbox',
      integrationMode: 'mock',
      automation: 'manual_approval',
      operationalState: acsInspectionMock.operationalState,
      readiness: acsInspectionMock.readiness,
      notices: ['Mock fallback — ACS HTTP API unavailable.', 'Real trading execution remains blocked.']
    });
  }

  if (path.startsWith('/acs/readiness/')) {
    return mockEnvelope(acsInspectionMock.readiness);
  }

  if (path.startsWith('/acs/operational-state/')) {
    return mockEnvelope(acsInspectionMock.operationalState);
  }

  if (path === '/acs/health') {
    return mockEnvelope(acsInspectionMock.health);
  }

  return mockEnvelope({});
}

async function requestAcs(path) {
  if (FORCE_MOCKS) {
    const envelope = fallbackFor(path);
    return attachMeta(envelope.data, { source: 'fallback', apiBase: API_BASE, forced: true, message: 'Using ACS mock fallback.' });
  }

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`ACS API ${response.status} for ${path}`);
    }

    const envelope = await response.json();
    if (!envelope.success) {
      throw new Error(envelope.error?.message || envelope.blockedReason || `ACS API rejected ${path}`);
    }

    return attachMeta(envelope.data, {
      source: 'api',
      apiBase: API_BASE,
      correlationId: envelope.correlationId,
      timestamp: envelope.timestamp,
      version: envelope.version,
      warnings: envelope.warnings || []
    });
  } catch (error) {
    const envelope = fallbackFor(path);
    return attachMeta(envelope.data, {
      source: 'fallback',
      apiBase: API_BASE,
      message: 'Using ACS mock fallback — ACS HTTP API unavailable.',
      error: error?.message || 'ACS API unavailable'
    });
  }
}

export function getAcsMeta(data) {
  return data?.__acsMeta || null;
}

export const acsApi = {
  getHealth: () => requestAcs('/acs/health'),
  getCapabilities: (level) => requestAcs(`/acs/capabilities${level ? `?level=${encodeURIComponent(level)}` : ''}`),
  getTenantServices: (tenantId) => requestAcs(`/acs/tenant-services${tenantId ? `/${encodeURIComponent(tenantId)}` : ''}`),
  getProductAccess: (walletAddress, productId) => {
    if (!walletAddress) return requestAcs('/acs/product-access');
    return requestAcs(`/acs/product-access/${encodeURIComponent(walletAddress)}${productId ? `/${encodeURIComponent(productId)}` : ''}`);
  },
  getPolicyMatrix: () => requestAcs('/acs/policy-matrix'),
  getPolicyCheck: ({ capabilityId, tenantId, walletAddress } = {}) => {
    const params = new URLSearchParams();
    if (capabilityId) params.set('capabilityId', capabilityId);
    if (tenantId) params.set('tenantId', tenantId);
    if (walletAddress) params.set('wallet', walletAddress);
    return requestAcs(`/acs/policy-check?${params.toString()}`);
  },
  getStatus: (walletAddress) => requestAcs(`/acs/status/${encodeURIComponent(walletAddress || '0xunlicensed')}`),
  getReadiness: (walletAddress) => requestAcs(`/acs/readiness/${encodeURIComponent(walletAddress || '0xunlicensed')}`),
  getOperationalState: (walletAddress) => requestAcs(`/acs/operational-state/${encodeURIComponent(walletAddress || '0xunlicensed')}`),
  getUserStatus: (walletAddress, { tenantId, productId } = {}) => {
    const params = new URLSearchParams();
    if (tenantId) params.set('tenantId', tenantId);
    if (productId) params.set('productId', productId);
    const query = params.toString();
    return requestAcs(`/acs/user-status/${encodeURIComponent(walletAddress || '0xunlicensed')}${query ? `?${query}` : ''}`);
  },
  getPerformanceRecords: () => requestAcs('/acs/performance-records'),
  getReceipts: () => requestAcs('/acs/receipts')
};
