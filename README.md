# Portfolio 2.0

Production-ready personal portfolio built with React 19, TypeScript, Vite 8, and Tailwind CSS v4.

---

## Technical Stack

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`
- **Linter**: [Oxlint](https://oxc.rs/)
- **Test Runner**: [TSX](https://github.com/privatenumber/tsx) validation suite

---

## Centralized Content & Asset System (Phase 02)

All portfolio data is centrally managed, fully typed, and strictly isolated from presentation components.

### 1. Seeded Projects Manifest (`src/data/projects.ts`)
The project registry contains 10 verified, authentic engineering projects:

| Rank | Project | Category | Maturity | Role / Attribution |
| :---: | :--- | :--- | :--- | :--- |
| **#1** | **Convia** | Web Platform | `in-development` | Lead Architect & Full-Stack Developer |
| **#2** | **NIDAR / VegaPilot** | Embedded Robotics | `prototype` | Firmware & Telemetry (Team with The NorthCap University) |
| **#3** | **BioLynk** | Web Platform | `prototype` | Full-Stack Developer (Next.js & Firebase) |
| **#4** | **Global Energy Risk Monitor** | Systems / AI | `prototype` | Developer (C++ & Node.js Risk Modeling) |
| **#5** | **DocFrame** | Developer Tools | `production` | Creator & Core Maintainer |
| **#6** | **ResumeTrices** | Systems / AI | `prototype` | Full-Stack Developer (Express, Gemini & OpenAI) |
| **#7** | **Quiz Master** | Developer Tools | `completed` | Developer (C CLI Engine with Real-Time Timer) |
| **#8** | **ATM Machine** | Developer Tools | `completed` | Developer (C CLI Banking Simulation) |
| **#9** | **C++ Library Management System** | Developer Tools | `completed` | Developer (C++ OOP Book Management) |
| **#10** | **Language-Agnostic Chatbot** | Systems / AI | `prototype` | Backend Developer (FastAPI, 32 Passing Tests) |

### 2. Education & Experience Records
- **Education** ([`src/data/education.ts`](file:///c:/CODING/Projects/Portfolio/src/data/education.ts)): The NorthCap University — B.Tech in Computer Science & Engineering (AI/ML), First-Year Academic Performance: 9.4 CGPA. Institutional enrollment dates remain unspecified until officially verified.
- **Experience** ([`src/data/experience.ts`](file:///c:/CODING/Projects/Portfolio/src/data/experience.ts)): InAmigos Foundation — Web Development Intern (Completed Internship). Calendar dates and deliverables kept strictly conservative without unverified claims.
- **Achievements & Certifications** ([`src/data/achievements.ts`](file:///c:/CODING/Projects/Portfolio/src/data/achievements.ts), [`src/data/certifications.ts`](file:///c:/CODING/Projects/Portfolio/src/data/certifications.ts)): Kept strictly empty until explicit verified credentials are provided. No ghost credentials or fabricated awards.

---

## Asset Management & Workflows

### The Single Flat Folder Standard
- **Location**: All manually added assets (images, PDFs, documents, logos) **must reside directly in `public/assets/`**.
- **No Subdirectories**: Never create folders like `public/assets/images/` or `public/assets/docs/`.
- **Naming Convention**: Lowercase, hyphen-separated kebab-case: `[category]-[name].[ext]` (e.g., `convia-logo.png`, `resume-naman-prajapati.pdf`).

### Asset Manifest & Fallback Safety
- **Asset Manifest** ([`src/data/assets.ts`](file:///c:/CODING/Projects/Portfolio/src/data/assets.ts)): Centralized registry tracking all declared assets and their boolean availability status (`isAvailable`).
- **Safe Resolution**: [`resolveSafeAssetUrl(filename)`](file:///c:/CODING/Projects/Portfolio/src/utils/asset.ts) returns a valid URL only if the asset is verified available. If absent, it safely returns `null` or a fallback.
- **Graceful Placeholder**: [`ProjectEvidenceFallback`](file:///c:/CODING/Projects/Portfolio/src/components/common/ProjectEvidenceFallback.tsx) renders an architectural placeholder when visual evidence is in active hardware prototyping, preventing broken `<img>` tags and layout shifts.

### How to Add New Content Without Touching UI Components

#### Adding a New Project
1. Open [`src/data/projects.ts`](file:///c:/CODING/Projects/Portfolio/src/data/projects.ts).
2. Append a new object satisfying the `Project` interface (defined in [`src/types/content.ts`](file:///c:/CODING/Projects/Portfolio/src/types/content.ts)).
3. Define required fields (`id`, `slug`, `title`, `tagline`, `summary`, `category`, `maturity`, `role`, `technologies`).
4. If project screenshots exist, place them in `public/assets/<slug>-preview.png` and register them in `src/data/assets.ts`. If not, omit the field; the system automatically renders a graceful fallback.

#### Adding a New Asset
1. Copy the asset directly into `public/assets/` with a kebab-case filename (e.g. `nidar-schematic.png`).
2. Add an entry to `assetManifest` in [`src/data/assets.ts`](file:///c:/CODING/Projects/Portfolio/src/data/assets.ts) with `isAvailable: true`.
3. Reference the filename anywhere via `getAssetPath('nidar-schematic.png')` or `resolveSafeAssetUrl('nidar-schematic.png')`. Zero component edits required.

#### Adding a Resume Document
1. Place the verified PDF file directly in `public/assets/resume-naman-prajapati.pdf`.
2. In [`src/data/profile.ts`](file:///c:/CODING/Projects/Portfolio/src/data/profile.ts), update `siteProfile.resume.isAvailable = true`.
3. In [`src/data/assets.ts`](file:///c:/CODING/Projects/Portfolio/src/data/assets.ts), update `resume-naman-prajapati.pdf` entry to `isAvailable: true`.
4. All resume buttons and links across the site will automatically activate.

#### Adding a Professional Certification
1. Place the certificate PDF directly in `public/assets/cert-[issuer]-[slug].pdf`.
2. Add a formal record in `certificationsList` in [`src/data/certifications.ts`](file:///c:/CODING/Projects/Portfolio/src/data/certifications.ts) specifying `id`, `title`, `issuingOrganization`, `issueDate`, and `credentialUrl`.
3. Add the PDF entry to `assetManifest` in [`src/data/assets.ts`](file:///c:/CODING/Projects/Portfolio/src/data/assets.ts).
4. *Rule*: A file dropped into `public/assets/` will **never** appear on the site without an explicit record in `certificationsList`.

---

## Getting Started & Development

### Prerequisites
- Node.js (v20+ recommended, tested on v24.x)
- npm (v10+ recommended)

### Installation
```bash
# Clone the repository and install dependencies
npm install
```

### Development Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local Vite dev server with Hot Module Replacement |
| `npm run typecheck` | Validates TypeScript compiler checks without emitting code |
| `npm run lint` | Runs the Oxlint linter across codebase |
| `npm test` | Runs the automated content schema, token, and asset validation suite |
| `npm run build` | Runs type checks and produces optimized production build in `dist/` |
| `npm run preview` | Locally previews the production build output |

---

## Project Structure

```text
Portfolio/
├── public/
│   ├── assets/                 # Single flat directory for all portfolio assets
│   │   ├── convia-logo.png     # Convia platform mark
│   │   └── .gitkeep            # Folder standard enforcement marker
│   └── favicon.svg             # Geometric NP monogram favicon
├── src/
│   ├── components/             # Reusable presentation components
│   │   ├── common/             # UI primitives (Button, Card, Heading, Fallback, etc.)
│   │   ├── layout/             # Shell components (Header, Footer, Layout)
│   │   └── preview/            # Inspection harness (DesignSystemPreview)
│   ├── data/                   # Centralized content and metadata configurations
│   │   ├── achievements.ts     # Verified achievements registry (empty until supplied)
│   │   ├── assets.ts           # Explicit typed asset manifest and queries
│   │   ├── certifications.ts   # Formal certifications registry (empty until supplied)
│   │   ├── education.ts        # The NorthCap University academic background
│   │   ├── experience.ts       # InAmigos Foundation completed internship record
│   │   ├── profile.ts          # Site profile, bio, and resume metadata
│   │   ├── projects.ts         # 10 seeded projects with authentic prominence
│   │   └── siteConfig.ts       # Global site metadata and navigation items
│   ├── hooks/                  # Custom React hooks (e.g., useDocumentTitle)
│   ├── pages/                  # Page views (HomePage temporary shell)
│   ├── styles/                 # Global styles, Tailwind v4 @theme, and design tokens
│   ├── tests/                  # Verification test suites
│   │   ├── asset.test.ts       # Path generator tests
│   │   ├── content.test.ts     # Content schema and unique slug tests
│   │   ├── designSystem.test.ts# Token scale and contrast tests
│   │   └── index.ts            # Test suite barrel export
│   ├── types/                  # TypeScript interface and type declarations
│   │   ├── content.ts          # Project, Experience, Education, Asset types
│   │   └── portfolio.ts        # Site metadata types
│   ├── utils/                  # Helper utilities (asset resolution, formatters)
│   ├── App.tsx                 # Root application component
│   └── main.tsx                # Client entry point
├── .oxlintrc.json              # Oxlint configuration
├── package.json                # Project dependencies and lifecycle scripts
├── tsconfig.app.json           # Client TypeScript configuration with @/* alias
├── tsconfig.json               # Root TypeScript configuration with path mapping
├── tsconfig.node.json          # Tooling TypeScript configuration
└── vite.config.ts              # Vite configuration (React, Tailwind CSS v4, path alias)
```
