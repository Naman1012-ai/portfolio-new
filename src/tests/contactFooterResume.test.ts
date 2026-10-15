import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

// Ensure React is present on globalThis for tsx runtime evaluation of JSX in Node
;(globalThis as unknown as { React: typeof React }).React = React
import {
  GITHUB_PATH,
  GitHubIcon,
  INSTAGRAM_PATH,
  InstagramIcon,
  LINKEDIN_PATH,
  LinkedInIcon,
} from '@/components/common/BrandIcons'
import { ResumeAction } from '@/components/common/ResumeAction'
import { Footer } from '@/components/layout/Footer'
import { assetManifest, isAssetAvailable, siteProfile } from '@/data'

/**
 * Verification suite for:
 * 1. Footer social icon removal & clean layout.
 * 2. Contact section brand logos & primary/secondary hierarchy.
 * 3. LinkedIn URL sanitization & query parameter exclusion.
 * 4. Resume single source of truth, availability states, and fallback behavior.
 */
export function verifyContactFooterAndResume(): { passed: boolean; message: string } {
  // 1. Task 3: LinkedIn URL and Social Links Sanitization
  const linkedin = siteProfile.socialLinks.find((s) => s.platform === 'linkedin')
  if (!linkedin) {
    return { passed: false, message: 'LinkedIn social link is missing from siteProfile' }
  }

  const expectedLinkedInUrl = 'https://www.linkedin.com/in/naman-prajapati-46a942377/'
  if (linkedin.url !== expectedLinkedInUrl) {
    return {
      passed: false,
      message: `LinkedIn URL must be exactly "${expectedLinkedInUrl}", got "${linkedin.url}"`,
    }
  }

  for (const social of siteProfile.socialLinks) {
    if (!social.url.startsWith('mailto:')) {
      if (social.url.includes('?')) {
        return {
          passed: false,
          message: `Non-mailto social link for ${social.platform} must not contain query parameters ("?"): ${social.url}`,
        }
      }
      if (social.url.includes('lipi=')) {
        return {
          passed: false,
          message: `Social link for ${social.platform} must not contain lipi tracking: ${social.url}`,
        }
      }
    }
  }

  // 2. Task 4a: Manual isAvailable removed from siteProfile.resume
  if ('isAvailable' in siteProfile.resume) {
    return {
      passed: false,
      message: 'siteProfile.resume must not contain a manual isAvailable property',
    }
  }

  if (siteProfile.resume.filename !== 'resume-naman-prajapati.pdf') {
    return {
      passed: false,
      message: `Resume filename must remain "resume-naman-prajapati.pdf", got "${siteProfile.resume.filename}"`,
    }
  }

  // 3. Task 4: Manifest Source of Truth
  const resumeManifestEntry = assetManifest.find(
    (e) => e.filename === 'resume-naman-prajapati.pdf',
  )
  if (!resumeManifestEntry) {
    return {
      passed: false,
      message: 'resume-naman-prajapati.pdf must be registered in assetManifest',
    }
  }

  if (!isAssetAvailable('resume-naman-prajapati.pdf')) {
    return {
      passed: false,
      message: 'isAssetAvailable("resume-naman-prajapati.pdf") must return true when manifest entry is available',
    }
  }

  if (isAssetAvailable('unregistered-file.pdf')) {
    return {
      passed: false,
      message: 'isAssetAvailable must return false for files not registered in the manifest',
    }
  }

  // 4. Task 4b & 4c: ResumeAction AVAILABLE state tests
  const variants: Array<'hero' | 'contact' | 'header'> = ['hero', 'contact', 'header']
  for (const variant of variants) {
    const markupAvailable = renderToStaticMarkup(
      ResumeAction({ variant, isAvailableOverride: true }),
    )

    if (!markupAvailable.includes('<a')) {
      return {
        passed: false,
        message: `ResumeAction [variant="${variant}"] when available must render an anchor <a>`,
      }
    }
    if (!markupAvailable.includes('href="/assets/resume-naman-prajapati.pdf"')) {
      return {
        passed: false,
        message: `ResumeAction [variant="${variant}"] when available must link to "/assets/resume-naman-prajapati.pdf"`,
      }
    }
    if (!markupAvailable.includes('target="_blank"') || !markupAvailable.includes('rel="noopener noreferrer"')) {
      return {
        passed: false,
        message: `ResumeAction [variant="${variant}"] when available must include target="_blank" and rel="noopener noreferrer"`,
      }
    }
    if (markupAvailable.includes('Resume coming soon')) {
      return {
        passed: false,
        message: `ResumeAction [variant="${variant}"] when available must not display "Resume coming soon"`,
      }
    }
  }

  // 5. Task 4b & 4c: ResumeAction UNAVAILABLE / FALLBACK state tests
  for (const variant of variants) {
    const markupUnavailable = renderToStaticMarkup(
      ResumeAction({ variant, isAvailableOverride: false }),
    )

    if (markupUnavailable.includes('<a') || markupUnavailable.includes('href=')) {
      return {
        passed: false,
        message: `ResumeAction [variant="${variant}"] when unavailable must NOT render an anchor or href`,
      }
    }
    if (!markupUnavailable.includes('Resume coming soon')) {
      return {
        passed: false,
        message: `ResumeAction [variant="${variant}"] when unavailable must display "Resume coming soon"`,
      }
    }
    if (!markupUnavailable.includes('aria-disabled="true"')) {
      return {
        passed: false,
        message: `ResumeAction [variant="${variant}"] when unavailable must have aria-disabled="true"`,
      }
    }
    if (markupUnavailable.includes('tabindex="0"') || markupUnavailable.includes('tabIndex="0"')) {
      return {
        passed: false,
        message: `ResumeAction [variant="${variant}"] when unavailable must not be focusable`,
      }
    }
  }

  // 6. Task 2: Brand Icons & Official Simple Icons Path Data
  if (!LINKEDIN_PATH.startsWith('M20.447 20.452h-3.554v-5.569c0-1.328')) {
    return { passed: false, message: 'LinkedIn brand icon path data must match official Simple Icons' }
  }
  if (!GITHUB_PATH.startsWith('M12 .297c-6.63 0-12 5.373-12 12')) {
    return { passed: false, message: 'GitHub brand icon path data must match official Simple Icons' }
  }
  if (!INSTAGRAM_PATH.startsWith('M7.0301.084c-1.2768.0602')) {
    return { passed: false, message: 'Instagram brand icon path data must match official Simple Icons' }
  }

  const linkedinMarkup = renderToStaticMarkup(LinkedInIcon({ brandColor: true }))
  if (!linkedinMarkup.includes('#0A66C2') || !linkedinMarkup.includes('aria-hidden="true"')) {
    return { passed: false, message: 'LinkedInIcon must render with #0A66C2 and aria-hidden="true"' }
  }

  const githubMarkup = renderToStaticMarkup(GitHubIcon({ brandColor: true }))
  if (!githubMarkup.includes('#181717') || !githubMarkup.includes('aria-hidden="true"')) {
    return { passed: false, message: 'GitHubIcon must render with #181717 and aria-hidden="true"' }
  }

  const instagramMarkup = renderToStaticMarkup(InstagramIcon({ brandColor: true }))
  if (!instagramMarkup.includes('#E4405F') || !instagramMarkup.includes('aria-hidden="true"')) {
    return { passed: false, message: 'InstagramIcon must render with #E4405F and aria-hidden="true"' }
  }

  // 7. Task 1: Footer social icons row removed
  const footerMarkup = renderToStaticMarkup(Footer())
  if (footerMarkup.includes('github') || footerMarkup.includes('linkedin') || footerMarkup.includes('instagram')) {
    return { passed: false, message: 'Footer must not render GitHub, LinkedIn, or Instagram icons or links' }
  }
  if (!footerMarkup.includes('Naman Prajapati') || !footerMarkup.includes('React 19')) {
    return { passed: false, message: 'Footer must preserve copyright and build metadata' }
  }

  // 8. Task 5: Footer BrandLockup routing behavior (Phase 02.1 regression check)
  if (typeof window !== 'undefined') {
    window.location.pathname = '/projects/convia'
  }
  const footerDetailMarkup = renderToStaticMarkup(Footer())
  if (!footerDetailMarkup.includes('href="/#hero"')) {
    return {
      passed: false,
      message: 'Footer BrandLockup must link to "/#hero" when rendered on a project-detail route',
    }
  }

  if (typeof window !== 'undefined') {
    window.location.pathname = '/'
  }
  const footerHomeMarkup = renderToStaticMarkup(Footer())
  if (!footerHomeMarkup.includes('href="#hero"')) {
    return {
      passed: false,
      message: 'Footer BrandLockup must link to "#hero" when rendered on the home route',
    }
  }

  return {
    passed: true,
    message: 'All Contact, Footer, and Resume cleanup verification checks passed',
  }
}
