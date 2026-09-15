import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Section } from "../layout/Section";

type Stat = {
  suffix: string;
  label: string;
  value: number;
  decimals?: number;
};

const STATS: Stat[] = [
  { suffix: " CGPA", label: "B.E. Computer Science", value: 8.74, decimals: 2 },
  { suffix: "", label: "Systems shipped", value: 4 },
  { suffix: "+", label: "Months engineering", value: 12 },
  { suffix: "", label: "Live at MITM", value: 4 },
];

function CountUp({
  value,
  decimals = 0,
  animate,
}: {
  value: number;
  decimals?: number;
  animate: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    if (!animate) {
      setDisplay(value.toFixed(decimals));
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay((value * eased).toFixed(decimals));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, decimals, inView, value]);

  return <span ref={ref}>{display}</span>;
}

export function Stats() {
  const reduce = useReducedMotion();
  const animate = !reduce && reduce !== null;
  const animateCount = animate;

  return (
    <Section className="stats-section">
      <div className="stats-grid">
        {STATS.map((s) => (
          <div className="stat-item" key={s.label}>
            <div className="stat-number">
              <CountUp
                value={s.value}
                decimals={s.decimals ?? 0}
                animate={animateCount}
              />
              {s.suffix}
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default Stats;