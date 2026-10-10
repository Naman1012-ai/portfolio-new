import type { ElementType, ReactNode } from 'react'

export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg'

export interface SectionProps {
  children: ReactNode
  as?: ElementType
  id?: string
  spacing?: SectionSpacing
  bordered?: boolean
  className?: string
  'aria-labelledby'?: string
}

const spacingClasses: Record<SectionSpacing, string> = {
  none: '',
  sm: 'py-8 sm:py-12',
  md: 'py-12 sm:py-16',
  lg: 'py-16 sm:py-24',
}

/**
 * Semantic section layout wrapper with consistent vertical rhythm and optional divider border.
 */
export function Section({
  children,
  as: Component = 'section',
  id,
  spacing = 'md',
  bordered = false,
  className = '',
  'aria-labelledby': ariaLabelledby,
}: SectionProps) {
  const borderClass = bordered ? 'border-b border-neutral-200' : ''

  return (
    <Component
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`${spacingClasses[spacing]} ${borderClass} ${className}`}
    >
      {children}
    </Component>
  )
}
