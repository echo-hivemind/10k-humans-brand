# Brand Adoption Playbook

How any 10K Humans surface — React, Retool, Python/Jinja, Word, Excel, anywhere — adopts the brand system without drifting.

The goal is simple: **one source of truth, every client-facing surface looks like it came from the same company.**

---

## 1. Pick the right consumption path for your surface

| Surface | What to install / import | Source file |
|---|---|---|
| React 18 app (Vite, Next, CRA) | `npm install github:kerryelizabeth73/10k-humans-brand` | `@10khumans/brand/components`, `@10khumans/brand/tokens`, `@10khumans/brand/css` |
| Retool app | Paste `src/css/tokens.css` into the app's Custom CSS, then use `var(--c-purple)` etc. throughout | `src/css/tokens.css` |
| Python/Flask + Jinja2 (e.g. Insights REport) | Inline `src/css/tokens.css` into the report template's `<style>` block at build time | `src/css/tokens.css` |
| Word document templates | Set theme colors to the hex values in `tokens.json` once; use the brand fonts | `src/tokens/tokens.json` |
| Excel / Google Sheets | Set the workbook color palette to the brand colors from `tokens.json` | `src/tokens/tokens.json` |
| Figma / Sketch | Import `tokens.json` via a tokens plugin, or set it up as a styles library | `src/tokens/tokens.json` |
| Anything else | Read the eight core hex values from `tokens.json` | `src/tokens/tokens.json` |

The whole package is publicly readable on GitHub — anyone with the URL can `git clone` and grab whichever file they need.

---

## 2. The migration steps for an existing surface

### React app (e.g. costing-calculator, future client portal, future PM dashboard)

1. `npm install github:kerryelizabeth73/10k-humans-brand`
2. Replace local `theme/tokens.js` import sites:
   ```diff
   - import { color, type } from '../theme/tokens.js';
   + import { color, type } from '@10khumans/brand/tokens';
   ```
3. Replace local component imports:
   ```diff
   - import { Hero, MetricCard, Button } from '../components/index.js';
   + import { Hero, MetricCard, Button } from '@10khumans/brand/components';
   ```
4. Replace local stylesheet:
   ```diff
   - import './theme/globals.css';
   + import '@10khumans/brand/css';
   ```
5. Delete the local `theme/` and duplicate `components/` directories.
6. Run `npm run build` — should compile clean.
7. Eyeball the result. Should look identical (or better) to before.

### Retool app

1. Settings → Custom CSS. Paste the entire contents of `src/css/tokens.css`.
2. Open every component and replace any hardcoded hex with the matching CSS variable. Search for `#` in custom styles.
3. Apply the brand fonts at the app level: set body to `var(--font-body)`, headings to `var(--font-display)`.
4. Audit color choices: any time a green is used for "good" it should be `var(--c-sage)`; any "warn" amber/coral should be `var(--c-coral)`; etc. (See the semantic mapping in `tokens.json`.)
5. Walk through every screen with the [Brand check](#3-brand-check-checklist) below.

### Python/Flask + Jinja2 (Insights REport)

1. Inline `src/css/tokens.css` into the report's master `base.html.jinja` `<style>` block at build time. Don't rely on `<link>` to a CDN — Playwright's PDF render is more reliable with inlined CSS.
2. In the Jinja templates, replace any hardcoded hex with `var(--c-…)`.
3. Set fonts: `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;700&display=swap">` in `<head>`. Display headings use the Gilmer fallback stack until a license is provisioned.
4. Test a sample report locally; confirm colors match.
5. Re-run [brand check](#3-brand-check-checklist).

### Word / Excel / Google Workspace

1. Open the document/template's Theme settings.
2. Set the six theme colors to: purple `#540043`, orange `#FF9A28`, navy `#193950`, teal `#006263`, sage `#63B194`, coral `#F6644E`.
3. Set the body font to Public Sans, headings to Gilmer Heavy (or Cabinet Grotesk Black if no Gilmer).
4. Save the document as a template so future docs inherit.

---

## 3. Brand check checklist

Run this before any client-facing surface ships or gets a major update.

- [ ] **No rogue hex codes.** `grep -i '#[0-9a-f]\{3,6\}'` should return only files inside `node_modules/` or imports from `@10khumans/brand`. (CSS-variable form `var(--c-…)` is fine.)
- [ ] **Uses brand components where they exist.** No custom Hero, MetricCard, Button, Stepper, etc. unless we've decided the brand version doesn't fit and we've added the new variant to the brand repo.
- [ ] **Type stack is correct.** Body text uses `var(--font-body)` (Public Sans). Headlines use `var(--font-display)` (Gilmer fallback stack).
- [ ] **Semantic colors map correctly.** Sage = success / "high feasibility." Coral = warning. Red = error / blocked. Orange = primary CTA only — not for ambient warmth. Purple = brand-distinctive moments only — not for body backgrounds.
- [ ] **Concentric circles motif used at most once per surface,** as a hero accent. Not as a decorative everywhere thing.
- [ ] **Spacing follows the scale.** Avoid arbitrary `margin: 13px`. Use the `space` token values.
- [ ] **Round all displayed numbers** (`Math.round`, `toLocaleString`). Float artifacts leak.
- [ ] **Print/share view.** If the surface generates a PDF or shareable link, that view also passes this checklist.
- [ ] **Dark mode.** If the surface needs to support both light and dark, the tokens map cleanly. (The current set is built for light; add dark variants in `tokens.js` when the first dark-mode app needs them.)

---

## 4. Versioning + updates

The brand repo is semver-versioned. When we change something:

| Type of change | Bump | Examples |
|---|---|---|
| Patch | `0.1.0 → 0.1.1` | Fix a typo in a comment, fix a broken import path, fix an a11y issue in a component |
| Minor | `0.1.0 → 0.2.0` | Add a new component, add a new color, add a new export to `tokens.json` |
| Major | `0.1.0 → 1.0.0` | Rename a token, remove a component, change the meaning of an existing color, restructure the package's exports map |

Apps pick up updates by `npm update @10khumans/brand`. They do NOT auto-update — drift is opt-in and intentional.

---

## 5. Adding new components to the brand

When an app needs a new primitive (e.g. a Toast, a Modal, an empty-state illustration):

1. Build it in the consuming app first to validate the design.
2. Once it's stable, lift it into `src/components/` of the brand repo with the same shape.
3. Export it from `src/components/index.js`.
4. Bump minor version.
5. Update consuming apps when ready.

This avoids polluting the brand with one-off variants that no other surface needs.

---

## 6. CLAUDE handoff

Every repo built on this brand should have, in its `CLAUDE.md`:

> **Brand:** Pulls from `@10khumans/brand`. Never hardcode hex; import from `@10khumans/brand/tokens`. Use brand component primitives (Hero, Card, MetricCard, Button, Stepper, etc.) where they exist. Run the [brand check](https://github.com/kerryelizabeth73/10k-humans-brand/blob/main/docs/ADOPTION.md#3-brand-check-checklist) before any client-facing surface ships.

Future Claude sessions read that and self-correct.
