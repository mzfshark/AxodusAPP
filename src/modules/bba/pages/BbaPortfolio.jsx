import BbaPageHeader from '../components/BbaPageHeader';
import BbaBadge from '../components/BbaBadge';
import BrandAssetInventory from '../components/BrandAssetInventory';
import DeliverableTracker from '../components/DeliverableTracker';
import { useBbaData } from '../hooks/useBbaData';
import { getBbaClient } from '../services/bbaService';

export default function BbaPortfolio() {
  const bba = useBbaData();

  return (
    <main className="app-view-shell space-y-8">
      <BbaPageHeader
        title="Portfolio Showcase"
        description="Mock case studies for institutional positioning, product launch planning, education communication, and governance-aware public materials."
      />
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {bba.portfolio.map((item) => (
          <article key={item.id} className="rounded-lg border border-white/10 bg-surface-container-low p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{item.category}</p>
            <h2 className="mt-2 text-xl font-bold text-on-surface">{item.title}</h2>
            <p className="mt-2 text-sm text-outline">{getBbaClient(item.clientId)?.name}</p>
            <p className="mt-4 text-sm leading-6 text-outline">{item.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <BbaBadge value={item.governanceStanding} />
              <BbaBadge value={item.publicReputationRisk} label="Risk" />
            </div>
            <ul className="mt-5 space-y-2 text-sm text-outline">
              {item.outcomes.map((outcome) => <li key={outcome}>- {outcome}</li>)}
            </ul>
          </article>
        ))}
      </section>
      <BrandAssetInventory assets={bba.brandAssets} />
      <DeliverableTracker deliverables={bba.deliverables} />
    </main>
  );
}
