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
      governanceValidations: miningMock.governanceValidations.filter((item) => item.targetId === provider.id)
    };
  },
  getHashTokens: () => miningMock.hashTokens,
  getVaults: () => miningMock.vaults,
  getAllocations: () => miningMock.allocations,
  getTreasury: () => ({
    summary: miningMock.summary,
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

