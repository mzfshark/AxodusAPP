import React from 'react';
import { BatteryCharging, Gauge, Pickaxe, ServerCog, TimerReset, TrendingUp } from 'lucide-react';
import { miningMock } from '../mock/devEcosystemData';

export default function Mining() {
  return (
    <main className="flex-1 overflow-y-auto bg-background p-8">
      <header className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Mining</span>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tighter text-on-surface">Hashpower Overview</h1>
          <p className="mt-2 max-w-3xl text-sm text-outline">Mock mining telemetry for development, with no external calls.</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-container-low px-4 py-3 text-sm text-outline">
          Synthetic chain-state only
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {miningMock.metrics.map((metric) => (
          <article key={metric.label} className="rounded-xl border border-white/10 bg-surface-container-low p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-outline">{metric.label}</p>
            <div className="mt-3 flex items-end justify-between gap-4">
              <div>
                <p className="text-3xl font-extrabold text-on-surface">
                  {metric.value} {metric.suffix ? <span className="text-base font-semibold text-primary">{metric.suffix}</span> : null}
                </p>
                <p className="mt-2 text-sm text-outline">{metric.detail}</p>
              </div>
              {metric.label === 'BTC price' ? <TrendingUp className="h-5 w-5 text-secondary" /> : <Gauge className="h-5 w-5 text-outline" />}
            </div>
          </article>
        ))}
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-12">
        <article className="xl:col-span-8 rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Mining products</h2>
              <p className="mt-1 text-sm text-outline">Read-only mock contracts for dev.</p>
            </div>
            <Pickaxe className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="mt-6 space-y-4">
            {miningMock.products.map((product) => (
              <div key={product.name} className="rounded-lg border border-white/10 bg-surface-container p-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-outline">Project</p>
                    <p className="mt-2 font-bold text-on-surface">{product.name}</p>
                    <p className="text-sm text-primary">{product.ticker}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-outline">Hashpower</p>
                    <p className="mt-2 font-bold text-on-surface">{product.hashpower}</p>
                    <p className="text-sm text-outline">{product.detail}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-outline">Yield</p>
                    <p className="mt-2 font-bold text-secondary">{product.yield}</p>
                  </div>
                  <div className="flex items-center">
                    <button className="w-full rounded-xl border border-white/10 bg-surface-container-highest px-4 py-2 text-sm font-bold text-on-surface">
                      Mock action disabled
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <aside className="xl:col-span-4 rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Live allocation</h2>
              <p className="mt-1 text-sm text-outline">Distribution by mock pool.</p>
            </div>
            <ServerCog className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="mt-6 space-y-4">
            {miningMock.distribution.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-on-surface">{item.label}</span>
                  <span className="text-outline">{item.amount}</span>
                </div>
                <div className="h-2 rounded-full bg-surface-container-highest">
                  <div className="h-2 rounded-full bg-secondary" style={{ width: item.weight }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-lg border border-white/10 bg-surface-container p-4">
            <BatteryCharging className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
        </aside>
      </section>

      <section className="mt-8 rounded-xl border border-white/10 bg-surface-container-low p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-on-surface">System logs</h2>
            <p className="mt-1 text-sm text-outline">Synthetic output for local development.</p>
          </div>
          <TimerReset className="h-5 w-5 text-outline" aria-hidden="true" />
        </div>
        <div className="mt-5 space-y-3 font-mono text-xs">
          {miningMock.logs.map((entry) => (
            <div key={`${entry.time}-${entry.level}`} className="rounded-lg border border-white/10 bg-surface-container p-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-outline">{entry.time}</span>
                <span className="font-bold text-secondary">{entry.level}</span>
                <span className="text-on-surface">{entry.message}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
