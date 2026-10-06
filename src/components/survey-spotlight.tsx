import Link from 'next/link';
import { SurveySymbol, type SurveySymbolKind } from '@/components/survey/survey-symbol';
const services: {kind: SurveySymbolKind; title: string; detail: string}[] = [
  {kind:'survey', title:'Survey', detail:'Understand the site'},
  {kind:'setout', title:'Set out', detail:'Place with precision'},
  {kind:'drone', title:'Track', detail:'See the build progress'},
];
export function SurveySpotlight() {
  return <section id="site-survey" className="home-survey" aria-labelledby="home-survey-title">
    <div className="home-survey-inner"><div className="home-survey-copy">
      <p className="home-survey-label">Nodal Site Survey</p>
      <h2 id="home-survey-title">Every great build.<br/><span>Starts on solid ground.</span></h2>
      <p>From the first site visit to the final stage position. GPS surveys, precise set-out and drone progress mapping bring your plans into the real world.</p>
      <Link href="/site-survey/" className="home-survey-link">Explore Site Survey <span aria-hidden="true">↗</span></Link>
      <small>For festivals, outdoor events and temporary venues.</small>
    </div><div className="home-survey-services" aria-label="Survey, set-out and drone progress mapping">
      {services.map(({kind,title,detail},i)=><div className="home-survey-service" key={kind}><span className="home-survey-number">0{i+1}</span><SurveySymbol kind={kind}/><h3>{title}</h3><p>{detail}</p></div>)}
      <div className="home-survey-baseline"><span/> One site. One coordinated picture.</div>
    </div></div>
  </section>;
}
