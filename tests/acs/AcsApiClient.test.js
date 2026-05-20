import { describe, expect, test, vi, afterEach } from 'vitest';
import { acsApi, getAcsMeta } from '../../src/modules/acs';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('ACS API client', () => {
  test('falls back to ACS mock capabilities when API is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => {
      throw new Error('ACS API unavailable');
    }));

    const result = await acsApi.getCapabilities('product');

    expect(result.capabilities.map((capability) => capability.id)).toContain('product.trading-ignition');
    expect(result.capabilities.every((capability) => capability.consumptionLevel === 'product')).toBe(true);
    expect(getAcsMeta(result)).toMatchObject({ source: 'fallback' });
  });

  test('uses ACS response envelope without adding business logic', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      json: async () => ({
        success: true,
        correlationId: 'corr-test',
        timestamp: '2026-05-20T00:00:00.000Z',
        version: '0.1.0',
        data: {
          products: [
            {
              productId: 'product.trading-ignition',
              allowed: false,
              blockedReason: 'license required',
              warnings: []
            }
          ]
        }
      })
    })));

    const result = await acsApi.getProductAccess('0xabc', 'product.trading-ignition');

    expect(result.products[0]).toMatchObject({
      productId: 'product.trading-ignition',
      allowed: false,
      blockedReason: 'license required'
    });
    expect(getAcsMeta(result)).toMatchObject({ source: 'api', version: '0.1.0', correlationId: 'corr-test' });
  });

  test('consumes user status summary and structured ACS errors', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      json: async () => ({
        success: false,
        correlationId: 'corr-error',
        timestamp: '2026-05-20T00:00:00.000Z',
        version: '0.1.0',
        error: { code: 'bad_request', message: 'unknown ACS capability: product.unknown' }
      })
    })));

    const result = await acsApi.getUserStatus('0xexpired', { tenantId: 'dao-alpha', productId: 'product.trading-ignition' });

    expect(result.policy).toMatchObject({ allowed: false, blockedReason: 'license_expired' });
    expect(getAcsMeta(result)).toMatchObject({ source: 'fallback' });
  });
});
