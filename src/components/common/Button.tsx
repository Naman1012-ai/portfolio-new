import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-b from-neutral-800 to-neutral-950 text-white hover:from-neutral-700 hover:to-neutral-900 active:from-neutral-950 active:to-neutral-950 shadow-md hover:shadow-lg border border-neutral-700/60 active:border-neutral-950 ring-1 ring-white/10',
  secondary:
    'bg-white/95 text-slate-900 border border-slate-200/90 hover:bg-slate-50 hover:border-slate-300 active:bg-slate-100 shadow-xs hover:shadow-sm active:shadow-none backdrop-blur-xs',
  outline:
    'bg-transparent text-slate-800 border border-slate-300 hover:bg-slate-100/80 hover:border-slate-400 active:bg-slate-200/80',
  ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100/80 hover:text-slate-950 active:bg-slate-200 border border-transparent',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3.5 text-xs gap-1.5 rounded-full',
  md: 'h-9 px-4.5 text-sm gap-2 rounded-full',
  lg: 'h-11 px-6 text-base gap-2.5 rounded-full',
}

/**
 * Editorial button primitive with tactile micro-interactions, directional icon
 * feedback, keyboard focus indicators, and reduced-motion resilience.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`group inline-flex items-center justify-center font-medium whitespace-nowrap transition-all duration-150 ease-out select-none cursor-pointer active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white motion-reduce:transition-none motion-reduce:active:scale-100 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {leftIcon && (
        <span className="shrink-0 transition-transform duration-150 ease-out group-hover:-translate-x-1 group-active:-translate-x-0.5 motion-reduce:transform-none">
          {leftIcon}
        </span>
      )}
      <span>{children}</span>
      {rightIcon && (
        <span className="shrink-0 transition-transform duration-150 ease-out group-hover:translate-x-1 group-active:translate-x-0.5 motion-reduce:transform-none">
          {rightIcon}
        </span>
      )}
    </button>
  )
}
