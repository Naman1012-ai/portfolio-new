import { useContext } from 'react'
import { PerspectiveContext, type PerspectiveContextValue } from './perspectiveTypes'

export function usePerspective(): PerspectiveContextValue {
  return useContext(PerspectiveContext)
}
