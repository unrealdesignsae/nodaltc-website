'use client';
import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP, PHONE_DISPLAY } from '@/lib/survey-config';

export function ContactLinks({floating=false}:{floating?:boolean}) {
  const [covered,setCovered]=useState(false);
  useEffect(()=>{
    if(!floating)return;
    const contact=document.querySelector('#contact');
    if(!contact)return;
    const observer=new IntersectionObserver(([entry])=>setCovered(entry.isIntersecting));
    observer.observe(contact);
    return ()=>observer.disconnect();
  },[floating]);
  if (!WHATSAPP || (floating && covered)) return null;
  return <a className={floating?'mobile-whatsapp':'contact-whatsapp'} href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${PHONE_DISPLAY}`}><MessageCircle size={18}/><span>WhatsApp <small>{PHONE_DISPLAY}</small></span></a>;
}
