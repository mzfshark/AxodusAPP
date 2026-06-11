# Business to AxodusAPP Consumer Contract

## Purpose

This document defines the official read-only consumer contract between Business and AxodusAPP for portfolio intelligence.

Business produces portfolio intelligence. AxodusAPP consumes and renders that intelligence through the Portfolio Registry Consumer Layer.

## Ownership

Business owns portfolio intelligence coordination and source material.

AxodusAPP owns presentation, navigation and validation of the read-only consumer surface.

Governance, Treasury and each owning nucleus retain authority for execution-sensitive decisions. This contract grants none.

## Producer

Business is the producer.

Producer responsibilities:

- maintain portfolio intelligence source material;
- define official read models for AxodusAPP consumption;
- preserve non-executive portfolio coordination boundaries;
- escalate execution-sensitive gaps to the correct authority owner.

## Consumer

AxodusAPP is the consumer.

Consumer responsibilities:

- consume `portfolioRegistryService` and exported contract types;
- render portfolio intelligence as read-only product surfaces;
- validate read-only, no-execution and no-production guarantees;
- avoid API, polling, wallet, transaction, approval and mutation behavior.

## Data Domains

The contract covers:

- portfolio snapshot;
- nucleus records;
- opportunity records;
- dependency records;
- authority records;
- ownership, maturity, blocker and boundary summaries exposed by the registry snapshot.

## Boundary Rules

- Read-only only.
- No execution authority.
- No production readiness claim.
- No mutation methods.
- No runtime synchronization.
- No polling.
- No backend API integration.
- No production credentials.
- No wallet signing, treasury movement, trading, settlement, payout, ACS provisioning, contract deployment or on-chain writes.

## Future Evolution

A future live transport may be planned only through a separate approved request.

Any future transport must remain read-only, use explicit contracts, and preserve the same boundary guarantees before AxodusAPP can consume it.

## Non-Goals

- Create APIs.
- Create sync services.
- Create polling.
- Create backend integrations.
- Create mutation flows.
- Grant execution authority.
- Enable production behavior.
- Resolve portfolio blockers.
- Promote or approve opportunities.
