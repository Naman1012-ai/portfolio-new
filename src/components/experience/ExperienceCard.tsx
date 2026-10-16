import { Badge } from '@/components/common/Badge'
import { Card } from '@/components/common/Card'
import { Heading } from '@/components/common/Heading'
import { Icon } from '@/components/common/Icon'
import { Text } from '@/components/common/Text'
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
      className={`space-y-5 bg-white/95 border-slate-200/90 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ease-out rounded-2xl motion-reduce:transform-none motion-reduce:transition-none ${className}`}
    >
      {/* Header Badges */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Badge variant="subtle" size="sm">
            EXPERIENCE
          </Badge>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Internship
        </span>
      </div>

      {/* Organization & Role */}
      <div className="space-y-1.5">
        <Heading as="h3" variant="h3" className="text-lg font-bold text-slate-950">
          {experience.organization}
        </Heading>
        <Text variant="bodySm" tone="secondary" className="font-semibold text-slate-800 text-sm">
          {experience.role}
        </Text>
      </div>

      {/* Actual Work Context */}
      <Text variant="bodySm" tone="secondary" className="text-xs sm:text-sm text-slate-700 leading-relaxed">
        Hands-on web development internship, structuring and building responsive web interfaces, styling page layouts, and implementing client-side interactions with core HTML, CSS, and JavaScript.
      </Text>

      {/* Internship Project Deliverable */}
      {experience.projectRepoUrl && (
        <div className="p-3.5 bg-slate-50/90 border border-slate-200/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs hover:border-slate-300 transition-colors group">
          <div className="min-w-0">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-0.5">
              Internship Project Deliverable
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-900 block">
              InAmigos Foundation Website Prototype
            </span>
            <span className="text-[11px] text-slate-500 font-mono block">
              Responsive NGO portal built with HTML, CSS & JavaScript
            </span>
          </div>
          <a
            href={experience.projectRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-slate-900 bg-white border border-slate-200 rounded-full shadow-2xs hover:bg-slate-50 transition-colors shrink-0 self-start sm:self-auto"
            aria-label="View InAmigos Foundation website prototype repository on GitHub (opens in new tab)"
          >
            <span>Repository</span>
            <Icon name="arrow-up-right" size="xs" />
          </a>
        </div>
      )}

      <div className="w-full border-t border-slate-100" aria-hidden="true" />

      {/* Core Tools */}
      {experience.technologies && experience.technologies.length > 0 && (
        <div className="space-y-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
            Core Tools
          </span>
          <div className="flex flex-wrap gap-1.5">
            {experience.technologies
              .filter((t) => t !== 'Web Development')
              .concat(experience.technologies.filter((t) => t === 'Web Development'))
              .map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 text-xs font-mono text-slate-700 bg-slate-100 rounded-full border border-slate-200/80 shadow-2xs"
                >
                  {tech}
                </span>
              ))}
          </div>
        </div>
      )}
    </Card>
  )
}
