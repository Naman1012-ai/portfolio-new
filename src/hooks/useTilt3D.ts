import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from 'react'

export interface Tilt3DOptions {
  maxRotationX?: number // Max tilt along horizontal axis (deg), default: 4
  maxRotationY?: number // Max tilt along vertical axis (deg), default: 5
  scale?: number // Scale on hover, default: 1.008
  perspective?: number // Perspective depth in px, default: 1200
  glare?: boolean // Enable dynamic radial spotlight, default: true
  glareOpacity?: number // Max glare opacity (0-1), default: 0.15
  disabled?: boolean // Force disable
}

export interface Tilt3DState {
  rotateX: number
  rotateY: number
  scale: number
  glareX: number // Percentage 0-100
  glareY: number // Percentage 0-100
  glareOpacity: number
  isHovered: boolean
}

const DEFAULT_STATE: Tilt3DState = {
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  glareX: 50,
  glareY: 50,
  glareOpacity: 0,
  isHovered: false,
}

/**
 * Performant, pointer-driven 3D perspective tilt hook.
 * Calculates real-time rotateX/rotateY and dynamic spotlight lighting coordinates.
 * Respects prefers-reduced-motion and touch device safety automatically.
 */
export function useTilt3D<T extends HTMLElement = HTMLDivElement>(
  options: Tilt3DOptions = {}
) {
  const {
    maxRotationX = 4,
    maxRotationY = 5,
    scale = 1.008,
    perspective = 1200,
    glare = true,
    glareOpacity = 0.15,
    disabled = false,
  } = options

  const containerRef = useRef<T | null>(null)
  const [state, setState] = useState<Tilt3DState>(DEFAULT_STATE)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )
  const [isTouchDevice, setIsTouchDevice] = useState(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(pointer: coarse)').matches
      : false
  )

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    motionQuery.addEventListener('change', handleMotionChange)

    const touchQuery = window.matchMedia('(pointer: coarse)')
    const handleTouchChange = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches)
    touchQuery.addEventListener('change', handleTouchChange)

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange)
      touchQuery.removeEventListener('change', handleTouchChange)
    }
  }, [])

  const isTiltActive = !disabled && !prefersReducedMotion && !isTouchDevice

  const handlePointerMove = useCallback(
    (e: PointerEvent<T>) => {
      if (!isTiltActive || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return

      // Normalized coordinates from 0 to 1
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))

      // Tilt angles: pointer at left tilts card right (rotateY negative/positive)
      const rotateY = Number(((x - 0.5) * (maxRotationY * 2)).toFixed(2))
      const rotateX = Number((-(y - 0.5) * (maxRotationX * 2)).toFixed(2))

      const glareX = Number((x * 100).toFixed(1))
      const glareY = Number((y * 100).toFixed(1))

      setState({
        rotateX,
        rotateY,
        scale,
        glareX,
        glareY,
        glareOpacity: glare ? glareOpacity : 0,
        isHovered: true,
      })
    },
    [isTiltActive, maxRotationX, maxRotationY, scale, glare, glareOpacity]
  )

  const handlePointerEnter = useCallback(
    (e: PointerEvent<T>) => {
      if (!isTiltActive) return
      handlePointerMove(e)
    },
    [isTiltActive, handlePointerMove]
  )

  const handlePointerLeave = useCallback(() => {
    if (!isTiltActive) return
    setState(DEFAULT_STATE)
  }, [isTiltActive])

  // Computed 3D container style
  const containerStyle: CSSProperties = isTiltActive
    ? {
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }
    : {}

  // Computed transform style for the tilted layer
  const transformStyle: CSSProperties = isTiltActive
    ? {
        transform: state.isHovered
          ? `perspective(${perspective}px) rotateX(${state.rotateX}deg) rotateY(${state.rotateY}deg) scale3d(${state.scale}, ${state.scale}, ${state.scale})`
          : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        transition: state.isHovered
          ? 'transform 100ms cubic-bezier(0.2, 0.8, 0.4, 1)'
          : 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
        willChange: state.isHovered ? 'transform' : 'auto',
      }
    : {}

  // Dynamic pointer-responsive spotlight / highlight overlay
  const glareStyle: CSSProperties = isTiltActive && glare
    ? {
        background: `radial-gradient(circle 300px at ${state.glareX}% ${state.glareY}%, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.03) 40%, transparent 75%)`,
        opacity: state.isHovered ? state.glareOpacity : 0,
        transition: state.isHovered
          ? 'opacity 150ms ease-out'
          : 'opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: 'none',
      }
    : { display: 'none' }

  return {
    ref: containerRef,
    state,
    isTiltActive,
    containerStyle,
    transformStyle,
    glareStyle,
    handlers: {
      onPointerMove: handlePointerMove,
      onPointerEnter: handlePointerEnter,
      onPointerLeave: handlePointerLeave,
    },
  }
}
