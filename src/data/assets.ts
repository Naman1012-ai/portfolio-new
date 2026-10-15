import type { AssetManifestEntry } from '@/types'

/**
 * Explicit Asset Manifest for Portfolio 2.0.
 * Single source of truth for assets residing directly inside public/assets/.
 * Prevents runtime guessing, broken image elements, and unverified credentials.
 */
export const assetManifest: AssetManifestEntry[] = [
  {
    filename: 'convia-logo.png',
    category: 'branding',
    label: 'Convia Platform Logo',
    isAvailable: true,
    mimeType: 'image/png',
    description: 'Official branding mark for the Convia workspace platform.',
  },
  {
    filename: 'convia-preview.png',
    category: 'project-evidence',
    label: 'Convia Interface Preview',
    isAvailable: true,
    mimeType: 'image/png',
    description: 'Interface walkthrough screenshot for Convia workspace.',
  },
  {
    filename: 'biolynk-preview.png',
    category: 'project-evidence',
    label: 'BioLynk Platform Preview',
    isAvailable: true,
    mimeType: 'image/png',
    description: 'Healthcare donor coordination and donor profile interface preview for BioLynk prototype.',
  },
  {
    filename: 'docframe-preview.png',
    category: 'project-evidence',
    label: 'DocFrame Interface Preview',
    isAvailable: true,
    mimeType: 'image/png',
    description: 'Deterministic vector PDF export and split-pane markdown authoring interface for DocFrame.',
  },
  {
    filename: 'resumetrices-preview.png',
    category: 'project-evidence',
    label: 'ResumeTrices Platform Preview',
    isAvailable: true,
    mimeType: 'image/png',
    description: 'AI resume competency evaluation and ATS optimization platform interface for ResumeTrices.',
  },
  {
    filename: 'energy-risk-preview.png',
    category: 'project-evidence',
    label: 'Global Energy Risk Monitor Preview',
    isAvailable: true,
    mimeType: 'image/png',
    description: 'Geopolitical energy vulnerability analytics dashboard and regional risk explorer preview.',
  },
  {
    filename: 'quiz-master-preview.png',
    category: 'project-evidence',
    label: 'Quiz Master Platform Preview',
    isAvailable: true,
    mimeType: 'image/png',
    description: 'Modular ANSI C quiz application with interactive timed question engine and high-score leaderboard.',
  },
  {
    filename: 'atm-machine-preview.png',
    category: 'project-evidence',
    label: 'ATM Machine Platform Preview',
    isAvailable: true,
    mimeType: 'image/png',
    description: 'Terminal-based ATM banking simulation with authenticated account details and transaction history audit ledger.',
  },
  {
    filename: 'library-system-preview.png',
    category: 'project-evidence',
    label: 'Library Management System Preview',
    isAvailable: true,
    mimeType: 'image/png',
    description: 'Console-based C++ library inventory catalog and customer circulation loan tracking preview.',
  },
  {
    filename: 'nidar-wiring-diagram.png',
    category: 'project-evidence',
    label: 'NIDAR Pico Flight Controller Wiring Diagram',
    isAvailable: false,
    mimeType: 'image/png',
    description: 'Hardware integration and pinout schematic for the RP2040 flight controller.',
  },
  {
    filename: 'profile.webp',
    category: 'profile',
    label: 'Naman Prajapati Portrait',
    isAvailable: false,
    mimeType: 'image/webp',
    description: 'Authentic photographic portrait of Naman Prajapati.',
  },
  {
    filename: 'resume-naman-prajapati.pdf',
    category: 'document',
    label: 'Curriculum Vitae',
    isAvailable: true,
    mimeType: 'application/pdf',
    description: 'Official verified resume document for Naman Prajapati.',
  },
  // Optimized WebP Variants for Production Performance
  {
    filename: 'convia-logo.webp',
    category: 'branding',
    label: 'Convia Platform Logo (WebP)',
    isAvailable: true,
    mimeType: 'image/webp',
    description: 'Lossless WebP optimized branding mark for Convia.',
  },
  {
    filename: 'convia-preview.webp',
    category: 'project-evidence',
    label: 'Convia Interface Preview (WebP)',
    isAvailable: true,
    mimeType: 'image/webp',
    description: 'WebP optimized interface walkthrough screenshot for Convia workspace.',
  },
  {
    filename: 'biolynk-preview.webp',
    category: 'project-evidence',
    label: 'BioLynk Platform Preview (WebP)',
    isAvailable: true,
    mimeType: 'image/webp',
    description: 'WebP optimized donor coordination preview for BioLynk.',
  },
  {
    filename: 'docframe-preview.webp',
    category: 'project-evidence',
    label: 'DocFrame Interface Preview (WebP)',
    isAvailable: true,
    mimeType: 'image/webp',
    description: 'WebP optimized text-to-PDF engine preview for DocFrame.',
  },
  {
    filename: 'resumetrices-preview.webp',
    category: 'project-evidence',
    label: 'ResumeTrices Platform Preview (WebP)',
    isAvailable: true,
    mimeType: 'image/webp',
    description: 'WebP optimized resume ATS evaluation preview for ResumeTrices.',
  },
  {
    filename: 'energy-risk-preview.webp',
    category: 'project-evidence',
    label: 'Global Energy Risk Monitor Preview (WebP)',
    isAvailable: true,
    mimeType: 'image/webp',
    description: 'WebP optimized geopolitical energy analytics preview.',
  },
  {
    filename: 'quiz-master-preview.webp',
    category: 'project-evidence',
    label: 'Quiz Master Platform Preview (WebP)',
    isAvailable: true,
    mimeType: 'image/webp',
    description: 'WebP optimized timed ANSI C quiz engine preview for Quiz Master.',
  },
  {
    filename: 'atm-machine-preview.webp',
    category: 'project-evidence',
    label: 'ATM Machine Platform Preview (WebP)',
    isAvailable: true,
    mimeType: 'image/webp',
    description: 'WebP optimized terminal ATM simulation preview for ATM Machine.',
  },
  {
    filename: 'library-system-preview.webp',
    category: 'project-evidence',
    label: 'Library Management System Preview (WebP)',
    isAvailable: true,
    mimeType: 'image/webp',
    description: 'WebP optimized C++ library inventory preview for Library Management System.',
  },
]

/**
 * Lookup asset entry from the manifest by filename.
 */
export function getAssetManifestEntry(filename: string): AssetManifestEntry | undefined {
  const cleanName = filename.replace(/^(\/)?(assets\/)?/, '')
  return assetManifest.find((entry) => entry.filename === cleanName)
}

/**
 * Checks whether an asset is registered and verified as available.
 */
export function isAssetAvailable(filename?: string): boolean {
  if (!filename) return false
  const entry = getAssetManifestEntry(filename)
  return entry ? entry.isAvailable : false
}
