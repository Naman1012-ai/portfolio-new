import { createContext } from 'react'

export type PerspectiveMode = 'all' | 'founder' | 'interviewer' | 'investor'

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
  all: {
    id: 'all',
    label: 'All Perspectives',
    shortLabel: 'Overview',
    badge: 'Comprehensive',
    focusHeadline: 'Full Portfolio Overview',
    description: 'Balanced editorial view across web platforms, systems, AI workflows, and hardware research.',
    highlightedSlugs: ['convia', 'biolynk', 'resumetrices'],
    highlightedDecisions: ['convia-idea-provenance', 'resumetrices-schema-enforcement'],
  },
  founder: {
    id: 'founder',
    label: 'Founder & CTO',
    shortLabel: 'Founder',
    badge: 'Product & MVP Velocity',
    focusHeadline: 'Fast Execution, Product Ownership & MVP Architecture',
    description: 'Highlights Convia (collaborative workspace MVP), BioLynk (live health directory), and product conviction.',
    highlightedSlugs: ['convia', 'biolynk', 'resumetrices'],
    highlightedDecisions: ['convia-idea-provenance', 'convia-in-channel-search'],
  },
  interviewer: {
    id: 'interviewer',
    label: 'Engineering Interviewer',
    shortLabel: 'Interviewer',
    badge: 'Engineering Judgement & Rigor',
    focusHeadline: 'Systems Thinking, Trade-offs, Type Safety & Real Constraints',
    description: 'Highlights architectural decision logs, deterministic schema validation, local-first vector geometry, and bench firmware.',
    highlightedSlugs: ['convia', 'resumetrices', 'docframe', 'nidar-vegapilot'],
    highlightedDecisions: ['convia-idea-provenance', 'resumetrices-schema-enforcement', 'docframe-local-vector-engine', 'nidar-bench-vs-spec'],
  },
  investor: {
    id: 'investor',
    label: 'Venture Investor',
    shortLabel: 'Investor',
    badge: 'Builder Velocity & Scale',
    focusHeadline: 'Builder Ambition, Full-Stack Execution & Technical Trajectory',
    description: 'Highlights high-agency engineering trajectory, structured LLM pipelines, and long-term tech venture ambition.',
    highlightedSlugs: ['convia', 'resumetrices', 'biolynk'],
    highlightedDecisions: ['convia-idea-provenance', 'resumetrices-schema-enforcement'],
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
  perspective: 'all',
  info: PERSPECTIVES.all,
  setPerspective: () => {},
  isHighlightedSlug: () => false,
  isHighlightedDecision: () => false,
  isCommandOpen: false,
  openCommandPalette: () => {},
  closeCommandPalette: () => {},
})
