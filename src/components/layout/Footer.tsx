import type { MouseEvent } from 'react'
import { BrandLockup } from '@/components/common/BrandLockup'
import { Container } from '@/components/common/Container'
import { siteMetadata } from '@/data'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  const pathname =
    typeof window !== 'undefined' && window.location?.pathname
      ? window.location.pathname
      : '/'
  const isHome = pathname === '/' || pathname === ''

  const handleBrandClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Preserve middle-click or Cmd/Ctrl/Shift/Alt click to open in new tab
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return
    }

    e.preventDefault()

    if (typeof window === 'undefined') return

    const currentPath = window.location?.pathname || '/'
    if (currentPath !== '/' && currentPath !== '') {
      window.history.pushState(null, '', '/#hero')
      window.dispatchEvent(new PopStateEvent('popstate'))
    } else {
      // On homepage: smooth scroll to hero section
      const el = document.getElementById('hero')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', '#hero')
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="border-t border-slate-200/80 bg-white/70 backdrop-blur-md py-10 text-slate-500 text-sm">
      <Container size="lg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <BrandLockup
            href={isHome ? '#hero' : '/#hero'}
            onClick={handleBrandClick}
            showMonogram={true}
          />
          <div className="flex items-center gap-3">
            <p className="text-xs text-slate-500">
              © {CURRENT_YEAR} {siteMetadata.author || 'Naman Prajapati'}. Built with React 19, TypeScript & Tailwind CSS v4.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

