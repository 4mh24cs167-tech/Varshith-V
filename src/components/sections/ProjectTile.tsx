import type { PointerEvent as ReactPointerEvent } from "react";
import type { Project } from "../../data/projects";
import { PROJECT_STATUS_LABEL } from "../../data/projects";
import { cn } from "../../lib/cn";

type ProjectTileProps = {
  project: Project;
  pinKey: string;
  pinned: boolean;
  onPin: (pinKey: string, rect: DOMRect) => void;
  onUnpin: () => void;
  onOpen: (id: string) => void;
};

export function ProjectTile({
  project,
  pinKey,
  pinned,
  onPin,
  onUnpin,
  onOpen,
}: ProjectTileProps) {
  const pin = (el: HTMLElement) => {
    onPin(pinKey, el.getBoundingClientRect());
  };

  const handlePointerEnter = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
    pin(e.currentTarget);
  };

  const handlePointerLeave = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
    onUnpin();
  };

  const handlePointerDown = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerType !== "touch") return;
    if ((e.target as HTMLElement).closest(".pg-tile-cta")) return;
    if (pinned) onUnpin();
    else pin(e.currentTarget);
  };

  return (
    <article
      className={cn("pg-tile", pinned && "is-pinned")}
      tabIndex={0}
      role="group"
      aria-label={`${project.title} — ${project.category}. Pin to pause, open case study.`}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onFocus={(e) => pin(e.currentTarget)}
      onBlur={onUnpin}
      onKeyDown={(e) => {
        if (
          (e.key === "Enter" || e.key === " ") &&
          !(e.target as HTMLElement).closest("a, button")
        ) {
          e.preventDefault();
          onOpen(project.id);
        }
      }}
    >
      <div className="pg-tile-top">
        <span className="pg-tile-num tnum">PROJECT {project.number}</span>
        <span className="pg-tile-status">
          <span className="pg-tile-dot" aria-hidden="true" />
          {PROJECT_STATUS_LABEL[project.status]}
        </span>
      </div>

      <h3 className="pg-tile-title">{project.title}</h3>
      <p className="pg-tile-cat">{project.category}</p>

      <div className="pg-tile-overlay">
        <p className="pg-tile-desc">{project.description}</p>
        <div className="pg-tile-tech">
          {project.technologies.slice(0, 4).map((t) => (
            <span key={t} className="tech-pill">
              {t}
            </span>
          ))}
          {project.technologies.length > 4 ? (
            <span className="tech-pill tech-pill--more">
              +{project.technologies.length - 4}
            </span>
          ) : null}
        </div>
        <div className="pg-tile-cta">
          {project.liveUrl ? (
            <a
              className="project-link"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="project-link-arrow">↗</span> VIEW LIVE
            </a>
          ) : null}
          <button
            type="button"
            className="project-link project-link--cta"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onOpen(project.id);
            }}
          >
            CASE STUDY <span className="project-link-arrow">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}