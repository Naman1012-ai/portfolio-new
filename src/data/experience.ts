import type { Experience } from '@/types'

/**
 * Authentic completed professional experience for Naman Prajapati.
 * Grounded strictly in authentic records: described as a completed internship
 * without invented calendar dates or fabricated deliverables.
 */
export const experienceList: Experience[] = [
  {
    id: 'exp-inamigos',
    organization: 'InAmigos Foundation',
    role: 'Web Development Intern',
    type: 'internship',
    summary:
      'Completed web development internship, structuring and building a responsive NGO website prototype and documentation using core HTML, CSS, and JavaScript.',
    technologies: ['Web Development', 'HTML', 'CSS', 'JavaScript'],
    projectRepoUrl: 'https://github.com/Naman1012-ai/Foundation_dummy_website',
    verification: {
      url: 'https://inamigosfoundation.org.in',
    },
  },
]
