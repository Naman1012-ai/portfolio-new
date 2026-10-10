import { useEffect } from 'react'

/**
 * Hook to update document title for accessible screen reader page navigation.
 */
export function useDocumentTitle(title: string): void {
  useEffect(() => {
    const originalTitle = document.title
    document.title = title ? `${title} | Portfolio` : 'Portfolio'

    return () => {
      document.title = originalTitle
    }
  }, [title])
}
