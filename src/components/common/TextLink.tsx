import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Icon } from './Icon'

export type TextLinkVariant = 'subtle' | 'underline' | 'accent'

export interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: ReactNode
  variant?: TextLinkVariant
  external?: boolean
  showExternalIcon?: boolean
}

const variantClasses: Record<TextLinkVariant, string> = {
  subtle: 'text-slate-600 hover:text-slate-900 decoration-transparent hover:underline underline-offset-4',
  underline: 'text-slate-800 hover:text-slate-950 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-800',
  accent: 'text-indigo-600 hover:text-indigo-700 font-medium decoration-transparent hover:underline underline-offset-4',
}

/**
 * Editorial text link primitive supporting accessible external link behaviors.
 */
export function TextLink({
  href,
  children,
  variant = 'subtle',
  external = false,
  showExternalIcon = false,
  className = '',
  ...props
}: TextLinkProps) {
  const isExternal = external || href.startsWith('http') || href.startsWith('//')
  const externalProps = isExternal
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {}

  return (
    <a
      href={href}
      className={`inline-flex items-center gap-1 transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-xs ${variantClasses[variant]} ${className}`}
      {...externalProps}
      {...props}
    >
      <span className="min-w-0 break-all">{children}</span>
      {isExternal && showExternalIcon && (
        <Icon name="arrow-up-right" size="xs" className="opacity-70 shrink-0" />
      )}
      {isExternal && (
        <span className="sr-only">(opens in a new tab)</span>
      )}
    </a>
  )
}
