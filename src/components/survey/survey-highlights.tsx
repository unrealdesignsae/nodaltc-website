import { Crosshair, Layers, ScanLine } from 'lucide-react';

const highlights = [
  { Icon: Crosshair, value: '2–3 cm', label: 'Precision on the ground', detail: 'Typical positioning accuracy with RTK-GPS*' },
  { Icon: Layers, value: 'CAD-ready', label: 'Fits your workflow', detail: 'Vectorworks, AutoCAD or SketchUp' },
  { Icon: ScanLine, value: 'Daily', label: 'See the site evolve', detail: 'Aerial progress maps with Drone Site Scan' },
];

export function SurveyHighlights() {
  return <section id="survey-highlights" className="survey-highlights quiet-wrap" aria-label="Survey capabilities">
    <ul className="survey-highlights-grid">
      {highlights.map(({ Icon, value, label, detail }) => <li className="survey-highlight" key={value} data-reveal>
        <div className="survey-highlight-icon" aria-hidden="true"><Icon size={34} strokeWidth={1.25}/></div>
        <div className="survey-highlight-copy"><h2>{value}</h2><div className="survey-highlight-details"><span>{label}</span><p>{detail}</p></div></div>
      </li>)}
    </ul>
    <p className="survey-highlights-note">*Subject to site reception and correction signal.</p>
  </section>;
}
