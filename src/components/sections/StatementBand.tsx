import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "../../lib/motion";
import { CGPA, ROLE_ORGS } from "../../data/site";

export function StatementBand() {
  const reduce = useReducedMotion();

  return (
    <div className="statement-band">
      <motion.div
        variants={fadeUp}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true }}
        className="statement-inner container"
      >
        <p className="statement-text">
          <span className="statement-role">B.E. CSE</span>
          <span className="statement-sep">&middot;</span>
          <span className="statement-org">{ROLE_ORGS}</span>
          <span className="statement-sep">&middot;</span>
          <span className="statement-cgpa tnum">CGPA {CGPA}</span>
          <span className="statement-sep">&middot;</span>
          <span className="statement-status">
            <span className="statement-dot" />
            AVAILABLE FOR COLLABORATION
          </span>
        </p>
      </motion.div>
    </div>
  );
}
