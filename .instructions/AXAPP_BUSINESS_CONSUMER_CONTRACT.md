# AXAPP-REQ-07 - Business to AxodusAPP Consumer Contract

Status: IMPLEMENTED / VALIDATED

## Scope

AXAPP-REQ-07 formalizes the read-only consumer contract between Business and AxodusAPP.

Business remains the portfolio intelligence producer. AxodusAPP remains the read-only consumer and presentation surface.

## Product Artifacts

- `src/features/portfolio/contracts/businessPortfolioContract.ts`
- `src/features/portfolio/contracts/businessPortfolioContractValidator.ts`
- `src/features/portfolio/contracts/businessPortfolioRefreshPolicy.ts`
- `src/features/portfolio/contracts/index.ts`
- `docs/architecture/business-axodusapp-consumer-contract.md`
- `tests/portfolio/businessPortfolioContract.test.ts`

## Contract Read Models

- `PortfolioRegistrySnapshot`
- `PortfolioNucleusRecord`
- `PortfolioOpportunityRecord`
- `PortfolioDependencyRecord`
- `PortfolioAuthorityRecord`

These models reuse the existing AXAPP-REQ-01 portfolio types.

## Refresh Policy

Refresh mode: `manual-snapshot-refresh`

Current model:

- local static portfolio snapshot;
- explicit repository change for refresh;
- no runtime polling;
- no backend synchronization;
- no production credentials.

Future API readiness remains a separate request and is not implemented here.

## Boundary Guarantees

- read-only only;
- execution disabled;
- production disabled;
- authority disabled;
- mutation disabled;
- API integration disabled;
- runtime synchronization disabled.

## Prohibited Scope

AXAPP-REQ-07 does not create:

- APIs;
- sync services;
- polling;
- backend integrations;
- mutation flows;
- execution authority;
- production behavior;
- wallet signing;
- treasury, trading, settlement, payout, provisioning or on-chain execution.

## Validation

- `pnpm exec vitest run tests/portfolio/businessPortfolioContract.test.ts`
- `pnpm exec vitest run tests/portfolio/portfolioRegistryService.test.ts`
- `pnpm run typecheck`
- `pnpm run lint`
- `pnpm run build`

## Assessment

- `AXAPP_BUSINESS_CONSUMER_CONTRACT_ESTABLISHED`
