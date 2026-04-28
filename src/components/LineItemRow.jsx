import { color, type } from '../theme/tokens.js';
import { fmt } from '../lib/pricing.js';

// Single row in the Estimate breakdown. Shows the line name, optional sub-detail,
// and a value range or a "TBD" placeholder for note-priced items.
export default function LineItemRow({ line, isLast = false, highlight = false }) {
  const value =
    line.low == null
      ? line.note || 'TBD'
      : line.low === line.high
        ? fmt(line.low)
        : `${fmt(line.low)} – ${fmt(line.high)}`;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '12px 18px',
        borderBottom: isLast ? 'none' : `0.5px solid ${color.navyGhost}`,
        background: highlight ? color.paperWarm : 'transparent',
        fontSize: type.size.md,
        gap: 16,
      }}
    >
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontWeight: type.weight.medium }}>{line.name}</div>
        {line.detail && (
          <div
            style={{
              fontSize: type.size.sm,
              color: color.navy,
              opacity: 0.6,
              marginTop: 2,
            }}
          >
            {line.detail}
          </div>
        )}
      </div>
      <div
        style={{
          fontWeight: type.weight.medium,
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </div>
    </div>
  );
}
