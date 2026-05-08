# AxodusAPP Architecture

## Architectural Philosophy

AxodusAPP must be built as a modular frontend orchestration system.

The app should not hardcode each nucleus as isolated pages only.

Instead, it should use registries, layouts, route modules, permission systems, and shared state layers to coordinate the ecosystem.

---

## Core Architecture Goals

- scalable module architecture
- shared design system
- chain-aware state
- DAO-aware context
- wallet-native execution
- permission-aware navigation
- API-driven data loading
- protected routes
- extensible module registry
- future mobile compatibility

---

## Recommended Stack

Frontend:

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- TanStack Query
- Zustand or equivalent state manager
- Reown AppKit
- Ethers v6 or Viem
- Zod
- React Hook Form

Testing:

- Vitest
- React Testing Library
- Playwright

Quality:

- ESLint
- Prettier
- TypeScript strict mode

---

## Suggested Directory Structure

apps/axodus-app

src
- app
- components
- config
- contexts
- features
- hooks
- layouts
- modules
- pages
- routes
- services
- stores
- styles
- types
- utils

---

## Core Layers

### App Shell Layer

Responsible for:

- root layout
- navigation
- sidebar
- topbar
- mobile menu
- theme
- authenticated shell
- public shell

---

### Module Layer

Each nucleus should be represented as a module.

Example modules:

- governance
- defi
- acs
- academy
- business
- marketplace
- mining
- dex
- trading
- lottery
- bba

Each module should define:

- route metadata
- navigation metadata
- permissions
- feature flags
- required chains
- required APIs
- page components

---

### Wallet Layer

Responsible for:

- wallet connection
- account state
- chain state
- signature requests
- transaction preparation
- transaction status
- supported networks

---

### DAO Context Layer

Responsible for:

- selected DAO
- DAO permissions
- DAO treasury context
- DAO modules enabled
- DAO governance status
- DAO role-based access

---

### Data Layer

Responsible for:

- API clients
- contract reads
- indexing data
- caching
- loading states
- error states
- stale data handling

---

### Execution Layer

Responsible for:

- proposal execution
- transaction submission
- contract interaction
- action confirmation
- receipt tracking
- error recovery

---

### UI System Layer

Responsible for:

- shared components
- design tokens
- layout primitives
- cards
- tables
- forms
- modals
- alerts
- status indicators

---

## Module Registry Concept

AxodusAPP should maintain a central module registry.

Each module should declare:

- module ID
- display name
- description
- icon
- route base path
- required permissions
- visibility rules
- status
- navigation items
- component entrypoints

This allows the app to scale without creating chaotic navigation logic.

---

## Route Philosophy

Routes should be organized by user intent.

Examples:

- dashboard
- governance
- treasury
- academy
- marketplace
- acs
- trading
- dex
- mining
- lottery
- business
- settings

Protected routes must require wallet connection.

Sensitive routes may require DAO role or permission.

---

## State Philosophy

State should be separated into:

- wallet state
- session state
- DAO context state
- chain context state
- UI state
- module state
- server/cache state

Avoid mixing server data with local UI state.

---

## API Philosophy

AxodusAPP should not directly depend on one backend forever.

It should consume APIs through service clients.

Service clients should support:

- Governance API
- Defi API
- ACS API
- Marketplace API
- Academy API
- Mining API
- Trading API
- Dex API
- Lottery API
- Business API

---

## Long-Term Architecture Goal

AxodusAPP should become a modular ecosystem shell where new Axodus nuclei can be added as first-class modules without rewriting the application core.
