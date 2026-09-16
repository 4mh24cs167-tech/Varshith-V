import { useEffect, useRef } from "react";

type Pt = { x: number; y: number; born: number };

const MAX_POINTS = 44;
const LIFETIME = 700;

function canTrace() {
  return (
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(max-width: 767px)").matches
  );
}

export function TraceCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canTrace()) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let pts: Pt[] = [];
    let hoveringInteractive = false;
    let raf = 0;
    let running = true;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const track = (e: MouseEvent) => {
      pts.push({ x: e.clientX, y: e.clientY, born: performance.now() });
      if (pts.length > MAX_POINTS) pts.shift();
    };

    const liveTarget = (el: EventTarget | null): boolean => {
      const node = el instanceof Element ? el : null;
      return !!node?.closest("a, button, [role='button'], [data-interactive]");
    };

    const onOver = (e: MouseEvent) => {
      hoveringInteractive = liveTarget(e.target);
    };
    const onOut = (e: MouseEvent) => {
      hoveringInteractive = liveTarget(e.relatedTarget);
    };
    const onDown = () => {
      hoveringInteractive = true;
    };
    const onUp = () => {
      hoveringInteractive = false;
    };
    const onLeaveWindow = () => {
      pts = [];
    };

    const frame = () => {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      if (document.hidden) return;
      ctx.clearRect(0, 0, width, height);

      const now = performance.now();
      pts = pts.filter((p) => now - p.born < LIFETIME);
      if (pts.length < 2) return;

      const last = pts[pts.length - 1];
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const t = i / (pts.length - 1);
        const alpha = t * 0.28;
        ctx.strokeStyle = `rgb(37 99 235 / ${alpha.toFixed(3)})`;
        ctx.lineWidth = 0.5 + t * 1.2;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        if (hoveringInteractive && t > 0.55) {
          ctx.setLineDash([2, 3]);
          ctx.lineDashOffset = -now * 0.02;
        } else {
          ctx.setLineDash([]);
        }
        ctx.stroke();
      }

      ctx.fillStyle = "rgb(37 99 235 / 0.7)";
      ctx.beginPath();
      ctx.arc(last.x, last.y, 1.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    window.addEventListener("mousemove", track, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    window.addEventListener("mouseleave", onLeaveWindow, { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) pts = [];
    });
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", track);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseleave", onLeaveWindow);
    };
  }, []);

  return <canvas ref={canvasRef} className="trace-cursor" aria-hidden="true" />;
}