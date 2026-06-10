# AXAPP-REQ-04 - Dependency Graph Viewer

Status: IMPLEMENTED / VALIDATED

Workspace: `/opt/Axodus/AxodusAPP`

## Purpose

AXAPP-REQ-04 creates the first read-only dependency exploration view for the Axodus portfolio.

The viewer converts CROSS-REQ-02 dependency intelligence into an AxodusAPP presentation layer without executing integrations, resolving dependencies, mutating registry data or enabling production behavior.

## Product Surface

- `src/features/portfolio/pages/DependencyGraphView.tsx`
- `src/features/portfolio/components/DependencyGraph.tsx`
- route: `/portfolio/dependencies`
- Portfolio app-shell section: Dependencies
- test: `tests/portfolio/DependencyGraphView.test.tsx`

## Service Consumption

The page consumes the AXAPP-REQ-01 Portfolio Registry Consumer Layer:

- `getPortfolioSnapshot()`
- `getDependencies()`
- `getNuclei()`

The relationship matrix is service-backed. It uses the representative dependency records currently exposed by the consumer layer and the official dependency count in the snapshot summary.

## Displayed Views

- official 58 dependency summary;
- 33 nucleus-level dependency count;
- 25 opportunity-level dependency count;
- source nucleus;
- target nucleus;
- dependency type;
- severity;
- blocking status;
- critical chain viewer;
- LOW, MEDIUM, HIGH and CRITICAL dependency burden per nucleus;
- ecosystem hub view for Core, Governance, Business, Defi and AxodusAPP.

## Critical Chains

The viewer displays the required CROSS-REQ-02 high-risk chains:

- Vault.Country -> Defi -> Governance/Core
- Trading Credential Vault -> Trading -> Governance -> Defi -> ACS
- Marketplace Settlement -> Marketplace -> Defi -> Governance -> AxodusAPP
- Dex.Country -> Dex -> Defi -> Governance -> AxodusAPP

These chains are visualization-only. They do not resolve dependencies or change readiness state.

## Boundary Statement

This viewer is read-only and visualization-only.

It does not:

- create integrations;
- execute dependencies;
- enable APIs;
- trigger workflows;
- grant authority;
- modify registry data;
- resolve blockers;
- enable wallet signing;
- enable treasury, trading, settlement, payout, provisioning or on-chain behavior;
- claim production readiness.

## Validation Plan

Required local validation:

- `pnpm exec vitest run tests/portfolio/DependencyGraphView.test.tsx`
- `pnpm exec vitest run tests/portfolio/NucleusDetailView.test.tsx`
- `pnpm exec vitest run tests/portfolio/PortfolioOverviewDashboard.test.tsx`
- `pnpm exec vitest run tests/portfolio/portfolioRegistryService.test.ts`
- `pnpm run typecheck`
- `pnpm run lint`
- `pnpm run build`

## Assessment

`AXAPP_DEPENDENCY_GRAPH_VIEWER_ESTABLISHED`
