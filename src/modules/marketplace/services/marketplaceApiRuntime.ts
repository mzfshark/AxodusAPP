import {
  MarketplaceBidPreviewRequestSchema,
  MarketplaceBillingPreviewRequestSchema,
  MarketplaceEntitlementRequestSchema,
  MarketplaceListProductsRequestSchema,
  MarketplacePurchasePreviewRequestSchema,
  type MarketplaceBidPreviewRequest,
  type MarketplaceEntitlementRequest,
  type MarketplaceListProductsRequest,
  type MarketplacePurchasePreviewRequest,
} from '../contracts';
import { createMockMarketplaceRepositories, type MarketplaceRepositories } from '../repositories';
import {
  ApiEnvelopeSchema,
  BidPreviewSchema,
  PurchaseRecordSchema,
} from '../schemas';
import { AuctionService } from './boundaryAdapters';
import { buildMarketplaceEntitlementReadModel } from './entitlementService';
import { createNewMarketplaceRuntimeId, normalizeMarketplaceEntity } from '../utils/runtimeIds';

export type MarketplaceApiRuntimeMode = 'local-repository' | 'mock-api';

export interface MarketplaceApiRuntimeOptions {
  mode?: MarketplaceApiRuntimeMode;
  repositories?: MarketplaceRepositories;
}

function envelope<T>(data: T, source: MarketplaceApiRuntimeMode) {
  return {
    data,
    meta: {
      source,
      mockOnly: true as const,
      settlementEnabled: false as const,
      generatedAt: new Date().toISOString(),
    },
  };
}

export function createMarketplaceApiRuntime({
  mode = 'local-repository',
  repositories = createMockMarketplaceRepositories(),
}: MarketplaceApiRuntimeOptions = {}) {
  return {
    mode,
    repositories,
    async listProducts(input: MarketplaceListProductsRequest = {}) {
      const request = MarketplaceListProductsRequestSchema.parse(input);
      const data = await repositories.products.list(request);
      return ApiEnvelopeSchema(ProductArraySchema).parse(envelope(data, mode));
    },
    async listSellers() {
      return ApiEnvelopeSchema(SellerArraySchema).parse(envelope(await repositories.sellers.list(), mode));
    },
    async listTenants() {
      return ApiEnvelopeSchema(TenantArraySchema).parse(envelope(await repositories.tenants.list(), mode));
    },
    async listLicenses() {
      return ApiEnvelopeSchema(LicenseArraySchema).parse(envelope(await repositories.licenses.list(), mode));
    },
    async listPurchases(filters: { buyer?: string } = {}) {
      return ApiEnvelopeSchema(PurchaseArraySchema).parse(envelope(await repositories.purchases.list(filters), mode));
    },
    async listSubscriptions(filters: { holder?: string } = {}) {
      return ApiEnvelopeSchema(SubscriptionArraySchema).parse(envelope(await repositories.subscriptions.list(filters), mode));
    },
    async listGovernanceValidations(filters: { productId?: string } = {}) {
      return ApiEnvelopeSchema(GovernanceValidationArraySchema).parse(envelope(await repositories.governanceValidations.list(filters), mode));
    },
    async createPurchasePreview(input: MarketplacePurchasePreviewRequest) {
      const request = MarketplacePurchasePreviewRequestSchema.parse(input);
      const product = await repositories.products.getById(request.productId);
      if (!product) throw new Error(`Marketplace product not found: ${request.productId}`);
      const license = await repositories.licenses.getByType(product.licenseType);
      const blocked = product.governanceStatus === 'restricted' || product.governanceStatus === 'suspended';
      const data = PurchaseRecordSchema.parse(normalizeMarketplaceEntity('purchase', {
        id: createNewMarketplaceRuntimeId('purchase'),
        buyer: request.buyer,
        productId: product.id,
        sellerId: product.sellerId,
        timestamp: new Date().toISOString(),
        amount: product.pricing.amount,
        currency: request.currency ?? product.pricing.currency,
        licenseIssued: license?.id ?? 'license-preview-pending',
        status: blocked ? 'blocked' : 'preview-issued',
        governanceReviewRequired: product.governanceRequired,
        settlementMode: 'mock-only',
        purchaseLifecycle: blocked ? 'failed-mock' : 'preview-issued',
        billingLifecycle: 'invoice-preview',
        licenseLifecycle: blocked ? 'suspended' : 'preview',
        treasuryDestination: product.treasuryDestination,
      }));
      return ApiEnvelopeSchema(PurchaseRecordSchema).parse(envelope(data, mode));
    },
    async createBillingPreview(input: { orderId: string }) {
      const request = MarketplaceBillingPreviewRequestSchema.parse(input);
      const data = await repositories.billing.getPreviewByOrderId(request.orderId);
      if (!data) throw new Error(`Marketplace billing preview not found: ${request.orderId}`);
      return ApiEnvelopeSchema(BillingPreviewSingleSchema).parse(envelope(data, mode));
    },
    async createBidPreview(input: MarketplaceBidPreviewRequest) {
      const request = MarketplaceBidPreviewRequestSchema.parse(input);
      const product = await repositories.products.getById(request.productId);
      if (!product) throw new Error(`Marketplace product not found: ${request.productId}`);
      const minimumBid = AuctionService.minimumBid(product);
      const data = BidPreviewSchema.parse(normalizeMarketplaceEntity('bid', {
        id: createNewMarketplaceRuntimeId('bid'),
        productId: product.id,
        bidder: request.bidder,
        amount: request.amount,
        currency: request.currency,
        eligible: AuctionService.canBid(product) && request.amount >= (minimumBid ?? 0),
        minimumBid,
        contractWriteEnabled: false,
        status: 'preview-issued',
      }));
      return ApiEnvelopeSchema(BidPreviewSchema).parse(envelope(data, mode));
    },
    async getEntitlements(input: MarketplaceEntitlementRequest) {
      const request = MarketplaceEntitlementRequestSchema.parse(input);
      const data = await buildMarketplaceEntitlementReadModel({ owner: request.owner, repositories });
      return ApiEnvelopeSchema(EntitlementSingleSchema).parse(envelope(data, mode));
    },
  };
}

import { z } from 'zod';
import {
  BillingPreviewSchema,
  GovernanceValidationSchema,
  LicenseSchema,
  MarketplaceEntitlementSchema,
  ProductSchema,
  SellerSchema,
  SubscriptionSchema,
  TenantSchema,
} from '../schemas';

const ProductArraySchema = z.array(ProductSchema);
const SellerArraySchema = z.array(SellerSchema);
const TenantArraySchema = z.array(TenantSchema);
const LicenseArraySchema = z.array(LicenseSchema);
const PurchaseArraySchema = z.array(PurchaseRecordSchema);
const SubscriptionArraySchema = z.array(SubscriptionSchema);
const GovernanceValidationArraySchema = z.array(GovernanceValidationSchema);
const BillingPreviewSingleSchema = BillingPreviewSchema;
const EntitlementSingleSchema = MarketplaceEntitlementSchema;
