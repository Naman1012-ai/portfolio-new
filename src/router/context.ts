import { createContext } from 'react'

export type RouteName = 'home' | 'project-detail' | 'not-found'

export interface RouteState {
  path: string
  route: RouteName
  slug?: string
  hash: string
}

export interface RouterContextValue extends RouteState {
  navigate: (to: string, options?: { replace?: boolean; preserveHash?: boolean }) => void
}

export const RouterContext = createContext<RouterContextValue | null>(null)

/**
 * Pure route path parser supporting clean URLs, trailing slash normalization,
 * hash-based route fallback (#/projects/:slug), and deep link extraction.
 */
export function parsePath(pathname: string, hash: string = ''): RouteState {
  // Check if hash has a route like #/projects/convia
  if (hash.startsWith('#/')) {
    const hashPath = hash.slice(1) // remove '#'
    return parsePath(hashPath, '')
  }

  // Normalize pathname (strip trailing slashes unless root)
  const cleanPath = pathname.replace(/\/+$/, '') || '/'

  // Match /projects/:slug
  const projectMatch = cleanPath.match(/^\/projects\/([^/]+)$/)
  if (projectMatch) {
    return {
      path: cleanPath,
      route: 'project-detail',
      slug: projectMatch[1],
      hash,
    }
  }

  if (cleanPath === '/' || cleanPath === '') {
    return {
      path: '/',
      route: 'home',
      hash,
    }
  }

  // Any other route
  return {
    path: cleanPath,
    route: 'not-found',
    hash,
  }
}
