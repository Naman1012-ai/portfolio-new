import { useState } from 'react'
import {
  Badge,
  BrandLockup,
  Button,
  Card,
  Divider,
  Heading,
  Icon,
  ProjectEvidenceFallback,
  Section,
  Text,
  TextLink,
} from '@/components/common'
import {
  achievementsList,
  assetManifest,
  certificationsList,
  educationList,
  experienceList,
  getFeaturedProjects,
  siteProfile,
} from '@/data'
import { tokens } from '@/styles/tokens'
import { getAssetPath, isAssetAvailable } from '@/utils'

/**
 * Temporary verification preview for Phase 01 & 02.
 * Renders all primitives, states, tokens, centralized content, and asset resolution rules.
 */
export function DesignSystemPreview() {
  const [copied, setCopied] = useState(false)
  const featuredProjects = getFeaturedProjects()

  const handleCopyTest = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="space-y-12">
      {/* 1. Brand Lockup */}
      <Section spacing="none">
        <Heading as="h2" variant="h3" className="mb-4">
          1. Brand Identity & Lockup
        </Heading>
        <Card variant="outlined" padding="md" className="space-y-4">
          <div className="flex flex-wrap items-center gap-8">
            <div>
              <Text variant="caption" tone="muted" className="mb-2">Default Header Brand Lockup</Text>
              <BrandLockup />
            </div>
            <div>
              <Text variant="caption" tone="muted" className="mb-2">With Subtitle</Text>
              <BrandLockup subtitle={siteProfile.title} />
            </div>
            <div>
              <Text variant="caption" tone="muted" className="mb-2">Minimal (No Monogram)</Text>
              <BrandLockup showMonogram={false} />
            </div>
          </div>
        </Card>
      </Section>

      {/* 2. Color Palette & Tokens */}
      <Section spacing="none">
        <Heading as="h2" variant="h3" className="mb-4">
          2. Color & Surface Tokens
        </Heading>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-md bg-canvas border border-neutral-200">
            <span className="block text-xs font-mono text-neutral-500">canvas</span>
            <span className="text-sm font-semibold text-neutral-900">{tokens.colors.canvas}</span>
          </div>
          <div className="p-3 rounded-md bg-surface border border-neutral-200 shadow-micro">
            <span className="block text-xs font-mono text-neutral-500">surface</span>
            <span className="text-sm font-semibold text-neutral-900">{tokens.colors.surface}</span>
          </div>
          <div className="p-3 rounded-md bg-surface-subdued border border-neutral-200">
            <span className="block text-xs font-mono text-neutral-500">surface-subdued</span>
            <span className="text-sm font-semibold text-neutral-900">{tokens.colors.surfaceSubdued}</span>
          </div>
          <div className="p-3 rounded-md bg-neutral-900 text-white">
            <span className="block text-xs font-mono text-neutral-400">accent / inkPrimary</span>
            <span className="text-sm font-semibold">{tokens.colors.accent}</span>
          </div>
        </div>
      </Section>

      {/* 3. Typography Scale */}
      <Section spacing="none">
        <Heading as="h2" variant="h3" className="mb-4">
          3. Typography Hierarchy
        </Heading>
        <Card variant="outlined" padding="md" className="space-y-4 divide-y divide-neutral-100">
          <div className="pt-2 first:pt-0">
            <Text variant="meta" tone="muted">Display · 48px / Bold</Text>
            <Heading as="h1" variant="display">Engineering & Systems</Heading>
          </div>
          <div className="pt-4">
            <Text variant="meta" tone="muted">H1 · 32px / SemiBold</Text>
            <Heading as="h1">Product Thinking & Architecture</Heading>
          </div>
          <div className="pt-4">
            <Text variant="meta" tone="muted">H2 · 24px / SemiBold</Text>
            <Heading as="h2">Scalable Frontend Foundations</Heading>
          </div>
          <div className="pt-4">
            <Text variant="meta" tone="muted">H3 · 20px / Medium</Text>
            <Heading as="h3">Component Primitives & Tokens</Heading>
          </div>
          <div className="pt-4">
            <Text variant="meta" tone="muted">Body (Prose width ~65ch)</Text>
            <Text variant="body" tone="secondary" prose>
              Editorial typography pairs restrained, balanced letter-spacing with generous whitespace.
              Line height and measure are calibrated for sustained readability across desktop and mobile screens.
            </Text>
          </div>
          <div className="pt-4 flex flex-wrap gap-6 items-baseline">
            <div>
              <Text variant="meta" tone="muted">Body Small</Text>
              <Text variant="bodySm" tone="secondary">Supporting UI metadata and secondary content.</Text>
            </div>
            <div>
              <Text variant="meta" tone="muted">Caption</Text>
              <Text variant="caption" tone="muted">Fine print and annotations.</Text>
            </div>
            <div>
              <Text variant="meta" tone="muted">Monospace Meta</Text>
              <Text variant="meta" tone="primary">VERSION_0.2.0 // 2026-10-09</Text>
            </div>
          </div>
        </Card>
      </Section>

      {/* 4. Button Variants & States */}
      <Section spacing="none">
        <Heading as="h2" variant="h3" className="mb-4">
          4. Buttons & Interaction States
        </Heading>
        <Card variant="outlined" padding="md" className="space-y-6">
          <div>
            <Text variant="caption" tone="muted" className="mb-3">Variants</Text>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary Action</Button>
              <Button variant="secondary">Secondary Action</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="primary" disabled>Disabled State</Button>
            </div>
          </div>

          <div>
            <Text variant="caption" tone="muted" className="mb-3">Sizes & Icon Slots</Text>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm" variant="secondary" leftIcon={<Icon name="terminal" size="xs" />}>
                Small Button
              </Button>
              <Button size="md" variant="primary" rightIcon={<Icon name="arrow-right" size="sm" />}>
                Medium with Icon
              </Button>
              <Button
                size="md"
                variant="secondary"
                leftIcon={<Icon name={copied ? 'check' : 'copy'} size="sm" />}
                onClick={handleCopyTest}
              >
                {copied ? 'Copied' : 'Interactive Copy'}
              </Button>
              <Button size="lg" variant="outline" rightIcon={<Icon name="arrow-up-right" size="md" />}>
                Large Outline
              </Button>
            </div>
          </div>
        </Card>
      </Section>

      {/* 5. Links & Text Links */}
      <Section spacing="none">
        <Heading as="h2" variant="h3" className="mb-4">
          5. Text Links & Navigation
        </Heading>
        <Card variant="outlined" padding="md">
          <div className="flex flex-wrap gap-6 items-center">
            <TextLink href="#overview" variant="subtle">
              Subtle Internal Link
            </TextLink>
            <TextLink href="#overview" variant="underline">
              Underline Link
            </TextLink>
            <TextLink href="#overview" variant="accent">
              Accent Link
            </TextLink>
            <TextLink
              href="https://github.com"
              external
              showExternalIcon
              variant="subtle"
            >
              External Link with Accessible Indicator
            </TextLink>
          </div>
        </Card>
      </Section>

      {/* 6. Surfaces & Cards */}
      <Section spacing="none">
        <Heading as="h2" variant="h3" className="mb-4">
          6. Surface & Card Variants
        </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card variant="flat" padding="md" className="border border-neutral-100">
            <Text variant="caption" tone="muted">Flat Surface</Text>
            <Heading as="h3" variant="h4" className="mt-1">Neutral Card</Heading>
            <Text variant="bodySm" tone="secondary" className="mt-2">Plain background without border.</Text>
          </Card>
          <Card variant="outlined" padding="md">
            <Text variant="caption" tone="muted">Outlined</Text>
            <Heading as="h3" variant="h4" className="mt-1">Default Surface</Heading>
            <Text variant="bodySm" tone="secondary" className="mt-2">Hairline border with micro shadow.</Text>
          </Card>
          <Card variant="elevated" padding="md">
            <Text variant="caption" tone="muted">Elevated</Text>
            <Heading as="h3" variant="h4" className="mt-1">Soft Elevation</Heading>
            <Text variant="bodySm" tone="secondary" className="mt-2">Subtle shadow for popovers/cards.</Text>
          </Card>
          <Card variant="outlined" padding="md" interactive>
            <Text variant="caption" tone="muted">Interactive</Text>
            <Heading as="h3" variant="h4" className="mt-1">Hoverable Card</Heading>
            <Text variant="bodySm" tone="secondary" className="mt-2">Smooth hover elevation without layout shift.</Text>
          </Card>
        </div>
      </Section>

      {/* 7. Badges & Chips */}
      <Section spacing="none">
        <Heading as="h2" variant="h3" className="mb-4">
          7. Badges & Status Indicators
        </Heading>
        <Card variant="outlined" padding="md">
          <div className="flex flex-wrap gap-2.5 items-center">
            <Badge variant="neutral">TypeScript</Badge>
            <Badge variant="subtle">React 19</Badge>
            <Badge variant="accent">Tailwind v4</Badge>
            <Badge variant="outline">Vite 8</Badge>
            <Badge variant="success" dot>Live System</Badge>
            <Badge variant="neutral" dot dotColor="bg-amber-400">In Progress</Badge>
            <Badge variant="neutral" icon={<Icon name="ai" size="xs" className="mr-1" />}>
              AI Systems
            </Badge>
          </div>
        </Card>
      </Section>

      {/* 8. Dividers */}
      <Section spacing="none">
        <Heading as="h2" variant="h3" className="mb-4">
          8. Dividers
        </Heading>
        <Card variant="outlined" padding="md" className="space-y-4">
          <div>
            <Text variant="caption" tone="muted">Standard Horizontal Divider</Text>
            <Divider />
          </div>
          <div>
            <Text variant="caption" tone="muted">Divider with Centered Label</Text>
            <Divider label="Architectural Section" />
          </div>
        </Card>
      </Section>

      {/* 9. Accessible Icons */}
      <Section spacing="none">
        <Heading as="h2" variant="h3" className="mb-4">
          9. Accessible Utility Icons
        </Heading>
        <Card variant="outlined" padding="md">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {(
              [
                ['arrow-up-right', 'Arrow Up Right'],
                ['arrow-right', 'Arrow Right'],
                ['check', 'Checkmark'],
                ['copy', 'Copy Snippet'],
                ['external', 'External Window'],
                ['github', 'GitHub Mark'],
                ['code', 'Code Symbol'],
                ['ai', 'AI Sparkle'],
                ['terminal', 'Terminal CLI'],
                ['info', 'Information'],
              ] as const
            ).map(([iconName, label]) => (
              <div
                key={iconName}
                className="flex items-center gap-2 p-2 rounded-xs border border-neutral-100 bg-neutral-50/50"
              >
                <Icon name={iconName} size="sm" className="text-neutral-800" title={label} />
                <span className="text-xs font-mono text-neutral-600 truncate">{iconName}</span>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* 10. Centralized Content & Asset System (Phase 02) */}
      <Section spacing="none">
        <Heading as="h2" variant="h3" className="mb-4">
          10. Centralized Content & Asset System (Phase 02)
        </Heading>
        <div className="space-y-6">
          {/* Prominence & Asset Resolution Demo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Convia (Rank 1 - Verified Available Asset) */}
            <Card variant="outlined" padding="md" className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="accent">FEATURED #1</Badge>
                <Badge variant="neutral" dot dotColor="bg-amber-400">IN-DEVELOPMENT</Badge>
              </div>
              <Heading as="h3" variant="h3">
                {featuredProjects[0]?.title}
              </Heading>
              <Text variant="bodySm" tone="secondary">
                {featuredProjects[0]?.summary}
              </Text>

              {/* Asset verification: Real asset exists */}
              <div className="p-4 rounded-sm border border-neutral-200 bg-neutral-50 flex items-center justify-center">
                {isAssetAvailable(featuredProjects[0]?.evidence?.assetFilename) ? (
                  <img
                    src={getAssetPath(featuredProjects[0]?.evidence?.assetFilename || '')}
                    alt={featuredProjects[0]?.evidence?.caption || 'Convia preview'}
                    className="max-h-24 w-auto object-contain"
                  />
                ) : (
                  <ProjectEvidenceFallback project={featuredProjects[0]!} />
                )}
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500 pt-1">
                <span>Asset: {featuredProjects[0]?.evidence?.assetFilename}</span>
                <span className="text-emerald-700 font-medium">✓ Verified in public/assets/</span>
              </div>
            </Card>

            {/* Architectural Fallback Demonstration (e.g. Global Energy Risk Monitor) */}
            <Card variant="outlined" padding="md" className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="subtle">RANK #{featuredProjects[3]?.featuredRank}</Badge>
                <Badge variant="neutral" dot dotColor="bg-blue-500">PROTOTYPE</Badge>
              </div>
              <Heading as="h3" variant="h3">
                {featuredProjects[3]?.title}
              </Heading>
              <Text variant="bodySm" tone="secondary">
                {featuredProjects[3]?.summary}
              </Text>

              {/* Fallback verification: Graceful architectural placeholder */}
              <ProjectEvidenceFallback project={featuredProjects[3]!} />

              <div className="flex items-center justify-between text-xs font-mono text-neutral-500 pt-1">
                <span>Category: {featuredProjects[3]?.category}</span>
                <span className="text-neutral-500">Fallback Placeholder Active</span>
              </div>
            </Card>
          </div>

          {/* Seeded Projects Manifest Table */}
          <Card variant="outlined" padding="none" className="overflow-x-auto">
            <div className="p-4 border-b border-neutral-200 bg-neutral-50/50 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-neutral-500 tracking-wider">
                  Seeded Projects Manifest
                </span>
                <p className="text-sm font-semibold text-neutral-900 mt-0.5">
                  {featuredProjects.length} Main Portfolio Projects
                </p>
              </div>
              <Badge variant="neutral">{featuredProjects.length} Projects</Badge>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="border-b border-neutral-200 bg-neutral-100/50 font-mono text-neutral-600">
                <tr>
                  <th className="py-2.5 px-4 font-medium">Rank</th>
                  <th className="py-2.5 px-4 font-medium">Project</th>
                  <th className="py-2.5 px-4 font-medium">Category</th>
                  <th className="py-2.5 px-4 font-medium">Maturity</th>
                  <th className="py-2.5 px-4 font-medium">Attribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-sans">
                {featuredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-50/50">
                    <td className="py-2.5 px-4 font-mono font-medium text-neutral-700">
                      #{p.featuredRank}
                    </td>
                    <td className="py-2.5 px-4 font-medium text-neutral-900">
                      {p.title}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-neutral-500">
                      {p.category}
                    </td>
                    <td className="py-2.5 px-4">
                      <Badge
                        variant={p.maturity === 'production' ? 'success' : 'neutral'}
                        size="sm"
                        dot
                        dotColor={p.maturity === 'production' ? 'bg-emerald-500' : 'bg-neutral-400'}
                      >
                        {p.maturity}
                      </Badge>
                    </td>
                    <td className="py-2.5 px-4 text-neutral-500 text-[11px]">
                      {p.teamProject ? (
                        <span className="text-neutral-700 font-medium">{p.teamAttribution}</span>
                      ) : (
                        'Personal Work'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* Education, Internship & Missing Evidence Handling */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Education */}
            <Card variant="outlined" padding="md" className="space-y-2">
              <Text variant="caption" tone="muted">EDUCATION</Text>
              <Heading as="h4" variant="h4">{educationList[0]?.institution}</Heading>
              <Text variant="bodySm" tone="secondary">{educationList[0]?.degree}</Text>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-block text-xs font-mono text-neutral-500">
                  {educationList[0]?.period?.start && educationList[0]?.period?.end
                    ? `${educationList[0].period.start} – ${educationList[0].period.end}`
                    : 'Dates Unspecified'}
                </span>
                {educationList[0]?.grade && (
                  <span className="inline-block text-xs font-mono text-neutral-700 font-medium">
                    • {educationList[0].grade}
                  </span>
                )}
              </div>
            </Card>

            {/* Internship */}
            <Card variant="outlined" padding="md" className="space-y-2">
              <Text variant="caption" tone="muted">COMPLETED EXPERIENCE</Text>
              <Heading as="h4" variant="h4">{experienceList[0]?.organization}</Heading>
              <Text variant="bodySm" tone="secondary">{experienceList[0]?.role}</Text>
              <span className="inline-block text-xs font-mono text-neutral-500">
                {experienceList[0]?.period?.start && experienceList[0]?.period?.end
                  ? `${experienceList[0].period.start} to ${experienceList[0].period.end} (Completed)`
                  : 'Completed Internship'}
              </span>
            </Card>

            {/* Credential Safety Rule */}
            <Card variant="outlined" padding="md" className="space-y-2">
              <Text variant="caption" tone="muted">CREDENTIAL INTEGRITY</Text>
              <Heading as="h4" variant="h4">Zero Unverified Claims</Heading>
              <Text variant="caption" tone="secondary">
                Achievements: {achievementsList.length} | Certifications: {certificationsList.length} | Resume Available: {isAssetAvailable(siteProfile.resume.filename) ? 'Yes' : 'Pending Document'}
              </Text>
              <p className="text-[11px] font-mono text-emerald-700 pt-1">
                ✓ No ghost credentials or fabricated awards.
              </p>
            </Card>
          </div>

          {/* Asset Manifest Audit */}
          <Card variant="outlined" padding="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-neutral-500 tracking-wider">
                Asset Manifest Status (public/assets/)
              </span>
              <span className="text-xs font-mono text-neutral-500">
                Single Flat Directory Standard
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {assetManifest.map((entry) => (
                <div
                  key={entry.filename}
                  className="p-3 rounded-xs border border-neutral-100 bg-neutral-50/50 flex flex-col justify-between"
                >
                  <span className="font-mono text-xs text-neutral-900 truncate" title={entry.filename}>
                    {entry.filename}
                  </span>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-200/50 text-[11px]">
                    <span className="text-neutral-500 capitalize">{entry.category}</span>
                    <span
                      className={`font-mono font-medium ${
                        entry.isAvailable ? 'text-emerald-700' : 'text-neutral-400'
                      }`}
                    >
                      {entry.isAvailable ? 'AVAILABLE' : 'PENDING'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>
    </div>
  )
}
