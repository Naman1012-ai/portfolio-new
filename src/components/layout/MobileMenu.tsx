import {
  useEffect,
  useRef,
  type MouseEvent,
} from 'react'
import { ResumeAction } from '@/components/common/ResumeAction'
import { navigationItems } from '@/data'

export interface MobileMenuProps {
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
  onNavClick: (href: string, e: MouseEvent<HTMLAnchorElement>) => void
  currentRoute: string
  /**
   * Optional availability override for testing the resume state
   */
  isResumeAvailableOverride?: boolean
  className?: string
}

export function MobileMenu({
  isOpen,
  onToggle,
  onClose,
  onNavClick,
  currentRoute,
  isResumeAvailableOverride,
  className = '',
}: MobileMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // 1. Keyboard Escape to close and restore focus to trigger button
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        buttonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // 2. Click/pointer outside to close
  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (e: MouseEvent | PointerEvent | globalThis.MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isOpen, onClose])

  // 3. Move focus to first item when opened
  useEffect(() => {
    if (isOpen) {
      const raf = requestAnimationFrame(() => {
        const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex="0"]'
        )
        firstFocusable?.focus()
      })
      return () => cancelAnimationFrame(raf)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className={`relative shrink-0 ${className}`}>
      {/* 44x44px accessible hamburger/close toggle button */}
      <button
        ref={buttonRef}
        type="button"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="header-mobile-menu-panel"
        onClick={onToggle}
        className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xs text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
      >
        {isOpen ? (
          /* Close Icon */
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          /* Hamburger Icon */
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        )}
      </button>

      {/* Anchored Dropdown Panel */}
      {isOpen && (
        <div
          id="header-mobile-menu-panel"
          ref={panelRef}
          role="region"
          aria-label="Navigation Menu"
          className="absolute right-0 top-full mt-2 w-56 sm:w-64 bg-white/95 backdrop-blur-md border border-neutral-200 shadow-elevated rounded-md p-2 z-50 animate-fade-in motion-reduce:animate-none"
        >
          <ul className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
            {navigationItems.map((item) => (
              <li key={item.label}>
                <a
                  href={currentRoute === 'home' ? item.href : `/${item.href}`}
                  onClick={(e) => {
                    onNavClick(item.href, e)
                    onClose()
                  }}
                  className="flex items-center w-full px-3 py-2 rounded-xs hover:bg-neutral-100 hover:text-neutral-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                >
                  {item.label}
                </a>
              </li>
            ))}

            {/* Resume Action at end of list */}
            <li className="pt-1 mt-1 border-t border-neutral-100">
              <ResumeAction
                variant="header"
                isAvailableOverride={isResumeAvailableOverride}
                className="w-full justify-between"
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
