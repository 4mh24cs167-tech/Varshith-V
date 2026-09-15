import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../layout/Section";
import { fadeUp, revealGroup } from "../../lib/motion";

type SkillGroup = {
  id: string;
  num: string;
  title: string;
  skills: string[];
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "development",
    num: "01",
    title: "Development",
    skills: [
      "C",
      "C++",
      "Python",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "NestJS",
    ],
  },
  {
    id: "backend-data",
    num: "02",
    title: "Backend & Data",
    skills: [
      "PostgreSQL",
      "Supabase",
      "TypeORM",
      "REST APIs",
      "JWT",
      "Authentication",
      "RBAC",
    ],
  },
  {
    id: "ai",
    num: "03",
    title: "AI & Emerging Technology",
    skills: [
      "Artificial Intelligence",
      "Local AI",
      "Small Language Models",
      "Edge AI",
      "Speech-to-Text",
      "Text-to-Speech",
      "Prompt Engineering",
      "Ollama",
      "llama.cpp",
      "Whisper",
      "GGUF",
      "Raspberry Pi",
    ],
  },
  {
    id: "design",
    num: "04",
    title: "Design",
    skills: [
      "UI/UX",
      "Product Design",
      "Dashboard Design",
      "Responsive Design",
      "Visual Design",
      "Workflow Design",
    ],
  },
  {
    id: "creative",
    num: "05",
    title: "Creative",
    skills: [
      "Video Editing",
      "YouTube",
      "Technical Content",
      "Screen Recording",
      "Visual Storytelling",
      "Motion Graphics",
    ],
  },
];

export function Skills() {
  const reduce = useReducedMotion();
  const anim = !reduce;
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09 } },
  };

  return (
    <Section id="skills" labelledBy="skills-title" className="skills-section">
      <motion.div
        className="skills-header"
        initial={anim ? "hidden" : false}
        whileInView={anim ? "show" : undefined}
        viewport={{ once: true, margin: "-12% 0px" }}
        variants={revealGroup}
      >
        <motion.p variants={fadeUp} className="hero-eyebrow">
          Technical arsenal
        </motion.p>
        <motion.h2 variants={fadeUp} id="skills-title" className="skills-header-title">
          Skills &amp;
          <br />
          toolbox
        </motion.h2>
        <motion.p variants={fadeUp} className="works-header-sub">
          Tools, technologies and creative disciplines I work with end to
          end.
        </motion.p>
      </motion.div>

      <motion.div
        className="skills-grid"
        initial={anim ? "hidden" : false}
        whileInView={anim ? "show" : undefined}
        viewport={{ once: true, margin: "-8% 0px" }}
        variants={stagger}
      >
        {SKILL_GROUPS.map((group, i) => (
          <motion.div
            key={group.id}
            variants={fadeUp}
            className="skill-group"
            style={{ "--skill-hue-offset": String(-i * 18) } as React.CSSProperties}
          >
            <div className="skill-group-head">
              <span className="skill-group-num tnum" aria-hidden="true">
                {group.num}
              </span>
              <h3 className="skill-group-title">{group.title}</h3>
            </div>
            <ul className="skill-list">
              {group.skills.map((skill) => (
                <li key={skill} className="skill-pill">
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

export default Skills;