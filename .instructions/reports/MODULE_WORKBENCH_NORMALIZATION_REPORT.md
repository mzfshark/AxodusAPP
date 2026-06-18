# Module Workbench Normalization Report

Last updated: 2026-05-27

## Sprint

Sprint 04 — Module Workbench Normalization

## Objective

Normalize high-priority module pages into auditable workbenches that separate Protocol, User, Tenant and Operations information while preserving existing MVP content and execution boundaries.

## Modules Inspected

| Module | Routes inspected | Result |
| --- | --- | --- |
| Governance | `/governance/console` | Normalized with scoped workbench summary sections. |
| Business | `/business` | Normalized with scoped workbench summary sections. |
| Marketplace | `/marketplace` | Inspected through prior scope/tenant adoption; deferred for deeper module pass. |
| Academy | `/academy` | Inspected through prior scope/tenant adoption; registry metadata extended for tenant-aware future workbench. |
| Trading | legacy trading routes | Deferred. No real trading execution or CEX API handling was introduced. |

## Modules Normalized

### Governance

Updated `src/modules/governance/pages/GovernanceDashboard.jsx`.

Applied structure:

- Protocol: constitutional layer, chain registry and global guardrails.
- Tenant: selected DAO tenant, tenant proposals and readiness.
- User: wallet eligibility and tenant role.
- Operations: executor readiness and required approvals.

Added composition file:

- `src/modules/governance/governanceWorkbenchModel.js`

The Governance console now starts with explicit workbench sections before rendering the deeper existing DAO tenant operations, executor, proposal, guardrail and registry panels.

### Business

Updated `src/modules/business/pages/BusinessPages.jsx`.

Applied structure:

- Protocol: Business nucleus purpose, runtime capabilities and safety validators.
- Tenant: selected tenant, registry relationships and workflow readiness.
- User: selected tenant role and assigned review visibility.
- Operations: blocked workflows, runtime events and risk visibility.

Added composition file:

- `src/modules/business/businessWorkbenchModel.js`

Business remains a tenant/company workbench and does not expose finance, treasury, debenture, ACS provisioning or backend execution.

## Shared Components Reused

- `PageShell`
- `SectionShell`
- `ContentGrid`
- `CardShell`
- `ScopeBadge`
- `TenantIdentityPanel`

Added shared workbench helper:

- `src/components/workbench/WorkbenchSummarySection.jsx`
- `src/components/workbench/index.js`

## Registry Updates

Updated module metadata in:

- `src/config/moduleRegistry.js`
- `src/runtime/moduleRegistry/moduleRegistry.js`

Changes:

- Governance supports protocol, user, tenant and operator scopes.
- Business supports protocol, user, tenant and operator scopes.
- Academy is marked tenant-aware for future instructor/company course workbench normalization.
- Tenant-aware module registry now exposes execution mode and operator surface availability.

## Cards Moved, Split or Wrapped

No existing domain cards were removed.

New scoped summary cards were added above existing content to clarify ownership:

- protocol summary cards;
- tenant workspace cards;
- user context cards;
- operator/readiness cards.

Existing detailed panels remain in place for review continuity.

## Hardcoded Data Still Present

The following areas still contain local JSX-level data or layout-specific structures and should be normalized in later passes:

- Governance detailed tenant metrics and readiness panels.
- Business summary card array augmentation in `BusinessOverview`.
- Marketplace buyer/seller/operator separation.
- Academy protocol reward/user progress/tenant instructor separation.
- Trading legacy surfaces, if retained.

## Remaining UI Risks

- Governance console still has many detailed panels below the new workbench summaries and may need section consolidation in a later sprint.
- Business subroutes still use the local `BusinessPageShell`/`BusinessPanel` pattern.
- Marketplace and Academy have tenant context visibility but not full workbench composition layers yet.
- Material Symbols remain in some legacy detailed panels and should be replaced during visual cleanup.

## Execution Safety

No real execution was introduced.

No blockchain, treasury, marketplace, minting, trading, debenture or ACS provisioning action was enabled.

All new workbench cards are read-only, preview, simulation or executable-disabled.

## Validation

Commands executed:

- `pnpm lint` — passed with one existing warning in `src/modules/acs/components/AcsUi.jsx` for `react-refresh/only-export-components`.
- `pnpm run build` — passed. Vite reported large chunk warnings and plugin timing warnings, but no build errors.

## Next Recommended Module Order

1. Marketplace workbench normalization.
2. Academy workbench normalization.
3. Defi read-only workbench refinement.
4. DEX/Lottery/Mining mock-first workbench passes.
5. Trading cleanup only after legacy execution surfaces are fully isolated.
