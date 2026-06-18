# UI Refactor Backlog

Date: 2026-05-27

Sprint: 00C — UI Route & Card Inventory

## P0 — Build / Navigation Blocking

- Keep `src/modules/business/runtime/index.ts` and runtime files inside AxodusAPP or otherwise make `@axodus/business-runtime` resolvable in isolated Vercel builds.
- Remove or clearly archive legacy static page files that are not routed after Sprint 01 confirms they are unused.
- Audit route aliases that map to unexpected pages:
  - `/account` renders BusinessOverview.
  - `/dao` renders GovernanceDashboard.
  - `/business/identity`, `/business/permissions`, `/business/capabilities` all render BusinessAccess.
  - `/marketplace/create` and `/marketplace/sell` render the same preview page.
- Add route metadata registry so navigation, route inventory and page shell do not drift.
- Keep `pnpm run build` as mandatory gate before UI normalization commits.

## P1 — Scope Confusion

- Split dashboard ownership into stable lanes: Protocol Overview, My Axodus, Tenant Console, Operations.
- Add scope wrappers to high-risk Defi, DEX, Mining, Lottery and ACS pages.
- Move user-specific Marketplace order/subscription/access cards into My Axodus or clearly label them as user scope.
- Move Business review queues, runtime debug, state-machine and telemetry into an operator grouping.
- Separate Governance console into Tenant State, Protocol Guardrails, My Participation and Operator Controls.
- Separate Academy reward doctrine and contract compatibility from learner progress.
- Separate ACS tenant services, demo wallet readiness and operator debug/status pages.
- Ensure all financial/action-like cards expose `executionMode: executable-disabled` or equivalent visible wording.

## P2 — Component Duplication

- Create `AxodusPageHeader` and replace local page headers.
- Create `AxodusPanel` and migrate BusinessPanel, AcademyPanel, AcsPanel, Mining Panel and marketplace local panels.
- Create `AxodusMetricCard` and migrate all nucleus metric cards.
- Create `AxodusBadge` with shared semantic tones.
- Create `ActionPreviewCard` for disabled/preview execution surfaces.
- Create `ReadinessPanel` for Business, ACS, Academy, Marketplace and Mining readiness views.
- Create `EventTimeline` for Business telemetry, ACS receipts/debug, MCP terminal feed, Mining telemetry and BBA workflows.
- Create `ModuleSubnav` for repeated nucleus-specific navigation.
- Create `AxodusDataTable` after table column/empty state requirements stabilize.

## P3 — Visual Consistency

- Normalize page max-width and content density.
- Normalize card border/background levels and spacing.
- Reduce oversized headings inside dense operational panels.
- Standardize badge colors for status, risk, policy, blocked, mock and success.
- Standardize table row density and mobile behavior.
- Remove remaining Material Symbols/text-icon fallbacks if present.
- Replace hardcoded external image URLs in legacy static pages before routing them.
- Normalize dark/light theme token usage after shell components are consolidated.

## Future: Developer UI Audit Mode

Goal: add a non-production developer/audit mode that can reveal metadata for every major UI block without changing user-facing UX.

Suggested metadata:

- scope
- module
- route
- maturity
- data source
- execution mode
- wallet awareness
- tenant awareness
- governance awareness
- ACS awareness
- source file/component
- last audited sprint

Suggested implementation:

1. Add a feature flag: `VITE_AXODUS_UI_AUDIT_MODE=true`.
2. Extend `ScopedCard` and future `AxodusPanel` to render a small metadata drawer only when audit mode is enabled.
3. Add `data-axodus-scope`, `data-axodus-module`, `data-axodus-maturity` attributes to audited blocks.
4. Add a route-level audit summary component for internal review builds.
5. Do not expose audit metadata in production unless intentionally enabled.

## Sprint 01 Input

Sprint 01 — App Shell Normalization should use these reports as source of truth:

- `UI_ROUTE_INVENTORY.md`
- `UI_CARD_INVENTORY.md`
- `UI_MIXED_SCOPE_REPORT.md`
- `UI_DUPLICATION_REPORT.md`
- `UI_DATA_SOURCE_INVENTORY.md`

Recommended Sprint 01 order:

1. Page shell and route metadata registry.
2. Sidebar grouping by Protocol, My Axodus, Tenant Console, Operations.
3. Shared page header and panel shell.
4. Shared metric card and badge taxonomy.
5. High-risk action-disabled visual standard.

