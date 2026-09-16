import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../layout/Section";
import { fadeUp, staggerFade } from "../../lib/motion";
import {
  PROFILE_IMAGE,
  ROLE_TITLE,
  GITHUB_ORG_URL,
  LINKEDIN_URL,
  EMAIL,
} from "../../data/site";
import { useMouseTracker } from "../../hooks/useMouseTracker";

function AnimatedLetter({
  char,
  index,
  accent,
}: {
  char: string;
  index: number;
  accent: boolean;
}) {
  return (
    <motion.span
      className={`hero-letter ${accent ? "hero-letter--accent" : ""}`}
      initial={{ opacity: 0, y: 100, rotateX: -50 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        delay: 0.7 + index * 0.05,
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {char === " " ? " " : char}
    </motion.span>
  );
}

function AnimatedWord({
  word,
  startIndex,
  accent,
}: {
  word: string;
  startIndex: number;
  accent?: boolean;
}) {
  const isAccent = accent ?? false;
  return (
    <span className="hero-word">
      {word.split("").map((char, _idx) => (
        <AnimatedLetter
          key={_idx}
          char={char}
          index={startIndex + _idx}
          accent={isAccent}
        />
      ))}
    </span>
  );
}

function HeroPortrait() {
  const { ref, pos, hover } = useMouseTracker();
  const isHover = hover ?? false;
  const rotateX = isHover ? pos.y * -10 : 0;
  const rotateY = isHover ? pos.x * 10 : 0;

  return (
    <div ref={ref} className="hero-portrait-wrapper">
      <motion.div
        className="hero-portrait-frame"
        animate={{ rotateX, rotateY }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
          mass: 0.8,
        }}
      >
        <div className="hero-portrait-glow hero-portrait-glow--1" />
        <div className="hero-portrait-glow hero-portrait-glow--2" />

        <div className="hero-portrait-ring hero-portrait-ring--1" />
        <div className="hero-portrait-ring hero-portrait-ring--2" />
        <div className="hero-portrait-ring hero-portrait-ring--3" />

        <div className="hero-portrait-main">
          <img
            src={PROFILE_IMAGE}
            alt="Varshith V"
            width={420}
            height={420}
            fetchPriority="high"
          />
          <div className="hero-portrait-shimmer" />
        </div>

        <div className="hero-portrait-accents">
          <span className="hero-portrait-accent hero-portrait-accent--1">
            <span className="accent-pulse" />
            <span className="accent-pulse accent-pulse--delay" />
            LIVE
          </span>
          <span className="hero-portrait-accent hero-portrait-accent--2">
            v1.0.0
          </span>
          <span className="hero-portrait-accent hero-portrait-accent--3">
            <span className="accent-dot" />
            ACTIVE
          </span>
          <span className="hero-portrait-accent hero-portrait-accent--4">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 1L7.5 4.5L11 5.5L8 8L9 11.5L6 10L3 11.5L4 8L1 5.5L4.5 4.5Z"
                fill="currentColor"
              />
            </svg>
            SHIPPED
          </span>
        </div>
      </motion.div>

      <motion.div
        className="hero-portrait-meta"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="hero-portrait-tag">FULL-STACK DEVELOPER</span>
        <span className="hero-portrait-tag">AI SYSTEMS BUILDER</span>
        <span className="hero-portrait-tag">CREATIVE TECHNOLOGIST</span>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  const roleWords = ROLE_TITLE.split(" ");
  const subline1 = "AI Systems";
  const subline2 = "Builder";

  return (
    <Section id="hero" className="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg-grid" />
        <div className="hero-bg-gradient" />
        <div className="hero-bg-arc" />
        <div className="hero-bg-arc hero-bg-arc--2" />
        <div className="hero-bg-dots" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="hero-bg-dot" />
          ))}
        </div>
      </div>

      <div className="hero-deco" aria-hidden="true">
        <span className="hero-deco-num">01</span>
        <span className="hero-deco-coord hero-deco-coord--tl tnum">
          X&middot;0012.6&nbsp;/&nbsp;Y&middot;0000.8
        </span>
        <span className="hero-deco-coord hero-deco-coord--br tnum">
          SHEET&nbsp;01&nbsp;/&nbsp;PORTFOLIO
        </span>
        <div className="hero-deco-rule" />
        <div className="hero-deco-rule-v" />
      </div>

      <div className="hero-inner">
        <motion.div
          className="hero-content"
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, margin: "-10% 0px" }}
          variants={staggerFade}
        >
          <motion.div variants={fadeUp} className="hero-eyebrow-row">
            <span className="hero-eyebrow">Hi, I'm Varshith</span>
            <span className="hero-eyebrow-dot" />
          </motion.div>

          <h1 className="hero-headline">
            <motion.div variants={fadeUp} className="hero-line">
              <AnimatedWord
                word={roleWords[0]}
                startIndex={0}
                accent={false}
              />
              {roleWords[1] && (
                <>
                  <span className="hero-letter-space">&nbsp;</span>
                  <AnimatedWord
                    word={roleWords[1]}
                    startIndex={roleWords[0].length + 1}
                    accent={false}
                  />
                </>
              )}
            </motion.div>
            <motion.div variants={fadeUp} className="hero-line hero-line--sub">
              <AnimatedWord word={subline1} startIndex={10} accent={true} />
              <span className="hero-letter-space">&nbsp;</span>
              <AnimatedWord word={subline2} startIndex={20} accent={false} />
            </motion.div>
          </h1>

          <motion.p
            variants={fadeUp}
            className="hero-intro"
            style={{ transitionDelay: "0.5s" }}
          >
            Engineering student and technology lead — building systems
            that ship. From file converters to placement portals to event
            platforms, I design and build software that works.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="hero-ctas"
            style={{ transitionDelay: "0.6s" }}
          >
            <a href="#work" className="btn btn-primary btn--lg">
              Explore my work
              <span className="btn-arrow" aria-hidden="true">
                &rarr;
              </span>
            </a>
            <a href="#contact" className="btn btn-glass btn--lg">
              Get in touch
              <span className="btn-arrow" aria-hidden="true">
                &rarr;
              </span>
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="hero-socials"
            style={{ transitionDelay: "0.7s" }}
          >
            <a
              href={GITHUB_ORG_URL}
              target="_blank"
              rel="noreferrer"
              className="hero-social-link"
              aria-label="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.16 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="hero-social-link"
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="hero-social-link"
              aria-label="Email"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="hero-stats"
            style={{ transitionDelay: "0.75s" }}
          >
            <div className="hero-stat">
              <span className="hero-stat-value">8+</span>
              <span className="hero-stat-label">Projects shipped</span>
            </div>
            <div className="hero-stat-divider" aria-hidden="true" />
            <div className="hero-stat">
              <span className="hero-stat-value">6</span>
              <span className="hero-stat-label">Internships &amp; roles</span>
            </div>
            <div className="hero-stat-divider" aria-hidden="true" />
            <div className="hero-stat">
              <span className="hero-stat-value">4.2</span>
              <span className="hero-stat-label">Avg. performance</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={reduce ? false : { opacity: 0, x: 60, scale: 0.97 }}
          whileInView={
            reduce ? undefined : { opacity: 1, x: 0, scale: 1 }
          }
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{
            delay: 0.35,
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <HeroPortrait />
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="scroll-track">
          <div className="scroll-handle" />
        </div>
        <span className="scroll-label tnum">SCROLL</span>
      </motion.div>
    </Section>
  );
}

export default Hero;
