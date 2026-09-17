import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../layout/Section";
import { fadeUp } from "../../lib/motion";
import { YVBCO_URL } from "../../data/site";

export function YvbCo() {
  const reduce = useReducedMotion();

  return (
    <Section id="studio" className="studio-section">
      <div className="container">
        <motion.div
          variants={fadeUp}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true }}
          className="studio-card"
        >
          <div className="studio-card-header">
            <div>
              <span className="section-num">02</span>
              <span className="section-label">THE STUDIO</span>
            </div>
            <h3 className="studio-title">
              YVB<span className="studio-amp">&amp;</span>CO
            </h3>
            <p className="studio-tagline">Engineer your <em>vision.</em></p>
          </div>
          <div className="studio-card-body">
            <p className="studio-desc">
              Independent technology studio — India · Everywhere. Custom software,
              products and systems built around the way your business actually works.
              I lead engineering as CTO, shipping end-to-end.
            </p>
            <a
              href={YVBCO_URL}
              target="_blank"
              rel="noreferrer"
              className="studio-link"
            >
              Visit YVB&amp;CO →
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
