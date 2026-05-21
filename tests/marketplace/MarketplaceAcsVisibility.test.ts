import { describe, expect, test } from 'vitest';
import { marketplaceMock } from '../../src/data/mock';
import {
  getAcsMarketplacePackage,
  getAcsMarketplaceSummary,
} from '../../src/modules/marketplace/services/acsMarketplaceLayer';

describe('Marketplace ACS visibility', () => {
  test('exposes MCP runtime packages without provisioning execution', () => {
    const product = marketplaceMock.products.find((item) => item.category === 'MCPs')!;
    const acsPackage = getAcsMarketplacePackage(product);

    expect(acsPackage.service).toBe('AcsMarketplaceLayer');
    expect(acsPackage.packageType).toBe('MCP service');
    expect(acsPackage.acsVisibility).toBe('marketplace-visible');
    expect(acsPackage.provisioningStatus).toBe('blocked');
    expect(acsPackage.provisioningEnabled).toBe(false);
    expect(acsPackage.runtimeExecutionEnabled).toBe(false);
    expect(acsPackage.reviewQueue).toEqual(expect.arrayContaining(['acs-provisioning-review', 'governance-or-plugin-restriction']));
  });

  test('summarizes ACS package categories and review queues', () => {
    const summary = getAcsMarketplaceSummary();

    expect(summary.visiblePackages).toBeGreaterThan(0);
    expect(summary.mcpServices).toBeGreaterThan(0);
    expect(summary.provisioningReviewRequired).toBeGreaterThan(0);
    expect(summary.provisioningBlocked).toBeGreaterThan(0);
    expect(summary.provisioningEnabled).toBe(false);
  });
});
