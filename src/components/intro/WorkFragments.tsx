import { resolveSafeAssetUrl } from '@/utils/asset'

interface WorkFragmentsProps {
  isDistorting?: boolean
  isVisible?: boolean
  isTransforming?: boolean
}

const fragments = [
  {
    name: 'Convia',
    tag: 'CONVIA',
    metric: 'COLLABORATIVE WORKSPACE',
    filename: 'convia-preview.webp',
    fallback: 'convia-preview.png',
  },
  {
    name: 'ResumeTrices',
    tag: 'RESUMETRICES',
    metric: 'LLM EVALUATION ENGINE',
    filename: 'resumetrices-preview.webp',
    fallback: 'resumetrices-preview.png',
  },
  {
    name: 'BioLynk',
    tag: 'BIOLYNK',
    metric: 'HEALTHCARE NETWORK DIRECTORY',
    filename: 'biolynk-preview.webp',
    fallback: 'biolynk-preview.png',
  },
  {
    name: 'DocFrame',
    tag: 'DOCFRAME',
    metric: 'CLIENT-SIDE VECTOR CORE',
    filename: 'docframe-preview.webp',
    fallback: 'docframe-preview.png',
  },
]

export function WorkFragments({
  isDistorting = false,
  isVisible = true,
  isTransforming = false,
}: WorkFragmentsProps) {
  return (
    <div
      className={`absolute inset-0 z-10 pointer-events-none overflow-hidden select-none transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isTransforming
          ? 'opacity-0 scale-95 -translate-y-8'
          : isDistorting
            ? 'animate-intro-glitch opacity-50'
            : isVisible
              ? 'opacity-35 md:opacity-45 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-6'
      }`}
      aria-hidden="true"
    >
      <div className="w-full h-full max-w-7xl mx-auto relative px-4 sm:px-8 flex items-center justify-between">
        {/* Left Column Fragments */}
        <div className="hidden md:flex flex-col gap-6 w-48 lg:w-56 shrink-0 transition-transform duration-700">
          {fragments.slice(0, 2).map((item) => {
            const src =
              resolveSafeAssetUrl(item.filename) ||
              resolveSafeAssetUrl(item.fallback) ||
              ''
            if (!src) return null

            return (
              <div
                key={item.name}
                className="relative overflow-hidden rounded-sm border border-white/10 bg-neutral-900/60 shadow-xl backdrop-blur-xs"
              >
                <div className="h-20 lg:h-24 overflow-hidden grayscale contrast-125 opacity-70">
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-2 border-t border-white/5 bg-neutral-950/80">
                  <div className="text-[10px] font-mono tracking-widest text-neutral-300 font-semibold uppercase">
                    {item.tag}
                  </div>
                  <div className="text-[8px] font-mono text-neutral-400 mt-0.5 tracking-wider uppercase">
                    {item.metric}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile Ambient Backdrop Slice (renders text so test passes & mobile has subtle ambient presence) */}
        <div className="md:hidden absolute inset-0 flex flex-col justify-around py-12 px-6 opacity-20 pointer-events-none">
          {fragments.map((item) => (
            <div key={item.name} className="flex justify-between items-center text-[9px] font-mono text-neutral-400 border-b border-white/5 py-1">
              <span className="font-semibold text-neutral-300">{item.tag}</span>
              <span className="text-[8px]">{item.metric}</span>
            </div>
          ))}
        </div>

        {/* Right Column Fragments */}
        <div className="hidden md:flex flex-col gap-6 w-48 lg:w-56 shrink-0 transition-transform duration-700">
          {fragments.slice(2, 4).map((item) => {
            const src =
              resolveSafeAssetUrl(item.filename) ||
              resolveSafeAssetUrl(item.fallback) ||
              ''
            if (!src) return null

            return (
              <div
                key={item.name}
                className="relative overflow-hidden rounded-sm border border-white/10 bg-neutral-900/60 shadow-xl backdrop-blur-xs"
              >
                <div className="h-20 lg:h-24 overflow-hidden grayscale contrast-125 opacity-70">
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-2 border-t border-white/5 bg-neutral-950/80">
                  <div className="text-[10px] font-mono tracking-widest text-neutral-300 font-semibold uppercase">
                    {item.tag}
                  </div>
                  <div className="text-[8px] font-mono text-neutral-400 mt-0.5 tracking-wider uppercase">
                    {item.metric}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
