import type { Project } from '@/types'
import { getProjectPreviewUrl, getProjectWebpUrl } from '@/utils'

export interface TerminalCliPreviewProps {
  project: Project
  variant?: 'card' | 'showcase' | 'case-study'
  className?: string
}

/**
 * Archetype Preview Component: Terminal / CLI.
 * Used for: Quiz Master, ATM Machine.
 * Features an authentic ANSI terminal / console window frame with verified runtime CLI execution screenshots.
 */
export function TerminalCliPreview({
  project,
  variant = 'card',
  className = '',
}: TerminalCliPreviewProps) {
  const previewUrl = getProjectPreviewUrl(project)
  const webpUrl = getProjectWebpUrl(project)
  const isCaseStudy = variant === 'case-study' || variant === 'showcase'

  const binaryName = project.slug === 'quiz-master' ? './QuizMaster.exe' : './ATMmachine.exe'

  return (
    <div
      className={`relative w-full h-full bg-neutral-950 overflow-hidden flex flex-col font-mono ${className}`}
      data-testid={`preview-terminal-cli-${project.slug}`}
      data-archetype="terminal-cli"
    >
      {/* Terminal Title Bar */}
      <div className="relative z-10 flex items-center justify-between px-3 py-1.5 bg-neutral-900 border-b border-neutral-800 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-2 h-2 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2 h-2 rounded-full bg-emerald-500/80 inline-block" />
          <span className="ml-2 text-[10px] text-neutral-400 truncate max-w-[150px] sm:max-w-[200px]">
            naman@runtime: ~/{binaryName}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] uppercase tracking-wider text-rose-300 bg-rose-950/80 border border-rose-500/30 px-1.5 py-0.5 rounded-xs">
            TERMINAL / CLI
          </span>
        </div>
      </div>

      {/* Terminal Viewport with Genuine Screenshot */}
      <div className="relative flex-1 w-full h-full overflow-hidden bg-neutral-950">
        {previewUrl ? (
          <>
            <picture className="w-full h-full block">
              {webpUrl && <source type="image/webp" srcSet={webpUrl} />}
              <img
                src={previewUrl}
                alt={project.evidence?.caption || `${project.title} terminal session`}
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
              C Procedural Binary · Execution Preview Pending
            </span>
          </div>
        )}
      </div>

      {/* Case Study Caption Bar */}
      {isCaseStudy && project.evidence?.caption && (
        <div className="px-4 py-2 bg-neutral-900 border-t border-neutral-800 text-xs text-neutral-400 flex items-center justify-between">
          <span className="truncate mr-2">{project.evidence.caption}</span>
          <span className="text-[10px] text-emerald-400 shrink-0 uppercase tracking-wider">
            VERIFIED_CONSOLE_SESSION
          </span>
        </div>
      )}
    </div>
  )
}
