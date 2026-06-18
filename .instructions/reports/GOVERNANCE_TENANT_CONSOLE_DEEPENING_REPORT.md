# Governance Tenant Console Deepening Report

Last updated: 2026-05-27

## Sprint

Sprint 05 — Governance Tenant Console Deepening

## Route Touched

- `/governance/console`
- Component: `src/modules/governance/pages/GovernanceDashboard.jsx`

## Components Created

- `src/modules/governance/components/GovernanceContextHeader.jsx`
- `src/modules/governance/components/GovernanceAuthoritySplit.jsx`
- `src/modules/governance/components/ConstitutionalGovernanceSection.jsx`
- `src/modules/governance/components/LocalGovernanceSection.jsx`
- `src/modules/governance/components/TenantGovernanceIdentityPanel.jsx`
- `src/modules/governance/components/GovernanceProposalStateSummary.jsx`
- `src/modules/governance/components/GovernanceReadinessPanel.jsx`
- `src/modules/governance/components/GovernanceAcsReviewPanel.jsx`
- `src/modules/governance/components/GovernanceUserParticipationPanel.jsx`
- `src/modules/governance/components/GovernanceOperationsReviewSection.jsx`

## Model Created

- `src/modules/governance/governanceConsoleModel.js`

The model composes:

- governance context header data;
- Axodus Root authority state;
- selected tenant/local governance state;
- constitutional governance state;
- local proposal state summaries;
- user participation state;
- readiness state;
- ACS review state;
- execution mode.

## Components Reused

- `PageShell`
- `SectionShell`
- `ContentGrid`
- `CardShell`
- `ScopeBadge` through shared shells
- `TenantIdentityPanel`
- existing DAO selector, executor, guardrail, proposal and registry panels

## Axodus Root Representation

Axodus Root is represented in `GovernanceAuthoritySplit` and `ConstitutionalGovernanceSection` as protocol-level constitutional authority.

It exposes:

- constitutional standing;
- global guardrails;
- reason code categories;
- federation rules;
- chain governance policy;
- protocol restrictions;
- read-only execution authority placeholder.

## Selected Tenant / Sub-DAO Representation

The selected tenant is represented in:

- `GovernanceContextHeader`;
- `GovernanceAuthoritySplit`;
- `LocalGovernanceSection`;
- `TenantGovernanceIdentityPanel`.

It exposes:

- tenant governance identity;
- tenant type;
- federation tier;
- constitutional standing inherited from Root;
- local governance status;
- local governance/voting model;
- tenant proposal counts;
- treasury governance mode;
- roles and enabled modules;
- tenant restrictions.

## Constitutional vs Local Governance

Constitutional Governance is now visually separated from Local Governance.

- Constitutional Governance answers what Axodus Root allows, restricts or requires.
- Local Governance answers how the selected DAO/company governs itself inside Axodus.

Tenant proposals are not rendered as protocol proposals. Protocol restrictions are not rendered as tenant-local decisions.

## Proposal States

`GovernanceProposalStateSummary` separates proposal lifecycle state from readiness state.

Displayed proposal metadata includes:

- scope;
- owner;
- lifecycle status;
- readiness;
- ACS review state;
- execution mode.

Allowed states remain informational. No proposal execution action was introduced.

## Readiness State

`GovernanceReadinessPanel` summarizes:

- readiness score;
- blockers;
- warnings;
- missing approvals;
- dependencies;
- execution mode.

Readiness is explicitly marked as review state, not execution permission.

## ACS Review State

`GovernanceAcsReviewPanel` summarizes:

- ACS state;
- pending reviews;
- policy checks;
- blocked actions;
- review source;
- last mock evaluation timestamp.

ACS is presented as operational review/control, not as final governance authority.

## Execution Boundary

All execution-like information remains:

- read-only;
- preview;
- simulation;
- executable-disabled.

No real governance execution, treasury execution, on-chain proposal execution, voting transaction, transfer or contract write was introduced.

## Remaining Gaps

- Existing detailed Governance panels below the new reference structure still need future consolidation.
- DAO selector is still local to the Governance console and is not yet fully synchronized with the global tenant selector.
- Proposal detail pages still need the same Root/Tenant/ACS/readiness language pass.
- Material Symbols remain in older Governance detail panels and should be replaced in a later visual cleanup sprint.
- Build chunk size warnings remain unrelated to this sprint.

## Build Result

Commands executed:

- `pnpm lint` — passed with one existing warning in `src/modules/acs/components/AcsUi.jsx` for `react-refresh/only-export-components`.
- `pnpm run build` — passed. Vite reported existing large chunk and plugin timing warnings, but no build errors.
