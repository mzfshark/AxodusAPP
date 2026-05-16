export const devModuleCatalog = [
  {
    key: 'overview',
    title: 'Overview',
    route: '/dashboard',
    status: 'Unified snapshot',
    description: 'Central view of the Axodus ecosystem with module health and portfolio allocation.',
  },
  {
    key: 'governance',
    title: 'Governance',
    route: '/governance',
    status: 'Mock-indexed',
    description: 'Proposal console, chain registry, and execution guardrails for dev.',
  },
  {
    key: 'acs',
    title: 'ACS',
    route: '/governance/console',
    status: 'Console-ready',
    description: 'Observability surface for governance operations and audit trails.',
  },
  {
    key: 'defi',
    title: 'Defi',
    route: '/defi',
    status: 'Read-only',
    description: 'Treasury, vault, allocation, and risk views with execution disabled.',
  },
  {
    key: 'business',
    title: 'Business',
    route: '/account',
    status: 'Mocked',
    description: 'Operating metrics, grants, deployment logs, and account health.',
  },
  {
    key: 'mining',
    title: 'Mining',
    route: '/mining',
    status: 'Mocked',
    description: 'Hashpower overview, product grid, yield trend, and live allocation view.',
  },
  {
    key: 'dex',
    title: 'Dex',
    route: '/dex',
    status: 'Mocked',
    description: 'Swap surface, liquidity pool cards, and market snapshots.',
  },
  {
    key: 'marketplace',
    title: 'Marketplace',
    route: '/marketplace',
    status: 'Mocked',
    description: 'Collectibles, subscriptions, and featured listings for dev.',
  },
  {
    key: 'academy',
    title: 'Academy',
    route: '/academy',
    status: 'Mocked',
    description: 'Learning tracks, certifications, and knowledge progress.',
  },
  {
    key: 'lottery',
    title: 'Lottery',
    route: '/lottery',
    status: 'Mocked',
    description: 'Ticket management, winner history, and transparency claims.',
  },
  {
    key: 'mcps',
    title: 'MCP Servers',
    route: '/mcps',
    status: 'Mocked',
    description: 'Server health, command stream, and system logs.',
  },
  {
    key: 'settings',
    title: 'Settings',
    route: '/settings',
    status: 'Mocked',
    description: 'Security, wallet, device, and preference state for dev.',
  },
];

export const overviewMock = {
  hero: {
    title: 'Ecosystem Overview',
    subtitle: 'Development snapshot of the Axodus modules with read-only module summaries.',
    netWorth: '$142,850.32',
    change: '+5.24%',
    focusApy: '18.4%',
    projectedYield: '+$2,189.20',
  },
  metrics: [
    { label: 'Treasury balance', value: '$82.4M', trend: '+2.1%' },
    { label: 'Open proposals', value: '14', trend: '3 awaiting review' },
    { label: 'Active products', value: '23', trend: '8 read-only' },
    { label: 'Module health', value: '98.8%', trend: 'All core routes up' },
  ],
  allocations: [
    { label: 'Mining', value: '42%', amount: '$60,000' },
    { label: 'Defi', value: '23%', amount: '$32,850' },
    { label: 'Governance', value: '20%', amount: '$27,000' },
    { label: 'Business', value: '15%', amount: '$22,000' },
  ],
  streams: [
    { product: 'Antminer S21 Pool', allocation: '$60,000', yield: '22.4% APY', risk: 'Medium', source: 'dev-mock' },
    { product: 'High-Freq ETH Bot', allocation: '$49,500', yield: '31.2% ROI', risk: 'High', source: 'dev-mock' },
    { product: 'USDC/ETH LP Vault', allocation: '$32,850', yield: '11.8% APY', risk: 'Low', source: 'dev-mock' },
  ],
  governance: [
    { proposal: 'AX-104: Expand Mining in Norway', support: '72%', timeLeft: '4 days left', tag: 'CORE' },
    { proposal: 'AX-105: Dynamic Burn Rate Adjust', support: '48%', timeLeft: '22 hours left', tag: 'ECON' },
  ],
  business: [
    { project: 'Project Helios: Data Node Cluster', progress: '85%', note: 'Hardware deployment complete.', tag: 'Ops' },
    { project: 'Project Orion: DEX Aggregator', progress: '42%', note: 'Liquidity contract auditing phase.', tag: 'Build' },
  ],
};

export const defiMock = {
  metrics: [
    { label: 'Treasury visibility', value: '$0.00', detail: 'Awaiting indexed treasury source' },
    { label: 'Active allocations', value: '0', detail: 'No live allocation adapter connected' },
    { label: 'Vault exposure', value: 'Read-only', detail: 'Execution disabled until governance guards are live' },
    { label: 'Risk posture', value: 'Pending', detail: 'Risk registry not connected yet' },
  ],
  vaults: [
    { name: 'Treasury Reserve', status: 'Not connected', network: 'Governance selected chain', exposure: '0%' },
    { name: 'Protocol Liquidity', status: 'Not connected', network: 'Governance selected chain', exposure: '0%' },
  ],
  notes: [
    'No APY, yield, or treasury value is displayed until sourced from a verified Defi adapter.',
    'Execution controls remain intentionally absent in this phase.',
    'Governance approval and wallet chain validation are required before any future write flow.',
  ],
};

export const businessMock = {
  metrics: [
    { label: 'Active developers', value: '1,402', trend: '+12%' },
    { label: 'New projects', value: '84', trend: '+5' },
    { label: 'GitHub activity', value: '12.8k', trend: '-2%' },
  ],
  api: [
    { label: 'Request count', value: '4.2M' },
    { label: 'Avg latency', value: '24ms' },
    { label: 'Error rate', value: '0.04%' },
  ],
  grants: [
    { name: 'NeuralNode Protocol', stage: 'Phase 2: L2 Integration', amount: '$125,000', status: '65% Complete' },
    { name: 'Vortex DEX', stage: 'Phase 1: Liquidity Launch', amount: '$40,000', status: 'Pending Review' },
    { name: 'OmniBridge', stage: 'Ecosystem Milestone: 1k users', amount: '$15,000', status: 'Goal Reached' },
  ],
  logs: [
    { time: '14:22:05', level: 'SUCCESS', message: 'Mainnet-alpha node cluster upgraded to v2.4.1.' },
    { time: '12:10:48', level: 'INFO', message: 'New validator set election completed.' },
    { time: '09:45:12', level: 'WARN', message: 'Latency spike detected in Asian region endpoints.' },
    { time: '08:00:00', level: 'SYSTEM', message: 'Daily snapshot archived to decentralized storage.' },
  ],
};

export const academyMock = {
  stats: [
    { label: 'Weekly progress', value: '74%', detail: 'Knowledge streams on track' },
    { label: 'Knowledge points', value: '12,480', detail: 'Accumulated by dev users' },
    { label: 'Certifications', value: '03', detail: 'In progress' },
  ],
  courses: [
    { level: 'Beginner', title: 'Intro to $NEURONS', progress: '40% completed', instructor: 'Dr. Aris V.' },
    { level: 'Advanced', title: 'Smart Contract Auditing', progress: 'Not started', instructor: 'Sarah Chen' },
    { level: 'Intermediate', title: 'DeFi Yield Strategies', progress: '15% completed', instructor: 'Marcus Aurel' },
    { level: 'Pro', title: 'Cybersecurity Protocol', progress: 'Locked', instructor: 'Leo Knight' },
  ],
  subscriptions: [
    { title: 'Axodus Dev Pro', detail: 'Monthly access to SDKs', price: '25 $N' },
    { title: 'Market Alpha', detail: 'Real-time whale alerts', price: '40 $N' },
    { title: 'Governance Insights', detail: 'Proposal intelligence feed', price: '18 $N' },
  ],
};

export const marketplaceMock = {
  hero: {
    title: 'Neural Architect X-1',
    subtitle: 'Generative dev mock asset for the Marketplace module.',
    currentBid: '4,200 $NEURONS',
    usdValue: '$12,450.00 USD',
    artist: '@NeuroSynth',
    chain: 'Axodus Mainnet',
    rarity: 'Mythic',
  },
  collectibles: [
    { name: 'Void Shard #02', creator: 'CyberRelic', price: '120 $N', usd: '($450)', rarity: 'RARE' },
    { name: 'Neo Citizen G-14', creator: 'AlphaDesign', price: '450 $N', usd: '($1,280)', rarity: 'LEGENDARY' },
    { name: 'Grid Horizon', creator: 'Minimalist', price: '15 $N', usd: '($45)', rarity: 'COMMON' },
    { name: 'Prism Pulse', creator: 'LightStream', price: '85 $N', usd: '($290)', rarity: 'EPIC' },
  ],
  subscriptions: [
    { title: 'Axodus Dev Pro', detail: 'SDK access and technical feeds', price: '25 $N/mo', icon: 'Terminal' },
    { title: 'Market Alpha', detail: 'Real-time market signals', price: '40 $N/mo', icon: 'Chart' },
    { title: 'Governance Radar', detail: 'Proposal alerts and summaries', price: '18 $N/mo', icon: 'Radar' },
  ],
};

export const miningMock = {
  metrics: [
    { label: 'Global hashrate', value: '642.1', suffix: 'EH/s', detail: '+2.4% vs last week' },
    { label: 'Next adjustment', value: '3d 14h', detail: 'Est: +1.2% difficulty' },
    { label: 'BTC price', value: '$68,241', detail: 'Active market volatility' },
    { label: 'Total rewards', value: '0.482 BTC', detail: 'Valued at $32,892.16' },
  ],
  products: [
    { name: 'Minto Finance', ticker: '$BTCMT', hashpower: '125 TH/s', yield: '0.00042 BTC', detail: 'Efficiency: 35J/T' },
    { name: 'GoMining', ticker: '$GOMINING', hashpower: '450 TH/s', yield: '0.0015 BTC', detail: 'Maint: $0.05/TH' },
    { name: 'BitFuFu', ticker: '$FUFU', hashpower: '150 TH/s', yield: '14.2% APR', detail: 'Paid in BTC' },
  ],
  distribution: [
    { label: 'GoMining NFT Fleet', amount: '450 TH/s', weight: '62%' },
    { label: 'Minto Finance', amount: '125 TH/s', weight: '17%' },
    { label: 'BitFuFu Cloud', amount: '150 TH/s', weight: '21%' },
  ],
  logs: [
    { time: '14:02:11', level: 'INFO', message: 'Morpheus connection handshake established.' },
    { time: '14:02:22', level: 'WARN', message: 'High memory pressure detected in sub-process [3391].' },
    { time: '14:03:05', level: 'FAIL', message: 'Recovery failed. Manual intervention required.' },
    { time: '14:05:00', level: 'READY', message: 'System scanning complete. Ready for commands.' },
  ],
};

export const dexMock = {
  summary: [
    { label: '24h volume', value: '$18.4M' },
    { label: 'Pairs', value: '64' },
    { label: 'Spread', value: '0.18%' },
  ],
  pools: [
    { pair: 'AXO/USDC', liquidity: '$7.2M', apr: '16.4%', change: '+2.1%' },
    { pair: 'ETH/AXO', liquidity: '$4.1M', apr: '11.2%', change: '+0.8%' },
    { pair: 'BTC/USDC', liquidity: '$6.8M', apr: '9.5%', change: '+1.3%' },
  ],
  swaps: [
    { label: 'From', token: '$NEURONS', balance: '14,250.00', amount: '1,000' },
    { label: 'To', token: '$USDC', balance: '9,820.55', amount: '1,241.00' },
  ],
  activity: [
    { time: '12:10', type: 'Swap', detail: '124,000 AXO -> USDC' },
    { time: '12:02', type: 'Add Liquidity', detail: 'AXO/USDC pool increased by 5.2%' },
    { time: '11:48', type: 'Route', detail: 'Best price aggregated from 4 venues' },
  ],
};

export const lotteryMock = {
  stats: [
    { label: 'Jackpot', value: '250,000 $NEURONS' },
    { label: 'Next draw', value: '04:22:10' },
    { label: 'Pool fill', value: '82%' },
  ],
  winners: [
    { wallet: '0x72...e901', prize: 'Won 50,000 $NEURONS', time: '2m ago' },
    { wallet: '0x31...f22b', prize: 'Won 12,400 $NEURONS', time: '15m ago' },
    { wallet: '0x99...a104', prize: 'Won 250,000 $NEURONS', time: '1h ago' },
    { wallet: '0xaa...88cc', prize: 'Won 2,100 $NEURONS', time: '3h ago' },
  ],
  tickets: [
    { game: 'Super7 Weekly', id: '#TXN-882104', numbers: ['04', '12', '29', '35', '40', '55', '11'], drawIn: '14:02:11' },
    { game: 'EasyLotto Hourly', id: '#TXN-901122', numbers: ['08', '19', '33', '04'], drawIn: '00:44:05' },
  ],
  transparency: [
    { title: 'Provably Fair', detail: 'Every draw is hashed and verifiable on-chain.' },
    { title: 'Instant Payouts', detail: 'Winnings are automatically sent to the wallet.' },
    { title: 'No Hidden Fees', detail: 'Transparent ticket costs with 98% to winners.' },
  ],
};

export const mcpMock = {
  servers: [
    { name: 'Morpheus', id: 'AX-001-MRP', uptime: '99.9%', latency: '12ms', load: '42%', status: 'Online' },
    { name: 'Agent Smith', id: 'AX-002-ASM', uptime: '100%', latency: '8ms', load: '18%', status: 'Online' },
    { name: 'Trading', id: 'AX-003-TRD', uptime: '98.4%', latency: '45ms', load: '89%', status: 'Warning' },
    { name: 'RedHat', id: 'AX-004-RHT', uptime: '0%', latency: '---', load: '0%', status: 'Offline' },
  ],
  logs: [
    '[14:02:11] INFO Morpheus connection handshake established.',
    '[14:02:22] WARN Trading memory pressure detected.',
    '[14:03:05] FAIL RedHat recovery failed.',
    '[14:05:00] READY System scanning complete.',
  ],
  commands: ['status', 'restart morpheus', 'sync ledgers', 'audit chain registry'],
};

export const settingsMock = {
  profile: {
    theme: 'Dark',
    notifications: 'Enabled',
    wallet: 'Metamask',
    chain: 'Ethereum',
    address: '0x...1234',
  },
  security: [
    { title: 'Two-factor authentication', status: 'Enabled', detail: 'Google Authenticator' },
    { title: 'API key management', status: 'Pending', detail: 'No key configured' },
  ],
  devices: [
    { name: 'Meu Desktop', location: 'Sao Paulo, Brasil', status: 'Active', lastSeen: 'Agora' },
    { name: 'Meu Celular', location: 'Rio de Janeiro, Brasil', status: 'Active', lastSeen: '10 min atras' },
    { name: 'Meu Tablet', location: 'Sao Paulo, Brasil', status: 'Inactive', lastSeen: '2 dias atras' },
  ],
  activity: [
    { title: 'Login bem-sucedido', detail: 'De Sao Paulo', time: '2 minutos atras' },
    { title: 'Senha alterada', detail: 'Em Minha Conta', time: '1 hora atras' },
    { title: 'Carteira desconectada', detail: 'Session closed', time: '5 horas atras' },
    { title: 'Tema alterado', detail: 'Dark mode applied', time: 'Yesterday' },
  ],
};

export const connectMock = {
  title: 'Connect your Wallet',
  subtitle: 'Wallet connection is required for protected routes. In dev, the UI stays explicit when the project id is not configured.',
  badges: ['No MQTT', 'No Hummingbot', 'No localhost:8000 polling'],
  note: 'Configure VITE_WALLETCONNECT_PROJECT_ID to enable the interactive wallet modal.',
};

