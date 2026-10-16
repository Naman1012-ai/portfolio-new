import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { getFeaturedProjects, getRoboticsTrackProject } from '@/data'
import { ProjectShelf } from '@/components/projects'
import { HomePage, ProjectsPage } from '@/pages'
import { RouterProvider } from '@/router'

// Ensure React is present on globalThis for tsx runtime evaluation of JSX in Node
;(globalThis as unknown as { React: typeof React }).React = React

if (typeof (globalThis as unknown as { window?: unknown }).window === 'undefined') {
  ;(globalThis as unknown as { window: unknown }).window = {
    location: { pathname: '/', hash: '' },
    history: { pushState: () => {}, replaceState: () => {} },
    addEventListener: () => {},
    removeEventListener: () => {},
    scrollTo: () => {},
    requestAnimationFrame: (cb: (time: number) => void) => setTimeout(cb, 0),
    cancelAnimationFrame: (id: number) => clearTimeout(id),
    innerWidth: 1280,
    scrollY: 0,
    matchMedia: () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} }),
  }
}

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

  // 7. Verify Phase 02.1 Flagship Shelf Layout: Responsive sizing without 16px desktop overflow
  const flagshipMarkup = renderToStaticMarkup(
    React.createElement(
      RouterProvider,
      null,
      React.createElement(ProjectShelf, {
        id: 'featured',
        title: 'Featured Projects',
        projects: flagshipProjects,
        cardVariant: 'flagship',
      })
    )
  )

  if (!flagshipMarkup.includes('lg:w-[calc(50%-12px)]')) {
    return {
      passed: false,
      message: 'Flagship shelf cards must use responsive desktop width lg:w-[calc(50%-12px)] to prevent 16px overflow',
    }
  }

  if (flagshipMarkup.includes('lg:w-[540px]')) {
    return {
      passed: false,
      message: 'Flagship shelf cards must not hardcode overflowing lg:w-[540px]',
    }
  }

  // 8. Phase 03.3: Convia Flagship Architecture Verification
  // 8a. Verify Convia metadata configuration
  const convia = canonicalProjects.find((p) => p.slug === 'convia')
  if (!convia || convia.featuredRank !== 1 || !convia.flagship) {
    return {
      passed: false,
      message: 'Convia must be configured as flagship with featuredRank === 1',
    }
  }

  // 8b. Verify Convia primary case-study links and test IDs in Featured shelf
  if (!flagshipMarkup.includes('data-project-slug="convia"')) {
    return {
      passed: false,
      message: 'Featured shelf must render Convia with data-project-slug="convia"',
    }
  }
  if (!flagshipMarkup.includes('href="/projects/convia"')) {
    return {
      passed: false,
      message: 'Convia flagship card must provide link to /projects/convia',
    }
  }
  if (!flagshipMarkup.includes('aria-label="View Convia case study"')) {
    return {
      passed: false,
      message: 'Convia flagship card must provide accessible Case Study CTA',
    }
  }

  // 8c. Verify zero duplicate or orphaned Convia cards on HomePage and ProjectsPage
  const homeMarkup = renderToStaticMarkup(
    React.createElement(
      RouterProvider,
      null,
      React.createElement(HomePage, null)
    )
  )
  const conviaHomeOccurrences = homeMarkup.match(/data-project-slug="convia"/g)
  if (!conviaHomeOccurrences || conviaHomeOccurrences.length !== 1) {
    return {
      passed: false,
      message: `Convia flagship presentation must appear exactly once on HomePage gateway to prevent duplication, found ${conviaHomeOccurrences?.length ?? 0}`,
    }
  }

  const projectsMarkup = renderToStaticMarkup(
    React.createElement(
      RouterProvider,
      null,
      React.createElement(ProjectsPage, null)
    )
  )
  const conviaProjectsOccurrences = projectsMarkup.match(/data-project-slug="convia"/g)
  if (!conviaProjectsOccurrences || conviaProjectsOccurrences.length !== 1) {
    return {
      passed: false,
      message: `Convia flagship presentation must appear exactly once on ProjectsPage to prevent duplication, found ${conviaProjectsOccurrences?.length ?? 0}`,
    }
  }

  return {
    passed: true,
    message: 'All Phase 06.6 Netflix-Inspired Project Shelves & Browsing checks passed',
  }
}
