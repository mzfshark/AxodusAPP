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

export function useAcsPolicyCheck(capabilityId, tenantId, walletAddress) {
  return useQuery({
    queryKey: ['acs', 'policy-check', capabilityId || 'none', tenantId || 'none', walletAddress || 'none'],
    queryFn: () => acsApi.getPolicyCheck({ capabilityId, tenantId, walletAddress }),
    enabled: Boolean(capabilityId)
  });
}

export function useAcsUserStatus(walletAddress, options = {}) {
  return useQuery({
    queryKey: ['acs', 'user-status', walletAddress || 'none', options.tenantId || 'none', options.productId || 'none'],
    queryFn: () => acsApi.getUserStatus(walletAddress, options)
  });
}

export function useAcsPerformanceRecords() {
  return useQuery({ queryKey: ['acs', 'performance-records'], queryFn: acsApi.getPerformanceRecords });
}

export function useAcsReceipts() {
  return useQuery({ queryKey: ['acs', 'receipts'], queryFn: acsApi.getReceipts });
}

export function useAcsEmergencyStops() {
  return useQuery({ queryKey: ['acs', 'emergency-stops'], queryFn: acsApi.getEmergencyStops });
}

export function useAcsSecretStorageStatus() {
  return useQuery({ queryKey: ['acs', 'secret-storage-status'], queryFn: acsApi.getSecretStorageStatus });
}

export function useAcsObservabilityStatus() {
  return useQuery({ queryKey: ['acs', 'observability-status'], queryFn: acsApi.getObservabilityStatus });
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
