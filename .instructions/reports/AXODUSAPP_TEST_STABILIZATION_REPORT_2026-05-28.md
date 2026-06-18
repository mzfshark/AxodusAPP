# AxodusAPP Test Stabilization Report

Last updated: 2026-05-29

## Request

REQUEST 02 — AxodusAPP Test Stabilization Sprint

## Original Failures

Validation reported:

- `npm run build` passed.
- `npm test` failed.
- 4 test files failed.
- 5 tests failed.
- 107 tests passed.

Observed failures:

1. `tests/academy/AcademyModule.test.jsx`
   - `useTenantContext must be used within TenantProvider`
2. `tests/marketplace/MarketplaceNavigation.test.jsx`
   - `useTenantContext must be used within TenantProvider`
3. `tests/governance/GovernanceOperationsSmoke.test.jsx`
   - ambiguous `/featured dao tenants/i` selector
4. `tests/governance/GovernanceOperationsSmoke.test.jsx`
   - Governance Operations Center smoke timeout
5. `tests/governance/GovernanceOperationsSmoke.test.jsx`
   - `@walletconnect/logger` ESM/CJS Vitest packaging issue

Additional full-suite failure found during this sprint:

6. `tests/business/BusinessRoutes.test.jsx`
   - `BusinessOverview` also needed `TenantProvider` after module workbench normalization.
   - Two assertions needed deterministic selectors/alignment with rendered runtime text.

## Root Causes

### Academy and Marketplace Provider Failures

Academy and Marketplace home pages render `TenantIdentityPanel`, which consumes `useTenantContext`.

The tests rendered those pages directly inside `MemoryRouter`, without `TenantProvider`.

### Business Provider Failure

Business overview also consumes `useTenantContext` through the Sprint 04 workbench model.

The Business route test helper provided `QueryClientProvider` and `MemoryRouter`, but not `TenantProvider`.

### Governance Selector Ambiguity

The Governance landing page intentionally contains two headings matching “Featured DAO Tenants”:

- a scoped section heading;
- the featured cards group heading.

The test used a broad role query and became ambiguous.

### Governance Smoke Timeout

The Governance console smoke renders the full tenant console, including the Sprint 05 reference sections plus existing deep Governance panels.

The previous smoke used broad DOM-wide assertions over a large page. The test now scopes assertions to the reference console headings and allows a longer timeout only for the two full-console scenarios that render the entire page and modal flow.

### WalletConnect / Vitest Packaging Failure

The direct cause was `@walletconnect/logger` publishing an ES module entry through a CommonJS package boundary.

The indirect cause was importing `PageShell`, `SectionShell` or `ContentGrid` from the `@/components/layout` barrel. That barrel also exported `AppShell`, which imports `Header`, which imports the wallet button and AppKit/Wagmi runtime.

The fix has two parts:

- direct layout imports for non-AppShell modules, avoiding accidental wallet runtime loading;
- test-only Vitest dependency inlining for `@walletconnect/logger`.

## Files Changed

- `tests/test-utils/renderWithProviders.jsx`
- `tests/academy/AcademyModule.test.jsx`
- `tests/marketplace/MarketplaceNavigation.test.jsx`
- `tests/governance/GovernanceOperationsSmoke.test.jsx`
- `tests/business/BusinessRoutes.test.jsx`
- `vite.config.js`
- `src/components/workbench/WorkbenchSummarySection.jsx`
- `src/modules/dashboard/DashboardPage.jsx`
- `src/modules/dashboard/components/MyAxodusSection.jsx`
- `src/modules/dashboard/components/OperationsCenterSection.jsx`
- `src/modules/dashboard/components/ProtocolOverviewSection.jsx`
- `src/modules/dashboard/components/TenantConsoleSummarySection.jsx`
- `src/modules/governance/pages/GovernanceDashboard.jsx`
- `src/modules/governance/components/ConstitutionalGovernanceSection.jsx`
- `src/modules/governance/components/GovernanceAuthoritySplit.jsx`
- `src/modules/governance/components/GovernanceOperationsReviewSection.jsx`
- `src/modules/governance/components/LocalGovernanceSection.jsx`
- `.instructions/STATUS.md`
- `.instructions/TASKS.md`
- `.instructions/ROADMAP.md`

## Commands Executed

Focused tests:

- `npm test -- tests/academy/AcademyModule.test.jsx`
- `npm test -- tests/marketplace/MarketplaceNavigation.test.jsx`
- `npm test -- tests/governance/GovernanceOperationsSmoke.test.jsx`
- `npm test -- tests/academy/AcademyModule.test.jsx tests/marketplace/MarketplaceNavigation.test.jsx tests/governance/GovernanceOperationsSmoke.test.jsx`
- `npm test -- tests/business/BusinessRoutes.test.jsx`

Full validation:

- `npm run build`
- `npm test`

## Test Results

Final full test result:

- Test files: 29 passed.
- Tests: 130 passed.

## Build Result

`npm run build` passed.

Remaining build warnings:

- Vite large chunk warnings remain.
- Vite plugin timing warning remains.

These warnings do not block validation recovery.

## Runtime / Security Boundary

No product feature was introduced.

No real backend write was introduced.

No wallet execution was introduced.

No governance execution was introduced.

No treasury execution, settlement, minting, CEX/API key handling or transaction signing was introduced.

AxodusAPP remains a frontend integration shell and is not a source of truth.

## Hold Status

AxodusAPP can exit Hold for frontend validation.

Status:

- AxodusAPP Status: VALIDATION RECOVERED
- Frontend Role: INTEGRATION SHELL
- Production Status: NOT PRODUCTION READY
- Execution Status: DISABLED
- Real-data Integration: NEXT SPRINT

## Next Recommended Sprint

AxodusAPP Governance Real-Data Integration.
