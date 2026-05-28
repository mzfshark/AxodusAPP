import { businessRuntimeMock } from "../data/business.mock.js";
import type {
  ACSOrchestrationReceipt,
  ACSRuntime,
  BusinessId,
  BusinessIdentity,
  BusinessProject,
  BusinessProjectRuntimeView,
  BusinessRequest,
  DebentureRecord,
  FederationParticipant,
  FundingRecord,
  OperationalAsset,
  PluginRecord,
  RevenueRecord,
  TelemetryEvent,
  TreasuryExposure
} from "../types/business.types.js";

const clone = <T>(value: T): T => structuredClone(value);
const findById = <T extends { id: BusinessId }>(records: T[], id: BusinessId): T | undefined => records.find((record) => record.id === id);

export const getBusinessRequestById = (requestId: BusinessId): BusinessRequest | undefined => clone(findById(businessRuntimeMock.requests, requestId));
export const getBusinessProjectById = (projectId: BusinessId): BusinessProject | undefined => clone(findById(businessRuntimeMock.projects, projectId));
export const getOperationalAssetById = (assetId: BusinessId): OperationalAsset | undefined => clone(findById(businessRuntimeMock.assets, assetId));
export const getFederationParticipantById = (participantId: BusinessId): FederationParticipant | undefined => clone(findById(businessRuntimeMock.federationParticipants, participantId));
export const getBusinessIdentityById = (identityId: BusinessId): BusinessIdentity | undefined => clone(findById(businessRuntimeMock.identities, identityId));
export const getPluginRecordById = (pluginId: BusinessId): PluginRecord | undefined => clone(findById(businessRuntimeMock.plugins, pluginId));
export const getFundingRecordById = (fundingId: BusinessId): FundingRecord | undefined => clone(findById(businessRuntimeMock.fundingRecords, fundingId));
export const getDebentureRecordById = (debentureId: BusinessId): DebentureRecord | undefined => clone(findById(businessRuntimeMock.debentures, debentureId));
export const getTreasuryExposureById = (exposureId: BusinessId): TreasuryExposure | undefined => clone(findById(businessRuntimeMock.treasuryExposures, exposureId));
export const getRevenueRecordById = (revenueId: BusinessId): RevenueRecord | undefined => clone(findById(businessRuntimeMock.revenueRecords, revenueId));
export const getACSRuntimeById = (runtimeId: BusinessId): ACSRuntime | undefined => clone(findById(businessRuntimeMock.acsRuntimes, runtimeId));
export const getACSOrchestrationReceiptById = (receiptId: BusinessId): ACSOrchestrationReceipt | undefined => clone(findById(businessRuntimeMock.acsReceipts, receiptId));
export const getTelemetryEventById = (eventId: BusinessId): TelemetryEvent | undefined => clone(findById(businessRuntimeMock.telemetryEvents, eventId));

export const listProjectsByRequestId = (requestId: BusinessId): BusinessProject[] =>
  clone(businessRuntimeMock.projects.filter((project) => project.requestId === requestId));

export const listAssetsByOwnerId = (ownerId: BusinessId): OperationalAsset[] =>
  clone(businessRuntimeMock.assets.filter((asset) => asset.ownerId === ownerId));

export const listTelemetryEventsByProjectId = (projectId: BusinessId): TelemetryEvent[] =>
  clone(businessRuntimeMock.telemetryEvents.filter((event) => event.relatedProjectId === projectId));

export const getBusinessProjectRuntimeView = (projectId: BusinessId): BusinessProjectRuntimeView | undefined => {
  const project = findById(businessRuntimeMock.projects, projectId);
  if (!project) {
    return undefined;
  }

  const funding = findById(businessRuntimeMock.fundingRecords, project.fundingId);

  return clone({
    project,
    request: findById(businessRuntimeMock.requests, project.requestId),
    asset: findById(businessRuntimeMock.assets, project.assetId),
    funding,
    debenture: funding?.debentureId ? findById(businessRuntimeMock.debentures, funding.debentureId) : undefined,
    treasuryExposures: businessRuntimeMock.treasuryExposures.filter((exposure) => exposure.projectId === projectId),
    revenueRecords: businessRuntimeMock.revenueRecords.filter((revenue) => revenue.projectId === projectId),
    plugins: businessRuntimeMock.plugins.filter((plugin) => plugin.projectId === projectId),
    acsRuntimes: businessRuntimeMock.acsRuntimes.filter((runtime) => runtime.relatedProjectId === projectId),
    acsReceipts: businessRuntimeMock.acsReceipts.filter((receipt) => receipt.relatedProjectId === projectId),
    telemetryEvents: businessRuntimeMock.telemetryEvents.filter((event) => event.relatedProjectId === projectId)
  });
};
