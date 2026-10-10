/**
 * Design Tokens for Portfolio 2.0
 * Aesthetic: Light-first, editorial, typography-driven, engineering & AI focus.
 * These tokens correspond directly to Tailwind v4 @theme values in globals.css.
 */

export const tokens = {
  colors: {
    // Canvas & Surfaces
    canvas: '#fafafa', // Subtle warm off-white canvas
    surface: '#ffffff', // Crisp pure white elevated surface
    surfaceSubdued: '#f4f4f5', // Neutral 100 for secondary backgrounds / code blocks
    surfaceHover: '#f5f5f7', // Micro-state interaction hover

    // Inks & Typography (WCAG AA & AAA compliant on canvas/surface)
    inkPrimary: '#09090b', // Deep charcoal / rich black (> 18:1 contrast on white)
    inkSecondary: '#52525b', // Balanced slate for secondary copy (7:1 contrast on white)
    inkMuted: '#71717a', // Tertiary metadata & dates (4.6:1 contrast on white)
    inkFaint: '#a1a1aa', // Subtle glyphs, inactive borders

    // Architectural Lines & Dividers
    lineSubtle: '#f4f4f5', // Hairline dividers
    lineDefault: '#e4e4e7', // Card outlines & table borders
    lineStrong: '#d4d4d8', // High-contrast interactive borders

    // Restrained Accent & Focus
    accent: '#0f172a', // Premium deep ink accent for primary buttons / badges
    accentSubtle: '#f1f5f9', // Soft tint for tags and chip backgrounds
    focus: '#0f172a', // High-visibility keyboard focus ring

    // Restrained Lavender Brand Tokens (Anchors: #7C3AED and #F5F3FF)
    brandLavender: '#7C3AED', // Primary brand lavender anchor (WCAG AA compliant contrast)
    brandLavenderSubtle: '#F5F3FF', // Subtle lavender surface tint
    brandLavenderBorder: '#DDD6FE', // Restrained lavender border
    brandLavenderMuted: '#6D28D9', // Deep violet for high-contrast typography
  },

  typography: {
    fonts: {
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: 'ui-monospace, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", monospace',
    },
    sizes: {
      display: 'text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight',
      h1: 'text-2xl sm:text-3xl font-semibold tracking-tight',
      h2: 'text-xl sm:text-2xl font-semibold tracking-tight',
      h3: 'text-lg sm:text-xl font-medium tracking-tight',
      h4: 'text-base font-medium tracking-normal',
      body: 'text-base font-normal leading-relaxed',
      bodySm: 'text-sm font-normal leading-normal',
      caption: 'text-xs font-normal leading-normal',
      meta: 'text-xs font-mono tracking-wider uppercase',
    },
    measure: {
      prose: 'max-w-prose', // ~65 characters per line for optimal readability
      containerSm: 'max-w-3xl',
      containerMd: 'max-w-5xl',
      containerLg: 'max-w-6xl',
    },
  },

  radii: {
    xs: 'rounded-xs', // 3px
    sm: 'rounded-sm', // 6px
    md: 'rounded-md', // 8px
    lg: 'rounded-lg', // 12px
    full: 'rounded-full',
  },

  shadows: {
    micro: 'shadow-micro', // subtle crisp lip
    subtle: 'shadow-subtle', // cards and floating surfaces
    elevated: 'shadow-elevated', // dropdowns, modals, popovers
    cinematic: 'shadow-cinematic', // Netflix-inspired card hover elevation
    cinematicLg: 'shadow-cinematic-lg', // Hero modal and showcase elevation
    glow: 'shadow-glow', // Ambient luminescence
  },

  motion: {
    durationFast: '150ms',
    durationNormal: '200ms',
    durationCinematic: '300ms',
    durationShowcase: '500ms',
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionClass: 'transition-all duration-150 ease-out motion-reduce:transition-none',
    transitionCinematic: 'transition-all duration-300 ease-out motion-reduce:transition-none motion-reduce:transform-none',
  },

  focusRing: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
} as const

export type DesignTokens = typeof tokens
