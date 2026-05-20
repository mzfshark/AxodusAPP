import { marketplaceMock } from '@/data/mock';
import { getMarketplaceLicenseForProduct, getMarketplaceProductById, getMarketplaceSeller } from './marketplaceService';
import {
  GovernanceValidationLifecycle,
  ProductLifecycle,
  buildLifecycleTimeline,
  getGovernanceLifecycle,
  getProductLifecycle,
} from '../utils/stateMachines';

const reviewLabels = {
  constitutional: 'Constitutional review',
  treasury: 'Treasury review',
  risk: 'Risk review',
  acs: 'ACS metadata review',
  plugin: 'Plugin compatibility review',
  dao: 'DAO approval',
  license: 'License conflict review',
};

function compact(values) {
  return values.filter(Boolean);
}

export const GovernanceValidationService = {
  getProductValidation(product) {
    const seller = getMarketplaceSeller(product.sellerId);
    const requiredReviews = compact([
      product.governanceRequired ? 'constitutional' : null,
      product.treasuryDestination ? 'treasury' : null,
      product.operationalRisk !== 'low' ? 'risk' : null,
      product.acsValidationState !== 'validated' ? 'acs' : null,
      product.acsValidationState === 'plugin-audit-required' ? 'plugin' : null,
      product.visibility === 'dao-gated' ? 'dao' : null,
      product.licenseType ? 'license' : null,
    ]);
    const blockers = compact([
      product.governanceStatus === 'restricted' ? 'product-restricted' : null,
      product.governanceStatus === 'suspended' ? 'product-suspended' : null,
      product.acsValidationState === 'plugin-audit-required' ? 'plugin-audit-required' : null,
      product.operationalRisk === 'high' ? 'high-operational-risk' : null,
      seller?.governanceStanding !== 'verified' ? `seller-${seller?.governanceStanding}` : null,
      seller?.treasuryLinked ? null : 'seller-treasury-not-linked',
    ]);

    return {
      service: 'GovernanceValidationService',
      productId: product.id,
      seller,
      productLifecycle: getProductLifecycle(product),
      productTimeline: buildLifecycleTimeline(Object.values(ProductLifecycle), getProductLifecycle(product)),
      governanceLifecycle: getGovernanceLifecycle(product),
      governanceTimeline: buildLifecycleTimeline(Object.values(GovernanceValidationLifecycle), getGovernanceLifecycle(product)),
      standing: blockers.length ? 'review-required' : product.governanceStatus,
      activationEnabled: false,
      settlementAllowed: blockers.length === 0 && product.governanceStatus === 'compliant',
      requiredReviews: requiredReviews.map((review) => ({
        id: `${product.id}-${review}`,
        label: reviewLabels[review],
        status: blockers.length ? 'pending-validation' : 'review-ready',
      })),
      blockers,
    };
  },

  getValidationSummary() {
    const validations = marketplaceMock.products.map((product) => GovernanceValidationService.getProductValidation(product));
    return {
      validations,
      reviewRequired: validations.filter((validation) => validation.blockers.length > 0 || validation.requiredReviews.length > 0).length,
      blockedProducts: validations.filter((validation) => validation.blockers.length > 0).length,
      settlementReady: validations.filter((validation) => validation.settlementAllowed).length,
      requiredReviewCount: validations.reduce((sum, validation) => sum + validation.requiredReviews.length, 0),
    };
  },
};

export const LicenseComplianceService = {
  getLicenseReadiness(license) {
    const attachedProducts = marketplaceMock.products.filter((product) => product.licenseType === license.type);
    const blockers = compact([
      license.revokable && !license.governanceControlled ? 'revocation-not-governed' : null,
      license.nftBound && !attachedProducts.some((product) => product.nftBound) ? 'nft-bound-without-product' : null,
      attachedProducts.some((product) => product.governanceStatus === 'restricted') ? 'restricted-product-attached' : null,
    ]);

    return {
      service: 'LicenseComplianceService',
      licenseId: license.id,
      attachedProducts,
      status: blockers.length ? 'review-required' : 'mock-clear',
      ownershipCheckEnabled: false,
      revocationExecutionEnabled: false,
      transferPreviewEnabled: Boolean(license.transferable),
      permissionCount: license.permissions.length,
      blockers,
    };
  },

  getProductLicenseMatrix(productId) {
    const product = getMarketplaceProductById(productId);
    const license = getMarketplaceLicenseForProduct(product);
    return {
      product,
      license,
      readiness: LicenseComplianceService.getLicenseReadiness(license),
    };
  },
};
