import { useState } from 'react'
import { Badge } from '@/components/common/Badge'
import { Icon } from '@/components/common/Icon'

export interface ArchitectureNode {
  id: string
  label: string
  role: string
  tech: string
  detail: string
  decisionId?: string
  decisionTitle?: string
}

export interface ArchitectureFlowData {
  title: string
  subtitle: string
  nodes: ArchitectureNode[]
}

const FLOWS: Record<string, ArchitectureFlowData> = {
  convia: {
    title: 'Convia Collaborative State & Provenance Architecture',
    subtitle: 'Decoupled state synchronization pipeline with optimistic updates and schema-layer origin tracking.',
    nodes: [
      {
        id: 'node-client',
        label: 'Client Workspace Canvas',
        role: 'Frontend State Engine',
        tech: 'React 19 / TypeScript / Optimistic UI',
        detail: 'Renders collaborative ideation boards with zero-latency optimistic client state updates before server ACK.',
      },
      {
        id: 'node-rtdb',
        label: 'Firebase RTDB Sync Bus',
        role: 'Real-time Transport',
        tech: 'WebSocket / Canonical Channel Paths',
        detail: 'Synchronizes board updates and discussions scoped directly to active channel paths to prevent cross-channel leak.',
        decisionId: 'convia-in-channel-search',
        decisionTitle: 'In-Channel Scoped Message Discovery & Join-Time Privacy',
      },
      {
        id: 'node-provenance',
        label: 'Data Provenance Guard',
        role: 'Schema-Layer Authorization',
        tech: 'Attribution Metadata / Origin References',
        detail: 'Enforces originalOwner deletion authority across imported workspace copies to preserve creator attribution.',
        decisionId: 'convia-idea-provenance',
        decisionTitle: 'Data Provenance & Deletion Authority Across Workspace Imports',
      },
      {
        id: 'node-backend',
        label: 'Express Blueprint Compiler',
        role: 'Backend Orchestration',
        tech: 'Node.js / Express / Task Pipeline',
        detail: 'Compiles prioritized ideas into structured MVP blueprint documents and actionable sprint milestones.',
      },
    ],
  },
  resumetrices: {
    title: 'ResumeTrices Deterministic LLM Parsing Pipeline',
    subtitle: 'Treating LLM generation as untrusted network payloads via Pydantic schema validation boundaries.',
    nodes: [
      {
        id: 'node-pdf',
        label: 'PDF Text Extraction Stream',
        role: 'Ingestion Layer',
        tech: 'pdf-parse / Buffer Sanitization',
        detail: 'Extracts raw textual stream from candidate resume documents while stripping non-printable binary artifacts.',
      },
      {
        id: 'node-schema-boundary',
        label: 'JSON Schema Boundary',
        role: 'Validation Gate',
        tech: 'Pydantic / TypeScript Schemas',
        detail: 'Rejects unstructured or non-deterministic completions before payload reaches downstream calculation logic.',
        decisionId: 'resumetrices-schema-enforcement',
        decisionTitle: 'Structured JSON Prompt Schemas vs Regex Parsing',
      },
      {
        id: 'node-llm',
        label: 'Google Gemini Pro Orchestration',
        role: 'Model Inference',
        tech: 'Gemini API / Constrained JSON Prompting',
        detail: 'Prompts Gemini with enforced schema parameters to extract candidate competencies, experience, and certifications.',
      },
      {
        id: 'node-matrix',
        label: 'Competency Scoring Matrix',
        role: 'Deterministic Calculator',
        tech: 'Type-Safe Scoring Math / Gap Analysis',
        detail: 'Compares validated candidate competencies against job vacancy requirements to compute numerical match scores.',
      },
    ],
  },
  'nidar-vegapilot': {
    title: 'NIDAR / VegaPilot Bench Telemetry & Firmware Pipeline',
    subtitle: 'Dual-core task partitioning and laboratory bench serial packet decoding.',
    nodes: [
      {
        id: 'node-core0',
        label: 'RP2040 Core 0 Task Loop',
        role: 'Flight Dynamics & Control',
        tech: 'Embedded C/C++ / Hard Real-Time',
        detail: 'Dedicated microcontroller core running high-frequency control loop without interruption from telemetry overhead.',
      },
      {
        id: 'node-core1',
        label: 'RP2040 Core 1 Task Loop',
        role: 'Telemetry & Signal Decoding',
        tech: 'ELRS / CRSF Serial Protocol',
        detail: 'Second core decoding incoming CRSF packet streams and managing sensor acquisition over I2C/SPI buses.',
        decisionId: 'nidar-bench-vs-spec',
        decisionTitle: 'Bench-Tested Firmware Partitioning vs Unverified Autonomous Flight Claims',
      },
      {
        id: 'node-bench',
        label: 'Laboratory Bench Test Harness',
        role: 'Verification Scope',
        tech: 'Logic Analyzer / Serial Bench Monitor',
        detail: 'Bench validation strictly partitioned from full-scale outdoor flight claims, maintaining engineering credibility.',
      },
    ],
  },
}

export interface SystemArchitectureFlowProps {
  projectSlug: string
  className?: string
}

export function SystemArchitectureFlow({
  projectSlug,
  className = '',
}: SystemArchitectureFlowProps) {
  const flow = FLOWS[projectSlug]
  const [activeNodeId, setActiveNodeId] = useState<string>(() => flow?.nodes[0]?.id || '')

  if (!flow) return null

  const activeNode = flow.nodes.find((n) => n.id === activeNodeId) || flow.nodes[0]

  return (
    <div
      className={`rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-elevated ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="subtle" size="sm" className="font-mono text-[10px] uppercase tracking-wider rounded-full">
              System Architecture Flow
            </Badge>
            <span className="text-xs font-mono text-slate-500">· Interactive Data Pipeline</span>
          </div>
          <h4 className="font-bold font-display text-base text-slate-900">{flow.title}</h4>
        </div>
        <span className="text-xs font-mono text-slate-500 hidden md:inline max-w-xs text-right">
          Click any stage node to inspect architectural constraints
        </span>
      </div>

      {/* Visual Pipeline Stages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 relative">
        {flow.nodes.map((node, idx) => {
          const isActive = node.id === activeNodeId
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setActiveNodeId(node.id)}
              className={`p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 relative ${
                isActive
                  ? 'border-indigo-500/80 bg-indigo-50/70 shadow-sm ring-1 ring-indigo-500/20'
                  : 'border-slate-200/90 bg-slate-50/60 hover:bg-slate-100/80 hover:border-slate-300'
              }`}
              aria-pressed={isActive}
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className={`font-mono text-[10px] uppercase tracking-wider ${isActive ? 'text-indigo-600 font-semibold' : 'text-slate-500'}`}>
                  Stage 0{idx + 1}
                </span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" aria-hidden="true" />
                )}
              </div>
              <div className={`font-bold font-display text-xs sm:text-sm leading-tight mb-1 ${isActive ? 'text-slate-950' : 'text-slate-900'}`}>
                {node.label}
              </div>
              <div className={`text-[11px] font-mono truncate ${isActive ? 'text-indigo-700' : 'text-slate-500'}`}>
                {node.role}
              </div>
            </button>
          )
        })}
      </div>

      {/* Inspected Stage Details - Obsidian Tech Panel */}
      {activeNode && (
        <div className="p-5 bg-[#090D16] text-slate-100 rounded-xl border border-white/10 ring-1 ring-white/5 text-xs font-mono space-y-3.5 shadow-xl relative overflow-hidden animate-fade-in">
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">{activeNode.label}</span>
              <span className="text-slate-500">·</span>
              <span className="text-emerald-400 font-medium">{activeNode.tech}</span>
            </div>
            <span className="text-[11px] text-slate-400 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">{activeNode.role}</span>
          </div>

          <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed">
            {activeNode.detail}
          </p>

          {activeNode.decisionId && (
            <div className="pt-2.5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10">
              <span className="text-[11px] text-slate-400">
                Connected Decision: <span className="text-slate-200 font-medium">{activeNode.decisionTitle}</span>
              </span>
              <a
                href="#how-i-build"
                className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 hover:underline"
              >
                <span>Read Engineering Judgement Record</span>
                <Icon name="arrow-right" size="xs" />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
