import type { Project } from '@/types'

export interface ResearchRoboticsPreviewProps {
  project: Project
  variant?: 'card' | 'showcase' | 'case-study'
  className?: string
}

/**
 * Archetype Preview Component: Research / Robotics.
 * Used for: NIDAR / VegaPilot (Standalone Robotics & Autonomous Systems Track).
 *
 * CRITICAL COMPLIANCE:
 * Never presents a fabricated quadcopter photo or fake telemetry UI.
 * Renders an honest, elegant, illustrative technical blueprint of the RP2040 dual-core architecture,
 * 1kHz IMU sensor stabilization loop, and ELRS/CRSF serial telemetry protocol integration.
 */
export function ResearchRoboticsPreview({
  project,
  variant = 'card',
  className = '',
}: ResearchRoboticsPreviewProps) {
  const isCaseStudy = variant === 'case-study' || variant === 'showcase'

  return (
    <div
      className={`relative w-full h-full bg-neutral-950 overflow-hidden flex flex-col font-mono select-none ${className}`}
      data-testid={`preview-research-robotics-${project.slug}`}
      data-archetype="research-robotics"
    >
      {/* Schematic Header Bar */}
      <div className="relative z-10 flex items-center justify-between px-3 py-1.5 bg-neutral-900 border-b border-neutral-800">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-xs bg-amber-400 inline-block" />
          <span className="text-[10px] text-neutral-300 truncate max-w-[160px] sm:max-w-[220px]">
            RP2040 Dual-Core // Bench Prototype & Spec
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] uppercase tracking-wider text-amber-300 bg-amber-950/80 border border-amber-500/30 px-1.5 py-0.5 rounded-xs">
            EMBEDDED ROBOTICS
          </span>
        </div>
      </div>

      {/* Schematic Hardware Grid & Subsystem Map */}
      <div className="relative flex-1 w-full p-3 sm:p-4 flex flex-col justify-between overflow-hidden bg-radial from-neutral-900/60 to-neutral-950">
        {/* Subtle schematic grid background */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#f59e0b 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
          aria-hidden="true"
        />

        {/* Top Schematic Row: Microcontroller Target */}
        <div className="relative z-10 flex items-center justify-between text-[10px] text-neutral-400 border-b border-neutral-800/60 pb-2">
          <span className="text-amber-300 font-semibold">Raspberry Pi Pico (RP2040)</span>
          <span className="text-amber-400/90 font-medium">BENCH TEST & HARDWARE SPEC</span>
        </div>

        {/* Center: Dual-Core Task Allocation & I/O Schematic */}
        <div className="relative z-10 my-auto py-2">
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center text-[9px] sm:text-[10px]">
            {/* Core 0: Flight Loop Architecture */}
            <div className="p-1.5 sm:p-2 rounded-xs bg-neutral-900/90 border border-neutral-800 text-neutral-300 flex flex-col justify-center">
              <span className="text-amber-400 text-[8px] uppercase">Core 0 (Spec)</span>
              <span className="font-semibold text-neutral-200 truncate">IMU Loop & Filter</span>
              <span className="text-neutral-500 text-[8px]">Flight Architecture</span>
            </div>

            {/* Core 1: Telemetry Decoder (Bench Tested) */}
            <div className="p-1.5 sm:p-2 rounded-xs bg-amber-950/30 border border-amber-800/50 text-amber-200 flex flex-col justify-center">
              <span className="text-amber-400 text-[8px] uppercase">Core 1 (Bench Tested)</span>
              <span className="font-semibold text-amber-100 truncate">ELRS / CRSF</span>
              <span className="text-amber-400/80 text-[8px]">Serial Packet Decoder</span>
            </div>

            {/* Output: Motor Signals Pinout */}
            <div className="p-1.5 sm:p-2 rounded-xs bg-neutral-900/90 border border-neutral-800 text-neutral-300 flex flex-col justify-center">
              <span className="text-amber-400 text-[8px] uppercase">Motor Signals</span>
              <span className="font-semibold text-neutral-200 truncate">4x DShot / PWM</span>
              <span className="text-neutral-500 text-[8px]">Pinout Harness Spec</span>
            </div>
          </div>

          {/* Subsystem Specifications */}
          <div className="mt-2.5 flex items-center justify-center gap-2 sm:gap-4 text-[9px] text-neutral-500">
            <span>• I2C/SPI Sensor Bus (Spec)</span>
            <span>• Bench Test Wiring Harness</span>
            <span>• CRSF Telemetry (Tested)</span>
          </div>
        </div>

        {/* Bottom Hardware Strip */}
        <div className="relative z-10 flex items-center justify-between text-[9px] text-neutral-500 border-t border-neutral-800/60 pt-1.5">
          <span className="truncate">C/C++ · RP2040 · CRSF Telemetry</span>
          <span className="text-neutral-400 shrink-0 font-medium">PROTOTYPE SPEC · NO_SYNTHETIC_ASSETS</span>
        </div>
      </div>

      {/* Case Study Caption Bar */}
      {isCaseStudy && (
        <div className="px-4 py-2 bg-neutral-900 border-t border-neutral-800 text-xs text-neutral-400 flex items-center justify-between">
          <span className="truncate mr-2">
            RP2040 dual-core flight controller architecture and bench telemetry specification.
          </span>
          <span className="text-[10px] text-amber-400 shrink-0 uppercase tracking-wider">
            BENCH_PROTOTYPE_SPECIFICATION
          </span>
        </div>
      )}
    </div>
  )
}
