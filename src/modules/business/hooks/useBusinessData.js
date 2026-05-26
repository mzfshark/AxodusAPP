import { useQuery } from '@tanstack/react-query';
import { businessRuntimeClient } from '../services/businessRuntimeClient';

export function useBusinessOverview() {
  return useQuery({ queryKey: ['business', 'overview'], queryFn: businessRuntimeClient.getOverview });
}

export function useBusinessRuntimeSummary() {
  return useQuery({ queryKey: ['business', 'runtime-summary'], queryFn: businessRuntimeClient.getRuntimeSummary });
}

export function useBusinessRequests() {
  return useQuery({ queryKey: ['business', 'requests'], queryFn: businessRuntimeClient.getRequests });
}

export function useBusinessProjects() {
  return useQuery({ queryKey: ['business', 'projects'], queryFn: businessRuntimeClient.getProjects });
}

export function useBusinessAssets() {
  return useQuery({ queryKey: ['business', 'assets'], queryFn: businessRuntimeClient.getAssets });
}

export function useBusinessPlugins() {
  return useQuery({ queryKey: ['business', 'plugins'], queryFn: businessRuntimeClient.getPlugins });
}

export function useBusinessFundingRecords() {
  return useQuery({ queryKey: ['business', 'funding'], queryFn: businessRuntimeClient.getFundingRecords });
}

export function useBusinessDebentures() {
  return useQuery({ queryKey: ['business', 'debentures'], queryFn: businessRuntimeClient.getDebentures });
}

export function useBusinessTreasuryExposures() {
  return useQuery({ queryKey: ['business', 'treasury-exposures'], queryFn: businessRuntimeClient.getTreasuryExposures });
}

export function useBusinessRevenueRecords() {
  return useQuery({ queryKey: ['business', 'revenue'], queryFn: businessRuntimeClient.getRevenueRecords });
}

export function useBusinessACSRuntimes() {
  return useQuery({ queryKey: ['business', 'acs-runtimes'], queryFn: businessRuntimeClient.getACSRuntimes });
}

export function useBusinessTelemetryEvents() {
  return useQuery({ queryKey: ['business', 'telemetry'], queryFn: businessRuntimeClient.getTelemetryEvents });
}
