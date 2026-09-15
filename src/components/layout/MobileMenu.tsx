import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { NavLink } from "../ui/NavLink";
import { NAV_ITEMS } from "./Navbar";
import { GITHUB_ORG_URL, LINKEDIN_URL, EMAIL } from "../../data/site";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
  activeSection?: string | null;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ open, onClose, triggerRef, activeSection }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    if (!menu) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const focusMenu = () => menu.focus({ preventScroll: true });
    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.propertyName === "visibility") focusMenu();
    };
    menu.addEventListener("transitionend", onTransitionEnd);
    const guard = window.setTimeout(focusMenu, 120);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusables = Array.from(
        menu.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = document.activeElement;
      if (event.shiftKey) {
        if (current === first || !menu.contains(current)) {
          event.preventDefault();
          last.focus();
        }
      } else if (current === last || !menu.contains(current)) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      menu.removeEventListener("transitionend", onTransitionEnd);
      window.clearTimeout(guard);
      document.documentElement.style.overflow = prevOverflow;
      triggerRef.current?.focus();
    };
  }, [open, onClose, triggerRef]);

  if (!open) return null;

  return (
    <div
      id="site-menu"
      ref={menuRef}
      tabIndex={-1}
      className="menu-overlay"
      data-open={open || undefined}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <div className="container">
        <nav aria-label="Menu">
          <ul className="menu-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <NavLink
                  variant="menu"
                  href={`#${item.id}`}
                  active={activeSection === item.id}
                  onClick={onClose}
                >
                  <span className="nav-num tnum" aria-hidden="true">
                    {item.num}
                  </span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="menu-links-bottom">
            <a className="link" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <a className="link" href={GITHUB_ORG_URL} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="link" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}