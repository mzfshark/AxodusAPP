import { lotteryMock } from '@/data/mock';

export function getLotteryOverview() {
  return lotteryMock;
}

export function getDrawBySlug(slug) {
  return lotteryMock.draws.find((draw) => draw.slug === slug) ?? null;
}

export function filterDraws(draws, filters) {
  return draws.filter((draw) => {
    const prizeMatch =
      filters.prizeRange === 'all' ||
      (filters.prizeRange === 'under-60000' && draw.prizePool < 60000) ||
      (filters.prizeRange === '60000-plus' && draw.prizePool >= 60000);

    return (
      (filters.gameType === 'all' || draw.gameType === filters.gameType) &&
      (filters.chain === 'all' || draw.chain === filters.chain) &&
      (filters.lifecycleState === 'all' || draw.lifecycleState === filters.lifecycleState) &&
      (filters.governanceStanding === 'all' ||
        draw.constitutionalStanding === filters.governanceStanding) &&
      (filters.randomnessStatus === 'all' || draw.vrfStatus === filters.randomnessStatus) &&
      prizeMatch
    );
  });
}

export const initialDrawFilters = {
  gameType: 'all',
  chain: 'all',
  lifecycleState: 'all',
  governanceStanding: 'all',
  randomnessStatus: 'all',
  prizeRange: 'all',
};
