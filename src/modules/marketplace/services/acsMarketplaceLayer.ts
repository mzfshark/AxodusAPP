import { marketplaceMock } from '@/data/mock';

export type AcsMarketplacePackageType =
  | 'MCP service'
  | 'orchestration package'
  | 'AI agent'
  | 'compute access'
  | 'ACS runtime package'
  | 'non-ACS asset';

interface AcsProductLike {
  id: string;
  title?: string;
  category?: string;
  subcategory?: string;
  tags?: string[];
  deliveryType?: string;
  acsValidationState?: string;
  governanceStatus?: string;
  operationalRisk?: string;
  tenantId?: string;
}

export function getAcsMarketplacePackage(product: AcsProductLike) {
  const packageType = resolveAcsPackageType(product);
  const requiresProvisioningReview = packageType !== 'non-ACS asset' || product.acsValidationState !== 'validated';
  const restricted = product.governanceStatus === 'restricted' || product.acsValidationState === 'plugin-audit-required';

  return {
    service: 'AcsMarketplaceLayer',
    mode: 'mock-read-model',
    productId: product.id,
    title: product.title ?? product.id,
    tenantId: product.tenantId ?? null,
    packageType,
    acsVisibility: packageType === 'non-ACS asset' ? 'contextual-review' : 'marketplace-visible',
    provisioningStatus: restricted ? 'blocked' : requiresProvisioningReview ? 'review-required' : 'ready-boundary',
    provisioningEnabled: false,
    runtimeExecutionEnabled: false,
    computeAllocationEnabled: false,
    reviewQueue: [
      requiresProvisioningReview ? 'acs-provisioning-review' : null,
      product.acsValidationState !== 'validated' ? `acs-${product.acsValidationState}` : null,
      product.operationalRisk && product.operationalRisk !== 'low' ? `risk-${product.operationalRisk}` : null,
      restricted ? 'governance-or-plugin-restriction' : null,
    ].filter(Boolean) as string[],
    capabilities: resolveAcsCapabilities(product, packageType),
    disclaimer: 'ACS visibility is preview-only. No runtime provisioning, agent deployment, or compute allocation is executed.',
  };
}

export function getAcsMarketplaceSummary(products: AcsProductLike[] = marketplaceMock.products) {
  const packages = products.map((product) => getAcsMarketplacePackage(product));
  return {
    service: 'AcsMarketplaceSummary',
    mode: 'mock-read-model',
    packages,
    visiblePackages: packages.filter((pkg) => pkg.acsVisibility === 'marketplace-visible').length,
    mcpServices: packages.filter((pkg) => pkg.packageType === 'MCP service').length,
    orchestrationPackages: packages.filter((pkg) => pkg.packageType === 'orchestration package').length,
    aiAgents: packages.filter((pkg) => pkg.packageType === 'AI agent').length,
    computeAccess: packages.filter((pkg) => pkg.packageType === 'compute access').length,
    runtimePackages: packages.filter((pkg) => pkg.packageType === 'ACS runtime package').length,
    provisioningReviewRequired: packages.filter((pkg) => pkg.provisioningStatus === 'review-required').length,
    provisioningBlocked: packages.filter((pkg) => pkg.provisioningStatus === 'blocked').length,
    provisioningEnabled: false,
  };
}

function resolveAcsPackageType(product: AcsProductLike): AcsMarketplacePackageType {
  const text = `${product.category ?? ''} ${product.subcategory ?? ''} ${product.deliveryType ?? ''} ${(product.tags ?? []).join(' ')}`.toLowerCase();
  if (text.includes('mcp')) return 'MCP service';
  if (text.includes('orchestration') || text.includes('workflow')) return 'orchestration package';
  if (text.includes('agent')) return 'AI agent';
  if (text.includes('compute') || text.includes('runtime')) return 'compute access';
  if (product.acsValidationState && product.acsValidationState !== 'validated') return 'ACS runtime package';
  return 'non-ACS asset';
}

function resolveAcsCapabilities(product: AcsProductLike, packageType: AcsMarketplacePackageType) {
  if (packageType === 'non-ACS asset') return ['metadata-review'];
  return [
    packageType === 'MCP service' ? 'mcp-runtime-access' : null,
    packageType === 'AI agent' ? 'agent-template-distribution' : null,
    packageType === 'compute access' ? 'compute-access-preview' : null,
    packageType === 'orchestration package' ? 'workflow-pack-preview' : null,
    'metadata-review',
    product.acsValidationState === 'plugin-audit-required' ? 'plugin-security-review' : null,
    'provisioning-preview',
  ].filter(Boolean) as string[];
}
