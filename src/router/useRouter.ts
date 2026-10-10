import { useContext } from 'react'
import { RouterContext, type RouterContextValue } from './context'

/**
 * Access the active route state and programmatic navigation.
 */
export function useRouter(): RouterContextValue {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider')
  }
  return context
}
