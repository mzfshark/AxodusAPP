// src/components/Sidebar.jsx

import React, { useState } from 'react';
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  Moon,
  MonitorCog,
  Sun,
  X,
} from 'lucide-react';
import useDarkMode from '../hooks/useDarkMode';
import { appShellNav } from '../config/appShell';

const navLinkClass = ({ isActive }) =>
  `app-sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg ${
    isActive
      ? 'active-nav-item shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] active:translate-x-1 transition-transform'
      : 'text-slate-500 hover:text-slate-300 hover:bg-surface-container-low transition-all duration-300'
  }`;

const subNavClass = ({ isActive }) =>
  `app-sidebar-sub-link flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
    isActive
      ? 'active-nav-item'
      : 'border-white/10 bg-surface-container-low text-outline hover:border-white/20 hover:text-on-surface'
  }`;

function NavItems({ activeShellItem, isCollapsed, onNavigate }) {
  return (
    <>
      {appShellNav.primary.map((item) => (
        <NavLink
          key={item.id}
          to={item.routeBase}
          onClick={onNavigate}
          className={() => navLinkClass({ isActive: activeShellItem?.id === item.id })}
          data-nav-nucleus={item.id}
          title={isCollapsed ? item.label : undefined}
        >
          <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span className="app-sidebar-link-label">{item.label}</span>
        </NavLink>
      ))}

      {appShellNav.secondary.map((item) => (
        <NavLink
          key={item.id}
          to={item.routeBase}
          onClick={onNavigate}
          className={() => navLinkClass({ isActive: activeShellItem?.id === item.id })}
          data-nav-nucleus={item.id}
          title={isCollapsed ? item.label : undefined}
        >
          <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span className="app-sidebar-link-label">{item.label}</span>
        </NavLink>
      ))}
    </>
  );
}

function isFilterActive(location, target) {
  const [pathname, rawSearch = ''] = target.split('?');
  if (location.pathname !== pathname) return false;
  if (!rawSearch) return false;

  const targetParams = new URLSearchParams(rawSearch);
  const currentParams = new URLSearchParams(location.search);

  return [...targetParams.entries()].every(([key, value]) => currentParams.get(key) === value);
}

function NucleusSecondaryLayer({ activeShellItem, onNavigate }) {
  const location = useLocation();
  const sections = activeShellItem?.sections ?? [];
  const filterGroups = activeShellItem?.filterGroups ?? [];

  if (!sections.length && !filterGroups.length) return null;

  return (
    <section className="app-sidebar-secondary" aria-label={`${activeShellItem.label} navigation`}>
      <div className="app-sidebar-secondary-header">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Nucleus</p>
        <h2>{activeShellItem.label}</h2>
        <p>{activeShellItem.summary}</p>
      </div>

      {sections.length ? (
        <nav className="app-sidebar-secondary-section" aria-label={`${activeShellItem.label} sections`}>
          <p className="app-sidebar-section-label">Navigation</p>
          {sections.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onNavigate}
              className={subNavClass}
            >
              <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      ) : null}

      {filterGroups.map((group) => (
        <div key={group.label} className="app-sidebar-secondary-section">
          <p className="app-sidebar-section-label">{group.label}</p>
          {group.items.map((item) => {
            const active = isFilterActive(location, item.to);
            return (
              <Link
                key={`${group.label}-${item.label}`}
                to={item.to}
                onClick={onNavigate}
                className={subNavClass({ isActive: active })}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </section>
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
        <Sun className="h-[18px] w-[18px]" aria-hidden="true" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`flex items-center justify-center w-1/3 py-1.5 rounded-lg transition-all duration-200 ${theme === 'system' ? 'active-nav-item shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
        title="System Theme"
      >
        <MonitorCog className="h-[18px] w-[18px]" aria-hidden="true" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`flex items-center justify-center w-1/3 py-1.5 rounded-lg transition-all duration-200 ${theme === 'dark' ? 'active-nav-item shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
        title="Dark Theme"
      >
        <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
      </button>
    </div>
  );
}

export default function Sidebar({ activeShellItem }) {
  const [theme, setTheme] = useDarkMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <button
        type="button"
        className="mobile-menu-button md:hidden fixed top-16 left-4 z-[70] h-11 w-11 rounded-xl border shadow-lg backdrop-blur-md flex items-center justify-center"
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isMobileMenuOpen}
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-14 bottom-0 z-[65]">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          />
          <aside className="app-sidebar-panel app-sidebar-mobile absolute left-0 top-0 h-full overflow-y-auto border-r font-['Inter'] font-medium text-sm shadow-2xl">
            <div className="app-sidebar-primary">
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
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
                <NavItems activeShellItem={activeShellItem} onNavigate={() => setIsMobileMenuOpen(false)} />
            </nav>
            <div className="mt-auto pt-6 px-2">
              <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>
            </div>
            <NucleusSecondaryLayer activeShellItem={activeShellItem} onNavigate={() => setIsMobileMenuOpen(false)} />
          </aside>
        </div>
      )}

      <aside
        className="app-sidebar-panel hidden md:flex h-full overflow-hidden border-r font-['Inter'] font-medium text-sm"
        data-collapsed={isCollapsed}
      >
        <div className="app-sidebar-primary">
          <div className="app-sidebar-primary-header">
            <div className="app-sidebar-brand-text">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold mb-1">Ecosystem</div>
              <div className="text-on-surface/50 text-[10px]">v2.4.0 Obsidian</div>
            </div>
            <button
              type="button"
              className="app-sidebar-collapse-button"
              onClick={() => setIsCollapsed((value) => !value)}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-expanded={!isCollapsed}
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" aria-hidden="true" /> : <ChevronLeft className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            <NavItems activeShellItem={activeShellItem} isCollapsed={isCollapsed} />
          </nav>
          <div className="mt-auto pt-6 px-2">
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>
        {!isCollapsed ? <NucleusSecondaryLayer activeShellItem={activeShellItem} /> : null}
      </aside>
    </>
  );
}
