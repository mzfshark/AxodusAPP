import { EVM_CHAINS, MOCK_NOTICE } from './constants';

export const ecosystemMock = {
  overview: {
    name: 'Axodus',
    version: '0.1-dev',
    environment: 'Frontend Dev',
    mvpPhase: 'Governance + ACS + Defi',
    primaryNetwork: 'Harmony',
    supportedNetworks: EVM_CHAINS.map((chain) => chain.name),
    governanceFirstStatus: 'active',
    activeNuclei: ['Governance', 'ACS', 'Defi', 'Academy', 'Marketplace', 'Mining', 'DEX', 'Lottery', 'MCPs', 'Settings', 'Connect / Wallet'],
    plannedNuclei: ['Trading legacy replacement', 'Business automation', 'BBA Agency'],
    disabledNuclei: ['Legacy Trading', 'Hummingbot', 'MQTT realtime'],
    riskNotice: 'Financial execution remains disabled until governance controls and adapters are validated.',
    mockNotice: MOCK_NOTICE,
  },
  nucleiRegistry: [
    { id: 'nucleus-governance', name: 'Governance', route: '/governance', status: 'active', maturity: 'mvp-base', ownerLayer: 'constitutional', dependencies: ['wallet', 'chain-registry'], enabled: true, comingSoon: false, description: 'DAO registry, proposals, guardrails, and execution readiness.' },
    { id: 'nucleus-acs', name: 'ACS', route: '/governance/console', status: 'active', maturity: 'mvp-base', ownerLayer: 'observability', dependencies: ['governance'], enabled: true, comingSoon: false, description: 'Agent and workflow observability for frontend validation.' },
    { id: 'nucleus-defi', name: 'Defi', route: '/defi', status: 'read-only', maturity: 'mvp-base', ownerLayer: 'treasury', dependencies: ['governance', 'wallet'], enabled: true, comingSoon: false, description: 'Read-only treasury, vault, allocation, and risk overview.' },
    { id: 'nucleus-academy', name: 'Academy', route: '/academy', status: 'preview', maturity: 'mock-preview', ownerLayer: 'education', dependencies: ['marketplace'], enabled: true, comingSoon: false, description: 'Courses, tutors, rewards, and learning progress.' },
    { id: 'nucleus-marketplace', name: 'Marketplace', route: '/marketplace', status: 'preview', maturity: 'mock-preview', ownerLayer: 'commerce', dependencies: ['governance'], enabled: true, comingSoon: false, description: 'Products, sellers, licenses, and validation flows.' },
    { id: 'nucleus-mining', name: 'Mining', route: '/mining', status: 'preview', maturity: 'mock-preview', ownerLayer: 'operations', dependencies: ['governance'], enabled: true, comingSoon: false, description: 'Mining pools, policy, and emission visibility.' },
    { id: 'nucleus-dex', name: 'DEX', route: '/dex', status: 'read-only', maturity: 'mock-preview', ownerLayer: 'liquidity', dependencies: ['wallet'], enabled: true, comingSoon: false, description: 'Pairs, liquidity, and disabled swap previews.' },
    { id: 'nucleus-lottery', name: 'Lottery', route: '/lottery', status: 'read-only', maturity: 'mock-preview', ownerLayer: 'campaigns', dependencies: ['governance'], enabled: true, comingSoon: false, description: 'Draws, VRF status, and disabled ticket minting.' },
    { id: 'nucleus-mcps', name: 'MCPs', route: '/mcps', status: 'preview', maturity: 'mock-preview', ownerLayer: 'automation', dependencies: ['acs'], enabled: true, comingSoon: false, description: 'MCP service catalog and governance approval state.' },
    { id: 'nucleus-settings', name: 'Settings', route: '/settings', status: 'active', maturity: 'utility', ownerLayer: 'app', dependencies: [], enabled: true, comingSoon: false, description: 'App settings and feature flags.' },
    { id: 'nucleus-wallet', name: 'Connect / Wallet', route: '/connect', status: 'active', maturity: 'utility', ownerLayer: 'wallet', dependencies: ['reown'], enabled: true, comingSoon: false, description: 'Wallet states and supported chain metadata.' },
  ],
};
