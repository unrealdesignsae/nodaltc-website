'use client';

import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function PageMotion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        document.querySelectorAll<HTMLElement>('.reveal-line > span').forEach(element => {
          gsap.from(element, { yPercent: 115, rotate: 3, duration: 1.25, ease: 'expo.out', scrollTrigger: { trigger: element.parentElement, start: 'top 90%', once: true } });
        });
        document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(element => {
          gsap.from(element, { opacity: 0, y: 35, duration: .95, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 92%', once: true }, onComplete() { gsap.set(element, { clearProps: 'opacity,transform' }); } });
        });
        document.querySelectorAll<HTMLElement>('[data-image-reveal]').forEach(element => {
          gsap.from(element, { opacity: 0, y: 65, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: element, start: 'top 90%', once: true } });
        });
      });
      let refreshFrame = 0;
      const refresh = () => { cancelAnimationFrame(refreshFrame); refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh()); };
      const afterTransition = (event: TransitionEvent) => { if (event.propertyName === 'height') refresh(); };
      document.addEventListener('toggle', refresh, true);
      document.addEventListener('transitionend', afterTransition);
      return () => { cancelAnimationFrame(refreshFrame); document.removeEventListener('toggle', refresh, true); document.removeEventListener('transitionend', afterTransition); context.revert(); };
    });
    return () => media.revert();
  }, []);
  return null;
}
