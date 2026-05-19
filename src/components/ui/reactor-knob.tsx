"use client";

import React, { useState, useEffect, useCallback, useRef, MutableRefObject } from "react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "motion/react";

// ─── Configuration ───────────────────────────────────────────────────────────
const MIN_DEG = -135;
const MAX_DEG = 135;
const TOTAL_TICKS = 80;
const DEGREES_PER_TICK = (MAX_DEG - MIN_DEG) / TOTAL_TICKS;

// ─── Tick Mark ───────────────────────────────────────────────────────────────
function TickMark({
  currentRotation,
  angle,
}: {
  currentRotation: ReturnType<typeof useSpring>;
  angle: number;
}) {
  const opacity = useTransform(currentRotation, (r: number) =>
    r >= angle ? 1 : 0.2
  );
  const color = useTransform(currentRotation, (r: number) =>
    r >= angle ? "#00d4ff" : "#1e3a4a"
  );
  const boxShadow = useTransform(currentRotation, (r: number) =>
    r >= angle ? "0 0 8px rgba(0, 212, 255, 0.7)" : "none"
  );

  return (
    <motion.div
      style={{ backgroundColor: color, opacity, boxShadow }}
      className="w-[3px] h-[10px] rounded-full"
    />
  );
}

// ─── Display Value ────────────────────────────────────────────────────────────
function DisplayValue({ value }: { value: MotionValue<number> }) {
  const [display, setDisplay] = useState(0);
  useMotionValueEvent(value, "change", (latest) =>
    setDisplay(Math.round(latest))
  );

  return (
    <div className="relative">
      <span className="absolute inset-0 blur-sm text-[#00d4ff]/40 font-mono text-2xl font-black tabular-nums tracking-widest">
        {display.toString().padStart(3, "0")}
      </span>
      <span className="relative font-mono text-2xl text-[#00d4ff] font-black tabular-nums tracking-widest">
        {display.toString().padStart(3, "0")}
        <span className="text-xs text-[#4a5568] ml-1">%</span>
      </span>
    </div>
  );
}

// ─── Main Knob ────────────────────────────────────────────────────────────────
export default function ReactorKnob({
  onValueChange,
  seekFnRef,
}: {
  onValueChange?: (value: number) => void;
  /** Direct seek callback populated by VideoScrubber. Called in pointermove — zero lag. */
  seekFnRef?: MutableRefObject<((pct: number) => void) | null>;
}) {
  const [isDragging, setIsDragging] = useState(false);

  // Raw angle (unsnapped) — drives the light instantly
  const rawRotation = useMotionValue(MIN_DEG);
  // Snapped angle — drives the physical knob body
  const snappedRotation = useMotionValue(MIN_DEG);
  // Physics spring on the snapped value
  const smoothRotation = useSpring(snappedRotation, {
    stiffness: 900,
    damping: 50,
    mass: 0.4,
  });

  // Derived values for visuals
  const displayValue = useTransform(smoothRotation, [MIN_DEG, MAX_DEG], [0, 100]) as import("motion/react").MotionValue<number>;
  const lightOpacity = useTransform(rawRotation, [MIN_DEG, MAX_DEG], [0.04, 0.45]);
  const lightBlur = useTransform(rawRotation, [MIN_DEG, MAX_DEG], ["0px", "24px"]);

  // onValueChange uses the spring-smoothed value for any UI consumers.
  useMotionValueEvent(displayValue, "change", (latest) => {
    onValueChange?.(Math.round(latest));
  });

  // Pointer drag
  const knobRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = useCallback(() => {
    setIsDragging(true);
    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!knobRef.current) return;
      const rect = knobRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let degs = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI) + 90;
      if (degs > 180) degs -= 360;
      if (degs < MIN_DEG && degs > -180) degs = MIN_DEG;
      if (degs > MAX_DEG) degs = MAX_DEG;

      rawRotation.set(degs);
      snappedRotation.set(Math.round(degs / DEGREES_PER_TICK) * DEGREES_PER_TICK);

      // Call the seek function DIRECTLY — same synchronous tick as pointermove.
      // This is the absolute minimum latency: pointer event → video.currentTime.
      if (seekFnRef?.current) {
        const pct = Math.max(0, Math.min(100,
          ((degs - MIN_DEG) / (MAX_DEG - MIN_DEG)) * 100
        ));
        seekFnRef.current(pct);
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging, rawRotation, snappedRotation]);

  const ticks = Array.from({ length: TOTAL_TICKS + 1 });

  return (
    <div className="relative w-80 h-80 select-none flex items-center justify-center">
      {/* Ambient Glow (cyan-tinted for NTC brand) */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          opacity: lightOpacity,
          background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)",
          filter: lightBlur,
        }}
      />

      {/* Tick marks ring */}
      <div className="absolute inset-0 pointer-events-none">
        {ticks.map((_, i) => {
          const angle =
            (i / TOTAL_TICKS) * (MAX_DEG - MIN_DEG) + MIN_DEG;
          return (
            <div
              key={i}
              className="absolute top-0 left-1/2 w-[3px] h-full -translate-x-1/2"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <TickMark currentRotation={smoothRotation} angle={angle} />
            </div>
          );
        })}
      </div>

      {/* Knob body */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52">
        <motion.div
          ref={knobRef}
          className={`relative w-full h-full rounded-full touch-none z-20 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ rotate: smoothRotation }}
          onPointerDown={handlePointerDown}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Outer shell */}
          <div className="w-full h-full rounded-full bg-[#0a1520] border border-[rgba(0,212,255,0.18)] shadow-[0_12px_40px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(0,212,255,0.08)] flex items-center justify-center relative overflow-hidden">
            {/* Brushed-metal conic gradient */}
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,rgba(0,212,255,0.07),transparent_50%),conic-gradient(from_0deg,transparent_0deg,#000_360deg)]" />

            {/* Inner cap */}
            <div className="relative w-[120px] h-[120px] rounded-full bg-[#070a0f] shadow-[inset_0_2px_6px_rgba(0,0,0,1)] border border-[rgba(0,212,255,0.1)] flex items-center justify-center">
              {/* Indicator line */}
              <motion.div
                className="absolute top-3 w-[5px] h-[18px] rounded-full"
                style={{
                  background: "#00d4ff",
                  boxShadow: useTransform(
                    rawRotation,
                    (r) =>
                      `0 0 ${Math.max(4, (r + 135) / 9)}px rgba(0,212,255,0.9)`
                  ),
                }}
              />

              <div className="flex flex-col items-center mt-5 opacity-40">
                <span className="font-mono text-[8px] text-[#4a5568] tracking-widest uppercase">
                  LEVEL
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Digital readout */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
        <span className="text-[10px] text-[#4a5568] font-mono tracking-[0.2em] mb-1 uppercase">
          Output
        </span>
        <DisplayValue value={displayValue} />
      </div>
    </div>
  );
}
