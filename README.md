# 10K Humans — Brand System

The shared design system for every 10K Humans client-facing surface — calculator, client portal, PM dashboard, 10K Voices, future apps.

## What's in here

| Path | What it is |
|---|---|
| `src/tokens/index.js` | JS export of color, type, space, radius tokens |
| `src/tokens/tokens.json` | Same tokens in machine-readable JSON |
| `src/css/tokens.css` | CSS custom properties for non-React surfaces (Retool, embeds) |
| `src/css/globals.css` | Full base stylesheet (Public Sans + defaults) |
| `src/components/` | React 18 component primitives — Hero, Card, MetricCard, Button, FeasibilityBadge, LineItemRow, Stepper, Field, TextInput, Select, Slider, ChipToggle, ConcentricCircles |

## Brand spec at a glance

| Color | Hex | Use |
|---|---|---|
| Purple | `#540043` | Hero bands, premium accents |
| Orange | `#FF9A28` | Primary CTA, headline highlighter |
| Cream  | `#FBC978` | Page paper |
| Navy   | `#193950` | Body text, strong UI |
| Teal   | `#006263` | Secondary accent, tags |
| Sage   | `#63B194` | Success / "high feasibility" |
| Coral  | `#F6644E` | Warnings |
| Red    | `#C51F0E` | Errors, blocked |

**Type** — display: Gilmer Heavy (licensed; falls back to Cabinet Grotesk Black / Inter Black). Body: Public Sans Regular (Google Fonts, free).

**Visual signature** — concentric circles in purple → navy → teal → orange. Lifted from the 10K Humans illustration set.

## Use it from a React app

```bash
npm install github:kerryelizabeth73/10k-humans-brand
```

```jsx
import { Hero, MetricCard, Button } from '@10khumans/brand/components';
import { color, type } from '@10khumans/brand/tokens';
import '@10khumans/brand/css';
```

## Use it from Retool / docs / anywhere else

Drop `src/css/tokens.css` into Retool's custom CSS. The tokens become CSS variables (`var(--c-purple)`, `var(--c-orange)`, etc.).

## First consumer

[github.com/kerryelizabeth73/bids-feasibility-calculator](https://github.com/kerryelizabeth73/bids-feasibility-calculator)

## License

UNLICENSED — internal 10K Humans use only.
