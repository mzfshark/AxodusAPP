import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

async function renderPanel({ backendEnabled = false, proposalDrafts = [], reviewRequestsState, selectedDao, selectedChain } = {}) {
  vi.resetModules();
  vi.stubEnv('VITE_GOVERNANCE_CREATE_PROPOSAL_ENABLED', backendEnabled ? 'true' : 'false');
  vi.stubEnv('VITE_GOVERNANCE_API_URL', 'http://governance-api.local');
  const { default: CreateProposalIntegrationStatus } = await import('../../src/modules/governance/components/CreateProposalIntegrationStatus');

  return render(
    <CreateProposalIntegrationStatus
      proposalDrafts={proposalDrafts}
      reviewRequestsState={reviewRequestsState}
      selectedDao={selectedDao}
      selectedChain={selectedChain}
    />,
  );
}

describe('CreateProposalIntegrationStatus', () => {
  afterEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  test('renders mock-review integration state with transparent reason code', async () => {
    await renderPanel({
      proposalDrafts: [
        { id: 'draft-1', submissionState: 'draft' },
        { id: 'draft-2', submissionState: 'submit-failed' },
      ],
    });

    expect(screen.getByText(/create proposal integration status/i)).toBeInTheDocument();
    expect(screen.getAllByText(/mock review/i).length).toBeGreaterThan(0);
    expect(screen.getByText('mock-review')).toBeInTheDocument();
    expect(screen.getByText('CREATE_PROPOSAL_BACKEND_NOT_ENABLED')).toBeInTheDocument();
    expect(screen.getByText('draft: 1')).toBeInTheDocument();
    expect(screen.getByText('submit-failed: 1')).toBeInTheDocument();
    expect(screen.getByText(/backend review request listing is inactive/i)).toBeInTheDocument();
  });

  test('renders backend integration state without frontend reason codes', async () => {
    await renderPanel({
      backendEnabled: true,
      proposalDrafts: [{ id: 'draft-1', submissionState: 'ready-for-review' }],
      reviewRequestsState: {
        status: 'success',
        data: {
          items: [],
          count: 0,
          source: 'CreateProposalRequest',
          storageMode: 'mongo',
        },
      },
    });

    expect(screen.getByText(/backend enabled/i)).toBeInTheDocument();
    expect(screen.getByText('backend')).toBeInTheDocument();
    expect(screen.getAllByText('http://governance-api.local/v2/proposals/create').length).toBeGreaterThan(0);
    expect(screen.getByText(/no frontend create-proposal integration reason codes are active/i)).toBeInTheDocument();
    expect(screen.getByText('ready-for-review: 1')).toBeInTheDocument();
    expect(screen.getByText(/0 context-matched review requests/i)).toBeInTheDocument();
    expect(screen.getByText(/no backend createProposal review requests are currently observed for this selected DAO and chain context/i)).toBeInTheDocument();
  });

  test('renders observed backend review requests for the selected context', async () => {
    await renderPanel({
      backendEnabled: true,
      selectedDao: { id: 'axodus-root', name: 'Axodus Constitutional DAO' },
      selectedChain: { network: 'ethereum-sepolia', name: 'Ethereum Sepolia' },
      reviewRequestsState: {
        status: 'success',
        data: {
          count: 2,
          source: 'CreateProposalRequest',
          storageMode: 'mongo',
          items: [
            {
              id: 'backend-create-1',
              status: 'backend-review-queued',
              storageMode: 'mongo',
              message: 'Create proposal request accepted by the Governance API.',
              indexerReconciliation: {
                reasonCode: 'INDEXER_STATE_NOT_READY',
              },
              request: {
                dao: { id: 'axodus-root' },
                chain: { network: 'ethereum-sepolia' },
              },
            },
            {
              id: 'backend-create-2',
              status: 'backend-review-queued',
              message: 'Other context receipt.',
              request: {
                dao: { id: 'partner-dao' },
                chain: { network: 'base' },
              },
            },
          ],
        },
      },
    });

    expect(screen.getByText(/1 context-matched review request/i)).toBeInTheDocument();
    expect(screen.getByText(/2 total observed/i)).toBeInTheDocument();
    expect(screen.getByText('CreateProposalRequest')).toBeInTheDocument();
    expect(screen.getAllByText('mongo').length).toBeGreaterThan(0);
    expect(screen.getByText('backend-create-1')).toBeInTheDocument();
    expect(screen.getByText('backend-review-queued')).toBeInTheDocument();
    expect(screen.getByText('INDEXER_STATE_NOT_READY')).toBeInTheDocument();
    expect(screen.queryByText('backend-create-2')).not.toBeInTheDocument();
  });

  test('renders backend review request listing errors with reason metadata', async () => {
    await renderPanel({
      backendEnabled: true,
      reviewRequestsState: {
        status: 'error',
        error: {
          message: 'createProposal listing failed.',
          reasonCode: 'CREATE_PROPOSAL_SUBMISSION_FAILED',
          reasonSeverity: 'warning',
        },
      },
    });

    expect(screen.getByText(/review request listing unavailable/i)).toBeInTheDocument();
    expect(screen.getByText(/createProposal listing failed/i)).toBeInTheDocument();
    expect(screen.getByText('CREATE_PROPOSAL_SUBMISSION_FAILED')).toBeInTheDocument();
  });
});
