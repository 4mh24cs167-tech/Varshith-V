import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../layout/Section";
import { fadeUp, staggerFade } from "../../lib/motion";

const CATEGORIES = [
  {
    num: "01",
    title: "Programming",
    skills: "C, C++, Python, JavaScript",
  },
  {
    num: "02",
    title: "Web / Software",
    skills: "React, Next.js, Node.js, Express",
  },
  {
    num: "03",
    title: "Cybersecurity",
    skills: "Network Security, Penetration Testing",
  },
  {
    num: "04",
    title: "Databases",
    skills: "MongoDB, MySQL, PostgreSQL",
  },
  {
    num: "05",
    title: "Tools",
    skills: "Git, Docker, Linux, VS Code",
  },
  {
    num: "06",
    title: "Leadership",
    skills: "Team Management, Technical Strategy",
  },
];

const ICONS: Record<string, React.FC> = {
  "01": () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  ),
  "02": () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  "03": () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  "04": () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  "05": () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="4" r="2" />
      <path d="M10 4h4" />
      <path d="M20 6h-2a2 2 0 00-2 2v10a2 2 0 01-2 2H6" />
      <path d="M4 16V8a2 2 0 012-2h12" />
      <path d="M6 12h.01M6 16h.01M10 12h.01M10 16h.01M14 12h.01M14 16h.01" />
    </svg>
  ),
  "06": () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
};

export function Skills() {
  const reduce = useReducedMotion();

  return (
    <Section id="skills" className="skills-section">
      <div className="container">
        <div className="skills-grid">
          {/* Left column */}
          <div className="skills-left">
            <motion.div
              variants={fadeUp}
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={{ once: true }}
              className="skills-header"
            >
              <span className="section-num">03</span>
              <span className="section-label">EXPERTISE</span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={{ once: true }}
              className="skills-title"
            >
              My Technical{" "}
              <span className="text-accent">Stack</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={{ once: true }}
              className="skills-desc"
            >
              A combination of technologies, tools and practices that help me
              build, secure and scale real-world systems.
            </motion.p>

            <motion.a
              variants={fadeUp}
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={{ once: true }}
              href="#work"
              className="about-link"
            >
              Explore all skills
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </motion.a>

            {/* Category grid */}
            <motion.div
              variants={staggerFade}
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={{ once: true }}
              className="skills-categories"
            >
              {CATEGORIES.map((cat) => {
                const IconComp = ICONS[cat.num];
                return (
                  <motion.div key={cat.num} variants={fadeUp} className="skill-category">
                    <div className="skill-category-icon">
                      {IconComp && <IconComp />}
                    </div>
                    <div>
                      <h4 className="skill-category-title">
                        <span className="tnum">{cat.num}</span> {cat.title}
                      </h4>
                      <p className="skill-category-skills">{cat.skills}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Right column */}
          <motion.div
            variants={fadeUp}
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={{ once: true }}
            className="skills-right"
          >
            <div className="skills-tagline">
              <span className="skills-tagline-text">
                Technology Builds Tomorrow
              </span>
              <div className="skills-tagline-icon">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <rect x="10" y="10" width="60" height="60" rx="8" stroke="rgba(59,124,255,0.15)" strokeWidth="1" />
                  <rect x="20" y="20" width="40" height="40" rx="4" stroke="rgba(59,124,255,0.08)" strokeWidth="1" />
                  <path d="M40 25v30M25 40h30" stroke="rgba(59,124,255,0.15)" strokeWidth="1" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
