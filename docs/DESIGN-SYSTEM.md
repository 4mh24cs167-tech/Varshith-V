# VARSHITH — Design System v3: Editorial Dark

Internal reference for the dark editorial identity, inspired by
just-a-web-developer.com. Single source of truth:
`src/styles/tokens.css` (Tailwind CSS v4 `@theme` block).

Stack: Vite 8.3 / React 19.3 / TypeScript 7 / Tailwind CSS v4 (CSS-first) /
framer-motion 13.3.

## 1. Identity

**BUILT. SHIPPED. LIVE.** A dark editorial canvas: near-black base, warm-white
type, blue reserved for interaction/technology. Poppins display headlines,
Inter body, JetBrains Mono labels. No VGD, no gradients, no glass, no neon.

- Name: **VARSHITH V**
- Tagline: Full-Stack Developer · 8.74 CGPA B.E. CSE at MITM
- Fonts: **Poppins** (display, 600–800), **Inter** (body 400–600),
  **JetBrains Mono** (labels/meta, uppercase)
- Blue (`#246BFE`) = interaction/active/progress/technology only
- Dark base = calm, editorial; warm-white text = readability on near-black

## 2. Colors

| Token | Value | Role |
| --- | --- | --- |
| `--color-background` | `#0B0B0D` | Page base (near-black) |
| `--color-surface` | `#141418` | Cards, panels, modals |
| `--color-surface-soft` | `#1A1A1F` | Subtle fill shifts |
| `--color-surface-2` | `#1E1E24` | Chips, tags |
| `--color-text` | `#F3F2F1` | Primary text (warm white) |
| `--color-text-secondary` | `#A6A6A0` | Supporting copy |
| `--color-text-muted` | `#62666D` | Captions |
| `--color-text-faint` | `#4A4E56` | Labels, metadata |
| `--color-navy` | `#123B72` | Deep accents, links |
| `--color-accent` | `#246BFE` | Interaction, progress, tech |
| `--color-accent-soft` | `rgb(36 107 254 / 0.15)` | Tint, focus ring |
| `--color-accent-faint` | `rgb(36 107 254 / 0.06)` | Faint tint |
| `--color-line` | `#222228` | Hairline dividers |
| `--color-border` | `rgba(255,255,255,0.08)` | Standard borders |

**Rules:** Blue stays under ~15% of any visible interface. No light mode, no
gradients, no rainbow.

## 3. Typography

**Poppins** — display, H1–H3, buttons, wordmark. **Inter** — body copy.
**JetBrains Mono** — labels, nav, metadata, console, stat era. Fluid via `clamp()`.

| Level | Token | Range |
| --- | --- | --- |
| Display | `--type-display` | 52–152px |
| Display-sm | `--type-display-sm` | 40–88px |
| H1 | `--type-h1` | 32–72px |
| H2 | `--type-h2` | 26–48px |
| H3 | `--type-h3` | 20–28px |
| Statement | `--type-statement` | 30–54px |
| Body-lg | `--type-body-lg` | 17–21px |
| Body | `--type-body` | 16px |
| Small | `--type-small` | 14px |
| Micro | `--type-micro` | 12px |

**Type classes:** `.text-display`, `.text-h1`…`.text-h3`, `.text-statement`,
`.text-body-lg`, `.text-body`, `.text-small`, `.text-micro`, `.text-label`
(uppercase mono), `.tnum` (tabular figures), `.measure` (68ch).

Headings use `text-wrap: balance`; paragraphs `text-wrap: pretty`.

## 4. Spacing

4px base unit. Named tokens `--space-1`…`--space-48` (4, 8, 12, 16, 24, 32,
40, 48, 64, 80, 96, 128, 160, 192px). Section rhythm: `.section`
(72–144px), `.section--spacious` (88–176px), `.section--compact` (40–64px).

## 5. Layout

Container: `max-width: 90rem` (1440px), fluid gutter
`clamp(1.25rem, 0.4rem + 3.2vw, 3rem)`. Reading measure: `.measure` (68ch),
`.measure-narrow` (56ch). Anchors get `scroll-margin-top: 6.5rem` so section
tops clear the fixed header.

## 6. Border radius

6px xs · 8px sm · 12px md · 16px lg · 9999px full. No pill-everywhere.

## 7. Shadows

`--shadow-raised` (cards), `--shadow-elevated` (dialog), `--shadow-overlay`
(modal backdrop). Soft black only.

## 8. Banner / Sections

Page order: Hero → StatementBand → About → Work → TechMarquee → Stats
→ FAQ → Contact → Footer.

- **Hero** (`.hero-section`): eyebrow, `hero-headline` (Full-Stack Developer /
  pursued CTO), portrait collage (`.hero-portrait-main` from
  `/images/profile.png`), chips, CTAs (#work/#contact), meta footer.
- **StatementBand** (`.statement-band`): display quote — honest position
  "I don't sell systems. I build them."
- **About** (`.about-grid`): editorial essay + `.about-facts` (3 facts:
  ROLE / DEGREE / CGPA).
- **Work** (`.works-grid`): 4 `.work-card` articles with `ProjectViz` SVG
  diagram, meta, category/year/status. Click opens `ProjectDetail` modal.
- **TechMarquee** (`.marquee-track`): 24 tech labels in a slow scrolling ticker
  (`--duration-slower`/850ms-per-step), duplicated for seamless loop.
- **Stats** (`.stats-grid`): animated count-up — 8.74 CGPA / 4 systems /
  12+ months / 4 live at MITM.
- **FAQ** (`.faq-section`): 5 accordion items, first open, `aria-expanded`.
- **Contact** (`.contact-grid`): mailto form (mailto prefilled), email/
  LinkedIn/resume links, availability status, socials.
- **Footer** (`.site-footer`): wordmark + tagline + copy + back-to-top.

## 9. Navigation

**Header** (`.site-header`): fixed, transparent at top, solid on scroll
(`data-solid`). 4rem height. Wordmark + `.nav-desktop`.

**Desktop nav** (`.nav-desktop`): 4 links (about / selected works / FAQ /
contact), active underline. Scroll-spy via `useActiveSection`.

**Mobile menu** (`#site-menu`): full-screen overlay, focus trap, Escape close,
scroll lock, `inert` background. Toggle = `.hamburger` (visible < 46rem).

**Breakpoints:** nav collapses at 46rem (736px). Content columns stack at
52rem (832px).

## 10. Motion

`EASE` [0.16,1,0.3,1], `EASE_EXPO` [0.7,0,0.2,1]. Variants: `fadeUp`,
`fadeIn`, `revealGroup`, `lineDraw`, `maskUp`. All gated by
`useReducedMotion()`. `prefers-reduced-motion: reduce` compresses everything
to ~0.

**Page transition:** first-visit 900ms, returning 420ms (sessionStorage
`varshith.seen.v2`). Skipped entirely under reduced motion.

## 11. Effects

- **BlueprintField** — full-viewport canvas, grid, drifting node clusters,
  pointer repulsion, blue signal pulses. Pauses on hidden tab. Static frame
  under reduced motion. Ink = warm-white (#F3F2F1) tuned for dark.
- **TraceCursor** — thin blue trace (700ms lifetime). pointer:fine only,
  ≥768px, no reduced motion. Dashed over interactive elements.
- **PageTransition** — blue progress bar overlay, auto-dismisses.
- **ConsoleEgg** — Ctrl/Cmd+/ toggles engineering console (help, status,
  stack, build, clear, exit).
- **ProjectViz** — per-project SVG architecture diagram (`INK`, `NAVY`,
  `LINE` tuned for dark).

## 12. Accessibility

- Focus ring: 2px accent, 3px offset.
- Interactive targets ≥44px.
- `prefers-reduced-motion` disables all animation.
- Semantic HTML, `aria-labelledby` on sections.
- Mobile menu: focus trap, Escape, scroll lock, inert background.
- Project dialog: focus moves inside, Escape closes, scroll restores.

## 13. Responsive & QA

320–2560px tested across 14 viewports. `verify.mjs` asserts zero horizontal
overflow, fixed header behavior, section order (hero/about/work/faq/contact),
dialog open/close/focus, FAQ toggle, animated stat counters, mailto + socials +
resume links, active-nav scroll-spy, anchor clearance under fixed header,
mobile menu focus trap, reduced-motion instant readability, console egg, and
no console errors. Current: **VERIFY: PASS** on all 14 viewports.

## 14. Source map

| File | Purpose |
| --- | --- |
| `src/styles/tokens.css` | All design tokens (v3 editorial dark) |
| `src/styles/base.css` | Reset, selection, scrollbar, reduced-motion |
| `src/styles/typography.css` | Type scale classes (Poppins/Inter/JetBrains) |
| `src/styles/layout.css` | Container, section, panel, ratios, scroll-margin |
| `src/styles/components.css` | All component styles |
| `src/lib/motion.ts` | framer-motion variants |
| `src/data/site.ts` | Profile, resume, contact, role constants |
| `src/App.tsx` | Shell composition + scroll-spy |
| `verify.mjs` | QA harness (14 viewports + behaviors) |