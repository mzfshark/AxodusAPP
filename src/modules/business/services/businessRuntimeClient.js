import {
  businessApiHandlers,
  getBusinessDashboardModel,
  getBusinessRuntimeCoreSummary,
  selectBusinessProjectById
} from '@axodus/business-runtime';

const assertReadOnlyEnvelope = (response) => {
  if (!response?.meta?.mock || !response?.meta?.readOnly || response?.runtime?.executionMode !== 'MOCK_READ_ONLY') {
    throw new Error('Business runtime response is not mock/read-only.');
  }

  return response;
};

const dataFrom = (handler) => assertReadOnlyEnvelope(handler()).data;

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
  getReadOnlyMeta: () => assertReadOnlyEnvelope(businessApiHandlers.getBusinessOverview()).meta
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
