import React from 'react';
import { Gem, Palette, ShoppingBag, Sparkles, Tag } from 'lucide-react';
import { marketplaceMock } from '../mock/devEcosystemData';

const rarityClasses = {
  COMMON: 'text-outline',
  RARE: 'text-secondary',
  EPIC: 'text-tertiary',
  LEGENDARY: 'text-primary',
  MYTHIC: 'text-primary',
};

export default function Marketplace() {
  return (
    <main className="flex-1 overflow-y-auto bg-background p-8">
      <header className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Marketplace</span>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tighter text-on-surface">{marketplaceMock.hero.title}</h1>
          <p className="mt-2 max-w-3xl text-sm text-outline">{marketplaceMock.hero.subtitle}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-container-low px-4 py-3 text-sm text-outline">
          Read-only mock catalog
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <article className="xl:col-span-8 rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Featured</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tighter text-on-surface">{marketplaceMock.hero.title}</h2>
              <p className="mt-2 text-sm text-outline">{marketplaceMock.hero.artist}</p>
            </div>
            <Sparkles className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-surface-container p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-outline">Current bid</p>
              <p className="mt-2 text-2xl font-bold text-secondary">{marketplaceMock.hero.currentBid}</p>
              <p className="mt-1 text-sm text-outline">{marketplaceMock.hero.usdValue}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-outline">Chain</p>
              <p className="mt-2 text-xl font-bold text-on-surface">{marketplaceMock.hero.chain}</p>
              <p className="mt-1 text-sm text-outline">Deterministic mock asset metadata</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-surface-container p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-outline">Rarity</p>
              <p className="mt-2 text-xl font-bold text-primary">{marketplaceMock.hero.rarity}</p>
              <p className="mt-1 text-sm text-outline">No live bidding in dev mode</p>
            </div>
          </div>
        </article>

        <aside className="xl:col-span-4 rounded-xl border border-white/10 bg-surface-container-low p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Collections</h2>
              <p className="mt-1 text-sm text-outline">Mock types exposed to the marketplace.</p>
            </div>
            <Gem className="h-5 w-5 text-outline" aria-hidden="true" />
          </div>
          <div className="mt-5 space-y-3">
            {marketplaceMock.collectibles.map((item) => (
              <div key={item.name} className="rounded-lg border border-white/10 bg-surface-container p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-on-surface">{item.name}</p>
                    <p className="mt-1 text-sm text-outline">By {item.creator}</p>
                  </div>
                  <Tag className={`h-4 w-4 ${rarityClasses[item.rarity] ?? 'text-outline'}`} aria-hidden="true" />
                </div>
                <p className="mt-3 text-sm font-bold text-on-surface">
                  {item.price} <span className="text-xs font-normal text-outline">{item.usd}</span>
                </p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {marketplaceMock.subscriptions.map((subscription) => (
          <article key={subscription.title} className="rounded-xl border border-white/10 bg-surface-container-low p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-primary">{subscription.title}</p>
                <p className="mt-2 text-sm text-outline">{subscription.detail}</p>
              </div>
              <ShoppingBag className="h-5 w-5 text-secondary" aria-hidden="true" />
            </div>
            <p className="mt-4 text-lg font-bold text-secondary">{subscription.price}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-xl border border-white/10 bg-surface-container-low p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-on-surface">Curation notes</h2>
            <p className="mt-1 text-sm text-outline">Mock marketplace assets are local and deterministic.</p>
          </div>
          <Palette className="h-5 w-5 text-outline" aria-hidden="true" />
        </div>
      </section>
    </main>
  );
}
