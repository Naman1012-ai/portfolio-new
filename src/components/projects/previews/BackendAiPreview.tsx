import type { Project } from '@/types'

export interface BackendAiPreviewProps {
  project: Project
  variant?: 'card' | 'showcase' | 'case-study'
  className?: string
}

/**
 * Archetype Preview Component: Backend / AI Prototype.
 * Used for: Language-Agnostic Chatbot.
 *
 * CRITICAL COMPLIANCE:
 * Never presents a fabricated UI or simulated chat bubble.
 * Renders an honest, elegant, illustrative technical blueprint of the FastAPI service architecture,
 * Google Gemini orchestration, SQLAlchemy persistence layer, and 241 verified Pytest tests.
 */
export function BackendAiPreview({
  project,
  variant = 'card',
  className = '',
}: BackendAiPreviewProps) {
  const isCaseStudy = variant === 'case-study' || variant === 'showcase'

  return (
    <div
      className={`relative w-full h-full bg-neutral-950 overflow-hidden flex flex-col font-mono select-none ${className}`}
      data-testid={`preview-backend-ai-${project.slug}`}
      data-archetype="backend-ai"
    >
      {/* Blueprint Header Bar */}
      <div className="relative z-10 flex items-center justify-between px-3 py-1.5 bg-neutral-900 border-b border-neutral-800">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-xs bg-purple-400 inline-block" />
          <span className="text-[10px] text-neutral-300 truncate max-w-[160px] sm:max-w-[220px]">
            FastAPI Async Service // py-3.14 :8000
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] uppercase tracking-wider text-purple-300 bg-purple-950/80 border border-purple-500/30 px-1.5 py-0.5 rounded-xs">
            BACKEND / AI
          </span>
        </div>
      </div>

      {/* Blueprint Architectural Grid & Topology */}
      <div className="relative flex-1 w-full p-3 sm:p-4 flex flex-col justify-between overflow-hidden bg-radial from-neutral-900/60 to-neutral-950">
        {/* Subtle engineering grid background */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '14px 14px',
          }}
          aria-hidden="true"
        />

        {/* Top Blueprint Row: Endpoint & Service Metadata */}
        <div className="relative z-10 flex items-center justify-between text-[10px] text-neutral-400 border-b border-neutral-800/60 pb-2">
          <span className="text-purple-300 font-semibold">POST /api/chat</span>
          <span className="text-emerald-400 font-medium">241/241 PYTEST PASSED</span>
        </div>

        {/* Center: Clean Architecture Flow Topology */}
        <div className="relative z-10 my-auto py-2">
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center text-[9px] sm:text-[10px]">
            {/* Node 1: Request Ingestion */}
            <div className="p-1.5 sm:p-2 rounded-xs bg-neutral-900/90 border border-neutral-800 text-neutral-300 flex flex-col justify-center">
              <span className="text-neutral-500 text-[8px] uppercase">Ingestion</span>
              <span className="font-semibold text-neutral-200 truncate">Multilingual Prompt</span>
              <span className="text-neutral-500 text-[8px]">Lang Detection</span>
            </div>

            {/* Node 2: Core Orchestration */}
            <div className="p-1.5 sm:p-2 rounded-xs bg-purple-950/30 border border-purple-800/50 text-purple-200 flex flex-col justify-center">
              <span className="text-purple-400 text-[8px] uppercase">AI Orchestrator</span>
              <span className="font-semibold text-purple-100 truncate">Gemini API</span>
              <span className="text-purple-400 text-[8px]">Multi-Turn Context</span>
            </div>

            {/* Node 3: Persistence */}
            <div className="p-1.5 sm:p-2 rounded-xs bg-neutral-900/90 border border-neutral-800 text-neutral-300 flex flex-col justify-center">
              <span className="text-neutral-500 text-[8px] uppercase">Persistence</span>
              <span className="font-semibold text-neutral-200 truncate">SQLAlchemy ORM</span>
              <span className="text-neutral-500 text-[8px]">Relational History</span>
            </div>
          </div>

          {/* Subsystem Specifications */}
          <div className="mt-2.5 flex items-center justify-center gap-2 sm:gap-4 text-[9px] text-neutral-500">
            <span>• Async I/O Loop</span>
            <span>• Pytest Suite</span>
            <span>• Strict Schema Validation</span>
          </div>
        </div>

        {/* Bottom Metadata Strip */}
        <div className="relative z-10 flex items-center justify-between text-[9px] text-neutral-500 border-t border-neutral-800/60 pt-1.5">
          <span className="truncate">FastAPI · Gemini API · SQLAlchemy</span>
          <span className="text-neutral-400 shrink-0 font-medium">NO_SYNTHETIC_UI</span>
        </div>
      </div>

      {/* Case Study Caption Bar */}
      {isCaseStudy && (
        <div className="px-4 py-2 bg-neutral-900 border-t border-neutral-800 text-xs text-neutral-400 flex items-center justify-between">
          <span className="truncate mr-2">
            Multilingual FastAPI backend architecture and relational context storage.
          </span>
          <span className="text-[10px] text-emerald-400 shrink-0 uppercase tracking-wider">
            VERIFIED_TECHNICAL_BLUEPRINT
          </span>
        </div>
      )}
    </div>
  )
}
