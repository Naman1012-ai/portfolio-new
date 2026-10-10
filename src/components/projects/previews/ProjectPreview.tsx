import type { Project } from '@/types'
import { getProjectArchetype } from '@/utils'
import { BackendAiPreview } from './BackendAiPreview'
import { DataAnalyticsPreview } from './DataAnalyticsPreview'
import { ProductSaaSPreview } from './ProductSaaSPreview'
import { ResearchRoboticsPreview } from './ResearchRoboticsPreview'
import { SocialCoordinationPreview } from './SocialCoordinationPreview'
import { SystemsOopPreview } from './SystemsOopPreview'
import { TerminalCliPreview } from './TerminalCliPreview'

export interface ProjectPreviewProps {
  project: Project
  variant?: 'card' | 'showcase' | 'case-study'
  className?: string
}

/**
 * Centralized, deterministic Project Preview Dispatcher.
 * Inspects project archetype and routes to the appropriate archetype preview component.
 * Ensures consistent rendering across project cards, showcase media, and case-study heroes.
 */
export function ProjectPreview({
  project,
  variant = 'card',
  className = '',
}: ProjectPreviewProps) {
  const archetype = getProjectArchetype(project)

  switch (archetype) {
    case 'product-saas':
      return <ProductSaaSPreview project={project} variant={variant} className={className} />

    case 'social-coordination':
      return <SocialCoordinationPreview project={project} variant={variant} className={className} />

    case 'data-analytics':
      return <DataAnalyticsPreview project={project} variant={variant} className={className} />

    case 'terminal-cli':
      return <TerminalCliPreview project={project} variant={variant} className={className} />

    case 'systems-oop':
      return <SystemsOopPreview project={project} variant={variant} className={className} />

    case 'backend-ai':
      return <BackendAiPreview project={project} variant={variant} className={className} />

    case 'research-robotics':
      return <ResearchRoboticsPreview project={project} variant={variant} className={className} />

    default:
      return <ProductSaaSPreview project={project} variant={variant} className={className} />
  }
}
