/**
 * Automated test suite for Phase 05 Experience, Achievements & Certifications.
 * Validates:
 * - Education data integrity: NorthCap University, 9.4 first-year CGPA, no invented dates
 * - Experience data integrity: InAmigos Foundation Web Development Internship, no invented dates/deliverables
 * - Zero fabricated achievements and certifications (both lists strictly empty)
 * - Component export integrity
 */
import {
  CredentialsCard,
  EducationCard,
  ExperienceCard,
  ExperienceSection,
} from '@/components/experience'
import {
  achievementsList,
  certificationsList,
  educationList,
  experienceList,
} from '@/data'

export function verifyExperienceAndCredentials(): { passed: boolean; message: string } {
  // 1. Education Integrity
  if (educationList.length !== 1) {
    return { passed: false, message: `Expected exactly 1 education record, got ${educationList.length}` }
  }
  const edu = educationList[0]
  if (!edu.institution || !edu.institution.includes('NorthCap University')) {
    return { passed: false, message: 'Education must identify The NorthCap University' }
  }
  if (!edu.grade || !edu.grade.includes('9.4')) {
    return { passed: false, message: 'Education grade must strictly reflect 9.4 CGPA' }
  }
  if (edu.period?.start || edu.period?.end) {
    return { passed: false, message: 'Education start/end dates must remain unspecified until verified' }
  }

  // 2. Completed Experience Integrity
  if (experienceList.length !== 1) {
    return { passed: false, message: `Expected exactly 1 experience record, got ${experienceList.length}` }
  }
  const exp = experienceList[0]
  if (exp.organization !== 'InAmigos Foundation') {
    return { passed: false, message: 'Experience organization must be InAmigos Foundation' }
  }
  if (!exp.role.toLowerCase().includes('web development')) {
    return { passed: false, message: 'Experience role must be Web Development Intern' }
  }
  if (exp.type !== 'internship') {
    return { passed: false, message: 'Experience type must be internship' }
  }
  if (exp.period?.start || exp.period?.end) {
    return { passed: false, message: 'InAmigos internship dates must remain unspecified' }
  }
  if (exp.contributions && exp.contributions.length > 0) {
    return { passed: false, message: 'InAmigos internship deliverables must not be invented' }
  }
  if (!exp.verification?.url || !exp.verification.url.includes('inamigosfoundation.org.in')) {
    return { passed: false, message: 'Experience must provide verified organization URL' }
  }

  // 3. Credential Safety: Strictly Zero Fabricated Claims
  if (achievementsList.length > 0) {
    return { passed: false, message: 'Achievements must remain empty until explicitly verified' }
  }
  if (certificationsList.length > 0) {
    return { passed: false, message: 'Certifications must remain empty until explicitly verified' }
  }

  // 4. Component Definition & Export Integrity
  if (typeof EducationCard !== 'function') {
    return { passed: false, message: 'EducationCard component must be an exported function' }
  }
  if (typeof ExperienceCard !== 'function') {
    return { passed: false, message: 'ExperienceCard component must be an exported function' }
  }
  if (typeof CredentialsCard !== 'function') {
    return { passed: false, message: 'CredentialsCard component must be an exported function' }
  }
  if (typeof ExperienceSection !== 'function') {
    return { passed: false, message: 'ExperienceSection component must be an exported function' }
  }

  return {
    passed: true,
    message: 'All Phase 05 Experience, Education & Credentials verification checks passed',
  }
}
