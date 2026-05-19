import { NavLink } from 'react-router-dom';
import { BriefcaseBusiness, Handshake, LayoutDashboard, LibraryBig, Megaphone, ShieldCheck } from 'lucide-react';

const bbaNavItems = [
  { to: '/bba', label: 'Home', icon: LayoutDashboard, end: true },
  { to: '/bba/services', label: 'Services', icon: BriefcaseBusiness },
  { to: '/bba/portfolio', label: 'Portfolio', icon: LibraryBig },
  { to: '/bba/campaigns', label: 'Campaigns', icon: Megaphone },
  { to: '/bba/partnerships', label: 'Partnerships', icon: Handshake },
  { to: '/bba/governance', label: 'Governance', icon: ShieldCheck },
];

const navClass = ({ isActive }) =>
  `inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
    isActive
      ? 'border-primary/40 bg-primary/15 text-on-surface'
      : 'border-white/10 bg-surface-container-low text-outline hover:border-white/20 hover:text-on-surface'
  }`;

export default function BbaSectionNav() {
  return (
    <nav className="flex gap-2 overflow-x-auto pb-1" aria-label="BBA section navigation">
      {bbaNavItems.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.end} className={navClass}>
          <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
