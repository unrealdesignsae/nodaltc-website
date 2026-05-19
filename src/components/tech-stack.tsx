"use client";

import { LogoTimeline } from "@/components/ui/logo-timeline";
import type { LogoItem } from "@/components/ui/logo-timeline";
import {
  IconMicrophone,
  IconSpeakerphone,
  IconAdjustmentsHorizontal,
  IconBulb,
  IconBolt,
  IconDeviceDesktop,
  IconVideo,
  IconBroadcast,
  IconCrane,
  IconWifi,
  IconCpu,
  IconStack2,
  IconAffiliate,
  IconRouteSquare,
  IconRadar,
} from "@tabler/icons-react";

// ── Row 1: Audio & RF ───────────────────────────────────────────
// ── Row 2: Lighting & Visual ────────────────────────────────────
// ── Row 3: Rigging, Power & Network ────────────────────────────
const techItems: LogoItem[] = [
  // Row 1 — Audio & RF — 5 chips, 40s, irregular gaps (11, 6, 9, 7, 7s)
  { label: "L-Acoustics",       icon: <IconMicrophone size={16} stroke={1.5} />,            row: 1, animationDelay:   0,  animationDuration: 40 },
  { label: "Allen & Heath",     icon: <IconAdjustmentsHorizontal size={16} stroke={1.5} />, row: 1, animationDelay: -11,  animationDuration: 40 },
  { label: "Shure Axient",      icon: <IconBroadcast size={16} stroke={1.5} />,             row: 1, animationDelay: -17,  animationDuration: 40 },
  { label: "d&b Audiotechnik",  icon: <IconSpeakerphone size={16} stroke={1.5} />,          row: 1, animationDelay: -26,  animationDuration: 40 },
  { label: "DiGiCo",            icon: <IconAffiliate size={16} stroke={1.5} />,             row: 1, animationDelay: -33,  animationDuration: 40 },

  // Row 2 — Lighting & Visual — 5 chips, 45s, irregular gaps (13, 7, 10, 8, 7s)
  { label: "MA Lighting",       icon: <IconBulb size={16} stroke={1.5} />,                  row: 2, animationDelay:   0,  animationDuration: 45 },
  { label: "Blackmagic Design", icon: <IconVideo size={16} stroke={1.5} />,                 row: 2, animationDelay: -13,  animationDuration: 45 },
  { label: "Barco Projection",  icon: <IconStack2 size={16} stroke={1.5} />,                row: 2, animationDelay: -20,  animationDuration: 45 },
  { label: "Chamsys MagicQ",    icon: <IconRadar size={16} stroke={1.5} />,                 row: 2, animationDelay: -30,  animationDuration: 45 },
  { label: "ROE Visual",        icon: <IconDeviceDesktop size={16} stroke={1.5} />,         row: 2, animationDelay: -38,  animationDuration: 45 },

  // Row 3 — Rigging, Power & Network — 5 chips, 38s, irregular gaps (10, 6, 8, 7, 7s)
  { label: "Prolyte Structures", icon: <IconCrane size={16} stroke={1.5} />,                row: 3, animationDelay:   0,  animationDuration: 38 },
  { label: "Power Distribution", icon: <IconBolt size={16} stroke={1.5} />,                 row: 3, animationDelay: -10,  animationDuration: 38 },
  { label: "Dante Networking",   icon: <IconCpu size={16} stroke={1.5} />,                  row: 3, animationDelay: -16,  animationDuration: 38 },
  { label: "Luminex Network",    icon: <IconWifi size={16} stroke={1.5} />,                 row: 3, animationDelay: -24,  animationDuration: 38 },
  { label: "Socapex",            icon: <IconRouteSquare size={16} stroke={1.5} />,          row: 3, animationDelay: -31,  animationDuration: 38 },
];

export function TechStack() {
  return (
    <div className="w-full overflow-hidden border-t border-[rgba(0,212,255,0.12)]">
      <LogoTimeline
        items={techItems}
        title="Built with industry-standard tools"
        height="h-[480px] sm:h-[420px]"
        iconSize={16}
        showRowSeparator={true}
        animateOnHover={false}
      />
    </div>
  );
}
