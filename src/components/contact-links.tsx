import { MessageCircle } from 'lucide-react';
import { WHATSAPP } from '@/lib/survey-config';

export function ContactLinks({floating=false}:{floating?:boolean}) {
  if (!WHATSAPP) return <div className={floating?'mobile-whatsapp placeholder':'contact-whatsapp placeholder'}><MessageCircle size={18}/><span>WhatsApp <small>+971 50 000 0000 · placeholder</small></span></div>;
  return <a className={floating?'mobile-whatsapp':'contact-whatsapp'} href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/><span>WhatsApp <small>+{WHATSAPP}</small></span></a>;
}
