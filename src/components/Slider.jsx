import { color, type } from '../theme/tokens.js';

// Range slider used for IR (and anywhere else a 1–100 value is needed).
// The track tone shifts with the band the value lands in (sage / coral / red).
export default function Slider({
  value, onChange, min = 0, max = 100, step = 1,
  marks = [],
  tone = 'sage', // 'sage' | 'coral' | 'red'
}) {
  const trackColor = tone === 'red' ? color.red : tone === 'coral' ? color.coral : color.sage;
  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: '100%',
          accentColor: trackColor,
          height: 24,
        }}
      />
      {marks.length > 0 && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: -4,
          fontSize: type.size.xs,
          color: color.navyMid,
        }}>
          {marks.map((m) => <span key={m.value}>{m.label}</span>)}
        </div>
      )}
    </div>
  );
}
