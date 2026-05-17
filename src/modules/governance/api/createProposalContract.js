export const createProposalSubmissionModes = {
  MOCK_REVIEW: 'mock-review',
  BACKEND: 'backend',
  ONCHAIN: 'onchain',
};

const governanceApiBase = import.meta.env.VITE_GOVERNANCE_API_URL || '/governance-api';
const createProposalEndpoint = `${governanceApiBase}/v2/proposals/create`;
const backendCreateProposalEnabled = import.meta.env.VITE_GOVERNANCE_CREATE_PROPOSAL_ENABLED === 'true';

function createReason(reasonCode, reasonSeverity, source, message) {
  return {
    reasonCode,
    reasonSeverity,
    source,
    message,
  };
}

function buildCreateProposalReasonCodes({ draft, walletAddress, plugin }) {
  const reasons = [
    createReason(
      'CREATE_PROPOSAL_BACKEND_NOT_ENABLED',
      'info',
      'frontend submission boundary',
      'Create proposal is currently a local mock workflow. Backend submission is not enabled.',
    ),
  ];

  if (!walletAddress) {
    reasons.push(createReason('WALLET_NOT_CONNECTED', 'warning', 'wallet or DAO permission state', 'A connected wallet is required before live proposal submission.'));
  }

  if (!plugin) {
    reasons.push(
      createReason(
        'PLUGIN_CAPABILITY_NOT_REGISTERED',
        'warning',
        'plugin capability',
        'No indexed plugin capability was selected for this proposal draft.',
      ),
    );
  }

  if (draft.actionType === 'treasury-review') {
    reasons.push(
      createReason(
        'TREASURY_POLICY_REQUIRES_REVIEW',
        'constitutional',
        'treasury policy',
        'Treasury-sensitive proposal drafts require backend and governance policy review before execution.',
      ),
    );
  }

  return reasons;
}

export function buildCreateProposalRequest({
  draft,
  selectedDao,
  selectedChain,
  walletAddress,
  plugin,
  submissionMode = createProposalSubmissionModes.MOCK_REVIEW,
}) {
  const reasonCodes = buildCreateProposalReasonCodes({ draft, walletAddress, plugin });

  return {
    submissionMode,
    dao: {
      id: selectedDao?.id ?? null,
      address: selectedDao?.address ?? null,
      name: selectedDao?.name ?? null,
      governanceStatus: selectedDao?.governanceStatus ?? null,
      federationTier: selectedDao?.federationTier ?? null,
    },
    chain: {
      network: selectedChain?.network ?? selectedChain?.slug ?? selectedDao?.network ?? null,
      chainId: selectedChain?.chainId ?? null,
      name: selectedChain?.name ?? null,
      role: selectedChain?.roles?.includes('execution') ? 'execution' : selectedChain?.roles?.[0] ?? null,
    },
    creator: {
      walletAddress: walletAddress ?? null,
    },
    plugin: {
      id: plugin?.id ?? draft.pluginId ?? null,
      address: plugin?.address ?? null,
      interfaceType: plugin?.interfaceType ?? plugin?.pluginType ?? null,
      label: plugin?.name ?? plugin?.interfaceType ?? plugin?.pluginType ?? draft.pluginLabel ?? null,
    },
    proposal: {
      title: draft.title,
      summary: draft.summary,
      actionType: draft.actionType,
      votingStart: draft.startDate || null,
      votingEnd: draft.endDate || null,
      rationale: draft.rationale || null,
    },
    guardrails: {
      frontendBoundary:
        'UI-generated proposal request preview only. Constitutional validity, permissions, sanctions and execution must be evaluated by governance data sources.',
      reasonCodes,
      requiresBackendValidation: true,
      requiresIndexerReconciliation: true,
      noOnchainSubmission: submissionMode !== createProposalSubmissionModes.ONCHAIN,
    },
  };
}

export function isCreateProposalBackendEnabled() {
  return backendCreateProposalEnabled;
}

export function getCreateProposalIntegrationStatus() {
  return {
    submissionMode: backendCreateProposalEnabled ? createProposalSubmissionModes.BACKEND : createProposalSubmissionModes.MOCK_REVIEW,
    backendEnabled: backendCreateProposalEnabled,
    endpoint: createProposalEndpoint,
    reasonCodes: backendCreateProposalEnabled
      ? []
      : [
          createReason(
            'CREATE_PROPOSAL_BACKEND_NOT_ENABLED',
            'info',
            'frontend submission boundary',
            'Create proposal submission is currently routed to local mock receipts.',
          ),
        ],
    boundary:
      'AxodusAPP forwards or renders create-proposal state only. Constitutional validity, permissions, sanctions, execution and indexing truth must come from governance data sources.',
  };
}

function normalizeCreateProposalReceipt(response, request) {
  return {
    id: response?.id ?? response?.receiptId ?? response?.proposalId ?? null,
    proposalDraftId: response?.proposalDraftId ?? null,
    status: response?.status ?? 'backend-submitted',
    submissionMode: createProposalSubmissionModes.BACKEND,
    submittedAt: response?.submittedAt ?? new Date().toISOString(),
    message: response?.message ?? 'Create proposal request accepted by the Governance API.',
    indexerReconciliation: response?.indexerReconciliation ?? {
      status: 'pending',
      reasonCode: 'INDEXER_STATE_NOT_READY',
      reasonSeverity: 'info',
      message: 'Proposal submission is waiting for indexer reconciliation.',
    },
    request,
    backendResponse: response ?? null,
  };
}

export function submitCreateProposalMock({ draft, request } = {}) {
  const submittedAt = new Date().toISOString();
  const receiptId = `mock-create-${submittedAt.replace(/[^a-zA-Z0-9]/g, '').slice(0, 14)}`;

  return {
    id: receiptId,
    proposalDraftId: draft?.id ?? null,
    status: 'mock-submitted',
    submissionMode: createProposalSubmissionModes.MOCK_REVIEW,
    submittedAt,
    message: 'Local mock submission accepted for frontend review. No backend write, wallet prompt or on-chain transaction was submitted.',
    indexerReconciliation: {
      status: 'local-only',
      reasonCode: 'INDEXER_STATE_NOT_READY',
      reasonSeverity: 'info',
      message: 'Indexer reconciliation is not available for local mock proposal drafts.',
    },
    request,
  };
}

export async function createGovernanceProposal({ request, signal, fetchImpl = fetch } = {}) {
  if (!backendCreateProposalEnabled) {
    throw new Error('createGovernanceProposal backend submission is disabled. Set VITE_GOVERNANCE_CREATE_PROPOSAL_ENABLED=true to use the API endpoint.');
  }

  const response = await fetchImpl(createProposalEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
    signal,
  });

  if (!response.ok) {
    throw new Error(`createProposal failed with HTTP ${response.status}`);
  }

  return normalizeCreateProposalReceipt(await response.json(), request);
}

export async function submitCreateProposal({ draft, request, signal, fetchImpl } = {}) {
  if (!backendCreateProposalEnabled) {
    return submitCreateProposalMock({ draft, request });
  }

  return createGovernanceProposal({ request, signal, fetchImpl });
}
