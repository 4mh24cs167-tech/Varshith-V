import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, revealGroup } from "../../lib/motion";

export function StatementBand() {
  const reduce = useReducedMotion();
  const anim = !reduce;

  return (
    <div className="statement-band">
      <div className="container">
        <motion.div
          className="statement-band-inner"
          initial={anim ? "hidden" : false}
          whileInView={anim ? "show" : undefined}
          viewport={{ once: true, margin: "-15% 0px" }}
          variants={revealGroup}
        >
          <motion.p variants={fadeUp} className="statement-band-text">
            Engineering is more than a degree.
          </motion.p>
          <motion.p variants={fadeUp} className="statement-band-text">
            It&rsquo;s how I <em>build</em> — systems, products, teams.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export default StatementBand;