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
  explainPermissionDecision,
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
  getExecutionPolicy,
  getProjectEventTimeline,
  getProjectRegistryView,
  getRequiredCapabilitiesForAction,
  getRiskTierRegistryView,
  getWorkflowBlockers,
  getWorkflowForProject,
  getWorkflowProgress,
  getWorkflowReadiness,
  getWorkflowTemplate,
  listBusinessWorkflows,
  simulateTransition,
  selectBusinessProjectById
} from '@axodus/business-runtime';

const assertReadOnlyEnvelope = (response) => {
  if (!response?.meta?.mock || !response?.meta?.readOnly || response?.runtime?.executionMode !== 'MOCK_READ_ONLY') {
    throw new Error('Business runtime response is not mock/read-only.');
  }

  return response;
};

const dataFrom = (handler) => assertReadOnlyEnvelope(handler()).data;

const intakeActionByDraftType = {
  GENERAL: 'CREATE_BUSINESS_REQUEST',
  DAO_PLUGIN: 'PREPARE_GOVERNANCE_REVIEW',
  ACS_SERVICE: 'PREPARE_ACS_PROVISIONING_REQUEST',
  TREASURY_SPONSORSHIP: 'PREPARE_FUNDING_REVIEW',
  DEBENTURE_FUNDING: 'PREPARE_DEBENTURE_DRAFT',
  ECOSYSTEM_INFRASTRUCTURE: 'REGISTER_OPERATIONAL_ASSET_DRAFT',
  PRIVATE_DEVELOPMENT: 'CREATE_BUSINESS_REQUEST'
};

const valuesOf = (runtimeEnum) => Object.values(runtimeEnum);

export const businessRuntimeClient = {
  getOverview: () => dataFrom(businessApiHandlers.getBusinessOverview),
  getRuntimeSummary: () => dataFrom(businessApiHandlers.getBusinessRuntimeSummary),
  getCoreSummary: () => getBusinessRuntimeCoreSummary(),
  getDashboardModel: () => getBusinessDashboardModel(),
  getRequests: () => dataFrom(businessApiHandlers.getBusinessRequests),
  getProjects: () => dataFrom(businessApiHandlers.getBusinessProjects),
  getProjectById: (projectId) => selectBusinessProjectById(projectId),
  getAssets: () => dataFrom(businessApiHandlers.getBusinessAssets),
  getPlugins: () => dataFrom(businessApiHandlers.getBusinessPlugins),
  getFundingRecords: () => dataFrom(businessApiHandlers.getBusinessFundingRecords),
  getDebentures: () => dataFrom(businessApiHandlers.getBusinessDebentures),
  getTreasuryExposures: () => dataFrom(businessApiHandlers.getBusinessTreasuryExposures),
  getRevenueRecords: () => dataFrom(businessApiHandlers.getBusinessRevenueRecords),
  getACSRuntimes: () => dataFrom(businessApiHandlers.getBusinessACSRuntimes),
  getTelemetryEvents: () => dataFrom(businessApiHandlers.getBusinessTelemetryEvents),
  getIdentities: () => dataFrom(businessApiHandlers.getBusinessIdentities),
  getReadOnlyMeta: () => assertReadOnlyEnvelope(businessApiHandlers.getBusinessOverview()).meta,
  getProjectRegistryView,
  getAssetRegistryView,
  getRiskTierRegistryView,
  getACSRuntimeRegistryView,
  getRegistrySummary: getBusinessRegistrySummary,
  getWorkflowForProject,
  getWorkflowTemplate,
  getWorkflowReadiness,
  getWorkflowBlockers,
  getWorkflowProgress,
  getWorkflowSummary: getBusinessWorkflowSummary,
  listWorkflows: listBusinessWorkflows,
  getRuntimeEvents: getBusinessRuntimeEvents,
  getEventSummary: getBusinessEventSummary,
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
  getIntakeOptions: () => ({
    debentureTypes: valuesOf(DebentureType),
    fundingTypes: valuesOf(FundingType),
    pluginTypes: valuesOf(PluginType),
    requestTypes: valuesOf(RequestType),
    riskTiers: valuesOf(RiskTier),
    treasuryExposureTypes: valuesOf(TreasuryExposureType),
    workflowTypes: BUSINESS_WORKFLOW_TYPES
  }),
  getDraftRuntimeReview: (draft) => {
    const action = intakeActionByDraftType[draft.draftType] || 'CREATE_BUSINESS_REQUEST';
    const identityId = draft.requesterIdentity || 'id-axodus-core';
    const policy = getExecutionPolicy(action);
    const requiredCapabilities = getRequiredCapabilitiesForAction(action);
    const permissionDecision = explainPermissionDecision(identityId, action);
    const routeContracts = BUSINESS_ROUTE_DEFINITIONS.filter((route) => route.executionPolicy === action);

    return {
      action,
      executionPolicy: policy,
      permissionDecision,
      requiredCapabilities,
      routeContracts,
      runtimeMode: 'MOCK_READ_ONLY',
      mock: true,
      readOnly: true
    };
  }
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
