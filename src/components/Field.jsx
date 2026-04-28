import { color, type, radius } from '../theme/tokens.js';

// Form field wrapper — eyebrow label + helper text. Inputs render inside.
export default function Field({ label, hint, error, required, children, style }) {
  return (
    <label style={{ display: 'block', ...style }}>
      <div style={{
        fontSize: type.size.xs,
        color: color.purple,
        letterSpacing: type.tracking.eyebrow,
        textTransform: 'uppercase',
        fontWeight: type.weight.medium,
        marginBottom: 6,
      }}>
        {label}{required && <span style={{ color: color.coral, marginLeft: 4 }}>*</span>}
      </div>
      {children}
      {hint && !error && (
        <div style={{ fontSize: type.size.sm, color: color.navyMid, marginTop: 6, lineHeight: type.leading.body }}>
          {hint}
        </div>
      )}
      {error && (
        <div style={{ fontSize: type.size.sm, color: color.red, marginTop: 6 }}>
          {error}
        </div>
      )}
    </label>
  );
}

// Plain text/number input matching tokens.
export function TextInput({ value, onChange, type: htmlType = 'text', placeholder, min, max, step, ...rest }) {
  return (
    <input
      type={htmlType}
      value={value ?? ''}
      onChange={(e) => onChange(htmlType === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value)}
      placeholder={placeholder}
      min={min}
      max={max}
      step={step}
      style={{
        width: '100%',
        background: color.paper,
        color: color.navy,
        border: `1px solid ${color.navyMute}`,
        borderRadius: radius.md,
        padding: '10px 12px',
        fontSize: type.size.base,
        fontFamily: type.body,
      }}
      {...rest}
    />
  );
}

export function TextArea({ value, onChange, rows = 4, placeholder }) {
  return (
    <textarea
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      style={{
        width: '100%',
        background: color.paper,
        color: color.navy,
        border: `1px solid ${color.navyMute}`,
        borderRadius: radius.md,
        padding: '10px 12px',
        fontSize: type.size.base,
        fontFamily: type.body,
        resize: 'vertical',
      }}
    />
  );
}

export function Select({ value, onChange, options, placeholder = '— Select —' }) {
  return (
    <select
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%',
        background: color.paper,
        color: color.navy,
        border: `1px solid ${color.navyMute}`,
        borderRadius: radius.md,
        padding: '10px 12px',
        fontSize: type.size.base,
        fontFamily: type.body,
        appearance: 'menulist',
      }}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((o) => (
        <option key={o.value ?? o.id} value={o.value ?? o.id}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
