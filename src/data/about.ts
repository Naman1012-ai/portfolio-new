import type { AboutData, AboutLens, TechnicalCapabilityGroup } from '@/types'

/**
 * Verified capability groups grounded in actual repository implementations.
 * Distinguishes project usage from personal proficiency with concrete evidence.
 */
export const technicalCapabilities: TechnicalCapabilityGroup[] = [
  {
    id: 'software-product',
    title: 'Software & Product Engineering',
    description:
      'Architecting responsive web applications, accessible component systems, and state synchronization pipelines with clean interface boundaries.',
    technologies: ['React 19', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Radix UI'],
    projectEvidence: 'Demonstrated in Convia (collaborative workspace), BioLynk (healthcare directory), and DocFrame (vector PDF engine).',
  },
  {
    id: 'ai-applications',
    title: 'AI-Assisted Applications',
    description:
      'Orchestrating structured LLM prompt workflows, JSON schema validation, and ATS candidate scoring pipelines directly within production services.',
    technologies: ['Google Gemini API', 'Prompt Orchestration', 'JSON Schema Validation', 'pdf-parse'],
    projectEvidence: 'Demonstrated in ResumeTrices (ATS competency parser) and Language-Agnostic Chatbot (FastAPI backend).',
  },
  {
    id: 'backend-data',
    title: 'Backend & Data Systems',
    description:
      'Building asynchronous RESTful endpoints, relational session persistence, transactional write guards, and low-level file serialization routines.',
    technologies: ['Python / FastAPI', 'Node.js / Express', 'SQLAlchemy / Relational Schemas', 'C/C++ File I/O'],
    projectEvidence: 'Demonstrated in Chatbot (FastAPI/SQLAlchemy), Convia (Express), and ATM Machine / Quiz Master (procedural C).',
  },
  {
    id: 'systems-embedded',
    title: 'Systems & Embedded Exploration',
    description:
      'Developing dual-core microcontroller firmware, sensor acquisition pipelines, and hardware-in-the-loop bench testing within a university robotics team.',
    technologies: ['C/C++', 'Raspberry Pi Pico (RP2040)', 'ELRS / CRSF Protocol', 'I2C / SPI Bus'],
    projectEvidence: 'Demonstrated in NIDAR / VegaPilot team research prototype.',
  },
]

/**
 * Editorial narrative data for the About section.
 * Grounded strictly in confirmed personal motivations, verified learning areas,
 * disciplined engineering judgment, and long-term product ambition.
 * Structured into three concise ideas:
 * A. Engineering identity
 * B. Development/validation approach
 * C. Long-term direction
 */
export const aboutData: AboutData = {
  badge: 'ABOUT ME',
  heading: 'Building software, exploring AI/ML, and learning by working through real problems.',
  subheading: 'Computer Science undergraduate at The NorthCap University focused on practical software engineering and hands-on projects.',
  intro:
    'I am a Computer Science student who learns best by building. I chose to specialize in Artificial Intelligence and Machine Learning because I enjoy understanding how software works from the inside out and turn ideas into working applications that solve real-world problems.',
  storyParagraphs: [
    'Most of what I know has come from building projects and running into problems I did not know how to solve yet. When something breaks, I dig into the root causes, read documentation, and write automated tests to make sure things actually work.',
    'I learn by experimenting, iterating on prototypes, and gradually understanding how frontend interfaces, backend APIs, and data layers connect together.',
  ],
  learningFocus: {
    label: 'Currently Exploring',
    topics: ['Python', 'Java', 'SQL', 'Embedded Systems', 'AI/ML Workflows'],
  },
  longTermAmbition:
    'I am working toward becoming a well-rounded software engineer while deepening my knowledge of AI systems. Over time, I want to take on harder engineering problems and eventually build products and technology ventures of my own.',
  portrait: {
    assetFilename: 'profile.webp',
    alt: 'Naman Prajapati — Student Software Engineer',
    caption: 'Computer Science & Engineering (AI & ML) · The NorthCap University',
  },
}

/**
  * Interactive identity lenses mapping personal themes to verified project
  * and engineering judgement evidence.
  */
export const aboutLenses: AboutLens[] = [
  {
    id: 'building-toward',
    indexLabel: '01 / About Me',
    title: "What I'm Building Toward",
    subtitle: 'Practical platforms, full-stack architecture, and working products.',
    associatedPhrases: ['Building software', 'real problems'],
    evidenceLabel: 'WHERE THIS SHOWS UP',
    evidenceSubtext: 'Grounded in actual products and working applications in this portfolio.',
    evidenceItems: [
      {
        id: 'convia-lens-evidence',
        title: 'Convia',
        badge: 'Flagship Platform',
        status: 'Active Development',
        relevance: 'Built an end-to-end collaborative workspace syncing real-time team ideation boards and MVP prioritization.',
        projectSlug: 'convia',
        linkText: 'Explore Convia Case Study',
        groundingLabel: 'Full-Stack Web Architecture',
      },
      {
        id: 'biolynk-lens-evidence',
        title: 'BioLynk',
        badge: 'Healthcare Directory',
        status: 'Live Deployment',
        relevance: 'Engineered an emergency blood donor matching platform with responsive donor listings and urgent need notifications.',
        projectSlug: 'biolynk',
        linkText: 'Explore BioLynk Case Study',
        groundingLabel: 'Full-Stack Web Architecture',
      },
      {
        id: 'resumetrices-lens-evidence',
        title: 'ResumeTrices',
        badge: 'AI Competency Parser',
        status: 'Functional Prototype',
        relevance: 'Created an automated candidate parsing service that scores resumes against criteria using structured LLM schemas.',
        projectSlug: 'resumetrices',
        linkText: 'Explore ResumeTrices Case Study',
        groundingLabel: 'AI-Assisted Applications',
      },
    ],
  },
  {
    id: 'how-i-learn',
    indexLabel: '02 / How I Learn',
    title: 'Build → Break → Understand → Improve',
    subtitle: 'Finding root causes, testing assumptions, and making explicit engineering trade-offs.',
    associatedPhrases: ['learning', 'real problems'],
    evidenceLabel: 'SEE IT IN THE WORK',
    evidenceSubtext: 'Documented engineering decisions and debugging breakthroughs across projects.',
    evidenceItems: [
      {
        id: 'convia-provenance-evidence',
        title: 'Convia: Data Provenance Boundaries',
        badge: 'Engineering Judgement',
        status: 'Architecture Decision',
        relevance: 'Resolved data ownership loss across workspace imports by designing schema-level origin tracking instead of naive copies.',
        anchorHref: '#how-i-build',
        projectSlug: 'convia',
        linkText: 'Inspect Decision Record',
        groundingLabel: 'State Management & Ownership',
      },
      {
        id: 'resumetrices-schemas-evidence',
        title: 'ResumeTrices: Deterministic AI Schemas',
        badge: 'Failure Recovery',
        status: 'Type Safety & Validation',
        relevance: 'Discovered regex parsing silently failed on unstructured LLM outputs; fixed by enforcing strict JSON output schemas.',
        anchorHref: '#how-i-build',
        projectSlug: 'resumetrices',
        linkText: 'Inspect Decision Record',
        groundingLabel: 'AI Robustness & Prompt Validation',
      },
      {
        id: 'docframe-vector-evidence',
        title: 'DocFrame: Client-Side Vector Geometry',
        badge: 'Local-First Pipeline',
        status: 'On-Device Engine',
        relevance: 'Eliminated server hosting costs and document privacy leaks by calculating virtual page layout and margins in browser memory.',
        projectSlug: 'docframe',
        linkText: 'Explore Case Study & Decision',
        groundingLabel: 'Client-Side Vector Math',
      },
    ],
  },
  {
    id: 'whats-next',
    indexLabel: "03 / What's Next",
    title: 'Software, AI & Bigger Problems',
    subtitle: 'Deeper systems engineering, structured AI pipelines, and eventual technology ventures.',
    associatedPhrases: ['exploring AI/ML'],
    evidenceLabel: 'CURRENT TRAJECTORY',
    evidenceSubtext: 'Active exploration areas anchored in working repositories.',
    evidenceItems: [
      {
        id: 'structured-ai-evidence',
        title: 'Structured LLM Workflows & Agentic Systems',
        badge: 'AI Exploration',
        status: 'Active Trajectory',
        relevance: 'Advancing from one-off prompts to structured tool-calling, validated JSON schemas, and deterministic evaluation pipelines.',
        projectSlug: 'resumetrices',
        linkText: 'View AI Candidate Scoring',
        groundingLabel: 'Grounded in ResumeTrices & DocFrame',
      },
      {
        id: 'backend-api-evidence',
        title: 'API Architecture & Relational Backends',
        badge: 'Backend Systems',
        status: 'Active Trajectory',
        relevance: 'Deepening work in relational database schemas (SQLAlchemy/PostgreSQL), asynchronous endpoints, and type-safe API contracts.',
        anchorHref: '/projects',
        linkText: 'View Backend Systems in Projects',
        groundingLabel: 'Grounded in FastAPI Chatbot & Convia Express',
      },
      {
        id: 'embedded-systems-evidence',
        title: 'Microcontroller Firmware & Sensor Protocols',
        badge: 'Systems & Hardware',
        status: 'Team Research Track',
        relevance: 'Continuing hands-on bench testing with Raspberry Pi Pico (RP2040), I2C/SPI sensors, and CRSF/ELRS serial telemetry protocols.',
        projectSlug: 'nidar-vegapilot',
        linkText: 'View Robotics Research Track',
        groundingLabel: 'Grounded in NIDAR VegaPilot RP2040 prototype',
      },
    ],
  },
]

