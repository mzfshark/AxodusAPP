export const lotteryMock = {
  summary: { status: 'read-only preview', activeDraws: 2, completedDraws: 12, pendingDraws: 1, vrfStatus: 'mock verified', ticketMintingStatus: 'disabled' },
  draws: [
    { id: 'lottery-draw-001', name: 'Axodus Lotofacil Preview', gameType: 'Lotofacil-style', status: 'active-preview', chain: 'Polygon', ticketPrice: '0 mock', ticketMintingEnabled: false, drawDate: '2026-05-23T00:00:00.000Z', prizePool: '25,000 $Neurons mock locked', numbersRequired: 15, vrfStatus: 'mock-ready', merkleRootStatus: 'pending', description: 'Frontend-only draw preview with ticket minting disabled.' },
    { id: 'lottery-draw-002', name: 'SuperSete Governance Draw', gameType: 'SuperSete-style', status: 'pending-review', chain: 'Harmony', ticketPrice: '0 mock', ticketMintingEnabled: false, drawDate: '2026-05-30T00:00:00.000Z', prizePool: '10,000 $Neurons mock locked', numbersRequired: 7, vrfStatus: 'mock-ready', merkleRootStatus: 'pending', description: 'Governance-controlled draw placeholder.' },
    { id: 'lottery-draw-003', name: 'Custom Axodus Draw', gameType: 'Custom Axodus Draw', status: 'draft', chain: 'Base', ticketPrice: '0 mock', ticketMintingEnabled: false, drawDate: null, prizePool: '0', numbersRequired: 5, vrfStatus: 'not-connected', merkleRootStatus: 'not-generated', description: 'Draft custom game for UI empty states.' },
  ],
};
