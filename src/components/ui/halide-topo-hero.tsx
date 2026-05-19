"use client";

import React, { useEffect, useRef } from "react";

/* ─── Inline SVG: Stage Technical Plan ─────────────────────────────────────
   Blueprint-style top-down production plan.
   Grid pattern + stage deck + truss grid + speaker arrays + FOH + annotations
   All sizing in "user units" against a 900×560 viewBox.
────────────────────────────────────────────────────────────────────────────── */
const StagePlan: React.FC = () => (
  <svg
    viewBox="0 0 900 560"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    style={{ display: "block" }}
  >
    <defs>
      {/* Blueprint dot grid */}
      <pattern id="grid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
        <circle cx="0" cy="0" r="1" fill="rgba(0,212,255,0.18)" />
      </pattern>

      {/* Cyan glow filter */}
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Rigging point marker */}
      <symbol id="rig" viewBox="-8 -8 16 16">
        <circle r="6" fill="none" stroke="rgba(0,212,255,0.75)" strokeWidth="1" />
        <line x1="-4" y1="0" x2="4" y2="0" stroke="rgba(0,212,255,0.75)" strokeWidth="1" />
        <line x1="0" y1="-4" x2="0" y2="4" stroke="rgba(0,212,255,0.75)" strokeWidth="1" />
      </symbol>
    </defs>

    {/* ── Background ── */}
    <rect width="900" height="560" fill="#04080f" />
    <rect width="900" height="560" fill="url(#grid)" />

    {/* ── Title block border ── */}
    <rect x="8" y="8" width="884" height="544" fill="none" stroke="rgba(0,212,255,0.2)" strokeWidth="0.75" />
    <rect x="14" y="14" width="872" height="532" fill="none" stroke="rgba(0,212,255,0.1)" strokeWidth="0.5" />

    {/* ── Title block text ── */}
    <text x="28" y="38" fill="rgba(0,212,255,0.9)" fontSize="9" fontFamily="monospace" letterSpacing="3" filter="url(#glow)">NODAL TECHNICAL CONSULTANCY</text>
    <text x="28" y="52" fill="rgba(0,212,255,0.4)" fontSize="7" fontFamily="monospace" letterSpacing="2">DWG NO: NTC-PROD-001  ·  REV 04  ·  VENUE PRODUCTION PLAN</text>
    <text x="872" y="38" textAnchor="end" fill="rgba(0,212,255,0.4)" fontSize="7" fontFamily="monospace">SCALE 1:100</text>
    <text x="872" y="52" textAnchor="end" fill="rgba(0,212,255,0.4)" fontSize="7" fontFamily="monospace">PROJECTION: TOP-DOWN</text>

    {/* ── Horizontal rule under title ── */}
    <line x1="14" y1="62" x2="886" y2="62" stroke="rgba(0,212,255,0.15)" strokeWidth="0.5" />

    {/* ══════════════════════════════════════════════
        STAGE DECK
    ══════════════════════════════════════════════ */}
    {/* Main stage rectangle */}
    <rect x="265" y="100" width="370" height="220" fill="rgba(0,212,255,0.03)" stroke="rgba(0,212,255,0.7)" strokeWidth="1.25" filter="url(#glow)" />

    {/* Stage thrust (curved apron) */}
    <path d="M 300 320 Q 450 380 600 320" fill="rgba(0,212,255,0.03)" stroke="rgba(0,212,255,0.5)" strokeWidth="1" />
    <line x1="300" y1="320" x2="265" y2="320" stroke="rgba(0,212,255,0.4)" strokeWidth="1" />
    <line x1="600" y1="320" x2="635" y2="320" stroke="rgba(0,212,255,0.4)" strokeWidth="1" />

    {/* Stage label */}
    <text x="450" y="215" textAnchor="middle" fill="rgba(0,212,255,0.35)" fontSize="10" fontFamily="monospace" letterSpacing="6">STAGE DECK</text>
    <text x="450" y="230" textAnchor="middle" fill="rgba(0,212,255,0.2)" fontSize="7" fontFamily="monospace">EL. +1200</text>

    {/* Backline zone (rear of stage) */}
    <rect x="305" y="108" width="290" height="55" fill="rgba(0,212,255,0.04)" stroke="rgba(0,212,255,0.25)" strokeWidth="0.75" strokeDasharray="4 3" />
    <text x="450" y="140" textAnchor="middle" fill="rgba(0,212,255,0.25)" fontSize="7" fontFamily="monospace" letterSpacing="2">BACKLINE ZONE</text>

    {/* Monitor mix position */}
    <circle cx="450" cy="295" r="10" fill="rgba(0,212,255,0.05)" stroke="rgba(0,212,255,0.35)" strokeWidth="0.75" />
    <text x="450" y="299" textAnchor="middle" fill="rgba(0,212,255,0.35)" fontSize="6" fontFamily="monospace">MON</text>

    {/* ══════════════════════════════════════════════
        TRUSS GRID
    ══════════════════════════════════════════════ */}
    {/* Front truss — T1 */}
    <line x1="235" y1="115" x2="665" y2="115" stroke="rgba(255,255,255,0.55)" strokeWidth="4" strokeLinecap="round" />
    <text x="670" y="119" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace">T1</text>

    {/* T2 */}
    <line x1="235" y1="175" x2="665" y2="175" stroke="rgba(255,255,255,0.4)" strokeWidth="3.5" strokeLinecap="round" />
    <text x="670" y="179" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace">T2</text>

    {/* T3 */}
    <line x1="235" y1="235" x2="665" y2="235" stroke="rgba(255,255,255,0.35)" strokeWidth="3" strokeLinecap="round" />
    <text x="670" y="239" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace">T3</text>

    {/* T4 — rear */}
    <line x1="235" y1="295" x2="665" y2="295" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" strokeLinecap="round" />
    <text x="670" y="299" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace">T4</text>

    {/* Vertical ladder trusses */}
    {[310, 450, 590].map((x) => (
      <line key={x} x1={x} y1="108" x2={x} y2="308" stroke="rgba(255,255,255,0.18)" strokeWidth="2.5" strokeLinecap="round" />
    ))}

    {/* Cross-bracing on T1 (decorative diagonal struts) */}
    {[0, 1, 2, 3, 4, 5, 6].map((i) => {
      const x1 = 235 + i * 61;
      const x2 = x1 + 61;
      return (
        <line key={i} x1={x1} y1={i % 2 === 0 ? 108 : 122} x2={x2} y2={i % 2 === 0 ? 122 : 108}
          stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" />
      );
    })}

    {/* ══════════════════════════════════════════════
        RIGGING POINTS (at truss intersections)
    ══════════════════════════════════════════════ */}
    {[310, 450, 590].flatMap((x) =>
      [115, 175, 235, 295].map((y) => (
        <use key={`${x}-${y}`} href="#rig" x={x} y={y} />
      ))
    )}

    {/* Load labels at front truss rigging points */}
    {[310, 450, 590].map((x, i) => (
      <text key={i} x={x} y={103} textAnchor="middle" fill="rgba(0,212,255,0.4)" fontSize="6" fontFamily="monospace">
        {["500KG", "750KG", "500KG"][i]}
      </text>
    ))}

    {/* ══════════════════════════════════════════════
        SPEAKER ARRAYS
    ══════════════════════════════════════════════ */}
    {/* L-Array hang */}
    <rect x="150" y="110" width="75" height="50" rx="2" fill="rgba(0,212,255,0.07)" stroke="rgba(0,212,255,0.75)" strokeWidth="1" />
    <text x="187" y="131" textAnchor="middle" fill="rgba(0,212,255,0.8)" fontSize="8" fontFamily="monospace" letterSpacing="1">PA-L</text>
    <text x="187" y="147" textAnchor="middle" fill="rgba(0,212,255,0.4)" fontSize="6" fontFamily="monospace">12×J8</text>
    {/* Fly cable to T1 */}
    <line x1="225" y1="130" x2="265" y2="115" stroke="rgba(0,212,255,0.3)" strokeWidth="0.75" strokeDasharray="3 2" />

    {/* R-Array hang */}
    <rect x="675" y="110" width="75" height="50" rx="2" fill="rgba(0,212,255,0.07)" stroke="rgba(0,212,255,0.75)" strokeWidth="1" />
    <text x="712" y="131" textAnchor="middle" fill="rgba(0,212,255,0.8)" fontSize="8" fontFamily="monospace" letterSpacing="1">PA-R</text>
    <text x="712" y="147" textAnchor="middle" fill="rgba(0,212,255,0.4)" fontSize="6" fontFamily="monospace">12×J8</text>
    {/* Fly cable to T1 */}
    <line x1="675" y1="130" x2="635" y2="115" stroke="rgba(0,212,255,0.3)" strokeWidth="0.75" strokeDasharray="3 2" />

    {/* Sub hang — stage centre */}
    <rect x="390" y="90" width="120" height="22" rx="1" fill="rgba(0,212,255,0.05)" stroke="rgba(0,212,255,0.45)" strokeWidth="0.75" />
    <text x="450" y="105" textAnchor="middle" fill="rgba(0,212,255,0.5)" fontSize="7" fontFamily="monospace" letterSpacing="2">SUB HANG  6×S18</text>

    {/* Delay tower L */}
    <circle cx="195" cy="430" r="14" fill="rgba(0,212,255,0.06)" stroke="rgba(0,212,255,0.5)" strokeWidth="1" />
    <text x="195" y="428" textAnchor="middle" fill="rgba(0,212,255,0.6)" fontSize="6.5" fontFamily="monospace">DLY</text>
    <text x="195" y="438" textAnchor="middle" fill="rgba(0,212,255,0.4)" fontSize="5.5" fontFamily="monospace">L</text>

    {/* Delay tower R */}
    <circle cx="705" cy="430" r="14" fill="rgba(0,212,255,0.06)" stroke="rgba(0,212,255,0.5)" strokeWidth="1" />
    <text x="705" y="428" textAnchor="middle" fill="rgba(0,212,255,0.6)" fontSize="6.5" fontFamily="monospace">DLY</text>
    <text x="705" y="438" textAnchor="middle" fill="rgba(0,212,255,0.4)" fontSize="5.5" fontFamily="monospace">R</text>

    {/* ══════════════════════════════════════════════
        FOH POSITION
    ══════════════════════════════════════════════ */}
    <circle cx="450" cy="468" r="28" fill="rgba(0,212,255,0.06)" stroke="rgba(0,212,255,0.55)" strokeWidth="1" strokeDasharray="5 4" />
    <circle cx="450" cy="468" r="18" fill="rgba(0,212,255,0.04)" stroke="rgba(0,212,255,0.35)" strokeWidth="0.75" />
    <text x="450" y="465" textAnchor="middle" fill="rgba(0,212,255,0.8)" fontSize="8" fontFamily="monospace" letterSpacing="1">FOH</text>
    <text x="450" y="476" textAnchor="middle" fill="rgba(0,212,255,0.4)" fontSize="6" fontFamily="monospace">CONSOLES</text>

    {/* Signal path — FOH to stage (dashed) */}
    <line x1="450" y1="440" x2="450" y2="382" stroke="rgba(0,212,255,0.2)" strokeWidth="1" strokeDasharray="6 4" />
    <line x1="450" y1="382" x2="450" y2="330" stroke="rgba(0,212,255,0.15)" strokeWidth="1" strokeDasharray="4 4" />

    {/* Signal path to delay towers */}
    <line x1="422" y1="468" x2="209" y2="430" stroke="rgba(0,212,255,0.15)" strokeWidth="0.75" strokeDasharray="4 4" />
    <line x1="478" y1="468" x2="691" y2="430" stroke="rgba(0,212,255,0.15)" strokeWidth="0.75" strokeDasharray="4 4" />

    {/* ══════════════════════════════════════════════
        AUDIENCE SEATING ARCS
    ══════════════════════════════════════════════ */}
    {[55, 80, 105].map((r, i) => (
      <path key={i}
        d={`M ${450 - r * 2.8} 390 Q 450 ${390 + r * 0.55} ${450 + r * 2.8} 390`}
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="0.75"
      />
    ))}
    <text x="450" y="420" textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize="7" fontFamily="monospace" letterSpacing="3">AUDIENCE BOWL</text>

    {/* ══════════════════════════════════════════════
        DIMENSION LINES
    ══════════════════════════════════════════════ */}
    {/* Stage width */}
    <line x1="265" y1="86" x2="635" y2="86" stroke="rgba(255,255,255,0.22)" strokeWidth="0.75" />
    <line x1="265" y1="80" x2="265" y2="93" stroke="rgba(255,255,255,0.22)" strokeWidth="0.75" />
    <line x1="635" y1="80" x2="635" y2="93" stroke="rgba(255,255,255,0.22)" strokeWidth="0.75" />
    <text x="450" y="83" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace">20.0 M</text>

    {/* Stage depth */}
    <line x1="648" y1="100" x2="648" y2="320" stroke="rgba(255,255,255,0.22)" strokeWidth="0.75" />
    <line x1="641" y1="100" x2="655" y2="100" stroke="rgba(255,255,255,0.22)" strokeWidth="0.75" />
    <line x1="641" y1="320" x2="655" y2="320" stroke="rgba(255,255,255,0.22)" strokeWidth="0.75" />
    <text x="660" y="215" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace">12.0 M</text>

    {/* ══════════════════════════════════════════════
        NORTH ARROW
    ══════════════════════════════════════════════ */}
    <g transform="translate(845,490)">
      <circle r="18" fill="none" stroke="rgba(0,212,255,0.3)" strokeWidth="0.75" />
      <polygon points="0,-14 -5,6 0,2 5,6" fill="rgba(0,212,255,0.7)" />
      <polygon points="0,-14 -5,6 0,2 5,6" fill="rgba(0,212,255,0.15)" transform="rotate(180)" />
      <text x="0" y="24" textAnchor="middle" fill="rgba(0,212,255,0.6)" fontSize="7" fontFamily="monospace">N</text>
    </g>

    {/* ══════════════════════════════════════════════
        LEGEND
    ══════════════════════════════════════════════ */}
    <rect x="28" y="490" width="220" height="60" fill="rgba(0,212,255,0.03)" stroke="rgba(0,212,255,0.15)" strokeWidth="0.5" />
    <text x="38" y="505" fill="rgba(0,212,255,0.5)" fontSize="7" fontFamily="monospace" letterSpacing="2">LEGEND</text>
    <line x1="38" y1="515" x2="58" y2="515" stroke="rgba(0,212,255,0.7)" strokeWidth="1.25" />
    <text x="63" y="519" fill="rgba(255,255,255,0.4)" fontSize="6.5" fontFamily="monospace">TRUSS STRUCTURE</text>
    <line x1="38" y1="528" x2="58" y2="528" stroke="rgba(0,212,255,0.4)" strokeWidth="1" strokeDasharray="4 3" />
    <text x="63" y="532" fill="rgba(255,255,255,0.4)" fontSize="6.5" fontFamily="monospace">SIGNAL / DATA RUN</text>
    <use href="#rig" x="48" y="542" transform="scale(0.85)" />
    <text x="63" y="545" fill="rgba(255,255,255,0.4)" fontSize="6.5" fontFamily="monospace">RIGGING POINT (RATED)</text>
  </svg>
);

/* ─── Main Component ──────────────────────────────────────────────────────── */
const HalideTopoHero: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.pageX) / 35;
      const y = (window.innerHeight / 2 - e.pageY) / 35;
      // Base orientation matches reference: flat, clockwise-tilted, slight Y lean
      canvas.style.transform = `rotateX(${28 + y * 0.4}deg) rotateY(${-5 + x * 0.3}deg) rotateZ(${10 - x * 0.3}deg)`;

      layersRef.current.forEach((layer, index) => {
        if (!layer) return;
        const moveX = x * (index + 1) * 0.15;
        const moveY = y * (index + 1) * 0.15;
        layer.style.transform = `translateZ(${(index + 1) * 12}px) translate(${moveX}px, ${moveY}px)`;
      });
    };

    // Entrance — sweep up from flat to final orientation
    canvas.style.opacity = "0";
    canvas.style.transform = "rotateX(60deg) rotateY(0deg) rotateZ(0deg) scale(0.85)";

    const timeout = setTimeout(() => {
      canvas.style.transition = "all 2.5s cubic-bezier(0.16, 1, 0.3, 1)";
      canvas.style.opacity = "1";
      canvas.style.transform = "rotateX(28deg) rotateY(-5deg) rotateZ(10deg) scale(1)";
    }, 300);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#070a0f] flex items-center justify-center border-t border-[rgba(0,212,255,0.12)]">
      {/* SVG grain filter */}
      <svg className="absolute w-0 h-0">
        <filter id="halide-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      {/* Film grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-50 opacity-[0.07]"
        style={{ filter: "url(#halide-grain)" }}
      />

      {/* Interface overlay (text/labels sit above everything) */}
      <div
        className="absolute inset-0 p-10 md:p-16 z-10 pointer-events-none grid grid-cols-2"
        style={{ gridTemplateRows: "auto 1fr auto" }}
      >
        <div className="font-[var(--font-mono)] font-bold text-[#e8f0fe] text-xs tracking-[0.2em] uppercase">
          NODAL_CORE
        </div>
        <div className="text-right font-[var(--font-mono)] text-[#00d4ff] text-[0.65rem] leading-relaxed">
          <div>25.2048° N · 55.2708° E</div>
          <div>SIGNAL DEPTH: ACTIVE</div>
        </div>

        <h2
          className="col-span-2 self-center font-[var(--font-display)] font-black leading-[0.82] tracking-[-0.04em] text-[#e8f0fe]"
          style={{
            fontSize: "clamp(3.5rem, 11vw, 10rem)",
            mixBlendMode: "difference",
          }}
        >
          THE
          <br />
          PRINCIPAL
        </h2>

        <div className="col-span-2 flex items-end">
          <div className="font-[var(--font-mono)] text-[0.7rem] text-[#4a5568] leading-relaxed">
            <p>[ 15+ YEARS IN PRODUCTION ]</p>
            <p>SIGNAL CHAIN &amp; SYSTEMS ARCHITECTURE</p>
          </div>
        </div>
      </div>

      {/* Top-edge gradient — blends into the section above */}
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none z-20"
        style={{ background: "linear-gradient(to bottom, #070a0f 0%, transparent 100%)" }}
      />
      {/* Bottom-edge gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none z-20"
        style={{ background: "linear-gradient(to top, #070a0f 0%, transparent 100%)" }}
      />

      {/* ── 3D parallax canvas ── */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "1800px", perspectiveOrigin: "50% 40%" }}
      >
        <div
          ref={canvasRef}
          className="relative"
          style={{
            width: "980px",
            height: "560px",
            transformStyle: "preserve-3d",
            transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Layer 1 — stage technical drawing (base) */}
          <div
            ref={(el) => { layersRef.current[0] = el; }}
            className="absolute inset-0 border border-[rgba(0,212,255,0.2)]"
            style={{ transform: "translateZ(12px)" }}
          >
            <StagePlan />
          </div>

          {/* Layer 2 — subtle cyan scanline overlay */}
          <div
            ref={(el) => { layersRef.current[1] = el; }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,212,255,0.03) 3px, rgba(0,212,255,0.03) 4px)",
              transform: "translateZ(24px)",
              mixBlendMode: "screen",
            }}
          />

          {/* Layer 3 — topographic contour rings */}
          <div
            ref={(el) => { layersRef.current[2] = el; }}
            className="absolute pointer-events-none"
            style={{
              width: "200%",
              height: "200%",
              top: "-50%",
              left: "-50%",
              backgroundImage:
                "repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 42px, rgba(0,212,255,0.04) 43px, transparent 44px)",
              transform: "translateZ(36px)",
            }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 w-px h-[60px] -translate-x-1/2 z-30"
        style={{
          background: "linear-gradient(to bottom, #00d4ff, transparent)",
          animation: "halide-flow 2s infinite ease-in-out",
        }}
      />

      <style>{`
        @keyframes halide-flow {
          0%   { transform: translateX(-50%) scaleY(0); transform-origin: top; }
          50%  { transform: translateX(-50%) scaleY(1); transform-origin: top; }
          51%  { transform: translateX(-50%) scaleY(1); transform-origin: bottom; }
          100% { transform: translateX(-50%) scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
};

export default HalideTopoHero;
