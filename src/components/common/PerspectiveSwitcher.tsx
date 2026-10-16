import { usePerspective, PERSPECTIVES, type PerspectiveMode } from '@/context'

export interface PerspectiveSwitcherProps {
  variant?: 'header' | 'floating' | 'inline'
  className?: string
}

export function PerspectiveSwitcher({
  variant = 'inline',
  className = '',
}: PerspectiveSwitcherProps) {
  const { perspective, info, setPerspective } = usePerspective()

  const modes: PerspectiveMode[] = ['all', 'founder', 'interviewer', 'investor']

  if (variant === 'header') {
    return (
      <div
        role="group"
        aria-label="Audience perspective switcher"
        className={`inline-flex items-center p-0.5 rounded-sm bg-neutral-100/90 border border-neutral-200/80 text-[11px] font-mono ${className}`}
      >
        <span className="sr-only">Viewing perspective: {info.label}</span>
        {modes.map((mode) => {
          const item = PERSPECTIVES[mode]
          const isActive = perspective === mode
          return (
            <button
              key={mode}
              type="button"
              onClick={() => setPerspective(mode)}
              className={`px-2 py-1 rounded-xs transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900 ${
                isActive
                  ? 'bg-neutral-950 text-white font-medium shadow-micro'
                  : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/60'
              }`}
              aria-pressed={isActive}
              title={`${item.label} — ${item.description}`}
            >
              {item.shortLabel}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div className={`space-y-2.5 ${className}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
          Perspective:
        </span>
        <div
          role="radiogroup"
          aria-label="Perspective selector"
          className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-sm bg-white/90 border border-neutral-200/90 shadow-micro"
        >
          {modes.map((mode) => {
            const item = PERSPECTIVES[mode]
            const isActive = perspective === mode
            return (
              <button
                key={mode}
                type="button"
                onClick={() => setPerspective(mode)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-xs font-mono transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 ${
                  isActive
                    ? 'bg-neutral-950 text-white font-medium shadow-micro'
                    : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/70'
                }`}
                aria-checked={isActive}
                role="radio"
              >
                <span>{item.shortLabel}</span>
                {mode !== 'all' && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? 'bg-emerald-400' : 'bg-neutral-300'
                    }`}
                    aria-hidden="true"
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {perspective !== 'all' && (
        <div className="flex items-center justify-between gap-3 px-3 py-2 bg-neutral-900 text-neutral-100 rounded-sm border border-neutral-800 text-xs font-mono animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" aria-hidden="true" />
            <span className="font-semibold text-white">{info.badge}:</span>
            <span className="text-neutral-300 hidden sm:inline">{info.focusHeadline}</span>
          </div>
          <button
            type="button"
            onClick={() => setPerspective('all')}
            className="text-[11px] text-neutral-400 hover:text-white underline cursor-pointer shrink-0"
          >
            Reset to All
          </button>
        </div>
      )}
    </div>
  )
}
