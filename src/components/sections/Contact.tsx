import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../layout/Section";
import { fadeUp, revealGroup } from "../../lib/motion";
import { EMAIL, LINKEDIN_URL, AVAILABILITY_TEXT, RESUME_URL } from "../../data/site";

export function Contact() {
  const reduce = useReducedMotion();
  const anim = !reduce;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <Section id="contact" labelledBy="contact-title" className="contact-section">
      <motion.div
        initial={anim ? "hidden" : false}
        whileInView={anim ? "show" : undefined}
        viewport={{ once: true, margin: "-12% 0px" }}
        variants={revealGroup}
      >
        <motion.p variants={fadeUp} className="hero-eyebrow">Get in touch</motion.p>
        <motion.h2 variants={fadeUp} id="contact-title" className="contact-header-title">
          Let&rsquo;s build
          <br />
          something together.
        </motion.h2>

        <div className="contact-grid">
          <motion.div variants={fadeUp} className="contact-info">
            <div className="contact-info-row">
              <span className="contact-info-label">Email</span>
              <span className="contact-info-value">
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </span>
            </div>
            <div className="contact-info-row">
              <span className="contact-info-label">LinkedIn</span>
              <span className="contact-info-value">
                <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                  Varshith V
                </a>
              </span>
            </div>
            <div className="contact-info-row">
              <span className="contact-info-label">Resume</span>
              <span className="contact-info-value">
                <a href={RESUME_URL} download>View my resume</a>
              </span>
            </div>
            <div className="contact-status">
              <span className="contact-status-dot" aria-hidden="true" />
              {AVAILABILITY_TEXT}
            </div>
          </motion.div>

          <motion.form variants={fadeUp} className="contact-form" onSubmit={onSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">Your name?</label>
              <input
                id="contact-name"
                className="form-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                autoComplete="name"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">Your email?</label>
              <input
                id="contact-email"
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                autoComplete="email"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">What are we building?</label>
              <textarea
                id="contact-message"
                className="form-textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                name="message"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn--lg">
              Send message
            </button>
          </motion.form>
        </div>
      </motion.div>
    </Section>
  );
}

export default Contact;