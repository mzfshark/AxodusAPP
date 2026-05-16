export const miningMock = {
  summary: { miningStatus: 'read-only preview', activePools: 3, estimatedEmissions: '128,000 $Neurons mock', rewardPolicy: 'Governance controlled emissions', governanceControlled: true, operationalStatus: 'mock telemetry' },
  pools: [
    { id: 'mining-pool-001', name: 'Axodus BTC Reserve Pool', asset: 'BTC exposure', chain: 'Ethereum', status: 'observing', allocation: '42% mock', rewardPolicy: 'locked rewards only', riskLevel: 'medium', description: 'Mock mining exposure for dashboard cards.' },
    { id: 'mining-pool-002', name: 'Partner Hashpower Pool', asset: 'hashpower units', chain: 'Polygon', status: 'pending-review', allocation: '28% mock', rewardPolicy: 'governance-reviewed', riskLevel: 'medium', description: 'Partner mining allocation awaiting policy validation.' },
    { id: 'mining-pool-003', name: 'Research Emissions Pool', asset: '$Neurons', chain: 'Harmony', status: 'paused', allocation: '30% mock', rewardPolicy: 'reserved', riskLevel: 'low', description: 'Emission reserve used for dev charts.' },
  ],
  emissionData: [
    { epoch: 'E-001', emitted: 12000, reserved: 5000, distributed: 3000, locked: 3500, burned: 500 },
    { epoch: 'E-002', emitted: 14000, reserved: 5200, distributed: 3600, locked: 4300, burned: 900 },
    { epoch: 'E-003', emitted: 13000, reserved: 4800, distributed: 3400, locked: 4100, burned: 700 },
  ],
};
