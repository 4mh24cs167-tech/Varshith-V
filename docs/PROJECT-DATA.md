# VARSHITH — Project Data Layer

Source of truth for all portfolio project content. Every fact below was
verified against public GitHub sources on 15 Sep 2026.

## Source of truth

- GitHub org: `https://github.com/4mh24cs167-tech`
- All four repos below verified via fetched READMEs, `package.json` files,
  `schema.sql`, deployed page titles and page copy.

| Project | Repo | Live URL | Commits |
| --- | --- | --- | --- |
| UniConv | [uniconv](https://github.com/4mh24cs167-tech/uniconv) | [uniconv-psi.vercel.app](https://uniconv-psi.vercel.app) | 110 |
| MITM PlacePro | [mit-place-pro](https://github.com/4mh24cs167-tech/mit-place-pro) | [mitm-placepro.vercel.app](https://mitm-placepro.vercel.app) | 254 |
| EventFlow | [eventflow](https://github.com/4mh24cs167-tech/eventflow) | [eventflow-indol.vercel.app](https://eventflow-indol.vercel.app) | 57 |
| PetCommunity | [petcommunity](https://github.com/4mh24cs167-tech/petcommunity) | [petcommunity-puce.vercel.app](https://petcommunity-puce.vercel.app) | 23 |

## Data model

Located in `src/data/projects.ts`.

| Field | Purpose |
| --- | --- |
| `id` / `slug` | Stable ID and route slug |
| `number` | Display order ("01"–"04") |
| `title` / `shortTitle` | Full and compact names |
| `category` | Neutral product descriptor |
| `year` | Verified year; `null` when unverifiable |
| `status` | `live`, `in development`, `standby` |
| `description` | One-line summary |
| `longDescription` | 2–3 sentence verified stack + flow |
| `technologies` | Tags from actual code evidence |
| `highlights` | 4–6 bullet points: documented features, roles, verified metrics |
| `architecture` | Technology nodes and edges for SVG diagrams |
| `architectureNodes` | Node type definitions (`external` = navy, `backend` = blue, `standard` = light) |
| `githubUrl` / `liveUrl` | External links; `liveUrl` null when unverifiable |
| `featured` | Front-page catalog flag |

### Site data (`src/data/site.ts`)

| Constant | Value |
| --- | --- |
| `GITHUB_ORG_URL` | `https://github.com/4mh24cs167-tech` |
| `LINKEDIN_URL` | `https://www.linkedin.com/in/varshith-v-812585275` |
| `EMAIL` | `varshithv252@gmail.com` |
| `PORTFOLIO_YEAR` | `2026` |
| `AVAILABILITY_TEXT` | `AVAILABLE FOR BUILDING & COLLABORATION` |
| `PROFILE_IMAGE` | `/images/profile.png` (1058×1486) |
| `RESUME_URL` | `/resume.docx` (user-provided file) |
| `CGPA` | `8.74` |
| `ROLE_TITLE` | `Full-Stack Developer` |
| `ROLE_ORGS` | `B.E. CSE · MITM` |

## Per-project architecture

### UniConv (01)

Backend-centric pipeline. React SPA → Node.js/Express API → FFmpeg + Sharp
processing → Canvas (Preview/Quality/Size) → file download. External:
GIFs.com API, PDF.js.

### MITM PlacePro (02)

Multi-system placement pipeline. PostgreSQL (data store) feeds NestJS (admin
API) and Next.js (student portal + public site) via Auth Guard → Application
→ Report Processing. Email and File Upload are external.

### EventFlow (03)

Role-based event lifecycle. Admin, HOD, Staff roles → DRAFT → PENDING →
APPROVED/REJECTED pipeline. Express + Supabase API. External: Gemini AI
evaluations.

### PetCommunity (04)

Pet matching platform. Prisma ORM (model + migration) → Next.js full-stack
app. User, Pet, and Match models. Contact + Shelter as external services.

## Verification notes

- **eventflow**: package.json root named `event-org`; README absent. Role tables
  and lifecycle from `schema.sql`. Gemini integration from
  `@google/generative-ai`. Frontend is Vite + Tailwind SPA (no React runtime).
- **mit-place-pro**: title "UdyogaMITra — Intelligent Campus Placement
  Management System" from README; deployed title "MITM PlacePro". Team credit
  ("six CSE students at MITM, including Varshith V") verbatim from README.
- **uniconv**: feature surface from deployed page copy; processing stack from
  `apps/api/requirements.txt` and `Dockerfile`. License Proprietary (README).
- **petcommunity**: default create-next-app README; all facts from
  `prisma/schema.prisma`, route tree, deployed footer. "© 2026" only year
  evidence. Contains agent scaffolding directories — noted to avoid
  misrepresentation.

## Image strategy

`featuredImage` / `secondaryImage` remain `null`. Project visualisation is
handled by per-project SVG architecture diagrams in `ProjectViz.tsx` (data-
driven from the `architecture` and `architectureNodes` fields in
`projects.ts`). When real screenshots exist, the planned convention is
`/images/projects/{id}/{featured|secondary}.{webp|jpg}` under `public/`.

## Tone rules

Clear, intelligent, concise, human, technical. No hype words (revolutionary,
cutting-edge, next-generation, seamless, ultra-fast). Plain verbs, sentence
case. No claims about team size, users, awards, traffic or performance beyond
repo evidence.

## Featured ordering

1. **UniConv** — shipped consumer product, strongest individual story.
2. **MITM PlacePro** — deepest systems work, real institutional context.
3. **EventFlow** — original domain model + AI angle (Gemini).
4. **PetCommunity** — most original concept, earliest stage (23 commits,
   in development, `featured: false`).

## QA checklist

- [x] All 4 repo URLs verified
- [x] All 4 live URLs reachable
- [x] No fabricated facts; unverifiable fields null
- [x] Data layer in `src/data/`, no hard-coded JSX
- [x] `tsc -b` and `vite build` pass
- [x] `verify.mjs` PASS across 14 viewports (320–2560px), 0 console errors
- [x] Project diagrams data-driven from architecture fields
- [x] Stats use verified numbers only (8.74 CGPA, 4 systems, 12+ months)
- [x] Hero facts from site data layer (role, CGPA, orgs)
- [x] All tech tags from actual code evidence
- [x] Contact form is honest mailto (no fake backend), prefilled body
- [x] Resume link downloads `/resume.docx` when present
