import { useQuery } from '@tanstack/react-query';
import { miningServiceAdapter } from '../services/miningServiceAdapter';

export function useMiningSummary() {
  return useQuery({ queryKey: ['mining', 'summary'], queryFn: miningServiceAdapter.getSummary });
}

export function useMiningProviders(filters = {}) {
  return useQuery({
    queryKey: ['mining', 'providers', filters],
    queryFn: () => miningServiceAdapter.getProviders(filters)
  });
}

export function useMiningProvider(slug) {
  return useQuery({
    queryKey: ['mining', 'provider', slug],
    queryFn: () => miningServiceAdapter.getProviderBySlug(slug),
    enabled: Boolean(slug)
  });
}

export function useMiningHashTokens() {
  return useQuery({ queryKey: ['mining', 'hash-tokens'], queryFn: miningServiceAdapter.getHashTokens });
}

export function useMiningVaults() {
  return useQuery({ queryKey: ['mining', 'vaults'], queryFn: miningServiceAdapter.getVaults });
}

export function useMiningAllocations() {
  return useQuery({ queryKey: ['mining', 'allocations'], queryFn: miningServiceAdapter.getAllocations });
}

export function useMiningTreasury() {
  return useQuery({ queryKey: ['mining', 'treasury'], queryFn: miningServiceAdapter.getTreasury });
}

export function useMiningRisk() {
  return useQuery({ queryKey: ['mining', 'risk'], queryFn: miningServiceAdapter.getRisk });
}

export function useMiningGovernance() {
  return useQuery({ queryKey: ['mining', 'governance'], queryFn: miningServiceAdapter.getGovernanceValidations });
}

export function useMiningDiligence() {
  return useQuery({ queryKey: ['mining', 'diligence'], queryFn: miningServiceAdapter.getProviderDueDiligence });
}

export function useMiningReports() {
  return useQuery({ queryKey: ['mining', 'reports'], queryFn: miningServiceAdapter.getReports });
}
