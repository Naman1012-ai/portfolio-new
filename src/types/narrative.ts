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

export interface HowIBuildEntry {
  id: string
  projectSlug?: string // Linked to /projects/[slug] only when valid
  projectTitle: string
  context: string
  problem: string
  decision: string
  rejectedAlternative: string
  outcome: string
  tags?: string[]
}

export interface HowIBuildData {
  badge: string
  heading: string
  subheading: string
  entries: HowIBuildEntry[]
}
