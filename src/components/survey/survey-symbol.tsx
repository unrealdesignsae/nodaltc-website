export type SurveySymbolKind = 'survey' | 'setout' | 'drone';

export function SurveySymbol({ kind }: { kind: SurveySymbolKind }) {
  return <svg className={`survey-symbol survey-symbol--${kind}`} viewBox="0 0 160 160" fill="none" aria-hidden="true">
    <circle className="symbol-orbit" cx="80" cy="80" r="68" stroke="currentColor" strokeDasharray="2 10" />
    <circle className="symbol-ring" cx="80" cy="80" r="53" stroke="currentColor" />
    <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {kind === 'survey' && <>
        <path d="M37 57 65 47 95 57 123 47V107L95 117 65 107 37 117Z M65 47V107 M95 86V117" />
        <path className="symbol-contour" d="M38 82Q58 65 78 82T122 80 M38 98Q58 81 78 98T122 96" />
        <g className="symbol-pin"><path d="M96 83S82 69 82 61A14 14 0 0 1 110 61C110 69 96 83 96 83Z" fill="#08151d" /><circle cx="96" cy="60" r="4" /></g>
      </>}
      {kind === 'setout' && <>
        <path className="symbol-contour" d="M45 45H115V115H45Z M45 80H115 M80 45V115" />
        <path d="M39 55V39H55 M105 39H121V55 M121 105V121H105 M55 121H39V105" />
        <g className="symbol-target"><circle cx="80" cy="80" r="20"/><path d="M80 49V66 M80 94V111 M49 80H66 M94 80H111"/><circle cx="80" cy="80" r="3" fill="currentColor"/></g>
      </>}
      {kind === 'drone' && <>
        <path d="M69 69 51 51 M91 69 109 51 M69 91 51 109 M91 91 109 109" strokeWidth="3"/>
        <rect x="66" y="64" width="28" height="32" rx="9" fill="#08151d"/><path d="M74 78 80 72 86 78 M74 87H86"/>
        {[[49,49],[111,49],[49,111],[111,111]].map(([x,y])=><g key={`${x}-${y}`}><circle cx={x} cy={y} r="17" className="symbol-contour"/><g className="symbol-rotor" style={{transformOrigin:`${x}px ${y}px`}}><path d={`M${x-12} ${y}H${x+12} M${x} ${y-12}V${y+12}`}/></g><circle cx={x} cy={y} r="2" fill="currentColor"/></g>)}
      </>}
    </g>
  </svg>;
}
