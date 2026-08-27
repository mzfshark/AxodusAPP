# Axodus Website Refactor Audit — 2026-08-27

## Scope and sources

- Website checkout: `/mnt/d/Rede/Github/Axodus/AxodusAPP`
- Working branch: `refactor/institutional-ui-pack`
- Framework: Next.js 16 App Router with Vinext/Vite build support
- Visual source: `design/UI-Pack/`
- Institutional source found at `/mnt/d/Rede/Github/Axodus/Institutional`; the requested `/mnt/d/Rede/Axodus/Institutional` path is absent.

## Current public route inventory

Approved sitemap routes are `/`, `/what-is-axodus/`, `/architecture/`, `/governance/`, `/research/`, `/publications/`, and `/platforms/`. Legacy route surfaces remain in the source but are excluded from the sitemap and use controlled metadata.

## Baseline findings

- The canonical description, canonical URLs, Open Graph/Twitter metadata, sitemap, robots file, and stable organization JSON-LD already exist.
- JSON-LD is present on the homepage and `/what-is-axodus/`, but not yet on `/platforms/`.
- The current visual system uses a light paper/teal/orange palette and page-specific styles. It does not follow the UI-Pack Night/Azure/Mint token contract.
- Header, hero, cards, buttons, badges, footer, and responsive rules need consolidation around the documented UI-Pack components.
- `/platforms/` contains generic surface examples rather than the approved five external platforms and three conceptual domains.
- Current public copy avoids legacy DAAS/ETF positioning. Boundary language for adoption, revenue, performance, security, and production status is present.

## UI-Pack mapping

- `tokens.css` controls color, typography, spacing, radius, shadow, motion, and container widths.
- `components.css` defines the hero, buttons, badges, cards, navigation, footer, architecture blocks, and mobile collapse behavior.
- Approved decorative assets are `hero-network.svg`, `hero-orbit.svg`, and `blueprint-grid.svg`.
- Required hierarchy is navigation → hero → bounded sections → next action → footer.

## External destination check

Checked on 2026-08-27: Academy, Marketplace, BBA, ACS, and Governance each returned HTTP 200 at the approved HTTPS URL. Their availability does not establish adoption, partnership, implementation maturity, or editorial equivalence.

## Implementation gaps

1. Apply UI-Pack tokens and shared components across the five priority routes.
2. Replace `/platforms/` with controlled external and conceptual card groups.
3. Add `/platforms/` JSON-LD and verify unique metadata.
4. Add deterministic checks for platform URLs, no-link conceptual cards, claims, and rendered metadata.
5. Perform build, lint, link, responsive, accessibility, and visual comparison checks before human preview review.

