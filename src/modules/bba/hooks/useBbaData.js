import { useMemo } from 'react';
import { getBbaOverview, getBbaReadiness } from '../services/bbaService';

export function useBbaData() {
  return useMemo(() => {
    const data = getBbaOverview();
    return {
      ...data,
      readiness: getBbaReadiness(),
    };
  }, []);
}
