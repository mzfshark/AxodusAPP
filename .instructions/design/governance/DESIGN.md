# Axodus Governance Design & Information Architecture

## Purpose

This document defines the official design direction, interaction model and information architecture for the Governance nucleus inside AxodusAPP.

This is not a traditional admin dashboard.

This is not a governance landing page.

This is not a voting-only interface.

Governance inside Axodus is the operational layer of a federated DAO ecosystem.

The Governance nucleus must visually communicate:

- constitutional authority
- DAO federation
- treasury coordination
- governance execution
- operational sovereignty
- economic infrastructure
- organizational topology
- execution transparency

The design language must feel like:

- a governance operating system
- an economic infrastructure terminal
- a federation control center
- a treasury coordination platform
- a sovereign DAO workspace system

---

## Core Product Philosophy

### Governance Is The Core Product

Governance is not an auxiliary feature.

Governance is the central execution layer of Axodus.

All products, treasuries, proposals, economic activity and DAO operations converge into Governance.

Every visual and UX decision must reinforce:

- operational legitimacy
- treasury visibility
- DAO autonomy
- constitutional compliance
- execution transparency
- economic coordination

---

## Governance Must Feel Operational

The Governance experience must never feel:

- static
- sterile
- informational-only
- disconnected from execution
- disconnected from treasury
- disconnected from DAO operations

Users must immediately feel:

```txt
I am operating an autonomous economic organization.
```

Not:

```txt
I am browsing a crypto governance website.
```

---

## Existing Axodus Design System

The Governance module must reuse and respect the existing Axodus design system and CSS architecture.

Current design foundations already provide:

- institutional dark theme
- semantic surfaces
- operational spacing
- low-noise UI
- typography hierarchy
- semantic color system
- enterprise dashboard semantics

Reference files:

- `Global.css`
- `tailwindcss.css`
- `tokens.css`

Existing tokens already define the official visual language.

Examples:

```css
--color-bg: #0b1326;
--color-surface-primary: #1e2636;
--color-accent: #5cc6d0;
--color-text-primary: #dae2fd;
```

The Governance module must build upon this system, not replace it.

---

## UX Philosophy

### Governance Is A Multi-DAO Workspace System

Governance must not behave like a single dashboard.

Governance must behave like a federated DAO operating workspace.

Each DAO is effectively:

- a tenant
- an organization
- an operational unit
- a treasury entity
- a governance workspace

---

## Primary Governance Objective

When users access `/governance`, they must immediately understand:

- which DAO they are operating
- which DAOs exist
- constitutional status
- treasury exposure
- active proposals
- operational risks
- federation topology
- execution queues
- governance health

---

## Governance Information Architecture

Governance must prioritize:

- operational density
- contextual information
- execution visibility
- treasury visibility
- topology awareness
- federation hierarchy
- DAO-centric navigation

Governance must avoid:

- giant hero sections
- excessive empty spacing
- marketing layouts
- oversized decorative graphics
- crypto-style visual noise
- excessive gradients
- exaggerated glassmorphism
- casino aesthetics

---

## Visual Direction

Style keywords:

- institutional
- operational
- technical
- federated
- constitutional
- economic
- sovereign
- infrastructure-native
- treasury-oriented
- enterprise-grade

Governance must resemble:

- cloud infrastructure dashboards
- treasury execution terminals
- observability platforms
- organizational control systems
- institutional SaaS
- operational workspaces

Recommended visual references:

- Linear
- Vercel
- Datadog
- Stripe Dashboard
- Safe Global
- Aragon
- Notion
- Kubernetes dashboards
- cloud observability systems

---

## Layout Density Philosophy

Governance should use:

- compact operational cards
- high information density
- layered surfaces
- contextual grouping
- split operational panels
- dashboard grids
- workspace segmentation

Avoid:

- giant centered sections
- oversized landing-page spacing
- decorative-only layouts

---

## Core Layout Structure

Global structure:

```txt
Sidebar
   ├── Governance
   ├── My DAOs
   ├── Treasury
   ├── Proposals
   ├── Federation
   ├── Constitution
   ├── Plugins
   └── Settings

Topbar
   ├── DAO Context Selector
   ├── Wallet Status
   ├── Network Status
   ├── Notifications
   └── Governance Health
```

---

## Governance Homepage

Route:

```txt
/governance
```

Layout order:

1. Governance Status Bar
2. Root DAO Overview
3. DAO Federation Map

### Governance Status Bar

Compact operational header exposing:

- connected DAO
- constitutional standing
- treasury status
- federation tier
- execution health
- active governance alerts

### Root DAO Overview

Primary operational card.

Purpose: establish Axodus Root DAO as the constitutional authority.

Must expose:

- federation health
- treasury status
- active proposals
- constitutional alerts
- active chains
- DAO count
- execution queues

### DAO Federation Map

This is the most important public Governance section.

The ecosystem topology must be visually understandable:

```txt
Axodus Root DAO
   ↓
Product DAOs
   ↓
Partner DAOs
   ↓
Client / Tenant DAOs
```

This section should resemble:

- infrastructure topology
- sovereign network graph
- organizational map

It must not be only a simple table.

---

## DAO Workspace Cards

Each DAO card must expose:

- DAO name
- DAO type
- federation tier
- governance model
- constitutional standing
- treasury health
- active proposals
- enabled products
- connected chains
- treasury value
- execution status
- risk status

Supported DAO classifications:

```txt
Root DAO
Product DAO
Partner DAO
Client DAO
Operational DAO
Sovereign DAO
Restricted DAO
Observer DAO
```

---

## Create DAO Flow

Governance must strongly reinforce:

```txt
Primary onboarding = Create or Join DAO
```

Not:

```txt
Create Account
```

DAO creation steps:

1. Choose DAO Type
   - Business DAO
   - Investment DAO
   - Product DAO
   - Community DAO
   - Operational DAO

2. Configure Governance
   - Quadratic Voting
   - Token Voting
   - Multisig
   - Hybrid Governance
   - Council Governance

3. Configure Treasury
   - Treasury Wallets
   - Execution Rules
   - Spending Limits
   - Cross-chain Allocation
   - Risk Parameters

4. Enable Products
   - Trading
   - Mining
   - Marketplace
   - Academy
   - Compute
   - Vault
   - MCP Services

5. Accept Constitution

Constitutional acknowledgment is mandatory and is a critical UX moment.

---

## Governance Console

Route:

```txt
/governance/console
```

This page must feel like:

- treasury execution center
- governance terminal
- operational command center
- economic infrastructure dashboard

It must not feel like:

- informational dashboard
- static analytics page

Required sections:

- Governance Health
- Treasury Execution
- Proposal Activity
- Constitutional Guardrails

### Governance Health

Expose:

- constitutional standing
- governance uptime
- execution status
- proposal activity
- treasury health

### Treasury Execution

Expose:

- pending executions
- multisig confirmations
- execution queues
- chain execution status
- treasury operations

### Proposal Activity

Expose:

- active proposals
- quorum progress
- execution ETA
- proposal severity
- treasury impact

### Constitutional Guardrails

Expose:

- restrictions
- sanctions
- warnings
- governance violations
- plugin incompatibilities
- federation restrictions

---

## Proposal UX

Proposal cards must expose operational context, not only title, description and vote count.

Required metadata:

- originating DAO
- proposal category
- execution chain
- treasury impact
- constitutional impact
- execution status
- quorum status
- risk severity
- affected plugins
- treasury scope
- reason codes

---

## Constitutional Governance UI

Governance must visibly expose constitutional authority.

Constitutional status types:

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
constitutional
```

Example reason codes:

```txt
treasury-risk
plugin-risk
governance-mismatch
execution-delay
constitutional-violation
federation-restriction
```

Prefer production reason codes from Governance APIs when available.

---

## Treasury UX

Treasury is a first-class governance component.

Treasury visibility must exist throughout the Governance module.

Recommended treasury widgets:

- Treasury Balance
- Asset Allocation
- Pending Executions
- Treasury Health
- Liquidity Status
- Risk Exposure
- Yield Activity
- Locked Capital
- Cross-chain Allocation

---

## Design Tokens

Governance must reuse existing tokens.

Official references:

```css
--color-bg
--color-surface-primary
--color-surface-secondary
--color-border-muted
--color-text-primary
--color-text-secondary
--color-accent
--color-success
--color-warning
--color-error
```

Base surfaces:

```txt
Background: #0b1326
Primary Surface: #1e2636
Secondary Surface: #2d3449
```

Accent:

```txt
Accent: #5cc6d0
```

Semantic colors:

```txt
Success: #41e4b8
Warning: #ffb783
Error: #ff7f7a
```

---

## Typography

Governance should use:

- strong hierarchy
- compact operational labels
- low-noise typography
- readable metrics
- institutional spacing

Official fonts already defined:

- Inter
- JetBrains Mono

JetBrains Mono should be used for:

- treasury values
- hashes
- execution IDs
- proposal IDs
- technical metadata
- chain identifiers

---

## Component Direction

Recommended components:

### GovernanceStatusBadge

Displays:

- compliant
- sanctioned
- restricted
- suspended

### TreasuryHealthCard

Displays:

- liquidity
- exposure
- treasury status
- execution state

### DAOWorkspaceCard

Displays:

- DAO metadata
- governance state
- federation tier
- treasury summary

### ProposalExecutionCard

Displays:

- execution state
- voting state
- treasury impact
- risk level

### ConstitutionalAlert

Displays:

- reason code
- severity
- restriction
- constitutional warning

---

## Animation Rules

Animations must be subtle.

Allowed:

- hover elevation
- status pulse
- panel transitions
- topology transitions
- execution indicators

Avoid:

- flashy motion
- glowing animations
- crypto-style transitions

---

## Existing CSS Direction Must Be Preserved

Current Axodus CSS intentionally neutralizes excessive glow and visual noise.

Examples:

```css
.glow-secondary {
  filter: none;
}
```

```css
.glowSecondary,
.glowError {
  filter: none !important;
  box-shadow: none !important;
}
```

This direction must continue.

---

## Mobile Design

Governance must remain operational on mobile.

Mobile priorities:

- DAO switching
- proposal voting
- treasury visibility
- governance alerts
- execution status
- constitutional warnings

---

## Final Experience Goal

Governance must ultimately feel like:

```txt
Economic Infrastructure Control Plane
```

Not:

```txt
Crypto Governance Dashboard
```
