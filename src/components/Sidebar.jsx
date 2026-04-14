// src/components/Sidebar.jsx

import React from 'react';
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col h-full w-64 bg-[#0b1326] py-6 px-4 gap-y-1 overflow-y-auto border-r border-white/5 font-['Inter'] font-medium text-sm">
      <div className="px-2 mb-6">
        <div className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold mb-1">Ecosystem</div>
        <div className="text-on-surface/50 text-[10px]">v2.4.0 Obsidian</div>
      </div>
      <nav className="flex flex-col gap-1">
        <NavLink to="/dashboard" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 ${isActive ? 'text-indigo-300 bg-[#2d3449] rounded-lg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] active:translate-x-1 transition-transform' : 'text-slate-500 hover:text-slate-300 hover:bg-[#131b2e] transition-all duration-300'}`}>
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>dashboard</span>
          <span>Overview</span>
        </NavLink>
        <NavLink to="/static/mining" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 ${isActive ? 'text-indigo-300 bg-[#2d3449] rounded-lg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] active:translate-x-1 transition-transform' : 'text-slate-500 hover:text-slate-300 hover:bg-[#131b2e] transition-all duration-300'}`}>
          <span className="material-symbols-outlined">bolt</span>
          <span>Mining</span>
        </NavLink>
        <NavLink to="/static/trading" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 ${isActive ? 'text-indigo-300 bg-[#2d3449] rounded-lg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] active:translate-x-1 transition-transform' : 'text-slate-500 hover:text-slate-300 hover:bg-[#131b2e] transition-all duration-300'}`}>
          <span className="material-symbols-outlined">swap_horiz</span>
          <span>Trading</span>
        </NavLink>
        <NavLink to="/static/staking" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 ${isActive ? 'text-indigo-300 bg-[#2d3449] rounded-lg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] active:translate-x-1 transition-transform' : 'text-slate-500 hover:text-slate-300 hover:bg-[#131b2e] transition-all duration-300'}`}>
          <span className="material-symbols-outlined">layers</span>
          <span>Staking</span>
        </NavLink>
        <NavLink to="/static/dao" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 ${isActive ? 'text-indigo-300 bg-[#2d3449] rounded-lg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] active:translate-x-1 transition-transform' : 'text-slate-500 hover:text-slate-300 hover:bg-[#131b2e] transition-all duration-300'}`}>
          <span className="material-symbols-outlined">account_balance</span>
          <span>DAOs</span>
        </NavLink>
        <NavLink to="/static/business" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 ${isActive ? 'text-indigo-300 bg-[#2d3449] rounded-lg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] active:translate-x-1 transition-transform' : 'text-slate-500 hover:text-slate-300 hover:bg-[#131b2e] transition-all duration-300'}`}>
          <span className="material-symbols-outlined">business_center</span>
          <span>Business</span>
        </NavLink>
        <NavLink to="/static/marketplace" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 ${isActive ? 'text-indigo-300 bg-[#2d3449] rounded-lg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] active:translate-x-1 transition-transform' : 'text-slate-500 hover:text-slate-300 hover:bg-[#131b2e] transition-all duration-300'}`}>
          <span className="material-symbols-outlined">shopping_cart</span>
          <span>Marketplace</span>
        </NavLink>
        <NavLink to="/static/academy" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 ${isActive ? 'text-indigo-300 bg-[#2d3449] rounded-lg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] active:translate-x-1 transition-transform' : 'text-slate-500 hover:text-slate-300 hover:bg-[#131b2e] transition-all duration-300'}`}>
          <span className="material-symbols-outlined">school</span>
          <span>Academy</span>
        </NavLink>
        <div className="h-px bg-white/5 my-4"></div>
        <NavLink to="/static/mcps" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 ${isActive ? 'text-indigo-300 bg-[#2d3449] rounded-lg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] active:translate-x-1 transition-transform' : 'text-slate-500 hover:text-slate-300 hover:bg-[#131b2e] transition-all duration-300'}`}>
          <span className="material-symbols-outlined">dns</span>
          <span>MCP Servers</span>
        </NavLink>
      </nav>
    </aside>
  );
}
