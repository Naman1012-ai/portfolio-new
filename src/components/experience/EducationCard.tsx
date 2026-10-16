import { Badge } from '@/components/common/Badge'
import { Card } from '@/components/common/Card'
import { Heading } from '@/components/common/Heading'
import { Text } from '@/components/common/Text'
import type { Education } from '@/types'

export interface EducationCardProps {
  education: Education
  className?: string
}

/**
 * Reusable card displaying verified academic background and degree records.
 * Adheres strictly to verified metrics: 9.4 first-year CGPA, unspecified enrollment dates.
 */
export function EducationCard({ education, className = '' }: EducationCardProps) {
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
            EDUCATION
          </Badge>
        </div>
        <span className="text-xs font-mono text-neutral-400">
          The NorthCap University
        </span>
      </div>

      {/* Institution & Degree */}
      <div className="space-y-1">
        <Heading as="h3" variant="h3" className="text-lg font-bold text-neutral-950">
          {education.institution}
        </Heading>
        <Text variant="bodySm" tone="secondary" className="font-medium text-neutral-800 text-sm">
          {education.degree}
        </Text>
        <Text variant="caption" tone="muted" className="text-xs text-neutral-600 block">
          Specialization: {education.fieldOfStudy}
        </Text>
        <Text variant="caption" tone="muted" className="text-xs text-neutral-500 font-mono mt-1 block">
          📍 {education.location}
        </Text>
        {education.period?.start && (
          <Text variant="caption" tone="muted" className="text-xs text-neutral-500 font-mono mt-0.5 block">
            Period: {education.period.start}
            {education.period.end ? ` – ${education.period.end}` : education.period.current ? ' – Present' : ''}
          </Text>
        )}
      </div>

      {/* Verified Academic Standing Box */}
      {education.grade && (
        <div className="p-3.5 bg-neutral-50 border border-neutral-200/80 rounded-sm">
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
              Academic Standing
            </span>
            <span className="text-[11px] font-mono text-neutral-400">
              First Year
            </span>
          </div>
          <div className="text-lg font-bold text-neutral-950 font-mono tracking-tight">
            {education.grade}
          </div>
        </div>
      )}

      {/* Highlights List */}
      {education.highlights && education.highlights.length > 0 && (
        <div className="space-y-2 pt-1 border-t border-neutral-100">
          <Text variant="caption" tone="muted" className="font-mono text-[11px] uppercase tracking-wider block">
            Academic Focus & Milestones
          </Text>
          <ul className="text-xs text-neutral-600 space-y-1.5 list-disc list-inside">
            {education.highlights.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  )
}
