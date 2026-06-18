import {
  AssetStatus,
  DebentureStatus,
  ProjectStatus,
  RequestStatus,
  RiskTier,
  TreasuryExposureStatus
} from "../types/business.enums.js";

export const BUSINESS_RUNTIME_MODE = "MOCK_READ_ONLY" as const;

export const BUSINESS_NON_EXECUTION_FLAGS = {
  governanceExecutionEnabled: false,
  treasuryMovementEnabled: false,
  debentureIssuanceEnabled: false,
  paymentExecutionEnabled: false,
  revenueDistributionEnabled: false,
  acsProvisioningEnabled: false,
  contractCallsEnabled: false,
  enterpriseBillingEnabled: false,
  identityVerificationEnabled: false
} as const;

export const BUSINESS_ROUTE_CATALOG = {
  requests: "/business/requests",
  projects: "/business/projects",
  assets: "/business/assets",
  federation: "/business/federation",
  identities: "/business/identities",
  plugins: "/business/plugins",
  funding: "/business/funding",
  debentures: "/business/debentures",
  treasuryExposure: "/business/treasury/exposure",
  revenue: "/business/revenue",
  acsRuntimes: "/business/acs/runtimes",
  acsReceipts: "/business/acs/receipts",
  acsBridge: "/business/acs/bridge",
  telemetryEvents: "/business/telemetry/events",
  telemetrySummary: "/business/telemetry/summary",
  runtime: "/business/runtime",
  drafts: "/business/drafts",
  draftStore: "/business/draft-store",
  draftReadiness: "/business/drafts/readiness",
  submissions: "/business/submissions",
  reviewQueue: "/business/review-queue",
  governanceBridge: "/business/governance/bridge",
  financialBridge: "/business/finance/bridge",
  audit: "/business/audit",
  snapshots: "/business/snapshots"
} as const;

export const BUSINESS_ACTIVE_STATUS_GROUPS = {
  requests: [
    RequestStatus.SUBMITTED,
    RequestStatus.CLASSIFYING,
    RequestStatus.UNDER_REVIEW,
    RequestStatus.GOVERNANCE_REVIEW,
    RequestStatus.FUNDING_REVIEW,
    RequestStatus.APPROVED,
    RequestStatus.IN_EXECUTION
  ],
  projects: [
    ProjectStatus.EVALUATING,
    ProjectStatus.GOVERNANCE_REVIEW,
    ProjectStatus.FUNDING_PENDING,
    ProjectStatus.APPROVED,
    ProjectStatus.DEVELOPMENT,
    ProjectStatus.TESTING,
    ProjectStatus.DEPLOYED,
    ProjectStatus.ACTIVE,
    ProjectStatus.MAINTENANCE,
    ProjectStatus.DEGRADED
  ],
  assets: [
    AssetStatus.APPROVED,
    AssetStatus.DEVELOPMENT,
    AssetStatus.TESTING,
    AssetStatus.DEPLOYED,
    AssetStatus.ACTIVE,
    AssetStatus.MAINTENANCE,
    AssetStatus.DEGRADED
  ],
  debentures: [
    DebentureStatus.GOVERNANCE_REVIEW,
    DebentureStatus.ISSUANCE_APPROVAL,
    DebentureStatus.ACTIVE_OFFERING,
    DebentureStatus.FUNDED,
    DebentureStatus.EXECUTING,
    DebentureStatus.REVENUE_PHASE,
    DebentureStatus.REPAYMENT
  ],
  treasuryExposures: [
    TreasuryExposureStatus.APPROVED,
    TreasuryExposureStatus.ALLOCATED,
    TreasuryExposureStatus.ACTIVE,
    TreasuryExposureStatus.CONSUMING,
    TreasuryExposureStatus.REVENUE_PHASE
  ]
} as const;

export const BUSINESS_RISK_LABELS: Record<RiskTier, string> = {
  [RiskTier.TIER_1_CRITICAL_INFRASTRUCTURE]: "Tier 1 - Critical Infrastructure",
  [RiskTier.TIER_2_ECOSYSTEM_STRATEGIC]: "Tier 2 - Ecosystem Strategic",
  [RiskTier.TIER_3_REVENUE_GENERATING]: "Tier 3 - Revenue Generating",
  [RiskTier.TIER_4_EXPERIMENTAL]: "Tier 4 - Experimental",
  [RiskTier.TIER_5_VENTURE_RISK]: "Tier 5 - Venture Risk"
};

export const BUSINESS_DEFAULT_CURRENCY = "USD";
