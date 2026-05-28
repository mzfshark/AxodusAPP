import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getDefaultTenant,
  getTenantById,
  getTenantBySlug,
  getTenantModuleState,
  hasTenantAcsRestriction,
  hasTenantGovernanceRisk,
  isModuleEnabledForTenant,
  listTenants,
} from './tenantRegistry';
import { TenantContext } from './TenantContextValue';

const STORAGE_KEY = 'axodus:selectedTenantId';

function readStoredTenantId() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeStoredTenantId(tenantId) {
  try {
    window.localStorage.setItem(STORAGE_KEY, tenantId);
  } catch {
    // localStorage can be unavailable in hardened browser contexts.
  }
}

export function TenantProvider({ children }) {
  const tenants = useMemo(() => listTenants(), []);
  const [selectedTenantId, setSelectedTenantId] = useState(() => {
    const stored = readStoredTenantId();
    return getTenantById(stored)?.id ?? getDefaultTenant().id;
  });

  const selectedTenant = getTenantById(selectedTenantId) ?? getDefaultTenant();

  useEffect(() => {
    writeStoredTenantId(selectedTenant.id);
  }, [selectedTenant.id]);

  const selectTenant = useCallback((tenantIdOrSlug) => {
    const nextTenant = getTenantById(tenantIdOrSlug) ?? getTenantBySlug(tenantIdOrSlug) ?? getDefaultTenant();
    setSelectedTenantId(nextTenant.id);
  }, []);

  const resetTenant = useCallback(() => {
    setSelectedTenantId(getDefaultTenant().id);
  }, []);

  const value = useMemo(() => ({
    tenants,
    selectedTenant,
    selectedTenantId: selectedTenant.id,
    defaultTenant: getDefaultTenant(),
    selectTenant,
    resetTenant,
    getTenantById,
    getTenantBySlug,
    isModuleEnabled: (moduleId) => isModuleEnabledForTenant(selectedTenant, moduleId),
    getModuleState: (moduleId) => getTenantModuleState(selectedTenant, moduleId),
    hasGovernanceRisk: () => hasTenantGovernanceRisk(selectedTenant),
    hasAcsRestriction: () => hasTenantAcsRestriction(selectedTenant),
  }), [resetTenant, selectTenant, selectedTenant, tenants]);

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>;
}
