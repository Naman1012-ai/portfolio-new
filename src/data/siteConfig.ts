import type { NavItem, SiteMetadata } from '@/types'

export const siteMetadata: SiteMetadata = {
  title: 'Naman Prajapati',
  description:
    'Personal portfolio of Naman Prajapati — Computer Science undergraduate building web platforms, practical AI applications, and embedded systems.',
  author: 'Naman Prajapati',
  siteUrl: 'https://namanprajapati-07.vercel.app',
}

export const navigationItems: NavItem[] = [
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]
