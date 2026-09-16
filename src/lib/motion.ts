import type { Variants } from "framer-motion";

export const EASE_SPRING: [number, number, number, number] = [0.34, 1.56, 0.64, 1];
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_EXPO: [number, number, number, number] = [0.7, 0, 0.2, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.66, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export const revealGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
};

export const lineDraw: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.9, ease: EASE_EXPO },
  },
};

export const maskUp: Variants = {
  hidden: { y: "115%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.8, ease: [0.7, 0, 0.2, 1] },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] } },
};

export const staggerFade: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};