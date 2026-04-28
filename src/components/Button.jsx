import { color, type, radius } from '../theme/tokens.js';

const VARIANTS = {
  primary:   { bg: color.orange,    fg: color.navy,   hover: color.orangeDeep },
  secondary: { bg: 'transparent',   fg: color.navy,   hover: color.navyGhost,  border: `1px solid ${color.navy}` },
  ghost:     { bg: 'transparent',   fg: color.navy,   hover: color.navyGhost },
  danger:    { bg: color.red,       fg: color.cream,  hover: color.burnt },
  brand:     { bg: color.purple,    fg: color.cream,  hover: color.purpleSoft },
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  style,
  ...rest
}) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const padding = size === 'lg' ? '13px 26px' : size === 'sm' ? '7px 14px' : '11px 22px';
  return (
    <button
      style={{
        background: v.bg,
        color: v.fg,
        border: v.border || 'none',
        padding,
        fontSize: type.size.md,
        fontWeight: type.weight.medium,
        fontFamily: type.body,
        borderRadius: radius.md,
        cursor: 'pointer',
        transition: 'background 120ms ease, transform 80ms ease',
        ...style,
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.985)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      {...rest}
    >
      {children}
    </button>
  );
}
