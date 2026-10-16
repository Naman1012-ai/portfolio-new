export function IntroSignal() {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 select-none"
      aria-hidden="true"
    >
      {/* Hairline horizontal beam */}
      <div className="w-full h-px bg-linear-to-r from-transparent via-white/80 to-transparent animate-intro-beam" />
    </div>
  )
}
