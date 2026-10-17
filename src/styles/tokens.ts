/**
 * Design Tokens for Portfolio 2.0
 * Aesthetic: Light-first, editorial, typography-driven, engineering & AI focus.
 * These tokens correspond directly to Tailwind v4 @theme values in globals.css.
 */

export const tokens = {
  colors: {
    // Canvas & Surfaces (Rich Platinum Executive Light)
    canvas: '#f8fafc', // Warm porcelain/platinum luxury canvas
    surface: '#ffffff', // Crisp pure white card surface
    surfaceSubdued: '#f1f5f9', // Soft technical container surface
    surfaceHover: '#f8fafc', // Micro-state interaction hover
    surfaceObsidian: '#ffffff', // Executive hardware panel surface

    // Inks & Typography (WCAG AAA compliant dark-on-light)
    inkPrimary: '#090d16', // Deep obsidian ink headline & title ink (> 17:1 contrast)
    inkSecondary: '#334155', // Polished charcoal-slate for body prose (11:1 contrast)
    inkMuted: '#64748b', // Subtle slate for secondary metadata & labels (6.5:1 contrast)
    inkFaint: '#94a3b8', // Muted decorative glyphs & hairline borders (4.5:1 contrast)

    // Architectural Lines & Borders
    lineSubtle: '#f1f5f9', // Hairline dividers in light space
    lineDefault: '#e2e8f0', // Structural card outlines & table dividers
    lineStrong: '#cbd5e1', // High-contrast interactive borders & focus rings

    // Vibrant Tech Accents & Focus
    accent: '#4f46e5', // Rich Royal Indigo anchor for primary actions
    accentSubtle: '#eef2ff', // Soft indigo wash for active chips
    focus: '#6366f1', // High-visibility luminous keyboard focus ring

    // Luminous Brand Lavender & Violet Tokens
    brandLavender: '#7c3aed', // Rich royal violet highlight
    brandLavenderSubtle: '#f5f3ff', // Soft violet surface
    brandLavenderBorder: '#ddd6fe', // Delicate purple border
    brandLavenderMuted: '#6d28d9', // High-contrast lavender text
  },

  typography: {
    fonts: {
      display: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace',
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

  focusRing: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
} as const

export type DesignTokens = typeof tokens
