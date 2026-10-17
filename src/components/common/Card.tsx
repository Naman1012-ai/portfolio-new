import type { ElementType, HTMLAttributes, ReactNode } from 'react'

export type CardVariant = 'outlined' | 'elevated' | 'subdued' | 'flat' | 'cinematic' | 'obsidian'
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
  outlined:
    'bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_2px_12px_-2px_rgba(15,23,42,0.06),0_1px_3px_0_rgba(15,23,42,0.04)]',
  elevated:
    'bg-white border border-slate-200/80 shadow-[0_12px_32px_-4px_rgba(15,23,42,0.08),0_4px_12px_-2px_rgba(15,23,42,0.03)]',
  subdued: 'bg-slate-50/80 border border-slate-200/70 shadow-xs',
  flat: 'bg-slate-50/60',
  cinematic:
    'bg-white border border-slate-200/90 shadow-[0_16px_36px_-6px_rgba(15,23,42,0.09),0_0_1px_1px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_-10px_rgba(79,70,229,0.15)] hover:border-indigo-400/60',
  obsidian:
    'bg-slate-900 text-white border border-slate-800 shadow-[0_20px_40px_-15px_rgba(15,23,42,0.3)] ring-1 ring-white/10',
}

const paddingClasses: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-3 sm:p-4',
  md: 'p-5 sm:p-6',
  lg: 'p-6 sm:p-8',
}

/**
 * Editorial hardware surface container with tactile layered elevation and optional interactive states.
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
    ? 'hover:border-indigo-400/60 hover:shadow-[0_12px_30px_-5px_rgba(79,70,229,0.12)] hover:-translate-y-0.5 transition-all duration-200 ease-out motion-reduce:transition-none motion-reduce:transform-none cursor-pointer'
    : ''

  return (
    <Component
      className={`rounded-xl w-full max-w-full min-w-0 ${variantClasses[variant]} ${paddingClasses[padding]} ${interactiveClasses} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
