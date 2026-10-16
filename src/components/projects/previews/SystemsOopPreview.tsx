import type { Project } from '@/types'
import { getProjectPreviewUrl, getProjectWebpUrl } from '@/utils'

export interface SystemsOopPreviewProps {
  project: Project
  variant?: 'card' | 'showcase' | 'case-study'
  className?: string
}

/**
 * Archetype Preview Component: Systems / OOP.
 * Used for: Library Management System.
 * Features a systems architecture and object domain model frame with verified runtime OOP execution screenshots.
 */
export function SystemsOopPreview({
  project,
  variant = 'card',
  className = '',
}: SystemsOopPreviewProps) {
  const previewUrl = getProjectPreviewUrl(project)
  const webpUrl = getProjectWebpUrl(project)
  const isCaseStudy = variant === 'case-study' || variant === 'showcase'

  return (
    <div
      className={`relative w-full h-full bg-neutral-950 overflow-hidden flex flex-col font-mono ${className}`}
      data-testid={`preview-systems-oop-${project.slug}`}
      data-archetype="systems-oop"
    >
      {/* Systems Architecture Header Bar */}
      <div className="relative z-10 flex items-center justify-between px-3 py-1.5 bg-neutral-900 border-b border-neutral-800 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block" />
          <span className="text-[10px] text-neutral-300 truncate max-w-[160px] sm:max-w-[220px]">
            C++ OOP RUNTIME // [Book, IssuedBook, Customer]
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] uppercase tracking-wider text-indigo-300 bg-indigo-950/80 border border-indigo-500/30 px-1.5 py-0.5 rounded-xs">
            SYSTEMS / OOP
          </span>
        </div>
      </div>

      {/* Systems Viewport with Genuine Screenshot */}
      <div className="relative flex-1 w-full h-full overflow-hidden bg-neutral-950">
        {previewUrl ? (
          <>
            <picture className="w-full h-full block">
              {webpUrl && <source type="image/webp" srcSet={webpUrl} />}
              <img
                src={previewUrl}
                alt={project.evidence?.caption || `${project.title} runtime catalog inventory`}
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
            <span className="text-xs text-neutral-300 mb-1">{project.title}</span>
            <span className="text-[10px] text-neutral-500">
              C++ Object Domain Architecture · Preview Pending
            </span>
          </div>
        )}
      </div>

      {/* Case Study Caption Bar */}
      {isCaseStudy && project.evidence?.caption && (
        <div className="px-4 py-2 bg-neutral-900 border-t border-neutral-800 text-xs text-neutral-400 flex items-center justify-between">
          <span className="truncate mr-2">{project.evidence.caption}</span>
          <span className="text-[10px] text-emerald-400 shrink-0 uppercase tracking-wider">
            OOP_RUNTIME
          </span>
        </div>
      )}
    </div>
  )
}
