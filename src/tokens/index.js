// 10K Humans — Bids & Feasibility Calculator
// Design tokens (Option A2: Brand-forward purple)
// Source of truth for color, type, spacing, radii.

export const color = {
  // Hero / distinctive
  purple:        '#540043',  // hero bands, premium accents
  purpleSoft:    '#7B2566',  // hover states on purple
  purpleInk:     '#3A002F',  // active states on purple

  // Accent
  orange:        '#FF9A28',  // primary CTA, headline highlighter
  orangeDeep:    '#E76020',  // hover on orange CTA
  burnt:         '#C51F0E',  // strong errors

  // Paper / surfaces
  cream:         '#FBC978',  // primary page background
  creamSoft:     '#FDE2B0',  // alt cream for stripes / hover
  paper:         '#FFFFFF',  // card surfaces against cream
  paperWarm:     '#FBF1D9',  // alt card surface

  // Text + structural
  navy:          '#193950',  // primary text + strong UI
  navyMid:       '#3F5A74',  // secondary text
  navySoft:      'rgba(25,57,80,0.65)',
  navyMute:      'rgba(25,57,80,0.40)',
  navyHair:      'rgba(25,57,80,0.20)',
  navyGhost:     'rgba(25,57,80,0.10)',

  // Semantic
  teal:          '#006263',  // tags, secondary accents
  sage:          '#63B194',  // success / "high feasibility"
  sageInk:       '#2E6B52',  // text on sage fills
  coral:         '#F6644E',  // warnings
  red:           '#C51F0E',  // errors, blocked states

  // Brand grays (legacy palette, kept for restraint moments)
  cool:          '#D9E0E5',
  slate:         '#668398',
};

export const type = {
  // Headlines: Gilmer Heavy is licensed; fallback to a heavy geometric stack.
  // Replace with @font-face Gilmer Heavy when license is provisioned.
  display: `'Gilmer', 'Cabinet Grotesk', 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif`,
  // Body: Public Sans (free, Google Fonts).
  body:    `'Public Sans', system-ui, -apple-system, 'Segoe UI', sans-serif`,
  mono:    `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace`,

  size: {
    xs:   '11px',
    sm:   '12px',
    md:   '13px',
    base: '14px',
    lg:   '16px',
    xl:   '18px',
    '2xl': '22px',
    '3xl': '26px',
    '4xl': '32px',
    '5xl': '38px',
    '6xl': '48px',
  },

  weight: {
    thin:    300,
    regular: 400,
    medium:  500,
    semibold:600,
    bold:    700,
    heavy:   800,
  },

  tracking: {
    tight: '-0.01em',
    normal: '0',
    wide:  '0.04em',
    wider: '0.08em',
    eyebrow: '0.10em',
    label: '0.18em',
  },

  leading: {
    tight: 1.15,
    snug:  1.25,
    body:  1.55,
    loose: 1.7,
  },
};

export const space = {
  0:  '0',
  1:  '4px',
  2:  '8px',
  3:  '12px',
  4:  '16px',
  5:  '20px',
  6:  '24px',
  7:  '32px',
  8:  '40px',
  9:  '48px',
  10: '64px',
  11: '80px',
  12: '96px',
};

export const radius = {
  none: '0',
  sm:   '4px',
  md:   '8px',
  lg:   '12px',
  xl:   '16px',
  pill: '999px',
};

export const shadow = {
  // Used sparingly — brand prefers flat surfaces.
  card:  '0 1px 0 rgba(25,57,80,0.06), 0 1px 3px rgba(25,57,80,0.04)',
  focus: `0 0 0 3px rgba(255,154,40,0.35)`, // orange focus ring
};

export const ease = {
  out:   'cubic-bezier(0.22, 0.61, 0.36, 1)',
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
};

export const layout = {
  contentMax: '1080px',
  cardPadX:   '36px',
  cardPadY:   '32px',
};
