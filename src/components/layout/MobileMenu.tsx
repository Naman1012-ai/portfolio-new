import {
  useEffect,
  useRef,
  type MouseEvent,
} from 'react'
import { PerspectiveSwitcher } from '@/components/common/PerspectiveSwitcher'
import { ResumeAction } from '@/components/common/ResumeAction'
import { navigationItems } from '@/data'

export interface MobileMenuProps {
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
  onNavClick?: (href: string, e: MouseEvent<HTMLAnchorElement>) => void
  currentRoute?: string
  isResumeAvailableOverride?: boolean
  className?: string
}

export function MobileMenu({
  isOpen,
  onToggle,
  onClose,
  onNavClick,
  currentRoute = 'home',
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
          'button:not([disabled]), a[href], [tabindex="0"]'
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
        className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200/90 border border-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer shadow-xs"
        title={isOpen ? 'Close mobile menu' : 'Open mobile menu'}
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

      {/* Anchored Dropdown Panel containing Navigation, Resume, and Perspective */}
      {isOpen && (
        <div
          id="header-mobile-menu-panel"
          ref={panelRef}
          role="region"
          aria-label="Navigation and Perspective Menu"
          className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.15)] rounded-2xl p-4 z-50 animate-fade-in motion-reduce:animate-none space-y-4"
        >
          {/* Section 1: Navigation Links */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2 px-2">
              Navigation
            </div>
            <ul className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              {navigationItems.map((item) => {
                const resolvedHref = item.href.startsWith('/')
                  ? item.href
                  : currentRoute === 'home'
                    ? item.href
                    : `/${item.href}`

                return (
                  <li key={item.label}>
                    <a
                      href={resolvedHref}
                      onClick={(e) => {
                        onNavClick?.(item.href, e)
                        onClose()
                      }}
                      className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl hover:bg-slate-100 hover:text-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    >
                      <span>{item.label}</span>
                      <span className="text-slate-400 text-xs font-mono">→</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Section 2: Resume Action */}
          <div className="pt-3 border-t border-slate-200 flex flex-col gap-1.5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-2">
              Credentials
            </div>
            <ResumeAction
              variant="header"
              isAvailableOverride={isResumeAvailableOverride}
              className="w-full justify-center py-2.5"
            />
          </div>

          {/* Section 3: Perspective Lenses */}
          <div className="pt-3 border-t border-slate-200">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2 px-2">
              Audience Lens
            </div>
            <PerspectiveSwitcher
              variant="header"
              onSelect={onClose}
              className="w-full justify-between"
            />
          </div>
        </div>
      )}
    </div>
  )
}
