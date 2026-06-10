# AXAPP Portfolio Consumer Layer

Status: ESTABLISHED

Date: 2026-06-10

## Purpose

Provide AxodusAPP with typed, deterministic, read-only access to portfolio registry artifacts.

The layer answers portfolio status, L-level, D-level, blockers, opportunities, dependencies, ownership and execution-authority questions without implementing dashboards, APIs, wallet behavior or production integrations.

## Source Model

Source artifacts are the local portfolio documents under `/opt/Axodus/.instructions`.

Important boundary:

- `/opt/Axodus` is not a Git repository;
- global portfolio source artifacts are local/unversioned;
- the AxodusAPP fixture is a static consumer snapshot, not a live source of truth.

## Product Files

- `src/features/portfolio/types.ts`
- `src/features/portfolio/portfolioRegistry.fixture.ts`
- `src/features/portfolio/portfolioSourceAdapter.ts`
- `src/features/portfolio/portfolioRegistryService.ts`
- `src/features/portfolio/portfolioBoundaries.ts`
- `src/features/portfolio/index.ts`

## Read-Only Service Methods

- `getPortfolioSnapshot()`
- `getNuclei()`
- `getNucleusById(id)`
- `getBlockers()`
- `getOpportunities()`
- `getDependencies()`
- `getExecutionAuthority()`

Forbidden mutation/execution method families remain absent:

- create
- update
- delete
- execute
- approve
- settle
- pay
- trade
- swap
- sign
- submit
- deploy
- mint
- withdraw

## Fixture Coverage

- 14 nuclei;
- Business as `L4 Consolidated`;
- AxodusAPP as `L4 Readiness` and `D3`;
- 25 official opportunity count;
- 58 official dependency count;
- 26 blocked action count;
- 14 boundary conflict count;
- execution authorized: false;
- production ready: false;
- mutation enabled: false.

## Boundary Guards

- `assertPortfolioReadOnly(snapshot)`
- `assertNoExecutionAuthority(snapshot)`
- `assertNoProductionReadiness(snapshot)`
- `assertPortfolioBoundaryGuards(snapshot)`

These guards fail closed if mutation, execution authority or production readiness is enabled.

## Deferred Scope

- Portfolio Overview Dashboard;
- nucleus detail views;
- dependency graph viewer;
- opportunity registry viewer;
- AXAPP-REQ-07 Business-to-AxodusAPP consumer contract formalization.
