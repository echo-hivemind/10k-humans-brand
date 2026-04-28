import ConcentricCircles from './ConcentricCircles.jsx';
import { color, type } from '../tokens/index.js';

// Brand hero band — deep purple background with the concentric-circles motif
// drifting off the right edge. Used at the top of long-form pages (Estimate,
// Login, etc.) to mark the surface as a 10K Humans product.
export default function Hero({
  eyebrow = '10K HUMANS',
  title = 'Feasibility & Costing',
  meta,
  children,
}) {
  return (
    <header
      style={{
        position: 'relative',
        background: color.purple,
        color: color.paper,
        padding: '28px 36px',
        overflow: 'hidden',
      }}
    >
      <ConcentricCircles
        size={240}
        style={{
          position: 'absolute',
          right: -70,
          top: -70,
          opacity: 0.92,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}>
        <div
          style={{
            fontSize: type.size.xs,
            color: color.orange,
            letterSpacing: type.tracking.label,
            fontWeight: type.weight.medium,
          }}
        >
          {eyebrow}
        </div>
        <h1
          className="display"
          style={{
            margin: '6px 0 0',
            fontSize: type.size['3xl'],
            lineHeight: type.leading.snug,
          }}
        >
          {title}
        </h1>
        {meta && (
          <div
            style={{
              fontSize: type.size.sm,
              color: color.cream,
              opacity: 0.85,
              marginTop: 6,
              letterSpacing: type.tracking.wide,
            }}
          >
            {meta}
          </div>
        )}
        {children}
      </div>
    </header>
  );
}
