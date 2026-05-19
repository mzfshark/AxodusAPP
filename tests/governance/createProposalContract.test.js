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
    expect(request.plugin.createProposalAdapter).toMatchObject({
      family: 'evm-voting',
      status: 'observed',
      expectedBackendAdapter: 'evm-token-voting-create-proposal',
      executionIntent: 'vote-only',
    });
    expect(request.adapterPayload).toMatchObject({
      adapterFamily: 'evm-voting',
      requestKind: 'proposal-metadata',
    });
    expect(request.governanceContext.observedSources).toEqual([expect.objectContaining({ key: 'plugin', status: 'observed' })]);
    expect(request.governanceContext.sources.plugin).toMatchObject({
      source: 'observed plugin selection',
      observed: true,
      interfaceType: 'tokenVoting',
    });
    expect(request.governanceContext.sources.registry.observed).toBe(false);
    expect(request.governanceContext.sources.dao.observed).toBe(false);
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
          storageMode: 'mongo',
          source: 'CreateProposalRequest',
          storage: {
            mode: 'mongo',
            source: 'CreateProposalRequest',
            persisted: true,
          },
          indexerReconciliation: {
            status: 'pending',
            reasonCode: 'INDEXER_STATE_NOT_READY',
            reasonSeverity: 'info',
            storageMode: 'mongo',
            observedRequestId: 'backend-receipt-1',
          },
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
    expect(receipt.storageMode).toBe('mongo');
    expect(receipt.source).toBe('CreateProposalRequest');
    expect(receipt.storage.persisted).toBe(true);
    expect(receipt.indexerReconciliation.reasonCode).toBe('INDEXER_STATE_NOT_READY');
    expect(receipt.indexerReconciliation.observedRequestId).toBe('backend-receipt-1');
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
          storageMode: 'mongo',
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
    expect(result.storageMode).toBe('mongo');
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

  test('adds plugin adapter metadata and transparent reason codes for treasury create proposal drafts', async () => {
    vi.stubEnv('VITE_GOVERNANCE_CREATE_PROPOSAL_ENABLED', 'true');
    const { buildCreateProposalRequest } = await import('../../src/modules/governance/api/createProposalContract');

    const request = buildCreateProposalRequest({
      draft: {
        title: 'Treasury policy review',
        summary: 'Review treasury allocation boundaries.',
        actionType: 'treasury-review',
      },
      walletAddress: '0xAxoD000000000000000000000000000000000001',
      plugin: {
        id: 'capital-distributor',
        interfaceType: 'capitalDistributor',
        address: '0x1111111111111111111111111111111111111111',
      },
    });

    expect(request.plugin.createProposalAdapter).toMatchObject({
      family: 'treasury-policy',
      expectedBackendAdapter: 'treasury-policy-create-proposal',
      executionIntent: 'requires-treasury-policy-review',
    });
    expect(request.adapterPayload.reasonCodes).toEqual(
      expect.arrayContaining([expect.objectContaining({ reasonCode: 'TREASURY_POLICY_REQUIRES_REVIEW', reasonSeverity: 'constitutional' })]),
    );
    expect(request.governanceContext.observedSources).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: 'plugin', status: 'observed' }),
        expect.objectContaining({ key: 'treasuryPolicy', status: 'requires-review' }),
      ]),
    );
    expect(request.governanceContext.sources.treasuryPolicy).toMatchObject({
      source: 'treasury policy',
      observed: true,
      reviewRequired: true,
      reasonCodes: ['TREASURY_POLICY_REQUIRES_REVIEW'],
      reasonSeverity: 'constitutional',
    });
    expect(request.guardrails.reasonCodes.map((reason) => reason.reasonCode)).toContain('TREASURY_POLICY_REQUIRES_REVIEW');
  });

  test('maps selected registry DAO and plugin capability sources into observed governance context', async () => {
    vi.stubEnv('VITE_GOVERNANCE_CREATE_PROPOSAL_ENABLED', 'true');
    const { buildCreateProposalRequest } = await import('../../src/modules/governance/api/createProposalContract');

    const request = buildCreateProposalRequest({
      draft: {
        title: 'Registry observed proposal',
        summary: 'Validate observed source expansion.',
        actionType: 'signaling',
      },
      selectedDao: {
        id: 'dao-executive-001',
        name: 'Axodus Executive DAO',
        address: '0x0000000000000000000000000000000000000a11',
        governanceStatus: 'compliant',
        federationMember: true,
        federationTier: 'root',
      },
      selectedChain: {
        name: 'Ethereum Sepolia',
        network: 'ethereum-sepolia',
        chainId: 11155111,
        governanceStatus: 'compliant',
        federationMember: true,
        federationTier: 'root',
        capabilities: {
          pluginCapabilities: {
            tokenVoting: {
              pluginType: 'tokenVoting',
              governanceNucleus: 'local',
              constitutionalStanding: { status: 'compliant' },
            },
          },
        },
      },
      walletAddress: '0xAxoD000000000000000000000000000000000001',
      plugin: { id: 'token-voting', interfaceType: 'tokenVoting' },
    });

    expect(request.governanceContext.observedSources).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: 'registry', source: 'chain registry', status: 'observed' }),
        expect.objectContaining({ key: 'dao', source: 'DAO registry', status: 'observed' }),
        expect.objectContaining({ key: 'plugin', source: 'chain plugin capability registry', status: 'observed' }),
      ]),
    );
    expect(request.governanceContext.sources.registry).toMatchObject({
      observed: true,
      network: 'ethereum-sepolia',
      governanceStatus: 'compliant',
      federationMember: true,
      federationTier: 'root',
    });
    expect(request.governanceContext.sources.dao).toMatchObject({
      observed: true,
      id: 'dao-executive-001',
      governanceStatus: 'compliant',
      federationTier: 'root',
    });
    expect(request.governanceContext.sources.plugin.capability).toMatchObject({
      pluginType: 'tokenVoting',
      governanceNucleus: 'local',
    });
  });

  test('keeps Harmony create proposal payloads as legacy voting metadata only', async () => {
    vi.stubEnv('VITE_GOVERNANCE_CREATE_PROPOSAL_ENABLED', 'true');
    const { buildCreateProposalRequest } = await import('../../src/modules/governance/api/createProposalContract');

    const request = buildCreateProposalRequest({
      draft: {
        title: 'Harmony legacy vote',
        summary: 'Render legacy voting request metadata.',
        actionType: 'signaling',
      },
      walletAddress: '0xAxoD000000000000000000000000000000000001',
      plugin: {
        id: 'harmony-voting',
        interfaceType: 'harmonyVoting',
      },
    });

    expect(request.plugin.createProposalAdapter).toMatchObject({
      family: 'harmony-legacy',
      expectedBackendAdapter: 'harmony-legacy-create-proposal',
      executionIntent: 'legacy-voting-only',
    });
    expect(request.guardrails.reasonCodes).toEqual(
      expect.arrayContaining([expect.objectContaining({ reasonCode: 'EXECUTION_CHAIN_NOT_AUTHORIZED', source: 'legacy adapter' })]),
    );
  });
});
