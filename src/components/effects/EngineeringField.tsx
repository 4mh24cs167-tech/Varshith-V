import { useEffect, useRef } from "react";

const DPR_MAX = 2;
const GRID = 48;
const alpha = (base: string, a: number) => `rgba(${base},${a})`;
const INK = "243,242,241";
const BLUE = "36,107,254";
const VIOLET = "139,92,246";
const CYAN = "34,211,238";
const MAGENTA = "236,72,153";
const TEAL = "45,212,191";

const ORBS = [
  { cx: 0.16, cy: 0.2, r: 460, base: BLUE, dr: (t: number) => 0.05 + 0.04 * Math.sin(t * 0.0004) },
  { cx: 0.84, cy: 0.14, r: 420, base: VIOLET, dr: (t: number) => 0.04 + 0.035 * Math.cos(t * 0.00033) },
  { cx: 0.92, cy: 0.74, r: 480, base: CYAN, dr: (t: number) => 0.045 + 0.04 * Math.sin(t * 0.00048 + 2) },
  { cx: 0.08, cy: 0.84, r: 440, base: MAGENTA, dr: (t: number) => 0.04 + 0.035 * Math.cos(t * 0.00042 + 1) },
  { cx: 0.5, cy: 0.5, r: 520, base: TEAL, dr: (t: number) => 0.03 + 0.03 * Math.sin(t * 0.00037 + 4) },
];

const AURORA = [
  { y: 0.2, amp: 0.09, freq: 0.0012, base: VIOLET },
  { y: 0.74, amp: 0.11, freq: 0.0009, base: CYAN },
  { y: 0.45, amp: 0.07, freq: 0.0015, base: BLUE },
  { y: 0.6, amp: 0.06, freq: 0.0011, base: MAGENTA },
];

const SECTIONS = [
  { id: "about", num: "01", label: "ABOUT" },
  { id: "studio", num: "02", label: "YVB&CO STUDIO" },
  { id: "work", num: "03", label: "SELECTED WORK" },
  { id: "skills", num: "04", label: "TECHNICAL ARSENAL" },
  { id: "faq", num: "05", label: "EXPERTISE" },
  { id: "contact", num: "06", label: "CONTACT" },
];

type Rect = { top: number; height: number };

export function EngineeringField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let gridPat: CanvasPattern | null = null;
    let rects: Rect[] = SECTIONS.map(() => ({ top: 0, height: 0 }));
    let pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let trail = { x: -9999, y: -9999 };
    let pinned: { x: number; y: number } | null = null;
    let pinAlpha = 0;
    let raf = 0;
    let last = performance.now();
    let time = 0;

    const particles = Array.from({ length: 46 }, () => ({
      x: Math.random(),
      y: Math.random(),
      v: 0.01 + Math.random() * 0.03,
      size: Math.random() < 0.4 ? 1 : Math.random() < 0.8 ? 2 : 3,
      phase: Math.random() * Math.PI * 2,
      pl: Math.floor(Math.random() * 5),
    }));

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

      const g = document.createElement("canvas");
      g.width = g.height = GRID;
      const gc = g.getContext("2d");
      if (gc) {
        gc.strokeStyle = alpha(INK, 0.065);
        gc.lineWidth = 1;
        gc.beginPath();
        gc.moveTo(GRID - 0.5, 0);
        gc.lineTo(GRID - 0.5, GRID);
        gc.moveTo(0, GRID - 0.5);
        gc.lineTo(GRID, GRID - 0.5);
        gc.stroke();
        gc.strokeStyle = alpha(INK, 0.05);
        gc.fillStyle = alpha(INK, 0.05);
        gc.beginPath();
        gc.arc(GRID / 2, GRID / 2, 1, 0, Math.PI * 2);
        gc.fill();
      }
      gridPat = ctx.createPattern(g, "repeat");
    };

    const measure = () => {
      const sy = window.scrollY;
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (!el) return;
        rects[i] = {
          top: el.getBoundingClientRect().top + sy,
          height: el.offsetHeight,
        };
      });
    };

    const draw = (dt: number) => {
      const scrollY = window.scrollY;
      const vh = height;
      time += dt;
      ctx.clearRect(0, 0, width, height);

      const ox = (pointer.x - width / 2) * 0.006;
      const oy = (pointer.y - height / 2) * 0.006;

      // ── colorful ambient orbs (premium glow layer) ─────────
      ctx.globalCompositeOperation = "lighter";
      for (const orb of ORBS) {
        const oxx = orb.cx * width + Math.sin(time * 0.00021 + orb.cx * 9) * 80;
        const oyy = orb.cy * height + Math.cos(time * 0.00018 + orb.cy * 13) * 66;
        const r = orb.r * (1 + orb.dr(time));
        const grad = ctx.createRadialGradient(oxx, oyy, 0, oxx, oyy, r);
        grad.addColorStop(0, alpha(orb.base, orb.cy > 0.6 ? 0.22 : 0.17));
        grad.addColorStop(0.35, alpha(orb.base, orb.cy > 0.6 ? 0.1 : 0.08));
        grad.addColorStop(1, alpha(orb.base, 0));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(oxx, oyy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      // ── aurora ribbons drifting horizontally ───────────────
      for (const au of AURORA) {
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = -40; x <= width + 40; x += 24) {
          const y =
            au.y * vh +
            Math.sin(x * 0.004 + time * au.freq) * au.amp * vh +
            Math.sin(x * 0.009 + time * au.freq * 1.7) * au.amp * vh * 0.4;
          if (x === -40) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = alpha(au.base, 0.06);
        ctx.stroke();
      }

      // ── drifting grid ──────────────────────────────────────
      if (gridPat) {
        const drift = (time * 2.5) % GRID;
        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = gridPat;
        ctx.fillRect(
          -GRID + drift,
          -GRID + drift,
          width + GRID * 2,
          height + GRID * 2,
        );
        ctx.restore();
      }

      // ── vertical photon scanlines drifting sideways ────────
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        const sx =
          ((time * (0.007 + i * 0.003) + i * 0.37) % 1.2) * width - width * 0.1;
        const pulse = 0.04 + 0.03 * Math.sin(time * 0.0016 + i);
        const grad = ctx.createLinearGradient(sx, 0, sx + 90, 0);
        grad.addColorStop(0, alpha(INK, 0));
        grad.addColorStop(0.5, alpha(INK, pulse));
        grad.addColorStop(1, alpha(INK, 0));
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(sx, -40);
        ctx.lineTo(sx, vh + 40);
        ctx.stroke();
      }

      // ── bobbing measurement rows ───────────────────────────
      const rows = [
        { f: 0.18, label: "Y · 0180" },
        { f: 0.42, label: "Y · 0420" },
        { f: 0.66, label: "Y · 0640" },
      ];
      ctx.lineWidth = 1;
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const bob = Math.sin(time * 0.0005 + i * 2.1) * 14;
        const y = row.f * vh + bob + (pointer.y - vh / 2) * 0.008;

        ctx.strokeStyle = alpha(INK, 0.06);
        ctx.beginPath();
        ctx.moveTo(-40, y);
        ctx.lineTo(width + 40, y);
        ctx.stroke();

        ctx.strokeStyle = alpha(INK, 0.1);
        const tickOffset = Math.floor(time * 0.02) % 120;
        for (let x = 40 - tickOffset; x < width + 120; x += 120) {
          ctx.beginPath();
          ctx.moveTo(x, y - 4);
          ctx.lineTo(x, y + 4);
          ctx.stroke();
        }

        ctx.fillStyle = alpha(INK, 0.18);
        ctx.font = '500 10px "JetBrains Mono", monospace';
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
        ctx.fillText(row.label, 24, y - 12);
      }

      // ── rotating datum circle (compass head) ───────────────
      const cx = width - 96 - ox;
      const cy = 108 + oy;
      const cr = 74;
      ctx.save();
      ctx.translate(cx, cy);

      ctx.strokeStyle = alpha(INK, 0.12);
      ctx.beginPath();
      ctx.arc(0, 0, cr, 0, Math.PI * 2);
      ctx.stroke();

      ctx.rotate(time * 0.00018);
      ctx.strokeStyle = alpha(INK, 0.14);
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.arc(0, 0, cr - 10, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        const r1 = cr + 5;
        const r2 = i % 3 === 0 ? cr + 14 : cr + 9;
        ctx.strokeStyle = i % 3 === 0 ? alpha(BLUE, 0.5) : alpha(INK, 0.16);
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
        ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2);
        ctx.stroke();
      }

      ctx.strokeStyle = alpha(BLUE, 0.45);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(
        Math.cos(time * 0.0003) * (cr - 14),
        Math.sin(time * 0.0003) * (cr - 14),
      );
      ctx.stroke();

      ctx.strokeStyle = alpha(MAGENTA, 0.5);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(
        -Math.cos(time * 0.0003 + 2) * (cr - 30),
        -Math.sin(time * 0.0003 + 2) * (cr - 30),
      );
      ctx.stroke();

      ctx.strokeStyle = alpha(INK, 0.2);
      ctx.beginPath();
      ctx.moveTo(-cr - 8, 0);
      ctx.lineTo(-cr + 8, 0);
      ctx.moveTo(cr - 8, 0);
      ctx.lineTo(cr + 8, 0);
      ctx.stroke();

      const glowGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 10);
      glowGrad.addColorStop(0, alpha(CYAN, 0.9));
      glowGrad.addColorStop(1, alpha(CYAN, 0));
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ── radial pulse rings from bottom-left anchor ─────────
      const anchor = ((time * 0.04) % 900) * 1.15;
      const ringR = 60 + anchor;
      for (let ring = 0; ring < 2; ring++) {
        const r = ringR - ring * 120;
        if (r < 24) continue;
        const a = Math.max(0.05 - r * 0.0002, 0);
        ctx.strokeStyle = alpha(BLUE, 0.5 * a * 0.35);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(52, vh - 96, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.strokeStyle = alpha(BLUE, 0.5);
      ctx.beginPath();
      ctx.arc(52, vh - 96, 3, 0, Math.PI * 2);
      ctx.stroke();

      // ── drifting colorful particles ────────────────────────
      const PALETTE = [BLUE, CYAN, VIOLET, MAGENTA, TEAL];
      for (const p of particles) {
        const yy = (p.y + time * p.v * 0.001) % 1;
        const xx = p.x + Math.sin(time * 0.0004 + p.phase) * 0.004;
        const tw = 0.16 + 0.12 * Math.sin(time * 0.001 + p.phase * 3);
        ctx.globalAlpha = tw;
        ctx.fillStyle = alpha(PALETTE[p.pl], 1);
        ctx.fillRect(xx * width, yy * vh, p.size, p.size);
      }
      ctx.globalAlpha = 1;

      // ── section watermarks 01–04 ───────────────────────────
      for (let i = 0; i < SECTIONS.length; i++) {
        const r = rects[i];
        if (r.height <= 0) continue;
        const topV = r.top - scrollY;
        const bottomV = topV + r.height;
        if (bottomV < -vh * 0.4 || topV > vh * 1.3) continue;

        const overlap =
          Math.max(0, Math.min(bottomV, vh) - Math.max(topV, 0)) /
          Math.min(r.height, vh);
        if (overlap <= 0.02) continue;
        const centered =
          scrollY + vh * 0.5 >= topV && scrollY + vh * 0.5 <= bottomV;

        const float = Math.sin(time * 0.0006 + i * 1.7) * 10;
        const wmY = topV + Math.max(vh * 0.05, 12) + oy + float;
        const wmX = width - 24 - ox;

        ctx.textAlign = "right";
        ctx.textBaseline = "alphabetic";
        const wmBase = [BLUE, VIOLET, CYAN, MAGENTA, TEAL][i % 5];
        ctx.font = "800 9rem Poppins, sans-serif";
        ctx.fillStyle = alpha(
          wmBase,
          0.04 + overlap * (centered ? 0.12 : 0.06),
        );
        ctx.fillText(SECTIONS[i].num, wmX, wmY + 130);

        ctx.font = '600 10px "JetBrains Mono", monospace';
        ctx.fillStyle = alpha(wmBase, 0.1 + overlap * 0.3);
        ctx.fillText(`${SECTIONS[i].num} — ${SECTIONS[i].label}`, wmX, wmY + 158);
      }

      // ── cursor plotter line + reticle ──────────────────────
      if (pointer.x > -1000 && trail.x > -1000) {
        ctx.strokeStyle = alpha(BLUE, 0.14);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(trail.x, trail.y);
        ctx.lineTo(pointer.x, pointer.y);
        ctx.stroke();

        ctx.strokeStyle = alpha(BLUE, 0.5);
        ctx.beginPath();
        ctx.moveTo(pointer.x - 8, pointer.y);
        ctx.lineTo(pointer.x + 8, pointer.y);
        ctx.moveTo(pointer.x, pointer.y - 8);
        ctx.lineTo(pointer.x, pointer.y + 8);
        ctx.stroke();

        ctx.strokeStyle = alpha(INK, 0.12);
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 3, 0, Math.PI * 2);
        ctx.stroke();
      }

      // ── pinned-project highlight ───────────────────────────
      pinAlpha += ((pinned ? 1 : 0) - pinAlpha) * 0.1;
      if (pinAlpha > 0.02) {
        ctx.strokeStyle = alpha(BLUE, pinAlpha * 0.5);
        ctx.fillStyle = alpha(BLUE, pinAlpha * 0.7);
        ctx.font = '600 10px "JetBrains Mono", monospace';
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
        if (pinned) {
          ctx.beginPath();
          ctx.moveTo(pinned.x, pinned.y - 70);
          ctx.lineTo(pinned.x, pinned.y + 110);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(pinned.x - 8, pinned.y);
          ctx.lineTo(pinned.x + 8, pinned.y);
          ctx.moveTo(pinned.x, pinned.y - 8);
          ctx.lineTo(pinned.x, pinned.y + 8);
          ctx.stroke();
          ctx.fillText("· PINNED", pinned.x + 12, pinned.y - 70);
        }
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const prev = { x: pointer.x, y: pointer.y };
      pointer.x += (pointer.tx - pointer.x) * 0.1;
      pointer.y += (pointer.ty - pointer.y) * 0.1;
      if (trail.x < -1000) trail = { x: pointer.x, y: pointer.y };
      trail.x += (prev.x - trail.x) * 0.08;
      trail.y += (prev.y - trail.y) * 0.08;
      if (!document.hidden) draw(dt);
    };

    const onMove = (e: MouseEvent) => {
      pointer.tx = e.clientX;
      pointer.ty = e.clientY;
    };
    const onLeave = () => {
      pointer.tx = -9999;
      pointer.ty = -9999;
    };
    const onScroll = () => {
      measure();
      if (reduce) draw(0.016);
    };
    const onPin = (e: Event) => {
      const detail = (e as CustomEvent<{ x: number; y: number } | null>).detail;
      pinned = detail;
      if (reduce) draw(0.016);
    };
    const onResize = () => {
      build();
      measure();
      if (reduce) draw(0.016);
      else last = performance.now();
    };

    build();
    measure();

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("portfolio:pin", onPin);

    if (reduce) {
      draw(0);
    } else {
      last = performance.now();
      raf = requestAnimationFrame(loop);
    }

    requestAnimationFrame(measure);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("portfolio:pin", onPin);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="engineering-field"
      aria-hidden="true"
    />
  );
}