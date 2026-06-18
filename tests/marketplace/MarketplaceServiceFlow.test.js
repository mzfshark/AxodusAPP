import { describe, expect, test } from 'vitest';
import { marketplaceMock } from '../../src/data/mock';
import {
  filterMarketplaceProducts,
  getMarketplaceProduct,
  getMarketplaceProductById,
  getMarketplaceProductContext,
  getMarketplaceSeller,
  getMarketplaceTenant,
} from '../../src/modules/marketplace/services/marketplaceService';
import {
  BillingLifecycle,
  LicenseLifecycle,
  ProductLifecycle,
  PurchaseLifecycle,
  SubscriptionLifecycle,
  buildLifecycleTimeline,
  getProductLifecycle,
} from '../../src/modules/marketplace/utils/stateMachines';

describe('Marketplace service flow', () => {
  test('looks up product, seller, tenant and license context as one marketplace flow', () => {
    const product = getMarketplaceProduct('governance-dashboard-nft-access');
    const context = getMarketplaceProductContext(product);

    expect(getMarketplaceProductById(product.id).slug).toBe(product.slug);
    expect(getMarketplaceSeller(product.sellerId).id).toBe(product.sellerId);
    expect(getMarketplaceTenant(product.tenantId).name).toBe('Axodus DAO');
    expect(context.seller.name).toBe('Axodus Nucleus');
    expect(context.tenant.id).toBe(product.tenantId);
    expect(context.license.type).toBe(product.licenseType);
  });

  test('filters products by governance, chain and risk while preserving tenant ownership', () => {
    const products = filterMarketplaceProducts({ governanceStatus: 'under-review', chain: 'Arbitrum', operationalRisk: 'medium' });

    expect(products).toHaveLength(1);
    expect(products[0].daoOwner).toBe('Axodus DAO');
    expect(products[0].tenantId).toBe('tenant-axodus-dao');
  });

  test('all product mocks are tenant-aware and lifecycle-aware', () => {
    expect(marketplaceMock.products.every((product) => product.tenantId && product.createdAt && product.updatedAt && product.validationStatus)).toBe(true);
    expect(marketplaceMock.products.map(getProductLifecycle)).toEqual(expect.arrayContaining(['approved', 'pending-validation', 'restricted']));
  });

  test('state machine helpers expose expected mock lifecycle steps', () => {
    expect(Object.values(ProductLifecycle)).toEqual(expect.arrayContaining(['draft', 'approved', 'restricted']));
    expect(Object.values(PurchaseLifecycle)).toEqual(expect.arrayContaining(['initialized', 'preview-issued', 'completed-mock']));
    expect(Object.values(LicenseLifecycle)).toEqual(expect.arrayContaining(['preview', 'issued', 'active']));
    expect(Object.values(SubscriptionLifecycle)).toEqual(expect.arrayContaining(['trial-mock-preview', 'paused']));
    expect(Object.values(BillingLifecycle)).toEqual(expect.arrayContaining(['estimate', 'invoice-preview', 'paid-mock']));
    expect(buildLifecycleTimeline(Object.values(PurchaseLifecycle), 'preview-issued').some((step) => step.status === 'current')).toBe(true);
  });
});
