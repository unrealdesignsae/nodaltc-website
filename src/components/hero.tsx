"use client";

import { useEffect, useRef } from "react";

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center px-6 max-w-[1200px] mx-auto relative pt-[120px] pb-20"
    >
      {/* Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-[620px] relative z-[2]">
        <div className="inline-flex items-center gap-2 font-[var(--font-mono)] text-xs tracking-[0.15em] text-[#00d4ff] uppercase px-4 py-2 border border-[rgba(0,212,255,0.12)] rounded-sm mb-8 bg-[rgba(0,212,255,0.08)]">
          <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full animate-[pulse-dot_2s_ease-in-out_infinite]" />
          Technical Event Engineering
        </div>

        <h1 className="font-[var(--font-display)] font-bold text-[clamp(2.8rem,6vw,5rem)] leading-[1.1] tracking-tight text-[#e8f0fe] mb-6">
          Every Signal.
          <br />
          Every Node.
          <br />
          <span className="text-[#00d4ff]">Precisely Engineered.</span>
        </h1>

        <div className="flex items-center gap-4 flex-wrap mb-16">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#00d4ff] text-black font-[var(--font-display)] font-bold text-sm tracking-wider uppercase px-7 py-3.5 rounded-[4px] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:-translate-y-px transition-all duration-300 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-white/15 -translate-x-full group-hover:translate-x-0 transition-transform duration-400" />
            <span className="relative">Start a Project</span>
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 text-[#8892a4] font-[var(--font-display)] font-semibold text-sm tracking-wide uppercase px-7 py-3.5 border border-[rgba(0,212,255,0.12)] rounded-[4px] hover:text-[#00d4ff] hover:border-[#00d4ff] hover:bg-[rgba(0,212,255,0.08)] transition-all duration-300 group"
          >
            View Services
            <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </a>
        </div>

        <HeroStats />
      </div>

      {/* Radar Visual */}
      <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 w-[400px] h-[400px] flex items-center justify-center opacity-60 hidden lg:flex">
        <div className="absolute w-full h-full rounded-full border border-[#00d4ff] opacity-20" />
        <div className="absolute w-2/3 h-2/3 rounded-full border border-[#00d4ff] opacity-30" />
        <div className="absolute w-1/3 h-1/3 rounded-full border border-[#00d4ff] opacity-40" />
        <div
          className="absolute w-1/2 h-px right-1/2"
          style={{
            background: "linear-gradient(90deg, transparent, #00d4ff)",
            transformOrigin: "right center",
            animation: "sweep 4s linear infinite",
          }}
        />
        <div className="w-2 h-2 bg-[#00d4ff] rounded-full shadow-[0_0_12px_#00d4ff]" />
        <div className="absolute top-[20%] left-[30%] w-1.5 h-1.5 bg-[#00d4ff] rounded-full animate-[blip_3s_ease-in-out_infinite]" />
        <div className="absolute top-[60%] left-[70%] w-1.5 h-1.5 bg-[#00d4ff] rounded-full animate-[blip_3s_ease-in-out_infinite_1s]" />
        <div className="absolute top-[75%] left-[25%] w-1.5 h-1.5 bg-[#00d4ff] rounded-full animate-[blip_3s_ease-in-out_infinite_2s]" />
      </div>
    </section>
  );
}

function HeroStats() {
  return (
    <div className="flex items-center gap-8 flex-wrap">
      <StatCounter target={200} label="Events Delivered" />
      <div className="w-px h-10 bg-[rgba(0,212,255,0.12)]" />
      <StatCounter target={40} label="Countries Served" />
      <div className="w-px h-10 bg-[rgba(0,212,255,0.12)]" />
      <StatCounter target={15} label="Years Expertise" />
    </div>
  );
}

function StatCounter({ target, label }: { target: number; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          let current = 0;
          const step = target / (1800 / 16);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              el.textContent = String(target);
              clearInterval(timer);
            } else {
              el.textContent = String(Math.floor(current));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline">
        <span
          ref={ref}
          className="font-[var(--font-display)] text-4xl font-bold text-[#00d4ff] leading-none"
        >
          0
        </span>
        <span className="font-[var(--font-display)] text-4xl font-bold text-[#00d4ff]">
          +
        </span>
      </div>
      <span className="font-[var(--font-mono)] text-[0.7rem] text-[#4a5568] tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
}
