import { marketplaceMock } from '@/data/mock';
import { getMarketplaceGovernanceRuntime, resolveFederationTier } from './governanceRuntime';

export function getTenantFederationReadModel(tenantId: string) {
  const tenant = marketplaceMock.tenants.find((item) => item.id === tenantId);
  const sellers = marketplaceMock.sellers.filter((seller) => seller.tenantId === tenantId);
  const products = marketplaceMock.products.filter((product) => product.tenantId === tenantId || sellers.some((seller) => seller.id === product.sellerId));
  const governanceRuntimes = products.map((product) => getMarketplaceGovernanceRuntime(product));
  const restrictedProducts = governanceRuntimes.filter((runtime) => runtime.restrictionState === 'restricted' || runtime.restrictionState === 'suspended');
  const reviewProducts = governanceRuntimes.filter((runtime) => runtime.operationalApprovalState !== 'approved');
  const acsPackages = products.filter((product) => product.category === 'MCPs' || product.deliveryType === 'MCP Runtime' || product.tags?.some((tag) => ['mcp', 'agent', 'runtime'].includes(tag)));

  return {
    service: 'TenantFederationReadModel',
    mode: 'mock-read-model',
    tenantId,
    tenantName: tenant?.name ?? 'Unknown tenant',
    tenantType: tenant?.type ?? 'external-review',
    federationTier: resolveFederationTier(tenant),
    governanceStanding: tenant?.governanceStanding ?? 'restricted',
    constitutionalStanding: tenant?.constitutionalStanding ?? 'requires-review',
    governanceAuthority: tenant?.reviewAuthority ?? 'Marketplace Governance Review',
    treasuryDestination: tenant?.treasuryDestination ?? 'pending treasury route',
    isolationBoundary: `marketplace.tenant.${tenantId}`,
    storefrontReadiness: restrictedProducts.length ? 'restricted' : reviewProducts.length ? 'review-required' : 'ready-boundary',
    daoStorefrontEnabled: false,
    products,
    sellers,
    governanceRuntimes,
    ownershipHierarchy: {
      tenant: tenant?.name ?? 'Unknown tenant',
      reviewAuthority: tenant?.reviewAuthority ?? 'Marketplace Governance Review',
      daoOwners: [...new Set(products.map((product) => product.daoOwner).filter(Boolean))],
      sellerIds: sellers.map((seller) => seller.id),
      productIds: products.map((product) => product.id),
    },
    metrics: {
      productCount: products.length,
      sellerCount: sellers.length,
      restrictedProducts: restrictedProducts.length,
      reviewProducts: reviewProducts.length,
      acsPackageCount: acsPackages.length,
      publicProducts: products.filter((product) => product.visibility === 'public').length,
      daoGatedProducts: products.filter((product) => product.visibility === 'dao-gated').length,
    },
    warnings: [
      tenant?.governanceStanding !== 'verified' ? `tenant-${tenant?.governanceStanding ?? 'unknown'}` : null,
      tenant?.constitutionalStanding !== 'aligned' ? `constitutional-${tenant?.constitutionalStanding ?? 'unknown'}` : null,
      restrictedProducts.length ? 'tenant-has-restricted-products' : null,
      reviewProducts.length ? 'tenant-review-queue-active' : null,
    ].filter(Boolean) as string[],
  };
}

export function getTenantFederationDashboard() {
  const tenants = marketplaceMock.tenants.map((tenant) => getTenantFederationReadModel(tenant.id));
  return {
    service: 'TenantFederationDashboard',
    mode: 'mock-read-model',
    tenants,
    tenantCount: tenants.length,
    rootDaos: tenants.filter((tenant) => tenant.federationTier === 'root-dao').length,
    federatedDaos: tenants.filter((tenant) => tenant.federationTier === 'federated-dao').length,
    workingGroups: tenants.filter((tenant) => tenant.federationTier === 'working-group').length,
    storefrontsReady: tenants.filter((tenant) => tenant.storefrontReadiness === 'ready-boundary').length,
    storefrontsInReview: tenants.filter((tenant) => tenant.storefrontReadiness !== 'ready-boundary').length,
    constitutionalAlerts: tenants.reduce((sum, tenant) => sum + (tenant.constitutionalStanding === 'aligned' ? 0 : 1), 0),
    restrictedTenants: tenants.filter((tenant) => tenant.governanceStanding === 'restricted' || tenant.storefrontReadiness === 'restricted').length,
    tenantScopedProducts: tenants.reduce((sum, tenant) => sum + tenant.metrics.productCount, 0),
    isolatedRenderingPrepared: true,
    daoStorefrontExecutionEnabled: false,
  };
}

export function getTenantScopedProducts(tenantId: string) {
  return getTenantFederationReadModel(tenantId).products;
}
