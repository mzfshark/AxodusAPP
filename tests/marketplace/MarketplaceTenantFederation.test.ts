import { describe, expect, test } from 'vitest';
import {
  getTenantFederationDashboard,
  getTenantFederationReadModel,
  getTenantScopedProducts,
} from '../../src/modules/marketplace/services/tenantFederation';

describe('Marketplace tenant federation', () => {
  test('models DAO tenants as isolated storefront-ready commerce contexts', () => {
    const tenant = getTenantFederationReadModel('tenant-academy-dao');

    expect(tenant.service).toBe('TenantFederationReadModel');
    expect(tenant.federationTier).toBe('federated-dao');
    expect(tenant.isolationBoundary).toBe('marketplace.tenant.tenant-academy-dao');
    expect(tenant.daoStorefrontEnabled).toBe(false);
    expect(tenant.metrics.productCount).toBeGreaterThan(0);
    expect(tenant.ownershipHierarchy.daoOwners).toEqual(expect.arrayContaining(['Academy DAO']));
    expect(tenant.warnings).toEqual(expect.arrayContaining(['tenant-review-queue-active']));
  });

  test('summarizes federation dashboard metrics across tenants', () => {
    const dashboard = getTenantFederationDashboard();
    const mcpProducts = getTenantScopedProducts('tenant-mcp-working-group');

    expect(dashboard.tenantCount).toBeGreaterThan(0);
    expect(dashboard.rootDaos).toBe(1);
    expect(dashboard.federatedDaos).toBe(1);
    expect(dashboard.workingGroups).toBe(1);
    expect(dashboard.isolatedRenderingPrepared).toBe(true);
    expect(dashboard.daoStorefrontExecutionEnabled).toBe(false);
    expect(mcpProducts.some((product) => product.category === 'MCPs')).toBe(true);
  });
});
