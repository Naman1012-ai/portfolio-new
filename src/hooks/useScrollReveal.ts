import { useEffect, useRef, useState } from 'react'

export interface UseScrollRevealOptions {
  /** Intersection threshold from 0 to 1 (default: 0.08) */
  threshold?: number
  /** Root margin offset for earlier/later trigger (default: '0px 0px -40px 0px') */
  rootMargin?: string
  /** Explicitly disable reveal animation, making content immediately visible (default: false) */
  disabled?: boolean
}

export interface ScrollRevealState<T extends HTMLElement = HTMLElement> {
  ref: React.RefObject<T | null>
  isRevealed: boolean
}

/**
 * Lightweight, accessible scroll-reveal hook using native IntersectionObserver.
 *
 * Guarantees:
 * - Content is immediately visible if IntersectionObserver is unsupported, in SSR,
 *   or when prefers-reduced-motion is enabled.
 * - Disconnects observer immediately after the first reveal to prevent repeat glitches
 *   and avoid ongoing CPU/GPU overhead when scrolling back and forth.
 * - Failsafe fallback timer guarantees content becomes visible even if observation fails.
 * - Zero window scroll listeners; no per-frame main-thread overhead.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: UseScrollRevealOptions = {}
): ScrollRevealState<T> {
  const { threshold = 0.08, rootMargin = '0px 0px -40px 0px', disabled = false } = options

  const ref = useRef<T | null>(null)

  // Default to revealed immediately in SSR, test environments, or when reduced-motion is preferred
  const [isRevealed, setIsRevealed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    if (disabled) return true
    if (!('IntersectionObserver' in window)) return true
    if (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return true
    }
    return false
  })

  useEffect(() => {
    if (isRevealed || disabled) return
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    const element = ref.current
    if (!element) return

    // Failsafe timer: ensure content is revealed if observer fails or element is outside viewport calculation
    const fallbackTimer = window.setTimeout(() => {
      setIsRevealed(true)
    }, 1200)

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry && entry.isIntersecting) {
          setIsRevealed(true)
          window.clearTimeout(fallbackTimer)
          observer.unobserve(element)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      window.clearTimeout(fallbackTimer)
      observer.disconnect()
    }
  }, [disabled, isRevealed, rootMargin, threshold])

  return { ref, isRevealed }
}
