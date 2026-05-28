import {
  ACSIsolationProfile,
  ACSRuntimeStatus,
  ACSRuntimeType,
  AssetStatus,
  AssetType,
  DebentureStatus,
  DebentureType,
  FederationLevel,
  FederationStatus,
  FundingStatus,
  FundingType,
  IdentityStatus,
  IdentityType,
  PluginStatus,
  PluginType,
  ProjectStatus,
  ProjectType,
  RequestStatus,
  RequestType,
  RevenueSource,
  RevenueStatus,
  RiskTier,
  TelemetryEventType,
  TelemetrySeverity,
  TreasuryExposureStatus,
  TreasuryExposureType,
  VerificationLevel
} from "./business.enums.js";

export type BusinessId = string;
export type ISODateString = string;

export interface MoneyAmount {
  amount: number;
  currency: string;
}

export interface TelemetryProfile {
  profileId: BusinessId;
  enabled: boolean;
  visibility: "PUBLIC" | "DAO_SCOPED" | "ENTERPRISE_SCOPED" | "INTERNAL";
  requiredEvents: TelemetryEventType[];
}

export interface GovernanceReference {
  proposalId?: BusinessId;
  proposalUrl?: string;
  constitutionalCompatibility: "COMPATIBLE" | "REVIEW_REQUIRED" | "RESTRICTED";
  treasuryRestrictions: string[];
}

export interface RuntimeMilestone {
  id: BusinessId;
  label: string;
  status: "PENDING" | "ACTIVE" | "COMPLETED" | "BLOCKED";
  dueAt?: ISODateString;
}

export interface BusinessRequest {
  id: BusinessId;
  title: string;
  description: string;
  requesterId: BusinessId;
  requesterType: IdentityType;
  requestType: RequestType;
  status: RequestStatus;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  estimatedBudget: MoneyAmount;
  preferredFundingModel: FundingType;
  governanceRequired: boolean;
  treasuryExposureExpected: boolean;
  acsRequired: boolean;
  pluginRequired: boolean;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface BusinessProject {
  id: BusinessId;
  requestId: BusinessId;
  title: string;
  projectType: ProjectType;
  status: ProjectStatus;
  ownerId: BusinessId;
  governanceReference: GovernanceReference;
  fundingId: BusinessId;
  assetId: BusinessId;
  riskTier: RiskTier;
  milestones: RuntimeMilestone[];
  telemetryProfile: TelemetryProfile;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface OperationalAsset {
  id: BusinessId;
  name: string;
  assetType: AssetType;
  ownerType: IdentityType;
  ownerId: BusinessId;
  status: AssetStatus;
  projectId: BusinessId;
  fundingId: BusinessId;
  revenueModel: RevenueSource;
  maintenanceOwner: BusinessId;
  telemetryProfile: TelemetryProfile;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface FederationParticipant {
  id: BusinessId;
  identityId: BusinessId;
  displayName: string;
  level: FederationLevel;
  status: FederationStatus;
  permissions: string[];
  governanceReference?: GovernanceReference;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface BusinessIdentity {
  id: BusinessId;
  identityType: IdentityType;
  displayName: string;
  contactReference?: string;
  walletReference?: string;
  federationLevel: FederationLevel;
  verificationLevel: VerificationLevel;
  status: IdentityStatus;
  serviceScope: string[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface PluginRecord {
  id: BusinessId;
  pluginName: string;
  targetDaoId: BusinessId;
  pluginType: PluginType;
  status: PluginStatus;
  projectId: BusinessId;
  assetId: BusinessId;
  fundingId: BusinessId;
  governanceScope: string;
  executionScope: "MOCK_ONLY" | "READ_ONLY" | "GOVERNANCE_REVIEW_REQUIRED";
  maintenanceOwner: BusinessId;
  telemetryProfile: TelemetryProfile;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface FundingRecord {
  id: BusinessId;
  projectId: BusinessId;
  assetId: BusinessId;
  fundingType: FundingType;
  status: FundingStatus;
  targetAmount: number;
  raisedAmount: number;
  currency: string;
  issuerId: BusinessId;
  treasuryExposureId?: BusinessId;
  debentureId?: BusinessId;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface DebentureRecord {
  id: BusinessId;
  projectId: BusinessId;
  assetId: BusinessId;
  issuerId: BusinessId;
  debentureType: DebentureType;
  convertible: boolean;
  targetAmount: number;
  raisedAmount: number;
  currency: string;
  aprModel: string;
  maturityDate: ISODateString;
  repaymentSource: RevenueSource;
  status: DebentureStatus;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface TreasuryExposure {
  id: BusinessId;
  projectId: BusinessId;
  assetId: BusinessId;
  exposureType: TreasuryExposureType;
  riskTier: RiskTier;
  requestedAmount: number;
  approvedAmount: number;
  consumedAmount: number;
  currency: string;
  treasurySource: string;
  expectedReturn: string;
  repaymentModel: string;
  status: TreasuryExposureStatus;
  governanceReference: GovernanceReference;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface RevenueRecord {
  id: BusinessId;
  projectId: BusinessId;
  assetId: BusinessId;
  source: RevenueSource;
  status: RevenueStatus;
  grossAmount: number;
  netAmount: number;
  currency: string;
  treasuryShare: number;
  daoShare: number;
  builderShare: number;
  maintainerShare: number;
  debentureShare: number;
  reserveShare: number;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface ACSRuntime {
  id: BusinessId;
  ownerId: BusinessId;
  relatedProjectId: BusinessId;
  runtimeType: ACSRuntimeType;
  isolationProfile: ACSIsolationProfile;
  status: ACSRuntimeStatus;
  permissionProfile: string[];
  telemetryProfile: TelemetryProfile;
  computeProfile: {
    mockCpuUnits: number;
    mockMemoryMb: number;
    mockMonthlyBudget: MoneyAmount;
  };
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface ACSOrchestrationReceipt {
  id: BusinessId;
  acsRuntimeId: BusinessId;
  actionType: string;
  relatedProjectId: BusinessId;
  relatedAssetId?: BusinessId;
  relatedRequestId?: BusinessId;
  actor: string;
  timestamp: ISODateString;
  inputReference: string;
  outputReference: string;
  confidenceLevel: number;
  humanReviewRequired: boolean;
  governanceReference?: GovernanceReference;
}

export interface TelemetryEvent {
  id: BusinessId;
  eventType: TelemetryEventType;
  severity: TelemetrySeverity;
  sourceSystem: string;
  relatedProjectId?: BusinessId;
  relatedAssetId?: BusinessId;
  relatedRequestId?: BusinessId;
  relatedDaoId?: BusinessId;
  relatedEnterpriseId?: BusinessId;
  status: string;
  actor: string;
  payload: Record<string, unknown>;
  governanceReference?: GovernanceReference;
  treasuryReference?: BusinessId;
  auditReference: string;
  createdAt: ISODateString;
}

export interface BusinessRuntimeDataset {
  requests: BusinessRequest[];
  projects: BusinessProject[];
  assets: OperationalAsset[];
  federationParticipants: FederationParticipant[];
  identities: BusinessIdentity[];
  plugins: PluginRecord[];
  fundingRecords: FundingRecord[];
  debentures: DebentureRecord[];
  treasuryExposures: TreasuryExposure[];
  revenueRecords: RevenueRecord[];
  acsRuntimes: ACSRuntime[];
  acsReceipts: ACSOrchestrationReceipt[];
  telemetryEvents: TelemetryEvent[];
}

export interface BusinessRuntimeSummary {
  activeRequests: number;
  activeProjects: number;
  operationalAssets: number;
  treasuryExposure: {
    activeRecords: number;
    approvedAmount: number;
    consumedAmount: number;
    currency: string;
  };
  fundingStatusCounts: Record<string, number>;
  debentureStatusCounts: Record<string, number>;
  revenueStatus: {
    records: number;
    grossAmount: number;
    netAmount: number;
    currency: string;
  };
  acsRuntimeStatusCounts: Record<string, number>;
  telemetrySeverityCounts: Record<string, number>;
  riskTierDistribution: Record<string, number>;
  nonExecutionMode: boolean;
  capabilitySummary: {
    totalSubjects: number;
    totalCapabilities: number;
    readOnly: boolean;
    mock: boolean;
  };
  permissionSummary: {
    totalDecisions: number;
    forbiddenDecisions: number;
    blockedDecisions: number;
    readOnly: boolean;
    mock: boolean;
  };
  executionPolicySummary: {
    totalPolicies: number;
    executablePolicies: number;
    forbiddenActions: number;
    governanceRequiredActions: number;
    treasuryRequiredActions: number;
    humanReviewRequiredActions: number;
    runtimeMode: "MOCK_READ_ONLY";
  };
  contractStatus: Record<"governance" | "treasury" | "financial" | "debenture" | "acs" | "identity", "MOCK_READ_ONLY">;
  securityValidatorStatus: {
    valid: boolean;
    errorCount: number;
    warningCount: number;
  };
  eventSummary: {
    totalEvents: number;
    criticalEvents: number;
    byType: Record<string, number>;
    bySeverity: Record<string, number>;
    bySource: Record<string, number>;
    mock: true;
    readOnly: true;
  };
}

export interface BusinessProjectRuntimeView {
  project: BusinessProject;
  request?: BusinessRequest;
  asset?: OperationalAsset;
  funding?: FundingRecord;
  debenture?: DebentureRecord;
  treasuryExposures: TreasuryExposure[];
  revenueRecords: RevenueRecord[];
  plugins: PluginRecord[];
  acsRuntimes: ACSRuntime[];
  acsReceipts: ACSOrchestrationReceipt[];
  telemetryEvents: TelemetryEvent[];
}

export interface BusinessDashboardCard {
  id: string;
  label: string;
  value: number | string;
  detail: string;
  status: "INFO" | "NOTICE" | "WARNING" | "CRITICAL";
}

export interface BusinessLifecycleTableRow {
  id: BusinessId;
  label: string;
  status: string;
  ownerId?: BusinessId;
  projectId?: BusinessId;
  assetId?: BusinessId;
  riskTier?: RiskTier;
  governanceRequired?: boolean;
  treasuryExposureExpected?: boolean;
}

export interface BusinessRiskIndicator {
  id: BusinessId;
  label: string;
  riskTier: RiskTier;
  status: string;
  governanceReference?: GovernanceReference;
  treasuryExposureAmount?: MoneyAmount;
}

export interface BusinessTelemetrySummary {
  totalEvents: number;
  severityCounts: Record<string, number>;
  latestEvents: TelemetryEvent[];
}

export interface BusinessDashboardModel {
  generatedAt: ISODateString;
  cards: BusinessDashboardCard[];
  lifecycleTables: {
    requests: BusinessLifecycleTableRow[];
    projects: BusinessLifecycleTableRow[];
    assets: BusinessLifecycleTableRow[];
    funding: BusinessLifecycleTableRow[];
    debentures: BusinessLifecycleTableRow[];
    treasury: BusinessLifecycleTableRow[];
    revenue: BusinessLifecycleTableRow[];
    acs: BusinessLifecycleTableRow[];
    plugins: BusinessLifecycleTableRow[];
  };
  riskIndicators: BusinessRiskIndicator[];
  telemetry: BusinessTelemetrySummary;
  nonExecutionMode: boolean;
}
