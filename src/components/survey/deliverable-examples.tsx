import { SurveySymbol, type SurveySymbolKind } from './survey-symbol';
const examples: {kind: SurveySymbolKind; title: string; copy: string; label: string}[] = [
  {kind:'survey', label:'01 / The foundation', title:'Site survey base plan', copy:'Levels, boundaries and existing features in one coordinated drawing.'},
  {kind:'setout', label:'02 / The placement', title:'Set-out plan', copy:'Stage, tower and FOH positions referenced to the site grid.'},
  {kind:'drone', label:'03 / The progress', title:'Drone progress report', copy:'A daily plan overlay, completed work and items needing action.'},
];
export function DeliverableExamples() {
  return <div className="deliverable-symbols">{examples.map(({kind,title,copy,label})=><figure key={kind} data-reveal><div className="deliverable-symbol-art"><SurveySymbol kind={kind}/></div><figcaption><span>{label}</span><h3>{title}</h3><p>{copy}</p></figcaption></figure>)}</div>;
}
