import { createContext } from 'react'

export interface ProjectTransitionContextValue {
  enteringSlug: string | null
  isTransitioning: boolean
  enterProject: (slug: string, href?: string) => void
}

export const ProjectTransitionContext = createContext<ProjectTransitionContextValue>({
  enteringSlug: null,
  isTransitioning: false,
  enterProject: () => {},
})
