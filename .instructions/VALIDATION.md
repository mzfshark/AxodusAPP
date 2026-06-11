# AxodusAPP Validation

Last updated: 2026-06-10

## AXAPP-REQ-01 Portfolio Registry Consumer Layer

Validation status: PASS_WITH_EXISTING_WARNINGS

Commands:

| Command | Result | Notes |
|---|---|---|
| `pnpm exec vitest run tests/portfolio/portfolioRegistryService.test.ts` | PASS | 1 test file, 7 tests passed. |
| `pnpm run typecheck` | PASS | No TypeScript errors. |
| `pnpm run lint` | PASS_WITH_WARNING | Existing Fast Refresh warning in `src/modules/acs/components/AcsUi.jsx`. |
| `pnpm run build` | PASS_WITH_WARNINGS | Existing large chunk and plugin timing warnings from Vite/Rolldown output. |

Validation boundaries:

- no dependencies installed;
- no package files changed;
- no live API calls;
- no wallet, treasury, trading, settlement, payout, ACS provisioning or on-chain behavior validated because none was implemented.

## AXAPP-REQ-02 Portfolio Overview Dashboard

Validation status: PASS_WITH_EXISTING_WARNINGS

Commands:

| Command | Result | Notes |
|---|---|---|
| `pnpm exec vitest run tests/portfolio/PortfolioOverviewDashboard.test.tsx` | PASS | 1 test file, 4 tests passed. |
| `pnpm exec vitest run tests/portfolio/portfolioRegistryService.test.ts` | PASS | 1 test file, 7 tests passed. |
| `pnpm run typecheck` | PASS | No TypeScript errors. |
| `pnpm run lint` | PASS_WITH_WARNING | Existing Fast Refresh warning in `src/modules/acs/components/AcsUi.jsx`. |
| `pnpm run build` | PASS_WITH_WARNINGS | Existing large chunk and plugin timing warnings from Vite/Rolldown output. |

Validation boundaries:

- no dependencies installed;
- no package files changed;
- dashboard consumes only the portfolio registry service;
- no live API, wallet, treasury, trading, settlement, payout, ACS provisioning or on-chain behavior is implemented.

## AXAPP-REQ-03 Nucleus Detail View

Validation status: PASS_WITH_EXISTING_WARNINGS

Commands:

| Command | Result | Notes |
|---|---|---|
| `pnpm exec vitest run tests/portfolio/NucleusDetailView.test.tsx` | PASS | 1 test file, 4 tests passed. |
| `pnpm exec vitest run tests/portfolio/PortfolioOverviewDashboard.test.tsx` | PASS | 1 test file, 4 tests passed. |
| `pnpm exec vitest run tests/portfolio/portfolioRegistryService.test.ts` | PASS | 1 test file, 7 tests passed. |
| `pnpm run typecheck` | PASS | No TypeScript errors. |
| `pnpm run lint` | PASS_WITH_WARNING | Existing Fast Refresh warning in `src/modules/acs/components/AcsUi.jsx`. |
| `pnpm run build` | PASS_WITH_WARNINGS | Existing large chunk and plugin timing warnings from Vite/Rolldown output. |

Validation boundaries:

- no dependencies installed;
- no package files changed;
- detail view consumes only the portfolio registry service;
- no live API, wallet, treasury, trading, settlement, payout, provisioning or on-chain behavior is implemented.

## AXAPP-REQ-04 Dependency Graph Viewer

Validation status: PASS_WITH_EXISTING_WARNINGS

Commands:

| Command | Result | Notes |
|---|---|---|
| `pnpm exec vitest run tests/portfolio/DependencyGraphView.test.tsx` | PASS | 1 test file, 4 tests passed. |
| `pnpm exec vitest run tests/portfolio/NucleusDetailView.test.tsx` | PASS | 1 test file, 4 tests passed. |
| `pnpm exec vitest run tests/portfolio/PortfolioOverviewDashboard.test.tsx` | PASS | 1 test file, 4 tests passed. |
| `pnpm exec vitest run tests/portfolio/portfolioRegistryService.test.ts` | PASS | 1 test file, 7 tests passed. |
| `pnpm run typecheck` | PASS | No TypeScript errors. |
| `pnpm run lint` | PASS_WITH_WARNING | Existing Fast Refresh warning in `src/modules/acs/components/AcsUi.jsx`. |
| `pnpm run build` | PASS_WITH_WARNINGS | Existing large chunk and plugin timing warnings from Vite/Rolldown output. |

Validation boundaries:

- no dependencies installed;
- no package files changed;
- graph viewer consumes only the portfolio registry service and static CROSS-REQ-02 chain labels already represented in portfolio instructions;
- no live API, dependency resolution, workflow trigger, authority grant, registry mutation, wallet, treasury, trading, settlement, payout, provisioning or on-chain behavior is implemented.

## AXAPP-REQ-05 Opportunity Registry Viewer

Validation status: PASS_WITH_EXISTING_WARNINGS

Commands:

| Command | Result | Notes |
|---|---|---|
| `pnpm exec vitest run tests/portfolio/OpportunityRegistryView.test.tsx` | PASS | 1 test file, 4 tests passed. |
| `pnpm exec vitest run tests/portfolio/DependencyGraphView.test.tsx` | PASS | 1 test file, 4 tests passed. |
| `pnpm exec vitest run tests/portfolio/NucleusDetailView.test.tsx` | PASS | 1 test file, 4 tests passed. |
| `pnpm exec vitest run tests/portfolio/PortfolioOverviewDashboard.test.tsx` | PASS | 1 test file, 4 tests passed. |
| `pnpm exec vitest run tests/portfolio/portfolioRegistryService.test.ts` | PASS | 1 test file, 7 tests passed. |
| `pnpm run typecheck` | PASS | No TypeScript errors. |
| `pnpm run lint` | PASS_WITH_WARNING | Existing Fast Refresh warning in `src/modules/acs/components/AcsUi.jsx`. |
| `pnpm run build` | PASS_WITH_WARNINGS | Existing large chunk and plugin timing warnings from Vite/Rolldown output. |

Validation boundaries:

- no dependencies installed;
- no package files changed;
- opportunity registry viewer consumes only the portfolio registry service;
- no approval, promotion, workflow execution, live API, authority grant, registry mutation, wallet, treasury, trading, settlement, payout, provisioning or on-chain behavior is implemented.

## AXAPP-REQ-06 Boundary & Authority Dashboard

Validation status: PASS_WITH_EXISTING_WARNINGS

Commands:

| Command | Result | Notes |
|---|---|---|
| `pnpm exec vitest run tests/portfolio/AuthorityDashboardView.test.tsx` | PASS | 1 test file, 4 tests passed. |
| `pnpm exec vitest run tests/portfolio/OpportunityRegistryView.test.tsx` | PASS | 1 test file, 4 tests passed. |
| `pnpm exec vitest run tests/portfolio/DependencyGraphView.test.tsx` | PASS | 1 test file, 4 tests passed. |
| `pnpm exec vitest run tests/portfolio/NucleusDetailView.test.tsx` | PASS | 1 test file, 4 tests passed. |
| `pnpm exec vitest run tests/portfolio/PortfolioOverviewDashboard.test.tsx` | PASS | 1 test file, 4 tests passed. |
| `pnpm exec vitest run tests/portfolio/portfolioRegistryService.test.ts` | PASS | 1 test file, 7 tests passed. |
| `pnpm run typecheck` | PASS | No TypeScript errors. |
| `pnpm run lint` | PASS_WITH_WARNING | Existing Fast Refresh warning in `src/modules/acs/components/AcsUi.jsx`. |
| `pnpm run build` | PASS_WITH_WARNINGS | Existing large chunk and plugin timing warnings from Vite/Rolldown output. |

Validation boundaries:

- no dependencies installed;
- no package files changed;
- authority dashboard consumes only the portfolio registry service and official summary counts;
- no governance execution, treasury execution, production authority, authority grant, registry mutation, workflow execution, wallet, trading, settlement, payout, provisioning or on-chain behavior is implemented.

## AXAPP-REQ-07 Business to AxodusAPP Consumer Contract

Validation status: PASS_WITH_EXISTING_WARNINGS

Commands:

| Command | Result | Notes |
|---|---|---|
| `pnpm exec vitest run tests/portfolio/businessPortfolioContract.test.ts` | PASS | 1 test file, 5 tests passed. |
| `pnpm exec vitest run tests/portfolio/portfolioRegistryService.test.ts` | PASS | 1 test file, 7 tests passed. |
| `pnpm run typecheck` | PASS | No TypeScript errors. |
| `pnpm run lint` | PASS_WITH_WARNING | Existing Fast Refresh warning in `src/modules/acs/components/AcsUi.jsx`. |
| `pnpm run build` | PASS_WITH_WARNINGS | Existing large chunk and plugin timing warnings from Vite/Rolldown output. |

Validation boundaries:

- no dependencies installed;
- no package files changed;
- contract reuses existing portfolio registry types and service-backed snapshot;
- no API, sync service, polling, backend integration, mutation flow, execution authority, production behavior, wallet signing, treasury movement, trading, settlement, payout, provisioning or on-chain behavior is implemented.

## AXAPP-REQ-08 Integration Readiness Assessment and Portfolio Handoff

Validation status: PASS_WITH_EXISTING_WARNINGS

Commands:

| Command | Result | Notes |
|---|---|---|
| `pnpm exec vitest run tests/portfolio/portfolioRegistryService.test.ts tests/portfolio/PortfolioOverviewDashboard.test.tsx tests/portfolio/NucleusDetailView.test.tsx tests/portfolio/DependencyGraphView.test.tsx tests/portfolio/OpportunityRegistryView.test.tsx tests/portfolio/AuthorityDashboardView.test.tsx tests/portfolio/businessPortfolioContract.test.ts` | PASS | 7 test files, 32 tests passed. |
| `pnpm run typecheck` | PASS | No TypeScript errors. |
| `pnpm run lint` | PASS_WITH_WARNING | Existing Fast Refresh warning in `src/modules/acs/components/AcsUi.jsx`. |
| `pnpm run build` | PASS_WITH_WARNINGS | Existing large chunk and plugin timing warnings from Vite/Rolldown output. |

Validation boundaries:

- no dependencies installed;
- no package files changed;
- audit-only documentation updates;
- no product features added;
- no API, provider, integration, wallet functionality, governance execution, treasury movement, trading, swap, settlement, payout, ACS provisioning, production credential or production readiness behavior implemented.
