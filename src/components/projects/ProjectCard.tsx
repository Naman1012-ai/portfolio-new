import { Badge, Button, Card, Heading, Icon, Text, TextLink } from '@/components/common'
import { useTilt3D } from '@/hooks'
import { Link } from '@/router'
import type { Project } from '@/types'
import { getArchetypeDefinition, getProjectArchetype, isAssetAvailable } from '@/utils'
import { ProjectPreview } from './previews'

export interface ProjectCardProps {
  project: Project
  className?: string
}

/**
 * Reusable, visually rich project card communicating technical maturity,
 * architectural category, concise summary, and clear interaction actions.
 * Features archetype-specific preview frames, a Netflix-inspired interactive reveal overlay, and pointer-driven 3D tilt.
 */
export function ProjectCard({ project, className = '' }: ProjectCardProps) {
  const hasRepo = Boolean(project.links?.repo)
  const isTeam = project.teamProject && Boolean(project.teamAttribution)

  const archetype = getProjectArchetype(project)
  const archetypeDef = getArchetypeDefinition(archetype)

  const maturityVariant =
    project.maturity === 'production'
      ? 'success'
      : project.maturity === 'completed'
        ? 'neutral'
        : 'subtle'

  const dotColor =
    project.maturity === 'production'
      ? 'bg-emerald-500'
      : project.maturity === 'completed'
        ? 'bg-neutral-600'
        : 'bg-amber-400'

  const hasGenuineEvidence =
    project.evidence?.assetFilename && isAssetAvailable(project.evidence.assetFilename)
  const primaryFeature = project.caseStudy?.keyFeatures?.[0] || project.summary

  const {
    ref: tiltRef,
    state: tiltState,
    isTiltActive,
    containerStyle,
    transformStyle,
    glareStyle,
    handlers: tiltHandlers,
  } = useTilt3D<HTMLDivElement>({
    maxRotationX: 2,
    maxRotationY: 2.5,
    scale: 1.002,
    perspective: 1200,
    glare: true,
    glareOpacity: 0.08,
  })

  return (
    <Card
      as="article"
      variant="outlined"
      padding="md"
      className={`group group/card flex flex-col justify-between border-neutral-200/90 bg-white hover:border-neutral-400/80 hover:shadow-cinematic transition-all duration-300 ease-out hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none relative ${className}`}
      data-testid={`project-card-${project.slug}`}
      data-project-slug={project.slug}
    >
      <div>
        {/* Header Bar: Category, Maturity, and Rank */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            {project.flagship ? (
              <Badge variant="lavender" size="sm" className="tracking-wide">
                FLAGSHIP #{project.featuredRank}
              </Badge>
            ) : (
              <Badge variant="subtle" size="sm">
                {project.category.replace('-', ' ').toUpperCase()}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <Badge variant={maturityVariant} size="sm" dot dotColor={dotColor}>
              {project.maturity.toUpperCase()}
            </Badge>
            {!project.flagship && project.featuredRank && (
              <span className="font-mono text-[11px] text-neutral-400" aria-label={`Featured rank ${project.featuredRank}`}>
                #{project.featuredRank}
              </span>
            )}
          </div>
        </div>

        {/* Title and Tagline */}
        <div className="mb-2">
          <Heading as="h3" variant="h3" className="text-lg font-semibold text-neutral-900">
            <Link
              to={`/projects/${project.slug}`}
              className="hover:text-neutral-600 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-xs"
            >
              {project.title}
            </Link>
          </Heading>
          <Text variant="caption" tone="muted" className="text-xs font-medium text-neutral-600 mt-0.5">
            {project.tagline}
          </Text>
        </div>

        {/* Visual Asset or Fallback Frame with Pointer-Driven 3D Tilt & Netflix Reveal */}
        <div
          ref={tiltRef}
          style={containerStyle}
          {...tiltHandlers}
          className="mb-4 select-none"
          data-testid={`project-tilt-frame-${project.slug}`}
          data-tilt-active={isTiltActive}
          data-rotate-x={tiltState.rotateX}
          data-rotate-y={tiltState.rotateY}
          data-glare-x={tiltState.glareX}
          data-glare-y={tiltState.glareY}
        >
          <div
            style={transformStyle}
            className="rounded-sm border border-neutral-200/90 overflow-hidden bg-neutral-950 aspect-video relative group/thumb shadow-micro transition-shadow duration-300 hover:shadow-cinematic"
          >
            <Link to={`/projects/${project.slug}`} className="block w-full h-full relative" aria-label={`Open ${project.title} case study`}>
              {/* Layer 1: Archetype-Specific Preview Component */}
              <ProjectPreview project={project} variant="card" />

              {/* Layer 2: Pointer-Driven Radial Glare Spotlight */}
              <div
                style={glareStyle}
                className="absolute inset-0 z-10 pointer-events-none"
                aria-hidden="true"
              />

              {/* Layer 3: Netflix-Inspired Reveal Scrim on Hover & Keyboard Focus */}
              <div
                className="absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-neutral-950/95 via-neutral-950/85 to-transparent backdrop-blur-xs text-white p-3.5 pt-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-hover/card:opacity-100 group-focus-within/card:opacity-100 focus-within:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto group-hover/card:pointer-events-auto group-focus-within/card:pointer-events-auto motion-reduce:transition-none"
                data-testid={`netflix-reveal-${project.slug}`}
              >
                <div className="space-y-1 mb-2">
                  <div className="flex items-center justify-between gap-1 text-[10px] font-mono text-neutral-400">
                    <span className="uppercase tracking-wider text-neutral-300">{archetypeDef.badgeText}</span>
                    <span className={hasGenuineEvidence ? 'text-emerald-400' : 'text-neutral-400'}>
                      {hasGenuineEvidence
                        ? (project.evidence?.type === 'schematic' ? 'Verified Schematic' : 'Verified Preview')
                        : (project.category === 'embedded-robotics' ? 'Hardware Prototype' : 'Architecture Spec')}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-neutral-200 line-clamp-2 leading-relaxed">
                    {primaryFeature}
                  </p>
                </div>

                <div className="pt-1.5 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-neutral-300 flex items-center gap-1">
                    <span>Explore Details</span>
                    <Icon name="arrow-right" size="xs" />
                  </span>
                  <span className="px-2 py-0.5 rounded-xs bg-neutral-800/80 text-[10px] font-mono text-neutral-300 border border-neutral-700/60">
                    {project.role}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Summary Description */}
        <Text variant="bodySm" tone="secondary" className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
          {project.summary}
        </Text>

        {/* Team Collaboration Attribution */}
        {isTeam && (
          <div className="mb-4 px-2.5 py-1.5 bg-neutral-50 border border-neutral-200/60 rounded-xs">
            <Text variant="caption" tone="muted" className="text-[11px] font-mono leading-tight">
              👥 {project.teamAttribution}
            </Text>
          </div>
        )}
      </div>

      <div>
        {/* Technology Pills */}
        <div className="flex flex-wrap gap-1 mb-4 pt-3 border-t border-neutral-100">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[11px] font-mono text-neutral-700 bg-neutral-100 rounded-xs transition-colors duration-150 hover:bg-neutral-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Controls Bar — Permanently accessible on all devices */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-100 text-xs">
          <div className="flex items-center gap-2">
            <Link to={`/projects/${project.slug}`}>
              <Button
                variant="secondary"
                size="sm"
                rightIcon={<Icon name="arrow-right" size="xs" />}
                aria-label={`View ${project.title} case study`}
              >
                Case Study
              </Button>
            </Link>

            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[11px] font-medium text-emerald-800 hover:text-emerald-950 px-2 py-1 rounded-xs bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                aria-label={`Open ${project.title} live demo (opens in new tab)`}
              >
                <span>Live Demo</span>
                <Icon name="arrow-up-right" size="xs" />
              </a>
            )}
          </div>

          <div>
            {hasRepo ? (
              <TextLink
                href={project.links!.repo!}
                external
                showExternalIcon
                variant="subtle"
                className="text-xs font-mono font-medium hover:text-neutral-900"
              >
                Source Code
              </TextLink>
            ) : (
              <span className="text-[11px] font-mono text-neutral-400">
                {project.teamProject ? 'Lab Prototype' : 'Local Implementation'}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

