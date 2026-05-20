export const acsInspectionMock = {
  health: {
    status: 'ok',
    mode: 'inspection',
    automation: 'disabled',
    hardening: {
      apiVersioning: 'enabled',
      responseEnvelope: 'enabled',
      requestCorrelation: 'enabled',
      schemaValidation: 'placeholder',
      rateLimit: 'placeholder',
      tenantAuth: 'placeholder',
      observability: 'placeholder'
    }
  },
  capabilities: [
    { id: 'core.tenant-health-monitoring', name: 'Tenant Health Monitoring', category: 'governance', consumptionLevel: 'core', automationLevel: 'assisted', requiresGovernanceApproval: false, requiresTenantApproval: false, requiresUserLicense: false, telemetryRequired: true, receiptsRequired: true, tenantAccessAllowed: false, productAccessAllowed: false, coreOnly: true },
    { id: 'core.governance-alignment', name: 'Governance Alignment Check', category: 'governance', consumptionLevel: 'core', automationLevel: 'assisted', requiresGovernanceApproval: false, requiresTenantApproval: false, requiresUserLicense: false, telemetryRequired: true, receiptsRequired: true, tenantAccessAllowed: false, productAccessAllowed: false, coreOnly: true },
    { id: 'service.risk-analysis', name: 'Tenant Risk Analysis', category: 'risk', consumptionLevel: 'service', automationLevel: 'manual_approval', requiresGovernanceApproval: true, requiresTenantApproval: true, requiresUserLicense: false, telemetryRequired: true, receiptsRequired: true, tenantAccessAllowed: true, productAccessAllowed: false, coreOnly: false },
    { id: 'service.content-validation', name: 'Tenant Content Validation', category: 'content', consumptionLevel: 'service', automationLevel: 'assisted', requiresGovernanceApproval: false, requiresTenantApproval: true, requiresUserLicense: false, telemetryRequired: true, receiptsRequired: true, tenantAccessAllowed: true, productAccessAllowed: false, coreOnly: false },
    { id: 'product.trading-ignition', name: 'Trading Ignition', category: 'trading', consumptionLevel: 'product', automationLevel: 'manual_approval', requiresGovernanceApproval: true, requiresTenantApproval: false, requiresUserLicense: true, telemetryRequired: true, receiptsRequired: true, tenantAccessAllowed: true, productAccessAllowed: true, coreOnly: false },
    { id: 'product.course-assistant', name: 'Course Assistant', category: 'support', consumptionLevel: 'product', automationLevel: 'assisted', requiresGovernanceApproval: false, requiresTenantApproval: false, requiresUserLicense: true, telemetryRequired: true, receiptsRequired: true, tenantAccessAllowed: true, productAccessAllowed: true, coreOnly: false }
  ],
  tenants: [
    {
      tenantId: 'dao-alpha',
      tenantType: 'dao',
      governanceStatus: 'active',
      federationTier: 'standard',
      restrictions: [],
      services: [
        { serviceId: 'service.risk-analysis', capabilityId: 'service.risk-analysis', name: 'Tenant Risk Analysis', consumptionLevel: 'service', automationLevel: 'manual_approval', requiresGovernanceApproval: true, requiresTenantApproval: true, requiresUserLicense: false, telemetryRequired: true, receiptsRequired: true, allowed: true, warnings: [] },
        { serviceId: 'product.trading-ignition', capabilityId: 'product.trading-ignition', name: 'Trading Ignition', consumptionLevel: 'product', automationLevel: 'manual_approval', requiresGovernanceApproval: true, requiresTenantApproval: false, requiresUserLicense: true, telemetryRequired: true, receiptsRequired: true, allowed: true, warnings: [] }
      ]
    },
    {
      tenantId: 'dao-disabled',
      tenantType: 'dao',
      governanceStatus: 'suspended',
      federationTier: 'standard',
      restrictions: ['acs.services.suspended'],
      services: [
        { serviceId: 'service.risk-analysis', capabilityId: 'service.risk-analysis', name: 'Tenant Risk Analysis', consumptionLevel: 'service', automationLevel: 'manual_approval', requiresGovernanceApproval: true, requiresTenantApproval: true, requiresUserLicense: false, telemetryRequired: true, receiptsRequired: true, allowed: false, blockedReason: 'tenant dao-disabled ACS services are suspended', warnings: [] }
      ]
    }
  ],
  products: [
    { productId: 'product.trading-ignition', capabilityId: 'product.trading-ignition', name: 'Trading Ignition', category: 'trading', consumptionLevel: 'product', automationLevel: 'manual_approval', requiresGovernanceApproval: true, requiresTenantApproval: false, requiresUserLicense: true, telemetryRequired: true, receiptsRequired: true, allowed: false, blockedReason: 'product.trading-ignition requires a valid NFT license or marketplace purchase', warnings: [] },
    { productId: 'product.course-assistant', capabilityId: 'product.course-assistant', name: 'Course Assistant', category: 'support', consumptionLevel: 'product', automationLevel: 'assisted', requiresGovernanceApproval: false, requiresTenantApproval: false, requiresUserLicense: true, telemetryRequired: true, receiptsRequired: true, allowed: false, blockedReason: 'product.course-assistant requires a valid NFT license or marketplace purchase', warnings: [] }
  ],
  readiness: {
    checks: [
      { id: 'wallet.connected', label: 'Wallet connected', completed: true, requiredForState: 'LEARNING' },
      { id: 'academy.completed', label: 'Academy course completed', completed: false, requiredForState: 'CERTIFIED' },
      { id: 'proof.validated', label: 'Proof of Knowledge validated', completed: false, requiredForState: 'CERTIFIED' },
      { id: 'license.attached', label: 'NFT license attached', completed: false, requiredForState: 'LICENSED' },
      { id: 'risk.acknowledged', label: 'Risk acknowledgement completed', completed: false, requiredForState: 'API_PENDING' },
      { id: 'api.withdrawals.disabled', label: 'Exchange API withdrawals disabled', completed: false, requiredForState: 'API_VALIDATED' }
    ],
    completed: false,
    nextState: 'CERTIFIED',
    blockedBy: ['academy.completed', 'proof.validated', 'license.attached', 'risk.acknowledged', 'api.withdrawals.disabled']
  },
  operationalState: {
    walletAddress: '0xunlicensed',
    state: 'CERTIFIED',
    availableStates: ['UNINITIALIZED', 'LEARNING', 'CERTIFIED', 'LICENSED', 'API_PENDING', 'API_VALIDATED', 'RISK_RESTRICTED', 'READY', 'ACTIVE', 'PAUSED', 'EMERGENCY_STOP', 'SUSPENDED', 'REVOKED'],
    mode: 'mock'
  },
  userStatus: {
    wallet: '0xlicensed',
    tenantId: 'dao-alpha',
    productId: 'product.trading-ignition',
    operationalState: 'READY',
    readiness: {
      completed: ['wallet.connected', 'academy.completed', 'proof.validated', 'license.attached', 'risk.acknowledged', 'api.withdrawals.disabled'],
      pending: [],
      blocked: []
    },
    license: { valid: true, licenseId: 'mock-license-trading-ignition' },
    apiSafety: {
      status: 'warning',
      warnings: ['Disable withdrawal permissions on the exchange API key.', 'Use IP permission/allowlist whenever the exchange supports it.']
    },
    risk: {
      preset: 'conservative',
      warnings: ['restricted/mock mode only', 'No real trading execution is enabled.']
    },
    policy: { allowed: true, automationLevel: 'manual_approval' },
    emergencyStop: { active: false },
    updatedAt: '2026-05-20T00:00:00.000Z'
  },
  blockedUserStatus: {
    wallet: '0xexpired',
    tenantId: 'dao-alpha',
    productId: 'product.trading-ignition',
    operationalState: 'RISK_RESTRICTED',
    readiness: {
      completed: ['wallet.connected'],
      pending: ['academy.completed', 'proof.validated', 'license.attached'],
      blocked: ['license_expired']
    },
    license: { valid: false, blockedReason: 'license_expired' },
    apiSafety: {
      status: 'warning',
      warnings: ['Disable withdrawal permissions on the exchange API key.', 'Use IP permission/allowlist whenever the exchange supports it.']
    },
    risk: { preset: 'conservative', warnings: ['restricted/mock mode only'] },
    policy: { allowed: false, blockedReason: 'license_expired', automationLevel: 'blocked' },
    emergencyStop: { active: false },
    updatedAt: '2026-05-20T00:00:00.000Z'
  },
  performanceRecords: [
    {
      recordId: 'perf_mock_trading_ignition_001',
      tenantId: 'dao-alpha',
      wallet: '0xlicensed',
      capabilityId: 'product.trading-ignition',
      strategyId: 'mock-grid-risk-check',
      exchange: 'mock-exchange',
      mode: 'internal-validation',
      capitalUsed: 0,
      realizedPnl: 0,
      unrealizedPnl: 0,
      drawdown: 0,
      tradeCount: 0,
      emergencyStops: 0,
      preset: 'conservative',
      warnings: ['mock record for UI validation only', 'no real trading execution or return claim is represented'],
      createdAt: '2026-01-01T00:00:00.000Z'
    }
  ],
  receipts: [
    {
      receiptId: 'receipt_mock_policy_check_001',
      correlationId: 'corr_mock_policy_check_001',
      tenantId: 'dao-alpha',
      wallet: '0xlicensed',
      consumptionLevel: 'product',
      capabilityId: 'product.trading-ignition',
      actionType: 'policy_check',
      actor: { type: 'system', id: 'acs.inspection' },
      policyDecision: {
        allowed: true,
        automationLevel: 'manual_approval',
        requiresGovernanceApproval: true,
        requiresUserLicense: true
      },
      operationalState: 'READY',
      telemetry: { warnings: ['mock audit preview only'], riskFlags: [] },
      createdAt: '2026-01-01T00:00:00.000Z'
    }
  ],
  emergencyStops: {
    mode: 'mock',
    executionImpact: 'policy_inspection_block_only',
    stops: [
      {
        stopId: 'stop_mock_user_001',
        scope: 'user',
        source: 'user',
        wallet: '0xstopped',
        capabilityId: 'product.trading-ignition',
        reason: 'mock user emergency stop for inspection',
        severity: 'critical',
        active: true,
        createdAt: '2026-01-01T00:00:00.000Z'
      }
    ],
    warnings: ['Emergency stop inspection is read-only in this phase.']
  },
  secretStorageStatus: {
    mode: 'contract-only',
    storageEnabled: false,
    plaintextStorageAllowed: false,
    frontendSecretExposureAllowed: false,
    logSecretExposureAllowed: false,
    supportedSecretTypes: ['cex-api-key', 'cex-api-secret', 'oauth-token', 'webhook-secret'],
    currentAdapter: 'MockAcsSecretStorage',
    productionAdapterRequired: 'KMS or Vault equivalent',
    frontendRules: [
      'Do not store API secrets in localStorage, sessionStorage, browser memory, or frontend logs.',
      'Display secretRef/status only; never display raw secret values.',
      'Recommend disabling withdrawal permissions and using IP permission/allowlist.'
    ],
    warnings: ['No real secret persistence is enabled.', 'No real CEX API integration is enabled.']
  }
};
