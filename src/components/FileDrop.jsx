import { useState, useRef, useCallback } from 'react';
import { color, type, radius } from '../tokens/index.js';

// File-drop primitive for client-journey Page 2 (brief upload) and any other
// surface where we accept a single file from the user. Drag-and-drop OR
// click-to-browse. Surfaces the selected file's name + size with a Remove
// affordance.
//
// Props:
//   accept       — MIME type list passed to the underlying <input>. Default ''.
//   maxBytes     — soft-cap. If exceeded, calls onError and does not call onChange.
//                  Default 5 MB (consumer-side default; raise per-consumer for
//                  larger client briefs).
//   maxLabel     — optional override for the human-readable cap in the default
//                  hint. If omitted, the default hint formats maxBytes in MB.
//   file         — controlled current File | null
//   onChange     — (file: File | null) => void
//   onError      — (msg: string) => void (called when maxBytes exceeded or
//                  the browser rejects the file)
//   label        — text rendered inside the drop zone when empty
//   hint         — secondary text below the label. If you pass `hint`, you own
//                  the whole line. If you leave hint undefined, FileDrop emits
//                  "PDF, DOCX, or TXT · up to {maxLabel || formatBytes(maxBytes)}".
//   disabled     — boolean; greys out the zone
//
// Visual: cream panel with a dashed purple-on-cream border that turns solid
// orange when dragging, and changes to a "file selected" filled card once a
// file is in state.
export default function FileDrop({
  accept = '',
  maxBytes = 5 * 1024 * 1024,
  maxLabel,
  file = null,
  onChange,
  onError,
  label = 'Drop your brief here, or click to browse',
  hint,
  disabled = false,
  id = 'filedrop',
}) {
  const formatBytes = (bytes) => {
    const mb = bytes / 1024 / 1024;
    if (mb >= 10 || Number.isInteger(mb)) return `${Math.round(mb)} MB`;
    return `${mb.toFixed(1)} MB`;
  };
  const computedHint = hint != null
    ? hint
    : `PDF, DOCX, or TXT · up to ${maxLabel || formatBytes(maxBytes)}`;
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = useCallback((f) => {
    if (!f) {
      onChange?.(null);
      return;
    }
    if (maxBytes && f.size > maxBytes) {
      const mb = (f.size / 1024 / 1024).toFixed(1);
      onError?.(`That file is ${mb} MB — limit is ${(maxBytes / 1024 / 1024).toFixed(0)} MB.`);
      return;
    }
    onChange?.(f);
  }, [maxBytes, onChange, onError]);

  const onDragOver = (e) => {
    if (disabled) return;
    e.preventDefault();
    setDragging(true);
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };
  const onDrop = (e) => {
    if (disabled) return;
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };
  const onPick = (e) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
    // Clear the input so re-selecting the same file fires onChange.
    e.target.value = '';
  };
  const openPicker = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  if (file) {
    return (
      <div
        style={{
          background: color.paper,
          border: `1px solid ${color.navyMute}`,
          borderRadius: radius.md,
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
          <FileIcon />
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontFamily: 'var(--font-display, inherit)',
              fontSize: type.size.md,
              color: color.navy,
              fontWeight: type.weight.medium,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>{file.name}</div>
            <div style={{ fontSize: type.size.sm, color: color.navyMid }}>
              {(file.size / 1024).toFixed(1)} KB
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => handleFile(null)}
          style={{
            background: 'transparent',
            border: `1px solid ${color.navyMute}`,
            borderRadius: radius.pill,
            color: color.navyMid,
            padding: '6px 14px',
            fontSize: type.size.sm,
            cursor: 'pointer',
          }}
        >
          Remove
        </button>
      </div>
    );
  }

  const borderColor = dragging ? color.orange : color.navyMute;
  const bg = dragging ? color.creamDeep || color.cream : color.paper;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={openPicker}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openPicker();
        }
      }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      aria-disabled={disabled}
      style={{
        background: bg,
        border: `${dragging ? 2 : 1.5}px dashed ${borderColor}`,
        borderRadius: radius.md,
        padding: '36px 28px',
        textAlign: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'border-color 0.15s ease, background 0.15s ease',
      }}
    >
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        onChange={onPick}
        disabled={disabled}
        style={{ display: 'none' }}
      />
      <UploadIcon />
      <div style={{
        marginTop: 12,
        fontFamily: 'var(--font-display, inherit)',
        fontSize: type.size.lg,
        color: color.navy,
        fontWeight: type.weight.medium,
      }}>{label}</div>
      {computedHint && (
        <div style={{
          marginTop: 6,
          fontSize: type.size.sm,
          color: color.navyMid,
        }}>{computedHint}</div>
      )}
    </div>
  );
}

function UploadIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={color.purple} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }} aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color.purple} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}
