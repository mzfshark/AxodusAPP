import { useQuery } from '@tanstack/react-query';
import { miningService } from '../services/miningService';

export function useMiningSummary() {
  return useQuery({ queryKey: ['mining', 'summary'], queryFn: miningService.getSummary });
}

export function useMiningProviders(filters = {}) {
  return useQuery({
    queryKey: ['mining', 'providers', filters],
    queryFn: () => miningService.getProviders(filters)
  });
}

export function useMiningProvider(slug) {
  return useQuery({
    queryKey: ['mining', 'provider', slug],
    queryFn: () => miningService.getProviderBySlug(slug),
    enabled: Boolean(slug)
  });
}

export function useMiningHashTokens() {
  return useQuery({ queryKey: ['mining', 'hash-tokens'], queryFn: miningService.getHashTokens });
}

export function useMiningVaults() {
  return useQuery({ queryKey: ['mining', 'vaults'], queryFn: miningService.getVaults });
}

export function useMiningAllocations() {
  return useQuery({ queryKey: ['mining', 'allocations'], queryFn: miningService.getAllocations });
}

export function useMiningTreasury() {
  return useQuery({ queryKey: ['mining', 'treasury'], queryFn: miningService.getTreasury });
}

export function useMiningRisk() {
  return useQuery({ queryKey: ['mining', 'risk'], queryFn: miningService.getRisk });
}

export function useMiningGovernance() {
  return useQuery({ queryKey: ['mining', 'governance'], queryFn: miningService.getGovernanceValidations });
}

export function useMiningDiligence() {
  return useQuery({ queryKey: ['mining', 'diligence'], queryFn: miningService.getProviderDueDiligence });
}

export function useMiningReports() {
  return useQuery({ queryKey: ['mining', 'reports'], queryFn: miningService.getReports });
}

