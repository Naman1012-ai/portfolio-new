import { Badge } from '@/components/common/Badge'
import { Card } from '@/components/common/Card'
import { Heading } from '@/components/common/Heading'
import { Text } from '@/components/common/Text'

export interface CredentialsCardProps {
  className?: string
}

/**
 * Editorial card highlighting verified academic foundations,
 * performance milestones, and completed industry internship.
 *
 * Prominently presents:
 * - B.Tech CSE (AI & ML), The NorthCap University
 * - First-year CGPA: 9.4
 * - Completed Web Development internship at InAmigos Foundation
 */
export function CredentialsCard({ className = '' }: CredentialsCardProps) {
  return (
    <Card
      variant="outlined"
      padding="md"
      className={`border-neutral-200/90 bg-linear-to-b from-white to-neutral-50/50 shadow-micro space-y-5 ${className}`}
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200/80 pb-3">
        <div className="flex items-center gap-2">
          <Badge variant="lavender" size="sm">
            VERIFIED FOUNDATIONS
          </Badge>
          <span className="text-[11px] font-mono font-medium text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-xs border border-neutral-200/60">
            ACADEMIC & INDUSTRY
          </span>
        </div>
        <span className="text-xs font-mono text-neutral-500">
          The NorthCap University · InAmigos Foundation
        </span>
      </div>

      {/* Narrative Headline */}
      <div className="space-y-1">
        <Heading as="h4" variant="h4" className="text-base font-bold text-neutral-900">
          Academic Foundations & Applied Engineering
        </Heading>
        <Text variant="bodySm" tone="secondary" className="text-xs text-neutral-600 leading-relaxed max-w-3xl">
          Core computer science fundamentals, artificial intelligence specialization, and real-world web platform development grounded in verified institutional milestones.
        </Text>
      </div>

      {/* Prominent Verified Milestones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        {/* 1. Academic Program */}
        <div className="p-4 bg-white border border-neutral-200/90 rounded-sm shadow-micro space-y-2 hover:border-neutral-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
              Degree Program
            </span>
            <Badge variant="subtle" size="sm">UNDERGRADUATE</Badge>
          </div>
          <div>
            <span className="text-sm font-bold text-neutral-950 block">
              B.Tech CSE (AI & ML)
            </span>
            <span className="text-xs font-medium text-neutral-700 block mt-0.5">
              The NorthCap University
            </span>
            <span className="text-[11px] text-neutral-500 block mt-1 leading-normal">
              Computer Science & Engineering specializing in Artificial Intelligence and Machine Learning
            </span>
          </div>
        </div>

        {/* 2. Academic Performance */}
        <div className="p-4 bg-white border border-neutral-200/90 rounded-sm shadow-micro space-y-2 hover:border-neutral-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
              Academic Standing
            </span>
            <Badge variant="lavender" size="sm">FIRST YEAR</Badge>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold font-mono text-neutral-950">
                9.4
              </span>
              <span className="text-xs font-mono text-neutral-500">CGPA</span>
            </div>
            <span className="text-xs font-medium text-neutral-700 block mt-0.5">
              First-Year Academic Performance
            </span>
            <span className="text-[11px] text-neutral-500 block mt-1 leading-normal">
              Top-tier standing in computational logic, procedural programming, mathematics, and data structures
            </span>
          </div>
        </div>

        {/* 3. Completed Internship */}
        <div className="p-4 bg-white border border-neutral-200/90 rounded-sm shadow-micro space-y-2 hover:border-neutral-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
              Industry Experience
            </span>
            <Badge variant="success" size="sm">COMPLETED</Badge>
          </div>
          <div>
            <span className="text-sm font-bold text-neutral-950 block">
              Web Development Intern
            </span>
            <span className="text-xs font-medium text-neutral-700 block mt-0.5">
              InAmigos Foundation
            </span>
            <span className="text-[11px] text-neutral-500 block mt-1 leading-normal">
              Delivered production web features, frontend integrations, and responsive interface workflows
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
