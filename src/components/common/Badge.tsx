import type { ReactNode } from 'react'

export type BadgeVariant = 'neutral' | 'subtle' | 'accent' | 'outline' | 'success' | 'lavender' | 'obsidian'
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
  neutral: 'bg-slate-100 text-slate-800 border border-slate-200 shadow-xs',
  subtle: 'bg-slate-50 text-slate-600 border border-slate-200/60 shadow-micro backdrop-blur-xs',
  accent: 'bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-xs',
  outline: 'bg-transparent text-slate-700 border border-slate-300',
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-xs',
  lavender: 'bg-purple-50 text-purple-700 border border-purple-200/80 shadow-xs',
  obsidian: 'bg-slate-900 text-slate-100 border border-slate-800 shadow-sm',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2.5 py-0.5 text-[11px] gap-1.5 rounded-full',
  md: 'px-3 py-1 text-xs gap-1.5 rounded-full',
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
        ? 'bg-purple-500'
        : variant === 'accent'
          ? 'bg-indigo-600'
          : variant === 'obsidian'
            ? 'bg-emerald-400'
            : 'bg-slate-400'

  return (
    <span
      className={`inline-flex items-center font-medium font-sans leading-tight select-none max-w-full ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
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
