import { adapterStatus, getGovernancePluginAdapter, resolveProposalPluginType } from './pluginAdapters';

function unsupportedOperation(action, reason) {
  return {
    action,
    status: adapterStatus.unsupported,
    canSubmit: false,
    reason,
  };
}

function resolveAdapter(proposal) {
  const pluginType = resolveProposalPluginType(proposal);

  if (!pluginType) {
    return {
      pluginType: null,
      adapter: null,
      reason: 'Proposal plugin type is not indexed yet.',
    };
  }

  const adapter = getGovernancePluginAdapter(pluginType);

  return {
    pluginType,
    adapter,
    reason: adapter ? null : `${pluginType} is not supported by the Axodus governance transaction adapter yet.`,
  };
}

export function prepareGovernanceVoteTransaction({ proposal, chain, walletAddress, voteOption }) {
  const { adapter, reason } = resolveAdapter(proposal);

  if (!adapter?.prepareVote) {
    return unsupportedOperation('vote', reason ?? 'Vote adapter is not available.');
  }

  if (!voteOption) {
    return {
      action: 'vote',
      status: adapterStatus.blocked,
      canSubmit: false,
      reason: 'A vote option must be selected before submitting.',
    };
  }

  return adapter.prepareVote({
    proposal,
    chain,
    walletAddress,
    voteOption,
  });
}

export function prepareGovernanceExecuteTransaction({ proposal, chain, walletAddress, actions }) {
  const { adapter, reason } = resolveAdapter(proposal);

  if (!adapter?.prepareExecute) {
    return unsupportedOperation('execute', reason ?? 'Execute adapter is not available.');
  }

  if (proposal?.executed === true || proposal?.executed?.status) {
    return {
      action: 'execute',
      status: adapterStatus.blocked,
      canSubmit: false,
      reason: 'Proposal is already executed.',
    };
  }

  return adapter.prepareExecute({
    proposal: { ...proposal, actions },
    chain,
    walletAddress,
  });
}

export function createGovernanceTransactionAdapter({ proposal, chain, walletAddress, actions }) {
  return {
    vote: (voteOption) =>
      prepareGovernanceVoteTransaction({
        proposal,
        chain,
        walletAddress,
        voteOption,
      }),
    execute: () =>
      prepareGovernanceExecuteTransaction({
        proposal,
        chain,
        walletAddress,
        actions,
      }),
  };
}
