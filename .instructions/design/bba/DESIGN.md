# BBA Agency Design System & UX Specification

## Vision

BBA Agency is the operational execution nucleus of the Axodus ecosystem.

It must feel like:

- institutional digital agency
- DAO-native operations firm
- execution and delivery workspace
- governance-aware consultancy
- infrastructure deployment center
- transparent operational SaaS

The experience must communicate:

- legitimacy
- execution capability
- operational maturity
- governance traceability
- delivery transparency
- technical intelligence

BBA is not:

- a freelancer marketplace
- a Web3 meme studio
- a marketing landing page
- a crypto launchpad
- a speculative dashboard

The visual identity must resemble:

- enterprise PM platforms
- infrastructure dashboards
- delivery operation systems
- institutional consulting workspaces

Reference feeling:

- Linear
- Vercel
- Notion Enterprise
- Stripe Dashboard
- Datadog
- Safe Global
- Atlassian
- Aragon

Base visual system must follow the Axodus global design tokens and architecture defined in:

- `Global.css`
- `tokens.css`
- `tailwindcss.css`

---

## Core Product Identity

BBA Agency acts as:

- operational DAO
- development agency
- infrastructure provider
- governance implementation partner
- execution and deployment operator
- treasury-funded execution arm
- constitutional-compliant service provider

The product must support:

- DAO client onboarding
- delivery lifecycle management
- project execution
- milestone governance
- treasury-linked billing
- infrastructure deployment
- ACS-assisted operations
- AI-assisted analysis
- constitutional compliance validation

---

## UX Philosophy

The experience must prioritize:

- operational visibility
- execution clarity
- milestone tracking
- delivery legitimacy
- governance transparency
- treasury accountability
- technical auditability

Every screen should answer:

- what is being executed
- who is responsible
- what DAO owns it
- what treasury funds it
- what stage it is in
- what risks exist
- what governance state exists

---

## Layout Philosophy

BBA should use:

- dense operational layouts
- horizontal information flows
- contextual side panels
- execution timelines
- infrastructure cards
- governance-aware tables
- milestone-based interfaces
- split-panel workspaces

Avoid:

- oversized hero sections
- oversized marketing typography
- giant empty spaces
- landing-page aesthetics
- excessive gradients
- crypto neon visuals

Preferred layout model:

- command-center UI
- operational workspace
- execution cockpit
- delivery management platform

---

## Visual Language

### Primary Colors

Use official Axodus tokens:

```css
--color-bg: #0b1326;
--color-surface-primary: #1e2636;
--color-surface-secondary: #2d3449;
--color-accent: #5cc6d0;
--color-success: #41e4b8;
--color-warning: #ffb783;
--color-error: #ff7f7a;
```

---

## Typography

Official typography:

- Inter
- JetBrains Mono

JetBrains Mono should be used for:

- hashes
- wallet addresses
- proposal IDs
- deployment IDs
- treasury values
- timestamps
- execution receipts
- technical metadata
- runtime logs

Typography should feel:

- compact
- professional
- infrastructure-oriented
- operational

Avoid:

- oversized headlines
- excessive font-weight contrast
- flashy typography

---

## Component Direction

### Cards

Cards should behave like operational modules.

Use:

- `glass-card`
- `glass-panel`
- `ghost-border`
- surface-primary backgrounds

Cards should contain:

- status
- metadata
- execution context
- DAO ownership
- timestamps
- operational actions

Avoid decorative cards.

---

## Dashboard Philosophy

The BBA dashboard should resemble:

- agency operations center
- deployment management console
- DAO execution cockpit

Primary dashboard sections:

### Executive Overview

Contains:

- active projects
- treasury exposure
- operational health
- execution queues
- governance warnings
- deployment metrics
- ACS analysis status

### Active Engagements

Operational table showing:

- client DAO
- project type
- execution stage
- governance standing
- milestone progress
- risk level
- delivery health
- treasury status

### Treasury & Billing

Must expose:

- incoming payments
- milestone payouts
- escrow state
- treasury allocations
- locked funds
- DAO funding origin
- execution budget status

Treasury visibility is mandatory.

### ACS / AI Operations

Dedicated operational section for:

- AI reviews
- automated audits
- execution diagnostics
- governance analysis
- technical validation
- risk scoring
- runtime recommendations

This area should feel:

- analytical
- infrastructure-native
- operationally intelligent

---

## Official Status System

Projects, clients, or DAOs should expose statuses such as:

```txt
planning
reviewing
approved
executing
blocked
delayed
under-audit
completed
archived
```

Severity indicators:

```txt
info
warning
critical
```

---

## Governance Integration

Governance must be visible everywhere.

Every project should expose:

- constitutional compliance
- DAO ownership
- operational permissions
- proposal references
- treasury legitimacy
- execution authority
- plugin dependencies

BBA is not merely a project manager.

It is a governance-native operational executor.

---

## DAO Federation UX

Projects should visibly belong to:

- Root DAO
- Product DAO
- Partner DAO
- Client DAO

Federation hierarchy must be visible in:

- headers
- side panels
- project metadata
- execution details

Recommended component:

- DAO hierarchy breadcrumb
- federation topology tree
- constitutional status badges

---

## Pages Structure

Recommended routes:

```txt
/bba
/bba/operations
/bba/projects
/bba/projects/:projectId
/bba/clients
/bba/treasury
/bba/governance
/bba/acs
/bba/infrastructure
/bba/deployments
/bba/workflows
/bba/audits
/bba/reports
```

Existing MVP route names may differ. Preserve current route compatibility unless a routing migration is explicitly requested.

---

## Projects Page

The Projects page should resemble:

- enterprise PM software
- DAO delivery center
- operational execution matrix

Must include:

- Kanban mode
- execution timeline
- milestone tracking
- treasury allocation
- governance status
- ACS insights
- runtime logs
- deployment history

---

## Project Details

Project detail pages should contain:

### Project Header

- project name
- client DAO
- governance standing
- treasury state
- operational status
- assigned teams
- constitutional compliance

### Milestone Timeline

Operational timeline showing:

- phases
- approvals
- deployment stages
- audits
- treasury releases
- governance checkpoints

### Treasury Panel

Must expose:

- budget allocation
- spent amount
- escrow state
- pending payouts
- DAO treasury source
- operational costs

### Technical Operations

Contains:

- deployments
- infrastructure
- plugin dependencies
- runtime environments
- execution chains
- operational logs

### Governance & Audit

Contains:

- proposal references
- constitutional warnings
- audit trail
- execution permissions
- ACS validations

---

## ACS Integration

ACS should feel like:

- operational intelligence layer
- AI execution assistant
- governance analysis engine
- runtime diagnostics center

Avoid chatbot-centric UX.

Instead use:

- operational panels
- diagnostics feeds
- recommendation streams
- execution summaries
- audit indicators

---

## Infrastructure UX

Infrastructure pages should resemble:

- cloud operations platforms
- CI/CD dashboards
- deployment infrastructure tools

Must expose:

- runtime health
- deployment status
- chain integrations
- plugin state
- execution environments
- operational incidents

---

## Tables

Tables are first-class citizens.

Use dense operational tables with:

- sticky headers
- inline status badges
- sortable columns
- governance indicators
- treasury indicators
- chain indicators
- quick actions

Avoid oversized row heights.

---

## Mobile UX

Mobile priorities:

- project status
- operational alerts
- treasury overview
- governance warnings
- milestone approvals
- ACS recommendations

Mobile should feel like:

- executive operational monitoring
- not full desktop replacement

---

## Animation Rules

Animations must remain subtle.

Allowed:

- hover elevation
- opacity transitions
- contextual panel transitions
- operational pulse indicators
- status animations

Avoid:

- flashy motion
- heavy glow
- exaggerated transitions
- speculative crypto effects

---

## Data Architecture

BBA must follow mock-first architecture.

Recommended structure:

```txt
src/modules/bba/
  components/
  pages/
  hooks/
  services/
  store/
  types/
  utils/
  mock/
```

Canonical mock source:

```txt
src/data/mock/bba.mock.js
```

---

## Recommended Shared Components

### Operational

- `StatusBadge`
- `GovernanceBadge`
- `TreasuryCard`
- `ExecutionTimeline`
- `MilestonePanel`
- `RuntimeFeed`
- `DeploymentCard`
- `ACSInsightPanel`
- `DAOHierarchyTree`
- `TreasuryHealthIndicator`

### Data Visualization

Use Recharts for:

- treasury allocation
- operational throughput
- delivery velocity
- execution timelines
- risk exposure
- governance activity
- ACS scoring

Charts must be:

- minimal
- infrastructure-oriented
- analytical
- readable

Avoid:

- trading-style charts
- speculative chart aesthetics

---

## Final Experience Goal

BBA Agency must feel like:

```txt
Federated Governance-Native Operational Agency
```

And ultimately evolve into:

```txt
Economic Infrastructure Delivery Operating System
```
