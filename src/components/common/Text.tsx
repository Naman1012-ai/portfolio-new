import type { ElementType, ReactNode } from 'react'

export type TextVariant = 'lead' | 'body' | 'body-sm' | 'bodySm' | 'caption' | 'meta'
export type TextTone = 'primary' | 'secondary' | 'muted' | 'faint' | 'accent'

export interface TextProps {
  children: ReactNode
  as?: ElementType
  variant?: TextVariant
  tone?: TextTone
  prose?: boolean
  className?: string
}

const variantClasses: Record<TextVariant, string> = {
  lead: 'text-lg sm:text-xl font-normal leading-relaxed',
  body: 'text-base font-normal leading-relaxed',
  'body-sm': 'text-sm font-normal leading-normal',
  bodySm: 'text-sm font-normal leading-normal',
  caption: 'text-xs font-normal leading-normal',
  meta: 'text-xs font-mono tracking-wider uppercase',
}

const toneClasses: Record<TextTone, string> = {
  primary: 'text-slate-950',
  secondary: 'text-slate-700',
  muted: 'text-slate-600',
  faint: 'text-slate-400',
  accent: 'text-indigo-600 font-medium',
}

export function Text({
  children,
  as: Component = 'p',
  variant = 'body',
  tone = 'secondary',
  prose = false,
  className = '',
}: TextProps) {
  const proseClass = prose ? 'max-w-prose' : ''

  return (
    <Component
      className={`${variantClasses[variant]} ${toneClasses[tone]} ${proseClass} ${className}`}
    >
      {children}
    </Component>
  )
}
