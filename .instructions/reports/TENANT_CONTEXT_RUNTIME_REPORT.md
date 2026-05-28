# Tenant Context Runtime Report

Date: 2026-05-27

Sprint: 02 — Tenant Context Runtime

## Summary

Sprint 02 introduced a frontend-only tenant context runtime so AxodusAPP can visibly represent Sub-DAOs, companies, agencies, products and sandbox workspaces as tenant accounts. This is not backend tenancy. It is a mock-first UI/runtime layer that makes the selected tenant available to the app shell and high-priority module pages.

## Files Added

- `src/types/tenant.ts`
- `src/data/mock/tenants.js`
- `src/runtime/tenantContext/TenantContext.jsx`
- `src/runtime/tenantContext/TenantContextValue.js`
- `src/runtime/tenantContext/useTenantContext.js`
- `src/runtime/tenantContext/tenantRegistry.js`
- `src/runtime/tenantContext/index.js`
- `src/runtime/moduleRegistry/moduleRegistry.js`
- `src/components/tenant/TenantSelector.jsx`
- `src/components/tenant/TenantIdentityPanel.jsx`
- `src/components/tenant/index.js`

## Files Updated

- `src/main.jsx`
- `src/components/Header.jsx`
- `src/styles/Global.css`
- `src/data/mock/index.js`
- `src/pages/Overview.jsx`
- `src/modules/governance/pages/GovernanceDashboard.jsx`
- `src/modules/business/pages/BusinessPages.jsx`
- `src/modules/marketplace/pages/MarketplaceHome.jsx`
- `src/modules/academy/pages/AcademyPages.jsx`
- `.instructions/STATUS.md`
- `.instructions/TASKS.md`
- `.instructions/ROADMAP.md`

## Runtime Model

The tenant model includes:

- tenant id
- display name
- slug
- tenant type
- governance status
- federation tier
- primary chain
- enabled modules
- disabled modules
- roles
- permissions
- maturity
- risk state
- ACS state
- treasury mode
- execution mode
- restrictions
- created/updated metadata

Mock tenant registry includes:

- Axodus Root Protocol
- BBA Agency Workspace
- Governance Labs Sub-DAO
- Sandbox Product Lab
- Restricted Market Review

## Provider Behavior

`TenantProvider` supports:

- listing available tenants
- selected tenant
- tenant switching
- default/root tenant fallback
- lookup by id or slug
- module enabled checks
- governance risk checks
- ACS restriction checks
- localStorage persistence of the selected tenant id

No sensitive data is stored. The stored value is only a mock tenant id.

## UI Binding

Tenant context is visible in:

- global header via `TenantSelector`
- dashboard via `TenantIdentityPanel`
- Governance Console via `TenantIdentityPanel`
- Business Runtime via `TenantIdentityPanel`
- Marketplace home via `TenantIdentityPanel`
- Academy home via `TenantIdentityPanel`

The selected tenant panel shows:

- tenant name
- type
- federation tier
- governance status
- enabled modules
- roles
- execution mode
- ACS state
- treasury mode
- restrictions

## Module Registry

`src/runtime/moduleRegistry/moduleRegistry.js` extends existing module metadata with:

- tenant awareness
- tenant requirement
- scope support
- governance state requirement
- ACS state requirement
- allowed tenant types

This creates the frontend foundation for future route guards, scoped dashboards and tenant-aware module cards.

## Safety Notes

- No backend tenancy was implemented.
- No real tenant accounts were created.
- No treasury, governance, marketplace, trading, lottery or contract execution was introduced.
- Tenant switching is frontend/mock-only.
- Tenant restrictions are displayed but do not execute enforcement beyond UI state helpers.
- Public protocol views remain accessible without wallet.

## Validation

- `pnpm lint` passed with one pre-existing Fast Refresh warning in `src/modules/acs/components/AcsUi.jsx`.
- `pnpm run build` passed.
- Build still reports large chunk warnings from Vite/Rolldown; this remains a future performance/code-splitting concern.

## Limitations

- Tenant context does not yet drive route-level access control.
- Module pages still mostly use their local data sources.
- Governance Console has its own selected DAO context; Sprint 02 only surfaces the global selected tenant alongside it.
- The selected tenant is not yet mapped to Governance tenant ids.
- Tenant-compatible action states are visible but not enforced across every module.

## Next Steps

1. Map global tenant ids to Governance DAO tenant ids.
2. Add tenant-aware route metadata and optional route badges.
3. Apply tenant module state to Defi, Mining, Lottery, DEX and ACS pages.
4. Use tenant context in Marketplace product detail and Business subroutes.
5. Add tests for `TenantProvider`, module enabled checks and fallback behavior.
