import { useEffect, useState } from "react";

function idsKey(ids: readonly string[]) {
  return ids.join(",");
}

/**
 * Tracks which section is "currently being viewed" using a reading line:
 * the section whose top edge has crossed a fixed line at 45% of the
 * viewport height is active. When two sections straddle the line the later
 * one (greatest top) wins, so the state flips exactly once per boundary and
 * never flickers while scrolling in either direction or after anchor jumps.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = idsKey(ids);

  useEffect(() => {
    if (!ids.length) return;
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const inBand = new Set<string>();

    const resolve = () => {
      const line = window.innerHeight * 0.45;
      let crossed: HTMLElement | null = null;
      let crossedTop = -Infinity;
      for (const el of els) {
        if (!inBand.has(el.id)) continue;
        const top = el.getBoundingClientRect().top;
        if (top < line && top > crossedTop) {
          crossed = el;
          crossedTop = top;
        }
      }

      let next: string | null = crossed ? crossed.id : null;

      // Tail rule: the reading line sits at 45% of the viewport, but the final
      // section can't reach it when trailing footer content runs out first.
      // Only when the page is truly pinned to its bottom (no further scroll)
      // does the last tracked section own the active state.
      const last = els[els.length - 1];
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
      if (atBottom && last) {
        const r = last.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) next = last.id;
      }

      if (!next) {
        // Nothing has crossed the line yet (top of page, or a gap): fall back
        // to the topmost section still touching the band.
        let nearest: HTMLElement | null = null;
        let nearestTop = Infinity;
        for (const el of els) {
          if (!inBand.has(el.id)) continue;
          const top = el.getBoundingClientRect().top;
          if (top < nearestTop) {
            nearest = el;
            nearestTop = top;
          }
        }
        next = nearest ? nearest.id : null;
      }

      setActive(next);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }
        resolve();
      },
      { rootMargin: "0px 0px -55% 0px", threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    resolve();

    // Anchor jumps can land with no intersection change (e.g. straight to the
    // page bottom), so resolve once per scroll frame as well.
    let pending = 0;
    const onScroll = () => {
      clearTimeout(pending);
      pending = setTimeout(resolve, 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      clearTimeout(pending);
      window.removeEventListener("scroll", onScroll);
    };
    // ids is represented by its joined key; elements re-observed on change.
  }, [key]);

  return active;
}