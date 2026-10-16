import { useState } from 'react'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { Icon } from '@/components/common/Icon'

export interface InteractiveFeatureInspectorProps {
  projectSlug: string
  className?: string
}

export function InteractiveFeatureInspector({
  projectSlug,
  className = '',
}: InteractiveFeatureInspectorProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [step, setStep] = useState<number>(0)
  const [output, setOutput] = useState<Record<string, unknown> | null>(null)

  // Simulation for ResumeTrices
  const runResumeTricesPipeline = () => {
    setIsRunning(true)
    setStep(1)
    setOutput(null)

    setTimeout(() => {
      setStep(2)
      setTimeout(() => {
        setStep(3)
        setTimeout(() => {
          setIsRunning(false)
          setStep(4)
          setOutput({
            candidate_id: 'cand_88291',
            target_role: 'Full-Stack Software Engineer',
            overall_competency_match: '91.8%',
            schema_validation: {
              status: 'PASSED',
              validator: 'Pydantic v2 / Strict JSON Schema',
              runtime_exceptions: 0,
            },
            verified_competencies: [
              { skill: 'React / TypeScript', weight: 0.35, match: '100%' },
              { skill: 'FastAPI / Python APIs', weight: 0.35, match: '95%' },
              { skill: 'SQL & Database Schemas', weight: 0.30, match: '80%' },
            ],
            missing_gap: 'Distributed Message Broker (Kafka) experience unverified',
          })
        }, 300)
      }, 300)
    }, 300)
  }

  // Simulation for DocFrame
  const [paperFormat, setPaperFormat] = useState<'A4' | 'Letter'>('A4')
  const [margin, setMargin] = useState<number>(15)

  if (projectSlug === 'resumetrices') {
    return (
      <div className={`p-4 sm:p-5 rounded-sm border border-neutral-300 bg-neutral-900 text-neutral-100 font-mono text-xs ${className}`}>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
            <span className="font-bold text-white text-xs">Live Pipeline Sandbox: ResumeTrices</span>
          </div>
          <Badge variant="subtle" size="sm" className="text-[10px] uppercase font-mono">
            Deterministic Schema Runner
          </Badge>
        </div>

        <p className="text-neutral-400 font-sans text-xs leading-relaxed mb-4">
          Test the LLM schema boundary. Observe how raw unstructured output is validated and transformed into a type-safe competency matrix without parsing failures.
        </p>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Button
            variant="primary"
            size="sm"
            onClick={runResumeTricesPipeline}
            disabled={isRunning}
            leftIcon={<Icon name="terminal" size="xs" />}
            className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-mono font-semibold"
          >
            {isRunning ? 'Validating Schema...' : 'Run Pipeline Simulation'}
          </Button>

          {step > 0 && (
            <span className="text-[11px] text-neutral-400">
              {step === 1 && '▶ Step 1: Ingesting candidate document buffer...'}
              {step === 2 && '▶ Step 2: Enforcing strict Pydantic JSON schema boundary...'}
              {step === 3 && '▶ Step 3: Computing deterministic competency weights...'}
              {step === 4 && '✓ Execution Complete: 0 validation drops'}
            </span>
          )}
        </div>

        {output && (
          <div className="p-3 bg-neutral-950 rounded-xs border border-neutral-800 text-[11px] overflow-x-auto text-emerald-400">
            <pre>{JSON.stringify(output, null, 2)}</pre>
          </div>
        )}
      </div>
    )
  }

  if (projectSlug === 'docframe') {
    const pageWidth = paperFormat === 'A4' ? 210 : 215.9
    const pageHeight = paperFormat === 'A4' ? 297 : 279.4
    const printableWidth = (pageWidth - margin * 2).toFixed(1)
    const printableHeight = (pageHeight - margin * 2).toFixed(1)

    return (
      <div className={`p-4 sm:p-5 rounded-sm border border-neutral-300 bg-neutral-900 text-neutral-100 font-mono text-xs ${className}`}>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
            <span className="font-bold text-white text-xs">Client-Side Vector Engine Simulator</span>
          </div>
          <Badge variant="subtle" size="sm" className="text-[10px] uppercase font-mono">
            Zero Server Calls
          </Badge>
        </div>

        <p className="text-neutral-400 font-sans text-xs leading-relaxed mb-4">
          Calculate in-browser virtual page geometry, coordinate wrapping, and margin bleed in client-side memory without network transmission.
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">Format:</span>
            {(['A4', 'Letter'] as const).map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => setPaperFormat(fmt)}
                className={`px-2 py-1 rounded-xs border transition-colors ${
                  paperFormat === fmt
                    ? 'bg-white text-neutral-950 border-white font-bold'
                    : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:border-neutral-500'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-neutral-400">Margin:</span>
            {[10, 15, 20].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMargin(m)}
                className={`px-2 py-1 rounded-xs border transition-colors ${
                  margin === m
                    ? 'bg-white text-neutral-950 border-white font-bold'
                    : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:border-neutral-500'
                }`}
              >
                {m}mm
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 bg-neutral-950 rounded-xs border border-neutral-800 text-[11px] space-y-1.5 text-neutral-300">
          <div className="flex justify-between">
            <span className="text-neutral-500">Virtual Viewport Geometry:</span>
            <span className="text-emerald-400">{pageWidth}mm × {pageHeight}mm</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Printable Canvas Area:</span>
            <span className="text-white">{printableWidth}mm × {printableHeight}mm</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">On-Device Privacy Guarantee:</span>
            <span className="text-emerald-400">100% Client Memory (0 Network Packets Sent)</span>
          </div>
        </div>
      </div>
    )
  }

  return null
}
