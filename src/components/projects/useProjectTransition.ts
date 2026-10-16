import { useContext } from 'react'
import {
  ProjectTransitionContext,
  type ProjectTransitionContextValue,
} from './projectTransitionContextDef'

export function useProjectTransition(): ProjectTransitionContextValue {
  return useContext(ProjectTransitionContext)
}
