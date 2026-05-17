// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, Settings } from 'lucide-react';
import WalletConnectButton from './WalletConnectButton';

export default function Header() {
  return (
    <nav className="app-header fixed top-0 left-0 w-full z-50 backdrop-blur-xl flex justify-between items-center px-6 py-3 border-b font-['Inter'] tracking-tight text-sm font-semibold">
      <div className="flex items-center gap-8">
        <Link to="/dashboard" className="flex items-center">
          <img src="/logo.png" alt="Axodus" className="h-8 w-auto" />
        </Link>
        {/* Search Bar Center */}
        <div className="hidden md:flex items-center bg-surface-container-low px-4 py-1.5 rounded-full border-outline-variant/10 min-w-[320px]">
          <Search className="h-4 w-4 text-slate-500" aria-hidden="true" />
          <input className="bg-transparent border-none focus:ring-0 text-xs text-on-surface-variant w-full placeholder-slate-500" placeholder="Search ecosystem..." type="text"/>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-accent font-bold">$NEURONS: $9,857.18</span>
        <div className="flex items-center gap-4 text-slate-400">
          <button className="hover:text-primary transition-colors duration-200 active:scale-95 transition-transform" aria-label="Notifications">
            <Bell className="h-5 w-5" aria-hidden="true" />
          </button>
          <Link to="/settings" className="hover:text-primary transition-colors duration-200 active:scale-95 transition-transform" aria-label="Settings">
            <Settings className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
        <WalletConnectButton />
      </div>
    </nav>
  );
}
