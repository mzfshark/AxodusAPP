import { ShieldCheck } from 'lucide-react';

export default function MarketplacePageHeader({ title, description, children }) {
  return (
    <header className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Axodus Marketplace</span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-on-surface md:text-4xl">{title}</h1>
          {description && <p className="mt-3 max-w-4xl text-sm leading-6 text-outline">{description}</p>}
        </div>
        <div className="flex max-w-xl items-start gap-3 rounded-lg border border-sky-400/20 bg-sky-500/10 px-4 py-3 text-sm text-sky-100">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>NFT marketplace MVP is mock-driven. No wallet signature, settlement, bridge transfer, or treasury routing is executed.</span>
        </div>
      </div>
      {children}
    </header>
  );
}
