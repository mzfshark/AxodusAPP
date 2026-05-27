import {
  BUSINESS_ROUTE_DEFINITIONS,
  BUSINESS_EXECUTION_POLICY_MATRIX,
  BUSINESS_TRANSITION_GUARD_CATEGORIES,
  BUSINESS_TRANSITION_MAPS,
  BUSINESS_WORKFLOW_TYPES,
  BUSINESS_CAPABILITIES,
  BUSINESS_RUNTIME_ACTIONS,
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
  explainCapabilityDenial,
  explainPermissionDecision,
  getBusinessCapabilityMatrix,
  getBusinessDraftPreviewModel,
  getBusinessDraftRuntimeReview,
  getBusinessPermissionMatrix,
  getConstitutionalCompatibility,
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
  getFederationStanding,
  getGovernanceRestrictions,
  getGovernanceStatus,
  getProjectEventTimeline,
  getProposalReference,
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
  requiresGovernanceApproval,
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
  getFederationParticipants: () => apiOrDirect('/federation', () => dataFrom(businessApiHandlers.getBusinessFederationParticipants)),
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
  getCapabilities: () => BUSINESS_CAPABILITIES,
  getRuntimeActions: () => BUSINESS_RUNTIME_ACTIONS,
  getCapabilityMatrix: getBusinessCapabilityMatrix,
  getPermissionMatrix: getBusinessPermissionMatrix,
  explainCapabilityDenial,
  explainPermissionDecision,
  getAccessModel: () => {
    const identities = dataFrom(businessApiHandlers.getBusinessIdentities);
    const federationParticipants = dataFrom(businessApiHandlers.getBusinessFederationParticipants);
    const capabilityMatrix = getBusinessCapabilityMatrix();
    const permissionMatrix = getBusinessPermissionMatrix();
    const executionPolicies = Object.values(BUSINESS_EXECUTION_POLICY_MATRIX);
    const capabilityDenials = identities.flatMap((identity) =>
      BUSINESS_CAPABILITIES
        .map((capability) => explainCapabilityDenial(identity.id, capability))
        .filter((decision) => !decision.allowed)
    );

    return {
      identities,
      federationParticipants,
      capabilityMatrix,
      permissionMatrix,
      executionPolicies,
      capabilityDenials,
      permissionDenials: permissionMatrix.filter((decision) => !decision.allowed),
      mock: true,
      readOnly: true
    };
  },
  getGovernanceReadinessModel: () => {
    const projects = dataFrom(businessApiHandlers.getBusinessProjects);
    const requests = dataFrom(businessApiHandlers.getBusinessRequests);
    const fundingRecords = dataFrom(businessApiHandlers.getBusinessFundingRecords);
    const draftRecords = listDraftStoreRecords();
    const workflows = listBusinessWorkflows();
    const approvalActions = BUSINESS_RUNTIME_ACTIONS.map((action) => requiresGovernanceApproval(action)).filter((entry) => entry.required);
    const governanceProjects = projects
      .map((project) => {
        const request = requests.find((entry) => entry.id === project.requestId);
        const funding = fundingRecords.find((entry) => entry.id === project.fundingId);
        const restrictions = getGovernanceRestrictions(project.id);
        const workflow = workflows.find((entry) => entry.projectId === project.id);
        const governanceBlockers = (workflow?.steps || []).filter((step) => step.governanceRequired && step.blockingIssues.length > 0);
        const compatibility = getConstitutionalCompatibility(project.id);
        const governanceRequired = Boolean(request?.governanceRequired || restrictions.length > 0 || compatibility === 'REVIEW_REQUIRED' || compatibility === 'RESTRICTED');
        const readinessScore = Math.max(0, 100 - restrictions.length * 12 - governanceBlockers.length * 15 - (compatibility === 'RESTRICTED' ? 35 : compatibility === 'REVIEW_REQUIRED' ? 15 : 0));

        return {
          id: project.id,
          projectId: project.id,
          title: project.title,
          status: project.status,
          riskTier: project.riskTier,
          fundingId: funding?.id,
          governanceRequired,
          governanceStatus: getGovernanceStatus(project.id),
          constitutionalCompatibility: compatibility,
          federationStanding: getFederationStanding(project.ownerId),
          proposalReference: getProposalReference(project.id),
          proposalId: getProposalReference(project.id)?.proposalId || 'mock://proposal-reference-not-created',
          restrictions,
          restrictionCount: restrictions.length,
          blockerCount: governanceBlockers.length,
          blockers: governanceBlockers.flatMap((step) => step.blockingIssues.map((issue) => ({ stepId: step.stepId, issue }))),
          decision: compatibility === 'RESTRICTED' ? 'BLOCKED' : governanceRequired ? 'REVIEW_REQUIRED' : 'CAN_PROCEED',
          readinessScore,
          mock: true,
          readOnly: true
        };
      })
      .filter((project) => project.governanceRequired);
    const governanceDrafts = draftRecords
      .map((record) => ({ ...record, runtimeReview: getBusinessDraftRuntimeReview(record.draft) }))
      .filter((record) => record.runtimeReview.governanceRequirement);
    const restrictionRows = governanceProjects.flatMap((project) =>
      project.restrictions.map((restriction) => ({
        ...restriction,
        id: restriction.id,
        projectTitle: project.title,
        compatibility: project.constitutionalCompatibility
      }))
    );
    const totalBlockers = governanceProjects.reduce((total, project) => total + project.blockerCount + project.restrictionCount, 0);
    const readinessScore = governanceProjects.length === 0
      ? 100
      : Math.round(governanceProjects.reduce((total, project) => total + project.readinessScore, 0) / governanceProjects.length);

    return {
      projects: governanceProjects,
      drafts: governanceDrafts,
      restrictions: restrictionRows,
      approvalActions,
      workflows,
      guardCategories: BUSINESS_TRANSITION_GUARD_CATEGORIES,
      readinessScore,
      totalBlockers,
      mock: true,
      readOnly: true
    };
  },
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
