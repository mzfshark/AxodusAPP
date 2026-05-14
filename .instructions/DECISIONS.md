# AxodusAPP Decisions

## Decision 1 — AxodusAPP Is the Ecosystem Orchestrator

AxodusAPP is the unified interface where all Axodus nuclei are accessed.

It is not a single-purpose dashboard.

Reasoning:

The Axodus ecosystem requires a coherent user experience across governance, finance, AI, education, marketplace, liquidity, mining, trading, rewards, and communication.

---

## Decision 2 — Modules Must Be Registry-Driven

Modules should be registered through metadata rather than hardcoded navigation only.

Reasoning:

The ecosystem will continue growing, and the frontend must remain extensible.

---

## Decision 3 — Governance Comes First

The Governance module should be the first deep integration.

Reasoning:

Governance defines permissions, DAO context, execution authority, and ecosystem legitimacy.

---

## Decision 4 — Wallet and DAO Context Are Core State

The app must always understand:

- connected wallet
- selected chain
- selected DAO
- active permissions

Reasoning:

Most user actions depend on account, network, and DAO context.

---

## Decision 5 — AxodusAPP Does Not Own Protocol Logic

Business logic should remain in contracts, APIs, services, and nuclei.

AxodusAPP coordinates interaction and visibility.

Reasoning:

Frontend logic must not become the hidden authority of the protocol.

---

## Decision 6 — Progressive Disclosure Is Required

The app should not overwhelm users with all complexity at once.

Reasoning:

Axodus is complex. The interface must guide users by role, context, and intent.

---

## Decision 7 — Security UX Is Mandatory

Transactions, signatures, treasury actions, proposal execution, and governance operations must be clearly explained before user confirmation.

Reasoning:

Bad UX can create financial and governance risk.

---

## Decision 8 — Mobile Responsiveness Is Required

AxodusAPP must be usable on desktop and mobile.

Reasoning:

DAO participation, education, and ecosystem access should not be desktop-only.

---

## Decision 9 — Use Mock Data Before Full Backend Readiness

The app may use typed mock data during early development.

Reasoning:

Frontend structure can progress while contracts and services mature.

Mocks must be clearly separated from production clients.

---

## Decision 10 — Official App Path

The frontend app workspace should be:

Axodus/AxodusAPP

Reasoning:

This app is the central interface and deserves its own workspace-level instructions.

---

## Decision 11 — Axodus Governance Has Two Governance Nuclei

Axodus Governance has two distinct governance nuclei:

1. Constitutional Governance, powered by `$Neurons`.
2. Local Governance, controlled by each federated startup, DAO, company, product, or community.

The Constitutional Governance layer defines federal standards, capabilities, conditions, guardrails, and ecosystem-wide legitimacy.

The Local Governance layer may use `$Neurons`, local tokens, auto-generated platform tokens, multisigs, gauges, reputation systems, NFT governance, or plugin-defined models.

All ecosystem DAOs should be modeled as federated local governance contexts inside the Axodus constitutional federation.

Sub-DAOs may preserve local strategic and operational autonomy, but they must remain constitutionally compatible with Axodus standards, treasury policies, execution guardrails, and ecosystem permissions.

Reasoning:

Each sub-DAO represents an ecosystem company, investment agency, product unit, community, or operating organization. Autonomy is useful for execution, but Constitutional Governance preserves ecosystem integrity, policy consistency, and constitutional accountability.

The app must not frame local autonomy as sovereignty outside the Axodus constitutional model.

---

## Decision 12 — Harmony Governance Is Not Axodus Governance

Harmony Governance should not be highlighted as part of Axodus Governance.

It is a Business product delivered by Axodus for Harmony, not a sovereign component of the Axodus governance federation.

Reasoning:

The Axodus app should present Axodus-native governance. External client products may remain accessible through their own product surfaces, but they must not be framed as Axodus federal governance.

---

## Decision 13 — Constitutional Guardrails Require Transparent Reason Codes

AxodusAPP must not use opaque automatic exclusion language or hidden blocking behavior.

Restricted governance actions should be presented as **Constitutional Guardrails** with transparent reason codes.

Reason codes should explain why an action is blocked, warned, degraded, delayed, or requires review.

Examples:

- `CHAIN_NOT_CONSTITUTIONALLY_ENABLED`
- `PLUGIN_CAPABILITY_NOT_REGISTERED`
- `LOCAL_GOVERNANCE_MODEL_INCOMPATIBLE`
- `TREASURY_POLICY_REQUIRES_REVIEW`
- `EXECUTION_CHAIN_NOT_AUTHORIZED`
- `VOTING_POWER_SOURCE_NOT_VERIFIED`
- `INDEXER_STATE_NOT_READY`
- `REMOTE_EXECUTION_GUARDRAIL_ACTIVE`
- `AGENT_PERMISSION_SCOPE_EXCEEDED`

Reasoning:

Governance restrictions must be auditable and understandable by users, operators, SDKs, indexers, and future AI agents.
