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

const PROJECT_LABELS: Record<string, string> = {
  uniconv: "01",
  "mrf-rd": "02",
  "noc-portal": "05",
  eventflow: "04",
  reliefchain: "03",
  "mit-place-pro": "06",
  petcommunity: "07",
  enils: "08",
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
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true }}
          className="work-header"
        >
          <div className="work-header-left">
            <span className="section-num">02</span>
            <span className="section-label">SELECTED WORK</span>
          </div>
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
          {PROJECTS.map((project, index) => {
            const Screenshot = SCREENSHOTS[project.id];
            const num = PROJECT_LABELS[project.id] || String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={project.id}
                variants={fadeUp}
                className="work-card"
              >
                <div className="work-card-inner">
                  {/* Card number */}
                  <div className="work-card-header">
                    <span className="work-card-num tnum">{num}</span>
                    {project.featured && (
                      <span className="work-card-badge">FEATURED</span>
                    )}
                  </div>

                  {/* Screenshot */}
                  <div className="work-card-visual">
                    {Screenshot && <Screenshot />}
                  </div>

                  {/* Card info */}
                  <div className="work-card-info">
                    <h3 className="work-card-title">{project.title}</h3>
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
