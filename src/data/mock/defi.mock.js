import { MOCK_DATES, MOCK_NOTICE } from './constants';

export const defiMock = {
  summary: { treasuryValueMock: '$82.4M mock', vaultCount: 4, activeAllocations: 4, riskScore: 'Medium', liquidityStatus: 'read-only', pendingGovernanceActions: 2, readOnlyMode: true, financialDisclaimer: MOCK_NOTICE },
  treasuryOverview: { totalValue: '$82.4M mock', stableAllocation: 48, volatileAllocation: 18, protocolAllocation: 22, reserveAllocation: 12, lastUpdated: MOCK_DATES.recent, mock: true },
  vaults: [
    { id: 'defi-vault-001', name: 'Treasury Reserve', type: 'Reserve', status: 'read-only', chain: 'Ethereum', asset: 'USDC', allocation: '$39.5M mock', riskLevel: 'low', strategy: 'Capital preservation', depositsEnabled: false, withdrawalsEnabled: false, stakingEnabled: false, governanceControlled: true, description: 'Stable reserve view for governance-controlled treasury reporting.' },
    { id: 'defi-vault-002', name: 'Protocol Liquidity', type: 'Liquidity', status: 'read-only', chain: 'Polygon', asset: 'USDC/ETH', allocation: '$18.1M mock', riskLevel: 'medium', strategy: 'Liquidity support preview', depositsEnabled: false, withdrawalsEnabled: false, stakingEnabled: false, governanceControlled: true, description: 'Mock liquidity exposure for frontend validation.' },
    { id: 'defi-vault-003', name: 'Operations Buffer', type: 'Operations', status: 'read-only', chain: 'Base', asset: 'USDC', allocation: '$9.8M mock', riskLevel: 'low', strategy: 'Operational runway', depositsEnabled: false, withdrawalsEnabled: false, stakingEnabled: false, governanceControlled: true, description: 'Operational buffer visible to governance reviewers.' },
    { id: 'defi-vault-004', name: 'Research Allocation', type: 'Research', status: 'paused', chain: 'Arbitrum', asset: 'ETH', allocation: '$15.0M mock', riskLevel: 'medium', strategy: 'Protocol research allocation', depositsEnabled: false, withdrawalsEnabled: false, stakingEnabled: false, governanceControlled: true, description: 'Paused research allocation until adapters are approved.' },
  ],
  allocations: [
    { label: 'Stable reserve', value: 39.5, percentage: 48, category: 'reserve', riskLevel: 'low' },
    { label: 'Protocol liquidity', value: 18.1, percentage: 22, category: 'liquidity', riskLevel: 'medium' },
    { label: 'Operations buffer', value: 9.8, percentage: 12, category: 'operations', riskLevel: 'low' },
    { label: 'Research allocation', value: 15.0, percentage: 18, category: 'research', riskLevel: 'medium' },
  ],
  riskOverview: { riskScore: 'Medium', exposureLevel: 'Controlled', concentrationRisk: 'Moderate', liquidityRisk: 'Low', smartContractRisk: 'Pending adapter audit', oracleRisk: 'Not connected', governanceRisk: 'Requires proposal approval' },
};
