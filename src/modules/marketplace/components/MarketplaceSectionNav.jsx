import { NavLink } from 'react-router-dom';
import { FilePlus2, Images, Landmark, LayoutDashboard, LibraryBig, ListChecks, PackageCheck, Repeat2, ShieldCheck, Tags, UploadCloud, WalletCards } from 'lucide-react';

const items = [
  { to: '/marketplace', label: 'Home', icon: LayoutDashboard, end: true },
  { to: '/marketplace/explore', label: 'Explore', icon: Tags },
  { to: '/marketplace/assets', label: 'Assets', icon: Images },
  { to: '/marketplace/listings', label: 'Listings', icon: ListChecks },
  { to: '/marketplace/create', label: 'Create/Sell', icon: FilePlus2 },
  { to: '/marketplace/orders', label: 'Orders', icon: PackageCheck },
  { to: '/marketplace/subscriptions', label: 'Subscriptions', icon: Repeat2 },
  { to: '/marketplace/treasury', label: 'Treasury', icon: Landmark },
  { to: '/marketplace/publisher', label: 'Publisher', icon: UploadCloud },
  { to: '/marketplace/governance', label: 'Governance', icon: ShieldCheck },
  { to: '/marketplace/licenses', label: 'Licenses', icon: WalletCards },
  { to: '/marketplace/dashboard', label: 'Dashboard', icon: LibraryBig },
];

const navClass = ({ isActive }) =>
  `inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
    isActive
      ? 'border-primary/40 bg-primary/15 text-on-surface'
      : 'border-white/10 bg-surface-container-low text-outline hover:border-white/20 hover:text-on-surface'
  }`;

export default function MarketplaceSectionNav() {
  return (
    <nav className="flex gap-2 overflow-x-auto pb-1" aria-label="Marketplace section navigation">
      {items.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.end} className={navClass}>
          <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
