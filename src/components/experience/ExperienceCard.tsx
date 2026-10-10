import { Badge } from '@/components/common/Badge'
import { Card } from '@/components/common/Card'
import { Heading } from '@/components/common/Heading'
import { Text } from '@/components/common/Text'
import { TextLink } from '@/components/common/TextLink'
import type { Experience } from '@/types'

export interface ExperienceCardProps {
  experience: Experience
  className?: string
}

/**
 * Reusable card displaying completed professional experience and internships.
 * Strictly preserves authentic records: InAmigos Foundation Web Development Internship,
 * with no invented calendar dates, deliverables, or unverified metrics.
 */
export function ExperienceCard({ experience, className = '' }: ExperienceCardProps) {
  return (
    <Card
      variant="outlined"
      padding="md"
      className={`space-y-5 bg-white border-neutral-200/90 shadow-subtle hover:border-neutral-300 hover:shadow-cinematic hover:-translate-y-0.5 transition-all duration-300 ease-out motion-reduce:transform-none motion-reduce:transition-none ${className}`}
    >
      {/* Header Badges */}
      <div className="flex items-center justify-between gap-2 border-b border-neutral-100 pb-3">
        <div className="flex items-center gap-2">
          <Badge variant="subtle" size="sm">
            COMPLETED EXPERIENCE
          </Badge>
          <span className="text-[11px] font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200/60">
            VERIFIED
          </span>
        </div>
        <span className="text-xs font-mono text-neutral-400">
          Internship Record
        </span>
      </div>

      {/* Organization & Role */}
      <div className="space-y-1">
        <Heading as="h3" variant="h3" className="text-lg font-bold text-neutral-950">
          {experience.organization}
        </Heading>
        <Text variant="bodySm" tone="secondary" className="font-medium text-neutral-800 text-sm">
          {experience.role}
        </Text>
        <Text variant="caption" tone="muted" className="text-xs text-neutral-500 font-mono block">
          Role Type: {experience.type.toUpperCase()}
        </Text>
        {experience.period?.start && (
          <Text variant="caption" tone="muted" className="text-xs text-neutral-500 font-mono block">
            Period: {experience.period.start}
            {experience.period.end ? ` – ${experience.period.end}` : experience.period.current ? ' – Present' : ''}
          </Text>
        )}
      </div>

      {/* Summary Narrative */}
      {experience.summary && (
        <Text variant="bodySm" tone="secondary" className="text-xs text-neutral-600 leading-relaxed">
          {experience.summary}
        </Text>
      )}

      {/* Optional Contributions List */}
      {experience.contributions && experience.contributions.length > 0 && (
        <div className="space-y-1.5 pt-1 border-t border-neutral-100">
          <Text variant="caption" tone="muted" className="font-mono text-[11px] uppercase tracking-wider block">
            Key Contributions
          </Text>
          <ul className="text-xs text-neutral-600 space-y-1 list-disc list-inside">
            {experience.contributions.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Technology Stack Pills */}
      {experience.technologies && experience.technologies.length > 0 && (
        <div className="space-y-2 pt-1 border-t border-neutral-100">
          <Text variant="caption" tone="muted" className="font-mono text-[11px] uppercase tracking-wider block">
            Core Technologies & Competencies
          </Text>
          <div className="flex flex-wrap gap-1.5">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[11px] font-mono text-neutral-700 bg-neutral-100 rounded-xs border border-neutral-200/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* External Organization Verification Link */}
      {experience.verification?.url && (
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
          <span className="text-xs font-mono text-neutral-400">
            Organization Verification
          </span>
          <TextLink
            href={experience.verification.url}
            external
            showExternalIcon
            variant="accent"
            className="text-xs font-mono font-medium"
          >
            inamigosfoundation.org.in
          </TextLink>
        </div>
      )}
    </Card>
  )
}
