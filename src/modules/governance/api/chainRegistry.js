import {
  COMPLIANT_CONSTITUTIONAL_STANDING,
  collectGovernanceGuardrailReasons,
  getConstitutionalStanding,
  governanceStatusFromStanding,
  normalizeReasonSeverity,
} from '../utils/governanceState';

const governanceApiBase = import.meta.env.VITE_GOVERNANCE_API_URL || '/governance-api';
const registryEndpoint = `${governanceApiBase}/registry/chains`;

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

const compatible = { status: 'compatible', reasonCodes: [] };

function normalizePluginCapability(capability) {
  if (!capability) return capability;
  const constitutionalStanding = getConstitutionalStanding(capability);
  return {
    ...capability,
    governanceStatus: capability.governanceStatus ?? governanceStatusFromStanding(constitutionalStanding),
    constitutionalStanding,
  };
}

function normalizePluginCapabilities(pluginCapabilities) {
  const capabilities = pluginCapabilities ?? {};
  return Object.fromEntries(
    Object.entries(capabilities).map(([pluginType, capability]) => [pluginType, normalizePluginCapability(capability)]),
  );
}

export function normalizeChainGovernanceState(chain) {
  const capabilities = chain.capabilities ?? {};
  const constitutionalStanding = getConstitutionalStanding(
    capabilities.constitutionalStanding || capabilities.constitutionalCompatibility || chain.constitutionalStanding || chain.constitutionalCompatibility
      ? { ...chain, ...capabilities }
      : null,
  );
  const governanceStatus = chain.governanceStatus ?? capabilities.governanceStatus ?? governanceStatusFromStanding(constitutionalStanding);

  return {
    ...chain,
    governanceStatus,
    federationMember: chain.federationMember ?? true,
    federationTier: chain.federationTier ?? (chain.roles?.includes('execution') ? 'root' : chain.legacyHarmonyAdapter ? 'observer' : 'partner'),
    constitutionalStanding,
    capabilities: {
      ...capabilities,
      governanceStatus,
      constitutionalStanding,
      pluginCapabilities: normalizePluginCapabilities(capabilities.pluginCapabilities),
    },
    indexingStatus: chain.indexingStatus
      ? {
          ...chain.indexingStatus,
          reasonSeverity: normalizeReasonSeverity(chain.indexingStatus.reasonCode, chain.indexingStatus.reasonSeverity),
        }
      : chain.indexingStatus,
  };
}

const evmLocalGovernanceModels = [
  '$Neurons',
  'local-token',
  'auto-generated-platform-token',
  'multisig',
  'gauge',
  'reputation',
  'nft-governance',
  'plugin-defined',
];

const harmonyLocalGovernanceModels = [
  '$Neurons',
  'local-token',
  'auto-generated-platform-token',
  'multisig',
  'harmony-validator-snapshot',
  'harmony-delegation-snapshot',
  'plugin-defined',
];

const pluginCapability = ({ pluginType, label, adapter, vote = true, execute = true, strategy, legacy = false }) => ({
  interfaceType: pluginType,
  label,
  adapter,
  governanceNucleus: 'local',
  governanceStatus: 'compliant',
  actions: { createProposal: true, vote, execute, settings: true },
  executionModes: legacy ? ['legacy-adapter'] : ['direct', 'remote', 'federal'],
  votingPowerStrategy: strategy,
  compatibleRoles: legacy ? ['voting', 'spoke'] : ['execution', 'voting', 'spoke'],
  constitutionalCompatibility: compatible,
  constitutionalStanding: COMPLIANT_CONSTITUTIONAL_STANDING,
  requiresDeployment: true,
  requiresIndexer: true,
  legacy,
});

const evmPluginCapabilities = {
  tokenVoting: pluginCapability({ pluginType: 'tokenVoting', label: 'Token Voting', adapter: 'evm', strategy: 'erc20-votes' }),
  nativeTokenVoting: pluginCapability({
    pluginType: 'nativeTokenVoting',
    label: 'Native Token Voting',
    adapter: 'evm',
    strategy: 'native-token-adapter',
  }),
  multisig: pluginCapability({
    pluginType: 'multisig',
    label: 'Multisig',
    adapter: 'evm',
    strategy: 'multisig-membership',
  }),
  admin: pluginCapability({
    pluginType: 'admin',
    label: 'Admin',
    adapter: 'evm',
    vote: false,
    strategy: 'admin-permission',
  }),
  lockToVote: pluginCapability({ pluginType: 'lockToVote', label: 'Lock To Vote', adapter: 'evm', strategy: 'lock-to-vote' }),
  gauge: pluginCapability({ pluginType: 'gauge', label: 'Gauge', adapter: 'evm', strategy: 'gauge-weight' }),
  capitalDistributor: pluginCapability({
    pluginType: 'capitalDistributor',
    label: 'Capital Distributor',
    adapter: 'evm',
    vote: false,
    strategy: 'treasury-policy',
  }),
  spp: pluginCapability({
    pluginType: 'spp',
    label: 'Staged Proposal Processor',
    adapter: 'evm',
    vote: false,
    strategy: 'staged-proposal',
  }),
};

const harmonyPluginCapabilities = {
  tokenVoting: pluginCapability({
    pluginType: 'tokenVoting',
    label: 'Token Voting',
    adapter: 'harmony',
    strategy: 'erc20-votes',
    legacy: true,
  }),
  nativeTokenVoting: pluginCapability({
    pluginType: 'nativeTokenVoting',
    label: 'Native Token Voting',
    adapter: 'harmony',
    strategy: 'native-token-adapter',
    legacy: true,
  }),
  multisig: pluginCapability({
    pluginType: 'multisig',
    label: 'Multisig',
    adapter: 'harmony',
    strategy: 'multisig-membership',
    legacy: true,
  }),
  admin: pluginCapability({
    pluginType: 'admin',
    label: 'Admin',
    adapter: 'harmony',
    vote: false,
    strategy: 'admin-permission',
    legacy: true,
  }),
  harmonyVoting: pluginCapability({
    pluginType: 'harmonyVoting',
    label: 'Harmony Voting',
    adapter: 'harmony',
    strategy: 'harmony-validator-snapshot',
    legacy: true,
  }),
  harmonyHipVoting: pluginCapability({
    pluginType: 'harmonyHipVoting',
    label: 'Harmony HIP Voting',
    adapter: 'harmony',
    strategy: 'harmony-validator-snapshot',
    legacy: true,
  }),
  harmonyDelegationVoting: pluginCapability({
    pluginType: 'harmonyDelegationVoting',
    label: 'Harmony Delegation Voting',
    adapter: 'harmony',
    strategy: 'harmony-delegation-snapshot',
    legacy: true,
  }),
};

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
    governanceStatus: 'compliant',
    federationMember: true,
    federationTier: 'root',
    finality: { confirmationBlocks: 12, reorgWindowBlocks: 96 },
    nativeCurrency: { symbol: 'ETH', decimals: 18 },
    capabilities: {
      governance: true,
      voting: true,
      treasury: true,
      remoteExecution: true,
      constitutionalConditions: true,
      governanceNuclei: ['constitutional', 'local'],
      constitutionalCompatibility: compatible,
      constitutionalStanding: COMPLIANT_CONSTITUTIONAL_STANDING,
      governanceStatus: 'compliant',
      localGovernanceModels: evmLocalGovernanceModels,
      supportedPluginTypes: evmPluginTypes,
      pluginCapabilities: evmPluginCapabilities,
    },
    indexingStatus: { requested: true, rpcConfigured: false, status: 'notConfigured', reasonCode: 'INDEXER_STATE_NOT_READY', reasonSeverity: 'warning' },
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
    governanceStatus: 'compliant',
    federationMember: true,
    federationTier: 'partner',
    finality: { confirmationBlocks: 12, reorgWindowBlocks: 96 },
    nativeCurrency: { symbol: 'ETH', decimals: 18 },
    capabilities: {
      governance: true,
      voting: true,
      treasury: true,
      remoteExecution: true,
      constitutionalConditions: true,
      governanceNuclei: ['constitutional', 'local'],
      constitutionalCompatibility: compatible,
      constitutionalStanding: COMPLIANT_CONSTITUTIONAL_STANDING,
      governanceStatus: 'compliant',
      localGovernanceModels: evmLocalGovernanceModels,
      supportedPluginTypes: evmPluginTypes,
      pluginCapabilities: evmPluginCapabilities,
    },
    indexingStatus: { requested: true, rpcConfigured: false, status: 'notConfigured', reasonCode: 'INDEXER_STATE_NOT_READY', reasonSeverity: 'warning' },
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
    governanceStatus: 'compliant',
    federationMember: true,
    federationTier: 'partner',
    finality: { confirmationBlocks: 30, reorgWindowBlocks: 300 },
    nativeCurrency: { symbol: 'ETH', decimals: 18 },
    capabilities: {
      governance: true,
      voting: true,
      treasury: true,
      remoteExecution: true,
      constitutionalConditions: true,
      governanceNuclei: ['constitutional', 'local'],
      constitutionalCompatibility: compatible,
      constitutionalStanding: COMPLIANT_CONSTITUTIONAL_STANDING,
      governanceStatus: 'compliant',
      localGovernanceModels: evmLocalGovernanceModels,
      supportedPluginTypes: evmPluginTypes,
      pluginCapabilities: evmPluginCapabilities,
    },
    indexingStatus: { requested: true, rpcConfigured: false, status: 'notConfigured', reasonCode: 'INDEXER_STATE_NOT_READY', reasonSeverity: 'warning' },
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
    governanceStatus: 'compliant',
    federationMember: true,
    federationTier: 'partner',
    finality: { confirmationBlocks: 30, reorgWindowBlocks: 300 },
    nativeCurrency: { symbol: 'ETH', decimals: 18 },
    capabilities: {
      governance: true,
      voting: true,
      treasury: true,
      remoteExecution: true,
      constitutionalConditions: true,
      governanceNuclei: ['constitutional', 'local'],
      constitutionalCompatibility: compatible,
      constitutionalStanding: COMPLIANT_CONSTITUTIONAL_STANDING,
      governanceStatus: 'compliant',
      localGovernanceModels: evmLocalGovernanceModels,
      supportedPluginTypes: evmPluginTypes,
      pluginCapabilities: evmPluginCapabilities,
    },
    indexingStatus: { requested: true, rpcConfigured: false, status: 'notConfigured', reasonCode: 'INDEXER_STATE_NOT_READY', reasonSeverity: 'warning' },
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
    governanceStatus: 'compliant',
    federationMember: true,
    federationTier: 'partner',
    finality: { confirmationBlocks: 128, reorgWindowBlocks: 512 },
    nativeCurrency: { symbol: 'POL', decimals: 18 },
    capabilities: {
      governance: true,
      voting: true,
      treasury: true,
      remoteExecution: true,
      constitutionalConditions: true,
      governanceNuclei: ['constitutional', 'local'],
      constitutionalCompatibility: compatible,
      constitutionalStanding: COMPLIANT_CONSTITUTIONAL_STANDING,
      governanceStatus: 'compliant',
      localGovernanceModels: evmLocalGovernanceModels,
      supportedPluginTypes: evmPluginTypes,
      pluginCapabilities: evmPluginCapabilities,
    },
    indexingStatus: { requested: true, rpcConfigured: false, status: 'notConfigured', reasonCode: 'INDEXER_STATE_NOT_READY', reasonSeverity: 'warning' },
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
    governanceStatus: 'under-review',
    federationMember: true,
    federationTier: 'observer',
    finality: { confirmationBlocks: 100, reorgWindowBlocks: 7200 },
    nativeCurrency: { symbol: 'ONE', decimals: 18 },
    capabilities: {
      governance: true,
      voting: true,
      treasury: true,
      remoteExecution: false,
      constitutionalConditions: false,
      governanceNuclei: ['constitutional', 'local'],
      constitutionalCompatibility: compatible,
      constitutionalStanding: { status: 'under-review', reasonCodes: ['REMOTE_EXECUTION_GUARDRAIL_ACTIVE'], reasonSeverity: 'constitutional' },
      governanceStatus: 'under-review',
      localGovernanceModels: harmonyLocalGovernanceModels,
      supportedPluginTypes: [
        'tokenVoting',
        'nativeTokenVoting',
        'multisig',
        'admin',
        'harmonyVoting',
        'harmonyHipVoting',
        'harmonyDelegationVoting',
      ],
      pluginCapabilities: harmonyPluginCapabilities,
    },
    indexingStatus: { requested: true, rpcConfigured: true, status: 'configured', reasonCode: null, reasonSeverity: null },
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

  return data.map(normalizeChainGovernanceState);
}

export function getFallbackChainRegistry() {
  return fallbackChains.map(normalizeChainGovernanceState);
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
  const governanceStatusCounts = chains.reduce((acc, chain) => {
    const status = chain.governanceStatus ?? 'under-review';
    acc[status] = (acc[status] ?? 0) + 1;
    return acc;
  }, {});
  const federationTierCounts = chains.reduce((acc, chain) => {
    const tier = chain.federationTier ?? 'observer';
    acc[tier] = (acc[tier] ?? 0) + 1;
    return acc;
  }, {});
  const reasonSeverityCounts = chains.reduce((acc, chain) => {
    const severity = chain.indexingStatus?.reasonSeverity ?? chain.constitutionalStanding?.reasonSeverity;
    if (!severity) return acc;
    acc[severity] = (acc[severity] ?? 0) + 1;
    return acc;
  }, {});
  const guardrailReasons = chains.flatMap(collectGovernanceGuardrailReasons);

  return {
    totalChains: chains.length,
    evmCount,
    legacyCount,
    pluginTypes: pluginTypes.size,
    roleCounts,
    governanceStatusCounts,
    federationTierCounts,
    reasonSeverityCounts,
    guardrailReasons,
  };
}
