import { afterEach, describe, expect, test, vi } from 'vitest';

describe('create proposal submission contract', () => {
  afterEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  test('uses local mock submission when backend create proposal is disabled', async () => {
    vi.stubEnv('VITE_GOVERNANCE_CREATE_PROPOSAL_ENABLED', 'false');
    const { getCreateProposalIntegrationStatus, submitCreateProposal } = await import('../../src/modules/governance/api/createProposalContract');

    const receipt = await submitCreateProposal({
      draft: { id: 'local-draft-test' },
      request: { proposal: { title: 'Mock proposal' } },
    });
    const integration = getCreateProposalIntegrationStatus();

    expect(receipt.status).toBe('mock-submitted');
    expect(receipt.submissionMode).toBe('mock-review');
    expect(receipt.indexerReconciliation.reasonCode).toBe('INDEXER_STATE_NOT_READY');
    expect(integration.submissionMode).toBe('mock-review');
    expect(integration.backendEnabled).toBe(false);
    expect(integration.reasonCodes[0].reasonCode).toBe('CREATE_PROPOSAL_BACKEND_NOT_ENABLED');
  });

  test('posts the request to the governance API when backend create proposal is enabled', async () => {
    vi.stubEnv('VITE_GOVERNANCE_CREATE_PROPOSAL_ENABLED', 'true');
    vi.stubEnv('VITE_GOVERNANCE_API_URL', 'http://governance-api.local');
    const { getCreateProposalIntegrationStatus, submitCreateProposal } = await import('../../src/modules/governance/api/createProposalContract');
    const request = { proposal: { title: 'Backend proposal' } };
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          receiptId: 'backend-receipt-1',
          status: 'backend-submitted',
          message: 'Accepted',
        }),
    });

    const receipt = await submitCreateProposal({ request, fetchImpl });
    const integration = getCreateProposalIntegrationStatus();

    expect(fetchImpl).toHaveBeenCalledWith(
      'http://governance-api.local/v2/proposals/create',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(request),
      }),
    );
    expect(receipt.id).toBe('backend-receipt-1');
    expect(receipt.status).toBe('backend-submitted');
    expect(receipt.submissionMode).toBe('backend');
    expect(receipt.indexerReconciliation.reasonCode).toBe('INDEXER_STATE_NOT_READY');
    expect(integration.submissionMode).toBe('backend');
    expect(integration.backendEnabled).toBe(true);
    expect(integration.endpoint).toBe('http://governance-api.local/v2/proposals/create');
  });
});
