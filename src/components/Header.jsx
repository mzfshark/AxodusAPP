// src/components/Header.jsx
import React from 'react';

export default function Header() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-opacity-60 bg-[#0b1326] flex justify-between items-center px-6 py-3 border-b border-white/5 font-['Inter'] tracking-tight text-sm font-semibold">
      <div className="flex items-center gap-8">
        <span className="text-xl font-bold tracking-tighter text-indigo-300">Axodus</span>
        {/* Search Bar Center */}
        <div className="hidden md:flex items-center bg-surface-container-low px-4 py-1.5 rounded-full border border-outline-variant/10 min-w-[320px]">
          <span className="material-symbols-outlined text-slate-500 text-sm">search</span>
          <input className="bg-transparent border-none focus:ring-0 text-xs text-on-surface-variant w-full placeholder-slate-500" placeholder="Search ecosystem..." type="text"/>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-indigo-400 font-bold">$NEURONS: $0.42</span>
        <div className="flex items-center gap-4 text-slate-400">
          <button className="hover:text-indigo-200 transition-colors duration-200 active:scale-95 transition-transform">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="hover:text-indigo-200 transition-colors duration-200 active:scale-95 transition-transform">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
        <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-5 py-2 rounded-lg font-bold text-xs hover:shadow-[0_0_20px_rgba(128,131,255,0.3)] transition-all active:scale-95">
          Connect Wallet
        </button>
      </div>
    </nav>
  );
}
