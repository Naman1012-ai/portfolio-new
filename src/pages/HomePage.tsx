import { useState } from 'react'
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
  ProjectEvidenceFallback,
  ResumeAction,
  Section,
  Text,
} from '@/components/common'
import { AboutSection } from '@/components/about'
import { HowIBuildSection } from '@/components/howIBuild'
import { ExperienceSection } from '@/components/experience'
import { ProjectShelf } from '@/components/projects'
import {
  getFeaturedProjects,
  getRoboticsTrackProject,
  siteProfile,
} from '@/data'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { Link } from '@/router'

export function HomePage() {
  useDocumentTitle('Naman Prajapati — Software Engineer & Systems Builder')

  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const projects = getFeaturedProjects()
  const flagshipProjects = projects.filter((p) => p.flagship)
  const canonicalRemainingProjects = projects.filter((p) => !p.flagship)
  const nidarProject = getRoboticsTrackProject()

  const categoryDetails: Record<string, { title: string; subtitle: string; badge: string }> = {
    'web-platform': {
      title: 'Web Platforms',
      subtitle: 'Flagship full-stack collaborative workspaces and responsive healthcare prototypes.',
      badge: 'Web Architecture',
    },
    'systems-ai': {
      title: 'Systems & Practical AI',
      subtitle: 'Machine learning competency evaluation, geopolitical risk modeling, and async backend services.',
      badge: 'Systems & AI',
    },
    'developer-tools': {
      title: 'Developer Tooling & Terminal Utilities',
      subtitle: 'Client-side document parsing, timed ANSI C test suites, and object-oriented domain engines.',
      badge: 'Developer Tools',
    },
  }

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

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
    <div className="py-8 sm:py-12 md:py-16">
      {/* 1. Hero Section */}
      <Container size="lg">
        <Section id="hero" spacing="md" className="pt-2 sm:pt-4">
          <div className="flex flex-col items-start w-full max-w-4xl min-w-0">
            {/* Status Indicator */}
            <div className="inline-flex items-center mb-6 max-w-full animate-fade-in">
              <Badge variant="subtle" size="md" dot dotColor="bg-emerald-500" className="max-w-full text-left whitespace-normal shadow-micro">
                <span className="leading-tight">
                  {siteProfile.status}
                </span>
              </Badge>
            </div>

            {/* Core Positioning Headline */}
            <Heading as="h1" variant="display" className="tracking-tight text-neutral-950 font-bold mb-6 animate-fade-in-up animation-delay-100">
              Product-minded engineer building at the intersection of software and AI.
            </Heading>

            {/* Concise Supporting Introduction */}
            <Text variant="lead" tone="secondary" className="max-w-2xl text-neutral-600 mb-8 leading-relaxed animate-fade-in-up animation-delay-200">
              Computer Science & Engineering undergraduate at The NorthCap University specializing in
              full-stack web platforms, practical AI systems, and embedded prototyping.
            </Text>

            {/* Calls to Action */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1 w-full sm:w-auto animate-fade-in-up animation-delay-300">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<Icon name="arrow-down" size="sm" />}
                onClick={() => scrollToSection('projects')}
                aria-label="Scroll to featured projects section"
                className="w-full sm:w-auto justify-center"
              >
                Explore Selected Work
              </Button>

              <Button
                variant="secondary"
                size="lg"
                rightIcon={<Icon name="arrow-right" size="sm" />}
                onClick={() => scrollToSection('contact')}
                aria-label="Scroll to contact section"
                className="w-full sm:w-auto justify-center"
              >
                Get in Touch
              </Button>

              <ResumeAction variant="hero" />
            </div>

            {/* Engineering Capabilities Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-12 pt-8 border-t border-neutral-200 animate-fade-in-up animation-delay-400">
              <div className="p-3 -m-3 rounded-sm border border-transparent hover:border-neutral-200/80 hover:bg-neutral-50/50 transition-all duration-200 space-y-1">
                <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider text-[11px]">
                  01 / Web & Products
                </Text>
                <Heading as="h4" variant="h4" className="text-sm font-semibold text-neutral-900">
                  Software & Products
                </Heading>
                <Text variant="bodySm" tone="secondary" className="text-xs text-neutral-600 leading-normal">
                  React 19, TypeScript, Next.js, and accessible Tailwind UI applications.
                </Text>
              </div>

              <div className="p-3 -m-3 rounded-sm border border-transparent hover:border-neutral-200/80 hover:bg-neutral-50/50 transition-all duration-200 space-y-1">
                <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider text-[11px]">
                  02 / Practical AI
                </Text>
                <Heading as="h4" variant="h4" className="text-sm font-semibold text-neutral-900">
                  AI-Assisted Tools
                </Heading>
                <Text variant="bodySm" tone="secondary" className="text-xs text-neutral-600 leading-normal">
                  Gemini API integrations, prompt orchestration, and resume scoring.
                </Text>
              </div>

              <div className="p-3 -m-3 rounded-sm border border-transparent hover:border-neutral-200/80 hover:bg-neutral-50/50 transition-all duration-200 space-y-1">
                <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider text-[11px]">
                  03 / Backends & Data
                </Text>
                <Heading as="h4" variant="h4" className="text-sm font-semibold text-neutral-900">
                  Backend & Data Systems
                </Heading>
                <Text variant="bodySm" tone="secondary" className="text-xs text-neutral-600 leading-normal">
                  Python/FastAPI services, Node/Express, relational schemas, and C/C++ I/O.
                </Text>
              </div>

              <div className="p-3 -m-3 rounded-sm border border-transparent hover:border-neutral-200/80 hover:bg-neutral-50/50 transition-all duration-200 space-y-1">
                <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider text-[11px]">
                  04 / Systems Exploration
                </Text>
                <Heading as="h4" variant="h4" className="text-sm font-semibold text-neutral-900">
                  Embedded Prototypes
                </Heading>
                <Text variant="bodySm" tone="secondary" className="text-xs text-neutral-600 leading-normal">
                  RP2040 firmware and ELRS/CRSF telemetry bench-tested with university peers.
                </Text>
              </div>
            </div>
          </div>
        </Section>
      </Container>

      {/* 1.5. About Section */}
      <Container size="lg">
        <AboutSection />
      </Container>

      {/* 2. Selected Projects Section — Netflix-Inspired Project Shelves */}
      <Container size="lg">
        <Section id="projects" spacing="lg" bordered>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 w-full min-w-0">
            <div className="w-full min-w-0 md:max-w-xl">
              <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider mb-2">
                PROJECT UNIVERSE
              </Text>
              <Heading as="h2" variant="h1">
                Featured Engineering & Systems
              </Heading>
            </div>
            <Text variant="bodySm" tone="secondary" className="w-full min-w-0 md:max-w-md text-xs sm:text-sm">
              Cinematic horizontal shelves featuring verified web platforms, systems analytics, and developer tooling in canonical sequence.
            </Text>
          </div>

          {/* Category Filter Discovery Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-neutral-200/80">
            {[
              { label: 'All Projects', value: 'all', count: projects.length },
              {
                label: 'Web Platforms',
                value: 'web-platform',
                count: projects.filter((p) => p.category === 'web-platform').length,
              },
              {
                label: 'Systems & AI',
                value: 'systems-ai',
                count: projects.filter((p) => p.category === 'systems-ai').length,
              },
              {
                label: 'Developer Tools',
                value: 'developer-tools',
                count: projects.filter((p) => p.category === 'developer-tools').length,
              },
            ].map((cat) => {
              const isActive = selectedCategory === cat.value
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-mono font-medium transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-micro'
                      : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300 hover:text-neutral-900'
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-xs text-[10px] ${
                      isActive ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Shelves Layout Hierarchy */}
          {selectedCategory === 'all' ? (
            <div className="space-y-12">
              {/* Shelf 1: Featured Projects (Flagships: Convia & BioLynk) */}
              <ProjectShelf
                id="featured"
                title="Featured Projects"
                subtitle="Flagship web platforms anchoring full-stack architecture, donor coordination, and real-time workflows."
                badgeText="Flagships"
                badgeVariant="lavender"
                projects={flagshipProjects}
                cardVariant="flagship"
              />

              {/* Shelf 2: All Projects (Canonical sequence #3 through #9) */}
              <ProjectShelf
                id="all-projects"
                title="All Projects"
                subtitle="Systems analytics, developer tooling, and algorithmic prototypes in exact canonical sequence."
                badgeText="Core Systems"
                badgeVariant="neutral"
                projects={canonicalRemainingProjects}
                cardVariant="standard"
              />
            </div>
          ) : (
            <div className="space-y-8">
              <ProjectShelf
                id={`category-${selectedCategory}`}
                title={categoryDetails[selectedCategory]?.title || 'Filtered Projects'}
                subtitle={categoryDetails[selectedCategory]?.subtitle}
                badgeText={categoryDetails[selectedCategory]?.badge || 'Filtered'}
                badgeVariant="subtle"
                projects={filteredProjects}
                cardVariant={selectedCategory === 'web-platform' ? 'flagship' : 'standard'}
              />

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer py-1.5 px-3 rounded-xs border border-neutral-200 bg-white hover:bg-neutral-50 shadow-micro focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                >
                  <span>View All Shelves (9 Projects)</span>
                  <Icon name="arrow-right" size="xs" />
                </button>
              </div>
            </div>
          )}
        </Section>
      </Container>

      {/* 2.5. Dedicated Track: Robotics & Autonomous Systems */}
      {nidarProject && (
        <Container size="lg">
          <Section id="robotics" spacing="lg" bordered>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 w-full min-w-0">
              <div className="w-full min-w-0 md:max-w-xl">
                <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider mb-2">
                  SPECIALIZED RESEARCH TRACK
                </Text>
                <Heading as="h2" variant="h1">
                  Robotics & Autonomous Systems
                </Heading>
              </div>
              <Text variant="bodySm" tone="secondary" className="w-full min-w-0 md:max-w-md text-xs sm:text-sm">
                Ongoing team research and bench hardware prototyping conducted with engineering peers at The NorthCap University, maintained separately from the primary software portfolio.
              </Text>
            </div>

            <Card
              as="article"
              variant="outlined"
              padding="none"
              className="group overflow-hidden border-neutral-300/90 bg-linear-to-b from-white via-neutral-50/30 to-neutral-100/40 shadow-subtle hover:shadow-cinematic hover:border-neutral-400/80 transition-all duration-300 ease-out hover:-translate-y-0.5 motion-reduce:transform-none"
            >
              <div className="p-6 sm:p-8 md:p-10">
                {/* Top Metadata Strip */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="subtle" size="sm" className="font-mono tracking-wide">
                      STANDALONE TRACK
                    </Badge>
                    <Badge variant="neutral" size="sm" dot dotColor="bg-amber-500">
                      PROTOTYPE · BENCH TESTING
                    </Badge>
                    <Badge variant="outline" size="sm">
                      TEAM RESEARCH
                    </Badge>
                  </div>
                  <span className="text-xs font-mono text-neutral-500">
                    Role: {nidarProject.role}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Details & Narrative (7 cols) */}
                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <Heading as="h3" variant="h2" className="text-xl sm:text-2xl font-bold mb-1">
                        <Link
                          to={`/projects/${nidarProject.slug}`}
                          className="hover:text-neutral-700 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-xs"
                        >
                          {nidarProject.title}
                        </Link>
                      </Heading>
                      <Text variant="bodySm" tone="secondary" className="font-medium text-neutral-700">
                        {nidarProject.tagline}
                      </Text>
                    </div>

                    <Text variant="body" tone="secondary" className="text-neutral-700 leading-relaxed text-sm sm:text-base">
                      {nidarProject.summary}
                    </Text>

                    <Text variant="bodySm" tone="muted" className="leading-relaxed">
                      {nidarProject.description}
                    </Text>

                    {/* Team & Hardware Context Strip */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-white/90 rounded-sm border border-neutral-200/90 text-xs font-mono">
                      <div>
                        <span className="text-[10px] uppercase text-neutral-400 block mb-0.5">
                          Collaboration
                        </span>
                        <span className="text-neutral-800 font-medium font-sans text-xs">
                          {nidarProject.teamAttribution}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-neutral-400 block mb-0.5">
                          Validation Scope
                        </span>
                        <span className="text-neutral-800 font-medium font-sans text-xs">
                          Laboratory bench testing & telemetry signal decoding
                        </span>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="pt-2">
                      <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-2">
                        Technologies & Protocols
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {nidarProject.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs font-mono bg-neutral-100/90 text-neutral-700 border border-neutral-200/80 rounded-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <Link to={`/projects/${nidarProject.slug}`} className="inline-flex">
                        <Button
                          variant="primary"
                          size="md"
                          rightIcon={<Icon name="arrow-right" size="xs" />}
                          className="w-full sm:w-auto justify-center"
                        >
                          Explore Technical Case Study
                        </Button>
                      </Link>
                      <span className="text-xs font-mono text-neutral-500 flex items-center gap-1.5 self-center">
                        <Icon name="terminal" size="xs" className="opacity-60" />
                        Hardware prototype in bench testing
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Architectural Evidence Fallback Preview (5 cols) */}
                  <div className="lg:col-span-5 w-full">
                    <ProjectEvidenceFallback project={nidarProject} className="w-full" />
                    <div className="mt-3 p-3 bg-neutral-50 rounded-sm border border-neutral-200/70 text-xs text-neutral-500 font-mono space-y-1">
                      <div className="flex items-center justify-between">
                        <span>Research Status:</span>
                        <span className="text-amber-700 font-medium">Active Hardware Integration</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-neutral-400">
                        <span>Repository:</span>
                        <span>Institutional / Team Private</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Section>
        </Container>
      )}

      {/* 2.8. How I Build — Real Problems & Architectural Decisions */}
      <Container size="lg">
        <HowIBuildSection />
      </Container>

      {/* 3. Experience, Academic Foundations & Credential Ledger */}
      <Container size="lg">
        <ExperienceSection />
      </Container>

      {/* 4. Purposeful Closing CTA & Contact Section */}
      <Container size="lg">
        <Section id="contact" spacing="lg">
          <Card
            variant="elevated"
            padding="lg"
            className="border-neutral-300 bg-linear-to-b from-white to-neutral-50/80 shadow-md text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center mb-3">
              <Badge variant="accent" size="sm">
                GET IN TOUCH
              </Badge>
            </div>

            <Heading as="h2" variant="h2" className="text-2xl sm:text-3xl font-bold text-neutral-950 mb-3">
              Let&apos;s build something rigorous and impactful.
            </Heading>

            <Text variant="body" tone="secondary" className="max-w-xl mx-auto mb-8 text-neutral-600 leading-relaxed text-sm sm:text-base">
              Available for software engineering internships, technical collaborations, and ambitious systems engineering projects. Feel free to reach out directly.
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
            <div className="pt-6 border-t border-neutral-200/80 flex items-center justify-center gap-3 sm:gap-4">
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in new tab)"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100/80 rounded-sm border border-neutral-200/90 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
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
  )
}
