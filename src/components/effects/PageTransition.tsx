import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_EXPO, EASE_SPRING } from "../../lib/motion";

const SEEN_KEY = "varshith.seen.v4";
const SEQUENCE = [
  { text: "INITIALIZING", duration: 800, delay: 0 },
  { text: "SYSTEMS", duration: 600, delay: 150 },
  { text: "ONLINE", duration: 500, delay: 300 },
] as const;

export function PageTransition() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"loading" | "revealing" | "complete" | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const started = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    if (reduce) {
      sessionStorage.setItem(SEEN_KEY, "1");
      setPhase("complete");
      return;
    }

    const returning = sessionStorage.getItem(SEEN_KEY) === "1";
    sessionStorage.setItem(SEEN_KEY, "1");

    if (returning) {
      setPhase("revealing");
      setCurrentStep(SEQUENCE.length - 1);
      return;
    }

    document.documentElement.style.overflow = "hidden";
    setPhase("loading");
    setCurrentStep(0);
  }, [reduce]);

  useEffect(() => {
    if (phase !== "loading") return;

    const step = SEQUENCE[currentStep];
    if (!step) {
      setPhase("revealing");
      return;
    }

    const startTime = performance.now();
    const stepDuration = step.duration;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / stepDuration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [phase, currentStep]);

  useEffect(() => {
    if (phase === "revealing") {
      setTimeout(() => {
        document.documentElement.style.overflow = "";
        setPhase("complete");
      }, 600);
    }
    if (phase === "complete") {
      document.documentElement.style.overflow = "";
    }
    return () => {
      if (phase !== "complete") {
        document.documentElement.style.overflow = "";
      }
    };
  }, [phase]);

  if (phase === null || phase === "complete") return null;

  const isLoading = phase === "loading";
  const isRevealing = phase === "revealing";
  const step = SEQUENCE[currentStep];

  return (
    <motion.div
      className="page-transition"
      role="status"
      aria-label={isLoading ? "Loading portfolio" : "Welcome"}
      initial={false}
      animate={{
        opacity: isRevealing ? 0 : 1,
        y: isRevealing ? "-100%" : 0,
      }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.9, ease: EASE_EXPO }}
      onAnimationComplete={() => {
        if (isRevealing) setPhase(null);
      }}
      style={{ zIndex: 9999 }}
    >
      <div className="pt-bg" aria-hidden="true" />
      <div className="pt-overlay" aria-hidden="true" />

      <div className="pt-lockup">
        {isLoading && (
          <>
            <motion.p
              className="pt-kicker"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: EASE_SPRING }}
            >
              <span className="pt-kicker-prefix tnum">00</span>
              PORTFOLIO OF VARSHITH V
              <span className="pt-kicker-suffix tnum">2026</span>
            </motion.p>

            <motion.div
              className="pt-word-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <div className="pt-progress-ring" aria-hidden="true">
                <svg viewBox="0 0 120 120" className="pt-ring-svg">
                  <circle
                    className="pt-ring-bg"
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="326.7"
                    strokeDashoffset="326.7"
                    opacity="0.15"
                  />
                  <motion.circle
                    className="pt-ring-progress"
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="326.7"
                    strokeDashoffset={326.7 * (1 - progress / 100)}
                    strokeLinecap="round"
                    style={{ transformOrigin: "60px 60px", transform: "rotate(-90deg)" }}
                    initial={{ strokeDashoffset: 326.7 }}
                    animate={{ strokeDashoffset: 326.7 * (1 - progress / 100) }}
                    transition={{ duration: step?.duration / 1000 || 0.8, ease: EASE_SPRING }}
                  />
                </svg>
                <span className="pt-progress-value tnum">{String(progress).padStart(3, "0")}%</span>
              </div>

              <h1 className="pt-word" aria-label="Varshith V">
                {["V", "A", "R", "S", "H", "I", "T", "H"].map((ch, i) => (
                  <span key={i} className="pt-char-mask">
                    <motion.span
                      className={`pt-char ${i % 2 === 0 ? "pt-char-accent" : ""}`}
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{
                        delay: 0.45 + i * 0.08,
                        duration: 0.85,
                        ease: EASE_EXPO,
                      }}
                    >
                      {ch}
                    </motion.span>
                  </span>
                ))}
                <span className="pt-char-mask">
                  <motion.span
                    className="pt-char pt-char-space"
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.6, ease: EASE_EXPO }}
                  >
                    &nbsp;
                  </motion.span>
                </span>
                {["V"].map((ch, i) => (
                  <span key={i} className="pt-char-mask">
                    <motion.span
                      className={`pt-char ${i % 2 === 0 ? "pt-char-accent" : ""}`}
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{
                        delay: 1.18 + i * 0.08,
                        duration: 0.85,
                        ease: EASE_EXPO,
                      }}
                    >
                      {ch}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                className="pt-status"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6, ease: EASE_SPRING }}
              >
                <span className="pt-status-dot" aria-hidden="true" />
                {step?.text || "READY"}
              </motion.p>
            </motion.div>

            <motion.div
              className="pt-scanline"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 1.2, ease: EASE_EXPO }}
              aria-hidden="true"
            />
          </>
        )}

        {!isLoading && (
          <motion.div
            className="pt-welcome"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: EASE_SPRING }}
          >
            <motion.h1
              className="pt-word pt-word-welcome"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.9, ease: EASE_SPRING }}
            >
              WELCOME BACK
            </motion.h1>
            <motion.p
              className="pt-welcome-sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: EASE_SPRING }}
            >
              Systems nominal. Ready to build.
            </motion.p>
          </motion.div>
        )}
      </div>

      <div className="pt-corner pt-corner--tl" aria-hidden="true" />
      <div className="pt-corner pt-corner--tr" aria-hidden="true" />
      <div className="pt-corner pt-corner--bl" aria-hidden="true" />
      <div className="pt-corner pt-corner--br" aria-hidden="true" />
    </motion.div>
  );
}

export default PageTransition;