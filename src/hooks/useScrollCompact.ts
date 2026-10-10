import { useEffect, useState } from 'react'

export interface ScrollCompactOptions {
  collapseThreshold?: number
  expandThreshold?: number
}

/**
 * Pure hysteresis logic for scroll-contracting navbar:
 * - scrollY > collapseThreshold (default 64): compact (true)
 * - scrollY <= expandThreshold (default 16): full (false)
 * - between expandThreshold and collapseThreshold: maintains previous state to avoid jitter
 */
export function computeScrollCompact(
  scrollY: number,
  previousState: boolean,
  collapseThreshold = 64,
  expandThreshold = 16
): boolean {
  if (scrollY > collapseThreshold) {
    return true
  }
  if (scrollY <= expandThreshold) {
    return false
  }
  return previousState
}

/**
 * Hook to track whether the navbar should be compact based on window.scrollY with hysteresis.
 * Uses requestAnimationFrame throttling and passive event listeners.
 * Computes initial state directly on mount to handle mid-page reloads accurately.
 */
export function useScrollCompact(options: ScrollCompactOptions = {}): boolean {
  const { collapseThreshold = 64, expandThreshold = 16 } = options

  const [isCompact, setIsCompact] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (window.scrollY || 0) > collapseThreshold
    }
    return false
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    let rafId: number | null = null

    const handleScroll = () => {
      if (rafId !== null) return

      rafId = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY || 0
        setIsCompact((prev) =>
          computeScrollCompact(currentScrollY, prev, collapseThreshold, expandThreshold)
        )
        rafId = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [collapseThreshold, expandThreshold])

  return isCompact
}
