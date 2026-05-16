import React from 'react';
import { BadgeCheck, Gift, Ticket, TimerReset, Trophy } from 'lucide-react';
import { lotteryMock } from '../mock/devEcosystemData';

export default function Lottery() {
  return (
    <main className="flex-1 overflow-y-auto bg-background p-8">
      <header className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Lottery</span>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tighter text-on-surface">Ticket Playground</h1>
          <p className="mt-2 max-w-3xl text-sm text-outline">Synthetic ticket, draw, and winner data for development.</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-container-low px-4 py-3 text-sm text-outline">
          Provably fair mock data
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {lotteryMock.stats.map((stat) => (
          <article key={stat.label} className="rounded-xl border border-white/10 bg-surface-container-low p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-outline">{stat.label}</p>
            <p className="mt-3 text-3xl font-extrabold text-on-surface">{stat.value}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-12">
        <article className="xl:col-span-8 rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Active tickets</h2>
              <p className="mt-1 text-sm text-outline">Mock tickets surfaced for dev-only testing.</p>
            </div>
            <Ticket className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="mt-5 space-y-4">
            {lotteryMock.tickets.map((ticket) => (
              <div key={ticket.id} className="rounded-lg border border-white/10 bg-surface-container p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary">{ticket.game}</p>
                    <p className="mt-2 text-lg font-bold text-on-surface">{ticket.id}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {ticket.numbers.map((number) => (
                        <span key={number} className="rounded-md bg-surface-container-highest px-2 py-1 text-xs font-bold text-on-surface">
                          {number}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-outline">Draw in</p>
                    <p className="mt-1 font-mono text-lg font-bold text-on-surface">{ticket.drawIn}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <aside className="xl:col-span-4 rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Winners</h2>
              <p className="mt-1 text-sm text-outline">Synthetic payout history.</p>
            </div>
            <Trophy className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="mt-5 space-y-3">
            {lotteryMock.winners.map((winner) => (
              <div key={`${winner.wallet}-${winner.prize}`} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <p className="font-mono text-xs text-outline">{winner.wallet}</p>
                <p className="mt-1 text-sm font-bold text-on-surface">{winner.prize}</p>
                <p className="mt-1 text-xs text-outline">{winner.time}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <article className="rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Transparency</h2>
              <p className="mt-1 text-sm text-outline">Claims for dev validation only.</p>
            </div>
            <BadgeCheck className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="mt-5 space-y-4">
            {lotteryMock.transparency.map((item) => (
              <div key={item.title} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <p className="font-semibold text-on-surface">{item.title}</p>
                <p className="mt-1 text-sm text-outline">{item.detail}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Live draw signal</h2>
              <p className="mt-1 text-sm text-outline">Mock countdown and pool state.</p>
            </div>
            <TimerReset className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="mt-5 rounded-lg border border-white/10 bg-surface-container p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-outline">Pool fill</span>
              <span className="font-bold text-secondary">{lotteryMock.stats[2].value}</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-surface-container-lowest">
              <div className="h-2 rounded-full bg-secondary" style={{ width: lotteryMock.stats[2].value }} />
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-white/10 bg-surface-container p-4 text-sm text-outline">
            Mock lottery actions are disabled in dev.
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
            <Gift className="h-4 w-4" aria-hidden="true" />
            Read-only dev data
          </div>
        </article>
      </section>
    </main>
  );
}
