# AxodusAPP Roadmap

## Sprint 00A — Vercel Build Recovery & Deployment Gate

### Objectives

- restore deterministic production builds before UI refactor work
- remove Vercel-incompatible imports that point outside AxodusAPP
- keep the current UI structure intact while stabilizing deployment
- add a minimal deploy verification command

### Deliverables

- Vite build succeeds from the AxodusAPP project root
- `@axodus/business-runtime` resolves to an in-repository runtime source
- production build script no longer forces debug output
- build recovery report under `.instructions/reports`
- project status marked as Build Recovery Phase

---

## Sprint 00B — Information Architecture & UI Scope Separation

### Objectives

- introduce protocol, user, tenant and operator information scopes before visual polish
- stop dashboard and module cards from mixing ownership context without labels
- add reusable scope UI primitives without redesigning the full app shell
- document route-level scope risks and future normalization direction

### Deliverables

- shared UI scope metadata types
- scope badge, section, scoped card and legend components
- minimal module registry with scope capability metadata
- dashboard split into Protocol Overview, My Axodus, Tenant Console and Operations
- initial scoped treatment for Governance, Business, Marketplace and Academy
- UI scope audit report under `.instructions/reports`

---

## Sprint 00C — UI Route & Card Inventory

### Objectives

- inventory the current SPA route surface before app shell normalization
- classify major UI cards, panels, widgets, tables and status blocks
- identify mixed protocol/user/tenant/operator pages
- document duplicated UI patterns and data-source risks
- create the refactor backlog for Sprint 01

### Deliverables

- route inventory report under `.instructions/reports`
- card and panel inventory report under `.instructions/reports`
- mixed scope report under `.instructions/reports`
- duplication report under `.instructions/reports`
- data source inventory under `.instructions/reports`
- prioritized UI refactor backlog for Sprint 01

---

## Sprint 01 — App Shell Normalization

### Objectives

- make AxodusAPP render through one shared global shell
- group navigation by Protocol, User, Tenant and Operations
- add reusable page, section, grid and card shell primitives
- normalize the dashboard as the first shell adoption target
- keep module redesign and domain cleanup deferred

### Deliverables

- `AppShell`, `PageShell`, `PageHeader`, `SectionShell`, `ContentGrid`
- reusable `CardShell`
- sidebar grouped by information architecture scope
- header runtime indicators for scope, maturity and read-only mode
- app shell normalization report under `.instructions/reports`
- passing lint/build validation

---

## Sprint 02 — Tenant Context Runtime

### Objectives

- make selected tenant a first-class frontend runtime concept
- represent Sub-DAOs, companies, agencies, products and sandbox workspaces as tenant accounts
- expose selected tenant in the global app shell
- provide reusable tenant identity panels for major routes
- add tenant-aware module metadata without backend tenancy

### Deliverables

- tenant type model
- mock tenant registry
- `TenantProvider`, tenant hook and registry helpers
- global tenant selector
- reusable tenant identity panel
- tenant-aware module registry
- dashboard, Governance, Business, Marketplace and Academy tenant context visibility
- Tenant Context Runtime report under `.instructions/reports`

---

## Sprint 03 — Dashboard Recomposition

### Objectives

- turn the dashboard into the front door of AxodusAPP
- organize the dashboard by Protocol, User, Tenant and Operations
- compose dashboard data outside raw JSX
- summarize module maturity and readiness
- keep execution surfaces disabled and route users to deeper module consoles

### Deliverables

- dashboard module under `src/modules/dashboard`
- dashboard composition layer
- Protocol Overview section
- My Axodus section
- Tenant Console Summary section
- Operations Center section
- Module Maturity Summary
- Dashboard recomposition report under `.instructions/reports`

---

## Sprint 04 — Module Workbench Normalization

### Objectives

- start turning module pages into auditable workbenches
- separate protocol, user, tenant and operator information inside high-priority modules
- preserve existing MVP module information while adding clearer semantic hierarchy
- keep execution surfaces read-only, preview, simulation or disabled

### Deliverables

- shared workbench summary section helper
- Governance workbench composition model
- Business workbench composition model
- Governance console scoped into Protocol, User, Tenant and Operations summaries
- Business overview scoped into Protocol, User, Tenant and Operations summaries
- module metadata extended for workbench rendering
- module workbench normalization report under `.instructions/reports`

---

## Sprint 05 — Governance Tenant Console Deepening

### Objectives

- make Governance the reference implementation for tenant-aware module UX
- clarify Axodus Root constitutional authority versus selected tenant local governance
- separate Constitutional Governance, Local Governance, User Participation and Operations/ACS Review
- make proposal state, readiness state and ACS review state visually distinct
- keep governance execution disabled, read-only, preview or simulation

### Deliverables

- Governance console composition layer
- Governance context header
- Axodus Root vs selected tenant authority split
- Constitutional Governance section
- Local Governance section
- Tenant Governance Identity panel
- Proposal State Summary
- Governance Readiness panel
- ACS Review State panel
- User Participation panel
- Governance Tenant Console deepening report under `.instructions/reports`

---

## REQUEST 02 — AxodusAPP Test Stabilization Sprint

### Objectives

- recover frontend validation after TenantProvider, Governance smoke and WalletConnect/Vitest failures
- keep AxodusAPP as a frontend integration shell
- preserve meaningful test coverage without enabling execution
- prepare the app for the next real-data Governance integration sprint

### Deliverables

- shared test render helper with TenantProvider support
- Academy, Marketplace and Business tests wrapped in realistic tenant context
- deterministic Governance smoke selectors
- test-only WalletConnect logger stabilization
- direct layout imports where modules do not need AppShell/wallet runtime
- passing `npm run build`
- passing `npm test`
- test stabilization report under `.instructions/reports`

---

## REQUEST 17 - AxodusAPP Governance Read-Only Integration Planning

### Objectives

- plan the first AxodusAPP consumption path for the approved Governance read-only backend foundation
- keep AxodusAPP as an integration shell, not a Governance source of truth
- map backend read models to frontend routes and display-only components
- define tenant mapping, sensitivity policy, freshness display and local mock strategy
- gate REQUEST 18 before any implementation begins

### Deliverables

- planning report under `.instructions/reports`
- existing Governance routes, hooks, mocks and tenant runtime inventoried
- read model consumption map for proposal list, proposal detail, timeline, decisions, emergency actions and tenant summary
- frontend-local mock adapter/provider strategy
- forbidden mutation, wallet, backend HTTP and execution boundaries documented
- REQUEST 18 implementation gate documented

---

## REQUEST 18 - AxodusAPP Governance Read-Only Mock Integration Implementation

### Objectives

- implement only the frontend-local/mock/read-only Governance integration planned in REQUEST 17
- adapt the existing Governance module rather than introducing a disconnected parallel module
- expose read-model-shaped local fixtures through a read-only provider/hook layer
- render tenant-scoped proposal and governance state with explicit mock/read-only labels
- prove no backend fetch, wallet writer, transaction adapter, mutation or execution path is invoked

### Deliverables

- frontend-local Governance read-only mock adapter
- read-model-shaped mock fixtures
- read-only provider/hooks bound to `TenantProvider`
- display-only read model panels and freshness states
- focused Vitest/RTL coverage
- no backend HTTP integration, API routes, DB adapters, migrations, wallet signing or execution

---

## REQUEST 19 - Governance Backend Read-Only API Boundary Planning

### Objectives

- plan a safe backend HTTP read-model API boundary before AxodusAPP leaves local mock mode
- keep AxodusAPP on the local `MockGovernanceReadOnlyAdapter` until backend contracts and routes receive later gates

### Status

COMPLETE - PLAN MODE ONLY

REQUEST 19 planned backend read-only `GET /api/governance/v1/tenants/:tenantId/*` candidates, response envelopes, tenant/auth context, sensitivity policy, stale/fresh handling and future AxodusAPP `HttpGovernanceReadOnlyAdapter` migration. No AxodusAPP HTTP client was implemented.

### Next Step

REQUEST 20 - Governance Read-Only API Contract Types Implementation. AxodusAPP should continue using the local mock adapter until backend contract types and a later HTTP route/client gate are approved.

## REQUEST 20 - Governance Read-Only API Contract Types

### Status

COMPLETE - BACKEND CONTRACTS ONLY

Governance backend now exposes static TypeScript contract exports for future read-only API transport: endpoint constants, GET-only metadata, forbidden endpoint guards, query/path types, response envelopes, error/status mapping and pure helpers. AxodusAPP still does not consume these contracts through HTTP.

### Next Step

REQUEST 21 - Governance Read-Only API Transport Boundary Planning.

## REQUEST 21 - Governance Read-Only API Transport Boundary Planning

### Status

COMPLETE - PLAN MODE ONLY

Governance backend transport boundary is planned, but not implemented. The plan keeps future HTTP transport as a thin read-only Koa layer over `GovernanceReadModelQueryService`, with initial GET-only surfaces limited to tenant summary, proposal list, proposal detail, proposal timeline, decision history and emergency actions. Audit trail and actor activity remain restricted/deferred.

AxodusAPP remains on local mock fixtures and `MockGovernanceReadOnlyAdapter`. No `HttpGovernanceReadOnlyAdapter`, backend fetch, wallet signing, treasury execution or on-chain write is implemented.

### Next Step

REQUEST 22 - Governance Read-Only API Transport Contract Test Planning. AxodusAPP remains out of scope until backend route registry tests, forbidden endpoint assertions, context extraction tests and serialization tests are planned and later implemented.

### Deliverables

- Governance transport boundary planning report
- future GET-only transport endpoint list
- restricted/deferred audit and actor endpoint policy
- forbidden mutation/action route guard strategy
- AxodusAPP HTTP client gate kept separate
- REQUEST 22 test-planning gate for backend transport

## REQUEST 22 - Governance Read-Only API Transport Contract Test Planning

Status: COMPLETE - PLAN MODE ONLY

Governance backend transport contract test strategy is planned in the Governance workspace. The selected next path is backend-only pure/static route registry contract tests before any HTTP transport implementation.

AxodusAPP remains on local fixtures and `MockGovernanceReadOnlyAdapter`. No `HttpGovernanceReadOnlyAdapter`, backend fetch, wallet signing, treasury execution or on-chain write is implemented.

Next safe step:

REQUEST 23 - Governance Read-Only API Transport Contract Test Harness Implementation. This is backend-only and should not change AxodusAPP source or introduce real backend client behavior.

---

## Phase 1 — App Foundation

### Objectives

- establish frontend architecture
- create app shell
- configure routing
- configure wallet connection
- create module registry
- create design system foundation
- create protected routes

### Deliverables

- Vite React TypeScript app
- App shell
- public layout
- authenticated layout
- sidebar navigation
- topbar
- wallet connection
- route registry
- module registry
- base dashboard

---

## Phase 2 — Governance Integration

### Objectives

- integrate Governance as the first operational module
- display DAOs
- display proposals
- display governance state
- display execution status

### Deliverables

- Governance dashboard
- DAO selector
- proposal list
- proposal detail
- execution receipts
- governance API client

---

## Phase 3 — Treasury and Defi Visibility

### Objectives

- integrate Defi treasury overview
- show allocations
- show vaults
- show staking routes
- show financial summaries

### Deliverables

- Treasury dashboard
- Vault cards
- Allocation tables
- Staking overview
- Reporting UI

---

## Phase 4 — ACS Console

### Objectives

- create agent visibility interface
- display execution logs
- display workflows
- display telemetry

### Deliverables

- ACS dashboard
- Agent list
- Workflow monitor
- Execution logs
- Provider status

---

## Phase 5 — Marketplace and Academy

### Objectives

- enable ecosystem discovery
- enable educational onboarding
- enable product browsing

### Deliverables

- Marketplace home
- Product catalog
- Academy home
- Course list
- User learning profile

---

## Phase 6 — Dex, Trading, Mining

### Objectives

- expose liquidity tools
- expose trading visibility
- expose mining allocations

### Deliverables

- Swap interface
- Liquidity overview
- Trading dashboard
- Strategy pages
- Mining dashboard
- Provider pages

---

## Phase 7 — Lottery and BBA

### Objectives

- expose campaign participation
- expose reward transparency
- expose communication/growth systems

### Deliverables

- Lottery campaign UI
- Draw history
- Randomness proof page
- BBA strategic agency home
- BBA services explorer
- BBA campaign dashboard
- BBA portfolio showcase
- BBA DAO partnership view
- BBA governance validation
- Embedded ACS workflow and institutional reporting panels

---

## Phase 8 — Unified Operating Console

### Objectives

- unify all modules into one operational interface
- improve cross-module workflows
- add analytics
- improve user personalization
- support enterprise users

### Deliverables

- global search
- notification center
- cross-module activity feed
- unified reporting
- DAO operator console
- enterprise portal

---

## AXAPP-REQ-01 - Portfolio Registry Consumer Layer

### Objectives

- establish AxodusAPP as the first read-only consumer of global portfolio registry artifacts;
- keep portfolio consumption local/static and deterministic;
- expose L-level, D-level, blockers, opportunities, dependencies, ownership and authority summaries without UI dashboards;
- preserve no-execution, no-wallet, no-production and no-mutation boundaries.

### Deliverables

- portfolio types under `src/features/portfolio/types.ts`;
- local static portfolio fixture under `src/features/portfolio/portfolioRegistry.fixture.ts`;
- source adapter under `src/features/portfolio/portfolioSourceAdapter.ts`;
- read-only service under `src/features/portfolio/portfolioRegistryService.ts`;
- boundary guards under `src/features/portfolio/portfolioBoundaries.ts`;
- focused consumer-layer tests under `tests/portfolio/portfolioRegistryService.test.ts`;
- implementation report under `.instructions/reports/AXAPP_REQ_01_PORTFOLIO_REGISTRY_CONSUMER_LAYER.md`.

### Deferred

- Portfolio overview dashboard;
- nucleus detail views;
- dependency graph viewer;
- opportunity registry viewer;
- formal Business-to-AxodusAPP consumer contract in AXAPP-REQ-07.

---

## AXAPP-REQ-02 - Portfolio Overview Dashboard

### Objectives

- create the first user-facing portfolio control center in AxodusAPP;
- consume only the AXAPP-REQ-01 portfolio registry service;
- show portfolio metrics, L-level distribution, D-level distribution and boundary status;
- keep the dashboard read-only with no execution, wallet, treasury, trading, settlement, payout or production behavior.

### Deliverables

- `PortfolioOverviewDashboard` under `src/features/portfolio/components`;
- reusable `PortfolioMetricCard`;
- `PortfolioMaturityDistribution`;
- `PortfolioBoundaryNotice`;
- `/portfolio` page and route;
- app shell navigation entry for Portfolio;
- focused dashboard tests under `tests/portfolio/PortfolioOverviewDashboard.test.tsx`;
- implementation report under `.instructions/reports/AXAPP_REQ_02_PORTFOLIO_OVERVIEW_DASHBOARD.md`.

### Deferred

- nucleus detail views;
- dependency graph viewer;
- opportunity registry viewer;
- authority dashboard;
- formal Business-to-AxodusAPP consumer contract in AXAPP-REQ-07.

---

## AXAPP-REQ-03 - Nucleus Detail View

### Objectives

- add a read-only detail page for each Axodus nucleus;
- consume only the portfolio registry service created in AXAPP-REQ-01;
- expose status, maturity, readiness, ownership, blockers, dependencies, opportunities and authority;
- keep the view free of execution, approval, trading, swap, settlement, withdrawal, signing, deployment, payment and provisioning behavior.

### Deliverables

- `NucleusDetailView` under `src/features/portfolio/pages`;
- `NucleusSummaryCard` under `src/features/portfolio/components`;
- `/portfolio/:nucleusId` route integration;
- detail links from the portfolio maturity distribution;
- focused tests under `tests/portfolio/NucleusDetailView.test.tsx`;
- implementation report under `.instructions/reports/AXAPP_REQ_03_NUCLEUS_DETAIL_VIEW.md`.

### Deferred

- dependency graph viewer;
- opportunity registry viewer;
- authority dashboard;
- formal Business-to-AxodusAPP consumer contract in AXAPP-REQ-07.

---

## AXAPP-REQ-04 - Dependency Graph Viewer

### Objectives

- create a read-only dependency exploration page for the Axodus portfolio;
- consume only the portfolio registry service created in AXAPP-REQ-01;
- expose official dependency count, representative dependency records, critical chains, burden and hub signals;
- keep the graph visualization-only with no integration execution, dependency resolution, API enablement, workflow triggering, authority grant or registry mutation.

### Deliverables

- `DependencyGraphView` under `src/features/portfolio/pages`;
- `DependencyGraph` under `src/features/portfolio/components`;
- `/portfolio/dependencies` route integration before `/portfolio/:nucleusId`;
- Portfolio navigation entry for Dependencies;
- focused tests under `tests/portfolio/DependencyGraphView.test.tsx`;
- implementation report under `.instructions/reports/AXAPP_REQ_04_DEPENDENCY_GRAPH_VIEWER.md`.

### Deferred

- opportunity registry viewer;
- authority dashboard;
- full graph data expansion beyond the current representative service records;
- formal Business-to-AxodusAPP consumer contract in AXAPP-REQ-07.

---

## AXAPP-REQ-05 - Opportunity Registry Viewer

### Objectives

- create a read-only opportunity registry viewer for official Axodus portfolio opportunities;
- consume only the portfolio registry service created in AXAPP-REQ-01;
- expose opportunity product intelligence with owner, readiness, evidence, risk, dependency and boundary context;
- provide safe client-side filtering without server/API requirements;
- keep the viewer free of approvals, promotion actions, workflow execution, registry mutation and authority grants.

### Deliverables

- `OpportunityRegistryView` under `src/features/portfolio/pages`;
- `OpportunityRegistry` under `src/features/portfolio/components`;
- `/portfolio/opportunities` route integration before `/portfolio/:nucleusId`;
- Portfolio navigation entry for Opportunities;
- focused tests under `tests/portfolio/OpportunityRegistryView.test.tsx`;
- implementation report under `.instructions/reports/AXAPP_REQ_05_OPPORTUNITY_REGISTRY_VIEWER.md`.

### Deferred

- boundary and authority dashboard;
- richer opportunity detail routes;
- full dependency expansion beyond current representative service records;
- formal Business-to-AxodusAPP consumer contract in AXAPP-REQ-07.

---

## AXAPP-REQ-06 - Boundary & Authority Dashboard

### Objectives

- create a read-only visual dashboard for ecosystem authority and boundary status;
- consume only the portfolio registry service created in AXAPP-REQ-01;
- answer who owns, who approves, who executes, what remains blocked and what remains gated;
- expose blocked action and boundary conflict summaries without resolving blockers;
- keep the dashboard free of authority grants, governance execution, treasury execution, production authority, registry mutation and workflow execution.

### Deliverables

- `AuthorityDashboardView` under `src/features/portfolio/pages`;
- `AuthorityDashboard` under `src/features/portfolio/components`;
- `/portfolio/authority` route integration before `/portfolio/:nucleusId`;
- Portfolio navigation entry for Authority;
- focused tests under `tests/portfolio/AuthorityDashboardView.test.tsx`;
- implementation report under `.instructions/reports/AXAPP_REQ_06_BOUNDARY_AUTHORITY_DASHBOARD.md`.

### Deferred

- Business-to-AxodusAPP consumer contract;
- full blocked action registry data expansion beyond current official summary counts;
- full boundary conflict registry data expansion beyond current official summary counts;
- any authority-changing workflow.

---

## AXAPP-REQ-07 - Business to AxodusAPP Consumer Contract

### Objectives

- formalize Business as the producer of portfolio intelligence and AxodusAPP as the read-only consumer;
- define consumer contract read models using existing portfolio registry types;
- validate read-only, execution-disabled, production-disabled and authority-disabled guarantees;
- define manual snapshot refresh policy without polling, backend sync, API integration or production credentials;
- document product-facing architecture boundaries for future portfolio transport work.

### Deliverables

- `businessPortfolioContract` under `src/features/portfolio/contracts`;
- `businessPortfolioContractValidator` under `src/features/portfolio/contracts`;
- `businessPortfolioRefreshPolicy` under `src/features/portfolio/contracts`;
- contract exports from `src/features/portfolio/index.ts`;
- product architecture document under `docs/architecture/business-axodusapp-consumer-contract.md`;
- focused tests under `tests/portfolio/businessPortfolioContract.test.ts`;
- implementation report under `.instructions/reports/AXAPP_REQ_07_BUSINESS_AXODUSAPP_CONSUMER_CONTRACT.md`.

### Deferred

- AXAPP-REQ-08 Integration Readiness Assessment;
- any live/API transport;
- polling or synchronization;
- production credentials;
- mutation, execution, wallet, treasury, trading, settlement, payout, provisioning or on-chain behavior.

---

## AXAPP-REQ-08 - Integration Readiness Assessment and Portfolio Handoff

### Status

COMPLETE - AUDIT/HANDOFF ONLY

### Outcome

`PROMOTE_TO_L4_CONSOLIDATED`

### Scope

- audited AXAPP-REQ-01 through AXAPP-REQ-07;
- confirmed portfolio intelligence hub deliverables;
- confirmed validation evidence;
- confirmed boundaries remain preserved;
- created integration readiness, handoff and maturity assessment artifacts.

### Next Portfolio Cycle

Recommended:

- Marketplace L4 Consolidation

Rationale:

- Marketplace remains L4 Candidate with payment, settlement, minting, wallet and treasury blockers;
- AxodusAPP now has enough portfolio intelligence visibility to support a focused Marketplace consolidation cycle without enabling execution.
