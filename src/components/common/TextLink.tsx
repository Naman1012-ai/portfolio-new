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
  subtle: 'text-neutral-600 hover:text-neutral-900 decoration-transparent hover:underline underline-offset-4',
  underline: 'text-neutral-900 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-900',
  accent: 'text-neutral-900 font-medium hover:text-neutral-700 decoration-transparent hover:underline underline-offset-4',
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
      className={`inline-flex items-center gap-1 transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 rounded-xs ${variantClasses[variant]} ${className}`}
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
