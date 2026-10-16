import {
  Badge,
  Button,
  Card,
  Heading,
  Icon,
  Section,
  Text,
} from '@/components'
import {
  getFeaturedProjects,
  getRoboticsTrackProject,
  projects,
} from '@/data'
import { Link } from '@/router'

export function ProjectGateway() {
  const canonicalProjects = getFeaturedProjects()
  const convia = canonicalProjects.find((p) => p.slug === 'convia')
  const resumetrices = canonicalProjects.find((p) => p.slug === 'resumetrices')
  const nidar = getRoboticsTrackProject()

  const previewProjects = [
    convia,
    resumetrices,
    nidar,
  ].filter(Boolean)

  return (
    <Section id="work" spacing="lg" bordered reveal>
      {/* Anchor alias for backward compatibility with #projects */}
      <div id="projects" className="scroll-mt-24" />

      {/* Gateway Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 w-full min-w-0">
        <div className="w-full min-w-0 md:max-w-2xl">
          <Text
            variant="caption"
            tone="muted"
            className="font-mono uppercase tracking-wider mb-2"
          >
            THE WORK
          </Text>
          <Heading as="h2" variant="h1" className="tracking-tight text-neutral-950 font-bold mb-2">
            Projects I&apos;ve built, explored, and learned from.
          </Heading>
          <Text variant="body" tone="secondary" className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-xl">
            Full-stack web platforms, practical AI integrations, developer tools, and embedded robotics systems. Each system reflects concrete architectural choices, trade-offs, and iterative implementation.
          </Text>
        </div>

        {/* Dynamic Telemetry Metric Strip */}
        <div className="shrink-0 flex flex-col sm:items-end gap-1 font-mono text-xs text-neutral-500">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100/90 border border-neutral-200/80 rounded-xs text-neutral-800 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            {projects.length} Total Systems Documented
          </span>
          <span className="text-[11px] text-neutral-400">
            3 Web Platforms · 3 AI Systems · 4 Tools & Tracks
          </span>
        </div>
      </div>

      {/* Compact Cinematic Preview Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {previewProjects.map((project) => {
          if (!project) return null
          const isFlagship = project.flagship

          return (
            <Card
              key={project.slug}
              as="article"
              variant="outlined"
              padding="sm"
              data-project-slug={project.slug}
              className="group relative flex flex-col justify-between bg-white hover:bg-neutral-50/60 border-neutral-200/90 hover:border-neutral-400/80 transition-all duration-200 shadow-micro hover:shadow-subtle hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge
                    variant={isFlagship ? 'accent' : 'subtle'}
                    size="sm"
                    className="font-mono text-[10px] tracking-wider uppercase"
                  >
                    {isFlagship ? 'Flagship Platform' : project.category.replace('-', ' ')}
                  </Badge>
                  <span className="text-[11px] font-mono text-neutral-400">
                    #{project.featuredRank || 'Track'}
                  </span>
                </div>

                <Heading as="h3" variant="h3" className="text-base font-bold text-neutral-950 mb-1 group-hover:text-neutral-700 transition-colors">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-xs"
                    aria-label={`View ${project.title} technical case study`}
                  >
                    {project.title}
                  </Link>
                </Heading>

                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-4">
                  {project.tagline}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2 text-xs font-mono">
                <span className="text-[11px] text-neutral-500 truncate">
                  {project.technologies.slice(0, 2).join(' · ')}
                </span>
                <Link
                  to={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1 text-neutral-900 hover:text-neutral-950 font-semibold text-[11px] shrink-0"
                >
                  <span>Case Study</span>
                  <Icon name="arrow-right" size="xs" className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Intentional Transition Portal CTA */}
      <div className="p-6 sm:p-8 rounded-md bg-linear-to-r from-neutral-950 via-neutral-900 to-neutral-950 text-white shadow-elevated border border-neutral-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-xs bg-white/10 text-white/90 text-[11px] font-mono uppercase tracking-wider">
              <span>Dedicated Exploration Environment</span>
            </div>
            <Heading as="h3" variant="h2" className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Explore the complete Project Universe
            </Heading>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              Discover all 10 software platforms, interactive data-flow architecture pipelines, live feature inspection sandboxes, and hardware telemetry case studies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <Link to="/projects">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<Icon name="arrow-right" size="sm" />}
                className="w-full sm:w-auto bg-white hover:bg-neutral-100 text-neutral-950 font-medium shadow-subtle cursor-pointer justify-center"
              >
                Explore Project Universe
              </Button>
            </Link>
            <span className="hidden xl:inline-block text-[11px] font-mono text-neutral-400">
              Press <kbd className="px-1.5 py-0.5 bg-neutral-800 text-neutral-200 rounded-xs border border-neutral-700">⌘K</kbd> + <kbd className="px-1.5 py-0.5 bg-neutral-800 text-neutral-200 rounded-xs border border-neutral-700">P</kbd>
            </span>
          </div>
        </div>
      </div>
    </Section>
  )
}
