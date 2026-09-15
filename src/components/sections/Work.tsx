import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Section } from "../layout/Section";
import { PROJECTS, PROJECT_STATUS_LABEL } from "../../data/projects";
import { ProjectDetail } from "./ProjectDetail";
import { ProjectViz } from "./ProjectViz";
import { fadeUp, revealGroup } from "../../lib/motion";

export function Work() {
  const reduce = useReducedMotion();
  const anim = !reduce;
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <Section id="work" labelledBy="work-title" className="section--spacious">
        <div className="works-header">
          <motion.div
            initial={anim ? "hidden" : false}
            whileInView={anim ? "show" : undefined}
            viewport={{ once: true, margin: "-12% 0px" }}
            variants={revealGroup}
          >
            <motion.p variants={fadeUp} className="hero-eyebrow">
              Selected works
            </motion.p>
            <motion.h2 variants={fadeUp} id="work-title" className="works-header-title">
              Selected
              <br />
              works
            </motion.h2>
          </motion.div>
        </div>

        <motion.div
          className="works-grid"
          initial={anim ? "hidden" : false}
          whileInView={anim ? "show" : undefined}
          viewport={{ once: true, margin: "-8% 0px" }}
          variants={revealGroup}
        >
          {PROJECTS.map((project) => (
            <motion.article
              key={project.id}
              className="work-card"
              variants={fadeUp}
              role="button"
              tabIndex={0}
              aria-label={`Open ${project.title} case study`}
              onClick={() => setSelected(project.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected(project.id);
                }
              }}
            >
              <div className="work-card-viz">
                <ProjectViz projectId={project.id} />
              </div>
              <div className="work-card-body">
                <div className="work-card-num">
                  <span className="tnum">
                    PROJECT {project.number}
                  </span>{" "}
                  <span>· {PROJECT_STATUS_LABEL[project.status]}</span>
                </div>
                <h3 className="work-card-title">{project.title}</h3>
                <div className="work-card-meta">
                  <span className="work-card-category">{project.category}</span>
                  {project.year ? (
                    <span className="work-card-year">
                      <span className="marquee-separator" aria-hidden="true">
                        {" "}·{" "}
                      </span>
                      {project.year}
                    </span>
                  ) : null}
                </div>
                <p className="work-card-desc">{project.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Section>

      <AnimatePresence>
        {selected ? (
          <ProjectDetail
            key={selected}
            projectId={selected}
            onClose={() => setSelected(null)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Work;