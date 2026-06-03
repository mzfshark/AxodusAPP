# AxodusAPP Workflow

## Workflow Philosophy

AxodusAPP development must remain:

- modular
- scalable
- governance-aware
- security-first
- API-driven
- component-oriented

---

# Development Workflow

## 1. Architecture Validation

Before implementing features:

- validate module boundaries
- validate API contracts
- validate state ownership
- validate DAO implications
- validate chain interactions

---

## 2. UI Planning

Each feature should define:

- user intent
- route placement
- component hierarchy
- loading state
- error state
- empty state
- permission requirements

---

## 3. Mock Phase

Before backend integration:

- create typed mocks
- validate UI flows
- validate navigation
- validate responsive behavior

---

## 4. Integration Phase

After UI validation:

- integrate APIs
- integrate contracts
- integrate wallet state
- integrate execution flows

---

## 5. Security Validation

Before release:

- validate permissions
- validate protected routes
- validate transaction flows
- validate DAO context
- validate chain restrictions

---

## 6. Telemetry and Monitoring

Features should expose:

- usage telemetry
- error tracking
- performance metrics
- execution traces

---

# Module Workflow

Each module should follow:

1. module registration
2. route registration
3. navigation registration
4. UI implementation
5. mock integration
6. API integration
7. testing
8. telemetry integration

---

# Pull Request Workflow

Each PR should include:

- scope summary
- affected modules
- screenshots if UI-related
- testing notes
- security implications
- DAO implications if relevant

---

# Release Workflow

Before release:

- validate routing
- validate wallet integration
- validate responsive behavior
- validate permissions
- validate telemetry
- validate analytics
- validate accessibility

---

# Governance-Sensitive Workflow

Sensitive actions require:

- explicit user confirmation
- transaction simulation where possible
- clear chain visibility
- DAO visibility
- permission validation

Examples:

- proposal execution
- treasury allocation
- staking
- liquidity provision
- governance voting

---

# Governance Read-Only Integration Workflow

REQUEST 18 must follow the REQUEST 17 plan:

1. Start from the existing Governance module and existing `TenantProvider`.
2. Use frontend-local read-model-shaped mock data only.
3. Add provider/hooks that expose read-only query methods only.
4. Render proposal list, proposal detail, tenant summary and emergency state as display-only views.
5. Show freshness, mock/read-only and execution-disabled labels.
6. Test that backend fetch, wallet writer, transaction adapter, mutation and execution paths are not called.

Forbidden until a later approved gate:

- Governance backend HTTP integration
- query API routes/controllers
- proposal submission as authority
- voting/review/decision mutation
- wallet signing
- treasury execution
- on-chain writes

REQUEST 18 implementation status:

- local mock fixtures exist under `src/modules/governance/readOnly`;
- read-only adapter/provider/hooks exist;
- `/governance/proposals` and `/governance/proposals/:proposalId` are read-only surfaces;
- `/governance` exposes a read-only backend foundation panel;
- tests assert forbidden mutation methods and action buttons are absent.

REQUEST 19 planning status:

- backend read-only API boundary is planned in the Governance workspace;
- AxodusAPP remains on the local `MockGovernanceReadOnlyAdapter`;
- future `HttpGovernanceReadOnlyAdapter` must preserve the same read-only interface;
- initial future backend consumption should be limited to tenant summary, proposal list, proposal detail and emergency actions;
- audit trail and actor activity are restricted/deferred;
- no real backend client, mutation API, wallet signing, treasury execution or on-chain write is implemented.

REQUEST 20 implementation status:

- Governance backend static read-only API contract types now exist in the Governance backend;
- endpoint constants, response envelopes, error/status mappings and pure endpoint helpers are contract-only;
- no Governance HTTP routes, controllers, backend handlers or server wiring were implemented;
- AxodusAPP still uses the local `MockGovernanceReadOnlyAdapter`;
- no `HttpGovernanceReadOnlyAdapter` or real backend client exists.

The next workflow step is REQUEST 21 backend transport boundary planning. Do not replace the local mock adapter with backend HTTP calls until route/controller implementation and AxodusAPP HTTP client behavior receive later approved gates.

REQUEST 21 planning status:

- Governance backend read-only transport boundary is planned, not implemented;
- future backend transport should remain a GET-only Koa delivery layer over `GovernanceReadModelQueryService`;
- initial future transport surfaces are tenant summary, proposal list, proposal detail, proposal timeline, decision history and emergency actions;
- audit trail and actor activity remain restricted/deferred;
- AxodusAPP still uses the local `MockGovernanceReadOnlyAdapter`;
- no `HttpGovernanceReadOnlyAdapter`, backend fetch, wallet writer, mutation or execution path is implemented.

The next workflow step is REQUEST 22 backend transport contract test planning. AxodusAPP HTTP adapter work must remain a separate future request after backend transport exists and is validated.

REQUEST 22 planning status:

- Governance backend transport contract test strategy is planned, not implemented in AxodusAPP;
- REQUEST 23 should implement backend-only pure/static route registry contract tests;
- AxodusAPP remains on the local `MockGovernanceReadOnlyAdapter`;
- no `HttpGovernanceReadOnlyAdapter`, backend fetch, wallet writer, mutation or execution path is implemented;
- real backend integration remains blocked until backend transport exists, tests pass and a separate AxodusAPP HTTP client gate is approved.

The next AxodusAPP-relevant workflow remains observation only. REQUEST 23 is backend-only and must not replace local mock read-only data with HTTP calls.
