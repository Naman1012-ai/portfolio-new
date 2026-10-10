import { projects } from '@/data'
import type { ProjectArchetype } from '@/types'
import {
  getArchetypeDefinition,
  getProjectArchetype,
  getProjectPreviewFilename,
  getProjectPreviewUrl,
  isAssetAvailable,
} from '@/utils'

/**
 * Automated test suite for Phase 06.5 Archetype Preview Components.
 * Validates archetype assignment, deterministic dispatcher mappings,
 * genuine asset resolution, honest blueprint fallbacks, and canonical project ordering.
 */
export function verifyArchetypePreviewSystem(): { passed: boolean; message: string } {
  // 1. Verify exactly 10 projects exist
  if (projects.length !== 10) {
    return {
      passed: false,
      message: `Expected 10 total projects, got ${projects.length}`,
    }
  }

  // 2. Validate all 7 archetypes exist with valid definitions
  const validArchetypes: ProjectArchetype[] = [
    'product-saas',
    'social-coordination',
    'data-analytics',
    'terminal-cli',
    'systems-oop',
    'backend-ai',
    'research-robotics',
  ]

  for (const arch of validArchetypes) {
    const def = getArchetypeDefinition(arch)
    if (!def || def.id !== arch || !def.label || !def.badgeText || !def.themeColor) {
      return {
        passed: false,
        message: `Archetype definition for ${arch} is missing or incomplete`,
      }
    }
  }

  // 3. Verify deterministic mapping for every project
  const expectedMappings: Record<string, ProjectArchetype> = {
    convia: 'product-saas',
    biolynk: 'social-coordination',
    resumetrices: 'product-saas',
    'global-energy-risk-monitor': 'data-analytics',
    docframe: 'product-saas',
    'quiz-master': 'terminal-cli',
    'atm-machine': 'terminal-cli',
    'cpp-library-management-system': 'systems-oop',
    'language-agnostic-chatbot': 'backend-ai',
    'nidar-vegapilot': 'research-robotics',
  }

  for (const project of projects) {
    const resolvedArchetype = getProjectArchetype(project)
    const expected = expectedMappings[project.slug]

    if (resolvedArchetype !== expected) {
      return {
        passed: false,
        message: `Project ${project.slug} expected archetype ${expected}, got ${resolvedArchetype}`,
      }
    }

    if (project.archetype !== expected) {
      return {
        passed: false,
        message: `Project ${project.slug} must have explicit archetype property matching ${expected}`,
      }
    }
  }

  // 4. Verify genuine screenshot resolution for the 8 projects with real evidence
  const projectsWithScreenshots = [
    { slug: 'convia', expectedFile: 'convia-preview.png' },
    { slug: 'biolynk', expectedFile: 'biolynk-preview.png' },
    { slug: 'resumetrices', expectedFile: 'resumetrices-preview.png' },
    { slug: 'global-energy-risk-monitor', expectedFile: 'energy-risk-preview.png' },
    { slug: 'docframe', expectedFile: 'docframe-preview.png' },
    { slug: 'quiz-master', expectedFile: 'quiz-master-preview.png' },
    { slug: 'atm-machine', expectedFile: 'atm-machine-preview.png' },
    { slug: 'cpp-library-management-system', expectedFile: 'library-system-preview.png' },
  ]

  for (const { slug, expectedFile } of projectsWithScreenshots) {
    const project = projects.find((p) => p.slug === slug)
    if (!project) {
      return { passed: false, message: `Project ${slug} not found` }
    }

    const filename = getProjectPreviewFilename(project)
    if (filename !== expectedFile) {
      return {
        passed: false,
        message: `Project ${slug} expected preview asset ${expectedFile}, got ${filename}`,
      }
    }

    if (!isAssetAvailable(expectedFile)) {
      return {
        passed: false,
        message: `Preview asset ${expectedFile} for project ${slug} is not marked available in manifest`,
      }
    }

    const url = getProjectPreviewUrl(project)
    if (!url || !url.includes(expectedFile)) {
      return {
        passed: false,
        message: `Preview URL for project ${slug} did not resolve properly: ${url}`,
      }
    }
  }

  // 5. Verify honest presentation for Chatbot and NIDAR (no fabricated screenshots)
  const chatbot = projects.find((p) => p.slug === 'language-agnostic-chatbot')
  if (!chatbot) {
    return { passed: false, message: 'Chatbot project record missing' }
  }
  const chatbotFile = getProjectPreviewFilename(chatbot)
  if (chatbotFile !== null) {
    return {
      passed: false,
      message: `Chatbot must not claim an unverified screenshot file, got ${chatbotFile}`,
    }
  }

  const nidar = projects.find((p) => p.slug === 'nidar-vegapilot')
  if (!nidar) {
    return { passed: false, message: 'NIDAR project record missing' }
  }
  const nidarFile = getProjectPreviewFilename(nidar)
  // nidar has evidence 'nidar-wiring-diagram.png' which isAvailable: false, so getProjectPreviewFilename must return null
  if (nidarFile !== null) {
    return {
      passed: false,
      message: `NIDAR must not resolve unavailable assets, got ${nidarFile}`,
    }
  }

  // 6. Verify canonical project ordering is unchanged
  const canonicalOrder = [
    'convia',
    'biolynk',
    'resumetrices',
    'global-energy-risk-monitor',
    'docframe',
    'quiz-master',
    'atm-machine',
    'cpp-library-management-system',
    'language-agnostic-chatbot',
  ]

  const mainProjects = projects
    .filter((p) => !p.excludeFromMainDiscovery && p.track !== 'robotics-autonomous')
    .sort((a, b) => (a.featuredRank || 99) - (b.featuredRank || 99))

  if (mainProjects.length !== 9) {
    return {
      passed: false,
      message: `Expected 9 main sequence projects, got ${mainProjects.length}`,
    }
  }

  for (let i = 0; i < canonicalOrder.length; i++) {
    if (mainProjects[i].slug !== canonicalOrder[i]) {
      return {
        passed: false,
        message: `Position #${i + 1} expected ${canonicalOrder[i]}, got ${mainProjects[i].slug}`,
      }
    }
  }

  return {
    passed: true,
    message: 'All Phase 06.5 Archetype Preview Component checks passed',
  }
}
