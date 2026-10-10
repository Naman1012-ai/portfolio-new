/**
 * Test suite verifying design tokens and system foundations.
 */
import { tokens } from '@/styles/tokens'

export function verifyDesignSystemTokens(): { passed: boolean; message: string } {
  // 1. Verify required colors exist
  const requiredColors = [
    'canvas',
    'surface',
    'surfaceSubdued',
    'inkPrimary',
    'inkSecondary',
    'inkMuted',
    'lineDefault',
    'accent',
    'focus',
  ] as const

  for (const colorKey of requiredColors) {
    if (!tokens.colors[colorKey]) {
      return { passed: false, message: `Missing required color token: ${colorKey}` }
    }
  }

  // 2. Verify hex format of colors
  for (const [key, value] of Object.entries(tokens.colors)) {
    if (!value.startsWith('#')) {
      return { passed: false, message: `Color token ${key} is not a valid hex string: ${value}` }
    }
  }

  // 3. Verify typography scales
  const requiredTypography = ['display', 'h1', 'h2', 'h3', 'body', 'bodySm', 'caption', 'meta'] as const
  for (const typoKey of requiredTypography) {
    if (!tokens.typography.sizes[typoKey]) {
      return { passed: false, message: `Missing required typography size: ${typoKey}` }
    }
  }

  // 4. Verify motion durations
  if (!tokens.motion.durationFast || !tokens.motion.durationNormal) {
    return { passed: false, message: 'Missing motion transition definitions' }
  }

  return { passed: true, message: 'All design system token checks passed' }
}
