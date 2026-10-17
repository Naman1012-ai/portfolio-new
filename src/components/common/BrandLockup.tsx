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
        <img
          src="/assets/portfolio-logo.png"
          alt="Naman Prajapati Logo"
          width={32}
          height={32}
          className="w-8 h-8 rounded-lg object-contain shadow-xs group-hover:scale-105 transition-transform duration-150 shrink-0"
        />
      )}
      <div className="flex flex-col">
        <span className="text-sm font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 font-display transition-colors duration-150 hidden sm:inline">
          Naman Prajapati
        </span>
        {subtitle && (
          <span className="text-xs text-slate-500 font-normal leading-tight hidden sm:block">
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
        className="inline-flex rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        aria-label="Naman Prajapati Home"
      >
        {content}
      </a>
    )
  }

  return content
}
