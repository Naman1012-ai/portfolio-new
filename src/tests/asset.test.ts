/**
 * Test suite for portfolio architecture utilities.
 * Designed to be run with testing frameworks (e.g. Vitest) or smoke-tested.
 */
import { getAssetPath } from '@/utils'

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

  return { passed: true, message: 'All asset path resolutions passed' }
}
