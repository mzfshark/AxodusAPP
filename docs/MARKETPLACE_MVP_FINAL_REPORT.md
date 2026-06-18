# Axodus Marketplace MVP Final Report

Status date: 2026-05-20  
Implementation maturity: 75.7%  
Scope: AxodusAPP frontend Marketplace nucleus  
Execution mode: mock-first, governance-aware, tenant-aware, settlement-deferred

---

## 1. Executive Summary

The Marketplace MVP is implemented as a governance-aware NFT marketplace and commerce nucleus inside AxodusAPP.

It is not a generic ecommerce catalog. The delivered MVP models Marketplace as an Axodus ecosystem commerce layer for:

- ERC721 and ERC1155 NFT assets
- fixed listing previews
- auction and bid previews
- EIP-2981 royalty previews
- seller and publisher profiles
- DAO and tenant-owned products
- license and access models
- subscription previews
- billing and invoice previews
- governance validation states
- ACS review readiness
- future Greenfield delivery
- future Reown wallet flows
- future LayerZero multichain readiness
- future treasury and settlement routing

No real settlement is enabled. All wallet, contract, treasury, royalty, billing, bridge, signed URL, purchase, bid, and license issuance execution is explicitly mock-only or preview-only.

---

## 2. Architecture Delivered

### 2.1 Module Structure

Marketplace is implemented under:

```txt
src/modules/marketplace/
  components/
  hooks/
  pages/
  services/
  utils/
  index.js
```

Centralized mock data is provided by:

```txt
src/data/mock/marketplace.mock.js
```

The module is registered in AxodusAPP routing through:

```txt
src/routes.jsx
src/config/appShell.js
```

### 2.2 Delivered Layers

Product and asset registry:

- product lookup by slug, ID, and legacy item reference
- tenant-aware product context
- seller/publisher context
- product filtering
- asset gallery
- operational listings table

Governance and compliance:

- governance validation service
- license compliance service
- constitutional standing labels
- product lifecycle rails
- validation lifecycle rails
- blockers and required review gates

Commerce preview:

- mock purchase issuance
- buy-now preview
- bid preview
- billing preview
- invoice preview
- fee and royalty preview
- treasury route preview

Delivery and access preview:

- license model lookup
- subscription lifecycle preview
- Greenfield signed URL preview shape
- NFT-bound access metadata
- offchain license metadata

Navigation:

- Marketplace navigation is centralized in the AxodusAPP sidebar
- internal duplicated Marketplace route nav was removed from page content
- page content now focuses on operational workflows and contextual CTAs

---

## 3. AxodusAPP Routes Delivered

Canonical Marketplace routes:

| Route | Page | Protection | Purpose |
| --- | --- | --- | --- |
| `/marketplace` | `MarketplaceHome` | Public | Overview, operational registry preview, boundaries summary |
| `/marketplace/dashboard` | `MarketplaceDashboard` | Public | Marketplace metrics, tenant overview, adapters and readiness |
| `/marketplace/explore` | `MarketplaceExplore` | Public | Product discovery and filters |
| `/marketplace/assets` | `MarketplaceAssetGallery` | Public | NFT/offchain asset gallery and chain/delivery metadata |
| `/marketplace/listings` | `MarketplaceListings` | Public | Operational listings registry |
| `/marketplace/create` | `MarketplaceCreateSell` | Public | Create/sell preview for ERC721/1155 listings |
| `/marketplace/sell` | `MarketplaceCreateSell` | Public | Alias route for create/sell preview |
| `/marketplace/products/:slug` | `MarketplaceProductDetail` | Public | Product detail, license, governance, bid/buy preview |
| `/marketplace/sellers/:sellerId` | `MarketplaceSellerProfile` | Public | Seller/publisher profile |
| `/marketplace/orders` | `MarketplaceOrders` | Protected | Mock purchase records and billing preview |
| `/marketplace/subscriptions` | `MarketplaceSubscriptions` | Protected | Subscription lifecycle and access preview |
| `/marketplace/treasury` | `MarketplaceTreasury` | Protected | Treasury routing and settlement preview |
| `/marketplace/publisher` | `MarketplacePublisher` | Protected | Publisher readiness console |
| `/marketplace/governance` | `MarketplaceGovernance` | Public | Governance validation queue and lifecycle timelines |
| `/marketplace/licenses` | `MarketplaceLicenses` | Public | License registry and compliance preview |
| `/item/:chain/:contract/:id` | `MarketplaceLegacyItem` | Public | Legacy NFT item reference resolver |

Sidebar navigation is defined in `src/config/appShell.js`.

---

## 4. Endpoints and Data Contracts

### 4.1 Live Backend Endpoints

No Marketplace backend API endpoints are implemented in this MVP.

Marketplace currently consumes local mock data only:

```txt
src/data/mock/marketplace.mock.js
```

There is no production Marketplace API client, no settlement endpoint, no order endpoint, no billing provider endpoint, no Greenfield endpoint, and no LayerZero messaging endpoint.

### 4.2 Frontend Service Contracts

Marketplace read and mock execution contracts are exposed through:

```txt
src/modules/marketplace/services/marketplaceService.js
src/modules/marketplace/services/boundaryAdapters.js
src/modules/marketplace/services/complianceServices.js
src/modules/marketplace/services/operationalServices.js
src/modules/marketplace/utils/stateMachines.js
```

Key service functions:

- `getMarketplaceOverview`
- `getMarketplaceSeller`
- `getMarketplaceTenant`
- `getMarketplaceProduct`
- `getMarketplaceProductById`
- `getMarketplaceProductByItemRef`
- `getMarketplaceProductContext`
- `filterMarketplaceProducts`
- `getMarketplaceMetrics`
- `issueMockPurchase`
- `createDraftListingPreview`

Compliance services:

- `GovernanceValidationService`
- `LicenseComplianceService`

Operational services:

- `BillingPreviewService`
- `SubscriptionLifecycleService`
- `PublisherReadinessService`

Lifecycle helpers:

- `ProductLifecycle`
- `GovernanceValidationLifecycle`
- `PurchaseLifecycle`
- `LicenseLifecycle`
- `SubscriptionLifecycle`
- `BillingLifecycle`

---

## 5. Contracts and Adapter Boundaries

### 5.1 Smart Contracts

No Solidity smart contracts are delivered in this MVP.

No production contract addresses are defined.

The MVP models future contract compatibility for:

- ERC721
- ERC1155
- EIP-2981 royalties
- fixed listings
- English auctions
- Dutch auctions
- bids
- buy-now
- NFT-bound access
- subscription/license ownership checks

### 5.2 Adapter Boundaries Delivered

All adapters are mock-only and return preview responses:

| Adapter | Purpose | Current execution |
| --- | --- | --- |
| `MarketplaceContractAdapter` | Future marketplace contract read/write boundary | Mock contract call previews only |
| `AuctionAdapter` | Future auction creation and bid boundary | No contract write, no bid placement |
| `AuctionService` | Auction state and listing preview helper | Mock state only |
| `RoyaltyAdapter` | Future royalty execution boundary | No royalty settlement |
| `RoyaltyService` | EIP-2981 royalty preview helper | Preview calculation only |
| `GreenfieldAccessAdapter` | Future Greenfield access boundary | No production signed URL issuance |
| `StorageAccessService` | Delivery/access metadata helper | Mock signed URL preview only |
| `ReownWalletAdapter` | Future wallet state/signature boundary | No wallet signature, no transaction |
| `LayerZeroBridgeAdapter` | Future bridge messaging boundary | No LayerZero message |
| `LayerZeroBridgeService` | Supported chain/readiness helper | Readiness metadata only |
| `TreasurySettlementAdapter` | Future treasury settlement boundary | No treasury execution |
| `BillingProviderAdapter` | Future billing provider boundary | No payment provider call |
| `ListingDraftService` | Listing readiness validation | Mock blocker/review gate output |

---

## 6. Tests Delivered

Marketplace tests:

```txt
tests/marketplace/MarketplaceAssetGallery.test.jsx
tests/marketplace/MarketplaceBoundaryAdapters.test.js
tests/marketplace/MarketplaceComplianceServices.test.js
tests/marketplace/MarketplaceDashboard.test.jsx
tests/marketplace/MarketplaceNavigation.test.jsx
tests/marketplace/MarketplaceOperationalServices.test.js
tests/marketplace/MarketplaceServiceFlow.test.js
```

Covered areas:

- product filtering
- product detail lookup
- seller lookup
- tenant/DAO ownership context
- lifecycle helper behavior
- governance validation status
- license compliance
- mock purchase lifecycle
- billing preview calculation
- subscription state rendering and readiness
- dashboard metrics rendering
- asset gallery rendering and URL filtering
- adapter mock responses
- sidebar-only Marketplace navigation
- preservation of contextual CTAs

Latest validation performed during the MVP cleanup:

```txt
pnpm test --run tests/marketplace/MarketplaceNavigation.test.jsx tests/marketplace/MarketplaceDashboard.test.jsx tests/marketplace/MarketplaceAssetGallery.test.jsx tests/marketplace/MarketplaceServiceFlow.test.js tests/marketplace/MarketplaceBoundaryAdapters.test.js tests/marketplace/MarketplaceComplianceServices.test.js tests/marketplace/MarketplaceOperationalServices.test.js
```

Result:

```txt
7 test files passed
25 tests passed
```

Additional validation:

```txt
pnpm lint
pnpm build
```

Result:

- lint passed
- build passed
- build warning remains for large chunks after minification

Smoke routes checked on `localhost:5174`:

- `/marketplace`
- `/marketplace/create`
- `/marketplace/sell`
- `/marketplace/dashboard`
- `/marketplace/orders`
- `/marketplace/subscriptions`
- `/marketplace/governance`
- `/marketplace/assets`
- `/marketplace/products/governance-dashboard-nft-access`

Result:

```txt
All returned HTTP 200
```

---

## 7. MVP Limitations

Execution limitations:

- no real payment execution
- no fiat gateway
- no real wallet transaction
- no real wallet signature request
- no real NFT minting
- no real NFT purchase
- no real bid placement
- no auction settlement
- no treasury routing
- no royalty settlement
- no production Greenfield signed URL issuance
- no LayerZero messaging
- no production backend persistence
- no indexer reconciliation for Marketplace state

Data limitations:

- all Marketplace data is mock data
- lifecycle transitions are deterministic mock helpers
- seller verification is mock metadata
- tenant/DAO ownership is mock metadata
- purchase/license issuance is simulated
- billing and invoice IDs are previews only
- chain support is descriptive metadata only

UI limitations:

- protected routes depend on the existing AxodusAPP `ProtectedRoute` behavior
- browser-level visual QA was not automated with Playwright in this MVP
- large bundle warning remains and should be addressed through code splitting later

---

## 8. Risks

Product and governance risks:

- users may misread mock commerce previews as live settlement if labels regress
- governance state is rendered from mock data and must not be treated as constitutional truth
- seller standing and tenant ownership are not backed by production registries yet
- license status is not backed by on-chain ownership or backend entitlement checks

Security risks:

- future wallet integration must isolate signing and transaction preparation from UI components
- future contract adapters must validate chain IDs, contract addresses, token standards, royalties, and listing state
- future Greenfield signed URLs must enforce authorization, expiry, revocation, and audit trails
- future billing providers must protect invoice tampering, replay, webhook spoofing, and settlement mismatch
- future treasury execution must require governance permissions and receipt reconciliation

Operational risks:

- adapter boundaries are production-shaped but not production-hardened
- mock IDs and preview URLs must never be reused as production identifiers
- large app chunks may affect performance as more nuclei mature
- Marketplace depends on Governance, ACS, Treasury, Wallet, and future backend readiness

---

## 9. Next Steps

### Phase 1 Hardening

- add visual QA coverage for desktop and mobile Marketplace routes
- add empty/loading/error states across Marketplace pages
- improve accessibility checks for tables, badges, modals, and lifecycle rails
- add route-level tests for protected Marketplace pages
- split Marketplace and wallet-heavy chunks with dynamic imports

### Phase 2 Integration Readiness

- define Marketplace API contracts for products, sellers, tenants, licenses, purchases, subscriptions, billing, and validation records
- add typed request/response schemas with validation
- connect seller and tenant ownership to Governance/ACS read models
- add backend persistence for draft listings and validation queues
- add entitlement read model for licenses and subscriptions
- implement indexer reconciliation shape for purchases and licenses

### Phase 3 On-Chain and Settlement

- implement real marketplace contract adapter only after review
- connect ERC721/ERC1155 ownership reads
- connect EIP-2981 royalty reads and settlement accounting
- add wallet signing with explicit confirmation UX
- add fixed listing purchase flow
- add bid placement and auction settlement flow
- add treasury routing with governance receipts
- add Greenfield access issuance with revocation and expiry
- add LayerZero bridge messaging only after chain and governance policy approval

### Phase 4 Production Governance

- replace mock governance standing with Governance nucleus source records
- replace mock ACS review states with ACS workflow outputs
- connect seller sanctions, restrictions, and warnings to constitutional guardrails
- add audit logs for listing changes, review decisions, billing previews, and entitlement changes
- add operator console for review, restriction, suspension, and deprecation actions

---

## 10. Definition of Done Status

Delivered:

- Marketplace routes integrated into AxodusAPP
- sidebar-only Marketplace navigation
- mock-first tenant-aware data model
- governance-aware product and seller surfaces
- NFT asset gallery
- listing/product explorer
- product detail page
- create/sell preview
- buy-now and bid preview modal
- governance validation view
- license registry
- billing/orders preview
- subscription management preview
- treasury preview
- publisher console
- adapter boundaries for future execution
- focused Marketplace tests
- lint/build validation

Deferred:

- real contracts
- real backend endpoints
- real settlement
- real wallet transactions
- real NFT minting/purchase
- real auctions/bids
- real Greenfield delivery
- real LayerZero messaging
- real treasury execution

The Marketplace MVP is ready for Phase 2 API/schema and backend integration planning while remaining explicitly non-settlement and mock-first.
