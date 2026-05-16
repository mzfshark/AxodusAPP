import { EVM_CHAINS } from './constants';

export const walletMock = {
  states: [
    { id: 'wallet-state-disconnected', connected: false, address: null, shortAddress: null, chainId: null, chainName: null, status: 'disconnected', message: 'Connect wallet to access protected modules.', actionLabel: 'Connect wallet' },
    { id: 'wallet-state-connected', connected: true, address: '0xAxoD000000000000000000000000000000000001', shortAddress: '0xAxoD...0001', chainId: 1666600000, chainName: 'Harmony', status: 'connected', message: 'Wallet connected on supported primary chain.', actionLabel: 'Manage wallet' },
    { id: 'wallet-state-wrong-network', connected: true, address: '0xAxoD000000000000000000000000000000000001', shortAddress: '0xAxoD...0001', chainId: 10, chainName: 'Optimism', status: 'wrong-network', message: 'Switch to a supported Axodus chain.', actionLabel: 'Switch network' },
    { id: 'wallet-state-missing-project-id', connected: false, address: null, shortAddress: null, chainId: null, chainName: null, status: 'missing-project-id', message: 'VITE_WALLETCONNECT_PROJECT_ID is not configured.', actionLabel: 'Configure env' },
    { id: 'wallet-state-unsupported-chain', connected: true, address: '0xAxoD000000000000000000000000000000000001', shortAddress: '0xAxoD...0001', chainId: 999, chainName: 'Unsupported', status: 'unsupported-chain', message: 'Current chain is not supported by the MVP.', actionLabel: 'Switch chain' },
  ],
  supportedChains: EVM_CHAINS,
};
