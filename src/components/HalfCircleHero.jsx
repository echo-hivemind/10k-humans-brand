import { color, type } from '../tokens/index.js';

// Brand hero panel â concentric arcs anchored to the right side of a deep
// purple field, with an orange disc as the geometric core and a cream
// baseline band along the bottom. Source: Ash Purcell Slack share, 2026-04-29.
//
// More dramatic than <Hero>: the rings ARE the panel, not a small motif
// drifting off the edge. Use at the top of long-form client-facing surfaces
// (EstimatePage, etc.) where the page deserves an editorial anchor.
//
// Children render on top of the panel, positioned-absolute friendly. Use the
// `eyebrow`, `title`, and `meta` props for the standard editorial stack, or
// pass children for a custom layout.
export default function HalfCircleHero({
  height = 400,
  eyebrow,
  title,
  meta,
  baselineHeight = 30,
  anchorXFrac = 0.8,
  anchorYFrac = 0.5,
  rings,
  children,
  className,
  style,
}) {
  const W = 1600;
  const H = 940;
  const cx = W * anchorXFrac;
  const cy = H * anchorYFrac - baselineHeight * 0.5;
  const baselinePx = baselineHeight * (H / 400);
  const panelBottom = H - baselinePx;

  const RINGS = rings ?? [
    { r: 800, fill: color.sage   },
    { r: 565, fill: color.navy   },
    { r: 330, fill: color.teal   },
    { r: 140, fill: color.orange },
  ];

  return (
    <section
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height,
        background: color.purple,
        color: color.paper,
        overflow: 'hidden',
        ...style,
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <defs>
          <clipPath id="halfCircleHeroPanel">
            <rect x="0" y="0" width={W} height={panelBottom} />
          </clipPath>
        </defs>
        <g clipPath="url(#halfCircleHeroPanel)">
          {RINGS.map((ring, i) => (
            <circle key={i} cx={cx} cy={cy} r={ring.r} fill={ring.fill} />
          ))}
        </g>
        <rect x="0" y={panelBottom} width={W} height={baselinePx} fill={color.cream} />
      </svg>

      {(eyebrow || title || meta || children) && (
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: `40px 48px ${baselineHeight + 32}px`,
            maxWidth: '55%',
          }}
        >
          {eyebrow && (
            <div
              style={{
                fontSize: type.size.xs,
                color: color.cream,
                letterSpacing: type.tracking.label,
                fontWeight: type.weight.medium,
              }}
            >
              {eyebrow}
            </div>
          )}
          {title && (
            <h1
              className="display"
              style={{
                margin: eyebrow ? '10px 0 0' : 0,
                fontSize: type.size['3xl'],
                lineHeight: type.leading.snug,
                color: color.paper,
              }}
            >
              {title}
            </h1>
          )}
          {meta && (
            <div
              style={{
                fontSize: type.size.sm,
                color: color.cream,
                opacity: 0.9,
                marginTop: 10,
                letterSpacing: type.tracking.wide,
              }}
            >
              {meta}
            </div>
          )}
          {children}
        </div>
      )}
    </section>
  );
}
