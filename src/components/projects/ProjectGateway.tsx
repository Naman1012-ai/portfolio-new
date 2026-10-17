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
          <Heading as="h2" variant="h1" className="tracking-tight text-slate-950 font-extrabold mb-2">
            Projects I&apos;ve built, explored, and learned from.
          </Heading>
          <Text variant="body" tone="secondary" className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
            Full-stack web platforms, practical AI integrations, developer tools, and embedded robotics systems. Each system reflects concrete architectural choices, trade-offs, and iterative implementation.
          </Text>
        </div>

        {/* Dynamic Telemetry Metric Strip */}
        <div className="shrink-0 flex flex-col sm:items-end gap-1 font-mono text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-800 font-semibold shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            {projects.length} Total Systems Documented
          </span>
          <span className="text-[11px] text-slate-500">
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
              className="group relative flex flex-col justify-between bg-white border-slate-200/90 hover:border-slate-300 transition-all duration-200 shadow-xs hover:shadow-elevated hover:-translate-y-0.5 rounded-2xl"
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
                  <span className="text-[11px] font-mono text-slate-500">
                    #{project.featuredRank || 'Track'}
                  </span>
                </div>

                <Heading as="h3" variant="h3" className="text-base font-bold text-slate-950 mb-1 group-hover:text-indigo-600 transition-colors">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xs"
                    aria-label={`View ${project.title} technical case study`}
                  >
                    {project.title}
                  </Link>
                </Heading>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {project.tagline}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs font-mono">
                <span className="text-[11px] text-slate-500 truncate">
                  {project.technologies.slice(0, 2).join(' · ')}
                </span>
                <Link
                  to={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-semibold text-[11px] shrink-0"
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
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-950 via-[#0d111c] to-slate-950 text-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] border border-indigo-500/30 ring-1 ring-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 text-indigo-300 text-[11px] font-mono uppercase tracking-wider border border-indigo-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              <span>Dedicated Exploration Environment</span>
            </div>
            <Heading as="h3" variant="h2" className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Explore the complete Project Universe
            </Heading>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Discover all 10 software platforms, interactive data-flow architecture pipelines, live feature inspection sandboxes, and hardware telemetry case studies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <Link to="/projects">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<Icon name="arrow-right" size="sm" />}
                className="w-full sm:w-auto font-medium cursor-pointer justify-center"
              >
                Explore Project Universe
              </Button>
            </Link>
            <span className="hidden xl:inline-block text-[11px] font-mono text-slate-400">
              Press <kbd className="px-1.5 py-0.5 bg-slate-800 text-slate-200 rounded-xs border border-slate-700">⌘K</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-800 text-slate-200 rounded-xs border border-slate-700">P</kbd>
            </span>
          </div>
        </div>
      </div>
    </Section>
  )
}
