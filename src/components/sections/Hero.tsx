import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../layout/Section";
import { fadeUp, revealGroup } from "../../lib/motion";
import { PROFILE_IMAGE, ROLE_TITLE } from "../../data/site";

const CHIPS = [
  { label: "SOFTWARE CTS", top: true },
  { label: "AI SYSTEMS", bottom: true },
];

export function Hero() {
  const reduce = useReducedMotion();
  const anim = !reduce;
  const gate = anim ? "hidden" : false;

  return (
    <Section id="hero" className="hero">
      <div className="hero-deco" aria-hidden="true">
        <span className="hero-deco-num tnum">01</span>
        <span className="hero-deco-rule" />
        <span className="hero-deco-cross hero-deco-cross--tl tnum" aria-hidden="true">+</span>
        <span className="hero-deco-cross hero-deco-cross--br tnum" aria-hidden="true">+</span>
        <span className="hero-deco-coord hero-deco-coord--tl tnum">
          X·0012.6&nbsp;/&nbsp;Y·0000.8
        </span>
        <span className="hero-deco-coord hero-deco-coord--br tnum">
          SHEET&nbsp;01&nbsp;/&nbsp;PORTFOLIO
        </span>
      </div>

      <motion.div
        initial={gate}
        whileInView={anim ? "show" : undefined}
        viewport={{ once: true }}
        variants={revealGroup}
        className="hero-inner"
      >
        <div>
          <motion.p variants={fadeUp} className="hero-eyebrow">
            Hi, i am Varshith
          </motion.p>

          <motion.h1 variants={fadeUp} className="hero-headline">
            {ROLE_TITLE}
            <br />
            <em>AI Systems</em> Builder

          </motion.h1>

          <motion.p variants={fadeUp} className="hero-intro">
            Engineering student and technology lead — building things that
            ship. From file converters to placement portals to event
            platforms, I design and build systems that work.
          </motion.p>

          <motion.div variants={fadeUp} className="hero-ctas">
            <a href="#work" className="btn btn-primary">
              Explore my work
            </a>
            <a href="#contact" className="btn btn-secondary">
              Contact me
            </a>
          </motion.div>
        </div>

        <motion.aside variants={fadeUp} className="hero-portrait">
          <div className="hero-portrait-ring" aria-hidden="true" />
          <div className="hero-portrait-ring" aria-hidden="true" />
          <div className="hero-portrait-main">
            <img
              src={PROFILE_IMAGE}
              alt="Portrait of Varshith V, full-stack developer"
              width={340}
              height={340}
              fetchPriority="high"
            />
          </div>
          {CHIPS.map((chip) => (
            <span
              key={chip.label}
              className={`hero-portrait-chip hero-portrait-chip--${
                chip.top ? "top" : "bottom"
              }`}
            >
              {chip.label}
            </span>
          ))}
        </motion.aside>
      </motion.div>

      <a className="scroll-indicator" href="#about" aria-label="Scroll to about section">
        <span className="scroll-line" aria-hidden="true" />
        <span className="scroll-label">Scroll</span>
      </a>
    </Section>
  );
}

export default Hero;