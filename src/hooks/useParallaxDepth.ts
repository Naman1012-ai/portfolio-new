import { useCallback, useEffect, useRef, useState } from 'react'

export interface ParallaxDepthState {
  x: number // -1 (left) to 1 (right)
  y: number // -1 (top) to 1 (bottom)
  isActive: boolean
}

const DEFAULT_STATE: ParallaxDepthState = { x: 0, y: 0, isActive: false }

export interface ParallaxDepthOptions {
  /**
   * Optional ref to scope pointer tracking to a specific element.
   * When provided, x/y are normalized relative to that element's bounding box.
   * When omitted, x/y are normalized relative to the full viewport.
   */
  containerRef?: React.RefObject<HTMLElement | null>
  disabled?: boolean
}

/**
 * Tracks pointer position and returns normalized (x, y) in [-1, 1] for parallax.
 *
 * Scoping behaviour:
 * - If `containerRef` is provided, coordinates are relative to that element's bounds.
 *   The hook attaches to the element's `pointermove`/`pointerleave` events.
 * - If omitted, coordinates are relative to the full viewport via `window` events.
 *
 * Disabled automatically when:
 * - prefers-reduced-motion: reduce is set
 * - Primary input is a coarse pointer (touch)
 * - `disabled` option is true
 *
 * Uses requestAnimationFrame throttling and passive listeners for GPU-friendly operation.
 */
export function useParallaxDepth(options: ParallaxDepthOptions = {}): ParallaxDepthState {
  const { containerRef, disabled = false } = options

  const [prefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )
  const [isTouchDevice] = useState(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(pointer: coarse)').matches
      : false
  )

  const isEnabled = !disabled && !prefersReducedMotion && !isTouchDevice

  const [state, setState] = useState<ParallaxDepthState>(DEFAULT_STATE)
  const rafId = useRef<number | null>(null)

  const handleMove = useCallback(
    (e: MouseEvent | PointerEvent) => {
      if (!isEnabled) return
      if (rafId.current !== null) return

      rafId.current = window.requestAnimationFrame(() => {
        let x: number
        let y: number

        if (containerRef?.current) {
          const rect = containerRef.current.getBoundingClientRect()
          if (rect.width === 0 || rect.height === 0) { rafId.current = null; return }
          x = Number((((e.clientX - rect.left) / rect.width - 0.5) * 2).toFixed(3))
          y = Number((((e.clientY - rect.top) / rect.height - 0.5) * 2).toFixed(3))
          // Clamp: outside element edges shouldn't produce values beyond ±1
          x = Math.max(-1, Math.min(1, x))
          y = Math.max(-1, Math.min(1, y))
        } else {
          x = Number(((e.clientX / window.innerWidth - 0.5) * 2).toFixed(3))
          y = Number(((e.clientY / window.innerHeight - 0.5) * 2).toFixed(3))
        }

        setState({ x, y, isActive: true })
        rafId.current = null
      })
    },
    [isEnabled, containerRef]
  )

  const handleLeave = useCallback(() => {
    if (!isEnabled) return
    if (rafId.current !== null) {
      window.cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
    setState(DEFAULT_STATE)
  }, [isEnabled])

  useEffect(() => {
    if (!isEnabled) return

    const el = containerRef?.current ?? null

    if (el) {
      // Element-scoped: attach to the element itself
      el.addEventListener('pointermove', handleMove as EventListener, { passive: true })
      el.addEventListener('pointerleave', handleLeave, { passive: true })
      return () => {
        el.removeEventListener('pointermove', handleMove as EventListener)
        el.removeEventListener('pointerleave', handleLeave)
        if (rafId.current !== null) window.cancelAnimationFrame(rafId.current)
      }
    } else {
      // Viewport-scoped: attach to window / document
      window.addEventListener('mousemove', handleMove as EventListener, { passive: true })
      document.documentElement.addEventListener('mouseleave', handleLeave, { passive: true })
      return () => {
        window.removeEventListener('mousemove', handleMove as EventListener)
        document.documentElement.removeEventListener('mouseleave', handleLeave)
        if (rafId.current !== null) window.cancelAnimationFrame(rafId.current)
      }
    }
  }, [isEnabled, containerRef, handleMove, handleLeave])

  return isEnabled ? state : DEFAULT_STATE
}
