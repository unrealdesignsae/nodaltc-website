import { Phone, Mail, MapPin } from 'lucide-react';
import { WHATSAPP, PHONE_DISPLAY } from '@/lib/survey-config';

export function ContactIntro({ survey = false }: { survey?: boolean }) {
  return <div className="shared-contact-intro">
    <h2 className="font-[var(--font-display)] font-bold leading-[1.05] text-[#e8f0fe] mb-8" style={{fontSize:'clamp(2.4rem,4.5vw,3.8rem)'}}>
      {survey ? 'Your next site.' : 'Start a'}{' '}
      <span className="text-[#00d4ff]">{survey ? 'Precisely planned.' : 'conversation.'}</span>
    </h2>
    <p className="text-[#94a6bc] text-base leading-relaxed max-w-[360px] mb-12">
      {survey ? 'Tell us what you’re building, where, and when. Share your drawing and the support you need.' : 'We respond to every brief within 24 hours. Project enquiries, technical questions, or an event you want to talk through — all welcome.'}
    </p>
    <div className="flex flex-col gap-5 text-[#94a6bc] text-sm">
      <a href={WHATSAPP ? `tel:+${WHATSAPP}` : '#contact'} className="flex items-center gap-3 min-h-11 hover:text-[#e8f0fe] transition-colors"><Phone size={17} className="shrink-0 text-[#00d4ff]"/>{WHATSAPP ? PHONE_DISPLAY : '+971 50 000 0000 · placeholder'}</a>
      <a href="mailto:info@nodaltc.com" className="flex items-center gap-3 min-h-11 hover:text-[#e8f0fe] transition-colors"><Mail size={17} className="shrink-0 text-[#00d4ff]"/>info@nodaltc.com</a>
      <p className="flex items-start gap-3"><MapPin size={17} className="shrink-0 mt-0.5 text-[#00d4ff]"/>{survey ? 'Dubai, UAE · Saudi Arabia & GCC on request' : 'Dubai, UAE — global delivery'}</p>
    </div>
    <div className="mt-12 flex items-center gap-2.5">
      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-[signal-pulse_2s_ease-in-out_infinite]"/>
      <span className="font-[var(--font-mono)] text-[0.68rem] tracking-[0.12em] text-[#00ff88] uppercase">Accepting briefs for 2026 — 2027</span>
    </div>
  </div>;
}
