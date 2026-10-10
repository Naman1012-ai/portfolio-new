import type { ElementType, HTMLAttributes, ReactNode } from 'react'

export type CardVariant = 'outlined' | 'elevated' | 'subdued' | 'flat' | 'cinematic'
export type CardPadding = 'none' | 'sm' | 'md' | 'lg'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  as?: ElementType
  variant?: CardVariant
  padding?: CardPadding
  interactive?: boolean
  className?: string
}

const variantClasses: Record<CardVariant, string> = {
  outlined: 'bg-white border border-neutral-200 shadow-micro',
  elevated: 'bg-white border border-neutral-100 shadow-subtle',
  subdued: 'bg-neutral-50 border border-neutral-200/80',
  flat: 'bg-white',
  cinematic: 'bg-white border border-neutral-200/90 shadow-sm hover:shadow-cinematic',
}

const paddingClasses: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-3 sm:p-4',
  md: 'p-5 sm:p-6',
  lg: 'p-6 sm:p-8',
}

/**
 * Editorial surface container with subtle tactile elevation and optional interactive states.
 */
export function Card({
  children,
  as: Component = 'div',
  variant = 'outlined',
  padding = 'md',
  interactive = false,
  className = '',
  ...props
}: CardProps) {
  const interactiveClasses = interactive
    ? 'hover:border-neutral-300 hover:shadow-subtle hover:-translate-y-0.5 transition-all duration-200 ease-out motion-reduce:transition-none motion-reduce:transform-none cursor-pointer'
    : ''

  return (
    <Component
      className={`rounded-md w-full max-w-full min-w-0 ${variantClasses[variant]} ${paddingClasses[padding]} ${interactiveClasses} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
