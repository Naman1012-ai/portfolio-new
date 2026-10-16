import { createContext } from 'react'

export type PerspectiveMode = 'explore' | 'engineering' | 'product'

export interface PerspectiveInfo {
  id: PerspectiveMode
  label: string
  shortLabel: string
  badge: string
  focusHeadline: string
  description: string
  highlightedSlugs: string[]
  highlightedDecisions: string[]
}

export const PERSPECTIVES: Record<PerspectiveMode, PerspectiveInfo> = {
  explore: {
    id: 'explore',
    label: 'Explore',
    shortLabel: 'Explore',
    badge: 'Balanced Overview',
    focusHeadline: 'Projects, personal journey, capabilities & overall trajectory',
    description:
      'A balanced way to discover the portfolio: projects, personal story, capabilities, interesting work, and overall trajectory.',
    highlightedSlugs: ['convia', 'resumetrices', 'biolynk'],
    highlightedDecisions: ['convia-idea-provenance', 'resumetrices-schema-enforcement'],
  },
  engineering: {
    id: 'engineering',
    label: 'Engineering',
    shortLabel: 'Engineering',
    badge: 'Engineering Focus',
    focusHeadline: 'Architecture, technical decisions, system flows & testing evidence',
    description:
      'For technically oriented visitors who want to understand how the work is built: Engineering Judgement, architecture, technical decisions, and system constraints.',
    highlightedSlugs: ['convia', 'resumetrices', 'docframe', 'nidar-vegapilot'],
    highlightedDecisions: [
      'convia-idea-provenance',
      'resumetrices-schema-enforcement',
      'docframe-local-vector-engine',
      'nidar-bench-vs-spec',
    ],
  },
  product: {
    id: 'product',
    label: 'Product',
    shortLabel: 'Product',
    badge: 'Product Focus',
    focusHeadline: 'Product ideas, problem selection, usability & outcome trajectory',
    description:
      'For visitors interested in what is being built, why it matters, and where it could go: product ideas, problem selection, usability, and future direction.',
    highlightedSlugs: ['convia', 'resumetrices', 'biolynk'],
    highlightedDecisions: [
      'convia-idea-provenance',
      'convia-in-channel-search',
      'resumetrices-schema-enforcement',
    ],
  },
}

export interface PerspectiveContextValue {
  perspective: PerspectiveMode
  info: PerspectiveInfo
  setPerspective: (mode: PerspectiveMode) => void
  isHighlightedSlug: (slug: string) => boolean
  isHighlightedDecision: (id: string) => boolean
  isCommandOpen: boolean
  openCommandPalette: () => void
  closeCommandPalette: () => void
}

export const PerspectiveContext = createContext<PerspectiveContextValue>({
  perspective: 'explore',
  info: PERSPECTIVES.explore,
  setPerspective: () => {},
  isHighlightedSlug: () => false,
  isHighlightedDecision: () => false,
  isCommandOpen: false,
  openCommandPalette: () => {},
  closeCommandPalette: () => {},
})
