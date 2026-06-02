# AxodusAPP Security

## Security Philosophy

AxodusAPP is the operational interface for the entire ecosystem.

Frontend failures may create:

- treasury risk
- governance risk
- user confusion
- execution mistakes
- permission abuse
- phishing vectors

Security must be treated as core infrastructure.

---

# Core Security Principles

- explicit execution visibility
- wallet-native transparency
- permission-aware rendering
- chain-aware interaction
- DAO-aware interaction
- safe defaults
- auditability

---

# Wallet Security

The app must always display:

- connected wallet
- active chain
- active DAO context
- pending transactions
- required permissions

Users must never be uncertain about execution context.

---

# Transaction Security

Before transactions:

- explain action clearly
- explain financial implications
- explain governance implications
- validate chain
- validate permissions
- display estimated costs

---

# Governance Guardrail Security

Governance restrictions must be expressed as Constitutional Guardrails, not opaque automatic exclusion systems.

The app must expose transparent reason codes when a governance action is:

- blocked
- warned
- degraded
- delayed
- routed to review

Reason codes should be stable enough for UI, backend, SDK, indexer, and future agent consumption.

The UI should explain whether a restriction comes from:

- Constitutional Governance
- Local Governance
- chain capability
- plugin capability
- treasury policy
- execution status
- indexer readiness
- wallet or DAO permission state

Local Governance may use different governance assets or models, but the app must clearly indicate whether the local model is constitutionally compatible.

---

# Protected Routes

Sensitive routes must require:

- wallet connection
- DAO permissions where applicable
- chain compatibility
- feature access validation

---

# Frontend Attack Risks

Potential risks:

- phishing UI
- transaction spoofing
- stale execution state
- malicious wallet prompts
- hidden execution payloads
- state desynchronization

Mitigation:

- explicit confirmations
- verified transaction previews
- state synchronization
- transaction receipts
- chain validation

---

# ACS Security

ACS interfaces must expose:

- execution source
- task ownership
- telemetry visibility
- permission scope

ACS agents must never appear as sovereign authorities.

---

# API Security

API interactions must:

- validate auth state
- validate DAO context
- validate chain context
- validate permissions
- sanitize responses

---

# UI Security

Avoid:

- hidden state transitions
- misleading balances
- unclear treasury actions
- deceptive UI flows
- unsafe defaults

---

# Emergency Systems

The app should support:

- maintenance mode
- emergency banners
- module shutdown visibility
- degraded service warnings
- governance emergency notices

---

# Governance Read-Only Integration Security

The REQUEST 17 plan authorizes only future frontend-local/mock/read-only Governance rendering.

REQUEST 18 must not:

- call Governance backend HTTP APIs
- create proposal mutation paths
- cast votes
- record reviews or approvals
- record decisions
- trigger execution
- invoke wallet signing
- invoke transaction adapters
- move treasury funds
- perform on-chain writes
- expose raw evidence, sensitive risk notes, permission context, private actor identity or internal correlation IDs

Every Governance read-only surface must label:

- local/mock data source
- read-only status
- freshness state
- proposal execution disabled
- treasury execution disabled
- wallet signing disabled

AxodusAPP must remain an integration shell. Governance remains the authority boundary.

REQUEST 18 implementation status:

- local/mock/read-only Governance rendering is implemented;
- adapter and hooks expose read-only methods only;
- `/governance/proposals/:proposalId` is a read-only display route;
- backend HTTP integration remains not implemented;
- wallet signing, transaction adapters, proposal execution, treasury execution and on-chain writes remain disabled.

REQUEST 19 planning status:

- Governance backend read-only API boundary is planned;
- current AxodusAPP adapter remains local/mock/read-only;
- future HTTP adapter must preserve the read-only interface;
- initial future HTTP consumption is limited to tenant summary, proposal list, proposal detail and emergency actions;
- audit trail and actor activity remain restricted/deferred;
- no real Governance backend client is implemented;
- no mutation, wallet signing, treasury execution or on-chain flow is implemented.

Before any real backend integration, backend contract types, route/controller gates, authorization behavior and AxodusAPP HTTP client behavior must be separately approved.

---

# Final Principle

Users must always understand:

- what they are doing
- where they are doing it
- who controls the action
- what the risks are
