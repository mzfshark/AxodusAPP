# AxodusAPP Decisions

## Decision 1 — AxodusAPP Is the Ecosystem Orchestrator

AxodusAPP is the unified interface where all Axodus nuclei are accessed.

It is not a single-purpose dashboard.

Reasoning:

The Axodus ecosystem requires a coherent user experience across governance, finance, AI, education, marketplace, liquidity, mining, trading, rewards, and communication.

---

## Decision 2 — Modules Must Be Registry-Driven

Modules should be registered through metadata rather than hardcoded navigation only.

Reasoning:

The ecosystem will continue growing, and the frontend must remain extensible.

---

## Decision 3 — Governance Comes First

The Governance module should be the first deep integration.

Reasoning:

Governance defines permissions, DAO context, execution authority, and ecosystem legitimacy.

---

## Decision 4 — Wallet and DAO Context Are Core State

The app must always understand:

- connected wallet
- selected chain
- selected DAO
- active permissions

Reasoning:

Most user actions depend on account, network, and DAO context.

---

## Decision 5 — AxodusAPP Does Not Own Protocol Logic

Business logic should remain in contracts, APIs, services, and nuclei.

AxodusAPP coordinates interaction and visibility.

Reasoning:

Frontend logic must not become the hidden authority of the protocol.

---

## Decision 6 — Progressive Disclosure Is Required

The app should not overwhelm users with all complexity at once.

Reasoning:

Axodus is complex. The interface must guide users by role, context, and intent.

---

## Decision 7 — Security UX Is Mandatory

Transactions, signatures, treasury actions, proposal execution, and governance operations must be clearly explained before user confirmation.

Reasoning:

Bad UX can create financial and governance risk.

---

## Decision 8 — Mobile Responsiveness Is Required

AxodusAPP must be usable on desktop and mobile.

Reasoning:

DAO participation, education, and ecosystem access should not be desktop-only.

---

## Decision 9 — Use Mock Data Before Full Backend Readiness

The app may use typed mock data during early development.

Reasoning:

Frontend structure can progress while contracts and services mature.

Mocks must be clearly separated from production clients.

---

## Decision 10 — Official App Path

The frontend app workspace should be:

Axodus/AxodusAPP

Reasoning:

This app is the central interface and deserves its own workspace-level instructions.

---

## Decision 11 — Axodus Governance Has Two Governance Nuclei

Axodus Governance has two distinct governance nuclei:

1. Constitutional Governance, powered by `$Neurons`.
2. Local Governance, controlled by each federated startup, DAO, company, product, or community.

The Constitutional Governance layer defines federal standards, capabilities, conditions, guardrails, and ecosystem-wide legitimacy.

The Local Governance layer may use `$Neurons`, local tokens, auto-generated platform tokens, multisigs, gauges, reputation systems, NFT governance, or plugin-defined models.

All ecosystem DAOs should be modeled as federated local governance contexts inside the Axodus constitutional federation.

Sub-DAOs may preserve local strategic and operational autonomy, but they must remain constitutionally compatible with Axodus standards, treasury policies, execution guardrails, and ecosystem permissions.

Reasoning:

Each sub-DAO represents an ecosystem company, investment agency, product unit, community, or operating organization. Autonomy is useful for execution, but Constitutional Governance preserves ecosystem integrity, policy consistency, and constitutional accountability.

The app must not frame local autonomy as sovereignty outside the Axodus constitutional model.

---

## Decision 12 — Harmony Governance Is Not Axodus Governance

Harmony Governance should not be highlighted as part of Axodus Governance.

It is a Business product delivered by Axodus for Harmony, not a sovereign component of the Axodus governance federation.

Reasoning:

The Axodus app should present Axodus-native governance. External client products may remain accessible through their own product surfaces, but they must not be framed as Axodus federal governance.

---

## Decision 13 — Constitutional Guardrails Require Transparent Reason Codes

AxodusAPP must not use opaque automatic exclusion language or hidden blocking behavior.

Restricted governance actions should be presented as **Constitutional Guardrails** with transparent reason codes.

Reason codes should explain why an action is blocked, warned, degraded, delayed, or requires review.

Examples:

- `CHAIN_NOT_CONSTITUTIONALLY_ENABLED`
- `PLUGIN_CAPABILITY_NOT_REGISTERED`
- `LOCAL_GOVERNANCE_MODEL_INCOMPATIBLE`
- `TREASURY_POLICY_REQUIRES_REVIEW`
- `EXECUTION_CHAIN_NOT_AUTHORIZED`
- `VOTING_POWER_SOURCE_NOT_VERIFIED`
- `INDEXER_STATE_NOT_READY`
- `REMOTE_EXECUTION_GUARDRAIL_ACTIVE`
- `AGENT_PERMISSION_SCOPE_EXCEEDED`

Reasoning:

Governance restrictions must be auditable and understandable by users, operators, SDKs, indexers, and future AI agents.

---

## Decision 14 — Create Proposal UI Starts as a Preview Contract

AxodusAPP may render and persist local create-proposal drafts before backend or on-chain submission is enabled.

Local drafts are browser-only development state. They may expose review and mock submit states, but they must not be represented as indexed or on-chain proposals.

The frontend create-proposal request shape is defined as a preview contract and must include:

- DAO context
- chain context
- creator wallet
- plugin metadata
- proposal metadata
- Constitutional Guardrail reason codes
- backend validation requirement
- indexer reconciliation requirement

Reasoning:

The Governance Operations Center needs a stable UI and integration contract before final contracts and backend endpoints are production-ready. The frontend must still preserve the boundary that constitutional validity, permissions, sanctions, execution and indexing truth come from governance data sources.

Implementation note:

The create-proposal submission contract may call the Governance API only when `VITE_GOVERNANCE_CREATE_PROPOSAL_ENABLED=true`. Otherwise, AxodusAPP must keep using explicit local mock receipts so development state cannot be confused with indexed or on-chain proposals.

---

## Decision 15 — Academy MVP Remains Mock-Only Until Governance and Treasury Contracts Are Ready

The Academy nucleus in AxodusAPP is approved as a polished prototype-ready, frontend-first, mock-driven surface.

It must communicate Academy as the constitutional Proof-of-Knowledge, qualification, and `$NEURONS` distribution layer rather than a generic LMS.

Required boundaries:

- Free courses issue mock `Locked $NEURONS`.
- Paid courses issue mock `Unlocked $NEURONS`.
- Reward, certification, PoK, ACS, treasury, and future-contract data must remain read-model metadata until real integrations are approved.
- The UI must expose empty, loading, error, restricted, pending-validation, claimable, and blocked states without implying live minting, withdrawals, certification issuance, or contract writes.
- Future compatibility entities such as `PoKMinter`, `LockedNeuronsVault`, `RewardPolicy`, and `TreasuryEmissionBudget` may appear only as mock/read-model metadata.

Reasoning:

The Academy MVP is validating navigation, educational legitimacy, reward doctrine, trust, ACS readiness, governance eligibility, treasury control, and proof visibility before production blockchain or certification execution is enabled.

---

## Decision 16 — Marketplace MVP Is Tenant-Aware and Settlement-Deferred

The Marketplace nucleus in AxodusAPP is approved as a mock-first, governance-aware, tenant-aware NFT marketplace and commerce nucleus.

It must preserve NFT marketplace primitives as first-class concepts:

- ERC721 and ERC1155 assets
- EIP-2981 royalty previews
- fixed listings
- auctions
- bids
- item detail pages
- create/sell previews
- buy-now previews
- bid modals

Product, license, subscription, billing, publisher, and delivery workflows may extend this nucleus, but they must not replace the Marketplace identity as an NFT marketplace governance layer.

Required boundaries:

- Marketplace products must carry seller, tenant/DAO, constitutional, governance, maturity, visibility, license, delivery, chain, royalty, billing, subscription, and lifecycle context.
- Mock lifecycle states must be visible for product, governance validation, purchase, license, subscription, and billing flows.
- Adapter boundaries may exist for marketplace contracts, auctions, royalties, Reown wallet state, Greenfield access, LayerZero bridge readiness, treasury settlement, and billing providers.
- All adapter implementations must return mock or preview responses only.
- No real payment, contract write, minting, purchase, bid placement, treasury routing, royalty settlement, Greenfield signed URL issuance, or LayerZero messaging is enabled.

Reasoning:

The Marketplace should validate Axodus commerce continuity before settlement. Users must understand who publishes an asset, which tenant or DAO owns or validates it, what license applies, which governance requirements block activation, which chains are supported, and what mock purchase or simulated license issuance would produce.

Implementation note:

Marketplace UI and services must use explicit labels such as `Mock validation`, `Preview only`, `No settlement`, `No wallet transaction`, `No treasury execution`, `No contract write`, and `Simulated license issuance` wherever an action is not live.

---

## Decision 17 — Marketplace Runtime Persistence Starts With Contracts and Repositories

Marketplace may move from frontend-only mock constants toward runtime-ready state through typed contracts, schemas, repositories, and entitlement read models.

Approved Sprint 01 boundaries:

- API schemas and route contracts are defined with Zod.
- TypeScript DTOs are inferred from the validation schemas.
- Repository interfaces exist for products, sellers, tenants, licenses, purchases, subscriptions, billing previews, and governance validations.
- Mock repository adapters are the only implemented adapters.
- Runtime identifiers use stable UUID-shaped `runtimeId` values and deterministic `entityRef` references.
- Entitlement read models may aggregate owned products, active licenses, subscriptions, governance restrictions, delivery permissions, and NFT ownership readiness.
- A mock API runtime may wrap repository responses in API-shaped envelopes.

Explicitly deferred:

- production database writes
- live backend handlers
- wallet execution
- contract writes
- bid placement
- NFT minting or transfer
- payment settlement
- treasury movement
- Greenfield production delivery
- LayerZero messaging

Reasoning:

Marketplace needs backend-ready shape before production settlement. Contract-first repositories let AxodusAPP replace mock sources with API, database, or indexer adapters without redesigning the UI or implying live commerce execution.

## Decision 18 — Marketplace Wallet Runtime Is Preview-Only Until Execution Approval

Marketplace may model wallet session, chain readiness, ownership readiness, listing lifecycle, bid lifecycle, and royalty accounting before enabling live settlement.

Approved Sprint 02 boundaries:

- Reown/AppKit session state is represented through mock-only wallet runtime services.
- EVM provider readiness exposes chain and permission state without requesting signatures.
- NFT ownership readiness supports ERC721, ERC1155, license-bound NFTs, access NFTs, governance NFTs, and offchain license fallbacks.
- Listing runtime supports fixed listing, English auction, Dutch auction, reserve listing, bid lifecycle, and restricted/pending/expired/sold/cancelled/settlement-pending states.
- Royalty runtime previews EIP-2981 readiness, creator splits, platform fees, and treasury splits.
- Product detail may show these states as operational panels to clarify readiness and restrictions.

Explicitly deferred:

- real wallet signatures
- wallet transaction submission
- live ownership chain reads
- contract writes
- NFT minting or transfer
- real listing creation
- real bid placement
- auction settlement
- EIP-2981 contract reads
- royalty settlement
- treasury execution

Reasoning:

The Marketplace must become wallet-runtime aware before on-chain execution. Modeling wallet and ownership state now improves UX, governance visibility, and adapter boundaries while keeping the MVP settlement-deferred and safe.
