import type { ReactNode } from 'react'

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ContainerProps {
  children: ReactNode
  size?: ContainerSize
  className?: string
}

const sizeClasses: Record<ContainerSize, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
}

/**
 * Editorial layout container with standard responsive horizontal padding.
 */
export function Container({
  children,
  size = 'md',
  className = '',
}: ContainerProps) {
  return (
    <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  )
}
