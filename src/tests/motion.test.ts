import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { Section } from '@/components/common/Section'
import { ConviaFlagshipCard } from '@/components/projects/ConviaFlagshipCard'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { useParallaxDepth } from '@/hooks/useParallaxDepth'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useTilt3D } from '@/hooks/useTilt3D'
import { tokens } from '@/styles/tokens'

export interface VerificationResult {
  passed: boolean
  message: string
}

export function verifyCinematicMotionAnd3D(): VerificationResult {
  // 1. Verify cinematic shadows and depth tokens in tokens.ts
  if (tokens.shadows.cinematic !== 'shadow-cinematic') {
    return { passed: false, message: 'Missing or invalid cinematic shadow token' }
  }

  if (tokens.shadows.cinematicLg !== 'shadow-cinematic-lg') {
    return { passed: false, message: 'Missing or invalid cinematicLg shadow token' }
  }

  if (tokens.shadows.glow !== 'shadow-glow') {
    return { passed: false, message: 'Missing or invalid glow shadow token' }
  }

  // 2. Verify motion durations
  if (tokens.motion.durationCinematic !== '300ms' || tokens.motion.durationShowcase !== '500ms') {
    return { passed: false, message: 'Missing or invalid cinematic motion duration tokens' }
  }

  // 3. Verify transition classes support motion-reduction
  if (!tokens.motion.transitionCinematic.includes('motion-reduce:transition-none')) {
    return { passed: false, message: 'transitionCinematic does not guard against prefers-reduced-motion' }
  }

  // 4. Verify hooks exports
  if (typeof useTilt3D !== 'function') {
    return { passed: false, message: 'useTilt3D is not exported as a functional hook' }
  }

  if (typeof useParallaxDepth !== 'function') {
    return { passed: false, message: 'useParallaxDepth is not exported as a functional hook' }
  }

  if (typeof useScrollReveal !== 'function') {
    return { passed: false, message: 'useScrollReveal is not exported as a functional hook' }
  }

  // 5. Verify component exports
  if (typeof Button !== 'function') {
    return { passed: false, message: 'Button is not exported as a functional component' }
  }

  if (typeof Card !== 'function') {
    return { passed: false, message: 'Card is not exported as a functional component' }
  }

  if (typeof Section !== 'function') {
    return { passed: false, message: 'Section is not exported as a functional component' }
  }

  if (typeof ConviaFlagshipCard !== 'function') {
    return { passed: false, message: 'ConviaFlagshipCard is not exported as a functional component' }
  }

  if (typeof ProjectCard !== 'function') {
    return { passed: false, message: 'ProjectCard is not exported as a functional component' }
  }

  return {
    passed: true,
    message: 'All Phase 06 Cinematic Motion, 3D Perspective & Micro-Interaction checks passed',
  }
}

