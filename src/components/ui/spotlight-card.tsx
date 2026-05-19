"use client";

import React, { useEffect, useRef, useCallback, ReactNode } from "react";

/* ─── Container ────────────────────────────────────────────────────── */
interface SpotlightContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wrap your card grid with this component.
 * It tracks the pointer globally and updates every child [data-glow]
 * card with --x / --y relative to EACH card's own bounding box.
 * This creates a single, unified spotlight that flows across all cards.
 */
const SpotlightContainer: React.FC<SpotlightContainerProps> = ({
  children,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const cards = container.querySelectorAll<HTMLElement>("[data-glow]");
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          // Position relative to each card's own top-left
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty("--x", `${x}`);
          card.style.setProperty("--y", `${y}`);
          card.style.setProperty(
            "--xp",
            `${x / (rect.width || 1)}`
          );
          card.style.setProperty(
            "--yp",
            `${y / (rect.height || 1)}`
          );
        });
      });
    };

    const handlePointerLeave = () => {
      // Reset glow opacity when pointer leaves the container
      const cards = container.querySelectorAll<HTMLElement>("[data-glow]");
      cards.forEach((card) => {
        card.style.setProperty("--glow-opacity", "0");
      });
    };

    const handlePointerEnter = () => {
      const cards = container.querySelectorAll<HTMLElement>("[data-glow]");
      cards.forEach((card) => {
        card.style.setProperty("--glow-opacity", "1");
      });
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);
    container.addEventListener("pointerenter", handlePointerEnter);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      container.removeEventListener("pointerenter", handlePointerEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

/* ─── Glow Card ────────────────────────────────────────────────────── */
interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "green" | "red" | "orange" | "cyan";
}

const glowColorMap: Record<string, { hue: number; saturation: number }> = {
  blue: { hue: 220, saturation: 100 },
  purple: { hue: 280, saturation: 80 },
  green: { hue: 150, saturation: 80 },
  red: { hue: 0, saturation: 90 },
  orange: { hue: 30, saturation: 90 },
  cyan: { hue: 190, saturation: 100 },
};

/* Inject global styles once */
let styleInjected = false;

const GLOW_CSS = `
  [data-glow] {
    --glow-opacity: 0;
    --border-size: 1px;
    --spotlight-size: 350px;
    position: relative;
  }

  /* ── Border glow (::before) ── */
  [data-glow]::before {
    pointer-events: none;
    content: "";
    position: absolute;
    inset: calc(var(--border-size) * -1);
    border: var(--border-size) solid transparent;
    border-radius: inherit;
    background-image: radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
      hsl(var(--glow-hue, 190) var(--glow-sat, 100%) 50% / 0.7),
      transparent 100%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) padding-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask:
      linear-gradient(#fff 0 0) padding-box, 
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: var(--glow-opacity, 0);
    transition: opacity 0.35s ease;
    z-index: 1;
  }

  /* ── Background spotlight (::after) ── */
  [data-glow]::after {
    pointer-events: none;
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.8) calc(var(--spotlight-size) * 0.8) at
        calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
      hsl(var(--glow-hue, 190) var(--glow-sat, 100%) 70% / 0.06),
      transparent 100%
    );
    opacity: var(--glow-opacity, 0);
    transition: opacity 0.35s ease;
    z-index: 0;
  }
`;

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = "",
  glowColor = "cyan",
}) => {
  const styleRef = useRef(false);

  useEffect(() => {
    if (styleInjected || styleRef.current) return;
    styleRef.current = true;
    styleInjected = true;
    const tag = document.createElement("style");
    tag.textContent = GLOW_CSS;
    document.head.appendChild(tag);
  }, []);

  const { hue, saturation } = glowColorMap[glowColor] ?? glowColorMap.cyan;

  return (
    <div
      data-glow
      style={
        {
          "--glow-hue": hue,
          "--glow-sat": `${saturation}%`,
          backgroundColor: "hsl(0 0% 60% / 0.06)",
          border: "1px solid hsl(0 0% 100% / 0.06)",
        } as React.CSSProperties
      }
      className={`rounded-2xl relative backdrop-blur-[5px] ${className}`}
    >
      {children}
    </div>
  );
};

export { SpotlightContainer, GlowCard };
