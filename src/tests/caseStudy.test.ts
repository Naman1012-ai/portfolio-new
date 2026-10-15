/**
 * Automated test suite for Phase 04 Project Universe & Case Studies.
 * Validates:
 * - Slug resolution for all 10 approved projects
 * - Safe handling of unknown slugs (returns undefined)
 * - Complete, evidence-grounded case study data for each project
 * - Adjacent project navigation helper (getAdjacentProjects)
 * - Category filter integrity across all project categories
 * - Truthfulness & evidence consistency (Convia stack, Chatbot 32 tests, etc.)
 */
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  getAdjacentProjects,
  getProjectBySlug,
  projects,
} from '@/data'
import { ProjectDetailPage } from '@/pages'
import { parsePath, RouterProvider } from '@/router'

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
  }
}

export function verifyProjectUniverseAndCaseStudies(): { passed: boolean; message: string } {
  // 1. Verify 10 approved projects exist
  if (projects.length !== 10) {
    return {
      passed: false,
      message: `Expected 10 projects in manifest, found ${projects.length}`,
    }
  }

  const expectedSlugs = [
    'convia',
    'nidar-vegapilot',
    'biolynk',
    'global-energy-risk-monitor',
    'docframe',
    'resumetrices',
    'quiz-master',
    'atm-machine',
    'cpp-library-management-system',
    'language-agnostic-chatbot',
  ]

  // 2. Slug resolution and case study structure
  for (const slug of expectedSlugs) {
    const project = getProjectBySlug(slug)
    if (!project) {
      return {
        passed: false,
        message: `getProjectBySlug failed to resolve approved project slug: ${slug}`,
      }
    }

    if (!project.caseStudy) {
      return {
        passed: false,
        message: `Project ${slug} is missing caseStudy data`,
      }
    }

    const { caseStudy } = project
    if (!caseStudy.overview || caseStudy.overview.trim().length === 0) {
      return { passed: false, message: `Project ${slug} has empty caseStudy.overview` }
    }
    if (!caseStudy.problemContext || caseStudy.problemContext.trim().length === 0) {
      return { passed: false, message: `Project ${slug} has empty caseStudy.problemContext` }
    }
    if (!caseStudy.approachArchitecture || caseStudy.approachArchitecture.trim().length === 0) {
      return { passed: false, message: `Project ${slug} has empty caseStudy.approachArchitecture` }
    }
    if (!Array.isArray(caseStudy.keyFeatures) || caseStudy.keyFeatures.length < 2) {
      return { passed: false, message: `Project ${slug} must define at least 2 key features in case study` }
    }
    if (!caseStudy.verificationTesting || caseStudy.verificationTesting.trim().length === 0) {
      return { passed: false, message: `Project ${slug} has empty caseStudy.verificationTesting` }
    }
    if (!caseStudy.currentStatusNote || caseStudy.currentStatusNote.trim().length === 0) {
      return { passed: false, message: `Project ${slug} has empty caseStudy.currentStatusNote` }
    }
  }

  // 3. Safe handling of unknown slugs
  const unknownSlug = getProjectBySlug('non-existent-project')
  if (unknownSlug !== undefined) {
    return {
      passed: false,
      message: 'getProjectBySlug must return undefined for unknown project slugs',
    }
  }

  // 4. Adjacent project navigation helper (Canonical 9-project sequence)
  const mainPortfolioSlugs = [
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

  for (let i = 0; i < mainPortfolioSlugs.length; i++) {
    const slug = mainPortfolioSlugs[i]
    const { previous, next } = getAdjacentProjects(slug)

    // Check adjacent matches index order
    if (i === 0) {
      if (previous !== undefined) {
        return { passed: false, message: `First project (${slug}) should have undefined previous project` }
      }
      if (next?.slug !== mainPortfolioSlugs[1]) {
        return { passed: false, message: `First project (${slug}) should point to second project (${mainPortfolioSlugs[1]}) as next` }
      }
    } else if (i === mainPortfolioSlugs.length - 1) {
      if (previous?.slug !== mainPortfolioSlugs[i - 1]) {
        return { passed: false, message: `Last project (${slug}) should point to penultimate project as previous` }
      }
      if (next !== undefined) {
        return { passed: false, message: `Last project (${slug}) should have undefined next project` }
      }
    } else {
      if (previous?.slug !== mainPortfolioSlugs[i - 1] || next?.slug !== mainPortfolioSlugs[i + 1]) {
        return { passed: false, message: `Project (${slug}) navigation pointers mismatch array order` }
      }
    }
  }

  // Standalone track project (NIDAR) returns undefined adjacent pointers
  const nidarAdjacent = getAdjacentProjects('nidar-vegapilot')
  if (nidarAdjacent.previous !== undefined || nidarAdjacent.next !== undefined) {
    return { passed: false, message: 'getAdjacentProjects must return undefined for standalone track projects like NIDAR' }
  }

  // Unknown slug adjacent navigation returns { previous: undefined, next: undefined }
  const unknownAdjacent = getAdjacentProjects('random-slug')
  if (unknownAdjacent.previous !== undefined || unknownAdjacent.next !== undefined) {
    return { passed: false, message: 'getAdjacentProjects must return undefined for unknown slugs' }
  }

  // 5. Category grouping integrity
  const webPlatforms = projects.filter((p) => p.category === 'web-platform')
  const systemsAi = projects.filter((p) => p.category === 'systems-ai')
  const embeddedRobotics = projects.filter((p) => p.category === 'embedded-robotics')
  const developerTools = projects.filter((p) => p.category === 'developer-tools')

  if (webPlatforms.length !== 2) {
    return { passed: false, message: `Expected 2 web-platform projects, got ${webPlatforms.length}` }
  }
  if (systemsAi.length !== 3) {
    return { passed: false, message: `Expected 3 systems-ai projects, got ${systemsAi.length}` }
  }
  if (embeddedRobotics.length !== 1) {
    return { passed: false, message: `Expected 1 embedded-robotics project, got ${embeddedRobotics.length}` }
  }
  if (developerTools.length !== 4) {
    return { passed: false, message: `Expected 4 developer-tools projects, got ${developerTools.length}` }
  }
  if (webPlatforms.length + systemsAi.length + embeddedRobotics.length + developerTools.length !== 10) {
    return { passed: false, message: 'Category sums do not match total project count of 10' }
  }

  // 6. Truthfulness & Verified Claim Assertions
  const convia = getProjectBySlug('convia')
  const conviaArch = convia?.caseStudy?.approachArchitecture ?? ''
  if (!conviaArch.includes('Firebase Realtime Database')) {
    return { passed: false, message: 'Convia case study must reference Firebase Realtime Database architecture' }
  }
  if (conviaArch.toLowerCase().includes('postgresql')) {
    return { passed: false, message: 'Convia must NOT claim PostgreSQL unless verified' }
  }

  const chatbot = getProjectBySlug('language-agnostic-chatbot')
  const chatbotTesting = chatbot?.caseStudy?.verificationTesting ?? ''
  if (!chatbotTesting.includes('241')) {
    return { passed: false, message: 'Chatbot case study must accurately state 241 unit/integration tests' }
  }
  if (chatbotTesting.includes('197')) {
    return { passed: false, message: 'Chatbot must NOT claim 197 tests' }
  }

  const docframe = getProjectBySlug('docframe')
  if (docframe?.maturity !== 'production') {
    return { passed: false, message: 'DocFrame must preserve production maturity status' }
  }

  const nidar = getProjectBySlug('nidar-vegapilot')
  if (nidar?.maturity !== 'prototype') {
    return { passed: false, message: 'NIDAR/VegaPilot must preserve prototype maturity status' }
  }

  // 7. Team vs Individual Attribution Distinction
  const teamProjects = projects.filter((p) => p.teamProject)
  if (teamProjects.length !== 1 || teamProjects[0].slug !== 'nidar-vegapilot') {
    return { passed: false, message: 'Only NIDAR / VegaPilot should be flagged as teamProject: true' }
  }
  if (!nidar?.teamAttribution || !nidar.teamAttribution.includes('The NorthCap University')) {
    return { passed: false, message: 'NIDAR must explicitly state peer collaboration at The NorthCap University' }
  }
  const individualProjects = projects.filter((p) => !p.teamProject)
  for (const ind of individualProjects) {
    if (ind.teamAttribution) {
      return { passed: false, message: `Individual project ${ind.slug} should not define teamAttribution` }
    }
  }

  // 8. Repository Link & Local Implementation Audit
  if (!convia?.links?.repo || !convia.links.repo.includes('Convia')) {
    return { passed: false, message: 'Convia must preserve confirmed repository URL' }
  }
  const biolynk = getProjectBySlug('biolynk')
  if (!biolynk?.links?.repo || !biolynk.links.repo.includes('Bio-Lynk')) {
    return { passed: false, message: 'BioLynk must preserve confirmed repository URL' }
  }
  if (nidar?.links?.repo) {
    return { passed: false, message: 'NIDAR must NOT have a repository link on the portfolio' }
  }
  const cpp = getProjectBySlug('cpp-library-management-system')
  if (cpp?.links?.repo) {
    return { passed: false, message: 'C++ Library Management System must be local implementation without repository link' }
  }
  if (chatbot?.links?.repo) {
    return { passed: false, message: 'Language-Agnostic Chatbot must be local prototype without repository link' }
  }

  // 9. Live Demo Deployment Link Audit
  if (convia?.links?.live !== 'https://con-via-pro.vercel.app') {
    return { passed: false, message: 'Convia must preserve confirmed live deployment URL' }
  }
  if (biolynk?.links?.live !== 'https://v0-biolynk-lives.vercel.app') {
    return { passed: false, message: 'BioLynk must preserve confirmed live deployment URL' }
  }
  if (docframe?.links?.live !== 'https://doc-frame.vercel.app') {
    return { passed: false, message: 'DocFrame must preserve confirmed live deployment URL' }
  }
  const resumetrices = getProjectBySlug('resumetrices')
  if (resumetrices?.links?.live !== 'https://resumetrices.onrender.com') {
    return { passed: false, message: 'ResumeTrices must preserve confirmed live deployment URL' }
  }

  // 10. Route Parser Verification
  const rootRoute = parsePath('/', '')
  if (rootRoute.route !== 'home' || rootRoute.path !== '/') {
    return { passed: false, message: 'parsePath failed for root path /' }
  }

  const conviaRoute = parsePath('/projects/convia', '')
  if (conviaRoute.route !== 'project-detail' || conviaRoute.slug !== 'convia') {
    return { passed: false, message: 'parsePath failed for clean deep link /projects/convia' }
  }

  const trailingSlashRoute = parsePath('/projects/docframe/', '')
  if (trailingSlashRoute.route !== 'project-detail' || trailingSlashRoute.slug !== 'docframe') {
    return { passed: false, message: 'parsePath failed to normalize trailing slash' }
  }

  const hashFallbackRoute = parsePath('/', '#/projects/resumetrices')
  if (hashFallbackRoute.route !== 'project-detail' || hashFallbackRoute.slug !== 'resumetrices') {
    return { passed: false, message: 'parsePath failed for hash-based fallback route' }
  }

  const notFoundRoute = parsePath('/unknown-path', '')
  if (notFoundRoute.route !== 'not-found') {
    return { passed: false, message: 'parsePath failed for unknown route' }
  }

  // 11. Cold-start latency disclosure for ResumeTrices
  const resumetricesCaseStudy = resumetrices?.caseStudy
  if (!resumetricesCaseStudy?.demoNotice) {
    return {
      passed: false,
      message: 'ResumeTrices case study must define demoNotice explaining free-tier spin-down behavior',
    }
  }
  if (!resumetricesCaseStudy.demoNotice.includes('Render') || !resumetricesCaseStudy.demoNotice.includes('free tier')) {
    return {
      passed: false,
      message: 'ResumeTrices demoNotice must identify hosting on Render free tier',
    }
  }
  if (resumetricesCaseStudy.demoNotice.includes('50s') || resumetricesCaseStudy.demoNotice.includes('50 second')) {
    return {
      passed: false,
      message: 'ResumeTrices demoNotice must not promise an unverified 50-second delay',
    }
  }

  // 12. Render regression tests: adjacent navigation and subordinate demo notice
  const nidarMarkup = renderToStaticMarkup(
    React.createElement(
      RouterProvider,
      null,
      React.createElement(ProjectDetailPage, { slug: 'nidar-vegapilot' })
    )
  )
  if (nidarMarkup.includes('Adjacent project navigation')) {
    return {
      passed: false,
      message: 'NIDAR / VegaPilot must not render an empty adjacent project navigation container',
    }
  }
  if (nidarMarkup.includes('Previous Case Study') || nidarMarkup.includes('Next Case Study')) {
    return {
      passed: false,
      message: 'NIDAR / VegaPilot must not render previous or next case study links',
    }
  }

  const resumetricesMarkup = renderToStaticMarkup(
    React.createElement(
      RouterProvider,
      null,
      React.createElement(ProjectDetailPage, { slug: 'resumetrices' })
    )
  )
  if (!resumetricesMarkup.includes('Adjacent project navigation')) {
    return {
      passed: false,
      message: 'ResumeTrices must render adjacent project navigation',
    }
  }
  if (!resumetricesMarkup.includes(resumetricesCaseStudy.demoNotice)) {
    return {
      passed: false,
      message: 'ResumeTrices case study must render the verified demo notice below the live demo button',
    }
  }

  const conviaMarkup = renderToStaticMarkup(
    React.createElement(
      RouterProvider,
      null,
      React.createElement(ProjectDetailPage, { slug: 'convia' })
    )
  )
  if (!conviaMarkup.includes('Adjacent project navigation')) {
    return {
      passed: false,
      message: 'Convia must render adjacent project navigation',
    }
  }
  if (!conviaMarkup.includes('Next Case Study') || conviaMarkup.includes('Previous Case Study')) {
    return {
      passed: false,
      message: 'Convia must render Next Case Study and omit Previous Case Study',
    }
  }

  return {
    passed: true,
    message: 'All Phase 04 Project Universe and Case Study verification checks passed',
  }
}
