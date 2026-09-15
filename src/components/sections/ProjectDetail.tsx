import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { PROJECTS, PROJECT_STATUS_LABEL } from "../../data/projects";
import { EASE_EXPO } from "../../lib/motion";

type Props = {
  projectId: string;
  onClose: () => void;
};

export function ProjectDetail({ projectId, onClose }: Props) {
  const project = PROJECTS.find((p) => p.id === projectId);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const prevActive = document.activeElement as HTMLElement | null;
    panel.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
      prevActive?.focus?.();
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      className="detail-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: EASE_EXPO }}
      onClick={onClose}
    >
      <motion.article
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} case study`}
        className="detail-panel"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE_EXPO }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="detail-header">
          <div>
            <div className="work-card-num">
              <span className="tnum">PROJECT {project.number}</span>{" "}
              <span>· {PROJECT_STATUS_LABEL[project.status]}</span>
            </div>
            <h2 className="detail-title">{project.title}</h2>
          </div>
          <button type="button" className="detail-close" aria-label="Close project" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="detail-body">
          <section className="detail-section">
            <h3 className="detail-section-title">Overview</h3>
            <p className="detail-section-text">{project.longDescription}</p>
          </section>

          <section className="detail-section">
            <h3 className="detail-section-title">What it does</h3>
            <ul className="detail-highlights">
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </section>

          <section className="detail-section">
            <h3 className="detail-section-title">Architecture</h3>
            <dl className="detail-arch">
              {project.architecture.map((a) => (
                <div className="detail-arch-row" key={a.node}>
                  <dt className="text-micro">{a.node}</dt>
                  <dd className="text-body">{a.detail}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="detail-section">
            <h3 className="detail-section-title">Technology</h3>
            <div className="detail-tech">
              {project.technologies.map((t) => (
                <span key={t} className="detail-tech-tag">
                  {t}
                </span>
              ))}
            </div>
          </section>

          <footer className="detail-links">
            <a className="btn btn-primary" href={project.githubUrl} target="_blank" rel="noreferrer">
              VIEW ON GITHUB
            </a>
            {project.liveUrl ? (
              <a className="btn btn-secondary" href={project.liveUrl} target="_blank" rel="noreferrer">
                LIVE DEMO
              </a>
            ) : null}
          </footer>
        </div>
      </motion.article>
    </motion.div>
  );
}