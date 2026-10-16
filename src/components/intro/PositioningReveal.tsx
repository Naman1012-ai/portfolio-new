interface PositioningRevealProps {
  isTransforming?: boolean
}

export function PositioningReveal({
  isTransforming = false,
}: PositioningRevealProps) {
  return (
    <div
      className={`relative z-40 max-w-3xl mx-auto px-4 sm:px-6 text-center select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isTransforming ? 'opacity-0 -translate-y-6 scale-98' : 'opacity-100 translate-y-0'
      }`}
    >
      {/* Primary readable statement */}
      <h2 className="text-base sm:text-2xl md:text-3xl font-mono font-medium text-white leading-relaxed sm:leading-snug tracking-tight drop-shadow-md">
        &ldquo;Building software, exploring AI/ML, and learning by working through real problems.&rdquo;
      </h2>

      {/* Clean editorial anchor */}
      <div className="mt-3 sm:mt-4 text-[10px] sm:text-xs font-mono text-neutral-400 tracking-widest uppercase">
        COMPUTER SCIENCE &bull; FULL-STACK &bull; INTELLIGENT SYSTEMS
      </div>
    </div>
  )
}
