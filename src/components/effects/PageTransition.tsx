import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_EXPO } from "../../lib/motion";

const SEEN_KEY = "varshith.seen.v2";
const NAME = "VARSHITH";

export function PageTransition() {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<"full" | "brief" | null>(null);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    if (reduce) {
      sessionStorage.setItem(SEEN_KEY, "1");
      setGone(true);
      return;
    }

    const returning = sessionStorage.getItem(SEEN_KEY) === "1";
    sessionStorage.setItem(SEEN_KEY, "1");
    setMode(returning ? "brief" : "full");
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [reduce]);

  /* counter + exit trigger */
  useEffect(() => {
    if (mode === null) return;
    const duration = mode === "full" ? 1700 : 650;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(
          () => setExiting(true),
          mode === "full" ? 240 : 120,
        );
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mode]);

  useEffect(() => {
    if (gone) document.documentElement.style.overflow = "";
  }, [gone]);

  if (gone) return null;
  if (mode === null) return null;

  const chars = NAME.split("");

  return (
    <motion.div
      className="page-transition"
      role="status"
      aria-label="Loading portfolio"
      initial={false}
      animate={exiting ? { y: "-100%" } : { y: "0%" }}
      transition={{ duration: 0.85, ease: EASE_EXPO }}
      onAnimationComplete={() => {
        if (exiting) setGone(true);
      }}
    >
      <div className="pt-bg" aria-hidden="true" />

      <div className="pt-lockup">
        {mode === "full" && (
          <motion.p
            className="pt-kicker"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: EASE_EXPO }}
          >
            portfolio of varshith v · 2026
          </motion.p>
        )}

        <h1 className="pt-word" aria-label="Varshith">
          {chars.map((ch, i) => (
            <span key={i} className="pt-char-mask" aria-hidden="true">
              <motion.span
                className="pt-char"
                style={{ color: i % 2 === 1 ? "var(--color-accent)" : undefined }}
                initial={{ y: "112%" }}
                animate={{ y: "0%" }}
                transition={{
                  delay: 0.18 + i * (mode === "full" ? 0.07 : 0.035),
                  duration: 0.8,
                  ease: EASE_EXPO,
                }}
              >
                {ch}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="pt-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          <span className="pt-meta-line" aria-hidden="true" />
          <span className="pt-meta-text tnum">
            {String(progress).padStart(3, "0")}
          </span>
          <span className="pt-meta-text">%</span>
        </motion.div>
      </div>
    </motion.div>
  );
}