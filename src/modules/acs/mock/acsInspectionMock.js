export const acsInspectionMock = {
  health: { status: 'ok', mode: 'inspection', automation: 'disabled' },
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
  }
};

