import type { Project, ProjectArchetype } from '@/types'
import { isAssetAvailable, resolveSafeAssetUrl } from './asset'

/**
 * Standard definitions and metadata for project archetypes.
 * Connects engineering category, visual presentation, and verified evidence types.
 */
export interface ArchetypeDefinition {
  id: ProjectArchetype
  label: string
  badgeText: string
  badgeVariant: 'lavender' | 'neutral' | 'subtle' | 'accent' | 'success'
  themeColor: string
  description: string
  hasGenuineScreenshot: boolean
}

/**
 * Centralized, deterministic mapping of project slugs to preview archetypes.
 */
export const DEFAULT_PROJECT_ARCHETYPES: Record<string, ProjectArchetype> = {
  // Main Sequence (1 to 9)
  convia: 'product-saas',
  biolynk: 'social-coordination',
  resumetrices: 'product-saas',
  'global-energy-risk-monitor': 'data-analytics',
  docframe: 'product-saas',
  'quiz-master': 'terminal-cli',
  'atm-machine': 'terminal-cli',
  'cpp-library-management-system': 'systems-oop',
  'language-agnostic-chatbot': 'backend-ai',

  // Standalone Robotics & Autonomous Systems Track
  'nidar-vegapilot': 'research-robotics',
}

/**
 * Detailed archetype metadata specifications.
 */
export const ARCHETYPE_DEFINITIONS: Record<ProjectArchetype, ArchetypeDefinition> = {
  'product-saas': {
    id: 'product-saas',
    label: 'Product / SaaS',
    badgeText: 'PRODUCT / SAAS',
    badgeVariant: 'lavender',
    themeColor: '#7C3AED',
    description: 'Full-stack SaaS and web productivity platforms with interactive workspaces and document engines.',
    hasGenuineScreenshot: true,
  },
  'social-coordination': {
    id: 'social-coordination',
    label: 'Social Impact / Coordination',
    badgeText: 'COORDINATION NETWORK',
    badgeVariant: 'accent',
    themeColor: '#0284C7',
    description: 'Healthcare donor networks, profile management, and real-time emergency coordination systems.',
    hasGenuineScreenshot: true,
  },
  'data-analytics': {
    id: 'data-analytics',
    label: 'Data Intelligence / Analytics',
    badgeText: 'DATA / ANALYTICS',
    badgeVariant: 'neutral',
    themeColor: '#0D9488',
    description: 'High-performance computational modules analyzing geopolitical energy risks, supply chains, and infrastructure vulnerability.',
    hasGenuineScreenshot: true,
  },
  'terminal-cli': {
    id: 'terminal-cli',
    label: 'Terminal / CLI',
    badgeText: 'TERMINAL / CLI',
    badgeVariant: 'subtle',
    themeColor: '#E11D48',
    description: 'Low-level ANSI C console systems with asynchronous non-blocking timers, masked credentials, and transactional file persistence.',
    hasGenuineScreenshot: true,
  },
  'systems-oop': {
    id: 'systems-oop',
    label: 'Systems / OOP',
    badgeText: 'SYSTEMS / OOP',
    badgeVariant: 'subtle',
    themeColor: '#4F46E5',
    description: 'Standard C++ object-oriented domain architectures demonstrating encapsulation, circulation records, and stream I/O.',
    hasGenuineScreenshot: true,
  },
  'backend-ai': {
    id: 'backend-ai',
    label: 'Backend / AI Prototype',
    badgeText: 'BACKEND / AI ARCHITECTURE',
    badgeVariant: 'neutral',
    themeColor: '#9333EA',
    description: 'FastAPI asynchronous conversational service with Google Gemini API orchestrations, SQLAlchemy ORM persistence, and 241 Pytest tests.',
    hasGenuineScreenshot: false,
  },
  'research-robotics': {
    id: 'research-robotics',
    label: 'Research / Robotics',
    badgeText: 'EMBEDDED ROBOTICS',
    badgeVariant: 'accent',
    themeColor: '#D97706',
    description: 'Dual-core RP2040 quadcopter flight controller firmware, IMU sensor stabilization, and ELRS/CRSF serial telemetry protocol integration.',
    hasGenuineScreenshot: false,
  },
}

/**
 * Deterministically resolves the archetype for any project.
 * Uses explicit project property if defined, otherwise falls back to centralized map.
 */
export function getProjectArchetype(project: Project): ProjectArchetype {
  if (project.archetype) {
    return project.archetype
  }
  return DEFAULT_PROJECT_ARCHETYPES[project.slug] || 'product-saas'
}

/**
 * Returns metadata specification for an archetype.
 */
export function getArchetypeDefinition(archetype: ProjectArchetype): ArchetypeDefinition {
  return ARCHETYPE_DEFINITIONS[archetype] || ARCHETYPE_DEFINITIONS['product-saas']
}

/**
 * Resolves the genuine preview asset filename for a project if available.
 * Prioritizes case study preview screenshot, then evidence asset filename.
 * Returns null if no authentic asset is available in public/assets/.
 */
export function getProjectPreviewFilename(project: Project): string | null {
  if (project.caseStudy?.previewAssetFilename && isAssetAvailable(project.caseStudy.previewAssetFilename)) {
    return project.caseStudy.previewAssetFilename
  }
  if (project.evidence?.assetFilename && isAssetAvailable(project.evidence.assetFilename)) {
    return project.evidence.assetFilename
  }
  return null
}

/**
 * Safely resolves the web URL for a project's genuine preview asset.
 * Returns null if no authentic asset exists.
 */
export function getProjectPreviewUrl(project: Project): string | null {
  const filename = getProjectPreviewFilename(project)
  if (!filename) return null
  return resolveSafeAssetUrl(filename)
}
