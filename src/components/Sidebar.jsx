// src/components/Sidebar.jsx

import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import useDarkMode from '../hooks/useDarkMode';

const primaryNavItems = [
  { to: "/dashboard", icon: "dashboard", label: "Overview", filled: true },
  { to: "/mining", icon: "bolt", label: "Mining" },
  { to: "/trading/bots", icon: "swap_horiz", label: "Trading" },
  { to: "/portfolio", icon: "layers", label: "Staking" },
  { to: "/dao", icon: "account_balance", label: "DAOs" },
  { to: "/account", icon: "business_center", label: "Business" },
  { to: "/marketplace", icon: "shopping_cart", label: "Marketplace" },
  { to: "/academy", icon: "school", label: "Academy" },
  { to: "/dex", icon: "currency_exchange", label: "DEX" },
  { to: "/lottery", icon: "casino", label: "Lottery" },
];

const secondaryNavItems = [
  { to: "/mcps", icon: "dns", label: "MCP Servers" },
];

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 px-3 py-2.5 rounded-lg ${
    isActive
      ? 'active-nav-item shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] active:translate-x-1 transition-transform'
      : 'text-slate-500 hover:text-slate-300 hover:bg-surface-container-low transition-all duration-300'
  }`;

function NavItems({ onNavigate }) {
  return (
    <>
      {primaryNavItems.map((item) => (
        <NavLink key={item.to} to={item.to} onClick={onNavigate} className={navLinkClass}>
          <span
            className="material-symbols-outlined"
            style={item.filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            {item.icon}
          </span>
          <span>{item.label}</span>
        </NavLink>
      ))}

      <div className="h-px bg-white/5 my-4"></div>

      {secondaryNavItems.map((item) => (
        <NavLink key={item.to} to={item.to} onClick={onNavigate} className={navLinkClass}>
          <span className="material-symbols-outlined">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </>
  );
}

function ThemeToggle({ theme, setTheme }) {
  return (
    <div className="flex items-center justify-between bg-surface-container-low p-1.5 rounded-xl border border-white/5">
      <button
        onClick={() => setTheme('light')}
        className={`flex items-center justify-center w-1/3 py-1.5 rounded-lg transition-all duration-200 ${theme === 'light' ? 'active-nav-item shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
        title="Light Theme"
      >
        <span className="material-symbols-outlined text-[18px]">light_mode</span>
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`flex items-center justify-center w-1/3 py-1.5 rounded-lg transition-all duration-200 ${theme === 'system' ? 'active-nav-item shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
        title="System Theme"
      >
        <span className="material-symbols-outlined text-[18px]">brightness_auto</span>
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`flex items-center justify-center w-1/3 py-1.5 rounded-lg transition-all duration-200 ${theme === 'dark' ? 'active-nav-item shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
        title="Dark Theme"
      >
        <span className="material-symbols-outlined text-[18px]">dark_mode</span>
      </button>
    </div>
  );
}

export default function Sidebar() {
  const [theme, setTheme] = useDarkMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="mobile-menu-button md:hidden fixed top-16 left-4 z-[70] h-11 w-11 rounded-xl border shadow-lg backdrop-blur-md flex items-center justify-center"
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isMobileMenuOpen}
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-14 bottom-0 z-[65]">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          />
          <aside className="app-sidebar-panel absolute left-0 top-0 h-full w-[min(20rem,85vw)] py-6 px-4 flex flex-col gap-y-1 overflow-y-auto border-r font-['Inter'] font-medium text-sm shadow-2xl">
            <div className="px-2 mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold mb-1">Ecosystem</div>
                <div className="text-on-surface/50 text-[10px]">v2.4.0 Obsidian</div>
              </div>
              <button
                type="button"
                className="h-9 w-9 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-surface-container-low flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              <NavItems onNavigate={() => setIsMobileMenuOpen(false)} />
            </nav>
            <div className="mt-auto pt-6 px-2">
              <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>
          </aside>
        </div>
      )}

      <aside className="app-sidebar-panel hidden md:flex flex-col h-full w-64 py-6 px-4 gap-y-1 overflow-y-auto border-r font-['Inter'] font-medium text-sm">
        <div className="px-2 mb-6">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold mb-1">Ecosystem</div>
          <div className="text-on-surface/50 text-[10px]">v2.4.0 Obsidian</div>
        </div>
        <nav className="flex flex-col gap-1">
          <NavItems />
        </nav>
        <div className="mt-auto pt-6 px-2">
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </aside>
    </>
  );
}
