import { useCallback, useRef, useState } from "react";
import { Navbar, NAV_IDS } from "./components/layout/Navbar";
import { MobileMenu } from "./components/layout/MobileMenu";
import { Footer } from "./components/layout/Footer";
import { PageTransition } from "./components/effects/PageTransition";
import { EngineeringField } from "./components/effects/EngineeringField";
import { TraceCursor } from "./components/effects/TraceCursor";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { YvbCo } from "./components/sections/YvbCo";
import { StatementBand } from "./components/sections/StatementBand";
import { Work } from "./components/sections/Work";
import { Skills } from "./components/sections/Skills";
import { TechMarquee } from "./components/sections/TechMarquee";
import { Stats } from "./components/sections/Stats";
import { Contact } from "./components/sections/Contact";
import { useActiveSection } from "./hooks/useActiveSection";

const SECTION_IDS = [
  "hero",
  "about",
  "studio",
  "work",
  "skills",
  "contact",
] as const;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement | null>(null);
  const activeSection = useActiveSection(SECTION_IDS);
  const navActive =
    activeSection && (NAV_IDS as readonly string[]).includes(activeSection)
      ? activeSection
      : null;

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);

  return (
    <div id="top" className="app-shell">
      <PageTransition />
      <div className="noise-overlay" aria-hidden="true" />

      <div className="app-backdrop" aria-hidden="true">
        <EngineeringField />
        <TraceCursor />
      </div>

      <Navbar
        activeSection={navActive}
        menuOpen={menuOpen}
        onMenuToggle={toggleMenu}
        menuTriggerRef={menuTriggerRef}
      />
      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        triggerRef={menuTriggerRef}
        activeSection={navActive}
      />

      <main className="app-main" inert={menuOpen}>
        <Hero />
        <StatementBand />
        <About />
        <YvbCo />
        <Work />
        <Skills />
        <TechMarquee />
        <Stats />
        <Contact />
      </main>

      <Footer inert={menuOpen} />
    </div>
  );
}

export default App;