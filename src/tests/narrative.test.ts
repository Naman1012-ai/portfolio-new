import {
  aboutData,
  educationList,
  experienceList,
  howIBuildData,
  navigationItems,
  projects,
  siteMetadata,
  siteProfile,
  technicalCapabilities,
} from '@/data'
import { getAssetManifestEntry, isAssetAvailable, resolveSafeAssetUrl } from '@/utils'
import { AboutSection } from '@/components/about'
import { HowIBuildSection } from '@/components/howIBuild'
import { ExperienceSection } from '@/components/experience'

/**
 * Automated test suite for Phase: Personal Narrative & Credibility.
 * Validates About themes, How I Build decisions, profile image asset resolution,
 * capability group accuracy, absence of unsupported claims, and section anchor integrity.
 */
export function verifyPersonalNarrativeAndCredibility(): { passed: boolean; message: string } {
  // 1. Validate AboutSection Data Structure & Confirmed Personal Themes
  if (!aboutData.badge || !aboutData.heading || !aboutData.intro) {
    return { passed: false, message: 'About data missing required core text headers' }
  }

  // Theme: Chose CSE (AI & ML) to turn ideas into products
  if (
    !aboutData.intro.includes('Computer Science') ||
    !aboutData.intro.includes('Artificial Intelligence') ||
    !aboutData.intro.includes('turn ideas into')
  ) {
    return {
      passed: false,
      message: 'About intro must articulate choosing CSE (AI & ML) to understand systems and turn ideas into products',
    }
  }

  // Theme: Root-cause investigation & test-driven validation
  const storyCombined = aboutData.storyParagraphs.join(' ')
  if (
    !storyCombined.includes('root causes') ||
    !storyCombined.includes('tests')
  ) {
    return {
      passed: false,
      message: 'About story must highlight inspecting existing code/root causes and validating with tests',
    }
  }

  // Theme: Learning focus (Python, Java, SQL, databases, AI/ML, embedded systems)
  const requiredTopics = ['Python', 'Java', 'SQL', 'Embedded Systems']
  for (const topic of requiredTopics) {
    if (!aboutData.learningFocus.topics.some((t) => t.includes(topic))) {
      return {
        passed: false,
        message: `About learning focus missing required confirmed subject: ${topic}`,
      }
    }
  }

  // Theme: Long-term product & venture ambition
  if (!aboutData.longTermAmbition.toLowerCase().includes('venture')) {
    return {
      passed: false,
      message: 'About long-term ambition must articulate building products and technology ventures',
    }
  }

  // 2. Validate Profile Portrait Asset Resolution (Absent & Present Behaviors)
  const profileEntry = getAssetManifestEntry('profile.webp')
  if (!profileEntry) {
    return {
      passed: false,
      message: 'profile.webp must be registered in assetManifest',
    }
  }

  // When absent on disk (isAvailable: false in manifest)
  if (profileEntry.isAvailable || isAssetAvailable('profile.webp')) {
    return {
      passed: false,
      message: 'profile.webp should have isAvailable: false until actual webp portrait is added to public/assets/',
    }
  }

  const resolvedAbsentUrl = resolveSafeAssetUrl('profile.webp')
  if (resolvedAbsentUrl !== null) {
    return {
      passed: false,
      message: `resolveSafeAssetUrl('profile.webp') must return null when unavailable, got: ${resolvedAbsentUrl}`,
    }
  }

  // Verify that an available asset resolves safely without error
  const resolvedAvailableUrl = resolveSafeAssetUrl('convia-logo.png')
  if (resolvedAvailableUrl !== '/assets/convia-logo.png') {
    return {
      passed: false,
      message: `resolveSafeAssetUrl('convia-logo.png') expected '/assets/convia-logo.png', got: ${resolvedAvailableUrl}`,
    }
  }

  // 3. Validate How I Build Section Data Integrity
  if (!howIBuildData.entries || howIBuildData.entries.length < 2) {
    return {
      passed: false,
      message: `How I Build must have at least 2 verified entries, got ${howIBuildData.entries?.length || 0}`,
    }
  }

  const existingProjectSlugs = new Set(projects.map((p) => p.slug))

  for (const entry of howIBuildData.entries) {
    if (!entry.id || !entry.projectTitle || !entry.context || !entry.problem || !entry.decision || !entry.rejectedAlternative || !entry.outcome) {
      return {
        passed: false,
        message: `How I Build entry ${entry.id} is missing one or more required architectural decision fields`,
      }
    }

    // Slug validation: if projectSlug is provided, it MUST exist in canonical projects list
    if (entry.projectSlug && !existingProjectSlugs.has(entry.projectSlug)) {
      return {
        passed: false,
        message: `How I Build entry ${entry.id} references non-existent project slug: ${entry.projectSlug}`,
      }
    }

    // Credibility check: must NOT claim a complete autonomous drone
    const combinedEntryText = `${entry.problem} ${entry.decision} ${entry.rejectedAlternative} ${entry.outcome}`.toLowerCase()
    if (combinedEntryText.includes('complete autonomous drone') || combinedEntryText.includes('fully autonomous uav')) {
      return {
        passed: false,
        message: `How I Build entry ${entry.id} makes unverified claim of complete autonomous drone`,
      }
    }
  }

  // 4. Validate Technical Capability Groups
  if (technicalCapabilities.length !== 4) {
    return {
      passed: false,
      message: `Expected 4 capability groups, got ${technicalCapabilities.length}`,
    }
  }

  const expectedGroupTitles = [
    'Software & Product Engineering',
    'AI-Assisted Applications',
    'Backend & Data Systems',
    'Systems & Embedded Exploration',
  ]

  for (const title of expectedGroupTitles) {
    const found = technicalCapabilities.find((g) => g.title === title)
    if (!found || !found.technologies || found.technologies.length === 0 || !found.projectEvidence) {
      return {
        passed: false,
        message: `Capability group "${title}" is missing or lacks verified technologies/evidence`,
      }
    }
  }

  // 5. Strict Audit for Removed Unsupported Claims
  const unsupportedPhrases = [
    'high-test-coverage',
    'local-first vector engines',
    'realtime sync backends',
    'architecting autonomous firmware',
  ]

  const profileText = `${siteProfile.tagline} ${siteProfile.bio}`.toLowerCase()
  for (const phrase of unsupportedPhrases) {
    if (profileText.includes(phrase)) {
      return {
        passed: false,
        message: `siteProfile still contains unsupported phrase: "${phrase}"`,
      }
    }
  }

  if (siteMetadata.description.toLowerCase().includes('high-test-coverage')) {
    return {
      passed: false,
      message: 'siteMetadata.description contains unsupported phrase "high-test-coverage"',
    }
  }

  // 6. Navigation Anchors & Section ID Integrity
  const navHrefs = navigationItems.map((n) => n.href)
  if (
    !navHrefs.includes('#about') ||
    (!navHrefs.includes('#projects') && !navHrefs.includes('/projects')) ||
    !navHrefs.includes('#experience') ||
    !navHrefs.includes('#contact')
  ) {
    return {
      passed: false,
      message: 'navigationItems must contain #about, /projects, #experience, and #contact',
    }
  }

  // 7. Verify Optional Experience & Education Fields
  const edu = educationList[0]
  if (edu.period?.start || edu.period?.end) {
    return {
      passed: false,
      message: 'Education start/end dates must remain unspecified until verified',
    }
  }

  const exp = experienceList[0]
  if (exp.period?.start || exp.period?.end) {
    return {
      passed: false,
      message: 'Experience dates must remain unspecified until verified',
    }
  }
  if (exp.contributions && exp.contributions.length > 0) {
    return {
      passed: false,
      message: 'Experience contributions must not be invented',
    }
  }

  // 8. Component Export Integrity
  if (typeof AboutSection !== 'function') {
    return { passed: false, message: 'AboutSection must be exported as a functional component' }
  }
  if (typeof HowIBuildSection !== 'function') {
    return { passed: false, message: 'HowIBuildSection must be exported as a functional component' }
  }
  if (typeof ExperienceSection !== 'function') {
    return { passed: false, message: 'ExperienceSection must be exported as a functional component' }
  }

  return {
    passed: true,
    message: 'All Personal Narrative & Credibility verification checks passed',
  }
}
