# AxodusAPP State

## State Philosophy

State must remain predictable, modular, and separated by responsibility.

Avoid global uncontrolled state.

---

# Core State Categories

## Wallet State

Stores:

- connected account
- chain ID
- wallet provider
- connection status
- pending transactions

---

## DAO State

Stores:

- selected DAO
- DAO permissions
- DAO metadata
- federation data
- governance role

---

## UI State

Stores:

- sidebar visibility
- modal state
- theme
- notifications
- temporary interaction state

---

## Module State

Each module may maintain isolated operational state.

Avoid leaking module state globally.

---

## Server State

Server state should use query/cache systems.

Examples:

- proposals
- treasury balances
- campaigns
- products
- analytics

---

# State Rules

- separate local state from server state
- avoid duplicated state
- avoid stale wallet state
- validate chain state continuously
- invalidate cache after execution events

---

# Long-Term Goal

Create scalable ecosystem-wide state coordination without coupling all modules together.
