import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react'
import {
  RouterContext,
  parsePath,
  type RouteName,
  type RouteState,
  type RouterContextValue,
} from './context'
import { useRouter } from './useRouter'

export type { RouteName, RouteState, RouterContextValue }

export interface RouterProviderProps {
  children: ReactNode
}

export function RouterProvider({ children }: RouterProviderProps) {
  const [routeState, setRouteState] = useState<RouteState>(() =>
    parsePath(window.location.pathname, window.location.hash)
  )

  const scrollTimerRef = useRef<number | null>(null)

  const scrollToHash = useCallback((hash: string) => {
    const targetId = hash.replace('#', '')
    if (!targetId) return

    if (scrollTimerRef.current !== null) {
      window.clearTimeout(scrollTimerRef.current)
      scrollTimerRef.current = null
    }

    let attempts = 0
    const maxAttempts = 25
    const attemptScroll = () => {
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        scrollTimerRef.current = null
      } else if (attempts < maxAttempts) {
        attempts++
        scrollTimerRef.current = window.setTimeout(attemptScroll, 40)
      } else {
        scrollTimerRef.current = null
      }
    }

    scrollTimerRef.current = window.setTimeout(attemptScroll, 10)
  }, [])

  const handleLocationChange = useCallback(() => {
    const newState = parsePath(window.location.pathname, window.location.hash)
    setRouteState(newState)

    // Handle scroll to hash if present across any route transition
    if (window.location.hash) {
      scrollToHash(window.location.hash)
      return
    }

    // Otherwise scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [scrollToHash])

  useEffect(() => {
    // If the page is loaded/reloaded with a hash, ensure we scroll to it once elements mount
    if (window.location.hash) {
      scrollToHash(window.location.hash)
    }

    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('hashchange', handleLocationChange)
    return () => {
      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current)
      }
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('hashchange', handleLocationChange)
    }
  }, [handleLocationChange, scrollToHash])

  const navigate = useCallback(
    (to: string, options: { replace?: boolean; preserveHash?: boolean } = {}) => {
      // Split path and hash
      const [pathPart, hashPart] = to.split('#')
      const targetHash = hashPart !== undefined ? `#${hashPart}` : options.preserveHash ? window.location.hash : ''
      const targetUrl = (pathPart || '/') + targetHash

      if (options.replace) {
        window.history.replaceState(null, '', targetUrl)
      } else {
        window.history.pushState(null, '', targetUrl)
      }

      handleLocationChange()
    },
    [handleLocationChange]
  )

  const contextValue = useMemo(
    () => ({
      ...routeState,
      navigate,
    }),
    [routeState, navigate]
  )

  return <RouterContext.Provider value={contextValue}>{children}</RouterContext.Provider>
}

export interface LinkProps {
  to: string
  children: ReactNode
  className?: string
  replace?: boolean
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
  'aria-label'?: string
}

/**
 * Accessible client-side navigation link that intercepts standard clicks
 * while preserving new-tab commands (Cmd/Ctrl + click).
 */
export function Link({
  to,
  children,
  className = '',
  replace = false,
  onClick,
  'aria-label': ariaLabel,
}: LinkProps) {
  const { navigate } = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e)
    }

    // Allow normal browser new-tab behavior on Ctrl / Cmd / Shift / Alt or middle-click
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return
    }

    e.preventDefault()
    navigate(to, { replace })
  }

  return (
    <a href={to} onClick={handleClick} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  )
}
