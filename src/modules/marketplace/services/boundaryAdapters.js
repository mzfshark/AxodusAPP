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
        quantity: Number(input.quantity || 1),
        metadataUri: input.metadataUri,
        reservePrice: input.listingType === 'fixed' ? null : Number(input.reservePrice || input.price),
        durationDays: input.listingType === 'fixed' ? null : Number(input.durationDays || 7),
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
  previewForListingInput: (input) => {
    const isAuction = input.listingType === 'english-auction' || input.listingType === 'dutch-auction';
    return {
      service: 'AuctionService',
      listingType: input.listingType,
      auctionEnabled: isAuction,
      reservePrice: isAuction ? Number(input.reservePrice || input.price) : null,
      minimumBid: input.listingType === 'english-auction' ? Number(input.reservePrice || input.price) : null,
      startPrice: input.listingType === 'dutch-auction' ? Number(input.price) : null,
      durationDays: isAuction ? Number(input.durationDays || 7) : null,
      bidEnabled: false,
      settlementEnabled: false,
    };
  },
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

export const ListingDraftService = {
  getDraftReadiness: (input) => {
    const quantity = Number(input.quantity || 1);
    const price = Number(input.price || 0);
    const royaltyBps = Number(input.royaltyBps || 0);
    const reservePrice = Number(input.reservePrice || 0);
    const durationDays = Number(input.durationDays || 0);
    const isAuction = input.listingType === 'english-auction' || input.listingType === 'dutch-auction';
    const blockers = [
      input.title?.trim() ? null : 'title-required',
      input.description?.trim() ? null : 'description-required',
      input.metadataUri?.trim() ? null : 'metadata-uri-required',
      price > 0 ? null : 'price-required',
      royaltyBps >= 0 && royaltyBps <= 1000 ? null : 'royalty-bps-out-of-policy',
      input.tokenStandard === 'ERC721' && quantity !== 1 ? 'erc721-quantity-must-be-one' : null,
      input.tokenStandard === 'ERC1155' && quantity < 1 ? 'erc1155-quantity-required' : null,
      isAuction && reservePrice <= 0 ? 'auction-reserve-required' : null,
      isAuction && durationDays < 1 ? 'auction-duration-required' : null,
    ].filter(Boolean);

    const requiredReviews = [
      input.governanceReviewRequired ? 'constitutional-review' : null,
      'treasury-route-review',
      isAuction ? 'auction-parameter-review' : null,
      input.deliveryType === 'MCP Runtime' ? 'plugin-compatibility-review' : null,
      ['Greenfield', 'Signed URL'].includes(input.deliveryType) ? 'storage-access-review' : null,
      'metadata-review',
    ].filter(Boolean);

    return {
      service: 'ListingDraftService',
      draftStatus: blockers.length ? 'blocked' : input.governanceReviewRequired ? 'requires-governance-review' : 'draft-created',
      publishEnabled: false,
      contractWriteEnabled: false,
      metadataReady: Boolean(input.metadataUri?.trim()),
      requiredReviews,
      blockers,
    };
  },
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
