'use client';
import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP, PHONE_DISPLAY } from '@/lib/survey-config';

export function ContactLinks({floating=false}:{floating?:boolean}) {
  const [covered,setCovered]=useState(floating);
  useEffect(()=>{
    if(!floating)return;
    const sections=document.querySelectorAll('#hero, #contact, footer');
    const visible=new Set<Element>();
    const observer=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting)visible.add(entry.target);
        else visible.delete(entry.target);
      });
      setCovered(visible.size>0);
    });
    sections.forEach(section=>observer.observe(section));
    return ()=>observer.disconnect();
  },[floating]);
  if (!WHATSAPP || (floating && covered)) return null;
  return <a className={floating?'mobile-whatsapp':'contact-whatsapp'} href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${PHONE_DISPLAY}`}><MessageCircle size={18}/><span>WhatsApp <small>{PHONE_DISPLAY}</small></span></a>;
}
