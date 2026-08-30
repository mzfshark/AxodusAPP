# UI Rules — mandatory for Codex agents

## Non-negotiable constraints

1. Import `tokens.css`; do not add hard-coded colors, spacings, radii, shadows, or durations.
2. Use `.ax-container` and the 12-column grid; never create an arbitrary page-width wrapper.
3. Preserve page hierarchy: navigation → hero → sections → CTA/next action → footer.
4. Every hero uses an approved asset from `04-assets/svg`, at low visual prominence. Never rasterize or place text inside it.
5. One accent color leads a region. Azure is interaction; mint signals live/positive state only.
6. Prefer existing component classes. If a need recurs across two pages, add a documented variant here before using it.
7. Do not use gradients except the supplied card treatment or a documented asset. Avoid glassmorphism, random blobs, emoji icons, and arbitrary icon sets.
8. Maintain contrast: principal text `--ax-text`; supporting copy `--ax-muted`; do not lower opacity on body copy.
9. Mobile is not a scaled desktop: collapse grids to one column, retain 32px gutters, ensure buttons are 48px tall.
10. Before shipping, check: one H1, no token violations, no horizontal overflow, keyboard-visible focus, and reduced-motion-safe transitions.

## Change protocol

When changing content, modify only copy inside existing structures. When changing layout, first locate the closest component in `05-specs`. If no component fits, propose a component addition with purpose, anatomy, tokens, desktop/mobile behavior, and an example—then implement it consistently.

## Review checklist

- Is the section using the official container and spacing scale?
- Is there only one primary CTA in this visual region?
- Is the asset decorative and accessible (`alt=""`) when appropriate?
- Are visual decisions token-based and repeatable on every page?
