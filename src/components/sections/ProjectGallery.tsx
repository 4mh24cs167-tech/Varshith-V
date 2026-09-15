import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import type { Project } from "../../data/projects";
import { cn } from "../../lib/cn";
import { ProjectTile } from "./ProjectTile";

const BASE_SPEED = 30;
const COPIES = 3;

type ProjectGalleryProps = {
  projects: readonly Project[];
  onOpen: (id: string) => void;
};

export function ProjectGallery({ projects, onOpen }: ProjectGalleryProps) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [pinnedId, setPinnedId] = useState<string | null>(null);

  const speedRef = useRef(BASE_SPEED);
  const cycleRef = useRef(0);
  const inViewRef = useRef(false);
  const rafRef = useRef(0);
  const lastRef = useRef(0);

  const reportPin = useCallback((detail: { x: number; y: number } | null) => {
    window.dispatchEvent(
      new CustomEvent("portfolio:pin", {
        detail: detail ? { x: detail.x, y: detail.y } : null,
      }),
    );
  }, []);

  const handlePin = useCallback(
    (pinKey: string, rect: DOMRect) => {
      setPinnedId(pinKey);
      reportPin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height * 0.2,
      });
    },
    [reportPin],
  );

  const handleUnpin = useCallback(() => {
    setPinnedId(null);
    reportPin(null);
  }, [reportPin]);

  useEffect(() => {
    if (reduce) return;

    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const segs = Array.from(track.children) as HTMLElement[];
      cycleRef.current =
        segs.length > 1 ? segs[1].offsetLeft - segs[0].offsetLeft : 0;
    };
    measure();

    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick);
      if (document.hidden) return;
      if (!inViewRef.current) return;

      const dt = Math.min((now - lastRef.current) / 1000, 0.05);
      lastRef.current = now;

      let next = x.get() - speedRef.current * dt;
      const cycle = cycleRef.current;
      if (cycle > 0 && next <= -cycle) next += cycle;
      x.set(next);
    };

    const io = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting;
      if (!entry.isIntersecting) setPinnedId(null);
    }, { threshold: 0 });
    io.observe(track);

    const ro = new ResizeObserver(() => measure());
    ro.observe(track);

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(rafRef.current);
      else lastRef.current = performance.now();
    };
    document.addEventListener("visibilitychange", onVis);

    lastRef.current = performance.now();
    inViewRef.current = true;
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduce, x]);

  const segments = Array.from({ length: reduce ? 1 : COPIES }, (_, i) => i);

  return (
    <motion.div
      className={cn(
        "pg-track",
        pinnedId && "has-pin",
        reduce && "pg-track--static",
      )}
      style={reduce ? undefined : { x }}
      ref={trackRef}
      onPointerDown={(e) => {
        if (
          e.pointerType === "touch" &&
          !(e.target as HTMLElement).closest(".pg-tile")
        ) {
          handleUnpin();
        }
      }}
    >
      {segments.map((seg) => (
        <ul
          key={seg}
          className="pg-segment"
          aria-hidden={seg > 0 || undefined}
        >
          {projects.map((project) => {
            const pinKey = `${seg}-${project.id}`;
            return (
              <li key={pinKey} className="pg-item">
                <ProjectTile
                  project={project}
                  pinKey={pinKey}
                  pinned={pinnedId === pinKey}
                  onPin={handlePin}
                  onUnpin={handleUnpin}
                  onOpen={onOpen}
                />
              </li>
            );
          })}
        </ul>
      ))}
    </motion.div>
  );
}