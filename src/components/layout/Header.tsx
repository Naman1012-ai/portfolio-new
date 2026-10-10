import {
  useEffect,
  useState,
  type MouseEvent,
} from 'react'
import { BrandLockup } from '@/components/common/BrandLockup'
import { Container } from '@/components/common/Container'
import { ResumeAction } from '@/components/common/ResumeAction'
import { navigationItems } from '@/data'
import { useScrollCompact } from '@/hooks'
import { useRouter } from '@/router'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const { route, navigate } = useRouter()
  const isCompact = useScrollCompact()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Close menu on route change or when header expands back to full on desktop
  const [prevRoute, setPrevRoute] = useState(route)
  if (prevRoute !== route) {
    setPrevRoute(route)
    if (isMenuOpen) setIsMenuOpen(false)
  }

  const [prevCompact, setPrevCompact] = useState(isCompact)
  if (prevCompact !== isCompact) {
    setPrevCompact(isCompact)
    if (!isCompact && typeof window !== 'undefined' && window.innerWidth >= 768) {
      if (isMenuOpen) setIsMenuOpen(false)
    }
  }

  // Automatically close menu when viewport is resized past desktop breakpoint while expanded
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && !isCompact) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [isCompact])

  const handleNavClick = (href: string, e: MouseEvent<HTMLAnchorElement>) => {
    // If it's a middle-click or cmd/ctrl click, let browser handle it
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return
    }

    e.preventDefault()

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
            subtitle="Systems & AI Engineer"
            className="shrink-0"
          />

          {/* Right-hand side navigation container (fixed h-16) */}
          <div className="flex items-center">
            {/* Desktop Full Navigation (>= 768px):
                - Visible at top (scrollY <= 16px)
                - Collapses with 150ms opacity/transform transition when scrolled (scrollY > 64px)
                - Hidden under 768px (mobile always uses hamburger)
            */}
            <nav
              aria-label="Main Navigation"
              aria-hidden={isCompact}
              className={`hidden md:flex items-center transition-all duration-150 ease-out motion-reduce:transition-none ${
                isCompact
                  ? 'opacity-0 scale-95 pointer-events-none invisible absolute right-0'
                  : 'opacity-100 scale-100 pointer-events-auto visible'
              }`}
            >
              <ul className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm font-medium text-neutral-600">
                {navigationItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={route === 'home' ? item.href : `/${item.href}`}
                      onClick={(e) => handleNavClick(item.href, e)}
                      className="hover:text-neutral-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 rounded-xs px-1 py-0.5"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}

                <li>
                  <ResumeAction variant="header" />
                </li>
              </ul>
            </nav>

            {/* Hamburger Menu & Compact Trigger:
                - Always visible below 768px (mobile & small screens)
                - On desktop (>= 768px): visible when isCompact, smoothly hidden when expanded
            */}
            <div
              className={`flex items-center transition-all duration-150 ease-out motion-reduce:transition-none ${
                !isCompact
                  ? 'md:opacity-0 md:scale-95 md:pointer-events-none md:invisible md:absolute md:right-0'
                  : 'md:opacity-100 md:scale-100 md:pointer-events-auto md:visible'
              }`}
              aria-hidden={!isCompact ? true : undefined}
            >
              <MobileMenu
                isOpen={isMenuOpen}
                onToggle={() => setIsMenuOpen((prev) => !prev)}
                onClose={() => setIsMenuOpen(false)}
                onNavClick={handleNavClick}
                currentRoute={route}
              />
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}
