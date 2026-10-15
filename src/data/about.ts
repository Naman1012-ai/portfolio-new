import type { AboutData, TechnicalCapabilityGroup } from '@/types'

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
  heading: 'Engineering software with discipline, architectural curiosity, and product intent.',
  subheading: 'Undergraduate engineer focused on turning ideas into verified, durable systems.',
  intro:
    'I chose Computer Science and Engineering with a specialization in Artificial Intelligence and Machine Learning to understand how intelligent software systems operate from first principles and to develop the rigorous engineering discipline required to turn ideas into working products.',
  storyParagraphs: [
    'My engineering workflow centers on methodical investigation: I inspect existing codebases, dependency contracts, and root causes before introducing mutations. When implementing features, I validate changes using targeted automated tests and actual runtime behavior rather than assumptions.',
    'Across web platforms, developer tools, and embedded telemetry, I focus on building end-to-end solutions—from accessible, typed interfaces to asynchronous backends with resilient data boundaries.',
  ],
  learningFocus: {
    label: 'Current Learning Focus',
    topics: ['Python', 'Java', 'SQL & Databases', 'AI/ML Foundations', 'Embedded Systems'],
  },
  longTermAmbition:
    'My long-term ambition is to build useful, enduring software products and eventually found technology ventures grounded in rigorous engineering.',
  portrait: {
    assetFilename: 'profile.webp',
    alt: 'Naman Prajapati — Software & AI Engineer',
    caption: 'Computer Science & Engineering (AI & ML) · The NorthCap University',
  },
}
