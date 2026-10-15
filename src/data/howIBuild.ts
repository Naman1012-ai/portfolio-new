import type { HowIBuildData } from '@/types'

/**
 * Editorial engineering decisions grounded strictly in verified source code,
 * architectural contracts, and genuine project implementations.
 */
export const howIBuildData: HowIBuildData = {
  badge: 'ENGINEERING JUDGMENT',
  heading: 'How I Build: Real Problems & Architectural Decisions',
  subheading:
    'Concrete technical trade-offs, rejected alternatives, and verified outcomes from genuine software and hardware projects.',
  entries: [
    {
      id: 'convia-idea-provenance',
      projectSlug: 'convia',
      projectTitle: 'Convia',
      context: 'Collaborative Workspace · Public Marketplace & Import System',
      problem:
        'When public ideas were imported into private workspaces, original creators risked losing attribution and control if workspace copies could be detached or deleted independently without provenance tracking.',
      decision:
        'Structured imported ideas with explicit origin provenance metadata (author ID, creation timestamp, source proposal reference) and preserved originalOwner deletion authority across imported workspace copies.',
      rejectedAlternative:
        'A naive deep copy or immediate ownership transfer upon workspace import was rejected because it would sever the provenance chain and strip original innovators of their control over public reuse.',
      outcome:
        'Maintains creator attribution and permission integrity while allowing workspace teams to freely explore, deliberate, and prioritize imported ideas.',
      tags: ['Data Provenance', 'Permissions', 'Full-Stack'],
    },
    {
      id: 'convia-in-channel-search',
      projectSlug: 'convia',
      projectTitle: 'Convia',
      context: 'Collaborative Workspace · Real-Time Communication',
      problem:
        'Team discussions span multiple topics; an unconstrained global search across all channels would jump users out of active conversational feeds, break visual context, and risk exposing pre-join message history.',
      decision:
        'Scoped message discovery directly to canonical channel paths in Firebase Realtime Database, enforced member join-time visibility boundaries, and preserved message metadata so search-result selection navigates smoothly within the active feed.',
      rejectedAlternative:
        'An unbounded cross-workspace global search index was rejected because it stripped channel context, leaked conversation history predating membership, and disrupted active team discussions.',
      outcome:
        'Fast, in-context message and discussion retrieval with zero layout jumps and strict membership privacy boundaries.',
      tags: ['State Management', 'Privacy Boundaries', 'UX Flow'],
    },
    {
      id: 'docframe-local-vector-engine',
      projectSlug: 'docframe',
      projectTitle: 'DocFrame',
      context: 'Developer Tool · Local-First Text-to-PDF Engine',
      problem:
        'Converting web documents to PDFs via browser window.print() breaks pagination control and header placement, while server-side conversion services introduce latency and transmit proprietary document text to external hosts.',
      decision:
        'Engineered an in-browser vector rendering pipeline utilizing jsPDF and virtual paper dimensions, calculating explicit pagination break coordinates and margin bleed in client-side memory without external network calls.',
      rejectedAlternative:
        'Server-side headless Chrome generation was rejected due to cold-start delay and data privacy risks; HTML canvas rasterization was rejected because it produces bloated, non-selectable pixelated PDFs.',
      outcome:
        'Zero-latency, 100% private document generation producing crisp, high-DPI vector PDFs entirely on the user device.',
      tags: ['Local-First', 'PDF Geometry', 'Client-Side'],
    },
    {
      id: 'resumetrices-schema-enforcement',
      projectSlug: 'resumetrices',
      projectTitle: 'ResumeTrices',
      context: 'AI Workflow · Candidate Competency Parsing',
      problem:
        'Comparing raw resume text against vacancy criteria requires deterministic skill scoring and gap identification, but raw LLM generation is non-deterministic and prone to formatting variations.',
      decision:
        'Enforced structured JSON output schemas directly within Google Gemini prompt orchestrations, piping results through strict Pydantic/TypeScript validation models before passing extracted competencies to the scoring calculator.',
      rejectedAlternative:
        'Free-form natural language generation coupled with regex parsing was rejected because phrasing variations caused silent parsing drops, corrupted scoring matrices, and unhandled runtime exceptions.',
      outcome:
        'Deterministic, type-safe scoring pipelines with predictable data models, graceful fallback handling, and zero downstream parsing failures.',
      tags: ['AI Prompt Schema', 'Type Safety', 'Robust Parsing'],
    },
    {
      id: 'nidar-bench-vs-spec',
      projectSlug: 'nidar-vegapilot',
      projectTitle: 'NIDAR / VegaPilot',
      context: 'University Research · Embedded UAV Flight Controller',
      problem:
        'Robotics prototypes often suffer from blurred lines between bench-tested firmware and high-level architectural proposals, creating misleading claims about autonomous flight capability.',
      decision:
        'Strictly partitioned laboratory bench-tested firmware (RP2040 dual-core task allocation, I2C/SPI sensor acquisition, and ELRS/CRSF serial telemetry packet decoding) from proposed full-scale autonomous navigation. Attributed physical integration to the university team while identifying personal contribution in embedded C/C++ firmware and telemetry decoding.',
      rejectedAlternative:
        'Claiming a complete autonomous quadcopter drone was rejected because real-world flight dynamics and autonomous mission clearance require extensive outdoor telemetry validation beyond laboratory bench tests.',
      outcome:
        'Transparent, inspectable technical documentation that establishes genuine engineering credibility and clear division between verified code and future integration roadmap.',
      tags: ['Embedded C/C++', 'Telemetry Protocol', 'Engineering Integrity'],
    },
  ],
}
