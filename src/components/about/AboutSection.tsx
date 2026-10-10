import { Badge } from '@/components/common/Badge'
import { Card } from '@/components/common/Card'
import { Heading } from '@/components/common/Heading'
import { Section } from '@/components/common/Section'
import { Text } from '@/components/common/Text'
import { aboutData, siteProfile, technicalCapabilities } from '@/data'
import { resolveSafeAssetUrl } from '@/utils'

export interface AboutSectionProps {
  className?: string
}

/**
 * Editorial About Section presenting personal narrative, engineering judgment,
 * verified capability groups, and asset-resolved portrait with graceful fallback.
 *
 * Grounded strictly in confirmed personal themes:
 * - CSE (AI & ML) at The NorthCap University to understand systems and turn ideas into products
 * - Investigative approach: inspecting existing code and root causes before modifying systems
 * - Disciplined validation using automated tests and actual application behavior
 * - Current learning areas: Python, Java, SQL, databases, AI/ML, and embedded systems
 * - Long-term ambition: building enduring products and technology ventures
 */
export function AboutSection({ className = '' }: AboutSectionProps) {
  const profileUrl = resolveSafeAssetUrl(aboutData.portrait.assetFilename)

  return (
    <Section id="about" spacing="lg" bordered className={className}>
      {/* Section Header */}
      <div className="w-full max-w-3xl min-w-0 mb-10">
        <div className="inline-flex items-center mb-3">
          <Badge variant="lavender" size="sm" className="font-mono tracking-wider text-[10px]">
            {aboutData.badge}
          </Badge>
        </div>
        <Heading as="h2" variant="h1" className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-950 mb-3">
          {aboutData.heading}
        </Heading>
        <Text variant="lead" tone="secondary" className="text-neutral-600 leading-relaxed text-sm sm:text-base">
          {aboutData.subheading}
        </Text>
      </div>

      {/* Editorial Two-Column Layout: Story on Left, Portrait Slot on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-14">
        {/* Left Column: First-Person Personal Narrative */}
        <div className="lg:col-span-8 space-y-5">
          <div className="p-4 sm:p-5 rounded-sm bg-neutral-50/80 border border-neutral-200/90 text-neutral-800 text-sm sm:text-base leading-relaxed font-sans font-medium">
            {aboutData.intro}
          </div>

          <div className="space-y-4 text-neutral-600 text-sm leading-relaxed">
            {aboutData.storyParagraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Current Learning Focus */}
          <div className="pt-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-2 font-semibold">
              {aboutData.learningFocus.label}
            </span>
            <div className="flex flex-wrap gap-2">
              {aboutData.learningFocus.topics.map((topic) => (
                <span
                  key={topic}
                  className="px-2.5 py-1 text-xs font-mono font-medium bg-white text-neutral-800 border border-neutral-200 rounded-xs shadow-micro"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Long-Term Venture Ambition Box */}
          <div className="p-4 rounded-sm border-l-2 border-lavender-600 bg-lavender-50/50 border-neutral-200/80 text-xs sm:text-sm text-neutral-700 leading-normal">
            <span className="font-mono text-[10px] uppercase tracking-wider text-lavender-700 block mb-1 font-semibold">
              Long-Term Ambition
            </span>
            {aboutData.longTermAmbition}
          </div>
        </div>

        {/* Right Column: Portrait Slot with Automatic Asset Resolution & NP Placeholder */}
        <div className="lg:col-span-4 w-full">
          {profileUrl ? (
            <div
              data-testid="about-portrait-image"
              className="relative aspect-4/5 w-full max-w-sm mx-auto rounded-sm overflow-hidden border border-neutral-300 shadow-subtle bg-neutral-100 group"
            >
              <img
                src={profileUrl}
                alt={aboutData.portrait.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-neutral-900/80 backdrop-blur-xs text-white text-[11px] font-mono">
                {aboutData.portrait.caption}
              </div>
            </div>
          ) : (
            <div
              data-testid="about-portrait-placeholder"
              className="relative aspect-4/5 w-full max-w-sm mx-auto rounded-sm border border-neutral-300 bg-linear-to-b from-neutral-50 via-white to-neutral-100/70 p-6 flex flex-col justify-between shadow-subtle select-none"
            >
              <div className="flex items-center justify-between border-b border-neutral-200/80 pb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                  Profile Portrait
                </span>
                <Badge variant="subtle" size="sm" className="font-mono text-[10px]">
                  PENDING CAPTURE
                </Badge>
              </div>

              <div className="my-auto flex flex-col items-center justify-center text-center space-y-3 py-6">
                <div className="w-20 h-20 rounded-sm bg-neutral-900 text-white flex items-center justify-center text-2xl font-bold font-mono shadow-micro ring-4 ring-neutral-100">
                  NP
                </div>
                <div>
                  <span className="text-sm font-bold text-neutral-950 block">
                    Naman Prajapati
                  </span>
                  <span className="text-xs text-neutral-500 font-mono block mt-0.5">
                    {siteProfile.title}
                  </span>
                </div>
              </div>

              <div className="border-t border-neutral-200/80 pt-3 text-center">
                <span className="text-[11px] font-mono text-neutral-600 block leading-tight font-medium">
                  The NorthCap University
                </span>
                <span className="text-[10px] text-neutral-400 font-mono block mt-0.5">
                  B.Tech CSE (AI & ML)
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Technical Capabilities: Meaningful Capability Groups */}
      <div className="pt-8 border-t border-neutral-200">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider mb-1 block">
              CAPABILITY LEDGER
            </Text>
            <Heading as="h3" variant="h3" className="text-lg sm:text-xl font-bold text-neutral-900">
              Verified Technical Proficiencies
            </Heading>
          </div>
          <Text variant="caption" tone="muted" className="text-xs font-mono max-w-md">
            Distinguishing actual project usage from ongoing academic learning.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {technicalCapabilities.map((group) => (
            <Card
              key={group.id}
              variant="outlined"
              padding="sm"
              className="bg-white border-neutral-200/90 shadow-micro space-y-3 hover:border-neutral-300 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 border-b border-neutral-100 pb-2">
                <Heading as="h4" variant="h4" className="text-sm font-semibold text-neutral-900">
                  {group.title}
                </Heading>
                <span className="text-[10px] font-mono text-neutral-400">
                  {group.technologies.length} Techs
                </span>
              </div>

              <Text variant="bodySm" tone="secondary" className="text-xs text-neutral-600 leading-normal">
                {group.description}
              </Text>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {group.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[11px] font-mono text-neutral-700 bg-neutral-100/90 border border-neutral-200/70 rounded-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-neutral-100 text-[11px] font-mono text-neutral-500">
                {group.projectEvidence}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}
