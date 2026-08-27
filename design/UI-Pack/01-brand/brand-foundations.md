# Brand foundations

## Color roles

| Role | Token | Value | Use |
|---|---|---:|---|
| Night | `--ax-bg` | `#07111F` | primary page canvas |
| Surface | `--ax-surface` | `#0D1B2A` | elevated regions |
| Card | `--ax-card` | `#11263A` | cards and panels |
| Line | `--ax-line` | `#28445D` | quiet separation |
| Azure | `--ax-accent` | `#44B9FF` | actions and focus |
| Mint | `--ax-signal` | `#74F3CF` | success, live state |
| Ink | `--ax-text` | `#F5FAFF` | principal copy |
| Muted | `--ax-muted` | `#A6B9CB` | secondary copy |

Do not introduce raw hex colors into components. Use semantic tokens only.

## Typography

- Display: `Manrope, Inter, system-ui, sans-serif`; 700–800 weight, tight tracking.
- Body: `Inter, system-ui, sans-serif`; 400–600 weight.
- Mono: `IBM Plex Mono, ui-monospace, monospace`; labels, metrics and architecture data.

Hero headline: clamp(42px, 6vw, 80px), line-height .98. Body: 18px / 1.65. Use sentence case; avoid all-caps except compact labels.
