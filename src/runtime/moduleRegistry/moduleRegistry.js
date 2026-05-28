import { axodusModuleRegistry } from '@/config/moduleRegistry';

export const tenantAwareModuleRegistry = axodusModuleRegistry.map((module) => ({
  ...module,
  executionMode: module.id === 'dex' || module.id === 'defi' ? 'executable-disabled' : module.maturity === 'mock' ? 'read-only' : 'preview',
  operatorSurfaceAvailable: module.supportedScopes.includes('operator'),
  tenantAware: Boolean(module.tenantAware),
  requiresTenant: ['business', 'marketplace'].includes(module.id),
  supportsProtocolScope: module.supportedScopes.includes('protocol'),
  supportsUserScope: module.supportedScopes.includes('user'),
  supportsTenantScope: module.supportedScopes.includes('tenant'),
  supportsOperatorScope: module.supportedScopes.includes('operator'),
  requiresGovernanceState: Boolean(module.governanceAware),
  requiresAcsState: Boolean(module.acsAware),
  allowedTenantTypes: module.id === 'defi'
    ? ['root', 'sub-dao']
    : module.id === 'business'
      ? ['sub-dao', 'company', 'agency', 'product', 'sandbox']
      : module.id === 'academy'
        ? ['root', 'sub-dao', 'company', 'agency', 'product', 'community', 'sandbox']
        : ['root', 'sub-dao', 'company', 'agency', 'product', 'community', 'sandbox'],
}));

export function getTenantAwareModule(moduleId) {
  return tenantAwareModuleRegistry.find((module) => module.id === moduleId);
}

export function getTenantEnabledModules(tenant) {
  return tenantAwareModuleRegistry.filter((module) => tenant?.enabledModules?.includes(module.id));
}

export function isModuleAllowedForTenantType(moduleId, tenantType) {
  const module = getTenantAwareModule(moduleId);
  return Boolean(module?.allowedTenantTypes?.includes(tenantType));
}
