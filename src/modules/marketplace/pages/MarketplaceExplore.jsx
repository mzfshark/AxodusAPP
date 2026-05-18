import { useMemo, useState } from 'react';
import MarketplacePageHeader from '../components/MarketplacePageHeader';
import MarketplaceProductCard from '../components/MarketplaceProductCard';
import { filterMarketplaceProducts } from '../services/marketplaceService';
import { useMarketplaceData } from '../hooks/useMarketplaceData';

export default function MarketplaceExplore() {
  const marketplace = useMarketplaceData();
  const [filters, setFilters] = useState({ query: '', category: '', governanceStatus: '', chain: '', listingType: '' });
  const products = useMemo(() => filterMarketplaceProducts(filters), [filters]);
  const categories = [...new Set(marketplace.products.map((product) => product.category))];
  const chains = [...new Set(marketplace.products.flatMap((product) => product.supportedChains))];
  const listings = [...new Set(marketplace.products.map((product) => product.listingType))];

  return (
    <main className="app-view-shell space-y-8">
      <MarketplacePageHeader title="Product Explorer" description="Search NFT listings, governance-enabled licenses, Academy assets, MCP services, and trading strategy access passes." />
      <section className="grid grid-cols-1 gap-3 rounded-lg border border-white/10 bg-surface-container-low p-4 md:grid-cols-2 xl:grid-cols-5">
        <FilterInput label="Search" value={filters.query} onChange={(query) => setFilters({ ...filters, query })} />
        <FilterSelect label="Category" value={filters.category} values={categories} onChange={(category) => setFilters({ ...filters, category })} />
        <FilterSelect label="Governance" value={filters.governanceStatus} values={['compliant', 'under-review', 'restricted']} onChange={(governanceStatus) => setFilters({ ...filters, governanceStatus })} />
        <FilterSelect label="Chain" value={filters.chain} values={chains} onChange={(chain) => setFilters({ ...filters, chain })} />
        <FilterSelect label="Listing" value={filters.listingType} values={listings} onChange={(listingType) => setFilters({ ...filters, listingType })} />
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => <MarketplaceProductCard key={product.id} product={product} />)}
      </section>
    </main>
  );
}

function FilterInput({ label, value, onChange }) {
  return (
    <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-outline">
      {label}
      <input className="rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm normal-case tracking-normal text-on-surface outline-none focus:border-primary" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function FilterSelect({ label, value, values, onChange }) {
  return (
    <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-outline">
      {label}
      <select className="rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm normal-case tracking-normal text-on-surface outline-none focus:border-primary" value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">All</option>
        {values.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
    </label>
  );
}
