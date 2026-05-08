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
