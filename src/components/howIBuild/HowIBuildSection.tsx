import { Badge } from '@/components/common/Badge'
import { Card } from '@/components/common/Card'
import { Heading } from '@/components/common/Heading'
import { Icon } from '@/components/common/Icon'
import { Section } from '@/components/common/Section'
import { Text } from '@/components/common/Text'
import { howIBuildData, projects } from '@/data'
import { Link } from '@/router'

export interface HowIBuildSectionProps {
  className?: string
}

/**
 * Editorial How I Build Section documenting authentic engineering judgment,
 * trade-off analyses, rejected alternatives, and verified outcomes.
 *
 * Grounded strictly in real codebase implementations:
 * - Convia: Idea provenance and owner authority across workspace imports
 * - Convia: Scoped in-channel message discovery and privacy boundaries
 * - NIDAR / VegaPilot: Bench-tested firmware validation vs proposed autonomous specifications
 */
export function HowIBuildSection({ className = '' }: HowIBuildSectionProps) {
  // If fewer than 2 verified entries exist, omit the entire section per specification
  if (!howIBuildData.entries || howIBuildData.entries.length < 2) {
    return null
  }

  // Pre-compute existing slugs set to guarantee valid project links
  const existingSlugs = new Set(projects.map((p) => p.slug))

  return (
    <Section id="how-i-build" spacing="lg" bordered reveal className={className}>
      {/* Section Header */}
      <div className="w-full max-w-3xl min-w-0 mb-10">
        <div className="inline-flex items-center mb-3">
          <Badge variant="lavender" size="sm" className="font-mono tracking-wider text-[10px]">
            {howIBuildData.badge}
          </Badge>
        </div>
        <Heading as="h2" variant="h1" className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-950 mb-3">
          {howIBuildData.heading}
        </Heading>
        <Text variant="lead" tone="secondary" className="text-neutral-600 leading-relaxed text-sm sm:text-base">
          {howIBuildData.subheading}
        </Text>
      </div>

      {/* Editorial Engineering Decisions List */}
      <div className="space-y-6">
        {howIBuildData.entries.map((entry, index) => {
          const hasValidSlug = entry.projectSlug && existingSlugs.has(entry.projectSlug)

          return (
            <Card
              key={entry.id}
              variant="outlined"
              padding="none"
              className="bg-white border-neutral-200/90 shadow-subtle hover:border-neutral-300 transition-colors overflow-hidden"
            >
              <div className="p-6 sm:p-7 md:p-8 space-y-6">
                {/* Entry Top Strip: Project, Context & Tags */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-mono font-semibold text-neutral-400">
                      0{index + 1}
                    </span>

                    {hasValidSlug ? (
                      <Link
                        to={`/projects/${entry.projectSlug}`}
                        className="inline-flex items-center gap-1 text-base font-bold text-neutral-950 hover:text-neutral-700 transition-colors group"
                      >
                        <span>{entry.projectTitle}</span>
                        <Icon name="arrow-up-right" size="xs" className="opacity-50 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ) : (
                      <span className="text-base font-bold text-neutral-950">
                        {entry.projectTitle}
                      </span>
                    )}

                    <span className="text-xs font-mono text-neutral-500 hidden sm:inline">
                      ·
                    </span>

                    <span className="text-xs font-mono text-neutral-600">
                      {entry.context}
                    </span>
                  </div>

                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
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

                {/* 4-Part Engineering Decision Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
                  {/* 1. Problem Context */}
                  <div className="space-y-2 p-4 rounded-sm bg-neutral-50/70 border border-neutral-200/70">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-neutral-700">
                        The Challenge
                      </span>
                    </div>
                    <Text variant="bodySm" tone="secondary" className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      {entry.problem}
                    </Text>
                  </div>

                  {/* 2. Architectural Decision */}
                  <div className="space-y-2 p-4 rounded-sm bg-neutral-50/70 border border-neutral-200/70">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-neutral-700">
                        Architectural Decision
                      </span>
                    </div>
                    <Text variant="bodySm" tone="secondary" className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      {entry.decision}
                    </Text>
                  </div>

                  {/* 3. Rejected Alternative or Trade-Off */}
                  <div className="space-y-2 p-4 rounded-sm bg-neutral-50/70 border border-neutral-200/70">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-neutral-700">
                        Rejected Alternative / Trade-Off
                      </span>
                    </div>
                    <Text variant="bodySm" tone="secondary" className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      {entry.rejectedAlternative}
                    </Text>
                  </div>

                  {/* 4. Lesson & Verified Outcome */}
                  <div className="space-y-2 p-4 rounded-sm bg-lavender-50/40 border border-lavender-200/70">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-lavender-600" />
                      <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-lavender-900">
                        Lesson & Verified Outcome
                      </span>
                    </div>
                    <Text variant="bodySm" tone="secondary" className="text-xs sm:text-sm text-neutral-800 leading-relaxed">
                      {entry.outcome}
                    </Text>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}
