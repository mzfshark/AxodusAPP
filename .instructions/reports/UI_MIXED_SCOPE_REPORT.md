# UI Mixed Scope Report

Date: 2026-05-27

Sprint: 00C — UI Route & Card Inventory

## Summary

The main source of visual confusion is not only styling. Several routes combine protocol, user, tenant and operator data without a consistent visual ownership model. Sprint 00B introduced initial scope components; Sprint 00C identifies where deeper decomposition is still required.

## High-Priority Mixed Pages

### `/` and `/dashboard`

- Why confusing: dashboard surfaces can easily become a catch-all for ecosystem, wallet, tenant and operations cards.
- Protocol information found: MVP phase, module registry, governance status, Defi treasury summary.
- User information found: wallet state, Academy progress, Marketplace access.
- Tenant information found: DAO profile, Business runtime boundary.
- Operator information found: ACS workflows and review queues.
- Should remain: top-level scope index and protocol overview.
- Should move later: deeper account metrics to `/account` or `/me`; tenant operations to `/governance/tenants` or future tenant console; operator queues to `/acs` or `/business/review-queue`.
- Future layout: four explicit dashboard lanes: Protocol Overview, My Axodus, Tenant Console, Operations.

### `/governance`

- Why confusing: governance overview and tenant discovery appear in one module surface.
- Protocol information found: constitutional standing, governance health, treasury status, active chains.
- User information found: indirect wallet/governance readiness links only.
- Tenant information found: featured tenant cards, DAO tenant discovery entry points.
- Operator information found: minimal.
- Should remain: protocol-level governance summary and entry point to tenant discovery.
- Should move later: detailed tenant comparison to `/governance/tenants`.
- Future layout: Protocol Governance at top, Tenant Discovery below with scope label.

### `/governance/console`

- Why confusing: selected DAO context, constitutional layer, registry guardrails and execution panels appear in one operations surface.
- Protocol information found: constitutional layer, chain registry, guardrail reason codes.
- User information found: connected wallet, vote/execute readiness, recent wallet operations.
- Tenant information found: selected DAO, proposals, plugins, treasury policy, products, agents.
- Operator information found: executor panel, permission checks, review receipts, blocked actions.
- Should remain: tenant operations workspace and selected DAO context.
- Should move later: protocol chain registry to a protocol tab; execution-control panels to an Operator/Actions tab; wallet history to My Participation.
- Future layout: Tenant State, Proposal Queue, Operator Controls, Protocol Guardrails.

### `/governance/dao/:daoId`

- Why confusing: public tenant detail currently mixes tenant strategy, user position, risk/APR comparison and operational receipts.
- Protocol information found: constitutional observability and chain/federation context.
- User information found: user position and voting-power-like data.
- Tenant information found: tenant profile, products, strategy, treasury allocation.
- Operator information found: pending operations and receipts.
- Should remain: tenant profile, strategy, local governance, public risk posture.
- Should move later: user position to My Axodus; operations receipts to tenant console/operator area.
- Future layout: Public Tenant Profile, Tenant Treasury Read Model, My Position, Operations.

### `/business`

- Why confusing: runtime health, review queues, treasury exposure, project lifecycle and telemetry render together.
- Protocol information found: execution policy and validator posture.
- User information found: little direct user data.
- Tenant information found: projects, assets, registry, workflows, treasury exposure.
- Operator information found: review counts, blocked workflows, critical events, telemetry, security validators.
- Should remain: tenant/operator runtime overview.
- Should move later: finance/debenture/funding content to finance subroutes; debug runtime to operator diagnostics.
- Future layout: Tenant Runtime, Operator Review, Finance Read Model, Telemetry.

### `/marketplace`

- Why confusing: public product/listing information and operator validation counts appear at the same level.
- Protocol information found: marketplace/governance boundary and lifecycle policies.
- User information found: product discovery and future access/purchase flows.
- Tenant information found: sellers, listings, DAO ownership, treasury destinations.
- Operator information found: ACS review, restricted subscriptions, publisher blockers.
- Should remain: tenant marketplace registry and product discovery.
- Should move later: orders in review, publisher blockers and treasury route review to operator/publisher pages.
- Future layout: Product Discovery, Tenant Listings, Governance/ACS Review.

### `/marketplace/products/:slug`

- Why confusing: product detail combines product metadata, user purchase intent, seller/tenant state, royalties and governance/ACS blockers.
- Protocol information found: lifecycle policy, chain/contract readiness.
- User information found: buy/bid preview and ownership/access readiness.
- Tenant information found: seller, DAO owner, treasury destination.
- Operator information found: ACS validation, blockers, settlement eligibility.
- Should remain: product facts and disabled preview.
- Should move later: settlement/royalty accounting to operator subpanel; tenant registry to seller profile.
- Future layout: Product, Access, Seller/Tenant, Review & Settlement.

### `/academy`

- Why confusing: user progress and protocol reward doctrine are presented within one educational landing surface.
- Protocol information found: reward doctrine, future contract compatibility, flow coverage.
- User information found: trust score, locked/unlocked mock rewards, PoK readiness.
- Tenant information found: minimal.
- Operator information found: review concepts and governance validation references.
- Should remain: Academy introduction and learner state.
- Should move later: protocol reward doctrine to Academy policy tab; review queues to `/academy/governance-review`.
- Future layout: Learner State, Course Discovery, Protocol Doctrine, Review Status.

### `/defi`

- Why confusing: treasury, vaults, allocations and risk can read like actionable finance even in read-only mode.
- Protocol information found: protocol treasury overview and allocation model.
- User information found: none expected.
- Tenant information found: future tenant treasury/vault allocation candidates.
- Operator information found: future risk reviews and governance actions.
- Should remain: protocol read-only treasury/risk overview.
- Should move later: tenant-specific allocation views to tenant console; risk review to operator area.
- Future layout: Protocol Treasury, Vault Registry, Risk Overview, Pending Governance Actions.

### `/dex`

- Why confusing: swap UI shape implies execution while current MVP should be read-only.
- Protocol information found: pool and pair information.
- User information found: swap-card-like token input.
- Tenant information found: none.
- Operator information found: none.
- Should remain: read-only DEX pair/liquidity visibility.
- Should move later: swap inputs until wallet, chain and execution guards exist.
- Future layout: Pair Registry, Pool Overview, Swap Disabled State.

### `/mining`

- Why confusing: provider registry, vaults, allocations, treasury, risk and action routes sit under one nucleus with financial/operational language.
- Protocol information found: mining model, hash-token policy, reports.
- User information found: minimal or future-only.
- Tenant information found: vaults, allocations, treasury exposure.
- Operator information found: provider diligence, telemetry, accounting, reconciliation, risk.
- Should remain: protocol mining overview with read-only status.
- Should move later: provider diligence to operator area; vault allocation to tenant/treasury area.
- Future layout: Protocol Mining Model, Provider Diligence, Tenant Allocation, Operations/Risk.

### `/lottery`

- Why confusing: draw status, prize pools, ticket state and governance/randomness are close together.
- Protocol information found: draws, game models, VRF/randomness, prize model.
- User information found: tickets.
- Tenant information found: potential campaign/tenant draw ownership.
- Operator information found: governance and randomness review.
- Should remain: read-only lottery overview and draw registry.
- Should move later: ticket ownership to user route; governance/randomness review to operator route.
- Future layout: Draw Registry, My Tickets, Prize Policy, Operator Proofs.

### `/acs`

- Why confusing: ACS overview includes protocol capabilities, tenant services, wallet/product policy and operator notices.
- Protocol information found: capabilities and automation policy.
- User information found: demo wallet product access/readiness.
- Tenant information found: tenant services and restrictions.
- Operator information found: notices, debug, emergency stop, receipts, secret safety.
- Should remain: operator ACS overview.
- Should move later: wallet readiness to user area; tenant services to tenant console; raw debug behind admin/operator grouping.
- Future layout: ACS Status, Tenant Services, User/Product Eligibility, Operator Debug.

## Medium-Priority Mixed Pages

- `/settings`: app settings and feature flags mix user preferences with protocol feature state.
- `/mcps`: service catalog, warnings and terminal feed mix protocol and operator information.
- `/bba`: agency positioning, services, campaigns and governance validation mix tenant and operator surfaces.
- `/marketplace/dashboard`: federation dashboard metrics mix tenant commerce, protocol integrations and operator review.
- `/business/finance`, `/business/risk`, `/business/debentures`, `/business/funding`: tenant finance read models and operator review states need explicit separation.

