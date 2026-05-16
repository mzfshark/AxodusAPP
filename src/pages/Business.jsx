import React from 'react';
import { ArrowUpRight, BriefcaseBusiness, FileText, Gauge, Rocket, ShieldCheck } from 'lucide-react';
import { businessMock } from '../mock/devEcosystemData';

export default function Business() {
  return (
    <main className="flex-1 overflow-y-auto bg-background p-8">
      <header className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Business</span>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tighter text-on-surface">Operating Snapshot</h1>
          <p className="mt-2 max-w-3xl text-sm text-outline">Mock business telemetry for the Axodus dev environment.</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-container-low px-4 py-3 text-sm text-outline">
          Read-only module
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {businessMock.metrics.map((metric) => (
          <article key={metric.label} className="rounded-xl border border-white/10 bg-surface-container-low p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-outline">{metric.label}</p>
            <div className="mt-3 flex items-end justify-between gap-4">
              <p className="text-3xl font-extrabold text-on-surface">{metric.value}</p>
              <ArrowUpRight className="h-5 w-5 text-secondary" aria-hidden="true" />
            </div>
            <p className="mt-2 text-sm text-outline">{metric.trend}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-12">
        <article className="xl:col-span-7 rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">API performance</h2>
              <p className="mt-1 text-sm text-outline">Synthetic business metrics for development.</p>
            </div>
            <Gauge className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            {businessMock.api.map((item) => (
              <div key={item.label} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-outline">{item.label}</p>
                <p className="mt-2 text-2xl font-bold text-on-surface">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid h-32 grid-cols-10 gap-1">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="rounded-t-sm bg-primary/70"
                style={{ height: `${35 + ((index * 13) % 60)}%` }}
              />
            ))}
          </div>
        </article>

        <aside className="xl:col-span-5 rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Governance ops</h2>
              <p className="mt-1 text-sm text-outline">Dev grants and delivery logs.</p>
            </div>
            <ShieldCheck className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="mt-5 space-y-4">
            {businessMock.grants.map((grant) => (
              <div key={grant.name} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-on-surface">{grant.name}</p>
                    <p className="mt-1 text-sm text-outline">{grant.stage}</p>
                  </div>
                  <p className="text-sm font-semibold text-secondary">{grant.amount}</p>
                </div>
                <p className="mt-2 text-xs text-outline">{grant.status}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-12">
        <article className="xl:col-span-8 rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Deployment logs</h2>
              <p className="mt-1 text-sm text-outline">Readable status feed for the business nucleus.</p>
            </div>
            <FileText className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="mt-5 space-y-3 font-mono text-xs">
            {businessMock.logs.map((entry) => (
              <div key={`${entry.time}-${entry.level}`} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-outline">{entry.time}</span>
                  <span className="font-bold text-secondary">{entry.level}</span>
                  <span className="text-on-surface">{entry.message}</span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="xl:col-span-4 rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Initiatives</h2>
              <p className="mt-1 text-sm text-outline">Dev-ready partner lanes.</p>
            </div>
            <BriefcaseBusiness className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="mt-5 space-y-3">
            <div className="rounded-lg border border-white/10 bg-surface-container p-4">
              <p className="text-sm font-semibold text-on-surface">Grant review queue</p>
              <p className="mt-1 text-sm text-outline">2 open requests, 1 pending approval.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-4">
              <p className="text-sm font-semibold text-on-surface">Delivery cadence</p>
              <p className="mt-1 text-sm text-outline">Weekly releases with read-only telemetry.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-4">
              <p className="text-sm font-semibold text-on-surface">Ops status</p>
              <p className="mt-1 text-sm text-outline">No live backend dependency required in dev.</p>
            </div>
          </div>
          <div className="mt-6 rounded-lg border border-white/10 bg-surface-container p-4">
            <Rocket className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
        </article>
      </section>
    </main>
  );
}
