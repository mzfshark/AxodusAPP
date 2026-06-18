import { describe, expect, test } from 'vitest';
import { createMarketplaceApiRuntime } from '../../src/modules/marketplace/services/marketplaceApiRuntime';
import { buildMarketplaceEntitlementReadModel } from '../../src/modules/marketplace/services/entitlementService';
import {
  createMockMarketplaceRepositories,
  getRepositoryRuntimeRef,
} from '../../src/modules/marketplace/repositories';

describe('Marketplace repositories and runtime read models', () => {
  test('lists and resolves products through repository boundaries', async () => {
    const repositories = createMockMarketplaceRepositories();
    const products = await repositories.products.list({ governanceStatus: 'under-review', chain: 'Arbitrum' });
    const product = products[0];
    const sameProduct = await repositories.products.getBySlug(product.slug);

    expect(products).toHaveLength(1);
    expect(product.runtimeId).toBe(getRepositoryRuntimeRef('product', product.id));
    expect(sameProduct?.tenantId).toBe(product.tenantId);
  });

  test('aggregates entitlement read models without ownership execution', async () => {
    const repositories = createMockMarketplaceRepositories();
    const entitlement = await buildMarketplaceEntitlementReadModel({ owner: 'Academy DAO', repositories });

    expect(entitlement.owner).toBe('Academy DAO');
    expect(entitlement.subscriptions).toEqual(expect.arrayContaining([
      expect.objectContaining({ productId: 'product-academy-cert-bundle' }),
    ]));
    expect(entitlement.deliveryPermissions[0].permissions.length).toBeGreaterThan(0);
    expect(entitlement.nftOwnershipReadiness.every((item) => item.ownershipValidationEnabled === false)).toBe(true);
  });

  test('exposes local repository and mock API runtime envelopes', async () => {
    const localRuntime = createMarketplaceApiRuntime({ mode: 'local-repository' });
    const mockApiRuntime = createMarketplaceApiRuntime({ mode: 'mock-api' });

    const products = await localRuntime.listProducts({ category: 'Governance' });
    const purchase = await mockApiRuntime.createPurchasePreview({
      buyer: '0xAxoD...Mock',
      productId: 'product-governance-dashboard-nft',
      currency: 'USDC',
    });
    const bid = await mockApiRuntime.createBidPreview({
      bidder: '0xBidder...Mock',
      productId: 'product-academy-cert-bundle',
      amount: 100,
      currency: 'USDC',
    });
    const entitlements = await mockApiRuntime.getEntitlements({ owner: 'Academy DAO' });

    expect(products.meta.source).toBe('local-repository');
    expect(products.meta.settlementEnabled).toBe(false);
    expect(purchase.meta.source).toBe('mock-api');
    expect(purchase.data.settlementMode).toBe('mock-only');
    expect(bid.data.contractWriteEnabled).toBe(false);
    expect(entitlements.data.owner).toBe('Academy DAO');
  });

  test('exposes repository-backed billing and governance validation read models', async () => {
    const repositories = createMockMarketplaceRepositories();
    const billing = await repositories.billing.getPreviewByOrderId('order-mkt-001');
    const validations = await repositories.governanceValidations.list({ productId: 'product-mcp-agent-template' });

    expect(billing?.settlementEnabled).toBe(false);
    expect(billing?.blockedReasons).toEqual(expect.arrayContaining(['governance-review-required']));
    expect(validations[0].settlementAllowed).toBe(false);
    expect(validations[0].blockers).toEqual(expect.arrayContaining(['product-restricted']));
  });
});
