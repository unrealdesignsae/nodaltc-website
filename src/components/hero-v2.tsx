"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";

// Dynamic imports — both need the client
const ReactorKnob = dynamic(() => import("@/components/ui/reactor-knob"), {
  ssr: false,
});
const VideoScrubber = dynamic(
  () => import("@/components/ui/video-scrubber"),
  { ssr: false }
);

// ─── Main Hero v2 ─────────────────────────────────────────────────────────────
export function HeroV2() {
  // seekFnRef is populated by VideoScrubber on mount.
  // ReactorKnob calls it directly in pointermove — pointer event → video.currentTime
  // with zero intermediaries (no RAF loop, no state, no async).
  const seekFnRef = useRef<((pct: number) => void) | null>(null);

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* ── Full-screen video — mask-image fades pixels at bottom, no hard edge ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 45%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.1) 85%, transparent 100%)',
          maskImage:       'linear-gradient(to bottom, black 0%, black 45%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.1) 85%, transparent 100%)',
        }}
      >
        <VideoScrubber seekFnRef={seekFnRef} src="/combined.mp4" />
      </div>

      {/* ── Layered content ── */}
      <div className="relative z-20 flex flex-col items-center w-full h-full">

        {/* ── Title — near the top ── */}
        <div className="pt-[100px] text-center px-6">
          <p className="font-[var(--font-mono)] text-[0.7rem] text-[#00d4ff]/70 tracking-[0.2em] uppercase mb-3">
            Nodal Technical Consultancy
          </p>
          <h1
            className="font-[var(--font-display)] font-bold whitespace-nowrap tracking-tight text-[#e8f0fe]"
            style={{ fontSize: "clamp(1rem, 2.2vw, 1.6rem)" }}
          >
            Every Signal. Every Node.{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #00d4ff 0%, #00b4d8 50%, #0ea5e9 100%)",
              }}
            >
              Precisely Engineered.
            </span>
          </h1>
        </div>

        {/* ── Flex spacer — fills remaining vertical space so knob pins to bottom on mobile ── */}
        <div className="flex-1" />

        {/* ── Reactor Knob — bottom-pinned on mobile, centred on desktop ── */}
        <div className="relative z-10 flex items-center justify-center mb-[4vh] sm:mb-[6vh]">
          <div
            className="block sm:hidden"
            style={{ transform: "scale(0.55)", transformOrigin: "center center" }}
          >
            <ReactorKnob seekFnRef={seekFnRef} />
          </div>
          <div
            className="hidden sm:block"
            style={{ transform: "scale(0.85)", transformOrigin: "center center" }}
          >
            <ReactorKnob seekFnRef={seekFnRef} />
          </div>
        </div>


      </div>
    </section>

  );
}
