import { BarChart3, Boxes, ClipboardCheck, FileText, Landmark, Pickaxe, ShieldAlert, Vault } from 'lucide-react';

export const miningNavItems = [
  { to: '/mining', label: 'Overview', icon: BarChart3, end: true },
  { to: '/mining/providers', label: 'Providers', icon: Pickaxe },
  { to: '/mining/hash-tokens', label: 'Hash Tokens', icon: Boxes },
  { to: '/mining/vaults', label: 'Vaults', icon: Vault },
  { to: '/mining/allocations', label: 'Allocations', icon: BarChart3 },
  { to: '/mining/treasury', label: 'Treasury', icon: Landmark },
  { to: '/mining/risk', label: 'Risk', icon: ShieldAlert },
  { to: '/mining/governance', label: 'Governance', icon: ClipboardCheck },
  { to: '/mining/reports', label: 'Reports', icon: FileText }
];

