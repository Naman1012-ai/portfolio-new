import { useState, useEffect, type ReactNode } from 'react'
import {
  PerspectiveContext,
  PERSPECTIVES,
  type PerspectiveMode,
} from './perspectiveTypes'

export function PerspectiveProvider({ children }: { children: ReactNode }) {
  const [perspective, setPerspectiveState] = useState<PerspectiveMode>(() => {
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search)
        let view = params.get('view') as string | null
        // Normalize legacy aliases
        if (view === 'all') view = 'explore'
        if (view === 'founder' || view === 'investor') view = 'product'
        if (view === 'interviewer') view = 'engineering'

        if (view && (view === 'explore' || view === 'engineering' || view === 'product')) {
          return view
        }
      } catch {
        // Fallback for non-browser environments
      }
    }
    return 'explore'
  })

  const [isCommandOpen, setIsCommandOpen] = useState(false)

  const openCommandPalette = () => setIsCommandOpen(true)
  const closeCommandPalette = () => setIsCommandOpen(false)

  // Global keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsCommandOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const setPerspective = (mode: PerspectiveMode) => {
    setPerspectiveState(mode)
    if (typeof window !== 'undefined') {
      try {
        const url = new URL(window.location.href)
        if (mode === 'explore') {
          url.searchParams.delete('view')
        } else {
          url.searchParams.set('view', mode)
        }
        window.history.replaceState({}, '', url.toString())
      } catch {
        // Fallback for environments where History API is constrained
      }
    }
  }

  const info = PERSPECTIVES[perspective]

  const isHighlightedSlug = (slug: string) => {
    if (perspective === 'explore') return false
    return info.highlightedSlugs.includes(slug)
  }

  const isHighlightedDecision = (id: string) => {
    if (perspective === 'explore') return false
    return info.highlightedDecisions.includes(id)
  }

  return (
    <PerspectiveContext.Provider
      value={{
        perspective,
        info,
        setPerspective,
        isHighlightedSlug,
        isHighlightedDecision,
        isCommandOpen,
        openCommandPalette,
        closeCommandPalette,
      }}
    >
      {children}
    </PerspectiveContext.Provider>
  )
}
