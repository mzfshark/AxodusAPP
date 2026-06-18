# UI Data Source Inventory

Date: 2026-05-27

Sprint: 00C — UI Route & Card Inventory

## Summary

AxodusAPP uses a mix of centralized mock files, module-level mock services, API clients with fallback, runtime registries and hardcoded JSX. Centralized mock usage is improving, but several legacy/static pages still embed domain data directly in components.

## Source Map

| UI block | Route | Source type | File | Risk | Recommendation |
| --- | --- | --- | --- | --- | --- |
| Ecosystem dashboard scope cards | `/` | local mock file + module registry | `src/data/mock/*`, `src/config/moduleRegistry.js` | medium | Keep; move dashboard metadata into registry later. |
| Settings cards and feature flags | `/settings` | local mock file | `src/data/mock/settings.mock.js` | low | Keep; wrap with scoped cards later. |
| Connect wallet page | `/connect` | wallet state/AppKit + wallet mock | `src/pages/ConnectWalletPage.jsx`, `src/data/mock/wallet.mock.js` | medium | Keep wallet state isolated; avoid visual AppKit loading dependence. |
| Governance overview | `/governance` | governance hooks/API fallback/mock | `src/modules/governance/api/*`, `src/data/mock/governance-tenants.mock.js` | medium | Keep; document source badges. |
| Governance console | `/governance/console` | API adapter + hook fallback + wallet state | `src/modules/governance/hooks/*`, `src/modules/governance/api/*` | high | Keep but classify panels by source and scope. |
| Governance proposal detail | `/governance/proposals/:proposalId` | API adapter + local operation history + transaction adapters | `src/modules/governance/hooks/*`, `src/modules/governance/transactions/*` | high | Keep guarded; add action source metadata. |
| Business runtime overview | `/business` | runtime registry/client, optional API | `src/modules/business/services/businessRuntimeClient.js`, `src/modules/business/runtime/*` | high | Keep read-only; expose runtime source in UI metadata. |
| Business tables/details | `/business/*` | runtime registry/client, optional API | `src/modules/business/hooks/useBusinessData.js` | medium | Keep; move repeated table metadata into adapters later. |
| Business intake | `/business/intake*` | runtime draft services/local state | `src/modules/business/pages/BusinessIntake.jsx`, `src/modules/business/runtime/business/drafts/*` | high | Keep preview-only; document hardcoded form labels. |
| Marketplace home/explore/listings | `/marketplace*` | module mock service/runtime services | `src/modules/marketplace/services/*`, `src/modules/marketplace/hooks/useMarketplaceData.js` | medium | Keep; centralize product cards. |
| Marketplace product detail | `/marketplace/products/:slug` | mock service + runtime services + modal state | `src/modules/marketplace/services/*`, `PurchasePreviewModal.jsx` | high | Keep disabled; add source/readiness metadata. |
| Marketplace protected routes | `/marketplace/orders`, `/marketplace/subscriptions`, `/marketplace/treasury`, `/marketplace/publisher` | mock service/runtime services + ProtectedRoute | `src/modules/marketplace/pages/*` | high | Keep; distinguish user vs operator data. |
| Academy routes | `/academy*` | module service/mock data | `src/modules/academy/services/academyService.js`, `src/modules/academy/hooks/useAcademyData.js` | medium | Keep; split reward doctrine from user metrics. |
| Mining routes | `/mining*` | API adapter + fallback mock | `src/modules/mining/services/miningServiceAdapter.js`, `miningFallback.js`, `useMiningData.js` | high | Keep; label API/fallback source and action-disabled state. |
| Lottery routes | `/lottery*` | module service/mock data | `src/modules/lottery/services/lotteryService.js`, `src/modules/lottery/hooks/useLotteryData.js` | high | Keep; ticket/prize surfaces need scope labels. |
| ACS routes | `/acs*` | ACS API client with mock fallback | `src/modules/acs/services/acsApi.js`, `src/modules/acs/mock/acsInspectionMock.js` | high | Keep; separate demo wallet/user data from operator data. |
| BBA routes | `/bba*` | module service/store/mock | `src/modules/bba/services/bbaService.js`, `src/modules/bba/store/bbaStore.js` | medium | Keep; clarify tenant/operator scope. |
| DEX swap/pool UI | `/dex` | hardcoded JSX | `src/pages/Dex.jsx` | high | Replace with centralized `dexMock`; hide/disable swap semantics. |
| MCP service UI | `/mcps` | local mock file plus hardcoded terminal/panel text | `src/data/mock/mcps.mock.js`, `src/pages/Mcps.jsx` | medium | Move terminal events into mock file. |
| Legacy static Mining page | not routed | local mock file + external image URLs + JSX | `src/pages/Mining.jsx` | high | Do not route; remove or archive later after module mining page is canonical. |
| Legacy static DAO page | not routed | hardcoded JSX | `src/pages/Dao.jsx` | medium | Archive later if unused. |
| Legacy static Business page | not routed | hardcoded JSX | `src/pages/Business.jsx` | medium | Archive later if unused. |

## Domain Data Embedded Directly in JSX

| File | Embedded data type | Risk | Recommendation |
| --- | --- | --- | --- |
| `src/pages/Dex.jsx` | token amounts, pool rows, swap UI labels | high | Move to `src/data/mock/dex.mock.js` or module service. |
| `src/pages/Mcps.jsx` | terminal feed/status labels mixed with mock file data | medium | Move terminal feed to `mcps.mock.js`. |
| `src/pages/Settings.jsx` | device/session examples and legacy comments | medium | Move device/session mocks to `settings.mock.js`. |
| `src/pages/Dao.jsx` | proposal cards and DAO status | medium | Archive or migrate to governance tenant mocks. |
| `src/pages/Business.jsx` | business metrics | medium | Archive or migrate to Business runtime. |
| `src/pages/Mining.jsx` | provider cards, external images, chart mock | high | Archive or migrate selected assets to Mining module mock. |
| `src/modules/academy/pages/AcademyPages.jsx` | some flow/table labels and route copy | low | Accept for now; data arrays are service-backed. |
| `src/modules/business/pages/BusinessPages.jsx` | page labels/table column definitions | low | Accept; domain records come from runtime client. |
| `src/modules/marketplace/pages/*` | local form fields/filter options | medium | Keep but centralize option sets later. |

## Source Classification by Nucleus

| Nucleus | Main source pattern | Runtime/API dependency | Mock readiness | Source risk |
| --- | --- | --- | --- | --- |
| Ecosystem/Dashboard | centralized mocks + local scope registry | none | strong | medium |
| Governance | API clients/hooks with mock fallback | optional/backend-aware | strong | high |
| Business | local runtime package + optional mock API | optional env API | strong | high |
| Marketplace | module services + runtime adapters | frontend-only currently | strong | medium |
| Academy | service/hook mock data | frontend-only | strong | medium |
| Mining | service adapter with API/fallback | optional API | strong | high |
| Lottery | service/hook mock data | frontend-only | strong | medium |
| ACS | API client with forced fallback | optional API | strong | high |
| BBA | service/store mock data | frontend-only | strong | medium |
| DEX | hardcoded static page | none | weak | high |
| MCPs | centralized mock plus JSX | none | medium | medium |

