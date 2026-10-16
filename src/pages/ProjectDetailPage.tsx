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
import {
  InteractiveFeatureInspector,
  ProjectPreview,
  SystemArchitectureFlow,
} from '@/components/projects'
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
                {slug ? (
                  <>The project slug <code className="px-1.5 py-0.5 font-mono text-xs bg-neutral-100 rounded-xs text-neutral-800">{slug}</code> does not match any project in this portfolio.</>
                ) : (
                  <>The requested project does not match any project in this portfolio.</>
                )}
              </Text>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="primary"
                size="md"
                leftIcon={<Icon name="arrow-left" size="sm" />}
                onClick={() => navigate('/projects')}
              >
                Return to Project Universe
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/')}
              >
                Return to Homepage
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
            to={project.track === 'robotics-autonomous' ? '/projects#robotics' : '/projects'}
            className="group inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-500 hover:text-slate-950 px-3 py-1 rounded-full bg-slate-100/80 hover:bg-slate-200/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 shadow-xs"
            aria-label={project.track === 'robotics-autonomous' ? 'Back to Robotics & Autonomous Systems track' : 'Back to Project Universe'}
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
              <Badge variant="accent" size="sm" className="shadow-xs">
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
          <Heading as="h1" variant="display" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-950 mb-4">
            {project.title}
          </Heading>
          <Text variant="lead" tone="secondary" className="max-w-3xl text-slate-700 leading-relaxed mb-8">
            {project.tagline}
          </Text>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-white/95 border border-slate-200/90 rounded-2xl shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-colors duration-200">
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
                Repository & Source
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
        <div className="mb-14 animate-cinematic-expand">
          <div className="group/hero-preview rounded-2xl border border-slate-200/90 overflow-hidden bg-neutral-950 shadow-[0_16px_36px_-6px_rgba(15,23,42,0.12),0_6px_14px_-4px_rgba(15,23,42,0.04)] transition-all duration-300">
            <ProjectPreview project={project} variant="case-study" />
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start mb-16">
          {/* Left 2 Columns: Core Technical Narrative */}
          <div className="lg:col-span-2 space-y-12">
            {/* 1. Project Overview */}
            <section aria-labelledby="section-overview">
              <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider mb-2 block text-[11px]">
                01 / OVERVIEW
              </Text>
              <Heading as="h2" variant="h2" id="section-overview" className="text-2xl font-bold text-slate-950 mb-4">
                Executive Summary
              </Heading>
              <Text variant="body" tone="secondary" className="leading-relaxed text-slate-700 text-base">
                {caseStudy?.overview || project.summary}
              </Text>
            </section>

            {/* 2. Problem & Real-World Context */}
            {caseStudy?.problemContext && (
              <section aria-labelledby="section-problem">
                <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider mb-2 block text-[11px]">
                  02 / PROBLEM & CONTEXT
                </Text>
                <Heading as="h2" variant="h2" id="section-problem" className="text-2xl font-bold text-slate-950 mb-4">
                  The Problem Space
                </Heading>
                <Text variant="body" tone="secondary" className="leading-relaxed text-slate-700 text-base">
                  {caseStudy.problemContext}
                </Text>
              </section>
            )}

            {/* 3. Technical Architecture & Approach */}
            {(caseStudy?.approachArchitecture || project.description) && (
              <section aria-labelledby="section-approach">
                <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider mb-2 block text-[11px]">
                  03 / ARCHITECTURE & APPROACH
                </Text>
                <Heading as="h2" variant="h2" id="section-approach" className="text-2xl font-bold text-slate-950 mb-4">
                  Engineering Architecture
                </Heading>
                <Text variant="body" tone="secondary" className="leading-relaxed text-slate-700 text-base mb-6">
                  {caseStudy?.approachArchitecture || project.description}
                </Text>

                {/* Interactive Data-Flow Architecture Visualizer */}
                <SystemArchitectureFlow projectSlug={project.slug} className="mt-6" />
              </section>
            )}

            {/* 4. Core Capabilities & Implemented Features */}
            {caseStudy?.keyFeatures && caseStudy.keyFeatures.length > 0 && (
              <section aria-labelledby="section-features">
                <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider mb-2 block text-[11px]">
                  04 / CAPABILITIES
                </Text>
                <Heading as="h2" variant="h2" id="section-features" className="text-2xl font-bold text-slate-950 mb-6">
                  Core Implementation Features
                </Heading>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {caseStudy.keyFeatures.map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200/80 bg-white/95 shadow-xs hover:shadow-md transition-all space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0" aria-hidden="true" />
                        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                          Feature 0{idx + 1}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-slate-800 leading-normal">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Interactive Sandbox & Terminal Feature Inspector */}
                <InteractiveFeatureInspector projectSlug={project.slug} className="mt-6" />
              </section>
            )}

            {/* 5. Key Technical Decisions */}
            {caseStudy?.technicalDecisions && caseStudy.technicalDecisions.length > 0 && (
              <section aria-labelledby="section-decisions">
                <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider mb-2 block text-[11px]">
                  05 / TECHNICAL DECISIONS
                </Text>
                <Heading as="h2" variant="h2" id="section-decisions" className="text-2xl font-bold text-slate-950 mb-4">
                  Architectural Choices & Rationale
                </Heading>
                <div className="space-y-3">
                  {caseStudy.technicalDecisions.map((decision, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all text-xs sm:text-sm text-slate-800 leading-relaxed"
                    >
                      <span className="font-mono text-[10px] font-semibold text-slate-700 bg-slate-100 border border-slate-200/80 px-2.5 py-0.5 rounded-full mt-0.5 shrink-0 shadow-2xs">
                        Decision 0{idx + 1}
                      </span>
                      <span className="pt-0.5">{decision}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sticky Technical HUD Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start" aria-label="Project details sidebar">
            {/* Technology Stack Card */}
            <div className="p-5 bg-white/95 border border-slate-200/90 rounded-2xl shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <Heading as="h3" variant="h3" className="text-sm font-semibold text-slate-900">
                  Technologies & Tools
                </Heading>
                <span className="text-[11px] font-mono text-slate-400">
                  {project.technologies.length} Stack Components
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono text-slate-800 bg-slate-100/90 border border-slate-200/80 rounded-full shadow-2xs hover:bg-slate-200/80 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Current Status Note */}
            {caseStudy?.currentStatusNote && (
              <div className="p-5 bg-white/95 border border-slate-200/90 rounded-2xl shadow-xs space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${dotColor}`} aria-hidden="true" />
                  <Heading as="h4" variant="h4" className="text-xs font-mono uppercase tracking-wider text-slate-700 font-semibold">
                    Current Status
                  </Heading>
                </div>
                <Text variant="bodySm" tone="secondary" className="text-xs text-slate-600 leading-relaxed">
                  {caseStudy.currentStatusNote}
                </Text>
              </div>
            )}

            {/* Team Collaboration Note */}
            {isTeam && (
              <div className="p-5 bg-white/95 border border-slate-200/90 rounded-2xl shadow-xs space-y-2">
                <Heading as="h4" variant="h4" className="text-xs font-mono uppercase tracking-wider text-slate-700 font-semibold">
                  Collaboration Attribution
                </Heading>
                <Text variant="bodySm" tone="secondary" className="text-xs text-slate-600 leading-relaxed">
                  {project.teamAttribution}
                </Text>
              </div>
            )}

            {/* Direct Action Links */}
            <div className="space-y-2.5 pt-1">
              {project.links?.live && (
                <div className="space-y-1.5">
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
                  {caseStudy?.demoNotice && (
                    <Text variant="caption" tone="muted" className="text-[11px] leading-relaxed block text-slate-500 px-1">
                      {caseStudy.demoNotice}
                    </Text>
                  )}
                </div>
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
                to={project.track === 'robotics-autonomous' ? '/projects#robotics' : '/projects'}
                className="block w-full"
              >
                <Button
                  variant="outline"
                  size="md"
                  leftIcon={<Icon name="arrow-left" size="xs" />}
                  className="w-full justify-center"
                >
                  {project.track === 'robotics-autonomous' ? 'Robotics Track' : 'Project Universe'}
                </Button>
              </Link>
            </div>
          </aside>
        </div>

        {/* Full-Width Engineering Rigor Triad (Sections 06, 07, 08) */}
        {(caseStudy?.challengesTradeoffs || caseStudy?.verificationTesting || caseStudy?.lessonsLearned) && (
          <section aria-labelledby="section-engineering-rigor" className="mb-16 pt-8 border-t border-slate-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  06 — 08 / Engineering Rigor & Learnings
                </span>
                <span className="text-slate-300 font-mono text-xs">·</span>
                <span className="text-xs font-mono text-slate-500">
                  Constraints, Verification & Engineering Judgement
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
              {/* Card 06: Challenges & Trade-offs */}
              {caseStudy?.challengesTradeoffs && (
                <div className="flex flex-col justify-between p-5 rounded-2xl bg-white border border-amber-200/80 shadow-xs hover:shadow-md transition-all">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase font-semibold tracking-wider bg-amber-50 text-amber-800 border border-amber-200/60 shadow-2xs">
                        06 / Trade-offs
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-950 mb-2">
                      Technical Constraints & Compromises
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {caseStudy.challengesTradeoffs}
                    </p>
                  </div>
                </div>
              )}

              {/* Card 07: Verification & Testing Rigor */}
              {caseStudy?.verificationTesting && (
                <div className="flex flex-col justify-between p-5 rounded-2xl bg-white border border-emerald-200/80 shadow-xs hover:shadow-md transition-all">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase font-semibold tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/60 shadow-2xs">
                        07 / Verification
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-950 mb-2">
                      Validation & Reliability
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {caseStudy.verificationTesting}
                    </p>
                  </div>
                </div>
              )}

              {/* Card 08: Key Engineering Takeaways */}
              {caseStudy?.lessonsLearned && (
                <div className="flex flex-col justify-between p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase font-semibold tracking-wider bg-slate-100 text-slate-800 border border-slate-200/80 shadow-2xs">
                        08 / Takeaways
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-950 mb-2">
                      Key Engineering Takeaways
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {caseStudy.lessonsLearned}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Symmetrical Previous & Next Project Navigation */}
        {(previous || next) && (
          <nav aria-label="Adjacent project navigation" className="mt-8 pt-8 border-t border-slate-200/80">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {previous ? (
                <Link
                  to={`/projects/${previous.slug}`}
                  className="group p-5 border border-slate-200/90 hover:border-slate-300 rounded-2xl transition-all duration-200 bg-white shadow-xs hover:shadow-md hover:-translate-y-0.5 motion-reduce:transform-none"
                  aria-label={`Previous project: ${previous.title}`}
                >
                  <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1 flex items-center gap-1.5">
                    <Icon name="arrow-left" size="xs" className="transition-transform duration-150 group-hover:-translate-x-0.5 motion-reduce:transform-none" />
                    <span>Previous Case Study</span>
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-slate-700 transition-colors block">
                    {previous.title}
                  </span>
                  <span className="text-xs text-slate-500 block mt-0.5 line-clamp-1 font-mono">
                    {previous.category.replace('-', ' ')}
                  </span>
                </Link>
              ) : (
                <Link
                  to="/projects"
                  className="group p-5 border border-slate-200/90 hover:border-slate-300 rounded-2xl transition-all duration-200 bg-white shadow-xs hover:shadow-md hover:-translate-y-0.5 motion-reduce:transform-none"
                  aria-label="Explore Project Universe"
                >
                  <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1 flex items-center gap-1.5">
                    <Icon name="arrow-left" size="xs" className="transition-transform duration-150 group-hover:-translate-x-0.5 motion-reduce:transform-none" />
                    <span>Project Universe</span>
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-slate-700 transition-colors block">
                    All Case Studies & Systems
                  </span>
                  <span className="text-xs text-slate-500 block mt-0.5 line-clamp-1 font-mono">
                    10 Projects Across 4 Tracks
                  </span>
                </Link>
              )}

              {next ? (
                <Link
                  to={`/projects/${next.slug}`}
                  className="group p-5 border border-slate-200/90 hover:border-slate-300 rounded-2xl transition-all duration-200 bg-white shadow-xs hover:shadow-md hover:-translate-y-0.5 motion-reduce:transform-none text-left sm:text-right"
                  aria-label={`Next project: ${next.title}`}
                >
                  <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1 flex items-center justify-start sm:justify-end gap-1.5">
                    <span>Next Case Study</span>
                    <Icon name="arrow-right" size="xs" className="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transform-none" />
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-slate-700 transition-colors block">
                    {next.title}
                  </span>
                  <span className="text-xs text-slate-500 block mt-0.5 line-clamp-1 font-mono">
                    {next.category.replace('-', ' ')}
                  </span>
                </Link>
              ) : (
                <Link
                  to="/projects"
                  className="group p-5 border border-slate-200/90 hover:border-slate-300 rounded-2xl transition-all duration-200 bg-white shadow-xs hover:shadow-md hover:-translate-y-0.5 motion-reduce:transform-none text-left sm:text-right"
                  aria-label="Return to Project Universe"
                >
                  <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1 flex items-center justify-start sm:justify-end gap-1.5">
                    <span>Project Universe</span>
                    <Icon name="arrow-right" size="xs" className="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transform-none" />
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-slate-700 transition-colors block">
                    All Case Studies & Systems
                  </span>
                  <span className="text-xs text-slate-500 block mt-0.5 line-clamp-1 font-mono">
                    10 Projects Across 4 Tracks
                  </span>
                </Link>
              )}
            </div>
          </nav>
        )}
      </Container>
    </article>
  )
}
