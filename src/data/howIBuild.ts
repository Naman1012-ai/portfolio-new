import type { HowIBuildData } from '@/types'

/**
 * Editorial engineering decision records grounded strictly in verified source code,
 * architectural contracts, and genuine project implementations.
 *
 * Demonstrates:
 * - How Naman approaches technical problems
 * - How he evaluates alternatives
 * - How he makes architectural decisions
 * - How he handles constraints and trade-offs
 * - What he learned from implementation
 */
export const howIBuildData: HowIBuildData = {
  badge: 'ENGINEERING JUDGMENT',
  heading: 'Engineering Judgement & Decision Records',
  subheading:
    'Architecture is trade-offs. Here is how I evaluate constraints, reject alternatives, and design for reliability across genuine projects.',
  entries: [
    {
      id: 'convia-idea-provenance',
      projectSlug: 'convia',
      projectTitle: 'Convia',
      decisionTitle: 'Data Provenance & Deletion Authority Across Workspace Imports',
      context: 'Collaborative Workspace · Public Marketplace & Import System',
      problem:
        'When public ideas were imported into private workspaces, original creators risked losing attribution and control if workspace copies could be detached or deleted independently without provenance tracking.',
      constraints:
        'Must allow open public idea exploration and internal team deliberation while strictly preserving creator IP rights and preventing unauthorized orphaned content across private workspaces.',
      optionsConsidered: [
        'Immediate Ownership Transfer: Sever the origin chain upon workspace import, granting the private workspace complete independent ownership.',
        'Detached Deep Copy: Duplicate database records as unlinked standalone items with no connection to the original author.',
        'Provenance-Linked Reference: Structure imported ideas with explicit origin metadata and preserve the originalOwner deletion authority across imported workspace copies.',
      ],
      decision:
        'Structured imported ideas with explicit origin provenance metadata (author ID, creation timestamp, source proposal reference) and preserved originalOwner deletion authority across imported workspace copies.',
      rejectedAlternative:
        'A naive deep copy or immediate ownership transfer upon workspace import was rejected because it would sever the provenance chain and strip original innovators of their control over public reuse.',
      tradeoff: {
        gained: 'Deterministic attribution tracking and author rights preservation across the public ideation ecosystem.',
        sacrificed: 'Workspace admins cannot unilaterally delete or rebrand imported ideas without respecting upstream origin references.',
      },
      outcome:
        'Maintains creator attribution and permission integrity while allowing workspace teams to freely explore, deliberate, and prioritize imported ideas.',
      lesson:
        'Designing multi-tenant collaborative data models requires establishing attribution and permission boundaries at the schema layer from day one rather than attempting to reconcile them through application middleware.',
      tags: ['Data Provenance', 'Permissions', 'Full-Stack'],
    },
    {
      id: 'convia-in-channel-search',
      projectSlug: 'convia',
      projectTitle: 'Convia',
      decisionTitle: 'In-Channel Scoped Message Discovery & Join-Time Privacy',
      context: 'Collaborative Workspace · Real-Time Communication',
      problem:
        'Team discussions span multiple topics; an unconstrained global search across all channels would jump users out of active conversational feeds, break visual context, and risk exposing pre-join message history.',
      constraints:
        'Active conversational context must not be broken during message inspection; new team members must never be exposed to private conversational histories predating their channel join timestamp.',
      optionsConsidered: [
        'Unconstrained Global Search Index: Cross-workspace query that returns all matching text across all channels regardless of boundary or join timestamp.',
        'Client-Side Regex Memory Filter: Load all workspace message history into memory and filter locally on the client.',
        'Canonical Path-Scoped Channel Queries: Scope search directly to active channel paths in Firebase Realtime Database with strict member join-time visibility boundaries.',
      ],
      decision:
        'Scoped message discovery directly to canonical channel paths in Firebase Realtime Database, enforced member join-time visibility boundaries, and preserved message metadata so search-result selection navigates smoothly within the active feed.',
      rejectedAlternative:
        'An unbounded cross-workspace global search index was rejected because it stripped channel context, leaked conversation history predating membership, and disrupted active team discussions.',
      tradeoff: {
        gained: 'Fast, in-context message and discussion retrieval with zero layout jumps and strict membership privacy boundaries.',
        sacrificed: 'Users cannot discover messages across channels they have not explicitly joined or prior to their access grant.',
      },
      outcome:
        'Fast, in-context message and discussion retrieval with zero layout jumps and strict membership privacy boundaries.',
      lesson:
        'Information retrieval in collaboration tools should reinforce conversational flow rather than pulling users away into a disconnected search modal.',
      tags: ['State Management', 'Privacy Boundaries', 'UX Flow'],
    },
    {
      id: 'docframe-local-vector-engine',
      projectSlug: 'docframe',
      projectTitle: 'DocFrame',
      decisionTitle: 'Client-Side In-Memory Vector Pipeline vs Server-Side PDF Rendering',
      context: 'Developer Tool · Local-First Text-to-PDF Engine',
      problem:
        'Converting web documents to PDFs via browser window.print() breaks pagination control and header placement, while server-side conversion services introduce latency and transmit proprietary document text to external hosts.',
      constraints:
        'Zero external network transmission of proprietary documents, instant rendering without server cold starts, and high-DPI selectable vector text fidelity.',
      optionsConsidered: [
        'Serverless Headless Chrome (Puppeteer): HTML-to-PDF conversion via cloud worker or external microservice.',
        'HTML5 Canvas Rasterization (html2canvas): Render the DOM into a bitmap image and embed the bitmap inside a PDF container.',
        'In-Browser Vector Pipeline (jsPDF): Explicit client-side calculation of virtual page geometry, line break positions, and margin bleed in browser memory.',
      ],
      decision:
        'Engineered an in-browser vector rendering pipeline utilizing jsPDF and virtual paper dimensions, calculating explicit pagination break coordinates and margin bleed in client-side memory without external network calls.',
      rejectedAlternative:
        'Server-side headless Chrome generation was rejected due to cold-start delay and data privacy risks; HTML canvas rasterization was rejected because it produces bloated, non-selectable pixelated PDFs.',
      tradeoff: {
        gained: 'Absolute data privacy (100% on-device), zero infrastructure hosting cost, and selectable high-resolution vector output.',
        sacrificed: 'Requires explicit algorithmic calculation of complex margin bleed, line wrapping, and multi-page break coordinates in client TypeScript.',
      },
      outcome:
        'Zero-latency, 100% private document generation producing crisp, high-DPI vector PDFs entirely on the user device.',
      lesson:
        'Local-first client architectures eliminate privacy liabilities and recurring compute costs if you are willing to handle explicit coordinate geometry in code.',
      tags: ['Local-First', 'PDF Geometry', 'Client-Side'],
    },
    {
      id: 'resumetrices-schema-enforcement',
      projectSlug: 'resumetrices',
      projectTitle: 'ResumeTrices',
      decisionTitle: 'Structured JSON Prompt Schemas & Pydantic Validation vs Regex Parsing',
      context: 'AI Workflow · Candidate Competency Parsing',
      problem:
        'Comparing raw resume text against vacancy criteria requires deterministic skill scoring and gap identification, but raw LLM generation is non-deterministic and prone to formatting variations.',
      constraints:
        'Automated candidate competency scoring requires deterministic numerical matrices; non-deterministic free-form outputs break downstream calculation logic and corrupt analytics.',
      optionsConsidered: [
        'Natural Language Generation + Regex Extraction: Ask the LLM for free-form paragraphs and use regular expressions to parse out scores.',
        'Two-Pass Clarification Prompting: Generate raw evaluation text and then prompt a secondary model to summarize the outputs.',
        'Enforced JSON Schema Orchestration: Direct JSON schema constraints in Google Gemini prompts validated by strict Pydantic/TypeScript models.',
      ],
      decision:
        'Enforced structured JSON output schemas directly within Google Gemini prompt orchestrations, piping results through strict Pydantic/TypeScript validation models before passing extracted competencies to the scoring calculator.',
      rejectedAlternative:
        'Free-form natural language generation coupled with regex parsing was rejected because phrasing variations caused silent parsing drops, corrupted scoring matrices, and unhandled runtime exceptions.',
      tradeoff: {
        gained: 'Deterministic, type-safe scoring pipelines with predictable data models, graceful fallback handling, and zero downstream parsing failures.',
        sacrificed: 'Requires rigorous prompt schema maintenance and slight latency overhead during schema validation.',
      },
      outcome:
        'Deterministic, type-safe scoring pipelines with predictable data models, graceful fallback handling, and zero downstream parsing failures.',
      lesson:
        'LLMs are probabilistic reasoning engines; treat their outputs like untrusted network payloads and enforce strict boundary validation before touching domain models.',
      tags: ['AI Prompt Schema', 'Type Safety', 'Robust Parsing'],
    },
    {
      id: 'nidar-bench-vs-spec',
      projectSlug: 'nidar-vegapilot',
      projectTitle: 'NIDAR / VegaPilot',
      decisionTitle: 'Bench-Tested Firmware Partitioning vs Unverified Autonomous Flight Claims',
      context: 'University Research · Embedded UAV Flight Controller',
      problem:
        'Robotics prototypes often suffer from blurred lines between bench-tested firmware and high-level architectural proposals, creating misleading claims about autonomous flight capability.',
      constraints:
        'Engineering credibility demands total separation between laboratory bench-validated firmware and theoretical outdoor autonomous capabilities.',
      optionsConsidered: [
        'Complete Autonomous Drone Claim: Present the prototype as a fully finished autonomous quadcopter.',
        'High-Level Proposal Only: Describe the drone entirely on paper without referencing actual firmware implementation.',
        'Disciplined Firmware Partitioning: Strictly partition laboratory bench-tested firmware (RP2040 dual-core task allocation, I2C/SPI sensor acquisition, and ELRS telemetry packet decoding) from proposed full-scale autonomous flight.',
      ],
      decision:
        'Strictly partitioned laboratory bench-tested firmware (RP2040 dual-core task allocation, I2C/SPI sensor acquisition, and ELRS/CRSF serial telemetry packet decoding) from proposed full-scale autonomous navigation. Attributed physical integration to the university team while identifying personal contribution in embedded C/C++ firmware and telemetry decoding.',
      rejectedAlternative:
        'Claiming a complete autonomous quadcopter drone was rejected because real-world flight dynamics and autonomous mission clearance require extensive outdoor telemetry validation beyond laboratory bench tests.',
      tradeoff: {
        gained: 'Transparent, inspectable technical documentation that establishes genuine engineering credibility and clear division between verified code and future integration roadmap.',
        sacrificed: 'Foregoes flashy marketing claims about fully autonomous quadcopter flight in favor of factual, laboratory-verified reality.',
      },
      outcome:
        'Transparent, inspectable technical documentation that establishes genuine engineering credibility and clear division between verified code and future integration roadmap.',
      lesson:
        'In hardware and robotics, an honest description of bench-tested telemetry and sensor acquisition commands far greater professional respect than exaggerated claims about untested physical autonomy.',
      tags: ['Embedded C/C++', 'Telemetry Protocol', 'Engineering Integrity'],
    },
  ],
}
