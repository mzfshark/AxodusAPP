import {
  Banknote,
  BriefcaseBusiness,
  Building,
  Coins,
  FilePlus2,
  Gauge,
  GraduationCap,
  LayoutDashboard,
  Landmark,
  LibraryBig,
  Network,
  Pickaxe,
  Route,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Tags,
  Ticket,
  WalletCards,
} from 'lucide-react';

const nuclei = [
  {
    id: 'overview',
    label: 'Overview',
    shortLabel: 'Home',
    routeBase: '/dashboard',
    match: ['/', '/dashboard'],
    icon: Gauge,
    tone: 'core',
    summary: 'Unified ecosystem operating view',
  },
  {
    id: 'mining',
    label: 'Mining',
    routeBase: '/mining',
    icon: Pickaxe,
    tone: 'infrastructure',
    summary: 'Allocation, providers and hash-token operations',
    sections: [
      { to: '/mining', label: 'Overview', icon: LayoutDashboard, end: true },
      { to: '/mining/providers', label: 'Providers', icon: Pickaxe },
      { to: '/mining/hash-tokens', label: 'Hash Tokens', icon: LibraryBig },
      { to: '/mining/vaults', label: 'Vaults', icon: WalletCards },
      { to: '/mining/allocations', label: 'Allocations', icon: SlidersHorizontal },
      { to: '/mining/treasury', label: 'Treasury', icon: Landmark },
      { to: '/mining/risk', label: 'Risk', icon: ShieldCheck },
      { to: '/mining/governance', label: 'Governance', icon: ShieldCheck },
      { to: '/mining/reports', label: 'Reports', icon: LibraryBig },
    ],
  },
  {
    id: 'defi',
    label: 'Treasury & Defi',
    shortLabel: 'Defi',
    routeBase: '/defi',
    icon: Banknote,
    tone: 'treasury',
    summary: 'Treasury, vault and protocol finance surfaces',
    sections: [
      { to: '/defi', label: 'Dashboard', icon: LayoutDashboard, end: true },
    ],
  },
  {
    id: 'acs',
    label: 'ACS',
    routeBase: '/mcps',
    icon: Network,
    tone: 'infrastructure',
    summary: 'Agent, automation and cognitive service operations',
    sections: [
      { to: '/mcps', label: 'Service Monitor', icon: Network, end: true },
    ],
  },
  {
    id: 'governance',
    label: 'Governance',
    routeBase: '/governance',
    match: ['/governance', '/dao'],
    icon: Landmark,
    tone: 'constitutional',
    summary: 'DAO tenant operations and constitutional execution',
    sections: [
      { to: '/governance', label: 'Landing', icon: LayoutDashboard, end: true },
      { to: '/governance/console', label: 'Console', icon: Landmark },
      { to: '/dao', label: 'DAO Context', icon: ShieldCheck },
    ],
  },
  {
    id: 'business',
    label: 'Business',
    routeBase: '/account',
    icon: BriefcaseBusiness,
    tone: 'enterprise',
    summary: 'Enterprise account and client operating context',
    sections: [
      { to: '/account', label: 'Account', icon: BriefcaseBusiness, end: true },
    ],
  },
  {
    id: 'marketplace',
    label: 'Marketplace',
    routeBase: '/marketplace',
    match: ['/marketplace', '/item'],
    icon: ShoppingCart,
    tone: 'commerce',
    summary: 'Product discovery, licenses and seller operations',
    sections: [
      { to: '/marketplace', label: 'Home', icon: LayoutDashboard, end: true },
      { to: '/marketplace/explore', label: 'Explore', icon: Tags },
      { to: '/marketplace/create', label: 'Create/Sell', icon: FilePlus2 },
      { to: '/marketplace/governance', label: 'Governance', icon: ShieldCheck },
      { to: '/marketplace/licenses', label: 'Licenses', icon: WalletCards },
      { to: '/marketplace/dashboard', label: 'Dashboard', icon: LibraryBig },
    ],
    filterGroups: [
      {
        label: 'Categories',
        items: [
          { label: 'Education', to: '/marketplace/explore?category=Education' },
          { label: 'Governance', to: '/marketplace/explore?category=Governance' },
          { label: 'MCPs', to: '/marketplace/explore?category=MCPs' },
          { label: 'Trading', to: '/marketplace/explore?category=Trading' },
        ],
      },
      {
        label: 'Governance',
        items: [
          { label: 'Compliant', to: '/marketplace/explore?governanceStatus=compliant' },
          { label: 'Under review', to: '/marketplace/explore?governanceStatus=under-review' },
          { label: 'Restricted', to: '/marketplace/explore?governanceStatus=restricted' },
        ],
      },
      {
        label: 'Listing',
        items: [
          { label: 'Fixed price', to: '/marketplace/explore?listingType=fixed' },
          { label: 'Auction', to: '/marketplace/explore?listingType=auction' },
        ],
      },
    ],
  },
  {
    id: 'bba',
    label: 'BBA Agency',
    routeBase: '/bba',
    icon: Building,
    tone: 'agency',
    summary: 'Institutional brand, campaign and partnership operations',
    sections: [
      { to: '/bba', label: 'Home', icon: LayoutDashboard, end: true },
      { to: '/bba/services', label: 'Services', icon: BriefcaseBusiness },
      { to: '/bba/portfolio', label: 'Portfolio', icon: LibraryBig },
      { to: '/bba/campaigns', label: 'Campaigns', icon: Tags },
      { to: '/bba/partnerships', label: 'Partnerships', icon: Network },
      { to: '/bba/governance', label: 'Governance', icon: ShieldCheck },
    ],
  },
  {
    id: 'academy',
    label: 'Academy',
    routeBase: '/academy',
    icon: GraduationCap,
    tone: 'learning',
    summary: 'Learning, credentials and reward progression',
    sections: [
      { to: '/academy', label: 'Home', icon: GraduationCap, end: true },
      { to: '/academy/courses', label: 'Courses', icon: LibraryBig },
      { to: '/academy/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/academy/progress', label: 'Progress Engine', icon: Gauge },
      { to: '/academy/certifications', label: 'Certifications', icon: ShieldCheck },
      { to: '/academy/rewards', label: 'Rewards', icon: Banknote },
      { to: '/academy/governance-review', label: 'Governance Review', icon: Landmark },
      { to: '/academy/paths/path-governance-operator', label: 'Learning Path', icon: Route },
    ],
    filterGroups: [
      {
        label: 'Categories',
        items: [
          { label: 'Governance', to: '/academy/courses?category=Governance' },
          { label: 'Treasury', to: '/academy/courses?category=Treasury' },
          { label: 'Marketplace', to: '/academy/courses?category=Marketplace' },
          { label: 'Proof of Knowledge', to: '/academy/courses?category=Proof%20of%20Knowledge' },
        ],
      },
      {
        label: 'Access',
        items: [
          { label: 'Free', to: '/academy/courses?accessType=free' },
          { label: 'Paid', to: '/academy/courses?accessType=paid' },
        ],
      },
      {
        label: 'Reward',
        items: [
          { label: 'Locked $NEURONS', to: '/academy/courses?rewardType=Locked%20%24NEURONS' },
          { label: 'Unlocked $NEURONS', to: '/academy/courses?rewardType=Unlocked%20%24NEURONS' },
        ],
      },
    ],
  },
  {
    id: 'dex',
    label: 'DEX',
    routeBase: '/dex',
    icon: Coins,
    tone: 'liquidity',
    summary: 'Liquidity, routing and token market access',
    sections: [
      { to: '/dex', label: 'Swap', icon: Coins, end: true },
    ],
  },
  {
    id: 'lottery',
    label: 'Lottery',
    routeBase: '/lottery',
    icon: Ticket,
    tone: 'campaign',
    summary: 'Draws, prize pools and randomness visibility',
    sections: [
      { to: '/lottery', label: 'Dashboard', icon: LayoutDashboard, end: true },
      { to: '/lottery/draws', label: 'Draws', icon: Ticket },
      { to: '/lottery/game-models', label: 'Game models', icon: SlidersHorizontal },
      { to: '/lottery/tickets', label: 'Tickets', icon: WalletCards },
      { to: '/lottery/prizes', label: 'Prize pools', icon: Banknote },
      { to: '/lottery/governance', label: 'Governance', icon: ShieldCheck },
      { to: '/lottery/randomness', label: 'Randomness', icon: Network },
      { to: '/lottery/history', label: 'History', icon: LibraryBig },
    ],
  },
];

export const appShellNav = {
  primary: nuclei,
  secondary: [
    {
      id: 'settings',
      label: 'Settings',
      routeBase: '/settings',
      icon: Settings,
      tone: 'core',
      summary: 'Preferences, access and account settings',
    },
  ],
};

export const shellSearchMeta = {
  icon: Search,
  placeholder: 'Search modules, DAOs, products...',
};

const allShellItems = [...appShellNav.primary, ...appShellNav.secondary];

function pathMatchesItem(pathname, item) {
  const matches = item.match ?? [item.routeBase];

  return matches.some((route) => {
    if (route === '/') return pathname === '/';
    return pathname === route || pathname.startsWith(`${route}/`);
  });
}

export function getActiveShellItem(pathname) {
  return allShellItems.find((item) => pathMatchesItem(pathname, item)) ?? appShellNav.primary[0];
}
