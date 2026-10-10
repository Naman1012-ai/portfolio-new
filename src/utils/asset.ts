import { getAssetManifestEntry, isAssetAvailable } from '@/data/assets'

export { getAssetManifestEntry, isAssetAvailable }

/**
 * Resolves standard web URL for assets stored in public/assets/.
 * All assets (images, PDFs, documents, media) must be kept directly in public/assets/
 * with no nested subdirectories.
 *
 * @param filename - File name inside public/assets/ (e.g., 'convia-logo.png')
 * @returns Web-accessible path to the asset
 */
export function getAssetPath(filename: string): string {
  if (!filename) return ''
  // Strip leading slashes or 'assets/' prefix if mistakenly provided
  const cleanName = filename.replace(/^(\/)?(assets\/)?/, '')
  return `/assets/${cleanName}`
}

/**
 * Safely resolves an asset URL, verifying availability in the manifest.
 * Prevents broken 404 links for pending or placeholder assets.
 *
 * @param filename - Asset filename
 * @param fallback - Optional fallback path (e.g. placeholder SVG or null)
 * @returns Valid asset URL if available, otherwise fallback
 */
export function resolveSafeAssetUrl(
  filename?: string,
  fallback: string | null = null,
): string | null {
  if (!filename) return fallback

  const cleanName = filename.replace(/^(\/)?(assets\/)?/, '')
  const available = isAssetAvailable(cleanName)

  if (available) {
    return `/assets/${cleanName}`
  }

  return fallback
}

/**
 * Returns comprehensive availability status and resolved URL for an asset.
 */
export function getAssetStatus(filename?: string): {
  isAvailable: boolean
  url: string | null
  label: string
} {
  if (!filename) {
    return { isAvailable: false, url: null, label: 'Unspecified Asset' }
  }

  const cleanName = filename.replace(/^(\/)?(assets\/)?/, '')
  const entry = getAssetManifestEntry(cleanName)
  const available = Boolean(entry?.isAvailable)

  return {
    isAvailable: available,
    url: available ? `/assets/${cleanName}` : null,
    label: entry?.label || cleanName,
  }
}
