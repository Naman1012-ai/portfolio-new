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
    <header className="border-b border-neutral-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
      <Container size="lg">
        <div className="flex h-16 items-center justify-between gap-2 sm:gap-4 relative">
          <BrandLockup
            href="/"
            onClick={(e) => handleNavClick('#hero', e)}
            subtitle={siteProfile.title}
            className="shrink-0"
          />

          {/* Navigation Links (Permanently visible) + Actions + Hamburger Menu */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <nav
              aria-label="Main Navigation"
              className="flex items-center"
            >
              <ul className="flex items-center gap-2 sm:gap-3 md:gap-5 text-xs sm:text-sm font-medium text-neutral-600">
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
                        className="hover:text-neutral-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 rounded-xs px-1 py-0.5 whitespace-nowrap"
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
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-xs text-[11px] font-mono text-neutral-600 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200/90 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900 cursor-pointer"
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

            <MobileMenu
              isOpen={isMenuOpen}
              onToggle={() => setIsMenuOpen((prev) => !prev)}
              onClose={() => setIsMenuOpen(false)}
            />
          </div>
        </div>
      </Container>
    </header>
  )
}
