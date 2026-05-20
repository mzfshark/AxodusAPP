import { miningFallback } from './miningFallback';
import { filterProviders } from '../utils/miningUtils';

export const miningService = {
  getSummary: () => miningFallback.summary,
  getProviders: (filters = {}) => filterProviders(miningFallback.providers, filters, miningFallback.riskProfiles),
  getProviderBySlug: (slug) => miningFallback.providers.find((provider) => provider.slug === slug) || null,
  getHashTokens: () => miningFallback.hashTokens,
  getVaults: () => miningFallback.vaults,
  getAllocations: () => miningFallback.allocations,
  getTreasuryExposures: () => miningFallback.treasuryExposures,
  getRiskProfiles: () => miningFallback.riskProfiles,
  getGovernanceValidations: () => miningFallback.governanceValidations,
  getProviderDueDiligence: () => miningFallback.providerDueDiligence,
  getReports: () => miningFallback.reports
};
