import type { MouseEvent } from 'react'
import { Button } from '@/components/common/Button'
import { Icon } from '@/components/common/Icon'
import { siteProfile } from '@/data/profile'
import { isAssetAvailable, resolveSafeAssetUrl } from '@/utils/asset'

export type ResumeActionVariant = 'hero' | 'contact' | 'header'

export interface ResumeActionProps {
  variant?: ResumeActionVariant
  className?: string
  /**
   * Optional custom button/link text when available.
   * Defaults to:
   * - 'hero': "View Resume"
   * - 'contact': "Download Resume"
   * - 'header': "Resume"
   */
  label?: string
  /**
   * Optional availability override for automated testing and mocked states.
   * When omitted, availability is determined exclusively by the manifest via isAssetAvailable.
   */
  isAvailableOverride?: boolean
  /**
   * Force local device download rather than opening in a new tab.
   * Defaults to true for 'contact' variant or when label contains 'download'.
   */
  download?: boolean
}

/**
 * Single source of truth resume action component.
 *
 * Availability is strictly bound to the asset manifest (isAssetAvailable).
 * - Available: renders an accessible anchor linking to the resolved safe asset URL.
 *   - For download actions (contact variant or download=true): downloads locally to the device
 *     using the download attribute and blob fallback without opening a new tab.
 *   - For view actions (header variant): opens verified PDF in a new tab.
 * - Unavailable: renders a non-clickable, non-focusable element with aria-disabled="true"
 *   reading "Resume coming soon" with muted styling.
 * Never renders a link to a file not in the manifest.
 */
export function ResumeAction({
  variant = 'hero',
  className,
  label,
  isAvailableOverride,
  download: downloadProp,
}: ResumeActionProps) {
  const filename = siteProfile.resume?.filename
  const available =
    isAvailableOverride !== undefined
      ? isAvailableOverride
      : (filename ? isAssetAvailable(filename) : false)

  const resumeUrl = available && filename ? resolveSafeAssetUrl(filename) : null

  const isDownload =
    downloadProp !== undefined
      ? downloadProp
      : variant === 'contact' || Boolean(label && /download/i.test(label))

  const handleDownloadClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    if (!resumeUrl) return

    // Allow normal browser new-tab behavior on Ctrl / Cmd / Shift / Alt or middle-click
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return
    }

    try {
      e.preventDefault()
      const response = await fetch(resumeUrl)
      if (!response.ok) throw new Error('Download failed')
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = filename || 'resume-naman-prajapati.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
    } catch {
      // Fallback: let standard browser download attribute proceed
      const link = document.createElement('a')
      link.href = resumeUrl
      link.download = filename || 'resume-naman-prajapati.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  // --- PRESENT STATE (Anchor link) ---
  if (available && resumeUrl) {
    if (variant === 'header') {
      return (
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="resume-action"
          data-variant="header"
          className={
            className ||
            'inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-medium text-neutral-900 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 rounded-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900'
          }
          aria-label="View Curriculum Vitae PDF (opens in new tab)"
        >
          <span>{label || 'Resume'}</span>
          <Icon name="arrow-up-right" size="xs" className="opacity-70" />
        </a>
      )
    }

    if (variant === 'contact') {
      return (
        <a
          href={resumeUrl}
          download={filename || 'resume-naman-prajapati.pdf'}
          onClick={handleDownloadClick}
          data-testid="resume-action"
          data-variant="contact"
          className={className || 'w-full sm:w-auto'}
          aria-label="Download Curriculum Vitae PDF locally"
        >
          <Button
            variant="outline"
            size="lg"
            leftIcon={<Icon name="download" size="sm" />}
            className="w-full sm:w-auto justify-center"
          >
            {label || 'Download Resume'}
          </Button>
        </a>
      )
    }

    // Default: 'hero'
    if (isDownload) {
      return (
        <a
          href={resumeUrl}
          download={filename || 'resume-naman-prajapati.pdf'}
          onClick={handleDownloadClick}
          data-testid="resume-action"
          data-variant="hero"
          className={className || 'inline-flex w-full sm:w-auto'}
          aria-label="Download Curriculum Vitae PDF locally"
        >
          <Button
            variant="outline"
            size="lg"
            leftIcon={<Icon name="download" size="sm" />}
            className="w-full sm:w-auto shrink-0 justify-center whitespace-nowrap"
          >
            {label || 'Download Resume'}
          </Button>
        </a>
      )
    }

    return (
      <a
        href={resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="resume-action"
        data-variant="hero"
        className={className || 'inline-flex w-full sm:w-auto'}
      >
        <Button
          variant="outline"
          size="lg"
          leftIcon={<Icon name="download" size="sm" />}
          aria-label="View Curriculum Vitae PDF (opens in new tab)"
          className="w-full sm:w-auto shrink-0 justify-center whitespace-nowrap"
        >
          {label || 'View Resume'}
        </Button>
      </a>
    )
  }

  // --- ABSENT STATE (Non-clickable, no anchor, no href, aria-disabled="true") ---
  if (variant === 'header') {
    return (
      <span
        aria-disabled="true"
        data-testid="resume-action-fallback"
        data-variant="header"
        className={
          className ||
          'inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-medium text-neutral-400 bg-neutral-100/50 border border-dashed border-neutral-200 rounded-sm select-none cursor-not-allowed'
        }
      >
        Resume coming soon
      </span>
    )
  }

  if (variant === 'contact') {
    return (
      <div
        aria-disabled="true"
        data-testid="resume-action-fallback"
        data-variant="contact"
        className={`inline-flex items-center justify-center h-11 px-5 text-base gap-2 rounded-md border border-neutral-200 bg-neutral-100/70 text-neutral-400 font-medium select-none cursor-not-allowed ${
          className || 'w-full sm:w-auto'
        }`}
      >
        <Icon name="download" size="sm" className="opacity-40" />
        <span>Resume coming soon</span>
      </div>
    )
  }

  // 'hero' fallback
  return (
    <div
      aria-disabled="true"
      data-testid="resume-action-fallback"
      data-variant="hero"
      className={`inline-flex items-center justify-center h-11 px-5 text-base gap-2 rounded-md border border-neutral-200 bg-neutral-100/70 text-neutral-400 font-medium whitespace-nowrap select-none cursor-not-allowed ${
        className || 'inline-flex w-full sm:w-auto'
      }`}
    >
      <Icon name="download" size="sm" className="opacity-40" />
      <span>Resume coming soon</span>
    </div>
  )
}
