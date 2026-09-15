import { useEffect, useRef } from "react";

type NodeP = { x: number; y: number; vx: number; vy: number; r: number; grp: number };
type Cluster = { x: number; y: number; phase: number; speed: number };
type Signal = { a: number; b: number; t: number; speed: number };

const INK = "243,242,241";
const BLUE = "36,107,254";
const DPR_MAX = 2;

function reduce() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function mobile() {
  return window.matchMedia("(max-width: 767px)").matches;
}

function distToSeg(px: number, py: number, x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const l2 = dx * dx + dy * dy;
  if (l2 === 0) return Math.hypot(px - x1, py - y1);
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / l2));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

export function BlueprintField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: NodeP[] = [];
    let clusters: Cluster[] = [];
    let signals: Signal[] = [];
    let pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let raf = 0;
    let signalTimer = 0;
    const calm = reduce();
    let grid: CanvasPattern | null = null;

    const linkDist = () => Math.min(width, height) * 0.16;

    const build = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_MAX);
      width = w;
      height = h;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const size = 34;
      const g = document.createElement("canvas");
      g.width = size;
      g.height = size;
      const gc = g.getContext("2d");
      if (gc) {
        gc.strokeStyle = `rgb(${INK} / 0.05)`;
        gc.lineWidth = 1;
        gc.beginPath();
        gc.moveTo(size - 0.5, 0);
        gc.lineTo(size - 0.5, size);
        gc.moveTo(0, size - 0.5);
        gc.lineTo(size, size - 0.5);
        gc.stroke();
      }
      grid = ctx.createPattern(g, "repeat");

      const count = calm ? 14 : mobile() ? 26 : Math.min(56, Math.round((w * h) / 28000));
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          r: 1 + Math.random() * 1.4,
          grp: Math.floor(Math.random() * 3),
        });
      }
      clusters = [0, 1, 2].map((i) => ({
        x: w * (0.2 + i * 0.3),
        y: h * (0.3 + Math.random() * 0.5),
        phase: Math.random() * Math.PI * 2,
        speed: (0.00006 + Math.random() * 0.00008) * (Math.random() < 0.5 ? 1 : -1),
      }));
      signals = [];
    };

    const stepNodes = () => {
      for (const c of clusters) {
        c.phase += c.speed;
        c.x += Math.cos(c.phase * 50) * 0.02;
        c.y += Math.sin(c.phase * 40) * 0.02;
      }
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        const c = clusters[n.grp];
        n.x += (c.x - n.x) * 0.0007;
        n.y += (c.y - n.y) * 0.0007;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
        const dx = n.x - pointer.x;
        const dy = n.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        const near = 150 * 150;
        if (d2 < near && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const f = (1 - d / 150) * 0.3;
          n.x += (dx / d) * f;
          n.y += (dy / d) * f;
        }
      }
    };

    const frame = (loop: boolean) => {
      if (loop) raf = requestAnimationFrame(() => frame(true));
      if (document.hidden && loop) return;
      ctx.clearRect(0, 0, width, height);
      if (grid) ctx.fillStyle = grid;
      else ctx.fillStyle = `rgb(${INK} / 0.06)`;
      ctx.fillRect(0, 0, width, height);

      pointer.x += (pointer.tx - pointer.x) * 0.14;
      pointer.y += (pointer.ty - pointer.y) * 0.14;

      stepNodes();
      const ld = linkDist();
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d > ld) continue;
          const t = 1 - d / ld;
          const base = a.grp === b.grp ? 0.085 : 0.04;
          const near = Math.max(0, 1 - distToSeg(pointer.x, pointer.y, a.x, a.y, b.x, b.y) / 90);
          const boost = near > 0.3 ? near : 0;
          const color = boost > 0 ? BLUE : INK;
          const alpha = Math.min(0.34, base * t + boost * 0.5);
          ctx.strokeStyle = `rgb(${color} / ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = `rgb(${INK} / 0.4)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      signalTimer -= 1;
      if (signalTimer <= 0) {
        signalTimer = 90 + Math.random() * 120;
        for (let attempt = 0; attempt < 12; attempt++) {
          const i = Math.floor(Math.random() * nodes.length);
          const j = Math.floor(Math.random() * nodes.length);
          if (i === j || nodes[i].grp !== nodes[j].grp) continue;
          const a = nodes[i];
          const b = nodes[j];
          if (Math.hypot(a.x - b.x, a.y - b.y) <= ld) {
            signals.push({ a: i, b: j, t: 0, speed: 0.008 + Math.random() * 0.006 });
            break;
          }
        }
      }

      for (let s = signals.length - 1; s >= 0; s--) {
        const sig = signals[s];
        sig.t += sig.speed;
        const a = nodes[sig.a];
        const b = nodes[sig.b];
        const x = a.x + (b.x - a.x) * sig.t;
        const y = a.y + (b.y - a.y) * sig.t;
        ctx.fillStyle = `rgb(${BLUE} / 0.55)`;
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
        if (sig.t >= 1) signals.splice(s, 1);
      }
    };

    const onMove = (e: MouseEvent) => {
      pointer.tx = e.clientX;
      pointer.ty = e.clientY;
    };
    const onLeave = () => {
      pointer.tx = -9999;
      pointer.ty = -9999;
    };
    const onVis = () => {
      if (document.hidden) return;
      if (calm) frame(false);
    };

    build();
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    frame(!calm);

    const onResize = () => {
      build();
      cancelAnimationFrame(raf);
      frame(!calm);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="blueprint-field"
      aria-hidden="true"
      data-calm={reduce() ? "true" : "false"}
    />
  );
}