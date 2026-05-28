# AxodusAPP Tasks

## Progress Snapshot

Last updated: 2026-05-27

Overall AxodusAPP completion: 36%

Current phase: Governance Tenant Console Deepening Phase

Current priority: Sprint 05 Governance Tenant Console Deepening. Governance is being established as the reference tenant-aware console pattern.

### Sprint 00A — Vercel Build Recovery & Deployment Gate

- Reproduce Vercel-style isolated build failure — 100%
- Identify missing file/import root cause — 100%
- Remove external build dependency on sibling `../Business` workspace — 100%
- Stabilize production build script — 100%
- Add deploy verification scripts — 100%
- Document build recovery report — 100%
- Run final local validation gate — 100%

### Sprint 00B — Information Architecture & UI Scope Separation

- Define shared UI scope metadata contract — 100%
- Add reusable scope badge, section, card and legend components — 100%
- Add minimal module registry with supported scope metadata — 100%
- Apply scope separation to dashboard — 100%
- Apply initial scope separation to Governance, Business, Marketplace and Academy — 100%
- Document route-level UI scope audit — 100%
- Validate production build after semantic UI changes — 100%

### Sprint 00C — UI Route & Card Inventory

- Inventory registered routes from `src/routes.jsx` — 100%
- Inventory major visible cards, panels, widgets, tables and status blocks — 100%
- Identify mixed-scope pages and recommended future layouts — 100%
- Identify duplicated UI patterns and shared component targets — 100%
- Classify major UI data sources and hardcoded domain data risks — 100%
- Create prioritized UI refactor backlog for Sprint 01 — 100%
- Validate production build after documentation changes — 100%

### Sprint 01 — App Shell Normalization

- Consolidate global app frame into `AppShell` — 100%
- Add shared `PageShell`, `PageHeader`, `SectionShell` and `ContentGrid` — 100%
- Add reusable `CardShell` — 100%
- Group sidebar navigation by Protocol/User/Tenant/Operations — 100%
- Normalize header runtime indicators — 100%
- Apply shared shell/card pattern to main dashboard — 100%
- Document normalization report — 100%
- Validate lint/build after shell changes — 100%

### Sprint 02 — Tenant Context Runtime

- Define shared tenant type model — 100%
- Add mock tenant registry — 100%
- Add tenant context provider, hook and registry helpers — 100%
- Add tenant-aware runtime module registry — 100%
- Add TenantSelector to global header — 100%
- Add TenantIdentityPanel reusable component — 100%
- Apply tenant context to dashboard, Governance, Business, Marketplace and Academy — 100%
- Document Tenant Context Runtime report — 100%
- Validate lint/build after tenant runtime changes — 100%

### Sprint 03 — Dashboard Recomposition

- Create dashboard module and composition layer — 100%
- Split dashboard into Protocol, User, Tenant and Operations sections — 100%
- Add module maturity summary — 100%
- Show selected tenant context on dashboard — 100%
- Separate wallet/user summary from protocol state — 100%
- Separate operator/readiness summary from public protocol state — 100%
- Replace large dashboard JSX data composition with `dashboardComposition.js` — 100%
- Document kept/moved/deferred dashboard cards — 100%
- Validate lint/build after dashboard recomposition — 100%

### Sprint 04 — Module Workbench Normalization

- Inspect Governance, Business, Marketplace, Academy and Trading route surfaces — 100%
- Add shared workbench summary helper — 100%
- Add Governance workbench composition model — 100%
- Normalize Governance console into Protocol/User/Tenant/Operations summaries — 100%
- Add Business workbench composition model — 100%
- Normalize Business overview into Protocol/User/Tenant/Operations summaries — 100%
- Extend module metadata for workbench scope support — 100%
- Document module workbench normalization report — 100%
- Validate lint/build after module workbench changes — 100%

### Sprint 05 — Governance Tenant Console Deepening

- Add Governance console composition model — 100%
- Add Governance Context Header — 100%
- Add Axodus Root vs selected tenant authority split — 100%
- Add Constitutional Governance section — 100%
- Add Local Governance section — 100%
- Add Tenant Governance Identity panel — 100%
- Add Proposal State Summary — 100%
- Add User Participation panel — 100%
- Add Governance Readiness panel — 100%
- Add ACS Review State panel — 100%
- Document Governance Tenant Console deepening report — 100%
- Validate lint/build after Governance console deepening — 100%

### Module Progress

- Governance module: 95%
- Governance createProposal flow: 86%
- Governance proposal detail/execution UI: 74%
- Governance registry/standing/guardrail observability: 90%
- Wallet integration surface: 65%
- Layout/app shell foundation: 59%
- Shared UI foundation: 38%
- State architecture: 38%
- Testing foundation: 45%
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

1. Add real indexer reconciliation for createProposal after on-chain/plugin adapters are connected.
2. Connect DAO tenant accounts to indexed DAO, plugin deployment, treasury policy, member/role, agent assignment and receipt sources.
3. Move remaining backend work into a non-detached sprint branch before staging.

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
- Create Sidebar — 58%; Governance now supports contextual DAO Tenant filters below the Governance navigation only on `/governance/tenants`
- Create Topbar — 54%
- Create Mobile Navigation — 42%
- Create Notification Center — 18%
- Create DAO Context Selector — 62%

---

## Governance Tasks

- Create Governance public landing — 95%; `/governance` is now visually positioned as Governance Overview with executive metrics only: total TVL, DAO Tenants, CORE APR, open proposals, recently finalized proposals, federal treasury status, active chains, governance health and constitutional standing; it uses distinct metric/status/featured tenant card variants, shows only three featured tenant previews selected by mock/admin fields and links deeper discovery to `/governance/tenants`
- Create Governance dashboard — 89%; protected `/governance/console` consumes backend chain registry with fallback PoC data and renders the selected DAO as a tenant operations account with Constitutional Layer, governance health, treasury execution, proposal activity, products, agents, operations and receipts context
- Create Governance DAO context selector — 76%; console models Axodus Constitutional Governance plus Local Governance contexts for indexed sub-DAOs
- Create DAO explorer — 75%; console exposes a Sub-DAO Explorer for constitutional authority, local governance autonomy, chain roles, capabilities, plugins, proposal readiness and selected DAO Constitutional Layer state
- Create proposal list shell — 80%; console shows real indexed proposals when available, links rows into proposal detail, and keeps an explicit empty state otherwise
- Add governance dev proposal fixtures — 88%; development-only mock proposals allow proposal detail, guardrail observability and transaction preview testing before live proposals are indexed
- Create proposal list — 90%; supports search, status filters, proposal metadata, dev mock labels, direct links into proposal detail, local proposal drafts, request inspection, review/submit states, local mock receipts, backend review-queued receipts, selected DAO/chain scoped backend review receipt visibility, backend storage/source metadata, backend submission error/retry display with backend reason metadata, mode-aware submit labels, modal-level integration state, plugin-specific createProposal adapter metadata, createProposal Constitutional Layer context, observed governance sources for registry/DAO/plugin/treasury policy, env-gated backend submission, and smoke-tested modal draft generation
- Create proposal detail page — 81%; protected `/governance/proposals/:proposalId` reads backend proposal detail/actions and composes operational state, adapter preview, voting, execution, permission check, guardrail, receipt, execution action, governance context, Constitutional Layer and wallet history panels
- Create governance transaction adapter — 75%; isolates vote/execute preparation by plugin type and chain capability, with TokenVoting/Multisig ABI calldata binding, guarded wagmi write submission, wallet network switching, and createProposal request adapter/source metadata for EVM voting, multisig, treasury policy and Harmony legacy surfaces
- Create voting UI — 70%; proposal detail exposes adapter-ready vote option selection and wallet action readiness
- Create execution receipt UI — 72%; proposal detail exposes indexed remote receipts, local wallet transaction receipt tracking, and governance indexer reconciliation status
- Create local governance operation history — 76%; proposal detail persists recent wallet operations by wallet/proposal while backend indexing catches up
- Create governance transaction confirmation preview — 74%; proposal detail requires explicit review of action, chain, plugin contract, calldata, fee source and governance impact before opening wallet prompt
- Create governance action permission guards — 80%; vote/execute operations run wallet, backend chain capability, action-level plugin capability, indexing readiness and lifecycle checks before wallet submission
- Add governance nuclei model — 87%; chain registry and frontend fallback distinguish Constitutional Governance powered by `$Neurons` from Local Governance controlled by federated entities, including authority/federation/execution boundaries
- Add Constitutional Guardrail reason codes — 87%; backend registry/indexer status, createProposal boundaries, Constitutional Layer execution models and frontend permission guards expose transparent guardrail codes across UI/API flows
- Add governance standing model — 86%; frontend registry normalization maps legacy constitutional compatibility payloads into constitutional standing, governance status, federation tier, Constitutional Layer and reason severity for rendering only
- Evolve Governance Operations Center — 91%; `/governance/console` is repositioned as a DAO Tenant Operations Center with operations readiness visibility for registry, selected tenant context, Constitutional Layer, governance health, treasury execution, proposal activity, treasury status, enabled products, assigned agents, proposals, plugins, local drafts, proposal creation state, selected-context backend createProposal review receipt listing with storage mode/source metadata, reusable createProposal integration status panel, observed source metadata, and smoke-tested route/modal flow
- Add Constitutional Guardrail observability — 86%; registry summary exposes active reason codes with severity, source, scope, network, createProposal request context, observed registry/DAO/plugin/treasury policy sources, and constitutional execution model metadata for console rendering
- Add selected governance context guardrails — 74%; console exposes reason codes and observed source metadata affecting selected DAO and chain context separately from global registry guardrails
- Add DAO tenant account model — 78%; `/governance/console` now renders selected SubDAO/root DAO as an operational tenant account with profile, standing, local governance model, treasury policy status, products, agents, active proposals, pending operations, execution receipts and tenant reason codes; `/governance/tenants` exposes tenant DAO discovery with contextual sidebar multi-select filters for risk, investment type, chain, federation tier, governance status and featured-only, plus comparison-optimized tenant cards, featured flags, APR-vs-CORE, TVL, members, chains, status and federation tier; `/governance/dao/:daoId` now behaves as a public tenant operations workspace with strategy, treasury allocation, user position, APR/performance, risk metrics, products, chains, agents, active proposal queue, pending operations, execution receipts, local governance model, reason codes and constitutional observability boundaries, and it resolves tenant state through a frontend source contract for `/v2/governance/tenants/:tenantId`, `/operations` and `/receipts` with local mock fallback; backend exposes `/v2/governance/tenants` and now attempts to derive tenant accounts from indexed DAO registry records before falling back to bootstrap tenant fixtures
- Add nucleus design instruction architecture — 40%; `.instructions/DESIGN.md` now defines the shared AxodusAPP design index and `.instructions/design/<nucleus>/DESIGN.md` stores nucleus-specific design direction, starting with Governance
- Add Governance design and information architecture — 65%; `.instructions/design/governance/DESIGN.md` defines Governance as an Economic Infrastructure Control Plane, DAO Tenant Operations Center and federated DAO operating workspace; the IA now separates Overview as executive summary, DAO Tenants as discovery/filtering with contextual sidebar controls, DAO Detail as deep analysis, Console as operations and Proposals as governance actions, with reusable card variants for metric summaries, featured tenants, tenant discovery, user positions, APR comparison and governance status

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

- Create Product listing — 78%; integrated governance-aware NFT marketplace module under `/marketplace` with tenant-aware mock ERC721/1155 listings, fixed listings, auctions, URL filters, seller standing, tenant ownership, lifecycle metadata, and operational registry table.
- Create Product detail page — 84%; `/marketplace/products/:slug` renders NFT metadata, tenant/DAO owner, product/governance lifecycle rails, contract adapter boundary, wallet runtime state, NFT ownership readiness, listing/bid runtime state, royalty accounting previews, auction state, Greenfield delivery, LayerZero readiness, seller standing, treasury destination, ACS validation state, risk state, and buy-now/bid preview modal with explicit mock-only labels.
- Create Create/Sell preview — 80%; `/marketplace/create` and `/marketplace/sell` generate mock listing adapter payloads with ERC721/1155 quantity rules, metadata URI readiness, fixed/english/dutch auction parameters, DAO owner, treasury destination, royalty service, storage access, ListingDraftService review gates, blocker detection, publisher/governance handoff preview, and LayerZero boundary previews without minting, signing, settlement, bridge execution, or treasury routing.
- Create Governance validation view — 84%; `/marketplace/governance` exposes GovernanceValidationService review gates, governance runtime read models, tenant federation metrics, seller standing, validation timelines, lifecycle rails, ACS moderation workflows, ACS Marketplace package visibility, constitutional/treasury/risk/license review states, warnings, sanctions, activation-disabled state, settlement eligibility previews, and mock review recommendations without governance execution or provisioning.
- Create License registry — 75%; `/marketplace/licenses` exposes LicenseComplianceService readiness for NFT access, DAO, enterprise, and subscription license models, attached product counts, transfer/revocation previews, ownership-check boundaries, permissions, and license conflict blockers without ownership validation execution.
- Create Marketplace dashboard — 84%; `/marketplace/dashboard` exposes federation dashboard metrics, tenant commerce overview, tenant isolation boundaries, seller metrics, product metrics, license metrics, governance runtime alerts, ACS operational metrics, billing previews, pending validations, constitutional alerts, mock revenue stats, ecosystem integration readiness, and named adapter readiness for contract, auction, royalty, wallet runtime, listing runtime, Greenfield, LayerZero, treasury and billing boundaries.
- Create Subscription management — 72%; `/marketplace/subscriptions` exposes mock lifecycle rails, renewal/expiration preview, license relationship, billing relationship, governance standing, access scope, treasury destination, SubscriptionLifecycleService readiness, pause/cancel previews, revocation preview, access preview state, and blocked reasons without renewal execution.
- Create Billing interface — 72%; `/marketplace/orders` and `/marketplace/treasury` expose BillingPreviewService invoice previews, purchase/billing/license lifecycle rails, protocol fee preview, royalty preview, accepted currency display, seller net, accounting hooks, treasury route review, blocked reasons, settlement disclaimers, and disabled execution boundaries without payment execution.
- Create Publisher console — 74%; `/marketplace/publisher` exposes PublisherReadinessService seller task queue, target product, target registry, publishing scope, escalation target, pre-publish checklist, metadata state, required reviews, seller standing blockers, treasury link blockers, product standing blockers, metadata/plugin blockers, and publish readiness without live publishing.
- Create Asset gallery — 74%; `/marketplace/assets` exposes an operational asset gallery for ERC721, ERC1155 and offchain license assets, with media grid, URL token-standard filtering, NFT-bound indicators, delivery method badges, license/access status, tenant ownership, product lifecycle state, chain support, governance status, Greenfield signed URL readiness and LayerZero bridge readiness from centralized mock marketplace data.
- Add Marketplace Runtime Persistence & API Boundaries — 68%; Sprint 01 adds Zod API contracts, TypeScript DTOs, repository abstractions, mock repository adapters, runtime UUID/entityRef normalization, entitlement read models, API mock runtime envelopes, and `apps/api/modules/marketplace` scaffolding without live backend handlers, database writes, wallet execution, contract writes, settlement, treasury movement, Greenfield production delivery, or LayerZero messaging.
- Add Marketplace Wallet, Ownership & NFT Runtime Preparation — 76%; Sprint 02 adds mock-only wallet session/runtime services, chain-aware Reown/AppKit and EVM provider boundaries, NFT ownership readiness for ERC721/1155/license/access/governance assets, listing and bid lifecycle runtime previews, EIP-2981 royalty accounting previews, product detail runtime panels, and targeted tests without signatures, live ownership reads, wallet transactions, contract writes, settlement, minting, bid placement, royalty settlement, treasury execution, or LayerZero messaging.
- Add Marketplace Governance, ACS & Tenant Federation Integration — 78%; Sprint 03 adds governance runtime read models, seller governance previews, DAO/tenant federation read models, tenant isolation and storefront readiness, ACS Marketplace package visibility for MCP services/orchestration/agents/compute/runtime packages, federation dashboard UI, governance UI enrichment, and focused tests without live Governance API enforcement, ACS provisioning, DAO storefront activation, agent deployment, compute allocation, sanctions execution, contract writes, or settlement.

---

## Academy Tasks

- Create Course listing — 80%; `/academy/courses` is mock-driven with filters for category, level, reward class, access type, language, and governance status; cards expose operational value, certification outcome, estimated duration, reward visibility, DAO recognition, governance unlocks, expanded course variety, and reusable empty states.
- Create Course detail page — 80%; `/academy/courses/:courseSlug` exposes PoK requirement, constitutional standing, reward model, tutor, lessons, prerequisites, supported chains, operational course profile, DAO recognition, governance unlocks, treasury sponsor, PoK checkpoints, milestone impact, unavailable-course state, and flow coverage links.
- Create Learning dashboard — 80%; `/academy/dashboard` exposes progress, certification, reward, governance alerts, review queue blockers, tutor accountability telemetry, mock loading state, and mock error state.
- Create Learning Workspace — 78%; `/academy/workspace/:courseSlug` exposes lesson execution, PoK checkpoint state, certification state, reward milestones, PoK validation rail, treasury source, proof references, and operational context without duplicating global navigation.
- Create Progress Engine — 80%; `/academy/progress` exposes level, trust score, Locked $NEURONS, Unlocked $NEURONS, next unlocks, ACS eligibility, Marketplace eligibility, PoK readiness, constitutional standing, Learn-to-Win competency hierarchy, competency signals, and flow coverage.
- Create Governance Eligibility — 78%; `/academy/eligibility` exposes governance level, DAO eligibility, contributor standing, DAO-aware identity, organization hierarchy, federation status, proposal readiness, validator readiness, committee eligibility, marketplace eligibility, and flow coverage.
- Create Certification interface — 80%; `/academy/certifications` previews mock certificates, proof hashes, issuer, credential status, governance validation, governance eligibility, DAO verification, DAO recognition, public verification paths, operational permissions, eligibility impact, NFT compatibility, varied certification statuses, and reusable empty state.
- Create Reward visibility — 82%; `/academy/rewards` explicitly separates Locked Rewards from Unlocked Rewards and shows reward source, utility, transferability status, treasury source, reward pool, emission budget, DAO sponsorship, educational grants, contributor allocation, vesting schedule, pending milestones, blocked reward examples, claimable state, governance control, and reusable empty state.
- Create Academy Governance Review — 80%; `/academy/governance-review` exposes constitutional, treasury, reward, certification, ACS review visibility, dependency scope, future contract references, review queue blockers, and flow coverage boundaries without implying direct user governance validation.
- Create Learn-to-Win UI — 80%; learning paths, reward classes, competency hierarchy, DAO compatibility, federation status, expanded progression states, mock readiness states, and flow coverage are visible with mock data only.

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
- Configure e2e testing — 18%; Governance route/modal smoke coverage added with Vitest/RTL while Playwright is not yet configured
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
