# AxodusAPP Governance Read-Only Integration Planning Report

Report date: 2026-05-29
Execution date: 2026-06-02
Request: REQUEST 17 - AxodusAPP Governance Read-Only Integration Planning
Execution mode: PLAN MODE ONLY

## Final Status

REQUEST 17: COMPLETE
AxodusAPP Governance Read-Only Integration: PLANNED
Frontend implementation: NOT STARTED
Backend HTTP/API integration: NOT STARTED
Governance query API/controllers/routes: NOT IMPLEMENTED
DB adapter: NOT IMPLEMENTED
Migrations: NOT CREATED
Wallet signing: DISABLED
Proposal execution: DISABLED
Treasury execution: DISABLED
On-chain writes: DISABLED

Next recommended request:
REQUEST 18 - AxodusAPP Governance Read-Only Mock Integration Implementation

## Baseline Validation

AxodusAPP repository:

- Path: `D:\Rede\Github\Axodus\AxodusAPP`
- Branch: `dev`
- Commit: `73c4e25bccc2a29b9e6d717e858a726cc952df5a`
- Initial status: clean, tracking `origin/dev`

AxodusAPP commands:

- `npm run build`: PASS via WSL.
- `npm test -- --run`: COMPLETED with 1 unrelated Marketplace failure.

Current AxodusAPP test blocker observed during planning:

- File: `tests/marketplace/MarketplaceListingRoyaltyRuntime.test.ts`
- Test: `models auction and bid lifecycle previews`
- Expected: `eligible`
- Received: `expired`
- Classification: unrelated Marketplace assertion drift/blocker.
- REQUEST 17 action: documented only; no Marketplace runtime/test edits were permitted by this planning request.

Governance backend repository:

- Path: `D:\Rede\Github\Axodus\Governance\Aragon-app-backend`
- Branch: `development`
- Commit: `c9dc64c5228a166cd650d80d70eca8441936e144`
- Initial status: clean, tracking `origin/development`, ahead 6.

Governance backend commands:

- `yarn typecheck`: PASS.
- `yarn test:unit`: PASS, `4551 passing`, `5 pending`.
- `yarn validate`: PASS, `4551 passing`, `5 pending`.

## Backend Gate Dependency

REQUEST 16.5 formally approved the Governance read-only backend gate. This planning request depends on that approval only as a safe planning boundary.

Approved backend artifacts available for future local/mock consumption planning:

- repository interfaces and `MockGovernancePersistenceAdapter`;
- read model types;
- `MockGovernanceReadModelProjector`;
- `GovernanceReadModelQueryService`;
- authorization and sensitivity sanitization helpers;
- `LocalGovernanceMockIndexer`;
- manual/local/test-only checkpoint handling.

The backend still does not expose approved HTTP routes/controllers/query APIs for AxodusAPP. REQUEST 18 must not call the backend over HTTP.

## AxodusAPP Inventory

Existing Governance route surface:

- `/governance`
- `/governance/overview`
- `/governance/tenants`
- `/governance/dao/:daoId`
- `/governance/console`
- `/governance/proposals/:proposalId`
- `/dao`

Existing Governance frontend module:

- `src/modules/governance/pages/GovernanceLanding.jsx`
- `src/modules/governance/pages/GovernanceTenants.jsx`
- `src/modules/governance/pages/DaoTenantDetail.jsx`
- `src/modules/governance/pages/GovernanceDashboard.jsx`
- `src/modules/governance/pages/ProposalDetail.jsx`
- `src/modules/governance/api/governanceClient.js`
- `src/modules/governance/api/mockGovernanceData.js`
- `src/modules/governance/api/createProposalContract.js`
- `src/modules/governance/hooks/useGovernanceConsole.js`
- `src/modules/governance/hooks/useProposalDetail.js`
- `src/modules/governance/hooks/useProposalDrafts.js`
- `src/modules/governance/hooks/useGovernanceTransactions.js`
- `src/modules/governance/hooks/useGovernanceWalletWriter.js`
- `src/modules/governance/hooks/useGovernanceReceiptTracker.js`

Existing tenant runtime:

- `src/runtime/tenantContext/TenantContext.jsx`
- `src/runtime/tenantContext/useTenantContext.js`
- `src/runtime/tenantContext/tenantRegistry.js`
- `src/data/mock/tenants.js`
- global `TenantSelector`

Important planning conclusion:

AxodusAPP already has a legacy Governance module. REQUEST 18 should adapt this module with a new frontend-local read-only adapter/mock provider rather than creating a disconnected parallel Governance module. Existing mutation-oriented or wallet-oriented hooks must remain out of the read-only path.

## Integration Purpose

The AxodusAPP Governance read-only integration must make Governance read models visible in the app shell without making AxodusAPP a Governance authority.

The integration must help users inspect:

- selected tenant governance summary;
- proposal list;
- proposal detail;
- governance timeline;
- decision history;
- emergency actions;
- freshness/staleness metadata;
- disabled execution boundaries.

It must not let users mutate Governance state, create authoritative proposals, vote, review, approve, decide, execute, sign, move funds, or trigger on-chain/treasury actions.

## Initial Allowed Screens

REQUEST 18 may implement read-only/mock rendering for:

- `/governance/overview`: tenant-scoped summary, proposal counts, emergency summary and freshness metadata.
- `/governance/proposals/:proposalId`: sanitized proposal detail read model.
- `/governance/console`: optional read-only backend-foundation status panel only if it does not alter current console behavior.

REQUEST 18 may add a read-only proposal list route only if it follows existing routing conventions and remains mock/local:

- `/governance/proposals`

REQUEST 18 should not remove existing routes.

## Initial Forbidden Screens And Actions

Forbidden in REQUEST 18:

- active create proposal submission;
- active vote UI;
- active review/approval UI;
- active decision recording UI;
- active execution buttons;
- wallet signing prompts;
- transaction adapter execution;
- treasury operation execution;
- on-chain write previews that appear executable;
- backend HTTP query calls;
- ACS production authorization calls;
- audit trail full evidence viewer;
- actor activity broad explorer.

Existing components that must not be wired into the read-only integration path:

- `useGovernanceWalletWriter`;
- `useGovernanceTransactions`;
- `governanceTransactionAdapter`;
- `createGovernanceProposal`;
- backend-enabled proposal submission through `VITE_GOVERNANCE_CREATE_PROPOSAL_ENABLED=true`.

## Read Model Consumption Map

| Governance backend read model | AxodusAPP future consumer | REQUEST 18 status |
|---|---|---|
| `ProposalListReadModel` | `/governance/overview`, optional `/governance/proposals` | Allowed with local mock adapter |
| `ProposalDetailReadModel` | `/governance/proposals/:proposalId` | Allowed with sanitization |
| `GovernanceTimelineReadModel` | proposal detail, overview activity strip | Allowed, summarized |
| `DecisionHistoryReadModel` | proposal detail, overview decision summary | Allowed, summarized |
| `TenantGovernanceSummaryReadModel` | overview and console read-only panel | Allowed |
| `EmergencyActionReadModel` | overview emergency notices | Allowed with sanitization |
| `AuditTrailReadModel` | not initial UI | Restricted/deferred |
| `ActorActivityReadModel` | not initial UI | Restricted/deferred |

## Mock Data Strategy

REQUEST 18 should create AxodusAPP-local mock fixtures shaped after Governance read models.

Recommended path:

- `src/modules/governance/readOnly/mockGovernanceReadModels.js`
- `src/modules/governance/readOnly/governanceReadOnlyAdapter.js`

Rules:

- do not import backend TypeScript directly;
- do not call Governance backend HTTP endpoints;
- include `metadata.freshness`, `generatedAt`, `sourceVersion`, `tenantId` and `correlationId: null`;
- include tenant-to-governance mapping fixtures;
- keep data clearly marked as `local-mock`;
- keep execution intent summarized as `none`, `recorded` or `blocked`;
- do not include raw evidence contents, risk notes, secrets, permission internals or production addresses.

## Provider And Hook Strategy

REQUEST 18 may implement a frontend-local read-only adapter/provider.

Recommended names:

- `GovernanceReadOnlyProvider`
- `useGovernanceReadOnly`
- `useGovernanceReadOnlyProposalList`
- `useGovernanceReadOnlyProposalDetail`
- `useGovernanceReadOnlyTenantSummary`

Rules:

- provider consumes existing `TenantProvider`;
- selected app tenant id maps to a Governance `tenantId`;
- missing tenant mapping returns safe empty/error state;
- no cross-tenant fallback;
- no backend HTTP call;
- no wallet dependency;
- no mutation methods exposed by hook return values.

## Component Strategy

REQUEST 18 should prefer small display-only components:

- `ReadOnlyGovernanceStatusBanner`
- `ReadModelFreshnessBadge`
- `ReadOnlyProposalListPanel`
- `ReadOnlyProposalDetailPanel`
- `ReadOnlyGovernanceTimelinePanel`
- `ReadOnlyDecisionHistoryPanel`
- `ReadOnlyEmergencyNoticePanel`
- `TenantGovernanceSummaryPanel`

Components must:

- show local/mock/read-only status;
- show stale/fresh/rebuilding/unknown freshness;
- avoid action-looking buttons except navigation links;
- reuse existing card/layout primitives and Governance visual language;
- avoid duplicating the global layout/sidebar.

## Routing And Navigation Strategy

Recommended REQUEST 18 routing:

- preserve current `/governance` and `/governance/overview`;
- preserve `/governance/tenants` and `/governance/dao/:daoId`;
- preserve protected `/governance/console`;
- preserve protected `/governance/proposals/:proposalId`;
- optionally add `/governance/proposals` for read-only proposal list if route integration is low-risk.

Navigation labels should clarify read-only scope:

- Overview
- DAO Tenants
- Proposals
- Console

Do not introduce execution/action routes.

## UI Safety Labels

Every read-only integration surface should expose:

- `Read-only mock data`
- `Governance backend query API not connected`
- `No proposal execution`
- `No treasury execution`
- `No wallet signing`
- freshness indicator from read model metadata

Proposal detail surfaces must distinguish:

- decision visibility from execution;
- receipt reference from proof;
- blocked execution intent from executable operation.

## Stale/Fresh Display Behavior

Freshness states:

- `fresh`: normal read-only display;
- `stale`: warning badge and non-blocking stale notice;
- `rebuilding`: loading/rebuilding badge, keep last known values if present;
- `unknown`: caution badge and reduced confidence copy.

Freshness must never trigger:

- indexing;
- backend fetch;
- proposal execution;
- wallet operation;
- treasury/on-chain operation.

## Error, Empty And Loading States

REQUEST 18 must include UI states for:

- tenant mapping missing;
- proposal not found;
- empty proposal list;
- emergency actions empty;
- stale read model;
- mock adapter unavailable;
- restricted read model not exposed;
- loading placeholder for local async adapter if used.

Errors should be user-readable but must not expose internal correlation IDs, evidence contents or security notes.

## Tenant Assumptions

- AxodusAPP selected tenant is controlled by `TenantProvider`.
- Governance read-only tenant id must be mapped explicitly from selected app tenant.
- Default tenant may map to Axodus Root DAO mock tenant.
- Cross-tenant reads are forbidden by default.
- Federation-wide reads remain deferred.
- Actor/role context remains frontend-local/mock only in REQUEST 18.

## Sensitivity And Field Exposure Policy

Allowed initially:

- proposal id;
- tenant id;
- title;
- summary;
- public status;
- decision status;
- review status;
- emergency flag;
- execution intent summary as disabled/blocked/read-only;
- created/updated timestamps;
- proposal counts;
- sanitized emergency severity/status/reason;
- metadata freshness and generated timestamp.

Restricted/deferred:

- raw evidence contents;
- sensitive risk notes;
- internal correlation IDs;
- permission context;
- private actor identity;
- security incident details;
- wallet payloads;
- transaction calldata;
- treasury operation payloads;
- production config references.

## Testing Strategy For REQUEST 18

REQUEST 18 should add focused Vitest/RTL tests for:

- provider initializes with local mock adapter;
- selected tenant maps to Governance tenant id;
- missing tenant mapping renders safe empty/error state;
- overview renders tenant summary, proposal list preview and freshness;
- proposal detail renders sanitized read model;
- stale model shows warning;
- emergency notices are sanitized;
- no execution/vote/review/sign buttons are present;
- no backend fetch is called;
- no wallet writer/transaction adapter is invoked.

Existing full validation command remains:

- `npm run build`
- `npm test -- --run`

Current known blocker before REQUEST 18:

- AxodusAPP full test suite currently has one unrelated Marketplace assertion failure in `MarketplaceListingRoyaltyRuntime.test.ts`.
- REQUEST 18 should not fix Marketplace unless separately authorized.

## REQUEST 18 Implementation Gate

REQUEST 18 may implement:

- frontend-local read-only mock adapter;
- frontend-local read model shaped fixtures;
- provider/hooks that expose read-only methods only;
- display-only components;
- read-only route wiring if needed;
- tests for mock/read-only behavior;
- docs/report updates.

REQUEST 18 must not implement:

- backend HTTP client integration;
- query API routes/controllers;
- database adapter;
- migrations;
- indexing workers;
- wallet signing;
- proposal submission;
- voting/review/decision mutation;
- execution;
- treasury/on-chain writes;
- production configuration.

REQUEST 18 may proceed only after this plan is accepted and the Marketplace test blocker is either resolved separately or explicitly documented as unrelated residual risk.

## Boundaries Preserved

- No frontend source code changed in REQUEST 17.
- No backend source code changed in REQUEST 17.
- No API routes/controllers created.
- No DB adapters or migrations created.
- No AxodusAPP runtime integration started.
- No proposal execution enabled.
- No wallet signing enabled.
- No treasury execution enabled.
- No on-chain writes enabled.

## Final Decision

REQUEST 17 planning is complete.

AxodusAPP may proceed to REQUEST 18 only as a local/mock/read-only implementation sprint. The first implementation should adapt the existing Governance module and tenant runtime, using frontend-local read model fixtures shaped after the approved Governance backend read-only model. Production/API integration remains blocked.
