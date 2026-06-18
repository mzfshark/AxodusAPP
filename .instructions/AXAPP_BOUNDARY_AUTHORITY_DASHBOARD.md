# AXAPP-REQ-06 - Boundary & Authority Dashboard

Status: IMPLEMENTED / VALIDATED

Workspace: `/opt/Axodus/AxodusAPP`

## Purpose

AXAPP-REQ-06 creates the first read-only Authority & Boundary Dashboard for the Axodus ecosystem.

The dashboard answers who owns, who approves, who executes, what remains blocked and what remains gated without granting authority or executing any action.

## Product Surface

- `src/features/portfolio/pages/AuthorityDashboardView.tsx`
- `src/features/portfolio/components/AuthorityDashboard.tsx`
- route: `/portfolio/authority`
- Portfolio app-shell section: Authority
- test: `tests/portfolio/AuthorityDashboardView.test.tsx`

## Service Consumption

The page consumes the AXAPP-REQ-01 Portfolio Registry Consumer Layer:

- `getPortfolioSnapshot()`
- `getExecutionAuthority()`
- `getNuclei()`

## Displayed Views

- ecosystem authority summary;
- execution authority matrix;
- blocked action registry summary;
- boundary conflict viewer;
- prominent no-authority boundary notice.

## Authority Summary

The dashboard displays:

- Execution Authorized: 0
- Production Authorized: 0
- Treasury Authorized: 0

These values are derived from the portfolio registry service and authority records.

## Boundary Statement

This dashboard is read-only and visibility-only.

It does not:

- grant authority;
- execute governance;
- execute treasury actions;
- authorize production;
- resolve blockers;
- mutate registry data;
- trigger workflows;
- enable wallet signing;
- enable trading, settlement, payout, provisioning or on-chain behavior.

## Validation Plan

Required local validation:

- `pnpm exec vitest run tests/portfolio/AuthorityDashboardView.test.tsx`
- `pnpm exec vitest run tests/portfolio/OpportunityRegistryView.test.tsx`
- `pnpm exec vitest run tests/portfolio/DependencyGraphView.test.tsx`
- `pnpm exec vitest run tests/portfolio/NucleusDetailView.test.tsx`
- `pnpm exec vitest run tests/portfolio/PortfolioOverviewDashboard.test.tsx`
- `pnpm exec vitest run tests/portfolio/portfolioRegistryService.test.ts`
- `pnpm run typecheck`
- `pnpm run lint`
- `pnpm run build`

## Assessment

`AXAPP_BOUNDARY_AUTHORITY_DASHBOARD_ESTABLISHED`
