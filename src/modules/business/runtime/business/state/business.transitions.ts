import {
  ACSRuntimeStatus,
  AssetStatus,
  DebentureStatus,
  FundingStatus,
  PluginStatus,
  ProjectStatus,
  RequestStatus,
  RevenueStatus,
  TreasuryExposureStatus
} from "../types/business.enums.js";
import type { BusinessStateMachineDomain } from "./business.transition-errors.js";

export type BusinessTransitionMap<TStatus extends string> = Record<TStatus, readonly TStatus[]>;

export const REQUEST_TRANSITIONS: BusinessTransitionMap<RequestStatus> = {
  [RequestStatus.DRAFT]: [RequestStatus.SUBMITTED, RequestStatus.ARCHIVED],
  [RequestStatus.SUBMITTED]: [RequestStatus.CLASSIFYING, RequestStatus.UNDER_REVIEW, RequestStatus.REJECTED],
  [RequestStatus.CLASSIFYING]: [RequestStatus.UNDER_REVIEW, RequestStatus.GOVERNANCE_REVIEW, RequestStatus.FUNDING_REVIEW, RequestStatus.REJECTED],
  [RequestStatus.UNDER_REVIEW]: [RequestStatus.GOVERNANCE_REVIEW, RequestStatus.FUNDING_REVIEW, RequestStatus.APPROVED, RequestStatus.REJECTED],
  [RequestStatus.GOVERNANCE_REVIEW]: [RequestStatus.FUNDING_REVIEW, RequestStatus.APPROVED, RequestStatus.REJECTED],
  [RequestStatus.FUNDING_REVIEW]: [RequestStatus.APPROVED, RequestStatus.REJECTED],
  [RequestStatus.APPROVED]: [RequestStatus.IN_EXECUTION, RequestStatus.ARCHIVED],
  [RequestStatus.REJECTED]: [RequestStatus.ARCHIVED],
  [RequestStatus.IN_EXECUTION]: [RequestStatus.COMPLETED, RequestStatus.ARCHIVED],
  [RequestStatus.COMPLETED]: [RequestStatus.ARCHIVED],
  [RequestStatus.ARCHIVED]: []
};

export const PROJECT_TRANSITIONS: BusinessTransitionMap<ProjectStatus> = {
  [ProjectStatus.PROPOSED]: [ProjectStatus.EVALUATING, ProjectStatus.ARCHIVED],
  [ProjectStatus.EVALUATING]: [ProjectStatus.GOVERNANCE_REVIEW, ProjectStatus.FUNDING_PENDING, ProjectStatus.APPROVED, ProjectStatus.ARCHIVED],
  [ProjectStatus.GOVERNANCE_REVIEW]: [ProjectStatus.FUNDING_PENDING, ProjectStatus.APPROVED, ProjectStatus.ARCHIVED],
  [ProjectStatus.FUNDING_PENDING]: [ProjectStatus.APPROVED, ProjectStatus.ARCHIVED],
  [ProjectStatus.APPROVED]: [ProjectStatus.DEVELOPMENT, ProjectStatus.ARCHIVED],
  [ProjectStatus.DEVELOPMENT]: [ProjectStatus.TESTING, ProjectStatus.DEGRADED, ProjectStatus.ARCHIVED],
  [ProjectStatus.TESTING]: [ProjectStatus.DEPLOYED, ProjectStatus.DEVELOPMENT, ProjectStatus.ARCHIVED],
  [ProjectStatus.DEPLOYED]: [ProjectStatus.ACTIVE, ProjectStatus.MAINTENANCE, ProjectStatus.ARCHIVED],
  [ProjectStatus.ACTIVE]: [ProjectStatus.MAINTENANCE, ProjectStatus.DEGRADED, ProjectStatus.SUNSET],
  [ProjectStatus.MAINTENANCE]: [ProjectStatus.ACTIVE, ProjectStatus.DEGRADED, ProjectStatus.SUNSET],
  [ProjectStatus.DEGRADED]: [ProjectStatus.MAINTENANCE, ProjectStatus.SUNSET, ProjectStatus.ARCHIVED],
  [ProjectStatus.SUNSET]: [ProjectStatus.ARCHIVED],
  [ProjectStatus.ARCHIVED]: []
};

export const ASSET_TRANSITIONS: BusinessTransitionMap<AssetStatus> = {
  [AssetStatus.PROPOSED]: [AssetStatus.UNDER_REVIEW, AssetStatus.ARCHIVED],
  [AssetStatus.UNDER_REVIEW]: [AssetStatus.FUNDING_PENDING, AssetStatus.APPROVED, AssetStatus.ARCHIVED],
  [AssetStatus.FUNDING_PENDING]: [AssetStatus.APPROVED, AssetStatus.ARCHIVED],
  [AssetStatus.APPROVED]: [AssetStatus.DEVELOPMENT, AssetStatus.ARCHIVED],
  [AssetStatus.DEVELOPMENT]: [AssetStatus.TESTING, AssetStatus.DEGRADED, AssetStatus.ARCHIVED],
  [AssetStatus.TESTING]: [AssetStatus.DEPLOYED, AssetStatus.DEVELOPMENT, AssetStatus.ARCHIVED],
  [AssetStatus.DEPLOYED]: [AssetStatus.ACTIVE, AssetStatus.MAINTENANCE, AssetStatus.ARCHIVED],
  [AssetStatus.ACTIVE]: [AssetStatus.MAINTENANCE, AssetStatus.DEGRADED, AssetStatus.SUNSET],
  [AssetStatus.MAINTENANCE]: [AssetStatus.ACTIVE, AssetStatus.DEGRADED, AssetStatus.SUNSET],
  [AssetStatus.DEGRADED]: [AssetStatus.MAINTENANCE, AssetStatus.SUNSET, AssetStatus.ARCHIVED],
  [AssetStatus.SUNSET]: [AssetStatus.ARCHIVED],
  [AssetStatus.ARCHIVED]: []
};

export const FUNDING_TRANSITIONS: BusinessTransitionMap<FundingStatus> = {
  [FundingStatus.DRAFT]: [FundingStatus.GOVERNANCE_REVIEW, FundingStatus.TREASURY_ANALYSIS, FundingStatus.ARCHIVED],
  [FundingStatus.GOVERNANCE_REVIEW]: [FundingStatus.TREASURY_ANALYSIS, FundingStatus.APPROVAL, FundingStatus.ARCHIVED],
  [FundingStatus.TREASURY_ANALYSIS]: [FundingStatus.APPROVAL, FundingStatus.ARCHIVED],
  [FundingStatus.APPROVAL]: [FundingStatus.FUNDING_ACTIVE, FundingStatus.ARCHIVED],
  [FundingStatus.FUNDING_ACTIVE]: [FundingStatus.EXECUTION, FundingStatus.REVENUE_PHASE, FundingStatus.ARCHIVED],
  [FundingStatus.EXECUTION]: [FundingStatus.REVENUE_PHASE, FundingStatus.SETTLEMENT, FundingStatus.ARCHIVED],
  [FundingStatus.REVENUE_PHASE]: [FundingStatus.SETTLEMENT, FundingStatus.CLOSED],
  [FundingStatus.SETTLEMENT]: [FundingStatus.CLOSED],
  [FundingStatus.CLOSED]: [FundingStatus.ARCHIVED],
  [FundingStatus.ARCHIVED]: []
};

export const DEBENTURE_TRANSITIONS: BusinessTransitionMap<DebentureStatus> = {
  [DebentureStatus.DRAFT]: [DebentureStatus.GOVERNANCE_REVIEW, DebentureStatus.ARCHIVED],
  [DebentureStatus.GOVERNANCE_REVIEW]: [DebentureStatus.ISSUANCE_APPROVAL, DebentureStatus.ARCHIVED],
  [DebentureStatus.ISSUANCE_APPROVAL]: [DebentureStatus.ACTIVE_OFFERING, DebentureStatus.ARCHIVED],
  [DebentureStatus.ACTIVE_OFFERING]: [DebentureStatus.FUNDED, DebentureStatus.DEFAULTED, DebentureStatus.ARCHIVED],
  [DebentureStatus.FUNDED]: [DebentureStatus.EXECUTING, DebentureStatus.DEFAULTED],
  [DebentureStatus.EXECUTING]: [DebentureStatus.REVENUE_PHASE, DebentureStatus.DEFAULTED],
  [DebentureStatus.REVENUE_PHASE]: [DebentureStatus.REPAYMENT, DebentureStatus.DEFAULTED],
  [DebentureStatus.REPAYMENT]: [DebentureStatus.COMPLETED, DebentureStatus.DEFAULTED],
  [DebentureStatus.COMPLETED]: [DebentureStatus.ARCHIVED],
  [DebentureStatus.DEFAULTED]: [DebentureStatus.ARCHIVED],
  [DebentureStatus.ARCHIVED]: []
};

export const TREASURY_EXPOSURE_TRANSITIONS: BusinessTransitionMap<TreasuryExposureStatus> = {
  [TreasuryExposureStatus.DRAFT]: [TreasuryExposureStatus.UNDER_REVIEW, TreasuryExposureStatus.ARCHIVED],
  [TreasuryExposureStatus.UNDER_REVIEW]: [TreasuryExposureStatus.APPROVED, TreasuryExposureStatus.FROZEN, TreasuryExposureStatus.ARCHIVED],
  [TreasuryExposureStatus.APPROVED]: [TreasuryExposureStatus.ALLOCATED, TreasuryExposureStatus.FROZEN, TreasuryExposureStatus.ARCHIVED],
  [TreasuryExposureStatus.ALLOCATED]: [TreasuryExposureStatus.ACTIVE, TreasuryExposureStatus.FROZEN, TreasuryExposureStatus.ARCHIVED],
  [TreasuryExposureStatus.ACTIVE]: [TreasuryExposureStatus.CONSUMING, TreasuryExposureStatus.REVENUE_PHASE, TreasuryExposureStatus.FROZEN, TreasuryExposureStatus.DEFAULTED],
  [TreasuryExposureStatus.CONSUMING]: [TreasuryExposureStatus.REVENUE_PHASE, TreasuryExposureStatus.FROZEN, TreasuryExposureStatus.DEFAULTED],
  [TreasuryExposureStatus.REVENUE_PHASE]: [TreasuryExposureStatus.REPAID, TreasuryExposureStatus.CLOSED, TreasuryExposureStatus.DEFAULTED],
  [TreasuryExposureStatus.REPAID]: [TreasuryExposureStatus.CLOSED],
  [TreasuryExposureStatus.CLOSED]: [TreasuryExposureStatus.ARCHIVED],
  [TreasuryExposureStatus.FROZEN]: [TreasuryExposureStatus.UNDER_REVIEW, TreasuryExposureStatus.WRITTEN_OFF, TreasuryExposureStatus.ARCHIVED],
  [TreasuryExposureStatus.DEFAULTED]: [TreasuryExposureStatus.WRITTEN_OFF, TreasuryExposureStatus.ARCHIVED],
  [TreasuryExposureStatus.WRITTEN_OFF]: [TreasuryExposureStatus.ARCHIVED],
  [TreasuryExposureStatus.ARCHIVED]: []
};

export const ACS_RUNTIME_TRANSITIONS: BusinessTransitionMap<ACSRuntimeStatus> = {
  [ACSRuntimeStatus.REQUESTED]: [ACSRuntimeStatus.CLASSIFIED, ACSRuntimeStatus.ARCHIVED],
  [ACSRuntimeStatus.CLASSIFIED]: [ACSRuntimeStatus.GOVERNANCE_CHECK, ACSRuntimeStatus.ISOLATION_DEFINED, ACSRuntimeStatus.ARCHIVED],
  [ACSRuntimeStatus.GOVERNANCE_CHECK]: [ACSRuntimeStatus.ISOLATION_DEFINED, ACSRuntimeStatus.SUSPENDED, ACSRuntimeStatus.ARCHIVED],
  [ACSRuntimeStatus.ISOLATION_DEFINED]: [ACSRuntimeStatus.PROVISIONING, ACSRuntimeStatus.SUSPENDED, ACSRuntimeStatus.ARCHIVED],
  [ACSRuntimeStatus.PROVISIONING]: [ACSRuntimeStatus.ACTIVE, ACSRuntimeStatus.SUSPENDED, ACSRuntimeStatus.ARCHIVED],
  [ACSRuntimeStatus.ACTIVE]: [ACSRuntimeStatus.MONITORED, ACSRuntimeStatus.MAINTENANCE, ACSRuntimeStatus.SUSPENDED],
  [ACSRuntimeStatus.MONITORED]: [ACSRuntimeStatus.MAINTENANCE, ACSRuntimeStatus.SUSPENDED, ACSRuntimeStatus.TERMINATED],
  [ACSRuntimeStatus.MAINTENANCE]: [ACSRuntimeStatus.ACTIVE, ACSRuntimeStatus.MONITORED, ACSRuntimeStatus.SUSPENDED, ACSRuntimeStatus.TERMINATED],
  [ACSRuntimeStatus.SUSPENDED]: [ACSRuntimeStatus.MAINTENANCE, ACSRuntimeStatus.TERMINATED, ACSRuntimeStatus.ARCHIVED],
  [ACSRuntimeStatus.TERMINATED]: [ACSRuntimeStatus.ARCHIVED],
  [ACSRuntimeStatus.ARCHIVED]: []
};

export const REVENUE_TRANSITIONS: BusinessTransitionMap<RevenueStatus> = {
  [RevenueStatus.PENDING]: [RevenueStatus.RECEIVED, RevenueStatus.BLOCKED, RevenueStatus.ARCHIVED],
  [RevenueStatus.RECEIVED]: [RevenueStatus.CLASSIFIED, RevenueStatus.DISPUTED, RevenueStatus.FAILED],
  [RevenueStatus.CLASSIFIED]: [RevenueStatus.ROUTING_APPROVED, RevenueStatus.BLOCKED, RevenueStatus.DISPUTED],
  [RevenueStatus.ROUTING_APPROVED]: [RevenueStatus.SETTLED, RevenueStatus.PARTIAL_SETTLEMENT, RevenueStatus.BLOCKED],
  [RevenueStatus.SETTLED]: [RevenueStatus.DISTRIBUTED, RevenueStatus.CLOSED],
  [RevenueStatus.DISTRIBUTED]: [RevenueStatus.CLOSED],
  [RevenueStatus.CLOSED]: [RevenueStatus.ARCHIVED],
  [RevenueStatus.DISPUTED]: [RevenueStatus.CLASSIFIED, RevenueStatus.BLOCKED, RevenueStatus.FAILED],
  [RevenueStatus.BLOCKED]: [RevenueStatus.CLASSIFIED, RevenueStatus.FAILED, RevenueStatus.ARCHIVED],
  [RevenueStatus.PARTIAL_SETTLEMENT]: [RevenueStatus.SETTLED, RevenueStatus.DISPUTED, RevenueStatus.CLOSED],
  [RevenueStatus.FAILED]: [RevenueStatus.ARCHIVED],
  [RevenueStatus.ARCHIVED]: []
};

export const PLUGIN_TRANSITIONS: BusinessTransitionMap<PluginStatus> = {
  [PluginStatus.PLUGIN_REQUEST]: [PluginStatus.CLASSIFICATION, PluginStatus.ARCHIVED],
  [PluginStatus.CLASSIFICATION]: [PluginStatus.GOVERNANCE_REVIEW, PluginStatus.FUNDING_SELECTION, PluginStatus.ARCHIVED],
  [PluginStatus.GOVERNANCE_REVIEW]: [PluginStatus.FUNDING_SELECTION, PluginStatus.DEVELOPMENT, PluginStatus.ARCHIVED],
  [PluginStatus.FUNDING_SELECTION]: [PluginStatus.DEVELOPMENT, PluginStatus.ARCHIVED],
  [PluginStatus.DEVELOPMENT]: [PluginStatus.TESTING, PluginStatus.ARCHIVED],
  [PluginStatus.TESTING]: [PluginStatus.DEPLOYMENT, PluginStatus.DEVELOPMENT, PluginStatus.ARCHIVED],
  [PluginStatus.DEPLOYMENT]: [PluginStatus.DAO_OPERATIONS, PluginStatus.MAINTENANCE, PluginStatus.ARCHIVED],
  [PluginStatus.DAO_OPERATIONS]: [PluginStatus.MAINTENANCE, PluginStatus.ARCHIVED],
  [PluginStatus.MAINTENANCE]: [PluginStatus.DAO_OPERATIONS, PluginStatus.ARCHIVED],
  [PluginStatus.ARCHIVED]: []
};

export const BUSINESS_TRANSITION_MAPS = {
  REQUEST: REQUEST_TRANSITIONS,
  PROJECT: PROJECT_TRANSITIONS,
  ASSET: ASSET_TRANSITIONS,
  FUNDING: FUNDING_TRANSITIONS,
  DEBENTURE: DEBENTURE_TRANSITIONS,
  TREASURY_EXPOSURE: TREASURY_EXPOSURE_TRANSITIONS,
  ACS_RUNTIME: ACS_RUNTIME_TRANSITIONS,
  REVENUE: REVENUE_TRANSITIONS,
  PLUGIN: PLUGIN_TRANSITIONS
} satisfies Record<BusinessStateMachineDomain, BusinessTransitionMap<string>>;
