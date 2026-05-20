import { describe, expect, test, vi, afterEach } from 'vitest';
import { getMiningMeta, miningApi } from '../../src/modules/mining/services/miningApi';
import { apiEnvelopeSchema, miningSummarySchema } from '../../src/modules/mining/contracts/miningContracts';

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
});
