import { marketplaceMock } from '@/data/mock';
import { createDraftListingPreview, issueMockPurchase } from './marketplaceService';

export const reownWalletStateMock = {
  connected: true,
  address: '0xAxoD...Mock',
  chain: 'Polygon',
  networkMode: 'mock',
};

export const MarketplaceContractAdapter = {
  getSupportedListingTypes: () => ['fixed', 'english-auction', 'dutch-auction'],
  getSupportedTokenStandards: () => ['ERC721', 'ERC1155'],
  getExecutionBoundary: (product) => ({
    adapter: 'MarketplaceContractAdapter',
    mode: 'mock-only',
    settlementEnabled: false,
    listingType: product.listingType,
    tokenStandard: product.tokenStandard,
    chain: product.bridgeReadiness?.sourceChain ?? product.supportedChains?.[0] ?? 'unknown',
    contractAddress: product.contractAddress ?? 'mock:offchain-license',
    tokenId: product.tokenId ?? 'not-minted',
    guardrails: [
      product.governanceRequired ? 'governance-review-required' : 'governance-review-not-required',
      product.governanceStatus === 'restricted' ? 'restricted-from-settlement' : 'settlement-preview-only',
      product.acsValidationState === 'validated' ? 'acs-validated' : `acs-${product.acsValidationState}`,
    ],
  }),
  buyNow: async (product) => ({
    mode: 'mock-contract-call',
    action: 'buyNow',
    txPreview: `mock-tx:${product.id}:buy-now`,
    executionBoundary: MarketplaceContractAdapter.getExecutionBoundary(product),
    purchase: issueMockPurchase(product),
  }),
  placeBid: async (product, amount) => ({
    mode: 'mock-contract-call',
    action: 'placeBid',
    amount,
    txPreview: `mock-tx:${product.id}:bid:${amount}`,
    executionBoundary: MarketplaceContractAdapter.getExecutionBoundary(product),
  }),
  createDraftListing: async (input) => ({
    mode: 'mock-contract-call',
    action: 'createListing',
    preview: {
      ...createDraftListingPreview(input),
      contractPayload: {
        tokenStandard: input.tokenStandard,
        listingType: input.listingType,
        chain: input.chain,
        currency: input.currency,
        settlementEnabled: false,
      },
    },
  }),
};

export const RoyaltyService = {
  previewForProduct: (product) => ({
    service: 'RoyaltyService',
    standard: product.royaltyModel.standard,
    eip2981Ready: product.royaltyModel.standard === 'EIP-2981',
    bps: product.royaltyModel.bps,
    recipient: product.royaltyModel.recipient,
    previewAmount: product.royaltyModel.previewAmount,
    currency: product.pricing.currency,
    settlementEnabled: false,
  }),
  previewForListingInput: (input) => ({
    service: 'RoyaltyService',
    standard: 'EIP-2981',
    eip2981Ready: true,
    bps: Number(input.royaltyBps),
    recipient: input.treasuryDestination || 'pending-treasury-route',
    previewAmount: Number(((Number(input.price) * Number(input.royaltyBps)) / 10000).toFixed(4)),
    currency: input.currency,
    settlementEnabled: false,
  }),
};

export const AuctionService = {
  canBid: (product) => Boolean(product.auction && product.auction.status === 'active' && product.governanceStatus !== 'suspended'),
  minimumBid: (product) => (product.auction ? Math.max(product.auction.reservePrice, (product.auction.highestBid ?? 0) + 1) : null),
  getAuctionState: (product) => ({
    service: 'AuctionService',
    listingType: product.listingType,
    auctionEnabled: Boolean(product.auction),
    bidEnabled: AuctionService.canBid(product),
    minimumBid: AuctionService.minimumBid(product),
    status: product.auction?.status ?? 'not-auction',
    reservePrice: product.auction?.reservePrice ?? null,
    highestBid: product.auction?.highestBid ?? null,
    bidCount: product.auction?.bidCount ?? 0,
    endsAt: product.auction?.endsAt ?? null,
    settlementEnabled: false,
  }),
};

export const StorageAccessService = {
  getAccessModel: (product) => ({
    service: 'StorageAccessService',
    deliveryType: product.deliveryType,
    accessModel: product.accessModel,
    greenfieldBucket: product.greenfieldBucket ?? null,
    signedUrlPreviewAvailable: Boolean(product.signedUrlPreviewAvailable),
    permissions: marketplaceMock.licenses.find((license) => license.type === product.licenseType)?.permissions ?? [],
    settlementEnabled: false,
  }),
  createSignedUrlPreview: (product, purchase) => {
    if (!product.signedUrlPreviewAvailable || purchase?.status === 'blocked') return null;
    return `https://greenfield.mock.axodus.local/access/${product.slug}?purchase=${purchase?.id ?? 'preview'}&signature=preview`;
  },
};

export const LayerZeroBridgeService = {
  getReadiness: (product) => ({
    service: 'LayerZeroBridgeService',
    ready: Boolean(product.bridgeReadiness?.layerZeroReady),
    sourceChain: product.bridgeReadiness?.sourceChain ?? product.supportedChains?.[0] ?? null,
    destinationChains: product.bridgeReadiness?.destinationChains ?? [],
    supportedChains: product.supportedChains ?? [],
    bridgeExecutionEnabled: false,
  }),
  getSupportedChains: () => [...new Set(marketplaceMock.products.flatMap((product) => product.supportedChains))],
};

export const getMarketplaceBoundaryReadiness = () => {
  const products = marketplaceMock.products;
  return [
    {
      id: 'contract-adapter',
      label: 'MarketplaceContractAdapter',
      status: 'ready-boundary',
      detail: `${products.filter((product) => ['fixed', 'english-auction', 'dutch-auction'].includes(product.listingType)).length} NFT listing surfaces mapped`,
    },
    {
      id: 'royalty-service',
      label: 'RoyaltyService',
      status: 'ready-boundary',
      detail: `${products.filter((product) => product.royaltyModel.standard === 'EIP-2981').length} EIP-2981 royalty previews`,
    },
    {
      id: 'auction-service',
      label: 'AuctionService',
      status: 'mocked',
      detail: `${products.filter((product) => Boolean(product.auction)).length} active auction previews`,
    },
    {
      id: 'storage-access-service',
      label: 'StorageAccessService',
      status: 'mocked',
      detail: `${products.filter((product) => product.signedUrlPreviewAvailable).length} signed URL previews available`,
    },
    {
      id: 'layerzero-bridge-service',
      label: 'LayerZeroBridgeService',
      status: 'deferred',
      detail: `${LayerZeroBridgeService.getSupportedChains().length} supported chain labels, no bridge execution`,
    },
  ];
};
