import { color, type, radius } from '../theme/tokens.js';

// Horizontal progress indicator for the wizard. Shows numbered dots + labels
// with the current step highlighted in orange and completed steps filled with purple.
export default function Stepper({ steps, current, onJump }) {
  return (
    <ol style={{
      listStyle: 'none',
      padding: 0,
      margin: '0 0 24px',
      display: 'grid',
      gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
      gap: 8,
    }}>
      {steps.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : 'todo';
        const palette = state === 'active' ? { bg: color.orange, fg: color.navy, ring: color.orangeDeep }
                      : state === 'done'   ? { bg: color.purple, fg: color.cream, ring: color.purple }
                      : { bg: 'transparent', fg: color.navyMid, ring: color.navyMute };
        const clickable = state === 'done' && onJump;
        return (
          <li key={label}>
            <button
              type="button"
              onClick={clickable ? () => onJump(i) : undefined}
              disabled={!clickable}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: clickable ? 'pointer' : 'default',
                textAlign: 'left',
              }}
            >
              <span style={{
                width: 26,
                height: 26,
                borderRadius: radius.pill,
                background: palette.bg,
                color: palette.fg,
                border: `1.5px solid ${palette.ring}`,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: type.size.sm,
                fontWeight: type.weight.medium,
                flexShrink: 0,
              }}>
                {state === 'done' ? '✓' : i + 1}
              </span>
              <span style={{
                fontSize: type.size.sm,
                color: state === 'todo' ? color.navyMid : color.navy,
                fontWeight: state === 'active' ? type.weight.medium : type.weight.regular,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>{label}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
