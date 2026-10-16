import { useState, useEffect } from 'react'
import {
  Badge,
  Button,
  Card,
  Container,
  Heading,
  Icon,
  PerspectiveSwitcher,
  ProjectEvidenceFallback,
  Section,
  Text,
} from '@/components'
import { ProjectShelf } from '@/components/projects'
import {
  getFeaturedProjects,
  getRoboticsTrackProject,
  projects,
} from '@/data'
import { Link, useRouter } from '@/router'

export function ProjectsPage() {
  const { navigate } = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    document.title = 'Project Universe — Naman Prajapati'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const canonicalProjects = getFeaturedProjects()
  const flagshipProjects = canonicalProjects.filter((p) => p.flagship)
  const canonicalRemainingProjects = canonicalProjects.filter((p) => !p.flagship)
  const nidarProject = getRoboticsTrackProject()

  const filteredProjects =
    selectedCategory === 'all'
      ? canonicalProjects
      : canonicalProjects.filter((p) => p.category === selectedCategory)

  const categoryDetails: Record<
    string,
    { title: string; subtitle: string; badge: string }
  > = {
    'web-platform': {
      title: 'Web Platforms & Real-Time Architectures',
      subtitle:
        'Collaborative canvases, distributed coordination systems, and state synchronization pipelines.',
      badge: 'Web Systems',
    },
    'systems-ai': {
      title: 'Systems & Practical AI Implementations',
      subtitle:
        'Deterministic evaluation pipelines, structured LLM extraction, and API integrations.',
      badge: 'AI & Systems',
    },
    'developer-tools': {
      title: 'Developer Tooling & Vector Engines',
      subtitle:
        'Local-first rendering canvas, testing harnesses, and foundational data structures.',
      badge: 'Developer Tools',
    },
  }

  return (
    <div className="py-8 sm:py-12 space-y-12 animate-fade-in">
      {/* 1. Header & Navigation Context */}
      <Container size="lg">
        <div className="border-b border-neutral-200/80 pb-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-slate-950 px-3 py-1 rounded-full bg-slate-100/90 hover:bg-slate-200/90 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900 shadow-xs"
            >
              <Icon name="arrow-left" size="xs" />
              <span>Back to Home</span>
            </Link>

            <span className="text-xs font-mono text-neutral-400">
              {projects.length} Total Systems Documented
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 w-full min-w-0">
            <div className="w-full min-w-0 md:max-w-2xl">
              <Text
                variant="caption"
                tone="muted"
                className="font-mono uppercase tracking-wider mb-2"
              >
                PROJECT UNIVERSE
              </Text>
              <Heading as="h1" variant="display" className="tracking-tight text-neutral-950 font-bold mb-3">
                Featured Engineering & Systems
              </Heading>
              <Text variant="lead" tone="secondary" className="text-sm sm:text-base leading-relaxed max-w-xl">
                Full-stack platforms, practical AI integrations, and developer tools built with TypeScript, Python, and C/C++. Explore architectures, system constraints, and technical case studies.
              </Text>
            </div>

            {/* Audience Perspective Lens Switcher */}
            <div className="shrink-0 pt-2 md:pt-0">
              <PerspectiveSwitcher variant="inline" />
            </div>
          </div>
        </div>
      </Container>

      {/* 2. Main Project Shelves & Filters */}
      <Container size="lg">
        <Section id="projects-content" spacing="none" reveal>
          {/* Category Filter Discovery Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-neutral-200/80">
            {[
              { label: 'All Projects', value: 'all', count: canonicalProjects.length },
              {
                label: 'Web Platforms',
                value: 'web-platform',
                count: canonicalProjects.filter((p) => p.category === 'web-platform').length,
              },
              {
                label: 'Systems & AI',
                value: 'systems-ai',
                count: canonicalProjects.filter((p) => p.category === 'systems-ai').length,
              },
              {
                label: 'Developer Tools',
                value: 'developer-tools',
                count: canonicalProjects.filter((p) => p.category === 'developer-tools').length,
              },
            ].map((cat) => {
              const isActive = selectedCategory === cat.value
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 ${
                    isActive
                      ? 'bg-neutral-950 text-white shadow-xs'
                      : 'bg-white/95 text-slate-600 hover:text-slate-950 hover:bg-slate-50 border border-slate-200/90 shadow-xs'
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

      {/* 3. Dedicated Track: Robotics & Autonomous Systems */}
      {nidarProject && (
        <Container size="lg">
          <Section id="robotics" spacing="lg" bordered reveal>
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
                          className="hover:text-neutral-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-xs"
                        >
                          {nidarProject.title}
                        </Link>
                      </Heading>
                      <Text variant="lead" tone="secondary" className="text-sm font-mono text-neutral-500 mb-4">
                        {nidarProject.tagline}
                      </Text>
                    </div>

                    <Text variant="body" tone="secondary" className="leading-relaxed text-sm sm:text-base">
                      {nidarProject.summary}
                    </Text>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {nidarProject.technologies.map((tech) => (
                        <Badge key={tech} variant="subtle" size="sm" className="font-mono text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Row */}
                    <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <Link to={`/projects/${nidarProject.slug}`} className="w-full sm:w-auto">
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

      {/* 4. Cross-Navigation Footer Links */}
      <Container size="lg">
        <div className="border-t border-neutral-200/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/#how-i-build"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-600 hover:text-neutral-950 transition-colors"
          >
            <span>See how these systems are built: Engineering Judgement</span>
            <Icon name="arrow-right" size="xs" />
          </Link>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/#contact')}
            rightIcon={<Icon name="arrow-right" size="xs" />}
          >
            Discuss a Project
          </Button>
        </div>
      </Container>
    </div>
  )
}
