import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_EXPO } from "../../lib/motion";

const SEEN_KEY = "varshith.seen.v2";

export function PageTransition() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [gone, setGone] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduce) {
      sessionStorage.setItem(SEEN_KEY, "1");
      setGone(true);
      return;
    }

    const returning = sessionStorage.getItem(SEEN_KEY) === "1";
    sessionStorage.setItem(SEEN_KEY, "1");
    document.documentElement.style.overflow = "hidden";

    const duration = returning ? 380 : 900;
    const t = window.setTimeout(() => setVisible(false), duration);

    requestAnimationFrame(function tick(now) {
      const el = progressRef.current;
      if (el) {
        el.style.transform = `scaleX(${Math.min(1, now / duration)})`;
      }
      if (now < duration) requestAnimationFrame(tick);
    });

    return () => {
      window.clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, [reduce]);

  // The transition unmounts itself, so the scroll lock above is released from
  // the main effect's cleanup; this guard also clears it when the overlay fades
  // out into the `gone` state without a re-render of the effect above.
  useEffect(() => {
    if (gone) document.documentElement.style.overflow = "";
  }, [gone]);

  if (gone) return null;

  return (
    <motion.div
      className="page-transition"
      role="status"
      aria-label="Loading portfolio"
      initial={false}
      animate={visible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE_EXPO }}
      onAnimationComplete={() => {
        if (!visible) setGone(true);
      }}
    >
      <div className="pt-cell">
        <div className="pt-line" aria-hidden="true">
          <span ref={progressRef} className="pt-fill" />
        </div>
      </div>
      <p className="pt-text text-label">initializing portfolio&hellip;</p>
    </motion.div>
  );
}