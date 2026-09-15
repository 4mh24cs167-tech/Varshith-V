import { motion } from "framer-motion";
import { EASE_EXPO } from "../../lib/motion";

const INK = "#F3F2F1";
const BLUE = "#246BFE";
const NAVY = "#6B93D6";
const LINE = "#3A3D45";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const n = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.45, ease: EASE_EXPO } },
};

function MRFViz() {
  return (
    <motion.svg viewBox="0 0 180 130" fill="none" className="thumb-svg">
      <motion.g variants={stagger} initial="hidden" animate="show">
        {[
          { x: 90, y: 30, r: 10 },
          { x: 40, y: 70, r: 8 },
          { x: 140, y: 70, r: 8 },
          { x: 60, y: 110, r: 7 },
          { x: 120, y: 110, r: 7 },
        ].map((c, i) => (
          <motion.g key={i} variants={n}>
            <circle cx={c.x} cy={c.y} r={c.r} stroke={i === 0 ? BLUE : NAVY} strokeWidth={1.2} fill="none" />
            <text x={c.x} y={c.y + 3} textAnchor="middle" fontSize={5} fontFamily="var(--font-mono)" fill={i === 0 ? BLUE : INK}>
              {["R&D", "IDEA", "PUBL", "TEAM", "DATA"][i]}
            </text>
          </motion.g>
        ))}
        {[[90, 30, 40, 70], [90, 30, 140, 70], [40, 70, 60, 110], [140, 70, 120, 110]].map(([x1, y1, x2, y2], i) => (
          <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={LINE} strokeWidth={0.8} variants={n} />
        ))}
      </motion.g>
    </motion.svg>
  );
}

function NocViz() {
  const steps = ["REQ", "VER", "DEPT", "OK"];
  return (
    <motion.svg viewBox="0 0 180 130" fill="none" className="thumb-svg">
      <motion.g variants={stagger} initial="hidden" animate="show">
        {steps.map((s, i) => (
          <motion.g key={s} variants={n}>
            <rect x={14 + i * 40} y={50} width={32} height={22} rx={3} stroke={i === 3 ? BLUE : NAVY} strokeWidth={1.2} fill={i === 3 ? "rgba(36,107,254,0.12)" : "none"} />
            <text x={30 + i * 40} y={64} textAnchor="middle" fontSize={5.5} fontFamily="var(--font-mono)" fill={i === 3 ? BLUE : INK}>{s}</text>
          </motion.g>
        ))}
        {[0, 1, 2].map(k => (
          <motion.line key={k} x1={46 + k * 40} y1={61} x2={54 + k * 40} y2={61} stroke={k === 2 ? BLUE : LINE} strokeWidth={1} variants={n} />
        ))}
        <motion.text x={90} y={100} textAnchor="middle" fontSize={5} fontFamily="var(--font-mono)" fill={BLUE} variants={n}>CLEARANCE</motion.text>
      </motion.g>
    </motion.svg>
  );
}

function EventViz() {
  const stages = ["DR", "PD", "AP", "DN"];
  return (
    <motion.svg viewBox="0 0 180 130" fill="none" className="thumb-svg">
      <motion.g variants={stagger} initial="hidden" animate="show">
        {stages.map((s, i) => (
          <motion.g key={s} variants={n}>
            <circle cx={30 + i * 40} cy={60} r={14} stroke={i === 2 ? BLUE : NAVY} strokeWidth={1.2} fill={i === 2 ? "rgba(36,107,254,0.1)" : "none"} />
            <text x={30 + i * 40} y={63} textAnchor="middle" fontSize={5.5} fontFamily="var(--font-mono)" fill={i === 2 ? BLUE : INK}>{s}</text>
          </motion.g>
        ))}
        {[0, 1, 2].map(k => (
          <motion.line key={k} x1={44 + k * 40} y1={60} x2={56 + k * 40} y2={60} stroke={k === 1 ? BLUE : LINE} strokeWidth={1} variants={n} />
        ))}
      </motion.g>
    </motion.svg>
  );
}

function ReliefViz() {
  const steps = ["DON", "VER", "ALC", "IMP"];
  return (
    <motion.svg viewBox="0 0 180 130" fill="none" className="thumb-svg">
      <motion.g variants={stagger} initial="hidden" animate="show">
        {steps.map((s, i) => (
          <motion.g key={s} variants={n}>
            <rect x={12 + i * 42} y={50} width={30} height={20} rx={3} stroke={i === 1 || i === 3 ? BLUE : NAVY} strokeWidth={1.2} fill={i === 0 ? "rgba(36,107,254,0.08)" : "none"} />
            <text x={27 + i * 42} y={63} textAnchor="middle" fontSize={5} fontFamily="var(--font-mono)" fill={i === 0 ? BLUE : INK}>{s}</text>
          </motion.g>
        ))}
        {[0, 1, 2].map(k => (
          <motion.line key={k} x1={42 + k * 42} y1={60} x2={54 + k * 42} y2={60} stroke={BLUE} strokeWidth={1} variants={n} />
        ))}
        <motion.text x={90} y={105} textAnchor="middle" fontSize={5} fontFamily="var(--font-mono)" fill={BLUE} variants={n}>TRANSPARENT</motion.text>
      </motion.g>
    </motion.svg>
  );
}

function PlaceViz() {
  const roles = ["STU", "CO", "ADM"];
  return (
    <motion.svg viewBox="0 0 180 130" fill="none" className="thumb-svg">
      <motion.g variants={stagger} initial="hidden" animate="show">
        {roles.map((r, i) => (
          <motion.g key={r} variants={n}>
            <rect x={20 + i * 52} y={28} width={38} height={18} rx={4} stroke={NAVY} strokeWidth={1} fill="none" />
            <text x={39 + i * 52} y={40} textAnchor="middle" fontSize={5} fontFamily="var(--font-mono)" fill={INK}>{r}</text>
          </motion.g>
        ))}
        {[0, 1, 2].map(i => (
          <motion.line key={i} x1={39 + i * 52} y1={46} x2={90} y2={66} stroke={LINE} strokeWidth={0.6} variants={n} />
        ))}
        <motion.rect x={65} y={64} width={50} height={18} rx={4} stroke={BLUE} strokeWidth={1.2} fill="rgba(36,107,254,0.08)" variants={n} />
        <motion.text x={90} y={76} textAnchor="middle" fontSize={5.5} fontFamily="var(--font-mono)" fill={BLUE} variants={n}>API</motion.text>
      </motion.g>
    </motion.svg>
  );
}

function PetViz() {
  return (
    <motion.svg viewBox="0 0 180 130" fill="none" className="thumb-svg">
      <motion.g variants={stagger} initial="hidden" animate="show">
        <motion.circle cx={90} cy={60} r={12} stroke={BLUE} strokeWidth={1.2} fill="rgba(36,107,254,0.1)" variants={n} />
        <motion.text x={90} y={63} textAnchor="middle" fontSize={5} fontFamily="var(--font-mono)" fill={BLUE} variants={n}>ME</motion.text>
        {["PET", "DOC", "COM", "PREM"].map((l, i) => {
          const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
          const cx = 90 + Math.cos(angle) * 36;
          const cy = 60 + Math.sin(angle) * 32;
          return (
            <motion.g key={l} variants={n}>
              <motion.line x1={90} y1={60} x2={cx} y2={cy} stroke={LINE} strokeWidth={0.7} variants={n} />
              <circle cx={cx} cy={cy} r={9} stroke={NAVY} strokeWidth={1} fill="none" />
              <text x={cx} y={cy + 2.5} textAnchor="middle" fontSize={4.5} fontFamily="var(--font-mono)" fill={INK}>{l}</text>
            </motion.g>
          );
        })}
      </motion.g>
    </motion.svg>
  );
}

function UniconvThumb() {
  const steps = ["FILE", "OUT"];
  return (
    <motion.svg viewBox="0 0 180 130" fill="none" className="thumb-svg">
      <motion.g variants={stagger} initial="hidden" animate="show">
        {steps.map((s, i) => (
          <motion.g key={s} variants={n}>
            <rect x={30 + i * 70} y={48} width={50} height={26} rx={5} stroke={i === 0 ? BLUE : NAVY} strokeWidth={1.2} fill={i === 0 ? "rgba(36,107,254,0.1)" : "none"} />
            <text x={55 + i * 70} y={65} textAnchor="middle" fontSize={6} fontFamily="var(--font-mono)" fill={i === 0 ? BLUE : INK}>{s}</text>
          </motion.g>
        ))}
        <motion.line x1={80} y1={61} x2={100} y2={61} stroke={BLUE} strokeWidth={1.2} variants={n} />
        <motion.text x={90} y={100} textAnchor="middle" fontSize={5} fontFamily="var(--font-mono)" fill={BLUE} variants={n}>FFmpeg · OpenCV</motion.text>
      </motion.g>
    </motion.svg>
  );
}

const vizMap: Record<string, React.ComponentType> = {
  uniconv: UniconvThumb,
  "mrf-rd": MRFViz,
  "noc-portal": NocViz,
  eventflow: EventViz,
  reliefchain: ReliefViz,
  "mit-place-pro": PlaceViz,
  petcommunity: PetViz,
};

type Props = { projectId: string };

export function ProjectThumb({ projectId }: Props) {
  const Viz = vizMap[projectId];
  if (!Viz) return null;
  return (
    <div className="thumb-wrap">
      <Viz />
    </div>
  );
}
