import { useState } from 'react';
import MarketplacePageHeader from '../components/MarketplacePageHeader';
import { MarketplaceContractAdapter } from '../services/boundaryAdapters';

const initialInput = {
  title: 'Mock ERC721 governance access pass',
  category: 'Digital Assets',
  tokenStandard: 'ERC721',
  listingType: 'fixed',
  chain: 'Polygon',
  price: 100,
  currency: 'USDC',
  royaltyBps: 500,
  deliveryType: 'Signed URL',
  governanceReviewRequired: true,
  description: 'Create/sell preview for an NFT-bound Marketplace listing.',
};

export default function MarketplaceCreateSell() {
  const [input, setInput] = useState(initialInput);
  const [preview, setPreview] = useState(null);

  async function submitPreview(event) {
    event.preventDefault();
    const result = await MarketplaceContractAdapter.createDraftListing(input);
    setPreview(result.preview);
  }

  return (
    <main className="app-view-shell space-y-8">
      <MarketplacePageHeader title="Create / Sell" description="Prepare fixed listings and auctions for ERC721/1155 assets. This generates a contract adapter preview only." />
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_420px]">
        <form onSubmit={submitPreview} className="rounded-lg border border-white/10 bg-surface-container-low p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Title"><input value={input.title} onChange={(event) => setInput({ ...input, title: event.target.value })} className="marketplace-input" /></Field>
            <Field label="Category"><Select value={input.category} values={['Education', 'Governance', 'Trading', 'Business', 'MCPs', 'Digital Assets']} onChange={(category) => setInput({ ...input, category })} /></Field>
            <Field label="Token standard"><Select value={input.tokenStandard} values={['ERC721', 'ERC1155']} onChange={(tokenStandard) => setInput({ ...input, tokenStandard })} /></Field>
            <Field label="Listing type"><Select value={input.listingType} values={['fixed', 'english-auction', 'dutch-auction']} onChange={(listingType) => setInput({ ...input, listingType })} /></Field>
            <Field label="Chain"><Select value={input.chain} values={['Ethereum', 'BNB', 'Arbitrum', 'Harmony', 'Polygon']} onChange={(chain) => setInput({ ...input, chain })} /></Field>
            <Field label="Delivery"><Select value={input.deliveryType} values={['Greenfield', 'Signed URL', 'MCP Runtime', 'Dashboard Access', 'Manual Service']} onChange={(deliveryType) => setInput({ ...input, deliveryType })} /></Field>
            <Field label="Price"><input type="number" value={input.price} onChange={(event) => setInput({ ...input, price: Number(event.target.value) })} className="marketplace-input" /></Field>
            <Field label="Royalty bps"><input type="number" value={input.royaltyBps} onChange={(event) => setInput({ ...input, royaltyBps: Number(event.target.value) })} className="marketplace-input" /></Field>
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm font-semibold text-outline">
            <input type="checkbox" checked={input.governanceReviewRequired} onChange={(event) => setInput({ ...input, governanceReviewRequired: event.target.checked })} />
            Require governance review before activation
          </label>
          <button type="submit" className="mt-5 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-on-primary">Generate listing preview</button>
        </form>
        <aside className="rounded-lg border border-white/10 bg-surface-container-low p-5">
          <h2 className="text-xl font-bold text-on-surface">Adapter output</h2>
          <p className="mt-2 text-sm leading-6 text-outline">No NFT is minted and no contract write is sent.</p>
          {preview && (
            <div className="mt-5 rounded-lg border border-emerald-400/25 bg-emerald-500/10 p-4 text-sm text-emerald-100">
              <p className="font-bold">{preview.status}</p>
              <p className="mt-2 break-all">Tx preview: {preview.txPreview}</p>
              <p className="mt-2">Royalty preview: {preview.royaltyPreviewAmount} {input.currency}</p>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}

function Field({ label, children }) {
  return <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-outline">{label}{children}</label>;
}

function Select({ value, values, onChange }) {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)} className="marketplace-input">
      {values.map((item) => <option key={item} value={item}>{item}</option>)}
    </select>
  );
}
