# Axodus DEX Design System & UX Specification

## Purpose

The DEX nucleus is the liquidity execution layer of the Axodus ecosystem.

It must not feel like a speculative exchange-first product.

It must feel like:

- institutional liquidity infrastructure
- DAO-governed swap and routing layer
- treasury-aware execution console
- multi-chain liquidity gateway
- auditable market access system

The DEX exists to support:

- DAO treasury operations
- ecosystem token routing
- controlled liquidity access
- partner DAO swaps
- marketplace settlement
- Academy reward utility
- Business service payments
- cross-chain liquidity visibility

---

## Product Positioning

Axodus DEX is not a casino interface.

It is not a meme-token swap page.

It is a governance-native liquidity system where every swap, route, pool, asset, chain and treasury interaction should be contextualized by risk, execution status and governance permissions.

Primary user perception:

```txt
Where DAO liquidity is routed, monitored, governed and executed.
```

---

## Core Design Principles

### 1. Liquidity as Infrastructure

The DEX should prioritize:

- route quality
- treasury impact
- pool health
- asset legitimacy
- slippage risk
- execution traceability
- chain availability

Avoid presenting the DEX only as a buy/sell interface.

### 2. Governance-Aware Trading

Every relevant asset, pool or route should expose governance context:

- DAO ownership
- federation status
- constitutional status
- asset approval state
- treasury permission level
- risk reason codes

### 3. Treasury-First Execution

When a DAO or treasury wallet uses the DEX, the interface must show:

- treasury balance before execution
- estimated balance after execution
- liquidity impact
- exposure change
- execution chain
- fee distribution
- pending approvals

### 4. Institutional Swap UX

The swap interface should be compact, precise and auditable.

It should include:

- token selector
- chain selector
- route selector
- slippage control
- estimated output
- execution cost
- treasury effect
- risk warnings
- transaction receipt preview

Avoid:

- giant token price animations
- casino-style green/red flashing
- hype copy
- meme token banners
- excessive glow

---

## Visual Direction

The DEX must follow the global Axodus visual language.

Use:

- dark infrastructure dashboard
- dense operational panels
- compact cards
- muted borders
- controlled accent usage
- clear risk states
- mono typography for hashes, amounts and technical metadata

Official tokens:

- Background: `--color-bg`
- Surface primary: `--color-surface-primary`
- Surface secondary: `--color-surface-secondary`
- Accent: `--color-accent`
- Success: `--color-success`
- Warning: `--color-warning`
- Error: `--color-error`

Typography:

- Inter for interface text
- JetBrains Mono for amounts, addresses, transaction hashes, pool IDs, chain IDs and route metadata

---

## Main Routes

Recommended DEX routes:

- `/dex`
- `/dex/swap`
- `/dex/pools`
- `/dex/routes`
- `/dex/assets`
- `/dex/treasury`
- `/dex/activity`
- `/dex/governance`
- `/dex/risk`
- `/dex/settings`

Existing MVP route names may differ. Preserve current route compatibility unless a routing migration is explicitly requested.

---

## Page Specifications

### `/dex` — DEX Overview

Purpose:

Provide a high-level operational view of liquidity, routing health and DAO execution readiness.

Main sections:

- Liquidity health summary
- Active chains
- Top governed pools
- Treasury routing exposure
- Recent executions
- Risk alerts
- Pending governance approvals

Required widgets:

- Total liquidity routed
- Active pools
- Supported chains
- DAO treasury exposure
- Failed or delayed executions
- Restricted assets count

Layout:

- Top metrics row
- Main liquidity chart
- Right-side risk and governance panel
- Bottom activity table

Tone:

Operational and executive.

### `/dex/swap` — Swap Execution

Purpose:

Allow users or DAOs to execute token swaps with full route and risk visibility.

Main components:

- Swap card
- From token selector
- To token selector
- Chain selector
- Route selector
- Slippage settings
- Execution preview
- Risk validation panel
- Treasury impact preview
- Transaction receipt panel

Swap card must show:

- Input amount
- Output estimate
- Price impact
- Minimum received
- Network fee
- Protocol fee
- Execution chain
- Routing source
- Governance status

DAO mode must additionally show:

- DAO treasury source
- Spend permission
- Execution policy
- Required approvals
- Proposal link, if required

### `/dex/pools` — Liquidity Pools

Purpose:

Display liquidity pools as governed infrastructure objects, not speculative yield farms.

Table columns:

- Pool
- Chain
- Assets
- TVL
- Volume
- Fee tier
- DAO owner
- Governance status
- Risk level
- Execution availability

Pool detail should include:

- Pool composition
- Liquidity depth
- route usage
- treasury dependency
- historical slippage
- LP ownership distribution
- constitutional status
- active alerts

Avoid farming-heavy presentation.

Use "liquidity infrastructure", not "farm now".

### `/dex/routes` — Route Intelligence

Purpose:

Expose routing paths, aggregators, execution quality and multi-chain routing reliability.

Main components:

- Route topology map
- Route comparison table
- Best route panel
- Failed route log
- Chain latency indicator
- Bridge dependency warning
- Aggregator source panel

Route metadata:

- source chain
- destination chain
- intermediary pools
- bridge dependency
- estimated gas
- expected output
- route confidence
- failure risk
- fallback path

### `/dex/assets` — Asset Registry

Purpose:

Show all tradable assets through the lens of legitimacy, governance and risk.

Asset states:

- approved
- under-review
- restricted
- deprecated
- blocked

Asset table columns:

- Asset
- Symbol
- Chain
- Contract
- Governance status
- Treasury permission
- Liquidity depth
- Risk reason
- Last reviewed

Every asset page must include:

- contract address
- chain ID
- issuer / DAO relation
- liquidity sources
- risk flags
- governance review history
- allowed actions

### `/dex/treasury` — Treasury Execution Console

Purpose:

Allow DAO operators to understand and prepare treasury swaps.

Sections:

- DAO selector
- Treasury balance overview
- Current asset exposure
- Swap simulation
- policy validation
- execution queue
- historical treasury swaps

Treasury swap preview must show:

- current allocation
- target allocation
- estimated execution cost
- slippage exposure
- post-swap balance
- policy result
- required approvals

This page should feel close to Safe Global + Datadog + Linear, not an exchange terminal.

### `/dex/activity` — Execution History

Purpose:

Provide auditability for swaps, routes and liquidity actions.

Activity table columns:

- Timestamp
- Executor
- DAO
- Action
- Asset pair
- Chain
- Amount
- Status
- Transaction hash
- Receipt

Statuses:

- pending
- simulated
- approved
- executing
- completed
- failed
- reverted
- delayed
- blocked

Use mono text for hashes and IDs.

### `/dex/governance` — DEX Governance

Purpose:

Show how liquidity rules, asset approvals and routing permissions are governed.

Sections:

- Active DEX proposals
- Asset approval queue
- Pool listing requests
- Treasury policy updates
- Risk committee decisions
- Constitutional guardrails

Proposal cards should show:

- proposal title
- affected assets
- affected chains
- affected DAOs
- risk level
- current vote state
- execution ETA
- constitutional status

### `/dex/risk` — Risk & Compliance

Purpose:

Centralize liquidity, asset, route and treasury risk.

Risk categories:

- asset-risk
- pool-risk
- route-risk
- bridge-risk
- treasury-risk
- governance-mismatch
- oracle-risk
- execution-delay
- constitutional-violation

Severity:

- info
- warning
- critical

Risk panels must be direct, compact and actionable.

---

## UX Components

Required components:

- `DexOverviewMetrics`
- `SwapExecutionCard`
- `TokenSelector`
- `ChainSelector`
- `RoutePreview`
- `SlippageControl`
- `ExecutionReceiptPreview`
- `TreasuryImpactPanel`
- `PoolHealthCard`
- `LiquidityPoolTable`
- `AssetRegistryTable`
- `RouteTopologyPanel`
- `GovernanceStatusBadge`
- `RiskReasonBadge`
- `ExecutionStatusBadge`
- `TreasuryPolicyValidator`
- `DexActivityTable`

---

## Mock Data Requirements

Mock data should be centralized under:

```txt
src/data/mock/dex.mock.js
```

Recommended entities:

- assets
- chains
- pools
- routes
- swaps
- treasury simulations
- DAO treasury wallets
- execution receipts
- governance proposals
- risk alerts
- asset reviews
- route failures
- fee models

Do not hardcode datasets inside components.

Components must consume data through:

```txt
src/modules/dex/services
```

and hooks from:

```txt
src/modules/dex/hooks
```

---

## Recommended Module Structure

```txt
src/modules/dex/
  components/
  pages/
  hooks/
  services/
  types/
  utils/
  mock/
```

---

## Interaction Rules

### Swap Execution

Before execution, always show:

- route
- output estimate
- slippage
- fee
- risk state
- treasury impact
- policy validation
- transaction preview

### DAO Execution

DAO swaps must never feel like personal wallet swaps.

They must include:

- DAO context
- treasury source
- permission state
- governance rule
- execution receipt
- audit trail

### Risk Warnings

Warnings should be visible but not noisy.

Critical warnings must block execution until acknowledged or resolved.

---

## Mobile Requirements

Mobile DEX must prioritize:

- swap execution
- DAO treasury context
- route preview
- risk alerts
- transaction status
- asset registry lookup

Mobile layout:

- single-column swap flow
- collapsible route details
- sticky execution summary
- compact token selector
- bottom-sheet risk panel

Avoid desktop-only tables without mobile transformation.

---

## Visual Do / Do Not

Do:

- use compact operational cards
- expose execution state clearly
- show treasury and risk context
- use mono text for technical data
- keep charts clean and minimal
- prefer dense dashboard layouts

Do not:

- create casino-style swap screens
- use neon-heavy charts
- overemphasize token speculation
- hide governance status
- hide treasury impact
- use meme coin aesthetics
- make liquidity feel like gambling

---

## Final Product Feeling

The DEX nucleus should feel like:

```txt
Governed liquidity infrastructure for federated DAOs.
```

Not:

```txt
Another crypto swap page.
```
