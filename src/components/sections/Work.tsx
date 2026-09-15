import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Section } from "../layout/Section";
import {
  PROJECTS,
  PROJECT_STATUS_LABEL,
  PROJECT_CATEGORIES,
} from "../../data/projects";
import type { Project, ProjectCategory } from "../../data/projects";
import { ProjectDetail } from "./ProjectDetail";
import { ProjectViz } from "./ProjectViz";
import { fadeUp, revealGroup, EASE_EXPO } from "../../lib/motion";

function useProjectInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;
      ref.current = node;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        },
        { threshold },
      );
      observer.observe(node);
    },
    [threshold],
  );

  return { setRef, inView };
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_EXPO },
  },
};

const staggerGroup = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const childFade = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_EXPO },
  },
};

function ProjectCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (id: string) => void;
}) {
  const { setRef, inView } = useProjectInView(0.15);
  const reduce = useReducedMotion();
  const anim = !reduce && inView;

  return (
    <motion.div
      ref={setRef}
      className="work-editorial"
      variants={cardVariants}
      initial="hidden"
      animate={anim ? "show" : "hidden"}
      layout
    >
      <motion.article
        className="work-editorial-card"
        role="button"
        tabIndex={0}
        aria-label={`Open ${project.title} case study`}
        onClick={() => onSelect(project.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(project.id);
          }
        }}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.25, ease: EASE_EXPO }}
      >
        <div className="work-editorial-viz">
          <ProjectViz projectId={project.id} inView={anim} />
        </div>

        <div className="work-editorial-body">
          <motion.div
            className="work-editorial-head"
            initial="hidden"
            animate={anim ? "show" : "hidden"}
            variants={staggerGroup}
          >
            <motion.div variants={childFade} className="work-editorial-num">
              <span className="tnum">{project.number}</span>
            </motion.div>

            <motion.h3 variants={childFade} className="work-editorial-title">
              {project.title}
            </motion.h3>

            <motion.div variants={childFade} className="work-editorial-meta">
              <span className="work-editorial-category">{project.category}</span>
              <span className="work-editorial-dot">·</span>
              <span className="work-editorial-status">
                {PROJECT_STATUS_LABEL[project.status]}
              </span>
              {project.year ? (
                <>
                  <span className="work-editorial-dot">·</span>
                  <span className="work-editorial-year">{project.year}</span>
                </>
              ) : null}
            </motion.div>

            <motion.p variants={childFade} className="work-editorial-desc">
              {project.description}
            </motion.p>
          </motion.div>

          <motion.div
            className="work-editorial-tech"
            initial="hidden"
            animate={anim ? "show" : "hidden"}
            variants={staggerGroup}
          >
            {project.technologies.slice(0, 5).map((tech) => (
              <motion.span key={tech} variants={childFade} className="tech-pill">
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > 5 ? (
              <motion.span variants={childFade} className="tech-pill tech-pill--more">
                +{project.technologies.length - 5}
              </motion.span>
            ) : null}
          </motion.div>

          <motion.div
            className="work-editorial-links"
            initial="hidden"
            animate={anim ? "show" : "hidden"}
            variants={staggerGroup}
          >
            {project.liveUrl ? (
              <motion.a
                variants={childFade}
                className="project-link"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="project-link-arrow">↗</span>
                LIVE PRODUCT
              </motion.a>
            ) : null}
            {project.sourceUrl ? (
              <motion.a
                variants={childFade}
                className="project-link"
                href={project.sourceUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="project-link-arrow">↗</span>
                SOURCE
              </motion.a>
            ) : null}
            <motion.span
              variants={childFade}
              className="project-link project-link--cta"
            >
              CASE STUDY
              <span className="project-link-arrow">→</span>
            </motion.span>
          </motion.div>
        </div>
      </motion.article>
    </motion.div>
  );
}

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
            variants={revealGroup}
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
          variants={revealGroup}
          aria-label="Filter projects by category"
        >
          {PROJECT_CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              variants={childFade}
              className={`work-filter-btn${activeFilter === cat.id ? " work-filter-btn--active" : ""}`}
              onClick={() => setActiveFilter(cat.id)}
              aria-pressed={activeFilter === cat.id}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.nav>

        <AnimatePresence mode="popLayout">
          <motion.div
            className="works-editorial-grid"
            layout
            initial={false}
          >
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={setSelected}
              />
            ))}
          </motion.div>
        </AnimatePresence>
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
