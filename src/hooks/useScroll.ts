import { useEffect, useState } from "react";

type ScrollState = {
  scrolled: boolean;
  compact: boolean;
};

const RESET_Y = 80;
const COMPACT_DELTA = 2;

export function useScroll(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrolled: false,
    compact: false,
  });

  useEffect(() => {
    let raf = 0;
    let lastY = window.scrollY;

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;

      let compact = state.compact;
      if (y <= RESET_Y) compact = false;
      else if (delta > COMPACT_DELTA) compact = true;
      else if (delta < -COMPACT_DELTA) compact = false;

      const scrolled = y > 8;
      if (scrolled !== state.scrolled || compact !== state.compact) {
        setState({ scrolled, compact });
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [state]);

  return state;
}