import { Badge } from '@/components/common/Badge'
import { Card } from '@/components/common/Card'
import { Heading } from '@/components/common/Heading'
import { Icon } from '@/components/common/Icon'
import { Text } from '@/components/common/Text'

export interface CredentialsCardProps {
  className?: string
}

/**
 * Compact Evidence & Records layer.
 * Provides supporting source material and verification references for academic
 * and professional experience without over-explaining or presenting fake links.
 */
export function CredentialsCard({ className = '' }: CredentialsCardProps) {
  return (
    <Card
      variant="outlined"
      padding="md"
      className={`border-slate-200/90 bg-white shadow-elevated rounded-2xl space-y-5 ${className}`}
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="subtle" size="sm" className="font-mono text-[10px] tracking-wider uppercase">
              EVIDENCE & RECORDS
            </Badge>
          </div>
          <Text variant="bodySm" tone="secondary" className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Supporting records and source material for the academic and professional experience shown above.
          </Text>
        </div>
      </div>

      {/* Evidence 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        {/* 1. Academic Record */}
        <div className="flex flex-col justify-between p-4 bg-slate-50/80 border border-slate-200/80 rounded-xl space-y-3 transition-colors duration-200 hover:border-slate-300">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block mb-1">
              01 / Academic Record
            </span>
            <Heading as="h4" variant="h4" className="text-sm font-bold text-slate-900">
              The NorthCap University
            </Heading>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              9.4 first-year CGPA in Computer Science & Engineering (AI & ML).
            </p>
          </div>
          <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-500">
              Record available on request
            </span>
          </div>
        </div>

        {/* 2. Industry Internship */}
        <div className="flex flex-col justify-between p-4 bg-slate-50/80 border border-slate-200/80 rounded-xl space-y-3 transition-colors duration-200 hover:border-slate-300 group">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block mb-1">
              02 / Internship
            </span>
            <Heading as="h4" variant="h4" className="text-sm font-bold text-slate-900">
              InAmigos Foundation
            </Heading>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Web Development Internship: developed responsive NGO dummy portal and documentation.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center gap-x-3 gap-y-1">
            <a
              href="https://github.com/Naman1012-ai/Foundation_dummy_website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono font-medium text-indigo-600 hover:text-indigo-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xs"
              aria-label="View InAmigos Foundation website prototype repository (opens in new tab)"
            >
              <span>Deliverable code</span>
              <Icon
                name="arrow-up-right"
                size="xs"
                className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
              />
            </a>
            <span className="text-slate-400 text-xs">·</span>
            <a
              href="https://inamigosfoundation.org.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono font-medium text-slate-500 hover:text-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xs"
              aria-label="Visit InAmigos Foundation organization website (opens in new tab)"
            >
              <span>Organization website</span>
              <Icon
                name="arrow-up-right"
                size="xs"
                className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
              />
            </a>
          </div>
        </div>

        {/* 3. Source Repositories */}
        <div className="flex flex-col justify-between p-4 bg-slate-50/80 border border-slate-200/80 rounded-xl space-y-3 transition-colors duration-200 hover:border-slate-300 group">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block mb-1">
              03 / Source Code
            </span>
            <Heading as="h4" variant="h4" className="text-sm font-bold text-slate-900">
              GitHub Repositories
            </Heading>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Public project repositories, commit histories, tests, and documentation.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-200/80">
            <a
              href="https://github.com/Naman1012-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-indigo-600 group-hover:text-indigo-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xs"
              aria-label="View Naman Prajapati's GitHub repositories (opens in new tab)"
            >
              <span>View repositories</span>
              <Icon
                name="arrow-up-right"
                size="xs"
                className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
              />
            </a>
          </div>
        </div>
      </div>
    </Card>
  )
}
