import { color, type, radius } from '../tokens/index.js';

// Single multi-select chip — clickable card style. Used for add-ons.
export default function ChipToggle({ label, hint, selected, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      style={{
        background: selected ? color.purple : color.paper,
        color: selected ? color.cream : color.navy,
        border: `1px solid ${selected ? color.purple : color.navyMute}`,
        borderRadius: radius.md,
        padding: '12px 14px',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'all 120ms ease',
        fontFamily: type.body,
      }}
    >
      <div style={{ fontWeight: type.weight.medium, fontSize: type.size.base }}>{label}</div>
      {hint && (
        <div style={{
          fontSize: type.size.xs,
          marginTop: 3,
          color: selected ? color.cream : color.navyMid,
          opacity: selected ? 0.85 : 1,
        }}>
          {hint}
        </div>
      )}
    </button>
  );
}
