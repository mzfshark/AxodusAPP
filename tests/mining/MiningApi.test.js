import { describe, expect, test, vi, afterEach } from 'vitest';
import { getMiningMeta, miningApi } from '../../src/modules/mining/services/miningApi';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('Mining API client', () => {
  test('returns API data with stable metadata when the Mining backend is available', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(
      JSON.stringify({
        data: { totalProviders: 6, treasuryExposureUsd: 1840000 },
        meta: { readOnly: true }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )));

    const summary = await miningApi.getSummary();

    expect(summary.totalProviders).toBe(6);
    expect(getMiningMeta(summary)).toMatchObject({
      source: 'api',
      readOnly: true,
      apiBase: 'http://localhost:8787'
    });
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
      JSON.stringify({ error: 'Provider not found' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    )));

    const provider = await miningApi.getProviderBySlug('unknown-provider');

    expect(provider).toBeNull();
  });
});
