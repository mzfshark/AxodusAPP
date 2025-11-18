// src/appkit.config.js
import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { SolanaAdapter } from '@reown/appkit-adapter-solana';
import { 
  mainnet, 
  bsc, 
  harmonyOne, 
  arbitrum, 
  polygon, 
  solana, 
  avalanche, 
  base, 
  celo, 
  optimism, 
  opBNB, 
  cronos 
} from '@reown/appkit/networks';

export const projectId = import.meta.env.VITE_PROJECT_ID || '5e64f2b59a17e7bce18c075ae0fb40a8';

export const metadata = {
  name: 'Axodus Dashboard',
  description: 'Multi-chain portfolio and performance dashboard',
  url: 'https://app.axodus.finance',
  icons: ['https://app.axodus.finance/icon.png']
};

// EVM Networks
export const evmNetworks = [
  mainnet, 
  bsc, 
  arbitrum, 
  harmonyOne, 
  avalanche,
  polygon, 
  celo, 
  optimism, 
  opBNB, 
  base, 
  cronos
];

// Wagmi Adapter for EVM chains
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: evmNetworks
});

// Solana Adapter
export const solanaAdapter = new SolanaAdapter({
  wallets: []
});

// AppKit instance
export const appKit = createAppKit({
  adapters: [wagmiAdapter, solanaAdapter],
  networks: [...evmNetworks, solana],
  projectId,
  metadata,
  features: {
    analytics: true,
    email: false,
    socials: false,
    emailShowWallets: true
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#3b82f6'
  }
});

export default appKit;
