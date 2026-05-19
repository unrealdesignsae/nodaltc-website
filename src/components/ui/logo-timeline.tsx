"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

export interface LogoItem {
  /** The label text displayed next to the icon */
  label: string
  /** The icon name from the Icons object (e.g., "gitHub", "react", "tailwind") */
  icon: React.ReactNode
  /** Animation delay in seconds (use negative values for staggered effect) */
  animationDelay: number
  /** Animation duration in seconds */
  animationDuration: number
  /** The row number where this logo should appear (1-based) */
  row: number
}

export interface LogoTimelineProps {
  /** Array of logo items to display */
  items: LogoItem[]
  /** Optional title text to display in the center */
  title?: string
  /** Height of the timeline container */
  height?: string
  /** Additional className for the container */
  className?: string
  /** Icon size in pixels (default: 16) */
  iconSize?: number
  /** Whether to show separator lines between rows (default: true) */
  showRowSeparator?: boolean
  /** Whether to animate logos only on hover (default: false) */
  animateOnHover?: boolean
}

export function LogoTimeline({
  items,
  title,
  height = "h-[400px] sm:h-[800px]",
  className,
  iconSize = 16,
  showRowSeparator = true,
  animateOnHover = false,
}: LogoTimelineProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Group items by row
  const rowsMap = new Map<number, LogoItem[]>()
  items.forEach((item) => {
    if (!rowsMap.has(item.row)) {
      rowsMap.set(item.row, [])
    }
    rowsMap.get(item.row)?.push(item)
  })

  // Convert map to sorted array
  const rows = Array.from(rowsMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([, rowItems]) => rowItems)

  // Determine animation play state
  const animationPlayState = animateOnHover
    ? isHovered
      ? "running"
      : "paused"
    : "running"

  return (
    <section className={cn("w-full", height, className)}>
      {/* ── Keyframes injected once ── */}
      <style>{`
        @keyframes trackGlow {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
        @keyframes chipGlow {
          0%, 100% {
            box-shadow: 0 0 8px rgba(0,212,255,0.10), inset 0 1px 0 rgba(0,212,255,0.06);
            border-color: rgba(0,212,255,0.22);
          }
          50% {
            box-shadow: 0 0 22px rgba(0,212,255,0.40), 0 0 6px rgba(0,212,255,0.25), inset 0 1px 0 rgba(0,212,255,0.12);
            border-color: rgba(0,212,255,0.55);
          }
        }
        @keyframes labelGlow {
          0%, 100% { color: #8892a4; text-shadow: none; }
          50%       { color: #c4eaff; text-shadow: 0 0 8px rgba(0,212,255,0.7); }
        }
        @keyframes iconGlow {
          0%, 100% { filter: drop-shadow(0 0 0px rgba(0,212,255,0)); }
          50%       { filter: drop-shadow(0 0 5px rgba(0,212,255,0.9)); }
        }
      `}</style>

      <motion.div
        aria-hidden="true"
        className="relative h-full w-full overflow-hidden py-24 sm:py-32"
        style={{ background: "#070a0f" }}
        onMouseEnter={() => animateOnHover && setIsHovered(true)}
        onMouseLeave={() => animateOnHover && setIsHovered(false)}
      >
        <div
          className="@container absolute inset-0 grid"
          style={{ gridTemplateRows: `repeat(${rows.length}, 1fr)` }}
        >
          {rows.map((rowItems, index) => (
            <div className="group relative flex items-center overflow-hidden" key={index}>
              {/* Cyan dashed track line — animated glow */}
              <div
                className="absolute inset-x-0 top-1/2 h-px"
                style={{
                  background:
                    "repeating-linear-gradient(to right, rgba(0,212,255,0.35) 0, rgba(0,212,255,0.35) 4px, transparent 4px, transparent 14px)",
                  animation: `trackGlow ${2.5 + index * 0.7}s ease-in-out infinite`,
                }}
              />
              {/* Row divider */}
              {showRowSeparator && (
                <div
                  className="absolute inset-x-0 bottom-0 h-px group-last:hidden"
                  style={{ background: "rgba(0, 212, 255, 0.06)" }}
                />
              )}
              {rowItems.map((logo, li) => (
                <div
                  key={`${logo.row}-${logo.label}`}
                  data-logo-chip
                  className={cn(
                    "absolute top-1/2 flex -translate-y-1/2 items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 whitespace-nowrap"
                  )}
                  style={{
                    background: "#0b1219",
                    border: "1px solid rgba(0, 212, 255, 0.22)",
                    borderRadius: "3px",
                    /* travel: from just off-left to just off-right — overridden to 300vw on mobile via globals.css */
                    ['--move-x-from' as string]: 'calc(-100% - 2rem)',
                    ['--move-x-to' as string]: 'calc(100vw + 2rem)',
                    // @ts-ignore
                    ['--chip-glow-delay']: `${(index * 0.9 + li * 0.4).toFixed(1)}s`,
                    animation: [
                      `move-x ${logo.animationDuration}s linear ${logo.animationDelay}s infinite`,
                      `chipGlow 3s ease-in-out ${(index * 0.9 + li * 0.4).toFixed(1)}s infinite`,
                    ].join(', '),
                  }}
                >
                  <span
                    style={{
                      color: "#00d4ff",
                      display: "flex",
                      alignItems: "center",
                      animation: `iconGlow 3s ease-in-out ${(index * 0.9 + li * 0.4).toFixed(1)}s infinite`,
                    }}
                  >
                    {logo.icon}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono, 'Share Tech Mono', monospace)",
                      fontSize: "0.72rem",
                      letterSpacing: "0.06em",
                      color: "#8892a4",
                      animation: `labelGlow 3s ease-in-out ${(index * 0.9 + li * 0.4).toFixed(1)}s infinite`,
                    }}
                  >
                    {logo.label}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
