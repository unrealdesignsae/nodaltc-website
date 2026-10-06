'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

const siteImage = { src: '/survey/festival-grounds-v3.png', width: 1536, height: 1024 };
const particleImage = { src: '/survey/festival-grounds-cyan-particles.png', width: 1536, height: 1024 };

/** Automatic full-frame reveal; the original images remain untouched. */
export function ScanReveal() {
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animation = 0;
    let previous = 0;
    let phase = Math.PI / 2;
    let visible = false;
    const updatePreference = () => {
      if (preference.matches) element.style.setProperty('--scan', '50%');
    };
    updatePreference();
    preference.addEventListener('change', updatePreference);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(element);
    const tick = (time: number) => {
      const delta = previous ? Math.min(time - previous, 50) : 0;
      previous = time;
      if (visible && !document.hidden && !preference.matches) {
        phase += delta * Math.PI / 8000;
        element.style.setProperty('--scan', `${(1 - Math.cos(phase)) * 50}%`);
      }
      animation = requestAnimationFrame(tick);
    };
    animation = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animation);
      observer.disconnect();
      preference.removeEventListener('change', updatePreference);
    };
  }, []);

  return <figure className="scan-figure" data-image-reveal>
    <div className="scan-frame" ref={frame}>
      <Image className="scan-photo" {...siteImage} alt="Expansive festival grounds transitioning between a realistic aerial view and its cyan particle visualization." sizes="(max-width: 760px) 100vw, 50vw"/>
      <div className="scan-particle-plane" aria-hidden="true">
        <Image className="scan-particles" {...particleImage} alt="" sizes="(max-width: 760px) 100vw, 50vw"/>
      </div>
      <div className="scan-rule" aria-hidden="true"/>
    </div>
    <figcaption className="scan-caption"><span>From survey to site</span><span>Concept visualization</span></figcaption>
  </figure>;
}
