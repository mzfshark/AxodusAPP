import { BitcoinAdapter } from '@reown/appkit-adapter-bitcoin';
import { bitcoin } from '@reown/appkit/networks';

const projectId = import.meta.env.VITE_PROJECT_ID;
export const networks = [bitcoin];

export const bitcoinAdapter = new BitcoinAdapter({
  projectId,
  networks
});
