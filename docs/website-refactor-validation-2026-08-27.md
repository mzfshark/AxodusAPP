# Website Refactor Validation — 2026-08-27

## Scope

- Checkout: `/mnt/d/Rede/Github/Axodus/AxodusAPP`
- Branch: `refactor/institutional-ui-pack`
- Primary routes: `/`, `/platforms/`, `/what-is-axodus/`, `/research/`, `/publications/`
- Production action: none; no push or deploy performed.

## Implemented

- Applied the supplied UI-Pack tokens, shared components, layout rules, and decorative SVG assets.
- Refactored homepage messaging and navigation around the canonical institutional identity.
- Added five controlled external platform cards and three explicitly unlinked conceptual-domain cards.
- Added platform metadata and JSON-LD using the stable organization entity.
- Extended rendered-output tests for external link safety, canonical content, `sameAs`, sitemap configuration, and robots configuration.

## Validation Results

- `npm run lint`: passed without warnings in a clean Linux temporary checkout.
- `npm run build:vercel`: passed; all application routes were statically generated.
- `npm test`: passed; Vinext build and Sites artifact validation succeeded.
- Rendered HTML assertions: passed.
- Legacy-term source sweep: no current DAAS, ETF, investor-focused, or prohibited superlative positioning found in active page content.

## Notes and Blockers

- The requested Institutional path did not exist; references were read from `/mnt/d/Rede/Github/Axodus/Institutional`.
- Dependency installation reported peer-dependency and audit warnings; they did not block lint or builds and were not automatically remediated.
- Visual, responsive, accessibility, console, and social-preview acceptance remain blocked pending browser capture and human review. See `design-qa.md`.
