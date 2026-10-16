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
      className={`space-y-5 bg-white/95 border-slate-200/90 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ease-out rounded-2xl motion-reduce:transform-none motion-reduce:transition-none ${className}`}
    >
      {/* Header Badges */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Badge variant="subtle" size="sm">
            EDUCATION
          </Badge>
        </div>
        <span className="text-xs font-mono text-slate-400">
          The NorthCap University
        </span>
      </div>

      {/* Institution & Degree */}
      <div className="space-y-1.5">
        <Heading as="h3" variant="h3" className="text-lg font-bold text-slate-950">
          {education.institution}
        </Heading>
        <Text variant="bodySm" tone="secondary" className="font-semibold text-slate-800 text-sm">
          {education.degree}
        </Text>
        <Text variant="bodySm" tone="secondary" className="text-xs sm:text-sm text-slate-600 block">
          {education.fieldOfStudy}
        </Text>
        <div className="pt-1">
          <span className="text-xs text-slate-500 font-mono">
            {education.location}
          </span>
        </div>
      </div>

      <div className="w-full border-t border-slate-100" aria-hidden="true" />

      {/* Verified Academic Standing Box */}
      {education.grade && (
        <div className="p-4 bg-slate-50/90 border border-slate-200/80 rounded-xl shadow-xs transition-all duration-200 hover:border-slate-300">
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Academic Standing
            </span>
            <span className="text-[11px] font-mono text-slate-400 font-medium">
              First Year
            </span>
          </div>
          <div className="text-xl font-bold text-slate-950 font-mono tracking-tight">
            9.4 CGPA
          </div>
        </div>
      )}
    </Card>
  )
}
