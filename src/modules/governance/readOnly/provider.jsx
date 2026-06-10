import { useMemo } from 'react';
import { useTenantContext } from '@/runtime/tenantContext';
import { mockGovernanceReadOnlyAdapter } from './adapter';
import { governanceReadOnlyTenantMappings } from './fixtures';
import { GovernanceReadOnlyContext } from './context';

export function GovernanceReadOnlyProvider({ adapter = mockGovernanceReadOnlyAdapter, children }) {
  const tenantContext = useTenantContext();
  const governanceTenantId = governanceReadOnlyTenantMappings[tenantContext.selectedTenantId] ?? tenantContext.selectedTenantId;

  const value = useMemo(() => ({
    adapter,
    selectedTenant: tenantContext.selectedTenant,
    selectedTenantId: tenantContext.selectedTenantId,
    governanceTenantId,
    mode: 'local-mock',
    readOnly: true,
  }), [adapter, governanceTenantId, tenantContext.selectedTenant, tenantContext.selectedTenantId]);

  return <GovernanceReadOnlyContext.Provider value={value}>{children}</GovernanceReadOnlyContext.Provider>;
}
