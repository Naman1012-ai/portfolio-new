import { resolveSafeAssetUrl } from '@/utils/asset'

interface PortraitRevealProps {
  phase?: string
  isTransforming?: boolean
}

export function PortraitReveal({ phase = 'identity', isTransforming = false }: PortraitRevealProps) {
  const portraitUrl =
    resolveSafeAssetUrl('naman-portrait.png') || '/assets/naman-portrait.png'

  const isDistorting = phase === 'distortion'
  const isEarlyIdentity = phase === 'identity' || phase === 'portrait'

  let opacityClass = 'opacity-85'
  let filterClass = 'brightness-100 contrast-105'

  if (isTransforming) {
    opacityClass = 'opacity-0'
    filterClass = 'brightness-50 blur-sm'
  } else if (phase === 'silence' || phase === 'signal') {
    opacityClass = 'opacity-0'
    filterClass = 'brightness-75'
  } else if (isEarlyIdentity) {
    opacityClass = 'opacity-75'
    filterClass = 'brightness-95 contrast-105'
  } else if (isDistorting) {
    opacityClass = 'opacity-90'
    filterClass = 'brightness-105 contrast-125'
  }

  return (
    <div
      className={`absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden select-none transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${opacityClass}`}
      aria-hidden="true"
    >
      {/* Aspect-controlled portrait frame */}
      <div className="relative w-[300px] h-[380px] sm:w-[380px] sm:h-[480px] md:w-[440px] md:h-[560px] max-w-[92vw] max-h-[80vh]">
        
        {/* Base Layer: Authentic photograph with clear editorial lighting */}
        <div className={`w-full h-full relative overflow-hidden rounded-2xl border border-white/10 ${filterClass}`}>
          <img
            src={portraitUrl}
            alt=""
            className="w-full h-full object-cover object-top"
            loading="eager"
          />

          {/* Gentle vignette around outer boundary only, keeping face crisp and clear */}
          <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#050505]/60" />
        </div>

        {/* Cinematic Horizontal Slices (active during distortion pulse) */}
        {isDistorting && (
          <>
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none animate-intro-slice-a"
              style={{ clipPath: 'inset(0 0 66% 0)' }}
            >
              <img
                src={portraitUrl}
                alt=""
                className="w-full h-full object-cover object-top brightness-110 contrast-125"
              />
            </div>

            <div
              className="absolute inset-0 overflow-hidden pointer-events-none animate-intro-slice-b"
              style={{ clipPath: 'inset(66% 0 0 0)' }}
            >
              <img
                src={portraitUrl}
                alt=""
                className="w-full h-full object-cover object-top brightness-110 contrast-125"
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
