interface IdentityRevealProps {
  isGlitching?: boolean
  isElevated?: boolean
  isTransforming?: boolean
  isQuiet?: boolean // legacy compat
}

export function IdentityReveal({
  isGlitching = false,
  isElevated = false,
  isTransforming = false,
  isQuiet = false,
}: IdentityRevealProps) {
  const elevated = isElevated || isQuiet

  return (
    <div
      className={`relative z-30 flex flex-col items-center justify-center text-center px-4 max-w-full select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isGlitching ? 'animate-intro-glitch' : ''
      } ${
        isTransforming
          ? '-translate-y-16 scale-105 opacity-0'
          : elevated
            ? 'scale-90 sm:scale-95 -translate-y-2 sm:-translate-y-6 mb-3 sm:mb-6 opacity-100'
            : 'scale-100 translate-y-0 opacity-100'
      }`}
    >
      {/* Category track mark */}
      <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.35em] text-neutral-400/80 mb-2 sm:mb-3">
        SOFTWARE &bull; SYSTEMS &bull; AI/ML
      </div>

      {/* Monumental two-line editorial name with increased transparency for background visibility */}
      <div className="flex flex-col items-center justify-center leading-none tracking-[0.16em] sm:tracking-[0.24em] lg:tracking-[0.28em] font-black uppercase font-sans">
        <span className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white/65 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
          NAMAN
        </span>
        <span className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl mt-1 sm:mt-2 text-white/55 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
          PRAJAPATI
        </span>
      </div>
    </div>
  )
}
