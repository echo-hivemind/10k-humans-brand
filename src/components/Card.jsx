import { color, radius, space } from '../tokens/index.js';

// Generic surface used to bound bid content. Use the `tone` prop to shift the
// surface toward sage / coral / cream variants for semantic emphasis.
const TONES = {
  paper:     { bg: color.paper,     fg: color.navy },
  paperWarm: { bg: color.paperWarm, fg: color.navy },
  cream:     { bg: color.cream,     fg: color.navy },
  sage:      { bg: color.sage,      fg: color.navy },
  coral:     { bg: color.coral,     fg: color.navy },
};

export default function Card({
  tone = 'paper',
  pad = `${space[5]} ${space[5]}`,
  children,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.paper;
  return (
    <div
      style={{
        background: t.bg,
        color: t.fg,
        borderRadius: radius.lg,
        padding: pad,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
