import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

const selectedDao = {
  id: 'dao-executive-001',
  name: 'Axodus Executive DAO',
  network: 'ethereum-sepolia',
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

async function renderModal({ backendEnabled = false, onCreateDraft = vi.fn() } = {}) {
  vi.resetModules();
  vi.stubEnv('VITE_GOVERNANCE_CREATE_PROPOSAL_ENABLED', backendEnabled ? 'true' : 'false');
  const { default: ProposalCreateDraftModal } = await import('../../src/modules/governance/components/ProposalCreateDraftModal');

  render(
    <ProposalCreateDraftModal
      open
      onClose={() => null}
      selectedDao={selectedDao}
      selectedChain={selectedChain}
      plugins={plugins}
      walletAddress="0xAxoD000000000000000000000000000000000001"
      canCreateProposal
      onCreateDraft={onCreateDraft}
    />,
  );

  return { onCreateDraft };
}

describe('ProposalCreateDraftModal', () => {
  afterEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  test('renders mock-review route state and creates a local mock request preview', async () => {
    const onCreateDraft = vi.fn((draftInput) => ({
      ...draftInput,
      title: draftInput.title,
      summary: draftInput.summary,
      daoName: selectedDao.name,
      chainName: selectedChain.name,
      status: 'Local draft',
      createProposalRequest: draftInput.createProposalRequest,
    }));
    await renderModal({ onCreateDraft });

    expect(screen.getByText(/mock review route observed/i)).toBeInTheDocument();
    expect(screen.getByText('mock-review')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Mock route proposal' } });
    fireEvent.change(screen.getByLabelText(/summary/i), { target: { value: 'Render mock route request.' } });
    fireEvent.click(screen.getByRole('button', { name: /generate local draft/i }));

    expect(onCreateDraft).toHaveBeenCalledWith(expect.objectContaining({ createProposalRequest: expect.objectContaining({ submissionMode: 'mock-review' }) }));
    expect(screen.getByText(/create_proposal_backend_not_enabled/i)).toBeInTheDocument();
  });

  test('renders backend route state and creates a backend request preview when enabled', async () => {
    const onCreateDraft = vi.fn((draftInput) => ({
      ...draftInput,
      title: draftInput.title,
      summary: draftInput.summary,
      daoName: selectedDao.name,
      chainName: selectedChain.name,
      status: 'Local draft',
      createProposalRequest: draftInput.createProposalRequest,
    }));
    await renderModal({ backendEnabled: true, onCreateDraft });

    expect(screen.getByText(/backend route observed/i)).toBeInTheDocument();
    expect(screen.getByText('backend')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Backend route proposal' } });
    fireEvent.change(screen.getByLabelText(/summary/i), { target: { value: 'Render backend route request.' } });
    fireEvent.click(screen.getByRole('button', { name: /generate local draft/i }));

    expect(onCreateDraft).toHaveBeenCalledWith(expect.objectContaining({ createProposalRequest: expect.objectContaining({ submissionMode: 'backend' }) }));
    expect(screen.getByText(/no active reason codes/i)).toBeInTheDocument();
  });
});
