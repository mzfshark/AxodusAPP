# Axodus Business Design System & UX Specification

## Vision

Business is the operational execution nucleus of the Axodus ecosystem.

It is not a freelancer dashboard, startup CRM, or generic Web3 agency interface.

Business must feel like:

- sovereign infrastructure operations
- enterprise execution governance
- DAO-native delivery management
- institutional service orchestration
- transparent execution pipelines
- governance-backed project operations

The nucleus exists to transform DAO requests, partner demands, and ecosystem execution into structured operational workflows.

The experience should resemble:

- Linear
- Datadog
- GitLab Operations
- Safe Global
- enterprise PMO systems
- cloud operations consoles

Not:

- Upwork clones
- freelancer marketplaces
- crypto agency landing pages
- NFT studios
- neon-heavy dashboards

---

## Core Business Philosophy

Business is the execution layer of the federation.

It acts as:

- infrastructure provider
- DAO implementation operator
- technical execution office
- delivery governance engine
- service orchestration layer
- institutional builder

Business must support:

- Axodus internal products
- partner DAOs
- sovereign tenant DAOs
- enterprise clients
- government or institutional entities
- external ecosystem integrations

---

## Operational Model

The Business nucleus must operate through:

```txt
Request
-> Technical Review
-> ACS / AI Validation
-> Governance Assessment
-> Treasury Approval
-> Execution Pipeline
-> Delivery Monitoring
-> Milestone Validation
-> Finalization
```

Every project is an operational entity.

Every execution has:

- governance context
- treasury visibility
- execution status
- milestone validation
- operational accountability
- auditability

---

## Visual Identity

The visual language must prioritize:

- operational density
- execution clarity
- enterprise legitimacy
- infrastructure aesthetics
- governance visibility
- delivery transparency

The interface must feel:

- serious
- modular
- procedural
- infrastructure-native
- auditable

---

## Official Design Tokens

Use the existing Axodus token system from:

- `Global.css`
- `tokens.css`
- `tailwindcss.css`

Official foundation colors:

```css
--color-bg: #0b1326;
--color-surface-primary: #1e2636;
--color-surface-secondary: #2d3449;
--color-accent: #5cc6d0;
--color-success: #41e4b8;
--color-warning: #ffb783;
--color-error: #ff7f7a;
```

Typography rules inherited from Axodus core:

- Inter
- JetBrains Mono

JetBrains Mono should be heavily used for:

- proposal IDs
- execution hashes
- project identifiers
- treasury values
- deployment references
- DAO references
- chain identifiers
- milestone signatures

---

## UI Philosophy

Business interfaces must emphasize:

- execution state
- milestone progression
- DAO ownership
- treasury exposure
- governance standing
- operational risks
- delivery pipelines
- service accountability

Avoid:

- giant hero sections
- oversized cards
- excessive whitespace
- glossy marketing visuals
- speculative crypto aesthetics

Prefer:

- operational grids
- split panels
- stacked timelines
- dense metrics
- execution feeds
- contextual side panels
- modular dashboards

---

## Navigation Structure

Suggested Business navigation:

```txt
/business
/business/projects
/business/pipelines
/business/governance
/business/treasury
/business/clients
/business/daos
/business/acs
/business/contracts
/business/deployments
/business/reports
/business/workflows
/business/settings
```

Existing MVP route names may differ. Preserve current route compatibility unless a routing migration is explicitly requested.

---

## Primary UX Surfaces

### Business Overview

Main operational dashboard.

Should expose:

- active projects
- execution queues
- treasury allocation
- deployment status
- ACS validation queue
- governance alerts
- DAO activity
- operational throughput
- execution SLA metrics

Layout should resemble:

- cloud infrastructure dashboard
- enterprise PMO
- CI/CD operations center

### Project Workspace

Each project behaves like an operational tenant.

Project workspace must include:

- project identity
- linked DAO
- treasury state
- execution timeline
- milestone system
- ACS analysis
- deployment history
- governance permissions
- delivery health
- proposal linkage

Suggested structure:

```txt
Header
├── Project Metadata
├── Governance Status
├── Treasury State
├── Operational Health

Main Workspace
├── Milestones
├── Tasks
├── Execution Queue
├── Deployment Timeline
├── ACS Analysis
├── Treasury Consumption
├── Reports
```

---

## ACS Integration

ACS is a first-class operational system.

Business must integrate:

- AI technical review
- security scanning
- execution risk analysis
- governance compliance analysis
- deployment validation
- delivery anomaly detection

ACS panels should feel:

- technical
- infrastructure-native
- operational
- machine-assisted

Not chatbot-like.

---

## Treasury UX

Treasury visibility is mandatory.

Business treasury surfaces must expose:

- allocated budgets
- DAO treasury source
- escrow state
- milestone release state
- operational burn rate
- execution cost
- multi-chain treasury distribution
- contractor allocation
- deployment expenses

Treasury panels should always remain visible within operational flows.

---

## Governance UX

Governance context must always exist.

Expose:

- constitutional status
- local governance status
- execution permissions
- approval history
- DAO federation tier
- operational restrictions
- compliance warnings

Official statuses:

```txt
compliant
restricted
under-review
sanctioned
suspended
```

Severity levels:

```txt
info
warning
critical
```

Reason examples:

```txt
treasury-risk
plugin-risk
governance-mismatch
execution-delay
constitutional-violation
```

---

## Pipeline Design

Execution pipelines are critical.

Pipelines should resemble:

- CI/CD infrastructure
- DevOps execution boards
- deployment orchestration systems

Each pipeline stage should expose:

- execution owner
- status
- dependencies
- chain context
- ACS validation
- governance approvals
- treasury allocation
- timestamps
- rollback state

---

## Marketplace & Service Requests

Business must support service acquisition flows.

It must not resemble freelance marketplaces.

Requests should feel like:

- institutional procurement
- governance requests
- DAO operational proposals
- infrastructure requisitions

Avoid:

- "hire freelancer" flows
- profile-first UX
- rating-first UX

Prefer:

- capability matrices
- governance-approved providers
- operational SLAs
- delivery guarantees
- DAO validation

---

## DAO Federation UX

Business must deeply expose federation topology.

Every project should clearly show:

```txt
Root DAO
↓
Product DAO
↓
Partner DAO
↓
Client DAO
↓
Operational Project
```

DAO hierarchy visibility is mandatory.

---

## Multi-Chain Visualization

Business is multi-chain aware.

Expose:

- deployment chain
- treasury chain
- execution chain
- governance chain
- validation chain

Chain context should appear throughout the interface.

---

## Component Rules

Components should feel:

- operational
- procedural
- infrastructure-native
- governance-aware
- dense but readable

Preferred components:

- execution timelines
- milestone boards
- treasury monitors
- governance badges
- deployment logs
- ACS validation panels
- chain topology maps
- operational alerts
- workflow graphs

---

## Data Visualization

Preferred chart styles:

- treasury allocation charts
- operational throughput
- deployment frequency
- execution timelines
- milestone completion
- DAO dependency graphs
- chain activity

Charts must remain:

- subtle
- minimal
- analytical
- enterprise-grade

Avoid flashy gradients and trading-style visualizations.

---

## Mobile Experience

Mobile priorities:

- milestone tracking
- governance approvals
- treasury monitoring
- ACS alerts
- deployment notifications
- execution confirmations
- DAO switching

Mobile should prioritize operational continuity.

---

## Animation Rules

Allowed:

- panel transitions
- hover elevation
- execution indicators
- subtle topology transitions
- operational pulse indicators

Avoid:

- excessive glow
- floating particles
- flashy motion
- casino-style transitions

Existing Axodus visual constraints must remain respected.

---

## Frontend Architecture

Recommended structure:

```txt
src/modules/business/
  components/
  pages/
  hooks/
  services/
  store/
  types/
  utils/
  mock/
```

Mock-first architecture is mandatory.

Canonical mock location:

```txt
src/data/mock/
```

---

## Recommended Pages

### Public

```txt
/business
/business/services
/business/partners
/business/capabilities
```

### Operational

```txt
/business/projects
/business/pipelines
/business/governance
/business/treasury
/business/contracts
/business/deployments
/business/acs
/business/reports
```

Existing MVP routes may still use `/account`. Preserve compatibility unless a routing migration is explicitly requested.

---

## Final UX Goal

Business should ultimately feel like:

```txt
Federated Infrastructure Operations Platform
```

Not:

```txt
Crypto Freelancer Marketplace
```
