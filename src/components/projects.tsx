"use client";

import { useEffect, useRef } from "react";
import { CardsParallax, type iCardItem } from "@/components/ui/scroll-cards";

/* ─── 4 Featured Projects (scroll-card parallax) ──────────────────── */
const featuredCards: iCardItem[] = [
  {
    title: "Tomorrowland — Main Stage Operations",
    description:
      "Full technical coordination for the world's largest EDM festival main stage. Managed audio systems architecture, power distribution, and multi-department crew coordination across build and show days.",
    tag: "Festival",
    src: "/images/tomorrowland-new.jpg",
    link: "#",
    color: "#0a0e14",
    textColor: "#e8f0fe",
    specs: ["400K Attendees", "Multi-Year", "Boom, Belgium"],
  },
  {
    title: "MDLBEAST Soundstorm",
    description:
      "Technical production management for Saudi Arabia's flagship music festival. Multi-stage audio, video, and lighting systems for 200,000+ daily capacity across purpose-built desert venue.",
    tag: "Mega-Festival",
    src: "/images/soundstorm.jpg",
    link: "#",
    color: "#0a0e14",
    textColor: "#e8f0fe",
    specs: ["200K+ Daily", "8 Stages", "Riyadh, KSA"],
  },
  {
    title: "Tiësto — International Tour Production",
    description:
      "Technical advancement and on-site production direction for Tiësto's touring show. Rider fulfilment, venue assessment, and full AV systems coordination across international dates.",
    tag: "Touring",
    src: "/images/tiesto-new.jpg",
    link: "#",
    color: "#0a0e14",
    textColor: "#e8f0fe",
    specs: ["Global Tour", "Arena Scale", "Multi-Country"],
  },
];


/* ─── Extended Field Log ──────────────────────────────────────────── */
type Engagement = {
  title: string;
  category: string;
  scale: string;
  location: string;
  year: string;
};

const furtherEngagements: Engagement[] = [
  { title: "Electric Castle Festival", category: "Festival", scale: "90K Attendees", location: "Cluj, Romania", year: "Multi-Year" },
  { title: "Untold Festival", category: "Festival", scale: "350K Total", location: "Cluj, Romania", year: "Multi-Year" },
  { title: "David Guetta — World Tour", category: "Touring", scale: "Arena Scale", location: "Global", year: "Multi-Year" },
  { title: "Martin Garrix — Live Production", category: "Touring", scale: "Stadium Scale", location: "Global", year: "2022–2024" },
  { title: "Sensation White — Amsterdam", category: "Arena Show", scale: "40K Capacity", location: "Amsterdam, NL", year: "Multi-Year" },
  { title: "Dubai Expo 2020 — AV Integration", category: "Corporate", scale: "25M Visitors", location: "Dubai, UAE", year: "2021–2022" },
  { title: "Formula E — Race Village Production", category: "Live & Sport", scale: "Multi-Zone", location: "Various Cities", year: "Multi-Year" },
  { title: "Creamfields UK", category: "Festival", scale: "70K Attendees", location: "Daresbury, UK", year: "Multi-Year" },
  { title: "Ultra Music Festival — Europe", category: "Festival", scale: "100K Total", location: "Split, Croatia", year: "Multi-Year" },
  { title: "Hardwell — Rebel Without A Pause", category: "Touring", scale: "Arena Scale", location: "Global", year: "2022–2023" },
  { title: "Armin van Buuren — A State of Trance", category: "Branded Event", scale: "25K Per Night", location: "Various", year: "Multi-Year" },
  { title: "Sonus Festival — Zrce Beach", category: "Festival", scale: "Boutique Scale", location: "Zrce, Croatia", year: "Multi-Year" },
  { title: "New Year's Eve — Burj Khalifa", category: "Civic Event", scale: "1M Fireworks Viewers", location: "Dubai, UAE", year: "Multi-Year" },
  { title: "Abu Dhabi HSBC Golf Championship", category: "Live & Sport", scale: "Stadium AV", location: "Abu Dhabi, UAE", year: "2023" },
  { title: "Awakenings Festival", category: "Festival", scale: "50K Capacity", location: "Amsterdam, NL", year: "Multi-Year" },
];

/* ─── Animated engagement row ─────────────────────────────────────── */
function EngagementRow({ item, index }: { item: Engagement; index: number }) {
  const rowRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateX(-12px)";
    el.style.transition = `opacity 0.5s ease ${index * 0.04}s, transform 0.5s ease ${index * 0.04}s`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateX(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <tr
      ref={rowRef}
      className="group border-b border-[rgba(0,212,255,0.07)] hover:border-[rgba(0,212,255,0.2)] hover:bg-[rgba(0,212,255,0.03)] transition-colors duration-200 cursor-default"
    >
      {/* Index */}
      <td className="py-3.5 pr-6 font-[var(--font-mono)] text-[0.6rem] text-[#4a5568] tracking-[0.15em] w-10 align-middle">
        {String(index + 1).padStart(2, "0")}
      </td>

      {/* Title */}
      <td className="py-3.5 pr-8 align-middle">
        <span className="font-[var(--font-display)] text-[0.9rem] text-[#c8d6e8] group-hover:text-[#e8f0fe] transition-colors duration-200 leading-tight">
          {item.title}
        </span>
      </td>

      {/* Category pill */}
      <td className="py-3.5 pr-6 align-middle hidden sm:table-cell">
        <span className="font-[var(--font-mono)] text-[0.6rem] text-[#00d4ff]/60 tracking-[0.15em] uppercase border border-[rgba(0,212,255,0.18)] px-2.5 py-1 rounded-sm">
          {item.category}
        </span>
      </td>

      {/* Scale */}
      <td className="py-3.5 pr-6 align-middle hidden md:table-cell">
        <span className="font-[var(--font-mono)] text-[0.7rem] text-[#8892a4]">
          {item.scale}
        </span>
      </td>

      {/* Location */}
      <td className="py-3.5 pr-6 align-middle hidden lg:table-cell">
        <span className="font-[var(--font-mono)] text-[0.7rem] text-[#6b7280]">
          {item.location}
        </span>
      </td>

      {/* Year */}
      <td className="py-3.5 align-middle text-right">
        <span className="font-[var(--font-mono)] text-[0.65rem] text-[#4a5568] tracking-widest">
          {item.year}
        </span>
      </td>
    </tr>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative z-[1] bg-transparent border-t border-[rgba(0,212,255,0.12)]">
      {/* ─── Section Header ─── */}
      <div className="pt-[100px] pb-12 max-w-[1200px] mx-auto px-6 text-center">
        <span className="font-[var(--font-mono)] text-xs text-[#00d4ff] tracking-[0.15em] block mb-4 uppercase">Projects</span>
        <h2 className="font-[var(--font-display)] font-bold text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-[#e8f0fe] mb-4">
          Nodal In The Field
        </h2>
        <p className="text-[#8892a4] text-lg max-w-[600px] mx-auto">
          A record of complex technical engagements — each one a systems problem solved under live-event conditions, at scale, with zero margin for failure.
        </p>
      </div>

      {/* ─── Parallax Scroll Cards ─── */}
      <CardsParallax items={featuredCards} />

      {/* ─── Further Engagements Log ─── */}
      <div className="max-w-[1200px] mx-auto px-6 pb-[100px] pt-24">
        {/* Sub-header */}
        <div className="flex items-end justify-between mb-8 border-b border-[rgba(0,212,255,0.12)] pb-5">
          <div>
            <span className="font-[var(--font-mono)] text-[0.6rem] text-[#00d4ff]/70 tracking-[0.2em] uppercase block mb-2">
              Extended Field Log
            </span>
            <h3 className="font-[var(--font-display)] text-xl font-semibold text-[#e8f0fe]">
              Further Engagements
            </h3>
          </div>
          <span className="font-[var(--font-mono)] text-[0.65rem] text-[#4a5568] tracking-widest">
            {furtherEngagements.length} Records
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Column headers */}
            <thead>
              <tr className="border-b border-[rgba(0,212,255,0.1)]">
                <th className="pb-3 pr-6 text-left font-[var(--font-mono)] text-[0.55rem] text-[#4a5568] tracking-[0.2em] uppercase w-10">#</th>
                <th className="pb-3 pr-8 text-left font-[var(--font-mono)] text-[0.55rem] text-[#4a5568] tracking-[0.2em] uppercase">Project</th>
                <th className="pb-3 pr-6 text-left font-[var(--font-mono)] text-[0.55rem] text-[#4a5568] tracking-[0.2em] uppercase hidden sm:table-cell">Category</th>
                <th className="pb-3 pr-6 text-left font-[var(--font-mono)] text-[0.55rem] text-[#4a5568] tracking-[0.2em] uppercase hidden md:table-cell">Scale</th>
                <th className="pb-3 pr-6 text-left font-[var(--font-mono)] text-[0.55rem] text-[#4a5568] tracking-[0.2em] uppercase hidden lg:table-cell">Location</th>
                <th className="pb-3 text-right font-[var(--font-mono)] text-[0.55rem] text-[#4a5568] tracking-[0.2em] uppercase">Year</th>
              </tr>
            </thead>
            <tbody>
              {furtherEngagements.map((item, i) => (
                <EngagementRow key={item.title} item={item} index={i} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer note */}
        <p className="font-[var(--font-mono)] text-[0.65rem] text-[#4a5568] mt-8 tracking-widest text-right">
          Partial record — NDA-governed engagements excluded
        </p>
      </div>
    </section>
  );
}
