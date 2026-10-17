import { type MouseEvent } from 'react'
import { Badge, Button, Card, Heading, Icon, Text, TextLink } from '@/components/common'
import { useTilt3D } from '@/hooks'
import { Link } from '@/router'
import type { Project } from '@/types'
import { usePerspective } from '@/context'
import { getArchetypeDefinition, getProjectArchetype, isAssetAvailable } from '@/utils'
import { ProjectPreview } from './previews'
import { useProjectTransition } from './useProjectTransition'

export interface ProjectCardProps {
  project: Project
  className?: string
}

/**
 * Distinctive, tactile software project card communicating technical maturity,
 * architectural category, engineering role, and verified codebase evidence.
 * Features:
 * - Multi-layered 3D perspective with pointer-driven subtle tilt and radial glare spotlight.
 * - Restrained parallax depth between card base, media frame, and metadata overlays.
 * - Progressive disclosure on hover: key architectural highlights, role, and direct entry affordance.
 * - Cinematic "Discover → Focus → Enter" project selection transition.
 * - Strict prefers-reduced-motion and touch-device accessibility compliance.
 */
export function ProjectCard({ project, className = '' }: ProjectCardProps) {
  const { isHighlightedSlug, info } = usePerspective()
  const isPerspectiveTarget = isHighlightedSlug(project.slug)

  const hasRepo = Boolean(project.links?.repo)
  const isTeam = project.teamProject && Boolean(project.teamAttribution)

  const archetype = getProjectArchetype(project)
  const archetypeDef = getArchetypeDefinition(archetype)

  const { enteringSlug, isTransitioning, enterProject } = useProjectTransition()
  const isThisEntering = enteringSlug === project.slug
  const isOtherEntering = isTransitioning && !isThisEntering

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
    maxRotationX: 2.8,
    maxRotationY: 3.5,
    scale: 1.005,
    perspective: 1200,
    glare: true,
    glareOpacity: 0.1,
  })

  const handleCardNavigation = (e: MouseEvent<HTMLAnchorElement>) => {
    // Permit normal browser new-tab commands (Cmd/Ctrl/Shift/middle-click)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return
    }
    e.preventDefault()
    enterProject(project.slug)
  }

  return (
    <Card
      as="article"
      variant="outlined"
      padding="md"
      className={`group group/card flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1.5 motion-reduce:transform-none motion-reduce:transition-none relative ${
        isPerspectiveTarget
          ? 'border-indigo-500/80 ring-2 ring-indigo-500/20 shadow-elevated bg-white'
          : 'border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-cinematic'
      } ${
        isThisEntering
          ? 'ring-2 ring-indigo-500/30 shadow-cinematic-lg scale-[1.02] z-30'
          : isOtherEntering
            ? 'opacity-35 scale-[0.985] blur-[0.5px] pointer-events-none'
            : ''
      } ${className}`}
      data-testid={`project-card-${project.slug}`}
      data-project-slug={project.slug}
    >
      <div>
        {/* Header Bar: Category, Maturity, Rank, and Evidence Indicator */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {project.flagship ? (
              <Badge variant="lavender" size="sm" className="tracking-wide shadow-micro font-medium">
                FLAGSHIP #{project.featuredRank}
              </Badge>
            ) : (
              <Badge variant="subtle" size="sm" className="font-mono text-[10px] tracking-wider uppercase">
                {project.category.replace('-', ' ')}
              </Badge>
            )}

            {isPerspectiveTarget && (
              <Badge variant="accent" size="sm" className="font-mono text-[10px] tracking-wide animate-fade-in">
                ★ {info.shortLabel} Focus
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <Badge variant={maturityVariant} size="sm" dot dotColor={dotColor}>
              {project.maturity.toUpperCase()}
            </Badge>
            {!project.flagship && project.featuredRank && (
              <span className="font-mono text-[11px] text-slate-500" aria-label={`Featured rank ${project.featuredRank}`}>
                #{project.featuredRank}
              </span>
            )}
          </div>
        </div>

        {/* Title and Tagline with Tactile Hover Feedback */}
        <div className="mb-2">
          <Heading as="h3" variant="h3" className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            <Link
              to={`/projects/${project.slug}`}
              onClick={handleCardNavigation}
              className="hover:text-indigo-600 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xs"
            >
              {project.title}
            </Link>
          </Heading>
          <Text variant="caption" tone="muted" className="text-xs font-medium text-slate-500 mt-0.5 leading-normal">
            {project.tagline}
          </Text>
        </div>

        {/* Visual Asset Frame with Pointer-Driven 3D Tilt, Glare & Netflix Reveal */}
        <div
          ref={tiltRef}
          style={containerStyle}
          {...tiltHandlers}
          className="mb-4 select-none perspective-project"
          data-testid={`project-tilt-frame-${project.slug}`}
          data-tilt-active={isTiltActive}
          data-rotate-x={tiltState.rotateX}
          data-rotate-y={tiltState.rotateY}
          data-glare-x={tiltState.glareX}
          data-glare-y={tiltState.glareY}
        >
          <div
            style={transformStyle}
            className={`rounded-xl border border-slate-200/80 overflow-hidden bg-slate-900 aspect-video relative group/thumb shadow-xs transition-all duration-300 hover:shadow-md ${
              isThisEntering ? 'scale-105' : ''
            }`}
          >
            <Link
              to={`/projects/${project.slug}`}
              onClick={handleCardNavigation}
              className="block w-full h-full relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label={`Open ${project.title} case study`}
            >
              {/* Layer 1: Archetype-Specific Preview Component */}
              <div className="w-full h-full transform transition-transform duration-500 group-hover/thumb:scale-[1.02] motion-reduce:transform-none">
                <ProjectPreview project={project} variant="card" />
              </div>

              {/* Layer 2: Pointer-Driven Radial Glare Spotlight */}
              <div
                style={glareStyle}
                className="absolute inset-0 z-10 pointer-events-none"
                aria-hidden="true"
              />

              {/* Layer 3: Progressive Reveal Scrim on Hover & Keyboard Focus */}
              <div
                className="absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-slate-950/95 via-slate-950/85 to-transparent backdrop-blur-xs text-white p-3.5 pt-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-hover/card:opacity-100 group-focus-within/card:opacity-100 focus-within:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto group-hover/card:pointer-events-auto group-focus-within/card:pointer-events-auto motion-reduce:transition-none"
                data-testid={`netflix-reveal-${project.slug}`}
              >
                <div className="space-y-1 mb-2">
                  <div className="flex items-center justify-between gap-1 text-[10px] font-mono text-slate-300">
                    <span className="uppercase tracking-wider text-slate-200 font-semibold">{archetypeDef.badgeText}</span>
                    <span className={hasGenuineEvidence ? 'text-emerald-400 font-medium' : 'text-slate-300'}>
                      {hasGenuineEvidence
                        ? (project.evidence?.type === 'schematic' ? 'Schematic Diagram' : 'Interface Preview')
                        : (project.category === 'embedded-robotics' ? 'Hardware Prototype' : 'Architecture Spec')}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-100 line-clamp-2 leading-relaxed">
                    {primaryFeature}
                  </p>
                </div>

                <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-slate-100 flex items-center gap-1 font-semibold group-hover/card:translate-x-0.5 transition-transform duration-150 motion-reduce:transform-none">
                    <span>Enter Case Study</span>
                    <Icon name="arrow-right" size="xs" />
                  </span>
                  <span className="px-2 py-0.5 rounded-xs bg-slate-900 text-[10px] font-mono text-slate-200 border border-slate-700/80">
                    {project.role}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Summary Description */}
        <Text variant="bodySm" tone="secondary" className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
          {project.summary}
        </Text>

        {/* Team Collaboration Attribution */}
        {isTeam && (
          <div className="mb-4 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xs">
            <Text variant="caption" tone="muted" className="text-[11px] font-mono leading-tight text-slate-600">
              👥 {project.teamAttribution}
            </Text>
          </div>
        )}
      </div>

      <div>
        {/* Technology Pills with Crisp Mono Badges */}
        <div className="flex flex-wrap gap-1 mb-4 pt-3 border-t border-slate-100">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 text-[11px] font-mono text-slate-700 bg-slate-100 rounded-full transition-colors duration-150 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/80 shadow-2xs"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Controls Bar — Permanently accessible on all devices */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <Link to={`/projects/${project.slug}`} onClick={handleCardNavigation}>
              <Button
                variant={project.flagship ? 'primary' : 'secondary'}
                size="sm"
                rightIcon={<Icon name="arrow-right" size="xs" className="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transform-none" />}
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
                className="inline-flex items-center gap-1 font-mono text-[11px] font-medium text-emerald-800 hover:text-emerald-950 px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-2xs"
                aria-label={`Open ${project.title} live demo (opens in new tab)`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]" aria-hidden="true" />
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
                className="text-xs font-mono font-medium text-slate-500 hover:text-indigo-600"
              >
                Source Code
              </TextLink>
            ) : (
              <span className="text-[11px] font-mono text-slate-500">
                {project.teamProject ? 'Lab Prototype' : 'Local Implementation'}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
