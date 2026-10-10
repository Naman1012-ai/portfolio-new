import type { Project } from '@/types'

/**
 * Approved inventory of portfolio projects for Naman Prajapati.
 * Grounded strictly in authentic project files, verified GitHub repositories,
 * accurate technical maturity, and honest team collaboration attribution.
 *
 * Sequence:
 * Main Sequence (1 to 9):
 * 1. Convia (Flagship)
 * 2. BioLynk (Flagship)
 * 3. ResumeTrices
 * 4. Global Energy Risk Monitor
 * 5. DocFrame
 * 6. Quiz Master
 * 7. ATM Machine
 * 8. Library Management System
 * 9. Language-Agnostic Chatbot
 *
 * Standalone Track:
 * - NIDAR / VegaPilot (Robotics & Autonomous Systems track)
 */
export const projects: Project[] = [
  // 1. Convia (Flagship)
  {
    id: 'project-convia',
    slug: 'convia',
    title: 'Convia',
    tagline: 'Collaborative Workspace — Where Ideas Converge into Action',
    summary:
      'A structured collaborative workspace designed to help teams transition from scattered ideation to clear direction, MVP selection, and actionable execution.',
    description:
      'Features workspace idea sharing, team voting, structured discussions, and blueprint generation. Built with a React/TypeScript frontend, Express backend, and Firebase Realtime Database.',
    category: 'web-platform',
    maturity: 'in-development',
    archetype: 'product-saas',
    role: 'Lead Architect & Full-Stack Developer',
    teamProject: false,
    featuredRank: 1,
    flagship: true,
    track: 'main',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Express', 'Firebase Realtime Database', 'Node.js'],
    links: {
      repo: 'https://github.com/Naman1012-ai/Convia',
      live: 'https://con-via-pro.vercel.app',
    },
    evidence: {
      assetFilename: 'convia-logo.png',
      type: 'image',
      caption: 'Convia workspace platform logo mark.',
      fallbackText: 'Convia active development build.',
    },
    caseStudy: {
      overview:
        'Convia is an end-to-end collaborative workspace engineered to streamline team ideation, MVP prioritization, and technical project planning. It bridges the gap between chaotic early brainstorming sessions and actionable sprint execution.',
      problemContext:
        'Early-stage technical and product teams frequently scatter feature suggestions across disconnected chat threads, static documents, and issue trackers. Critical nuance is lost, consensus is difficult to quantify, and teams struggle to identify the single most impactful MVP scope.',
      approachArchitecture:
        'Convia employs a decoupled full-stack architecture. The frontend is built on React 19 and TypeScript with Tailwind CSS for high-density editorial interfaces. State synchronization utilizes Firebase Realtime Database with optimistic client updates for zero-lag collaboration. The backend Express service coordinates blueprint compilation and session orchestration.',
      keyFeatures: [
        'Real-time collaborative idea submission and categorisation',
        'Multi-criteria team voting mechanisms to surface high-leverage concepts',
        'Threaded deliberation discussions tied directly to proposal nodes',
        'Structured technical blueprint generator compiling ideas into implementation tasks',
      ],
      verificationTesting:
        'Active development repository with modular component separation, comprehensive TypeScript typing, and responsive layout testing.',
      currentStatusNote:
        'In active development in the local workspace. Core ideation, discussion threads, and blueprint generation workflows are operational.',
      previewAssetFilename: 'convia-preview.png',
    },
  },

  // 2. BioLynk (Flagship)
  {
    id: 'project-biolynk',
    slug: 'biolynk',
    title: 'BioLynk',
    tagline: 'Healthcare Donor Coordination & Bio-Network Platform',
    summary:
      'A healthcare networking platform prototype for donor coordination, profile management, and verified communication.',
    description:
      'Built with Next.js and Firebase, featuring role-based donor dashboards, donor profile setup, and healthcare network workflows.',
    category: 'web-platform',
    maturity: 'prototype',
    archetype: 'social-coordination',
    role: 'Full-Stack Developer',
    teamProject: false,
    featuredRank: 2,
    flagship: true,
    track: 'main',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'Firebase'],
    links: {
      repo: 'https://github.com/Naman1012-ai/Bio-Lynk',
      live: 'https://v0-biolynk-lives.vercel.app',
    },
    evidence: {
      assetFilename: 'biolynk-preview.png',
      type: 'image',
      caption: 'BioLynk healthcare coordination platform interface.',
      fallbackText: 'BioLynk active platform prototype.',
    },
    caseStudy: {
      overview:
        'BioLynk is a healthcare donor coordination and networking platform prototype designed to streamline donor profile management, discovery, and verified direct communication.',
      problemContext:
        'Time-sensitive donor coordination frequently suffers from fragmented communication across informal channels, lacking structured verification and centralized availability tracking.',
      approachArchitecture:
        'Engineered with Next.js and TypeScript, utilizing Tailwind CSS and Radix UI primitives for accessible component states. Employs Firebase for backend authentication and real-time medical donor record indexing.',
      keyFeatures: [
        'Role-based donor and recipient profile registration workflows',
        'Structured donor availability and category indexing',
        'Accessible interface components with keyboard and screen reader support',
      ],
      verificationTesting:
        'Prototype workflows validated through role registration, mock donor profile queries, and responsive layout verification across desktop and mobile devices.',
      currentStatusNote:
        'Functional platform prototype with public repository on GitHub.',
      previewAssetFilename: 'biolynk-preview.png',
    },
  },

  // 3. ResumeTrices
  {
    id: 'project-resumetrices',
    slug: 'resumetrices',
    title: 'ResumeTrices',
    tagline: 'AI-Powered Resume Analysis & ATS Intelligence Platform',
    summary:
      'Full-stack candidate resume evaluation platform parsing PDF CVs and analyzing candidate competence against job descriptions.',
    description:
      'Extracts resume content from uploaded PDF documents, computes role compatibility scores, and provides structured skill gap analysis.',
    category: 'systems-ai',
    maturity: 'prototype',
    archetype: 'product-saas',
    role: 'Full-Stack Developer',
    teamProject: false,
    featuredRank: 3,
    track: 'main',
    technologies: ['Node.js', 'Express', 'Google Gemini API', 'OpenAI API', 'pdf-parse', 'Firebase'],
    links: {
      repo: 'https://github.com/Naman1012-ai/Resumetrices',
      live: 'https://resumetrices.onrender.com',
    },
    evidence: {
      assetFilename: 'resumetrices-preview.png',
      type: 'image',
      caption: 'ResumeTrices candidate competence evaluation and ATS intelligence dashboard.',
      fallbackText: 'ResumeTrices active analysis platform.',
    },
    caseStudy: {
      overview:
        'ResumeTrices is an AI-powered resume analysis and ATS intelligence platform that evaluates candidate resumes against job descriptions to provide structured skill gap insights.',
      problemContext:
        'Technical job seekers struggle to understand how ATS parsers evaluate resume documents and identify domain prerequisites before applying.',
      approachArchitecture:
        'Full-stack architecture with a Node.js and Express backend. Employs pdf-parse for text extraction, coupled with Google Gemini API and OpenAI API orchestrations to extract and compare competencies.',
      keyFeatures: [
        'Client-side PDF upload with backend text extraction and normalization',
        'Role compatibility scoring based on structured requirement extraction',
        'Actionable skill gap analysis highlighting missing technical prerequisites',
      ],
      verificationTesting:
        'Parsing pipeline tested with structured sample PDF resumes, vacancy descriptions, and API prompt response validations.',
      currentStatusNote:
        'Prototype system with verified public GitHub repository.',
      previewAssetFilename: 'resumetrices-preview.png',
    },
  },

  // 4. Global Energy Risk Monitor
  {
    id: 'project-energy-risk',
    slug: 'global-energy-risk-monitor',
    title: 'Global Energy Risk Monitor',
    tagline: 'Geopolitical Energy Risk Analytics & Intelligence Platform',
    summary:
      'An intelligence platform analyzing geopolitical energy-security risks, supply-chain vulnerabilities, and trade dependencies across countries and regions.',
    description:
      'Combines energy dataset processing, risk analytics, and trend visualization to evaluate infrastructure and geopolitical vulnerabilities.',
    category: 'systems-ai',
    maturity: 'prototype',
    archetype: 'data-analytics',
    role: 'Developer',
    teamProject: false,
    featuredRank: 4,
    track: 'main',
    technologies: ['C++', 'Node.js', 'Data Analytics', 'Risk Modeling'],
    links: {
      repo: 'https://github.com/Naman1012-ai/Global_Energy_Risk_Manager',
    },
    evidence: {
      assetFilename: 'energy-risk-preview.png',
      type: 'image',
      caption: 'Global Energy Risk Monitor analytics dashboard and regional risk explorer.',
      fallbackText: 'Global Energy Risk Monitor analytics platform.',
    },
    caseStudy: {
      overview:
        'Global Energy Risk Monitor is an intelligence platform analyzing geopolitical energy-security vulnerabilities, infrastructure dependencies, and international trade flows.',
      problemContext:
        'Assessing geopolitical shocks on national energy infrastructure requires synthesizing multi-source import/export datasets, pipeline dependencies, and regional exposure metrics.',
      approachArchitecture:
        'High-performance computational modules written in C++ for processing energy trade graphs and computing dependency coefficients, integrated with Node.js data processing pipelines for structured analytics.',
      keyFeatures: [
        'Geopolitical risk modeling based on trade flow dependency indices',
        'Infrastructure vulnerability tracking across regional corridors',
        'Structured analytical summaries for energy security assessment',
      ],
      verificationTesting:
        'Data ingestion and risk index computations verified against test trade dependency datasets and pipeline incident scenario matrices.',
      currentStatusNote:
        'Analytical software prototype with verified public GitHub repository.',
      previewAssetFilename: 'energy-risk-preview.png',
    },
  },

  // 5. DocFrame
  {
    id: 'project-docframe',
    slug: 'docframe',
    title: 'DocFrame',
    tagline: 'High-Performance Local-First Text-to-PDF Engine',
    summary:
      'Client-side document rendering and PDF export web application converting Markdown, DOCX, and HTML into structured, printable vector documents.',
    description:
      'Features discrete-sheet pagination, multi-column layouts, and client-side AI document transformation with multiple local and remote provider integrations.',
    category: 'developer-tools',
    maturity: 'production',
    archetype: 'product-saas',
    role: 'Creator & Core Maintainer',
    teamProject: false,
    featuredRank: 5,
    track: 'main',
    technologies: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'jsPDF', 'PDF.js'],
    links: {
      repo: 'https://github.com/Naman1012-ai/DocFrame',
      live: 'https://doc-frame.vercel.app',
    },
    evidence: {
      assetFilename: 'docframe-preview.png',
      type: 'image',
      caption: 'DocFrame local-first document authoring and vector PDF export engine.',
      fallbackText: 'DocFrame production interface.',
    },
    caseStudy: {
      overview:
        'DocFrame is a high-performance local-first text-to-PDF engine that renders Markdown, DOCX, and HTML into structured, printable vector documents entirely client-side.',
      problemContext:
        'Server-side document conversion creates privacy vulnerabilities when handling sensitive or proprietary documents, while browser print dialogs lack discrete pagination control and consistent vector output.',
      approachArchitecture:
        'Client-side rendering pipeline utilizing React 19, TypeScript, and Vite. Leverages jsPDF and PDF.js to build vector page representations directly in browser memory without sending document data to external servers.',
      keyFeatures: [
        'Local-first client-side architecture with zero remote document transmission',
        'Discrete-sheet pagination with print bleed and margin controls',
        'Multi-column layout support for technical documentation and reports',
        'Client-side AI document transformation support with configurable providers',
      ],
      verificationTesting:
        'Production-ready codebase with unit tests, strict TypeScript types, and verified public repository.',
      currentStatusNote:
        'Production release maintained with verified public repository on GitHub.',
      previewAssetFilename: 'docframe-preview.png',
    },
  },

  // 6. Quiz Master
  {
    id: 'project-quiz-master',
    slug: 'quiz-master',
    title: 'Quiz Master',
    tagline: 'Modular CLI Quiz Engine with Real-Time Timer',
    summary:
      'A modular command-line interface quiz application written in C with an asynchronous countdown timer and persistent file-based data storage.',
    description:
      'Features multi-user authentication, subject-specific question banks, non-blocking real-time timer logic, and global high-score leaderboard tracking.',
    category: 'developer-tools',
    maturity: 'completed',
    archetype: 'terminal-cli',
    role: 'Developer',
    teamProject: false,
    featuredRank: 6,
    track: 'main',
    technologies: ['C', 'File I/O', 'CLI Architecture', 'Modular Programming'],
    links: {
      repo: 'https://github.com/Naman1012-ai/Quiz-Master',
    },
    evidence: {
      assetFilename: 'quiz-master-preview.png',
      type: 'image',
      caption: 'Quiz Master live quiz question with real-time countdown timer and global leaderboard.',
      fallbackText: 'Quiz Master console quiz engine.',
    },
    caseStudy: {
      overview:
        'Quiz Master is a modular command-line interface quiz application written in C with an asynchronous real-time countdown timer and persistent file-based data storage.',
      problemContext:
        'Creating responsive, non-blocking countdown timers in standard ANSI C console applications without graphical libraries or heavy multi-threading dependencies.',
      approachArchitecture:
        'Modular procedural C architecture cleanly separating authentication routines, question bank parsers, asynchronous timer interrupt loops, and file I/O operations.',
      keyFeatures: [
        'Multi-user authentication and account record management',
        'Non-blocking real-time countdown timer per question',
        'Persistent high-score leaderboard tracking via formatted file storage',
        'Subject-specific question categorisation',
      ],
      verificationTesting:
        'Console-level boundary testing for non-blocking timer interrupts, question file parsers, and persistent user score serialization.',
      currentStatusNote:
        'Completed console engineering project with verified public GitHub repository.',
      previewAssetFilename: 'quiz-master-preview.png',
    },
  },

  // 7. ATM Machine
  {
    id: 'project-atm-machine',
    slug: 'atm-machine',
    title: 'ATM Machine',
    tagline: 'Terminal-Based Banking & Transaction Simulation',
    summary:
      'A robust terminal-based Automated Teller Machine simulation built in C with secure PIN masking and persistent file-based transaction logging.',
    description:
      'Implements automated 6-digit account generation, deposit and withdrawal validation, balance inquiry, and persistent transaction history logging.',
    category: 'developer-tools',
    maturity: 'completed',
    archetype: 'terminal-cli',
    role: 'Developer',
    teamProject: false,
    featuredRank: 7,
    track: 'main',
    technologies: ['C', 'File I/O', 'Data Persistence', 'CLI Architecture'],
    links: {
      repo: 'https://github.com/Naman1012-ai/ATM_MACHINE',
    },
    evidence: {
      assetFilename: 'atm-machine-preview.png',
      type: 'image',
      caption: 'ATM Machine verified user account details and transaction history audit ledger.',
      fallbackText: 'ATM Machine banking simulation.',
    },
    caseStudy: {
      overview:
        'ATM Machine is a terminal-based banking and transaction simulation built in C featuring secure PIN masking and persistent transaction audit logs.',
      problemContext:
        'Simulating transactional integrity, account number generation, and data persistence in an educational systems engineering context using low-level procedural C.',
      approachArchitecture:
        'Procedural C system utilizing terminal escape handling for masked credential input, strict balance boundary validation, and structured file I/O for account balance persistence.',
      keyFeatures: [
        'Automated 6-digit unique account number generation',
        'Deposit, withdrawal, and transfer validation with boundary checks',
        'Masked PIN entry for terminal-based privacy',
        'Persistent transaction audit history logging',
      ],
      verificationTesting:
        'Simulated transaction test suite evaluating balance boundary guards, PIN masking escape characters, and audit log file formatting.',
      currentStatusNote:
        'Completed educational engineering project with verified public GitHub repository.',
      previewAssetFilename: 'atm-machine-preview.png',
    },
  },

  // 8. Library Management System
  {
    id: 'project-cpp-library',
    slug: 'cpp-library-management-system',
    title: 'Library Management System',
    tagline: 'Console-Based Book Management & Circulation Program',
    summary:
      'A console-based library application in C++ demonstrating object-oriented programming with in-memory book and customer record management.',
    description:
      'Implements Book, IssuedBook, and Customer classes supporting book cataloging, issuance tracking, and member record management using standard C++ containers.',
    category: 'developer-tools',
    maturity: 'completed',
    archetype: 'systems-oop',
    role: 'Developer',
    teamProject: false,
    featuredRank: 8,
    track: 'main',
    technologies: ['C++', 'OOP', 'Standard Library'],
    evidence: {
      assetFilename: 'library-system-preview.png',
      type: 'image',
      caption: 'Library Management System catalog inventory and member book circulation tracker.',
      fallbackText: 'Library Management System console program.',
    },
    caseStudy: {
      overview:
        'Library Management System is a console-based library application demonstrating object-oriented programming with in-memory book and customer record management.',
      problemContext:
        'Demonstrating clean OOP principles (encapsulation, abstraction, separation of concerns) for inventory circulation and member record tracking.',
      approachArchitecture:
        'Standard C++ implementation structured around Book, IssuedBook, and Customer classes, utilizing standard library sequence containers and stream I/O.',
      keyFeatures: [
        'Book cataloging, search, and availability tracking',
        'Customer registration and circulation record association',
        'Book checkout and return validation with date recording',
      ],
      verificationTesting:
        'OOP model verification testing member circulation limits, container insertions, and stream-based book serialization.',
      currentStatusNote:
        'Completed console application in verified local codebase.',
      previewAssetFilename: 'library-system-preview.png',
    },
  },

  // 9. Language-Agnostic Chatbot
  {
    id: 'project-chatbot',
    slug: 'language-agnostic-chatbot',
    title: 'Language-Agnostic Chatbot',
    tagline: 'Multilingual Conversational Assistant Prototype',
    summary:
      'FastAPI conversational backend prototype powered by Google Gemini API and SQLAlchemy persistence, validated with 241 automated tests.',
    description:
      'Decouples input language detection from response generation, featuring multi-turn context management and relational message storage.',
    category: 'systems-ai',
    maturity: 'prototype',
    archetype: 'backend-ai',
    role: 'Backend Developer',
    teamProject: false,
    featuredRank: 9,
    track: 'main',
    technologies: ['Python', 'FastAPI', 'Google Gemini API', 'SQLAlchemy', 'Pytest'],
    caseStudy: {
      overview:
        'Language-Agnostic Chatbot is a multilingual conversational assistant backend prototype powered by Google Gemini API and SQLAlchemy persistence, validated with 241 automated tests.',
      problemContext:
        'Decoupling incoming user language detection from response generation logic to provide seamless conversational continuity across diverse linguistic inputs.',
      approachArchitecture:
        'FastAPI asynchronous backend service in Python. Leverages Google Gemini API for natural language understanding and SQLAlchemy ORM for conversation session and message persistence.',
      keyFeatures: [
        'Asynchronous conversational endpoints with FastAPI',
        'Relational chat session history and message storage with SQLAlchemy',
        'Multilingual prompt engineering pipeline with Google Gemini API',
      ],
      verificationTesting:
        '241 automated unit and integration tests written with Pytest validating endpoint response formats, session persistence, and error handling.',
      currentStatusNote:
        'Tested backend prototype validated with 241 automated unit test suites.',
    },
  },

  // Standalone Track: Robotics & Autonomous Systems (NIDAR / VegaPilot)
  {
    id: 'project-nidar',
    slug: 'nidar-vegapilot',
    title: 'NIDAR / VegaPilot',
    tagline: 'Custom UAV Flight Controller & Autopilot Architecture',
    summary:
      'Quadcopter flight control firmware and hardware integration prototype running on Raspberry Pi Pico (RP2040) with ELRS/CRSF telemetry protocol support.',
    description:
      'Hardware and firmware prototype developed as part of a university robotics initiative. Explores sensor data acquisition, custom wiring pinouts, and flight stabilization dynamics.',
    category: 'embedded-robotics',
    maturity: 'prototype',
    archetype: 'research-robotics',
    role: 'Firmware & Telemetry Integration',
    teamProject: true,
    teamAttribution: 'Developed with robotics engineering peers at The NorthCap University',
    track: 'robotics-autonomous',
    excludeFromMainDiscovery: true,
    technologies: ['C/C++', 'Raspberry Pi Pico (RP2040)', 'ELRS / CRSF Protocol', 'Hardware-in-the-Loop'],
    evidence: {
      assetFilename: 'nidar-wiring-diagram.png',
      type: 'schematic',
      caption: 'RP2040 flight controller wiring diagram.',
      fallbackText: 'Hardware prototype in active testing.',
    },
    caseStudy: {
      overview:
        'NIDAR / VegaPilot is a custom quadcopter flight control firmware and hardware integration prototype engineered around the dual-core Raspberry Pi Pico (RP2040) microcontroller.',
      problemContext:
        'Commercial flight controllers often function as closed ecosystems with rigid telemetry pipelines. NIDAR explores building an open, inspectable flight stabilization and telemetry acquisition platform using accessible, high-performance silicon.',
      approachArchitecture:
        'Firmware written in embedded C/C++ leveraging RP2040 dual-core architecture: Core 0 handles low-latency sensor sampling (gyroscope, accelerometer) and flight stabilization loops, while Core 1 processes incoming serial communication packets via the ExpressLRS (ELRS) and CRSF protocols.',
      keyFeatures: [
        'Dual-core RP2040 firmware task allocation for deterministic timing',
        'ELRS / CRSF telemetry protocol decoding and packet verification',
        'I2C/SPI sensor acquisition pipeline for inertial measurement units',
        'Custom hardware pinout mapping and bench test harnesses',
      ],
      verificationTesting:
        'Bench testing and hardware-in-the-loop validation conducted on physical RP2040 breadboards and quadcopter frames.',
      currentStatusNote:
        'Hardware prototype in active testing. Firmware stabilization and receiver communication logic verified on test bench.',
    },
  },
]

/**
 * Returns projects sorted by featured rank (canonical order 1 through 9).
 * Filters out projects marked with excludeFromMainDiscovery or lacking a featuredRank.
 */
export function getFeaturedProjects(): Project[] {
  return projects
    .filter((project) => !project.excludeFromMainDiscovery && project.featuredRank !== undefined)
    .sort((a, b) => (a.featuredRank ?? 99) - (b.featuredRank ?? 99))
}

/**
 * Alias for getFeaturedProjects for clarity across discovery tracks.
 */
export const getMainProjects = getFeaturedProjects

/**
 * Returns all seeded projects across all tracks (including Robotics & Autonomous Systems).
 */
export function getAllProjects(): Project[] {
  return [...projects]
}

/**
 * Find project by its URL slug across all projects.
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

/**
 * Returns the standalone Robotics & Autonomous Systems track project (NIDAR / VegaPilot).
 */
export function getRoboticsTrackProject(): Project | undefined {
  return projects.find((project) => project.track === 'robotics-autonomous' && project.slug === 'nidar-vegapilot')
}

/**
 * Get adjacent projects for case study navigation across the canonical 9-project sequence.
 * Projects excluded from main discovery return undefined for both pointers.
 */
export function getAdjacentProjects(currentSlug: string): {
  previous?: Project
  next?: Project
} {
  const sorted = getFeaturedProjects()
  const currentIndex = sorted.findIndex((p) => p.slug === currentSlug)
  if (currentIndex === -1) return {}

  const previous = currentIndex > 0 ? sorted[currentIndex - 1] : undefined
  const next = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : undefined

  return { previous, next }
}
