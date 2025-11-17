// src/appkit.config.js
import { createAppKit } from '@reown/appkit/react';
import { wagmiAdapter } from '@adapters/wagmiAdapter';
import { solanaAdapter } from '@adapters/solanaAdapter';
import { bitcoinAdapter } from '@adapters/bitcoinAdapter';
import { mainnet, bsc, harmonyOne, arbitrum, polygon, solana, bitcoin, avalanche, base, celo, optimism, opBNB, cronos } from '@reown/appkit/networks';

export const projectId = import.meta.env.VITE_PROJECT_ID || '5e64f2b59a17e7bce18c075ae0fb40a8';

export const metadata = {
  name: 'Axodus Dashboard',
  description: 'Multi-chain portfolio and performance dashboard',
  url: 'https://app.axodus.finance',
  icons: ['https://app.axodus.finance/icon.png']
};

export const tron = {
  id: 'tron',
  name: 'Tron',
  symbol: 'TRX',
  rpcUrl: 'https://api.trongrid.io',
  note: 'Adapter not implemented'
};

export const networks = {mainnet, bsc, arbitrum, harmonyOne, avalanche,
  polygon, celo, optimism, opBNB, base, cronos, solana, bitcoin};

// Lazy initialization - será chamado pelo AppKitProvider
let appKitInstance = null;

export const initializeAppKit = () => {
  if (!appKitInstance) {
    appKitInstance = createAppKit({
      adapters: [wagmiAdapter, solanaAdapter, bitcoinAdapter],
      networks: [mainnet, bsc, arbitrum, harmonyOne, avalanche,
        polygon, celo, optimism, opBNB, base, cronos, solana, bitcoin],
      projectId,
      metadata: metadata,
      features: {
        analytics: true,
        enableWalletConnect: true,
        enableNetworkSwitch: true,
      }
    });
  }
  return appKitInstance;
};

export default {
  projectId,
  metadata,
  networks,
  tron,
  initializeAppKit
};
