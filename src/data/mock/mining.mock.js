export const miningMock = {
  summary: {
    totalProviders: 6,
    activeMockProviders: 4,
    treasuryExposureUsd: 1840000,
    approvedProviders: 2,
    highRiskProviders: 2,
    nativeHashStatus: 'future architecture only',
    mode: 'mock-first read-only'
  },
  providers: [
    {
      id: 'provider-minto',
      name: 'Minto',
      slug: 'minto',
      providerType: 'tokenized-hash',
      primaryAsset: 'BTCMT',
      status: 'active-mock',
      governanceStanding: 'limited',
      dueDiligenceStatus: 'conditional',
      treasuryCompatible: true,
      supportedChains: ['BNB Chain'],
      allocationMode: 'tokenized BTC mining power exposure',
      custodyAssumption: 'provider-administered tokenized hash representation',
      rewardAccounting: 'mock BTCMT-linked mining reporting only',
      description: 'Tokenized hash exposure used for controlled treasury allocation analysis.'
    },
    {
      id: 'provider-gomining',
      name: 'GoMining',
      slug: 'gomining',
      providerType: 'tokenized-hash',
      primaryAsset: 'GOMINING',
      status: 'active-mock',
      governanceStanding: 'limited',
      dueDiligenceStatus: 'conditional',
      treasuryCompatible: true,
      supportedChains: ['Ethereum', 'BNB Chain'],
      allocationMode: 'tokenized miner and hash exposure',
      custodyAssumption: 'provider-operated mining asset registry',
      rewardAccounting: 'mock daily mining output visibility',
      description: 'Tokenized mining product exposure with treasury concentration controls.'
    },
    {
      id: 'provider-bmn2',
      name: 'BMN2',
      slug: 'bmn2',
      providerType: 'tokenized-hash',
      primaryAsset: 'BMN2',
      status: 'reviewing',
      governanceStanding: 'under-review',
      dueDiligenceStatus: 'in-review',
      treasuryCompatible: false,
      supportedChains: ['Ethereum'],
      allocationMode: 'institutional hash token exposure',
      custodyAssumption: 'issuer and contract diligence required',
      rewardAccounting: 'mock reporting pending due diligence',
      description: 'Institutional tokenized hash candidate requiring legal, technical, and treasury review.'
    },
    {
      id: 'provider-nicehash',
      name: 'NiceHash',
      slug: 'nicehash',
      providerType: 'marketplace',
      primaryAsset: 'Hashpower marketplace',
      status: 'reviewing',
      governanceStanding: 'under-review',
      dueDiligenceStatus: 'required',
      treasuryCompatible: false,
      supportedChains: ['Bitcoin'],
      allocationMode: 'marketplace hashpower routing',
      custodyAssumption: 'execution and settlement exposure requires operational controls',
      rewardAccounting: 'mock marketplace telemetry only',
      description: 'Hashpower marketplace candidate for future routed allocations after compliance review.'
    },
    {
      id: 'provider-luxor',
      name: 'Luxor',
      slug: 'luxor',
      providerType: 'pool-operator',
      primaryAsset: 'Pool and hashrate products',
      status: 'active-mock',
      governanceStanding: 'approved',
      dueDiligenceStatus: 'approved',
      treasuryCompatible: true,
      supportedChains: ['Bitcoin'],
      allocationMode: 'pool and structured hashrate exposure',
      custodyAssumption: 'pool telemetry and contract terms reviewed in mock state',
      rewardAccounting: 'mock pool performance and reporting model',
      description: 'Pool operator model for treasury-compatible exposure and reporting workflows.'
    },
    {
      id: 'provider-axodus-native',
      name: 'Axodus Native Hash',
      slug: 'axodus-native-hash',
      providerType: 'native-future',
      primaryAsset: 'AXH',
      status: 'future',
      governanceStanding: 'future-only',
      dueDiligenceStatus: 'future-review',
      treasuryCompatible: false,
      supportedChains: ['Future Axodus infrastructure'],
      allocationMode: 'native hash issuance and allocation framework',
      custodyAssumption: 'not deployed; governance architecture only',
      rewardAccounting: 'not active',
      description: 'Future native hash infrastructure placeholder, separated from active external provider exposure.'
    }
  ],
  hashTokens: [
    { id: 'token-btcmt', providerId: 'provider-minto', symbol: 'BTCMT', name: 'Minto Bitcoin Hash Token', chain: 'BNB Chain', tokenStandard: 'BEP-20', status: 'observable', transferability: 'market-traded', treasuryEligible: true, notes: 'Mock only; no production contract address configured.' },
    { id: 'token-gomining', providerId: 'provider-gomining', symbol: 'GOMINING', name: 'GoMining Token', chain: 'Ethereum / BNB Chain', tokenStandard: 'ERC-20 / BEP-20', status: 'observable', transferability: 'market-traded', treasuryEligible: true, notes: 'Requires concentration limits and recurring liquidity review.' },
    { id: 'token-bmn2', providerId: 'provider-bmn2', symbol: 'BMN2', name: 'Blockstream Mining Note 2', chain: 'Ethereum', tokenStandard: 'restricted token candidate', status: 'in-review', transferability: 'restricted', treasuryEligible: false, notes: 'Legal classification and eligibility review required.' },
    { id: 'token-axh', providerId: 'provider-axodus-native', symbol: 'AXH', name: 'Axodus Native Hash', chain: 'Future Axodus infrastructure', tokenStandard: 'future', status: 'future', transferability: 'future', treasuryEligible: false, notes: 'Architecture placeholder only.' }
  ],
  riskProfiles: [
    { id: 'risk-minto', providerId: 'provider-minto', riskLevel: 'medium', custodyRisk: 'medium', liquidityRisk: 'medium', operationalRisk: 'medium', jurisdictionRisk: 'medium', treasuryExposureLimitPct: 12, notes: 'Conditional exposure; provider documentation and liquidity review remain open.' },
    { id: 'risk-gomining', providerId: 'provider-gomining', riskLevel: 'medium', custodyRisk: 'medium', liquidityRisk: 'low', operationalRisk: 'medium', jurisdictionRisk: 'medium', treasuryExposureLimitPct: 14, notes: 'Market-traded exposure with provider dependence and reporting assumptions.' },
    { id: 'risk-bmn2', providerId: 'provider-bmn2', riskLevel: 'high', custodyRisk: 'medium', liquidityRisk: 'high', operationalRisk: 'medium', jurisdictionRisk: 'high', treasuryExposureLimitPct: 0, notes: 'Restricted until legal classification and treasury eligibility are resolved.' },
    { id: 'risk-nicehash', providerId: 'provider-nicehash', riskLevel: 'high', custodyRisk: 'medium', liquidityRisk: 'medium', operationalRisk: 'high', jurisdictionRisk: 'medium', treasuryExposureLimitPct: 0, notes: 'Marketplace execution risk requires routing and settlement controls.' },
    { id: 'risk-luxor', providerId: 'provider-luxor', riskLevel: 'low', custodyRisk: 'low', liquidityRisk: 'medium', operationalRisk: 'low', jurisdictionRisk: 'medium', treasuryExposureLimitPct: 18, notes: 'Approved mock provider with structured reporting assumptions.' },
    { id: 'risk-axodus-native', providerId: 'provider-axodus-native', riskLevel: 'medium', custodyRisk: 'medium', liquidityRisk: 'medium', operationalRisk: 'medium', jurisdictionRisk: 'medium', treasuryExposureLimitPct: 0, notes: 'Future-only architecture; no exposure allowed.' }
  ],
  liquidity: [
    { id: 'liquidity-minto', providerId: 'provider-minto', liquidityStatus: 'moderate', redemptionWindow: 'market-dependent', settlementAsset: 'BTCMT / stablecoin routes', marketAccess: 'secondary market', liquidityNotes: 'Mock liquidity requires treasury slippage limits.' },
    { id: 'liquidity-gomining', providerId: 'provider-gomining', liquidityStatus: 'deep', redemptionWindow: 'market-dependent', settlementAsset: 'GOMINING / BTC-linked rewards', marketAccess: 'secondary market and provider ecosystem', liquidityNotes: 'Mock model assumes tradable exposure with provider reporting controls.' },
    { id: 'liquidity-bmn2', providerId: 'provider-bmn2', liquidityStatus: 'thin', redemptionWindow: 'restricted', settlementAsset: 'restricted note settlement', marketAccess: 'institutional / restricted', liquidityNotes: 'Eligibility and transfer restrictions must be validated.' },
    { id: 'liquidity-nicehash', providerId: 'provider-nicehash', liquidityStatus: 'moderate', redemptionWindow: 'execution window dependent', settlementAsset: 'BTC', marketAccess: 'hashpower marketplace', liquidityNotes: 'Operational execution risk dominates liquidity analysis.' },
    { id: 'liquidity-luxor', providerId: 'provider-luxor', liquidityStatus: 'moderate', redemptionWindow: 'contract dependent', settlementAsset: 'BTC / fiat reporting', marketAccess: 'structured provider relationship', liquidityNotes: 'Mock allocation assumes governed contract terms.' },
    { id: 'liquidity-axodus-native', providerId: 'provider-axodus-native', liquidityStatus: 'future', redemptionWindow: 'not active', settlementAsset: 'not active', marketAccess: 'not active', liquidityNotes: 'No live liquidity; future architecture only.' }
  ],
  vaults: [
    { id: 'vault-treasury-core', name: 'Core Treasury Hash Vault', slug: 'core-treasury-hash-vault', vaultType: 'treasury', targetExposureUsd: 2500000, currentExposureUsd: 1280000, maxProviderConcentrationPct: 18, governanceStanding: 'approved', riskPolicy: 'approved or conditional providers only', description: 'Primary mock vault for governed treasury exposure to tokenized hash products.' },
    { id: 'vault-dao-client', name: 'DAO Client Allocation Vault', slug: 'dao-client-allocation-vault', vaultType: 'dao-client', targetExposureUsd: 900000, currentExposureUsd: 360000, maxProviderConcentrationPct: 12, governanceStanding: 'limited', riskPolicy: 'isolated DAO attribution and provider reporting required', description: 'Mock vault for client DAO mining exposure visibility.' },
    { id: 'vault-research', name: 'Provider Research Vault', slug: 'provider-research-vault', vaultType: 'research', targetExposureUsd: 400000, currentExposureUsd: 200000, maxProviderConcentrationPct: 8, governanceStanding: 'under-review', riskPolicy: 'observation and diligence only', description: 'Research-only allocation surface for providers under review.' },
    { id: 'vault-native-future', name: 'Axodus Native Hash Future Vault', slug: 'axodus-native-hash-future-vault', vaultType: 'native-future', targetExposureUsd: 0, currentExposureUsd: 0, maxProviderConcentrationPct: 0, governanceStanding: 'future-only', riskPolicy: 'not active until native hash governance framework exists', description: 'Future placeholder for native Axodus hash infrastructure.' }
  ],
  allocations: [
    { id: 'allocation-luxor-core', providerId: 'provider-luxor', vaultId: 'vault-treasury-core', allocationName: 'Luxor structured pool exposure', allocationPct: 32, notionalUsd: 590000, route: 'treasury', governanceStanding: 'approved', riskLevel: 'low', status: 'active-mock' },
    { id: 'allocation-gomining-core', providerId: 'provider-gomining', vaultId: 'vault-treasury-core', allocationName: 'GoMining tokenized exposure', allocationPct: 28, notionalUsd: 515000, route: 'treasury', governanceStanding: 'limited', riskLevel: 'medium', status: 'active-mock' },
    { id: 'allocation-minto-dao', providerId: 'provider-minto', vaultId: 'vault-dao-client', allocationName: 'BTCMT DAO allocation', allocationPct: 18, notionalUsd: 335000, route: 'dao-client', governanceStanding: 'limited', riskLevel: 'medium', status: 'active-mock' },
    { id: 'allocation-bmn2-research', providerId: 'provider-bmn2', vaultId: 'vault-research', allocationName: 'BMN2 diligence observation', allocationPct: 8, notionalUsd: 150000, route: 'research', governanceStanding: 'under-review', riskLevel: 'high', status: 'reviewing' },
    { id: 'allocation-native-future', providerId: 'provider-axodus-native', vaultId: 'vault-native-future', allocationName: 'Axodus Native Hash reserve design', allocationPct: 0, notionalUsd: 0, route: 'strategic-reserve', governanceStanding: 'future-only', riskLevel: 'medium', status: 'future' }
  ],
  treasuryExposures: [
    { id: 'treasury-luxor-core', providerId: 'provider-luxor', vaultId: 'vault-treasury-core', notionalUsd: 590000, exposurePct: 32, reserveImpact: 'low', treasuryRoute: 'Core Treasury Hash Vault', approvedByGovernance: true, reviewStatus: 'approved' },
    { id: 'treasury-gomining-core', providerId: 'provider-gomining', vaultId: 'vault-treasury-core', notionalUsd: 515000, exposurePct: 28, reserveImpact: 'moderate', treasuryRoute: 'Core Treasury Hash Vault', approvedByGovernance: true, reviewStatus: 'conditional' },
    { id: 'treasury-minto-dao', providerId: 'provider-minto', vaultId: 'vault-dao-client', notionalUsd: 335000, exposurePct: 18, reserveImpact: 'low', treasuryRoute: 'DAO Client Allocation Vault', approvedByGovernance: true, reviewStatus: 'conditional' },
    { id: 'treasury-bmn2-research', providerId: 'provider-bmn2', vaultId: 'vault-research', notionalUsd: 150000, exposurePct: 8, reserveImpact: 'none', treasuryRoute: 'Provider Research Vault', approvedByGovernance: false, reviewStatus: 'in-review' }
  ],
  governanceValidations: [
    { id: 'gov-luxor', targetType: 'provider', targetId: 'provider-luxor', validationType: 'provider approval', status: 'approved', reviewer: 'Governance Risk Council', summary: 'Approved for mock treasury exposure with concentration limits.' },
    { id: 'gov-gomining', targetType: 'provider', targetId: 'provider-gomining', validationType: 'provider conditional approval', status: 'limited', reviewer: 'Governance Risk Council', summary: 'Limited allocation allowed pending recurring liquidity review.' },
    { id: 'gov-bmn2', targetType: 'hash-token', targetId: 'token-bmn2', validationType: 'legal classification review', status: 'under-review', reviewer: 'Constitutional Review Queue', summary: 'Restricted from treasury eligibility until classification is resolved.' },
    { id: 'gov-native', targetType: 'provider', targetId: 'provider-axodus-native', validationType: 'future native hash design', status: 'future-only', reviewer: 'Architecture Council', summary: 'Future-only design placeholder; no active allocation authority.' }
  ],
  providerDueDiligence: [
    { id: 'dd-minto', providerId: 'provider-minto', status: 'conditional', legalReview: 'conditional', technicalReview: 'in-review', treasuryReview: 'conditional', operationalReview: 'conditional', documents: ['provider profile', 'tokenized hash assumptions', 'liquidity worksheet'], blockerSummary: 'Requires updated liquidity and custody assumption review.' },
    { id: 'dd-gomining', providerId: 'provider-gomining', status: 'conditional', legalReview: 'conditional', technicalReview: 'conditional', treasuryReview: 'conditional', operationalReview: 'approved', documents: ['provider profile', 'market liquidity notes', 'reward accounting assumptions'], blockerSummary: 'Recurring exposure cap review required.' },
    { id: 'dd-bmn2', providerId: 'provider-bmn2', status: 'in-review', legalReview: 'in-review', technicalReview: 'required', treasuryReview: 'required', operationalReview: 'in-review', documents: ['institutional note summary'], blockerSummary: 'Legal classification and transfer restrictions unresolved.' },
    { id: 'dd-nicehash', providerId: 'provider-nicehash', status: 'required', legalReview: 'required', technicalReview: 'required', treasuryReview: 'required', operationalReview: 'required', documents: [], blockerSummary: 'Marketplace routing controls and execution receipts not defined.' },
    { id: 'dd-luxor', providerId: 'provider-luxor', status: 'approved', legalReview: 'approved', technicalReview: 'approved', treasuryReview: 'approved', operationalReview: 'approved', documents: ['provider profile', 'pool telemetry assumptions', 'treasury route memo'], blockerSummary: 'No active blocker in mock state.' },
    { id: 'dd-axodus-native', providerId: 'provider-axodus-native', status: 'future-review', legalReview: 'future-review', technicalReview: 'future-review', treasuryReview: 'future-review', operationalReview: 'future-review', documents: ['future architecture placeholder'], blockerSummary: 'Native hash framework not designed or approved.' }
  ],
  reports: [
    { id: 'report-treasury-may', title: 'Treasury Hash Exposure Snapshot', reportType: 'treasury', period: '2026-05', status: 'ready', summary: 'Mock treasury exposure remains within provider concentration constraints.' },
    { id: 'report-risk-may', title: 'Provider Risk Review', reportType: 'risk', period: '2026-05', status: 'reviewing', summary: 'BMN2 and NiceHash remain restricted pending due diligence closure.' },
    { id: 'report-governance-may', title: 'Governance Validation Queue', reportType: 'governance', period: '2026-05', status: 'draft', summary: 'Conditional providers require June liquidity and custody reassessment.' }
  ]
};
