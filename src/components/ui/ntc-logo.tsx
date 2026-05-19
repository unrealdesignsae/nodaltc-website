"use client";

interface NtcLogoProps {
  /** Height in px — width scales automatically */
  height?: number;
  /** Colour of the mark (default: #00d4ff) */
  accent?: string;
  /** Colour of the wordmark text (default: #e8f0fe) */
  textColor?: string;
  className?: string;
  /**
   * X-position of the wordmark relative to the SVG viewBox (default: 48).
   * Increase to add more space between the N-mark and "NODAL" text.
   */
  wordmarkX?: number;
}

/**
 * NTC — Nodal Technical Consultancy
 *
 * Mark: A stylised "N" constructed from signal-path geometry.
 *       Two vertical stems connected by a diagonal, with a
 *       glowing node dot at the crossing point.
 *
 * Wordmark: "NODAL" in display weight + "TECHNICAL CONSULTANCY"
 *           in mono-spaced micro-caps below.
 */
export function NtcLogo({
  height = 40,
  accent = "#00d4ff",
  textColor = "#e8f0fe",
  className = "",
  wordmarkX = 48,
}: NtcLogoProps) {
  // Scale everything relative to height
  const h = height;
  const w = h * 5.6; // aspect ratio ~5.6:1

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 280 50"
      width={w}
      height={h}
      aria-label="Nodal Technical Consultancy"
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        {/* Glow for the node dot */}
        <filter id="ntc-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Subtle glow on the mark strokes */}
        <filter id="ntc-line-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Mark: Geometric N with node dot ─────────────────────────── */}
      {/* Left vertical stem */}
      <line
        x1="4"  y1="8"
        x2="4"  y2="42"
        stroke={accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#ntc-line-glow)"
      />
      {/* Right vertical stem */}
      <line
        x1="32" y1="8"
        x2="32" y2="42"
        stroke={accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#ntc-line-glow)"
      />
      {/* Diagonal crossbar — top-left to bottom-right */}
      <line
        x1="4"  y1="8"
        x2="32" y2="42"
        stroke={accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#ntc-line-glow)"
      />
      {/* Horizontal tick — top of right stem (signal tap) */}
      <line
        x1="28" y1="8"
        x2="36" y2="8"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* Horizontal tick — bottom of left stem */}
      <line
        x1="0"  y1="42"
        x2="8"  y2="42"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* Node dot — midpoint of diagonal */}
      <circle
        cx="18" cy="25"
        r="3.5"
        fill={accent}
        filter="url(#ntc-glow)"
      />
      {/* Outer ring around node */}
      <circle
        cx="18" cy="25"
        r="6"
        fill="none"
        stroke={accent}
        strokeWidth="0.8"
        opacity="0.35"
      />

      {/* ── Wordmark ─────────────────────────────────────────────────── */}
      {/* "NODAL" */}
      <text
        x={wordmarkX}
        y="29"
        fontFamily="'Barlow', 'Inter', 'Arial', sans-serif"
        fontSize="20"
        fontWeight="700"
        letterSpacing="3"
        fill={textColor}
        dominantBaseline="middle"
      >
        NODAL
      </text>

      {/* Separator */}
      <line
        x1={wordmarkX} y1="35"
        x2="278" y2="35"
        stroke={accent}
        strokeWidth="0.6"
        opacity="0.25"
      />

      {/* "TECHNICAL CONSULTANCY" */}
      <text
        x={wordmarkX}
        y="43"
        fontFamily="'JetBrains Mono', 'Courier New', monospace"
        fontSize="6.5"
        fontWeight="400"
        letterSpacing="2.5"
        fill={accent}
        opacity="0.7"
        dominantBaseline="middle"
      >
        TECHNICAL CONSULTANCY
      </text>
    </svg>
  );
}
