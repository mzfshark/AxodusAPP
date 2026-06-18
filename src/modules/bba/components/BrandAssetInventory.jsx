import BbaBadge from './BbaBadge';

export default function BrandAssetInventory({ assets }) {
  return (
    <section className="rounded-lg border border-white/10 bg-surface-container-low p-6">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-on-surface">Brand Asset Inventory</h2>
        <p className="mt-1 text-sm text-outline">Institutional identity assets, guidelines, campaign visuals, and public material readiness.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {assets.map((asset) => (
          <article key={asset.id} className="rounded-lg border border-white/10 bg-surface-container p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{asset.type}</p>
            <h3 className="mt-2 font-bold text-on-surface">{asset.title}</h3>
            <p className="mt-2 text-sm text-outline">{asset.owner}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <BbaBadge value={asset.status} />
              <BbaBadge value={asset.publicReputationRisk} label="Risk" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
