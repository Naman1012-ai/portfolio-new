import type { Project } from '@/types'
import { getProjectPreviewUrl, getProjectWebpUrl } from '@/utils'

export interface SocialCoordinationPreviewProps {
  project: Project
  variant?: 'card' | 'showcase' | 'case-study'
  className?: string
}

/**
 * Archetype Preview Component: Social Impact / Coordination.
 * Used for: BioLynk.
 * Features an emergency healthcare network coordination viewport with authentic runtime UI screenshots.
 */
export function SocialCoordinationPreview({
  project,
  variant = 'card',
  className = '',
}: SocialCoordinationPreviewProps) {
  const previewUrl = getProjectPreviewUrl(project)
  const webpUrl = getProjectWebpUrl(project)
  const isCaseStudy = variant === 'case-study' || variant === 'showcase'

  return (
    <div
      className={`relative w-full h-full bg-neutral-950 overflow-hidden flex flex-col ${className}`}
      data-testid={`preview-social-coordination-${project.slug}`}
      data-archetype="social-coordination"
    >
      {/* Network Coordination Header Bar */}
      <div className="relative z-10 flex items-center justify-between px-3 py-1.5 bg-neutral-900/90 border-b border-neutral-800/80 backdrop-blur-xs select-none">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
          </span>
          <span className="font-mono text-[10px] text-neutral-300 truncate max-w-[160px] sm:max-w-[220px]">
            biolynk.prototype/donor-portal
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-wider text-sky-300 bg-sky-950/80 border border-sky-500/30 px-1.5 py-0.5 rounded-xs">
            COORDINATION PROTOTYPE
          </span>
        </div>
      </div>

      {/* Viewport Frame with Genuine Screenshot */}
      <div className="relative flex-1 w-full h-full overflow-hidden bg-neutral-950">
        {previewUrl ? (
          <>
            <picture className="w-full h-full block">
              {webpUrl && <source type="image/webp" srcSet={webpUrl} />}
              <img
                src={previewUrl}
                alt={project.evidence?.caption || `${project.title} interface walkthrough`}
                width={1262}
                height={704}
                className={`w-full h-full object-cover object-top transition-transform duration-500 ease-out motion-reduce:transform-none ${
                  isCaseStudy ? 'max-h-[500px]' : 'group-hover/thumb:scale-105'
                }`}
                loading={isCaseStudy ? 'eager' : 'lazy'}
                decoding={isCaseStudy ? 'sync' : 'async'}
              />
            </picture>
            {/* Subtle resting vignette */}
            <div className="absolute inset-0 bg-neutral-950/10 pointer-events-none group-hover/thumb:bg-neutral-950/20 transition-colors duration-300" />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-neutral-400">
            <span className="font-mono text-xs text-neutral-300 mb-1">{project.title}</span>
            <span className="font-mono text-[10px] text-neutral-500">
              Healthcare Network Prototype · Preview Pending
            </span>
          </div>
        )}
      </div>

      {/* Case Study Caption Bar */}
      {isCaseStudy && project.evidence?.caption && (
        <div className="px-4 py-2 bg-neutral-900 border-t border-neutral-800 text-xs font-mono text-neutral-400 flex items-center justify-between">
          <span className="truncate mr-2">{project.evidence.caption}</span>
          <span className="text-[10px] text-sky-400 shrink-0 uppercase tracking-wider">
            PROTOTYPE_INTERFACE
          </span>
        </div>
      )}
    </div>
  )
}
