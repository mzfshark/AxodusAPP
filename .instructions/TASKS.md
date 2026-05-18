# AxodusAPP Tasks

## Progress Snapshot

Last updated: 2026-05-18

Overall AxodusAPP completion: 35%

Current priority: Governance Operations Center, createProposal observability, and BBA MVP visual QA.

### Module Progress

- Governance module: 80%
- Governance createProposal flow: 72%
- Governance proposal detail/execution UI: 74%
- Governance registry/standing/guardrail observability: 82%
- Wallet integration surface: 65%
- Layout/app shell foundation: 58%
- Shared UI foundation: 36%
- State architecture: 38%
- Testing foundation: 42%
- Security UX foundation: 48%
- Defi module: 8%
- ACS module: 6%
- Marketplace module: 5%
- Academy module: 5%
- Dex module: 5%
- Trading module: 5%
- Mining module: 5%
- Lottery module: 5%
- BBA module: 42%

### Active Governance Priorities

1. Backend HTTP smoke for `POST /v2/proposals/create`, `GET /v2/proposals/create/:id`, and `GET /v2/proposals/create`.
2. Move backend work off detached `HEAD` into a sprint branch before staging.
3. Add `storageMode` or equivalent source metadata to individual createProposal receipts.
4. Filter backend review receipts by selected DAO/chain in the Operations Center.
5. Add browser/e2e smoke for `/governance`, `/governance/console`, and create proposal modal flow.
6. Prepare plugin-specific createProposal adapters after backend execution/contracts are ready.

---

## Foundation Tasks

- Initialize React + Vite + TypeScript workspace — 90%
- Configure Tailwind CSS — 85%
- Configure ESLint and Prettier — 82%
- Configure absolute imports — 80%
- Configure environment system — 72%
- Configure routing architecture — 68%
- Configure module registry — 42%
- Configure design system foundation — 36%

---

## Wallet Tasks

- Integrate Reown AppKit — 78%
- Configure supported chains — 70%
- Configure wallet providers — 68%
- Configure chain switching — 62%
- Configure transaction status tracking — 54%
- Configure signature handling — 36%
- Configure connection persistence — 42%

---

## Layout Tasks

- Create App Shell — 70%
- Create Public Layout — 58%
- Create Authenticated Layout — 58%
- Create Sidebar — 56%
- Create Topbar — 54%
- Create Mobile Navigation — 42%
- Create Notification Center — 18%
- Create DAO Context Selector — 62%

---

## Governance Tasks

- Create Governance public landing — 78%; `/governance` exposes public registry/governance information without wallet requirement
- Create Governance dashboard — 82%; protected `/governance/console` consumes backend chain registry with fallback PoC data
- Create Governance DAO context selector — 76%; console models Axodus Constitutional Governance plus Local Governance contexts for indexed sub-DAOs
- Create DAO explorer — 72%; console exposes a Sub-DAO Explorer for constitutional authority, local governance autonomy, chain roles, capabilities, plugins and proposal readiness
- Create proposal list shell — 80%; console shows real indexed proposals when available, links rows into proposal detail, and keeps an explicit empty state otherwise
- Add governance dev proposal fixtures — 88%; development-only mock proposals allow proposal detail, guardrail observability and transaction preview testing before live proposals are indexed
- Create proposal list — 82%; supports search, status filters, proposal metadata, dev mock labels, direct links into proposal detail, local proposal drafts, request inspection, review/submit states, local mock receipts, backend review-queued receipts, backend submission error/retry display with backend reason metadata, mode-aware submit labels, modal-level integration state, and env-gated backend createProposal submission
- Create proposal detail page — 78%; protected `/governance/proposals/:proposalId` reads backend proposal detail/actions and composes operational state, adapter preview, voting, execution, permission check, guardrail, receipt, execution action, governance context and wallet history panels
- Create governance transaction adapter — 72%; isolates vote/execute preparation by plugin type and chain capability, with TokenVoting/Multisig ABI calldata binding, guarded wagmi write submission, and wallet network switching
- Create voting UI — 70%; proposal detail exposes adapter-ready vote option selection and wallet action readiness
- Create execution receipt UI — 72%; proposal detail exposes indexed remote receipts, local wallet transaction receipt tracking, and governance indexer reconciliation status
- Create local governance operation history — 76%; proposal detail persists recent wallet operations by wallet/proposal while backend indexing catches up
- Create governance transaction confirmation preview — 74%; proposal detail requires explicit review of action, chain, plugin contract, calldata, fee source and governance impact before opening wallet prompt
- Create governance action permission guards — 80%; vote/execute operations run wallet, backend chain capability, action-level plugin capability, indexing readiness and lifecycle checks before wallet submission
- Add governance nuclei model — 84%; chain registry and frontend fallback distinguish Constitutional Governance powered by `$Neurons` from Local Governance controlled by federated entities
- Add Constitutional Guardrail reason codes — 82%; backend registry/indexer status, createProposal boundaries and frontend permission guards expose transparent guardrail codes across UI/API flows
- Add governance standing model — 82%; frontend registry normalization maps legacy constitutional compatibility payloads into constitutional standing, governance status, federation tier and reason severity for rendering only
- Evolve Governance Operations Center — 80%; `/governance/console` is positioned as a federation observability surface with operations readiness visibility for registry, selected context, proposals, plugins, local drafts, proposal creation state, backend createProposal review receipt listing and reusable createProposal integration status panel
- Add Constitutional Guardrail observability — 78%; registry summary exposes active reason codes with severity, source, scope and network for console rendering
- Add selected governance context guardrails — 72%; console exposes reason codes affecting selected DAO and chain context separately from global registry guardrails

---

## Defi Tasks

- Create Treasury dashboard — 8%
- Create Vault UI — 8%
- Create Staking overview — 6%
- Create Allocation tables — 8%
- Create Financial reporting components — 6%

---

## ACS Tasks

- Create Agent console — 6%
- Create Workflow monitor — 5%
- Create Telemetry dashboard — 6%
- Create Provider status page — 5%
- Create Execution log viewer — 5%

---

## Marketplace Tasks

- Create Product listing — 55%; integrated governance-aware NFT marketplace module under `/marketplace` with mock ERC721/1155 listings, fixed listings, auctions, filters, and seller standing.
- Create Product detail page — 55%; `/marketplace/products/:slug` renders NFT metadata, royalty previews, Greenfield delivery, LayerZero readiness, seller standing, and buy-now/bid preview modal.
- Create Create/Sell preview — 45%; `/marketplace/create` and `/marketplace/sell` generate mock listing adapter payloads without minting, signing, settlement, bridge execution, or treasury routing.
- Create Governance validation view — 45%; `/marketplace/governance` exposes product standing and ACS moderation workflows.
- Create License registry — 45%; `/marketplace/licenses` exposes NFT access, DAO, enterprise, and subscription license models.
- Create Marketplace dashboard — 45%; `/marketplace/dashboard` exposes mock operational telemetry and Phase 2 integration boundaries.
- Create Subscription management — 8%
- Create Billing interface — 8%
- Create Asset gallery — 35%; product cards and item detail pages now consume centralized mock marketplace data.

---

## Academy Tasks

- Create Course listing — 5%
- Create Learning dashboard — 5%
- Create Certification interface — 4%
- Create Reward visibility — 5%
- Create Learn-to-Win UI — 4%

---

## Dex Tasks

- Create Swap interface — 5%
- Create Pool explorer — 4%
- Create LP management UI — 4%
- Create Route visualization — 4%
- Create Token list management — 5%

---

## Trading Tasks

- Create Trading dashboard — 5%
- Create Strategy viewer — 4%
- Create Risk dashboard — 5%
- Create Backtest interface — 4%
- Create Portfolio telemetry — 4%

---

## Mining Tasks

- Create Mining dashboard — 5%
- Create Provider explorer — 4%
- Create Allocation visibility — 4%
- Create Reward accounting UI — 4%
- Create Compliance visibility — 5%

---

## Lottery Tasks

- Create Campaign explorer — 5%
- Create Draw history UI — 4%
- Create Reward claims UI — 4%
- Create Randomness proof visibility — 4%
- Create Participation history — 4%

---

## BBA Tasks

- Create BBA routing — 100%; `/bba`, `/bba/services`, `/bba/portfolio`, `/bba/campaigns`, `/bba/partnerships`, and `/bba/governance` are registered in the app shell with BBA section navigation
- Create BBA home — 70%; renders strategic institutional agency positioning, MVP boundaries, metrics, brand asset inventory, channel matrix, proposal pipeline, and ACS workflow visibility from mock data
- Create Services Explorer — 68%; mock-driven service catalog with category, governance, institutional category, reputation risk, and search filters
- Create Portfolio Showcase — 62%; mock case studies, brand assets, and deliverable tracker are visible without live execution
- Create Campaign dashboard — 66%; campaign metrics, filters, compliance risks, deliverables, and embedded ACS workflow status are visible
- Create DAO Partnership View — 60%; client/partner cards, partnership filters, proposal pipeline, and institutional channels are visible
- Create Governance Validation — 64%; lightweight constitutional compatibility, treasury-safe messaging, communication risk, and public reputation risk review are visible without replacing Governance
- Create BBA mock data layer — 76%; `src/data/mock/bba.mock.js` covers Service, Campaign, ClientPartner, Proposal, Workflow, BrandAsset, InstitutionalChannel, Deliverable, portfolio, and governance review data
- Create BBA service/filter helpers — 70%; module data access runs through BBA service helpers rather than hardcoded component data
- Create BBA frontend tests — 52%; BBA mock shape, filters, and home render are covered by Vitest
- Add BBA backend/domain contracts — 58%; BBA-Agency contains TypeScript and Zod contract files for future API alignment
- Next BBA task: run browser/mobile visual QA on all six BBA routes and tighten layout/spacing issues before deeper Phase 2 integrations

---

## Shared UI Tasks

- Create Card components — 46%
- Create Table components — 38%
- Create Modal system — 46%
- Create Toast system — 16%
- Create Status indicators — 52%
- Create Form primitives — 34%
- Create Skeleton loaders — 18%
- Create Error states — 38%

---

## State Tasks

- Configure global state architecture — 32%
- Separate server state from UI state — 42%
- Configure DAO context state — 58%
- Configure wallet state — 52%
- Configure module state — 34%
- Configure session state — 24%

---

## Testing Tasks

- Configure unit testing — 56%
- Configure component testing — 48%
- Configure e2e testing — 12%
- Configure accessibility testing — 8%
- Configure visual regression testing — 6%

---

## Security Tasks

- Validate protected routes — 58%
- Validate permission-aware rendering — 62%
- Validate transaction confirmations — 56%
- Validate wallet state handling — 46%
- Validate session persistence — 24%
- Validate sensitive UI flows — 48%
