# UI Duplication Report

Date: 2026-05-27

Sprint: 00C — UI Route & Card Inventory

## Summary

Several nuclei have independently evolved their own card, panel, badge, table, page header and empty-state patterns. This is expected during MVP development but should be normalized after the route/card inventory is stable.

## Duplicate Patterns

| Duplicated pattern | Locations | Differences | Shared component candidate | Recommendation |
| --- | --- | --- | --- | --- |
| Metric cards | `GovernanceCards`, `BusinessSummaryCards`, `MarketplaceMetricCard`, `AcademyMetricCard`, `Mining MetricCard`, `AcsMetric`, `BbaMetricCard` | Different typography, icon placement, detail density, status treatments | `AxodusMetricCard` | Create shared metric shell with module theme hooks. |
| Page headers | `MarketplacePageHeader`, `AcademyHeader`, `MiningHeader`, `AcsPageShell`, `BusinessPageShell`, `BbaPageHeader`, raw headers in `Overview`/`Settings`/`Mcps` | Different eyebrow/title/description/action layout | `AxodusPageHeader` | Normalize in Sprint 01. |
| Panel shells | `BusinessPanel`, `AcademyPanel`, `AcsPanel`, `Mining Panel`, marketplace local `Panel`, raw rounded containers | Similar border/background with inconsistent padding and title hierarchy | `AxodusPanel` | Merge after scope metadata adoption. |
| Status badges | `AcsBadge`, `MarketplaceBadge`, `AcademyBadge`, `Mining Badge/RiskBadge/GovernanceBadge`, `BusinessStatusBadge`, `BbaBadge`, governance pills | Different tone names and color semantics | `AxodusBadge` with tone map | Normalize semantic tones: info, success, warning, blocked, policy, mock. |
| Risk badges | Governance reason severity, BusinessRiskBadge, MiningRiskBadge, Marketplace risk state, BBA risk tones | Different labels and colors for similar risk concepts | `RiskBadge` | Use shared risk severity taxonomy. |
| Readiness cards/pipelines | Business workflow readiness, ACS readiness, Academy PoK readiness, Marketplace publisher readiness, Mining integration readiness | Same readiness idea rendered differently | `ReadinessPanel` and `ReadinessChecklist` | Extract once operator workflows stabilize. |
| Warning/policy panels | ACS notices, governance guardrails, Defi risk notices, Marketplace blockers, Business security validators, Mining risk warnings | Inconsistent urgency and placement | `PolicyNoticePanel` | Required before sensitive finance/action routes mature. |
| Empty states | `Mining EmptyState`, Academy local empty state, marketplace route-specific empty states, Business loading/error states | Some exist as local functions, some absent | `EmptyState`, `LoadingState`, `ErrorState` | Create shared states in app shell sprint. |
| Data tables | BusinessLifecycleTable, MarketplaceListingsTable, MiningProviderTable, raw Academy tables, raw ACS lists, lottery tables | Sorting/filtering/status columns inconsistent | `AxodusDataTable` | Defer until table requirements stabilize. |
| Lifecycle rails | MarketplaceLifecycleRail, Business lifecycle tables, Academy milestone rows, Lottery draw status rows | Different visual metaphors for lifecycle | `LifecycleRail` | Unify lifecycle state display. |
| Telemetry/event feeds | BusinessTelemetryFeed, ACS receipts/debug records, MCP terminal feed, Mining telemetry, BBA ACS workflow panel | Some read as terminal, cards, or tables | `EventTimeline` | Use for operator surfaces. |
| Scoped card wrappers | New `ScopedCard` only used on dashboard; modules use local cards | Scope metadata is not yet broadly visible | `ScopedCard` | Wrap high-risk route blocks next. |
| Module summary cards | Dashboard registry cards, ecosystem mock nuclei cards, app shell nav metadata, module-specific summaries | Duplicated route/maturity/status metadata | `ModuleSummaryCard` backed by registry | Centralize in module registry. |
| Action preview cards | Governance execution panels, Marketplace purchase modal, Business intake preview, Mining actions, DEX swap card, Lottery ticket minting | Varying disabled-state clarity | `ActionPreviewCard` | Required before enabling any guarded execution. |
| Section navigation | BBA section nav, app shell nav groups, Marketplace route links, Academy flow links | Different local route link groups | `ModuleSubnav` | Normalize after route registry extension. |

## Component Consolidation Targets

| Target component | Inputs | First adopters |
| --- | --- | --- |
| `AxodusPageHeader` | title, description, eyebrow, actions, meta badges | Marketplace, Academy, Mining, ACS, Business |
| `AxodusPanel` | title, description, actions, scope meta | BusinessPanel, AcademyPanel, AcsPanel, Mining Panel |
| `AxodusMetricCard` | label, value, detail, icon, trend, tone, scope meta | All nucleus metrics |
| `AxodusBadge` | tone, children, icon | ACS, Marketplace, Academy, Mining, Business, BBA |
| `AxodusDataTable` | columns, rows, empty state, density | Business, Marketplace, Mining, Lottery |
| `ActionPreviewCard` | action name, status, blockers, execution mode | Governance, Marketplace, Business, Mining, Lottery, DEX |
| `ReadinessPanel` | checks, next state, blockers, owner scope | ACS, Business, Academy, Marketplace |
| `EventTimeline` | events, severity, source, timestamps | Business, ACS, MCPs, Mining, BBA |

## Highest Duplication Risks

1. Metric cards: widespread and visible across almost every page.
2. Badge tone taxonomies: inconsistent semantic colors can mislead risk/governance status.
3. Action preview cards: disabled/executable boundaries are security-sensitive.
4. Page headers and panels: current layout density varies by nucleus.

