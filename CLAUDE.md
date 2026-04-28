# CLAUDE.md — 10K Humans brand system

## What this repo is
The single source of truth for 10K Humans brand and visual system. Used by every client-facing app (calculator, client portal, PM dashboard, 10K Voices, …).

Created 2026-04-28 by Kerry + Claude as part of the bids-feasibility-calculator design pass (Option A2 — Brand-forward purple).

## How to think about it
Three layers, ordered by reach:
1. **`src/tokens/`** — primitive values (color hex codes, type stack, radius scale). `index.js` for JS imports, `tokens.json` for non-JS consumers (Figma, Style Dictionary, Retool config).
2. **`src/css/`** — CSS variables form. `tokens.css` is just the variables; `globals.css` is the base stylesheet (loads Public Sans, sets defaults).
3. **`src/components/`** — React 18 primitives that compose the tokens. Hero (purple band + concentric-circles motif), Card, MetricCard, Button, FeasibilityBadge, LineItemRow, Stepper, Field/TextInput/Select, Slider, ChipToggle, ConcentricCircles.

## How apps consume it
React app: `npm install github:kerryelizabeth73/10k-humans-brand`, import from `@10khumans/brand/components`, `@10khumans/brand/tokens`, `@10khumans/brand/css`.

Non-React surface (Retool, embed, docs): paste `src/css/tokens.css` into custom CSS. Tokens become CSS custom properties (`var(--c-purple)`, etc.).

## Brand evolution
The 2020 Hivemind brand guide is stale (Prussian + cool gray + golden yellow). The current palette comes from the Mar 2026 illustration SVGs in Drive (`Kerry sandbox/10k Humans - backgrounds/`):

- `#540043` purple, `#FF9A28` orange, `#FBC978` cream — the hero trio
- `#193950` navy, `#006263` teal, `#63B194` sage — structural
- `#F6644E` coral, `#C51F0E` red — warning/error
- Concentric-circle motif is the recurring brand visual

Type: **Gilmer Heavy** (licensed) for headlines, **Public Sans** (free, Google Fonts) for body. Until a Gilmer license is provisioned for web, the display stack falls back to Cabinet Grotesk Black / Inter Black.

## Things to know before changing things
- Tokens.js, tokens.json, and tokens.css must stay in lockstep. If you add or rename a color, update all three.
- Components rely on the JS `tokens` export — never hardcode hex in component files.
- The Hero's concentric-circles SVG is decorative and `aria-hidden`. Don't add navigation inside it.
- The Stepper supports `onJump` only for completed steps (intentional, prevents skipping ahead).
- Public Sans is loaded via `@import` in globals.css — if an app uses a stricter CSP, the import will silently fail and fall back to system-ui.

## What's next
- Add an access-code login screen primitive (calculator needs one).
- Add a print/share view for finalized estimates (8.5x11 PDF-friendly).
- Publish to npm or GitHub Packages so apps can install via npm without git+ssh URLs.
- Once a Gilmer Heavy web license is provisioned, replace the @import fallback with a real `@font-face` block in globals.css.

## Related repos
- [bids-feasibility-calculator](https://github.com/kerryelizabeth73/bids-feasibility-calculator) — first consumer; the calculator's frontend is built entirely on these primitives.
- Future: client-portal, pm-dashboard, 10k-voices-admin.

## Brand-compliance pattern for consuming apps
Every 10K Humans client-facing repo should have a section in its own CLAUDE.md that says:

> **Brand:** Pulls from `@10khumans/brand`. Never hardcode hex — import from `@10khumans/brand/tokens`. Use brand component primitives where they exist. Run the brand-check checklist (`docs/ADOPTION.md` here) before any client-facing surface ships.

Adoption playbook: see `docs/ADOPTION.md`.
