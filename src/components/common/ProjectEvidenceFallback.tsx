import type { Project } from '@/types'
import { Badge } from './Badge'
import { Icon } from './Icon'

interface ProjectEvidenceFallbackProps {
  project: Project
  className?: string
}

/**
 * Editorial placeholder surface rendered when project screenshots or visual evidence
 * are not yet available or in active hardware prototyping.
 * Prevents broken image elements, layout shifts, or fabricated imagery.
 */
export function ProjectEvidenceFallback({
  project,
  className = '',
}: ProjectEvidenceFallbackProps) {
  const isTeam = project.teamProject

  return (
    <div
      className={`relative w-full aspect-video rounded-sm border border-slate-800 bg-slate-900/80 flex flex-col justify-between p-3 sm:p-5 select-none overflow-hidden ${className}`}
      aria-label={`Visual evidence placeholder for ${project.title}`}
    >
      {/* Background Architectural Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
        aria-hidden="true"
      />

      {/* Top Bar: Category & Maturity */}
      <div className="relative z-10 flex items-center justify-between gap-1">
        <Badge variant="subtle" size="sm">
          {project.category.replace('-', ' ').toUpperCase()}
        </Badge>
        <Badge
          variant={project.maturity === 'production' ? 'success' : 'neutral'}
          size="sm"
          dot
          dotColor={project.maturity === 'production' ? 'bg-emerald-500' : 'bg-slate-500'}
        >
          {project.maturity.toUpperCase()}
        </Badge>
      </div>

      {/* Center: Clean Icon & Fallback Label */}
      <div className="relative z-10 my-auto text-center py-2 sm:py-4">
        <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-sm bg-slate-800/80 border border-slate-700/80 shadow-inner mb-1 sm:mb-2 text-indigo-400">
          <Icon
            name={
              project.category === 'embedded-robotics'
                ? 'terminal'
                : project.category === 'systems-ai'
                  ? 'ai'
                  : 'code'
            }
            size="md"
          />
        </div>
        <p className="text-[11px] sm:text-xs font-mono text-slate-400 truncate px-2">
          {project.evidence?.fallbackText || `${project.title} · Verification In Progress`}
        </p>
      </div>

      {/* Bottom Bar: Collaboration Attribution & Format */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-1 text-[10px] sm:text-[11px] font-mono text-slate-400 border-t border-slate-800/80 pt-1.5">
        <span>{isTeam ? 'Team Collaboration' : 'Individual Engineering'}</span>
        <span>NO_SYNTHETIC_ASSETS</span>
      </div>
    </div>
  )
}
