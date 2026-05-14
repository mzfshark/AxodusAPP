# AxodusAPP Tasks

## Foundation Tasks

- Initialize React + Vite + TypeScript workspace
- Configure Tailwind CSS
- Configure ESLint and Prettier
- Configure absolute imports
- Configure environment system
- Configure routing architecture
- Configure module registry
- Configure design system foundation

---

## Wallet Tasks

- Integrate Reown AppKit
- Configure supported chains
- Configure wallet providers
- Configure chain switching
- Configure transaction status tracking
- Configure signature handling
- Configure connection persistence

---

## Layout Tasks

- Create App Shell
- Create Public Layout
- Create Authenticated Layout
- Create Sidebar
- Create Topbar
- Create Mobile Navigation
- Create Notification Center
- Create DAO Context Selector

---

## Governance Tasks

- Create Governance public landing — in progress: `/governance` exposes public registry/governance information without wallet requirement
- Create Governance dashboard — in progress: protected `/governance/console` shell consumes the backend chain registry with fallback PoC data
- Create Governance DAO context selector — in progress: console models Axodus Constitutional Governance plus Local Governance contexts for indexed sub-DAOs
- Create DAO explorer — in progress: console exposes a Sub-DAO Explorer for constitutional authority, local governance autonomy, chain roles, capabilities, plugins and proposal readiness
- Create proposal list shell — in progress: console shows real indexed proposals when available, links rows into proposal detail, and keeps an explicit empty state otherwise
- Create proposal list
- Create proposal detail page — in progress: protected `/governance/proposals/:proposalId` reads proposal detail/actions from the governance backend
- Create governance transaction adapter — in progress: frontend isolates vote/execute preparation by plugin type and chain capability, with TokenVoting/Multisig ABI calldata binding, guarded wagmi write submission, and wallet network switching
- Create voting UI — in progress: proposal detail exposes adapter-ready vote option selection and wallet action readiness
- Create execution receipt UI — in progress: proposal detail exposes indexed remote receipts, local wallet transaction receipt tracking, and governance indexer reconciliation status
- Create local governance operation history — in progress: proposal detail persists recent wallet operations by wallet/proposal while backend indexing catches up
- Create governance transaction confirmation preview — in progress: proposal detail requires explicit review of action, chain, plugin contract, calldata, fee source and governance impact before opening the wallet prompt
- Create governance action permission guards — in progress: vote/execute operations run wallet, backend chain capability, action-level plugin capability, indexing readiness and lifecycle checks before wallet submission
- Add governance nuclei model — in progress: chain registry and frontend fallback distinguish Constitutional Governance powered by `$Neurons` from Local Governance controlled by federated entities
- Add Constitutional Guardrail reason codes — in progress: backend registry/indexer status and frontend permission guards expose transparent guardrail codes across UI/API flows
- Add governance standing model — in progress: frontend registry normalization maps legacy constitutional compatibility payloads into constitutional standing, governance status, federation tier and reason severity for rendering only
- Evolve Governance Operations Center — in progress: `/governance/console` is positioned as a federation observability surface, not a narrow DAO admin page
- Add Constitutional Guardrail observability — in progress: registry summary exposes active reason codes with severity, source, scope and network for console rendering
- Add selected governance context guardrails — in progress: console exposes reason codes affecting the selected DAO and chain context separately from global registry guardrails

---

## Defi Tasks

- Create Treasury dashboard
- Create Vault UI
- Create Staking overview
- Create Allocation tables
- Create Financial reporting components

---

## ACS Tasks

- Create Agent console
- Create Workflow monitor
- Create Telemetry dashboard
- Create Provider status page
- Create Execution log viewer

---

## Marketplace Tasks

- Create Product listing
- Create Product detail page
- Create Subscription management
- Create Billing interface
- Create Asset gallery

---

## Academy Tasks

- Create Course listing
- Create Learning dashboard
- Create Certification interface
- Create Reward visibility
- Create Learn-to-Win UI

---

## Dex Tasks

- Create Swap interface
- Create Pool explorer
- Create LP management UI
- Create Route visualization
- Create Token list management

---

## Trading Tasks

- Create Trading dashboard
- Create Strategy viewer
- Create Risk dashboard
- Create Backtest interface
- Create Portfolio telemetry

---

## Mining Tasks

- Create Mining dashboard
- Create Provider explorer
- Create Allocation visibility
- Create Reward accounting UI
- Create Compliance visibility

---

## Lottery Tasks

- Create Campaign explorer
- Create Draw history UI
- Create Reward claims UI
- Create Randomness proof visibility
- Create Participation history

---

## BBA Tasks

- Create Campaign dashboard
- Create Content manager
- Create Media analytics UI
- Create Growth reporting
- Create Brand asset explorer

---

## Shared UI Tasks

- Create Card components
- Create Table components
- Create Modal system
- Create Toast system
- Create Status indicators
- Create Form primitives
- Create Skeleton loaders
- Create Error states

---

## State Tasks

- Configure global state architecture
- Separate server state from UI state
- Configure DAO context state
- Configure wallet state
- Configure module state
- Configure session state

---

## Testing Tasks

- Configure unit testing
- Configure component testing
- Configure e2e testing
- Configure accessibility testing
- Configure visual regression testing

---

## Security Tasks

- Validate protected routes
- Validate permission-aware rendering
- Validate transaction confirmations
- Validate wallet state handling
- Validate session persistence
- Validate sensitive UI flows
