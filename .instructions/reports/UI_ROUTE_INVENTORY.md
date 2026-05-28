# UI Route Inventory

Date: 2026-05-27

Sprint: 00C — UI Route & Card Inventory

Source: `src/routes.jsx`

## Summary

AxodusAPP currently registers a broad SPA route surface across Dashboard, Connect, Business, Governance, Mining, Marketplace, Academy, Defi, DEX, Lottery, BBA, ACS, MCPs and Settings. The current route map is functional but uneven: some nuclei have deep MVP route families while others remain single-page placeholders.

Legend:

- Scope: `protocol`, `user`, `tenant`, `operator`, or `mixed`.
- Access: `public`, `protected`, `operator-preview`, or `admin-preview`.
- Maturity: `mock`, `prototype`, `api-ready`, `legacy-static`.

## Core Routes

| Route | Page/component file | Module | Current purpose | Expected purpose | Current scope | Expected scope | Supported scopes | Access | Wallet | Tenant | Gov | ACS | Maturity | Risk | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | `src/pages/Overview.jsx` | Ecosystem | Scope-aware landing dashboard | Protocol overview and scope index | mixed | protocol | protocol, user, tenant, operator | public | optional | optional | yes | yes | prototype | high | Now introduces scope separation; still aggregates many nuclei. |
| `/dashboard` | `src/pages/Dashboard.jsx` | Dashboard | Legacy dashboard route | Either redirect to `/` or become app dashboard | mixed | protocol | protocol, user, tenant, operator | public | optional | optional | yes | yes | legacy-static | high | Needs audit before shell normalization. |
| `/connect` | `src/pages/ConnectWalletPage.jsx` | Wallet | Wallet state/connect surface | My Axodus wallet state | user | user | user, protocol | public | yes | no | no | no | prototype | medium | Must avoid AppKit infinite loading and separate chain registry from wallet state. |
| `/account` | `src/modules/business/pages/BusinessPages.jsx` | Business | Alias to BusinessOverview | Should become My Axodus or be removed/redirected later | operator | user | user, tenant, operator | public | optional | optional | yes | yes | prototype | high | Route name conflicts with rendered Business Runtime content. |
| `/settings` | `src/pages/Settings.jsx` | Settings | App preferences and feature flags | User/app settings with mock mode visibility | mixed | user | user, protocol | public | optional | no | no | no | mock | medium | Uses centralized mock settings but contains legacy proposal-card comments. |
| `/defi` | `src/modules/defi/pages/DefiDashboard.jsx` | Defi | Read-only treasury/Defi preview | Protocol treasury overview first, tenant treasury later | protocol | protocol | protocol, tenant, operator | public | no | optional | yes | no | mock | high | Must remain action-disabled. |
| `/dex` | `src/pages/Dex.jsx` | DEX | Swap/pool static MVP | Read-only DEX visibility until guarded | mixed | protocol | protocol, user | public | optional | no | no | no | legacy-static | high | Visual swap card can imply executable swapping. |
| `/mcps` | `src/pages/Mcps.jsx` | MCPs | MCP service preview/terminal feed | Protocol/operator service catalog | mixed | operator | protocol, tenant, operator | public | optional | optional | yes | yes | mock | medium | Terminal-style feed should be explicitly operator-scoped. |

## Governance Routes

| Route | Page/component file | Module | Current purpose | Expected purpose | Current scope | Expected scope | Supported scopes | Access | Wallet | Tenant | Gov | ACS | Maturity | Risk | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/governance` | `src/modules/governance/pages/GovernanceLanding.jsx` | Governance | Governance overview and tenant discovery | Protocol overview plus tenant discovery | mixed | protocol | protocol, tenant | public | optional | optional | yes | yes | prototype | medium | Initial scope sections added. |
| `/governance/overview` | `src/modules/governance/pages/GovernanceLanding.jsx` | Governance | Alias to governance overview | Same as `/governance` | mixed | protocol | protocol, tenant | public | optional | optional | yes | yes | prototype | medium | Candidate for route alias cleanup later. |
| `/governance/tenants` | `src/modules/governance/pages/GovernanceTenants.jsx` | Governance | DAO tenant discovery | Tenant/Sub-DAO discovery | tenant | tenant | tenant, protocol | public | optional | yes | yes | yes | prototype | high | Central route for tenant understanding. |
| `/governance/dao/:daoId` | `src/modules/governance/pages/DaoTenantDetail.jsx` | Governance | DAO tenant detail workspace | Tenant operational profile | tenant | tenant | tenant, user, operator | public | optional | yes | yes | yes | prototype | high | Mixes tenant strategy, user position and operations context. |
| `/governance/console` | `src/modules/governance/pages/GovernanceDashboard.jsx` | Governance | Protected operations console | Tenant operations plus operator controls | mixed | tenant | tenant, operator, protocol | protected | yes | yes | yes | yes | api-ready | high | Needs continued panel decomposition. |
| `/governance/proposals/:proposalId` | `src/modules/governance/pages/ProposalDetail.jsx` | Governance | Protected proposal detail/actions | Proposal review, voting and execution readiness | mixed | tenant | tenant, user, operator | protected | yes | yes | yes | yes | api-ready | high | Action panels must stay behind guards. |
| `/dao` | `src/modules/governance/pages/GovernanceDashboard.jsx` | Governance | Legacy protected console alias | Should redirect/document as legacy alias | mixed | tenant | tenant, operator | protected | yes | yes | yes | yes | legacy-static | medium | Route name is ambiguous. |

## Business Routes

| Route | Page/component file | Module | Current purpose | Expected purpose | Current scope | Expected scope | Supported scopes | Access | Wallet | Tenant | Gov | ACS | Maturity | Risk | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/business` | `src/modules/business/pages/BusinessPages.jsx` | Business | Runtime overview | Tenant/operator runtime overview | mixed | operator | tenant, operator | public | no | yes | yes | yes | prototype | high | Initial scope sections added. |
| `/business/intake` | `src/modules/business/pages/BusinessIntake.jsx` | Business | Intake form/workflow | Operator intake preview | operator | operator | tenant, operator | public | optional | optional | yes | yes | prototype | high | Multiple route aliases map here. |
| `/business/intake/new` | `src/modules/business/pages/BusinessIntake.jsx` | Business | Intake alias | Operator intake creation | operator | operator | tenant, operator | public | optional | optional | yes | yes | prototype | medium | Alias should be documented in future nav. |
| `/business/intake/dao-plugin` | `src/modules/business/pages/BusinessIntake.jsx` | Business | DAO plugin intake | Operator intake preset | operator | operator | tenant, operator | public | optional | optional | yes | yes | prototype | medium | Preset route. |
| `/business/intake/acs-service` | `src/modules/business/pages/BusinessIntake.jsx` | Business | ACS service intake | Operator intake preset | operator | operator | tenant, operator | public | optional | optional | yes | yes | prototype | medium | Preset route. |
| `/business/intake/treasury-sponsorship` | `src/modules/business/pages/BusinessIntake.jsx` | Business | Treasury sponsorship intake | Operator intake preset | operator | operator | tenant, operator | public | optional | optional | yes | yes | prototype | high | Financial language must stay preview-only. |
| `/business/intake/debenture-funding` | `src/modules/business/pages/BusinessIntake.jsx` | Business | Debenture intake | Operator intake preset | operator | operator | tenant, operator | public | optional | optional | yes | yes | prototype | high | Must not imply issuance. |
| `/business/intake/preview` | `src/modules/business/pages/BusinessIntake.jsx` | Business | Draft preview | Operator preview | operator | operator | tenant, operator | public | optional | optional | yes | yes | prototype | medium | Preview-only. |
| `/business/intake/preview/:draftId` | `src/modules/business/pages/BusinessIntake.jsx` | Business | Draft preview detail | Operator preview detail | operator | operator | tenant, operator | public | optional | optional | yes | yes | prototype | medium | Preview-only. |
| `/business/intake/drafts` | `src/modules/business/pages/BusinessIntake.jsx` | Business | Draft list | Operator draft list | operator | operator | tenant, operator | public | optional | optional | yes | yes | prototype | medium | Local/mock draft state. |
| `/business/intake/drafts/:draftId` | `src/modules/business/pages/BusinessIntake.jsx` | Business | Draft detail | Operator draft detail | operator | operator | tenant, operator | public | optional | optional | yes | yes | prototype | medium | Local/mock draft state. |
| `/business/review-queue` | `src/modules/business/pages/BusinessReviewQueue.jsx` | Business | Review queue | Operator review queue | operator | operator | tenant, operator | public | no | yes | yes | yes | prototype | high | Should be clearly operator-only in nav. |
| `/business/requests` | `src/modules/business/pages/BusinessPages.jsx` | Business | Request table | Tenant/operator request registry | operator | operator | tenant, operator | public | no | yes | yes | yes | prototype | medium | Simple table page. |
| `/business/projects` | `src/modules/business/pages/BusinessPages.jsx` | Business | Project table | Tenant project registry | tenant | tenant | tenant, operator | public | no | yes | yes | yes | prototype | medium | Read-only. |
| `/business/projects/:projectId` | `src/modules/business/pages/BusinessPages.jsx` | Business | Project detail | Tenant project detail | tenant | tenant | tenant, operator | public | no | yes | yes | yes | prototype | medium | Read-only runtime detail. |
| `/business/assets` | `src/modules/business/pages/BusinessPages.jsx` | Business | Asset registry | Tenant asset registry | tenant | tenant | tenant, operator | public | no | yes | yes | yes | prototype | medium | Read-only. |
| `/business/assets/:assetId` | `src/modules/business/pages/BusinessPages.jsx` | Business | Asset detail | Tenant asset detail | tenant | tenant | tenant, operator | public | no | yes | yes | yes | prototype | medium | Read-only. |
| `/business/registry` | `src/modules/business/pages/BusinessPages.jsx` | Business | Runtime graph summary | Tenant registry graph | tenant | tenant | tenant, operator | public | no | yes | yes | yes | prototype | medium | Good candidate for shared registry UI. |
| `/business/workflows` | `src/modules/business/pages/BusinessPages.jsx` | Business | Workflow list | Operator workflow readiness | operator | operator | tenant, operator | public | no | yes | yes | yes | prototype | high | Blockers/review need operator scope. |
| `/business/events` | `src/modules/business/pages/BusinessPages.jsx` | Business | Runtime events | Operator event timeline | operator | operator | tenant, operator | public | no | yes | yes | yes | prototype | medium | Timeline component reusable. |
| `/business/state` | `src/modules/business/pages/BusinessPages.jsx` | Business | State-machine view | Operator state diagnostics | operator | operator | operator | public | no | optional | yes | yes | prototype | high | Diagnostic surface should be labeled. |
| `/business/risk` | `src/modules/business/pages/BusinessPages.jsx` | Business | Risk model | Tenant/operator risk | mixed | operator | tenant, operator | public | no | yes | yes | yes | prototype | high | Risk cards can be confused with live finance controls. |
| `/business/runtime` | `src/modules/business/pages/BusinessPages.jsx` | Business | Runtime safety metadata | Operator diagnostics | operator | operator | operator | public | no | optional | yes | yes | prototype | medium | Non-execution boundary. |
| `/business/access` | `src/modules/business/pages/BusinessPages.jsx` | Business | Identity/access view | Tenant access model | tenant | tenant | tenant, operator | public | optional | yes | yes | yes | prototype | medium | Shared with identity/permissions/capabilities aliases. |
| `/business/governance` | `src/modules/business/pages/BusinessPages.jsx` | Business | Governance readiness | Operator governance readiness | operator | operator | tenant, operator | public | no | yes | yes | yes | prototype | high | Needs clear separation from Governance module. |
| `/business/finance` | `src/modules/business/pages/BusinessPages.jsx` | Business | Finance risk/exposure | Tenant/operator finance read model | mixed | operator | tenant, operator | public | no | yes | yes | yes | prototype | high | Financial data must remain mock/read-only. |
| `/business/identity` | `src/modules/business/pages/BusinessPages.jsx` | Business | Alias to Access | Tenant identity model | tenant | tenant | tenant, operator | public | optional | yes | yes | yes | prototype | medium | Alias hidden in routing. |
| `/business/permissions` | `src/modules/business/pages/BusinessPages.jsx` | Business | Alias to Access | Tenant permission model | tenant | tenant | tenant, operator | public | optional | yes | yes | yes | prototype | medium | Alias hidden in routing. |
| `/business/capabilities` | `src/modules/business/pages/BusinessPages.jsx` | Business | Alias to Access | Tenant capability model | tenant | tenant | tenant, operator | public | optional | yes | yes | yes | prototype | medium | Alias hidden in routing. |
| `/business/plugins` | `src/modules/business/pages/BusinessPages.jsx` | Business | Plugin table | Tenant plugin registry | tenant | tenant | tenant, operator | public | no | yes | yes | yes | prototype | medium | Read-only. |
| `/business/funding` | `src/modules/business/pages/BusinessPages.jsx` | Business | Funding records | Operator funding review | operator | operator | tenant, operator | public | no | yes | yes | yes | prototype | high | Must not imply live funding execution. |
| `/business/debentures` | `src/modules/business/pages/BusinessPages.jsx` | Business | Debenture records | Operator debenture review | operator | operator | tenant, operator | public | no | yes | yes | yes | prototype | high | Sensitive finance wording. |
| `/business/treasury` | `src/modules/business/pages/BusinessPages.jsx` | Business | Treasury exposure | Tenant treasury exposure | tenant | tenant | tenant, operator | public | no | yes | yes | yes | prototype | high | Treasury movement disabled. |
| `/business/revenue` | `src/modules/business/pages/BusinessPages.jsx` | Business | Revenue records | Tenant revenue read model | tenant | tenant | tenant, operator | public | no | yes | yes | yes | prototype | high | Mock accounting only. |
| `/business/acs` | `src/modules/business/pages/BusinessPages.jsx` | Business | ACS runtime | Operator ACS integration | operator | operator | tenant, operator | public | no | yes | yes | yes | prototype | medium | Overlaps ACS module. |
| `/business/acs/readiness` | `src/modules/business/pages/BusinessPages.jsx` | Business | ACS readiness | Operator readiness diagnostics | operator | operator | tenant, operator | public | no | yes | yes | yes | prototype | medium | Overlaps ACS module. |
| `/business/telemetry` | `src/modules/business/pages/BusinessPages.jsx` | Business | Telemetry table/feed | Operator telemetry | operator | operator | tenant, operator | public | no | yes | yes | yes | prototype | medium | Good candidate for shared telemetry panel. |

## Marketplace Routes

| Route | Page/component file | Module | Current purpose | Expected purpose | Current scope | Expected scope | Supported scopes | Access | Wallet | Tenant | Gov | ACS | Maturity | Risk | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/marketplace` | `src/modules/marketplace/pages/MarketplaceHome.jsx` | Marketplace | Marketplace home/registry | Tenant commerce plus operator review summary | mixed | tenant | protocol, user, tenant, operator | public | optional | yes | yes | yes | prototype | medium | Initial scope sections added. |
| `/marketplace/explore` | `src/modules/marketplace/pages/MarketplaceExplore.jsx` | Marketplace | Product explorer | User/tenant product discovery | mixed | user | user, tenant | public | optional | optional | yes | yes | prototype | medium | Filters use URL state. |
| `/marketplace/assets` | `src/modules/marketplace/pages/MarketplaceAssetGallery.jsx` | Marketplace | Asset gallery | Tenant asset registry | tenant | tenant | tenant, user | public | optional | yes | yes | yes | prototype | medium | Media/product cards need shared shell. |
| `/marketplace/listings` | `src/modules/marketplace/pages/MarketplaceListings.jsx` | Marketplace | Listings table | Tenant listing registry | tenant | tenant | tenant, user | public | optional | yes | yes | yes | prototype | medium | Table duplicates home registry. |
| `/marketplace/create` | `src/modules/marketplace/pages/MarketplaceCreateSell.jsx` | Marketplace | Create/sell preview | Operator/publisher preview | operator | operator | tenant, operator | public | optional | yes | yes | yes | prototype | high | Must stay preview-only. |
| `/marketplace/sell` | `src/modules/marketplace/pages/MarketplaceCreateSell.jsx` | Marketplace | Create/sell alias | Operator/publisher preview | operator | operator | tenant, operator | public | optional | yes | yes | yes | prototype | high | Alias to `/create`. |
| `/marketplace/products/:slug` | `src/modules/marketplace/pages/MarketplaceProductDetail.jsx` | Marketplace | Product detail | User product view plus tenant/operator metadata | mixed | user | user, tenant, operator | public | optional | optional | yes | yes | prototype | high | Purchase preview modal must stay disabled/mock. |
| `/marketplace/sellers/:sellerId` | `src/modules/marketplace/pages/MarketplaceSellerProfile.jsx` | Marketplace | Seller profile | Tenant seller profile | tenant | tenant | tenant, user | public | optional | yes | yes | yes | prototype | medium | Needs tenant badge. |
| `/marketplace/orders` | `src/modules/marketplace/pages/MarketplaceOrders.jsx` | Marketplace | Orders | User/operator order review | mixed | user | user, operator | protected | yes | optional | yes | yes | prototype | high | Protected; distinguish personal orders vs review. |
| `/marketplace/subscriptions` | `src/modules/marketplace/pages/MarketplaceSubscriptions.jsx` | Marketplace | Subscription lifecycle | User subscription/license state | user | user | user, operator | protected | yes | optional | yes | yes | prototype | medium | Read-only lifecycle. |
| `/marketplace/treasury` | `src/modules/marketplace/pages/MarketplaceTreasury.jsx` | Marketplace | Treasury route previews | Operator treasury settlement review | operator | operator | tenant, operator | protected | yes | yes | yes | yes | prototype | high | Settlement disabled. |
| `/marketplace/publisher` | `src/modules/marketplace/pages/MarketplacePublisher.jsx` | Marketplace | Publisher console | Operator/publisher readiness | operator | operator | tenant, operator | protected | yes | yes | yes | yes | prototype | medium | Pre-publish blockers only. |
| `/marketplace/governance` | `src/modules/marketplace/pages/MarketplaceGovernance.jsx` | Marketplace | Governance validation | Operator governance validation | operator | operator | tenant, operator | public | optional | yes | yes | yes | prototype | high | Overlaps Governance module. |
| `/marketplace/licenses` | `src/modules/marketplace/pages/MarketplaceLicenses.jsx` | Marketplace | License registry | User/tenant license visibility | mixed | user | user, tenant, operator | public | optional | optional | yes | yes | prototype | medium | Needs scope split. |
| `/marketplace/dashboard` | `src/modules/marketplace/pages/MarketplaceDashboard.jsx` | Marketplace | Federation dashboard | Tenant/operator commerce dashboard | mixed | tenant | tenant, operator | public | optional | yes | yes | yes | prototype | high | Dense metrics require decomposition. |
| `/item/:chain/:contract/:id` | `src/modules/marketplace/pages/MarketplaceLegacyItem.jsx` | Marketplace | Legacy item route | Legacy item compatibility | user | user | user, tenant | public | optional | optional | no | no | legacy-static | medium | Candidate for redirect once product detail is stable. |

## Academy Routes

| Route | Page/component file | Module | Current purpose | Expected purpose | Current scope | Expected scope | Supported scopes | Access | Wallet | Tenant | Gov | ACS | Maturity | Risk | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/academy` | `src/modules/academy/pages/AcademyPages.jsx` | Academy | Academy home | User learning plus protocol doctrine | mixed | user | protocol, user | public | optional | no | yes | yes | prototype | medium | Initial scope sections added. |
| `/academy/courses` | `src/modules/academy/pages/AcademyPages.jsx` | Academy | Course explorer | User discovery | user | user | user, protocol | public | optional | no | yes | yes | prototype | medium | Reward potential must stay mock-only. |
| `/academy/courses/:courseSlug` | `src/modules/academy/pages/AcademyPages.jsx` | Academy | Course detail | User course detail | user | user | user, protocol | public | optional | no | yes | yes | prototype | medium | Contains protocol review metadata. |
| `/academy/workspace/:courseSlug` | `src/modules/academy/pages/AcademyPages.jsx` | Academy | Learning workspace | User learning workspace | user | user | user, operator | public | optional | no | yes | yes | prototype | medium | PoK validation appears operator-adjacent. |
| `/academy/dashboard` | `src/modules/academy/pages/AcademyPages.jsx` | Academy | Learning dashboard | User learning dashboard | user | user | user, operator | public | optional | no | yes | yes | prototype | medium | Review blockers should be operator subpanel. |
| `/academy/progress` | `src/modules/academy/pages/AcademyPages.jsx` | Academy | Progress engine | User progress | user | user | user, protocol | public | optional | no | yes | yes | prototype | medium | Good candidate for My Axodus later. |
| `/academy/eligibility` | `src/modules/academy/pages/AcademyPages.jsx` | Academy | Governance eligibility | User eligibility for governance | user | user | user, protocol | public | optional | no | yes | yes | prototype | medium | Eligibility must not imply live voting rights. |
| `/academy/tutors/:tutorId` | `src/modules/academy/pages/AcademyPages.jsx` | Academy | Tutor profile | Tenant/operator educator profile | mixed | operator | protocol, operator | public | optional | no | yes | yes | prototype | low | Validation status should be operator-scoped. |
| `/academy/certifications` | `src/modules/academy/pages/AcademyPages.jsx` | Academy | Certificate list | User credential visibility | user | user | user, protocol | public | optional | no | yes | yes | prototype | medium | No issuance execution. |
| `/academy/rewards` | `src/modules/academy/pages/AcademyPages.jsx` | Academy | Reward visibility | User reward visibility | user | user | user, protocol | public | optional | no | yes | yes | prototype | high | Rewards must remain mock/read-only. |
| `/academy/governance-review` | `src/modules/academy/pages/AcademyPages.jsx` | Academy | Review queue | Operator review visibility | operator | operator | protocol, operator | public | optional | no | yes | yes | prototype | medium | Review route should be operator group. |
| `/academy/paths/:pathId` | `src/modules/academy/pages/AcademyPages.jsx` | Academy | Learning path | User path viewer | user | user | user, protocol | public | optional | no | yes | yes | prototype | low | Read-only. |

## Mining Routes

| Route | Page/component file | Module | Current purpose | Expected purpose | Current scope | Expected scope | Supported scopes | Access | Wallet | Tenant | Gov | ACS | Maturity | Risk | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/mining` | `src/modules/mining/pages/MiningPages.jsx` | Mining | Mining overview | Protocol/operator mining overview | mixed | protocol | protocol, operator | public | optional | optional | yes | yes | prototype | high | Needs explicit non-execution labels. |
| `/mining/providers` | `src/modules/mining/pages/MiningPages.jsx` | Mining | Provider registry | Operator provider diligence | operator | operator | operator, tenant | public | no | optional | yes | yes | prototype | medium | Table-driven. |
| `/mining/providers/:providerSlug` | `src/modules/mining/pages/MiningPages.jsx` | Mining | Provider detail | Operator provider diligence detail | operator | operator | operator, tenant | public | no | optional | yes | yes | prototype | medium | Read-only. |
| `/mining/hash-tokens` | `src/modules/mining/pages/MiningPages.jsx` | Mining | Hash token visibility | Protocol token model preview | protocol | protocol | protocol | public | no | no | yes | no | prototype | high | Avoid token sale implication. |
| `/mining/vaults` | `src/modules/mining/pages/MiningPages.jsx` | Mining | Mining vaults | Tenant/protocol vault visibility | mixed | tenant | protocol, tenant | public | no | yes | yes | no | prototype | high | No deposits/withdrawals. |
| `/mining/allocations` | `src/modules/mining/pages/MiningPages.jsx` | Mining | Allocation tables | Tenant/protocol allocation visibility | mixed | tenant | protocol, tenant | public | no | yes | yes | no | prototype | high | Financial allocation language. |
| `/mining/telemetry` | `src/modules/mining/pages/MiningPages.jsx` | Mining | Telemetry | Operator telemetry | operator | operator | operator | public | no | optional | yes | yes | prototype | medium | Reuse telemetry panel. |
| `/mining/treasury` | `src/modules/mining/pages/MiningPages.jsx` | Mining | Treasury exposure | Tenant/protocol treasury visibility | mixed | tenant | protocol, tenant, operator | public | no | yes | yes | no | prototype | high | No treasury execution. |
| `/mining/accounting` | `src/modules/mining/pages/MiningPages.jsx` | Mining | Accounting records | Operator accounting read model | operator | operator | operator | public | no | optional | yes | no | prototype | medium | Read-only. |
| `/mining/reconciliation` | `src/modules/mining/pages/MiningPages.jsx` | Mining | Reconciliation | Operator reconciliation | operator | operator | operator | public | no | optional | yes | yes | prototype | medium | Read-only. |
| `/mining/risk` | `src/modules/mining/pages/MiningPages.jsx` | Mining | Risk dashboard | Operator risk | operator | operator | protocol, operator | public | no | optional | yes | yes | prototype | high | Risk warnings need common pattern. |
| `/mining/governance` | `src/modules/mining/pages/MiningPages.jsx` | Mining | Governance state | Protocol/operator governance | mixed | operator | protocol, operator | public | optional | optional | yes | yes | prototype | medium | Overlaps Governance. |
| `/mining/actions` | `src/modules/mining/pages/MiningPages.jsx` | Mining | Action placeholders | Operator action-disabled preview | operator | operator | operator | public | no | optional | yes | yes | prototype | high | Action-disabled labels required. |
| `/mining/reports` | `src/modules/mining/pages/MiningPages.jsx` | Mining | Reports | Protocol/operator reports | mixed | protocol | protocol, operator | public | no | optional | yes | no | prototype | medium | Could move to reporting center later. |

## Lottery Routes

| Route | Page/component file | Module | Current purpose | Expected purpose | Current scope | Expected scope | Supported scopes | Access | Wallet | Tenant | Gov | ACS | Maturity | Risk | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/lottery` | `src/modules/lottery/pages/LotteryPages.jsx` | Lottery | Lottery dashboard | Protocol lottery overview | mixed | protocol | protocol, user, operator | public | optional | optional | yes | yes | prototype | high | Ticket minting must remain disabled. |
| `/lottery/draws` | `src/modules/lottery/pages/LotteryPages.jsx` | Lottery | Draw list | Protocol draw registry | protocol | protocol | protocol, user | public | optional | optional | yes | yes | prototype | medium | Read-only. |
| `/lottery/draws/:slug` | `src/modules/lottery/pages/LotteryPages.jsx` | Lottery | Draw detail | Protocol draw detail | mixed | protocol | protocol, user, operator | public | optional | optional | yes | yes | prototype | medium | Contains ticket/user-like context. |
| `/lottery/game-models` | `src/modules/lottery/pages/LotteryPages.jsx` | Lottery | Game model list | Protocol game model registry | protocol | protocol | protocol | public | no | no | yes | yes | prototype | medium | Read-only. |
| `/lottery/tickets` | `src/modules/lottery/pages/LotteryPages.jsx` | Lottery | Ticket view | User ticket preview | user | user | user, protocol | public | optional | no | yes | yes | prototype | high | Minting disabled. |
| `/lottery/prizes` | `src/modules/lottery/pages/LotteryPages.jsx` | Lottery | Prize pools | Protocol prize visibility | protocol | protocol | protocol, user | public | optional | optional | yes | yes | prototype | high | Prize language sensitive. |
| `/lottery/governance` | `src/modules/lottery/pages/LotteryPages.jsx` | Lottery | Governance controls/status | Operator governance review | operator | operator | protocol, operator | public | optional | optional | yes | yes | prototype | medium | Overlaps Governance. |
| `/lottery/randomness` | `src/modules/lottery/pages/LotteryPages.jsx` | Lottery | Randomness proof | Protocol proof visibility | protocol | protocol | protocol, operator | public | no | no | yes | yes | prototype | medium | Read-only VRF/Merkle status. |
| `/lottery/history` | `src/modules/lottery/pages/LotteryPages.jsx` | Lottery | Draw history | Protocol history | protocol | protocol | protocol, user | public | optional | optional | yes | yes | prototype | low | Read-only. |

## BBA Routes

| Route | Page/component file | Module | Current purpose | Expected purpose | Current scope | Expected scope | Supported scopes | Access | Wallet | Tenant | Gov | ACS | Maturity | Risk | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/bba` | `src/modules/bba/pages/BbaHome.jsx` | BBA | Agency overview | Tenant/operator agency overview | mixed | tenant | tenant, operator | public | no | yes | yes | yes | prototype | medium | Read-only agency MVP. |
| `/bba/services` | `src/modules/bba/pages/BbaServices.jsx` | BBA | Service catalog | Tenant service discovery | tenant | tenant | tenant, user | public | optional | yes | yes | yes | prototype | medium | Marketplace overlap. |
| `/bba/portfolio` | `src/modules/bba/pages/BbaPortfolio.jsx` | BBA | Portfolio showcase | Protocol/tenant case studies | mixed | tenant | tenant, protocol | public | no | optional | yes | yes | prototype | low | Public-facing. |
| `/bba/campaigns` | `src/modules/bba/pages/BbaCampaigns.jsx` | BBA | Campaign dashboard | Operator campaign telemetry | operator | operator | tenant, operator | public | no | yes | yes | yes | prototype | medium | ACS workflow embedded. |
| `/bba/partnerships` | `src/modules/bba/pages/BbaPartnerships.jsx` | BBA | Partnerships | Tenant partnership pipeline | tenant | tenant | tenant, operator | public | no | yes | yes | yes | prototype | medium | Pipeline overlaps Business. |
| `/bba/governance` | `src/modules/bba/pages/BbaGovernance.jsx` | BBA | Governance validation | Operator governance validation | operator | operator | tenant, operator | public | no | yes | yes | yes | prototype | medium | Overlaps Governance. |

## ACS Routes

| Route | Page/component file | Module | Current purpose | Expected purpose | Current scope | Expected scope | Supported scopes | Access | Wallet | Tenant | Gov | ACS | Maturity | Risk | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/acs` | `src/modules/acs/pages/AcsPages.jsx` | ACS | ACS overview | Operator ACS overview | mixed | operator | protocol, tenant, user, operator | public | optional | optional | yes | yes | prototype | high | Uses mock/fallback API; needs explicit scope labels. |
| `/acs/capabilities` | `src/modules/acs/pages/AcsPages.jsx` | ACS | Capability matrix | Protocol/operator capability matrix | operator | operator | protocol, operator | public | no | optional | yes | yes | prototype | medium | Read-only. |
| `/acs/services` | `src/modules/acs/pages/AcsPages.jsx` | ACS | Tenant services | Tenant ACS services | tenant | tenant | tenant, operator | public | no | yes | yes | yes | prototype | medium | Tenant-specific. |
| `/acs/products` | `src/modules/acs/pages/AcsPages.jsx` | ACS | Product access | User/product policy | mixed | user | user, operator | public | optional | optional | yes | yes | prototype | medium | Uses demo wallet. |
| `/acs/policy` | `src/modules/acs/pages/AcsPages.jsx` | ACS | Policy check | Operator policy inspection | operator | operator | operator | public | no | optional | yes | yes | prototype | medium | Read-only. |
| `/acs/debug` | `src/modules/acs/pages/AcsPages.jsx` | ACS | Debug detail | Operator debug diagnostics | operator | operator | operator | public | no | optional | yes | yes | prototype | high | Should be admin/operator grouped. |
| `/acs/status` | `src/modules/acs/pages/AcsPages.jsx` | ACS | Operational status | Operator status dashboard | operator | operator | operator | public | no | optional | yes | yes | prototype | medium | Dense panels. |
| `/acs/readiness` | `src/modules/acs/pages/AcsPages.jsx` | ACS | Readiness dashboard | User/operator readiness | mixed | operator | user, operator | public | optional | optional | yes | yes | prototype | medium | Uses demo wallet. |

## Legacy Static Page Files Not Directly Routed

| File | Current status | Risk | Recommendation |
| --- | --- | --- | --- |
| `src/pages/Academy.jsx` | Legacy static page file | medium | Keep only if referenced by future route; otherwise document as obsolete. |
| `src/pages/Business.jsx` | Legacy static account/business page | medium | Route `/account` currently points to BusinessOverview, not this file. Candidate for removal later. |
| `src/pages/Dao.jsx` | Legacy static DAO page | medium | Not routed; do not revive without scope refactor. |
| `src/pages/Lottery.jsx` | Legacy static page file | low | Not routed; module route uses LotteryPages. |
| `src/pages/Marketplace.jsx` | Legacy static page file | medium | Not routed; module route uses MarketplaceHome. |
| `src/pages/Mining.jsx` | Legacy static page file | high | Not routed; contains external image URL and financial action-like labels. |

