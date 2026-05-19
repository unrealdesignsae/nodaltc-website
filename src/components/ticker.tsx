export function Ticker() {
  const items = [
    "AUDIO SYSTEMS",
    "LIGHTING DESIGN",
    "VIDEO PRODUCTION",
    "RIGGING & STAGING",
    "POWER DISTRIBUTION",
    "LIVE BROADCAST",
    "VENUE INTEGRATION",
    "FESTIVAL ENGINEERING",
  ];

  return (
    <div className="overflow-hidden bg-[#0a0e17] border-y border-[rgba(0,212,255,0.12)] py-3.5">
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{ animation: "ticker 25s linear infinite" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-8 shrink-0">
            <span className="font-[var(--font-mono)] text-[0.7rem] tracking-[0.2em] text-[#4a5568] uppercase">
              {item}
            </span>
            <span className="font-[var(--font-mono)] text-[0.7rem] text-[#00d4ff] opacity-50"></span>
          </span>
        ))}
      </div>
    </div>
  );
}
