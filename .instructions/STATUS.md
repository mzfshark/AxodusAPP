# AxodusAPP Status

Last updated: 2026-06-02

Current phase: Governance Read-Only Mock Integration Implemented / Integration Shell Phase

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
