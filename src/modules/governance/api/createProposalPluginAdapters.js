const evmVotingPlugins = new Set(['tokenVoting', 'nativeTokenVoting', 'lockToVote']);
const multisigPlugins = new Set(['multisig']);
const treasuryPlugins = new Set(['capitalDistributor', 'gauge']);
const harmonyLegacyPlugins = new Set(['harmonyVoting', 'harmonyHipVoting', 'harmonyDelegationVoting']);

function pluginTypeOf(plugin, draft) {
  return plugin?.interfaceType ?? plugin?.pluginType ?? draft?.pluginType ?? draft?.pluginId ?? null;
}

function baseAdapter({ plugin, draft }) {
  const pluginType = pluginTypeOf(plugin, draft);

  return {
    pluginType,
    pluginId: plugin?.id ?? draft?.pluginId ?? null,
    pluginAddress: plugin?.address ?? null,
    adapterStatus: 'observed',
    source: 'frontend createProposal adapter registry',
    boundary: 'Adapter payload is a frontend request shape only. Backend, contracts and indexers remain the source of executable proposal truth.',
  };
}

function buildEvmVotingPayload(context) {
  return {
    ...baseAdapter(context),
    adapterFamily: 'evm-voting',
    requestKind: 'proposal-metadata',
    expectedBackendAdapter: 'evm-token-voting-create-proposal',
    observedInputs: {
      title: context.draft?.title ?? null,
      summary: context.draft?.summary ?? null,
      actionType: context.draft?.actionType ?? null,
      votingStart: context.draft?.startDate || null,
      votingEnd: context.draft?.endDate || null,
    },
    executionIntent: context.draft?.actionType === 'signaling' ? 'vote-only' : 'requires-backend-action-decoding',
    reasonCodes: [],
  };
}

function buildMultisigPayload(context) {
  return {
    ...baseAdapter(context),
    adapterFamily: 'evm-multisig',
    requestKind: 'proposal-metadata',
    expectedBackendAdapter: 'evm-multisig-create-proposal',
    observedInputs: {
      title: context.draft?.title ?? null,
      summary: context.draft?.summary ?? null,
      actionType: context.draft?.actionType ?? null,
    },
    executionIntent: 'requires-backend-action-decoding',
    reasonCodes: [],
  };
}

function buildTreasuryPayload(context) {
  return {
    ...baseAdapter(context),
    adapterFamily: 'treasury-policy',
    requestKind: 'treasury-review-metadata',
    expectedBackendAdapter: 'treasury-policy-create-proposal',
    observedInputs: {
      title: context.draft?.title ?? null,
      summary: context.draft?.summary ?? null,
      actionType: context.draft?.actionType ?? null,
    },
    executionIntent: 'requires-treasury-policy-review',
    reasonCodes: [
      {
        reasonCode: 'TREASURY_POLICY_REQUIRES_REVIEW',
        reasonSeverity: 'constitutional',
        source: 'treasury policy',
        message: 'Treasury-sensitive createProposal payloads require backend policy review before execution.',
      },
    ],
  };
}

function buildHarmonyLegacyPayload(context) {
  return {
    ...baseAdapter(context),
    adapterFamily: 'harmony-legacy',
    requestKind: 'legacy-voting-metadata',
    expectedBackendAdapter: 'harmony-legacy-create-proposal',
    observedInputs: {
      title: context.draft?.title ?? null,
      summary: context.draft?.summary ?? null,
      actionType: context.draft?.actionType ?? null,
    },
    executionIntent: 'legacy-voting-only',
    reasonCodes: [
      {
        reasonCode: 'EXECUTION_CHAIN_NOT_AUTHORIZED',
        reasonSeverity: 'constitutional',
        source: 'legacy adapter',
        message: 'Harmony remains a legacy voting/spoke adapter and is not an Axodus execution chain.',
      },
    ],
  };
}

function buildUnsupportedPayload(context) {
  return {
    ...baseAdapter(context),
    adapterFamily: 'unsupported',
    requestKind: 'unregistered-plugin-metadata',
    expectedBackendAdapter: null,
    observedInputs: {
      title: context.draft?.title ?? null,
      summary: context.draft?.summary ?? null,
      actionType: context.draft?.actionType ?? null,
    },
    executionIntent: 'requires-backend-plugin-registration',
    reasonCodes: [
      {
        reasonCode: 'PLUGIN_CAPABILITY_NOT_REGISTERED',
        reasonSeverity: 'warning',
        source: 'plugin capability',
        message: 'No createProposal adapter is registered for this plugin capability in the frontend request registry.',
      },
    ],
  };
}

export function buildCreateProposalPluginPayload(context = {}) {
  const pluginType = pluginTypeOf(context.plugin, context.draft);

  if (evmVotingPlugins.has(pluginType)) return buildEvmVotingPayload(context);
  if (multisigPlugins.has(pluginType)) return buildMultisigPayload(context);
  if (treasuryPlugins.has(pluginType) || context.draft?.actionType === 'treasury-review') return buildTreasuryPayload(context);
  if (harmonyLegacyPlugins.has(pluginType)) return buildHarmonyLegacyPayload(context);

  return buildUnsupportedPayload(context);
}

export function listCreateProposalPluginAdapterTypes() {
  return [...evmVotingPlugins, ...multisigPlugins, ...treasuryPlugins, ...harmonyLegacyPlugins];
}
