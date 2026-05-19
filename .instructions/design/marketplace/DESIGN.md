# Axodus Marketplace Design System & UX Specification

## Overview

The Marketplace nucleus is the commercial and operational exchange layer of the Axodus ecosystem.

It is not a generic NFT marketplace or speculative crypto bazaar.

Marketplace must function as:

- federated commerce infrastructure
- DAO-native operational marketplace
- governance-aware service exchange
- institutional asset and execution registry
- ecosystem procurement and distribution layer

The experience must feel closer to:

- Stripe Marketplace
- AWS Marketplace
- Linear issue marketplace
- enterprise procurement systems
- SaaS operational exchanges

Not:

- OpenSea clones
- meme NFT stores
- casino marketplaces
- speculative token trading interfaces

The Marketplace must integrate deeply with:

- Governance
- Treasury
- Business
- Academy
- Trading
- ACS
- Vault
- multi-chain execution systems

---

## Core Marketplace Philosophy

Marketplace is an operational economy layer.

Its role is to coordinate:

- products
- services
- DAO offerings
- educational assets
- infrastructure plugins
- governance modules
- execution subscriptions
- digital operational assets

Marketplace is treasury-aware and governance-aware at all times.

Every listing should expose:

- treasury destination
- DAO ownership
- governance standing
- operational legitimacy
- execution scope
- compliance visibility

---

## Marketplace Entity Model

Marketplace supports multiple asset classes.

### Marketplace Categories

#### Infrastructure

Examples:

- DAO plugins
- governance modules
- treasury tools
- execution adapters
- ACS agents
- multi-chain bridges
- RPC services

#### Services

Examples:

- development services
- audits
- consulting
- DAO operations
- treasury management
- governance implementation

#### Digital Assets

Examples:

- licenses
- operational NFTs
- access passes
- governance credentials
- vouchers
- memberships

#### Educational Assets

Examples:

- Academy courses
- certifications
- DAO learning paths
- premium educational modules

#### Trading Products

Examples:

- strategy access
- signal infrastructure
- analytics
- execution subscriptions

---

## Marketplace Architecture

Recommended structure:

```txt
src/modules/marketplace/
  components/
  pages/
  hooks/
  services/
  store/
  types/
  utils/
  mock/
```

Canonical mocks:

```txt
src/data/mock/marketplace.mock.js
```

Marketplace must be fully mock-driven during MVP.

Do not hardcode datasets inside components.

---

## UX Direction

Marketplace must prioritize:

- operational clarity
- legitimacy
- trust
- governance visibility
- treasury transparency
- execution status

Avoid:

- giant banners
- speculative hype sections
- token price obsession
- noisy animations
- neon-heavy cards
- "pump" aesthetics

Use:

- dense layouts
- modular cards
- operational tables
- governance metadata
- treasury indicators
- execution status panels

---

## Visual Identity

Marketplace must follow the global Axodus design system.

Official tokens:

- Background: `#0b1326`
- Surface Primary: `#1e2636`
- Surface Secondary: `#2d3449`
- Accent: `#5cc6d0`
- Success: `#41e4b8`
- Warning: `#ffb783`
- Error: `#ff7f7a`

Typography:

- Inter
- JetBrains Mono

Use JetBrains Mono for:

- asset IDs
- hashes
- transaction references
- treasury values
- chain identifiers
- listing references

---

## Marketplace Navigation Structure

### Public Routes

```txt
/marketplace
/marketplace/explore
/marketplace/listings
/marketplace/services
/marketplace/infrastructure
/marketplace/academy
/marketplace/trading
/marketplace/dao
/marketplace/vendors
/marketplace/asset/:id
```

### Protected Routes

```txt
/marketplace/console
/marketplace/treasury
/marketplace/orders
/marketplace/subscriptions
/marketplace/publisher
/marketplace/governance
/marketplace/analytics
/marketplace/disputes
```

Existing MVP route names may differ. Preserve current route compatibility unless a routing migration is explicitly requested.

---

## Core Layout

Marketplace should use operational dashboard composition.

### Recommended Structure

Topbar:

- DAO selector
- search
- treasury indicator
- governance alerts
- execution notifications

Left Sidebar:

- marketplace sections
- DAO filters
- categories
- treasury tools
- publisher tools

Main Content:

- listing feeds
- operational metrics
- treasury data
- governance panels
- analytics

Right Context Panel:

- governance standing
- treasury destination
- execution chain
- asset verification
- ACS analysis
- compliance warnings

---

## Marketplace Listing Cards

Listing cards must expose operational metadata immediately.

### Required Metadata

- title
- DAO owner
- governance status
- treasury destination
- chain
- asset category
- execution type
- subscription status
- operational risk level
- ACS validation state

### Visual Style

Cards should resemble:

- infrastructure service panels
- operational modules
- enterprise SaaS cards

Avoid:

- giant thumbnails
- excessive artwork
- NFT-first composition

The metadata layer is more important than imagery.

---

## DAO Commerce Model

Marketplace must support DAO-native commerce.

A listing may belong to:

- Root DAO
- Product DAO
- Partner DAO
- Tenant DAO
- sovereign organizations

Each DAO profile should expose:

- governance standing
- treasury health
- execution metrics
- operational reputation
- constitutional compliance

---

## Treasury Visibility

Treasury is first-class.

Marketplace pages must expose:

- treasury destination
- revenue distribution
- operational fees
- DAO allocation
- royalty distribution
- escrow status
- multi-chain settlement

Treasury panels should visually resemble:

- financial operations systems
- accounting dashboards
- execution settlement infrastructure

---

## Governance Integration

Marketplace is governance-native.

Listings may have:

- governance restrictions
- DAO validation
- constitutional requirements
- operational sanctions
- treasury risk flags

Supported statuses:

- compliant
- restricted
- under-review
- sanctioned
- suspended

Severity levels:

- info
- warning
- critical

Reason code examples:

- treasury-risk
- plugin-risk
- governance-mismatch
- execution-delay
- constitutional-violation

---

## Multi-Chain Support

Marketplace must support:

- execution chains
- treasury chains
- spoke chains
- settlement chains
- chain-specific plugins

Every listing may expose:

- supported chains
- treasury chain
- execution chain
- settlement route
- gas estimation
- operational latency

---

## ACS Integration

Marketplace integrates deeply with ACS.

ACS can provide:

- risk analysis
- automated validation
- execution scoring
- vendor trust scoring
- operational anomaly detection
- governance monitoring

ACS panels should feel:

- operational
- institutional
- analytical

Avoid AI chatbot aesthetics.

---

## Marketplace Analytics

Analytics should emphasize operations.

Important metrics:

- treasury flow
- subscriptions
- execution volume
- DAO participation
- governance reputation
- operational uptime
- settlement activity
- cross-chain metrics

Charts must follow minimal operational style.

Use:

- Recharts
- muted visual hierarchy
- low-noise dashboards

Avoid:

- trading-view clone visuals
- speculative candle obsession

---

## Publisher Console

Publisher Console must feel like:

- SaaS vendor console
- DAO operations center
- infrastructure deployment manager

Features:

- listing management
- treasury routing
- governance validation
- ACS validation
- subscriptions
- analytics
- operational logs
- execution monitoring

---

## Marketplace Search

Search is operational-first.

Search must support:

- DAO filtering
- governance standing
- chain support
- asset type
- treasury model
- execution compatibility
- constitutional compliance
- ACS validation

---

## Marketplace Mobile UX

Mobile priorities:

- governance visibility
- listing browsing
- treasury transparency
- DAO switching
- subscriptions
- operational alerts

Avoid:

- oversized cards
- cluttered tables
- excessive nested navigation

---

## Design Language

Marketplace must visually resemble:

- infrastructure control systems
- operational SaaS
- cloud marketplaces
- governance workspaces

The nucleus must feel:

```txt
Economic Infrastructure Marketplace
```

Not:

```txt
Crypto NFT Marketplace
```

---

## Component Recommendations

### Core Components

- `MarketplaceShell`
- `MarketplaceSidebar`
- `MarketplaceHeader`
- `ListingCard`
- `DAOProfilePanel`
- `TreasuryPanel`
- `GovernanceStandingBadge`
- `RiskIndicator`
- `ExecutionStatusPanel`
- `SettlementPanel`
- `PublisherConsole`
- `SubscriptionCard`
- `ACSValidationPanel`
- `MarketplaceAnalyticsPanel`
- `ChainCompatibilityPanel`

---

## Data Layer

Mock-driven architecture required.

Canonical file:

```txt
src/data/mock/marketplace.mock.js
```

Recommended mock entities:

- listings
- subscriptions
- DAO vendors
- treasury routes
- governance statuses
- chain registries
- ACS validations
- operational metrics
- settlement history
- execution queues
- dispute records

---

## Animation Rules

Allowed:

- subtle hover transitions
- operational status updates
- lightweight panel transitions
- topology transitions

Avoid:

- flashy animations
- glow-heavy motion
- spinning NFTs
- speculative visual effects

---

## Final Product Feeling

Marketplace must ultimately feel like:

```txt
Operational DAO Commerce Infrastructure
```

Not:

```txt
Speculative Crypto Marketplace
```
