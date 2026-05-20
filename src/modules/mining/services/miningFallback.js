const providers = [
  {
    id: 'provider-luxor',
    name: 'Luxor',
    slug: 'luxor',
    providerType: 'pool-operator',
    primaryAsset: 'BTC',
    status: 'active-mock',
    governanceStanding: 'compliant',
    dueDiligenceStatus: 'approved',
    treasuryCompatible: true,
    supportedChains: ['Bitcoin'],
    supportedAssets: ['BTC', 'pool telemetry'],
    tokenizedHashModel: 'Structured pool and hashrate exposure represented as read-only mock allocation.',
    custodyModel: 'Governed provider relationship with reporting assumptions.',
    liquidityProfile: 'Moderate contract-dependent liquidity.',
    operationalMaturity: 'institutional',
    integrationReadiness: 'mock-ready',
    apiAvailability: 'partner',
    complianceNotes: 'Emergency fallback copy; backend API remains the source of truth.',
    publicStatus: 'public',
    recommendedAllocationLimitPct: 18,
    allocationMode: 'pool and structured hashrate exposure',
    custodyAssumption: 'pool telemetry and contract terms reviewed in mock state',
    rewardAccounting: 'mock pool performance reporting only',
    strategicNotes: 'Fallback provider for offline UI continuity.',
    description: 'Fallback conservative provider exposure used only when the Mining API is unavailable.',
    createdAt: '2026-05-20',
    updatedAt: '2026-05-20'
  },
  {
    id: 'provider-gomining',
    name: 'GoMining',
    slug: 'gomining',
    providerType: 'tokenized-hash',
    primaryAsset: 'GOMINING',
    status: 'active-mock',
    governanceStanding: 'eligible',
    dueDiligenceStatus: 'conditional',
    treasuryCompatible: true,
    supportedChains: ['Ethereum', 'BNB Chain'],
    supportedAssets: ['GOMINING', 'BTC-linked rewards'],
    tokenizedHashModel: 'Tokenized mining product surface mapped as governed mining exposure.',
    custodyModel: 'Provider registry plus market-held token exposure.',
    liquidityProfile: 'Market-dependent liquidity.',
    operationalMaturity: 'established',
    integrationReadiness: 'mock-ready',
    apiAvailability: 'partner',
    complianceNotes: 'Fallback copy; requires API confirmation before operational use.',
    publicStatus: 'public',
    recommendedAllocationLimitPct: 14,
    allocationMode: 'tokenized miner and hash exposure',
    custodyAssumption: 'provider-operated mining asset registry',
    rewardAccounting: 'mock daily mining output visibility',
    strategicNotes: 'Fallback balanced provider for offline UI continuity.',
    description: 'Fallback tokenized hash provider shown only when the Mining API is unavailable.',
    createdAt: '2026-05-20',
    updatedAt: '2026-05-20'
  }
];

const riskProfiles = [
  {
    id: 'risk-luxor',
    providerId: 'provider-luxor',
    compositeScore: 34,
    riskLevel: 'low',
    counterpartyRisk: 'low',
    custodyRisk: 'low',
    liquidityRisk: 'medium',
    operationalRisk: 'low',
    regulatoryRisk: 'medium',
    transparencyRisk: 'low',
    smartContractRisk: 'low',
    marketVolatilityRisk: 'medium',
    concentrationRisk: 'medium',
    treasuryExposureLimitPct: 18,
    warningFlags: ['fallback-data'],
    governanceRecommendation: 'Use backend data before any operational decision.',
    explanation: 'Minimal fallback risk profile for offline UI continuity.',
    notes: 'Fallback data only.'
  },
  {
    id: 'risk-gomining',
    providerId: 'provider-gomining',
    compositeScore: 52,
    riskLevel: 'medium',
    counterpartyRisk: 'medium',
    custodyRisk: 'medium',
    liquidityRisk: 'low',
    operationalRisk: 'medium',
    regulatoryRisk: 'medium',
    transparencyRisk: 'medium',
    smartContractRisk: 'medium',
    marketVolatilityRisk: 'high',
    concentrationRisk: 'medium',
    treasuryExposureLimitPct: 14,
    warningFlags: ['fallback-data'],
    governanceRecommendation: 'Use backend data before any operational decision.',
    explanation: 'Minimal fallback risk profile for offline UI continuity.',
    notes: 'Fallback data only.'
  }
];

const liquidity = [
  { id: 'liquidity-luxor', providerId: 'provider-luxor', liquidityStatus: 'moderate', redemptionWindow: 'contract dependent', settlementAsset: 'BTC', marketAccess: 'structured provider relationship', liquidityNotes: 'Fallback liquidity assumption.' },
  { id: 'liquidity-gomining', providerId: 'provider-gomining', liquidityStatus: 'deep', redemptionWindow: 'market-dependent', settlementAsset: 'GOMINING / BTC-linked rewards', marketAccess: 'secondary market', liquidityNotes: 'Fallback liquidity assumption.' }
];

const vaults = [
  { id: 'vault-fallback-conservative', name: 'Fallback Conservative Mining Vault', slug: 'fallback-conservative-mining-vault', vaultType: 'conservative', strategy: 'Emergency offline display only.', allowedProviderIds: ['provider-luxor'], riskLimits: { maxCompositeRiskScore: 40, maxHighRiskProviderPct: 0, maxSingleProviderPct: 18 }, treasuryEligible: true, targetExposureUsd: 600000, currentExposureUsd: 390000, reserveRatioPct: 85, maxProviderConcentrationPct: 18, governanceStanding: 'compliant', riskPolicy: 'Backend API required for authoritative limits.', expectedRewardAccounting: 'Mock-only; no APY or claim flow.', description: 'Minimal fallback vault for offline UI continuity.' }
];

const allocations = [
  { id: 'allocation-fallback-luxor', providerId: 'provider-luxor', vaultId: 'vault-fallback-conservative', allocationName: 'Fallback Luxor route', allocationPct: 65, notionalUsd: 390000, route: 'treasury', governanceStanding: 'compliant', riskLevel: 'low', status: 'active-mock' }
];

const treasuryExposures = [
  { id: 'treasury-fallback-luxor', providerId: 'provider-luxor', vaultId: 'vault-fallback-conservative', notionalUsd: 390000, exposurePct: 65, reserveImpact: 'low', treasuryRoute: 'Fallback Conservative Mining Vault', custodyModel: 'provider relationship', assetSymbol: 'BTC', recommendedMaxAllocationPct: 18, simulatedAllocationUsd: 390000, approvedByGovernance: true, reviewStatus: 'approved' }
];

const governanceValidations = [
  { id: 'gov-fallback-luxor', targetType: 'provider', targetId: 'provider-luxor', validationType: 'fallback provider visibility', status: 'compliant', providerWhitelistingStatus: 'whitelisted', restrictionReasons: [], requiredDaoApprovalLevel: 'treasury-council', treasuryAllocationApprovalStatus: 'approved', constitutionalRiskFlags: [], emergencyPauseRecommendation: 'watch', reasonCodes: ['FALLBACK_DATA'], reviewer: 'Fallback Adapter', summary: 'Backend API unavailable; this is emergency display data only.' }
];

const providerDueDiligence = [
  { id: 'dd-fallback-luxor', providerId: 'provider-luxor', status: 'approved', legalReview: 'approved', technicalReview: 'approved', treasuryReview: 'approved', operationalReview: 'approved', documents: ['fallback provider profile'], checklist: [{ item: 'Backend API availability', status: 'required', notes: 'Reconnect to Mining API for authoritative diligence.' }], blockerSummary: 'Fallback data is not authoritative.' }
];

const providerAdapters = providers.map((provider) => ({
  id: `adapter-${provider.slug}`,
  providerId: provider.id,
  providerSlug: provider.slug,
  providerName: provider.name,
  adapterKey: `axodus.mining.providers.${provider.slug}`,
  status: 'manual-reporting',
  integrationReadiness: provider.integrationReadiness,
  apiAvailability: provider.apiAvailability,
  readOnly: true,
  mock: true,
  executionEnabled: false,
  treasuryMovementEnabled: false,
  walletRequired: false,
  capabilities: [
    'read-provider-profile',
    'read-tokenized-hash-products',
    'read-risk-profile',
    'read-due-diligence',
    'read-governance-validation',
    'read-treasury-eligibility',
    'read-telemetry'
  ],
  blockedActions: [
    'provider-execution',
    'hashpower-purchase',
    'treasury-movement',
    'wallet-claim',
    'minting',
    'staking',
    'smart-contract-execution'
  ],
  telemetry: {
    reportingMode: 'manual',
    freshness: 'manual-review',
    lastObservedAt: provider.updatedAt,
    healthSignal: 'watch',
    notes: 'Fallback adapter data only; Mining API is authoritative.'
  },
  diligenceRequirements: ['backend API availability', 'custody classification', 'treasury concentration review'],
  fallbackStrategy: 'Use minimal offline display and block all execution-oriented actions.',
  lifecycleStage: 'manual-review',
  governanceNotes: provider.complianceNotes
}));

const providerTelemetry = providers.map((provider) => ({
  id: `telemetry-${provider.slug}`,
  providerId: provider.id,
  providerSlug: provider.slug,
  providerName: provider.name,
  reportedHashExposure: provider.slug === 'luxor' ? 225 : 164,
  tokenizedHashUnit: `${provider.primaryAsset} fallback unit`,
  normalizedHashrateThs: provider.slug === 'luxor' ? 225 : 164,
  underlyingAsset: provider.primaryAsset,
  estimatedMinedAsset: 'BTC',
  lastProviderUpdate: provider.updatedAt,
  dataFreshnessStatus: 'stale',
  liquiditySnapshot: provider.slug === 'luxor' ? 'moderate' : 'deep',
  priceNavReference: 'fallback reference only',
  rewardAccountingStatus: 'pending-reconciliation',
  providerServiceHealth: 'watch',
  uptimeStatus: 'manual-review',
  apiAvailability: provider.apiAvailability,
  telemetryConfidenceLevel: 'low',
  sourceType: 'mock',
  normalized: {
    hashExposureThs: provider.slug === 'luxor' ? 225 : 164,
    minedAssetSymbol: 'BTC',
    liquidityLabel: provider.slug === 'luxor' ? 'moderate' : 'deep',
    serviceHealthLabel: 'watch',
    freshnessLabel: 'stale',
    adapterReadiness: provider.integrationReadiness,
    rewardAccountingLabel: 'pending-reconciliation',
    confidenceScore: 35
  },
  notes: 'Fallback telemetry only; Mining API is authoritative.'
}));

const treasuryPolicies = [{
  id: 'policy-fallback',
  name: 'Fallback Mining Treasury Policy',
  status: 'active-mock',
  maxAllocationPerProviderPct: 18,
  maxAllocationPerRiskLevelPct: { low: 45, medium: 35, high: 0, critical: 0 },
  maxAllocationPerCustodyModelPct: { 'provider relationship': 35, 'provider registry plus market custody': 20 },
  maxAllocationPerAssetPct: { BTC: 35, GOMINING: 14 },
  reserveRatioMinimumPct: 75,
  experimentalProviderCapPct: 0,
  restrictedProviderHandling: 'Fallback policy blocks restricted provider exposure.',
  emergencyPauseRules: ['backend unavailable', 'telemetry stale'],
  requiredGovernanceApprovalLevel: 'treasury-council',
  rebalanceRecommendationRules: ['reconnect Mining API for authoritative evaluation'],
  notes: 'Fallback policy for offline UI only.'
}];

const treasuryPolicyEvaluation = {
  policyId: 'policy-fallback',
  status: 'warning',
  providerConcentrationWarnings: ['Fallback evaluation is stale until Mining API reconnects.'],
  riskLevelConcentrationWarnings: [],
  restrictedProviderExposureWarnings: [],
  reserveRatioStatus: 'compliant',
  rebalanceRecommendation: 'Reconnect Mining API before acting on treasury exposure.',
  governanceActionRequired: false,
  evaluatedAt: '2026-05-20T00:00:00.000Z'
};

const accounting = {
  periods: [{ id: 'period-fallback', label: 'Fallback period', startDate: '2026-05-01', endDate: '2026-05-31', status: 'open', expectedRewardUsd: 8200, reportedRewardUsd: 8100, varianceUsd: -100, variancePct: -1.22, auditNotes: 'Fallback accounting only.' }],
  rewardAccruals: [{ id: 'accrual-fallback-luxor', periodId: 'period-fallback', providerId: 'provider-luxor', vaultId: 'vault-fallback-conservative', expectedRewardAsset: 'BTC', expectedRewardAmount: 0.082, expectedRewardUsd: 8200, reportedRewardAmount: 0.081, reportedRewardUsd: 8100, varianceUsd: -100, status: 'pending' }],
  providerStatements: [],
  treasuryLedger: [],
  summary: { openPeriods: 1, pendingAccruals: 1, varianceWatchAccruals: 0, totalExpectedRewardUsd: 8200, totalReportedRewardUsd: 8100, totalVarianceUsd: -100 }
};

const reconciliation = [{ id: 'recon-fallback', periodId: 'period-fallback', status: 'pending', startedAt: '2026-05-20T00:00:00.000Z', completedAt: null, expectedRewardUsd: 8200, reportedRewardUsd: 8100, varianceUsd: -100, variancePct: -1.22, materialityThresholdPct: 5, governanceActionRequired: false, auditSummary: 'Fallback reconciliation only.', findings: [] }];

const governanceActions = [{
  id: 'action-fallback-telemetry-review',
  actionType: 'provider-review',
  sourceSignal: 'fallback-api-unavailable',
  providerId: 'provider-luxor',
  providerSlug: 'luxor',
  providerName: 'Luxor',
  severity: 'warning',
  reasonSeverity: 'warning',
  recommendedAction: 'Review Mining API availability before governance decisions.',
  requiredApprovalLevel: 'operator',
  governanceStatus: 'blocked',
  constitutionalStanding: 'under-review',
  federationMember: true,
  federationTier: 'core',
  reasonCodes: ['FALLBACK_DATA', 'API_UNAVAILABLE'],
  constitutionalFlags: [],
  expectedImpact: 'Prevents stale fallback telemetry from being treated as authoritative.',
  executionReadiness: 'blocked-missing-data',
  mockOnlyDisclaimer: 'Mock governance action candidate only. No proposal execution, treasury movement, provider execution, wallet claim, minting, staking, or smart contract call is enabled.'
}];

const proposalIntents = [{
  id: 'intent-action-fallback-telemetry-review',
  actionId: 'action-fallback-telemetry-review',
  intentType: 'request-provider-due-diligence',
  title: 'Mining governance intent: Review fallback data state',
  summary: 'Fallback mode generated a governance candidate to prevent stale data use.',
  scope: { providerId: 'provider-luxor', providerSlug: 'luxor' },
  preconditions: ['Reconnect Mining API', 'Revalidate provider telemetry'],
  expectedImpact: 'Keeps governance review tied to authoritative Mining API data.',
  riskNotes: ['FALLBACK_DATA', 'API_UNAVAILABLE'],
  requiredGovernanceBody: 'operator',
  mockExecutionPayloadPreview: { actionId: 'action-fallback-telemetry-review', readOnly: true, executionEnabled: false },
  executionBlockedReason: 'Read-only MVP. Proposal execution, treasury movement, provider execution, wallet claim, minting, staking, and smart contract calls are disabled.'
}];

export const miningFallback = {
  summary: {
    totalProviders: providers.length,
    activeMockProviders: providers.length,
    treasuryExposureUsd: 390000,
    approvedProviders: 1,
    highRiskProviders: 0,
    nativeHashStatus: 'future architecture only'
  },
  providers,
  hashTokens: [
    { id: 'token-fallback-gomining', providerId: 'provider-gomining', symbol: 'GOMINING', name: 'GoMining Token', chain: 'Ethereum / BNB Chain', tokenStandard: 'ERC-20 / BEP-20', hashReference: 'provider mining product ecosystem', status: 'observable', transferability: 'market-traded', treasuryEligible: true, notes: 'Fallback token record; backend API is authoritative.' }
  ],
  riskProfiles,
  liquidity,
  vaults,
  allocations,
  treasuryExposures,
  governanceValidations,
  providerDueDiligence,
  providerAdapters,
  providerTelemetry,
  treasuryPolicies,
  treasuryPolicyEvaluation,
  accounting,
  reconciliation,
  governanceActions,
  proposalIntents,
  reports: [
    { id: 'report-fallback', title: 'Fallback Mining Status', reportType: 'risk', period: 'offline', status: 'draft', summary: 'Mining API is unavailable; AxodusAPP is showing minimal emergency fallback data.', sections: [{ title: 'Fallback state', findings: ['Backend API is required for authoritative Mining data.', 'No execution, claim, mint, stake, or treasury movement is available.'] }], nextActions: ['Restart Mining API on localhost:8787', 'Verify /health and /api/mining/summary'] }
  ]
};
