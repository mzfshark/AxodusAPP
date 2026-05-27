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

export function useBusinessIdentities() {
  return useQuery({ queryKey: ['business', 'identities'], queryFn: businessRuntimeClient.getIdentities });
}

export function useBusinessAccessModel() {
  return useQuery({ queryKey: ['business', 'access-model'], queryFn: businessRuntimeClient.getAccessModel });
}

export function useBusinessGovernanceReadiness() {
  return useQuery({ queryKey: ['business', 'governance-readiness'], queryFn: businessRuntimeClient.getGovernanceReadinessModel });
}

export function useBusinessProjectRegistry(projectId) {
  return useQuery({ enabled: Boolean(projectId), queryKey: ['business', 'registry', 'project', projectId], queryFn: () => businessRuntimeClient.getProjectRegistryView(projectId) });
}

export function useBusinessAssetRegistry(assetId) {
  return useQuery({ enabled: Boolean(assetId), queryKey: ['business', 'registry', 'asset', assetId], queryFn: () => businessRuntimeClient.getAssetRegistryView(assetId) });
}

export function useBusinessRegistrySummary() {
  return useQuery({ queryKey: ['business', 'registry', 'summary'], queryFn: businessRuntimeClient.getRegistrySummary });
}

export function useBusinessWorkflows() {
  return useQuery({ queryKey: ['business', 'workflows'], queryFn: businessRuntimeClient.listWorkflows });
}

export function useBusinessWorkflowSummary() {
  return useQuery({ queryKey: ['business', 'workflows', 'summary'], queryFn: businessRuntimeClient.getWorkflowSummary });
}

export function useBusinessEvents() {
  return useQuery({ queryKey: ['business', 'events'], queryFn: businessRuntimeClient.getRuntimeEvents });
}

export function useBusinessEventSummary() {
  return useQuery({ queryKey: ['business', 'events', 'summary'], queryFn: businessRuntimeClient.getEventSummary });
}

export function useBusinessCriticalEvents() {
  return useQuery({ queryKey: ['business', 'events', 'critical'], queryFn: businessRuntimeClient.getCriticalEvents });
}

export function useBusinessStateRuntime() {
  return useQuery({
    queryKey: ['business', 'state-runtime'],
    queryFn: () => ({
      guardCategories: businessRuntimeClient.getTransitionGuardCategories(),
      transitionMaps: businessRuntimeClient.getTransitionMaps(),
      simulation: businessRuntimeClient.simulateTransition('PROJECT', { id: 'sim-project', status: 'EVALUATING' }, 'status', 'GOVERNANCE_REVIEW'),
      invalidSimulation: businessRuntimeClient.simulateTransition('PROJECT', { id: 'sim-project', status: 'ACTIVE' }, 'status', 'PROPOSED')
    })
  });
}

export function useBusinessRuntimeSafetyModel() {
  return useQuery({
    queryKey: ['business', 'runtime-safety'],
    queryFn: () => ({
      executionPolicies: businessRuntimeClient.getExecutionPolicies(),
      runtimeSummary: businessRuntimeClient.getRuntimeSummary(),
      coreSummary: businessRuntimeClient.getCoreSummary()
    })
  });
}

export function useBusinessIntakeRuntime() {
  return useQuery({
    queryKey: ['business', 'intake-runtime'],
    queryFn: () => ({
      identities: businessRuntimeClient.getIdentities(),
      options: businessRuntimeClient.getIntakeOptions(),
      templates: businessRuntimeClient.getDraftTemplates(),
      routeCatalog: businessRuntimeClient.getRouteCatalog(),
      safety: businessRuntimeClient.getCoreSummary().securityValidatorStatus
    })
  });
}
