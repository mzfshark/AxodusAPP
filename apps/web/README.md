# AxodusAPP Web

This workspace note documents the current frontend Marketplace execution boundary.

## Marketplace Status

The Marketplace nucleus is currently mock-first, governance-aware, tenant-aware, production-shaped, and settlement-deferred.

It models Axodus commerce as an NFT marketplace nucleus with support for:

- ERC721 and ERC1155 asset listings
- fixed-price and auction previews
- buy-now and bid preview flows
- EIP-2981 royalty previews
- seller and publisher profiles
- DAO or tenant ownership context
- governance validation state
- license and access models
- subscription and billing previews
- Greenfield delivery readiness
- Reown wallet state mocks
- wallet session and chain readiness runtime
- NFT ownership readiness for ERC721, ERC1155, license-bound, access, and governance assets
- listing and bid lifecycle previews
- royalty accounting previews
- LayerZero chain and bridge readiness

## Execution Boundary

Current Marketplace implementation does not perform:

- real payment execution
- fiat checkout
- wallet transaction submission
- contract writes
- NFT minting
- NFT purchase settlement
- auction settlement
- bid placement
- treasury routing
- royalty settlement
- production Greenfield signed URL issuance
- LayerZero messaging

All execution-shaped surfaces must remain clearly labeled as preview or mock-only until a later on-chain sprint explicitly enables production settlement.

## Adapter Boundaries

Future integrations are represented through mock-only adapters:

- `MarketplaceContractAdapter`
- `AuctionAdapter`
- `RoyaltyAdapter`
- `GreenfieldAccessAdapter`
- `ReownWalletAdapter`
- `LayerZeroBridgeAdapter`
- `TreasurySettlementAdapter`
- `BillingProviderAdapter`
- `WalletRuntimeService`
- `NftOwnershipRuntime`
- `ListingRuntimeService`
- `RoyaltyRuntimeService`

These adapters are intended to preserve interface shape while returning preview responses only.
