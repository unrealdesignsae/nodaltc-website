"use client";

import React, { useEffect, useRef } from "react";

const HalideLanding: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Only add parallax on pointer (non-touch) devices to avoid janky mobile behaviour
    const hasPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.pageX) / 25;
      const y = (window.innerHeight / 2 - e.pageY) / 25;
      canvas.style.transform = `rotateX(${55 + y / 2}deg) rotateZ(${-25 + x / 2}deg)`;
      layersRef.current.forEach((layer, index) => {
        if (!layer) return;
        const depth = (index + 1) * 15;
        const moveX = x * (index + 1) * 0.2;
        const moveY = y * (index + 1) * 0.2;
        layer.style.transform = `translateZ(${depth}px) translate(${moveX}px, ${moveY}px)`;
      });
    };

    // Entrance Animation
    canvas.style.opacity = "0";
    canvas.style.transform = "rotateX(90deg) rotateZ(0deg) scale(0.8)";

    const timeout = setTimeout(() => {
      canvas.style.transition = "all 2.5s cubic-bezier(0.16, 1, 0.3, 1)";
      canvas.style.opacity = "1";
      canvas.style.transform = "rotateX(55deg) rotateZ(-25deg) scale(1)";
    }, 300);

    if (hasPointer) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <style>{`
        .halide-section {
          background-color: transparent;
          color: #e8f0fe;
          font-family: 'Rajdhani', sans-serif;
          overflow: hidden;
          height: 100vh;
          width: 100%;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .halide-grain {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none;
          z-index: 100;
          opacity: 0.10;
        }

        .halide-viewport {
          perspective: 2000px;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: absolute;
          inset: 0;
        }

        .halide-canvas-3d {
          position: relative;
          width: clamp(300px, 90vw, 800px);
          aspect-ratio: 8 / 5;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          background-color: #070a0f;
        }

        .halide-layer {
          position: absolute;
          inset: 0;
          background: transparent;
          transition: transform 0.5s ease;
        }

        .halide-layer-1 {
          background-image: url('/images/stage-drawing-a.png');
          background-size: cover;
          background-position: center;
          filter: brightness(0.9) contrast(1.1) saturate(1.2);
        }
        .halide-layer-2 {
          background-image: url('/images/stage-drawing-b.png');
          background-size: cover;
          background-position: center;
          filter: brightness(0.4) contrast(1.1) hue-rotate(10deg);
          opacity: 0.35;
          mix-blend-mode: screen;
        }
        .halide-layer-3 {
          background: rgba(0, 212, 255, 0.03);
          opacity: 0.5;
        }

        .halide-contours {
          position: absolute;
          width: 200%;
          height: 200%;
          top: -50%;
          left: -50%;
          background-image: repeating-radial-gradient(
            circle at 50% 50%,
            transparent 0,
            transparent 40px,
            rgba(0, 212, 255, 0.04) 41px,
            transparent 42px
          );
          transform: translateZ(120px);
          pointer-events: none;
        }

        .halide-interface-grid {
          position: absolute;
          inset: 0;
          padding: clamp(1rem, 4vw, 4rem);
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto 1fr auto;
          z-index: 10;
          pointer-events: none;
        }

        .halide-hero-title {
          grid-column: 1 / -1;
          align-self: center;
          font-size: clamp(3rem, 10vw, 10rem);
          line-height: 0.85;
          letter-spacing: -0.04em;
          mix-blend-mode: difference;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
        }

        .halide-scroll-hint {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, rgba(0, 212, 255, 0.6), transparent);
          animation: halide-flow 2s infinite ease-in-out;
        }

        @keyframes halide-flow {
          0%, 100% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
        }
      `}</style>

      <section className="halide-section">


        {/* UI Chrome */}
        <div className="halide-interface-grid">
          <div
            style={{
              fontWeight: 700,
              fontFamily: "var(--font-display, 'Rajdhani', sans-serif)",
              letterSpacing: "0.08em",
              color: "#e8f0fe",
            }}
          >NODAL_TC</div>
          <div
            style={{
              textAlign: "right",
              fontFamily: "'Share Tech Mono', monospace",
              color: "#00d4ff",
              fontSize: "0.65rem",
              letterSpacing: "0.06em",
              opacity: 0.7,
            }}
          >
            <div>LATITUDE: 25.2048° N — DUBAI</div>
            <div>FIELD OPS: LIVE EVENT SYSTEMS</div>
          </div>

          <h2 className="halide-hero-title">
            PRECISION
            <br />
            <span style={{ color: "#00d4ff" }}>ENGINEERING</span>
          </h2>

          <div
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.06em",
                color: "#8892a4",
              }}
            >
              <p>[ NODAL TECHNICAL CONSULTANCY ]</p>
              <p>AUDIO · VIDEO · LIGHTING · SYSTEMS INTEGRATION</p>
            </div>
          </div>
        </div>

        {/* 3D Viewport */}
        <div className="halide-viewport">
          <div className="halide-canvas-3d" ref={canvasRef}>
            <div
              className="halide-layer halide-layer-1"
              ref={(el) => {
                if (el) layersRef.current[0] = el;
              }}
            />
            <div
              className="halide-layer halide-layer-2"
              ref={(el) => {
                if (el) layersRef.current[1] = el;
              }}
            />
            <div
              className="halide-layer halide-layer-3"
              ref={(el) => {
                if (el) layersRef.current[2] = el;
              }}
            />
            <div className="halide-contours" />
          </div>
        </div>

        <div className="halide-scroll-hint" />
      </section>
    </>
  );
};

export default HalideLanding;
