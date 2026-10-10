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
    summary: 'Completed web development internship task and received internship certificate.',
    technologies: ['Web Development', 'HTML', 'CSS', 'JavaScript'],
    verification: {
      url: 'https://inamigosfoundation.org.in',
    },
  },
]
