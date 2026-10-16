import { Card } from '@/components/common/Card'
import { Heading } from '@/components/common/Heading'
import { Section } from '@/components/common/Section'
import { Text } from '@/components/common/Text'
import { technicalCapabilities } from '@/data'

export interface CapabilityLedgerProps {
  className?: string
}

/**
 * Capability Ledger presenting verified technical proficiencies,
 * concrete project evidence, and genuine implementation boundaries.
 */
export function CapabilityLedger({ className = '' }: CapabilityLedgerProps) {
  return (
    <Section id="capabilities" spacing="lg" bordered reveal className={className}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
        <div>
          <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider mb-2 block">
            CAPABILITY LEDGER
          </Text>
          <Heading as="h2" variant="h1" className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-950">
            Technical Proficiencies & Systems
          </Heading>
        </div>
        <Text variant="caption" tone="muted" className="text-xs font-mono max-w-md">
          Distinguishing demonstrated project usage from ongoing academic coursework.
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {technicalCapabilities.map((group) => (
          <Card
            key={group.id}
            variant="outlined"
            padding="sm"
            className="bg-white/95 border-slate-200/90 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] space-y-3 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 rounded-xl"
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
              <Heading as="h4" variant="h4" className="text-sm font-semibold text-slate-900">
                {group.title}
              </Heading>
              <span className="text-[10px] font-mono text-slate-400">
                {group.technologies.length} Techs
              </span>
            </div>

            <Text variant="bodySm" tone="secondary" className="text-xs text-slate-600 leading-normal">
              {group.description}
            </Text>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {group.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 text-[11px] font-mono text-slate-700 bg-slate-100/90 border border-slate-200/70 rounded-full shadow-xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
              {group.projectEvidence}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
