/**
 * Automated test suite for Phase 02 Centralized Content & Asset System.
 * Validates content schemas, unique slugs, ranking rules, asset safety,
 * and Content Integrity Remediation rules.
 */
import {
  achievementsList,
  assetManifest,
  certificationsList,
  educationList,
  experienceList,
  getFeaturedProjects,
  getRoboticsTrackProject,
  projects,
  siteProfile,
} from '@/data'
import { getAssetPath, isAssetAvailable, resolveSafeAssetUrl } from '@/utils'

export function verifyContentAndAssetSystem(): { passed: boolean; message: string } {
  // 1. Exactly 10 approved projects seeded
  if (projects.length !== 10) {
    return {
      passed: false,
      message: `Expected exactly 10 seeded projects, got ${projects.length}`,
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

  const actualSlugs = projects.map((p) => p.slug)
  for (const expectedSlug of expectedSlugs) {
    if (!actualSlugs.includes(expectedSlug)) {
      return { passed: false, message: `Missing required approved project: ${expectedSlug}` }
    }
  }

  // Ensure unapproved projects were removed
  const unapprovedSlugs = [
    'resqnet',
    'autonomous-flight-simulation',
    'urban-corridor-clearance-model',
    'inamigos-foundation',
  ]
  for (const unapproved of unapprovedSlugs) {
    if (actualSlugs.includes(unapproved)) {
      return { passed: false, message: `Unapproved project found in projects list: ${unapproved}` }
    }
  }

  // 2. Unique project IDs and Slugs
  const seenIds = new Set<string>()
  const seenSlugs = new Set<string>()
  const slugRegex = /^[a-z0-9-]+$/

  for (const project of projects) {
    if (seenIds.has(project.id)) {
      return { passed: false, message: `Duplicate project ID found: ${project.id}` }
    }
    seenIds.add(project.id)

    if (seenSlugs.has(project.slug)) {
      return { passed: false, message: `Duplicate project slug found: ${project.slug}` }
    }
    if (!slugRegex.test(project.slug)) {
      return { passed: false, message: `Invalid non-URL-safe project slug: ${project.slug}` }
    }
    seenSlugs.add(project.slug)

    // Required fields check
    if (!project.title || !project.tagline || !project.summary || !project.role) {
      return { passed: false, message: `Project ${project.id} is missing core required text fields` }
    }
    if (!project.technologies || project.technologies.length === 0) {
      return { passed: false, message: `Project ${project.id} must specify at least one technology` }
    }
  }

  // 3. Prominence & Architecture Rules
  const featured = getFeaturedProjects()
  if (featured.length !== 9) {
    return { passed: false, message: `Expected 9 main portfolio projects, got ${featured.length}` }
  }

  const expectedMainOrder = [
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

  for (let i = 0; i < expectedMainOrder.length; i++) {
    if (featured[i].slug !== expectedMainOrder[i]) {
      return {
        passed: false,
        message: `Main portfolio position #${i + 1} expected ${expectedMainOrder[i]}, got ${featured[i].slug}`,
      }
    }
    if (featured[i].featuredRank !== i + 1) {
      return {
        passed: false,
        message: `Project ${featured[i].slug} expected featuredRank ${i + 1}, got ${featured[i].featuredRank}`,
      }
    }
  }

  const convia = projects.find((p) => p.slug === 'convia')
  const biolynk = projects.find((p) => p.slug === 'biolynk')
  const nidar = projects.find((p) => p.slug === 'nidar-vegapilot')
  const chatbot = projects.find((p) => p.slug === 'language-agnostic-chatbot')

  if (!convia || convia.featuredRank !== 1 || !convia.flagship) {
    return { passed: false, message: 'Convia must hold top prominence (featuredRank 1, flagship: true)' }
  }
  // Convia stack check (React/TypeScript, Firebase Realtime Database, Express; NO PostgreSQL)
  if (convia.technologies.some((t) => t.toLowerCase().includes('postgres'))) {
    return { passed: false, message: 'Convia must NOT claim PostgreSQL; unverified architecture' }
  }
  if (!convia.technologies.includes('Firebase Realtime Database')) {
    return { passed: false, message: 'Convia must reflect Firebase Realtime Database in its tech stack' }
  }

  if (!biolynk || biolynk.featuredRank !== 2 || !biolynk.flagship) {
    return { passed: false, message: 'BioLynk must hold secondary top prominence (featuredRank 2, flagship: true)' }
  }

  // NIDAR is separated into standalone robotics-autonomous track
  if (!nidar) {
    return { passed: false, message: 'NIDAR / VegaPilot project record must be preserved' }
  }
  if (nidar.track !== 'robotics-autonomous' || !nidar.excludeFromMainDiscovery) {
    return { passed: false, message: 'NIDAR / VegaPilot must be preserved in robotics-autonomous track with excludeFromMainDiscovery: true' }
  }
  if (nidar.featuredRank !== undefined) {
    return { passed: false, message: 'NIDAR / VegaPilot must not have a featuredRank in the main 9-project sequence' }
  }
  if (!nidar.teamProject || !nidar.teamAttribution) {
    return { passed: false, message: 'NIDAR / VegaPilot must properly declare team project attribution' }
  }
  const roboticsTrackProject = getRoboticsTrackProject()
  if (!roboticsTrackProject || roboticsTrackProject.slug !== 'nidar-vegapilot') {
    return { passed: false, message: 'getRoboticsTrackProject must resolve NIDAR / VegaPilot standalone track project' }
  }

  if (!chatbot || chatbot.featuredRank !== 9) {
    return { passed: false, message: 'Language-Agnostic Chatbot must have featuredRank 9' }
  }
  if (chatbot.maturity !== 'prototype') {
    return { passed: false, message: 'Language-Agnostic Chatbot must be labeled as prototype maturity' }
  }
  if (!chatbot.summary.includes('241') || chatbot.summary.includes('197')) {
    return { passed: false, message: 'Language-Agnostic Chatbot must cite 241 verified tests, not 197' }
  }

  // Check verified repository destination URLs (resolved redirects)
  const energyRisk = projects.find((p) => p.slug === 'global-energy-risk-monitor')
  const docframe = projects.find((p) => p.slug === 'docframe')
  const resumetrices = projects.find((p) => p.slug === 'resumetrices')
  const quizMaster = projects.find((p) => p.slug === 'quiz-master')
  const atm = projects.find((p) => p.slug === 'atm-machine')
  const cppLib = projects.find((p) => p.slug === 'cpp-library-management-system')

  if (convia.links?.repo !== 'https://github.com/Naman1012-ai/Convia') {
    return { passed: false, message: 'Convia repo URL must match confirmed destination https://github.com/Naman1012-ai/Convia' }
  }
  if (energyRisk?.links?.repo !== 'https://github.com/Naman1012-ai/Global_Energy_Risk_Manager') {
    return { passed: false, message: 'Global Energy Risk Monitor repo URL must match confirmed destination https://github.com/Naman1012-ai/Global_Energy_Risk_Manager' }
  }
  if (docframe?.links?.repo !== 'https://github.com/Naman1012-ai/DocFrame') {
    return { passed: false, message: 'DocFrame repo URL must match confirmed destination https://github.com/Naman1012-ai/DocFrame' }
  }
  if (resumetrices?.links?.repo !== 'https://github.com/Naman1012-ai/Resumetrices' && resumetrices?.links?.repo !== 'https://github.com/Naman1012-ai/ResumeTrices') {
    return { passed: false, message: 'ResumeTrices repo URL must match confirmed destination' }
  }
  if (biolynk?.links?.repo !== 'https://github.com/Naman1012-ai/Bio-Lynk') {
    return { passed: false, message: 'BioLynk repo URL must match confirmed destination https://github.com/Naman1012-ai/Bio-Lynk' }
  }
  if (quizMaster?.links?.repo !== 'https://github.com/Naman1012-ai/Quiz-Master') {
    return { passed: false, message: 'Quiz Master repo URL must match confirmed destination https://github.com/Naman1012-ai/Quiz-Master' }
  }
  if (atm?.links?.repo !== 'https://github.com/Naman1012-ai/ATM_MACHINE') {
    return { passed: false, message: 'ATM Machine repo URL must match confirmed destination https://github.com/Naman1012-ai/ATM_MACHINE' }
  }

  // Check verified live deployment URLs
  if (convia.links?.live !== 'https://con-via-pro.vercel.app') {
    return { passed: false, message: 'Convia live URL must match confirmed deployment https://con-via-pro.vercel.app' }
  }
  if (biolynk?.links?.live !== 'https://v0-biolynk-lives.vercel.app') {
    return { passed: false, message: 'BioLynk live URL must match confirmed deployment https://v0-biolynk-lives.vercel.app' }
  }
  if (docframe?.links?.live !== 'https://doc-frame.vercel.app') {
    return { passed: false, message: 'DocFrame live URL must match confirmed deployment https://doc-frame.vercel.app' }
  }
  if (resumetrices?.links?.live !== 'https://resumetrices.onrender.com') {
    return { passed: false, message: 'ResumeTrices live URL must match confirmed deployment https://resumetrices.onrender.com' }
  }

  // Ensure projects without confirmed live deployments do NOT have invented live links
  if (nidar.links?.live || energyRisk?.links?.live || quizMaster?.links?.live || atm?.links?.live || cppLib?.links?.live || chatbot.links?.live) {
    return { passed: false, message: 'Projects without confirmed live deployments must omit live links' }
  }

  // Ensure projects without public repos do NOT have invented links
  if (nidar.links?.repo || cppLib?.links?.repo || chatbot.links?.repo) {
    return { passed: false, message: 'Projects without confirmed public repos must omit repository links' }
  }

  // Maturity checks: Quiz Master, ATM, and C++ Library must NOT be 'production'
  if (quizMaster?.maturity === 'production' || atm?.maturity === 'production' || cppLib?.maturity === 'production') {
    return { passed: false, message: 'Educational CLI projects must not be labeled production' }
  }
  if (quizMaster?.maturity !== 'completed' || atm?.maturity !== 'completed' || cppLib?.maturity !== 'completed') {
    return { passed: false, message: 'Educational CLI projects must reflect accurate completed maturity' }
  }

  // C++ Library: no unsupported claims
  if (cppLib?.tagline.toLowerCase().includes('stl inventory') || cppLib?.technologies.includes('File Handling')) {
    return { passed: false, message: 'C++ Library Management System must not claim STL Inventory or File Handling' }
  }

  // 4. Asset Manifest Rules (Single Flat Directory)
  for (const entry of assetManifest) {
    if (entry.filename.includes('/') || entry.filename.includes('\\')) {
      return {
        passed: false,
        message: `Asset manifest filename contains path separator: ${entry.filename}. Only flat names allowed.`,
      }
    }
  }

  // 5. Safe Asset Resolution (No Broken URLs or Dead Links)
  const availableUrl = resolveSafeAssetUrl('convia-logo.png')
  if (availableUrl !== '/assets/convia-logo.png') {
    return { passed: false, message: `Failed to resolve available asset convia-logo.png: got ${availableUrl}` }
  }

  const missingUrl = resolveSafeAssetUrl('nidar-wiring-diagram.png')
  if (missingUrl !== null) {
    return { passed: false, message: 'Unavailable asset must resolve to null, preventing dead links' }
  }

  const unmanifestedUrl = resolveSafeAssetUrl('non-existent-image.png')
  if (unmanifestedUrl !== null) {
    return { passed: false, message: 'Unregistered asset must safely resolve to null fallback' }
  }

  if (isAssetAvailable('fake-asset.pdf')) {
    return { passed: false, message: 'isAssetAvailable returned true for non-existent asset' }
  }

  // 6. Credential Safety (Empty until explicitly supplied)
  if (achievementsList.length > 0) {
    return { passed: false, message: 'Achievements must remain empty until explicitly verified' }
  }
  if (certificationsList.length > 0) {
    return { passed: false, message: 'Certifications must remain empty until explicitly verified' }
  }

  // 7. Education & Experience Integrity
  if (educationList.length === 0 || !educationList[0]?.institution) {
    return { passed: false, message: 'Education data must contain NorthCap University record' }
  }
  if (!educationList[0].grade?.includes('9.4') && !educationList[0].highlights?.some((h) => h.includes('9.4'))) {
    return { passed: false, message: 'Education must reflect 9.4 CGPA for first-year academic performance' }
  }
  if (educationList[0].period?.start || educationList[0].period?.end) {
    return { passed: false, message: 'Education dates must remain unspecified until officially verified' }
  }

  if (experienceList.length === 0 || experienceList[0]?.organization !== 'InAmigos Foundation') {
    return { passed: false, message: 'Experience data must contain completed InAmigos Foundation internship' }
  }
  if (experienceList[0].period?.start || experienceList[0].period?.end) {
    return { passed: false, message: 'InAmigos internship dates must not be invented; keep unspecified' }
  }
  if (experienceList[0].contributions && experienceList[0].contributions.length > 0) {
    return { passed: false, message: 'InAmigos internship deliverables must not be invented' }
  }

  // 8. Site Profile
  if (!siteProfile.name || siteProfile.name !== 'Naman Prajapati') {
    return { passed: false, message: 'Site profile must identify Naman Prajapati' }
  }
  if (siteProfile.resume.filename && !isAssetAvailable(siteProfile.resume.filename)) {
    return { passed: false, message: 'Resume declared in profile must be available in asset manifest' }
  }
  const githubLink = siteProfile.socialLinks.find((s) => s.platform === 'github')
  if (!githubLink || !githubLink.url.includes('Naman1012-ai')) {
    return { passed: false, message: 'GitHub profile link must point to verified Naman1012-ai account' }
  }

  // 9. Centralized Path Helper
  if (getAssetPath('test.pdf') !== '/assets/test.pdf') {
    return { passed: false, message: 'getAssetPath failed standard resolution' }
  }
  if (getAssetPath('assets/nested.pdf') !== '/assets/nested.pdf') {
    return { passed: false, message: 'getAssetPath failed to strip assets/ prefix' }
  }

  return { passed: true, message: 'All content and asset system validation checks passed' }
}
