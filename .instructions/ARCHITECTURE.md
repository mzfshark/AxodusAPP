# AxodusAPP Architecture

## Architectural Philosophy

AxodusAPP must be built as a modular frontend orchestration system.

The app should not hardcode each nucleus as isolated pages only.

Instead, it should use registries, layouts, route modules, permission systems, and shared state layers to coordinate the ecosystem.

---

## Core Architecture Goals

- scalable module architecture
- shared design system
- chain-aware state
- DAO-aware context
- wallet-native execution
- permission-aware navigation
- API-driven data loading
- protected routes
- extensible module registry
- future mobile compatibility

---

## Recommended Stack

Frontend:

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- TanStack Query
- Zustand or equivalent state manager
- Reown AppKit
- Ethers v6 or Viem
- Zod
- React Hook Form

Testing:

- Vitest
- React Testing Library
- Playwright

Quality:

- ESLint
- Prettier
- TypeScript strict mode

---

## Suggested Directory Structure

apps/axodus-app

src
- app
- components
- config
- contexts
- features
- hooks
- layouts
- modules
- pages
- routes
- services
- stores
- styles
- types
- utils

---

## Core Layers

### App Shell Layer

Responsible for:

- root layout
- navigation
- sidebar
- topbar
- mobile menu
- theme
- authenticated shell
- public shell

---

### Module Layer

Each nucleus should be represented as a module.

Example modules:

- governance
- defi
- acs
- academy
- business
- marketplace
- mining
- dex
- trading
- lottery
- bba

Each module should define:

- route metadata
- navigation metadata
- permissions
- feature flags
- required chains
- required APIs
- page components

---

### Wallet Layer

Responsible for:

- wallet connection
- account state
- chain state
- signature requests
- transaction preparation
- transaction status
- supported networks

---

### DAO Context Layer

Responsible for:

- selected DAO
- selected DAO tenant account
- DAO permissions
- DAO treasury context
- DAO modules enabled
- DAO governance status
- DAO role-based access
- governance nucleus context:
  - Constitutional Governance
  - Local Governance
- constitutional compatibility status
- Constitutional Guardrail reason codes

AxodusAPP must distinguish between Constitutional Governance and Local Governance.

Constitutional Governance is powered by `$Neurons` and defines ecosystem-wide legitimacy, federal standards, capabilities, conditions, and guardrails.

Local Governance is controlled by each federated startup, DAO, company, product, or community.

Local Governance may use `$Neurons`, local tokens, auto-generated platform tokens, multisigs, gauges, reputation systems, NFT governance, or plugin-defined models.

Local autonomy is allowed, but all local governance must remain constitutionally compatible.

Do not represent governance restrictions as opaque exclusion lists.

Represent restrictions as Constitutional Guardrails with transparent reason codes.

The Governance Console must present the selected DAO as an operational tenant account, not only as a governance metadata record.

Each tenant should expose:

- tenant profile
- constitutional standing
- local governance model
- treasury status
- enabled products/modules
- assigned agents
- active proposals and pending operations
- execution receipts
- governance reason codes

The frontend renders tenant state only. It must not infer constitutional validity, sanctions, treasury restrictions, or execution authority.

---

### Data Layer

Responsible for:

- API clients
- contract reads
- indexing data
- caching
- loading states
- error states
- stale data handling

---

### Execution Layer

Responsible for:

- proposal execution
- transaction submission
- contract interaction
- action confirmation
- receipt tracking
- error recovery

---

### UI System Layer

Responsible for:

- shared components
- design tokens
- layout primitives
- cards
- tables
- forms
- modals
- alerts
- status indicators

---

## Module Registry Concept

AxodusAPP should maintain a central module registry.

Each module should declare:

- module ID
- display name
- description
- icon
- route base path
- required permissions
- visibility rules
- status
- navigation items
- component entrypoints

This allows the app to scale without creating chaotic navigation logic.

---

## Route Philosophy

Routes should be organized by user intent.

Examples:

- dashboard
- governance
- treasury
- academy
- marketplace
- acs
- trading
- dex
- mining
- lottery
- business
- settings

Protected routes must require wallet connection.

Sensitive routes may require DAO role or permission.

---

## State Philosophy

State should be separated into:

- wallet state
- session state
- DAO context state
- chain context state
- UI state
- module state
- server/cache state

Avoid mixing server data with local UI state.

---

## API Philosophy

AxodusAPP should not directly depend on one backend forever.

It should consume APIs through service clients.

Service clients should support:

- Governance API
- Defi API
- ACS API
- Marketplace API
- Academy API
- Mining API
- Trading API
- Dex API
- Lottery API
- Business API

---

## Marketplace Nucleus Architecture

The Marketplace nucleus is a governance-aware NFT marketplace and commerce layer, not a generic product catalog.

Current implementation state:

- mock-first
- tenant-aware
- governance-aware
- production-shaped
- settlement-deferred
- prepared for NFT assets, licenses, subscriptions, publisher workflows, and DAO-owned products

Marketplace products must remain attached to ecosystem context:

- seller or publisher identity
- optional DAO or tenant ownership
- constitutional standing
- governance validation state
- seller standing and reputation
- product maturity and visibility
- license and access model
- supported chains
- NFT-bound status
- royalty configuration
- delivery method
- billing and subscription mode
- lifecycle timestamps

The Marketplace mock layer should model the continuous operational flow:

Publisher Console -> Asset/Product creation preview -> Governance validation -> License model -> Listing preview -> Purchase preview -> Issued license preview.

The frontend may expose production-shaped boundaries for future integrations, but all current implementations must remain explicit previews:

- `MarketplaceContractAdapter`
- `AuctionAdapter`
- `RoyaltyAdapter`
- `GreenfieldAccessAdapter`
- `ReownWalletAdapter`
- `LayerZeroBridgeAdapter`
- `TreasurySettlementAdapter`
- `BillingProviderAdapter`

These boundaries must not execute wallet transactions, contract writes, minting, payment provider calls, treasury movement, Greenfield production delivery, LayerZero messaging, auction settlement, bid placement, royalty settlement, or fiat checkout until explicitly approved in a later sprint.

Marketplace UI labels must distinguish:

- Mock validation
- Preview only
- No settlement
- No wallet transaction
- No treasury execution
- No contract write
- Simulated license issuance

Sprint 01 runtime persistence boundaries:

- API contracts live under `src/modules/marketplace/contracts`.
- Zod validation schemas live under `src/modules/marketplace/schemas`.
- Repository abstractions live under `src/modules/marketplace/repositories`.
- API module scaffolding lives under `apps/api/modules/marketplace`.
- Entitlement read models are aggregated through `buildMarketplaceEntitlementReadModel`.
- Frontend mock consumption should prefer repository-normalized runtime snapshots instead of raw static constants where practical.
- Runtime entities must carry stable `runtimeId` UUIDs and deterministic `entityRef` references.

Repositories are intentionally adapter-shaped:

- mock adapters are implemented now
- future database adapters may replace them
- future indexer adapters may replace them
- production database writes are not implemented
- production settlement is not implemented

Sprint 02 wallet, ownership, listing, and royalty runtime boundaries:

- Wallet runtime lives in `src/modules/marketplace/services/walletRuntime.ts`.
- NFT ownership readiness lives in `src/modules/marketplace/services/nftOwnershipRuntime.ts`.
- Listing and bid lifecycle previews live in `src/modules/marketplace/services/listingRuntime.ts`.
- Royalty accounting previews live in `src/modules/marketplace/services/royaltyRuntime.ts`.
- Product detail UI exposes wallet runtime, ownership readiness, listing runtime, and royalty runtime panels.
- Reown/AppKit and EVM provider boundaries are modeled as mock-only adapters.
- Wallet actions are permission-aware and chain-aware, but signatures, wallet transactions, and chain writes remain disabled.
- ERC721, ERC1155, license-bound NFTs, access NFTs, and governance NFTs are modeled for readiness only.
- Fixed listings, English auctions, Dutch auctions, reserve listings, and bid lifecycle states are prepared without settlement.
- EIP-2981 royalty reads and accounting splits are previewed without contract reads, accounting writes, treasury execution, or royalty settlement.

Sprint 03 governance, ACS, and tenant federation boundaries:

- Governance runtime read models live in `src/modules/marketplace/services/governanceRuntime.ts`.
- Tenant federation read models live in `src/modules/marketplace/services/tenantFederation.ts`.
- ACS Marketplace visibility lives in `src/modules/marketplace/services/acsMarketplaceLayer.ts`.
- Marketplace products and sellers expose constitutional standing, restriction state, warnings, sanctions, federation tier, governance authority, DAO ownership, and operational approval state as first-class runtime data.
- Tenants are treated as DAO commerce boundaries with isolation references, storefront readiness, seller relationships, product scopes, treasury destinations, and governance authorities.
- ACS package visibility covers MCP services, orchestration packages, AI agents, compute access, and ACS runtime packages as provisioning previews only.
- Federation dashboard UI exposes tenant metrics, governance metrics, ACS operational metrics, seller standing metrics, and constitutional alerts.
- DAO storefront execution, ACS provisioning, agent deployment, compute allocation, governance execution, contract writes, and settlement remain disabled.

---

## Long-Term Architecture Goal

AxodusAPP should become a modular ecosystem shell where new Axodus nuclei can be added as first-class modules without rewriting the application core.

---

## Portfolio Business Consumer Contract Architecture

AXAPP-REQ-07 formalizes the Business-to-AxodusAPP portfolio intelligence boundary.

Business is the portfolio intelligence producer. AxodusAPP is the read-only consumer.

Contract artifacts live under `src/features/portfolio/contracts` and reuse the existing AXAPP-REQ-01 portfolio registry types instead of introducing parallel data models.

Architecture rules:

- contract read models must map to existing portfolio registry types;
- validation must remain pure and local;
- refresh policy must remain manual snapshot refresh;
- future API readiness is documentation-only until a separate approved request;
- no polling, synchronization, backend integration, production credentials or mutation behavior may be introduced by the contract layer;
- no wallet, governance execution, treasury movement, trading, settlement, payout, ACS provisioning, contract deployment or on-chain writes are enabled.
