import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../layout/Section";
import { fadeUp, revealGroup } from "../../lib/motion";
import { YVBCO_URL } from "../../data/site";

const STUDIO_EMAIL = "yvb.company@gmail.com";

const STATS = [
  { value: "6+", label: "Engineers & designers" },
  { value: "100%", label: "Independent & self-funded" },
  { value: "2026", label: "India-based · Building everywhere" },
];

const PRODUCTS = [
  "UniConv",
  "NoDue Portal",
  "AcadOps",
  "MITM PlacePro",
  "MRF R&D",
  "PetCommunity",
];

export function YvbCo() {
  const reduce = useReducedMotion();
  const anim = !reduce;

  return (
    <Section id="studio" labelledBy="studio-title" className="section--spacious">
      <motion.div
        className="studio-grid"
        initial={anim ? "hidden" : false}
        whileInView={anim ? "show" : undefined}
        viewport={{ once: true, margin: "-12% 0px" }}
        variants={revealGroup}
      >
        <motion.p variants={fadeUp} className="hero-eyebrow">
          The studio
        </motion.p>

        <motion.h2 variants={fadeUp} id="studio-title" className="studio-title">
          YVB<span className="studio-amp">&amp;</span>Co
        </motion.h2>

        <motion.p variants={fadeUp} className="studio-tagline">
          Engineer your <em>vision.</em>
        </motion.p>

        <motion.p variants={fadeUp} className="studio-sub">
          Independent technology studio — India · Everywhere. Custom software,
          products and systems built around the way your business actually
          works. I lead engineering there as CTO, shipping end-to-end.
        </motion.p>

        <motion.dl variants={fadeUp} className="studio-stats">
          {STATS.map((s) => (
            <div key={s.value} className="studio-stat">
              <dt className="studio-stat-value tnum">{s.value}</dt>
              <dd className="studio-stat-label">{s.label}</dd>
            </div>
          ))}
        </motion.dl>

        <motion.div variants={fadeUp} className="studio-products">
          <span className="studio-products-label">Products in the wild</span>
          <ul className="studio-products-list">
            {PRODUCTS.map((p) => (
              <li key={p} className="studio-product">
                {p}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={fadeUp} className="studio-cta">
          <a
            className="project-link"
            href={YVBCO_URL}
            target="_blank"
            rel="noreferrer"
          >
            <span className="project-link-arrow">↗</span> VISIT YVB&amp;CO
          </a>
          <a className="project-link" href={`mailto:${STUDIO_EMAIL}`}>
            <span className="project-link-arrow">↗</span> NEW BUSINESS
          </a>
        </motion.div>
      </motion.div>
    </Section>
  );
}

export default YvbCo;