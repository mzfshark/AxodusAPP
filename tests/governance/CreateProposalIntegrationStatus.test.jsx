import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

async function renderPanel({ backendEnabled = false, proposalDrafts = [] } = {}) {
  vi.resetModules();
  vi.stubEnv('VITE_GOVERNANCE_CREATE_PROPOSAL_ENABLED', backendEnabled ? 'true' : 'false');
  vi.stubEnv('VITE_GOVERNANCE_API_URL', 'http://governance-api.local');
  const { default: CreateProposalIntegrationStatus } = await import('../../src/modules/governance/components/CreateProposalIntegrationStatus');

  return render(<CreateProposalIntegrationStatus proposalDrafts={proposalDrafts} />);
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
    expect(screen.getByText(/mock review/i)).toBeInTheDocument();
    expect(screen.getByText('mock-review')).toBeInTheDocument();
    expect(screen.getByText('CREATE_PROPOSAL_BACKEND_NOT_ENABLED')).toBeInTheDocument();
    expect(screen.getByText('draft: 1')).toBeInTheDocument();
    expect(screen.getByText('submit-failed: 1')).toBeInTheDocument();
  });

  test('renders backend integration state without frontend reason codes', async () => {
    await renderPanel({
      backendEnabled: true,
      proposalDrafts: [{ id: 'draft-1', submissionState: 'ready-for-review' }],
    });

    expect(screen.getByText(/backend enabled/i)).toBeInTheDocument();
    expect(screen.getByText('backend')).toBeInTheDocument();
    expect(screen.getByText('http://governance-api.local/v2/proposals/create')).toBeInTheDocument();
    expect(screen.getByText(/no frontend create-proposal integration reason codes are active/i)).toBeInTheDocument();
    expect(screen.getByText('ready-for-review: 1')).toBeInTheDocument();
  });
});
