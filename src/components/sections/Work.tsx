import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Section } from "../layout/Section";
import { PROJECTS, PROJECT_CATEGORIES } from "../../data/projects";
import type { ProjectCategory } from "../../data/projects";
import { ProjectDetail } from "./ProjectDetail";
import { ProjectGallery } from "./ProjectGallery";
import { EASE_EXPO } from "../../lib/motion";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_EXPO } },
};

export function Work() {
  const reduce = useReducedMotion();
  const anim = !reduce;
  const [selected, setSelected] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "all">(
    "all",
  );

  const filtered =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.tags.includes(activeFilter));

  return (
    <>
      <Section id="work" labelledBy="work-title" className="section--spacious">
        <div className="works-header">
          <motion.div
            initial={anim ? "hidden" : false}
            whileInView={anim ? "show" : undefined}
            viewport={{ once: true, margin: "-12% 0px" }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="hero-eyebrow">
              Selected works
            </motion.p>
            <motion.h2
              variants={fadeUp}
              id="work-title"
              className="works-header-title"
            >
              Selected
              <br />
              works
            </motion.h2>
            <motion.p variants={fadeUp} className="works-header-sub">
              A collection of systems, products and experiments built to solve
              real problems.
            </motion.p>
          </motion.div>
        </div>

        <motion.nav
          className="work-filters"
          initial={anim ? "hidden" : false}
          whileInView={anim ? "show" : undefined}
          viewport={{ once: true }}
          variants={stagger}
          aria-label="Filter projects by category"
        >
          {PROJECT_CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              variants={fadeUp}
              className={`work-filter-btn${activeFilter === cat.id ? " work-filter-btn--active" : ""}`}
              onClick={() => setActiveFilter(cat.id)}
              aria-pressed={activeFilter === cat.id}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.nav>

        <div className="pg-frame">
          <motion.div
            className="pg-viewport"
            initial={anim ? "hidden" : false}
            whileInView={anim ? "show" : undefined}
            viewport={{ once: true, margin: "-8% 0px" }}
            variants={stagger}
          >
            <ProjectGallery key={activeFilter} projects={filtered} onOpen={setSelected} />
          </motion.div>
          <p className="pg-hint">
            <span className="pg-hint-num tnum" aria-hidden="true">↔</span>
            Always in motion · hover or tap a card to inspect
          </p>
        </div>
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