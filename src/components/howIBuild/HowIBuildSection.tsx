import { useState, type MouseEvent } from 'react'
import { Badge } from '@/components/common/Badge'
import { Card } from '@/components/common/Card'
import { Heading } from '@/components/common/Heading'
import { Icon } from '@/components/common/Icon'
import { Section } from '@/components/common/Section'
import { Text } from '@/components/common/Text'
import { useProjectTransition } from '@/components/projects'
import { usePerspective } from '@/context'
import { howIBuildData, projects } from '@/data'
import { Link } from '@/router'

export interface HowIBuildSectionProps {
  className?: string
}

/**
 * Editorial Engineering Judgement & Decision Records Section.
 * Demonstrates:
 * - How Naman approaches technical problems
 * - How he evaluates alternatives and constraints
 * - How he makes architectural decisions
 * - What trade-offs he understands (gains vs sacrifices)
 * - What he learned and carries forward into future systems
 *
 * Visual architecture:
 * - Vertical decision timeline + decision log + expandable technical case studies.
 * - Signature "Scan → Focus → Inspect" interaction.
 * - Reciprocal linking: Decision → Project Universe Case Study.
 * - Full prefers-reduced-motion, keyboard, and mobile touch accessibility.
 */
export function HowIBuildSection({ className = '' }: HowIBuildSectionProps) {
  // By default, the flagship decision (#1) is expanded to immediately establish the record format
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set([howIBuildData.entries?.[0]?.id || ''])
  )

  const { enterProject } = useProjectTransition()
  const { isHighlightedDecision, info } = usePerspective()

  // If fewer than 2 verified entries exist, omit the entire section per specification
  if (!howIBuildData.entries || howIBuildData.entries.length < 2) {
    return null
  }

  // Pre-compute existing slugs set to guarantee valid project links
  const existingSlugs = new Set(projects.map((p) => p.slug))

  const toggleRecord = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const expandAll = () => {
    setExpandedIds(new Set(howIBuildData.entries.map((e) => e.id)))
  }

  const collapseAll = () => {
    setExpandedIds(new Set())
  }

  const handleProjectLink = (e: MouseEvent<HTMLAnchorElement>, slug: string) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return
    }
    e.preventDefault()
    enterProject(slug)
  }

  const hasAnyExpanded = expandedIds.size > 0
  const isAllExpanded = expandedIds.size === howIBuildData.entries.length

  return (
    <Section id="how-i-build" spacing="lg" bordered reveal className={className}>
      {/* Section Header: Central Positioning */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="w-full max-w-3xl min-w-0">
          <div className="inline-flex items-center mb-3">
            <Badge variant="lavender" size="sm" className="font-mono tracking-wider text-[10px]">
              {howIBuildData.badge}
            </Badge>
          </div>
          <Heading as="h2" variant="h1" className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-950 mb-3 tracking-tight">
            {howIBuildData.heading}
          </Heading>
          <Text variant="lead" tone="secondary" className="text-neutral-600 leading-relaxed text-sm sm:text-base max-w-2xl">
            {howIBuildData.subheading}
          </Text>
        </div>

        {/* Global Expand / Collapse Control */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={isAllExpanded ? collapseAll : expandAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-mono font-medium text-neutral-600 hover:text-neutral-950 border border-neutral-200 bg-white hover:bg-neutral-50 shadow-micro transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
            aria-label={isAllExpanded ? 'Collapse all decision records' : 'Expand all decision records'}
          >
            <Icon
              name="chevron-right"
              size="xs"
              className={`transition-transform duration-200 ${isAllExpanded ? '-rotate-90' : 'rotate-90'}`}
            />
            <span>{isAllExpanded ? 'Collapse All' : 'Expand All (5)'}</span>
          </button>
        </div>
      </div>

      {/* Decision Record Vertical Timeline System */}
      <div className="relative">
        {/* Continuous Left Spine Connector */}
        <div
          className="absolute left-[19px] sm:left-[23px] top-6 bottom-8 w-0.5 bg-neutral-200/80 -z-0"
          aria-hidden="true"
        />

        <div className="space-y-8 sm:space-y-10">
          {howIBuildData.entries.map((entry, index) => {
            const isExpanded = expandedIds.has(entry.id)
            const hasValidSlug = entry.projectSlug && existingSlugs.has(entry.projectSlug)
            const isDimmed = hasAnyExpanded && !isExpanded
            const isTargetedByPerspective = isHighlightedDecision(entry.id)

            return (
              <div
                key={entry.id}
                className={`relative flex items-start gap-4 sm:gap-6 transition-opacity duration-300 ${
                  isDimmed ? 'opacity-75 hover:opacity-100' : 'opacity-100'
                }`}
                data-testid={`decision-record-${entry.id}`}
              >
                {/* Timeline Node Indicator Button */}
                <button
                  type="button"
                  onClick={() => toggleRecord(entry.id)}
                  className={`shrink-0 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full font-mono text-xs font-semibold flex items-center justify-center transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 ${
                    isTargetedByPerspective
                      ? 'bg-neutral-950 text-white shadow-elevated ring-4 ring-neutral-200'
                      : isExpanded
                        ? 'bg-neutral-950 text-white shadow-elevated ring-4 ring-neutral-100'
                        : 'bg-white text-neutral-500 border border-neutral-300 hover:border-neutral-400 hover:text-neutral-900 shadow-micro'
                  }`}
                  aria-label={`Toggle decision record 0${index + 1}: ${entry.decisionTitle || entry.projectTitle}`}
                >
                  <span>0{index + 1}</span>
                </button>

                {/* Main Decision Record Card */}
                <Card
                  variant="outlined"
                  padding="none"
                  className={`flex-1 bg-white transition-all duration-300 overflow-hidden ${
                    isTargetedByPerspective
                      ? 'border-neutral-900 ring-2 ring-neutral-950/20 shadow-elevated'
                      : isExpanded
                        ? 'border-neutral-400/90 shadow-cinematic ring-1 ring-neutral-900/5'
                        : 'border-neutral-200/90 shadow-subtle hover:border-neutral-300'
                  }`}
                >
                  {/* Collapsed/Header Action Trigger */}
                  <div className="p-5 sm:p-7 border-b border-neutral-100">
                    {/* Top Metadata Strip: Project Pill, Context, and Architectural Tags */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {hasValidSlug ? (
                          <Link
                            to={`/projects/${entry.projectSlug}`}
                            onClick={(e) => handleProjectLink(e, entry.projectSlug!)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-neutral-900 text-white text-xs font-mono font-medium hover:bg-neutral-800 transition-colors shadow-micro"
                            aria-label={`Open ${entry.projectTitle} case study`}
                          >
                            <span>{entry.projectTitle}</span>
                            <Icon name="arrow-up-right" size="xs" className="opacity-70" />
                          </Link>
                        ) : (
                          <span className="px-2.5 py-1 rounded-xs bg-neutral-900 text-white text-xs font-mono font-medium">
                            {entry.projectTitle}
                          </span>
                        )}

                        <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
                          /
                        </span>

                        <span className="text-xs font-mono text-neutral-600">
                          {entry.context}
                        </span>

                        {isTargetedByPerspective && (
                          <Badge variant="accent" size="sm" className="font-mono text-[10px] tracking-wide animate-fade-in">
                            ★ {info.shortLabel} Focus
                          </Badge>
                        )}
                      </div>

                      {entry.tags && entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {entry.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-neutral-600 bg-neutral-100 rounded-xs border border-neutral-200/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Decision Title & Expand Button */}
                    <div className="flex items-start justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => toggleRecord(entry.id)}
                        className="text-left w-full cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-xs"
                        aria-expanded={isExpanded}
                        aria-controls={`decision-content-${entry.id}`}
                      >
                        <Heading
                          as="h3"
                          variant="h3"
                          className="text-base sm:text-lg font-bold text-neutral-950 group-hover:text-neutral-700 transition-colors mb-2 leading-snug"
                        >
                          {entry.decisionTitle || entry.projectTitle}
                        </Heading>

                        <Text variant="bodySm" tone="secondary" className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-2">
                          {entry.problem}
                        </Text>
                      </button>

                      {/* Expand/Collapse Chevron Indicator */}
                      <button
                        type="button"
                        onClick={() => toggleRecord(entry.id)}
                        className="shrink-0 p-2 rounded-sm text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                        aria-label={isExpanded ? 'Collapse decision record' : 'Expand decision record'}
                      >
                        <Icon
                          name="chevron-right"
                          size="sm"
                          className={`transition-transform duration-300 motion-reduce:transform-none ${
                            isExpanded ? '-rotate-90 text-neutral-950' : 'rotate-90 text-neutral-600'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Bottom Status / Toggle Affordance */}
                    <div className="pt-3 mt-3 border-t border-neutral-100/80 flex items-center justify-between text-xs font-mono text-neutral-500">
                      <button
                        type="button"
                        onClick={() => toggleRecord(entry.id)}
                        className="inline-flex items-center gap-1.5 font-medium hover:text-neutral-900 transition-colors cursor-pointer"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                        <span>{isExpanded ? 'Hide Decision Breakdown' : 'Inspect Architectural Record'}</span>
                        <Icon name="arrow-right" size="xs" className={isExpanded ? 'rotate-90 transition-transform' : ''} />
                      </button>

                      <span className="text-[11px] text-neutral-400">
                        Record 0{index + 1} of 0{howIBuildData.entries.length}
                      </span>
                    </div>
                  </div>

                  {/* Expandable Engineering Breakdown Container */}
                  <div
                    id={`decision-content-${entry.id}`}
                    className={`decision-expand-grid ${isExpanded ? 'is-expanded' : ''}`}
                    aria-hidden={!isExpanded}
                  >
                    <div className="decision-expand-content">
                      <div className="p-5 sm:p-7 md:p-8 bg-neutral-50/40 space-y-6 border-t border-neutral-100">
                        {/* 1. Problem & Real-World Constraints */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" aria-hidden="true" />
                            <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider text-[11px] font-semibold">
                              01 / The Challenge & Constraints
                            </Text>
                          </div>

                          <div className="p-4 rounded-sm bg-white border border-neutral-200/80 space-y-2.5 shadow-micro">
                            <div>
                              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                                Technical Tension
                              </span>
                              <Text variant="bodySm" tone="secondary" className="text-xs sm:text-sm text-neutral-800 leading-relaxed">
                                {entry.problem}
                              </Text>
                            </div>

                            {entry.constraints && (
                              <div className="pt-2 border-t border-neutral-100">
                                <span className="text-[11px] font-mono text-amber-700 font-semibold uppercase tracking-wider block mb-1">
                                  Operating Constraint
                                </span>
                                <Text variant="bodySm" tone="secondary" className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                                  {entry.constraints}
                                </Text>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* 2. Options Considered & Rejected Alternatives */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" aria-hidden="true" />
                            <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider text-[11px] font-semibold">
                              02 / Alternatives Evaluated & Rejected
                            </Text>
                          </div>

                          <div className="p-4 rounded-sm bg-white border border-neutral-200/80 space-y-3 shadow-micro">
                            {entry.optionsConsidered && entry.optionsConsidered.length > 0 && (
                              <div>
                                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                                  Candidate Solutions
                                </span>
                                <ul className="space-y-2">
                                  {entry.optionsConsidered.map((opt, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                                      <span className="font-mono text-[10px] text-neutral-400 font-semibold bg-neutral-100 px-1 py-0.5 rounded-xs mt-0.5 shrink-0">
                                        OPT {i + 1}
                                      </span>
                                      <span>{opt}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div className="pt-2.5 border-t border-neutral-100">
                              <span className="text-[11px] font-mono text-rose-700 font-semibold uppercase tracking-wider block mb-1">
                                Why Alternatives Were Rejected
                              </span>
                              <Text variant="bodySm" tone="secondary" className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                                {entry.rejectedAlternative}
                              </Text>
                            </div>
                          </div>
                        </div>

                        {/* 3. Chosen Architectural Decision */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
                            <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider text-[11px] font-semibold">
                              03 / Architectural Decision Implemented
                            </Text>
                          </div>

                          <div className="p-4 rounded-sm bg-emerald-50/40 border border-emerald-200/80 shadow-micro">
                            <Text variant="bodySm" tone="secondary" className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                              {entry.decision}
                            </Text>
                          </div>
                        </div>

                        {/* 4. Trade-Off Analysis: What was Gained vs Sacrificed */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-brand-lavender shrink-0" aria-hidden="true" />
                            <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider text-[11px] font-semibold">
                              04 / Trade-Off Analysis
                            </Text>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="p-3.5 rounded-sm bg-white border border-neutral-200/80 shadow-micro">
                              <div className="flex items-center gap-1.5 mb-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span className="text-[11px] font-mono font-semibold text-emerald-800 uppercase tracking-wider">
                                  What Was Gained
                                </span>
                              </div>
                              <Text variant="bodySm" tone="secondary" className="text-xs text-neutral-700 leading-relaxed">
                                {entry.tradeoff?.gained || entry.outcome}
                              </Text>
                            </div>

                            <div className="p-3.5 rounded-sm bg-white border border-neutral-200/80 shadow-micro">
                              <div className="flex items-center gap-1.5 mb-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                <span className="text-[11px] font-mono font-semibold text-amber-800 uppercase tracking-wider">
                                  What Was Sacrificed
                                </span>
                              </div>
                              <Text variant="bodySm" tone="secondary" className="text-xs text-neutral-700 leading-relaxed">
                                {entry.tradeoff?.sacrificed || entry.rejectedAlternative}
                              </Text>
                            </div>
                          </div>
                        </div>

                        {/* 5. Verified Outcome & Engineering Takeaway */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-neutral-900 shrink-0" aria-hidden="true" />
                            <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider text-[11px] font-semibold">
                              05 / Outcome & Carry-Forward Lesson
                            </Text>
                          </div>

                          <div className="p-4 rounded-sm bg-white border border-neutral-200/80 space-y-2.5 shadow-micro">
                            <div>
                              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                                Outcome & Result
                              </span>
                              <Text variant="bodySm" tone="secondary" className="text-xs sm:text-sm text-neutral-800 leading-relaxed">
                                {entry.outcome}
                              </Text>
                            </div>

                            {entry.lesson && (
                              <div className="pt-2 border-t border-neutral-100">
                                <span className="text-[11px] font-mono text-brand-lavender font-semibold uppercase tracking-wider block mb-1">
                                  Engineering Principle Learned
                                </span>
                                <Text variant="bodySm" tone="secondary" className="text-xs sm:text-sm text-neutral-800 leading-relaxed">
                                  {entry.lesson}
                                </Text>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* 6. Reciprocal Evidence Link: Decision → Project Universe */}
                        {hasValidSlug && (
                          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-neutral-200/70">
                            <div className="text-xs font-mono text-neutral-500">
                              <span>Origin Project: </span>
                              <span className="font-semibold text-neutral-900">{entry.projectTitle}</span>
                            </div>

                            <Link
                              to={`/projects/${entry.projectSlug}`}
                              onClick={(e) => handleProjectLink(e, entry.projectSlug!)}
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-mono font-medium transition-colors shadow-micro self-start sm:self-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                            >
                              <span>Inspect {entry.projectTitle} Case Study</span>
                              <Icon name="arrow-right" size="xs" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
