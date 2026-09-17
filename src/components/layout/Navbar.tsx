import { useState, useEffect } from "react";
import { YVBCO_URL } from "../../data/site";

type NavbarProps = {
  menuOpen: boolean;
  onMenuToggle: () => void;
  menuTriggerRef: React.RefObject<HTMLButtonElement | null>;
  activeSection?: string | null;
};

export const NAV_IDS = ["hero", "about", "work", "skills", "contact"] as const;
export const NAV_ITEMS = [
  { id: "hero", label: "HOME", num: "01" },
  { id: "about", label: "ABOUT", num: "02" },
  { id: "work", label: "WORK", num: "03" },
  { id: "skills", label: "EXPERTISE", num: "04" },
  { id: "contact", label: "CONTACT", num: "05" },
] as const;

export function Navbar({ menuOpen, onMenuToggle, menuTriggerRef, activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar-inner container">
        <a href="#hero" className="navbar-logo">
          <span className="navbar-logo-name">VARSHITH V</span>
        </a>

        <nav className="navbar-nav" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`navbar-link ${activeSection === item.id ? "navbar-link--active" : ""}`}
            >
              <span className="navbar-link-num tnum">{item.num}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="navbar-actions">
          <a href={YVBCO_URL} target="_blank" rel="noreferrer" className="navbar-link navbar-link--sm">
            STUDIO
          </a>
          <button
            type="button"
            className={`navbar-burger ${menuOpen ? "is-active" : ""}`}
            onClick={onMenuToggle}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            ref={menuTriggerRef}
          >
            <span className="navbar-burger-line" />
            <span className="navbar-burger-line" />
          </button>
        </div>
      </div>
    </header>
  );
}
