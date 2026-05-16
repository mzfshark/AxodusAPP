export function getProposalRouteId(proposal) {
  return proposal?.id ?? proposal?.entityId ?? proposal?.proposalId ?? proposal?.proposalIndex ?? null;
}

export function getProposalTitle(proposal) {
  return proposal?.title ?? proposal?.metadata?.title ?? proposal?.summary ?? `Proposal ${proposal?.incrementalId ?? proposal?.proposalIndex ?? ''}`;
}

export function getProposalStatus(proposal) {
  if (proposal?.executed?.status || proposal?.executed === true) return 'Executed';
  return proposal?.status ?? 'Indexed';
}

export function getProposalDescription(proposal) {
  return proposal?.summary ?? proposal?.description ?? proposal?.metadata?.summary ?? proposal?.metadata?.description ?? 'No summary available.';
}

export function getProposalNetwork(proposal) {
  return proposal?.network ?? proposal?.chainSlug ?? proposal?.chain ?? proposal?.metadata?.network ?? 'Not indexed';
}

export function getProposalPluginType(proposal) {
  return (
    proposal?.pluginType ??
    proposal?.interfaceType ??
    proposal?.plugin?.interfaceType ??
    proposal?.plugin?.pluginType ??
    proposal?.metadata?.pluginType ??
    'Not indexed'
  );
}

export function getProposalActions(proposal, decodedActions) {
  if (Array.isArray(decodedActions?.actions)) return decodedActions.actions;
  if (Array.isArray(decodedActions)) return decodedActions;
  if (Array.isArray(proposal?.actions)) return proposal.actions;
  if (Array.isArray(proposal?.metadata?.actions)) return proposal.metadata.actions;
  return [];
}

export function getProposalReceipts(proposal) {
  const candidates = [
    proposal?.executionReceipts,
    proposal?.receipts,
    proposal?.remoteExecutions,
    proposal?.execution?.receipts,
    proposal?.metadata?.executionReceipts,
  ];

  const receipts = candidates.find((value) => Array.isArray(value));
  return receipts ?? [];
}

export function getVoteOptionTotals(proposal) {
  const tally = proposal?.tally ?? proposal?.results ?? proposal?.voteResults ?? proposal?.metadata?.tally ?? {};

  return [
    { key: 'yes', label: 'For', value: tally.yes ?? tally.for ?? proposal?.yes ?? proposal?.for ?? 0 },
    { key: 'no', label: 'Against', value: tally.no ?? tally.against ?? proposal?.no ?? proposal?.against ?? 0 },
    { key: 'abstain', label: 'Abstain', value: tally.abstain ?? proposal?.abstain ?? 0 },
  ];
}

export function getExecutionReadiness(proposal, chain) {
  if (proposal?.executed === true || proposal?.executed?.status) {
    return { canExecute: false, reason: 'Proposal already executed.' };
  }

  if (!chain?.capabilities?.governance) {
    return { canExecute: false, reason: 'Governance capability is not enabled for this chain.' };
  }

  if (!chain?.capabilities?.remoteExecution && chain?.roles?.includes('spoke')) {
    return { canExecute: false, reason: 'Remote execution is not enabled for this chain.' };
  }

  if (!proposal?.executionTarget && !proposal?.actions?.length && !proposal?.metadata?.actions?.length) {
    return { canExecute: false, reason: 'Execution actions are not indexed yet.' };
  }

  return { canExecute: true, reason: 'Execution adapter pending wallet transaction integration.' };
}

export function formatProposalDate(value) {
  if (!value) return 'Not indexed';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function compactAddress(value) {
  if (!value || typeof value !== 'string') return 'Not indexed';
  if (value.length <= 14) return value;
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

export function formatOperationTarget(operation) {
  if (!operation?.request) return 'No transaction request prepared.';
  return `${operation.request.functionName} on ${compactAddress(operation.request.address)} · chain ${operation.request.chainId}`;
}

export function formatReceiptValue(value) {
  if (value === undefined || value === null) return 'Not available';
  return typeof value === 'bigint' ? value.toString() : String(value);
}
