import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import { useState } from 'react';
import ProposalList from '../../src/modules/governance/components/ProposalList';
import { submitCreateProposalMock } from '../../src/modules/governance/api/createProposalContract';

const selectedDao = {
  id: 'dao-executive-001',
  name: 'Axodus Executive DAO',
  network: 'ethereum-sepolia',
  governanceStatus: 'compliant',
  federationTier: 'root',
};

const selectedChain = {
  name: 'Ethereum Sepolia',
  network: 'ethereum-sepolia',
  chainId: 11155111,
  roles: ['execution'],
};

const plugins = [
  {
    id: 'gov-plugin-token-voting-001',
    name: 'Token Voting',
    interfaceType: 'tokenVoting',
    address: '0x1111111111111111111111111111111111111111',
  },
];

function ProposalListHarness() {
  const [drafts, setDrafts] = useState([]);

  function createDraft(draftInput) {
    const createdDraft = {
      ...draftInput,
      id: 'local-draft-test',
      title: draftInput.title,
      summary: draftInput.summary,
      description: draftInput.summary,
      status: 'Local draft',
      submissionState: 'draft',
      dataSource: 'local-draft',
      network: selectedChain.network,
      chainName: selectedChain.name,
      daoName: selectedDao.name,
      pluginType: draftInput.pluginLabel,
      createProposalRequest: draftInput.createProposalRequest,
      createdAt: '2026-05-16T12:00:00.000Z',
    };
    setDrafts([createdDraft]);
    return createdDraft;
  }

  function markDraftReadyForReview(draftId) {
    setDrafts((current) =>
      current.map((draft) => (draft.id === draftId ? { ...draft, status: 'Ready for review', submissionState: 'ready-for-review' } : draft)),
    );
  }

  function mockSubmitDraft(draftId) {
    setDrafts((current) =>
      current.map((draft) =>
        draft.id === draftId
          ? {
              ...draft,
              status: 'Mock submitted',
              submissionState: 'mock-submitted',
              submissionReceipt: submitCreateProposalMock({ draft, request: draft.createProposalRequest }),
            }
          : draft,
      ),
    );
  }

  return (
    <MemoryRouter>
      <ProposalList
        proposals={drafts}
        selectedDao={selectedDao}
        selectedChain={selectedChain}
        plugins={plugins}
        walletAddress="0xAxoD000000000000000000000000000000000001"
        canCreateProposal
        onCreateDraft={createDraft}
        onMarkReadyForReview={markDraftReadyForReview}
        onMockSubmitDraft={mockSubmitDraft}
      />
    </MemoryRouter>
  );
}

function ProposalListFailureHarness() {
  const [drafts, setDrafts] = useState([
    {
      id: 'local-draft-failure-test',
      title: 'Backend routed proposal',
      summary: 'Validate backend submission failure state.',
      description: 'Validate backend submission failure state.',
      status: 'Ready for review',
      submissionState: 'ready-for-review',
      submissionReceipt: null,
      submissionError: null,
      dataSource: 'local-draft',
      network: selectedChain.network,
      chainName: selectedChain.name,
      daoName: selectedDao.name,
      pluginType: 'Token Voting',
      createProposalRequest: {
        submissionMode: 'backend',
        dao: { name: selectedDao.name },
        chain: { network: selectedChain.network },
        guardrails: { reasonCodes: [] },
      },
      createdAt: '2026-05-16T12:00:00.000Z',
    },
  ]);

  function submitWithFailure(draftId) {
    setDrafts((current) => current.map((draft) => (draft.id === draftId ? { ...draft, status: 'Submitting', submissionState: 'submitting' } : draft)));
    setTimeout(() => {
      setDrafts((current) =>
        current.map((draft) =>
          draft.id === draftId
            ? {
                ...draft,
                status: 'Submission failed',
                submissionState: 'submit-failed',
                submissionError: {
                  message: 'createProposal failed with HTTP 500',
                  reasonCode: 'CREATE_PROPOSAL_SUBMISSION_FAILED',
                  reasonSeverity: 'warning',
                },
              }
            : draft,
        ),
      );
    }, 0);
  }

  return (
    <MemoryRouter>
      <ProposalList
        proposals={drafts}
        selectedDao={selectedDao}
        selectedChain={selectedChain}
        plugins={plugins}
        walletAddress="0xAxoD000000000000000000000000000000000001"
        canCreateProposal
        onCreateDraft={() => null}
        onMarkReadyForReview={() => null}
        onMockSubmitDraft={submitWithFailure}
      />
    </MemoryRouter>
  );
}

describe('ProposalList create proposal draft flow', () => {
  test('creates a local draft and advances mock review submission state', () => {
    render(<ProposalListHarness />);

    fireEvent.click(screen.getByRole('button', { name: /create proposal/i }));
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Draft treasury review' } });
    fireEvent.change(screen.getByLabelText(/summary/i), { target: { value: 'Review treasury policy before execution.' } });
    fireEvent.change(screen.getByLabelText(/rationale/i), { target: { value: 'Operator review note.' } });
    fireEvent.click(screen.getByRole('button', { name: /generate local draft/i }));

    expect(screen.getAllByText('Draft treasury review').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/local draft/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/backend validation required/i)).toBeInTheDocument();
    expect(screen.getByText(/create_proposal_backend_not_enabled/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /inspect request/i }));
    expect(screen.getByText(/create proposal request preview/i)).toBeInTheDocument();
    expect(screen.getAllByText(/mock-review/i).length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole('button', { name: /ready for review/i }));
    expect(screen.getAllByText(/ready for review/i).length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole('button', { name: /mock submit/i }));
    expect(screen.getAllByText(/mock submitted/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/mock submission receipt/i)).toBeInTheDocument();
    expect(screen.getByText(/indexer_state_not_ready/i)).toBeInTheDocument();
  });

  test('renders backend submission failure metadata and retry action for local drafts', async () => {
    render(<ProposalListFailureHarness />);

    fireEvent.click(screen.getByRole('button', { name: /inspect request/i }));
    fireEvent.click(screen.getByRole('button', { name: /mock submit/i }));

    expect(screen.getAllByText(/submitting/i).length).toBeGreaterThan(0);

    await waitFor(() => {
      expect(screen.getByText(/submission error/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/createProposal failed with HTTP 500/i)).toBeInTheDocument();
    expect(screen.getByText(/create_proposal_submission_failed/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry submit/i })).toBeInTheDocument();
  });
});
