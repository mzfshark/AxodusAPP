import { useQuery } from '@tanstack/react-query';
import { acsApi } from '../services/acsApi';

export function useAcsHealth() {
  return useQuery({ queryKey: ['acs', 'health'], queryFn: acsApi.getHealth });
}

export function useAcsCapabilities(level) {
  return useQuery({ queryKey: ['acs', 'capabilities', level || 'all'], queryFn: () => acsApi.getCapabilities(level) });
}

export function useAcsTenantServices(tenantId) {
  return useQuery({ queryKey: ['acs', 'tenant-services', tenantId || 'all'], queryFn: () => acsApi.getTenantServices(tenantId) });
}

export function useAcsProductAccess(walletAddress, productId) {
  return useQuery({ queryKey: ['acs', 'product-access', walletAddress || 'none', productId || 'all'], queryFn: () => acsApi.getProductAccess(walletAddress, productId) });
}

export function useAcsPolicyMatrix() {
  return useQuery({ queryKey: ['acs', 'policy-matrix'], queryFn: acsApi.getPolicyMatrix });
}

export function useAcsPolicyCheck(capabilityId, tenantId) {
  return useQuery({
    queryKey: ['acs', 'policy-check', capabilityId || 'none', tenantId || 'none'],
    queryFn: () => acsApi.getPolicyCheck({ capabilityId, tenantId }),
    enabled: Boolean(capabilityId)
  });
}

export function useAcsStatus(walletAddress) {
  return useQuery({ queryKey: ['acs', 'status', walletAddress || 'none'], queryFn: () => acsApi.getStatus(walletAddress) });
}

export function useAcsReadiness(walletAddress) {
  return useQuery({ queryKey: ['acs', 'readiness', walletAddress || 'none'], queryFn: () => acsApi.getReadiness(walletAddress) });
}

export function useAcsOperationalState(walletAddress) {
  return useQuery({ queryKey: ['acs', 'operational-state', walletAddress || 'none'], queryFn: () => acsApi.getOperationalState(walletAddress) });
}

