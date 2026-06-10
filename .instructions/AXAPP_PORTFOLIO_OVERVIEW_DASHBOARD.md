# AXAPP Portfolio Overview Dashboard

Status: ESTABLISHED

Date: 2026-06-10

## Purpose

Provide the first user-facing, read-only Portfolio Control Center in AxodusAPP.

The dashboard consumes the AXAPP-REQ-01 Portfolio Registry Consumer Layer and shows high-level ecosystem status without enabling execution, mutation, wallet behavior or production integrations.

## Product Files

- `src/features/portfolio/components/PortfolioOverviewDashboard.tsx`
- `src/features/portfolio/components/PortfolioMetricCard.tsx`
- `src/features/portfolio/components/PortfolioMaturityDistribution.tsx`
- `src/features/portfolio/components/PortfolioBoundaryNotice.tsx`
- `src/features/portfolio/components/index.ts`
- `src/pages/PortfolioOverview.jsx`
- `tests/portfolio/PortfolioOverviewDashboard.test.tsx`

Updated integration files:

- `src/features/portfolio/index.ts`
- `src/routes.jsx`
- `src/config/appShell.js`

## Service Methods Used

- `getPortfolioSnapshot()`
- `getNuclei()`
- `getNucleusById(id)`
- `getOpportunities()`
- `getDependencies()`
- `getExecutionAuthority()`

## Metrics Displayed

- Total nuclei;
- official opportunity count;
- official dependency count;
- blocked action count;
- boundary conflict count;
- execution authorized: Disabled;
- production ready: Disabled.

## Distribution Views

- L-level distribution;
- D-level distribution.

Both views are calculated from service-returned nucleus records.

## Route Integration

Route:

- `/portfolio`

App shell:

- `Portfolio` navigation entry in the Protocol group.

## Boundary Notice

The dashboard explicitly states:

- dashboard is read-only;
- no execution authority is granted;
- no production readiness is claimed;
- no treasury, wallet, trading, settlement, payout, DEX execution or on-chain actions are enabled.

## Deferred Scope

- Nucleus detail views;
- dependency graph viewer;
- opportunity registry viewer;
- authority dashboard;
- formal Business-to-AxodusAPP consumer contract in AXAPP-REQ-07.
