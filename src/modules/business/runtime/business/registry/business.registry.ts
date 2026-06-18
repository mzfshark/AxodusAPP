import { getBusinessRuntimeEvents } from "../events/business.events.js";
import type { BusinessRuntimeEvent } from "../events/business.event-types.js";
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
import { createBusinessRegistryIndexes, type BusinessRegistryIndexes } from "./business.registry-indexes.js";

export interface BusinessProjectRegistryView {
  project: BusinessProject;
  request?: BusinessRequest;
  owner?: BusinessIdentity;
  asset?: OperationalAsset;
  funding?: FundingRecord;
  debenture?: DebentureRecord;
  treasuryExposures: TreasuryExposure[];
  revenueRecords: RevenueRecord[];
  plugins: PluginRecord[];
  acsRuntimes: ACSRuntime[];
  acsReceipts: ACSOrchestrationReceipt[];
  telemetryEvents: TelemetryEvent[];
  runtimeEvents: BusinessRuntimeEvent[];
  mock: true;
  readOnly: true;
}

export interface BusinessAssetRegistryView {
  asset: OperationalAsset;
  project?: BusinessProject;
  owner?: BusinessIdentity;
  funding?: FundingRecord;
  treasuryExposures: TreasuryExposure[];
  revenueRecords: RevenueRecord[];
  plugins: PluginRecord[];
  telemetryEvents: TelemetryEvent[];
  runtimeEvents: BusinessRuntimeEvent[];
  mock: true;
  readOnly: true;
}

export interface BusinessIdentityRegistryView {
  identity: BusinessIdentity;
  requests: BusinessRequest[];
  projects: BusinessProject[];
  assets: OperationalAsset[];
  federationParticipants: FederationParticipant[];
  plugins: PluginRecord[];
  acsRuntimes: ACSRuntime[];
  mock: true;
  readOnly: true;
}

export interface BusinessFundingRegistryView {
  funding: FundingRecord;
  project?: BusinessProject;
  asset?: OperationalAsset;
  debenture?: DebentureRecord;
  treasuryExposure?: TreasuryExposure;
  revenueRecords: RevenueRecord[];
  runtimeEvents: BusinessRuntimeEvent[];
  mock: true;
  readOnly: true;
}

export interface BusinessTreasuryExposureRegistryView {
  treasuryExposure: TreasuryExposure;
  project?: BusinessProject;
  asset?: OperationalAsset;
  fundingRecords: FundingRecord[];
  revenueRecords: RevenueRecord[];
  runtimeEvents: BusinessRuntimeEvent[];
  mock: true;
  readOnly: true;
}

export interface BusinessACSRuntimeRegistryView {
  acsRuntime: ACSRuntime;
  owner?: BusinessIdentity;
  project?: BusinessProject;
  receipts: ACSOrchestrationReceipt[];
  telemetryEvents: TelemetryEvent[];
  runtimeEvents: BusinessRuntimeEvent[];
  mock: true;
  readOnly: true;
}

export interface BusinessRiskTierRegistryView {
  riskTier: string;
  projects: BusinessProject[];
  assets: OperationalAsset[];
  fundingRecords: FundingRecord[];
  treasuryExposures: TreasuryExposure[];
  debentures: DebentureRecord[];
  runtimeEvents: BusinessRuntimeEvent[];
  mock: true;
  readOnly: true;
}

export interface BusinessRegistrySummary {
  totalRequests: number;
  totalProjects: number;
  totalAssets: number;
  totalFundingRecords: number;
  totalDebentures: number;
  totalTreasuryExposures: number;
  totalRevenueRecords: number;
  totalACSRuntimes: number;
  totalFederationParticipants: number;
  totalTelemetryEvents: number;
  totalRuntimeEvents: number;
  relationshipEdges: number;
  mock: true;
  readOnly: true;
}

export interface BusinessRegistry {
  indexes: BusinessRegistryIndexes;
  runtimeEvents: BusinessRuntimeEvent[];
  summary: BusinessRegistrySummary;
  mock: true;
  readOnly: true;
}

const countMapEdges = <T>(map: Map<string, T[]>): number =>
  [...map.values()].reduce((sum, records) => sum + records.length, 0);

const createSummary = (indexes: BusinessRegistryIndexes, runtimeEvents: BusinessRuntimeEvent[]): BusinessRegistrySummary => ({
  totalRequests: indexes.requestsById.size,
  totalProjects: indexes.projectsById.size,
  totalAssets: indexes.assetsById.size,
  totalFundingRecords: indexes.fundingById.size,
  totalDebentures: indexes.debenturesById.size,
  totalTreasuryExposures: indexes.treasuryExposuresById.size,
  totalRevenueRecords: indexes.revenueById.size,
  totalACSRuntimes: indexes.acsRuntimesById.size,
  totalFederationParticipants: indexes.federationParticipantsById.size,
  totalTelemetryEvents: indexes.telemetryById.size,
  totalRuntimeEvents: runtimeEvents.length,
  relationshipEdges:
    countMapEdges(indexes.projectsByRequestId) +
    countMapEdges(indexes.assetsByProjectId) +
    countMapEdges(indexes.fundingByProjectId) +
    countMapEdges(indexes.treasuryByProjectId) +
    countMapEdges(indexes.revenueByProjectId) +
    countMapEdges(indexes.pluginsByProjectId) +
    countMapEdges(indexes.acsByProjectId) +
    countMapEdges(indexes.telemetryByProjectId),
  mock: true,
  readOnly: true
});

export const createBusinessRegistry = (): BusinessRegistry => {
  const indexes = createBusinessRegistryIndexes();
  const runtimeEvents = getBusinessRuntimeEvents();

  return {
    indexes,
    runtimeEvents,
    summary: createSummary(indexes, runtimeEvents),
    mock: true,
    readOnly: true
  };
};

export const cloneRegistryView = <T>(value: T): T | undefined => (value === undefined ? undefined : structuredClone(value));

export const eventsForProject = (registry: BusinessRegistry, projectId: BusinessId): BusinessRuntimeEvent[] =>
  registry.runtimeEvents.filter((event) => event.relatedProjectId === projectId);
