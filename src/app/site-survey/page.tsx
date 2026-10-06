import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/survey-config';
import { ContactLinks } from '@/components/contact-links';
import { DeliverableExamples } from '@/components/survey/deliverable-examples';
import { SurveyHighlights } from '@/components/survey/survey-highlights';
export const metadata:Metadata={title:'GPS Site Survey & Set-Out | Nodal UAE',description:'GPS site survey, set-out and daily drone scans for festivals and outdoor events in the UAE.',alternates:{canonical:`${SITE_URL}/site-survey/`},openGraph:{title:'Nodal Site Survey',url:`${SITE_URL}/site-survey/`}};
import { ArrowUpRight, ArrowUp, Check, Satellite, ScanLine, Layers, MapPinned, PartyPopper, Construction, MapPin, Tent, Flag } from 'lucide-react';
import { UnrealHero } from '@/components/survey/unreal-hero';
import { PageMotion } from '@/components/survey/page-motion';
import { ScanReveal } from '@/components/survey/scan-reveal';
import { Navbar } from '@/components/navbar';
import { NodeCanvas } from '@/components/node-canvas';
import { EnquiryForm } from '@/components/survey/enquiry-form';
import { services, steps, drone, deliverables, audiences, reasons, faqs, dronePhases } from '@/lib/survey-content';

const icons = [Satellite, MapPinned, Layers, ScanLine];
const audienceIcons = [PartyPopper, Construction, MapPin, Tent, Flag];
function Heading({ first, second }: { first: string; second: string }) {
  return <h2 className="quiet-heading"><span className="reveal-line"><span>{first}</span></span><span className="reveal-line"><span>{second}</span></span></h2>;
}

export default function Home() {
  return <div className="quiet-site">
    <NodeCanvas/><Navbar/><PageMotion/>
    <main id="main-content" tabIndex={-1}>
      <UnrealHero/>
      <SurveyHighlights/>
      <section id="overview" className="quiet-wrap quiet-section studio-overview">
        <div className="overview-copy">
          <div><p className="quiet-label" data-reveal>FROM DRAWING TO GROUND</p><Heading first="Know the ground." second="Build with confidence."/></div>
          <div className="lead-copy" data-reveal><p>Large outdoor sites start with a CAD plan. We connect that plan to the real ground: survey the terrain, put it into your production drawing, and mark out every position on site.</p><p>From the first reference point to the final build, your team works from one coordinated plan.</p><span className="quiet-location">Based in the UAE. Saudi Arabia & GCC on request.</span></div>
        </div>
        <ScanReveal/>
      </section>
      <section id="services" className="quiet-wrap quiet-section studio-services">
        <div className="section-lead"><div><p className="quiet-label" data-reveal>THE SERVICES</p><Heading first="Technical precision." second="Production thinking."/></div><p className="quiet-copy" data-reveal>One partner for the details that make a site work. Choose individual services or support throughout your build.</p></div>
        <div className="studio-service-grid">{services.map(([title, copy], index) => { const Icon = icons[index]; return <article className="studio-service-card" key={title} data-reveal><div className="card-top"><Icon size={25} strokeWidth={1.2}/><span>0{index + 1}</span></div><h3>{title}</h3><p>{copy}</p><a href="#contact" className="quiet-link">Discuss your site <ArrowUpRight size={16}/></a></article>; })}</div>
      </section>
      <section id="process" className="quiet-wrap quiet-section studio-process">
        <p className="quiet-label" data-reveal>A CLEAR WAY FORWARD</p><Heading first="Measure. Plan." second="Place. Check."/>
        <div className="studio-process-grid">{steps.map(([title, copy], i) => <article key={title} data-reveal><span className="process-marker">0{i + 1}<i/></span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>
      <section id="drone" className="studio-drone quiet-section">
        <div className="quiet-wrap studio-drone-grid"><figure data-image-reveal><Image src="/survey/drone-site-scan.webp" alt="Concept illustration of aerial mapping across an outdoor event site." width={1536} height={1024} sizes="(max-width:760px) 100vw, 50vw"/><figcaption>Drone Site Scan · Concept illustration</figcaption></figure><div><p className="quiet-label" data-reveal>THE AERIAL PERSPECTIVE / OPTIONAL ADD-ON</p><Heading first="The whole site." second="Every day."/><p className="quiet-copy" data-reveal>{drone}</p><ul className="drone-phases">{dronePhases.map(([phase,copy])=><li key={phase}><strong>{phase}</strong><span>{copy}</span></li>)}</ul><p className="quiet-copy">Every scan: a georeferenced aerial map over your plan, plus a short progress report — what’s done, what’s off-plan, what needs action.</p><p className="drone-note" data-reveal>Flights are scheduled outside public hours and never over audiences. Flown by licensed, insured partner pilots with the required site permits. Plan at least 2–3 weeks ahead.</p><a className="quiet-link" href="#contact">Add a Drone Site Scan <ArrowUpRight size={16}/></a></div></div>
      </section>
      <section id="deliverables" className="quiet-wrap quiet-section studio-deliverables">
        <div><p className="quiet-label" data-reveal>READY FOR YOUR WORKFLOW</p><Heading first="Useful on site." second="Ready for what’s next."/><p className="quiet-copy" data-reveal>Clear files, checked positions and a record you can use again. Delivered in the formats your team already works with.</p></div>
        <ul>{deliverables.map((item, i) => <li key={item} data-reveal><span>0{i + 1}</span><p>{item}</p><Check size={17}/></li>)}</ul><DeliverableExamples/>
      </section>
      <section className="quiet-wrap quiet-section studio-reasons">
        <div className="section-lead"><div><p className="quiet-label" data-reveal>BUILT AROUND YOUR PRODUCTION</p><Heading first="We know the plan." second="And the pressure."/></div><p className="quiet-copy" data-reveal>From festival grounds to temporary structures, we understand what your site team needs to keep moving.</p></div>
        <div className="studio-reason-grid">{reasons.map((reason,i) => <p key={reason} data-reveal><span>0{i + 1}</span>{reason}</p>)}</div>
        <section id="who-we-work-with" className="survey-audiences" aria-labelledby="audience-heading">
          <div className="survey-audiences-intro">
            <p className="quiet-label" data-reveal>YOUR TEAM. OUR FIELD EXPERTISE.</p>
            <h3 id="audience-heading" className="quiet-heading"><span className="reveal-line"><span>Who we</span></span><span className="reveal-line"><span>work with.</span></span></h3>
            <p className="quiet-copy" data-reveal>From the first site plan to the final build, we work alongside the people making it happen.</p>
          </div>
          <ul className="survey-audience-list">{audiences.map((audience, i) => {
            const Icon = audienceIcons[i];
            return <li key={audience} data-reveal><span className="survey-audience-icon" aria-hidden="true"><Icon size={32} strokeWidth={1.3}/></span><span>{audience}</span></li>;
          })}</ul>
        </section>
      </section>
      <section id="faq" className="quiet-wrap quiet-section quiet-questions">
        <p className="quiet-label" data-reveal>A FEW USEFUL ANSWERS</p><h2 className="quiet-heading" data-reveal>Before we get on site.</h2>
        <div className="quiet-faq-list">{faqs.map(([q,a]) => <details className="quiet-faq" name="survey-questions" key={q} data-reveal><summary>{q}<span className="quiet-plus" aria-hidden="true"/></summary><p>{a}</p></details>)}</div>
      </section>
      <section id="contact" className="quiet-contact quiet-section">
        <div className="quiet-wrap studio-contact-grid"><div className="contact-intro"><p className="quiet-label" data-reveal>LET’S GET STARTED</p><Heading first="Your next site." second="Precisely planned."/><p className="quiet-copy" data-reveal>Tell us what you’re building, where, and when. Share your drawing and the support you need.</p><a className="quiet-email" href="mailto:info@nodaltc.com">info@nodaltc.com <ArrowUpRight size={16}/></a><p className="quiet-location">Dubai, UAE · Saudi Arabia & GCC on request</p><ContactLinks/></div><div className="quiet-form-panel" id="enquiry"><EnquiryForm/></div></div>
      </section>
    </main>
    <footer className="quiet-wrap quiet-footer"><Link href="/" className="quiet-footer-name">NODAL</Link><div><p>© 2026 Nodal Technical Consultancy FZ-LLC · Dubai, UAE</p><div className="footer-links"><Link href="/">Main website</Link><Link href="/#services">Technical services</Link><a href="mailto:info@nodaltc.com">info@nodaltc.com</a><Link href="/privacy/">Privacy</Link></div></div><a href="#hero" className="quiet-back">Back to top <ArrowUp size={15}/></a></footer><ContactLinks floating/>
  </div>;
}
