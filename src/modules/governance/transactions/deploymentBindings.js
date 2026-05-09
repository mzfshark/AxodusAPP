import { encodeFunctionData, isAddress } from 'viem';
import { multisigAbi, tokenVotingAbi } from './abis';

const tokenVotingVoteOptions = {
  abstain: 1,
  yes: 2,
  no: 3,
};

function proposalPluginAddress(proposal) {
  return proposal?.pluginAddress ?? proposal?.plugin?.address ?? proposal?.metadata?.pluginAddress ?? null;
}

function proposalIndex(proposal) {
  return proposal?.proposalIndex ?? proposal?.onchainProposalId ?? proposal?.metadata?.proposalIndex ?? null;
}

function toBigIntId(value) {
  if (value == null || value === '') return null;

  try {
    return BigInt(value);
  } catch {
    return null;
  }
}

function baseRequest({ chain, proposal, abi, functionName, args }) {
  const address = proposalPluginAddress(proposal);
  const chainId = chain?.chainId;

  if (!chainId) {
    return { status: 'blocked', reason: 'Chain id is not available in the governance registry.' };
  }

  if (!address || !isAddress(address)) {
    return { status: 'blocked', reason: 'Plugin address is not a valid EVM address.' };
  }

  const request = {
    chainId,
    address,
    abi,
    functionName,
    args,
    data: encodeFunctionData({ abi, functionName, args }),
  };

  return {
    status: 'prepared',
    reason: 'Transaction request prepared for wallet submission.',
    request,
  };
}

export function resolveVoteBinding({ pluginType, proposal, chain, voteOption }) {
  const id = toBigIntId(proposalIndex(proposal));

  if (id == null) {
    return { status: 'blocked', reason: 'On-chain proposal id is not indexed yet.' };
  }

  if (pluginType === 'tokenVoting' || pluginType === 'nativeTokenVoting') {
    const mappedVoteOption = tokenVotingVoteOptions[voteOption];

    if (!mappedVoteOption) {
      return { status: 'blocked', reason: 'Selected vote option is not supported by TokenVoting.' };
    }

    return baseRequest({
      chain,
      proposal,
      abi: tokenVotingAbi,
      functionName: 'vote',
      args: [id, mappedVoteOption, false],
    });
  }

  if (pluginType === 'multisig') {
    return baseRequest({
      chain,
      proposal,
      abi: multisigAbi,
      functionName: 'approve',
      args: [id, false],
    });
  }

  return { status: 'pendingAbi', reason: `${pluginType} vote ABI binding is not registered yet.` };
}

export function resolveExecuteBinding({ pluginType, proposal, chain }) {
  const id = toBigIntId(proposalIndex(proposal));

  if (id == null) {
    return { status: 'blocked', reason: 'On-chain proposal id is not indexed yet.' };
  }

  if (pluginType === 'tokenVoting' || pluginType === 'nativeTokenVoting') {
    return baseRequest({
      chain,
      proposal,
      abi: tokenVotingAbi,
      functionName: 'execute',
      args: [id],
    });
  }

  if (pluginType === 'multisig') {
    return baseRequest({
      chain,
      proposal,
      abi: multisigAbi,
      functionName: 'execute',
      args: [id],
    });
  }

  return { status: 'pendingAbi', reason: `${pluginType} execute ABI binding is not registered yet.` };
}
