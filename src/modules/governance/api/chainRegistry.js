const registryEndpoint = '/api/registry/chains';

const evmPluginTypes = [
  'tokenVoting',
  'nativeTokenVoting',
  'multisig',
  'admin',
  'lockToVote',
  'gauge',
  'capitalDistributor',
  'spp',
];

const fallbackChains = [
  {
    chainId: 11155111,
    slug: 'ethereum-sepolia',
    network: 'ethereum-sepolia',
    configKey: 'ETHEREUM_SEPOLIA',
    name: 'Ethereum Sepolia',
    family: 'evm',
    adapter: 'evm',
    environment: 'testnet',
    roles: ['execution', 'voting', 'spoke'],
    legacyHarmonyAdapter: false,
    finality: { confirmationBlocks: 12, reorgWindowBlocks: 96 },
    nativeCurrency: { symbol: 'ETH', decimals: 18 },
    capabilities: {
      governance: true,
      voting: true,
      treasury: true,
      remoteExecution: true,
      constitutionalConditions: true,
      supportedPluginTypes: evmPluginTypes,
    },
  },
  {
    chainId: 1,
    slug: 'ethereum-mainnet',
    network: 'ethereum-mainnet',
    configKey: 'ETHEREUM_MAINNET',
    name: 'Ethereum Mainnet',
    family: 'evm',
    adapter: 'evm',
    environment: 'mainnet',
    roles: ['voting', 'spoke'],
    legacyHarmonyAdapter: false,
    finality: { confirmationBlocks: 12, reorgWindowBlocks: 96 },
    nativeCurrency: { symbol: 'ETH', decimals: 18 },
    capabilities: {
      governance: true,
      voting: true,
      treasury: true,
      remoteExecution: true,
      constitutionalConditions: true,
      supportedPluginTypes: evmPluginTypes,
    },
  },
  {
    chainId: 8453,
    slug: 'base-mainnet',
    network: 'base-mainnet',
    configKey: 'BASE_MAINNET',
    name: 'Base Mainnet',
    family: 'evm',
    adapter: 'evm',
    environment: 'mainnet',
    roles: ['voting', 'spoke'],
    legacyHarmonyAdapter: false,
    finality: { confirmationBlocks: 30, reorgWindowBlocks: 300 },
    nativeCurrency: { symbol: 'ETH', decimals: 18 },
    capabilities: {
      governance: true,
      voting: true,
      treasury: true,
      remoteExecution: true,
      constitutionalConditions: true,
      supportedPluginTypes: evmPluginTypes,
    },
  },
  {
    chainId: 42161,
    slug: 'arbitrum-mainnet',
    network: 'arbitrum-mainnet',
    configKey: 'ARBITRUM_MAINNET',
    name: 'Arbitrum One',
    family: 'evm',
    adapter: 'evm',
    environment: 'mainnet',
    roles: ['voting', 'spoke'],
    legacyHarmonyAdapter: false,
    finality: { confirmationBlocks: 30, reorgWindowBlocks: 300 },
    nativeCurrency: { symbol: 'ETH', decimals: 18 },
    capabilities: {
      governance: true,
      voting: true,
      treasury: true,
      remoteExecution: true,
      constitutionalConditions: true,
      supportedPluginTypes: evmPluginTypes,
    },
  },
  {
    chainId: 137,
    slug: 'polygon-mainnet',
    network: 'polygon-mainnet',
    configKey: 'POLYGON_MAINNET',
    name: 'Polygon Mainnet',
    family: 'evm',
    adapter: 'evm',
    environment: 'mainnet',
    roles: ['voting', 'spoke'],
    legacyHarmonyAdapter: false,
    finality: { confirmationBlocks: 128, reorgWindowBlocks: 512 },
    nativeCurrency: { symbol: 'POL', decimals: 18 },
    capabilities: {
      governance: true,
      voting: true,
      treasury: true,
      remoteExecution: true,
      constitutionalConditions: true,
      supportedPluginTypes: evmPluginTypes,
    },
  },
  {
    chainId: 1666600000,
    slug: 'harmony-mainnet',
    network: 'harmony-mainnet',
    configKey: 'HARMONY_MAINNET',
    name: 'Harmony Mainnet',
    family: 'harmony',
    adapter: 'harmony',
    environment: 'mainnet',
    roles: ['voting', 'spoke'],
    legacyHarmonyAdapter: true,
    finality: { confirmationBlocks: 100, reorgWindowBlocks: 7200 },
    nativeCurrency: { symbol: 'ONE', decimals: 18 },
    capabilities: {
      governance: true,
      voting: true,
      treasury: true,
      remoteExecution: false,
      constitutionalConditions: false,
      supportedPluginTypes: [
        'tokenVoting',
        'nativeTokenVoting',
        'multisig',
        'admin',
        'harmonyVoting',
        'harmonyHipVoting',
        'harmonyDelegationVoting',
      ],
    },
  },
];

export async function fetchChainRegistry() {
  const response = await fetch(registryEndpoint, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Registry request failed with HTTP ${response.status}`);
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('Registry response is not an array');
  }

  return data;
}

export function getFallbackChainRegistry() {
  return fallbackChains;
}

export function summarizeChainRegistry(chains) {
  const roleCounts = chains.reduce(
    (acc, chain) => {
      chain.roles?.forEach((role) => {
        acc[role] = (acc[role] ?? 0) + 1;
      });
      return acc;
    },
    { execution: 0, voting: 0, spoke: 0 },
  );

  const evmCount = chains.filter((chain) => chain.family === 'evm').length;
  const legacyCount = chains.filter((chain) => chain.legacyHarmonyAdapter).length;
  const pluginTypes = new Set(chains.flatMap((chain) => chain.capabilities?.supportedPluginTypes ?? []));

  return {
    totalChains: chains.length,
    evmCount,
    legacyCount,
    pluginTypes: pluginTypes.size,
    roleCounts,
  };
}
