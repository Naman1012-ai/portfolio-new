/**
 * TypeScript types for Personal Narrative & Credibility system.
 * Governs About, Technical Positioning, and How I Build data structures.
 */

export interface TechnicalCapabilityGroup {
  id: string
  title: string
  description: string
  technologies: string[]
  projectEvidence: string
}

export interface AboutData {
  badge: string
  heading: string
  subheading: string
  intro: string
  storyParagraphs: string[]
  learningFocus: {
    label: string
    topics: string[]
  }
  longTermAmbition: string
  portrait: {
    assetFilename: string
    alt: string
    caption: string
  }
}

export interface AboutLensEvidenceItem {
  id: string
  title: string
  badge: string
  status?: string
  relevance: string
  projectSlug?: string
  anchorHref?: string
  linkText: string
  groundingLabel?: string
}

export interface AboutLens {
  id: 'building-toward' | 'how-i-learn' | 'whats-next'
  indexLabel: string
  title: string
  subtitle: string
  associatedPhrases: string[]
  evidenceLabel: string
  evidenceSubtext: string
  evidenceItems: AboutLensEvidenceItem[]
}


export interface HowIBuildTradeoff {
  gained: string
  sacrificed: string
}

export interface HowIBuildEntry {
  id: string
  projectSlug?: string // Linked to /projects/[slug] only when valid
  projectTitle: string
  decisionTitle?: string // Concise architectural decision title
  context: string
  problem: string
  constraints?: string
  optionsConsidered?: string[]
  decision: string
  rejectedAlternative: string
  tradeoff?: HowIBuildTradeoff
  outcome: string
  lesson?: string
  tags?: string[]
}

export interface HowIBuildData {
  badge: string
  heading: string
  subheading: string
  entries: HowIBuildEntry[]
}
