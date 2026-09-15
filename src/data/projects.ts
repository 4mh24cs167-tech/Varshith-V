export type ProjectStatus = "live" | "in development" | "standby";

export type ProjectCategory =
  | "software"
  | "cybersecurity"
  | "research"
  | "social impact"
  | "web";

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
  tags: readonly ProjectCategory[];
  year: number | null;
  status: ProjectStatus;
  description: string;
  longDescription: string;
  problem: string;
  approach: string;
  technologies: readonly string[];
  highlights: readonly string[];
  architecture: readonly ArchitectureNode[];
  liveUrl: string | null;
  sourceUrl: string | null;
  previewImage: string | null;
  featuredImage: string | null;
  featured: boolean;
};

export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  live: "DEPLOYED",
  "in development": "IN DEVELOPMENT",
  standby: "STANDBY",
};

export const PROJECT_CATEGORIES: readonly {
  id: ProjectCategory | "all";
  label: string;
}[] = [
  { id: "all", label: "ALL" },
  { id: "software", label: "SOFTWARE" },
  { id: "cybersecurity", label: "CYBERSECURITY" },
  { id: "research", label: "RESEARCH" },
  { id: "social impact", label: "SOCIAL IMPACT" },
  { id: "web", label: "WEB" },
] as const;

export const PROJECTS: readonly Project[] = [
  {
    id: "uniconv",
    slug: "uniconv",
    number: "01",
    title: "UniConv",
    shortTitle: "UniConv",
    category: "Full-Stack File Conversion Platform",
    tags: ["software", "web"],
    year: null,
    status: "live",
    description:
      "A full-stack converter for PDFs, images, audio and video — convert, merge, compress, secure and extract text from the browser.",
    longDescription:
      "UniConv is a browser-based file tool with a Python processing core at its center. A Next.js front end on Vercel handles accounts and billing, while a FastAPI service on Render (containerized with FFmpeg, LibreOffice, Tesseract OCR and OpenCV) runs the conversions: PDF to Word, PowerPoint and Excel and back, merge and split, compression, watermark removal, image background removal, video-to-GIF, text to speech, QR generation and OCR text extraction. Supabase provides authentication, storage and the Pro tier.",
    problem:
      "Existing online file converters are fragmented, slow, and often charge hidden fees for basic operations. Users need a single, reliable tool that handles multiple formats without switching between services.",
    approach:
      "Built a decoupled architecture: a Next.js frontend for accounts and UI, paired with a containerized FastAPI backend running FFmpeg, LibreOffice, Tesseract OCR and OpenCV. This separation allows the processing engine to scale independently while keeping the user experience fast and seamless.",
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
      "Image tools — compressor, background removal, profile pictures",
      "Audio and video — extract audio, video to GIF, compress",
      "Text to speech, QR codes, HTML to PDF",
    ],
    architecture: [
      {
        node: "CLIENT",
        detail: "Next.js App Router on Vercel — accounts, billing and the tool UI",
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
    liveUrl: "https://uniconv-psi.vercel.app",
    sourceUrl: null,
    previewImage: "/images/photo.jpeg",
    featuredImage: null,
    featured: true,
  },
  {
    id: "mrf-rd",
    slug: "mrf-rd",
    number: "02",
    title: "MRF R&D",
    shortTitle: "MRF R&D",
    category: "Research & Development Platform",
    tags: ["research", "web"],
    year: null,
    status: "live",
    description:
      "A research and development portal created for organizing and supporting institutional R&D activities at Maharaja Research Foundation.",
    longDescription:
      "MRF R&D is a comprehensive research management platform built for the Maharaja Research Foundation. It streamlines the entire research lifecycle — from ideation and proposal submission through collaboration tracking to outcomes and publications. The platform connects researchers, mentors, and administrators in a unified workflow, providing visibility into ongoing projects, milestones, and institutional research output.",
    problem:
      "Institutional R&D activities often lack a centralized system to track proposals, collaborations, and outcomes. Research data is scattered across emails, spreadsheets, and documents, making it difficult to assess institutional research impact.",
    approach:
      "Designed a role-based research ecosystem that mirrors the actual research workflow. Built a clean, institutional interface with clear navigation paths for researchers, reviewers, and administrators. Integrated collaboration tools and status tracking to provide real-time visibility into research progress.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Supabase",
      "Node.js",
    ],
    highlights: [
      "Research proposal submission and review workflow",
      "Collaboration tracking across departments",
      "Milestone and outcome management",
      "Role-based access for researchers, reviewers and admins",
      "Institutional research output dashboard",
    ],
    architecture: [
      {
        node: "CLIENT",
        detail: "Next.js application with Tailwind CSS for institutional UI",
      },
      {
        node: "API",
        detail: "Node.js service layer with role-based access control",
      },
      {
        node: "DATA",
        detail: "PostgreSQL on Supabase with RLS and structured research schemas",
      },
    ],
    liveUrl: "https://mitm-rd.vercel.app",
    sourceUrl: "https://github.com/yashas1519-pixel/jnanashodha-portal",
    previewImage: null,
    featuredImage: null,
    featured: true,
  },
  {
    id: "noc-portal",
    slug: "noc-portal",
    number: "03",
    title: "No-Due Portal",
    shortTitle: "No-Due Portal",
    category: "Institutional Workflow Automation",
    tags: ["software", "web"],
    year: null,
    status: "live",
    description:
      "A digital No-Due Portal designed to streamline institutional clearance workflows and reduce manual processes.",
    longDescription:
      "The No-Due Portal digitizes the institutional clearance process that students and staff must complete before receiving official clearance. Instead of physically visiting each department for signatures, the portal routes requests through a structured digital workflow — from request submission through verification and department clearance to final approval. Each department can review, approve, or flag items in real-time, and requestors can track their clearance status at every step.",
    problem:
      "Traditional institutional clearance processes require students to physically visit multiple departments, collect signatures on paper forms, and wait days or weeks for approval. This creates bottlenecks, lost paperwork, and frustration for both students and administrative staff.",
    approach:
      "Modeled the digital workflow around the actual clearance chain: Request → Verification → Department Clearance → Approval → No-Due. Built a role-based system where each department operates independently within the pipeline, with status tracking visible to the requestor at all times.",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "JWT",
      "Tailwind CSS",
    ],
    highlights: [
      "Digital clearance workflow replacing paper-based processes",
      "Multi-department verification pipeline",
      "Real-time status tracking for requestors",
      "Role-based access for students, departments and administrators",
      "Audit trail for all clearance actions",
    ],
    architecture: [
      {
        node: "CLIENT",
        detail: "React SPA with Tailwind CSS, deployed on Vercel",
      },
      {
        node: "API",
        detail: "Express service with JWT auth and workflow state machine",
      },
      {
        node: "DATA",
        detail: "PostgreSQL with structured department and clearance schemas",
      },
    ],
    liveUrl: "https://noc-portal-self.vercel.app",
    sourceUrl: "https://github.com/visheshdevanur/NOC-Portal",
    previewImage: null,
    featuredImage: null,
    featured: true,
  },
  {
    id: "eventflow",
    slug: "eventflow",
    number: "04",
    title: "Event Flow",
    shortTitle: "Event Flow",
    category: "Academic Event Management",
    tags: ["software", "web"],
    year: null,
    status: "live",
    description:
      "An academic event management application where principals, department heads and admins run campus events through approval, registration and feedback.",
    longDescription:
      "Event Flow runs a college event from proposal to wrap-up. Principals, HODs and admins sign into dedicated portals with role-based JWT auth, and events move through draft, pending-approval, approved and completed states. Organisers attach registration and feedback forms behind private hashes, track participants and media (photos, video, report PDFs), close out with 1-5 star feedback, and an ai_evaluations surface pairs with a Google Gemini integration. A TypeScript and Express API sits in front of Supabase (PostgreSQL), with a Vite and Tailwind front end deployed on Vercel.",
    problem:
      "Academic event management involves coordinating multiple stakeholders — principals, HODs, organizers, and participants — with paper-based approvals, manual registration tracking, and no centralized feedback system.",
    approach:
      "Built a state-machine-driven event lifecycle: Draft → Pending → Approved → Completed. Each state has specific role-based permissions. Added private registration/feedback forms with hash-based access, media tracking, and AI-powered evaluation summaries using Google Gemini.",
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
      "1-5 star feedback ratings and AI evaluations with Google Gemini",
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
        detail: "Supabase (PostgreSQL); the backend enforces access",
      },
      {
        node: "AI",
        detail: "Google Gemini integration paired with the ai_evaluations table",
      },
    ],
    liveUrl: "https://eventflow-indol.vercel.app",
    sourceUrl: null,
    previewImage: null,
    featuredImage: null,
    featured: true,
  },
  {
    id: "reliefchain",
    slug: "reliefchain",
    number: "05",
    title: "ReliefChain",
    shortTitle: "ReliefChain",
    category: "Blockchain / Social Impact / Disaster Relief",
    tags: ["social impact", "software"],
    year: null,
    status: "live",
    description:
      "A technology-driven platform focused on improving transparency, accountability and traceability in disaster-relief assistance.",
    longDescription:
      "ReliefChain tackles the transparency gap in disaster relief by creating a traceable chain from donation to impact. Every contribution is logged, verified, allocated to specific relief efforts, and tracked through delivery to the end recipient. The platform provides donors with visibility into how their contributions are used, while giving relief organizations a structured workflow for managing allocation and reporting outcomes.",
    problem:
      "Disaster relief assistance often suffers from opacity — donors cannot verify how contributions are used, and relief organizations struggle to provide transparent reporting. This erodes public trust and makes it harder to mobilize future support.",
    approach:
      "Designed a transparent aid-flow pipeline: Donation → Verification → Allocation → Delivery → Impact. Each stage is logged and auditable, providing end-to-end traceability. Built clean data-flow visualizations that communicate the platform's commitment to transparency without relying on cryptocurrency aesthetics.",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    highlights: [
      "End-to-end traceability from donation to impact",
      "Transparent allocation and delivery tracking",
      "Donor-facing verification dashboard",
      "Structured workflow for relief organizations",
      "Audit-ready reporting for accountability",
    ],
    architecture: [
      {
        node: "CLIENT",
        detail: "React frontend with clean data-flow UI on Vercel",
      },
      {
        node: "API",
        detail: "Node.js service handling donation logging and allocation workflows",
      },
      {
        node: "DATA",
        detail: "PostgreSQL with auditable donation and delivery schemas",
      },
    ],
    liveUrl: "https://reliefchain-pied.vercel.app",
    sourceUrl: "https://github.com/4mh24cs167-tech/reliefchain",
    previewImage: null,
    featuredImage: null,
    featured: true,
  },
  {
    id: "mit-place-pro",
    slug: "mit-place-pro",
    number: "06",
    title: "MITM PlacePro",
    shortTitle: "PlacePro",
    category: "Campus Placement System",
    tags: ["software", "web"],
    year: null,
    status: "live",
    description:
      "A campus placement portal for MITM that ties students, companies and placement officers into one hiring workflow.",
    longDescription:
      "MITM PlacePro (UdyogaMITra) digitizes the campus placement pipeline with three roles — students, companies and admin placement officers — each with separate views into openings, applications and shortlists. A Next.js front end on Vercel talks to a NestJS API on Render backed by PostgreSQL (Neon); JWT and bcrypt handle authentication, email runs through Nodemailer, file uploads through Multer, and the dashboard layer adds Excel imports, generated PDFs and chart-based reporting.",
    problem:
      "Campus placement processes at MITM involve manual coordination between students, companies, and placement officers — tracking applications, scheduling interviews, and managing shortlists across spreadsheets and email chains.",
    approach:
      "Built a three-role system (Student, Company, Admin) with dedicated dashboards. Each role sees only what's relevant to them. Bulk operations (Excel import, PDF generation) and chart-based analytics reduce administrative overhead significantly.",
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
      "Three roles — students, companies and placement officers",
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
    liveUrl: "https://mitm-placepro.vercel.app",
    sourceUrl: null,
    previewImage: null,
    featuredImage: null,
    featured: false,
  },
  {
    id: "petcommunity",
    slug: "petcommunity",
    number: "07",
    title: "PetCommunity",
    shortTitle: "PetCommunity",
    category: "Pet Networking Platform",
    tags: ["web", "software"],
    year: 2026,
    status: "in development",
    description:
      "A pet networking platform where owners match pets by breed and temperament, find verified clinics, and join a community feed and expert Q&A.",
    longDescription:
      "PetCommunity is a pet-owner network built around compatibility. Pets carry breed, health and photo records used by a matchmaking layer grounded in genetic and temperament traits, a hospital directory gates clinics behind document-based verification, and community posts, an expert Q&A board, premium subscriptions (Stripe) and an admin verification log complete the platform. Next.js renders the app, Prisma models the PostgreSQL schema, Supabase handles authentication, and the profile experience uses Google Maps.",
    problem:
      "Pet owners struggle to find compatible pets for adoption, locate verified veterinary clinics, and connect with a knowledgeable community — all fragmented across different platforms and social media groups.",
    approach:
      "Built a pet-centric social platform with breed/temperament-based matchmaking at its core. Added verified hospital directories with document-based trust, community features for knowledge sharing, and Stripe-powered premium features for advanced functionality.",
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
    liveUrl: "https://petcommunity-puce.vercel.app",
    sourceUrl: null,
    previewImage: null,
    featuredImage: null,
    featured: false,
  },
] as const;
