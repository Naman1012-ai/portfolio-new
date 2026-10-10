import {
  useCallback,
  useEffect,
  useMemo,
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

  const handleLocationChange = useCallback(() => {
    const newState = parsePath(window.location.pathname, window.location.hash)
    setRouteState(newState)

    // Handle scroll to hash if present on home page
    if (window.location.hash && (newState.route === 'home' || newState.path === '/')) {
      const targetId = window.location.hash.replace('#', '')
      const el = document.getElementById(targetId)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50)
        return
      }
    }

    // Otherwise scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('hashchange', handleLocationChange)
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('hashchange', handleLocationChange)
    }
  }, [handleLocationChange])

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
