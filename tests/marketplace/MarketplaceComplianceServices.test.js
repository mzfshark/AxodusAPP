import { describe, expect, test } from 'vitest';
import { marketplaceMock } from '../../src/data/mock';
import {
  GovernanceValidationService,
  LicenseComplianceService,
} from '../../src/modules/marketplace/services/complianceServices';

describe('Marketplace compliance services', () => {
  test('builds governance validation gates without enabling activation', () => {
    const restrictedProduct = marketplaceMock.products.find((product) => product.governanceStatus === 'restricted');
    const validation = GovernanceValidationService.getProductValidation(restrictedProduct);

    expect(validation.service).toBe('GovernanceValidationService');
    expect(validation.activationEnabled).toBe(false);
    expect(validation.settlementAllowed).toBe(false);
    expect(validation.blockers).toEqual(expect.arrayContaining(['product-restricted', 'plugin-audit-required']));
    expect(validation.requiredReviews.map((review) => review.label)).toEqual(
      expect.arrayContaining(['Constitutional review', 'Treasury review', 'ACS metadata review', 'Plugin compatibility review']),
    );
  });

  test('summarizes governance queue with review and blocked counts', () => {
    const summary = GovernanceValidationService.getValidationSummary();

    expect(summary.validations).toHaveLength(marketplaceMock.products.length);
    expect(summary.reviewRequired).toBeGreaterThan(0);
    expect(summary.blockedProducts).toBeGreaterThan(0);
    expect(summary.requiredReviewCount).toBeGreaterThan(0);
  });

  test('flags license/product conflicts while keeping ownership checks mock-only', () => {
    const daoLicense = marketplaceMock.licenses.find((license) => license.type === 'DAO License');
    const readiness = LicenseComplianceService.getLicenseReadiness(daoLicense);

    expect(readiness.service).toBe('LicenseComplianceService');
    expect(readiness.ownershipCheckEnabled).toBe(false);
    expect(readiness.revocationExecutionEnabled).toBe(false);
    expect(readiness.status).toBe('review-required');
    expect(readiness.blockers).toEqual(expect.arrayContaining(['restricted-product-attached']));
  });

  test('maps products to their license readiness matrix', () => {
    const product = marketplaceMock.products.find((item) => item.licenseType === 'NFT Access License');
    const matrix = LicenseComplianceService.getProductLicenseMatrix(product.id);

    expect(matrix.product.id).toBe(product.id);
    expect(matrix.license.type).toBe(product.licenseType);
    expect(matrix.readiness.licenseId).toBe(matrix.license.id);
  });
});
