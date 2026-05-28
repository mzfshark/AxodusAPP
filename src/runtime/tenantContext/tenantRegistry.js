import { defaultTenantId, tenantsMock } from '@/data/mock';

export function listTenants() {
  return tenantsMock;
}

export function getDefaultTenant() {
  return getTenantById(defaultTenantId) ?? tenantsMock[0];
}

export function getTenantById(tenantId) {
  return tenantsMock.find((tenant) => tenant.id === tenantId);
}

export function getTenantBySlug(slug) {
  return tenantsMock.find((tenant) => tenant.slug === slug);
}

export function isModuleEnabledForTenant(tenant, moduleId) {
  if (!tenant || !moduleId) return false;
  return tenant.enabledModules.includes(moduleId) && !tenant.disabledModules.includes(moduleId);
}

export function getTenantModuleState(tenant, moduleId) {
  const enabled = isModuleEnabledForTenant(tenant, moduleId);
  if (enabled) return { enabled: true, reason: 'enabled-for-selected-tenant' };
  if (tenant?.disabledModules?.includes(moduleId)) return { enabled: false, reason: 'disabled-for-selected-tenant' };
  return { enabled: false, reason: 'not-declared-for-selected-tenant' };
}

export function hasTenantGovernanceRisk(tenant) {
  return ['under-review', 'restricted'].includes(tenant?.governanceStatus);
}

export function hasTenantAcsRestriction(tenant) {
  return ['review-required', 'restricted', 'offline'].includes(tenant?.acsState);
}
