import type { ReactNode } from 'react'

interface IntroTransitionProps {
  children: ReactNode
  isResolving: boolean
  onSkip: () => void
}

export function IntroTransition({
  children,
  isResolving,
  onSkip,
}: IntroTransitionProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio Introduction Sequence"
      className={`fixed inset-0 z-100 bg-[#050505] text-white flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ease-out ${
        isResolving ? 'animate-intro-exit pointer-events-none' : ''
      }`}
    >
      {/* Subtle scanline texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.8)_50%)] bg-[length:100%_4px]"
        aria-hidden="true"
      />

      {/* Subtle radial ambient glow in the center */}
      <div
        className="absolute w-[600px] h-[300px] rounded-full bg-neutral-800/20 blur-3xl pointer-events-none transform -translate-y-4"
        aria-hidden="true"
      />

      {/* Main content layer */}
      <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
        {children}
      </div>

      {/* Subtle Skip Affordance */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
        <button
          type="button"
          onClick={onSkip}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-neutral-400 hover:text-white bg-neutral-900/80 hover:bg-neutral-800/90 border border-neutral-700/80 rounded-xs transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
          aria-label="Skip cinematic introduction (Press Escape)"
        >
          <span>Skip</span>
          <kbd className="text-[10px] bg-neutral-800 text-neutral-400 px-1 py-0.2 rounded border border-neutral-700">
            Esc
          </kbd>
        </button>
      </div>
    </div>
  )
}
