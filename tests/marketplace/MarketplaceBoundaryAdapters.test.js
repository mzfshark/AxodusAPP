import { describe, expect, test } from 'vitest';
import { marketplaceMock } from '../../src/data/mock';
import {
  AuctionService,
  LayerZeroBridgeService,
  ListingDraftService,
  MarketplaceContractAdapter,
  RoyaltyService,
  StorageAccessService,
  getMarketplaceBoundaryReadiness,
} from '../../src/modules/marketplace/services/boundaryAdapters';

describe('Marketplace boundary adapters', () => {
  test('keeps NFT listing standards and listing types explicit for Phase 2 contracts', () => {
    expect(MarketplaceContractAdapter.getSupportedTokenStandards()).toEqual(['ERC721', 'ERC1155']);
    expect(MarketplaceContractAdapter.getSupportedListingTypes()).toEqual(['fixed', 'english-auction', 'dutch-auction']);

    const standards = marketplaceMock.products.map((product) => product.tokenStandard);
    const listingTypes = marketplaceMock.products.map((product) => product.listingType);

    expect(standards).toEqual(expect.arrayContaining(['ERC721', 'ERC1155']));
    expect(listingTypes).toEqual(expect.arrayContaining(['fixed', 'english-auction', 'dutch-auction']));
  });

  test('returns mock-only execution boundaries with governance guardrails', () => {
    const restrictedProduct = marketplaceMock.products.find((product) => product.governanceStatus === 'restricted');
    const boundary = MarketplaceContractAdapter.getExecutionBoundary(restrictedProduct);

    expect(boundary.adapter).toBe('MarketplaceContractAdapter');
    expect(boundary.settlementEnabled).toBe(false);
    expect(boundary.guardrails).toEqual(expect.arrayContaining(['restricted-from-settlement']));
  });

  test('previews EIP-2981 royalties without treasury execution', () => {
    const eip2981Product = marketplaceMock.products.find((product) => product.royaltyModel.standard === 'EIP-2981');
    const preview = RoyaltyService.previewForProduct(eip2981Product);

    expect(preview.service).toBe('RoyaltyService');
    expect(preview.eip2981Ready).toBe(true);
    expect(preview.settlementEnabled).toBe(false);
    expect(preview.previewAmount).toBeGreaterThan(0);
  });

  test('exposes auction, storage, and bridge readiness as replaceable service boundaries', () => {
    const auctionProduct = marketplaceMock.products.find((product) => product.auction);
    const auctionState = AuctionService.getAuctionState(auctionProduct);
    const storageState = StorageAccessService.getAccessModel(auctionProduct);
    const bridgeState = LayerZeroBridgeService.getReadiness(auctionProduct);
    const readiness = getMarketplaceBoundaryReadiness().map((boundary) => boundary.label);

    expect(auctionState.service).toBe('AuctionService');
    expect(auctionState.bidEnabled).toBe(true);
    expect(storageState.service).toBe('StorageAccessService');
    expect(storageState.signedUrlPreviewAvailable).toBe(true);
    expect(bridgeState.service).toBe('LayerZeroBridgeService');
    expect(bridgeState.bridgeExecutionEnabled).toBe(false);
    expect(readiness).toEqual(
      expect.arrayContaining([
        'MarketplaceContractAdapter',
        'RoyaltyService',
        'AuctionService',
        'StorageAccessService',
        'LayerZeroBridgeService',
      ]),
    );
  });

  test('previews create/sell listing drafts with metadata, auction, and governance readiness', async () => {
    const input = {
      title: 'Mock ERC1155 certification bundle',
      description: 'Mock create/sell payload for an Academy certification bundle.',
      tokenStandard: 'ERC1155',
      listingType: 'english-auction',
      chain: 'Polygon',
      price: 80,
      currency: 'USDC',
      royaltyBps: 700,
      reservePrice: 60,
      durationDays: 7,
      quantity: 25,
      metadataUri: 'ipfs://mock-academy-certification',
      deliveryType: 'Greenfield',
      treasuryDestination: 'Academy DAO / Tutor Revenue Split',
      governanceReviewRequired: true,
    };

    const result = await MarketplaceContractAdapter.createDraftListing(input);
    const draft = ListingDraftService.getDraftReadiness(input);
    const auction = AuctionService.previewForListingInput(input);

    expect(result.preview.contractPayload.tokenStandard).toBe('ERC1155');
    expect(result.preview.contractPayload.quantity).toBe(25);
    expect(result.preview.contractPayload.settlementEnabled).toBe(false);
    expect(draft.service).toBe('ListingDraftService');
    expect(draft.draftStatus).toBe('requires-governance-review');
    expect(draft.contractWriteEnabled).toBe(false);
    expect(draft.blockers).toEqual([]);
    expect(draft.requiredReviews).toEqual(expect.arrayContaining(['constitutional-review', 'auction-parameter-review', 'storage-access-review']));
    expect(auction.auctionEnabled).toBe(true);
    expect(auction.reservePrice).toBe(60);
  });

  test('blocks invalid ERC721 listing drafts before publisher handoff', () => {
    const draft = ListingDraftService.getDraftReadiness({
      title: '',
      description: '',
      tokenStandard: 'ERC721',
      listingType: 'fixed',
      price: 0,
      royaltyBps: 1200,
      quantity: 3,
      metadataUri: '',
      deliveryType: 'Dashboard Access',
      governanceReviewRequired: false,
    });

    expect(draft.draftStatus).toBe('blocked');
    expect(draft.publishEnabled).toBe(false);
    expect(draft.blockers).toEqual(
      expect.arrayContaining([
        'title-required',
        'description-required',
        'metadata-uri-required',
        'price-required',
        'royalty-bps-out-of-policy',
        'erc721-quantity-must-be-one',
      ]),
    );
  });
});
