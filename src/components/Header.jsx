// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Settings } from 'lucide-react';
import WalletConnectButton from './WalletConnectButton';
import { shellSearchMeta } from '../config/appShell';
import ScopeBadge from './uiScope/ScopeBadge';
import { TenantSelector } from './tenant';

export default function Header({ activeShellItem }) {
  const SearchIcon = shellSearchMeta.icon;

  return (
    <nav className="app-header fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b font-['Inter'] tracking-tight text-sm font-semibold">
      <div className="app-header-inner">
        <Link to="/dashboard" className="app-brand" aria-label="Axodus dashboard">
          <img src="/logo.png" alt="Axodus" className="h-8 w-auto" />
        </Link>

        <div className="app-header-context" aria-label="Current Axodus nucleus">
          <span className="app-header-context-label">{activeShellItem?.shortLabel ?? activeShellItem?.label}</span>
          <span className="app-header-context-summary">{activeShellItem?.summary}</span>
        </div>

        <div className="app-header-search hidden md:flex items-center bg-surface-container-low px-4 py-1.5 rounded-lg border-outline-variant/10 min-w-[320px]">
          <SearchIcon className="h-4 w-4 text-slate-500" aria-hidden="true" />
          <input
            className="bg-transparent border-none focus:ring-0 text-xs text-on-surface-variant w-full placeholder-slate-500"
            placeholder={shellSearchMeta.placeholder}
            type="text"
            aria-label="Search Axodus ecosystem"
          />
        </div>

        <div className="app-header-actions">
          <div className="app-header-indicators" aria-label="Application runtime indicators">
            {activeShellItem?.scope ? <ScopeBadge scope={activeShellItem.scope} /> : null}
            <span className="ax-meta-chip">{activeShellItem?.maturity ?? 'prototype'}</span>
            <span className="ax-meta-chip">read-only</span>
          </div>
          <TenantSelector compact />
          <div className="flex items-center gap-3 text-slate-400">
            <button className="app-icon-button" aria-label="Notifications">
              <Bell className="h-5 w-5" aria-hidden="true" />
            </button>
            <Link to="/settings" className="app-icon-button" aria-label="Settings">
              <Settings className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
          <WalletConnectButton />
        </div>
      </div>
    </nav>
  );
}
