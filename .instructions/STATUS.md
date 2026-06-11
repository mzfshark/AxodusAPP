# AxodusAPP Status

Last updated: 2026-06-10

Current phase: AxodusAPP Portfolio Integration Expansion / Portfolio Intelligence L4 Consolidated

## Deployment Gate

- Sprint 00A is focused on Vercel build recovery and deterministic deploy validation.
- Sprint 00B adds semantic UI scope separation before visual polish.
- Sprint 00C inventories routes, cards, panels, data sources, mixed scopes and duplication before app shell normalization.
- Sprint 01 introduces the shared app shell, grouped navigation, page shell primitives and card shell foundation.
- Sprint 02 introduces a frontend selected tenant runtime with mock tenant accounts and UI binding.
- Sprint 03 recomposes the dashboard into Protocol, User, Tenant and Operations sections with a separate composition layer.
- Sprint 04 starts normalizing module pages into scoped workbenches, beginning with Governance and Business.
- Sprint 05 deepens Governance as the reference tenant-aware console pattern for Axodus Root, tenant-local governance, readiness and ACS review.
- REQUEST 02 stabilizes the frontend test suite and recovers validation after tenant context, Governance smoke and WalletConnect/Vitest failures.
- REQUEST 17 planned AxodusAPP Governance read-only consumption after the approved Governance backend read-only gate.
- REQUEST 18 implements the first AxodusAPP-local/mock/read-only Governance adapter, fixtures, provider/hooks, components and routes without backend HTTP integration or mutation authority.
- REQUEST 19 planned the future Governance backend read-only API boundary from the backend side. REQUEST 20 implemented backend static API contract types. REQUEST 21 planned the backend read-only transport boundary. REQUEST 22 planned the backend transport contract test strategy. AxodusAPP remains on local/mock/read-only fixtures and has no real Governance backend HTTP client yet.
- UI normalization is not complete and remains deferred until scope semantics and the production build gate are stable.
- Business runtime imports must resolve inside AxodusAPP for Vercel-compatible isolated builds.

## Current Build Position

- `npm run build` passes as of 2026-05-29.
- `npm test` passes as of 2026-05-29 with 29 test files and 130 tests passing.
- REQUEST 17 validation on 2026-06-02: `npm run build` passed via WSL.
- REQUEST 17 validation on 2026-06-02: `npm test -- --run` completed with 129 passing and 1 unrelated Marketplace assertion failure in `tests/marketplace/MarketplaceListingRoyaltyRuntime.test.ts`.
- REQUEST 18 focused validation: Governance read-only integration tests and Marketplace deterministic auction lifecycle tests pass.
- AxodusAPP Status: VALIDATION RECOVERED.
- Frontend Role: INTEGRATION SHELL.
- Production Status: NOT PRODUCTION READY.
- Execution Status: DISABLED.
- Real-data Integration: NEXT SPRINT.
- Local WSL build succeeds with the sibling `/Business` workspace present.
- Isolated app-only build reproduced the Vercel failure before the fix because `../Business/src/index.ts` was missing.
- The build gate is considered safe only after `pnpm run build` and `pnpm run verify:build` pass from the AxodusAPP root.

## Information Architecture Position

- Dashboard now begins separating Protocol Overview, My Axodus, Tenant Console and Operations.
- Shared scope vocabulary: protocol, user, tenant and operator.
- Initial scoped application covers Dashboard, Governance, Business, Marketplace and Academy.
- Defi, Connect, Settings, MCPs, Lottery, Mining and DEX still need deeper scoped card adoption.

## UI Audit Position

- Route inventory exists at `.instructions/reports/UI_ROUTE_INVENTORY.md`.
- Card/panel inventory exists at `.instructions/reports/UI_CARD_INVENTORY.md`.
- Mixed scope report exists at `.instructions/reports/UI_MIXED_SCOPE_REPORT.md`.
- Duplication report exists at `.instructions/reports/UI_DUPLICATION_REPORT.md`.
- Data source inventory exists at `.instructions/reports/UI_DATA_SOURCE_INVENTORY.md`.
- Sprint 01 should use `.instructions/reports/UI_REFACTOR_BACKLOG.md` as its starting backlog.

## App Shell Position

- Global layout now delegates to `src/components/layout/AppShell.jsx`.
- Shared layout primitives exist under `src/components/layout/`.
- Shared card primitive exists at `src/components/ui/CardShell.jsx`.
- Sidebar navigation is grouped by Protocol, User, Tenant and Operations.
- Header exposes lightweight scope/maturity/read-only indicators.
- Main dashboard is the first route using the normalized `PageShell` and `CardShell` pattern.
- Deeper module shell migration remains pending for Governance detail, Business subroutes, Marketplace detail, Academy subroutes, Defi, DEX, Mining, Lottery and ACS.

## Tenant Context Position

- Tenant provider exists at `src/runtime/tenantContext/TenantContext.jsx`.
- Mock tenant registry exists at `src/data/mock/tenants.js`.
- Selected tenant is visible in the global header via `TenantSelector`.
- Tenant identity panel is visible on Dashboard, Governance Console, Business, Marketplace and Academy.
- Tenant-aware module registry exists at `src/runtime/moduleRegistry/moduleRegistry.js`.
- Tenant context is frontend/mock-only and does not implement backend tenancy or real account creation.
- Next tenant work should map selected tenant ids to Governance DAO tenant ids and add route-level tenant metadata.

## Dashboard Position

- Dashboard module exists under `src/modules/dashboard`.
- Dashboard data is composed in `src/modules/dashboard/dashboardComposition.js`.
- `/` and `/dashboard` render the recomposed dashboard through `src/pages/Overview.jsx`.
- Dashboard sections are Protocol Overview, My Axodus, Tenant Console Summary and Operations Center.
- Module maturity summary is visible on the dashboard.
- Dashboard actions are navigation-only and do not execute blockchain, treasury, marketplace, lottery, trading or governance actions.

## Module Workbench Position

- Governance console now begins with explicit Protocol, Tenant, User and Operations workbench summaries.
- Business overview now begins with explicit Protocol, Tenant, User and Operations workbench summaries.
- Shared workbench summary helper exists under `src/components/workbench/`.
- Governance and Business workbench data composition is kept outside raw JSX in module-level model files.
- Marketplace, Academy, Defi, DEX, Mining, Lottery, MCPs and Trading still need deeper module-level workbench passes.
- Full UI normalization is not complete.

## Governance Tenant Console Position

- `/governance/console` now shows a dedicated Governance Context Header.
- Axodus Root constitutional authority is visually separated from selected tenant/Sub-DAO local governance.
- Constitutional Governance and Local Governance render as distinct sections.
- Tenant governance identity, proposal state summary, user participation, readiness and ACS review are explicit.
- Governance execution remains read-only, preview, simulation or executable-disabled.
- Governance is now the reference pattern for future Business, Treasury, Marketplace, Academy and Trading tenant-aware module UX.

## Governance Read-Only Integration Planning Position

- REQUEST 17 planning report exists at `.instructions/reports/AXODUSAPP_GOVERNANCE_READONLY_INTEGRATION_PLANNING_REPORT_2026-05-29.md`.
- The existing Governance module, tenant runtime and routes were inventoried for future read-only integration.
- Future REQUEST 18 should adapt the existing module with a frontend-local Governance read-only mock adapter/provider rather than creating a disconnected module.
- Future REQUEST 18 may consume local mock data shaped after Governance backend read models, but must not call backend HTTP APIs because Governance query routes/controllers are not implemented.
- Forbidden surfaces remain blocked: proposal mutation, voting, review/approval mutation, execution, wallet signing, treasury execution, on-chain writes, DB adapters, migrations and production config.

## Governance Read-Only Mock Integration Position

- REQUEST 18 implementation report exists at `.instructions/reports/AXODUSAPP_GOVERNANCE_READONLY_MOCK_INTEGRATION_IMPLEMENTATION_REPORT_2026-05-29.md`.
- Local read-model-shaped fixtures, `MockGovernanceReadOnlyAdapter`, provider/hooks, read-only components and read-only proposal pages are implemented under `src/modules/governance/readOnly`.
- `/governance` includes a read-only backend foundation panel for the selected tenant.
- `/governance/proposals` renders local mock proposal list data.
- `/governance/proposals/:proposalId` now renders a read-only proposal detail page instead of wallet/action execution panels.
- Governance backend HTTP/API integration remains not started.
- Proposal creation, voting, review actions, decision actions, execution, wallet signing, treasury execution and on-chain writes remain disabled.

## Governance Backend API Boundary Position

- REQUEST 19 planning report exists in the Governance workspace at `.instructions/reports/GOVERNANCE_BACKEND_READONLY_API_BOUNDARY_PLANNING_REPORT_2026-05-29.md`.
- Future backend candidates are read-only `GET /api/governance/v1/tenants/:tenantId/*` endpoints for tenant summary, proposals, proposal detail, timelines, decisions and emergency actions.
- REQUEST 20 backend API contract types now exist in Governance under `src/read-models/api-contracts`.
- REQUEST 21 backend transport boundary planning is complete in Governance. Transport remains unimplemented.
- Restricted audit trail and actor activity endpoints are not initial AxodusAPP consumption surfaces.
- Future AxodusAPP migration should introduce an `HttpGovernanceReadOnlyAdapter` that preserves the current read-only adapter interface.
- Current adapter remains `MockGovernanceReadOnlyAdapter`.
- No real backend client, mutation flow, wallet signing, treasury execution or on-chain write is implemented.

## Governance Backend Transport Boundary Position

- REQUEST 21 planning report exists in the Governance workspace at `.instructions/reports/GOVERNANCE_READONLY_API_TRANSPORT_BOUNDARY_PLANNING_REPORT_2026-05-29.md`.
- REQUEST 22 planning report exists in the Governance workspace at `.instructions/reports/GOVERNANCE_READONLY_API_TRANSPORT_CONTRACT_TEST_PLANNING_REPORT_2026-05-29.md`.
- REQUEST 22 selected a backend-only pure/static route registry contract test strategy for REQUEST 23.
- Future backend transport should expose only GET tenant summary, proposal list, proposal detail, proposal timeline, decision history and emergency actions after a separate implementation gate.
- Audit trail and actor activity remain restricted/deferred and are not initial AxodusAPP HTTP surfaces.
- AxodusAPP HTTP client remains blocked until backend transport contract tests are implemented and pass, backend transport is separately implemented and approved, response envelopes are stable, stale/fresh behavior is tested and CORS/dev origin policy is approved.

## Nucleus Maturity

Current Level: L4
Level Name: Visível no App
Confidence: High
Portfolio State: ADVANCE

Evidence:
- Frontend validation recovery is documented.
- App shell, tenant runtime, module routes, Governance local/mock/read-only provider, adapter, fixtures, and proposal pages exist.
- Governance surface has a mature local/mock/read-only subtrack, but the overall app has uneven module maturity.

Main Blockers:
- Real backend integration is not implemented.
- Governance HTTP client remains blocked until backend transport gates are approved and implemented.
- Wallet, settlement, treasury, marketplace minting, DEX swap, live trading, and production transaction flows remain disabled.

Next Target Level: L5

Next Recommended Work:
- Balanced read-only contract alignment across modules after portfolio allocation.

Execution Boundaries:
- Production execution: DISABLED
- Treasury execution: DISABLED
- Wallet signing: DISABLED
- On-chain writes: DISABLED

## AXAPP-REQ-01 Portfolio Registry Consumer Layer

Status: IMPLEMENTED / VALIDATED

AxodusAPP now has a product-side Portfolio Registry Consumer Layer under `src/features/portfolio`.

Scope:

- static local fixture based on `/opt/Axodus/.instructions` portfolio artifacts;
- typed read-only portfolio snapshot;
- read-only source adapter and service;
- boundary guards for read-only, no execution authority and no production readiness;
- focused Vitest coverage for the consumer contract.

Global source versioning note:

- `/opt/Axodus` is not a Git repository;
- source portfolio artifacts are local/unversioned until a portfolio documentation repository is selected.

Execution Boundaries:

- Portfolio registry consumption: READ_ONLY_ONLY
- Dashboards: NOT IMPLEMENTED
- Real API integration: NOT IMPLEMENTED
- Wallet signing: DISABLED
- Treasury/trading/settlement/payout behavior: DISABLED
- Production readiness: DISABLED

Validation:

- `pnpm exec vitest run tests/portfolio/portfolioRegistryService.test.ts`: PASS
- `pnpm run typecheck`: PASS
- `pnpm run lint`: PASS with one existing Fast Refresh warning in `src/modules/acs/components/AcsUi.jsx`
- `pnpm run build`: PASS with existing large chunk/plugin timing warnings

## AXAPP-REQ-06 Boundary & Authority Dashboard

Status: IMPLEMENTED / VALIDATED

AxodusAPP now has a read-only Authority & Boundary Dashboard at `/portfolio/authority`.

Scope:

- consumes `portfolioRegistryService.getExecutionAuthority()` and the AXAPP-REQ-01 portfolio snapshot;
- displays an execution authority matrix across 14 nuclei;
- displays authority status, execution classification, production classification and boundary classification;
- displays portfolio-wide ecosystem authority summary with zero execution, production and treasury authorization;
- displays the official 26 blocked action count grouped by governance, treasury, trading, settlement, payout, wallet and production categories;
- displays the official 14 boundary tension count grouped by ownership, execution, treasury, custody, wallet and governance categories;
- displays prominent no-authority boundary notice.

Execution Boundaries:

- Authority dashboard: VISIBILITY_ONLY
- Governance execution: DISABLED
- Treasury execution: DISABLED
- Production authority: DISABLED
- Authority grants: DISABLED
- Registry mutation: NOT IMPLEMENTED
- Workflow execution: DISABLED

Validation:

- `pnpm exec vitest run tests/portfolio/AuthorityDashboardView.test.tsx`: PASS
- `pnpm exec vitest run tests/portfolio/OpportunityRegistryView.test.tsx`: PASS
- `pnpm exec vitest run tests/portfolio/DependencyGraphView.test.tsx`: PASS
- `pnpm exec vitest run tests/portfolio/NucleusDetailView.test.tsx`: PASS
- `pnpm exec vitest run tests/portfolio/PortfolioOverviewDashboard.test.tsx`: PASS
- `pnpm exec vitest run tests/portfolio/portfolioRegistryService.test.ts`: PASS
- `pnpm run typecheck`: PASS
- `pnpm run lint`: PASS with one existing Fast Refresh warning in `src/modules/acs/components/AcsUi.jsx`
- `pnpm run build`: PASS with existing large chunk/plugin timing warnings

## AXAPP-REQ-05 Opportunity Registry Viewer

Status: IMPLEMENTED / VALIDATED

AxodusAPP now has a read-only opportunity registry viewer at `/portfolio/opportunities`.

Scope:

- consumes `portfolioRegistryService.getOpportunities()` and related read-only registry service methods;
- displays the official 25 opportunity summary from the service-backed snapshot;
- displays opportunity name, owning nucleus, readiness, evidence quality, risk classification, dependency count and current status;
- provides safe client-side filtering by nucleus, readiness, risk and evidence quality;
- displays selected opportunity detail with description, owner, dependencies, readiness, risk, authority requirements and blockers;
- displays explicit no approval, no promotion and no execution authority boundary notice.

Execution Boundaries:

- Opportunity registry viewer: VISIBILITY_ONLY
- Approval authority: DISABLED
- Promotion authority: DISABLED
- Workflow execution: DISABLED
- Real API integration: NOT IMPLEMENTED
- Registry mutation: NOT IMPLEMENTED
- Production behavior: DISABLED

Validation:

- `pnpm exec vitest run tests/portfolio/OpportunityRegistryView.test.tsx`: PASS
- `pnpm exec vitest run tests/portfolio/DependencyGraphView.test.tsx`: PASS
- `pnpm exec vitest run tests/portfolio/NucleusDetailView.test.tsx`: PASS
- `pnpm exec vitest run tests/portfolio/PortfolioOverviewDashboard.test.tsx`: PASS
- `pnpm exec vitest run tests/portfolio/portfolioRegistryService.test.ts`: PASS
- `pnpm run typecheck`: PASS
- `pnpm run lint`: PASS with one existing Fast Refresh warning in `src/modules/acs/components/AcsUi.jsx`
- `pnpm run build`: PASS with existing large chunk/plugin timing warnings

## AXAPP-REQ-04 Dependency Graph Viewer

Status: IMPLEMENTED / VALIDATED

AxodusAPP now has a read-only dependency graph viewer at `/portfolio/dependencies`.

Scope:

- consumes `portfolioRegistryService.getDependencies()` and the AXAPP-REQ-01 portfolio snapshot;
- displays the official 58 dependency summary from the service-backed snapshot;
- displays source nucleus, target nucleus, dependency type, severity and blocking status;
- displays the highest-risk critical chains from CROSS-REQ-02 as visualization-only dependency intelligence;
- displays dependency burden as LOW, MEDIUM, HIGH and CRITICAL per nucleus;
- highlights Core, Governance, Business, Defi and AxodusAPP as likely ecosystem hubs based on representative service records and critical-chain mentions.

Execution Boundaries:

- Dependency graph viewer: VISUALIZATION_ONLY
- Dependency resolution: NOT IMPLEMENTED
- Real API integration: NOT IMPLEMENTED
- Registry mutation: NOT IMPLEMENTED
- Workflow triggering: DISABLED
- Authority grants: DISABLED
- Production behavior: DISABLED

Validation:

- `pnpm exec vitest run tests/portfolio/DependencyGraphView.test.tsx`: PASS
- `pnpm exec vitest run tests/portfolio/NucleusDetailView.test.tsx`: PASS
- `pnpm exec vitest run tests/portfolio/PortfolioOverviewDashboard.test.tsx`: PASS
- `pnpm exec vitest run tests/portfolio/portfolioRegistryService.test.ts`: PASS
- `pnpm run typecheck`: PASS
- `pnpm run lint`: PASS with one existing Fast Refresh warning in `src/modules/acs/components/AcsUi.jsx`
- `pnpm run build`: PASS with existing large chunk/plugin timing warnings

## AXAPP-REQ-02 Portfolio Overview Dashboard

Status: IMPLEMENTED / VALIDATED

AxodusAPP now has a user-facing Portfolio Overview Dashboard at `/portfolio`.

Scope:

- consumes the AXAPP-REQ-01 Portfolio Registry Consumer Layer;
- displays nuclei, opportunity, dependency, blocked action and boundary conflict metrics;
- displays L-level and D-level distributions calculated from the service snapshot;
- displays Business and AxodusAPP maturity signals;
- displays explicit read-only, no execution authority and no production readiness boundary notice.

Execution Boundaries:

- Portfolio dashboard: READ_ONLY_ONLY
- Real API integration: NOT IMPLEMENTED
- Mutation methods: NOT IMPLEMENTED
- Wallet signing: DISABLED
- Treasury/trading/settlement/payout behavior: DISABLED
- Production readiness: DISABLED

Validation:

- `pnpm exec vitest run tests/portfolio/PortfolioOverviewDashboard.test.tsx`: PASS
- `pnpm exec vitest run tests/portfolio/portfolioRegistryService.test.ts`: PASS
- `pnpm run typecheck`: PASS
- `pnpm run lint`: PASS with one existing Fast Refresh warning in `src/modules/acs/components/AcsUi.jsx`
- `pnpm run build`: PASS with existing large chunk/plugin timing warnings

## AXAPP-REQ-03 Nucleus Detail View

Status: IMPLEMENTED / VALIDATED

AxodusAPP now has a read-only nucleus detail view at `/portfolio/:nucleusId`.

Scope:

- consumes the AXAPP-REQ-01 Portfolio Registry Service;
- resolves supported nucleus route ids against service-returned nuclei before calling `getNucleusById()`;
- displays status, L-level, D-level, risk, readiness and ownership;
- displays active blockers, blocked action context and risk areas;
- displays incoming/outgoing dependencies and dependency burden;
- displays official opportunities, evidence quality and readiness status;
- displays authority classification with execution and production disabled.

Execution Boundaries:

- Nucleus detail view: READ_ONLY_ONLY
- Real API integration: NOT IMPLEMENTED
- Mutation methods: NOT IMPLEMENTED
- Wallet signing: DISABLED
- Treasury/trading/settlement/payout/provisioning behavior: DISABLED
- Production readiness: DISABLED

Validation:

- `pnpm exec vitest run tests/portfolio/NucleusDetailView.test.tsx`: PASS
- `pnpm exec vitest run tests/portfolio/PortfolioOverviewDashboard.test.tsx`: PASS
- `pnpm exec vitest run tests/portfolio/portfolioRegistryService.test.ts`: PASS
- `pnpm run typecheck`: PASS
- `pnpm run lint`: PASS with one existing Fast Refresh warning in `src/modules/acs/components/AcsUi.jsx`
- `pnpm run build`: PASS with existing large chunk/plugin timing warnings

## AXAPP-REQ-07 Business to AxodusAPP Consumer Contract

Status: IMPLEMENTED / VALIDATED

AxodusAPP now has a formal read-only consumer contract for Business-produced portfolio intelligence.

Scope:

- defines Business as portfolio intelligence producer and AxodusAPP as read-only consumer;
- reuses AXAPP-REQ-01 portfolio registry types as contract read models;
- exports `PortfolioRegistrySnapshot`, `PortfolioNucleusRecord`, `PortfolioOpportunityRecord`, `PortfolioDependencyRecord` and `PortfolioAuthorityRecord` aliases;
- adds a pure validator for read-only, no-execution, no-production and no-authority guarantees;
- defines a manual snapshot refresh policy without polling, backend sync, API integration or production credentials;
- documents the contract under `docs/architecture/business-axodusapp-consumer-contract.md`.

Execution Boundaries:

- Contract type layer: READ_ONLY_ONLY
- API integration: NOT IMPLEMENTED
- Runtime polling: NOT IMPLEMENTED
- Backend synchronization: NOT IMPLEMENTED
- Mutation methods: NOT IMPLEMENTED
- Execution authority: DISABLED
- Production readiness: DISABLED
- Wallet, treasury, trading, settlement, payout, provisioning and on-chain behavior: DISABLED

Validation:

- `pnpm exec vitest run tests/portfolio/businessPortfolioContract.test.ts`: PASS
- `pnpm exec vitest run tests/portfolio/portfolioRegistryService.test.ts`: PASS
- `pnpm run typecheck`: PASS
- `pnpm run lint`: PASS with one existing Fast Refresh warning in `src/modules/acs/components/AcsUi.jsx`
- `pnpm run build`: PASS with existing large chunk/plugin timing warnings

## AXAPP-REQ-08 Integration Readiness Assessment and Portfolio Handoff

Status: COMPLETE / VALIDATED

Assessment: PROMOTE_TO_L4_CONSOLIDATED

Scope:

- audited AXAPP-REQ-01 through AXAPP-REQ-07 implementation artifacts;
- confirmed all planned portfolio integration deliverables exist;
- confirmed portfolio intelligence is consumable through AxodusAPP;
- confirmed read-only, execution-disabled and production-disabled boundaries remain preserved;
- recommended AxodusAPP as L4 Consolidated for the portfolio intelligence domain only.

Maturity Position:

- Previous portfolio intelligence level: L4 Readiness
- Recommended portfolio intelligence level: L4 Consolidated
- Production readiness: NOT CLAIMED

Validation:

- `pnpm exec vitest run tests/portfolio/portfolioRegistryService.test.ts tests/portfolio/PortfolioOverviewDashboard.test.tsx tests/portfolio/NucleusDetailView.test.tsx tests/portfolio/DependencyGraphView.test.tsx tests/portfolio/OpportunityRegistryView.test.tsx tests/portfolio/AuthorityDashboardView.test.tsx tests/portfolio/businessPortfolioContract.test.ts`: PASS
- `pnpm run typecheck`: PASS
- `pnpm run lint`: PASS with one existing Fast Refresh warning in `src/modules/acs/components/AcsUi.jsx`
- `pnpm run build`: PASS with existing large chunk/plugin timing warnings
