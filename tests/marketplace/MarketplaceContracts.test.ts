import { describe, expect, test } from 'vitest';
import { marketplaceApiModule } from '../../apps/api/modules/marketplace';
import { MarketplaceApiSchemas } from '../../src/modules/marketplace/contracts';
import { createMockMarketplaceRepositories } from '../../src/modules/marketplace/repositories';
import {
  ProductSchema,
  PurchaseRecordSchema,
  SellerSchema,
  TenantSchema,
} from '../../src/modules/marketplace/schemas';
import {
  createMarketplaceEntityRef,
  createMarketplaceRuntimeId,
} from '../../src/modules/marketplace/utils/runtimeIds';

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe('Marketplace API contracts', () => {
  test('defines backend-ready mock API routes without enabling settlement', () => {
    expect(marketplaceApiModule.basePath).toBe('/api/marketplace');
    expect(marketplaceApiModule.settlementEnabled).toBe(false);
    expect(Object.keys(MarketplaceApiSchemas)).toEqual(expect.arrayContaining([
      'listProducts',
      'getProduct',
      'listSellers',
      'listTenants',
      'listLicenses',
      'listPurchases',
      'listSubscriptions',
      'listGovernanceValidations',
      'createPurchasePreview',
      'createBillingPreview',
      'createAuctionPreview',
      'createBidPreview',
      'getEntitlements',
    ]));
  });

  test('validates normalized product, seller, tenant and purchase DTOs', async () => {
    const repositories = createMockMarketplaceRepositories();
    const [product] = await repositories.products.list();
    const [seller] = await repositories.sellers.list();
    const [tenant] = await repositories.tenants.list();
    const [purchase] = await repositories.purchases.list();

    expect(ProductSchema.parse(product).runtimeId).toMatch(uuidPattern);
    expect(SellerSchema.parse(seller).entityRef).toBe(createMarketplaceEntityRef('seller', seller.id));
    expect(TenantSchema.parse(tenant).runtimeId).toBe(createMarketplaceRuntimeId('tenant', tenant.id));
    expect(PurchaseRecordSchema.parse(purchase).timestamp).toMatch(/T/);
  });

  test('rejects unsafe create listing payloads before API handoff', () => {
    const result = MarketplaceApiSchemas.createListingPreview.request.safeParse({
      title: '',
      tokenStandard: 'ERC721',
      listingType: 'fixed',
      chain: 'Polygon',
      price: 0,
      currency: 'USDC',
      royaltyBps: 12000,
      metadataUri: '',
      deliveryType: 'Signed URL',
      treasuryDestination: '',
      governanceReviewRequired: true,
    });

    expect(result.success).toBe(false);
  });
});
