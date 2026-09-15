import { useCallback, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { Section } from "../layout/Section";
import {
  PROJECTS,
  PROJECT_STATUS_LABEL,
  PROJECT_CATEGORIES,
} from "../../data/projects";
import type { Project, ProjectCategory } from "../../data/projects";
import { ProjectDetail } from "./ProjectDetail";
import { ProjectThumb } from "./ProjectThumb";
import { WorkField } from "../effects/WorkField";
import { EASE_EXPO } from "../../lib/motion";

/* ── stagger helpers ────────────────────────────────────────── */
const rowStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const rowFade = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_EXPO } },
};
const filterFade = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_EXPO } },
};

/* ── Work Row ───────────────────────────────────────────────── */
function WorkRow({
  project,
  onSelect,
  reduce,
}: {
  project: Project;
  onSelect: (id: string) => void;
  reduce: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);

  /* cursor-tracking spring values */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const imgOpacity = useMotionValue(0);
  const springX = useSpring(mouseX, {
    stiffness: 130,
    damping: 20,
    mass: 0.5,
  });
  const springY = useSpring(mouseY, {
    stiffness: 130,
    damping: 20,
    mass: 0.5,
  });
  const springOpacity = useSpring(imgOpacity, {
    stiffness: 260,
    damping: 30,
  });

  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || inView) return;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        },
        { threshold: 0.12 },
      );
      obs.observe(node);
    },
    [inView],
  );

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      /* clamp so preview stays within row bounds */
      const clampedX = Math.max(120, Math.min(rect.width - 120, relX));
      const clampedY = Math.max(0, Math.min(rect.height, relY));
      mouseX.set(clampedX);
      mouseY.set(clampedY);
      imgOpacity.set(reduce ? 0 : 1);
    },
    [mouseX, mouseY, imgOpacity, reduce],
  );

  const onLeave = useCallback(() => {
    setHovered(false);
    imgOpacity.set(0);
  }, [imgOpacity]);

  const showPreview = !reduce;

  return (
    <div ref={setRef} className="work-row-outer">
      <motion.article
        className={`work-row${hovered ? " is-hover" : ""}`}
        role="button"
        tabIndex={0}
        aria-label={`Open ${project.title} case study`}
        variants={rowFade}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={() => onSelect(project.id)}
        onFocus={() => setHovered(true)}
        onBlur={onLeave}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(project.id);
          }
        }}
        whileHover={reduce ? undefined : { y: -2 }}
        transition={{ duration: 0.2, ease: EASE_EXPO }}
      >
        {/* background expansion bar */}
        <motion.div
          className="work-row-bg"
          initial={false}
          animate={
            hovered
              ? { scaleY: 1, opacity: 1 }
              : { scaleY: 0, opacity: 0 }
          }
          style={{ originY: 0 }}
          transition={{ duration: 0.35, ease: EASE_EXPO }}
          aria-hidden="true"
        />

        <div className="work-row-content">
          {/* compact row */}
          <div className="work-row-main">
            <div className="work-row-num tnum">{project.number}</div>
            <h3 className="work-row-title">{project.title}</h3>
            <div className="work-row-cat">{project.category}</div>
            <div className="work-row-status">
              {PROJECT_STATUS_LABEL[project.status]}
              {project.year ? <span className="work-row-dot">·</span> : null}
              {project.year ? <span>{project.year}</span> : null}
            </div>
            <span className="work-row-arrow" aria-hidden="true">
              →
            </span>
          </div>

          {/* expanded content */}
          <AnimatePresence initial={false}>
            {hovered && (
              <motion.div
                className="work-row-expanded"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE_EXPO }}
              >
                <p className="work-row-desc">{project.description}</p>
                <div className="work-row-tech">
                  {project.technologies.slice(0, 6).map((t) => (
                    <span key={t} className="tech-pill">
                      {t}
                    </span>
                  ))}
                  {project.technologies.length > 6 ? (
                    <span className="tech-pill tech-pill--more">
                      +{project.technologies.length - 6}
                    </span>
                  ) : null}
                </div>
                <div className="work-row-links">
                  {project.liveUrl ? (
                    <a
                      className="project-link"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="project-link-arrow">↗</span> LIVE
                    </a>
                  ) : null}
                  {project.sourceUrl ? (
                    <a
                      className="project-link"
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="project-link-arrow">↗</span> SOURCE
                    </a>
                  ) : null}
                  <span className="project-link project-link--cta">
                    CASE STUDY <span className="project-link-arrow">→</span>
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* floating preview — desktop only */}
        {showPreview && (
          <motion.div
            className="work-row-preview"
            style={{
              x: springX,
              y: springY,
              opacity: springOpacity,
            }}
            aria-hidden="true"
          >
            {project.previewImage ? (
              <img
                src={project.previewImage}
                alt=""
                className="work-preview-img"
                loading="lazy"
                width={240}
                height={340}
              />
            ) : (
              <ProjectThumb projectId={project.id} />
            )}
          </motion.div>
        )}
      </motion.article>
    </div>
  );
}

/* ── Work Section ───────────────────────────────────────────── */
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
        <WorkField />

        <div className="works-header">
          <motion.div
            initial={anim ? "hidden" : false}
            whileInView={anim ? "show" : undefined}
            viewport={{ once: true, margin: "-12% 0px" }}
            variants={rowStagger}
          >
            <motion.p variants={filterFade} className="hero-eyebrow">
              Selected works
            </motion.p>
            <motion.h2
              variants={filterFade}
              id="work-title"
              className="works-header-title"
            >
              Selected
              <br />
              works
            </motion.h2>
            <motion.p variants={filterFade} className="works-header-sub">
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
          variants={rowStagger}
          aria-label="Filter projects by category"
        >
          {PROJECT_CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              variants={filterFade}
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
            className="work-rows"
            layout
            key={activeFilter}
            initial="hidden"
            animate="show"
            variants={rowStagger}
          >
            {filtered.map((project) => (
              <WorkRow
                key={project.id}
                project={project}
                onSelect={setSelected}
                reduce={Boolean(reduce)}
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
