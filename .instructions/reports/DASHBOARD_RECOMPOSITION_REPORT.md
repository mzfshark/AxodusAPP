# Dashboard Recomposition Report

Date: 2026-05-27

Sprint: 03 — Dashboard Recomposition

## Summary

Sprint 03 recomposed the main AxodusAPP dashboard into a structured operating console organized by Protocol, User, Tenant and Operations. The dashboard is now backed by a composition layer instead of large domain datasets embedded directly in JSX.

## Files Added

- `src/modules/dashboard/DashboardPage.jsx`
- `src/modules/dashboard/dashboardComposition.js`
- `src/modules/dashboard/index.js`
- `src/modules/dashboard/components/DashboardInfoCard.jsx`
- `src/modules/dashboard/components/ProtocolOverviewSection.jsx`
- `src/modules/dashboard/components/MyAxodusSection.jsx`
- `src/modules/dashboard/components/TenantConsoleSummarySection.jsx`
- `src/modules/dashboard/components/OperationsCenterSection.jsx`
- `src/modules/dashboard/components/ModuleMaturitySummary.jsx`

## Files Updated

- `src/pages/Overview.jsx`
- `.instructions/STATUS.md`
- `.instructions/TASKS.md`
- `.instructions/ROADMAP.md`

## Dashboard Structure

### Protocol Overview

Kept on dashboard:

- protocol status
- constitutional governance status
- ACS readiness
- treasury read-only mode
- module maturity summary
- ecosystem risk/mock notices

Reason: these are global Axodus protocol signals and belong in the public dashboard entry point.

### My Axodus

Kept on dashboard:

- wallet state
- Academy progress summary
- Marketplace access/order mock summary
- disconnected wallet empty state

Reason: these are user/account signals and must be visually separated from protocol and tenant information.

### Tenant Console Summary

Kept on dashboard:

- selected tenant identity
- governance status
- federation tier
- ACS state
- treasury mode
- enabled modules
- tenant restrictions

Reason: selected tenant context is now a first-class runtime concept and must be visible from the front door.

### Operations Center

Kept on dashboard:

- ACS pending reviews
- blocked actions/readiness warnings
- modules needing review
- safe navigation actions: View details, Review, Open console, Inspect

Reason: operational/readiness state belongs on the dashboard, but only as non-executable operator visibility.

## Cards Moved or De-Emphasized

- Raw module registry cards were replaced by `ModuleMaturitySummary`.
- Detailed DAO tenant preview was moved out of the dashboard and remains in Governance tenant routes.
- Business runtime details remain in `/business` and `/business/review-queue`.
- Marketplace listing tables remain in `/marketplace`.
- Academy course tables and reward details remain in Academy routes.
- Governance proposal/action details remain in `/governance/console` and proposal detail routes.

## Cards Deferred

- Defi vault and allocation cards: should remain in `/defi` until finance-specific scope wrappers are added.
- Mining provider/vault/action cards: should remain in Mining routes due to financial/action-sensitive language.
- Lottery draw/ticket cards: should remain in Lottery routes until ticket minting disabled states are normalized.
- DEX swap/pool cards: should be replaced with centralized DEX mock data before dashboard inclusion.
- ACS debug/raw policy cards: should remain in ACS operator routes.

## Remaining Dashboard Debt

- User permissions are still mock-derived and not connected to a real wallet permission model.
- Voting activity is not yet composed into My Axodus.
- Tenant id is not yet mapped to Governance DAO tenant ids.
- Module health is registry-based and not yet driven by real runtime health checks.
- Build/deploy status is documented, but not surfaced as a live dashboard card.
- Dashboard has no visual browser smoke screenshots yet.

## Safety Notes

- No execution buttons were added.
- No blockchain, treasury, minting, trade, deployment or governance execution was introduced.
- Dashboard actions are navigation-only.
- Protocol overview remains public and does not require wallet connection.

## Validation

- `pnpm lint` passed with the pre-existing ACS Fast Refresh warning.
- `pnpm run build` passed.
- Large chunk warnings remain unchanged as a future performance/code-splitting concern.
