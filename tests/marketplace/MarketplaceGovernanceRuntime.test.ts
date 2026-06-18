import { describe, expect, test } from 'vitest';
import { marketplaceMock } from '../../src/data/mock';
import {
  getMarketplaceGovernanceRuntime,
  getMarketplaceGovernanceRuntimeSummary,
  getMarketplaceSellerGovernanceRuntime,
} from '../../src/modules/marketplace/services/governanceRuntime';

describe('Marketplace governance runtime', () => {
  test('builds governance-ready product read models with constitutional and DAO authority state', () => {
    const product = marketplaceMock.products.find((item) => item.governanceStatus === 'restricted')!;
    const runtime = getMarketplaceGovernanceRuntime(product);

    expect(runtime.service).toBe('MarketplaceGovernanceRuntime');
    expect(runtime.mode).toBe('mock-read-model');
    expect(runtime.restrictionState).toBe('restricted');
    expect(runtime.constitutionalStanding).toBe('requires-review');
    expect(runtime.governanceAuthority).toBe('ACS Plugin Audit');
    expect(runtime.daoOwnership.daoOwner).toBe('MCP Working Group');
    expect(runtime.operationalApprovalState).toBe('blocked');
    expect(runtime.sanctions).toEqual(expect.arrayContaining(['product-restricted', 'validation-restricted']));
    expect(runtime.settlementAllowed).toBe(false);
  });

  test('summarizes seller warnings and federation alerts without execution', () => {
    const sellerRuntime = getMarketplaceSellerGovernanceRuntime('seller-mcp-labs');
    const summary = getMarketplaceGovernanceRuntimeSummary();

    expect(sellerRuntime.federationTier).toBe('working-group');
    expect(sellerRuntime.warnings).toEqual(expect.arrayContaining(['seller-warning', 'seller-treasury-not-linked']));
    expect(sellerRuntime.sanctions).toEqual(expect.arrayContaining(['seller-has-restricted-products']));
    expect(summary.constitutionalAlerts).toBeGreaterThan(0);
    expect(summary.executionEnabled).toBe(false);
  });
});
