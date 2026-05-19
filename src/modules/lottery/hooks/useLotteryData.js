import { useMemo } from 'react';
import { getLotteryOverview } from '../services/lotteryService';

export function useLotteryData() {
  return useMemo(() => getLotteryOverview(), []);
}
