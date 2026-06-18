import { businessRuntimeMock } from "../data/business.mock.js";
import type {
  ACSOrchestrationReceipt,
  ACSRuntime,
  BusinessId,
  BusinessIdentity,
  BusinessProject,
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
import type { RiskTier } from "../types/business.enums.js";

export interface BusinessRegistryIndexes {
  requestsById: Map<BusinessId, BusinessRequest>;
  projectsById: Map<BusinessId, BusinessProject>;
  assetsById: Map<BusinessId, OperationalAsset>;
  fundingById: Map<BusinessId, FundingRecord>;
  debenturesById: Map<BusinessId, DebentureRecord>;
  treasuryExposuresById: Map<BusinessId, TreasuryExposure>;
  revenueById: Map<BusinessId, RevenueRecord>;
  acsRuntimesById: Map<BusinessId, ACSRuntime>;
  acsReceiptsById: Map<BusinessId, ACSOrchestrationReceipt>;
  federationParticipantsById: Map<BusinessId, FederationParticipant>;
  identitiesById: Map<BusinessId, BusinessIdentity>;
  pluginsById: Map<BusinessId, PluginRecord>;
  telemetryById: Map<BusinessId, TelemetryEvent>;
  projectsByRequestId: Map<BusinessId, BusinessProject[]>;
  projectsByOwnerId: Map<BusinessId, BusinessProject[]>;
  assetsByProjectId: Map<BusinessId, OperationalAsset[]>;
  assetsByOwnerId: Map<BusinessId, OperationalAsset[]>;
  fundingByProjectId: Map<BusinessId, FundingRecord[]>;
  treasuryByProjectId: Map<BusinessId, TreasuryExposure[]>;
  revenueByProjectId: Map<BusinessId, RevenueRecord[]>;
  pluginsByProjectId: Map<BusinessId, PluginRecord[]>;
  pluginsByDaoId: Map<BusinessId, PluginRecord[]>;
  acsByProjectId: Map<BusinessId, ACSRuntime[]>;
  acsReceiptsByRuntimeId: Map<BusinessId, ACSOrchestrationReceipt[]>;
  telemetryByProjectId: Map<BusinessId, TelemetryEvent[]>;
  federationByIdentityId: Map<BusinessId, FederationParticipant[]>;
  projectsByRiskTier: Map<RiskTier, BusinessProject[]>;
}

const mapById = <TRecord extends { id: BusinessId }>(records: TRecord[]): Map<BusinessId, TRecord> =>
  new Map(records.map((record) => [record.id, record]));

const groupBy = <TRecord, TKey extends string>(records: TRecord[], selector: (record: TRecord) => TKey | undefined): Map<TKey, TRecord[]> => {
  const result = new Map<TKey, TRecord[]>();
  for (const record of records) {
    const key = selector(record);
    if (!key) continue;
    result.set(key, [...(result.get(key) ?? []), record]);
  }
  return result;
};

export const createBusinessRegistryIndexes = (): BusinessRegistryIndexes => ({
  requestsById: mapById(businessRuntimeMock.requests),
  projectsById: mapById(businessRuntimeMock.projects),
  assetsById: mapById(businessRuntimeMock.assets),
  fundingById: mapById(businessRuntimeMock.fundingRecords),
  debenturesById: mapById(businessRuntimeMock.debentures),
  treasuryExposuresById: mapById(businessRuntimeMock.treasuryExposures),
  revenueById: mapById(businessRuntimeMock.revenueRecords),
  acsRuntimesById: mapById(businessRuntimeMock.acsRuntimes),
  acsReceiptsById: mapById(businessRuntimeMock.acsReceipts),
  federationParticipantsById: mapById(businessRuntimeMock.federationParticipants),
  identitiesById: mapById(businessRuntimeMock.identities),
  pluginsById: mapById(businessRuntimeMock.plugins),
  telemetryById: mapById(businessRuntimeMock.telemetryEvents),
  projectsByRequestId: groupBy(businessRuntimeMock.projects, (record) => record.requestId),
  projectsByOwnerId: groupBy(businessRuntimeMock.projects, (record) => record.ownerId),
  assetsByProjectId: groupBy(businessRuntimeMock.assets, (record) => record.projectId),
  assetsByOwnerId: groupBy(businessRuntimeMock.assets, (record) => record.ownerId),
  fundingByProjectId: groupBy(businessRuntimeMock.fundingRecords, (record) => record.projectId),
  treasuryByProjectId: groupBy(businessRuntimeMock.treasuryExposures, (record) => record.projectId),
  revenueByProjectId: groupBy(businessRuntimeMock.revenueRecords, (record) => record.projectId),
  pluginsByProjectId: groupBy(businessRuntimeMock.plugins, (record) => record.projectId),
  pluginsByDaoId: groupBy(businessRuntimeMock.plugins, (record) => record.targetDaoId),
  acsByProjectId: groupBy(businessRuntimeMock.acsRuntimes, (record) => record.relatedProjectId),
  acsReceiptsByRuntimeId: groupBy(businessRuntimeMock.acsReceipts, (record) => record.acsRuntimeId),
  telemetryByProjectId: groupBy(businessRuntimeMock.telemetryEvents, (record) => record.relatedProjectId),
  federationByIdentityId: groupBy(businessRuntimeMock.federationParticipants, (record) => record.identityId),
  projectsByRiskTier: groupBy(businessRuntimeMock.projects, (record) => record.riskTier)
});
