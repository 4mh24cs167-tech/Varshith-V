import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../layout/Section";
import { fadeUp, revealGroup } from "../../lib/motion";
import { CGPA, ROLE_ORGS } from "../../data/site";

export function About() {
  const reduce = useReducedMotion();
  const anim = !reduce;
  const facts = [
    { label: "ROLE", value: "Full-Stack · 6 systems shipped" },
    { label: "DEGREE", value: ROLE_ORGS },
    { label: "CGPA", value: `${CGPA}` },
  ];

  return (
    <Section id="about" labelledBy="about-title" className="section--spacious">
      <motion.div
        className="about-grid"
        initial={anim ? "hidden" : false}
        whileInView={anim ? "show" : undefined}
        viewport={{ once: true, margin: "-12% 0px" }}
        variants={revealGroup}
      >
        <motion.div variants={fadeUp} className="about-text">
          <p className="hero-eyebrow">Nice that you have found me.</p>
          <p>
            I&rsquo;m Varshith, a Computer Science &amp; Engineering student at
            MITM. Most people call me a developer; I think of myself as someone
            who turns problems into working systems. I&rsquo;ve shipped four
            products from scratch — a file converter, a campus placement
            portal, an event management platform, and a pet community app — and
            I lead the engineering behind them.
          </p>
          <p>
            My focus is full-stack engineering and AI-infused tooling: building
            clean APIs, thoughtful databases, and interfaces that make complex
            workflows feel simple. When I&rsquo;m not shipping, I&rsquo;m
            experimenting with the next layer of automation and machine
            learning.
          </p>
        </motion.div>

        <motion.dl variants={fadeUp} className="about-facts">
          {facts.map((f) => (
            <div key={f.label} className="about-fact">
              <dt className="about-fact-label">{f.label}</dt>
              <dd className="about-fact-value">{f.value}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </Section>
  );
}

export default About;