import { usePerspective, PERSPECTIVES, type PerspectiveMode } from '@/context'

export interface PerspectiveSwitcherProps {
  variant?: 'header' | 'floating' | 'inline'
  className?: string
  onSelect?: (mode: PerspectiveMode) => void
}

export function PerspectiveSwitcher({
  variant = 'inline',
  className = '',
  onSelect,
}: PerspectiveSwitcherProps) {
  const { perspective, info, setPerspective } = usePerspective()

  const modes: PerspectiveMode[] = ['explore', 'engineering', 'product']

  return (
    <div className={`space-y-2 ${className}`}>
      <div
        role="group"
        aria-label="Perspective selector: Explore · Engineering · Product"
        className="inline-flex items-center text-xs font-mono tracking-tight select-none"
      >
        <span className="sr-only">Active perspective: {info.label}</span>
        {modes.map((mode, index) => {
          const item = PERSPECTIVES[mode]
          const isActive = perspective === mode
          return (
            <span key={mode} className="inline-flex items-center">
              {index > 0 && (
                <span className="mx-2 text-neutral-300 font-normal select-none" aria-hidden="true">
                  ·
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  setPerspective(mode)
                  onSelect?.(mode)
                }}
                className={`relative py-1 px-1.5 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900 rounded-xs ${
                  isActive
                    ? 'font-semibold text-neutral-950'
                    : 'font-normal text-neutral-500 hover:text-neutral-900'
                }`}
                aria-pressed={isActive}
                title={`${item.label} — ${item.description}`}
              >
                <span>{item.shortLabel}</span>
                {isActive && (
                  <span
                    className="absolute bottom-0 left-1 right-1 h-0.5 bg-neutral-950 rounded-full"
                    aria-hidden="true"
                  />
                )}
              </button>
            </span>
          )
        })}
      </div>

      {variant === 'inline' && perspective !== 'explore' && (
        <div className="flex items-center justify-between gap-3 px-3 py-1.5 bg-neutral-50 text-neutral-800 rounded-xs border border-neutral-200/80 text-[11px] font-mono animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0" aria-hidden="true" />
            <span className="font-semibold text-neutral-950">{info.badge}:</span>
            <span className="text-neutral-600 hidden sm:inline">{info.focusHeadline}</span>
          </div>
          <button
            type="button"
            onClick={() => setPerspective('explore')}
            className="text-[10px] text-neutral-500 hover:text-neutral-950 underline cursor-pointer shrink-0"
          >
            Reset to Explore
          </button>
        </div>
      )}
    </div>
  )
}
