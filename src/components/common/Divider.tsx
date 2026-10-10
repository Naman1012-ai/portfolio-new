interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  subtle?: boolean
  label?: string
  className?: string
}

/**
 * Editorial divider primitive for architectural separation with optional centered label.
 */
export function Divider({
  orientation = 'horizontal',
  subtle = false,
  label,
  className = '',
}: DividerProps) {
  const borderColor = subtle ? 'border-neutral-100' : 'border-neutral-200'

  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={`inline-block self-stretch w-px bg-neutral-200 ${className}`}
      />
    )
  }

  if (label) {
    return (
      <div
        role="separator"
        className={`relative flex items-center justify-center my-6 ${className}`}
      >
        <div className={`w-full border-t ${borderColor}`} />
        <span className="absolute bg-canvas px-3 text-xs font-mono text-neutral-400 uppercase tracking-wider">
          {label}
        </span>
      </div>
    )
  }

  return (
    <hr
      className={`my-6 border-0 border-t ${borderColor} ${className}`}
    />
  )
}
