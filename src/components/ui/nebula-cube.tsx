'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe } from './globe';

gsap.registerPlugin(ScrollTrigger);

type Step = {
  num: string;
  title: string;
  desc: string;
  blueTitle?: string;
  center?: boolean;
};

const steps: Step[] = [
  {
    num: '01',
    title: 'Technical\nBrief Intake',
    desc: 'We analyze your event brief, rider requirements, and venue specs to build a complete technical picture before any decisions are made.',
  },
  {
    num: '02',
    title: 'Systems\nArchitecture',
    desc: 'We design every technical system — audio, video, lighting, power, rigging — as an integrated architecture with full CAD documentation.',
  },
  {
    num: '03',
    title: 'Vendor\nSpecification',
    desc: 'Precise equipment lists, technical riders, and vendor briefs that eliminate ambiguity and ensure you get exactly what you specified.',
  },
  {
    num: '04',
    title: 'Live Technical\nDirection',
    desc: 'On-site technical direction coordinating all departments, managing build timelines, and maintaining production standards through show day.',
  },
];

export function NebulaCube() {
  const mountRef    = useRef<HTMLDivElement>(null);
  const globeWrapRef = useRef<HTMLDivElement>(null);
  // Plexus 2D overlay
  const plexusCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const plexusNodesRef  = useRef<Array<{
    x:number; y:number; vx:number; vy:number;
    r:number; isHub:boolean; pulse:number; pulseSpeed:number;
  }>>([]);
  const plexusRafRef = useRef<number>(0);

  useEffect(() => {
    const mountEl = mountRef.current;
    if (!mountEl) return;

    // ── Globe wrapper — fixed overlay ──
    const globeEl = globeWrapRef.current;
    if (globeEl) {
      Object.assign(globeEl.style, {
        position:   'fixed',
        top:        '0',
        left:       '0',
        width:      '100%',
        height:     '100%',
        zIndex:     '10',
        pointerEvents: 'none',
        opacity:    '0',
        transition: 'opacity 0.6s ease',
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'center',
      });
    }

    // ── Plexus 2D canvas overlay ──
    const PLEXUS_COUNT    = 90;
    const PLEXUS_MAX_DIST = 180;
    const PLEXUS_MAX_DIST_SQ = PLEXUS_MAX_DIST * PLEXUS_MAX_DIST;
    const HUB_CHANCE = 0.12;

    const plexusCanvas = document.createElement('canvas');
    plexusCanvas.width  = window.innerWidth;
    plexusCanvas.height = window.innerHeight;
    Object.assign(plexusCanvas.style, {
      position: 'fixed', top: '0', left: '0',
      width: '100%', height: '100%',
      zIndex: '9', pointerEvents: 'none',
      opacity: '0', transition: 'opacity 0.6s ease',
    });
    mountEl.appendChild(plexusCanvas);
    plexusCanvasRef.current = plexusCanvas;

    function spawnPlexusNodes() {
      plexusNodesRef.current = [];
      for (let i = 0; i < PLEXUS_COUNT; i++) {
        const isHub = Math.random() < HUB_CHANCE;
        plexusNodesRef.current.push({
          x: Math.random() * plexusCanvas.width,
          y: Math.random() * plexusCanvas.height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          r: isHub ? Math.random() * 3 + 4 : Math.random() * 1.5 + 1,
          isHub,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.02,
        });
      }
    }
    spawnPlexusNodes();

    function drawPlexus() {
      const ctx2 = plexusCanvas.getContext('2d');
      if (!ctx2) return;
      ctx2.clearRect(0, 0, plexusCanvas.width, plexusCanvas.height);
      const nodes = plexusNodesRef.current;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dSq = dx*dx + dy*dy;
          if (dSq >= PLEXUS_MAX_DIST_SQ) continue;
          const t     = 1 - Math.sqrt(dSq) / PLEXUS_MAX_DIST;
          const boost = (nodes[i].isHub && nodes[j].isHub) ? 1.5 : 1;
          const alpha = Math.min(t * t * 0.75 * boost, 1);
          ctx2.beginPath();
          ctx2.strokeStyle = `rgba(80,180,255,${alpha})`;
          ctx2.lineWidth   = t * 1.5 * boost;
          ctx2.moveTo(nodes[i].x, nodes[i].y);
          ctx2.lineTo(nodes[j].x, nodes[j].y);
          ctx2.stroke();
        }
      }

      nodes.forEach((n) => {
        n.pulse += n.pulseSpeed;
        const pf  = 1 + Math.sin(n.pulse) * 0.3;
        const R   = n.r * pf;
        const glowR = R * (n.isHub ? 8 : 5);
        const grd = ctx2.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
        grd.addColorStop(0, n.isHub ? 'rgba(120,210,255,0.6)' : 'rgba(80,180,255,0.35)');
        grd.addColorStop(0.4, n.isHub ? 'rgba(60,160,240,0.2)' : 'rgba(40,140,220,0.1)');
        grd.addColorStop(1, 'rgba(0,100,200,0)');
        ctx2.beginPath(); ctx2.arc(n.x, n.y, glowR, 0, Math.PI*2);
        ctx2.fillStyle = grd; ctx2.fill();
        if (n.isHub) {
          ctx2.beginPath(); ctx2.arc(n.x, n.y, R+2, 0, Math.PI*2);
          ctx2.strokeStyle = 'rgba(160,220,255,0.5)'; ctx2.lineWidth = 0.8; ctx2.stroke();
        }
        ctx2.beginPath(); ctx2.arc(n.x, n.y, R, 0, Math.PI*2);
        ctx2.fillStyle = n.isHub ? 'rgba(200,240,255,0.95)' : 'rgba(130,200,255,0.85)';
        ctx2.fill();
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > plexusCanvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > plexusCanvas.height)  n.vy *= -1;
      });
      plexusRafRef.current = requestAnimationFrame(drawPlexus);
    }
    drawPlexus();

    const onResizePlexus = () => {
      plexusCanvas.width  = window.innerWidth;
      plexusCanvas.height = window.innerHeight;
      spawnPlexusNodes();
    };
    window.addEventListener('resize', onResizePlexus);

    // ── Scroll trigger ──
    const sectionWrapper = mountEl.closest('[data-nebula-wrapper]') as HTMLElement | null;
    const triggerEl      = sectionWrapper ?? mountEl;

    // ── Canvas visibility ──
    const servicesEl  = document.querySelector('#services')        as HTMLElement | null;
    const techIntroEl = document.querySelector('#tech-stack-intro') as HTMLElement | null;

    function updateVisibility() {
      const vh           = window.innerHeight;
      // Default to false (hidden) when elements aren't found — avoids flash on initial load
      const servicesGone  = servicesEl  ? servicesEl.getBoundingClientRect().bottom  <= 0 : false;
      const techIntroAway = techIntroEl ? techIntroEl.getBoundingClientRect().top    >= vh : false;
      const visible = servicesGone && techIntroAway;
      const op = visible ? '1' : '0';
      if (globeEl) {
        globeEl.style.opacity    = op;
        globeEl.style.visibility = visible ? 'visible' : 'hidden';
        globeEl.style.pointerEvents = visible ? 'auto' : 'none';
      }
      plexusCanvas.style.opacity    = op;
      plexusCanvas.style.visibility = visible ? 'visible' : 'hidden';
    }

    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility();

    // ── Text section animations ──
    const sectionEls = triggerEl.querySelectorAll('[data-step-section]');
    sectionEls.forEach((sec) => {
      const title = sec.querySelector('[data-step-title]');
      const desc  = sec.querySelector('[data-step-desc]');
      const num   = sec.querySelector('[data-step-num]');
      gsap.set([title, desc, num], { opacity: 0, y: 40 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: 'top 75%', end: 'top 25%',
          scrub: 1,
          toggleActions: 'play none none reverse',
        },
      });
      tl.to(num,   { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0)
        .to(title, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.1)
        .to(desc,  { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.25);
    });

    return () => {
      cancelAnimationFrame(plexusRafRef.current);
      window.removeEventListener('resize', onResizePlexus);
      window.removeEventListener('scroll', updateVisibility);
      ScrollTrigger.getAll().forEach(t => t.kill());
      if (mountEl.contains(plexusCanvas)) mountEl.removeChild(plexusCanvas);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={mountRef}
      data-nebula-wrapper
      style={{ position: 'relative', width: '100%' }}
    >
      {/* ── Fixed Globe overlay ── */}
      <div ref={globeWrapRef} style={{ opacity: 0 }}>
        <div style={{ width: 'min(90vw, 90vh)', height: 'min(90vw, 90vh)' }}>
          <Globe
            dotColor="rgba(100, 180, 255, ALPHA)"
            arcColor="rgba(100, 180, 255, 0.5)"
            markerColor="rgba(100, 220, 255, 1)"
            autoRotateSpeed={0.002}
          />
        </div>
      </div>


      {/* ── Scrollable content ── */}
      <div style={{ position: 'relative', zIndex: 20 }}>

        {/* Intro section */}
        <div
          data-step-section
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 clamp(1.5rem, 8vw, 10rem)',
          }}
        >
          <div
            data-step-num
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: '#00d4ff',
              letterSpacing: '0.15em',
              marginBottom: '1.25rem',
              opacity: 0,
            }}
          >
            METHODOLOGY
          </div>
          <h2
            data-step-title
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              lineHeight: 1.0,
              color: '#e8f0fe',
              marginBottom: '1.5rem',
              opacity: 0,
            }}
          >
            How We Work
          </h2>
          <p
            data-step-desc
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.1rem',
              lineHeight: 1.7,
              color: '#8892a4',
              maxWidth: 520,
              opacity: 0,
            }}
          >
            A systematic, engineering-first approach to every technical production challenge.
          </p>
        </div>

        {/* Step sections */}
        {steps.map((step, i) => {
          const isCenter = 'center' in step && step.center === true;
          const isRight  = !isCenter && i % 2 === 1;
          return (
            <div
              key={step.num}
              data-step-section
              style={{
                height: isCenter ? '70vh' : '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isCenter ? 'center' : isRight ? 'flex-end' : 'flex-start',
                padding: '0 clamp(1.5rem, 8vw, 10rem)',
              }}
            >
              <div style={{ maxWidth: isCenter ? 900 : 560, textAlign: isCenter ? 'center' : isRight ? 'right' : 'left' }}>
                <div
                  data-step-num
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: '#00d4ff',
                    letterSpacing: '0.15em',
                    marginBottom: '1rem',
                    opacity: 0,
                  }}
                >
                  {step.num}
                </div>
                <h2
                  data-step-title
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                    lineHeight: 1.05,
                    color: '#e8f0fe',
                    whiteSpace: isCenter ? 'nowrap' : 'pre-line',
                    marginBottom: '1.5rem',
                    opacity: 0,
                  }}
                >
                  {step.title}
                  {'blueTitle' in step && step.blueTitle ? (
                    <span style={{ color: '#00d4ff' }}>{step.blueTitle}</span>
                  ) : null}
                </h2>
                <p
                  data-step-desc
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.05rem',
                    lineHeight: 1.7,
                    color: '#8892a4',
                    maxWidth: 480,
                    marginLeft:  isCenter ? 'auto' : isRight ? 'auto' : undefined,
                    marginRight: isCenter ? 'auto' : undefined,
                    opacity: 0,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
