import type { Project } from '@/types'
import { getProjectPreviewUrl, getProjectWebpUrl } from '@/utils'

export interface ProductSaaSPreviewProps {
  project: Project
  variant?: 'card' | 'showcase' | 'case-study'
  className?: string
}

/**
 * Archetype Preview Component: Product / SaaS.
 * Used for: Convia, ResumeTrices, DocFrame.
 * Features an editorial browser / application viewport frame with authentic runtime UI screenshots.
 */
export function ProductSaaSPreview({
  project,
  variant = 'card',
  className = '',
}: ProductSaaSPreviewProps) {
  const previewUrl = getProjectPreviewUrl(project)
  const webpUrl = getProjectWebpUrl(project)
  const isCaseStudy = variant === 'case-study' || variant === 'showcase'
  const imgWidth = project.slug === 'convia' ? 1618 : 1262
  const imgHeight = project.slug === 'convia' ? 972 : 704

  // URL / Path simulated breadcrumb tailored to the verified project
  const appPath =
    project.slug === 'convia'
      ? 'convia.workspace/canvas'
      : project.slug === 'docframe'
        ? 'docframe.engine/editor'
        : 'resumetrices.app/ats-score'

  return (
    <div
      className={`relative w-full h-full bg-neutral-950 overflow-hidden flex flex-col ${className}`}
      data-testid={`preview-product-saas-${project.slug}`}
      data-archetype="product-saas"
    >
      {/* SaaS Application Window Header Strip */}
      <div className="relative z-10 flex items-center justify-between px-3 py-1.5 bg-neutral-900/90 border-b border-neutral-800/80 backdrop-blur-xs select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-neutral-600/80 inline-block" />
          <span className="w-2 h-2 rounded-full bg-neutral-600/80 inline-block" />
          <span className="w-2 h-2 rounded-full bg-neutral-600/80 inline-block" />
          <span className="ml-2 font-mono text-[10px] text-neutral-400 truncate max-w-[150px] sm:max-w-[200px]">
            {appPath}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-wider text-lavender-300 bg-lavender-950/80 border border-lavender-500/30 px-1.5 py-0.5 rounded-xs">
            PRODUCT / SAAS
          </span>
        </div>
      </div>

      {/* Main Viewport: Genuine Screenshot or Editorial Fallback */}
      <div className="relative flex-1 w-full h-full overflow-hidden bg-neutral-950">
        {previewUrl ? (
          <>
            <picture className="w-full h-full block">
              {webpUrl && <source type="image/webp" srcSet={webpUrl} />}
              <img
                src={previewUrl}
                alt={project.evidence?.caption || `${project.title} interface walkthrough`}
                width={imgWidth}
                height={imgHeight}
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
              Verified SaaS Architecture · Preview Pending
            </span>
          </div>
        )}
      </div>

      {/* Bottom Verification Strip for Case Study Hero Variant */}
      {isCaseStudy && project.evidence?.caption && (
        <div className="px-4 py-2 bg-neutral-900 border-t border-neutral-800 text-xs font-mono text-neutral-400 flex items-center justify-between">
          <span className="truncate mr-2">{project.evidence.caption}</span>
          <span className="text-[10px] text-emerald-400 shrink-0 uppercase tracking-wider">
            VERIFIED_SAAS_INTERFACE
          </span>
        </div>
      )}
    </div>
  )
}
