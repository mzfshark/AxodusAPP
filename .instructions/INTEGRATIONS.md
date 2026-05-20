# AxodusAPP Integrations

## Integration Philosophy

AxodusAPP integrates ecosystem services through modular clients and adapters.

The frontend should never tightly couple itself to one backend implementation forever.

---

# Core Integrations

## Governance Integration

Integrates:

- proposals
- DAO registries
- execution receipts
- voting systems
- federation metadata

---

## Defi Integration

Integrates:

- treasury systems
- vaults
- staking
- allocations
- accounting

---

## ACS Integration

Integrates:

- agents
- workflows
- telemetry
- providers
- execution systems

Current integration target:
- AxodusAPP consumes ACS as an Operational Intelligence Backend.
- ACS remains authoritative for capability availability, tenant services, product access, policy decisions, operational states, readiness, warnings, restrictions, and governance requirements.
- AxodusAPP must not hardcode ACS business logic.

Default local API:

- `VITE_ACS_API_URL=http://localhost:8788`

Fallback behavior:

- Local ACS inspection mocks may be used only when the API is unavailable or `VITE_ACS_USE_MOCKS=true`.
- When fallback is active, the UI must clearly show: `Using ACS mock fallback`.

Boundaries:

- Do not receive, render, store, or log API secrets.
- Do not bypass ACS policy decisions.
- Do not hardcode tenant/product permissions in the UI.
- Do not trigger automation, trading, CEX API calls, tenant state mutation, or license mutation from ACS inspection pages.
- Display `sandbox`, `mock`, `restricted`, and `internal-validation` when applicable.

---

## Marketplace Integration

Integrates:

- products
- subscriptions
- billing
- digital assets

---

## Academy Integration

Integrates:

- courses
- certifications
- Learn-to-Win
- educational rewards

---

## Dex Integration

Integrates:

- swaps
- pools
- token lists
- routing systems

---

## Trading Integration

Integrates:

- strategies
- telemetry
- execution status
- portfolio systems

---

## Mining Integration

Integrates:

- external tokenized hash providers
- provider risk profiles
- treasury exposure summaries
- mining vault visibility
- due diligence state
- governance validations
- institutional reports

AxodusAPP consumes Mining through the standalone Mining backend service first.

Default local API:

- `VITE_MINING_API_URL=http://localhost:8787`

Service contract:

- Mining API responses must use the v1 envelope `{ data, meta, errors }`.
- `meta.source` must be `mining-api`.
- `meta.version` must be `v1`.
- `meta.mock` must remain `true` while the MVP is read-only/mock-first.
- `errors` must always be an array, including provider-not-found responses.
- AxodusAPP components consume normalized adapter output from `src/modules/mining/services/miningServiceAdapter.js`, never raw envelopes.

Fallback behavior:

- Minimal local Mining fallback data may be used only when the API is unavailable or `VITE_MINING_USE_MOCKS=true`.
- When fallback is active, the UI must clearly show: `Using local mock fallback — Mining API unavailable.`

Data ownership:

- Mining workspace owns provider registry, risk scoring, treasury exposure data, vault models, reports, governance validation data, and Fastify API responses.
- AxodusAPP owns the unified app shell, navigation, route rendering, API consumption, loading states, fallback states, and user-facing presentation.

Boundaries:

- Do not duplicate large Mining mock objects in AxodusAPP; fallback must stay minimal and clearly stale.
- Do not add wallet claims, minting, staking, provider execution, treasury movement, or smart contract execution to the Mining UI during the read-only MVP.
- Do not frame Mining as farming, staking, generic emissions, or APY-first yield.

---

## Lottery Integration

Integrates:

- campaigns
- draws
- rewards
- randomness proofs

---

# Integration Standards

Integrations should support:

- typed responses
- retries
- loading states
- caching
- telemetry
- error handling

---

# Long-Term Goal

Support ecosystem-wide interoperability without frontend lock-in.
