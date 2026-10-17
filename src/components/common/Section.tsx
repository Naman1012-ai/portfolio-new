import type { ElementType, ReactNode } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg'

export interface SectionProps {
  children: ReactNode
  as?: ElementType
  id?: string
  spacing?: SectionSpacing
  bordered?: boolean
  reveal?: boolean
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
 * Semantic section layout wrapper with consistent vertical rhythm, optional divider border,
 * and optional accessible scroll-reveal entrance choreography.
 */
export function Section({
  children,
  as: Component = 'section',
  id,
  spacing = 'md',
  bordered = false,
  reveal = false,
  className = '',
  'aria-labelledby': ariaLabelledby,
}: SectionProps) {
  const { ref, isRevealed } = useScrollReveal<HTMLElement>({ disabled: !reveal })
  const borderClass = bordered ? 'border-b border-slate-800/80' : ''
  const revealClass = reveal ? `scroll-reveal ${isRevealed ? 'is-revealed' : ''}` : ''

  return (
    <Component
      ref={reveal ? ref : undefined}
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`${spacingClasses[spacing]} ${borderClass} ${revealClass} ${className}`.trim()}
    >
      {children}
    </Component>
  )
}
