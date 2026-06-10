# BUB_AGENTS.md

Operational guidance for using bub-agents inside the AxodusAPP workspace.

## Purpose

Bub-agents are advisory execution-support agents for planning, architecture review, security review, QA, documentation, and implementation analysis. They do not override the latest user instruction, this workspace `.instructions`, repository reality, security constraints, or Axodus architecture principles.

The Coding Execution Agent remains responsible for final decisions, edits, validation, commit, and report.

## Workspace Context

Workspace: `AxodusAPP`

Repository root: `/mnt/d/Rede/Github/Axodus/AxodusAPP`

Primary responsibility: user-facing application shell, navigation, nucleus access surfaces, dashboards, wallet/session presentation, and consumption of official Axodus state.

## When To Use Bub-Agents

Use bub-agents for multi-file changes, routing/layout restructuring, guarded routes, cross-nucleus UI, wallet/session flows, official documentation consumption, API/service behavior, test planning, documentation updates, or sprint-level execution.

Do not use bub-agents for typo fixes, simple text changes, trivial imports, isolated formatting, or obvious one-line fixes.

## Roles

- Planner: task decomposition, affected files, execution order, risks, acceptance criteria.
- Architect: app shell, route boundaries, Core/Governance/ACS/product integration.
- Frontend: React/Vite components, pages, layouts, hooks, responsive behavior.
- Backend: API clients, services, validation, errors.
- Web3: wallet state, transaction preview, read-only vs execution separation.
- Security: auth guards, wallet-protected routes, secrets, unsafe UI assumptions.
- QA: route coverage, responsive checks, regression and manual validation.
- Documentation: `.instructions`, README, decisions, workflow, readiness notes.

## Delegation Template

```md
# Bub-Agent Task
Role:
Workspace: AxodusAPP
Repository: /mnt/d/Rede/Github/Axodus/AxodusAPP
Task:
Relevant context:
Expected output:
- findings
- risks
- affected files
- recommended steps
- acceptance criteria
Constraints:
- Follow workspace `.instructions`.
- Keep UI separate from policy and execution ownership.
- Mark uncertainty clearly.
```

## Workspace-Specific Rules

- AxodusAPP renders user-facing state; it must not define official protocol facts.
- Official Axodus facts should come from docs/wiki, Core Registry, ACS, Governance, or product nuclei.
- Wallet-protected routes must remain behind connection/auth guards.
- Do not duplicate global Header, Sidebar, Footer, or Layout inside pages when a central Layout exists.
- Do not let UI state imply Governance approval, ACS authorization, treasury movement, or chain execution.
- Keep wallet logic isolated from UI components where possible.
- Product access should be presented from entitlements, ACS decisions, or nucleus-owned state, not hardcoded assumptions.

## Conflict Resolution

Resolve conflicts in this order: latest user instruction, workspace `.instructions`, repository architecture, security requirements, smallest safe change, maintainability, bub-agent recommendation.

If unresolved, stop and report the blocker.

## Final Report

State whether bub-agents were used, roles used, key findings, accepted recommendations, rejected recommendations, tests run, and remaining risks.

## Commit Behavior

When a sprint is completed, run practical validation, check `git status`, commit the completed sprint, and report the commit hash.

Recommended commit format: `axodusapp: <short description>`

