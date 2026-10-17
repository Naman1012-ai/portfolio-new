import type { ElementType, ReactNode } from 'react'

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
export type HeadingVariant = 'display' | 'h1' | 'h2' | 'h3' | 'h4'

export interface HeadingProps {
  children: ReactNode
  as?: HeadingLevel
  variant?: HeadingVariant
  id?: string
  className?: string
}

const variantClasses: Record<HeadingVariant, string> = {
  display: 'text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 font-display leading-[1.15] break-words',
  h1: 'text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 font-display leading-[1.2] break-words',
  h2: 'text-xl sm:text-2xl font-bold tracking-tight text-slate-950 font-display leading-[1.25] break-words',
  h3: 'text-lg sm:text-xl font-semibold tracking-tight text-slate-900 font-display leading-[1.3] break-words',
  h4: 'text-base font-medium tracking-normal text-slate-900 font-display leading-[1.4] break-words',
}

export function Heading({
  children,
  as,
  variant,
  id,
  className = '',
}: HeadingProps) {
  const Component: ElementType = as || 'h2'
  const resolvedVariant = variant || (as && as in variantClasses ? (as as HeadingVariant) : 'h2')

  return (
    <Component
      id={id}
      className={`${variantClasses[resolvedVariant]} ${className}`}
    >
      {children}
    </Component>
  )
}
