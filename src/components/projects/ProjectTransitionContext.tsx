import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useRouter } from '@/router'
import {
  ProjectTransitionContext,
  type ProjectTransitionContextValue,
} from './projectTransitionContextDef'

export interface ProjectTransitionProviderProps {
  children: ReactNode
}

/**
 * Coordinated transition provider for the Project Universe "Discover → Focus → Enter" interaction.
 * Coordinates smooth focus scaling on the selected project card while surrounding elements
 * recede, before executing route navigation.
 * Bypasses transition delay instantly when prefers-reduced-motion is enabled.
 */
export function ProjectTransitionProvider({ children }: ProjectTransitionProviderProps) {
  const [enteringSlug, setEnteringSlug] = useState<string | null>(null)
  const { navigate } = useRouter()

  const enterProject = useCallback(
    (slug: string, href?: string) => {
      const targetUrl = href || `/projects/${slug}`

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (prefersReducedMotion) {
        navigate(targetUrl)
        return
      }

      setEnteringSlug(slug)

      // Cinematic transition budget: 420ms (well within the 400-800ms envelope)
      window.setTimeout(() => {
        navigate(targetUrl)
        window.setTimeout(() => {
          setEnteringSlug(null)
        }, 120)
      }, 420)
    },
    [navigate]
  )

  const value = useMemo<ProjectTransitionContextValue>(
    () => ({
      enteringSlug,
      isTransitioning: enteringSlug !== null,
      enterProject,
    }),
    [enteringSlug, enterProject]
  )

  return (
    <ProjectTransitionContext.Provider value={value}>
      {children}
    </ProjectTransitionContext.Provider>
  )
}
