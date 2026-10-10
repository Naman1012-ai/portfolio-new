import type { MouseEvent } from 'react'
import { BrandLockup } from '@/components/common/BrandLockup'
import { Container } from '@/components/common/Container'
import { ResumeAction } from '@/components/common/ResumeAction'
import { navigationItems } from '@/data'
import { useRouter } from '@/router'

export function Header() {
  const { route, navigate } = useRouter()

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
        <div className="flex h-16 items-center justify-between gap-2 sm:gap-4">
          <BrandLockup
            href="/"
            onClick={(e) => handleNavClick('#hero', e)}
            subtitle="Systems & AI Engineer"
            className="shrink-0"
          />

          <nav aria-label="Main Navigation">
            <ul className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm font-medium text-neutral-600">
              {navigationItems.map((item) => (
                <li
                  key={item.label}
                  className={
                    item.label === 'About' || item.label === 'Experience'
                      ? 'hidden sm:inline-block'
                      : undefined
                  }
                >
                  <a
                    href={route === 'home' ? item.href : `/${item.href}`}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className="hover:text-neutral-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 rounded-xs px-1 py-0.5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}

              <li className="hidden sm:inline-block">
                <ResumeAction variant="header" />
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  )
}
