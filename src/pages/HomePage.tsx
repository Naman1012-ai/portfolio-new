import {
  Badge,
  Button,
  Card,
  Container,
  GitHubIcon,
  Heading,
  Icon,
  InstagramIcon,
  LinkedInIcon,
  ResumeAction,
  Section,
  Text,
} from '@/components/common'
import { HeroCinematicComposition } from '@/components/hero'
import { AboutSection, CapabilityLedger } from '@/components/about'
import { HowIBuildSection } from '@/components/howIBuild'
import { ProjectGateway } from '@/components/projects'
import { ExperienceSection } from '@/components/experience'
import { CinematicIntro } from '@/components/intro'
import { siteProfile } from '@/data'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function HomePage() {
  useDocumentTitle(`${siteProfile.name} — ${siteProfile.title}`)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const emailLink = siteProfile.socialLinks.find((s) => s.platform === 'email')?.url || 'mailto:namanparjapati2007@gmail.com'
  const linkedinLink = siteProfile.socialLinks.find((s) => s.platform === 'linkedin')?.url || 'https://www.linkedin.com/in/naman-prajapati-46a942377/'
  const githubLink = siteProfile.socialLinks.find((s) => s.platform === 'github')?.url || 'https://github.com/Naman1012-ai'
  const instagramLink = siteProfile.socialLinks.find((s) => s.platform === 'instagram')?.url || 'https://www.instagram.com/namanprajapati_07'

  return (
    <>
      <CinematicIntro />
      <div className="py-8 sm:py-12 space-y-16 animate-fade-in">
        {/* 1. Hero Section: Split Composition (Narrative + Live Telemetry + 3D Composition) */}
        <Container size="lg">
        <Section id="hero" spacing="md" className="pt-4 sm:pt-6 overflow-hidden rounded-2xl bg-white/95 border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06),0_20px_48px_-12px_rgba(15,23,42,0.04)] backdrop-blur-md p-6 sm:p-8 lg:p-10 relative">
          {/* Subtle ambient highlight glow inside hero */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

          {/* Outer split grid: content left | composition right */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_44%] gap-8 lg:gap-12 items-center w-full relative z-10">

            {/* ── Left Column: editorial content ───────────────────────── */}
            <div className="flex flex-col items-start w-full min-w-0 relative z-10">
              {/* Status & Live Telemetry Strip */}
              <div className="flex flex-wrap items-center gap-2.5 mb-6 max-w-full animate-fade-in">
                <Badge variant="subtle" size="md" dot dotColor="bg-emerald-500" className="max-w-full text-left whitespace-normal shadow-xs">
                  <span className="leading-tight">
                    {siteProfile.status}
                  </span>
                </Badge>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-slate-600 bg-slate-50 border border-slate-200/80 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                  <span>Gurgaon, IN (IST) · Active Build Cycle</span>
                </span>
              </div>

              {/* Core Positioning Headline */}
              <Heading as="h1" variant="display" className="tracking-tight text-neutral-950 font-bold mb-6 animate-fade-in-up animation-delay-100">
                Building full-stack web platforms, practical AI tools, and systems prototypes.
              </Heading>

              {/* Concise Supporting Introduction */}
              <Text variant="lead" tone="secondary" className="max-w-2xl text-neutral-600 mb-8 leading-relaxed animate-fade-in-up animation-delay-200">
                Computer Science & Engineering undergraduate at The NorthCap University. Focused on end-to-end web architecture, structured LLM workflows, and test-validated software execution.
              </Text>

              {/* Calls to Action */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-1 w-full sm:w-auto animate-fade-in-up animation-delay-300">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<Icon name="arrow-down" size="sm" />}
                  onClick={() => scrollToSection('about')}
                  aria-label="Scroll to about section"
                  className="w-full sm:w-auto shrink-0 justify-center whitespace-nowrap"
                >
                  Explore Who I Am
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  rightIcon={<Icon name="arrow-right" size="sm" />}
                  onClick={() => scrollToSection('contact')}
                  aria-label="Scroll to contact section"
                  className="w-full sm:w-auto shrink-0 justify-center whitespace-nowrap"
                >
                  Get in Touch
                </Button>

                <ResumeAction variant="hero" className="inline-flex w-full sm:w-auto shrink-0" />
              </div>
            </div>{/* end left column */}

            {/* ── Right Column: cinematic visual composition (desktop) ───── */}
            <div className="relative w-full hidden lg:block animate-fade-in animation-delay-200">
              <HeroCinematicComposition />
            </div>

          </div>{/* end split grid */}

          {/* Mobile composition — below content, simplified static */}
          <div className="relative w-full mt-6 lg:hidden overflow-hidden rounded-xl animate-fade-in animation-delay-300">
            <HeroCinematicComposition />
          </div>
        </Section>
      </Container>

      {/* 2. About Section — Personal Narrative & Engineering Philosophy */}
      <Container size="lg">
        <AboutSection />
      </Container>

      {/* 3. Engineering Judgement — How I Build: Real Problems & Architectural Decisions */}
      <Container size="lg">
        <HowIBuildSection />
      </Container>

      {/* 4. Capability Ledger — Verified Technical Proficiencies */}
      <Container size="lg">
        <CapabilityLedger />
      </Container>

      {/* 5. The Work — Compact Project Universe Gateway */}
      <Container size="lg">
        <ProjectGateway />
      </Container>

      {/* 6. Experience, Academic Foundations & Verification Records */}
      <Container size="lg">
        <ExperienceSection />
      </Container>

      {/* 7. Purposeful Closing CTA & Contact Section */}
      <Container size="lg">
        <Section id="contact" spacing="lg" reveal>
          <Card
            variant="elevated"
            padding="lg"
            className="border-slate-200/80 bg-gradient-to-b from-white via-white to-slate-50/80 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06),0_20px_48px_-12px_rgba(15,23,42,0.04)] text-center max-w-3xl mx-auto rounded-2xl"
          >
            <div className="inline-flex items-center mb-3">
              <Badge variant="accent" size="sm">
                GET IN TOUCH
              </Badge>
            </div>

            <Heading as="h2" variant="h2" className="text-2xl sm:text-3xl font-bold text-slate-950 mb-3 tracking-tight">
              Let&apos;s talk about what you&apos;re building.
            </Heading>

            <Text variant="body" tone="secondary" className="max-w-xl mx-auto mb-8 text-slate-600 leading-relaxed text-sm sm:text-base">
              I&apos;m looking for software engineering internships and open to collaborating on product and AI projects. Email is the fastest way to reach me.
            </Text>

            {/* Primary Contact Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 w-full">
              <a href={emailLink} className="w-full sm:w-auto">
                <Button variant="primary" size="lg" leftIcon={<Icon name="mail" size="sm" />} className="w-full sm:w-auto justify-center">
                  Send Email
                </Button>
              </a>

              <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" leftIcon={<LinkedInIcon size="sm" brandColor />} className="w-full sm:w-auto justify-center">
                  Connect on LinkedIn
                </Button>
              </a>

              <ResumeAction variant="contact" />
            </div>

            {/* Secondary Social Channels */}
            <div className="pt-6 border-t border-slate-200/80 flex items-center justify-center gap-3 sm:gap-4">
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in new tab)"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-100/90 rounded-full border border-slate-200/90 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 shadow-xs"
              >
                <GitHubIcon size="sm" brandColor />
                <span>GitHub</span>
              </a>

              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile (opens in new tab)"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100/80 rounded-sm border border-neutral-200/90 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
              >
                <InstagramIcon size="sm" brandColor />
                <span>Instagram</span>
              </a>
            </div>
          </Card>
        </Section>
      </Container>
    </div>
    </>
  )
}
