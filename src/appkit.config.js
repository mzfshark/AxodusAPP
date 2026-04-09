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

const resolvedAppUrl = import.meta.env.VITE_PUBLIC_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5174');

export const metadata = {
  name: 'Axodus Dashboard',
  description: 'Multi-chain portfolio and performance dashboard',
  url: resolvedAppUrl,
  icons: [`${resolvedAppUrl}/icon.png`]
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

// Solana Adapter - simplified to avoid build issues
export const solanaAdapter = new SolanaAdapter({
  wallets: []
});

// All networks for export
export const networks = [...evmNetworks, solana];

// AppKit instance
export const appKit = createAppKit({
  adapters: [wagmiAdapter, solanaAdapter],
  networks,
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
