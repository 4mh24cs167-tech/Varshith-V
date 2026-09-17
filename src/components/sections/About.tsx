import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../layout/Section";
import { fadeUp, staggerFade } from "../../lib/motion";
import { CGPA } from "../../data/site";

const FEATURES = [
  {
    num: "01",
    title: "Engineering",
    desc: "Building practical software and scalable systems.",
  },
  {
    num: "02",
    title: "Problem Solving",
    desc: "Tackling complex challenges with logical thinking.",
  },
  {
    num: "03",
    title: "Cybersecurity",
    desc: "Securing systems and enabling safer technology.",
  },
  {
    num: "04",
    title: "Technology Leadership",
    desc: "Driving technical direction and engineering decisions.",
  },
];

export function About() {
  const reduce = useReducedMotion();

  return (
    <Section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-left">
            <motion.h2
              variants={fadeUp}
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={{ once: true }}
              className="about-title"
            >
              About the{" "}
              <span className="text-accent">Engineer</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={{ once: true }}
              className="about-desc"
            >
              I'm a Computer Science Engineering student with an {CGPA} CGPA,
              focused on building practical software, solving complex technical
              problems, and continuously expanding my engineering capabilities.
            </motion.p>

            <motion.a
              variants={fadeUp}
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={{ once: true }}
              href="#work"
              className="about-link"
            >
              Learn more
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </motion.a>

            <motion.div
              variants={staggerFade}
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={{ once: true }}
              className="about-features"
            >
              {FEATURES.map((f) => (
                <motion.div key={f.num} variants={fadeUp} className="about-feature">
                  <div className="about-feature-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <div>
                    <div className="about-feature-title">{f.title}</div>
                    <p className="about-feature-desc">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="about-right">
            <motion.div
              variants={fadeUp}
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={{ once: true }}
              className="about-card about-card--quote"
            >
              <h3 className="about-card-title">Build</h3>
              <h3 className="about-card-title">Solve</h3>
              <h3 className="about-card-title about-card-title--accent">Improve</h3>
              <div className="about-card-rule" />
              <span className="about-card-num">// 01</span>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={{ once: true }}
              className="about-card about-card--cgpa"
            >
              <div className="about-cgpa-chart">
                {[40, 65, 55, 80, 70, 90, 85, 95].map((h, i) => (
                  <div
                    key={i}
                    className="about-cgpa-bar"
                    style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }}
                  />
                ))}
              </div>
              <div>
                <span className="about-cgpa-value tnum">{CGPA}</span>
                <span className="about-cgpa-label">CGPA</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
}
