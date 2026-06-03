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

REQUEST 21 - Governance Read-Only API Transport Boundary Planning. AxodusAPP remains on local mock fixtures until a later backend transport and frontend HTTP adapter gate is approved.
- define route/controller/query-service contracts without implementing production execution
- define tenant scoping, sensitivity filtering, stale data behavior and authorization requirements
- plan how AxodusAPP will later swap its local mock adapter for a backend read-only client
- keep mutation, wallet signing, treasury execution and on-chain writes disabled

### Deliverables

- backend API boundary planning report
- allowed read-only endpoint list
- forbidden mutation/action endpoint list
- AxodusAPP client migration strategy
- authorization/sensitivity checklist
- validation and implementation gates for the first backend read-only API sprint

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
