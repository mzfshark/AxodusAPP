# Axodus DeFi Design System & UX Specification

## 1. Product Identity

The Axodus DeFi nucleus is not an exchange-first interface.

It is the financial operations layer of the Axodus ecosystem.

The interface must feel like:

- institutional treasury infrastructure
- DAO-native liquidity management
- multi-chain financial operations
- auditable DeFi execution
- risk-aware capital allocation
- protocol-grade financial SaaS

Avoid:

- casino-style yield farming
- speculative meme-token layouts
- noisy APY-first interfaces
- excessive glow
- exchange-style trading terminals
- "get rich quick" language

The DeFi nucleus must communicate:

```txt
Capital is governed, allocated, monitored, and executed through transparent DAO infrastructure.
```

---

## 2. Role Inside Axodus

The DeFi nucleus connects:

- DAO treasuries
- staking vaults
- liquidity pools
- yield strategies
- risk policies
- treasury execution queues
- cross-chain capital flows
- governance-approved financial operations

It must support both:

- ecosystem-level DeFi operations
- tenant DAO-specific DeFi operations

Each DAO should be able to understand:

- what capital it controls
- where liquidity is deployed
- what strategies are active
- what risks exist
- what requires governance approval
- what has already been executed

---

## 3. Core UX Principle

The primary user mental model is:

```txt
Create or Join DAO -> Review Treasury -> Allocate Capital -> Govern Strategy -> Execute -> Monitor
```

Not:

```txt
Connect Wallet -> Chase APY -> Deposit Random Token
```

The interface must prioritize:

- treasury safety
- capital visibility
- execution legitimacy
- strategy governance
- risk transparency
- multi-chain clarity

---

## 4. Visual Direction

Use the official Axodus design system.

Core visual references:

- Vercel
- Linear
- Datadog
- Stripe Dashboard
- Safe Global
- Aragon
- cloud infrastructure dashboards
- treasury monitoring consoles

The design should be:

- dense but readable
- modular
- dashboard-oriented
- operational
- institutional
- governance-aware
- audit-friendly

Avoid:

- oversized landing-page hero sections
- neon Web3 visuals
- token hype cards
- animated coin graphics
- casino-style APY banners
- speculative gradients

---

## 5. Official Style Tokens

Use existing global tokens from:

- `Global.css`
- `tokens.css`
- `tailwindcss.css`

Primary colors:

- Background: `--color-bg`
- Primary surface: `--color-surface-primary`
- Secondary surface: `--color-surface-secondary`
- Accent: `--color-accent`
- Success: `--color-success`
- Warning: `--color-warning`
- Error: `--color-error`
- Primary text: `--color-text-primary`
- Secondary text: `--color-text-secondary`
- Muted text: `--color-text-muted`
- Border: `--color-border-muted`

Typography:

- Main font: Inter
- Technical font: JetBrains Mono

Use JetBrains Mono for:

- wallet addresses
- vault IDs
- strategy IDs
- transaction hashes
- chain IDs
- treasury values
- APY/APR values
- risk scores
- execution receipt IDs

---

## 6. DeFi Design Personality

The DeFi nucleus should feel like:

- a treasury operations cockpit
- a capital allocation console
- a governance-controlled financial protocol
- a multi-chain liquidity registry
- an institutional DeFi control center

It should not feel like:

- PancakeSwap-style farm UI
- casino yield dashboard
- CEX trading product
- token launchpad
- speculative DeFi casino

Language should be sober.

Use:

- Treasury Allocation
- Strategy Exposure
- Liquidity Position
- Execution Queue
- Governance Approval
- Vault Health
- Risk Tier
- Protocol Exposure
- Capital Utilization
- Withdrawal Window
- Slashing Risk
- Chain Exposure

Avoid:

- Moon
- Pump
- Degenerate
- Ape in
- Farm hard
- Jackpot yield
- Insane APY

---

## 7. Primary Navigation

Recommended DeFi routes:

- `/defi`
- `/defi/dashboard`
- `/defi/vaults`
- `/defi/vaults/:vaultId`
- `/defi/staking`
- `/defi/liquidity`
- `/defi/strategies`
- `/defi/strategies/:strategyId`
- `/defi/allocations`
- `/defi/risk`
- `/defi/governance`
- `/defi/execution`
- `/defi/history`
- `/defi/dao/:daoId`

Existing MVP route names may differ. Preserve current route compatibility unless a routing migration is explicitly requested.

Navigation groups:

### Overview

- DeFi Dashboard
- Treasury Exposure
- Capital Flows

### Capital

- Vaults
- Staking
- Liquidity
- Allocations

### Strategy

- Strategies
- Risk Registry
- Protocol Exposure

### Governance

- Proposal Queue
- Execution Queue
- Policy Controls
- Receipts

---

## 8. Main Dashboard Layout

The DeFi dashboard should use a dense operational layout.

Recommended structure:

1. Header context bar
2. Treasury summary row
3. Capital allocation grid
4. Active strategies panel
5. Risk and governance panel
6. Execution queue
7. Cross-chain exposure table
8. Recent activity / receipts

### Header Context Bar

Must show:

- selected DAO
- governance status
- treasury health
- active chains
- connected wallet
- current permission level

Example content:

- DAO: Axodus Root DAO
- Scope: Constitutional Treasury
- Status: Compliant
- Treasury Health: Stable
- Active Chains: Harmony, Ethereum, Polygon
- Permission: Treasury Operator

---

## 9. Dashboard Cards

Use compact cards with clear hierarchy.

Recommended cards:

### Total Treasury Value

Shows total DeFi-managed assets.

Fields:

- total value
- 24h change
- 7d change
- chain distribution
- last indexed time

### Allocated Capital

Shows how much treasury is deployed.

Fields:

- deployed amount
- idle amount
- pending allocation
- utilization rate

### Active Strategies

Shows active governance-approved strategies.

Fields:

- total strategies
- healthy strategies
- warning strategies
- paused strategies

### Risk Exposure

Shows aggregated risk.

Fields:

- risk score
- high-risk protocols
- chain concentration
- liquidity lock status

### Execution Queue

Shows pending operations.

Fields:

- queued actions
- approvals required
- estimated execution window
- blocked actions

---

## 10. Vaults Page

The Vaults page must behave like a treasury registry.

Purpose:

- show all DAO-controlled vaults
- classify vault purpose
- expose risk and governance state
- allow inspection before interaction

Recommended table columns:

- Vault
- DAO Owner
- Chain
- Asset
- TVL
- Allocation Type
- Strategy
- Risk Tier
- Governance Status
- Execution State
- Updated

Vault types:

- Treasury Reserve
- Staking Vault
- Liquidity Vault
- Yield Strategy Vault
- Operational Expense Vault
- Protocol-Owned Liquidity Vault
- Locked Rewards Vault
- Academy Rewards Vault
- Insurance / Safety Vault

Vault status:

- active
- pending-approval
- paused
- restricted
- deprecated
- under-review
- emergency-lock

Risk tier:

- low
- moderate
- elevated
- high
- critical

---

## 11. Vault Detail Page

Vault detail should be operational, not promotional.

Required sections:

### Vault Overview

- vault name
- DAO owner
- chain
- contract address
- custody model
- governance status
- risk tier
- strategy type

### Asset Composition

- asset symbol
- balance
- USD value
- allocation percentage
- token contract
- chain

### Strategy Configuration

- strategy name
- strategy owner
- deposit rules
- withdrawal rules
- rebalance cadence
- risk constraints
- emergency controls

### Governance Requirements

- approval threshold
- proposal type
- signer requirements
- guardrails
- active restrictions

### Execution History

- deposits
- withdrawals
- reallocations
- emergency actions
- failed transactions
- receipts

### Risk Notes

- protocol dependency
- oracle dependency
- bridge dependency
- liquidity lock
- smart contract risk
- governance mismatch risk

---

## 12. Staking Page

The staking page must avoid retail "earn now" framing.

Use institutional language:

- Stake Allocation
- Validator Exposure
- Delegation Policy
- Reward Accrual
- Slashing Risk
- Unbonding Window
- Governance-Controlled Rewards

Recommended sections:

- staking overview
- validator distribution
- delegated amount
- pending rewards
- unbonding positions
- validator risk
- governance-approved staking policies

Do not use:

- "Stake and earn huge rewards"
- "Maximize passive income"
- "Boost your APY"

Use:

- "Review delegation policy"
- "Monitor validator exposure"
- "Queue staking allocation"
- "Claim rewards under DAO policy"

---

## 13. Liquidity Page

The liquidity page must show protocol-owned liquidity and DAO-managed LP positions.

Recommended sections:

- liquidity overview
- pools registry
- active LP positions
- impermanent loss estimate
- protocol exposure
- pool depth
- withdrawal windows
- governance restrictions

Table columns:

- Pool
- Protocol
- Chain
- Assets
- Position Value
- Pool Share
- Fee APR
- IL Risk
- Liquidity Depth
- Status

Risk indicators:

- shallow liquidity
- volatile pair
- unaudited protocol
- bridge dependency
- oracle mismatch
- governance restriction

---

## 14. Strategies Page

Strategies are governance-controlled financial modules.

Each strategy must have:

- objective
- DAO owner
- allowed assets
- allowed protocols
- risk tier
- execution chain
- approval policy
- rebalance policy
- emergency stop policy

Strategy status:

- draft
- proposed
- approved
- active
- paused
- restricted
- retired
- failed

Strategy categories:

- Conservative Yield
- Staking Allocation
- Liquidity Provision
- Treasury Diversification
- Stable Asset Parking
- Protocol-Owned Liquidity
- Cross-Chain Yield
- Rewards Distribution
- Academy Incentive Funding

---

## 15. Strategy Detail Page

Required panels:

### Strategy Summary

- strategy ID
- title
- DAO owner
- status
- current allocation
- target allocation
- risk tier
- current yield estimate

### Policy Rules

- max allocation
- supported chains
- supported protocols
- allowed assets
- withdrawal delay
- rebalance threshold
- governance approval threshold

### Performance

- current value
- historical value
- realized yield
- unrealized yield
- fees
- drawdown
- volatility estimate

### Risk

- protocol risk
- liquidity risk
- oracle risk
- bridge risk
- governance risk
- concentration risk

### Execution

- pending actions
- last rebalance
- next review
- execution receipts
- failed operations

---

## 16. Governance Integration

DeFi must be governance-native.

Every sensitive financial action must expose governance context.

Actions requiring governance visibility:

- create vault
- approve strategy
- allocate capital
- withdraw capital
- rebalance strategy
- pause vault
- emergency lock
- whitelist protocol
- change risk policy
- claim rewards
- distribute rewards
- bridge assets
- deploy liquidity

Each action should show:

- required proposal type
- required approval threshold
- current approval state
- execution delay
- signer requirements
- guardrail status
- reason codes
- treasury impact

---

## 17. Governance Status Model

Use official governance status values:

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
- plugin-risk
- governance-mismatch
- execution-delay
- constitutional-violation
- liquidity-risk
- bridge-risk
- oracle-risk
- protocol-risk
- concentration-risk

Status badges must be compact, readable, and color-coded using existing tokens:

- compliant: success
- restricted: warning
- under-review: accent/info
- sanctioned: error
- suspended: error/critical

---

## 18. Risk Design

Risk must be visible everywhere.

Risk should not be hidden inside tooltips.

Risk surfaces:

- dashboard summary
- vault cards
- strategy detail
- liquidity positions
- execution queue
- governance proposal preview
- transaction confirmation modal

Risk levels:

- Low
- Moderate
- Elevated
- High
- Critical

Risk categories:

- Smart Contract
- Liquidity
- Oracle
- Bridge
- Governance
- Custody
- Slashing
- Concentration
- Volatility
- Execution

Risk display pattern:

- label
- severity
- explanation
- affected capital
- recommended action
- governance requirement

---

## 19. Execution Queue

The execution queue is a core component.

It should show pending and historical financial operations.

Execution states:

- draft
- proposed
- approved
- queued
- executing
- confirmed
- failed
- expired
- cancelled
- emergency-paused

Each execution item must show:

- action type
- DAO
- vault
- strategy
- chain
- amount
- asset
- risk severity
- required approvals
- transaction hash if available
- execution ETA
- current status

Execution actions:

- Review
- Approve
- Simulate
- Execute
- Pause
- Cancel
- View Receipt

---

## 20. Transaction Confirmation UX

Transaction modals must be sober and risk-aware.

Before execution, show:

- DAO scope
- action type
- affected vault
- asset and amount
- chain
- destination protocol
- risk warnings
- governance approval
- estimated gas
- execution delay
- final confirmation

For high-risk actions require stronger confirmation:

- explicit warning
- typed confirmation
- signer confirmation
- governance reference
- emergency rollback note if available

Avoid simple "Confirm Swap" style modals.

Use:

- "Confirm Treasury Allocation"
- "Confirm Strategy Rebalance"
- "Confirm Governance-Approved Execution"
- "Confirm Emergency Pause"

---

## 21. Multi-Chain Design

The DeFi nucleus must be explicitly multi-chain.

Every financial object should show chain context.

Required chain fields:

- chain name
- chain ID
- role
- RPC/indexing state
- bridge dependency
- finality state
- last sync

Chain roles:

- Execution Chain
- Voting Chain
- Spoke Chain
- Liquidity Chain
- Treasury Chain

Cross-chain panels should show:

- treasury distribution by chain
- active strategies by chain
- bridge exposure
- pending cross-chain operations
- chain-specific risks

---

## 22. DAO/Tenant Model

DeFi must support DAO federation.

Each DAO behaves as:

- organization
- treasury entity
- governance scope
- sovereign DeFi tenant

The UI must always answer:

- Which DAO owns this vault?
- Which DAO approved this strategy?
- Which DAO treasury is exposed?
- Which governance policy applies?
- Which execution chain controls this action?

Recommended selector:

- DAO switcher at top
- active DAO context card
- treasury scope indicator
- federation tier indicator
- permission status

DAO tiers:

- Root DAO
- Product DAO
- Partner DAO
- Client DAO
- Tenant DAO
- Observer DAO

---

## 23. Data Visualization

Use Recharts for simple operational charts.

Recommended charts:

- treasury allocation donut
- capital utilization line chart
- chain exposure bar chart
- strategy performance area chart
- risk distribution chart
- vault balance history
- reward accrual chart
- liquidity depth trend

Charts must be:

- compact
- readable
- low-noise
- non-decorative
- useful for operations

Avoid:

- glowing animated charts
- 3D visuals
- hype dashboards
- decorative sparkles

---

## 24. Mobile UX

Mobile support is mandatory.

Priority mobile flows:

- DAO selection
- treasury overview
- vault inspection
- staking status
- strategy review
- risk alerts
- execution approvals
- transaction receipt review

Mobile layout rules:

- collapse tables into stacked cards
- keep treasury value visible
- prioritize risk and status
- use sticky bottom action bar for approvals
- avoid horizontal overflow
- keep technical IDs truncated with copy action

---

## 25. Component Requirements

Recommended components:

- `DefiDashboard`
- `TreasurySummaryCard`
- `CapitalAllocationGrid`
- `VaultRegistryTable`
- `VaultDetailPanel`
- `StrategyCard`
- `StrategyDetailPanel`
- `RiskBadge`
- `RiskMatrix`
- `GovernanceStatusBadge`
- `ExecutionQueuePanel`
- `TransactionReceiptCard`
- `ChainExposurePanel`
- `LiquidityPositionTable`
- `StakingValidatorTable`
- `DaoTreasuryContext`
- `PolicyRequirementPanel`
- `EmergencyControlPanel`

Reusable primitives:

- `StatusBadge`
- `MetricCard`
- `DataPanel`
- `RiskCallout`
- `MonoValue`
- `ChainBadge`
- `DaoBadge`
- `ExecutionStateBadge`
- `PolicyBadge`

---

## 26. Mock-First Architecture

During MVP, DeFi must be mock-driven.

Do not hardcode datasets inside components.

Canonical mock location:

```txt
src/data/mock/defi.mock.js
```

Recommended module structure:

```txt
src/modules/defi/components/
src/modules/defi/pages/
src/modules/defi/hooks/
src/modules/defi/services/
src/modules/defi/types/
src/modules/defi/utils/
src/modules/defi/mock/
```

Components should consume data through services and hooks.

Example hooks:

- `useDefiDashboard()`
- `useVaults()`
- `useVaultDetail(vaultId)`
- `useStrategies()`
- `useExecutionQueue()`
- `useDaoTreasuryContext()`
- `useRiskRegistry()`

---

## 27. Mock Data Requirements

The mock file should include:

### DAOs

- DAO ID
- DAO name
- federation tier
- governance status
- treasury health
- permissions
- active chains

### Vaults

- vault ID
- name
- DAO owner
- chain
- asset list
- TVL
- allocation type
- strategy
- risk tier
- status
- contract address

### Strategies

- strategy ID
- title
- DAO owner
- objective
- allowed assets
- allowed chains
- risk tier
- status
- current allocation
- target allocation
- performance history

### Liquidity Positions

- pool ID
- protocol
- chain
- pair
- position value
- pool share
- IL risk
- fee APR
- status

### Staking Positions

- validator
- chain
- delegated amount
- pending rewards
- slashing risk
- unbonding period
- status

### Execution Queue

- execution ID
- action type
- DAO
- vault
- strategy
- amount
- asset
- chain
- status
- required approvals
- transaction hash
- created time

### Risk Registry

- risk ID
- category
- severity
- reason code
- affected object
- description
- recommended action

---

## 28. Empty States

Empty states must be operational.

### No Active Strategies

```txt
No active DeFi strategies are currently approved for this DAO. Create a draft strategy or review pending governance proposals.
```

Actions:

- Create Strategy Draft
- Review Governance Queue

### No Vaults

```txt
This DAO does not yet have registered DeFi vaults. Vault creation requires governance approval and treasury policy configuration.
```

Actions:

- Register Vault
- View Treasury Policy

### No Execution Items

```txt
No DeFi executions are currently queued. Approved actions will appear here before on-chain execution.
```

---

## 29. Error States

Error states should be clear and non-alarming unless critical.

Examples:

- Indexer delayed
- Chain RPC unavailable
- Vault sync failed
- Strategy data stale
- Governance policy missing
- Treasury balance unavailable
- Execution receipt not found

Each error should include:

- severity
- affected scope
- likely cause
- recommended action
- retry or view details action

---

## 30. Accessibility

Requirements:

- strong contrast using official tokens
- no color-only risk communication
- all badges must include text labels
- all tables need readable headers
- keyboard navigation for actions
- visible focus states
- copy buttons for hashes and addresses
- responsive typography
- reduced motion compatibility

---

## 31. Motion

Animations must be subtle.

Allowed:

- hover elevation
- panel fade-in
- table row state transition
- execution status pulse
- risk indicator transition
- drawer open/close

Avoid:

- flashy gradients
- animated coins
- spinning tokens
- constant glowing
- excessive chart animation

Motion should communicate system state, not decoration.

---

## 32. Page-Level Acceptance Criteria

The DeFi nucleus design is acceptable when:

- DAO context is always visible
- treasury status is first-class
- vault ownership is clear
- strategy governance is explicit
- risk is visible before action
- execution queue is understandable
- multi-chain exposure is readable
- mobile layouts remain operational
- no casino/speculative language is present
- mock data is centralized
- components are modular and reusable
- the interface feels like financial infrastructure, not yield farming hype

---

## 33. Final Product Feeling

Axodus DeFi should feel like:

```txt
Economic infrastructure for governed capital allocation.
```

It should not feel like:

```txt
A speculative yield dashboard.
```

The user should leave the page understanding:

- which DAO controls the capital
- where funds are deployed
- what risk exists
- what governance approved
- what execution is pending
- what capital is safe, restricted, or under review
