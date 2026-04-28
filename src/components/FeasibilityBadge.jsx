import { color, type, radius } from '../tokens/index.js';

const LEVELS = {
  high:   { bg: color.sage,  label: 'High',     fg: color.navy },
  medium: { bg: color.cream, label: 'Moderate', fg: color.navy },
  low:    { bg: color.coral, label: 'Low',      fg: color.navy },
};

// Compact pill marking the feasibility level of an estimate. Pairs the level
// with the score (X / 100). Lives inside the Hero's right-rail.
export default function FeasibilityBadge({ level = 'high', score = 100 }) {
  const l = LEVELS[level] || LEVELS.high;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: l.bg,
        color: l.fg,
        fontSize: type.size.sm,
        fontWeight: type.weight.medium,
        padding: '6px 12px',
        borderRadius: radius.pill,
      }}
    >
      <span>{l.label} feasibility</span>
      <span style={{ opacity: 0.7 }}>·</span>
      <span>{score}</span>
    </span>
  );
}
