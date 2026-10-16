interface IntroIdentityProps {
  isGlitching?: boolean
}

export function IntroIdentity({ isGlitching = false }: IntroIdentityProps) {
  return (
    <div
      className={`relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-full overflow-hidden select-none transition-all duration-300 ${
        isGlitching ? 'animate-intro-glitch' : ''
      }`}
    >
      {/* Category sub-track */}
      <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 mb-2 sm:mb-3">
        SOFTWARE &bull; SYSTEMS &bull; AI/ML
      </div>

      {/* Oversized Cinematic Identity */}
      <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase text-white tracking-[0.2em] sm:tracking-[0.3em] lg:tracking-[0.35em] leading-tight drop-shadow-sm font-sans">
        NAMAN PRAJAPATI
      </h1>
    </div>
  )
}
