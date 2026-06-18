import { marketplaceMock } from '@/data/mock';
import { getMarketplaceSeller, getMarketplaceTenant } from './marketplaceService';

export type MarketplaceRestrictionState = 'clear' | 'warning' | 'restricted' | 'suspended' | 'sanctioned';
export type MarketplaceOperationalApprovalState = 'approved' | 'review-required' | 'blocked' | 'federation-warning';
export type MarketplaceFederationTier = 'root-dao' | 'federated-dao' | 'working-group' | 'external-review';

interface GovernanceProductLike {
  id: string;
  sellerId: string;
  tenantId?: string;
  daoOwner?: string;
  constitutionalStanding?: string;
  governanceStatus?: string;
  validationStatus?: string;
  operationalRisk?: string;
  acsValidationState?: string;
  visibility?: string;
}

export function getMarketplaceGovernanceRuntime(product: GovernanceProductLike) {
  const seller = getMarketplaceSeller(product.sellerId);
  const tenant = getMarketplaceTenant(product.tenantId ?? seller?.tenantId);
  const restrictionState = resolveRestrictionState(product, seller, tenant);
  const warnings = getGovernanceWarnings(product, seller, tenant);
  const sanctions = getGovernanceSanctions(product, seller, tenant);
  const operationalApprovalState = resolveOperationalApprovalState({ restrictionState, warnings, product, seller, tenant });

  return {
    service: 'MarketplaceGovernanceRuntime',
    mode: 'mock-read-model',
    productId: product.id,
    sellerId: seller?.id ?? null,
    tenantId: tenant?.id ?? null,
    constitutionalStanding: product.constitutionalStanding ?? tenant?.constitutionalStanding ?? 'requires-review',
    restrictionState,
    sanctions,
    warnings,
    federationTier: resolveFederationTier(tenant),
    governanceAuthority: tenant?.reviewAuthority ?? 'Marketplace Governance Review',
    daoOwnership: {
      daoOwner: product.daoOwner ?? tenant?.name ?? 'unassigned DAO',
      tenantName: tenant?.name ?? 'unassigned tenant',
      tenantType: tenant?.type ?? 'unassigned',
      treasuryDestination: tenant?.treasuryDestination ?? 'pending treasury route',
    },
    operationalApprovalState,
    activationEnabled: false,
    settlementAllowed: false,
    reviewOnly: true,
    reasonCodes: [
      ...warnings,
      ...sanctions,
      'mock-governance-read-model',
      'no-governance-execution',
      'no-settlement',
    ],
  };
}

export function getMarketplaceSellerGovernanceRuntime(sellerId: string) {
  const seller = getMarketplaceSeller(sellerId);
  const tenant = getMarketplaceTenant(seller?.tenantId);
  const products = marketplaceMock.products.filter((product) => product.sellerId === sellerId);
  const restrictedProducts = products.filter((product) => ['restricted', 'suspended'].includes(product.governanceStatus));
  const warningProducts = products.filter((product) => product.governanceStatus === 'under-review' || product.operationalRisk !== 'low');

  return {
    service: 'MarketplaceSellerGovernanceRuntime',
    mode: 'mock-read-model',
    sellerId,
    sellerName: seller?.name ?? 'Unknown seller',
    tenantId: tenant?.id ?? null,
    tenantName: tenant?.name ?? 'Unassigned tenant',
    governanceStanding: seller?.governanceStanding ?? 'restricted',
    verificationStatus: seller?.verificationStatus ?? 'unknown',
    federationTier: resolveFederationTier(tenant),
    warnings: [
      seller?.governanceStanding !== 'verified' ? `seller-${seller?.governanceStanding ?? 'unknown'}` : null,
      seller?.treasuryLinked ? null : 'seller-treasury-not-linked',
      warningProducts.length ? 'seller-products-under-review' : null,
    ].filter(Boolean) as string[],
    sanctions: [
      seller?.governanceStanding === 'sanctioned' ? 'seller-sanctioned' : null,
      seller?.governanceStanding === 'suspended' ? 'seller-suspended' : null,
      restrictedProducts.length ? 'seller-has-restricted-products' : null,
    ].filter(Boolean) as string[],
    productsPublished: products.length,
    restrictedProducts: restrictedProducts.length,
    reviewOnly: true,
  };
}

export function getMarketplaceGovernanceRuntimeSummary() {
  const productRuntimes = marketplaceMock.products.map((product) => getMarketplaceGovernanceRuntime(product));
  const sellerRuntimes = marketplaceMock.sellers.map((seller) => getMarketplaceSellerGovernanceRuntime(seller.id));

  return {
    service: 'MarketplaceGovernanceRuntimeSummary',
    mode: 'mock-read-model',
    productRuntimes,
    sellerRuntimes,
    restrictedProducts: productRuntimes.filter((runtime) => runtime.restrictionState === 'restricted').length,
    warningProducts: productRuntimes.filter((runtime) => runtime.restrictionState === 'warning').length,
    sanctionedSellers: sellerRuntimes.filter((runtime) => runtime.sanctions.length > 0).length,
    constitutionalAlerts: productRuntimes.filter((runtime) => runtime.constitutionalStanding !== 'aligned').length,
    federationWarnings: productRuntimes.filter((runtime) => runtime.operationalApprovalState === 'federation-warning').length,
    governanceAuthorities: [...new Set(productRuntimes.map((runtime) => runtime.governanceAuthority))],
    executionEnabled: false,
  };
}

export function resolveFederationTier(tenant?: { type?: string } | null): MarketplaceFederationTier {
  if (tenant?.type === 'constitutional-root') return 'root-dao';
  if (tenant?.type === 'federated-dao') return 'federated-dao';
  if (tenant?.type === 'working-group') return 'working-group';
  return 'external-review';
}

function resolveRestrictionState(product: GovernanceProductLike, seller?: { governanceStanding?: string } | null, tenant?: { governanceStanding?: string } | null): MarketplaceRestrictionState {
  if (product.governanceStatus === 'suspended' || seller?.governanceStanding === 'suspended') return 'suspended';
  if (seller?.governanceStanding === 'sanctioned') return 'sanctioned';
  if (product.governanceStatus === 'restricted' || product.validationStatus === 'restricted' || tenant?.governanceStanding === 'restricted') return 'restricted';
  if (product.governanceStatus === 'under-review' || product.operationalRisk !== 'low' || seller?.governanceStanding === 'warning' || tenant?.governanceStanding === 'warning') return 'warning';
  return 'clear';
}

function resolveOperationalApprovalState({
  restrictionState,
  warnings,
  product,
  seller,
  tenant,
}: {
  restrictionState: MarketplaceRestrictionState;
  warnings: string[];
  product: GovernanceProductLike;
  seller?: { governanceStanding?: string; treasuryLinked?: boolean } | null;
  tenant?: { governanceStanding?: string } | null;
}): MarketplaceOperationalApprovalState {
  if (['restricted', 'suspended', 'sanctioned'].includes(restrictionState)) return 'blocked';
  if (tenant?.governanceStanding !== 'verified' || seller?.governanceStanding !== 'verified') return 'federation-warning';
  if (warnings.length || product.acsValidationState !== 'validated' || !seller?.treasuryLinked) return 'review-required';
  return 'approved';
}

function getGovernanceWarnings(product: GovernanceProductLike, seller?: { governanceStanding?: string; treasuryLinked?: boolean } | null, tenant?: { governanceStanding?: string; constitutionalStanding?: string } | null) {
  return [
    product.constitutionalStanding && product.constitutionalStanding !== 'aligned' ? `constitutional-${product.constitutionalStanding}` : null,
    tenant?.constitutionalStanding && tenant.constitutionalStanding !== 'aligned' ? `tenant-constitutional-${tenant.constitutionalStanding}` : null,
    product.governanceStatus === 'under-review' ? 'product-under-review' : null,
    product.operationalRisk && product.operationalRisk !== 'low' ? `risk-${product.operationalRisk}` : null,
    product.acsValidationState && product.acsValidationState !== 'validated' ? `acs-${product.acsValidationState}` : null,
    seller?.governanceStanding && seller.governanceStanding !== 'verified' ? `seller-${seller.governanceStanding}` : null,
    tenant?.governanceStanding && tenant.governanceStanding !== 'verified' ? `tenant-${tenant.governanceStanding}` : null,
    seller?.treasuryLinked ? null : 'seller-treasury-not-linked',
  ].filter(Boolean) as string[];
}

function getGovernanceSanctions(product: GovernanceProductLike, seller?: { governanceStanding?: string } | null, tenant?: { governanceStanding?: string } | null) {
  return [
    product.governanceStatus === 'restricted' ? 'product-restricted' : null,
    product.governanceStatus === 'suspended' ? 'product-suspended' : null,
    product.validationStatus === 'restricted' ? 'validation-restricted' : null,
    seller?.governanceStanding === 'sanctioned' ? 'seller-sanctioned' : null,
    seller?.governanceStanding === 'suspended' ? 'seller-suspended' : null,
    tenant?.governanceStanding === 'restricted' ? 'tenant-restricted' : null,
  ].filter(Boolean) as string[];
}
