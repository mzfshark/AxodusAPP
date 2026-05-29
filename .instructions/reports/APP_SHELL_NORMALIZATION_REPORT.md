# App Shell Normalization Report

Date: 2026-05-27

Sprint: 01 — App Shell Normalization

## Summary

Sprint 01 introduced a shared AxodusAPP shell foundation without redesigning every module. The app now has reusable layout primitives for the global shell, page shell, page header, section shell, content grids and card shell. Sidebar navigation is grouped by the information-architecture model from Sprint 00B/00C: Protocol, User, Tenant and Operations.

## Files Added

- `src/components/layout/AppShell.jsx`
- `src/components/layout/PageShell.jsx`
- `src/components/layout/PageHeader.jsx`
- `src/components/layout/SectionShell.jsx`
- `src/components/layout/ContentGrid.jsx`
- `src/components/layout/index.js`
- `src/components/ui/CardShell.jsx`
- `src/components/ui/index.js`

## Files Updated

- `src/layouts/Layout.jsx`
- `src/components/Sidebar.jsx`
- `src/components/Header.jsx`
- `src/config/appShell.js`
- `src/styles/Global.css`
- `src/pages/Overview.jsx`
- `.instructions/STATUS.md`
- `.instructions/TASKS.md`
- `.instructions/ROADMAP.md`

## Normalized

### Global App Shell

- `Layout.jsx` now delegates the global frame to `AppShell`.
- `AppShell` owns header, sidebar, main content area and footer placement.
- The shell exposes `data-shell-scope`, `data-nucleus` and `data-nucleus-tone` for future audit/theming.

### Sidebar

- Primary navigation is grouped into:
  - Protocol
  - User
  - Tenant
  - Operations
- No fake routes were introduced.
- Existing nucleus-specific navigation remains intact.

### Header

- Header now shows module context plus lightweight runtime indicators:
  - scope badge
  - maturity
  - read-only mode
- Hardcoded `$NEURONS` balance was removed from the global header to avoid mixing user/financial data into every route.

### Page and Section Structure

- Added `PageShell`, `PageHeader`, `SectionShell` and `ContentGrid`.
- Dashboard/Overview now uses `PageShell` and shared grid/card primitives for the first route-level normalization pass.
- Existing `ScopeSection`/`ScopedCard` remains compatible and can be migrated gradually.

### Card Shell

- Added `CardShell` with:
  - title
  - subtitle
  - scope badge
  - maturity
  - execution mode
  - status
  - actions/footer slots
- Applied to the dashboard entry cards and module registry cards.

### Responsive Baseline

- Added shared responsive rules for page shell, section shell, card shell and content grids.
- Mobile grid fallback now collapses multi-column layout to one column.
- Header runtime indicators hide on smaller screens to preserve wallet/header usability.

## Still Chaotic / Deferred

- Most module-specific page shells still use local components:
  - `BusinessPageShell`
  - `AcademyHeader`
  - `MarketplacePageHeader`
  - `MiningHeader`
  - `AcsPageShell`
  - BBA local headers/cards
- Most module metric cards still use local card components.
- High-risk pages still need scoped card migration:
  - Defi
  - DEX
  - Mining
  - Lottery
  - ACS
  - Marketplace product detail
  - Governance proposal detail
- Table normalization is deferred.
- Full mobile navigation QA is deferred to a browser smoke pass.

## Safety Notes

- No route was removed or renamed.
- No backend/domain logic was moved into AxodusAPP.
- No blockchain, treasury, trading, minting or governance execution was introduced.
- Financial/action-like surfaces remain read-only, preview, simulation or executable-disabled.

## Validation

- `pnpm lint` passed with one pre-existing Fast Refresh warning in `src/modules/acs/components/AcsUi.jsx`.
- `pnpm run build` passed.
- Build still reports large chunk warnings from Vite/Rolldown; this is not new and should be handled in a later performance/code-splitting sprint.

## Recommended Next Work

1. Migrate module page headers to `PageHeader`/`PageShell`.
2. Migrate module panels to a shared `AxodusPanel` or extend `CardShell`.
3. Apply `CardShell` or `ScopedCard` to high-risk Defi, DEX, Mining, Lottery and ACS blocks.
4. Create a route metadata registry so `appShell.js`, route inventory and sidebar grouping stay aligned.
5. Add browser smoke tests for desktop and mobile shell layout.
