import { useMemo } from 'react';
import { getMarketplaceMetrics, getMarketplaceOverview } from '../services/marketplaceService';
import { getMarketplaceOperationalSummary } from '../services/operationalServices';

export function useMarketplaceData() {
  return useMemo(() => ({
    ...getMarketplaceOverview(),
    metrics: getMarketplaceMetrics(),
    operations: getMarketplaceOperationalSummary(),
  }), []);
}
