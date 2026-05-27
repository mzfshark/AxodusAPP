import {
  BUSINESS_ROUTE_DEFINITIONS,
  BUSINESS_EXECUTION_POLICY_MATRIX,
  BUSINESS_TRANSITION_GUARD_CATEGORIES,
  BUSINESS_TRANSITION_MAPS,
  BUSINESS_WORKFLOW_TYPES,
  DebentureType,
  FundingType,
  PluginType,
  RequestType,
  RiskTier,
  TreasuryExposureType,
  businessApiHandlers,
  createBusinessDraftTemplate,
  createDraftStoreRecord,
  deleteDraftStoreRecord,
  getBusinessDraftPreviewModel,
  getBusinessDraftRuntimeReview,
  getACSRuntimeEventTimeline,
  getACSRuntimeRegistryView,
  getAssetEventTimeline,
  getAssetRegistryView,
  getBusinessEventLineage,
  getBusinessEventSummary,
  getBusinessRegistrySummary,
  getBusinessRuntimeEvents,
  getBusinessDashboardModel,
  getBusinessRuntimeCoreSummary,
  getBusinessWorkflowSummary,
  getCriticalBusinessEvents,
  getDraftPreviewById,
  getDraftStoreRecordById,
  getProjectEventTimeline,
  getProjectRegistryView,
  getRiskTierRegistryView,
  getWorkflowBlockers,
  getWorkflowForProject,
  getWorkflowProgress,
  getWorkflowReadiness,
  getWorkflowTemplate,
  listBusinessDraftTemplates,
  listBusinessWorkflows,
  listDraftStoreRecords,
  resetBusinessDraftStore,
  simulateTransition,
  updateDraftStoreRecord,
  validateDraftById,
  selectBusinessProjectById
} from '@axodus/business-runtime';

const assertReadOnlyEnvelope = (response) => {
  if (!response?.meta?.mock || !response?.meta?.readOnly || response?.runtime?.executionMode !== 'MOCK_READ_ONLY') {
    throw new Error('Business runtime response is not mock/read-only.');
  }

  return response;
};

const dataFrom = (handler) => assertReadOnlyEnvelope(handler()).data;

const valuesOf = (runtimeEnum) => Object.values(runtimeEnum);

const businessApiBaseUrl = import.meta.env.VITE_BUSINESS_API_URL?.replace(/\/+$/, '') || '';
const businessUseApi = import.meta.env.VITE_BUSINESS_USE_API === 'true' && Boolean(businessApiBaseUrl);

const businessApiDataFrom = async (path) => {
  const response = await fetch(`${businessApiBaseUrl}/api/v1/business${path}`);
  const envelope = assertReadOnlyEnvelope(await response.json());

  if (!response.ok || envelope.errors.length > 0) {
    const message = envelope.errors[0]?.message || `Business mock API request failed: ${path}`;
    throw new Error(message);
  }

  return envelope.data;
};

const apiOrDirect = (path, directReader) => (businessUseApi ? businessApiDataFrom(path) : directReader());
const apiProjectionOrDirect = async (path, selector, directReader) => {
  if (!businessUseApi) return directReader();
  return selector(await businessApiDataFrom(path));
};

export const businessRuntimeClient = {
  getOverview: () => apiOrDirect('/overview', () => dataFrom(businessApiHandlers.getBusinessOverview)),
  getRuntimeSummary: () => apiOrDirect('/summary', () => dataFrom(businessApiHandlers.getBusinessRuntimeSummary)),
  getCoreSummary: () => getBusinessRuntimeCoreSummary(),
  getDashboardModel: () => getBusinessDashboardModel(),
  getRequests: () => apiOrDirect('/requests', () => dataFrom(businessApiHandlers.getBusinessRequests)),
  getProjects: () => apiOrDirect('/projects', () => dataFrom(businessApiHandlers.getBusinessProjects)),
  getProjectById: (projectId) => selectBusinessProjectById(projectId),
  getAssets: () => apiOrDirect('/assets', () => dataFrom(businessApiHandlers.getBusinessAssets)),
  getPlugins: () => apiOrDirect('/plugins', () => dataFrom(businessApiHandlers.getBusinessPlugins)),
  getFundingRecords: () => apiOrDirect('/funding', () => dataFrom(businessApiHandlers.getBusinessFundingRecords)),
  getDebentures: () => apiOrDirect('/debentures', () => dataFrom(businessApiHandlers.getBusinessDebentures)),
  getTreasuryExposures: () => apiOrDirect('/treasury/exposure', () => dataFrom(businessApiHandlers.getBusinessTreasuryExposures)),
  getRevenueRecords: () => apiOrDirect('/revenue', () => dataFrom(businessApiHandlers.getBusinessRevenueRecords)),
  getACSRuntimes: () => apiOrDirect('/acs', () => dataFrom(businessApiHandlers.getBusinessACSRuntimes)),
  getTelemetryEvents: () => apiOrDirect('/telemetry', () => dataFrom(businessApiHandlers.getBusinessTelemetryEvents)),
  getIdentities: () => apiOrDirect('/identities', () => dataFrom(businessApiHandlers.getBusinessIdentities)),
  getReadOnlyMeta: () => assertReadOnlyEnvelope(businessApiHandlers.getBusinessOverview()).meta,
  getProjectRegistryView,
  getAssetRegistryView,
  getRiskTierRegistryView,
  getACSRuntimeRegistryView,
  getRegistrySummary: () => apiOrDirect('/registry', getBusinessRegistrySummary),
  getWorkflowForProject,
  getWorkflowTemplate,
  getWorkflowReadiness,
  getWorkflowBlockers,
  getWorkflowProgress,
  getWorkflowSummary: () => apiProjectionOrDirect('/workflows', (data) => data.summary, getBusinessWorkflowSummary),
  listWorkflows: () => apiProjectionOrDirect('/workflows', (data) => data.workflows, listBusinessWorkflows),
  getRuntimeEvents: () => apiProjectionOrDirect('/events', (data) => data.events, getBusinessRuntimeEvents),
  getEventSummary: () => apiProjectionOrDirect('/events', (data) => data.summary, getBusinessEventSummary),
  getCriticalEvents: getCriticalBusinessEvents,
  getProjectEventTimeline,
  getAssetEventTimeline,
  getACSRuntimeEventTimeline,
  getEventLineage: getBusinessEventLineage,
  getTransitionMaps: () => BUSINESS_TRANSITION_MAPS,
  getTransitionGuardCategories: () => BUSINESS_TRANSITION_GUARD_CATEGORIES,
  simulateTransition,
  getExecutionPolicies: () => BUSINESS_EXECUTION_POLICY_MATRIX,
  getWorkflowTypes: () => BUSINESS_WORKFLOW_TYPES,
  getRouteCatalog: () => BUSINESS_ROUTE_DEFINITIONS,
  createDraftTemplate: createBusinessDraftTemplate,
  getDraftTemplates: listBusinessDraftTemplates,
  getDraftPreviewModel: getBusinessDraftPreviewModel,
  getDraftRuntimeReview: getBusinessDraftRuntimeReview,
  createDraftStoreRecord,
  listDraftStoreRecords,
  getDraftStoreRecordById,
  updateDraftStoreRecord,
  deleteDraftStoreRecord,
  getDraftPreviewById,
  validateDraftById,
  resetDraftStore: resetBusinessDraftStore,
  getApiMode: () => ({
    enabled: businessUseApi,
    baseUrl: businessApiBaseUrl || null,
    fallback: businessUseApi ? 'BUSINESS_MOCK_API' : 'DIRECT_RUNTIME'
  }),
  getIntakeOptions: () => ({
    debentureTypes: valuesOf(DebentureType),
    fundingTypes: valuesOf(FundingType),
    pluginTypes: valuesOf(PluginType),
    requestTypes: valuesOf(RequestType),
    riskTiers: valuesOf(RiskTier),
    treasuryExposureTypes: valuesOf(TreasuryExposureType),
    workflowTypes: BUSINESS_WORKFLOW_TYPES
  })
};

export const businessRuntimeSafety = {
  mode: 'MOCK_READ_ONLY',
  treasuryMovementEnabled: false,
  debentureIssuanceEnabled: false,
  revenueDistributionEnabled: false,
  acsProvisioningEnabled: false,
  governanceExecutionEnabled: false,
  contractCallsEnabled: false
};
