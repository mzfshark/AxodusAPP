import MarketplacePageHeader from '../components/MarketplacePageHeader';
import MarketplaceBadge from '../components/MarketplaceBadge';
import { useMarketplaceData } from '../hooks/useMarketplaceData';

export default function MarketplaceLicenses() {
  const marketplace = useMarketplaceData();
  return (
    <main className="app-view-shell space-y-8">
      <MarketplacePageHeader title="License Registry" description="NFT access, DAO, enterprise, and subscription license models prepared for future ownership validation." />
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {marketplace.licenses.map((license) => (
          <article key={license.id} className="rounded-lg border border-white/10 bg-surface-container-low p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{license.ownershipModel}</p>
            <h2 className="mt-2 text-xl font-bold text-on-surface">{license.type}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <MarketplaceBadge value={license.nftBound ? 'verified' : 'deferred'} label="NFT" />
              <MarketplaceBadge value={license.governanceControlled ? 'compliant' : 'under-review'} label="Governance" />
            </div>
            <ul className="mt-4 space-y-2 text-sm text-outline">
              {license.permissions.map((permission) => <li key={permission}>- {permission}</li>)}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
