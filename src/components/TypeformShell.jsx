import Button from './Button.jsx';
import { color, type } from '../tokens/index.js';

// TypeformShell â shared Typeform-style page chrome.
//
// Provides:
//   â¢ 5-color brand bar at top (navy/teal/cream/orange/coral) with logo pill
//   â¢ Sticky orange progress bar below the brand header
//   â¢ White content column (max 680 px)
//   â¢ Eyebrow + large question headline + hint subtext
//   â¢ Nav footer: â Back  |  [extraActions]  [Continue â]
//   â¢ Keyboard Enter â onContinue (non-textarea inputs only)
//   â¢ Matching 5-color bar at bottom
//
// Props:
//   eyebrow         string    small-caps label, e.g. "Step 1 of 4"
//   question        string    large headline
//   hint            string?   optional subtext under headline
//   progress        number    0.0â1.0 controls progress bar fill
//   onBack          fn?       if provided, renders "â Back" link
//   onContinue      fn?       primary footer button action
//   continueLabel   string    default "Continue â"
//   continueDisabled bool     greys out + disables Continue
//   loading         bool      shows spinner beside Continue
//   loadingLabel    string    default "Workingâ¦"
//   extraActions    ReactNode optional node rendered left of Continue button
//   footerNote      string?   small-print line below the nav
//   maxWidth        number    default 680
//   children        ReactNode form content

// Brand palette stripes: navy â teal â cream â orange â coral
const BRAND_STRIPES = ["#193950", "#006263", "#FBC978", "#FF9A28", "#F6644E"];

function BrandBar({ height = 52 }) {
  return (
    <div style={{ width: "100%", height, display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
      {/* Color stripes */}
      <div style={{ position: "absolute", inset: 0, display: "flex" }}>
        {BRAND_STRIPES.map((c) => (
          <div key={c} style={{ flex: 1, background: c }} />
        ))}
      </div>
      {/* Logo pill */}
      <div style={{
        position: "relative",
        zIndex: 1,
        marginLeft: 20,
        background: "white",
        borderRadius: 8,
        padding: "5px 12px 5px",
        display: "flex",
        alignItems: "center",
      }}>
        <img
          src="https://cdn.prod.website-files.com/65cc792135cbfaf65f0721ef/65de05ae9abe981bdbd8011c_logo%20(1).svg"
          alt="10K Humans"
          height={32}
          style={{ display: "block" }}
        />
      </div>
    </div>
  );
}

export default function TypeformShell({
  eyebrow,
  question,
  hint,
  progress = 0,
  onBack,
  onContinue,
  continueLabel = "Continue â",
  continueDisabled = false,
  loading = false,
  loadingLabel = "Workingâ¦",
  extraActions,
  footerNote,
  maxWidth = 680,
  children,
}) {
  const canContinue = !continueDisabled && !loading;

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      e.target.tagName !== "TEXTAREA" &&
      e.target.tagName !== "SELECT" &&
      canContinue &&
      onContinue
    ) {
      e.preventDefault();
      onContinue();
    }
  };

  return (
    <div
      style={{ minHeight: "100vh", background: "white", display: "flex", flexDirection: "column" }}
      onKeyDown={handleKeyDown}
    >
      {/* ââ Sticky brand header + progress bar ââ */}
      <div style={{ position: "sticky", top: 0, zIndex: 10 }}>
        <BrandBar height={52} />

        {/* ââ Progress bar ââ */}
        <div style={{ width: "100%", height: 4, background: color.navyHair }}>
          <div style={{
            height: "100%",
            width: `${Math.min(1, Math.max(0, progress)) * 100}%`,
            background: color.orange,
            transition: "width 0.45s ease-out",
          }} />
        </div>
      </div>

      {/* ââ Content column ââ */}
      <main style={{
        maxWidth,
        margin: "0 auto",
        padding: "52px 28px 80px",
        flex: 1,
      }}>

        {/* Question header */}
        <div style={{ marginBottom: 44 }}>
          {eyebrow && (
            <div style={{
              fontSize: type.size.xs,
              color: color.purple,
              letterSpacing: type.tracking.eyebrow,
              textTransform: "uppercase",
              fontWeight: type.weight.medium,
              marginBottom: 14,
            }}>
              {eyebrow}
            </div>
          )}

          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
            fontWeight: type.weight.heavy,
            color: color.navy,
            margin: "0 0 14px",
            lineHeight: 1.15,
            letterSpacing: "-0.015em",
          }}>
            {question}
          </h1>

          {hint && (
            <p style={{
              fontSize: type.size.lg,
              color: color.navyMid,
              margin: 0,
              lineHeight: 1.65,
              maxWidth: 560,
            }}>
              {hint}
            </p>
          )}
        </div>

        {/* Form content */}
        <div style={{ marginBottom: 44 }}>
          {children}
        </div>

        {/* ââ Navigation footer ââ */}
        <div style={{
          display: "flex",
          justifyContent: onBack ? "space-between" : "flex-end",
          alignItems: "center",
          gap: 12,
          paddingTop: 4,
        }}>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              disabled={loading}
              style={{
                background: "transparent",
                border: "none",
                color: color.navyMid,
                fontSize: type.size.lg,
                cursor: loading ? "not-allowed" : "pointer",
                padding: 0,
                opacity: loading ? 0.4 : 1,
                fontFamily: "inherit",
              }}
            >
              â Back
            </button>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {extraActions}
            {loading && <Spinner label={loadingLabel} />}
            {onContinue && (
              <Button
                variant="primary"
                onClick={onContinue}
                disabled={!canContinue}
                style={{
                  opacity: canContinue ? 1 : 0.45,
                  cursor: canContinue ? "pointer" : "not-allowed",
                  fontSize: type.size.lg,
                  padding: "14px 28px",
                  transition: "opacity 0.15s",
                }}
              >
                {loading ? loadingLabel : continueLabel}
              </Button>
            )}
          </div>
        </div>

        {footerNote && (
          <p style={{
            fontSize: type.size.xs,
            color: color.navyMid,
            textAlign: "center",
            marginTop: 28,
            lineHeight: 1.6,
          }}>
            {footerNote}
          </p>
        )}
      </main>

      {/* ââ Site footer ââ */}
      <footer style={{
        borderTop: `1px solid ${color.navyHair}`,
        padding: "20px 28px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
      }}>
        <span style={{ fontSize: type.size.sm, color: color.navyMid }}>
          For a custom bid, reach out to{" "}
          <a href="mailto:bids@10khumans.com" style={{ color: color.purple, textDecoration: "none", fontWeight: type.weight.medium }}>
            bids@10khumans.com
          </a>
        </span>
        <span style={{ fontSize: type.size.xs, color: color.navyMute, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <span>Â© 2026 10K Humans</span>
          <a href="https://www.iubenda.com/privacy-policy/50990987/cookie-policy" target="_blank" rel="noreferrer" style={{ color: color.navyMute, textDecoration: "underline" }}>Cookie policy</a>
          <a href="https://www.iubenda.com/privacy-policy/50990987" target="_blank" rel="noreferrer" style={{ color: color.navyMute, textDecoration: "underline" }}>Privacy policy</a>
        </span>
      </footer>

      {/* ââ Bottom brand bar ââ */}
      <div style={{ display: "flex", height: 52 }}>
        {BRAND_STRIPES.map((c) => (
          <div key={c} style={{ flex: 1, background: c }} />
        ))}
      </div>
    </div>
  );
}

function Spinner({ label }) {
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      color: color.navyMid,
      fontSize: type.size.sm,
    }}>
      <span style={{
        width: 16,
        height: 16,
        border: `2px solid ${color.navyMute}`,
        borderTopColor: color.purple,
        borderRadius: "50%",
        animation: "tf-spin 0.7s linear infinite",
        display: "inline-block",
        flexShrink: 0,
      }} />
      {label}
      <style>{"@keyframes tf-spin { to { transform: rotate(360deg) } }"}</style>
    </span>
  );
}
