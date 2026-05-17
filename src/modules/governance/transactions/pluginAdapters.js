import { resolveExecuteBinding, resolveVoteBinding } from './deploymentBindings';

const adapterStatus = {
  ready: 'ready',
  blocked: 'blocked',
  pendingAbi: 'pendingAbi',
  unsupported: 'unsupported',
};

const evmGovernancePluginTypes = new Set([
  'tokenVoting',
  'nativeTokenVoting',
  'multisig',
  'admin',
  'lockToVote',
  'gauge',
  'capitalDistributor',
  'spp',
]);

const harmonyPluginTypes = new Set(['harmonyVoting', 'harmonyHipVoting', 'harmonyDelegationVoting']);

function getProposalPluginType(proposal) {
  return (
    proposal?.pluginType ??
    proposal?.interfaceType ??
    proposal?.plugin?.interfaceType ??
    proposal?.plugin?.pluginType ??
    proposal?.metadata?.pluginType ??
    null
  );
}

function getPluginAddress(proposal) {
  return proposal?.pluginAddress ?? proposal?.plugin?.address ?? proposal?.metadata?.pluginAddress ?? null;
}

function getProposalIndex(proposal) {
  return proposal?.proposalIndex ?? proposal?.incrementalId ?? proposal?.metadata?.proposalIndex ?? null;
}

function baseOperation({ action, proposal, chain, walletAddress }) {
  const pluginType = getProposalPluginType(proposal);
  const pluginAddress = getPluginAddress(proposal);
  const proposalIndex = getProposalIndex(proposal);

  if (!walletAddress) {
    return {
      action,
      status: adapterStatus.blocked,
      canSubmit: false,
      reason: 'Wallet connection is required.',
    };
  }

  if (!chain?.capabilities?.governance) {
    return {
      action,
      status: adapterStatus.blocked,
      canSubmit: false,
      reason: 'Governance capability is not enabled for this chain.',
    };
  }

  if (!pluginType) {
    return {
      action,
      status: adapterStatus.blocked,
      canSubmit: false,
      reason: 'Proposal plugin type is not indexed yet.',
    };
  }

  if (!pluginAddress) {
    return {
      action,
      status: adapterStatus.blocked,
      canSubmit: false,
      reason: 'Proposal plugin address is not indexed yet.',
    };
  }

  if (proposalIndex == null) {
    return {
      action,
      status: adapterStatus.blocked,
      canSubmit: false,
      reason: 'Proposal index is not indexed yet.',
    };
  }

  return {
    action,
    network: proposal?.network ?? chain?.network ?? chain?.slug ?? null,
    pluginType,
    pluginAddress,
    proposalIndex,
    status: adapterStatus.pendingAbi,
    canSubmit: false,
    reason: `${pluginType} transaction ABI/deployment binding is not registered yet.`,
  };
}

function toPreparedOperation(base, binding) {
  if (binding.status !== 'prepared') {
    return {
      ...base,
      status: binding.status ?? adapterStatus.blocked,
      canSubmit: false,
      reason: binding.reason,
    };
  }

  return {
    ...base,
    status: adapterStatus.ready,
    canSubmit: true,
    reason: binding.reason,
    request: binding.request,
  };
}

function buildEvmAdapter(pluginType) {
  return {
    pluginType,
    family: 'evm',
    prepareVote: (context) => {
      const base = baseOperation({ ...context, action: 'vote' });
      if (base.status !== adapterStatus.pendingAbi) return base;

      return toPreparedOperation(
        base,
        resolveVoteBinding({
          pluginType,
          proposal: context.proposal,
          chain: context.chain,
          voteOption: context.voteOption,
        }),
      );
    },
    prepareExecute: (context) => {
      const base = baseOperation({ ...context, action: 'execute' });
      if (base.status !== adapterStatus.pendingAbi) return base;

      return toPreparedOperation(
        base,
        resolveExecuteBinding({
          pluginType,
          proposal: context.proposal,
          chain: context.chain,
        }),
      );
    },
  };
}

function buildHarmonyAdapter(pluginType) {
  return {
    pluginType,
    family: 'harmony',
    prepareVote: (context) => ({
      ...baseOperation({ ...context, action: 'vote' }),
      status: adapterStatus.blocked,
      canSubmit: false,
      reason: 'Harmony governance remains isolated in the legacy adapter and is not executable from Axodus Governance yet.',
    }),
    prepareExecute: (context) => ({
      ...baseOperation({ ...context, action: 'execute' }),
      status: adapterStatus.blocked,
      canSubmit: false,
      reason: 'Harmony remote execution is disabled for Axodus Governance.',
    }),
  };
}

const adapterRegistry = new Map([
  ...Array.from(evmGovernancePluginTypes).map((pluginType) => [pluginType, buildEvmAdapter(pluginType)]),
  ...Array.from(harmonyPluginTypes).map((pluginType) => [pluginType, buildHarmonyAdapter(pluginType)]),
]);

export function getGovernancePluginAdapter(pluginType) {
  return adapterRegistry.get(pluginType) ?? null;
}

export function resolveProposalPluginType(proposal) {
  return getProposalPluginType(proposal);
}

export function listSupportedGovernancePluginTypes() {
  return Array.from(adapterRegistry.keys());
}

export { adapterStatus };
