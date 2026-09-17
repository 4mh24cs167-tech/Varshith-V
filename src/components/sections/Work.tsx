import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../layout/Section";
import { fadeUp } from "../../lib/motion";
import { PROJECTS } from "../../data/projects";
import {
  UniConvScreenshot,
  MRFRDScreenshot,
  NoDuePortalScreenshot,
  EventFlowScreenshot,
  ReliefChainScreenshot,
  PlaceProScreenshot,
  PetCommunityScreenshot,
  EnilsScreenshot,
} from "./ProjectScreenshot";

const SCREENSHOTS: Record<string, React.FC> = {
  uniconv: UniConvScreenshot,
  "mrf-rd": MRFRDScreenshot,
  "noc-portal": NoDuePortalScreenshot,
  eventflow: EventFlowScreenshot,
  reliefchain: ReliefChainScreenshot,
  "mit-place-pro": PlaceProScreenshot,
  petcommunity: PetCommunityScreenshot,
  enils: EnilsScreenshot,
};

export function Work() {
  const reduce = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -400 : 400, behavior: "smooth" });
  };

  return (
    <Section id="work" className="work-section">
      <div className="container">
        <motion.div
          variants={fadeUp}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true }}
          className="work-header"
        >
          <h2 className="work-title">Selected Work</h2>
          <span className="work-subtitle">
            Real world solutions. Built with modern technologies.
          </span>

          <div className="work-nav-btns">
            <button
              className="work-nav-btn"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className="work-nav-btn"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Horizontal scroll */}
      <motion.div
        className="work-scroll-wrapper"
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true }}
      >
        <div ref={scrollRef} className="work-scroll">
          {PROJECTS.map((project) => {
            const Screenshot = SCREENSHOTS[project.id];

            return (
              <motion.div
                key={project.id}
                variants={fadeUp}
                className="work-card"
              >
                <div className="work-card-inner">
                  {/* Screenshot */}
                  <div className="work-card-visual">
                    {project.featuredImage ? (
                      <img src={project.featuredImage} alt={`${project.title} screenshot`} className="work-card-img" loading="lazy" />
                    ) : (
                      Screenshot && <Screenshot />
                    )}
                  </div>

                  {/* Card info */}
                  <div className="work-card-info">
                    <div className="work-card-header">
                      <h3 className="work-card-title">{project.shortTitle || project.title}</h3>
                      {project.featured && (
                        <span className="work-card-badge">FEATURED</span>
                      )}
                    </div>
                    <p className="work-card-category">{project.category}</p>

                    <a
                      href={project.liveUrl || `#${project.id}`}
                      className="work-card-link"
                      target={project.liveUrl ? "_blank" : undefined}
                      rel={project.liveUrl ? "noreferrer" : undefined}
                    >
                      VIEW LIVE
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M4 12L12 4M12 4H6M12 4v6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Progress bar */}
      <div className="work-progress">
        <div className="work-progress-track">
          <div className="work-progress-fill" />
        </div>
      </div>
    </Section>
  );
}
