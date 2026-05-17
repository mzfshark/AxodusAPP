// src/appkit.config.js
import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { createConfig, http } from 'wagmi';
import {
  arbitrum as wagmiArbitrum,
  avalanche as wagmiAvalanche,
  base as wagmiBase,
  bsc as wagmiBsc,
  celo as wagmiCelo,
  cronos as wagmiCronos,
  harmonyOne as wagmiHarmonyOne,
  mainnet as wagmiMainnet,
  optimism as wagmiOptimism,
  polygon as wagmiPolygon,
  sepolia as wagmiSepolia,
} from 'wagmi/chains';
import { 
  mainnet, 
  sepolia,
  bsc, 
  harmonyOne, 
  arbitrum, 
  polygon, 
  avalanche, 
  base, 
  celo, 
  optimism, 
  opBNB, 
  cronos 
} from '@reown/appkit/networks';

export const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '';
export const hasWalletConnectProjectId = Boolean(projectId);

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
  sepolia,
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

const wagmiFallbackChains = [
  wagmiMainnet,
  wagmiSepolia,
  wagmiBsc,
  wagmiArbitrum,
  wagmiHarmonyOne,
  wagmiAvalanche,
  wagmiPolygon,
  wagmiCelo,
  wagmiOptimism,
  wagmiBase,
  wagmiCronos,
];

const fallbackTransports = wagmiFallbackChains.reduce((acc, chain) => {
  acc[chain.id] = http();
  return acc;
}, {});

// Wagmi Adapter for EVM chains
export const wagmiAdapter = hasWalletConnectProjectId
  ? new WagmiAdapter({
      projectId,
      networks: evmNetworks
    })
  : null;

export const wagmiConfig = wagmiAdapter?.wagmiConfig ?? createConfig({
  chains: wagmiFallbackChains,
  transports: fallbackTransports,
});

// All networks for export
export const networks = evmNetworks;

// AppKit instance
export const appKit = hasWalletConnectProjectId
  ? createAppKit({
      adapters: [wagmiAdapter],
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
    })
  : null;

export default appKit;
