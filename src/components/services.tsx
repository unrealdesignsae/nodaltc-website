"use client";

import { useEffect, useRef } from "react";
import { SpotlightContainer, GlowCard } from "@/components/ui/spotlight-card";

const services = [
  {
    num: "01",
    title: "Audio Systems Engineering",
    desc: "System design, venue acoustics, PA specification, monitor systems, and RF frequency coordination for any scale of event.",
    items: [
      "PA System Design & Specification",
      "RF & IEM Coordination",
      "Acoustic Analysis",
      "Signal Flow Architecture",
    ],
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="4" y="16" width="32" height="8" rx="1" stroke="#00d4ff" strokeWidth="1.5" />
        <circle cx="12" cy="20" r="2" fill="#00d4ff" />
        <circle cx="20" cy="20" r="2" fill="#00d4ff" />
        <circle cx="28" cy="20" r="2" fill="#00d4ff" />
        <path d="M8 10 L8 16 M16 8 L16 16 M24 10 L24 16 M32 12 L32 16" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.5" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Lighting Design & Control",
    desc: "Full lighting system specification, console programming, and fixture selection for concerts, corporate events, and festivals.",
    items: [
      "Lighting Plot Design",
      "Console Programming",
      "LED & Laser Integration",
      "Automated Fixture Spec",
    ],
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <polygon points="20,4 36,32 4,32" stroke="#00d4ff" strokeWidth="1.5" fill="none" />
        <line x1="20" y1="4" x2="20" y2="20" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="20" cy="20" r="3" fill="#00d4ff" />
        <line x1="12" y1="28" x2="28" y2="28" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.4" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Video & LED Production",
    desc: "LED wall design, video playback systems, live switching, IMAG systems, and full broadcast-quality production setup.",
    items: [
      "LED Wall Configuration",
      "Media Server Programming",
      "Live Switching & IMAG",
      "Broadcast Integration",
    ],
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="4" y="8" width="24" height="18" rx="1" stroke="#00d4ff" strokeWidth="1.5" />
        <rect x="6" y="10" width="20" height="14" fill="#00d4ff" fillOpacity="0.05" />
        <path d="M28 16 L36 12 L36 28 L28 24" stroke="#00d4ff" strokeWidth="1.5" fill="none" />
        <line x1="8" y1="30" x2="32" y2="30" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.4" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Rigging & Structural Engineering",
    desc: "Load calculations, ground support design, truss specification, and rigging point coordination compliant with global safety standards.",
    items: [
      "Load & Structural Calculations",
      "Ground Support Design",
      "Venue Rigging Assessment",
      "Safety Compliance Review",
    ],
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <line x1="20" y1="4" x2="20" y2="36" stroke="#00d4ff" strokeWidth="1.5" />
        <line x1="4" y1="20" x2="36" y2="20" stroke="#00d4ff" strokeWidth="1.5" />
        <rect x="14" y="14" width="12" height="12" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="20" cy="20" r="4" stroke="#00d4ff" strokeWidth="1" />
        <path d="M8 8 L12 12 M32 8 L28 12 M8 32 L12 28 M32 32 L28 28" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.4" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Power Distribution",
    desc: "Temporary power system design, generator specification, distribution planning, and full electrical load analysis for any event footprint.",
    items: [
      "Load Analysis & Planning",
      "Generator Specification",
      "Distribution Architecture",
      "Electrical Safety Review",
    ],
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M8 32 L8 12 L20 6 L32 12 L32 32" stroke="#00d4ff" strokeWidth="1.5" fill="none" />
        <rect x="14" y="22" width="12" height="10" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.6" />
        <path d="M16 22 L16 18 L24 18 L24 22" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.4" />
        <circle cx="20" cy="25" r="1.5" fill="#00d4ff" fillOpacity="0.7" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Project Technical Direction",
    desc: "Full technical production management — from initial client brief through post-event debrief, coordinating all technical departments on-site.",
    items: [
      "Technical Rider Analysis",
      "Vendor Coordination",
      "On-Site Technical Direction",
      "Post-Event Documentation",
    ],
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="14" stroke="#00d4ff" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="8" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="20" cy="20" r="3" fill="#00d4ff" />
        <line x1="20" y1="6" x2="20" y2="14" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.7" />
        <line x1="20" y1="26" x2="20" y2="34" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.7" />
        <line x1="6" y1="20" x2="14" y2="20" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.7" />
        <line x1="26" y1="20" x2="34" y2="20" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.7" />
      </svg>
    ),
  },
];

export function Services() {
  return (
    <section id="services" className="py-[100px] relative z-[1]">
      <div className="max-w-[1200px] mx-auto px-6 relative z-[1]">
        <div className="text-center mb-16">
          <span className="font-[var(--font-mono)] text-xs text-[#00d4ff] tracking-[0.15em] block mb-4"></span>
          <h2 className="font-[var(--font-display)] font-bold text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-[#e8f0fe] mb-4">
            Technical Services
          </h2>
          <p className="text-[#8892a4] text-lg max-w-[500px] mx-auto">
            End-to-end technical production consultancy from initial spec through
            live delivery.
          </p>
        </div>

        <SpotlightContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.num} service={service} />
          ))}
        </SpotlightContainer>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
}: {
  service: (typeof services)[0];
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <GlowCard
        glowColor="cyan"
        className="h-full group cursor-default"
      >
        <div className="relative z-10 flex flex-col h-full p-6">
          {/* Number badge */}
          <span className="absolute top-0 right-0 font-[var(--font-mono)] text-[0.6rem] text-[#4a5568]/70 tracking-[0.2em] uppercase">
            {service.num}
          </span>

          {/* Icon */}
          <div className="mb-5 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            {service.icon}
          </div>

          {/* Title */}
          <h3 className="font-[var(--font-display)] text-lg font-semibold text-[#e8f0fe] mb-3 group-hover:text-[#00d4ff] transition-colors duration-300">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-[#8892a4] text-sm leading-relaxed mb-5">
            {service.desc}
          </p>

          {/* Items list */}
          <ul className="flex flex-col gap-2 mt-auto">
            {service.items.map((item) => (
              <li
                key={item}
                className="font-[var(--font-mono)] text-xs text-[#4a5568] pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-[#00d4ff] before:opacity-60"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </GlowCard>
    </div>
  );
}
