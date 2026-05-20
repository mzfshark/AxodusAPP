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
  reports: [
    { id: 'report-fallback', title: 'Fallback Mining Status', reportType: 'risk', period: 'offline', status: 'draft', summary: 'Mining API is unavailable; AxodusAPP is showing minimal emergency fallback data.', sections: [{ title: 'Fallback state', findings: ['Backend API is required for authoritative Mining data.', 'No execution, claim, mint, stake, or treasury movement is available.'] }], nextActions: ['Restart Mining API on localhost:8787', 'Verify /health and /api/mining/summary'] }
  ]
};
