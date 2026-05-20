import { z } from 'zod';

export const MINING_API_VERSION = 'v1';

export const apiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  path: z.string().optional(),
  detail: z.unknown().optional()
});

export const apiMetaSchema = z.object({
  source: z.literal('mining-api'),
  version: z.literal(MINING_API_VERSION),
  generatedAt: z.string(),
  mock: z.literal(true)
});

export const apiEnvelopeSchema = (dataSchema) => z.object({
  data: dataSchema,
  meta: apiMetaSchema,
  errors: z.array(apiErrorSchema)
});

const riskLevelSchema = z.enum(['low', 'medium', 'high', 'critical']);
const governanceStandingSchema = z.enum([
  'compliant',
  'under-review',
  'restricted',
  'sanctioned',
  'suspended',
  'eligible',
  'not-eligible',
  'future-only'
]);
const dueDiligenceStatusSchema = z.enum(['approved', 'conditional', 'in-review', 'required', 'future-review']);

export const miningSummarySchema = z.object({
  totalProviders: z.number(),
  activeMockProviders: z.number(),
  treasuryExposureUsd: z.number(),
  approvedProviders: z.number(),
  highRiskProviders: z.number(),
  nativeHashStatus: z.string()
});

export const miningProviderSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  providerType: z.string(),
  primaryAsset: z.string(),
  status: z.string(),
  governanceStanding: governanceStandingSchema,
  dueDiligenceStatus: dueDiligenceStatusSchema,
  treasuryCompatible: z.boolean(),
  supportedChains: z.array(z.string()).default([]),
  supportedAssets: z.array(z.string()).default([]),
  tokenizedHashModel: z.string().optional(),
  custodyModel: z.string().optional(),
  liquidityProfile: z.string().optional(),
  operationalMaturity: z.string().optional(),
  integrationReadiness: z.string().optional(),
  apiAvailability: z.string().optional(),
  complianceNotes: z.string().optional(),
  publicStatus: z.string().optional(),
  recommendedAllocationLimitPct: z.number().optional(),
  allocationMode: z.string().optional(),
  custodyAssumption: z.string().optional(),
  rewardAccounting: z.string().optional(),
  strategicNotes: z.string().optional(),
  description: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
}).passthrough();

export const providerRiskProfileSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  compositeScore: z.number().optional(),
  riskLevel: riskLevelSchema,
  counterpartyRisk: riskLevelSchema.optional(),
  custodyRisk: riskLevelSchema,
  liquidityRisk: riskLevelSchema,
  operationalRisk: riskLevelSchema,
  regulatoryRisk: riskLevelSchema.optional(),
  transparencyRisk: riskLevelSchema.optional(),
  smartContractRisk: riskLevelSchema.optional(),
  marketVolatilityRisk: riskLevelSchema.optional(),
  concentrationRisk: riskLevelSchema.optional(),
  treasuryExposureLimitPct: z.number(),
  warningFlags: z.array(z.string()).default([]),
  governanceRecommendation: z.string().optional(),
  explanation: z.string().optional(),
  notes: z.string().optional()
}).passthrough();

export const providerLiquiditySchema = z.object({
  id: z.string(),
  providerId: z.string(),
  liquidityStatus: z.string(),
  redemptionWindow: z.string(),
  settlementAsset: z.string(),
  marketAccess: z.string(),
  liquidityNotes: z.string()
}).passthrough();

export const hashTokenSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  symbol: z.string(),
  name: z.string(),
  chain: z.string(),
  tokenStandard: z.string(),
  status: z.string(),
  transferability: z.string(),
  treasuryEligible: z.boolean(),
  notes: z.string()
}).passthrough();

export const hashAllocationSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  vaultId: z.string(),
  allocationName: z.string(),
  allocationPct: z.number(),
  notionalUsd: z.number(),
  route: z.string(),
  governanceStanding: governanceStandingSchema,
  riskLevel: riskLevelSchema,
  status: z.string()
}).passthrough();

export const miningVaultSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  vaultType: z.string(),
  targetExposureUsd: z.number(),
  currentExposureUsd: z.number(),
  reserveRatioPct: z.number().optional(),
  maxProviderConcentrationPct: z.number(),
  governanceStanding: governanceStandingSchema,
  riskPolicy: z.string(),
  description: z.string()
}).passthrough();

export const treasuryExposureSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  vaultId: z.string(),
  notionalUsd: z.number(),
  exposurePct: z.number(),
  reserveImpact: z.string(),
  treasuryRoute: z.string(),
  assetSymbol: z.string().optional(),
  custodyModel: z.string().optional(),
  approvedByGovernance: z.boolean(),
  reviewStatus: dueDiligenceStatusSchema
}).passthrough();

export const governanceValidationSchema = z.object({
  id: z.string(),
  targetType: z.string(),
  targetId: z.string(),
  validationType: z.string(),
  status: governanceStandingSchema,
  reviewer: z.string(),
  summary: z.string(),
  reasonCodes: z.array(z.string()).default([]),
  restrictionReasons: z.array(z.string()).default([])
}).passthrough();

export const providerDueDiligenceSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  status: dueDiligenceStatusSchema,
  legalReview: dueDiligenceStatusSchema,
  technicalReview: dueDiligenceStatusSchema,
  treasuryReview: dueDiligenceStatusSchema,
  operationalReview: dueDiligenceStatusSchema,
  documents: z.array(z.string()).default([]),
  checklist: z.array(z.object({
    item: z.string(),
    status: dueDiligenceStatusSchema,
    notes: z.string()
  })).default([]),
  blockerSummary: z.string()
}).passthrough();

export const miningReportSchema = z.object({
  id: z.string(),
  title: z.string(),
  reportType: z.string(),
  period: z.string(),
  status: z.string(),
  summary: z.string(),
  sections: z.array(z.object({
    title: z.string(),
    findings: z.array(z.string())
  })).default([]),
  nextActions: z.array(z.string()).default([])
}).passthrough();

export const providerDetailsSchema = z.object({
  provider: miningProviderSchema,
  riskProfile: providerRiskProfileSchema.optional(),
  liquidity: providerLiquiditySchema.optional(),
  hashTokens: z.array(hashTokenSchema).default([]),
  allocations: z.array(hashAllocationSchema).default([]),
  dueDiligence: providerDueDiligenceSchema.optional(),
  governanceValidations: z.array(governanceValidationSchema).default([]),
  normalizedTelemetry: z.unknown().nullable().optional(),
  governanceActions: z.array(z.unknown()).default([]),
  proposalIntents: z.array(z.unknown()).default([]),
  telemetry: z.object({
    reportingStatus: z.string(),
    apiAvailability: z.string(),
    operationalMaturity: z.string(),
    latestMockSignal: z.string()
  }).passthrough()
});

export const treasurySummarySchema = z.object({
  summary: miningSummarySchema,
  totalExposureUsd: z.number(),
  exposureByRiskLevel: z.record(z.string(), z.number()).default({}),
  exposureByAsset: z.record(z.string(), z.number()).default({}),
  exposureByCustodyModel: z.record(z.string(), z.number()).default({}),
  diversification: z.object({
    providerCount: z.number(),
    largestProviderExposurePct: z.number(),
    reserveRatioRange: z.array(z.object({
      vaultId: z.string(),
      reserveRatioPct: z.number()
    })).default([])
  }),
  exposures: z.array(treasuryExposureSchema).default([]),
  vaults: z.array(miningVaultSchema).default([])
});

export const riskSummarySchema = z.object({
  riskProfiles: z.array(providerRiskProfileSchema).default([]),
  liquidity: z.array(providerLiquiditySchema).default([]),
  providerRiskMatrix: z.array(z.unknown()).default([])
});

export const providerAdapterDefinitionSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  providerSlug: z.string(),
  providerName: z.string(),
  adapterKey: z.string(),
  status: z.string(),
  integrationReadiness: z.string(),
  apiAvailability: z.string(),
  readOnly: z.literal(true),
  mock: z.literal(true),
  executionEnabled: z.literal(false),
  treasuryMovementEnabled: z.literal(false),
  walletRequired: z.literal(false),
  capabilities: z.array(z.string()).default([]),
  blockedActions: z.array(z.string()).default([]),
  telemetry: z.object({
    reportingMode: z.string(),
    freshness: z.string(),
    lastObservedAt: z.string(),
    healthSignal: z.string(),
    notes: z.string()
  }).passthrough(),
  diligenceRequirements: z.array(z.string()).default([]),
  fallbackStrategy: z.string(),
  lifecycleStage: z.string(),
  governanceNotes: z.string()
}).passthrough();

export const providerTelemetrySchema = z.object({
  id: z.string(),
  providerId: z.string(),
  providerSlug: z.string().optional(),
  providerName: z.string().optional(),
  reportedHashExposure: z.number(),
  tokenizedHashUnit: z.string(),
  normalizedHashrateThs: z.number(),
  underlyingAsset: z.string(),
  estimatedMinedAsset: z.string(),
  lastProviderUpdate: z.string(),
  dataFreshnessStatus: z.string(),
  liquiditySnapshot: z.string(),
  priceNavReference: z.string(),
  rewardAccountingStatus: z.string(),
  providerServiceHealth: z.string(),
  uptimeStatus: z.string(),
  apiAvailability: z.string(),
  telemetryConfidenceLevel: z.string(),
  sourceType: z.string(),
  normalized: z.object({
    hashExposureThs: z.number(),
    minedAssetSymbol: z.string(),
    liquidityLabel: z.string(),
    serviceHealthLabel: z.string(),
    freshnessLabel: z.string(),
    adapterReadiness: z.string(),
    rewardAccountingLabel: z.string(),
    confidenceScore: z.number()
  }).passthrough(),
  notes: z.string()
}).passthrough();

export const treasuryPolicySchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.string(),
  maxAllocationPerProviderPct: z.number(),
  maxAllocationPerRiskLevelPct: z.record(z.string(), z.number()).default({}),
  maxAllocationPerCustodyModelPct: z.record(z.string(), z.number()).default({}),
  maxAllocationPerAssetPct: z.record(z.string(), z.number()).default({}),
  reserveRatioMinimumPct: z.number(),
  experimentalProviderCapPct: z.number(),
  restrictedProviderHandling: z.string(),
  emergencyPauseRules: z.array(z.string()).default([]),
  requiredGovernanceApprovalLevel: z.string(),
  rebalanceRecommendationRules: z.array(z.string()).default([]),
  notes: z.string()
}).passthrough();

export const treasuryPolicyEvaluationSchema = z.object({
  policyId: z.string(),
  status: z.string(),
  providerConcentrationWarnings: z.array(z.string()).default([]),
  riskLevelConcentrationWarnings: z.array(z.string()).default([]),
  restrictedProviderExposureWarnings: z.array(z.string()).default([]),
  reserveRatioStatus: z.string(),
  rebalanceRecommendation: z.string(),
  governanceActionRequired: z.boolean(),
  evaluatedAt: z.string()
}).passthrough();

export const miningAccountingSchema = z.object({
  periods: z.array(z.unknown()).default([]),
  rewardAccruals: z.array(z.unknown()).default([]),
  providerStatements: z.array(z.unknown()).default([]),
  treasuryLedger: z.array(z.unknown()).default([]),
  summary: z.object({
    openPeriods: z.number(),
    pendingAccruals: z.number(),
    varianceWatchAccruals: z.number(),
    totalExpectedRewardUsd: z.number(),
    totalReportedRewardUsd: z.number(),
    totalVarianceUsd: z.number()
  }).passthrough()
}).passthrough();

export const reconciliationRunSchema = z.object({
  id: z.string(),
  periodId: z.string(),
  status: z.string(),
  startedAt: z.string(),
  completedAt: z.string().nullable(),
  expectedRewardUsd: z.number(),
  reportedRewardUsd: z.number(),
  varianceUsd: z.number(),
  variancePct: z.number(),
  materialityThresholdPct: z.number(),
  governanceActionRequired: z.boolean(),
  auditSummary: z.string(),
  findings: z.array(z.unknown()).default([])
}).passthrough();

export const miningGovernanceActionSchema = z.object({
  id: z.string(),
  actionType: z.string(),
  sourceSignal: z.string(),
  providerId: z.string().optional(),
  providerSlug: z.string().optional(),
  providerName: z.string().optional(),
  vaultId: z.string().optional(),
  treasuryScope: z.string().optional(),
  severity: z.string(),
  reasonSeverity: z.string(),
  recommendedAction: z.string(),
  requiredApprovalLevel: z.string(),
  governanceStatus: z.string(),
  constitutionalStanding: governanceStandingSchema,
  federationMember: z.boolean(),
  federationTier: z.string(),
  reasonCodes: z.array(z.string()).default([]),
  constitutionalFlags: z.array(z.string()).default([]),
  expectedImpact: z.string(),
  executionReadiness: z.string(),
  mockOnlyDisclaimer: z.string()
}).passthrough();

export const miningProposalIntentSchema = z.object({
  id: z.string(),
  actionId: z.string(),
  intentType: z.string(),
  title: z.string(),
  summary: z.string(),
  scope: z.object({
    providerId: z.string().optional(),
    providerSlug: z.string().optional(),
    vaultId: z.string().optional(),
    treasuryScope: z.string().optional()
  }).passthrough(),
  preconditions: z.array(z.string()).default([]),
  expectedImpact: z.string(),
  riskNotes: z.array(z.string()).default([]),
  requiredGovernanceBody: z.string(),
  mockExecutionPayloadPreview: z.record(z.string(), z.unknown()).default({}),
  executionBlockedReason: z.string()
}).passthrough();
