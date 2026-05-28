# AxodusAPP Status

Last updated: 2026-05-27

Current phase: Tenant Context Runtime Phase

## Deployment Gate

- Sprint 00A is focused on Vercel build recovery and deterministic deploy validation.
- Sprint 00B adds semantic UI scope separation before visual polish.
- Sprint 00C inventories routes, cards, panels, data sources, mixed scopes and duplication before app shell normalization.
- Sprint 01 introduces the shared app shell, grouped navigation, page shell primitives and card shell foundation.
- Sprint 02 introduces a frontend selected tenant runtime with mock tenant accounts and UI binding.
- UI normalization is not complete and remains deferred until scope semantics and the production build gate are stable.
- Business runtime imports must resolve inside AxodusAPP for Vercel-compatible isolated builds.

## Current Build Position

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
