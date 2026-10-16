import { type MouseEvent } from 'react'
import { Badge, Button, Card, Heading, Icon, Text, TextLink } from '@/components/common'
import { useTilt3D } from '@/hooks'
import { Link } from '@/router'
import type { Project } from '@/types'
import { isAssetAvailable, resolveSafeAssetUrl } from '@/utils'
import { useProjectTransition } from './useProjectTransition'

export interface ConviaFlagshipCardProps {
  project: Project
  className?: string
}

/**
 * High-prominence flagship showcase card for Convia.
 * Demonstrates architectural scope, live ideation mechanics, and direct case study access
 * with real pointer-position-driven 3D spatial perspective, dynamic ambient lighting,
 * and cinematic "Discover → Focus → Enter" interaction.
 */
export function ConviaFlagshipCard({ project, className = '' }: ConviaFlagshipCardProps) {
  const logoUrl = resolveSafeAssetUrl(project.evidence?.assetFilename)
  const logoWebpUrl = resolveSafeAssetUrl('convia-logo.webp')
  const hasPreview = isAssetAvailable('convia-preview.png')
  const previewUrl = hasPreview ? resolveSafeAssetUrl('convia-preview.png') : null
  const previewWebpUrl = hasPreview ? resolveSafeAssetUrl('convia-preview.webp') : null

  const { enteringSlug, isTransitioning, enterProject } = useProjectTransition()
  const isThisEntering = enteringSlug === project.slug
  const isOtherEntering = isTransitioning && !isThisEntering

  const {
    ref: tiltRef,
    state: tiltState,
    isTiltActive,
    containerStyle,
    transformStyle,
    glareStyle,
    handlers: tiltHandlers,
  } = useTilt3D<HTMLDivElement>({
    maxRotationX: 3.2,
    maxRotationY: 4.2,
    scale: 1.006,
    perspective: 1200,
    glare: true,
    glareOpacity: 0.12,
  })

  const handleCardNavigation = (e: MouseEvent<HTMLAnchorElement>) => {
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
      padding="none"
      className={`group/convia overflow-hidden border-neutral-300/90 bg-linear-to-b from-white via-neutral-50/40 to-neutral-100/50 shadow-subtle hover:shadow-cinematic hover:border-neutral-400/80 transition-all duration-300 ease-out hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none ${
        isThisEntering
          ? 'ring-2 ring-neutral-900/20 shadow-cinematic-lg scale-[1.02] z-30'
          : isOtherEntering
            ? 'opacity-35 scale-[0.985] blur-[0.5px] pointer-events-none'
            : ''
      } ${className}`}
    >
      <div className="p-5 sm:p-8 md:p-10">
        {/* Top Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent" size="sm" className="shadow-micro tracking-wide">
              FLAGSHIP #{project.featuredRank || 1}
            </Badge>
            <Badge variant="subtle" size="sm" className="font-mono text-[10px] tracking-wider uppercase">
              {project.category.replace('-', ' ')}
            </Badge>
            <Badge variant="neutral" size="sm" dot dotColor="bg-amber-500">
              {project.maturity.replace('-', ' ').toUpperCase()}
            </Badge>
          </div>

          <span className="text-xs font-mono text-neutral-500">
            Role: {project.role}
          </span>
        </div>

        {/* Project Brand Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
          {logoUrl && (
            <picture className="shrink-0">
              {logoWebpUrl && <source type="image/webp" srcSet={logoWebpUrl} />}
              <img
                src={logoUrl}
                alt="Convia Platform Logo"
                width={48}
                height={48}
                className="w-12 h-12 rounded-sm border border-neutral-200/90 bg-white object-contain p-1 shadow-micro shrink-0 transition-transform duration-200 group-hover/convia:scale-105 motion-reduce:transform-none"
                loading="lazy"
                decoding="async"
              />
            </picture>
          )}
          <div>
            <Heading as="h3" variant="h2" className="text-xl sm:text-2xl font-bold">
              <Link
                to={`/projects/${project.slug}`}
                onClick={handleCardNavigation}
                className="hover:text-neutral-700 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-xs"
              >
                {project.title}
              </Link>
            </Heading>
            <Text variant="bodySm" tone="secondary" className="font-medium text-neutral-700">
              {project.tagline}
            </Text>
          </div>
        </div>

        {/* Summary Description */}
        <Text variant="body" tone="secondary" className="text-neutral-700 max-w-3xl mb-4 leading-relaxed">
          {project.summary}
        </Text>

        {project.description && (
          <Text variant="bodySm" tone="muted" className="max-w-3xl mb-6 leading-relaxed">
            {project.description}
          </Text>
        )}

        {/* Genuine Workspace Interface Preview — Real Pointer-Driven 3D Perspective Showcase Frame */}
        {hasPreview && previewUrl && (
          <div
            ref={tiltRef}
            style={containerStyle}
            {...tiltHandlers}
            className="mb-8 cursor-pointer select-none perspective-project"
            data-testid="convia-3d-showcase"
            data-tilt-active={isTiltActive}
            data-rotate-x={tiltState.rotateX}
            data-rotate-y={tiltState.rotateY}
            data-glare-x={tiltState.glareX}
            data-glare-y={tiltState.glareY}
          >
            <div
              style={transformStyle}
              className={`rounded-md border border-neutral-800/80 overflow-hidden bg-neutral-950 shadow-elevated group/preview relative transition-all duration-300 hover:shadow-cinematic-lg hover:border-neutral-700 ${
                isThisEntering ? 'scale-105' : ''
              }`}
            >
              <Link
                to={`/projects/${project.slug}`}
                onClick={handleCardNavigation}
                className="block relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                aria-label="Open Convia flagship case study preview"
              >
                {/* Layer 1: Genuine Workspace Screenshot */}
                <picture className="w-full block">
                  {previewWebpUrl && <source type="image/webp" srcSet={previewWebpUrl} />}
                  <img
                    src={previewUrl}
                    alt="Convia workspace interface walkthrough"
                    width={1618}
                    height={972}
                    className="w-full h-auto max-h-[400px] object-cover object-top transition-transform duration-500 ease-out group-hover/preview:scale-[1.01] motion-reduce:transform-none"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>

                {/* Layer 2: Dynamic Pointer-Responsive Radial Glare Spotlight */}
                <div
                  style={glareStyle}
                  className="absolute inset-0 z-10 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Layer 3: Subtle Cinematic Vignette */}
                <div
                  className="absolute inset-0 z-10 bg-linear-to-t from-neutral-950/70 via-neutral-950/20 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Layer 4: Platform Status Badge */}
                <div
                  className="absolute bottom-4 right-4 z-20 px-3 py-1.5 rounded-sm bg-neutral-950/85 backdrop-blur-md text-white text-xs font-mono flex items-center gap-2 shadow-subtle border border-neutral-700/60"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-medium tracking-wide">Live Platform Workspace</span>
                </div>

                {/* Layer 5: Interactive Inspection Prompt */}
                <div
                  className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-300"
                >
                  <span className="px-2 py-0.5 rounded-xs bg-neutral-900/80 backdrop-blur-xs border border-neutral-700/40 text-[11px]">
                    Interactive Architecture
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    Click to inspect system engineering
                  </span>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mb-8">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-mono text-neutral-800 bg-neutral-100 border border-neutral-200/80 rounded-xs transition-colors duration-150 hover:bg-neutral-200/70"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Controls Bar */}
        <div className="pt-4 border-t border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <Link to={`/projects/${project.slug}`} onClick={handleCardNavigation}>
              <Button
                variant="primary"
                size="md"
                rightIcon={<Icon name="arrow-right" size="sm" />}
                aria-label="View Convia case study"
              >
                Case Study
              </Button>
            </Link>

            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="secondary"
                  size="md"
                  rightIcon={<Icon name="arrow-up-right" size="xs" />}
                  aria-label="Open Convia live demo (opens in new tab)"
                >
                  Live Demo
                </Button>
              </a>
            )}

            {project.links?.repo && (
              <TextLink
                href={project.links.repo}
                external
                showExternalIcon
                variant="accent"
                className="text-sm font-semibold"
              >
                Source Code
              </TextLink>
            )}
          </div>

          <span className="text-xs font-mono text-neutral-400">
            Active Workspace Project
          </span>
        </div>
      </div>
    </Card>
  )
}
