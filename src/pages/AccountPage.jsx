// src/pages/AccountPage.jsx
import React from "react";
import "../styles/Global.module.css";

export default function AccountPage() {
  return (
    <main className="flex-1 overflow-y-auto bg-background">
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Hero Metrics: Ecosystem Growth */}
        <section className="">
          <div className="flex items-end gap-3 mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-on-surface">Ecosystem Growth</h1>
            <span className="text-sm font-label text-outline pb-1 uppercase tracking-widest">Observatory</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Metric Card 1 */}
            <div className="bg-surface-container-low p-6 rounded-xl ghost-border relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl">groups</span>
              </div>
              <p className="text-sm text-outline font-medium mb-1">Active Developers</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-4xl font-extrabold tracking-tighter text-on-surface">1,402</h2>
                <span className="text-secondary text-sm font-bold flex items-center">+12% <span className="material-symbols-outlined text-xs">arrow_upward</span></span>
              </div>
              <div className="mt-4 h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-3/4"></div>
              </div>
            </div>
            {/* Metric Card 2 */}
            <div className="bg-surface-container-low p-6 rounded-xl ghost-border relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl">rocket_launch</span>
              </div>
              <p className="text-sm text-outline font-medium mb-1">New Projects</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-4xl font-extrabold tracking-tighter text-on-surface">84</h2>
                <span className="text-secondary text-sm font-bold flex items-center">+5 <span className="material-symbols-outlined text-xs">arrow_upward</span></span>
              </div>
              <div className="mt-4 h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary w-1/2"></div>
              </div>
            </div>
            {/* Metric Card 3 */}
            <div className="bg-surface-container-low p-6 rounded-xl ghost-border relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl">terminal</span>
              </div>
              <p className="text-sm text-outline font-medium mb-1">GitHub Activity</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-4xl font-extrabold tracking-tighter text-on-surface">12.8k</h2>
                <span className="text-tertiary text-sm font-bold flex items-center">-2% <span className="material-symbols-outlined text-xs">arrow_downward</span></span>
              </div>
              <div className="mt-4 h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-tertiary w-2/3"></div>
              </div>
            </div>
          </div>
        </section>
        {/* API Performance & Quick Links Bento Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* API Performance (Span 2) */}
          <div className="lg:col-span-2 bg-surface-container p-6 rounded-2xl ghost-border flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">API Performance & Usage</h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-surface-container-lowest text-xs text-outline rounded-lg">Last 24h</span>
                <span className="px-3 py-1 bg-surface-container-highest text-xs text-secondary rounded-lg font-bold">Stable</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-surface-container-lowest p-4 rounded-xl">
                <p className="text-xs text-outline uppercase tracking-wider mb-1">Request Count</p>
                <p className="text-2xl font-bold">4.2M</p>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl">
                <p className="text-xs text-outline uppercase tracking-wider mb-1">Avg Latency</p>
                <p className="text-2xl font-bold text-secondary">24ms</p>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl">
                <p className="text-xs text-outline uppercase tracking-wider mb-1">Error Rate</p>
                <p className="text-2xl font-bold text-error">0.04%</p>
              </div>
            </div>
            {/* Synthetic Chart Visualization Area */}
            <div className="flex-grow flex items-end gap-1 h-32 pt-4">
              <div className="w-full bg-primary/20 h-1/2 rounded-t-sm hover:bg-primary/40 transition-all"></div>
              <div className="w-full bg-primary/20 h-2/3 rounded-t-sm hover:bg-primary/40 transition-all"></div>
              <div className="w-full bg-primary/20 h-3/4 rounded-t-sm hover:bg-primary/40 transition-all"></div>
              <div className="w-full bg-primary/20 h-1/2 rounded-t-sm hover:bg-primary/40 transition-all"></div>
              <div className="w-full bg-primary/20 h-4/5 rounded-t-sm hover:bg-primary/40 transition-all"></div>
              <div className="w-full bg-primary/20 h-full rounded-t-sm hover:bg-primary/40 transition-all"></div>
              <div className="w-full bg-primary/20 h-3/4 rounded-t-sm hover:bg-primary/40 transition-all"></div>
              <div className="w-full bg-primary/20 h-1/2 rounded-t-sm hover:bg-primary/40 transition-all"></div>
              <div className="w-full bg-primary/20 h-2/3 rounded-t-sm hover:bg-primary/40 transition-all"></div>
              <div className="w-full bg-primary/20 h-3/4 rounded-t-sm hover:bg-primary/40 transition-all"></div>
            </div>
          </div>
          {/* Developer Portal Links */}
          <div className="bg-surface-container-low p-6 rounded-2xl ghost-border space-y-4">
            <h3 className="text-xl font-semibold mb-2">Developer Portal</h3>
            <a className="flex items-center justify-between p-4 bg-surface-container-highest rounded-xl hover:translate-x-1 transition-transform group" href="#">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">description</span>
                <div>
                  <p className="font-bold text-on-surface">Documentation</p>
                  <p className="text-xs text-outline">v2.4 API Reference</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-primary">chevron_right</span>
            </a>
            <a className="flex items-center justify-between p-4 bg-surface-container-highest rounded-xl hover:translate-x-1 transition-transform group" href="#">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">download</span>
                <div>
                  <p className="font-bold text-on-surface">SDK Downloads</p>
                  <p className="text-xs text-outline">JS, Python, Rust, Go</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-primary">chevron_right</span>
            </a>
            <a className="flex items-center justify-between p-4 bg-surface-container-highest rounded-xl hover:translate-x-1 transition-transform group" href="#">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">key</span>
                <div>
                  <p className="font-bold text-on-surface">API Key Manager</p>
                  <p className="text-xs text-outline">Manage 4 active keys</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-primary">chevron_right</span>
            </a>
          </div>
        </section>
        {/* Partners & Deployment Logs */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Business Partners / Grant Program */}
          <div className="bg-surface-container-low p-6 rounded-2xl ghost-border">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Active Grants & Partners</h3>
              <button className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">Apply for Grant</button>
            </div>
            <div className="space-y-4">
              {/* Partner Item */}
              <div className="p-4 bg-surface-container-lowest rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#131b2e] flex items-center justify-center text-primary font-black">N</div>
                  <div>
                    <p className="font-bold">NeuralNode Protocol</p>
                    <p className="text-xs text-outline">Phase 2: L2 Integration</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">$125,000</p>
                  <p className="text-[10px] text-secondary font-bold uppercase">65% Complete</p>
                </div>
              </div>
              {/* Partner Item */}
              <div className="p-4 bg-surface-container-lowest rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#131b2e] flex items-center justify-center text-tertiary font-black">V</div>
                  <div>
                    <p className="font-bold">Vortex DEX</p>
                    <p className="text-xs text-outline">Phase 1: Liquidity Launch</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">$40,000</p>
                  <p className="text-[10px] text-tertiary font-bold uppercase">Pending Review</p>
                </div>
              </div>
              {/* Partner Item */}
              <div className="p-4 bg-surface-container-lowest rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#131b2e] flex items-center justify-center text-primary-container font-black">O</div>
                  <div>
                    <p className="font-bold">OmniBridge</p>
                    <p className="text-xs text-outline">Ecosystem Milestone: 1k users</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">$15,000</p>
                  <p className="text-[10px] text-secondary font-bold uppercase">Goal Reached</p>
                </div>
              </div>
            </div>
          </div>
          {/* Recent Deployment Logs */}
          <div className="bg-surface-container p-6 rounded-2xl ghost-border overflow-hidden">
            <h3 className="text-xl font-semibold mb-6">Recent Deployment Logs</h3>
            <div className="space-y-4 font-mono text-xs">
              <div className="flex gap-4 p-3 bg-surface-container-lowest/50 rounded border-l-2 border-secondary">
                <span className="text-outline">14:22:05</span>
                <div className="flex-grow">
                  <span className="text-secondary font-bold">SUCCESS</span>
                  <p className="text-on-surface mt-1">Mainnet-alpha node cluster successfully upgraded to v2.4.1. Consensus reaching 100%.</p>
                </div>
              </div>
              <div className="flex gap-4 p-3 bg-surface-container-lowest/50 rounded border-l-2 border-primary">
                <span className="text-outline">12:10:48</span>
                <div className="flex-grow">
                  <span className="text-primary font-bold">INFO</span>
                  <p className="text-on-surface mt-1">New validator set election completed. 12 new nodes admitted to active set.</p>
                </div>
              </div>
              <div className="flex gap-4 p-3 bg-surface-container-lowest/50 rounded border-l-2 border-tertiary">
                <span className="text-outline">09:45:12</span>
                <div className="flex-grow">
                  <span className="text-tertiary font-bold">WARN</span>
                  <p className="text-on-surface mt-1">Latency spike detected in Asian region endpoints. Autoscaling group 4 initiated.</p>
                </div>
              </div>
              <div className="flex gap-4 p-3 bg-surface-container-lowest/50 rounded border-l-2 border-primary">
                <span className="text-outline">08:00:00</span>
                <div className="flex-grow">
                  <span className="text-primary font-bold">SYSTEM</span>
                  <p className="text-on-surface mt-1">Daily snapshot of global state archived to decentralized storage [CID: QmX...].</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
