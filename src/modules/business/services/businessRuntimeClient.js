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
  canUseFinancialInstrument,
  createBusinessDraftTemplate,
  createDraftStoreRecord,
  debentureAdapter,
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
  getDebentureRiskProfile,
  getDraftPreviewById,
  getDraftStoreRecordById,
  getFederationStanding,
  getGovernanceRestrictions,
  getGovernanceStatus,
  getOperationalCostProfile,
  getProjectEventTimeline,
  getProposalReference,
  getProjectRegistryView,
  getRevenueRouting,
  getRiskTierRegistryView,
  getSettlementStatus,
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
  treasuryAdapter,
  updateDraftStoreRecord,
  validateFundingModel,
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

const sumBy = (records, selector) => records.reduce((total, record) => total + Number(selector(record) || 0), 0);

const createFinanceRiskModel = () => {
  const projects = dataFrom(businessApiHandlers.getBusinessProjects);
  const assets = dataFrom(businessApiHandlers.getBusinessAssets);
  const fundingRecords = dataFrom(businessApiHandlers.getBusinessFundingRecords);
  const debentures = dataFrom(businessApiHandlers.getBusinessDebentures);
  const treasuryExposures = dataFrom(businessApiHandlers.getBusinessTreasuryExposures);
  const revenueRecords = dataFrom(businessApiHandlers.getBusinessRevenueRecords);
  const executionPolicies = Object.values(BUSINESS_EXECUTION_POLICY_MATRIX);
  const financialActionIds = new Set(['MOVE_TREASURY_FUNDS', 'ISSUE_DEBENTURE', 'DISTRIBUTE_REVENUE', 'CALL_CONTRACT']);

  const exposureByRiskTier = valuesOf(RiskTier).map((riskTier) => {
    const records = treasuryExposures.filter((record) => record.riskTier === riskTier);
    const limit = treasuryAdapter.getTreasuryExposureLimit(riskTier);
    const approvedAmount = sumBy(records, (record) => record.approvedAmount);

    return {
      id: `risk-${riskTier}`,
      riskTier,
      count: records.length,
      requestedAmount: sumBy(records, (record) => record.requestedAmount),
      approvedAmount,
      consumedAmount: sumBy(records, (record) => record.consumedAmount),
      exposureLimit: limit.exposureLimit,
      currency: limit.currency,
      governanceRequired: limit.governanceRequired,
      utilizationPercent: limit.exposureLimit ? Math.round((approvedAmount / limit.exposureLimit) * 100) : 0
    };
  });

  const exposureByProject = projects.map((project) => {
    const projectExposures = treasuryExposures.filter((record) => record.projectId === project.id);
    const funding = fundingRecords.find((record) => record.id === project.fundingId);
    const asset = assets.find((record) => record.id === project.assetId);
    const requestedAmount = sumBy(projectExposures, (record) => record.requestedAmount);
    const approvedAmount = sumBy(projectExposures, (record) => record.approvedAmount);
    const consumedAmount = sumBy(projectExposures, (record) => record.consumedAmount);
    const restrictions = treasuryAdapter.getTreasuryRestrictions(project.id);
    const limit = treasuryAdapter.getTreasuryExposureLimit(project.riskTier);
    const allocationDecision = treasuryAdapter.canAllocateTreasury(project.id, requestedAmount || approvedAmount);
    const consumptionDecision = treasuryAdapter.canConsumeTreasury(project.id, Math.max(0, approvedAmount - consumedAmount));
    const fundingEligibility = validateFundingModel(project.id, funding?.fundingType || FundingType.HYBRID);
    const instrumentEligibility = canUseFinancialInstrument(project.id, funding?.fundingType || FundingType.HYBRID);
    const readinessScore = Math.max(
      0,
      100 -
        restrictions.length * 10 -
        (approvedAmount > limit.exposureLimit ? 25 : 0) -
        (fundingEligibility.eligible ? 0 : 20) -
        (allocationDecision.allowed ? 0 : 10)
    );

    return {
      id: project.id,
      projectId: project.id,
      title: project.title,
      assetId: asset?.id,
      assetName: asset?.name,
      status: project.status,
      riskTier: project.riskTier,
      fundingId: funding?.id,
      fundingType: funding?.fundingType,
      requestedAmount,
      approvedAmount,
      consumedAmount,
      currency: projectExposures[0]?.currency || funding?.currency || 'USD',
      exposureStatus: projectExposures[0]?.status || 'NO_EXPOSURE',
      restrictionCount: restrictions.length,
      restrictions,
      allocationDecision,
      consumptionDecision,
      fundingEligibility,
      instrumentEligibility,
      costProfile: getOperationalCostProfile(project.id),
      readinessScore,
      mock: true,
      readOnly: true
    };
  });

  const fundingEligibilityRows = fundingRecords.map((record) => {
    const project = projects.find((entry) => entry.id === record.projectId);
    const eligibility = validateFundingModel(record.projectId, record.fundingType);
    const instrument = canUseFinancialInstrument(record.projectId, record.fundingType);

    return {
      ...record,
      projectTitle: project?.title || record.projectId,
      riskTier: project?.riskTier,
      percentFunded: record.targetAmount ? Math.round((record.raisedAmount / record.targetAmount) * 100) : 0,
      eligible: eligibility.eligible && instrument.eligible,
      eligibilityReason: eligibility.reason,
      instrumentReason: instrument.reason,
      simulated: eligibility.simulated && instrument.simulated
    };
  });

  const debenturePlanningRows = debentures.map((record) => {
    const project = projects.find((entry) => entry.id === record.projectId);
    const progress = debentureAdapter.getDebentureFundingProgress(record.id);
    const repayment = debentureAdapter.getDebentureRepaymentStatus(record.id);
    const maturity = debentureAdapter.getDebentureMaturityStatus(record.id);
    const issuanceDecision = debentureAdapter.canIssueDebenture(record.projectId);
    const riskProfile = getDebentureRiskProfile(record.projectId);
    const simulation = debentureAdapter.simulateDebentureTerms(record.projectId, record.targetAmount, record.convertible);

    return {
      ...record,
      projectTitle: project?.title || record.projectId,
      riskTier: project?.riskTier,
      percentRaised: progress?.percentRaised || 0,
      repaymentStatus: repayment.status,
      maturityStatus: maturity.status,
      defaultRisk: riskProfile?.defaultRisk || 'UNKNOWN',
      issuanceAllowed: issuanceDecision.eligible,
      issuanceReason: issuanceDecision.reason,
      simulatedAprModel: simulation.aprModel,
      executable: simulation.executable
    };
  });

  const revenueRoutingRows = revenueRecords.map((record) => ({
    ...record,
    projectTitle: projects.find((entry) => entry.id === record.projectId)?.title || record.projectId,
    settlementStatus: getSettlementStatus(record.id),
    routingRecords: getRevenueRouting(record.assetId)
  }));

  const blockedFinancialActions = executionPolicies
    .filter((policy) => financialActionIds.has(policy.action) || policy.treasuryApprovalRequired)
    .map((policy) => ({
      id: policy.action,
      action: policy.action,
      mode: policy.mode,
      reason: policy.reason,
      governanceRequired: policy.governanceRequired,
      treasuryApprovalRequired: policy.treasuryApprovalRequired,
      humanReviewRequired: policy.humanReviewRequired
    }));

  const treasuryRestrictions = exposureByProject.flatMap((project) =>
    project.restrictions.map((restriction) => ({
      ...restriction,
      id: restriction.id,
      title: project.title,
      riskTier: project.riskTier
    }))
  );
  const totalApprovedExposure = sumBy(treasuryExposures, (record) => record.approvedAmount);
  const totalConsumedExposure = sumBy(treasuryExposures, (record) => record.consumedAmount);
  const totalNetRevenue = sumBy(revenueRecords, (record) => record.netAmount);
  const averageReadiness = exposureByProject.length
    ? Math.round(sumBy(exposureByProject, (record) => record.readinessScore) / exposureByProject.length)
    : 100;

  return {
    summary: {
      totalTreasuryExposure: totalApprovedExposure,
      totalConsumedExposure,
      totalRequestedExposure: sumBy(treasuryExposures, (record) => record.requestedAmount),
      totalRevenue: totalNetRevenue,
      fundingRecords: fundingRecords.length,
      debentures: debentures.length,
      convertibleDebentures: debentures.filter((record) => record.convertible).length,
      nonConvertibleDebentures: debentures.filter((record) => !record.convertible).length,
      restrictions: treasuryRestrictions.length,
      blockedFinancialActions: blockedFinancialActions.length,
      financialReadinessScore: averageReadiness,
      currency: 'USD'
    },
    exposureByRiskTier,
    exposureByProject,
    fundingEligibilityRows,
    debenturePlanningRows,
    revenueRoutingRows,
    revenueRoutingSummary: {
      grossAmount: sumBy(revenueRecords, (record) => record.grossAmount),
      netAmount: totalNetRevenue,
      treasuryShare: sumBy(revenueRecords, (record) => record.treasuryShare),
      daoShare: sumBy(revenueRecords, (record) => record.daoShare),
      builderShare: sumBy(revenueRecords, (record) => record.builderShare),
      maintainerShare: sumBy(revenueRecords, (record) => record.maintainerShare),
      debentureShare: sumBy(revenueRecords, (record) => record.debentureShare),
      reserveShare: sumBy(revenueRecords, (record) => record.reserveShare)
    },
    treasuryRestrictions,
    blockedFinancialActions,
    freezeStatus: treasuryAdapter.getTreasuryFreezeStatus(),
    mock: true,
    readOnly: true
  };
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
  getFinanceRiskModel: createFinanceRiskModel,
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
