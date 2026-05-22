import { z } from 'zod';

export const RuntimeIdSchema = z.string().uuid();
export const EntityRefSchema = z.string().regex(/^mkt:[a-z-]+:[a-z0-9-]+$/);
export const IsoDateSchema = z.string().datetime();

export const MarketplaceEntityBaseSchema = z.object({
  id: z.string().min(1),
  runtimeId: RuntimeIdSchema,
  entityRef: EntityRefSchema,
  sourceId: z.string().min(1),
});

export const MoneySchema = z.object({
  amount: z.number().nonnegative(),
  currency: z.string().min(2),
  settlementMode: z.string().default('mock-only'),
});

export const RoyaltyModelSchema = z.object({
  standard: z.string().min(1),
  bps: z.number().int().min(0).max(10000),
  recipient: z.string().min(1),
  previewAmount: z.number().nonnegative(),
});

export const TenantSchema = MarketplaceEntityBaseSchema.extend({
  name: z.string().min(1),
  type: z.string().min(1),
  governanceStanding: z.string().min(1),
  treasuryDestination: z.string().min(1),
  constitutionalStanding: z.string().min(1),
  reviewAuthority: z.string().min(1),
});

export const SellerSchema = MarketplaceEntityBaseSchema.extend({
  name: z.string().min(1),
  type: z.string().min(1),
  verificationStatus: z.string().min(1),
  governanceStanding: z.string().min(1),
  reputation: z.number().min(0).max(100),
  registeredDAOs: z.array(z.string()),
  tenantId: z.string().min(1),
  productsPublished: z.number().int().nonnegative(),
  constitutionalBound: z.boolean(),
  treasuryLinked: z.boolean(),
  riskScore: z.number().nonnegative(),
  description: z.string(),
});

export const ProductSchema = MarketplaceEntityBaseSchema.extend({
  title: z.string().min(1),
  slug: z.string().min(1),
  category: z.string().min(1),
  subcategory: z.string().min(1),
  sellerId: z.string().min(1),
  tenantId: z.string().min(1),
  description: z.string(),
  shortDescription: z.string(),
  tags: z.array(z.string()),
  image: z.string().url(),
  version: z.string().min(1),
  status: z.string().min(1),
  lifecycleStatus: z.string().min(1),
  governanceLifecycle: z.string().min(1),
  purchaseLifecycle: z.string().min(1),
  licenseLifecycle: z.string().min(1),
  billingLifecycle: z.string().min(1),
  governanceStatus: z.string().min(1),
  constitutionalStanding: z.string().min(1),
  visibility: z.string().min(1),
  pricing: MoneySchema,
  daoOwner: z.string().min(1),
  treasuryDestination: z.string().min(1),
  executionType: z.string().min(1),
  subscriptionStatus: z.string().min(1),
  operationalRisk: z.string().min(1),
  acsValidationState: z.string().min(1),
  acceptedCurrencies: z.array(z.string().min(2)),
  royaltyModel: RoyaltyModelSchema,
  accessModel: z.string().min(1),
  deliveryType: z.string().min(1),
  licenseType: z.string().min(1),
  supportedChains: z.array(z.string()),
  nftBound: z.boolean(),
  governanceRequired: z.boolean(),
  maturity: z.string().min(1),
  tokenStandard: z.string().min(1),
  contractAddress: z.string().optional(),
  tokenId: z.string().optional(),
  listingType: z.string().min(1),
  auction: z.object({
    type: z.string(),
    status: z.string(),
    reservePrice: z.number().nonnegative(),
    highestBid: z.number().nonnegative().optional(),
    bidCount: z.number().int().nonnegative(),
    endsAt: IsoDateSchema,
  }).optional(),
  bridgeReadiness: z.object({
    layerZeroReady: z.boolean(),
    sourceChain: z.string(),
    destinationChains: z.array(z.string()),
  }),
  greenfieldBucket: z.string().optional(),
  signedUrlPreviewAvailable: z.boolean(),
  createdAt: IsoDateSchema,
  updatedAt: IsoDateSchema,
  validationStatus: z.string().min(1),
});

export const LicenseSchema = MarketplaceEntityBaseSchema.extend({
  type: z.string().min(1),
  transferable: z.boolean(),
  revokable: z.boolean(),
  nftBound: z.boolean(),
  expiration: IsoDateSchema.nullable(),
  governanceControlled: z.boolean(),
  permissions: z.array(z.string()),
  ownershipModel: z.string().min(1),
});

export const PurchaseRecordSchema = MarketplaceEntityBaseSchema.extend({
  buyer: z.string().min(1),
  productId: z.string().min(1),
  sellerId: z.string().min(1),
  timestamp: IsoDateSchema,
  amount: z.number().nonnegative(),
  currency: z.string().min(2),
  licenseIssued: z.string().min(1),
  status: z.string().min(1),
  governanceReviewRequired: z.boolean(),
  settlementMode: z.string().default('mock-only'),
  purchaseLifecycle: z.string().optional(),
  billingLifecycle: z.string().optional(),
  licenseLifecycle: z.string().optional(),
  treasuryDestination: z.string().optional(),
});

export const SubscriptionSchema = MarketplaceEntityBaseSchema.extend({
  productId: z.string().min(1),
  holder: z.string().min(1),
  plan: z.string().min(1),
  status: z.string().min(1),
  subscriptionLifecycle: z.string().min(1),
  billingLifecycle: z.string().min(1),
  licenseLifecycle: z.string().min(1),
  renewalCycle: z.string().min(1),
  nextReviewAt: IsoDateSchema,
  accessScope: z.string().min(1),
  treasuryDestination: z.string().min(1),
  governanceStanding: z.string().min(1),
});

export const BillingPreviewSchema = MarketplaceEntityBaseSchema.extend({
  orderId: z.string().min(1),
  productId: z.string().min(1),
  amount: z.number().nonnegative(),
  currency: z.string().min(2),
  protocolFeeBps: z.number().int().min(0).max(10000),
  protocolFee: z.number().nonnegative(),
  royaltyAmount: z.number().nonnegative(),
  sellerNet: z.number(),
  treasuryDestination: z.string().min(1),
  settlementEnabled: z.literal(false),
  status: z.string().min(1),
  blockedReasons: z.array(z.string()),
});

export const GovernanceValidationSchema = MarketplaceEntityBaseSchema.extend({
  productId: z.string().min(1),
  sellerId: z.string().min(1),
  tenantId: z.string().min(1),
  standing: z.string().min(1),
  productLifecycle: z.string().min(1),
  governanceLifecycle: z.string().min(1),
  requiredReviews: z.array(z.object({ id: z.string(), label: z.string(), status: z.string() })),
  blockers: z.array(z.string()),
  activationEnabled: z.boolean(),
  settlementAllowed: z.boolean(),
});

export const AuctionPreviewSchema = MarketplaceEntityBaseSchema.extend({
  productId: z.string().min(1),
  listingType: z.string().min(1),
  auctionEnabled: z.boolean(),
  bidEnabled: z.boolean(),
  minimumBid: z.number().nullable(),
  reservePrice: z.number().nullable(),
  highestBid: z.number().nullable(),
  bidCount: z.number().int().nonnegative(),
  settlementEnabled: z.literal(false),
});

export const BidPreviewSchema = MarketplaceEntityBaseSchema.extend({
  productId: z.string().min(1),
  bidder: z.string().min(1),
  amount: z.number().nonnegative(),
  currency: z.string().min(2),
  eligible: z.boolean(),
  minimumBid: z.number().nullable(),
  contractWriteEnabled: z.literal(false),
  status: z.string().min(1),
});

export const MarketplaceEntitlementSchema = MarketplaceEntityBaseSchema.extend({
  owner: z.string().min(1),
  ownedProducts: z.array(z.object({ productId: z.string(), licenseId: z.string().nullable(), source: z.string() })),
  activeLicenses: z.array(z.object({ licenseId: z.string(), productId: z.string(), lifecycle: z.string() })),
  subscriptions: z.array(z.object({ subscriptionId: z.string(), productId: z.string(), lifecycle: z.string(), accessScope: z.string() })),
  governanceRestrictions: z.array(z.object({ productId: z.string(), reason: z.string(), severity: z.string() })),
  deliveryPermissions: z.array(z.object({ productId: z.string(), deliveryType: z.string(), permissions: z.array(z.string()), signedUrlPreviewAvailable: z.boolean() })),
  nftOwnershipReadiness: z.array(z.object({ productId: z.string(), tokenStandard: z.string(), contractAddress: z.string().nullable(), tokenId: z.string().nullable(), ownershipValidationEnabled: z.literal(false) })),
});

export const ApiEnvelopeSchema = <T extends z.ZodTypeAny>(dataSchema: T) => z.object({
  data: dataSchema,
  meta: z.object({
    source: z.enum(['local-repository', 'mock-api']),
    mockOnly: z.literal(true),
    settlementEnabled: z.literal(false),
    generatedAt: IsoDateSchema,
  }),
});

export type MarketplaceProductDto = z.infer<typeof ProductSchema>;
export type MarketplaceSellerDto = z.infer<typeof SellerSchema>;
export type MarketplaceTenantDto = z.infer<typeof TenantSchema>;
export type MarketplaceLicenseDto = z.infer<typeof LicenseSchema>;
export type MarketplacePurchaseDto = z.infer<typeof PurchaseRecordSchema>;
export type MarketplaceSubscriptionDto = z.infer<typeof SubscriptionSchema>;
export type MarketplaceBillingPreviewDto = z.infer<typeof BillingPreviewSchema>;
export type MarketplaceGovernanceValidationDto = z.infer<typeof GovernanceValidationSchema>;
export type MarketplaceAuctionPreviewDto = z.infer<typeof AuctionPreviewSchema>;
export type MarketplaceBidPreviewDto = z.infer<typeof BidPreviewSchema>;
export type MarketplaceEntitlementDto = z.infer<typeof MarketplaceEntitlementSchema>;
