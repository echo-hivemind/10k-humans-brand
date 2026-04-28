// Brand motif — concentric circles, lifted from the 10K Humans illustration system.
// Renders a stack of rings in the brand palette. Decorative; aria-hidden.
import { color } from '../theme/tokens.js';

const RINGS = [
  { r: 95, fill: color.sage   },
  { r: 68, fill: color.navy   },
  { r: 42, fill: color.teal   },
  { r: 20, fill: color.orange },
];

export default function ConcentricCircles({
  size = 220,
  rings = RINGS,
  className,
  style,
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="presentation"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {rings.map((ring, i) => (
        <circle key={i} cx="100" cy="100" r={ring.r} fill={ring.fill} />
      ))}
    </svg>
  );
}
