import { useState } from 'react';
import MarketplacePageHeader from '../components/MarketplacePageHeader';
import MarketplaceBadge from '../components/MarketplaceBadge';
import {
  AuctionService,
  LayerZeroBridgeService,
  ListingDraftService,
  MarketplaceContractAdapter,
  RoyaltyService,
} from '../services/boundaryAdapters';

const initialInput = {
  title: 'Mock ERC721 governance access pass',
  category: 'Digital Assets',
  tokenStandard: 'ERC721',
  listingType: 'fixed',
  chain: 'Polygon',
  price: 100,
  currency: 'USDC',
  royaltyBps: 500,
  reservePrice: 75,
  durationDays: 7,
  quantity: 1,
  metadataUri: 'ipfs://mock-governance-access-metadata',
  daoOwner: 'Axodus DAO',
  treasuryDestination: 'Axodus Treasury / Governance Revenue',
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
    setPreview({
      ...result.preview,
      royalty: RoyaltyService.previewForListingInput(input),
      auction: AuctionService.previewForListingInput(input),
      readiness: ListingDraftService.getDraftReadiness(input),
      storage: {
        service: 'StorageAccessService',
        deliveryType: input.deliveryType,
        signedUrlPreviewAvailable: ['Greenfield', 'Signed URL'].includes(input.deliveryType),
        settlementEnabled: false,
      },
      bridge: {
        service: 'LayerZeroBridgeService',
        sourceChain: input.chain,
        supportedChains: LayerZeroBridgeService.getSupportedChains(),
        bridgeExecutionEnabled: false,
      },
    });
  }

  return (
    <main className="app-view-shell space-y-8">
      <MarketplacePageHeader title="Create / Sell" description="Prepare fixed listings and auctions for ERC721/1155 assets. This generates a contract adapter preview only." />
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_460px]">
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
            <Field label="Quantity"><input type="number" value={input.quantity} onChange={(event) => setInput({ ...input, quantity: Number(event.target.value) })} className="marketplace-input" /></Field>
            <Field label="Metadata URI"><input value={input.metadataUri} onChange={(event) => setInput({ ...input, metadataUri: event.target.value })} className="marketplace-input" /></Field>
            <Field label="Reserve / min bid"><input type="number" value={input.reservePrice} onChange={(event) => setInput({ ...input, reservePrice: Number(event.target.value) })} className="marketplace-input" /></Field>
            <Field label="Duration days"><input type="number" value={input.durationDays} onChange={(event) => setInput({ ...input, durationDays: Number(event.target.value) })} className="marketplace-input" /></Field>
            <Field label="DAO owner"><Select value={input.daoOwner} values={['Axodus DAO', 'Academy DAO', 'MCP Working Group', 'Business DAO']} onChange={(daoOwner) => setInput({ ...input, daoOwner })} /></Field>
            <Field label="Treasury destination"><Select value={input.treasuryDestination} values={['Axodus Treasury / Governance Revenue', 'Academy DAO / Tutor Revenue Split', 'MCP Working Group / Review Escrow', 'Business DAO / Services Revenue']} onChange={(treasuryDestination) => setInput({ ...input, treasuryDestination })} /></Field>
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
            <div className="mt-5 space-y-3">
              <div className="rounded-lg border border-white/10 bg-surface-container p-4 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-bold text-on-surface">{preview.readiness.service}</p>
                  <MarketplaceBadge value={preview.readiness.draftStatus} />
                </div>
                <p className="mt-2 break-all font-mono text-xs text-outline">Tx preview: {preview.txPreview}</p>
                <p className="mt-2 text-outline">Contract writes: {preview.readiness.contractWriteEnabled ? 'enabled' : 'disabled'}</p>
                <p className="mt-2 text-outline">Publish execution: {preview.readiness.publishEnabled ? 'enabled' : 'disabled'}</p>
              </div>
              <PreviewPanel title="Contract payload">
                <p>{preview.contractPayload.tokenStandard} / {preview.contractPayload.listingType} / {preview.contractPayload.chain}</p>
                <p>Quantity: {input.quantity}</p>
                <p>Settlement: {preview.contractPayload.settlementEnabled ? 'enabled' : 'disabled'}</p>
              </PreviewPanel>
              <PreviewPanel title="Royalty route">
                <p>{preview.royalty.previewAmount} {preview.royalty.currency} to {preview.royalty.recipient}</p>
                <p>{preview.royalty.standard} / {preview.royalty.bps} bps</p>
              </PreviewPanel>
              <PreviewPanel title="Auction boundary">
                <p>Enabled: {preview.auction.auctionEnabled ? 'yes' : 'no'}</p>
                <p>Reserve: {preview.auction.reservePrice ?? 'not applicable'}</p>
                <p>Duration: {preview.auction.durationDays ?? 'not applicable'} days</p>
              </PreviewPanel>
              <PreviewPanel title="Reviews and blockers">
                <div className="flex flex-wrap gap-2">
                  {preview.readiness.requiredReviews.map((review) => <MarketplaceBadge key={review} value="review-ready" label={review} />)}
                </div>
                <p className="mt-3 text-xs text-outline">Blockers: {preview.readiness.blockers.join(', ') || 'none'}</p>
              </PreviewPanel>
              <PreviewPanel title="Storage and bridge">
                <p>Storage: {preview.storage.deliveryType}, signed URL preview {preview.storage.signedUrlPreviewAvailable ? 'available' : 'not available'}</p>
                <p>LayerZero source: {preview.bridge.sourceChain}</p>
                <p>Bridge execution: {preview.bridge.bridgeExecutionEnabled ? 'enabled' : 'disabled'}</p>
              </PreviewPanel>
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

function PreviewPanel({ title, children }) {
  return (
    <div className="rounded-lg border border-white/10 bg-surface-container p-4 text-sm leading-6 text-outline">
      <p className="mb-2 font-bold text-on-surface">{title}</p>
      {children}
    </div>
  );
}
