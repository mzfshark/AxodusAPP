import { useMemo } from 'react';
import { getMarketplaceMetrics, getMarketplaceOverview } from '../services/marketplaceService';

export function useMarketplaceData() {
  return useMemo(() => ({
    ...getMarketplaceOverview(),
    metrics: getMarketplaceMetrics(),
  }), []);
}
