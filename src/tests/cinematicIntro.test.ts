import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

// Ensure React is present on globalThis for tsx runtime evaluation of JSX in Node
;(globalThis as unknown as { React: typeof React }).React = React

import {
  CinematicIntro,
  IdentityReveal,
  IntroAtmosphere,
  IntroSignal,
  PositioningReveal,
  PortraitReveal,
  WorkFragments,
} from '@/components/intro'

export function verifyCinematicHeroTitleSequence(): {
  passed: boolean
  message: string
} {
  // 1. Verify IdentityReveal renders Naman's name and editorial typography
  const identityMarkup = renderToStaticMarkup(
    React.createElement(IdentityReveal, { isGlitching: false }),
  )
  if (!identityMarkup.includes('NAMAN') || !identityMarkup.includes('PRAJAPATI')) {
    return {
      passed: false,
      message: 'IdentityReveal must render "NAMAN" and "PRAJAPATI"',
    }
  }

  // 2. Verify PortraitReveal renders authentic photograph
  const portraitMarkup = renderToStaticMarkup(
    React.createElement(PortraitReveal, { phase: 'portrait' }),
  )
  if (!portraitMarkup.includes('naman-portrait.png')) {
    return {
      passed: false,
      message: 'PortraitReveal must render the authentic profile portrait "naman-portrait.png"',
    }
  }

  // 3. Verify PositioningReveal renders the exact approved positioning statement
  const positioningMarkup = renderToStaticMarkup(
    React.createElement(PositioningReveal, null),
  )
  const expectedPositioning =
    'Building software, exploring AI/ML, and learning by working through real problems.'
  if (!positioningMarkup.includes(expectedPositioning)) {
    return {
      passed: false,
      message: `PositioningReveal must render "${expectedPositioning}"`,
    }
  }

  // 4. Verify IntroSignal renders scanline beam
  const signalMarkup = renderToStaticMarkup(
    React.createElement(IntroSignal, null),
  )
  if (!signalMarkup.includes('animate-intro-beam')) {
    return {
      passed: false,
      message: 'IntroSignal must render signal beam animation',
    }
  }

  // 5. Verify WorkFragments renders verified project assets
  const fragmentsMarkup = renderToStaticMarkup(
    React.createElement(WorkFragments, { isDistorting: false }),
  )
  if (
    !fragmentsMarkup.includes('CONVIA') ||
    !fragmentsMarkup.includes('BIOLYNK') ||
    !fragmentsMarkup.includes('RESUMETRICES') ||
    !fragmentsMarkup.includes('DOCFRAME')
  ) {
    return {
      passed: false,
      message: 'WorkFragments must render slices for Convia, BioLynk, ResumeTrices, and DocFrame',
    }
  }

  // 6. Verify IntroAtmosphere provides accessible dialog and Skip [Esc] button
  const atmosphereMarkup = renderToStaticMarkup(
    React.createElement(
      IntroAtmosphere,
      {
        isResolving: false,
        onSkip: () => {},
      },
      React.createElement('div', null, 'Test Child'),
    ),
  )
  if (
    !atmosphereMarkup.includes('role="dialog"') ||
    !atmosphereMarkup.includes('Skip') ||
    !atmosphereMarkup.includes('Esc')
  ) {
    return {
      passed: false,
      message: 'IntroAtmosphere must include role="dialog" and accessible Skip [Esc] affordance',
    }
  }

  // 7. Verify CinematicIntro orchestrator mounts and renders with initialPhase
  const introMarkup = renderToStaticMarkup(
    React.createElement(CinematicIntro, { forcePlay: true, initialPhase: 'identity' }),
  )
  if (!introMarkup.includes('NAMAN') || !introMarkup.includes('role="dialog"')) {
    return {
      passed: false,
      message: 'CinematicIntro when active must render the title sequence container and identity',
    }
  }

  // 8. Verify CinematicIntro positioning phase renders the tagline
  const introPositioningMarkup = renderToStaticMarkup(
    React.createElement(CinematicIntro, { forcePlay: true, initialPhase: 'positioning' }),
  )
  if (!introPositioningMarkup.includes(expectedPositioning)) {
    return {
      passed: false,
      message: 'CinematicIntro during positioning phase must render the approved tagline',
    }
  }

  return {
    passed: true,
    message: 'All Cinematic Hero Title Sequence V3 verification checks passed',
  }
}
