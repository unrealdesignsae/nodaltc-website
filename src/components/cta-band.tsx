"use client";
import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

export function CTABand() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <section
      ref={ref}
      className="h-[300vh] w-full relative overflow-clip"
    >
      {/* Single sticky frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">

        {/* ── Title block ── */}
        <div className="pt-24 md:pt-40 pb-4 text-center px-4 shrink-0">
          <p className="text-4xl md:text-7xl font-bold pb-2 bg-clip-text text-transparent bg-gradient-to-b from-[#e8f0fe] to-[#8892a4]">
            Ready to Engineer Your Next Event?
          </p>
          <p className="text-sm md:text-lg font-normal text-[#8892a4] mt-4 max-w-2xl mx-auto">
            From initial brief to final show — Nodal delivers precision at every node in the production chain.
          </p>
        </div>

        {/* ── Animation area ── */}
        <div
          className="relative overflow-hidden shrink-0 h-[180px] md:h-auto md:flex-1"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        >
          {/* SVG wires */}
          <GoogleGeminiEffect
            pathLengths={[
              pathLengthFirst,
              pathLengthSecond,
              pathLengthThird,
              pathLengthFourth,
              pathLengthFifth,
            ]}
            className="absolute inset-0"
          />

          {/* Left edge fade */}
          <div
            className="absolute left-0 top-0 h-full w-40 pointer-events-none z-20"
            style={{ background: "linear-gradient(to right, var(--background) 0%, transparent 100%)" }}
          />
          {/* Right edge fade */}
          <div
            className="absolute right-0 top-0 h-full w-40 pointer-events-none z-20"
            style={{ background: "linear-gradient(to left, var(--background) 0%, transparent 100%)" }}
          />

          {/* Button — desktop only: floats inside the animation area */}
          <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none z-30">
            <a
              href="#contact"
              className="pointer-events-auto inline-flex items-center gap-2 bg-[#00d4ff] text-black font-bold text-base tracking-wider uppercase px-10 py-[18px] rounded-[4px] hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] hover:-translate-y-px transition-all duration-300 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white/15 -translate-x-full group-hover:translate-x-0 transition-transform duration-400" />
              <span className="relative">Start the Conversation</span>
            </a>
          </div>
        </div>

        {/* ── Button — mobile only: below the wires ── */}
        <div className="md:hidden flex justify-center px-4 pt-4 pb-8 shrink-0">
          <a
            href="#contact"
            className="w-full max-w-sm inline-flex items-center justify-center gap-2 bg-[#00d4ff] text-black font-bold text-base tracking-wider uppercase px-10 py-[18px] rounded-[4px] hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] active:scale-[0.98] transition-all duration-300 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-white/15 -translate-x-full group-hover:translate-x-0 transition-transform duration-400" />
            <span className="relative">Start the Conversation</span>
          </a>
        </div>

      </div>

    </section>
  );
}
