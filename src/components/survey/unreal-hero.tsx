"use client";
import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import * as THREE from 'three';
// Adapted from the hero on the owner's unreal.ae website.
export function UnrealHero(){
const canvasRef=useRef<HTMLCanvasElement>(null);
const heroRef=useRef<HTMLElement>(null);
useEffect(()=>{
 const canvas=canvasRef.current;
 if(!canvas)return;
 let renderer:THREE.WebGLRenderer;
 try {renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});} catch {return;}
 renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 2.2, 7.5);
  camera.lookAt(0, 0, 0);

  const COLS = window.innerWidth < 768 ? 100 : 180;
  const ROWS = window.innerWidth < 768 ? 50 : 90;
  const W = 26;
  const H = 13;
  const count = COLS * ROWS;
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);

  let i = 0;
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      positions[i * 3 + 0] = (x / (COLS - 1) - 0.5) * W;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = (y / (ROWS - 1) - 0.5) * H;
      seeds[i] = Math.random();
      i++;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uScroll: { value: 0 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.5) },
    // brand hues: deep ink, violet, magenta-pink, cyan, electric purple
    uColInk: { value: new THREE.Color("#16161f") },
    uColA: { value: new THREE.Color("#a855f7") },
    uColB: { value: new THREE.Color("#f472b6") },
    uColC: { value: new THREE.Color("#06b6d4") },
    uColD: { value: new THREE.Color("#7c3aed") },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uScroll;
      uniform float uPixelRatio;
      attribute float aSeed;
      varying float vElev;
      varying float vSeed;
      varying vec2 vUvPos;

      void main() {
        vec3 p = position;

        float t = uTime * 0.55;
        float e = 0.0;
        e += sin(p.x * 0.55 + t) * 0.55;
        e += sin(p.z * 0.85 + t * 1.4) * 0.35;
        e += sin((p.x + p.z) * 0.35 + t * 0.8) * 0.45;

        float mDist = distance(p.xz * vec2(1.0, 2.0), uMouse * vec2(13.0, 6.5));
        e += smoothstep(5.0, 0.0, mDist) * 1.2;

        e *= (1.0 - uScroll * 0.85);

        p.y = e;
        vElev = e;
        vSeed = aSeed;
        vUvPos = vec2(position.x / 26.0 + 0.5, position.z / 13.0 + 0.5);

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (2.0 + aSeed * 2.0) * uPixelRatio * (6.0 / -mv.z);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColInk;
      uniform vec3 uColA;
      uniform vec3 uColB;
      uniform vec3 uColC;
      uniform vec3 uColD;
      varying float vElev;
      varying float vSeed;
      varying vec2 vUvPos;

      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;

        // violet storm on the left, cyan current on the right; ink in the calm
        vec3 warm = mix(uColA, uColB, vUvPos.y);
        vec3 cool = mix(uColC, uColD, vUvPos.y);
        vec3 hue = mix(warm, cool, smoothstep(0.25, 0.75, vUvPos.x));

        float energy = smoothstep(0.15, 1.3, abs(vElev));
        vec3 col = mix(uColInk, hue, 0.38 + energy * 0.62);

        float alpha = (0.60 + energy * 0.40) * (0.8 + vSeed * 0.2);
        gl_FragColor = vec4(col, alpha);
      }
    `,
  });

  const points = new THREE.Points(geometry, material);
  points.rotation.x = -0.12;
  scene.add(points);


 const hero=canvas.parentElement!;
 const media=window.matchMedia('(prefers-reduced-motion: reduce)');
 const mouse={x:0,y:0,tx:0,ty:0};
 let visible=true;
 let needsRender = true;
 const resize=()=>{needsRender=true;const w=hero.clientWidth,h=hero.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();};
 resize();const ro=new ResizeObserver(resize);ro.observe(hero);
 const pointer=(e:PointerEvent)=>{if(media.matches)return;const r=hero.getBoundingClientRect();mouse.tx=((e.clientX-r.left)/r.width)*2-1;mouse.ty=-((e.clientY-r.top)/r.height)*2+1;};
 hero.addEventListener('pointermove',pointer);
 const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting;});io.observe(hero);
 const preference=()=>{needsRender=true;};
 media.addEventListener("change",preference);
 const startTime=performance.now();
 renderer.setAnimationLoop(()=>{
 if(!visible||document.hidden || (media.matches && !needsRender))return;
 needsRender=false;
 uniforms.uTime.value=media.matches?0:(performance.now()-startTime)/1000;
 uniforms.uScroll.value=Math.max(0,Math.min(1,-hero.getBoundingClientRect().top/hero.clientHeight));
 mouse.x+=(mouse.tx-mouse.x)*.05;mouse.y+=(mouse.ty-mouse.y)*.05;
 uniforms.uMouse.value.set(media.matches?0:mouse.x,media.matches?0:mouse.y);
 camera.position.x=media.matches?0:mouse.x*.5;camera.position.y=2.2+(media.matches?0:mouse.y*.25);camera.lookAt(0,0,0);renderer.render(scene,camera);
 });
 return ()=>{renderer.setAnimationLoop(null);media.removeEventListener("change",preference);ro.disconnect();io.disconnect();hero.removeEventListener('pointermove',pointer);geometry.dispose();material.dispose();renderer.dispose();};
},[]);
return <section ref={heroRef} className="unreal-hero" id="hero">
 <canvas ref={canvasRef} className="unreal-canvas" aria-hidden="true"/>
 <div className="unreal-glow" aria-hidden="true"/>
 <div className="unreal-content">
  <h1 className="unreal-title" aria-label="Nodal Survey">
   <span className="unreal-line" aria-hidden="true"><span className="unreal-inner">NODAL<i className="unreal-square violet"/></span></span>
   <span className="unreal-line indent" aria-hidden="true"><span className="unreal-inner"><i className="unreal-square cyan"/>SURVEY</span></span>
  </h1>
  <div className="unreal-bottom">
   <div className="unreal-summary">
    <div className="unreal-description"><p className="unreal-tagline">Your event, precisely placed.</p><p className="unreal-service-line">GPS site survey, set-out and daily drone scans for festivals and outdoor events in the UAE.</p></div>
    <div className="unreal-ctas">
     <a className="unreal-pill" href="#contact">Plan your site <ArrowUpRight size={18}/></a>
    </div>
   </div>
  </div>
 </div>
</section>;
}
