import { getFeaturedProjects, getRoboticsTrackProject } from '@/data'
import { ProjectShelf } from '@/components/projects'

/**
 * Automated test suite for Phase 06.6 Netflix-Inspired Project Shelves & Browsing.
 * Validates shelf hierarchy, canonical ordering, deduplication, category filtering integrity,
 * and component exports.
 */
export function verifyShelfSystem(): { passed: boolean; message: string } {
  // 1. Verify project universe counts
  const canonicalProjects = getFeaturedProjects()
  if (canonicalProjects.length !== 9) {
    return {
      passed: false,
      message: `Expected 9 canonical projects in getFeaturedProjects(), got ${canonicalProjects.length}`,
    }
  }

  const nidar = getRoboticsTrackProject()
  if (!nidar || nidar.slug !== 'nidar-vegapilot') {
    return {
      passed: false,
      message: 'Robotics track project nidar-vegapilot is missing or invalid',
    }
  }

  // 2. Validate Shelf 1: Featured Projects (Flagships)
  const flagshipProjects = canonicalProjects.filter((p) => p.flagship)
  if (flagshipProjects.length !== 2) {
    return {
      passed: false,
      message: `Expected exactly 2 flagship projects for Featured shelf, got ${flagshipProjects.length}`,
    }
  }

  if (flagshipProjects[0].slug !== 'convia' || flagshipProjects[1].slug !== 'biolynk') {
    return {
      passed: false,
      message: `Featured shelf must contain Convia (#1) and BioLynk (#2) in exact order. Got: ${flagshipProjects.map((p) => p.slug).join(', ')}`,
    }
  }

  // 3. Validate Shelf 2: All Projects (Canonical sequence #3 through #9)
  const remainingProjects = canonicalProjects.filter((p) => !p.flagship)
  if (remainingProjects.length !== 7) {
    return {
      passed: false,
      message: `Expected exactly 7 remaining canonical projects, got ${remainingProjects.length}`,
    }
  }

  const expectedRemainingOrder = [
    'resumetrices',
    'global-energy-risk-monitor',
    'docframe',
    'quiz-master',
    'atm-machine',
    'cpp-library-management-system',
    'language-agnostic-chatbot',
  ]

  for (let i = 0; i < expectedRemainingOrder.length; i++) {
    if (remainingProjects[i].slug !== expectedRemainingOrder[i]) {
      return {
        passed: false,
        message: `Remaining shelf project at index ${i} expected ${expectedRemainingOrder[i]}, got ${remainingProjects[i].slug}`,
      }
    }
  }

  // 4. Validate Zero Unnecessary Duplication across default shelves
  const featuredSlugs = new Set(flagshipProjects.map((p) => p.slug))
  const remainingSlugs = new Set(remainingProjects.map((p) => p.slug))
  for (const slug of featuredSlugs) {
    if (remainingSlugs.has(slug)) {
      return {
        passed: false,
        message: `Project ${slug} appears in both Featured and Remaining shelves in default view`,
      }
    }
  }

  if (featuredSlugs.size + remainingSlugs.size !== 9) {
    return {
      passed: false,
      message: `Total unique projects across shelves in default view must be 9, got ${featuredSlugs.size + remainingSlugs.size}`,
    }
  }

  // 5. Validate Category Filtering Integrity & Canonical Order Preservation
  const categories = ['web-platform', 'systems-ai', 'developer-tools'] as const
  let categoryTotal = 0

  for (const cat of categories) {
    const catProjects = canonicalProjects.filter((p) => p.category === cat)
    categoryTotal += catProjects.length

    // Ensure relative ordering within category strictly matches canonical rank
    for (let i = 0; i < catProjects.length - 1; i++) {
      const currentRank = catProjects[i].featuredRank ?? 999
      const nextRank = catProjects[i + 1].featuredRank ?? 999
      if (currentRank >= nextRank) {
        return {
          passed: false,
          message: `Category ${cat} violated canonical order: ${catProjects[i].slug} (${currentRank}) before ${catProjects[i + 1].slug} (${nextRank})`,
        }
      }
    }
  }

  if (categoryTotal !== 9) {
    return {
      passed: false,
      message: `Total projects across categories must be 9, got ${categoryTotal}`,
    }
  }

  // 6. Verify ProjectShelf component export and contract
  if (typeof ProjectShelf !== 'function') {
    return {
      passed: false,
      message: 'ProjectShelf component must be exported as a functional component',
    }
  }

  return {
    passed: true,
    message: 'All Phase 06.6 Netflix-Inspired Project Shelves & Browsing checks passed',
  }
}
