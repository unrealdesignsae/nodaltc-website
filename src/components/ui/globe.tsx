'use client';

import { useRef, useEffect, useCallback } from 'react';

interface GlobeProps {
  className?: string;
  dotColor?: string;
  arcColor?: string;
  markerColor?: string;
  autoRotateSpeed?: number;
  connections?: { from: [number, number]; to: [number, number] }[];
  markers?: { lat: number; lng: number; label?: string; dx?: number; dy?: number }[];
}

// NTC global footprint — evenly distributed across all longitudes (~30° apart)
const DEFAULT_MARKERS = [
  // lng band  -180 → -150 (Pacific West)
  { lat:  21.31, lng: -157.83, label: 'Honolulu',     dx:   9, dy: -14 },
  // lng band  -150 → -120 (Alaska / Pacific NW)
  { lat:  61.22, lng: -149.90, label: 'Anchorage',    dx:   9, dy:  14 },
  // lng band   -90 → -60  (Central / Caribbean)
  { lat:  18.47, lng:  -66.11, label: 'San Juan',     dx: -62, dy:  -9 },
  // lng band   -60 → -30  (South America East)
  { lat: -34.60, lng:  -58.38, label: 'Buenos Aires', dx:   9, dy: -14 },
  // lng band   -30 →   0  (Atlantic / W. Europe)
  { lat:  38.72, lng:   -9.14, label: 'Lisbon',       dx:   9, dy:  14 },
  // lng band     0 →  30  (N. Europe / W. Africa)
  { lat:  52.37, lng:    4.90, label: 'Amsterdam',    dx:   9, dy: -14 },
  // lng band    30 →  60  (E. Africa / Middle East)
  { lat:  25.20, lng:   55.27, label: 'Dubai',        dx:   9, dy: -14 },
  { lat:  -1.29, lng:   36.82, label: 'Nairobi',      dx:   9, dy:  14 },
  // lng band    60 →  90  (South Asia)
  { lat:  19.08, lng:   72.88, label: 'Mumbai',       dx:   9, dy:  14 },
  // lng band    90 → 120  (SE Asia)
  { lat:  13.75, lng:  100.52, label: 'Bangkok',      dx:   9, dy: -14 },
  // lng band   120 → 150  (East Asia)
  { lat:  35.68, lng:  139.69, label: 'Tokyo',        dx:   9, dy: -14 },
  // lng band   150 → 180  (Pacific / Oceania)
  { lat: -33.87, lng:  151.21, label: 'Sydney',       dx:   9, dy:  14 },
];

const DEFAULT_CONNECTIONS: { from: [number, number]; to: [number, number] }[] = [
  // ── Pacific ring ──────────────────────────────────────────────
  { from: [ 21.31, -157.83], to: [ 61.22, -149.90] }, // Honolulu → Anchorage
  { from: [-33.87,  151.21], to: [ 21.31, -157.83] }, // Sydney → Honolulu (Pacific)
  // ── Americas chain ────────────────────────────────────────────
  { from: [ 61.22, -149.90], to: [ 18.47,  -66.11] }, // Anchorage → San Juan
  { from: [ 18.47,  -66.11], to: [-34.60,  -58.38] }, // San Juan → Buenos Aires
  // ── Atlantic crossing ─────────────────────────────────────────
  { from: [-34.60,  -58.38], to: [ 38.72,   -9.14] }, // Buenos Aires → Lisbon
  { from: [ 38.72,   -9.14], to: [ 52.37,    4.90] }, // Lisbon → Amsterdam
  // ── Europe → Middle East ──────────────────────────────────────
  { from: [ 52.37,    4.90], to: [ 25.20,   55.27] }, // Amsterdam → Dubai
  // ── Africa leg ────────────────────────────────────────────────
  { from: [ 52.37,    4.90], to: [ -1.29,   36.82] }, // Amsterdam → Nairobi
  { from: [ -1.29,   36.82], to: [ 25.20,   55.27] }, // Nairobi → Dubai
  // ── Asia touring leg ──────────────────────────────────────────
  { from: [ 25.20,   55.27], to: [ 19.08,   72.88] }, // Dubai → Mumbai
  { from: [ 19.08,   72.88], to: [ 13.75,  100.52] }, // Mumbai → Bangkok
  { from: [ 13.75,  100.52], to: [ 35.68,  139.69] }, // Bangkok → Tokyo
  { from: [ 35.68,  139.69], to: [-33.87,  151.21] }, // Tokyo → Sydney
];



function latLngToXYZ(lat: number, lng: number, r: number): [number, number, number] {
  const phi   = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return [
    -(r * Math.sin(phi) * Math.cos(theta)),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta),
  ];
}

function rotateY(x: number, y: number, z: number, a: number): [number, number, number] {
  return [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)];
}

function rotateX(x: number, y: number, z: number, a: number): [number, number, number] {
  return [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];
}

function project(x: number, y: number, z: number, cx: number, cy: number, fov: number): [number, number] {
  const s = fov / (fov + z);
  return [x * s + cx, y * s + cy];
}

export function Globe({
  className = '',
  dotColor    = 'rgba(100, 180, 255, ALPHA)',
  arcColor    = 'rgba(100, 180, 255, 0.5)',
  markerColor = 'rgba(100, 220, 255, 1)',
  autoRotateSpeed = 0.010,
  connections = DEFAULT_CONNECTIONS,
  markers     = DEFAULT_MARKERS,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotYRef   = useRef(1.0);   // ~17°E — Europe cluster faces viewer on load
  const rotXRef   = useRef(-0.05); // slight negative — lifts cities to mid-screen
  const dragRef   = useRef({ active: false, startX: 0, startY: 0, startRotY: 0, startRotX: 0 });
  const animRef   = useRef<number>(0);
  const timeRef   = useRef(0);
  const dotsRef   = useRef<[number, number, number][]>([]);
  // Mouse-parallax: target rotation offsets from cursor
  const mouseRef  = useRef({ x: 0, y: 0 });        // normalized -1..1
  const lerpRef   = useRef({ x: 0, y: 0 });        // smoothly lerped values

  // Build Fibonacci-sphere dots once
  useEffect(() => {
    const dots: [number, number, number][] = [];
    const N = 1200;
    const gr = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < N; i++) {
      const theta = (2 * Math.PI * i) / gr;
      const phi   = Math.acos(1 - (2 * (i + 0.5)) / N);
      dots.push([Math.cos(theta) * Math.sin(phi), Math.cos(phi), Math.sin(theta) * Math.sin(phi)]);
    }
    dotsRef.current = dots;
  }, []);

  // Mouse move → update target parallax offset
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth  - 0.5) * 2; // -1..1
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2; // -1..1
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w   = canvas.clientWidth;
    const h   = canvas.clientHeight;
    canvas.width  = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const cx     = w / 2;
    const cy     = h / 2;
    const radius = Math.min(w, h) * 0.38;
    const fov    = 600;

    if (!dragRef.current.active) rotYRef.current += autoRotateSpeed;
    timeRef.current += 0.012;
    const time = timeRef.current;

    // Smooth lerp mouse parallax toward target (nebula-cube feel)
    const LERP = 0.035;
    lerpRef.current.x += (mouseRef.current.x - lerpRef.current.x) * LERP;
    lerpRef.current.y += (mouseRef.current.y - lerpRef.current.y) * LERP;
    // Organic wobble — slow sine drift on both axes
    const wobbleY = Math.sin(time * 0.18) * 0.04;
    const wobbleX = Math.cos(time * 0.13) * 0.025;
    const paralaxY = lerpRef.current.x * 0.18;   // mouse left/right → Y-axis tilt
    const paralaxX = lerpRef.current.y * 0.12;   // mouse up/down   → X-axis tilt

    ctx.clearRect(0, 0, w, h);

    // Outer glow
    const glow = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.5);
    glow.addColorStop(0, 'rgba(60,140,255,0.03)');
    glow.addColorStop(1, 'rgba(60,140,255,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    // Globe outline
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(100,180,255,0.06)';
    ctx.lineWidth = 1;
    ctx.stroke();

    const ry = rotYRef.current + paralaxY + wobbleY;
    const rx = rotXRef.current + paralaxX + wobbleX;

    // Dots
    for (const d of dotsRef.current) {
      let [x, y, z] = [d[0] * radius, d[1] * radius, d[2] * radius];
      [x, y, z] = rotateX(x, y, z, rx);
      [x, y, z] = rotateY(x, y, z, ry);
      if (z > 0) continue;
      const [sx, sy] = project(x, y, z, cx, cy, fov);
      const da   = Math.max(0.1, 1 - (z + radius) / (2 * radius));
      const size = 1 + da * 0.8;
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fillStyle = dotColor.replace('ALPHA', da.toFixed(2));
      ctx.fill();
    }

    // Arcs + traveling dots
    for (const conn of connections) {
      let [x1, y1, z1] = latLngToXYZ(conn.from[0], conn.from[1], radius);
      let [x2, y2, z2] = latLngToXYZ(conn.to[0],   conn.to[1],   radius);
      [x1, y1, z1] = rotateX(x1, y1, z1, rx); [x1, y1, z1] = rotateY(x1, y1, z1, ry);
      [x2, y2, z2] = rotateX(x2, y2, z2, rx); [x2, y2, z2] = rotateY(x2, y2, z2, ry);
      if (z1 > radius * 0.3 && z2 > radius * 0.3) continue;

      const [sx1, sy1] = project(x1, y1, z1, cx, cy, fov);
      const [sx2, sy2] = project(x2, y2, z2, cx, cy, fov);

      const mLen  = Math.sqrt(((x1+x2)/2)**2 + ((y1+y2)/2)**2 + ((z1+z2)/2)**2);
      const arcH  = radius * 1.25;
      const [scx, scy] = project(
        ((x1+x2)/2) / mLen * arcH,
        ((y1+y2)/2) / mLen * arcH,
        ((z1+z2)/2) / mLen * arcH,
        cx, cy, fov
      );

      ctx.beginPath();
      ctx.moveTo(sx1, sy1);
      ctx.quadraticCurveTo(scx, scy, sx2, sy2);
      ctx.strokeStyle = arcColor;
      ctx.lineWidth   = 1.2;
      ctx.stroke();

      const t  = (Math.sin(time * 1.2 + conn.from[0] * 0.1) + 1) / 2;
      const tx = (1-t)*(1-t)*sx1 + 2*(1-t)*t*scx + t*t*sx2;
      const ty = (1-t)*(1-t)*sy1 + 2*(1-t)*t*scy + t*t*sy2;
      ctx.beginPath();
      ctx.arc(tx, ty, 2, 0, Math.PI * 2);
      ctx.fillStyle = markerColor;
      ctx.fill();
    }

    // Markers
    for (const m of markers) {
      let [x, y, z] = latLngToXYZ(m.lat, m.lng, radius);
      [x, y, z] = rotateX(x, y, z, rx);
      [x, y, z] = rotateY(x, y, z, ry);
      if (z > radius * 0.1) continue;
      const [sx, sy] = project(x, y, z, cx, cy, fov);
      const pulse = Math.sin(time * 2 + m.lat) * 0.5 + 0.5;

      ctx.beginPath();
      ctx.arc(sx, sy, 4 + pulse * 4, 0, Math.PI * 2);
      ctx.strokeStyle = markerColor.replace('1)', `${(0.2 + pulse * 0.15).toFixed(2)})`);
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = markerColor;
      ctx.fill();

      if (m.label) {
        ctx.font      = '10px system-ui, sans-serif';
        ctx.fillStyle = markerColor.replace('1)', '0.6)');
        ctx.fillText(m.label, sx + (m.dx ?? 8), sy + (m.dy ?? 3));
      }
    }

    animRef.current = requestAnimationFrame(draw);
  }, [dotColor, arcColor, markerColor, autoRotateSpeed, connections, markers]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragRef.current = { active: true, startX: e.clientX, startY: e.clientY, startRotY: rotYRef.current, startRotX: rotXRef.current };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    rotYRef.current = dragRef.current.startRotY + (e.clientX - dragRef.current.startX) * 0.005;
    rotXRef.current = Math.max(-1, Math.min(1, dragRef.current.startRotX + (e.clientY - dragRef.current.startY) * 0.005));
  }, []);

  const onPointerUp = useCallback(() => { dragRef.current.active = false; }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full cursor-grab active:cursor-grabbing ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    />
  );
}
