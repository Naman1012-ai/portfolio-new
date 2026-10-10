export interface SiteMetadata {
  title: string
  description: string
  author: string
  siteUrl: string
}

export interface NavItem {
  label: string
  href: string
}

export interface ProjectSummary {
  id: string
  slug: string
  title: string
  summary: string
  tags: string[]
  featuredAsset?: string // filename inside /assets/
}
