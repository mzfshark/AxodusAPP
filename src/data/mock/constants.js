export const MOCK_SOURCE = 'axodus-dev-mock';

export const MOCK_NOTICE =
  'Development-only mock data. Values are synthetic and must not be treated as financial, legal, or governance advice.';

export const EVM_CHAINS = [
  { chainId: 1, name: 'Ethereum', nativeCurrency: 'ETH', rpcLabel: 'Ethereum public RPC', explorerUrl: 'https://etherscan.io', supported: true, primary: false },
  { chainId: 137, name: 'Polygon', nativeCurrency: 'MATIC', rpcLabel: 'Polygon public RPC', explorerUrl: 'https://polygonscan.com', supported: true, primary: false },
  { chainId: 42161, name: 'Arbitrum', nativeCurrency: 'ETH', rpcLabel: 'Arbitrum public RPC', explorerUrl: 'https://arbiscan.io', supported: true, primary: false },
  { chainId: 8453, name: 'Base', nativeCurrency: 'ETH', rpcLabel: 'Base public RPC', explorerUrl: 'https://basescan.org', supported: true, primary: false },
  { chainId: 1666600000, name: 'Harmony', nativeCurrency: 'ONE', rpcLabel: 'Harmony public RPC', explorerUrl: 'https://explorer.harmony.one', supported: true, primary: true },
];

export const MOCK_DATES = {
  now: '2026-05-16T00:00:00.000Z',
  recent: '2026-05-15T18:30:00.000Z',
  nextWeek: '2026-05-23T00:00:00.000Z',
};
