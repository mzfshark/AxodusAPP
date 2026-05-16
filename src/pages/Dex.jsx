import React from 'react';
import { ArrowDownUp, BarChart3, Coins, Route, ShieldCheck } from 'lucide-react';
import { dexMock } from '../mock/devEcosystemData';

export default function Dex() {
  return (
    <main className="flex-1 overflow-y-auto bg-background p-8">
      <header className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Dex</span>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tighter text-on-surface">Swap Surface</h1>
          <p className="mt-2 max-w-3xl text-sm text-outline">Mock liquidity and routing data for local development.</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-container-low px-4 py-3 text-sm text-outline">
          No live trading actions
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {dexMock.summary.map((item) => (
          <article key={item.label} className="rounded-xl border border-white/10 bg-surface-container-low p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-outline">{item.label}</p>
            <p className="mt-3 text-3xl font-extrabold text-on-surface">{item.value}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-12">
        <article className="xl:col-span-7 rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Swap builder</h2>
              <p className="mt-1 text-sm text-outline">Read-only mock amounts and balances.</p>
            </div>
            <ArrowDownUp className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="mt-6 space-y-4">
            {dexMock.swaps.map((swap) => (
              <div key={swap.label} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-outline">{swap.label}</p>
                    <p className="mt-2 text-lg font-bold text-on-surface">{swap.token}</p>
                  </div>
                  <p className="text-right text-sm text-outline">
                    Balance: {swap.balance}
                    <br />
                    Amount: {swap.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-lg border border-white/10 bg-surface-container p-4 text-sm text-outline">
            Trading controls remain disabled until a real execution adapter is introduced.
          </div>
        </article>

        <aside className="xl:col-span-5 rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Liquidity pools</h2>
              <p className="mt-1 text-sm text-outline">Mock market data.</p>
            </div>
            <Coins className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="mt-5 space-y-3">
            {dexMock.pools.map((pool) => (
              <div key={pool.pair} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-on-surface">{pool.pair}</p>
                    <p className="mt-1 text-sm text-outline">Liquidity {pool.liquidity}</p>
                  </div>
                  <p className="text-sm font-bold text-secondary">{pool.apr}</p>
                </div>
                <p className="mt-2 text-xs text-outline">{pool.change} on the day</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <article className="rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Routing activity</h2>
              <p className="mt-1 text-sm text-outline">Synthetic swap path history.</p>
            </div>
            <Route className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="mt-5 space-y-3">
            {dexMock.activity.map((entry) => (
              <div key={`${entry.time}-${entry.type}`} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-on-surface">{entry.type}</p>
                    <p className="mt-1 text-sm text-outline">{entry.detail}</p>
                  </div>
                  <span className="text-xs font-mono text-outline">{entry.time}</span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Safety notes</h2>
              <p className="mt-1 text-sm text-outline">No trade execution in dev.</p>
            </div>
            <ShieldCheck className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="mt-5 rounded-lg border border-white/10 bg-surface-container p-4">
            <BarChart3 className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <div className="mt-4 text-sm text-outline">
            Routing, swap, and liquidity data are deterministic mock records for the local workspace.
          </div>
        </article>
      </section>
    </main>
  );
}
