import {
  COMPLIANT_CONSTITUTIONAL_STANDING,
  UNDER_REVIEW_CONSTITUTIONAL_STANDING,
  collectGovernanceGuardrailReasons,
  getConstitutionalStanding,
  governanceStatusFromStanding,
  normalizeGuardrailReason,
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

const uniqueReasonCodes = (...groups) => Array.from(new Set(groups.flat().filter(Boolean)));

function normalizeReasonCodeList(reasonCodes = [], reasonSeverity) {
  return reasonCodes.map((reasonCode) => ({
    reasonCode,
    reasonSeverity: normalizeReasonSeverity(reasonCode, reasonSeverity),
  }));
}

function normalizeConstitutionalLayer(layer, chain, capabilities, constitutionalStanding) {
  const roles = chain.roles ?? [];
  const executionChainAuthorized = roles.includes('execution');
  const legacyReasonCodes = chain.legacyHarmonyAdapter ? ['REMOTE_EXECUTION_GUARDRAIL_ACTIVE'] : [];
  const executionReasonCodes = executionChainAuthorized ? [] : ['EXECUTION_CHAIN_NOT_AUTHORIZED'];
  const reasonCodes = uniqueReasonCodes(executionReasonCodes, legacyReasonCodes, constitutionalStanding?.reasonCodes ?? []);
  const reasonSeverity = reasonCodes.length ? (constitutionalStanding?.reasonSeverity ?? 'constitutional') : null;
  const fallbackExecutionModes = [
    ...(executionChainAuthorized ? ['direct', 'federal'] : []),
    ...(capabilities.remoteExecution ? ['remote'] : []),
    ...(chain.legacyHarmonyAdapter ? ['legacy-adapter'] : []),
  ];

  const normalizedLayer = layer ?? {
    capabilities: [
      { key: 'federal-standards', label: 'Federal standards', enabled: Boolean(capabilities.governance), source: 'Constitutional Governance', reasonCodes: [], reasonSeverity: null },
      { key: 'chain-capabilities', label: 'Chain capabilities', enabled: true, source: 'Constitutional Governance', reasonCodes: [], reasonSeverity: null },
      { key: 'plugin-capabilities', label: 'Plugin capabilities', enabled: Boolean(capabilities.governance), source: 'Constitutional Governance', reasonCodes: [], reasonSeverity: null },
      {
        key: 'constitutional-conditions',
        label: 'Constitutional conditions',
        enabled: Boolean(capabilities.constitutionalConditions),
        source: 'Constitutional Governance',
        reasonCodes: capabilities.constitutionalConditions ? [] : reasonCodes,
        reasonSeverity,
      },
      { key: 'ecosystem-guardrails', label: 'Ecosystem guardrails', enabled: true, source: 'Constitutional Governance', reasonCodes: constitutionalStanding?.reasonCodes ?? [], reasonSeverity: constitutionalStanding?.reasonSeverity ?? null },
      {
        key: 'treasury-constraints',
        label: 'Treasury constraints',
        enabled: Boolean(capabilities.treasury),
        source: 'Constitutional Governance',
        reasonCodes: capabilities.treasury ? ['TREASURY_POLICY_REQUIRES_REVIEW'] : [],
        reasonSeverity: capabilities.treasury ? 'warning' : null,
      },
      { key: 'federation-requirements', label: 'Federation requirements', enabled: chain.federationMember !== false, source: 'Constitutional Governance', reasonCodes: [], reasonSeverity: null },
      { key: 'cross-chain-legitimacy', label: 'Cross-chain legitimacy', enabled: Boolean(capabilities.voting || capabilities.remoteExecution), source: 'Constitutional Governance', reasonCodes: legacyReasonCodes, reasonSeverity: legacyReasonCodes.length ? 'constitutional' : null },
      { key: 'agent-execution-boundaries', label: 'Agent execution boundaries', enabled: true, source: 'Constitutional Governance', reasonCodes: ['AGENT_PERMISSION_SCOPE_EXCEEDED'], reasonSeverity: 'info' },
      { key: 'transparent-reason-codes', label: 'Transparent reason codes', enabled: true, source: 'Constitutional Governance', reasonCodes: [], reasonSeverity: null },
    ],
    conditions: [
      { key: 'chain-constitutionally-enabled', label: 'Chain constitutionally enabled', status: capabilities.governance ? 'satisfied' : 'restricted', source: 'Constitutional Governance', reasonCodes: capabilities.governance ? [] : ['CHAIN_NOT_CONSTITUTIONALLY_ENABLED'], reasonSeverity: capabilities.governance ? null : 'constitutional' },
      { key: 'execution-chain-authorized', label: 'Execution chain authorization', status: executionChainAuthorized ? 'satisfied' : 'restricted', source: 'Constitutional Governance', reasonCodes: executionReasonCodes, reasonSeverity: executionReasonCodes.length ? 'constitutional' : null },
      { key: 'plugin-capability-registered', label: 'Plugin capability registered', status: capabilities.governance ? 'satisfied' : 'requires-review', source: 'Constitutional Governance', reasonCodes: capabilities.governance ? [] : ['PLUGIN_CAPABILITY_NOT_REGISTERED'], reasonSeverity: capabilities.governance ? null : 'warning' },
      { key: 'local-governance-standing-required', label: 'Local governance standing required', status: constitutionalStanding?.status === 'compliant' ? 'satisfied' : 'requires-review', source: 'Constitutional Governance', reasonCodes: constitutionalStanding?.reasonCodes ?? [], reasonSeverity: constitutionalStanding?.reasonSeverity ?? null },
      { key: 'treasury-policy-review-required', label: 'Treasury policy review required', status: capabilities.treasury ? 'requires-review' : 'not-applicable', source: 'Constitutional Governance', reasonCodes: capabilities.treasury ? ['TREASURY_POLICY_REQUIRES_REVIEW'] : [], reasonSeverity: capabilities.treasury ? 'warning' : null },
      { key: 'agent-permission-scope-required', label: 'Agent permission scope required', status: 'requires-review', source: 'Constitutional Governance', reasonCodes: ['AGENT_PERMISSION_SCOPE_EXCEEDED'], reasonSeverity: 'info' },
    ],
    authorityModel: {
      authoritySources: ['$Neurons', 'federation-registry', 'constitutional-condition-registry', 'treasury-policy-registry', 'guardrail-registry'],
      constitutionalAsset: '$Neurons',
      localAuthorityPreserved: true,
      localAuthorityBoundary: 'Local governance controls local operations only while constitutional standing remains observable and valid.',
      treasuryAuthorityBoundary: 'Treasury-sensitive actions require policy review and transparent reason metadata before execution.',
      agentAuthorityBoundary: 'AI and agent execution is bounded by explicit permission scopes and cannot become hidden governance authority.',
    },
    federationModel: {
      federationMember: chain.federationMember !== false,
      federationTier: chain.federationTier,
      federationRoles: roles,
      membershipSource: 'federation-registry',
      localAutonomy: 'constitutionally-bounded',
      requirements: ['chain-constitutionally-enabled', 'plugin-capability-registered', 'local-governance-standing-required'],
    },
    executionModel: {
      executionAuthority: executionChainAuthorized ? 'constitutional-root' : chain.legacyHarmonyAdapter ? 'legacy-voting-adapter' : capabilities.remoteExecution ? 'federated-spoke' : 'not-authorized',
      executionChainAuthorized,
      executionModes: fallbackExecutionModes,
      remoteExecutionGuardrail: Boolean(capabilities.remoteExecution && !executionChainAuthorized),
      treasuryReviewRequired: Boolean(capabilities.treasury),
      reasonCodes,
      reasonSeverity,
    },
  };

  return {
    ...normalizedLayer,
    capabilities: (normalizedLayer.capabilities ?? []).map((capability) => ({
      ...capability,
      reasonSeverity: capability.reasonSeverity ?? (capability.reasonCodes?.[0] ? normalizeReasonSeverity(capability.reasonCodes[0]) : null),
    })),
    conditions: (normalizedLayer.conditions ?? []).map((condition) => ({
      ...condition,
      reasonSeverity: condition.reasonSeverity ?? (condition.reasonCodes?.[0] ? normalizeReasonSeverity(condition.reasonCodes[0], undefined, condition.status === 'restricted' ? 'blocked' : 'warning') : null),
    })),
    executionModel: {
      ...normalizedLayer.executionModel,
      reasonCodes: uniqueReasonCodes(normalizedLayer.executionModel?.reasonCodes ?? []),
      reasonSeverity: normalizedLayer.executionModel?.reasonSeverity ?? reasonSeverity,
    },
    guardrailReasons: [
      ...normalizeReasonCodeList(normalizedLayer.executionModel?.reasonCodes ?? [], normalizedLayer.executionModel?.reasonSeverity),
      ...(normalizedLayer.conditions ?? []).flatMap((condition) => normalizeReasonCodeList(condition.reasonCodes, condition.reasonSeverity)),
      ...(normalizedLayer.capabilities ?? []).flatMap((capability) => normalizeReasonCodeList(capability.reasonCodes, capability.reasonSeverity)),
    ],
  };
}

function normalizePluginCapability(capability, { useFallbackDefaults = false } = {}) {
  if (!capability) return capability;
  const constitutionalStanding = getConstitutionalStanding(
    capability,
    useFallbackDefaults ? COMPLIANT_CONSTITUTIONAL_STANDING : UNDER_REVIEW_CONSTITUTIONAL_STANDING,
  );
  return {
    ...capability,
    governanceStatus: capability.governanceStatus ?? governanceStatusFromStanding(constitutionalStanding),
    constitutionalStanding,
  };
}

function normalizePluginCapabilities(pluginCapabilities, options) {
  const capabilities = pluginCapabilities ?? {};
  return Object.fromEntries(
    Object.entries(capabilities).map(([pluginType, capability]) => [pluginType, normalizePluginCapability(capability, options)]),
  );
}

export function normalizeChainGovernanceState(chain, { useFallbackDefaults = false } = {}) {
  const capabilities = chain.capabilities ?? {};
  const constitutionalStanding = getConstitutionalStanding(
    capabilities.constitutionalStanding || capabilities.constitutionalCompatibility || chain.constitutionalStanding || chain.constitutionalCompatibility
      ? { ...chain, ...capabilities }
      : null,
    useFallbackDefaults ? COMPLIANT_CONSTITUTIONAL_STANDING : UNDER_REVIEW_CONSTITUTIONAL_STANDING,
  );
  const governanceStatus = chain.governanceStatus ?? capabilities.governanceStatus ?? governanceStatusFromStanding(constitutionalStanding);
  const federationMember = chain.federationMember ?? (useFallbackDefaults ? true : undefined);
  const federationTier =
    chain.federationTier ??
    (useFallbackDefaults ? (chain.roles?.includes('execution') ? 'root' : chain.legacyHarmonyAdapter ? 'observer' : 'partner') : undefined);
  const constitutionalLayer = normalizeConstitutionalLayer(chain.constitutionalLayer ?? capabilities.constitutionalLayer, { ...chain, federationMember, federationTier }, capabilities, constitutionalStanding);

  return {
    ...chain,
    governanceStatus,
    federationMember,
    federationTier,
    constitutionalStanding,
    constitutionalLayer,
    guardrailReasons: Array.isArray(chain.guardrailReasons) ? chain.guardrailReasons.map(normalizeGuardrailReason).filter(Boolean) : chain.guardrailReasons,
    capabilities: {
      ...capabilities,
      governanceStatus,
      constitutionalStanding,
      constitutionalLayer,
      pluginCapabilities: normalizePluginCapabilities(capabilities.pluginCapabilities, { useFallbackDefaults }),
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

  return data.map((chain) => normalizeChainGovernanceState(chain));
}

export function getFallbackChainRegistry() {
  return fallbackChains.map((chain) => normalizeChainGovernanceState(chain, { useFallbackDefaults: true }));
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
  const guardrailReasons = chains.flatMap(collectGovernanceGuardrailReasons);
  const reasonSeverityCounts = guardrailReasons.reduce((acc, reason) => {
    if (!reason.reasonSeverity) return acc;
    acc[reason.reasonSeverity] = (acc[reason.reasonSeverity] ?? 0) + 1;
    return acc;
  }, {});

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
