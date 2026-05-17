export const dexMock = {
  summary: { supportedPairs: 4, liquidityMock: '$18.2M mock', swapsDisabled: true, readOnlyMode: true, supportedChains: ['Ethereum', 'Polygon', 'Arbitrum', 'Base'] },
  pairs: [
    { id: 'dex-pair-001', base: 'AXO', quote: 'USDC', chain: 'Polygon', liquidity: '$7.2M mock', volume24h: '$420K mock', status: 'preview', swapEnabled: false, riskLevel: 'medium' },
    { id: 'dex-pair-002', base: 'ETH', quote: 'USDC', chain: 'Ethereum', liquidity: '$6.1M mock', volume24h: '$880K mock', status: 'preview', swapEnabled: false, riskLevel: 'low' },
    { id: 'dex-pair-003', base: 'AXO', quote: 'ETH', chain: 'Arbitrum', liquidity: '$3.4M mock', volume24h: '$210K mock', status: 'preview', swapEnabled: false, riskLevel: 'medium' },
    { id: 'dex-pair-004', base: 'AXO', quote: 'USDC', chain: 'Base', liquidity: '$1.5M mock', volume24h: '$90K mock', status: 'planned', swapEnabled: false, riskLevel: 'high' },
  ],
};
