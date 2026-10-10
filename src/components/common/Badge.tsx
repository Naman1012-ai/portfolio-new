import type { ReactNode } from 'react'

export type BadgeVariant = 'neutral' | 'subtle' | 'accent' | 'outline' | 'success' | 'lavender'
export type BadgeSize = 'sm' | 'md'

export interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
  dotColor?: string
  icon?: ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-neutral-100 text-neutral-800 border border-neutral-200/60',
  subtle: 'bg-white text-neutral-600 border border-neutral-200 shadow-micro',
  accent: 'bg-neutral-900 text-neutral-50 border border-neutral-900',
  outline: 'bg-transparent text-neutral-700 border border-neutral-300',
  success: 'bg-emerald-50 text-emerald-800 border border-emerald-200/60',
  lavender: 'bg-[#F5F3FF] text-[#6D28D9] border border-[#DDD6FE]',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[11px] gap-1 rounded-xs',
  md: 'px-2.5 py-1 text-xs gap-1.5 rounded-sm',
}

/**
 * Editorial badge primitive for metadata chips, technical tags, and status indicators.
 */
export function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  dotColor,
  icon,
  className = '',
}: BadgeProps) {
  const defaultDotColor =
    variant === 'success'
      ? 'bg-emerald-500'
      : variant === 'lavender'
        ? 'bg-[#7C3AED]'
        : 'bg-neutral-400'

  return (
    <span
      className={`inline-flex items-center font-medium font-mono leading-tight select-none max-w-full ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor || defaultDotColor}`}
          aria-hidden="true"
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="min-w-0 break-words">{children}</span>
    </span>
  )
}
