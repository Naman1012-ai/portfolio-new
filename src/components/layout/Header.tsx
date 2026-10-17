import {
  useState,
  type MouseEvent,
} from 'react'
import { BrandLockup } from '@/components/common/BrandLockup'
import { Container } from '@/components/common/Container'
import { ResumeAction } from '@/components/common/ResumeAction'
import { usePerspective } from '@/context'
import { navigationItems, siteProfile } from '@/data'
import { useRouter } from '@/router'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const { route, navigate } = useRouter()
  const { openCommandPalette } = usePerspective()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Close menu on route change
  const [prevRoute, setPrevRoute] = useState(route)
  if (prevRoute !== route) {
    setPrevRoute(route)
    if (isMenuOpen) setIsMenuOpen(false)
  }

  const handleNavClick = (href: string, e: MouseEvent<HTMLAnchorElement>) => {
    // If it's a middle-click or cmd/ctrl click, let browser handle it
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return
    }

    e.preventDefault()

    if (href.startsWith('/')) {
      navigate(href)
      return
    }

    if (route !== 'home') {
      navigate('/' + href)
    } else {
      const targetId = href.replace('#', '')
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', href)
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  return (
    <header className="border-b border-slate-200/80 bg-white/85 backdrop-blur-xl sticky top-0 z-50 shadow-[0_1px_3px_0_rgba(15,23,42,0.05),0_10px_25px_-5px_rgba(15,23,42,0.03)] transition-colors">
      <Container size="lg">
        <div className="flex h-16 items-center justify-between gap-2 sm:gap-4 relative">
          <BrandLockup
            href="/"
            onClick={(e) => handleNavClick('#hero', e)}
            subtitle={siteProfile.title}
            className="shrink-0"
          />

          {/* Desktop Navigation Links + Actions (>= 768px) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center"
          >
            <ul className="flex items-center gap-2 sm:gap-3 md:gap-5 text-xs sm:text-sm font-medium text-slate-600">
              {navigationItems.map((item) => {
                const resolvedHref = item.href.startsWith('/')
                  ? item.href
                  : route === 'home'
                    ? item.href
                    : `/${item.href}`

                return (
                  <li key={item.label}>
                    <a
                      href={resolvedHref}
                      onClick={(e) => handleNavClick(item.href, e)}
                      className="hover:text-slate-950 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-xs px-1 py-0.5 whitespace-nowrap"
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}

              <li>
                <button
                  type="button"
                  onClick={openCommandPalette}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 hover:border-slate-300 transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 cursor-pointer shadow-xs"
                  title="Open Command Palette (⌘K / Ctrl+K)"
                  aria-label="Open command palette"
                >
                  <span className="font-semibold">⌘K</span>
                </button>
              </li>
              <li>
                <ResumeAction variant="header" />
              </li>
            </ul>
          </nav>

          {/* Mobile Actions Container (< 768px) */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={openCommandPalette}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-mono text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 hover:border-slate-300 transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 cursor-pointer shadow-xs"
              title="Open Command Palette (⌘K / Ctrl+K)"
              aria-label="Open command palette"
            >
              <span className="font-semibold">⌘K</span>
            </button>

            <MobileMenu
              isOpen={isMenuOpen}
              onToggle={() => setIsMenuOpen((prev) => !prev)}
              onClose={() => setIsMenuOpen(false)}
              onNavClick={handleNavClick}
              currentRoute={route}
            />
          </div>
        </div>
      </Container>
    </header>
  )
}
