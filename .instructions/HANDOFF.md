# AxodusAPP Handoff

Last updated: 2026-06-10

## AXAPP-REQ-01 Portfolio Registry Consumer Layer

Current handoff state: CONSUMER_LAYER_ESTABLISHED

Product surface:

- `src/features/portfolio/types.ts`
- `src/features/portfolio/portfolioRegistry.fixture.ts`
- `src/features/portfolio/portfolioSourceAdapter.ts`
- `src/features/portfolio/portfolioRegistryService.ts`
- `src/features/portfolio/portfolioBoundaries.ts`
- `src/features/portfolio/index.ts`

Use this layer for future read-only portfolio UI work. Do not bypass it with live API calls, browser filesystem reads, wallet hooks or mutation clients.

Next recommended request:

- AXAPP-REQ-02 - Portfolio Overview Dashboard

Deferred gaps:

- dashboard not implemented;
- nucleus detail views not implemented;
- dependency graph viewer not implemented;
- opportunity registry viewer not implemented;
- Business-to-AxodusAPP consumer contract still requires formalization in AXAPP-REQ-07.

## AXAPP-REQ-02 Portfolio Overview Dashboard

Current handoff state: DASHBOARD_ESTABLISHED

Product surface:

- `src/features/portfolio/components/PortfolioOverviewDashboard.tsx`
- `src/features/portfolio/components/PortfolioMetricCard.tsx`
- `src/features/portfolio/components/PortfolioMaturityDistribution.tsx`
- `src/features/portfolio/components/PortfolioBoundaryNotice.tsx`
- `src/pages/PortfolioOverview.jsx`
- route: `/portfolio`

Use this page as the first read-only portfolio control center. Future portfolio UI work should continue to consume `portfolioRegistryService` rather than importing raw fixture data.

Next recommended request:

- AXAPP-REQ-03 - Nucleus Detail View

Deferred gaps:

- nucleus detail views not yet implemented;
- dependency graph viewer not yet implemented;
- opportunity registry viewer not yet implemented;
- authority dashboard not yet implemented;
- formal Business-to-AxodusAPP consumer contract remains for AXAPP-REQ-07.

## AXAPP-REQ-04 Dependency Graph Viewer

Current handoff state: DEPENDENCY_GRAPH_VIEWER_ESTABLISHED

Product surface:

- `src/features/portfolio/pages/DependencyGraphView.tsx`
- `src/features/portfolio/components/DependencyGraph.tsx`
- route: `/portfolio/dependencies`

Use this page as the read-only dependency graph viewer. It exposes official dependency summary counts, representative service dependency records, critical chain visualization, burden classification and ecosystem hub signals without resolving dependencies or invoking integrations.

Next recommended request:

- AXAPP-REQ-05 - Opportunity Registry Viewer

Deferred gaps:

- opportunity registry viewer not yet implemented;
- authority dashboard not yet implemented;
- full graph data expansion beyond current representative service records not yet implemented;
- formal Business-to-AxodusAPP consumer contract remains for AXAPP-REQ-07.

## AXAPP-REQ-05 Opportunity Registry Viewer

Current handoff state: OPPORTUNITY_REGISTRY_VIEWER_ESTABLISHED

Product surface:

- `src/features/portfolio/pages/OpportunityRegistryView.tsx`
- `src/features/portfolio/components/OpportunityRegistry.tsx`
- route: `/portfolio/opportunities`

Use this page as the read-only opportunity registry viewer. It exposes official opportunity summary counts, filterable opportunity records, selected opportunity intelligence and authority boundaries without approval, promotion or workflow execution.

Next recommended request:

- AXAPP-REQ-06 - Boundary & Authority Dashboard

Deferred gaps:

- boundary and authority dashboard not yet implemented;
- richer opportunity detail routes not yet implemented;
- full dependency expansion beyond current representative service records not yet implemented;
- formal Business-to-AxodusAPP consumer contract remains for AXAPP-REQ-07.

## AXAPP-REQ-06 Boundary & Authority Dashboard

Current handoff state: AUTHORITY_DASHBOARD_ESTABLISHED

Product surface:

- `src/features/portfolio/pages/AuthorityDashboardView.tsx`
- `src/features/portfolio/components/AuthorityDashboard.tsx`
- route: `/portfolio/authority`

Use this page as the read-only authority and boundary dashboard. It exposes execution authority, blocked action and boundary conflict summaries without granting authority, executing workflows or resolving blockers.

Next recommended request:

- AXAPP-REQ-07 - Business <-> AxodusAPP Consumer Contract

Deferred gaps:

- Business-to-AxodusAPP consumer contract not yet implemented;
- full blocked action registry data expansion beyond current official summary counts not yet implemented;
- full boundary conflict registry data expansion beyond current official summary counts not yet implemented;
- authority-changing workflows remain prohibited.

## AXAPP-REQ-03 Nucleus Detail View

Current handoff state: DETAIL_VIEW_ESTABLISHED

Product surface:

- `src/features/portfolio/pages/NucleusDetailView.tsx`
- `src/features/portfolio/components/NucleusSummaryCard.tsx`
- route: `/portfolio/:nucleusId`

Use this page as the read-only nucleus inspection view. Future dependency and opportunity visualizations should continue to consume `portfolioRegistryService`.

Next recommended request:

- AXAPP-REQ-04 - Dependency Graph Viewer

Deferred gaps:

- dependency graph viewer not yet implemented;
- opportunity registry viewer not yet implemented;
- authority dashboard not yet implemented;
- formal Business-to-AxodusAPP consumer contract remains for AXAPP-REQ-07.

## AXAPP-REQ-07 Business to AxodusAPP Consumer Contract

Current handoff state: BUSINESS_CONSUMER_CONTRACT_ESTABLISHED

Product surface:

- `src/features/portfolio/contracts/businessPortfolioContract.ts`
- `src/features/portfolio/contracts/businessPortfolioContractValidator.ts`
- `src/features/portfolio/contracts/businessPortfolioRefreshPolicy.ts`
- `docs/architecture/business-axodusapp-consumer-contract.md`

Use this contract as the formal Business-to-AxodusAPP portfolio intelligence boundary. Business remains the producer. AxodusAPP remains the read-only consumer and must continue to consume the Portfolio Registry Consumer Layer rather than creating live APIs or raw fixture bypasses.

Next recommended request:

- AXAPP-REQ-08 - Integration Readiness Assessment

Deferred gaps:

- sprint-level integration readiness assessment not yet completed;
- future live/API transport not implemented;
- polling, synchronization, backend integration and production credentials remain prohibited;
- authority-changing, wallet, treasury, trading, settlement, payout, provisioning and on-chain workflows remain prohibited.

## AXAPP-REQ-08 Integration Readiness Assessment and Portfolio Handoff

Current handoff state: PORTFOLIO_INTELLIGENCE_L4_CONSOLIDATED

Assessment:

- `PROMOTE_TO_L4_CONSOLIDATED`

Product state:

- Portfolio Consumer Layer established.
- Portfolio Overview Dashboard established.
- Nucleus Detail View established.
- Dependency Graph Viewer established.
- Opportunity Registry Viewer established.
- Boundary & Authority Dashboard established.
- Business Consumer Contract established.

Use AxodusAPP as the read-only portfolio intelligence hub for future portfolio planning and consolidation cycles.

Next recommended portfolio action:

- Marketplace L4 Consolidation

Deferred gaps:

- production readiness remains unclaimed;
- live/API portfolio transport remains unimplemented;
- full dependency graph expansion remains future work;
- full blocked action and boundary conflict registry expansion remains future work;
- execution, wallet, treasury, trading, swaps, settlement, payouts, ACS provisioning and on-chain writes remain prohibited.
