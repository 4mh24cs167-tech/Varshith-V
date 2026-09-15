import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../layout/Section";
import { fadeUp, revealGroup } from "../../lib/motion";

type FaqItem = {
  q: string;
  a: string;
};

const FAQS: FaqItem[] = [
  {
    q: "What do you actually build?",
    a: "Full-stack systems with AI on top. UniConv (file conversion), MITM PlacePro (campus placement portal, used at my college), EventFlow (event management with Gemini evaluations) and PetCommunity (a pet match and care platform).",
  },
  {
    q: "What is your tech focus?",
    a: "TypeScript, React, Node.js and PostgreSQL for the core; Python, Prisma, Supabase and Docker for the backend tooling; and Gemini-based features where automation genuinely helps a workflow.",
  },
  {
    q: "Are you available for work or collaboration?",
    a: "Yes. I'm finishing my B.E. in Computer Science and open to internships, freelance builds and collabs — especially AI-infused products. My email is always open.",
  },
  {
    q: "Which project should I look at first?",
    a: "MITM PlacePro — it's the deepest system (254 commits, six CSE students, role-based workflows, live at MITM). Or UniConv for a clean shipped consumer tool.",
  },
  {
    q: "Do you prefer frontend or backend?",
    a: "Both. I design the database and APIs as carefully as the interface — shipping end-to-end is what separates products from prototypes.",
  },
];

export function FAQ() {
  const reduce = useReducedMotion();
  const anim = !reduce;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" labelledBy="faq-title" className="faq-section">
      <motion.div className="faq-header" initial={anim ? "hidden" : false} whileInView={anim ? "show" : undefined} viewport={{ once: true, margin: "-12% 0px" }} variants={revealGroup}>
        <motion.p variants={fadeUp} className="hero-eyebrow">Frequently asked questions</motion.p>
        <motion.h2 variants={fadeUp} id="faq-title" className="faq-header-title">
          Frequently asked
          <br />
          questions
        </motion.h2>
        <motion.p variants={fadeUp} className="faq-header-sub">
          Honest answers.
        </motion.p>
      </motion.div>

      <div className="faq-list">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div className="faq-item" data-open={isOpen} key={item.q}>
              <button
                type="button"
                className="faq-question"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <svg
                  className="faq-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
              <div className="faq-answer" id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`}>
                <div className="faq-answer-inner">{item.a}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export default FAQ;