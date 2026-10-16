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

  let opacityClass = 'opacity-20'
  let filterClass = 'brightness-75 contrast-105'

  if (isTransforming) {
    opacityClass = 'opacity-0'
    filterClass = 'brightness-50 blur-sm'
  } else if (isEarlyIdentity) {
    opacityClass = 'opacity-35'
    filterClass = 'brightness-85 contrast-110'
  } else if (isDistorting) {
    opacityClass = 'opacity-50'
    filterClass = 'brightness-95 contrast-125'
  }

  return (
    <div
      className={`absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden select-none transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${opacityClass}`}
      aria-hidden="true"
    >
      {/* Aspect-controlled portrait frame */}
      <div className="relative w-[280px] h-[360px] sm:w-[340px] sm:h-[440px] md:w-[400px] md:h-[500px] max-w-[90vw] max-h-[75vh]">
        
        {/* Base Layer: Authentic photograph with gentle editorial vignette */}
        <div className={`w-full h-full relative overflow-hidden rounded-md border border-white/5 ${filterClass}`}>
          <img
            src={portraitUrl}
            alt=""
            className="w-full h-full object-cover object-top"
            loading="eager"
          />

          {/* Deep dark gradient overlay around edges to blend naturally with #050505 */}
          <div className="absolute inset-0 bg-radial from-transparent via-black/45 to-[#050505]" />
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
