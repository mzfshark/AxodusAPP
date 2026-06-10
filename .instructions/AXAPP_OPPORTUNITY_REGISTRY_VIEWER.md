# AXAPP-REQ-05 - Opportunity Registry Viewer

Status: IMPLEMENTED / VALIDATED

Workspace: `/opt/Axodus/AxodusAPP`

## Purpose

AXAPP-REQ-05 creates a read-only Opportunity Registry Viewer for official Axodus portfolio opportunities.

The viewer exposes opportunity product intelligence without approvals, promotion actions, workflow execution, authority grants, registry mutation or production behavior.

## Product Surface

- `src/features/portfolio/pages/OpportunityRegistryView.tsx`
- `src/features/portfolio/components/OpportunityRegistry.tsx`
- route: `/portfolio/opportunities`
- Portfolio app-shell section: Opportunities
- test: `tests/portfolio/OpportunityRegistryView.test.tsx`

## Service Consumption

The page consumes the AXAPP-REQ-01 Portfolio Registry Consumer Layer:

- `getPortfolioSnapshot()`
- `getOpportunities()`
- `getDependencies()`
- `getNuclei()`

The registry table is backed by `getOpportunities()`. Evidence quality is derived from each owning nucleus returned by the service.

## Displayed Views

- official 25 opportunity summary;
- HIGH and MEDIUM evidence counts;
- HIGH and CRITICAL risk counts;
- opportunity name;
- owning nucleus;
- readiness;
- evidence quality;
- risk classification;
- dependency count;
- current status;
- selected opportunity detail panel;
- no approval, no promotion and no execution authority notice.

## Filters

Filtering is local/client-side only:

- by nucleus;
- by readiness;
- by risk;
- by evidence quality.

No server request, API call, registry mutation or workflow is triggered by filters.

## Boundary Statement

This viewer is read-only and visibility-only.

It does not:

- approve opportunities;
- promote opportunities;
- execute workflows;
- grant authority;
- modify registry data;
- resolve blockers;
- enable wallet signing;
- enable treasury, trading, settlement, payout, provisioning or on-chain behavior;
- claim production readiness.

## Validation Plan

Required local validation:

- `pnpm exec vitest run tests/portfolio/OpportunityRegistryView.test.tsx`
- `pnpm exec vitest run tests/portfolio/DependencyGraphView.test.tsx`
- `pnpm exec vitest run tests/portfolio/NucleusDetailView.test.tsx`
- `pnpm exec vitest run tests/portfolio/PortfolioOverviewDashboard.test.tsx`
- `pnpm exec vitest run tests/portfolio/portfolioRegistryService.test.ts`
- `pnpm run typecheck`
- `pnpm run lint`
- `pnpm run build`

## Assessment

`AXAPP_OPPORTUNITY_REGISTRY_VIEWER_ESTABLISHED`
