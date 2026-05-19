# AxodusAPP Design System Index

## Purpose

This document defines the shared design governance structure for AxodusAPP.

AxodusAPP has one unified product design system, but each nucleus may define its own product-specific design and information architecture.

The root design instructions preserve app-wide consistency.

Nucleus-level design instructions define domain-specific UX, layout priorities, operational density, terminology, and user workflows.

---

## Design Instruction Structure

Use this structure for all nucleus design files:

```txt
.instructions/
  DESIGN.md
  UI_UX.md
  design/
    governance/
      DESIGN.md
    defi/
      DESIGN.md
    acs/
      DESIGN.md
    academy/
      DESIGN.md
    marketplace/
      DESIGN.md
    mining/
      DESIGN.md
    dex/
      DESIGN.md
    trading/
      DESIGN.md
    lottery/
      DESIGN.md
    bba/
      DESIGN.md
```

Only create a nucleus `DESIGN.md` when that nucleus has product-specific design direction.

---

## Precedence

When implementing UI:

1. Follow global AxodusAPP architecture and UI rules in:
   - `.instructions/ARCHITECTURE.md`
   - `.instructions/UI_UX.md`
   - `.instructions/DESIGN.md`

2. Then follow the nucleus-specific design file when it exists:
   - `.instructions/design/<nucleus>/DESIGN.md`

3. If there is a conflict, preserve app-wide design system consistency unless the nucleus-specific document intentionally defines a stronger domain requirement.

4. If a nucleus-specific decision changes the shared design system, update this root file or `.instructions/UI_UX.md`.

---

## Shared App Design Principles

AxodusAPP must remain:

- institutional
- modular
- low-noise
- operational
- transparent
- security-conscious
- DAO-aware
- chain-aware
- responsive
- consistent across nuclei

Avoid:

- casino aesthetics
- excessive gradients
- oversized marketing sections inside operational tools
- decorative-only UI
- inconsistent card systems
- disconnected one-off layouts
- hidden execution or risk state

---

## Shared Design System Sources

All nuclei must reuse the existing AxodusAPP design system.

Primary references:

- `src/styles/tokens.css`
- `src/styles/tailwindcss.css`
- `src/styles/Global.css`
- `.instructions/UI_UX.md`
- `.instructions/ARCHITECTURE.md`

Core token families:

```css
--color-bg
--color-surface-primary
--color-surface-secondary
--color-border-muted
--color-text-primary
--color-text-secondary
--color-accent
--color-success
--color-warning
--color-error
```

Nucleus design files may define information architecture and visual emphasis, but they must not replace the shared token system.

---

## Global Layout Contract

AxodusAPP uses one global application shell for:

- header/topbar
- sidebar navigation
- mobile navigation drawer
- footer
- scroll/content ownership
- shared page width and spacing defaults
- global token, typography, surface and border behavior

The global shell must remain nucleus-aware, but it must not own nucleus-specific product UI.

Global shell responsibilities:

- identify the active nucleus from the current route
- expose the active nucleus through layout metadata and CSS attributes
- render consistent ecosystem navigation
- render a retractable sidebar with two navigational modes sharing the same layout slot:
  - global mode for ecosystem nucleus navigation
  - nucleus mode for active nucleus navigation, filters, sections and workflow shortcuts
  - nucleus mode must include a return control back to global mode
- provide stable responsive behavior for desktop and mobile
- keep wallet, notification, search and settings surfaces globally available
- provide the content viewport where each nucleus renders its own pages

Nucleus responsibilities:

- define domain-specific information architecture in `.instructions/design/<nucleus>/DESIGN.md`
- define module-level section navigation when needed
- define listing filters in a URL-addressable way when filters belong in the secondary sidebar
- define product-specific cards, tables, workflow panels and density
- preserve global tokens, surfaces, typography, border behavior and accessibility rules
- avoid duplicating global header, sidebar, mobile navigation or footer inside pages

Implementation rule:

- shared shell code belongs in `src/layouts`, `src/components`, `src/config` and `src/styles`
- nucleus-specific UI belongs in `src/modules/<nucleus>`
- the active nucleus navigation must replace the global sidebar content, not add a second permanent sidebar column
- the global shell may add a light contextual tone for the active nucleus, but it must not replace the nucleus UI language
- pages should render inside the global content viewport using shared wrappers such as `app-view-shell` or nucleus-specific shell components

---

## Nucleus Design Registry

| Nucleus | Design File | Status |
| --- | --- | --- |
| Governance | `.instructions/design/governance/DESIGN.md` | Active |
| Defi | `.instructions/design/defi/DESIGN.md` | Active |
| ACS | `.instructions/design/acs/DESIGN.md` | Pending |
| Academy | `.instructions/design/academy/DESIGN.md` | Active |
| Business | `.instructions/design/business/DESIGN.md` | Active |
| Marketplace | `.instructions/design/marketplace/DESIGN.md` | Active |
| Mining | `.instructions/design/mining/DESIGN.md` | Active |
| Dex | `.instructions/design/dex/DESIGN.md` | Active |
| Trading | `.instructions/design/trading/DESIGN.md` | Pending |
| Lottery | `.instructions/design/lottery/DESIGN.md` | Active |
| BBA | `.instructions/design/bba/DESIGN.md` | Active |

---

## Implementation Rule

Before implementing UI in any nucleus:

1. Read this root `DESIGN.md`.
2. Read `.instructions/UI_UX.md`.
3. Read `.instructions/design/<nucleus>/DESIGN.md` if it exists.
4. Preserve shared AxodusAPP layout, typography, color, surface, spacing, and navigation conventions.
5. Implement nucleus-specific UX only within that unified system.
