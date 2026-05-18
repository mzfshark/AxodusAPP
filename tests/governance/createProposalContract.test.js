import { afterEach, describe, expect, test, vi } from 'vitest';

describe('create proposal submission contract', () => {
  afterEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  test('uses local mock submission when backend create proposal is disabled', async () => {
    vi.stubEnv('VITE_GOVERNANCE_CREATE_PROPOSAL_ENABLED', 'false');
    const { buildCreateProposalRequest, getCreateProposalIntegrationStatus, submitCreateProposal } = await import(
      '../../src/modules/governance/api/createProposalContract'
    );

    const receipt = await submitCreateProposal({
      draft: { id: 'local-draft-test' },
      request: { proposal: { title: 'Mock proposal' } },
    });
    const integration = getCreateProposalIntegrationStatus();
    const request = buildCreateProposalRequest({
      draft: { title: 'Mock proposal', summary: 'Mock summary', actionType: 'signaling' },
      walletAddress: '0xAxoD000000000000000000000000000000000001',
      plugin: { id: 'token-voting', interfaceType: 'tokenVoting' },
    });

    expect(receipt.status).toBe('mock-submitted');
    expect(receipt.submissionMode).toBe('mock-review');
    expect(receipt.indexerReconciliation.reasonCode).toBe('INDEXER_STATE_NOT_READY');
    expect(request.submissionMode).toBe('mock-review');
    expect(request.guardrails.reasonCodes.map((reason) => reason.reasonCode)).toContain('CREATE_PROPOSAL_BACKEND_NOT_ENABLED');
    expect(integration.submissionMode).toBe('mock-review');
    expect(integration.backendEnabled).toBe(false);
    expect(integration.reasonCodes[0].reasonCode).toBe('CREATE_PROPOSAL_BACKEND_NOT_ENABLED');
  });

  test('posts the request to the governance API when backend create proposal is enabled', async () => {
    vi.stubEnv('VITE_GOVERNANCE_CREATE_PROPOSAL_ENABLED', 'true');
    vi.stubEnv('VITE_GOVERNANCE_API_URL', 'http://governance-api.local');
    const { buildCreateProposalRequest, getCreateProposalIntegrationStatus, submitCreateProposal } = await import(
      '../../src/modules/governance/api/createProposalContract'
    );
    const request = { proposal: { title: 'Backend proposal' } };
    const previewRequest = buildCreateProposalRequest({
      draft: { title: 'Backend proposal', summary: 'Backend summary', actionType: 'signaling' },
      walletAddress: '0xAxoD000000000000000000000000000000000001',
      plugin: { id: 'token-voting', interfaceType: 'tokenVoting' },
    });
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
    expect(previewRequest.submissionMode).toBe('backend');
    expect(previewRequest.guardrails.reasonCodes.map((reason) => reason.reasonCode)).not.toContain('CREATE_PROPOSAL_BACKEND_NOT_ENABLED');
    expect(integration.submissionMode).toBe('backend');
    expect(integration.backendEnabled).toBe(true);
    expect(integration.endpoint).toBe('http://governance-api.local/v2/proposals/create');
  });

  test('preserves backend reason metadata when create proposal submission fails', async () => {
    vi.stubEnv('VITE_GOVERNANCE_CREATE_PROPOSAL_ENABLED', 'true');
    vi.stubEnv('VITE_GOVERNANCE_API_URL', 'http://governance-api.local');
    const { submitCreateProposal } = await import('../../src/modules/governance/api/createProposalContract');
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: false,
      status: 409,
      headers: {
        get: () => 'application/json',
      },
      json: () =>
        Promise.resolve({
          message: 'Treasury policy requires constitutional review.',
          reasonCode: 'TREASURY_POLICY_REQUIRES_REVIEW',
          reasonSeverity: 'constitutional',
          source: 'treasury policy',
          details: { policyId: 'treasury-review-v1' },
        }),
    });

    await expect(submitCreateProposal({ request: { proposal: { title: 'Treasury proposal' } }, fetchImpl })).rejects.toMatchObject({
      message: 'Treasury policy requires constitutional review.',
      status: 409,
      reasonCode: 'TREASURY_POLICY_REQUIRES_REVIEW',
      reasonSeverity: 'constitutional',
      source: 'treasury policy',
      details: { policyId: 'treasury-review-v1' },
    });
  });

  test('lists backend create proposal review requests when backend is enabled', async () => {
    vi.stubEnv('VITE_GOVERNANCE_CREATE_PROPOSAL_ENABLED', 'true');
    vi.stubEnv('VITE_GOVERNANCE_API_URL', 'http://governance-api.local');
    const { listCreateProposalReviewRequests } = await import('../../src/modules/governance/api/createProposalContract');
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          items: [{ id: 'backend-create-1', status: 'backend-review-queued' }],
          count: 1,
          source: 'CreateProposalRequest',
        }),
    });

    const result = await listCreateProposalReviewRequests({
      filters: {
        network: 'ethereum-sepolia',
        status: 'backend-review-queued',
        limit: 5,
      },
      fetchImpl,
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      'http://governance-api.local/v2/proposals/create?network=ethereum-sepolia&status=backend-review-queued&limit=5',
      expect.objectContaining({
        method: 'GET',
      }),
    );
    expect(result.items[0]).toMatchObject({ id: 'backend-create-1', status: 'backend-review-queued' });
    expect(result.count).toBe(1);
    expect(result.source).toBe('CreateProposalRequest');
  });

  test('does not list backend review requests when backend is disabled', async () => {
    vi.stubEnv('VITE_GOVERNANCE_CREATE_PROPOSAL_ENABLED', 'false');
    const { listCreateProposalReviewRequests } = await import('../../src/modules/governance/api/createProposalContract');
    const fetchImpl = vi.fn();

    const result = await listCreateProposalReviewRequests({ fetchImpl });

    expect(fetchImpl).not.toHaveBeenCalled();
    expect(result.items).toEqual([]);
    expect(result.source).toBe('frontend-disabled');
    expect(result.reasonCodes[0].reasonCode).toBe('CREATE_PROPOSAL_BACKEND_NOT_ENABLED');
  });
});
