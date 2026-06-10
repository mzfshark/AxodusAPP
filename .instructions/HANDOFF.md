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
