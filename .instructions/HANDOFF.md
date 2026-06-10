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
