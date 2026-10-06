"use client";

import { useEffect, useRef, MutableRefObject } from "react";

interface VideoScrubberProps {
  seekFnRef: MutableRefObject<((pct: number) => void) | null>;
  src: string;
}

// One cached frame every 1% → 101 frames total
const PCT_STEP = 1;
const SLOTS = Math.floor(100 / PCT_STEP) + 1; // 101

export default function VideoScrubber({ seekFnRef, src }: VideoScrubberProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Hidden video container — must be in the DOM for iOS Safari to decode frames
  const hiddenContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const hiddenContainer = hiddenContainerRef.current!;
    const ctx = canvas.getContext("2d", { alpha: false })!;

    // Detect ImageBitmap support (missing on iOS Safari < 15, some Android browsers)
    const hasImageBitmap =
      typeof createImageBitmap === "function" &&
      // iOS Safari reports the function but it fails on video elements; sniff via UA
      !/iPhone|iPad|iPod/i.test(navigator.userAgent);

    // PRIMARY video — responds to knob in real-time
    const primary = document.createElement("video");
    // SECONDARY video — background frame extraction, never shown
    const secondary = document.createElement("video");

    for (const v of [primary, secondary]) {
      v.src = src;
      v.preload = "auto";
      v.muted = true;
      v.playsInline = true;
      // Must be in DOM for iOS Safari to allow seeking without user gesture
      v.style.cssText =
        "position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;";
      hiddenContainer.appendChild(v);
    }

    // GPU-resident frame cache  (slot = Math.round(pct / PCT_STEP))
    // On iOS we store null and always drawImage directly
    const cache: (ImageBitmap | null)[] = new Array(SLOTS).fill(null);
    let disposed = false;
    let prefetchTimer: ReturnType<typeof setTimeout>;
    let finishPendingSeek: (() => void) | null = null;
    let duration = 0;
    let targetPct = 0;
    let prefetchRunning = false;

    const slotToPct = (s: number) => s * PCT_STEP;
    const pctToSlot = (p: number) => Math.round(p / PCT_STEP);

    // Draw a video/bitmap to the visible canvas
    function drawVideo(v: HTMLVideoElement) {
      const w = v.videoWidth || 1920;
      const h = v.videoHeight || 1080;
      if (canvas.width !== w) { canvas.width = w; canvas.height = h; }
      ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
    }
    function draw(bm: ImageBitmap) {
      if (canvas.width !== bm.width || canvas.height !== bm.height) {
        canvas.width = bm.width;
        canvas.height = bm.height;
      }
      ctx.drawImage(bm, 0, 0);
    }

    // Show the closest cached frame — instant, no seeking
    function drawNearest(pct: number) {
      let best: ImageBitmap | null = null;
      let bestDist = Infinity;
      for (let i = 0; i < SLOTS; i++) {
        if (!cache[i]) continue;
        const d = Math.abs(slotToPct(i) - pct);
        if (d < bestDist) { bestDist = d; best = cache[i]; }
      }
      if (best) draw(best);
    }

    // Capture the current frame from a video element into a cache slot
    async function capture(video: HTMLVideoElement, slot: number) {
      if (disposed || cache[slot] || !hasImageBitmap) return;
      try {
        const bm = await createImageBitmap(video);
        if (disposed) { bm.close(); return; }
        if (!cache[slot]) cache[slot] = bm; else bm.close();
        // Bound GPU memory without altering the original video or frame resolution.
        const occupied = cache.map((frame, index) => frame ? index : -1).filter(index => index >= 0);
        if (occupied.length > 12) {
          const evict = occupied.filter(index => index !== slot).sort((a,b) => Math.abs(slotToPct(b)-targetPct)-Math.abs(slotToPct(a)-targetPct))[0];
          cache[evict]?.close(); cache[evict] = null;
        }
      } catch { /* ignore — mobile fallback draws directly */ }
    }

    // Background prefetch using binary subdivision so coverage builds fast
    async function prefetch() {
      if (prefetchRunning || duration === 0 || !hasImageBitmap) return;
      prefetchRunning = true;

      // Sparse warm-up; exact requested frames are decoded on demand.
      const queue = [0, 50, 100, 25, 75, 10, 90, 40, 60, 20, 80];
      for (const slot of queue) {
        if (disposed) break;
        if (cache[slot]) continue;
        await new Promise<void>(resolve => {
          const done = () => { secondary.removeEventListener("seeked", done); finishPendingSeek = null; resolve(); };
          finishPendingSeek = done;
          secondary.addEventListener("seeked", done, { once: true });
          secondary.currentTime = Math.max(0.001, Math.min(duration - 0.001, (slotToPct(slot) / 100) * duration));
          if (!secondary.seeking) done();
        });
        await capture(secondary, slot);
      }
      prefetchRunning = false;
    }

    // When primary video seeks: draw frame immediately
    function onPrimarySeeked() {
      const slot = pctToSlot(targetPct);
      if (hasImageBitmap) {
        capture(primary, slot).then(() => {
          if (!disposed && pctToSlot(targetPct) === slot && cache[slot]) draw(cache[slot]!);
        });
      }
      // Always draw directly for immediate feedback (critical on mobile)
      drawVideo(primary);
    }
    primary.addEventListener("seeked", onPrimarySeeked);

    // Metadata ready — draw first frame immediately, kick off prefetch
    function onMetadata() {
      duration = primary.duration;
      canvas.width = primary.videoWidth || 1920;
      canvas.height = primary.videoHeight || 1080;
      // Seek to 0 to paint first frame on canvas
      primary.currentTime = 0.001;
      secondary.currentTime = 0;
      prefetchTimer = setTimeout(prefetch, 50);
    }
    primary.addEventListener("loadedmetadata", onMetadata);

    // On iOS, loadedmetadata may not fire until a play() is attempted.
    // Trigger a silent play/pause to unblock decoding.
    primary.load();
    const playPromise = primary.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => primary.pause())
        .catch(() => {
          // play() blocked — that's fine, we'll seek manually
        });
    }

    // THE SEEK FUNCTION — called directly by knob in pointermove
    function seek(pct: number) {
      targetPct = pct;
      const slot = pctToSlot(pct);

      if (hasImageBitmap) {
        // Cache HIT → draw instantly, zero latency
        if (cache[slot]) { draw(cache[slot]!); return; }
        // Cache MISS → nearest cached frame for continuity, then seek
        drawNearest(pct);
      }

      // Seek primary video (mobile: this directly triggers onPrimarySeeked → drawVideo)
      if (duration > 0) primary.currentTime = (pct / 100) * duration;
    }

    seekFnRef.current = seek;

    return () => {
      disposed = true;
      clearTimeout(prefetchTimer);
      finishPendingSeek?.();
      seekFnRef.current = null;
      primary.removeEventListener("seeked", onPrimarySeeked);
      primary.removeEventListener("loadedmetadata", onMetadata);
      primary.src = "";
      secondary.src = "";
      hiddenContainer.innerHTML = "";
      cache.forEach(bm => bm?.close());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Hidden DOM container — iOS Safari requires video elements in the DOM to decode */}
      <div
        ref={hiddenContainerRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
          zIndex: -9999,
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: -1 }}
      />
    </>
  );
}
