"use client";

import { FC, useRef, useEffect } from "react";

// Types
interface iCardItem {
  title: string;
  description: string;
  tag: string;
  src: string;
  link: string;
  color: string;
  textColor: string;
  specs?: string[];
}

interface iCardProps extends Omit<iCardItem, "link"> {
  i: number;
  total: number;
}

// Components
const Card: FC<iCardProps> = ({
  title,
  description,
  tag,
  color,
  textColor,
  src,
  specs,
  i,
  total,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
    el.style.transition = "opacity 0.7s ease, transform 0.7s ease";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="h-[85vh] flex items-center justify-center sticky top-[10vh] px-4 md:px-0"
      style={{ zIndex: i + 1 }}
    >
      <div
        ref={cardRef}
        className="relative flex flex-col w-full max-w-[1100px] h-[65vh] md:h-[60vh] overflow-hidden rounded-[6px] border border-[rgba(0,212,255,0.12)] shadow-[0_8px_48px_rgba(0,0,0,0.6)]"
        style={{
          backgroundColor: color,
          // Each successive card has a slight downward offset for the stacking effect
          top: `calc(${i * 24}px)`,
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        </div>

        {/* Content overlay — pinned to bottom */}
        <div className="relative z-10 mt-auto p-8 md:p-12">
          {/* Tag */}
          <span
            className="font-[var(--font-mono)] text-[0.65rem] tracking-[0.2em] uppercase block mb-3"
            style={{ color: "#00d4ff" }}
          >
            {tag}
          </span>

          {/* Title */}
          <h3
            className="font-[var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight mb-3"
            style={{ color: textColor, lineHeight: 1.1 }}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className="text-base md:text-lg max-w-[600px] mb-5 leading-relaxed"
            style={{ color: "rgba(232, 240, 254, 0.75)" }}
          >
            {description}
          </p>

          {/* Specs */}
          {specs && specs.length > 0 && (
            <div className="flex gap-3 flex-wrap">
              {specs.map((spec) => (
                <span
                  key={spec}
                  className="font-[var(--font-mono)] text-[0.65rem] text-[#8892a4] tracking-widest px-3 py-1.5 border border-[rgba(255,255,255,0.15)] rounded-sm backdrop-blur-sm bg-[rgba(0,0,0,0.3)]"
                >
                  {spec}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Card index indicator */}
        <div className="absolute top-6 right-8 z-10">
          <span className="font-[var(--font-mono)] text-[0.7rem] text-[rgba(255,255,255,0.3)] tracking-[0.2em]">
            {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * CardsParallax — stacked scroll-card layout.
 * Each card sticks and stacks as the user scrolls,
 * creating a cinematic project showcase.
 */
interface iCardSlideProps {
  items: iCardItem[];
}

const CardsParallax: FC<iCardSlideProps> = ({ items }) => {
  return (
    <div className="relative">
      {items.map((project, i) => (
        <Card key={`p_${i}`} {...project} i={i} total={items.length} />
      ))}
    </div>
  );
};

export { CardsParallax, type iCardItem };
