# AxodusAPP Routing

## Routing Philosophy

Routing should reflect user intent and ecosystem structure.

Routes should remain:

- modular
- scalable
- protected when necessary
- permission-aware
- chain-aware

---

# Public Routes

Examples:

- /
- /connect
- /governance
- /academy
- /marketplace
- /docs

---

# Protected Routes

Examples:

- /dashboard
- /governance/console
- /governance/proposals/:proposalId
- /treasury
- /acs
- /trading
- /mining
- /lottery
- /settings

Protected routes require wallet connection.

---

# DAO-Aware Routes

Examples:

- /dao/:daoId/governance
- /dao/:daoId/treasury
- /dao/:daoId/proposals

These routes require DAO context validation.

---

# Module Routing

Each module should own:

- route namespace
- nested routes
- navigation metadata
- permissions

---

# Route Metadata

Routes should support metadata such as:

- requiresWallet
- requiresDAO
- requiredPermissions
- supportedChains
- featureFlags
- pageTitle
- navigationLabel

---

# Fallback Routes

The app should support:

- 404 pages
- maintenance pages
- permission denied pages
- unsupported chain pages

---

# Long-Term Goal

Routing should remain extensible enough to onboard future Axodus nuclei without restructuring the entire app.
