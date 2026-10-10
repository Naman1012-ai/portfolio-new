import { BrandLockup } from '@/components/common/BrandLockup'
import { Container } from '@/components/common/Container'
import { siteMetadata } from '@/data'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 py-8 text-neutral-500 text-sm">
      <Container size="lg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <BrandLockup href="#hero" showMonogram={true} />
          <p className="text-xs text-neutral-500">
            © {CURRENT_YEAR} {siteMetadata.author || 'Naman Prajapati'}. Built with React 19, TypeScript & Tailwind CSS v4.
          </p>
        </div>
      </Container>
    </footer>
  )
}
