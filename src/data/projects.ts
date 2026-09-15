export type ProjectStatus = "live" | "in development" | "standby";

export type ArchitectureNode = {
  node: string;
  detail: string;
};

export type Project = {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  year: number | null;
  status: ProjectStatus;
  description: string;
  longDescription: string;
  technologies: readonly string[];
  highlights: readonly string[];
  architecture: readonly ArchitectureNode[];
  githubUrl: string;
  liveUrl: string | null;
  featuredImage: string | null;
  secondaryImage: string | null;
  featured: boolean;
};

export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  live: "DEPLOYED",
  "in development": "IN DEVELOPMENT",
  standby: "STANDBY",
};

export const PROJECTS: readonly Project[] = [
  {
    id: "uniconv",
    slug: "uniconv",
    number: "01",
    title: "UniConv",
    shortTitle: "UniConv",
    category: "File conversion platform",
    year: null,
    status: "live",
    description:
      "A full-stack converter for PDFs, images, audio and video - convert, merge, compress, secure and extract text from the browser.",
    longDescription:
      "UniConv is a browser-based file tool with a Python processing core at its center. A Next.js front end on Vercel handles accounts and billing, while a FastAPI service on Render (containerized with FFmpeg, LibreOffice, Tesseract OCR and OpenCV) runs the conversions: PDF to Word, PowerPoint and Excel and back, merge and split, compression, watermark removal, image background removal, video-to-GIF, text to speech, QR generation and OCR text extraction. Supabase provides authentication, storage and the Pro tier.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Python",
      "FastAPI",
      "FFmpeg",
      "OpenCV",
      "Tesseract OCR",
      "Supabase",
      "Docker",
      "Razorpay",
    ],
    highlights: [
      "PDF to Word, PowerPoint and Excel and back",
      "Merge, split, compress, secure and unlock PDFs",
      "OCR text extraction from scans and PDFs",
      "Image tools - compressor, background removal, profile pictures",
      "Audio and video - extract audio, video to GIF, compress",
      "Text to speech, QR codes, HTML to PDF",
    ],
    architecture: [
      {
        node: "CLIENT",
        detail: "Next.js App Router on Vercel - accounts, billing and the tool UI",
      },
      {
        node: "PROCESSING",
        detail: "FastAPI on Render, Dockerized with FFmpeg, LibreOffice, Tesseract and OpenCV",
      },
      {
        node: "DATA",
        detail: "Supabase authentication and storage, Pro tier billed via Razorpay",
      },
    ],
    githubUrl: "https://github.com/4mh24cs167-tech/uniconv",
    liveUrl: "https://uniconv-psi.vercel.app",
    featuredImage: null,
    secondaryImage: null,
    featured: true,
  },
  {
    id: "mit-place-pro",
    slug: "mit-place-pro",
    number: "02",
    title: "MITM PlacePro",
    shortTitle: "PlacePro",
    category: "Campus placement system",
    year: null,
    status: "live",
    description:
      "A campus placement portal for the Maharaja Institute of Technology Mysore that ties students, companies and placement officers into one hiring workflow.",
    longDescription:
      "MITM PlacePro (UdyogaMITra) digitizes the campus placement pipeline with three roles - students, companies and admin placement officers - each with separate views into openings, applications and shortlists. A Next.js front end on Vercel talks to a NestJS API on Render backed by PostgreSQL (Neon); JWT and bcrypt handle authentication, email runs through Nodemailer, file uploads through Multer, and the dashboard layer adds Excel imports, generated PDFs and chart-based reporting. The README credits six CSE students at MITM, including Varshith V.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "TypeORM",
      "PostgreSQL",
      "JWT",
      "Nodemailer",
      "Multer",
      "Recharts",
    ],
    highlights: [
      "Three roles - students, companies and placement officers",
      "JWT and bcrypt authentication across every role",
      "Bulk data handling with xlsx import and PDF report generation",
      "Chart-based analytics dashboard (Recharts)",
      "Email notifications via Nodemailer",
    ],
    architecture: [
      {
        node: "CLIENT",
        detail: "Next.js front end on Vercel (React 19, Tailwind 4)",
      },
      {
        node: "API",
        detail: "NestJS and TypeORM service on Render",
      },
      {
        node: "DATA",
        detail: "PostgreSQL on Neon, uploads via Multer, mail via Brevo SMTP",
      },
    ],
    githubUrl: "https://github.com/4mh24cs167-tech/mit-place-pro",
    liveUrl: "https://mitm-placepro.vercel.app",
    featuredImage: null,
    secondaryImage: null,
    featured: true,
  },
  {
    id: "eventflow",
    slug: "eventflow",
    number: "03",
    title: "Event Flow",
    shortTitle: "Event Flow",
    category: "Academic event management",
    year: null,
    status: "live",
    description:
      "An academic event management application where principals, department heads and admins run campus events through approval, registration and feedback.",
    longDescription:
      "Event Flow runs a college event from proposal to wrap-up. Principals, HODs and admins sign into dedicated portals with role-based JWT auth, and events move through draft, pending-approval, approved and completed states. Organisers attach registration and feedback forms behind private hashes, track participants and media (photos, video, report PDFs), close out with 1-5 star feedback, and an ai_evaluations surface pairs with a Google Gemini integration. A TypeScript and Express API sits in front of Supabase (PostgreSQL), with a Vite and Tailwind front end deployed on Vercel.",
    technologies: [
      "TypeScript",
      "Node.js",
      "Express",
      "JWT",
      "Supabase",
      "PostgreSQL",
      "Vite",
      "Tailwind CSS",
      "Google Gemini",
    ],
    highlights: [
      "Separate portals for principal, HOD and admin roles",
      "Event lifecycle from draft to pending approval, approved and completed",
      "Private registration and feedback forms behind link hashes",
      "Participant tracking and media (image, video, report PDF)",
      "1-5 star feedback ratings and an ai_evaluations surface with Google Gemini",
    ],
    architecture: [
      {
        node: "CLIENT",
        detail: "Vite SPA with Tailwind, deployed on Vercel",
      },
      {
        node: "API",
        detail: "TypeScript Express service with role-based JWT auth and bcrypt",
      },
      {
        node: "DATA",
        detail: "Supabase (PostgreSQL); RLS off, the backend enforces access",
      },
      {
        node: "AI",
        detail: "Google Gemini integration paired with the ai_evaluations table",
      },
    ],
    githubUrl: "https://github.com/4mh24cs167-tech/eventflow",
    liveUrl: "https://eventflow-indol.vercel.app",
    featuredImage: null,
    secondaryImage: null,
    featured: true,
  },
  {
    id: "petcommunity",
    slug: "petcommunity",
    number: "04",
    title: "PetCommunity",
    shortTitle: "PetCommunity",
    category: "Pet networking platform",
    year: 2026,
    status: "in development",
    description:
      "A pet networking platform where owners match pets by breed and temperament, find verified clinics, and join a community feed and expert Q&A.",
    longDescription:
      "PetCommunity is a pet-owner network built around compatibility. Pets carry breed, health and photo records used by a matchmaking layer grounded in genetic and temperament traits, a hospital directory gates clinics behind document-based verification, and community posts, an expert Q&A board, premium subscriptions (Stripe) and an admin verification log complete the platform. Next.js renders the app, Prisma models the PostgreSQL schema, Supabase handles authentication, and the profile experience uses Google Maps. The deployed footer reads 2026.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Supabase",
      "Stripe",
      "Tailwind CSS",
      "Google Maps API",
    ],
    highlights: [
      "Pet profiles with breed, health records and photos",
      "Breed- and temperament-based matchmaking (CrossRequest)",
      "Hospital directory gated behind document verification",
      "Community posts, expert Q&A and premium subscriptions (Stripe)",
      "Admin verification logs for profiles, breeds and hospitals",
    ],
    architecture: [
      {
        node: "CLIENT",
        detail: "Next.js App Router with Supabase SSR authentication",
      },
      {
        node: "DATA",
        detail: "Prisma models a PostgreSQL schema",
      },
      {
        node: "SERVICES",
        detail: "Google Maps for locations, Stripe for premium billing",
      },
    ],
    githubUrl: "https://github.com/4mh24cs167-tech/petcommunity",
    liveUrl: "https://petcommunity-puce.vercel.app",
    featuredImage: null,
    secondaryImage: null,
    featured: false,
  },
];

export const FEATURED_PROJECTS: readonly Project[] = PROJECTS.filter(
  (project) => project.featured
);

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}