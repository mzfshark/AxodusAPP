import { useMemo } from 'react';
import { getMarketplaceMetrics } from '../services/marketplaceService';
import { getMarketplaceOperationalSummary } from '../services/operationalServices';
import { createMockMarketplaceRuntimeSnapshot } from '../repositories';

export function useMarketplaceData() {
  return useMemo(() => ({
    ...createMockMarketplaceRuntimeSnapshot(),
    metrics: getMarketplaceMetrics(),
    operations: getMarketplaceOperationalSummary(),
  }), []);
}
