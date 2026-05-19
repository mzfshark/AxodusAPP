# Axodus Mining Design System & UX Specification

## Purpose

The Mining nucleus must present mining as operational infrastructure, not speculation.

It should feel like:

- compute-backed economic infrastructure
- treasury-connected production system
- auditable yield engine
- DAO-governed mining operation
- institutional mining workspace

Avoid:

- casino visuals
- hype dashboards
- "get rich mining" language
- neon-heavy crypto visuals
- oversized hero sections
- speculative APR-first UX
- animated coins or mining gimmicks

---

## Product Positioning

Axodus Mining is a governed infrastructure nucleus where DAOs can observe, allocate, validate, and monitor mining-related production.

Mining is not a simple rewards page.

It is an infrastructure operation connected to:

- treasury
- governance
- compute capacity
- energy cost
- hardware lifecycle
- operational execution
- DAO ownership
- risk monitoring

The interface must communicate that mining output is part of the ecosystem economic infrastructure.

---

## Core UX Principle

The main question the interface must answer is:

```txt
Is this mining operation healthy, productive, auditable, and aligned with DAO rules?
```

Every major page should expose at least one of:

- production output
- operational cost
- uptime
- hashpower
- treasury inflow
- energy efficiency
- fleet health
- governance status
- execution queue
- risk status

---

## Visual Identity

Use the existing Axodus design system.

Primary tokens:

- Background: `--color-bg`
- Soft background: `--color-bg-soft`
- Primary surface: `--color-surface-primary`
- Secondary surface: `--color-surface-secondary`
- Tertiary surface: `--color-surface-tertiary`
- Muted border: `--color-border-muted`
- Main border: `--color-border`
- Primary text: `--color-text-primary`
- Secondary text: `--color-text-secondary`
- Muted text: `--color-text-muted`
- Accent: `--color-accent`
- Success: `--color-success`
- Warning: `--color-warning`
- Error: `--color-error`

Typography:

- Inter for interface text
- JetBrains Mono for:
  - hashrate values
  - wallet addresses
  - pool IDs
  - block references
  - treasury values
  - machine IDs
  - operational metadata
  - transaction hashes

The interface should visually resemble:

- Datadog
- Linear
- Stripe Dashboard
- Safe Global
- Aragon
- cloud infrastructure dashboards

It should not resemble:

- crypto casinos
- meme dashboards
- mining game interfaces
- speculative DeFi farms

---

## CSS / Layout Alignment

The Mining nucleus must reuse the global Axodus layout and component classes whenever possible.

Required base classes:

- `app-page`
- `page-shell`
- `app-view-shell`
- `page-header`
- `page-title`
- `page-subtitle`
- `section-block`
- `section-title`
- `card`
- `panel`
- `metric-card`
- `card-grid`
- `eyebrow`
- `muted-text`
- `mono`

Avoid creating an isolated visual system for Mining.

Mining-specific components should extend the global Axodus surface system instead of redefining:

- colors
- spacing
- typography
- shadows
- border radius
- chart behavior
- responsive behavior

Charts must use the existing global Recharts styling.

Avoid custom aggressive colors, glow effects, or speculative visual indicators.

---

## Layout Philosophy

Mining pages should be dense, modular, and operational.

Preferred page structure:

- top operational status summary
- KPI cards
- fleet health grid
- production chart
- treasury contribution panel
- active mining pools
- hardware allocation table
- governance and risk side panel
- execution queue

Avoid:

- marketing-first landing pages
- large empty hero sections
- decorative mining illustrations
- animated coin effects
- oversized reward banners
- APR-first visual hierarchy

---

## Main Routes

Recommended routes:

- `/mining`
- `/mining/dashboard`
- `/mining/fleet`
- `/mining/pools`
- `/mining/operations`
- `/mining/treasury`
- `/mining/governance`
- `/mining/risk`
- `/mining/reports`
- `/mining/settings`

Existing MVP route names may differ. Preserve current route compatibility unless a routing migration is explicitly requested.

---

## Primary Pages

### Mining Dashboard

Purpose: executive overview of the Mining nucleus.

Must include:

- total hashrate
- active rigs
- degraded rigs
- offline rigs
- uptime percentage
- current production
- energy cost
- net treasury contribution
- active pool allocation
- operational alerts
- governance status

Suggested panels:

- Mining Health Overview
- Production vs Cost
- Treasury Contribution
- Fleet Availability
- Active Alerts
- DAO Allocation Summary
- Execution Queue Preview

Primary user question:

```txt
What is the current state of the mining operation?
```

### Fleet Page

Purpose: monitor hardware, compute units, and infrastructure clusters.

Must include:

- rig ID
- rig name
- cluster
- location or zone
- assigned DAO
- operational status
- hashrate
- temperature
- uptime
- power draw
- energy efficiency
- assigned pool
- last maintenance
- risk level

Statuses:

- online
- degraded
- maintenance
- offline
- suspended

The Fleet page should feel like a compute infrastructure dashboard.

### Mining Pools Page

Purpose: show pool participation and production routing.

Must include:

- pool name
- network
- allocation percentage
- assigned hashrate
- accepted shares
- rejected shares
- estimated yield
- payout address
- governance approval state
- pool risk status

Pool risk should be visible.

Do not display pools only as yield opportunities.

Display them as governed infrastructure endpoints.

### Operations Page

Purpose: operational execution layer.

Must include:

- pending maintenance
- hardware onboarding
- hardware retirement
- pool switch requests
- energy budget changes
- treasury routing updates
- DAO allocation updates
- blocked operations
- execution queue

Execution statuses:

- pending
- approved
- executing
- completed
- failed
- blocked

Each operation should expose:

- requested action
- target entity
- requesting DAO
- approval state
- execution status
- risk severity
- timestamp

### Treasury Page

Purpose: connect mining production to DAO treasury.

Must include:

- gross mined value
- operational cost
- net contribution
- payout history
- treasury destination
- reserve allocation
- reinvestment allocation
- DAO distribution rules
- pending settlements
- treasury health

Treasury must be treated as a first-class component.

Mining value should always be contextualized by:

- cost
- risk
- payout status
- DAO ownership
- governance rules

Avoid showing only gross production.

### Governance Page

Purpose: expose DAO control over mining operations.

Must include:

- mining policy
- allocation rules
- approved pools
- blocked pools
- risk limits
- energy budget
- hardware acquisition proposals
- hardware retirement proposals
- treasury routing proposals
- constitutional standing
- local DAO rules

Governance statuses:

- compliant
- restricted
- under-review
- sanctioned
- suspended

Severity:

- info
- warning
- critical

Reason code examples:

- treasury-risk
- pool-risk
- hardware-risk
- energy-risk
- governance-mismatch
- execution-delay
- constitutional-violation
- payout-risk
- infrastructure-risk

### Risk Page

Purpose: provide operational risk visibility.

Must include:

- degraded hardware
- overheating rigs
- abnormal rejection rates
- pool reliability issues
- payout delays
- treasury routing warnings
- energy cost spikes
- governance violations
- blocked operations

Risk should be visible, contextual, and actionable.

Do not hide risk behind generic alert icons.

Each risk item should include:

- severity
- affected entity
- reason code
- description
- recommended action
- governance impact

### Reports Page

Purpose: provide auditable historical visibility.

Must include:

- production reports
- payout reports
- uptime reports
- cost reports
- pool performance reports
- DAO allocation reports
- treasury contribution reports
- governance compliance reports

Reports should support future export flows.

MVP can be mock-only.

### Settings Page

Purpose: configure Mining nucleus preferences and mock operational parameters.

Must include:

- preferred display currency
- hashrate unit preference
- default time range
- alert thresholds
- DAO visibility scope
- mock data mode indicator
- future integration placeholders

Do not expose real destructive actions in MVP.

---

## Core Components

### MiningStatusBadge

Displays operational status.

Statuses:

- online
- degraded
- maintenance
- offline
- suspended

Color behavior:

- online: success
- degraded: warning
- maintenance: accent
- offline: muted or error
- suspended: error

Status must include text, not color only.

### HashrateMetricCard

Displays:

- current hashrate
- 24h change
- target hashrate
- unit
- trend indicator

Supported units:

- H/s
- KH/s
- MH/s
- GH/s
- TH/s
- PH/s

Numeric values must use the `mono` class.

### FleetHealthPanel

Displays:

- total rigs
- online rigs
- degraded rigs
- maintenance rigs
- offline rigs
- average temperature
- average uptime
- average efficiency

### MiningProductionChart

Displays:

- production over time
- cost over time
- net output
- treasury inflow

Use Recharts.

Respect global Recharts styling.

Avoid excessive chart colors.

### TreasuryContributionPanel

Displays:

- gross production
- operating cost
- net contribution
- DAO treasury destination
- latest payout
- pending settlement

### PoolAllocationTable

Columns:

- Pool
- Network
- Allocation
- Hashrate
- Accepted Shares
- Rejected Shares
- Estimated Yield
- Payout Address
- Risk
- Governance Status

Use horizontal overflow on smaller screens.

On mobile, collapse pool rows into cards.

### GovernanceGuardrailPanel

Displays:

- constitutional status
- local governance status
- reason codes
- severity
- affected operation
- recommended action

This component should make governance legibility explicit.

### MiningExecutionQueue

Displays operational actions waiting for approval or execution.

Examples:

- switch pool
- pause rig cluster
- resume rig cluster
- increase treasury reserve
- update payout address
- schedule maintenance
- onboard hardware
- retire hardware

### EnergyCostPanel

Displays:

- current energy cost
- cost per mined unit
- power draw
- efficiency score
- cost trend
- budget status

Mining must always show cost context.

### DaoMiningAllocationPanel

Displays:

- DAO name
- allocated rigs
- allocated hashrate
- treasury destination
- governance status
- allocation percentage
- production share

This reinforces the Axodus model where each DAO behaves as an operational tenant.

---

## Data Model Requirements

Mock data should be centralized.

Recommended file:

```txt
src/data/mock/mining.mock.js
```

Do not hardcode datasets inside components.

Suggested mock entities:

- `miningDashboardMetrics`
- `miningFleet`
- `miningPools`
- `miningOperations`
- `miningTreasuryFlows`
- `miningGovernanceRules`
- `miningAlerts`
- `miningReports`
- `miningDaoAllocations`
- `miningExecutionQueue`
- `miningEnergyMetrics`

---

## Example Mock Entity Shapes

### Mining Rig

- `id`
- `name`
- `cluster`
- `location`
- `assignedDaoId`
- `status`
- `hashrate`
- `hashrateUnit`
- `temperature`
- `uptime`
- `powerDraw`
- `efficiency`
- `poolId`
- `lastMaintenanceAt`
- `riskLevel`
- `governanceStatus`

### Mining Pool

- `id`
- `name`
- `network`
- `allocation`
- `hashrate`
- `acceptedShares`
- `rejectedShares`
- `estimatedYield`
- `payoutAddress`
- `governanceStatus`
- `riskLevel`

### Treasury Flow

- `id`
- `daoId`
- `source`
- `grossAmount`
- `operatingCost`
- `netContribution`
- `asset`
- `destinationTreasury`
- `timestamp`
- `status`

### Mining Operation

- `id`
- `type`
- `title`
- `targetEntity`
- `requestedByDaoId`
- `status`
- `severity`
- `reasonCode`
- `createdAt`
- `scheduledFor`
- `executionHash`

### DAO Allocation

- `daoId`
- `daoName`
- `allocatedRigs`
- `allocatedHashrate`
- `allocationPercentage`
- `treasuryDestination`
- `productionShare`
- `governanceStatus`
- `riskLevel`

---

## UI Tone

Use precise operational language.

Prefer:

- Treasury contribution
- Fleet health
- Production output
- Energy cost
- Execution queue
- DAO allocation
- Governance approval
- Operational risk
- Pool reliability
- Infrastructure health
- Settlement status

Avoid:

- Earn fast
- Passive income
- Guaranteed rewards
- Moon mining
- Jackpot
- Boost profits
- Maximize gains
- Free rewards

---

## Mobile Requirements

Mobile must prioritize:

- mining health summary
- active alerts
- treasury contribution
- fleet status
- execution approvals
- governance warnings
- DAO allocation

On mobile:

- collapse tables into cards
- keep KPI cards readable
- keep DAO switcher accessible
- expose urgent alerts first
- use stacked panels
- avoid wide charts as primary navigation
- keep actions thumb-friendly

---

## Accessibility

Requirements:

- do not rely on color alone for status
- all status badges need text labels
- charts need readable labels
- tables need clear column names
- numeric values must include units
- alerts must include severity text
- buttons and links must meet minimum touch target expectations
- operational warnings must be readable in dark and light themes

---

## Animation

Animations must be subtle.

Allowed:

- hover elevation
- soft panel transitions
- small operational status pulse
- chart loading transitions
- queue item transition

Avoid:

- glowing mining rigs
- animated coins
- aggressive particle effects
- flashing yield indicators
- speculative motion
- excessive glow

---

## Implementation Notes

Recommended module structure:

```txt
src/modules/mining/
  components/
  pages/
  hooks/
  services/
  types/
  utils/
  mock/
```

Components must consume data through services and hooks.

Do not connect real mining pools, wallets, payouts, contracts, or treasury execution during MVP unless explicitly requested.

MVP should be:

- mock-first
- governance-aware
- treasury-aware
- DAO-aware
- risk-aware
- ready for backend integration later

---

## Recommended Frontend Stack

Use the Axodus frontend stack:

- React
- Vite
- TailwindCSS
- TanStack Query
- React Router
- Recharts
- Ethers v6
- Reown AppKit

Mining MVP should not require wallet connection for public overview pages.

Protected or DAO-specific operations may later require wallet connection.

---

## MVP Design Boundaries

The MVP must not execute:

- real mining actions
- real pool switches
- real payouts
- real treasury transfers
- real contract calls
- real wallet transactions
- real hardware control

The MVP may simulate:

- mining production
- fleet health
- pool allocation
- DAO allocation
- treasury contribution
- governance approval
- execution queue
- risk alerts

---

## Definition of Done

The Mining nucleus design is acceptable when:

- it looks like infrastructure software
- mining production is connected to treasury
- fleet health is visible
- energy cost is visible
- DAO allocation is visible
- governance status is visible
- operational risk is visible
- execution queues are visible
- mock data is centralized
- mobile layout is usable
- global CSS classes are reused
- no speculative or casino-style UX is present

---

## Final Direction

Axodus Mining should feel like:

```txt
DAO-governed mining infrastructure operations.
```

Not:

```txt
A crypto rewards dashboard.
```
