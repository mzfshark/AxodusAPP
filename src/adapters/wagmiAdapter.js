import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import {
  mainnet, bsc, arbitrum, harmonyOne, avalanche, polygon,
  celo, optimism, opBNB, base, cronos
} from '@reown/appkit/networks';

const projectId = import.meta.env.VITE_PROJECT_ID;

export const networks = [
  mainnet, bsc, arbitrum, harmonyOne, avalanche,
  polygon, celo, optimism, opBNB, base, cronos
];

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
  ssr: true
});
