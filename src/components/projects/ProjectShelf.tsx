import { useCallback, useEffect, useRef, useState } from 'react'
import { Badge, Heading, Icon, Text } from '@/components/common'
import type { Project } from '@/types'
import { ProjectCard } from './ProjectCard'

export interface ProjectShelfProps {
  id: string
  title: string
  subtitle?: string
  badgeText?: string
  badgeVariant?: 'subtle' | 'neutral' | 'accent' | 'lavender'
  projects: Project[]
  cardVariant?: 'standard' | 'flagship'
  emptyMessage?: string
  className?: string
}

/**
 * Reusable Netflix-inspired horizontal project shelf component.
 * Provides fluid trackpad/touch browsing, visible prev/next controls with dynamic boundary states,
 * accessible keyboard navigation, responsive card dimensions, and prefers-reduced-motion compliance.
 */
export function ProjectShelf({
  id,
  title,
  subtitle,
  badgeText,
  badgeVariant = 'subtle',
  projects,
  cardVariant = 'standard',
  emptyMessage = 'No projects found in this category.',
  className = '',
}: ProjectShelfProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollBounds = useCallback(() => {
    const el = scrollRef.current
    if (!el) {
      setCanScrollLeft(false)
      setCanScrollRight(false)
      return
    }

    const { scrollLeft, scrollWidth, clientWidth } = el
    // 3px tolerance threshold for subpixel rounding across high-DPI displays
    const atStart = scrollLeft <= 3
    const atEnd = scrollLeft + clientWidth >= scrollWidth - 3

    setCanScrollLeft(!atStart)
    setCanScrollRight(!atEnd)
  }, [])

  useEffect(() => {
    updateScrollBounds()

    const el = scrollRef.current
    if (!el) return

    const handleScroll = () => {
      updateScrollBounds()
    }

    el.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateScrollBounds)

    // ResizeObserver to detect track container or child size shifts
    const ro = new ResizeObserver(() => {
      updateScrollBounds()
    })
    ro.observe(el)

    return () => {
      el.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateScrollBounds)
      ro.disconnect()
    }
  }, [updateScrollBounds, projects])

  const scrollByDirection = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return

    // Paging step: 75% of viewport width
    const scrollStep = Math.max(300, Math.floor(el.clientWidth * 0.75))
    const delta = direction === 'left' ? -scrollStep : scrollStep

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    el.scrollBy({
      left: delta,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Only scroll track when the track container itself has focus, not its children
    if (e.target !== scrollRef.current) return
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scrollByDirection('left')
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      scrollByDirection('right')
    }
  }

  const isFlagship = cardVariant === 'flagship'
  const cardWidthClass = isFlagship
    ? 'w-[320px] sm:w-[480px] lg:w-[calc(50%-12px)] shrink-0'
    : 'w-[300px] sm:w-[350px] md:w-[390px] lg:w-[420px] shrink-0'

  return (
    <section
      id={`shelf-${id}`}
      className={`relative w-full ${className}`}
      data-testid={`project-shelf-${id}`}
      aria-labelledby={`shelf-heading-${id}`}
    >
      {/* Shelf Header: Category/Rank Badge, Title, Description & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2 mb-1">
            {badgeText && (
              <Badge variant={badgeVariant} size="sm" className="font-mono text-[10px] tracking-wider uppercase">
                {badgeText}
              </Badge>
            )}
            <span className="text-xs font-mono text-neutral-400">
              {projects.length} {projects.length === 1 ? 'Project' : 'Projects'}
            </span>
          </div>

          <Heading as="h3" variant="h2" id={`shelf-heading-${id}`} className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            {title}
          </Heading>

          {subtitle && (
            <Text variant="bodySm" tone="secondary" className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {subtitle}
            </Text>
          )}
        </div>

        {/* Shelf Navigation Controls (Previous & Next) */}
        {projects.length > 0 && (
          <div
            className={`flex items-center gap-2 self-end sm:self-auto shrink-0 transition-opacity duration-150 ${
              !canScrollLeft && !canScrollRight ? 'lg:opacity-0 lg:pointer-events-none' : 'opacity-100'
            }`}
            aria-label={`${title} navigation controls`}
            aria-hidden={!canScrollLeft && !canScrollRight}
          >
            <button
              type="button"
              onClick={() => scrollByDirection('left')}
              disabled={!canScrollLeft}
              aria-label={`Scroll ${title} left`}
              data-testid={`shelf-prev-${id}`}
              className="p-2 rounded-sm border border-neutral-200 bg-white text-neutral-700 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed hover:not-disabled:bg-neutral-100 hover:not-disabled:text-neutral-900 hover:not-disabled:border-neutral-300 shadow-micro cursor-pointer"
            >
              <Icon name="chevron-left" size="sm" />
            </button>

            <button
              type="button"
              onClick={() => scrollByDirection('right')}
              disabled={!canScrollRight}
              aria-label={`Scroll ${title} right`}
              data-testid={`shelf-next-${id}`}
              className="p-2 rounded-sm border border-neutral-200 bg-white text-neutral-700 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed hover:not-disabled:bg-neutral-100 hover:not-disabled:text-neutral-900 hover:not-disabled:border-neutral-300 shadow-micro cursor-pointer"
            >
              <Icon name="chevron-right" size="sm" />
            </button>
          </div>
        )}
      </div>

      {/* Horizontal Browsing Track */}
      {projects.length > 0 ? (
        <div
          ref={scrollRef}
          tabIndex={0}
          role="region"
          aria-label={`${title} carousel`}
          onKeyDown={handleKeyDown}
          data-testid={`shelf-track-${id}`}
          data-can-scroll-left={canScrollLeft}
          data-can-scroll-right={canScrollRight}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-5 pt-1 px-1 shelf-scrollbar scroll-smooth motion-reduce:scroll-auto focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400/50 rounded-sm"
        >
          {projects.map((project) => (
            <div key={project.id} className={`${cardWidthClass} flex flex-col`}>
              <ProjectCard project={project} className="h-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-white border border-neutral-200 rounded-sm text-neutral-500 font-mono text-xs">
          {emptyMessage}
        </div>
      )}
    </section>
  )
}
