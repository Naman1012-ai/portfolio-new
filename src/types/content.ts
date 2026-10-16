/**
 * Comprehensive TypeScript types for Portfolio 2.0 Centralized Content & Asset System.
 * Designed to separate content data cleanly from presentation components.
 */

export type ProjectMaturity =
  | 'concept'
  | 'in-development'
  | 'prototype'
  | 'beta'
  | 'production'
  | 'completed'

export type ProjectCategory =
  | 'systems-ai'
  | 'embedded-robotics'
  | 'web-platform'
  | 'developer-tools'
  | 'mobile-app'

export interface ProjectLinks {
  live?: string
  repo?: string
  demo?: string
  docs?: string
}

export type EvidenceType = 'image' | 'video' | 'pdf' | 'document' | 'schematic'

export type ProjectArchetype =
  | 'product-saas'
  | 'social-coordination'
  | 'data-analytics'
  | 'terminal-cli'
  | 'systems-oop'
  | 'backend-ai'
  | 'research-robotics'

export interface ProjectEvidence {
  assetFilename?: string // Filename strictly located in public/assets/
  type?: EvidenceType
  caption?: string
  fallbackText?: string
}

export interface ProjectCaseStudy {
  overview: string
  problemContext?: string
  approachArchitecture?: string
  keyFeatures?: string[]
  technicalDecisions?: string[]
  challengesTradeoffs?: string
  verificationTesting?: string
  currentStatusNote?: string
  lessonsLearned?: string
  previewAssetFilename?: string
  demoNotice?: string
}

export interface Project {
  id: string
  slug: string // Unique URL-safe identifier
  title: string
  tagline: string
  summary: string
  description?: string
  category: ProjectCategory
  maturity: ProjectMaturity
  archetype?: ProjectArchetype
  role: string
  teamProject: boolean
  teamAttribution?: string
  technologies: string[]
  featuredRank?: number // 1 = highest prominence (e.g. Convia, BioLynk)
  flagship?: boolean
  track?: 'main' | 'robotics-autonomous'
  excludeFromMainDiscovery?: boolean
  links?: ProjectLinks
  evidence?: ProjectEvidence
  caseStudy?: ProjectCaseStudy
  dateRange?: {
    start: string
    end?: string
    inProgress?: boolean
  }
}

export interface Education {
  id: string
  institution: string
  degree: string
  fieldOfStudy: string
  period?: {
    start?: string
    end?: string
    current?: boolean
  }
  grade?: string
  location: string
  highlights?: string[]
}

export type ExperienceType = 'internship' | 'full-time' | 'part-time' | 'contract' | 'freelance'

export interface Experience {
  id: string
  organization: string
  role: string
  type: ExperienceType
  period?: {
    start?: string
    end?: string
    current?: boolean
  }
  location?: string
  summary: string
  contributions?: string[]
  technologies?: string[]
  projectRepoUrl?: string
  verification?: {
    documentAsset?: string // Filename strictly in public/assets/
    url?: string
  }
}

export interface Achievement {
  id: string
  title: string
  issuer?: string
  date: string
  summary: string
  verified: boolean
  evidenceAsset?: string // Filename strictly in public/assets/
}

export interface Certification {
  id: string
  title: string
  issuingOrganization: string
  issueDate: string
  expirationDate?: string
  credentialId?: string
  credentialUrl?: string
  certificateAsset?: string // Filename strictly in public/assets/
  skills?: string[]
}

export type SocialPlatform = 'github' | 'linkedin' | 'email' | 'twitter' | 'website' | 'instagram'

export interface SocialLink {
  platform: SocialPlatform
  label: string
  url: string
  username?: string
}

export interface ResumeConfig {
  filename?: string // e.g., 'resume-naman-prajapati.pdf' in public/assets/
  lastUpdated?: string
}

export interface SiteProfile {
  name: string
  preferredName?: string
  title: string
  tagline: string
  bio: string
  location: string
  status: string
  resume: ResumeConfig
  socialLinks: SocialLink[]
}

export type AssetCategory =
  | 'branding'
  | 'project-evidence'
  | 'document'
  | 'profile'
  | 'certificate'

export interface AssetManifestEntry {
  filename: string
  category: AssetCategory
  label: string
  isAvailable: boolean
  mimeType?: string
  description?: string
}
