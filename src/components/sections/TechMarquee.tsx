const SKILLS = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "PostgreSQL",
  "NestJS",
  "Next.js",
  "Prisma",
  "Supabase",
  "Docker",
  "FFmpeg",
  "Gemini AI",
  "REST APIs",
  "Vite",
];

export function TechMarquee() {
  const doubled = [...SKILLS, ...SKILLS];

  return (
    <div className="marquee-section" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((skill, i) => (
          <span key={`${skill}-${i}`} className="marquee-item">
            {skill}
            <span className="marquee-separator"> &#10022; </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default TechMarquee;