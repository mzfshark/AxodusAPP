import { z } from 'zod';
import {
  ApiEnvelopeSchema,
  AuctionPreviewSchema,
  BidPreviewSchema,
  BillingPreviewSchema,
  GovernanceValidationSchema,
  LicenseSchema,
  MarketplaceEntitlementSchema,
  ProductSchema,
  PurchaseRecordSchema,
  SellerSchema,
  SubscriptionSchema,
  TenantSchema,
} from '../schemas';

export const MarketplaceListProductsRequestSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  governanceStatus: z.string().optional(),
  chain: z.string().optional(),
  listingType: z.string().optional(),
  operationalRisk: z.string().optional(),
  acsValidationState: z.string().optional(),
  minReputation: z.coerce.number().optional(),
});

export const MarketplaceProductDetailRequestSchema = z.object({
  productIdOrSlug: z.string().min(1),
});

export const MarketplaceCreateListingPreviewRequestSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  tokenStandard: z.enum(['ERC721', 'ERC1155', 'OffchainLicense']),
  listingType: z.string().min(1),
  chain: z.string().min(1),
  price: z.coerce.number().positive(),
  currency: z.string().min(2),
  royaltyBps: z.coerce.number().int().min(0).max(10000),
  reservePrice: z.coerce.number().optional(),
  durationDays: z.coerce.number().int().optional(),
  quantity: z.coerce.number().int().positive().default(1),
  metadataUri: z.string().min(1),
  deliveryType: z.string().min(1),
  treasuryDestination: z.string().min(1),
  governanceReviewRequired: z.boolean().default(true),
});

export const MarketplacePurchasePreviewRequestSchema = z.object({
  buyer: z.string().min(1),
  productId: z.string().min(1),
  currency: z.string().min(2).optional(),
});

export const MarketplaceBidPreviewRequestSchema = z.object({
  bidder: z.string().min(1),
  productId: z.string().min(1),
  amount: z.coerce.number().positive(),
  currency: z.string().min(2),
});

export const MarketplaceBillingPreviewRequestSchema = z.object({
  orderId: z.string().min(1),
});

export const MarketplaceEntitlementRequestSchema = z.object({
  owner: z.string().min(1),
});

export const MarketplaceApiSchemas = {
  listProducts: {
    method: 'GET',
    path: '/api/marketplace/products',
    request: MarketplaceListProductsRequestSchema,
    response: ApiEnvelopeSchema(z.array(ProductSchema)),
  },
  getProduct: {
    method: 'GET',
    path: '/api/marketplace/products/:productIdOrSlug',
    request: MarketplaceProductDetailRequestSchema,
    response: ApiEnvelopeSchema(ProductSchema),
  },
  listSellers: {
    method: 'GET',
    path: '/api/marketplace/sellers',
    request: z.object({}),
    response: ApiEnvelopeSchema(z.array(SellerSchema)),
  },
  listTenants: {
    method: 'GET',
    path: '/api/marketplace/tenants',
    request: z.object({}),
    response: ApiEnvelopeSchema(z.array(TenantSchema)),
  },
  listLicenses: {
    method: 'GET',
    path: '/api/marketplace/licenses',
    request: z.object({}),
    response: ApiEnvelopeSchema(z.array(LicenseSchema)),
  },
  listPurchases: {
    method: 'GET',
    path: '/api/marketplace/purchases',
    request: z.object({ buyer: z.string().optional() }),
    response: ApiEnvelopeSchema(z.array(PurchaseRecordSchema)),
  },
  listSubscriptions: {
    method: 'GET',
    path: '/api/marketplace/subscriptions',
    request: z.object({ holder: z.string().optional() }),
    response: ApiEnvelopeSchema(z.array(SubscriptionSchema)),
  },
  listGovernanceValidations: {
    method: 'GET',
    path: '/api/marketplace/governance-validations',
    request: z.object({ productId: z.string().optional() }),
    response: ApiEnvelopeSchema(z.array(GovernanceValidationSchema)),
  },
  createListingPreview: {
    method: 'POST',
    path: '/api/marketplace/listing-previews',
    request: MarketplaceCreateListingPreviewRequestSchema,
    response: ApiEnvelopeSchema(ProductSchema.partial().extend({ draftStatus: z.string(), contractWriteEnabled: z.literal(false) })),
  },
  createPurchasePreview: {
    method: 'POST',
    path: '/api/marketplace/purchase-previews',
    request: MarketplacePurchasePreviewRequestSchema,
    response: ApiEnvelopeSchema(PurchaseRecordSchema),
  },
  createBillingPreview: {
    method: 'POST',
    path: '/api/marketplace/billing-previews',
    request: MarketplaceBillingPreviewRequestSchema,
    response: ApiEnvelopeSchema(BillingPreviewSchema),
  },
  createAuctionPreview: {
    method: 'POST',
    path: '/api/marketplace/auction-previews',
    request: z.object({ productId: z.string().min(1) }),
    response: ApiEnvelopeSchema(AuctionPreviewSchema),
  },
  createBidPreview: {
    method: 'POST',
    path: '/api/marketplace/bid-previews',
    request: MarketplaceBidPreviewRequestSchema,
    response: ApiEnvelopeSchema(BidPreviewSchema),
  },
  getEntitlements: {
    method: 'GET',
    path: '/api/marketplace/entitlements/:owner',
    request: MarketplaceEntitlementRequestSchema,
    response: ApiEnvelopeSchema(MarketplaceEntitlementSchema),
  },
} as const;

export type MarketplaceListProductsRequest = z.infer<typeof MarketplaceListProductsRequestSchema>;
export type MarketplaceCreateListingPreviewRequest = z.infer<typeof MarketplaceCreateListingPreviewRequestSchema>;
export type MarketplacePurchasePreviewRequest = z.infer<typeof MarketplacePurchasePreviewRequestSchema>;
export type MarketplaceBidPreviewRequest = z.infer<typeof MarketplaceBidPreviewRequestSchema>;
export type MarketplaceBillingPreviewRequest = z.infer<typeof MarketplaceBillingPreviewRequestSchema>;
export type MarketplaceEntitlementRequest = z.infer<typeof MarketplaceEntitlementRequestSchema>;
