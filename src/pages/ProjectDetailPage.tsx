import {
  Badge,
  Button,
  Card,
  Container,
  Heading,
  Icon,
  Section,
  Text,
  TextLink,
} from '@/components/common'
import { ProjectPreview } from '@/components/projects'
import { getAdjacentProjects, getFeaturedProjects, getProjectBySlug } from '@/data'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { Link, useRouter } from '@/router'

export interface ProjectDetailPageProps {
  slug?: string
}

/**
 * Reusable, data-driven Case Study template for portfolio projects.
 * Grounds every section strictly in verified codebase facts, technical architecture,
 * and genuine repository evidence without fabricated metrics or synthetic claims.
 */
export function ProjectDetailPage({ slug: propSlug }: ProjectDetailPageProps) {
  const { slug: routerSlug, navigate } = useRouter()
  const slug = propSlug || routerSlug || ''

  const project = getProjectBySlug(slug)
  const allProjects = getFeaturedProjects()

  useDocumentTitle(
    project
      ? `${project.title} — Case Study | Naman Prajapati`
      : 'Project Not Found | Naman Prajapati'
  )

  // 1. Not Found State
  if (!project) {
    return (
      <div className="py-16 sm:py-24">
        <Container size="md">
          <Card variant="outlined" padding="lg" className="text-center max-w-xl mx-auto space-y-6">
            <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-500">
              <Icon name="terminal" size="md" />
            </div>

            <div className="space-y-2">
              <Heading as="h1" variant="h2" className="text-2xl font-bold text-neutral-950">
                Project Not Found
              </Heading>
              <Text variant="body" tone="secondary" className="text-sm text-neutral-600">
                The project slug <code className="px-1.5 py-0.5 font-mono text-xs bg-neutral-100 rounded-xs text-neutral-800">{slug}</code> does not match any verified record in this portfolio.
              </Text>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                leftIcon={<Icon name="arrow-left" size="sm" />}
                onClick={() => navigate('/#projects')}
              >
                Return to All Projects
              </Button>
            </div>

            {/* Quick jump to verified projects */}
            <div className="pt-6 border-t border-neutral-200/80 text-left">
              <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider block mb-3 text-[11px]">
                Available Project Case Studies:
              </Text>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {allProjects.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/projects/${p.slug}`}
                    className="p-2 text-xs font-mono text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-xs transition-colors flex items-center justify-between"
                  >
                    <span>{p.title}</span>
                    <Icon name="arrow-right" size="xs" className="opacity-50" />
                  </Link>
                ))}
              </div>
            </div>
          </Card>
        </Container>
      </div>
    )
  }

  // 2. Verified Case Study State
  const { previous, next } = getAdjacentProjects(project.slug)
  const caseStudy = project.caseStudy
  const hasRepo = Boolean(project.links?.repo)
  const isTeam = project.teamProject && Boolean(project.teamAttribution)

  const maturityVariant =
    project.maturity === 'production'
      ? 'success'
      : project.maturity === 'completed'
        ? 'neutral'
        : 'subtle'

  const dotColor =
    project.maturity === 'production'
      ? 'bg-emerald-500'
      : project.maturity === 'completed'
        ? 'bg-neutral-600'
        : 'bg-amber-400'

  return (
    <article className="py-8 sm:py-12 md:py-16 animate-fade-in">
      <Container size="lg">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            to={project.track === 'robotics-autonomous' ? '/#robotics' : '/#projects'}
            className="group inline-flex items-center gap-2 text-xs font-mono font-medium text-neutral-600 hover:text-neutral-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-xs px-1 py-0.5"
            aria-label={project.track === 'robotics-autonomous' ? 'Back to Robotics & Autonomous Systems track' : 'Back to projects overview'}
          >
            <Icon name="arrow-left" size="xs" className="transition-transform duration-150 group-hover:-translate-x-0.5 motion-reduce:transform-none" />
            <span>{project.track === 'robotics-autonomous' ? 'Back to Robotics & Autonomous Systems' : 'Back to Project Universe'}</span>
          </Link>
        </div>

        {/* Case Study Header Section */}
        <Section id="overview" spacing="none" className="mb-12">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {project.featuredRank && (
              <Badge variant="accent" size="sm" className="shadow-micro">
                FEATURED #{project.featuredRank}
              </Badge>
            )}
            <Badge variant="subtle" size="sm">
              {project.category.replace('-', ' ').toUpperCase()}
            </Badge>
            <Badge variant={maturityVariant} size="sm" dot dotColor={dotColor}>
              {project.maturity.replace('-', ' ').toUpperCase()}
            </Badge>
            <Badge variant="outline" size="sm">
              {isTeam ? 'TEAM COLLABORATION' : 'INDIVIDUAL ENGINEERING'}
            </Badge>
          </div>

          {/* Project Title & Tagline */}
          <Heading as="h1" variant="display" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-950 mb-4">
            {project.title}
          </Heading>
          <Text variant="lead" tone="secondary" className="max-w-3xl text-neutral-700 leading-relaxed mb-8">
            {project.tagline}
          </Text>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 bg-white border border-neutral-200/90 rounded-md shadow-micro hover:border-neutral-300 transition-colors duration-200">
            <div>
              <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider text-[11px] block mb-1">
                Engineering Role
              </Text>
              <Text variant="bodySm" tone="primary" className="font-medium text-xs sm:text-sm">
                {project.role}
              </Text>
            </div>

            <div>
              <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider text-[11px] block mb-1">
                Project Maturity
              </Text>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${dotColor}`} aria-hidden="true" />
                <Text variant="bodySm" tone="primary" className="font-medium text-xs sm:text-sm capitalize">
                  {project.maturity.replace('-', ' ')}
                </Text>
              </div>
            </div>

            <div>
              <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider text-[11px] block mb-1">
                Attribution
              </Text>
              <Text variant="bodySm" tone="primary" className="font-medium text-xs sm:text-sm">
                {isTeam ? 'Collaborative Team' : 'Independent Project'}
              </Text>
            </div>

            <div>
              <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider text-[11px] block mb-1">
                Verified Codebase
              </Text>
              {hasRepo ? (
                <TextLink
                  href={project.links!.repo!}
                  external
                  showExternalIcon
                  variant="accent"
                  className="text-xs sm:text-sm font-medium"
                >
                  GitHub Repository
                </TextLink>
              ) : (
                <span className="text-xs font-mono text-neutral-500">
                  Local Implementation
                </span>
              )}
              {project.links?.live && (
                <div className="mt-1">
                  <TextLink
                    href={project.links.live}
                    external
                    showExternalIcon
                    variant="accent"
                    className="text-xs font-mono font-medium text-emerald-700 hover:text-emerald-900"
                  >
                    Live Deployment
                  </TextLink>
                </div>
              )}
            </div>
          </div>
        </Section>

        {/* Visual Evidence Showcase Frame — Cinematic Presentation */}
        <div className="mb-14">
          <div className="group/hero-preview rounded-md border border-neutral-300/90 overflow-hidden bg-neutral-950 shadow-subtle hover:shadow-cinematic transition-all duration-300">
            <ProjectPreview project={project} variant="case-study" />
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left 2 Columns: Core Narrative */}
          <div className="lg:col-span-2 space-y-12">
            {/* 1. Project Overview */}
            <section aria-labelledby="section-overview">
              <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider mb-2 block">
                01 / OVERVIEW
              </Text>
              <Heading as="h2" variant="h2" id="section-overview" className="text-2xl font-bold text-neutral-950 mb-4">
                Executive Summary
              </Heading>
              <Text variant="body" tone="secondary" className="leading-relaxed text-neutral-700 text-base">
                {caseStudy?.overview || project.summary}
              </Text>
            </section>

            {/* 2. Problem & Real-World Context */}
            {caseStudy?.problemContext && (
              <section aria-labelledby="section-problem">
                <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider mb-2 block">
                  02 / PROBLEM & CONTEXT
                </Text>
                <Heading as="h2" variant="h2" id="section-problem" className="text-2xl font-bold text-neutral-950 mb-4">
                  The Problem Space
                </Heading>
                <Text variant="body" tone="secondary" className="leading-relaxed text-neutral-700 text-base">
                  {caseStudy.problemContext}
                </Text>
              </section>
            )}

            {/* 3. Technical Architecture & Approach */}
            {(caseStudy?.approachArchitecture || project.description) && (
              <section aria-labelledby="section-approach">
                <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider mb-2 block">
                  03 / ARCHITECTURE & APPROACH
                </Text>
                <Heading as="h2" variant="h2" id="section-approach" className="text-2xl font-bold text-neutral-950 mb-4">
                  Engineering Architecture
                </Heading>
                <Text variant="body" tone="secondary" className="leading-relaxed text-neutral-700 text-base mb-4">
                  {caseStudy?.approachArchitecture || project.description}
                </Text>
              </section>
            )}

            {/* 4. Core Capabilities & Implemented Features */}
            {caseStudy?.keyFeatures && caseStudy.keyFeatures.length > 0 && (
              <section aria-labelledby="section-features">
                <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider mb-2 block">
                  04 / CAPABILITIES
                </Text>
                <Heading as="h2" variant="h2" id="section-features" className="text-2xl font-bold text-neutral-950 mb-6">
                  Core Implementation Features
                </Heading>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {caseStudy.keyFeatures.map((feature, idx) => (
                    <Card key={idx} variant="outlined" padding="sm" className="space-y-1.5 bg-neutral-50/60">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0" aria-hidden="true" />
                        <Text variant="caption" tone="muted" className="font-mono text-[11px] uppercase tracking-wider">
                          Feature 0{idx + 1}
                        </Text>
                      </div>
                      <Text variant="bodySm" tone="primary" className="text-xs sm:text-sm font-medium text-neutral-800 leading-normal">
                        {feature}
                      </Text>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* 5. Verification & Testing Rigor */}
            {caseStudy?.verificationTesting && (
              <section aria-labelledby="section-verification">
                <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider mb-2 block">
                  05 / VERIFICATION & TESTING
                </Text>
                <Heading as="h2" variant="h2" id="section-verification" className="text-2xl font-bold text-neutral-950 mb-4">
                  Validation & Reliability
                </Heading>
                <div className="p-4 bg-emerald-50/50 border border-emerald-200/80 rounded-sm">
                  <Text variant="bodySm" tone="secondary" className="text-emerald-900 text-sm leading-relaxed">
                    {caseStudy.verificationTesting}
                  </Text>
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Technical Sidebar & Metadata */}
          <aside className="space-y-8" aria-label="Project details sidebar">
            {/* Technology Stack Card */}
            <Card variant="outlined" padding="md" className="space-y-4">
              <Heading as="h3" variant="h3" className="text-base font-semibold text-neutral-900 border-b border-neutral-100 pb-2">
                Technologies & Tools
              </Heading>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono text-neutral-800 bg-neutral-100 border border-neutral-200/60 rounded-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Card>

            {/* Team Collaboration Note */}
            {isTeam && (
              <Card variant="outlined" padding="md" className="space-y-2 border-neutral-200 bg-neutral-50/70">
                <Heading as="h4" variant="h4" className="text-xs font-mono uppercase tracking-wider text-neutral-700">
                  Collaboration Attribution
                </Heading>
                <Text variant="bodySm" tone="secondary" className="text-xs text-neutral-600 leading-relaxed">
                  {project.teamAttribution}
                </Text>
              </Card>
            )}

            {/* Current Status Note */}
            {caseStudy?.currentStatusNote && (
              <Card variant="outlined" padding="md" className="space-y-2">
                <Heading as="h4" variant="h4" className="text-xs font-mono uppercase tracking-wider text-neutral-700">
                  Current Status
                </Heading>
                <Text variant="bodySm" tone="secondary" className="text-xs text-neutral-600 leading-relaxed">
                  {caseStudy.currentStatusNote}
                </Text>
              </Card>
            )}

            {/* Direct Action Links */}
            <div className="space-y-2 pt-2">
              {project.links?.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button
                    variant="primary"
                    size="md"
                    rightIcon={<Icon name="arrow-up-right" size="xs" />}
                    className="w-full justify-center"
                    aria-label={`Open ${project.title} live deployment (opens in new tab)`}
                  >
                    Open Live Demo
                  </Button>
                </a>
              )}

              {hasRepo && (
                <a
                  href={project.links!.repo!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button
                    variant={project.links?.live ? 'secondary' : 'primary'}
                    size="md"
                    rightIcon={<Icon name="arrow-up-right" size="xs" />}
                    className="w-full justify-center"
                    aria-label={`View ${project.title} GitHub repository (opens in new tab)`}
                  >
                    View Source Repository
                  </Button>
                </a>
              )}

              <Link
                to={project.track === 'robotics-autonomous' ? '/#robotics' : '/#projects'}
                className="block w-full"
              >
                <Button
                  variant="outline"
                  size="md"
                  leftIcon={<Icon name="arrow-left" size="xs" />}
                  className="w-full justify-center"
                >
                  {project.track === 'robotics-autonomous' ? 'Robotics Track' : 'All Projects'}
                </Button>
              </Link>
            </div>
          </aside>
        </div>

        {/* Previous & Next Project Navigation */}
        <nav aria-label="Adjacent project navigation" className="mt-16 pt-8 border-t border-neutral-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {previous ? (
              <Link
                to={`/projects/${previous.slug}`}
                className="group p-4 border border-neutral-200 hover:border-neutral-300 rounded-md transition-all duration-200 bg-white hover:shadow-subtle hover:-translate-y-0.5 motion-reduce:transform-none"
                aria-label={`Previous project: ${previous.title}`}
              >
                <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-1 flex items-center gap-1.5">
                  <Icon name="arrow-left" size="xs" className="transition-transform duration-150 group-hover:-translate-x-0.5 motion-reduce:transform-none" />
                  <span>Previous Case Study</span>
                </span>
                <span className="text-sm font-semibold text-neutral-900 group-hover:text-neutral-700 transition-colors">
                  {previous.title}
                </span>
                <span className="text-xs text-neutral-500 block mt-0.5 line-clamp-1 font-mono">
                  {previous.category.replace('-', ' ')}
                </span>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}

            {next && (
              <Link
                to={`/projects/${next.slug}`}
                className="group p-4 border border-neutral-200 hover:border-neutral-300 rounded-md transition-all duration-200 bg-white hover:shadow-subtle hover:-translate-y-0.5 motion-reduce:transform-none text-left sm:text-right"
                aria-label={`Next project: ${next.title}`}
              >
                <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-1 flex items-center justify-start sm:justify-end gap-1.5">
                  <span>Next Case Study</span>
                  <Icon name="arrow-right" size="xs" className="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transform-none" />
                </span>
                <span className="text-sm font-semibold text-neutral-900 group-hover:text-neutral-700 transition-colors">
                  {next.title}
                </span>
                <span className="text-xs text-neutral-500 block mt-0.5 line-clamp-1 font-mono">
                  {next.category.replace('-', ' ')}
                </span>
              </Link>
            )}
          </div>
        </nav>
      </Container>
    </article>
  )
}
