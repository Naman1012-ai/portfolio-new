import {
  Badge,
  Button,
  Card,
  Container,
  Heading,
  Icon,
  Text,
} from '@/components/common'
import { navigationItems } from '@/data'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { Link, useRouter } from '@/router'

export interface NotFoundPageProps {
  className?: string
}

/**
 * Dedicated 404 Page for unrecognized top-level routes and broken links.
 * Distinguishes global route failures from project-specific slug misses.
 * Provides accessible, immediate recovery pathways back to the homepage
 * and primary portfolio sections.
 */
export function NotFoundPage({ className = '' }: NotFoundPageProps) {
  const { path, navigate } = useRouter()

  useDocumentTitle('Page Not Found | Naman Prajapati')

  return (
    <div className={`py-16 sm:py-24 md:py-32 animate-fade-in ${className}`}>
      <Container size="md">
        <Card
          variant="outlined"
          padding="lg"
          className="text-center max-w-xl mx-auto space-y-6 border-slate-200/90 bg-white shadow-elevated rounded-2xl"
        >
          {/* Header Monogram / Status */}
          <div className="flex flex-col items-center gap-2">
            <Badge variant="subtle" size="sm" className="font-mono tracking-widest text-[11px]">
              HTTP 404
            </Badge>
            <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-indigo-600 mt-2">
              <Icon name="terminal" size="md" />
            </div>
          </div>

          {/* Heading & Narrative */}
          <div className="space-y-2">
            <Heading as="h1" variant="h2" className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
              Page Not Found
            </Heading>
            <Text variant="body" tone="secondary" className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
              The requested address {path ? (
                <code className="px-1.5 py-0.5 font-mono text-xs bg-slate-100 border border-slate-200 rounded-xs text-indigo-700 break-all">
                  {path}
                </code>
              ) : 'URL'} does not match any page or section in this portfolio.
            </Text>
          </div>

          {/* Primary Recovery Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="md"
              leftIcon={<Icon name="arrow-left" size="sm" />}
              onClick={() => navigate('/')}
              aria-label="Return to portfolio homepage"
              className="w-full sm:w-auto justify-center"
            >
              Return to Homepage
            </Button>

            <Button
              variant="secondary"
              size="md"
              rightIcon={<Icon name="arrow-down" size="sm" />}
              onClick={() => navigate('/projects')}
              aria-label="Explore Project Universe"
              className="w-full sm:w-auto justify-center"
            >
              Explore Project Universe
            </Button>
          </div>

          {/* Quick Jump Links to Major Sections */}
          <div className="pt-6 border-t border-slate-100 text-left">
            <Text variant="caption" tone="muted" className="font-mono uppercase tracking-wider block mb-3 text-[11px] text-slate-500">
              Portfolio Directory:
            </Text>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={`/${item.href}`}
                  className="p-2.5 text-xs font-mono font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-50 rounded-md border border-slate-200/80 hover:border-slate-300 transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <Icon name="arrow-right" size="xs" className="opacity-40" />
                </Link>
              ))}
            </div>
          </div>
        </Card>
      </Container>
    </div>
  )
}
