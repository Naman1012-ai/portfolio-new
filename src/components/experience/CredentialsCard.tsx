import { Badge } from '@/components/common/Badge'
import { Card } from '@/components/common/Card'
import { Heading } from '@/components/common/Heading'
import { Text } from '@/components/common/Text'

export interface CredentialsCardProps {
  className?: string
}

/**
 * Compact, evidence-oriented summary card identifying primary verification sources
 * backing academic standing, internship experience, and codebase implementations.
 */
export function CredentialsCard({ className = '' }: CredentialsCardProps) {
  return (
    <Card
      variant="outlined"
      padding="md"
      className={`border-neutral-200/90 bg-white shadow-micro space-y-4 ${className}`}
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
        <div className="flex items-center gap-2">
          <Badge variant="subtle" size="sm">
            DOCUMENTATION
          </Badge>
        </div>
        <span className="text-xs font-mono text-neutral-400">
          The NorthCap University · InAmigos Foundation · Source Repositories
        </span>
      </div>

      {/* Narrative Header */}
      <div className="space-y-1">
        <Heading as="h4" variant="h4" className="text-base font-bold text-neutral-900">
          Institutional & Project Records
        </Heading>
        <Text variant="bodySm" tone="secondary" className="text-xs text-neutral-600 leading-relaxed max-w-3xl">
          Academic performance, internship experience, and engineering projects are grounded in institutional coursework, industry internships, and inspectable codebases.
        </Text>
      </div>

      {/* Verification Standards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
        {/* 1. Academic Record */}
        <div className="p-3.5 bg-neutral-50/70 border border-neutral-200/80 rounded-sm space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
              01 / Academic
            </span>
            <Badge variant="subtle" size="sm">TRANSCRIPT</Badge>
          </div>
          <div>
            <span className="text-xs font-bold text-neutral-950 block">
              The NorthCap University
            </span>
            <span className="text-[11px] text-neutral-600 block mt-0.5 leading-normal">
              Official university semester grade documentation and enrollment records confirming 9.4 first-year CGPA.
            </span>
          </div>
        </div>

        {/* 2. Industry Experience */}
        <div className="p-3.5 bg-neutral-50/70 border border-neutral-200/80 rounded-sm space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
              02 / Internship
            </span>
            <Badge variant="subtle" size="sm">ORGANIZATION</Badge>
          </div>
          <div>
            <span className="text-xs font-bold text-neutral-950 block">
              InAmigos Foundation
            </span>
            <span className="text-[11px] text-neutral-600 block mt-0.5 leading-normal">
              Completed Web Development internship with registered organization documentation.
            </span>
          </div>
        </div>

        {/* 3. Codebase Evidence */}
        <div className="p-3.5 bg-neutral-50/70 border border-neutral-200/80 rounded-sm space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
              03 / Codebases
            </span>
            <Badge variant="subtle" size="sm">REPOSITORIES</Badge>
          </div>
          <div>
            <span className="text-xs font-bold text-neutral-950 block">
              Source Code & Test Suites
            </span>
            <span className="text-[11px] text-neutral-600 block mt-0.5 leading-normal">
              Public GitHub repositories with automated test suites, commit histories, and laboratory bench test harnesses.
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
