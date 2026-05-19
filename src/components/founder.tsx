"use client";

import { AnimatedTiles } from "@/components/ui/animated-tiles";

export function Founder() {
  return (
    <section
      id="founder"
      className="py-[100px] border-t border-[rgba(0,212,255,0.12)] relative z-[1] bg-transparent"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 lg:gap-20">

          {/* ── LEFT: Founder portrait ── */}
          <div className="w-full md:w-auto shrink-0 flex items-center justify-center md:justify-start">
            <div
              className="relative"
              style={{ width: 390, maxWidth: "100%" }}
            >
              {/* Animated tile portrait */}
              <AnimatedTiles
                imageUrl="/founder.jpg"
                rows={8}
                cols={6}
                tileSize={65}
              />
            </div>
          </div>

          {/* ── RIGHT: Bio ── */}
          <div className="flex-1 flex flex-col justify-center md:pt-4">
            {/* Label */}
            <span className="font-[var(--font-mono)] text-xs text-[#00d4ff] tracking-[0.15em] block mb-3 uppercase">
              The Founder
            </span>

            {/* Name */}
            <h2 className="font-[var(--font-display)] font-bold text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-[#e8f0fe] mb-2">
              Sem Elitas
            </h2>

            {/* Title */}
            <p className="text-[#8892a4] text-lg mb-8">
              Founder &amp; Technical Director
            </p>

            {/* Pull-quote */}
            <p className="text-lg text-[#e8f0fe] font-medium leading-relaxed border-l-2 border-[#00d4ff] pl-5 mb-6">
              Nodal was built on a single conviction: that elite technical
              production demands more than great gear — it demands systems
              thinking, disciplined documentation, and zero tolerance for
              failure.
            </p>

            {/* Bio paragraphs */}
            <p className="text-[#8892a4] text-[0.95rem] leading-[1.8] mb-4">
              After 15+ years engineering the world&apos;s most demanding live
              events — Tomorrowland, MDLBEAST Soundstorm, Electric Castle,
              Tiësto&apos;s global touring rig — Sem Elitas distilled that
              field intelligence into a consultancy model: one that embeds at
              the technical core of your project, not just at the periphery.
            </p>
            <p className="text-[#8892a4] text-[0.95rem] leading-[1.8] mb-6">
              Every Nodal engagement is anchored by the same principles that
              govern mission-critical production: every signal path documented,
              every load calculated, every contingency accounted for. The result
              is a technical framework that holds together under pressure —
              whether you&apos;re commissioning a flagship venue, launching a
              touring production, or integrating a multi-site AV infrastructure.
            </p>

            {/* Stats row */}
            <div className="flex gap-8 pt-4 border-t border-[rgba(0,212,255,0.12)]">
              <div>
                <p className="font-[var(--font-display)] text-[1.8rem] font-bold text-[#e8f0fe] leading-none">15+</p>
                <p className="text-[#8892a4] text-xs mt-1 font-[var(--font-mono)] uppercase tracking-widest">Years Active</p>
              </div>
              <div>
                <p className="font-[var(--font-display)] text-[1.8rem] font-bold text-[#e8f0fe] leading-none">40+</p>
                <p className="text-[#8892a4] text-xs mt-1 font-[var(--font-mono)] uppercase tracking-widest">Countries</p>
              </div>
              <div>
                <p className="font-[var(--font-display)] text-[1.8rem] font-bold text-[#00d4ff] leading-none">200K</p>
                <p className="text-[#8892a4] text-xs mt-1 font-[var(--font-mono)] uppercase tracking-widest">Capacity Events</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
