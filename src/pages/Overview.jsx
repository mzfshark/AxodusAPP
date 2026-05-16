import React from 'react';
import {
  ArrowUpRight,
  Banknote,
  BookOpen,
  BriefcaseBusiness,
  Landmark,
  Pickaxe,
  ShoppingCart,
  TrendingUp,
} from 'lucide-react';
import { overviewMock } from '../mock/devEcosystemData';

const iconByLabel = {
  Mining: Pickaxe,
  Defi: Banknote,
  Governance: Landmark,
  Business: BriefcaseBusiness,
};

export default function Overview() {
  return (
    <main className="flex-1 overflow-y-auto bg-background p-8">
      <header className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Overview</span>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tighter text-on-surface">{overviewMock.hero.title}</h1>
          <p className="mt-2 max-w-3xl text-sm text-outline">{overviewMock.hero.subtitle}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-container-low px-4 py-3 text-sm text-outline">
          Dev mock source: `src/mock/devEcosystemData.js`
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewMock.metrics.map((metric) => (
          <article key={metric.label} className="rounded-xl border border-white/10 bg-surface-container-low p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-outline">{metric.label}</p>
            <div className="mt-3 flex items-end justify-between gap-4">
              <div>
                <p className="text-3xl font-extrabold text-on-surface">{metric.value}</p>
                <p className="mt-2 text-sm text-outline">{metric.trend}</p>
              </div>
              <TrendingUp className="h-5 w-5 text-secondary" aria-hidden="true" />
            </div>
          </article>
        ))}
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-12">
        <article className="xl:col-span-5 rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Allocation mix</h2>
              <p className="mt-1 text-sm text-outline">Mock allocation distribution for dev.</p>
            </div>
            <BookOpen className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="mt-6 space-y-4">
            {overviewMock.allocations.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-on-surface">{item.label}</span>
                  <span className="text-outline">{item.amount}</span>
                </div>
                <div className="h-2 rounded-full bg-surface-container-highest">
                  <div className="h-2 rounded-full bg-primary" style={{ width: item.value }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="xl:col-span-7 rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Active yield streams</h2>
              <p className="mt-1 text-sm text-outline">Read-only mock products surfaced for dev.</p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="mt-6 overflow-hidden rounded-lg border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-container text-xs uppercase tracking-wider text-outline">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Allocation</th>
                  <th className="px-4 py-3">Yield</th>
                  <th className="px-4 py-3">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {overviewMock.streams.map((stream) => (
                  <tr key={stream.product}>
                    <td className="px-4 py-4 font-semibold text-on-surface">{stream.product}</td>
                    <td className="px-4 py-4 text-outline">{stream.allocation}</td>
                    <td className="px-4 py-4 text-secondary">{stream.yield}</td>
                    <td className="px-4 py-4 text-outline">{stream.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <article className="rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Governance</h2>
              <p className="mt-1 text-sm text-outline">Mock proposal activity for the dev console.</p>
            </div>
            <Landmark className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="mt-5 space-y-4">
            {overviewMock.governance.map((proposal) => (
              <div key={proposal.proposal} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-on-surface">{proposal.proposal}</p>
                    <p className="mt-1 text-sm text-outline">Support {proposal.support}</p>
                  </div>
                  <span className="rounded-full bg-primary/15 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                    {proposal.tag}
                  </span>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-surface-container-lowest">
                  <div className="h-1.5 rounded-full bg-secondary" style={{ width: proposal.support }} />
                </div>
                <p className="mt-2 text-xs text-outline">{proposal.timeLeft}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Business execution</h2>
              <p className="mt-1 text-sm text-outline">Mock roadmap and delivery tracking.</p>
            </div>
            <BriefcaseBusiness className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="mt-5 space-y-4">
            {overviewMock.business.map((project) => (
              <div key={project.project} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-on-surface">{project.project}</p>
                    <p className="mt-1 text-sm text-outline">{project.note}</p>
                  </div>
                  <span className="rounded-full bg-secondary/15 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-secondary">
                    {project.tag}
                  </span>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-surface-container-lowest">
                  <div className="h-1.5 rounded-full bg-primary" style={{ width: project.progress }} />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-8 rounded-xl border border-white/10 bg-surface-container-low p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-on-surface">Module catalog</h2>
            <p className="mt-1 text-sm text-outline">All active nuclei exposed in dev.</p>
          </div>
          <ShoppingCart className="h-5 w-5 text-outline" aria-hidden="true" />
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {overviewMock.allocations.map((item) => {
            const Icon = iconByLabel[item.label] ?? Banknote;
            return (
              <div key={item.label} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-on-surface">{item.label}</p>
                    <p className="mt-1 text-sm text-outline">{item.amount}</p>
                  </div>
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
