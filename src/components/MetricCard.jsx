import { color, type, radius } from '../tokens/index.js';

// Compact card for a single labeled number/value. Used in the metric strip on
// the Estimate page (Estimate / Participants / Field length / Feasibility).
const TONES = {
  paper: { bg: color.paper, fg: color.navy, label: color.purple },
  sage:  { bg: color.sage,  fg: color.navy, label: color.navy   },
  warn:  { bg: color.coral, fg: color.navy, label: color.navy   },
};

export default function MetricCard({
  label,
  value,
  hint,
  tone = 'paper',
}) {
  const t = TONES[tone] || TONES.paper;
  return (
    <div
      style={{
        background: t.bg,
        color: t.fg,
        borderRadius: radius.lg,
        padding: '14px 16px',
      }}
    >
      <div
        style={{
          fontSize: type.size.xs,
          color: t.label,
          letterSpacing: type.tracking.wider,
          textTransform: 'uppercase',
          fontWeight: type.weight.medium,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: type.size.xl,
          color: t.fg,
          marginTop: 6,
          fontWeight: type.weight.medium,
          lineHeight: type.leading.tight,
        }}
      >
        {value}
      </div>
      {hint && (
        <div
          style={{
            fontSize: type.size.xs,
            color: t.fg,
            opacity: 0.65,
            marginTop: 3,
          }}
        >
          {hint}
        </div>
      )}
    </div>
  );
}
