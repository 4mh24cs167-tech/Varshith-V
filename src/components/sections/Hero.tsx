import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../layout/Section";
import { fadeUp } from "../../lib/motion";
import { GITHUB_ORG_URL, LINKEDIN_URL, EMAIL, PROFILE_IMAGE } from "../../data/site";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <Section id="hero" className="hero-section">
      <div className="hero-grid-lines" aria-hidden="true">
        <div className="hero-vline hero-vline--1" />
        <div className="hero-vline hero-vline--2" />
        <div className="hero-vline hero-vline--3" />
        <div className="hero-vline hero-vline--4" />
        <div className="hero-hline hero-hline--1" />
      </div>

      {/* Navbar is rendered by App.tsx */}

      <div className="container hero-content">
        <div className="hero-left">
          {/* Label */}
          <motion.p
            variants={fadeUp}
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={{ once: true }}
            className="hero-label"
          >
            Hi, I'm
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={{ once: true }}
            className="hero-name"
          >
            VARSHITH <span className="hero-name-accent">V</span>
          </motion.h1>
          <motion.h2
            variants={fadeUp}
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={{ once: true }}
            className="hero-role"
          >
            <span className="hero-role-line">Full-Stack Developer</span>
            <span className="hero-role-sep">/</span>
            <span className="hero-role-line hero-role-line--accent">AI</span>
            <span className="hero-role-sep">/</span>
            <span className="hero-role-line">Systems Builder</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={{ once: true }}
            className="hero-desc"
          >
            Computer Science Engineering student with an 8.74 CGPA, focused on building practical technology, solving complex problems, and leading technical products.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={{ once: true }}
            className="hero-ctas"
          >
            <a href="#work" className="btn btn-primary">
              Explore my work
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
            <a href="#contact" className="btn btn-ghost">
              Let's Connect
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            variants={fadeUp}
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={{ once: true }}
            className="hero-socials"
          >
            <a href={GITHUB_ORG_URL} target="_blank" rel="noreferrer" className="hero-social-icon" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.16 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="hero-social-icon" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href={`mailto:${EMAIL}`} className="hero-social-icon" aria-label="Email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
            </a>
          </motion.div>
        </div>

        <div className="hero-right">
          {/* Portrait with decorative arc */}
          <motion.div
            className="hero-portrait-wrapper"
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-portrait-arc" aria-hidden="true" />
            <div className="hero-portrait-glow" aria-hidden="true" />
            <div className="hero-portrait-frame">
              <img
                src={PROFILE_IMAGE}
                alt="Varshith V"
                width={440}
                height={440}
                loading="eager"
              />
            </div>
            {/* Floating status badges */}
            <div className="hero-portrait-badges">
              <div className="hero-badge hero-badge--live">
                <span className="hero-badge-dot" />
                AVAILABLE
              </div>
              <div className="hero-badge hero-badge--version">
                8.74 CGPA
              </div>
              <div className="hero-badge hero-badge--status">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor"><path d="M6 1l1.5 3.5L11 5.5l-2.5 2.5L9 11L6 9l-3 2 .5-2.5L1 5.5l3.5-1z"/></svg>
                SHIPPED
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="hero-deco" aria-hidden="true">
        <div className="hero-deco-num">01</div>
        <div className="hero-deco-coord">
          <span>13.0816° N</span>
          <span>77.5643° E</span>
        </div>
        <div className="hero-deco-sheet">
          SHEET 01 / PORTFOLIO
        </div>
      </div>

      {/* Right side vertical labels */}
      <div className="hero-right-labels" aria-hidden="true">
        <span className="hero-right-label">ENGINEER</span>
        <span className="hero-right-label">BUILDER</span>
        <span className="hero-right-label">SYSTEMS THINKER</span>
      </div>
    </Section>
  );
}

export default Hero;
