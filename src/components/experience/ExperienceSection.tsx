import { Heading } from '@/components/common/Heading'
import { Section } from '@/components/common/Section'
import { Text } from '@/components/common/Text'
import { educationList, experienceList } from '@/data'
import { CredentialsCard } from './CredentialsCard'
import { EducationCard } from './EducationCard'
import { ExperienceCard } from './ExperienceCard'

export interface ExperienceSectionProps {
  className?: string
}

/**
 * Polished, evidence-backed Experience, Education & Credentials section.
 * Integrates verified institutional education (9.4 first-year CGPA),
 * completed InAmigos Foundation internship, and honest credential audit status.
 */
export function ExperienceSection({ className = '' }: ExperienceSectionProps) {
  const primaryEducation = educationList[0]
  const primaryExperience = experienceList[0]

  return (
    <Section id="experience" spacing="lg" bordered reveal className={className}>

      {/* Section Header */}
      <div className="w-full max-w-3xl min-w-0 mb-10">
        <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider mb-2 block">
          EXPERIENCE & ACADEMIC FOUNDATIONS
        </Text>
        <Heading as="h2" variant="h1" className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-950 mb-4">
          Engineering Discipline & Verified Milestones
        </Heading>
        <Text variant="body" tone="secondary" className="leading-relaxed text-neutral-700 text-sm sm:text-base">
          Pursuing a Bachelor of Technology in Computer Science & Engineering at The NorthCap University
          with an emphasis on Artificial Intelligence and Machine Learning. Committed to verified codebases,
          disciplined testing, and systems that combine algorithmic rigor with clean product execution.
        </Text>
      </div>

      {/* Primary 2-Column Grid: Education & Completed Experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {primaryEducation && <EducationCard education={primaryEducation} />}
        {primaryExperience && <ExperienceCard experience={primaryExperience} />}
      </div>

      {/* Verified Credential Audit Standard Card */}
      <CredentialsCard />
    </Section>
  )
}
