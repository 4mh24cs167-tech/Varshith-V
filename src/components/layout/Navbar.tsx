import type { RefObject } from "react";
import { cn } from "../../lib/cn";
import { useScroll } from "../../hooks/useScroll";
import { NavLink } from "../ui/NavLink";

export const NAV_ITEMS = [
  { id: "about", label: "About", num: "01" },
  { id: "work", label: "Selected Works", num: "02" },
  { id: "faq", label: "FAQ", num: "03" },
  { id: "contact", label: "Contact", num: "04" },
] as const;

export const NAV_IDS = NAV_ITEMS.map((item) => item.id);

type NavbarProps = {
  activeSection?: string | null;
  menuOpen: boolean;
  onMenuToggle: () => void;
  menuTriggerRef: RefObject<HTMLButtonElement | null>;
};

export function Navbar({
  activeSection,
  menuOpen,
  onMenuToggle,
  menuTriggerRef,
}: NavbarProps) {
  const { scrolled } = useScroll();
  const solid = scrolled || menuOpen;

  return (
    <header
      className={cn("site-header")}
      data-solid={solid || undefined}
      data-open={menuOpen || undefined}
    >
      <div className="container header-inner">
        <a href="#top" className="wordmark" aria-label="VARSHITH, back to top">
          VARSHITH<span className="wordmark-mark"> V</span>
        </a>

        <nav className="nav-desktop" aria-label="Primary">
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <NavLink href={`#${item.id}`} active={activeSection === item.id}>
                  <span className="nav-num tnum" aria-hidden="true">
                    {item.num}
                  </span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <button
            ref={menuTriggerRef}
            type="button"
            className="hamburger"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            data-open={menuOpen || undefined}
            onClick={onMenuToggle}
          >
            <span className="hamburger-lines" aria-hidden="true">
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}