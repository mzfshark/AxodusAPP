# Axodus Lottery Design System & UX Specification

## Purpose

Lottery is the auditable draw and randomness nucleus of Axodus.

It must not feel like a casino, betting platform, gambling app, or speculative lottery interface.

Lottery must feel like:

- verifiable randomness infrastructure;
- treasury-aware prize distribution;
- governance-supervised draw execution;
- compliance-first operational software;
- transparent public draw registry;
- DAO-controlled prize allocation system.

The design goal is to present lottery mechanics as institutional, auditable, and governance-native infrastructure.

## Product Positioning

Lottery is not a casino nucleus.

It is a governance-controlled draw infrastructure that can support:

- DAO prize campaigns;
- proof-of-randomness draws;
- NFT ticket registries;
- community allocation programs;
- treasury-funded prize pools;
- partner DAO campaigns;
- public randomness verification;
- historical audit trails.

Every draw must expose:

- governance status;
- treasury source;
- draw lifecycle;
- ticket registry;
- randomness proof;
- prize allocation;
- execution receipts;
- claim status;
- risk and compliance context.

## Visual Direction

The visual language must follow the Axodus institutional dashboard system.

Use:

- dense operational layouts;
- modular cards and panels;
- tables for draw registries;
- technical proof panels;
- treasury allocation widgets;
- execution timelines;
- status badges;
- audit logs;
- risk indicators.

Avoid:

- casino imagery;
- jackpot-first layouts;
- spinning wheels;
- slot-machine metaphors;
- neon-heavy effects;
- excessive glow;
- "get rich" messaging;
- playful gambling colors;
- dopamine-driven animations;
- speculative copywriting.

Lottery should resemble:

- Safe Global transaction review;
- Aragon governance execution;
- Stripe dashboard;
- Datadog observability;
- Chainlink proof explorer;
- treasury operations console.

## Design Tokens

Use the official Axodus tokens only.

Primary background:

- `--color-bg: #0b1326`

Primary surfaces:

- `--color-surface-primary: #1e2636`
- `--color-surface-secondary: #2d3449`
- `--color-surface-tertiary: #3b4358`

Primary text:

- `--color-text-primary: #dae2fd`
- `--color-text-secondary: #b8c3dc`
- `--color-text-muted: #908fa0`

Accent and status:

- `--color-accent: #5cc6d0`
- `--color-success: #41e4b8`
- `--color-warning: #ffb783`
- `--color-error: #ff7f7a`

Do not introduce new brand colors unless absolutely necessary.

## Typography

Use:

- Inter for interface text;
- JetBrains Mono for technical metadata.

JetBrains Mono must be used for:

- draw IDs;
- ticket IDs;
- transaction hashes;
- VRF request IDs;
- block numbers;
- treasury values;
- chain IDs;
- randomness seeds;
- proof hashes;
- Merkle roots;
- claim receipts.

## Core UX Principle

The primary user question is not:

> "How much can I win?"

The primary user question is:

> "Is this draw legitimate, funded, verifiable, governed, and executable?"

The interface must answer this immediately.

## Primary Navigation

Recommended Lottery routes:

- `/lottery`
- `/lottery/draws`
- `/lottery/draws/:drawId`
- `/lottery/tickets`
- `/lottery/prizes`
- `/lottery/randomness`
- `/lottery/history`
- `/lottery/governance`
- `/lottery/claims`
- `/lottery/treasury`

Existing MVP routes may differ. Preserve compatibility unless a route migration is explicitly requested.

## Main Pages

### Lottery Dashboard

Purpose:

Provide an operational overview of all draw activity.

Required sections:

- Active draws;
- Draw execution status;
- Treasury-backed prize pools;
- Upcoming draw schedule;
- Randomness provider status;
- Governance validation status;
- Claim queue;
- Recent execution receipts;
- Risk alerts.

Primary metrics:

- Active draws;
- Total prize pool;
- Tickets registered;
- Claims pending;
- Draws awaiting randomness;
- Draws awaiting governance validation;
- Treasury allocation health;
- Failed or delayed executions.

Dashboard tone:

- operational;
- factual;
- transparent;
- restrained.

Avoid jackpot-style hero banners.

### Active Draws

Display active draws as structured operational cards or table rows.

Each draw must show:

- draw name;
- draw ID;
- DAO owner;
- governance status;
- treasury source;
- prize pool;
- accepted ticket type;
- registration window;
- draw timestamp;
- randomness provider;
- execution chain;
- risk severity;
- current lifecycle status.

Draw statuses:

- draft;
- scheduled;
- ticket-registration-open;
- ticket-registration-closed;
- awaiting-randomness;
- randomness-received;
- winners-computed;
- awaiting-execution;
- executed;
- claims-open;
- claims-closed;
- cancelled;
- disputed.

### Draw Detail Page

This is the most important Lottery screen.

Required layout:

1. Draw summary header
2. Governance validation panel
3. Prize pool treasury panel
4. Ticket registry panel
5. Randomness proof panel
6. Winner computation panel
7. Claim and execution panel
8. Audit timeline
9. Risk and dispute panel

The page must make the draw lifecycle visually obvious.

Recommended layout:

- Left/main column: draw details, tickets, randomness, winners;
- Right/context column: governance, treasury, risk, execution receipts.

### Ticket Viewer

Ticket UI must feel like registry infrastructure, not gambling entertainment.

Ticket cards should show:

- ticket ID;
- owner wallet;
- draw ID;
- registration block;
- ticket status;
- eligibility status;
- claim status;
- NFT/SBT status;
- hash commitment;
- proof availability.

Ticket statuses:

- registered;
- pending-confirmation;
- eligible;
- ineligible;
- expired;
- winning;
- non-winning;
- claimed;
- burned;
- disputed.

Avoid scratch-card, casino ticket, or colorful betting-slip visuals.

### Prize Overview

Prize distribution must be treasury-first.

Show:

- prize pool source;
- treasury wallet;
- funding transaction;
- allocation model;
- tier distribution;
- unclaimed balance;
- returned-to-treasury amount;
- operational fees;
- partner DAO share;
- claim window;
- payout asset;
- payout chain.

Use charts sparingly.

Recommended charts:

- prize allocation by tier;
- claimed vs unclaimed;
- treasury funding over time;
- draw volume history.

### Randomness Explorer

This page must establish technical legitimacy.

Show:

- randomness provider;
- VRF request ID;
- request transaction hash;
- fulfillment transaction hash;
- block number;
- seed commitment;
- proof hash;
- final random value;
- verification status;
- provider latency;
- fallback status.

Verification statuses:

- verified;
- pending;
- failed;
- disputed;
- fallback-required.

The randomness page should feel similar to an explorer or proof console.

### Governance Validation

Lottery must be visibly governed.

Show:

- DAO owner;
- constitutional standing;
- local governance policy;
- prize pool authorization;
- draw approval proposal;
- execution permissions;
- guardrail checks;
- risk reason codes;
- dispute status.

Governance status values:

- compliant;
- restricted;
- under-review;
- sanctioned;
- suspended.

Reason code examples:

- treasury-risk;
- randomness-risk;
- ticket-registry-risk;
- payout-risk;
- execution-delay;
- governance-mismatch;
- constitutional-violation.

Severity values:

- info;
- warning;
- critical.

### Draw History

History must prioritize auditability.

Each historical draw should show:

- draw ID;
- DAO owner;
- prize pool;
- number of tickets;
- winners;
- randomness proof;
- executed transaction;
- claim completion rate;
- dispute status;
- final treasury reconciliation.

Provide filters for:

- DAO;
- chain;
- status;
- date range;
- governance status;
- randomness provider;
- claim status.

## Components

Required components:

- `LotteryStatusBadge`
- `DrawLifecycleStepper`
- `DrawCard`
- `DrawRegistryTable`
- `TicketRegistryPanel`
- `TicketStatusBadge`
- `PrizePoolPanel`
- `PrizeAllocationChart`
- `RandomnessProofPanel`
- `VRFReceiptCard`
- `WinnerComputationPanel`
- `ClaimQueuePanel`
- `GovernanceValidationPanel`
- `TreasuryFundingPanel`
- `DrawAuditTimeline`
- `RiskReasonBadge`
- `ExecutionReceiptList`
- `DisputePanel`

## Layout Rules

Use compact, dashboard-native layout.

Preferred structure:

- page shell;
- header row with title and status;
- metric grid;
- main content grid;
- right-side context panel;
- tables for registries;
- collapsible proof sections;
- timeline for execution events.

Avoid:

- giant promotional hero sections;
- oversized prize numbers;
- celebration graphics;
- decorative icons without operational meaning.

## Copywriting Rules

Use institutional language.

Use:

- "Draw";
- "Prize Pool";
- "Randomness Proof";
- "Treasury Allocation";
- "Governance Validation";
- "Execution Receipt";
- "Claim Window";
- "Ticket Registry";
- "Audit Trail".

Avoid:

- "Jackpot";
- "Bet now";
- "Lucky winner";
- "Spin";
- "Play to win";
- "Big prize";
- "Instant riches";
- "Casino";
- "Gamble".

## Mobile Requirements

Mobile must prioritize:

- active draw status;
- ticket ownership;
- claim eligibility;
- draw countdown;
- randomness verification;
- governance status;
- treasury-backed prize pool;
- execution receipt access.

Mobile layout should collapse into:

1. Status summary
2. User ticket state
3. Prize pool
4. Draw lifecycle
5. Randomness proof
6. Governance validation
7. Audit history

Tables must become stacked cards on small screens.

## Mock Data Requirements

Mock data must include:

- draws;
- tickets;
- prize tiers;
- treasury allocations;
- randomness requests;
- VRF receipts;
- governance validations;
- claims;
- disputes;
- audit events;
- DAO owners;
- chains;
- execution receipts.

Mock data must live in:

`src/data/mock/lottery.mock.js`

Components must not hardcode datasets inline.

## Recommended Module Structure

`src/modules/lottery/`

- `components/`
- `pages/`
- `hooks/`
- `services/`
- `types/`
- `utils/`
- `mock/`

Use services and hooks between UI and data.

## Implementation Notes

Lottery MVP should remain mock-first.

Do not implement:

- real betting;
- real minting;
- real payouts;
- real VRF execution;
- real treasury transfers;
- real contract writes.

The MVP may simulate:

- ticket registration;
- randomness lifecycle;
- winner computation;
- claim status;
- treasury funding;
- governance approval;
- execution receipts.

## Final Design Goal

Lottery must feel like:

> "Verifiable Draw Infrastructure for DAO-Controlled Prize Allocation"

Not:

> "Crypto Casino"
