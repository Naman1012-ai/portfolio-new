import { useId, useRef } from 'react'
import { useParallaxDepth } from '@/hooks/useParallaxDepth'

/**
 * HeroCinematicComposition
 *
 * Right-panel visual composition with three deliberate depth planes and
 * pointer-responsive 3D perspective interactions:
 *
 *   BACKGROUND  — dot grid + lavender ambient blooms. Slowest parallax (bg layer).
 *   MIDGROUND   — BioLynk preview. Moderate parallax & restrained 3D tilt, sits behind Convia.
 *   FOREGROUND  — Convia preview. Strongest parallax & dynamic 3D tilt, overlaps BioLynk, elevated shadow.
 *
 * Transform ownership per card (three separate nodes, no conflict):
 *   Node 1 (outer)  — parallax translate via JS inline style
 *   Node 2 (middle) — CSS float animation (translateY only, no other transform)
 *   Node 3 (inner)  — 3D spatial perspective tilt (rotateX, rotateY) + static rotation
 *
 * Modern WebP previews (/assets/*.webp) with fallback to PNG.
 * Pointer tracking is scoped to this composition container, disabled on touch and reduced-motion.
 * aria-hidden throughout — all meaningful content lives in the left column.
 */
export function HeroCinematicComposition() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { x, y, isActive } = useParallaxDepth({ containerRef })

  // Unique SVG pattern ID — safe when this component renders more than once (desktop + mobile).
  const patternId = useId().replace(/:/g, '-')

  // ── Parallax offsets per depth plane ──────────────────────────────────────
  // Background: very subtle — 3px max, nearly imperceptible
  const bgOffsetX = x * 3
  const bgOffsetY = y * 2

  // Midground (BioLynk): moderate — 9px max
  const midOffsetX = x * 9
  const midOffsetY = y * 6

  // Foreground (Convia): strongest — 15px max, creates clear separation from midground
  const fgOffsetX = x * 15
  const fgOffsetY = y * 10

  // ── Pointer-responsive 3D Spatial Tilt (degrees) ──────────────────────────
  // Foreground tilts dynamically (±3.5° X, ±4.5° Y) around its resting 2.5° roll
  // Midground tilts more restrainedly (±2.0° X, ±2.8° Y) around its resting -3° roll
  const fgRotateX = Number((-y * 3.5).toFixed(2))
  const fgRotateY = Number((x * 4.5).toFixed(2))

  const midRotateX = Number((-y * 2.0).toFixed(2))
  const midRotateY = Number((x * 2.8).toFixed(2))

  // Transition string — smooth follow with spring-like easing; instant at rest (x=y=0)
  const parallaxTransition = 'transform 550ms cubic-bezier(0.16, 1, 0.3, 1)'

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative w-full h-full min-h-[340px] sm:min-h-[420px] lg:min-h-[520px] overflow-hidden select-none"
      style={{ perspective: 1200 }}
    >
      {/* ══════════════════════════════════════════════════════════════════════
          LAYER 0 — Background: dot grid + lavender ambient lighting
          Slowest parallax. Low contrast. Sets the tonal field.
      ══════════════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 animate-bloom-in animation-delay-100"
        style={{
          transform: `translate(${bgOffsetX}px, ${bgOffsetY}px)`,
          transition: parallaxTransition,
        }}
      >
        {/* Tilted dot grid — restrained, slate-300, -12° rotation */}
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0 opacity-[0.25]"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id={patternId}
              x="0"
              y="0"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(-12 0 0)"
            >
              <circle cx="1.5" cy="1.5" r="1.5" fill="#94a3b8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>

        {/* Primary luminous bloom — top-right, soft indigo/cyan glow */}
        <div
          className="absolute -top-20 -right-20 w-[460px] h-[460px] rounded-full pointer-events-none animate-bloom-in animation-delay-200"
          style={{
            background: 'radial-gradient(circle at 58% 38%, rgba(99,102,241,0.12) 0%, rgba(6,182,212,0.06) 35%, transparent 70%)',
            opacity: 0.9,
          }}
        />

        {/* Secondary neon bloom — lower-left, soft lavender/indigo glow */}
        <div
          className="absolute -bottom-24 -left-12 w-[340px] h-[340px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 40% 62%, rgba(167,139,250,0.12) 0%, rgba(99,102,241,0.05) 40%, transparent 70%)',
            opacity: 0.8,
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          LAYER 1 — Midground: BioLynk preview
          Moderate parallax & 3D tilt. Counter-clockwise tilt. Sits behind Convia.
          Three-node transform stack: parallax → float → 3D tilt + static rotate + card
      ══════════════════════════════════════════════════════════════════════ */}

      {/* Node 1: parallax translate (JS-driven) */}
      <div
        className="absolute animate-fade-in-up animation-delay-200"
        style={{
          bottom: '8%',
          left: '0%',
          width: 'clamp(190px, 52%, 252px)',
          transform: `translate(${-midOffsetX}px, ${-midOffsetY}px)`,
          transition: parallaxTransition,
          zIndex: 2,
        }}
      >
        {/* Node 2: float animation (CSS translateY only — no other transform on this node) */}
        <div className="animate-hero-float-b">
          {/* Node 3: 3D spatial tilt + static rotation + card content */}
          <div
            style={{
              transform: `perspective(1000px) rotate(-3deg) rotateX(${midRotateX}deg) rotateY(${midRotateY}deg)`,
              transformStyle: 'preserve-3d',
              transition: parallaxTransition,
            }}
          >
            <div
              className="relative rounded-xl overflow-hidden border border-slate-200/90 bg-white"
              style={{
                boxShadow: '0 16px 36px -6px rgba(15,23,42,0.12), 0 0 1px 1px rgba(15,23,42,0.04)',
              }}
            >
              <div className="relative">
                <picture>
                  <source type="image/webp" srcSet="/assets/biolynk-preview.webp" />
                  <img
                    src="/assets/biolynk-preview.png"
                    alt="BioLynk healthcare platform interface"
                    width={480}
                    height={300}
                    className="w-full h-auto block object-cover object-top"
                    loading="eager"
                    decoding="sync"
                  />
                </picture>

                {/* Subtle dynamic specular glare reflection */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${50 + x * 25}% ${45 + y * 25}%, rgba(255,255,255,0.4) 0%, transparent 65%)`,
                    opacity: isActive ? 0.9 : 0.2,
                  }}
                />
              </div>

              <div className="px-3 py-2 border-t border-slate-100 bg-white/95 backdrop-blur-md flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider font-medium">
                  BioLynk · Healthcare
                </span>
                <span className="w-2 h-2 rounded-full bg-violet-600 shrink-0 shadow-[0_0_6px_rgba(124,58,237,0.5)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          LAYER 2 — Foreground: Convia preview
          Strongest parallax & 3D tilt. Clockwise tilt. Overlaps BioLynk. Deeper shadow.
          Three-node transform stack: parallax → float → 3D tilt + static rotate + card
      ══════════════════════════════════════════════════════════════════════ */}

      {/* Node 1: parallax translate (JS-driven) */}
      <div
        className="absolute animate-fade-in-up animation-delay-350"
        style={{
          top: '5%',
          right: '2%',
          width: 'clamp(230px, 62%, 310px)',
          transform: `translate(${-fgOffsetX}px, ${-fgOffsetY}px)`,
          transition: parallaxTransition,
          zIndex: 3,
        }}
      >
        {/* Node 2: float animation (CSS translateY only) */}
        <div className="animate-hero-float-a">
          {/* Node 3: 3D spatial tilt + static rotation + card content */}
          <div
            style={{
              transform: `perspective(1000px) rotate(2.5deg) rotateX(${fgRotateX}deg) rotateY(${fgRotateY}deg)`,
              transformStyle: 'preserve-3d',
              transition: parallaxTransition,
            }}
          >
            <div
              className="relative rounded-xl overflow-hidden border border-slate-200/90 bg-white"
              style={{
                boxShadow: '0 25px 50px -10px rgba(15,23,42,0.18), 0 0 1px 1px rgba(15,23,42,0.04)',
              }}
            >
              <div className="relative">
                <picture>
                  <source type="image/webp" srcSet="/assets/convia-preview.webp" />
                  <img
                    src="/assets/convia-preview.png"
                    alt="Convia workspace platform interface"
                    width={600}
                    height={380}
                    className="w-full h-auto block object-cover object-top"
                    loading="eager"
                    decoding="sync"
                  />
                </picture>

                {/* Subtle dynamic specular glare reflection */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${50 + x * 35}% ${40 + y * 35}%, rgba(255, 255, 255, 0.45) 0%, transparent 65%)`,
                    opacity: isActive ? 1 : 0.25,
                  }}
                />
              </div>

              <div className="px-3 py-2 border-t border-slate-100 bg-white/95 backdrop-blur-md flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-800 font-semibold uppercase tracking-wider">
                  Convia · Workspace Platform
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-mono text-emerald-700 font-semibold uppercase tracking-widest hidden sm:inline">LIVE</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_6px_rgba(16,185,129,0.7)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          LAYER 3 — Foreground decoration: editorial label + corner accent
          Moves at a subtle fraction of Convia to create layered architectural depth.
      ══════════════════════════════════════════════════════════════════════ */}

      {/* Editorial index label — top-left corner */}
      <div
        className="absolute top-0 left-0 flex flex-col gap-1 animate-fade-in animation-delay-500 pointer-events-none"
        style={{
          transform: `translate(${fgOffsetX * 0.25}px, ${fgOffsetY * 0.25}px)`,
          transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 4,
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-px h-8 bg-slate-300" />
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em] font-semibold">
              Selected Work
            </span>
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-[0.2em]">
              2024 — 2025
            </span>
          </div>
        </div>
      </div>

      {/* Architectural corner accent — bottom-right */}
      <div
        className="absolute bottom-6 right-6 animate-fade-in animation-delay-600 pointer-events-none"
        style={{ zIndex: 4 }}
      >
        <div className="flex items-end gap-1.5">
          <div className="w-px h-6 bg-slate-300" />
          <div className="w-6 h-px bg-slate-300" />
        </div>
      </div>
    </div>
  )
}
