import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../layout/Section";
import { fadeUp } from "../../lib/motion";
import { EMAIL, GITHUB_ORG_URL, LINKEDIN_URL, CGPA } from "../../data/site";

export function Contact() {
  const reduce = useReducedMotion();

  return (
    <Section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-grid">
          {/* Left - Contact card */}
          <motion.div
            variants={fadeUp}
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={{ once: true }}
            className="contact-left"
          >
            <div className="contact-header">
              <span className="contact-section-num tnum">05</span>
            </div>
            <h2 className="contact-title">Let's Build<br />Something</h2>
            <p className="contact-desc">
              Have a project, opportunity, or just want to connect? I'm open to
              interesting conversations and collaboration.
            </p>

            <div className="contact-card">
              <div className="contact-card-row">
                <span className="contact-card-label">Email</span>
                <a href={`mailto:${EMAIL}`} className="contact-card-value text-accent">
                  {EMAIL}
                </a>
              </div>
              <div className="contact-card-divider" />
              <div className="contact-card-row">
                <span className="contact-card-label">GitHub</span>
                <a
                  href={GITHUB_ORG_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-card-value"
                >
                  @4mh24cs167-tech
                </a>
              </div>
              <div className="contact-card-divider" />
              <div className="contact-card-row">
                <span className="contact-card-label">LinkedIn</span>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-card-value"
                >
                  /in/varshith-v
                </a>
              </div>
              <div className="contact-card-divider" />
              <div className="contact-card-row">
                <span className="contact-card-label">CGPA</span>
                <span className="contact-card-value tnum">{CGPA}</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Quote + CTA */}
          <motion.div
            variants={fadeUp}
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={{ once: true }}
            className="contact-right"
          >
            <p className="contact-quote">
              "Let's create<br />something meaningful<br />together."
            </p>
            <a href={`mailto:${EMAIL}`} className="btn btn-primary btn--lg">
              Start a conversation
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
