import type { ComponentType, MouseEventHandler } from "react";
import { motion } from "framer-motion";
import { EASE_EXPO } from "../../lib/motion";
import { useRef, useState, useCallback } from "react";

type Props = { projectId: string; inView: boolean };

const INK = "#F3F2F1";
const BLUE = "#246BFE";
const NAVY = "#6B93D6";
const LINE = "#4A4E56";
const DIM = "#2A2D35";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const nodeIn = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_EXPO } },
};

const lineIn = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: EASE_EXPO },
  },
};

function useVizHover() {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove: MouseEventHandler = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setOffset({
      x: ((e.clientX - cx) / rect.width) * 8,
      y: ((e.clientY - cy) / rect.height) * 6,
    });
  }, []);

  const onLeave = useCallback(() => setOffset({ x: 0, y: 0 }), []);

  return { ref, offset, onMove, onLeave };
}

function VizShell({
  children,
  inView,
}: {
  children: React.ReactNode;
  inView: boolean;
}) {
  const { ref, offset, onMove, onLeave } = useVizHover();
  return (
    <div
      ref={ref}
      className="project-viz-wrap"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.svg
        viewBox="0 0 320 220"
        fill="none"
        aria-hidden="true"
        className="viz-svg"
        style={{ x: offset.x, y: offset.y, transition: "transform 0.3s ease" }}
      >
        {inView ? (
          <motion.g
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {children}
          </motion.g>
        ) : null}
      </motion.svg>
    </div>
  );
}

/* ── UniConv — File conversion pipeline ──────────────────── */
function UniconvViz({ inView }: { inView: boolean }) {
  const steps = ["FILE", "PROCESS", "OUTPUT"];
  const tools = [
    { x: 80, y: 150, label: "FFmpeg" },
    { x: 160, y: 150, label: "OpenCV" },
    { x: 240, y: 150, label: "Tesseract" },
  ];
  return (
    <VizShell inView={inView}>
      {steps.map((s, i) => (
        <motion.g key={s} variants={nodeIn}>
          <rect
            x={50 + i * 100}
            y={50}
            width={80}
            height={36}
            rx={6}
            stroke={i === 1 ? BLUE : NAVY}
            strokeWidth={1.5}
            fill={i === 1 ? "rgba(36,107,254,0.08)" : "none"}
          />
          <text
            x={90 + i * 100}
            y={72}
            textAnchor="middle"
            fontSize={10}
            fontFamily="var(--font-mono)"
            fill={i === 1 ? BLUE : INK}
          >
            {s}
          </text>
        </motion.g>
      ))}
      {[0, 1].map((k) => (
        <motion.line
          key={k}
          x1={130 + k * 100}
          y1={68}
          x2={150 + k * 100}
          y2={68}
          stroke={BLUE}
          strokeWidth={1.5}
          variants={lineIn}
        />
      ))}
      {tools.map((t) => (
        <motion.g key={t.label} variants={nodeIn}>
          <rect
            x={t.x - 28}
            y={t.y - 10}
            width={56}
            height={20}
            rx={10}
            stroke={DIM}
            strokeWidth={1}
            fill="none"
          />
          <text
            x={t.x}
            y={t.y + 4}
            textAnchor="middle"
            fontSize={8}
            fontFamily="var(--font-mono)"
            fill={LINE}
          >
            {t.label}
          </text>
        </motion.g>
      ))}
      <motion.line
        x1={90}
        y1={86}
        x2={90}
        y2={140}
        stroke={DIM}
        strokeWidth={0.8}
        strokeDasharray="4 3"
        variants={lineIn}
      />
      <motion.line
        x1={190}
        y1={86}
        x2={160}
        y2={140}
        stroke={DIM}
        strokeWidth={0.8}
        strokeDasharray="4 3"
        variants={lineIn}
      />
      <motion.line
        x1={290}
        y1={86}
        x2={240}
        y2={140}
        stroke={DIM}
        strokeWidth={0.8}
        strokeDasharray="4 3"
        variants={lineIn}
      />
      <motion.circle cx={160} cy={196} r={3} fill={BLUE} variants={nodeIn} />
    </VizShell>
  );
}

/* ── MRF R&D — Research network ──────────────────────────── */
function MrfRdViz({ inView }: { inView: boolean }) {
  const nodes = [
    { x: 160, y: 45, label: "RESEARCH", main: true },
    { x: 70, y: 105, label: "IDEAS" },
    { x: 250, y: 105, label: "PROJECTS" },
    { x: 100, y: 175, label: "TEAMS" },
    { x: 220, y: 175, label: "OUTCOMES" },
  ];
  const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 4],
    [1, 2],
    [3, 4],
  ];
  return (
    <VizShell inView={inView}>
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={LINE}
          strokeWidth={1}
          variants={lineIn}
        />
      ))}
      {nodes.map((n) => (
        <motion.g key={n.label} variants={nodeIn}>
          <circle
            cx={n.x}
            cy={n.y}
            r={n.main ? 22 : 16}
            stroke={n.main ? BLUE : NAVY}
            strokeWidth={1.5}
            fill={n.main ? "rgba(36,107,254,0.1)" : "none"}
          />
          <text
            x={n.x}
            y={n.y + 3}
            textAnchor="middle"
            fontSize={n.main ? 8 : 7}
            fontFamily="var(--font-mono)"
            fill={n.main ? BLUE : INK}
          >
            {n.label}
          </text>
        </motion.g>
      ))}
    </VizShell>
  );
}

/* ── No-Due Portal — Institutional workflow ───────────────── */
function NocPortalViz({ inView }: { inView: boolean }) {
  const steps = [
    { label: "REQUEST", active: false },
    { label: "VERIFY", active: false },
    { label: "DEPT", active: false },
    { label: "APPROVE", active: false },
    { label: "NO-DUE", active: true },
  ];
  return (
    <VizShell inView={inView}>
      {steps.map((s, i) => (
        <motion.g key={s.label} variants={nodeIn}>
          <rect
            x={24 + i * 56}
            y={72}
            width={46}
            height={28}
            rx={4}
            stroke={s.active ? BLUE : NAVY}
            strokeWidth={1.5}
            fill={s.active ? "rgba(36,107,254,0.12)" : "none"}
          />
          <text
            x={47 + i * 56}
            y={89}
            textAnchor="middle"
            fontSize={7.5}
            fontFamily="var(--font-mono)"
            fill={s.active ? BLUE : INK}
          >
            {s.label}
          </text>
        </motion.g>
      ))}
      {[0, 1, 2, 3].map((k) => (
        <motion.line
          key={k}
          x1={70 + k * 56}
          y1={86}
          x2={80 + k * 56}
          y2={86}
          stroke={k === 3 ? BLUE : LINE}
          strokeWidth={1.2}
          variants={lineIn}
        />
      ))}
      {["STUDENT", "HOD", "ADMIN"].map((role, i) => (
        <motion.g key={role} variants={nodeIn}>
          <line
            x1={47 + i * 100}
            y1={100}
            x2={47 + i * 100}
            y2={130}
            stroke={DIM}
            strokeWidth={0.7}
            strokeDasharray="3 3"
          />
          <text
            x={47 + i * 100}
            y={144}
            textAnchor="middle"
            fontSize={7}
            fontFamily="var(--font-mono)"
            fill={LINE}
          >
            {role}
          </text>
        </motion.g>
      ))}
      <motion.text
        x={160}
        y={185}
        textAnchor="middle"
        fontSize={8}
        fontFamily="var(--font-mono)"
        fill={BLUE}
        variants={nodeIn}
      >
        DIGITAL CLEARANCE PIPELINE
      </motion.text>
    </VizShell>
  );
}

/* ── Event Flow — Event lifecycle ─────────────────────────── */
function EventflowViz({ inView }: { inView: boolean }) {
  const stages = ["DRAFT", "PENDING", "APPROVED", "DONE"];
  const colors = [DIM, NAVY, BLUE, NAVY];
  return (
    <VizShell inView={inView}>
      {stages.map((s, i) => (
        <motion.g key={s} variants={nodeIn}>
          <circle
            cx={55 + i * 65}
            cy={85}
            r={22}
            stroke={colors[i]}
            strokeWidth={1.5}
            fill={i === 2 ? "rgba(36,107,254,0.1)" : "none"}
          />
          <text
            x={55 + i * 65}
            y={88}
            textAnchor="middle"
            fontSize={7.5}
            fontFamily="var(--font-mono)"
            fill={colors[i] === DIM ? LINE : colors[i]}
          >
            {s}
          </text>
        </motion.g>
      ))}
      {[0, 1, 2].map((k) => (
        <motion.line
          key={k}
          x1={77 + k * 65}
          y1={85}
          x2={83 + k * 65}
          y2={85}
          stroke={k === 1 ? BLUE : LINE}
          strokeWidth={1.2}
          variants={lineIn}
        />
      ))}
      {["PRINCIPAL", "HOD", "ADMIN"].map((role, i) => (
        <motion.g key={role} variants={nodeIn}>
          <rect
            x={50 + i * 90}
            y={130}
            width={65}
            height={22}
            rx={4}
            stroke={DIM}
            strokeWidth={0.8}
            fill="none"
          />
          <text
            x={82 + i * 90}
            y={144}
            textAnchor="middle"
            fontSize={7}
            fontFamily="var(--font-mono)"
            fill={LINE}
          >
            {role}
          </text>
        </motion.g>
      ))}
      <motion.text
        x={160}
        y={195}
        textAnchor="middle"
        fontSize={8}
        fontFamily="var(--font-mono)"
        fill={BLUE}
        variants={nodeIn}
      >
        EVENT LIFECYCLE
      </motion.text>
    </VizShell>
  );
}

/* ── ReliefChain — Transparent aid flow ───────────────────── */
function ReliefchainViz({ inView }: { inView: boolean }) {
  const steps = [
    { label: "DONATION", x: 45 },
    { label: "VERIFY", x: 115 },
    { label: "ALLOCATE", x: 185 },
    { label: "DELIVER", x: 255 },
  ];
  return (
    <VizShell inView={inView}>
      {steps.map((s, i) => (
        <motion.g key={s.label} variants={nodeIn}>
          <rect
            x={s.x - 24}
            y={60}
            width={48}
            height={26}
            rx={4}
            stroke={i === 1 || i === 3 ? BLUE : NAVY}
            strokeWidth={1.5}
            fill={i === 0 ? "rgba(36,107,254,0.08)" : "none"}
          />
          <text
            x={s.x}
            y={76}
            textAnchor="middle"
            fontSize={7}
            fontFamily="var(--font-mono)"
            fill={i === 0 ? BLUE : INK}
          >
            {s.label}
          </text>
        </motion.g>
      ))}
      {[0, 1, 2].map((k) => (
        <motion.line
          key={k}
          x1={69 + k * 70}
          y1={73}
          x2={91 + k * 70}
          y2={73}
          stroke={BLUE}
          strokeWidth={1.2}
          variants={lineIn}
        />
      ))}
      <motion.text
        x={160}
        y={120}
        textAnchor="middle"
        fontSize={8}
        fontFamily="var(--font-mono)"
        fill={BLUE}
        variants={nodeIn}
      >
        IMPACT
      </motion.text>
      <motion.circle
        cx={160}
        cy={140}
        r={16}
        stroke={BLUE}
        strokeWidth={1.5}
        fill="rgba(36,107,254,0.08)"
        variants={nodeIn}
      />
      <motion.text
        x={160}
        y={143}
        textAnchor="middle"
        fontSize={7}
        fontFamily="var(--font-mono)"
        fill={BLUE}
        variants={nodeIn}
      >
        ✓
      </motion.text>
      {["AUDIT", "TRACE", "REPORT"].map((label, i) => (
        <motion.g key={label} variants={nodeIn}>
          <line
            x1={160}
            y1={156}
            x2={100 + i * 60}
            y2={185}
            stroke={DIM}
            strokeWidth={0.7}
            strokeDasharray="3 3"
          />
          <text
            x={100 + i * 60}
            y={198}
            textAnchor="middle"
            fontSize={7}
            fontFamily="var(--font-mono)"
            fill={LINE}
          >
            {label}
          </text>
        </motion.g>
      ))}
    </VizShell>
  );
}

/* ── MITM PlacePro — Three-role placement ────────────────── */
function MitViz({ inView }: { inView: boolean }) {
  const roles = ["STUDENT", "COMPANY", "ADMIN"];
  return (
    <VizShell inView={inView}>
      {roles.map((r, i) => (
        <motion.g key={r} variants={nodeIn}>
          <rect
            x={25 + i * 95}
            y={40}
            width={72}
            height={28}
            rx={5}
            stroke={NAVY}
            strokeWidth={1.5}
            fill="none"
          />
          <text
            x={61 + i * 95}
            y={58}
            textAnchor="middle"
            fontSize={8}
            fontFamily="var(--font-mono)"
            fill={INK}
          >
            {r}
          </text>
          <motion.line
            x1={61 + i * 95}
            y1={68}
            x2={160}
            y2={100}
            stroke={LINE}
            strokeWidth={0.8}
            variants={lineIn}
          />
        </motion.g>
      ))}
      <motion.g variants={nodeIn}>
        <rect
          x={120}
          y={94}
          width={80}
          height={28}
          rx={6}
          stroke={BLUE}
          strokeWidth={1.5}
          fill="rgba(36,107,254,0.08)"
        />
        <text
          x={160}
          y={112}
          textAnchor="middle"
          fontSize={9}
          fontFamily="var(--font-mono)"
          fill={BLUE}
        >
          NESTJS API
        </text>
      </motion.g>
      <motion.line
        x1={160}
        y1={122}
        x2={160}
        y2={144}
        stroke={BLUE}
        strokeWidth={1.5}
        variants={lineIn}
      />
      <motion.g variants={nodeIn}>
        <rect
          x={120}
          y={144}
          width={80}
          height={28}
          rx={6}
          stroke={NAVY}
          strokeWidth={1.5}
          fill="none"
        />
        <text
          x={160}
          y={162}
          textAnchor="middle"
          fontSize={9}
          fontFamily="var(--font-mono)"
          fill={INK}
        >
          POSTGRESQL
        </text>
      </motion.g>
    </VizShell>
  );
}

/* ── PetCommunity — Hub network ───────────────────────────── */
function PetViz({ inView }: { inView: boolean }) {
  const nodes = ["PET", "HOSPITAL", "COMMUNITY", "PREMIUM"];
  const positions = nodes.map((_, i) => ({
    x: 160 + Math.cos((i / nodes.length) * Math.PI * 2 - Math.PI / 2) * 65,
    y: 105 + Math.sin((i / nodes.length) * Math.PI * 2 - Math.PI / 2) * 55,
  }));
  return (
    <VizShell inView={inView}>
      <motion.circle
        cx={160}
        cy={105}
        r={18}
        stroke={BLUE}
        strokeWidth={1.5}
        fill="rgba(36,107,254,0.1)"
        variants={nodeIn}
      />
      <motion.text
        x={160}
        y={108}
        textAnchor="middle"
        fontSize={8}
        fontFamily="var(--font-mono)"
        fill={BLUE}
        variants={nodeIn}
      >
        OWNER
      </motion.text>
      {nodes.map((n, i) => (
        <motion.g key={n} variants={nodeIn}>
          <motion.line
            x1={160}
            y1={105}
            x2={positions[i].x}
            y2={positions[i].y}
            stroke={LINE}
            strokeWidth={0.8}
            variants={lineIn}
          />
          <circle
            cx={positions[i].x}
            cy={positions[i].y}
            r={15}
            stroke={NAVY}
            strokeWidth={1.5}
            fill="none"
          />
          <text
            x={positions[i].x}
            y={positions[i].y + 3}
            textAnchor="middle"
            fontSize={7}
            fontFamily="var(--font-mono)"
            fill={INK}
          >
            {n}
          </text>
        </motion.g>
      ))}
    </VizShell>
  );
}

const vizMap: Record<string, ComponentType<{ inView: boolean }>> = {
  uniconv: UniconvViz,
  "mrf-rd": MrfRdViz,
  "noc-portal": NocPortalViz,
  eventflow: EventflowViz,
  reliefchain: ReliefchainViz,
  "mit-place-pro": MitViz,
  petcommunity: PetViz,
};

export function ProjectViz({ projectId, inView }: Props) {
  const Viz = vizMap[projectId];
  if (!Viz) return null;
  return <Viz inView={inView} />;
}
