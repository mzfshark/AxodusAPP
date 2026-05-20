import { miningMock } from '@/data/mock';
import { filterProviders } from '../utils/miningUtils';

export const miningService = {
  getSummary: () => miningMock.summary,
  getProviders: (filters = {}) => filterProviders(miningMock.providers, filters, miningMock.riskProfiles),
  getProviderBySlug: (slug) => {
    const provider = miningMock.providers.find((item) => item.slug === slug);
    if (!provider) return null;

    return {
      provider,
      riskProfile: miningMock.riskProfiles.find((item) => item.providerId === provider.id),
      liquidity: miningMock.liquidity.find((item) => item.providerId === provider.id),
      hashTokens: miningMock.hashTokens.filter((item) => item.providerId === provider.id),
      allocations: miningMock.allocations.filter((item) => item.providerId === provider.id),
      dueDiligence: miningMock.providerDueDiligence.find((item) => item.providerId === provider.id),
      governanceValidations: miningMock.governanceValidations.filter((item) => item.targetId === provider.id),
      telemetry: {
        reportingStatus: provider.integrationReadiness === 'mock-ready' ? 'mock telemetry available' : 'manual review',
        apiAvailability: provider.apiAvailability || 'fallback',
        operationalMaturity: provider.operationalMaturity || 'mock',
        latestMockSignal: provider.status === 'future' ? 'inactive future architecture' : 'provider observable'
      }
    };
  },
  getHashTokens: () => miningMock.hashTokens,
  getVaults: () => miningMock.vaults,
  getAllocations: () => miningMock.allocations,
  getTreasury: () => ({
    summary: miningMock.summary,
    totalExposureUsd: miningMock.treasuryExposures.reduce((total, exposure) => total + exposure.notionalUsd, 0),
    exposureByRiskLevel: miningMock.treasuryExposures.reduce((groups, exposure) => {
      const risk = miningMock.riskProfiles.find((item) => item.providerId === exposure.providerId);
      const level = risk?.riskLevel || 'medium';
      groups[level] = (groups[level] || 0) + exposure.notionalUsd;
      return groups;
    }, {}),
    exposureByAsset: miningMock.treasuryExposures.reduce((groups, exposure) => {
      const key = exposure.assetSymbol || exposure.providerId;
      groups[key] = (groups[key] || 0) + exposure.notionalUsd;
      return groups;
    }, {}),
    exposureByCustodyModel: miningMock.treasuryExposures.reduce((groups, exposure) => {
      const key = exposure.custodyModel || 'mock custody';
      groups[key] = (groups[key] || 0) + exposure.notionalUsd;
      return groups;
    }, {}),
    diversification: {
      providerCount: new Set(miningMock.treasuryExposures.map((exposure) => exposure.providerId)).size,
      largestProviderExposurePct: Math.max(...miningMock.treasuryExposures.map((exposure) => exposure.exposurePct)),
      reserveRatioRange: miningMock.vaults.map((vault) => ({ vaultId: vault.id, reserveRatioPct: vault.reserveRatioPct || 100 }))
    },
    exposures: miningMock.treasuryExposures,
    vaults: miningMock.vaults
  }),
  getRisk: () => ({
    riskProfiles: miningMock.riskProfiles,
    liquidity: miningMock.liquidity
  }),
  getGovernanceValidations: () => miningMock.governanceValidations,
  getProviderDueDiligence: () => miningMock.providerDueDiligence,
  getReports: () => miningMock.reports
};
