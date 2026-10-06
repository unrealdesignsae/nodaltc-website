"use client";

import { useEffect, useRef } from "react";
import { projects } from "@/lib/projects-data";
import { CardsParallax, type iCardItem } from "@/components/ui/scroll-cards";

// Engagement details come from the supplied workbook; keep the requested order.
const highlights = [
  {id:1, image:'electric-castle', description:'Mainstage production management, headline advancing, rider integration and on-site show delivery.'},
  {id:2, image:'al-qadsiah', description:'Technical direction of a multi-stage festival build: AVL and staging, vendor coordination, site layout and stage readiness for show days.'},
  {id:7, image:'tiesto', description:'World tour production management: advancing, local suppliers, crew logistics and delivery from load-in to load-out.'},
];
const featuredCards:iCardItem[]=highlights.map(({id,image,description})=>{
  const project=projects.find(p=>p.id===id)!;
  return {...project,description,tag:project.category,src:`/projects/${image}.png`,link:'#contact',color:'#0a0e14',textColor:'#e8f0fe',specs:[project.year,project.location]};
});

type Engagement = (typeof projects)[number];
const featuredIds = highlights.map(project => project.id);
const allEngagements = [
  ...featuredIds.map(id => projects.find(project => project.id === id)!),
  ...projects.filter(project => !featuredIds.includes(project.id)),
];

/* ─── Animated engagement row ─────────────────────────────────────── */
function EngagementRow({ item, index }: { item: Engagement; index: number }) {
  const rowRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    const el = rowRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
      <td className="py-3.5 pr-6 font-[var(--font-mono)] text-[0.6rem] text-[#8a9bad] tracking-[0.15em] w-10 align-middle">
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
        <span className="font-[var(--font-mono)] text-[0.7rem] text-[#8a9bad]">
          {item.location}
        </span>
      </td>

      {/* Year */}
      <td className="py-3.5 align-middle text-right">
        <span className="font-[var(--font-mono)] text-[0.65rem] text-[#8a9bad] tracking-widest">
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
      <p className="project-source-note">Al Qadsiah photo supplied by the client. Electric Castle and Tiësto images are reference-based visualizations. Project details supplied by Nodal.</p>

      {/* ─── All Projects Log ─── */}
      <div className="max-w-[1200px] mx-auto px-6 pb-[100px] pt-24">
        {/* Sub-header */}
        <div className="flex items-end justify-between mb-8 border-b border-[rgba(0,212,255,0.12)] pb-5">
          <div>
            <span className="font-[var(--font-mono)] text-[0.6rem] text-[#00d4ff]/70 tracking-[0.2em] uppercase block mb-2">
              Complete Project List
            </span>
            <h3 className="font-[var(--font-display)] text-xl font-semibold text-[#e8f0fe]">
              All Projects
            </h3>
          </div>
          <span className="font-[var(--font-mono)] text-[0.65rem] text-[#8a9bad] tracking-widest">
            {allEngagements.length} Records
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Column headers */}
            <thead>
              <tr className="border-b border-[rgba(0,212,255,0.1)]">
                <th className="pb-3 pr-6 text-left font-[var(--font-mono)] text-[0.55rem] text-[#8a9bad] tracking-[0.2em] uppercase w-10">#</th>
                <th className="pb-3 pr-8 text-left font-[var(--font-mono)] text-[0.55rem] text-[#8a9bad] tracking-[0.2em] uppercase">Project</th>
                <th className="pb-3 pr-6 text-left font-[var(--font-mono)] text-[0.55rem] text-[#8a9bad] tracking-[0.2em] uppercase hidden sm:table-cell">Category</th>
                <th className="pb-3 pr-6 text-left font-[var(--font-mono)] text-[0.55rem] text-[#8a9bad] tracking-[0.2em] uppercase hidden md:table-cell">Scale</th>
                <th className="pb-3 pr-6 text-left font-[var(--font-mono)] text-[0.55rem] text-[#8a9bad] tracking-[0.2em] uppercase hidden lg:table-cell">Location</th>
                <th className="pb-3 text-right font-[var(--font-mono)] text-[0.55rem] text-[#8a9bad] tracking-[0.2em] uppercase">Year</th>
              </tr>
            </thead>
            <tbody>
              {allEngagements.map((item, i) => (
                <EngagementRow key={item.title} item={item} index={i} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer note */}
        <p className="font-[var(--font-mono)] text-[0.65rem] text-[#8a9bad] mt-8 tracking-widest text-right">
          Project record supplied by Nodal
        </p>
      </div>
    </section>
  );
}
