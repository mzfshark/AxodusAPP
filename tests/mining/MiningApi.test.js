import { describe, expect, test, vi, afterEach } from 'vitest';
import { getMiningMeta, miningApi } from '../../src/modules/mining/services/miningApi';
import {
  apiEnvelopeSchema,
  miningSummarySchema,
  miningGovernanceActionSchema,
  miningProposalIntentSchema,
  providerAdapterDefinitionSchema,
  providerTelemetrySchema,
  treasuryPolicyEvaluationSchema
} from '../../src/modules/mining/contracts/miningContracts';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('Mining API client', () => {
  test('returns API data with stable metadata when the Mining backend is available', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(
      JSON.stringify({
        data: {
          totalProviders: 6,
          activeMockProviders: 4,
          treasuryExposureUsd: 1840000,
          approvedProviders: 2,
          highRiskProviders: 2,
          nativeHashStatus: 'future architecture only'
        },
        meta: {
          source: 'mining-api',
          version: 'v1',
          generatedAt: '2026-05-20T00:00:00.000Z',
          mock: true
        },
        errors: []
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )));

    const summary = await miningApi.getSummary();

    expect(summary.totalProviders).toBe(6);
    expect(getMiningMeta(summary)).toMatchObject({
      source: 'api',
      version: 'v1',
      mock: true,
      apiBase: 'http://localhost:8787'
    });
  });

  test('validates the standard v1 envelope contract', () => {
    const parsed = apiEnvelopeSchema(miningSummarySchema).parse({
      data: {
        totalProviders: 1,
        activeMockProviders: 1,
        treasuryExposureUsd: 390000,
        approvedProviders: 1,
        highRiskProviders: 0,
        nativeHashStatus: 'future architecture only'
      },
      meta: {
        source: 'mining-api',
        version: 'v1',
        generatedAt: '2026-05-20T00:00:00.000Z',
        mock: true
      },
      errors: []
    });

    expect(parsed.meta.version).toBe('v1');
  });

  test('falls back to local mock data when the Mining API is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => {
      throw new Error('backend offline');
    }));

    const providers = await miningApi.getProviders();

    expect(providers.length).toBeGreaterThan(0);
    expect(providers.map((provider) => provider.slug)).toContain('luxor');
    expect(getMiningMeta(providers)).toMatchObject({
      source: 'fallback',
      message: 'Using local mock fallback — Mining API unavailable.'
    });
  });

  test('returns null for a missing provider slug without inventing provider data', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(
      JSON.stringify({
        data: null,
        meta: {
          source: 'mining-api',
          version: 'v1',
          generatedAt: '2026-05-20T00:00:00.000Z',
          mock: true
        },
        errors: [{ code: 'PROVIDER_NOT_FOUND', message: 'Provider not found' }]
      }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    )));

    const provider = await miningApi.getProviderBySlug('unknown-provider');

    expect(provider).toBeNull();
  });

  test('falls back when the API response fails contract validation', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(
      JSON.stringify({ data: { totalProviders: 'bad-shape' }, meta: {}, errors: [] }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )));

    const summary = await miningApi.getSummary();

    expect(summary.totalProviders).toBeGreaterThan(0);
    expect(getMiningMeta(summary)).toMatchObject({
      source: 'fallback',
      message: 'Using local mock fallback — Mining API unavailable.'
    });
  });

  test('loads provider adapters as read-only service contracts', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(
      JSON.stringify({
        data: [{
          id: 'adapter-luxor',
          providerId: 'provider-luxor',
          providerSlug: 'luxor',
          providerName: 'Luxor',
          adapterKey: 'axodus.mining.providers.luxor',
          status: 'mock-ready',
          integrationReadiness: 'mock-ready',
          apiAvailability: 'partner',
          readOnly: true,
          mock: true,
          executionEnabled: false,
          treasuryMovementEnabled: false,
          walletRequired: false,
          capabilities: ['read-provider-profile', 'read-telemetry'],
          blockedActions: ['hashpower-purchase', 'treasury-movement', 'wallet-claim'],
          telemetry: {
            reportingMode: 'partner-api',
            freshness: 'daily-mock',
            lastObservedAt: '2026-05-20',
            healthSignal: 'watch',
            notes: 'Read-only mock telemetry.'
          },
          diligenceRequirements: ['custody classification'],
          fallbackStrategy: 'Manual backup telemetry.',
          lifecycleStage: 'mock-adapter',
          governanceNotes: 'Mock notes.'
        }],
        meta: {
          source: 'mining-api',
          version: 'v1',
          generatedAt: '2026-05-20T00:00:00.000Z',
          mock: true
        },
        errors: []
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )));

    const adapters = await miningApi.getProviderAdapters();

    expect(providerAdapterDefinitionSchema.array().parse(adapters)[0]).toMatchObject({
      providerSlug: 'luxor',
      readOnly: true,
      executionEnabled: false
    });
    expect(getMiningMeta(adapters)).toMatchObject({ source: 'api' });
  });

  test('falls back to minimal provider adapters when adapter endpoint is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => {
      throw new Error('adapter endpoint offline');
    }));

    const adapters = await miningApi.getProviderAdapters();

    expect(adapters.length).toBeGreaterThan(0);
    expect(adapters.every((adapter) => adapter.readOnly && !adapter.executionEnabled)).toBe(true);
    expect(getMiningMeta(adapters)).toMatchObject({
      source: 'fallback',
      message: 'Using local mock fallback — Mining API unavailable.'
    });
  });

  test('loads normalized provider telemetry and treasury policy evaluation contracts', async () => {
    const responses = {
      '/api/mining/provider-telemetry': {
        data: [{
          id: 'telemetry-luxor',
          providerId: 'provider-luxor',
          providerSlug: 'luxor',
          providerName: 'Luxor',
          reportedHashExposure: 225,
          tokenizedHashUnit: 'pool TH/s reporting reference',
          normalizedHashrateThs: 225,
          underlyingAsset: 'BTC pool exposure',
          estimatedMinedAsset: 'BTC',
          lastProviderUpdate: '2026-05-20T09:45:00.000Z',
          dataFreshnessStatus: 'fresh',
          liquiditySnapshot: 'moderate',
          priceNavReference: 'provider statement NAV reference',
          rewardAccountingStatus: 'reconciled',
          providerServiceHealth: 'healthy',
          uptimeStatus: 'online',
          apiAvailability: 'partner',
          telemetryConfidenceLevel: 'high',
          sourceType: 'api-ready',
          normalized: {
            hashExposureThs: 225,
            minedAssetSymbol: 'BTC',
            liquidityLabel: 'moderate',
            serviceHealthLabel: 'healthy',
            freshnessLabel: 'fresh',
            adapterReadiness: 'mock-ready',
            rewardAccountingLabel: 'reconciled',
            confidenceScore: 90
          },
          notes: 'Mock telemetry.'
        }]
      },
      '/api/mining/treasury-policy-evaluation': {
        data: {
          policyId: 'policy-mining-treasury-v1',
          status: 'violation',
          providerConcentrationWarnings: ['provider warning'],
          riskLevelConcentrationWarnings: [],
          restrictedProviderExposureWarnings: ['restricted warning'],
          reserveRatioStatus: 'compliant',
          rebalanceRecommendation: 'Reduce restricted exposure.',
          governanceActionRequired: true,
          evaluatedAt: '2026-05-20T00:00:00.000Z'
        }
      }
    };

    vi.stubGlobal('fetch', vi.fn(async (url) => {
      const path = new URL(url).pathname;
      return new Response(JSON.stringify({
        ...responses[path],
        meta: { source: 'mining-api', version: 'v1', generatedAt: '2026-05-20T00:00:00.000Z', mock: true },
        errors: []
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }));

    const telemetry = await miningApi.getProviderTelemetry();
    const evaluation = await miningApi.getTreasuryPolicyEvaluation();

    expect(providerTelemetrySchema.array().parse(telemetry)[0].normalized.confidenceScore).toBe(90);
    expect(treasuryPolicyEvaluationSchema.parse(evaluation).governanceActionRequired).toBe(true);
  });

  test('loads governance action candidates and proposal intents as non-executable previews', async () => {
    const responses = {
      '/api/mining/governance-actions': {
        data: [{
          id: 'action-treasury-policy-rebalance',
          actionType: 'treasury-policy',
          sourceSignal: 'treasury-policy-evaluation',
          treasuryScope: 'mining-treasury-exposure',
          severity: 'high',
          reasonSeverity: 'high',
          recommendedAction: 'Open governance review.',
          requiredApprovalLevel: 'treasury-council',
          governanceStatus: 'ready-for-review',
          constitutionalStanding: 'under-review',
          federationMember: false,
          federationTier: 'candidate',
          reasonCodes: ['TREASURY_POLICY_DRIFT'],
          constitutionalFlags: ['TREASURY_POLICY_VIOLATION'],
          expectedImpact: 'Rebalance exposure.',
          executionReadiness: 'proposal-ready',
          mockOnlyDisclaimer: 'Mock governance action candidate only. No proposal execution is enabled.'
        }]
      },
      '/api/mining/proposal-intents': {
        data: [{
          id: 'intent-action-treasury-policy-rebalance',
          actionId: 'action-treasury-policy-rebalance',
          intentType: 'rebalance-vault',
          title: 'Mining governance intent: rebalance',
          summary: 'Policy drift generated a governance candidate.',
          scope: { treasuryScope: 'mining-treasury-exposure' },
          preconditions: ['review signal'],
          expectedImpact: 'Rebalance exposure.',
          riskNotes: ['TREASURY_POLICY_DRIFT'],
          requiredGovernanceBody: 'treasury-council',
          mockExecutionPayloadPreview: { readOnly: true, executionEnabled: false },
          executionBlockedReason: 'Read-only MVP.'
        }]
      }
    };

    vi.stubGlobal('fetch', vi.fn(async (url) => {
      const path = new URL(url).pathname;
      return new Response(JSON.stringify({
        ...responses[path],
        meta: { source: 'mining-api', version: 'v1', generatedAt: '2026-05-20T00:00:00.000Z', mock: true },
        errors: []
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }));

    const actions = await miningApi.getGovernanceActions();
    const intents = await miningApi.getProposalIntents();

    expect(miningGovernanceActionSchema.array().parse(actions)[0]).toMatchObject({
      governanceStatus: 'ready-for-review',
      executionReadiness: 'proposal-ready'
    });
    expect(miningProposalIntentSchema.array().parse(intents)[0].mockExecutionPayloadPreview.executionEnabled).toBe(false);
  });
});
