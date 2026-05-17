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

# Final Principle

Users must always understand:

- what they are doing
- where they are doing it
- who controls the action
- what the risks are
