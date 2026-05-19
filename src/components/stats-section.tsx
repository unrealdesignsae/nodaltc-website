"use client";

import { useState, useEffect, useRef } from "react";
import { SpotlightContainer, GlowCard } from "@/components/ui/spotlight-card";

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description: string;
}

const stats: StatItem[] = [
  { label: "Projects Delivered",   value: 120, suffix: "+",  description: "Across festivals, concerts & corporate events" },
  { label: "Countries Activated",  value: 18,  suffix: "",   description: "International deployments in the Middle East & beyond" },
  { label: "Years Experience",     value: 15,  suffix: "+",  description: "Deep technical expertise in live production" },
  { label: "Audience Capacity",    value: 50,  suffix: "K+", description: "Largest single event served by Nodal systems" },
];

function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);

  return count;
}

function StatCard({ stat, active }: { stat: StatItem; active: boolean }) {
  const count = useCountUp(stat.value, 1800, active);

  return (
    <GlowCard glowColor="cyan" className="h-full cursor-default group">
      <div className="relative z-10 flex flex-col gap-3 p-8">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 h-[2px] w-8 bg-[#00d4ff] transition-all duration-500 group-hover:w-full" />

        <span className="font-[var(--font-display)] text-[clamp(2.4rem,5vw,3.6rem)] font-bold text-[#e8f0fe] leading-none tabular-nums">
          {stat.prefix ?? ""}
          {count}
          {stat.suffix ?? ""}
        </span>

        <span className="font-[var(--font-mono)] text-xs text-[#00d4ff] tracking-[0.15em] uppercase">
          {stat.label}
        </span>

        <p className="text-[#4a5568] text-sm leading-relaxed">
          {stat.description}
        </p>
      </div>
    </GlowCard>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-[100px] relative z-[1] border-t border-[rgba(0,212,255,0.12)]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-[var(--font-mono)] text-xs text-[#00d4ff] tracking-[0.15em] block mb-4"></span>
          <h2 className="font-[var(--font-display)] font-bold text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-[#e8f0fe] mb-4">
            Scale We&apos;ve Operated At
          </h2>
          <p className="text-[#8892a4] text-lg max-w-[500px] mx-auto">
            A decade and a half of high-stakes live production — the numbers
            speak for themselves.
          </p>
        </div>

        <SpotlightContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} active={active} />
          ))}
        </SpotlightContainer>
      </div>
    </section>
  );
}
