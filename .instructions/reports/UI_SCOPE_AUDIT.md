# UI Scope Audit

Date: 2026-05-27

Sprint: 00B — Information Architecture & UI Scope Separation

## Summary

AxodusAPP now has a shared information architecture vocabulary for distinguishing protocol, user, tenant and operator information. This sprint does not complete visual normalization. It creates the semantic contract needed to stop module cards from appearing at the same level without ownership context.

## Scope Contract

- `protocol`: Axodus ecosystem, constitutional, registry, policy, chain, treasury and nucleus-level state.
- `user`: connected wallet/account, learning progress, access rights, ownership, purchases and personal activity.
- `tenant`: selected company, Sub-DAO, DAO workspace, seller, treasury route, local proposals and tenant operations.
- `operator`: ACS, admin, review, triage, blockers, queues, validation and execution-control surfaces.

## Route Audit

### `/` and `/dashboard`

- Module: dashboard/ecosystem
- Current scope: mixed dashboard
- Expected scope: protocol overview with explicit user, tenant and operator sections
- Mixed information found: ecosystem readiness, wallet state, DAO operations and ACS workflows were visually adjacent without a shared ownership contract
- Protocol data found: active nuclei, governance-first posture, Defi read-only treasury summary
- User data found: wallet state, Academy progress, Marketplace access
- Tenant data found: DAO profile and Business runtime boundary
- Operator data found: ACS workflows and review queue summary
- Recommended normalization: keep the dashboard as the top-level scope index and avoid using it as a generic card dump
- Risk: high, because this is the first surface users see

### `/governance`

- Module: Governance
- Current scope: protocol and tenant information
- Expected scope: protocol overview plus tenant discovery
- Mixed information found: executive governance metrics and featured DAO tenant previews were visible without scope labels
- Protocol data found: constitutional standing, executive metrics, governance health
- User data found: none directly
- Tenant data found: featured tenant previews and DAO discovery links
- Operator data found: none directly
- Recommended normalization: keep overview metrics protocol-scoped and label DAO discovery as tenant-scoped
- Risk: medium

### `/governance/console`

- Module: Governance
- Current scope: tenant and operator console
- Expected scope: tenant operations center with explicit operator execution controls
- Mixed information found: DAO tenant operations, selected-chain governance data and execution panels were close together without visual scope boundaries
- Protocol data found: constitutional layer and chain registry context
- User data found: wallet readiness where action guards are shown
- Tenant data found: selected DAO profile, local proposals, treasury policy, plugins and receipts
- Operator data found: executor panel, guardrails, readiness checks and blocked actions
- Recommended normalization: continue separating tenant operations from operator execution-control panels; do not enable execution from scope wrappers
- Risk: high, because this route affects governance understanding and future action safety

### `/business`

- Module: Business
- Current scope: tenant and operator runtime preview
- Expected scope: tenant workspace telemetry plus operator review/control data
- Mixed information found: summary cards, runtime health, workflow readiness, treasury exposure and telemetry were presented as a single operational surface
- Protocol data found: execution policy and validator posture
- User data found: none directly
- Tenant data found: runtime readiness, project lifecycle, registry relationships
- Operator data found: review counts, blocked workflows, critical events and security validator status
- Recommended normalization: keep Business as tenant/operator first; avoid personal account assumptions in Business runtime cards
- Risk: high, because Business can be mistaken for executable backend/runtime control

### `/marketplace`

- Module: Marketplace
- Current scope: tenant commerce plus operator validation
- Expected scope: tenant marketplace registry with separate operations review
- Mixed information found: listings, treasury destinations, orders in review and publisher blockers were all rendered as marketplace metrics
- Protocol data found: governance-aware marketplace boundaries
- User data found: product access and ownership surfaces in downstream routes
- Tenant data found: listings, sellers, DAO ownership, treasury destinations
- Operator data found: ACS review, orders in review, restricted subscriptions and publisher blockers
- Recommended normalization: keep product listings tenant-scoped and review queues operator-scoped
- Risk: medium

### `/academy`

- Module: Academy
- Current scope: user progress plus protocol policy/readiness
- Expected scope: user learning state separated from protocol education/reward policy
- Mixed information found: personal progression metrics and MVP flow coverage were both rendered as Academy content without semantic distinction
- Protocol data found: reward doctrine, contract compatibility and flow coverage
- User data found: locked/unlocked mock balances, trust score and PoK readiness
- Tenant data found: none directly on the home route
- Operator data found: governance/ACS review concepts in downstream review routes
- Recommended normalization: keep learner metrics user-scoped and policy/readiness protocol-scoped
- Risk: medium

### `/defi`

- Module: Defi
- Current scope: protocol and future tenant treasury read model
- Expected scope: protocol read-only treasury overview, with tenant treasury surfaces separated later
- Mixed information found: treasury values, vaults and risk data can be misread as executable finance actions if not labeled
- Protocol data found: treasury summary, vault count, allocation and risk overview
- User data found: none expected for this sprint
- Tenant data found: future selected-tenant treasury allocations
- Operator data found: future treasury review/guardrail queues
- Recommended normalization: apply `ScopedCard` and action-disabled metadata before adding any financial action controls
- Risk: high, because Defi surfaces are financially sensitive

### `/connect`

- Module: Connect / Wallet
- Current scope: user
- Expected scope: user wallet state plus protocol chain support
- Mixed information found: wallet connection state can sit next to supported-chain protocol data
- Protocol data found: supported chains
- User data found: connected/disconnected/wrong-network states
- Tenant data found: none directly
- Operator data found: none directly
- Recommended normalization: separate chain support from wallet status and show missing configuration as a user-facing state, not infinite loading
- Risk: medium

## Implementation Notes

- Shared UI scope types were added under `src/types/uiScope.ts`.
- Reusable scope components were added under `src/components/uiScope/`.
- A minimal module registry with scope metadata was added under `src/config/moduleRegistry.js`.
- Initial route application covers dashboard, Governance, Business, Marketplace and Academy.
- No real blockchain, treasury, governance, marketplace, ACS or Business execution was introduced.

## Remaining Work

- Apply scoped cards to Defi, Connect, Settings, MCPs, Lottery, Mining and DEX.
- Extend route metadata so navigation can group Protocol Overview, My Axodus, Tenant Console and Operations consistently.
- Add developer/audit toggles only after the visual shell is stable.
- Keep UI polish as a later sprint after build and scope semantics remain stable.
