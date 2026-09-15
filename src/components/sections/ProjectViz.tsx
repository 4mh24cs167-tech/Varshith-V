import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { EASE_EXPO } from "../../lib/motion";

type Props = { projectId: string };

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const nodeVariant = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_EXPO } },
};

const lineVariant = {
  hidden: { pathLength: 0 },
  show: { pathLength: 1, transition: { duration: 0.9, ease: EASE_EXPO } },
};

const INK = "#F3F2F1";
const BLUE = "#246BFE";
const NAVY = "#6B93D6";
const LINE = "#4A4E56";

function UniconvViz() {
  return (
    <motion.svg viewBox="0 0 280 200" fill="none" aria-hidden="true" className="viz-svg">
      <motion.g variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
        {["FILE", "CONVERT", "OUTPUT"].map((label, i) => (
          <motion.g key={label} variants={nodeVariant}>
            <rect x={i * 100 + 10} y={60} width={70} height={36} rx={6} stroke={NAVY} strokeWidth={1.5} fill="none" />
            <text x={i * 100 + 45} y={82} textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill={INK}>{label}</text>
          </motion.g>
        ))}
        {["1","2"].map((k) => (
          <motion.line key={k} x1={100} y1={78} x2={110} y2={78} stroke={BLUE} strokeWidth={1.5} variants={lineVariant} />
        ))}
        <motion.text x={140} y={140} textAnchor="middle" fontSize={9} fontFamily="var(--font-mono)" fill={BLUE} variants={nodeVariant}>FFmpeg · OpenCV · Tesseract</motion.text>
        <motion.circle cx={140} cy={170} r={3} fill={BLUE} variants={nodeVariant} />
      </motion.g>
    </motion.svg>
  );
}

function MitViz() {
  const roles = ["STUDENT", "COMPANY", "ADMIN"];
  return (
    <motion.svg viewBox="0 0 280 200" fill="none" aria-hidden="true" className="viz-svg">
      <motion.g variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
        {roles.map((r, i) => (
          <motion.g key={r} variants={nodeVariant}>
            <rect x={20 + i * 86} y={30} width={70} height={30} rx={6} stroke={NAVY} strokeWidth={1.5} fill="none" />
            <text x={55 + i * 86} y={49} textAnchor="middle" fontSize={9} fontFamily="var(--font-mono)" fill={INK}>{r}</text>
            <motion.line x1={55 + i * 86} y1={60} x2={140} y2={96} stroke={LINE} strokeWidth={1} variants={lineVariant} />
          </motion.g>
        ))}
        <motion.g variants={nodeVariant}>
          <rect x={105} y={90} width={70} height={28} rx={6} stroke={BLUE} strokeWidth={1.5} fill="none" />
          <text x={140} y={108} textAnchor="middle" fontSize={9} fontFamily="var(--font-mono)" fill={BLUE}>NESTJS API</text>
        </motion.g>
        <motion.g variants={nodeVariant}>
          <rect x={105} y={136} width={70} height={28} rx={6} stroke={NAVY} strokeWidth={1.5} fill="none" />
          <text x={140} y={154} textAnchor="middle" fontSize={9} fontFamily="var(--font-mono)" fill={INK}>POSTGRESQL</text>
        </motion.g>
        <motion.line x1={140} y1={118} x2={140} y2={136} stroke={BLUE} strokeWidth={1.5} variants={lineVariant} />
      </motion.g>
    </motion.svg>
  );
}

function EventflowViz() {
  const stages = ["DRAFT", "PENDING", "APPROVED", "COMPLETED"];
  return (
    <motion.svg viewBox="0 0 280 200" fill="none" aria-hidden="true" className="viz-svg">
      <motion.g variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
        {stages.map((s, i) => (
          <motion.g key={s} variants={nodeVariant}>
            <circle cx={50 + i * 60} cy={80} r={20} stroke={i === 2 ? BLUE : NAVY} strokeWidth={1.5} fill="none" />
            <text x={50 + i * 60} y={83} textAnchor="middle" fontSize={7.5} fontFamily="var(--font-mono)" fill={i === 2 ? BLUE : INK}>{s}</text>
            {i < 3 ? <motion.line x1={70 + i * 60} y1={80} x2={90 + i * 60} y2={80} stroke={LINE} strokeWidth={1} variants={lineVariant} /> : null}
          </motion.g>
        ))}
        <motion.text x={140} y={140} textAnchor="middle" fontSize={9} fontFamily="var(--font-mono)" fill={BLUE} variants={nodeVariant}>PRINCIPAL · HOD · ADMIN</motion.text>
        <motion.circle cx={140} cy={164} r={3} fill={BLUE} variants={nodeVariant} />
      </motion.g>
    </motion.svg>
  );
}

function PetViz() {
  const nodes = ["PET", "HOSPITAL", "COMMUNITY", "PREMIUM"];
  const positions = nodes.map((_, i) => ({
    x: 140 + Math.cos((i / nodes.length) * Math.PI * 2 - Math.PI / 2) * 60,
    y: 100 + Math.sin((i / nodes.length) * Math.PI * 2 - Math.PI / 2) * 54,
  }));
  return (
    <motion.svg viewBox="0 0 280 200" fill="none" aria-hidden="true" className="viz-svg">
      <motion.g variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <motion.circle cx={140} cy={100} r={16} stroke={BLUE} strokeWidth={1.5} fill="none" variants={nodeVariant} />
        <motion.text x={140} y={103} textAnchor="middle" fontSize={8} fontFamily="var(--font-mono)" fill={BLUE} variants={nodeVariant}>OWNER</motion.text>
        {nodes.map((n, i) => (
          <motion.g key={n} variants={nodeVariant}>
            <motion.line x1={140} y1={100} x2={positions[i].x} y2={positions[i].y} stroke={LINE} strokeWidth={1} variants={lineVariant} />
            <circle cx={positions[i].x} cy={positions[i].y} r={14} stroke={NAVY} strokeWidth={1.5} fill="none" />
            <text x={positions[i].x} y={positions[i].y + 3} textAnchor="middle" fontSize={7} fontFamily="var(--font-mono)" fill={INK}>{n}</text>
          </motion.g>
        ))}
      </motion.g>
    </motion.svg>
  );
}

const vizMap: Record<string, ComponentType> = {
  uniconv: UniconvViz,
  "mit-place-pro": MitViz,
  eventflow: EventflowViz,
  petcommunity: PetViz,
};

export function ProjectViz({ projectId }: Props) {
  const Viz = vizMap[projectId];
  if (!Viz) return null;
  return (
    <motion.div
      className="project-viz-inner"
      initial={false}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25, ease: EASE_EXPO }}
    >
      <Viz />
    </motion.div>
  );
}