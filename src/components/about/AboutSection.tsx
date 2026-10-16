import { useState, type MouseEvent, type KeyboardEvent } from 'react'
import { Badge } from '@/components/common/Badge'
import { Heading } from '@/components/common/Heading'
import { Icon } from '@/components/common/Icon'
import { Section } from '@/components/common/Section'
import { Text } from '@/components/common/Text'
import { useProjectTransition } from '@/components/projects'
import { aboutData, aboutLenses, siteProfile } from '@/data'
import { Link, useRouter } from '@/router'
import { resolveSafeAssetUrl } from '@/utils'

export interface AboutSectionProps {
  className?: string
}

type LensId = 'building-toward' | 'how-i-learn' | 'whats-next'

/**
 * Editorial Interactive Identity + Evidence Hub.
 *
 * Bridges:
 * PERSON → PROJECTS → ENGINEERING JUDGEMENT → CAPABILITIES
 *
 * Levels of interaction:
 * 1. Interactive Hero Statement: Conceptual phrases subtly linked to identity lenses.
 * 2. Three Identity Lenses: Selectable columns with active visual dominance.
 * 3. Evidence Layer ("WHERE THIS SHOWS UP" / "SEE IT IN THE WORK"): Connects personal narrative
 *    directly to verified repository implementations, architecture decisions, and active research.
 * 4. Grounded Status Strip: Clean student context with current exploration topics.
 *
 * Fully keyboard accessible, responsive, and respectful of prefers-reduced-motion.
 */
export function AboutSection({ className = '' }: AboutSectionProps) {
  const [activeLensId, setActiveLensId] = useState<LensId>('building-toward')
  const { enterProject } = useProjectTransition()
  const { navigate } = useRouter()
  const profileUrl = resolveSafeAssetUrl(aboutData.portrait.assetFilename)

  const activeLens = aboutLenses.find((lens) => lens.id === activeLensId) || aboutLenses[0]

  const handleEvidenceClick = (
    e: MouseEvent<HTMLAnchorElement>,
    slug?: string,
    anchorHref?: string
  ) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return
    }

    if (slug) {
      e.preventDefault()
      enterProject(slug)
      return
    }

    if (anchorHref) {
      e.preventDefault()
      if (anchorHref.startsWith('#')) {
        const target = document.querySelector(anchorHref)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        navigate(anchorHref)
      }
    }
  }

  const handleLensKeyDown = (e: KeyboardEvent<HTMLDivElement>, lensId: LensId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setActiveLensId(lensId)
    }
  }

  return (
    <Section id="about" spacing="lg" bordered reveal className={className}>
      {/* 1. Section Eyebrow & Status Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="inline-flex items-center gap-2">
          <Badge variant="lavender" size="sm" className="font-mono tracking-wider text-[10px] uppercase">
            {aboutData.badge}
          </Badge>
          <span className="text-neutral-300 font-mono text-xs hidden sm:inline">·</span>
          <span className="text-xs font-mono text-neutral-500">
            Interactive Identity & Evidence Hub
          </span>
        </div>

        <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          <span>Undergraduate · Actively Building</span>
        </div>
      </div>

      {/* 2. Interactive Hero Statement (Level 1) */}
      <div className="max-w-3xl mb-8">
        <Heading
          as="h2"
          variant="h1"
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-950 tracking-tight leading-snug mb-3"
        >
          <button
            type="button"
            onClick={() => setActiveLensId('building-toward')}
            className={`text-left inline transition-all duration-150 cursor-pointer rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 border-b-2 ${
              activeLensId === 'building-toward'
                ? 'border-neutral-950 text-neutral-950 pb-0.5'
                : 'border-transparent text-neutral-800 hover:border-neutral-400'
            }`}
            aria-label="Building software (Select What I'm Building Toward lens)"
          >
            Building software
          </button>
          <span className="text-neutral-400 font-normal">, </span>
          <button
            type="button"
            onClick={() => setActiveLensId('whats-next')}
            className={`text-left inline transition-all duration-150 cursor-pointer rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 border-b-2 ${
              activeLensId === 'whats-next'
                ? 'border-neutral-950 text-neutral-950 pb-0.5'
                : 'border-transparent text-neutral-800 hover:border-neutral-400'
            }`}
            aria-label="exploring AI/ML (Select What's Next lens)"
          >
            exploring AI/ML
          </button>
          <span className="text-neutral-400 font-normal">, and </span>
          <button
            type="button"
            onClick={() => setActiveLensId('how-i-learn')}
            className={`text-left inline transition-all duration-150 cursor-pointer rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 border-b-2 ${
              activeLensId === 'how-i-learn'
                ? 'border-neutral-950 text-neutral-950 pb-0.5'
                : 'border-transparent text-neutral-800 hover:border-neutral-400'
            }`}
            aria-label="learning (Select How I Learn lens)"
          >
            learning
          </button>
          <span className="text-neutral-400 font-normal"> by working through </span>
          <button
            type="button"
            onClick={() => setActiveLensId('building-toward')}
            className={`text-left inline transition-all duration-150 cursor-pointer rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 border-b-2 ${
              activeLensId === 'building-toward'
                ? 'border-neutral-950 text-neutral-950 pb-0.5'
                : 'border-transparent text-neutral-800 hover:border-neutral-400'
            }`}
            aria-label="real problems (Select What I'm Building Toward lens)"
          >
            real problems.
          </button>
        </Heading>

        <Text
          variant="lead"
          tone="secondary"
          className="text-neutral-600 text-sm sm:text-base leading-relaxed"
        >
          {aboutData.subheading}
        </Text>
      </div>

      {/* Subtle Hairline Divider */}
      <div className="w-full border-t border-neutral-200/80 mb-8" aria-hidden="true" />

      {/* 3. Desktop: Three Interactive Lenses (Level 2) */}
      <div
        role="tablist"
        aria-label="About Me identity lenses"
        className="hidden md:grid grid-cols-3 gap-6 lg:gap-8 items-start mb-8"
      >
        {/* Column 01: What I'm Building Toward */}
        <div
          role="tab"
          id="lens-tab-building-toward"
          aria-selected={activeLensId === 'building-toward'}
          aria-controls="about-evidence-panel"
          tabIndex={0}
          onClick={() => setActiveLensId('building-toward')}
          onKeyDown={(e) => handleLensKeyDown(e, 'building-toward')}
          className={`group cursor-pointer p-5 rounded-2xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
            activeLensId === 'building-toward'
              ? 'bg-white border-t-2 border-slate-900 shadow-md ring-1 ring-slate-900/5'
              : 'border-t-2 border-transparent bg-slate-50/60 hover:bg-white/80 hover:shadow-xs opacity-75 hover:opacity-100'
          }`}
        >
          <div className="border-b border-slate-200/80 pb-3 mb-3">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-mono text-xs font-semibold text-slate-400 tracking-wider uppercase block">
                01 / About Me
              </span>
              {activeLensId === 'building-toward' && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
                  Active Lens ↓
                </span>
              )}
            </div>
            <Heading as="h3" variant="h3" className="text-base sm:text-lg font-bold text-slate-950">
              What I&apos;m Building Toward
            </Heading>
          </div>

          <Text variant="bodySm" tone="secondary" className="text-sm text-slate-700 leading-relaxed font-normal mb-3">
            {aboutData.intro}
          </Text>

          <p className="text-xs font-mono text-slate-500 pt-1 border-t border-slate-200/60">
            CSE (AI & ML) student exploring full-stack web platforms and backend prototypes.
          </p>
        </div>

        {/* Column 02: How I Learn */}
        <div
          role="tab"
          id="lens-tab-how-i-learn"
          aria-selected={activeLensId === 'how-i-learn'}
          aria-controls="about-evidence-panel"
          tabIndex={0}
          onClick={() => setActiveLensId('how-i-learn')}
          onKeyDown={(e) => handleLensKeyDown(e, 'how-i-learn')}
          className={`group cursor-pointer p-5 rounded-2xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
            activeLensId === 'how-i-learn'
              ? 'bg-white border-t-2 border-slate-900 shadow-md ring-1 ring-slate-900/5'
              : 'border-t-2 border-transparent bg-slate-50/60 hover:bg-white/80 hover:shadow-xs opacity-75 hover:opacity-100'
          }`}
        >
          <div className="border-b border-slate-200/80 pb-3 mb-3">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-mono text-xs font-semibold text-slate-400 tracking-wider uppercase block">
                02 / How I Learn
              </span>
              {activeLensId === 'how-i-learn' && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
                  Active Lens ↓
                </span>
              )}
            </div>
            <Heading as="h3" variant="h3" className="text-base sm:text-lg font-bold text-neutral-950">
              Build → Break → Understand → Improve
            </Heading>
          </div>

          <div className="space-y-2.5 text-sm text-neutral-700 leading-relaxed mb-3">
            {aboutData.storyParagraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <p className="text-xs font-mono text-neutral-500 pt-1 border-t border-neutral-200/60">
            Learning through experimentation, reading documentation, and debugging real issues.
          </p>
        </div>

        {/* Column 03: What's Next */}
        <div
          role="tab"
          id="lens-tab-whats-next"
          aria-selected={activeLensId === 'whats-next'}
          aria-controls="about-evidence-panel"
          tabIndex={0}
          onClick={() => setActiveLensId('whats-next')}
          onKeyDown={(e) => handleLensKeyDown(e, 'whats-next')}
          className={`group cursor-pointer p-5 rounded-2xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
            activeLensId === 'whats-next'
              ? 'bg-white border-t-2 border-slate-900 shadow-md ring-1 ring-slate-900/5'
              : 'border-t-2 border-transparent bg-slate-50/60 hover:bg-white/80 hover:shadow-xs opacity-75 hover:opacity-100'
          }`}
        >
          <div className="border-b border-slate-200/80 pb-3 mb-3">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-mono text-xs font-semibold text-slate-400 tracking-wider uppercase block">
                03 / What&apos;s Next
              </span>
              {activeLensId === 'whats-next' && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
                  Active Lens ↓
                </span>
              )}
            </div>
            <Heading as="h3" variant="h3" className="text-base sm:text-lg font-bold text-slate-950">
              Software, AI & Bigger Problems
            </Heading>
          </div>

          <Text variant="bodySm" tone="secondary" className="text-sm text-slate-700 leading-relaxed font-normal mb-3">
            {aboutData.longTermAmbition}
          </Text>

          <p className="text-xs font-mono text-slate-500 pt-1 border-t border-slate-200/60">
            Currently exploring structured LLM workflows, API design, and practical systems engineering.
          </p>
        </div>
      </div>

      {/* 3b. Mobile: Vertical Interactive Sequence (Level 2) */}
      <div className="md:hidden space-y-4 mb-8">
        {aboutLenses.map((lens) => {
          const isActive = activeLensId === lens.id
          return (
            <div
              key={lens.id}
              className={`rounded-xl border transition-all duration-200 ${
                isActive ? 'border-slate-900 bg-white shadow-md' : 'border-slate-200/80 bg-white/70'
              }`}
            >
              <button
                type="button"
                onClick={() => setActiveLensId(lens.id)}
                className="w-full text-left p-4 flex items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded-xl"
              >
                <div>
                  <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block">
                    {lens.indexLabel}
                  </span>
                  <span className="font-bold text-slate-950 text-base block mt-0.5">
                    {lens.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-xs font-mono px-2.5 py-0.5 rounded-full ${
                      isActive ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isActive ? 'Active' : 'Tap to View'}
                  </span>
                </div>
              </button>

              {isActive && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-200/70 text-sm text-slate-700 space-y-3">
                  {lens.id === 'building-toward' && (
                    <Text variant="bodySm" tone="secondary" className="text-sm leading-relaxed">
                      {aboutData.intro}
                    </Text>
                  )}
                  {lens.id === 'how-i-learn' && (
                    <div className="space-y-2 text-sm leading-relaxed">
                      {aboutData.storyParagraphs.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>
                  )}
                  {lens.id === 'whats-next' && (
                    <Text variant="bodySm" tone="secondary" className="text-sm leading-relaxed">
                      {aboutData.longTermAmbition}
                    </Text>
                  )}

                  {/* Inline Mobile Evidence */}
                  <div className="pt-3 border-t border-slate-200/80 space-y-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-semibold block">
                      {lens.evidenceLabel}
                    </span>
                    {lens.evidenceItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-white rounded-lg border border-slate-200 space-y-1.5 shadow-xs"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono uppercase text-slate-500 font-medium">
                            {item.badge}
                          </span>
                          {item.status && (
                            <span className="text-[10px] font-mono text-slate-400">
                              {item.status}
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-sm text-slate-950">{item.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{item.relevance}</p>
                        <div className="pt-1">
                          {item.projectSlug ? (
                            <Link
                              to={`/projects/${item.projectSlug}`}
                              onClick={(e) => handleEvidenceClick(e, item.projectSlug, item.anchorHref)}
                              className="inline-flex items-center gap-1 text-xs font-mono font-medium text-slate-900"
                            >
                              <span>{item.linkText}</span>
                              <Icon name="arrow-right" size="xs" />
                            </Link>
                          ) : item.anchorHref ? (
                            <a
                              href={item.anchorHref}
                              onClick={(e) => handleEvidenceClick(e, undefined, item.anchorHref)}
                              className="inline-flex items-center gap-1 text-xs font-mono font-medium text-slate-900"
                            >
                              <span>{item.linkText}</span>
                              <Icon name="arrow-right" size="xs" />
                            </a>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 4. Desktop: Evidence Relationship Layer (Level 3 - "WHERE THIS SHOWS UP" / "SEE IT IN THE WORK") */}
      <div
        id="about-evidence-panel"
        role="tabpanel"
        aria-labelledby={`lens-tab-${activeLensId}`}
        className="hidden md:block rounded-2xl border border-slate-200/90 bg-slate-50/50 p-6 lg:p-8 shadow-xs"
      >
        {/* Evidence Visual Relationship Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-200/80">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-slate-950 text-white font-mono text-[10px] uppercase font-semibold tracking-wider shadow-xs">
              {activeLens.evidenceLabel}
            </span>
            <span className="text-slate-300 font-mono text-xs">→</span>
            <span className="text-xs font-mono font-semibold text-slate-900">
              {activeLens.indexLabel} : {activeLens.title}
            </span>
          </div>

          <span className="text-xs font-mono text-slate-500">
            {activeLens.evidenceSubtext}
          </span>
        </div>

        {/* Evidence Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {activeLens.evidenceItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between p-5 bg-white rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 hover:-translate-y-0.5 motion-reduce:transform-none group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge
                    variant={
                      activeLensId === 'how-i-learn'
                        ? 'neutral'
                        : activeLensId === 'whats-next'
                          ? 'subtle'
                          : 'lavender'
                    }
                    size="sm"
                    className="font-mono tracking-wide text-[11px]"
                  >
                    {item.badge}
                  </Badge>
                  {item.status && (
                    <span className="text-[10px] font-mono text-slate-400 font-medium">
                      {item.status}
                    </span>
                  )}
                </div>

                {item.groundingLabel && (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    {item.groundingLabel}
                  </span>
                )}

                <Heading
                  as="h4"
                  variant="h3"
                  className="text-base font-bold text-slate-950 mb-2 group-hover:text-slate-700 transition-colors"
                >
                  {item.title}
                </Heading>

                <Text
                  variant="bodySm"
                  tone="secondary"
                  className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-normal"
                >
                  {item.relevance}
                </Text>
              </div>

              <div className="pt-3 border-t border-slate-100 mt-2">
                {item.projectSlug ? (
                  <Link
                    to={`/projects/${item.projectSlug}`}
                    onClick={(e) => handleEvidenceClick(e, item.projectSlug, item.anchorHref)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-900 group-hover:text-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded-xs"
                  >
                    <span>{item.linkText}</span>
                    <Icon
                      name="arrow-right"
                      size="xs"
                      className="transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
                    />
                  </Link>
                ) : item.anchorHref ? (
                  <a
                    href={item.anchorHref}
                    onClick={(e) => handleEvidenceClick(e, undefined, item.anchorHref)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-900 group-hover:text-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded-xs"
                  >
                    <span>{item.linkText}</span>
                    <Icon
                      name="arrow-right"
                      size="xs"
                      className="transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
                    />
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Understated Personal Identity Note (Level 4) */}
      <div className="mt-12 pt-6 border-t border-slate-200/80">
        {profileUrl ? (
          <div
            data-testid="about-portrait-image"
            className="flex items-center gap-4 p-4 rounded-xl bg-white/90 border border-slate-200/80 shadow-xs max-w-md"
          >
            <img
              src={profileUrl}
              alt={aboutData.portrait.alt}
              className="w-12 h-12 rounded-lg object-cover border border-slate-200 shadow-xs"
              loading="lazy"
            />
            <div className="text-xs font-mono">
              <span className="font-semibold text-slate-900 block">{siteProfile.name}</span>
              <span className="text-slate-500 block">{aboutData.portrait.caption}</span>
            </div>
          </div>
        ) : (
          <div
            data-testid="about-portrait-placeholder"
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-4 rounded-xl bg-white/90 border border-slate-200/80 shadow-xs text-xs font-mono text-slate-600 transition-colors duration-200 hover:border-slate-300 hover:bg-white"
          >
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]" aria-hidden="true" />
              <span className="font-semibold text-slate-900">{siteProfile.name}</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-700">Student Developer based in Gurgaon, India</span>
              <span className="hidden sm:inline text-slate-300">·</span>
              <span className="text-[11px] text-slate-500">
                Currently exploring: {aboutData.learningFocus.topics.join(' · ')}
              </span>
            </div>

            <span className="text-[11px] text-slate-500 shrink-0">
              Computer Science & Engineering · The NorthCap University
            </span>
          </div>
        )}
      </div>
    </Section>
  )
}
