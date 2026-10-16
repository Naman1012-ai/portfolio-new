import { resolveSafeAssetUrl } from '@/utils/asset'

interface ProjectSlice {
  name: string
  label: string
  filename: string
  fallback: string
}

const slices: ProjectSlice[] = [
  {
    name: 'Convia',
    label: '01 // CONVIA_PLATFORM',
    filename: 'convia-preview.webp',
    fallback: 'convia-preview.png',
  },
  {
    name: 'BioLynk',
    label: '02 // BIOLYNK_NETWORK',
    filename: 'biolynk-preview.webp',
    fallback: 'biolynk-preview.png',
  },
  {
    name: 'ResumeTrices',
    label: '03 // RESUMETRICES_AI',
    filename: 'resumetrices-preview.webp',
    fallback: 'resumetrices-preview.png',
  },
  {
    name: 'DocFrame',
    label: '04 // DOCFRAME_VECTOR',
    filename: 'docframe-preview.webp',
    fallback: 'docframe-preview.png',
  },
]

export function IntroWorkFragments() {
  return (
    <div
      className="absolute inset-0 z-10 pointer-events-none overflow-hidden select-none opacity-20 transition-opacity duration-500"
      aria-hidden="true"
    >
      <div className="w-full h-full grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 p-4 sm:p-8 items-center justify-center">
        {slices.map((slice, index) => {
          const src =
            resolveSafeAssetUrl(slice.filename) ||
            resolveSafeAssetUrl(slice.fallback) ||
            ''
          if (!src) return null

          return (
            <div
              key={slice.name}
              className={`relative overflow-hidden rounded-sm border border-white/10 bg-neutral-900/40 h-28 sm:h-36 md:h-44 grayscale contrast-125 mix-blend-luminosity transform ${
                index % 2 === 0 ? '-translate-y-2' : 'translate-y-2'
              }`}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover object-top opacity-60 scale-105"
                loading="eager"
              />
              <div className="absolute bottom-1 left-2 text-[9px] font-mono tracking-wider text-neutral-400 uppercase bg-black/70 px-1 py-0.5 rounded-xs">
                {slice.label}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
