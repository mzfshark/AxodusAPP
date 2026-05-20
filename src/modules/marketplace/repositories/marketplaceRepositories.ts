import { marketplaceMock } from '@/data/mock';
import { GovernanceValidationService } from '../services/complianceServices';
import { BillingPreviewService } from '../services/operationalServices';
import {
  createMarketplaceRuntimeId,
  normalizeMarketplaceEntity,
} from '../utils/runtimeIds';
import {
  BillingPreviewSchema,
  GovernanceValidationSchema,
  LicenseSchema,
  ProductSchema,
  PurchaseRecordSchema,
  SellerSchema,
  SubscriptionSchema,
  TenantSchema,
  type MarketplaceBillingPreviewDto,
  type MarketplaceGovernanceValidationDto,
  type MarketplaceLicenseDto,
  type MarketplaceProductDto,
  type MarketplacePurchaseDto,
  type MarketplaceSellerDto,
  type MarketplaceSubscriptionDto,
  type MarketplaceTenantDto,
} from '../schemas';

export interface ProductRepository {
  list(filters?: Record<string, unknown>): Promise<MarketplaceProductDto[]>;
  getById(productId: string): Promise<MarketplaceProductDto | undefined>;
  getBySlug(slug: string): Promise<MarketplaceProductDto | undefined>;
}

export interface SellerRepository {
  list(): Promise<MarketplaceSellerDto[]>;
  getById(sellerId: string): Promise<MarketplaceSellerDto | undefined>;
}

export interface TenantRepository {
  list(): Promise<MarketplaceTenantDto[]>;
  getById(tenantId: string): Promise<MarketplaceTenantDto | undefined>;
}

export interface LicenseRepository {
  list(): Promise<MarketplaceLicenseDto[]>;
  getById(licenseId: string): Promise<MarketplaceLicenseDto | undefined>;
  getByType(type: string): Promise<MarketplaceLicenseDto | undefined>;
}

export interface PurchaseRepository {
  list(filters?: { buyer?: string }): Promise<MarketplacePurchaseDto[]>;
  getById(purchaseId: string): Promise<MarketplacePurchaseDto | undefined>;
}

export interface SubscriptionRepository {
  list(filters?: { holder?: string }): Promise<MarketplaceSubscriptionDto[]>;
  getById(subscriptionId: string): Promise<MarketplaceSubscriptionDto | undefined>;
}

export interface BillingRepository {
  listPreviews(): Promise<MarketplaceBillingPreviewDto[]>;
  getPreviewByOrderId(orderId: string): Promise<MarketplaceBillingPreviewDto | undefined>;
}

export interface GovernanceValidationRepository {
  list(filters?: { productId?: string }): Promise<MarketplaceGovernanceValidationDto[]>;
  getByProductId(productId: string): Promise<MarketplaceGovernanceValidationDto | undefined>;
}

export interface MarketplaceRepositories {
  products: ProductRepository;
  sellers: SellerRepository;
  tenants: TenantRepository;
  licenses: LicenseRepository;
  purchases: PurchaseRepository;
  subscriptions: SubscriptionRepository;
  billing: BillingRepository;
  governanceValidations: GovernanceValidationRepository;
}

function normalizeProducts(source = marketplaceMock.products) {
  return source.map((product) => ProductSchema.parse(normalizeMarketplaceEntity('product', product, product.id)));
}

function normalizeSellers(source = marketplaceMock.sellers) {
  return source.map((seller) => SellerSchema.parse(normalizeMarketplaceEntity('seller', seller, seller.id)));
}

function normalizeTenants(source = marketplaceMock.tenants) {
  return source.map((tenant) => TenantSchema.parse(normalizeMarketplaceEntity('tenant', tenant, tenant.id)));
}

function normalizeLicenses(source = marketplaceMock.licenses) {
  return source.map((license) => LicenseSchema.parse(normalizeMarketplaceEntity('license', license, license.id)));
}

function normalizePurchases(source = marketplaceMock.orders) {
  return source.map((order) => {
    const product = marketplaceMock.products.find((item) => item.id === order.productId);
    return PurchaseRecordSchema.parse(normalizeMarketplaceEntity('purchase', {
      ...order,
      timestamp: order.timestamp ?? order.createdAt,
      sellerId: order.sellerId ?? product?.sellerId ?? 'unknown-seller',
    }, order.id));
  });
}

function normalizeSubscriptions(source = marketplaceMock.subscriptions) {
  return source.map((subscription) => SubscriptionSchema.parse(normalizeMarketplaceEntity('subscription', subscription, subscription.id)));
}

function normalizeBillingPreviews() {
  return marketplaceMock.orders.map((order) => {
    const preview = BillingPreviewService.getOrderSettlementPreview(order);
    return BillingPreviewSchema.parse(normalizeMarketplaceEntity('billing', {
      id: `billing-preview-${order.id}`,
      orderId: order.id,
      productId: order.productId,
      amount: preview.amount,
      currency: preview.currency,
      protocolFeeBps: preview.protocolFeeBps,
      protocolFee: preview.protocolFee,
      royaltyAmount: preview.royaltyAmount,
      sellerNet: preview.sellerNet,
      treasuryDestination: preview.treasuryDestination,
      settlementEnabled: false,
      status: preview.status,
      blockedReasons: preview.blockedReasons,
    }, `billing-preview-${order.id}`));
  });
}

function normalizeGovernanceValidations() {
  return marketplaceMock.products.map((product) => {
    const validation = GovernanceValidationService.getProductValidation(product);
    return GovernanceValidationSchema.parse(normalizeMarketplaceEntity('governance-validation', {
      id: `governance-validation-${product.id}`,
      productId: product.id,
      sellerId: product.sellerId,
      tenantId: product.tenantId,
      standing: validation.standing,
      productLifecycle: validation.productLifecycle,
      governanceLifecycle: validation.governanceLifecycle,
      requiredReviews: validation.requiredReviews,
      blockers: validation.blockers,
      activationEnabled: validation.activationEnabled,
      settlementAllowed: validation.settlementAllowed,
    }, `governance-validation-${product.id}`));
  });
}

function applyProductFilters(products: MarketplaceProductDto[], filters: Record<string, unknown> = {}) {
  const normalize = (value: unknown) => String(value ?? '').toLowerCase();
  return products.filter((product) => {
    const query = !filters.query || normalize(`${product.title} ${product.shortDescription} ${product.category} ${product.tags.join(' ')}`).includes(normalize(filters.query));
    const category = !filters.category || product.category === filters.category;
    const governance = !filters.governanceStatus || product.governanceStatus === filters.governanceStatus;
    const chain = !filters.chain || product.supportedChains.includes(String(filters.chain));
    const listing = !filters.listingType || product.listingType === filters.listingType;
    const risk = !filters.operationalRisk || product.operationalRisk === filters.operationalRisk;
    const acs = !filters.acsValidationState || product.acsValidationState === filters.acsValidationState;
    return query && category && governance && chain && listing && risk && acs;
  });
}

class MockProductRepository implements ProductRepository {
  constructor(private readonly products = normalizeProducts()) {}
  async list(filters: Record<string, unknown> = {}) {
    return applyProductFilters(this.products, filters);
  }
  async getById(productId: string) {
    return this.products.find((product) => product.id === productId || product.runtimeId === productId);
  }
  async getBySlug(slug: string) {
    return this.products.find((product) => product.slug === slug);
  }
}

class MockSellerRepository implements SellerRepository {
  constructor(private readonly sellers = normalizeSellers()) {}
  async list() { return this.sellers; }
  async getById(sellerId: string) { return this.sellers.find((seller) => seller.id === sellerId || seller.runtimeId === sellerId); }
}

class MockTenantRepository implements TenantRepository {
  constructor(private readonly tenants = normalizeTenants()) {}
  async list() { return this.tenants; }
  async getById(tenantId: string) { return this.tenants.find((tenant) => tenant.id === tenantId || tenant.runtimeId === tenantId); }
}

class MockLicenseRepository implements LicenseRepository {
  constructor(private readonly licenses = normalizeLicenses()) {}
  async list() { return this.licenses; }
  async getById(licenseId: string) { return this.licenses.find((license) => license.id === licenseId || license.runtimeId === licenseId); }
  async getByType(type: string) { return this.licenses.find((license) => license.type === type); }
}

class MockPurchaseRepository implements PurchaseRepository {
  constructor(private readonly purchases = normalizePurchases()) {}
  async list(filters: { buyer?: string } = {}) {
    return filters.buyer ? this.purchases.filter((purchase) => purchase.buyer === filters.buyer) : this.purchases;
  }
  async getById(purchaseId: string) {
    return this.purchases.find((purchase) => purchase.id === purchaseId || purchase.runtimeId === purchaseId);
  }
}

class MockSubscriptionRepository implements SubscriptionRepository {
  constructor(private readonly subscriptions = normalizeSubscriptions()) {}
  async list(filters: { holder?: string } = {}) {
    return filters.holder ? this.subscriptions.filter((subscription) => subscription.holder === filters.holder) : this.subscriptions;
  }
  async getById(subscriptionId: string) {
    return this.subscriptions.find((subscription) => subscription.id === subscriptionId || subscription.runtimeId === subscriptionId);
  }
}

class MockBillingRepository implements BillingRepository {
  constructor(private readonly previews = normalizeBillingPreviews()) {}
  async listPreviews() { return this.previews; }
  async getPreviewByOrderId(orderId: string) { return this.previews.find((preview) => preview.orderId === orderId); }
}

class MockGovernanceValidationRepository implements GovernanceValidationRepository {
  constructor(private readonly validations = normalizeGovernanceValidations()) {}
  async list(filters: { productId?: string } = {}) {
    return filters.productId ? this.validations.filter((validation) => validation.productId === filters.productId) : this.validations;
  }
  async getByProductId(productId: string) {
    return this.validations.find((validation) => validation.productId === productId);
  }
}

export function createMockMarketplaceRepositories(): MarketplaceRepositories {
  return {
    products: new MockProductRepository(),
    sellers: new MockSellerRepository(),
    tenants: new MockTenantRepository(),
    licenses: new MockLicenseRepository(),
    purchases: new MockPurchaseRepository(),
    subscriptions: new MockSubscriptionRepository(),
    billing: new MockBillingRepository(),
    governanceValidations: new MockGovernanceValidationRepository(),
  };
}

export function createMockMarketplaceRuntimeSnapshot() {
  return {
    ...marketplaceMock,
    tenants: normalizeTenants(),
    sellers: normalizeSellers(),
    licenses: normalizeLicenses(),
    products: normalizeProducts(),
    orders: normalizePurchases(),
    subscriptions: normalizeSubscriptions(),
  };
}

export function getRepositoryRuntimeRef(kind: Parameters<typeof createMarketplaceRuntimeId>[0], sourceId: string) {
  return createMarketplaceRuntimeId(kind, sourceId);
}
