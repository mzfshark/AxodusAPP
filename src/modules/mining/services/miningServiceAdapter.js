import {
  apiEnvelopeSchema,
  governanceValidationSchema,
  hashAllocationSchema,
  hashTokenSchema,
  miningProviderSchema,
  miningReportSchema,
  miningSummarySchema,
  miningVaultSchema,
  providerDetailsSchema,
  providerDueDiligenceSchema,
  riskSummarySchema,
  treasurySummarySchema
} from '../contracts/miningContracts';
import { miningFallback } from './miningFallback';
import { filterProviders } from '../utils/miningUtils';

const DEFAULT_MINING_API_URL = 'http://localhost:8787';
const API_BASE = (import.meta.env.VITE_MINING_API_URL || DEFAULT_MINING_API_URL).replace(/\/$/, '');
const FORCE_MOCKS = import.meta.env.VITE_MINING_USE_MOCKS === 'true';
const FALLBACK_NOTICE = 'Using local mock fallback — Mining API unavailable.';

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

function fallbackMeta(error, forced = false) {
  return {
    source: 'fallback',
    version: 'local-fallback',
    apiBase: API_BASE,
    generatedAt: new Date().toISOString(),
    mock: true,
    stale: true,
    forced,
    message: FALLBACK_NOTICE,
    error: error?.message || 'Mining API unavailable'
  };
}

function apiMeta(meta) {
  return {
    ...meta,
    source: 'api',
    apiBase: API_BASE,
    stale: false,
    message: null
  };
}

function fallbackService() {
  const getProviders = (filters = {}) => filterProviders(miningFallback.providers, filters, miningFallback.riskProfiles);

  return {
    getSummary: () => miningFallback.summary,
    getProviders,
    getProviderBySlug: (slug) => {
      const provider = miningFallback.providers.find((item) => item.slug === slug);
      if (!provider) return null;

      return {
        provider,
        riskProfile: miningFallback.riskProfiles.find((item) => item.providerId === provider.id),
        liquidity: miningFallback.liquidity.find((item) => item.providerId === provider.id),
        hashTokens: miningFallback.hashTokens.filter((item) => item.providerId === provider.id),
        allocations: miningFallback.allocations.filter((item) => item.providerId === provider.id),
        dueDiligence: miningFallback.providerDueDiligence.find((item) => item.providerId === provider.id),
        governanceValidations: miningFallback.governanceValidations.filter((item) => item.targetId === provider.id),
        telemetry: {
          reportingStatus: 'fallback data only',
          apiAvailability: provider.apiAvailability || 'fallback',
          operationalMaturity: provider.operationalMaturity || 'fallback',
          latestMockSignal: 'Mining API unavailable'
        }
      };
    },
    getHashTokens: () => miningFallback.hashTokens,
    getVaults: () => miningFallback.vaults,
    getAllocations: () => miningFallback.allocations,
    getTreasury: () => ({
      summary: miningFallback.summary,
      totalExposureUsd: miningFallback.treasuryExposures.reduce((total, exposure) => total + exposure.notionalUsd, 0),
      exposureByRiskLevel: miningFallback.treasuryExposures.reduce((groups, exposure) => {
        const risk = miningFallback.riskProfiles.find((item) => item.providerId === exposure.providerId);
        const level = risk?.riskLevel || 'medium';
        groups[level] = (groups[level] || 0) + exposure.notionalUsd;
        return groups;
      }, {}),
      exposureByAsset: miningFallback.treasuryExposures.reduce((groups, exposure) => {
        groups[exposure.assetSymbol] = (groups[exposure.assetSymbol] || 0) + exposure.notionalUsd;
        return groups;
      }, {}),
      exposureByCustodyModel: miningFallback.treasuryExposures.reduce((groups, exposure) => {
        groups[exposure.custodyModel] = (groups[exposure.custodyModel] || 0) + exposure.notionalUsd;
        return groups;
      }, {}),
      diversification: {
        providerCount: new Set(miningFallback.treasuryExposures.map((exposure) => exposure.providerId)).size,
        largestProviderExposurePct: Math.max(...miningFallback.treasuryExposures.map((exposure) => exposure.exposurePct)),
        reserveRatioRange: miningFallback.vaults.map((vault) => ({ vaultId: vault.id, reserveRatioPct: vault.reserveRatioPct || 100 }))
      },
      exposures: miningFallback.treasuryExposures,
      vaults: miningFallback.vaults
    }),
    getRisk: () => ({
      riskProfiles: miningFallback.riskProfiles,
      liquidity: miningFallback.liquidity,
      providerRiskMatrix: miningFallback.providers.map((provider) => ({
        providerId: provider.id,
        providerName: provider.name,
        riskProfile: miningFallback.riskProfiles.find((risk) => risk.providerId === provider.id),
        governanceStanding: provider.governanceStanding,
        treasuryCompatible: provider.treasuryCompatible
      }))
    }),
    getGovernanceValidations: () => miningFallback.governanceValidations,
    getProviderDueDiligence: () => miningFallback.providerDueDiligence,
    getReports: () => miningFallback.reports
  };
}

const fallback = fallbackService();

async function requestMining(path, dataSchema, fallbackGetter, options = {}) {
  if (FORCE_MOCKS) {
    return attachMeta(fallbackGetter(), fallbackMeta(new Error('Fallback forced by VITE_MINING_USE_MOCKS'), true));
  }

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      headers: { Accept: 'application/json' }
    });
    const envelope = await response.json();
    const errorEnvelope = apiEnvelopeSchema(dataSchema.nullable()).safeParse(envelope);

    if (!response.ok) {
      if (response.status === 404 && options.nullOnNotFound) return attachMeta(null, apiMeta(errorEnvelope.success ? errorEnvelope.data.meta : { source: 'mining-api', version: 'v1', generatedAt: new Date().toISOString(), mock: true }));
      throw new Error(errorEnvelope.success ? errorEnvelope.data.errors[0]?.message || `Mining API ${response.status}` : `Mining API ${response.status}`);
    }

    const parsed = apiEnvelopeSchema(dataSchema).safeParse(envelope);
    if (!parsed.success) throw new Error('Mining API response failed contract validation');
    if (parsed.data.errors.length) throw new Error(parsed.data.errors[0].message);

    return attachMeta(parsed.data.data, apiMeta(parsed.data.meta));
  } catch (error) {
    return attachMeta(fallbackGetter(), fallbackMeta(error));
  }
}

export function getMiningMeta(data) {
  return data?.__miningMeta || null;
}

export const miningServiceAdapter = {
  getSummary: () => requestMining('/api/mining/summary', miningSummarySchema, fallback.getSummary),
  getProviders: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    const query = params.toString();
    return requestMining(`/api/mining/providers${query ? `?${query}` : ''}`, miningProviderSchema.array(), () => fallback.getProviders(filters));
  },
  getProviderBySlug: (slug) => requestMining(`/api/mining/providers/${slug}`, providerDetailsSchema, () => fallback.getProviderBySlug(slug), { nullOnNotFound: true }),
  getHashTokens: () => requestMining('/api/mining/hash-tokens', hashTokenSchema.array(), fallback.getHashTokens),
  getVaults: () => requestMining('/api/mining/vaults', miningVaultSchema.array(), fallback.getVaults),
  getAllocations: () => requestMining('/api/mining/allocations', hashAllocationSchema.array(), fallback.getAllocations),
  getTreasury: () => requestMining('/api/mining/treasury', treasurySummarySchema, fallback.getTreasury),
  getRisk: () => requestMining('/api/mining/risk', riskSummarySchema, fallback.getRisk),
  getGovernanceValidations: () => requestMining('/api/mining/governance-validations', governanceValidationSchema.array(), fallback.getGovernanceValidations),
  getProviderDueDiligence: () => requestMining('/api/mining/provider-due-diligence', providerDueDiligenceSchema.array(), fallback.getProviderDueDiligence),
  getReports: () => requestMining('/api/mining/reports', miningReportSchema.array(), fallback.getReports)
};
