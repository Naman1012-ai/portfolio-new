import type { MouseEvent } from 'react'

interface BrandLockupProps {
  href?: string
  subtitle?: string
  showMonogram?: boolean
  className?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}

/**
 * Typographic brand treatment for "Naman Prajapati".
 * Clean, minimal, editorial wordmark communicating engineering rigor and product thinking.
 */
export function BrandLockup({
  href = '/',
  subtitle,
  showMonogram = true,
  className = '',
  onClick,
}: BrandLockupProps) {
  const content = (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {showMonogram && (
        <span
          className="inline-flex items-center justify-center w-7 h-7 rounded-sm bg-neutral-900 text-neutral-50 text-xs font-semibold tracking-tight shadow-micro group-hover:bg-neutral-800 transition-colors duration-150"
          aria-hidden="true"
        >
          NP
        </span>
      )}
      <div className="flex flex-col">
        <span className="text-sm font-semibold tracking-tight text-neutral-900 group-hover:text-neutral-700 transition-colors duration-150 hidden sm:inline">
          Naman Prajapati
        </span>
        {subtitle && (
          <span className="text-xs text-neutral-500 font-normal leading-tight hidden sm:block">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className="inline-flex rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
        aria-label="Naman Prajapati Home"
      >
        {content}
      </a>
    )
  }

  return content
}
