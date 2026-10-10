import type { NavItem, SiteMetadata } from '@/types'

export const siteMetadata: SiteMetadata = {
  title: 'Naman Prajapati',
  description:
    'Personal portfolio of Naman Prajapati — Computer Science undergraduate building web platforms, practical AI applications, and embedded systems.',
  author: 'Naman Prajapati',
  siteUrl: 'https://portfolio-new-one-liart.vercel.app',
}

export const navigationItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]
