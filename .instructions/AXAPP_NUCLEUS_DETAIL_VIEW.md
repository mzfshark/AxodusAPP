# AXAPP Nucleus Detail View

Status: ESTABLISHED

Date: 2026-06-10

## Purpose

Provide a read-only detail view for each Axodus nucleus from the Portfolio Registry Service.

The view exposes status, L-level, D-level, readiness, ownership, risk, blockers, dependencies, opportunities and authority summary without enabling execution or mutation.

## Product Files

- `src/features/portfolio/pages/NucleusDetailView.tsx`
- `src/features/portfolio/pages/index.ts`
- `src/features/portfolio/components/NucleusSummaryCard.tsx`
- `tests/portfolio/NucleusDetailView.test.tsx`

Updated integration files:

- `src/features/portfolio/components/PortfolioMaturityDistribution.tsx`
- `src/features/portfolio/components/index.ts`
- `src/features/portfolio/index.ts`
- `src/routes.jsx`
- `src/config/appShell.js`

## Supported Nuclei

- Core
- Governance
- Documentation
- Dex
- Defi
- AxodusAPP
- Business
- Marketplace
- Academy
- Mining
- ACS
- Trading
- BBA-Agency
- Lottery

## Service Usage

The route parameter is resolved against service-returned nuclei, then the page calls:

- `getNucleusById(id)`
- `getPortfolioSnapshot()`
- `getBlockers()`
- `getDependencies()`
- `getOpportunities()`

## Sections

- Nucleus Summary
- Blockers And Risk Areas
- Dependencies
- Opportunities
- Ownership And Authority

## Boundary Confirmation

- read-only only;
- execution disabled;
- production disabled;
- no mutation methods;
- no wallet/signing;
- no treasury/trading/settlement/payout/provisioning behavior.

## Deferred Scope

- Dependency graph viewer;
- opportunity registry viewer;
- authority dashboard;
- formal Business-to-AxodusAPP consumer contract in AXAPP-REQ-07.
