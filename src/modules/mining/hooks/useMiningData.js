import { useQuery } from '@tanstack/react-query';
import { miningApi } from '../services/miningApi';

export function useMiningSummary() {
  return useQuery({ queryKey: ['mining', 'summary'], queryFn: miningApi.getSummary });
}

export function useMiningProviders(filters = {}) {
  return useQuery({
    queryKey: ['mining', 'providers', filters],
    queryFn: () => miningApi.getProviders(filters)
  });
}

export function useMiningProvider(slug) {
  return useQuery({
    queryKey: ['mining', 'provider', slug],
    queryFn: () => miningApi.getProviderBySlug(slug),
    enabled: Boolean(slug)
  });
}

export function useMiningHashTokens() {
  return useQuery({ queryKey: ['mining', 'hash-tokens'], queryFn: miningApi.getHashTokens });
}

export function useMiningVaults() {
  return useQuery({ queryKey: ['mining', 'vaults'], queryFn: miningApi.getVaults });
}

export function useMiningAllocations() {
  return useQuery({ queryKey: ['mining', 'allocations'], queryFn: miningApi.getAllocations });
}

export function useMiningTreasury() {
  return useQuery({ queryKey: ['mining', 'treasury'], queryFn: miningApi.getTreasury });
}

export function useMiningRisk() {
  return useQuery({ queryKey: ['mining', 'risk'], queryFn: miningApi.getRisk });
}

export function useMiningGovernance() {
  return useQuery({ queryKey: ['mining', 'governance'], queryFn: miningApi.getGovernanceValidations });
}

export function useMiningDiligence() {
  return useQuery({ queryKey: ['mining', 'diligence'], queryFn: miningApi.getProviderDueDiligence });
}

export function useMiningReports() {
  return useQuery({ queryKey: ['mining', 'reports'], queryFn: miningApi.getReports });
}
