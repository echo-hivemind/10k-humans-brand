import { useState, useEffect, useRef } from 'react';
import { color, type, radius } from '../tokens/index.js';
import HalfCircleHero from './HalfCircleHero.jsx';

// AccessGate — a code-prompted access wall for client-facing surfaces.
//
// Wrap any view that should be access-gated by a per-bid code (e.g. EstimatePage)
// with <AccessGate ... >. The wrapper:
//
//   1. Renders children immediately when `embedded` is true (portal frame bypass).
//   2. Attempts silent validation if a `code` prop is provided (parsed from
//      `?code=` URL param upstream). Renders children when validation passes.
//   3. Otherwise prompts the user for a code; calls `onValidate(code)`; renders
//      children when validate returns { ok: true }.
//   4. Tracks failed attempts (defaults to 3). On the 3rd failure, shows a
//      soft-block message asking the user to request a fresh link from their PM.
//
// `onValidate` is async and must return one of:
//   { ok: true }
//   { ok: false, reason: 'wrong_code' | 'soft_blocked' | 'expired' | 'unknown', message?: string }
//
// Props:
//   - onValidate     (required, async): (code: string) => { ok, reason?, message? }
//   - embedded       (bool, default false): bypass when rendered inside a portal frame
//   - code           (string, optional): pre-fill from URL for silent validation
//   - maxAttempts    (number, default 3)
//   - title          (string, default "Your 10K Humans estimate")
//   - eyebrow        (string, default "ACCESS CODE")
//   - helper         (string, default "Enter the code your PM sent with this link.")
//   - softBlockHelp  (string, default soft-block message)
//   - children       (renderable, required): the gated content
//
// Embed-constraint note: per /projects/platform-ecosystem.md, every client-facing
// tool must support ?embed=1 to render inside the portal frame. Upstream code
// should set embedded={url.searchParams.get('embed') === '1'} so this gate
// becomes a no-op in embedded mode (the portal handles auth at the frame level).

export default function AccessGate({
  onValidate,
  embedded = false,
  code: initialCode,
  maxAttempts = 3,
  title = 'Your 10K Humans estimate',
  eyebrow = 'ACCESS CODE',
  helper = 'Enter the code your PM sent with this link.',
  softBlockHelp = 'Too many incorrect attempts. Email your project manager or bids@10khumans.com for a fresh link.',
  children,
}) {
  const [code, setCode] = useState(initialCode || '');
  const [status, setStatus] = useState('idle'); // idle | validating | unlocked | error | softBlocked
  const [errorMsg, setErrorMsg] = useState(null);
  const [attempts, setAttempts] = useState(0);

  // Ref guard: prevents the silent-validation effect from firing twice when
  // setStatus('validating') triggers a re-render. A plain `cancelled` boolean
  // inside the effect would be reset on each cleanup/re-run cycle, causing
  // setStatus('unlocked') to never be called and the page to hang on "Checking...".
  const _silentDone = useRef(false);

  // Embedded mode: always unlocked.
  useEffect(() => {
    if (embedded) setStatus('unlocked');
  }, [embedded]);

  // Silent validation when `code` arrives via URL.
  // `status` intentionally omitted from deps -- the _silentDone ref guards
  // against double-runs without re-triggering on every status transition.
  useEffect(() => {
    if (embedded || !initialCode || _silentDone.current) return;
    _silentDone.current = true;
    (async () => {
      setStatus('validating');
      try {
        const r = await onValidate(initialCode);
        if (r?.ok) setStatus('unlocked');
        else {
          if (r?.reason === 'soft_blocked') setStatus('softBlocked');
          else { setStatus('error'); setErrorMsg(r?.message || 'That code was not recognized.'); setAttempts((a) => a + 1); }
        }
      } catch (e) {
        setStatus('error');
        setErrorMsg(e?.message || 'Could not validate code.');
      }
    })();
  }, [initialCode, embedded, onValidate]); // eslint-disable-line react-hooks/exhaustive-deps

  if (status === 'unlocked' || embedded) return children;

  async function submit(e) {
    e?.preventDefault?.();
    if (!code) return;
    setStatus('validating');
    setErrorMsg(null);
    try {
      const r = await onValidate(code);
      if (r?.ok) { setStatus('unlocked'); return; }
      const next = attempts + 1;
      setAttempts(next);
      if (r?.reason === 'soft_blocked' || next >= maxAttempts) setStatus('softBlocked');
      else { setStatus('error'); setErrorMsg(r?.message || 'That code was not recognized.'); }
    } catch (e) {
      setStatus('error');
      setErrorMsg(e?.message || 'Could not validate code. Try again.');
    }
  }

  const softBlocked = status === 'softBlocked';

  return (
    <div style={{ minHeight: '100vh', background: color.cream, color: color.navy, fontFamily: type.body, display: 'flex', flexDirection: 'column' }}>
      <HalfCircleHero height={280} eyebrow={eyebrow} title={title} meta="Enter your access code below" />

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
        <form onSubmit={submit} style={{ width: '100%', maxWidth: 480, background: color.paper, border: `1px solid ${color.navyHair}`, borderRadius: radius.lg, padding: '32px 32px 24px' }}>
          <div style={{ fontSize: type.size.xs, letterSpacing: type.tracking.eyebrow, textTransform: 'uppercase', color: color.purple, marginBottom: 6, fontWeight: type.weight.medium }}>
            {eyebrow}
          </div>
          <h2 style={{ fontFamily: type.display, fontSize: type.size.xl, fontWeight: type.weight.heavy || 900, color: color.navy, margin: '0 0 12px' }}>
            Enter your access code
          </h2>
          <p style={{ fontSize: type.size.base, color: color.navyMid, lineHeight: type.leading.body, marginTop: 0, marginBottom: 24 }}>
            {softBlocked ? softBlockHelp : helper}
          </p>

          {!softBlocked && (
            <>
              <input
                type="text"
                inputMode="text"
                autoComplete="one-time-code"
                autoFocus
                value={code}
                onChange={(e) => setCode(e.target.value.trim())}
                placeholder="e.g. primrose-quail"
                disabled={status === 'validating'}
                style={{
                  width: '100%',
                  background: color.paper,
                  color: color.navy,
                  border: `1px solid ${errorMsg ? color.red : color.navyMute}`,
                  borderRadius: radius.md,
                  padding: '12px 14px',
                  fontSize: type.size.lg,
                  fontFamily: type.body,
                  letterSpacing: '0.02em',
                  marginBottom: 12,
                }}
              />
              {errorMsg && (
                <div style={{ color: color.red, fontSize: type.size.sm, marginBottom: 16 }}>
                  {errorMsg}{attempts > 0 && attempts < maxAttempts ? ` (${maxAttempts - attempts} tries remaining)` : ''}
                </div>
              )}
              <button
                type="submit"
                disabled={!code || status === 'validating'}
                style={{
                  background: color.orange,
                  color: color.navy,
                  border: 'none',
                  borderRadius: radius.md,
                  padding: '12px 22px',
                  fontSize: type.size.md,
                  fontWeight: type.weight.medium,
                  cursor: code ? 'pointer' : 'not-allowed',
                  opacity: code ? 1 : 0.5,
                }}
              >
                {status === 'validating' ? 'Checking...' : 'View estimate'}
              </button>
            </>
          )}

          {softBlocked && (
            <a href="mailto:bids@10khumans.com" style={{ display: 'inline-block', background: color.purple, color: color.cream, textDecoration: 'none', padding: '12px 22px', borderRadius: radius.md, fontSize: type.size.md, fontWeight: type.weight.medium }}>
              Email bids@10khumans.com
            </a>
          )}
        </form>
      </main>
    </div>
  );
}
