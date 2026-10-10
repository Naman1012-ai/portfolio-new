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
      'Developing responsive, accessible web interfaces and collaborative applications with modern component architectures and state isolation.',
    technologies: ['React 19', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Radix UI'],
    projectEvidence: 'Demonstrated in Convia, BioLynk, ResumeTrices, and DocFrame.',
  },
  {
    id: 'ai-applications',
    title: 'AI-Assisted Applications',
    description:
      'Integrating large language model APIs, prompt orchestration, and practical evaluation heuristics into concrete user workflows.',
    technologies: ['Google Gemini API', 'Prompt Orchestration', 'ATS Competency Scoring'],
    projectEvidence: 'Demonstrated in ResumeTrices and Language-Agnostic Chatbot.',
  },
  {
    id: 'backend-data',
    title: 'Backend & Data Systems',
    description:
      'Structuring RESTful API routes, asynchronous background tasks, relational data schemas, and low-level file I/O operations.',
    technologies: ['Python / FastAPI', 'Node.js / Express', 'SQL & Relational Schemas', 'C/C++ File I/O'],
    projectEvidence: 'Demonstrated in Chatbot, Convia, ATM Machine, Quiz Master, and Library System.',
  },
  {
    id: 'systems-embedded',
    title: 'Systems & Embedded Exploration',
    description:
      'Investigating low-level hardware communication, microcontroller firmware, and serial telemetry packet decoding as part of a university robotics team.',
    technologies: ['C/C++', 'Raspberry Pi Pico (RP2040)', 'ELRS / CRSF Protocol'],
    projectEvidence: 'Demonstrated in NIDAR / VegaPilot team research prototype.',
  },
]

/**
 * Editorial narrative data for the About section.
 * Grounded strictly in confirmed personal motivations, verified learning areas,
 * disciplined engineering judgment, and long-term product ambition.
 */
export const aboutData: AboutData = {
  badge: 'ABOUT ME',
  heading: 'Building software with discipline, curiosity, and product intent.',
  subheading: 'Undergraduate engineer focused on turning ideas into durable systems.',
  intro:
    'I chose Computer Science and Engineering with a specialization in Artificial Intelligence and Machine Learning to understand how software and intelligent systems are built from first principles and to develop the engineering fundamentals required to turn ideas into working products.',
  storyParagraphs: [
    'My development approach starts with investigation: I inspect existing codebases, dependency boundaries, and root causes before introducing changes. When implementing features, I validate changes using targeted automated tests and actual application behavior rather than assumptions.',
    'My practical work spans responsive web applications, AI-assisted tools, backend services, and team-based embedded hardware exploration. In each area, I prioritize clean architecture, honest validation boundaries, and readable implementations.',
  ],
  learningFocus: {
    label: 'Current Learning Focus',
    topics: ['Python', 'Java', 'SQL & Databases', 'AI/ML Foundations', 'Embedded Systems'],
  },
  longTermAmbition:
    'My long-term ambition is to build useful, enduring software products and eventually found technology ventures grounded in rigorous engineering.',
  portrait: {
    assetFilename: 'profile.webp',
    alt: 'Naman Prajapati — Software Engineer & Systems Builder',
    caption: 'Computer Science & Engineering (AI & ML) · The NorthCap University',
  },
}
