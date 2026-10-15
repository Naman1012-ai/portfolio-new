import { isAssetAvailable, projects } from '@/data'
import { getAssetPath, getProjectWebpUrl } from '@/utils'

export function verifyAssetPathResolution(): { passed: boolean; message: string } {
  const testCases = [
    { input: 'resume.pdf', expected: '/assets/resume.pdf' },
    { input: '/assets/profile.jpg', expected: '/assets/profile.jpg' },
    { input: 'assets/hero.png', expected: '/assets/hero.png' },
  ]

  for (const { input, expected } of testCases) {
    const actual = getAssetPath(input)
    if (actual !== expected) {
      return {
        passed: false,
        message: `Expected getAssetPath("${input}") to equal "${expected}", but got "${actual}"`,
      }
    }
  }

  // Phase 03.4: Verify optimized WebP variants registration
  const webpFiles = [
    'atm-machine-preview.webp',
    'biolynk-preview.webp',
    'convia-logo.webp',
    'convia-preview.webp',
    'docframe-preview.webp',
    'energy-risk-preview.webp',
    'library-system-preview.webp',
    'quiz-master-preview.webp',
    'resumetrices-preview.webp',
  ]

  for (const filename of webpFiles) {
    if (!isAssetAvailable(filename)) {
      return {
        passed: false,
        message: `Optimized WebP asset ${filename} is not registered or available in manifest`,
      }
    }
  }

  // Verify getProjectWebpUrl resolves for all projects with authentic screenshots
  for (const project of projects) {
    if (project.slug === 'language-agnostic-chatbot' || project.slug === 'nidar-vegapilot') {
      continue
    }
    const webpUrl = getProjectWebpUrl(project)
    if (!webpUrl || !webpUrl.endsWith('.webp')) {
      return {
        passed: false,
        message: `Project ${project.slug} failed to resolve optimized WebP URL: got ${webpUrl}`,
      }
    }
  }

  // Verify convia-preview.png remains intact for social crawlers
  if (!isAssetAvailable('convia-preview.png')) {
    return {
      passed: false,
      message: 'convia-preview.png must remain available for Open Graph / Twitter metadata compatibility',
    }
  }

  return { passed: true, message: 'All asset path resolutions and WebP optimization checks passed' }
}
