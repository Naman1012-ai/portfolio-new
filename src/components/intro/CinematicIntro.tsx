import { useCallback, useEffect, useState } from 'react'
import { IdentityReveal } from './IdentityReveal'
import { IntroAtmosphere } from './IntroAtmosphere'
import { IntroSignal } from './IntroSignal'
import { PositioningReveal } from './PositioningReveal'
import { PortraitReveal } from './PortraitReveal'
import { WorkFragments } from './WorkFragments'

const SESSION_STORAGE_KEY = 'portfolio-intro-seen'

export type IntroPhase =
  | 'idle'
  | 'silence'
  | 'signal'
  | 'identity'
  | 'growth'
  | 'portrait'
  | 'positioning'
  | 'work'
  | 'buildup'
  | 'converge'
  | 'distortion'
  | 'transform'
  | 'resolving'
  | 'complete'

export interface CinematicIntroProps {
  /** Optional override to force playing for preview or verification */
  forcePlay?: boolean
  /** Optional initial phase for testing or controlled playback */
  initialPhase?: IntroPhase
  /** Callback fired when the intro finishes or is skipped */
  onComplete?: () => void
}

/**
 * Cinematic Hero Intro V3: Continuous Transformation
 *
 * Sequence (~6.15s continuous composition):
 * 0.00s Silence (#050505 canvas, subtle grain)
 * 0.20s Signal (hairline horizontal beam sweep)
 * 0.70s Identity Emerges (monumental NAMAN / PRAJAPATI typography reveal)
 * 1.60s Continuous Growth (identity glides upward to title position)
 * 2.10s Positioning Enters (readable tagline holds steady under identity for ~2.7s)
 * 3.40s Work Enters (real project fragments gently flank and frame the identity)
 * 4.80s Composition Converges (identity + statement + work coexist in visual equilibrium)
 * 4.95s Distortion Pulse (exact 140ms displacement pulse connecting work to transition)
 * 5.30s Transform into Hero (dark canvas pulls back smoothly, typography glides upward)
 * 6.15s Complete & Unmount (existing Hero is already resting in place underneath)
 */
export function CinematicIntro({
  forcePlay = false,
  initialPhase,
  onComplete,
}: CinematicIntroProps) {
  const [phase, setPhase] = useState<IntroPhase>(() => {
    if (initialPhase) return initialPhase
    if (forcePlay) return 'silence'

    if (typeof window === 'undefined') return 'complete'

    // Check prefers-reduced-motion safely
    if (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return 'complete'
    }

    // Check session storage safely
    try {
      if (
        typeof window.sessionStorage !== 'undefined' &&
        typeof window.sessionStorage.getItem === 'function'
      ) {
        const alreadySeen = window.sessionStorage.getItem(SESSION_STORAGE_KEY)
        if (alreadySeen === 'true') {
          return 'complete'
        }
      }
    } catch {
      // In private browsing or storage errors, proceed gracefully
    }

    return 'silence'
  })

  const completeIntro = useCallback(() => {
    try {
      if (
        typeof window !== 'undefined' &&
        typeof window.sessionStorage !== 'undefined' &&
        typeof window.sessionStorage.setItem === 'function'
      ) {
        window.sessionStorage.setItem(SESSION_STORAGE_KEY, 'true')
      }
    } catch {
      // Ignore storage errors
    }
    setPhase('complete')
    onComplete?.()
  }, [onComplete])

  const handleSkip = useCallback(() => {
    setPhase('transform')
    setTimeout(completeIntro, 180)
  }, [completeIntro])

  // Global Escape key listener
  useEffect(() => {
    if (phase === 'complete') return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleSkip()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [phase, handleSkip])

  // Continuous unified timeline
  useEffect(() => {
    if (initialPhase) {
      // Controlled initial phase for test / preview; don't auto-advance unless requested
      return
    }

    let alreadySeen = false
    try {
      if (
        typeof window !== 'undefined' &&
        typeof window.sessionStorage !== 'undefined' &&
        typeof window.sessionStorage.getItem === 'function'
      ) {
        alreadySeen =
          window.sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true'
      }
    } catch {
      // Ignore storage errors
    }

    const isReduced =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (alreadySeen || isReduced) {
      return
    }

    const timers: number[] = [
      // 0.20s: Hairline Signal Sweep
      window.setTimeout(() => setPhase('signal'), 200),
      // 0.70s: Identity Emerges
      window.setTimeout(() => setPhase('identity'), 700),
      // 1.60s: Identity Grows & Glides Upward
      window.setTimeout(() => setPhase('growth'), 1600),
      // 2.10s: Positioning Statement Enters
      window.setTimeout(() => setPhase('positioning'), 2100),
      // 3.40s: Work Fragments Emerge
      window.setTimeout(() => setPhase('work'), 3400),
      // 4.80s: Composition Converges
      window.setTimeout(() => setPhase('converge'), 4800),
      // 4.95s: Controlled Distortion Pulse
      window.setTimeout(() => setPhase('distortion'), 4950),
      // 5.10s: Distortion Resolves back to Converge
      window.setTimeout(() => setPhase('converge'), 5100),
      // 5.30s: Transform into Hero Canvas
      window.setTimeout(() => setPhase('transform'), 5300),
      // 6.15s: Complete & Unmount
      window.setTimeout(() => completeIntro(), 6150),
    ]

    return () => {
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [initialPhase, completeIntro])

  if (phase === 'complete') {
    return null
  }

  // Signal beam active during initial sweep
  const isSignalVisible = phase === 'signal' || phase === 'silence'

  // Once identity appears at 0.70s, it NEVER disappears!
  const isIdentityVisible =
    phase === 'identity' ||
    phase === 'growth' ||
    phase === 'portrait' ||
    phase === 'positioning' ||
    phase === 'work' ||
    phase === 'buildup' ||
    phase === 'converge' ||
    phase === 'distortion' ||
    phase === 'transform' ||
    phase === 'resolving'

  // Name glides upward to title position to frame the statement
  const isIdentityElevated =
    phase === 'growth' ||
    phase === 'positioning' ||
    phase === 'work' ||
    phase === 'buildup' ||
    phase === 'converge' ||
    phase === 'distortion' ||
    phase === 'transform' ||
    phase === 'resolving'

  // Positioning tagline emerges at 2.10s and holds steady through the climax
  const isPositioningVisible =
    phase === 'positioning' ||
    phase === 'work' ||
    phase === 'buildup' ||
    phase === 'converge' ||
    phase === 'distortion' ||
    phase === 'transform' ||
    phase === 'resolving'

  // Work fragments emerge at 3.40s to flank and elevate the identity
  const isWorkVisible =
    phase === 'work' ||
    phase === 'buildup' ||
    phase === 'converge' ||
    phase === 'distortion' ||
    phase === 'transform' ||
    phase === 'resolving'

  const isGlitching = phase === 'distortion'
  const isTransforming = phase === 'transform' || phase === 'resolving'

  return (
    <IntroAtmosphere
      isResolving={isTransforming}
      isTransforming={isTransforming}
      onSkip={handleSkip}
    >
      {/* Layer 1: Ambient Authentic Portrait Backdrop */}
      <PortraitReveal phase={phase} isTransforming={isTransforming} />

      {/* Layer 2: Hairline Signal Sweep */}
      {isSignalVisible && <IntroSignal />}

      {/* Layer 3: Work Fragments flanking the identity */}
      <WorkFragments
        isDistorting={isGlitching}
        isVisible={isWorkVisible}
        isTransforming={isTransforming}
      />

      {/* Layer 4: Central Continuous Typographic Composition */}
      <div
        className={`relative z-30 flex flex-col items-center justify-center text-center max-w-5xl mx-auto w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isTransforming ? '-translate-y-16 scale-105 opacity-0' : 'translate-y-0'
        }`}
      >
        {/* Primary Identity: NAMAN PRAJAPATI */}
        {isIdentityVisible && (
          <IdentityReveal
            isGlitching={isGlitching}
            isElevated={isIdentityElevated}
            isTransforming={isTransforming}
          />
        )}

        {/* Secondary Positioning Statement */}
        {isPositioningVisible && (
          <PositioningReveal isTransforming={isTransforming} />
        )}
      </div>
    </IntroAtmosphere>
  )
}
