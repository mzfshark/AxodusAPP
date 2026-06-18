import {
  BUSINESS_ACTIVE_STATUS_GROUPS,
  BUSINESS_DEFAULT_CURRENCY,
  BUSINESS_NON_EXECUTION_FLAGS
} from "../constants/business.constants.js";
import { getCapabilityMatrixSummary } from "../capabilities/business.capability-matrix.js";
import { businessRuntimeMock } from "../data/business.mock.js";
import { getBusinessEventSummary } from "../events/business.event-selectors.js";
import { getPermissionMatrixSummary } from "../permissions/business.permission-matrix.js";
import { getExecutionPolicySummary } from "../policies/business.execution-policy.js";
import { getSecurityValidatorStatus } from "../security/business.security-validators.js";
import type {
  ACSRuntime,
  BusinessIdentity,
  BusinessProject,
  BusinessRequest,
  BusinessRuntimeDataset,
  BusinessRuntimeSummary,
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

const countBy = <T, K extends keyof T>(records: T[], field: K): Record<string, number> =>
  records.reduce<Record<string, number>>((acc, record) => {
    const key = String(record[field]);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

const includesStatus = <T extends string>(statuses: readonly T[], status: T): boolean => statuses.includes(status);

export const getBusinessRuntimeDataset = (): BusinessRuntimeDataset => clone(businessRuntimeMock);

export const listBusinessRequests = (): BusinessRequest[] => clone(businessRuntimeMock.requests);
export const listBusinessProjects = (): BusinessProject[] => clone(businessRuntimeMock.projects);
export const listOperationalAssets = (): OperationalAsset[] => clone(businessRuntimeMock.assets);
export const listFederationParticipants = (): FederationParticipant[] => clone(businessRuntimeMock.federationParticipants);
export const listBusinessIdentities = (): BusinessIdentity[] => clone(businessRuntimeMock.identities);
export const listPluginRecords = (): PluginRecord[] => clone(businessRuntimeMock.plugins);
export const listFundingRecords = (): FundingRecord[] => clone(businessRuntimeMock.fundingRecords);
export const listDebentureRecords = (): DebentureRecord[] => clone(businessRuntimeMock.debentures);
export const listTreasuryExposures = (): TreasuryExposure[] => clone(businessRuntimeMock.treasuryExposures);
export const listRevenueRecords = (): RevenueRecord[] => clone(businessRuntimeMock.revenueRecords);
export const listACSRuntimes = (): ACSRuntime[] => clone(businessRuntimeMock.acsRuntimes);
export const listTelemetryEvents = (): TelemetryEvent[] => clone(businessRuntimeMock.telemetryEvents);

export const getBusinessRuntimeSummary = (): BusinessRuntimeSummary => {
  const treasuryRecords = businessRuntimeMock.treasuryExposures.filter((record) => includesStatus(BUSINESS_ACTIVE_STATUS_GROUPS.treasuryExposures, record.status));
  const revenueRecords = businessRuntimeMock.revenueRecords;
  const eventSummary = getBusinessEventSummary();

  return {
    activeRequests: businessRuntimeMock.requests.filter((record) => includesStatus(BUSINESS_ACTIVE_STATUS_GROUPS.requests, record.status)).length,
    activeProjects: businessRuntimeMock.projects.filter((record) => includesStatus(BUSINESS_ACTIVE_STATUS_GROUPS.projects, record.status)).length,
    operationalAssets: businessRuntimeMock.assets.filter((record) => includesStatus(BUSINESS_ACTIVE_STATUS_GROUPS.assets, record.status)).length,
    treasuryExposure: {
      activeRecords: treasuryRecords.length,
      approvedAmount: treasuryRecords.reduce((sum, record) => sum + record.approvedAmount, 0),
      consumedAmount: treasuryRecords.reduce((sum, record) => sum + record.consumedAmount, 0),
      currency: BUSINESS_DEFAULT_CURRENCY
    },
    fundingStatusCounts: countBy(businessRuntimeMock.fundingRecords, "status"),
    debentureStatusCounts: countBy(businessRuntimeMock.debentures, "status"),
    revenueStatus: {
      records: revenueRecords.length,
      grossAmount: revenueRecords.reduce((sum, record) => sum + record.grossAmount, 0),
      netAmount: revenueRecords.reduce((sum, record) => sum + record.netAmount, 0),
      currency: BUSINESS_DEFAULT_CURRENCY
    },
    acsRuntimeStatusCounts: countBy(businessRuntimeMock.acsRuntimes, "status"),
    telemetrySeverityCounts: countBy(businessRuntimeMock.telemetryEvents, "severity"),
    riskTierDistribution: countBy(businessRuntimeMock.projects, "riskTier"),
    nonExecutionMode: Object.values(BUSINESS_NON_EXECUTION_FLAGS).every((enabled) => enabled === false),
    capabilitySummary: getCapabilityMatrixSummary(),
    permissionSummary: getPermissionMatrixSummary(),
    executionPolicySummary: getExecutionPolicySummary(),
    contractStatus: {
      governance: "MOCK_READ_ONLY",
      treasury: "MOCK_READ_ONLY",
      financial: "MOCK_READ_ONLY",
      debenture: "MOCK_READ_ONLY",
      acs: "MOCK_READ_ONLY",
      identity: "MOCK_READ_ONLY"
    },
    securityValidatorStatus: getSecurityValidatorStatus(),
    eventSummary: {
      totalEvents: eventSummary.totalEvents,
      criticalEvents: eventSummary.criticalEvents,
      byType: eventSummary.byType,
      bySeverity: eventSummary.bySeverity,
      bySource: eventSummary.bySource,
      mock: true,
      readOnly: true
    }
  };
};
