import { siteProfile } from '@/data/profile'
import { siteMetadata } from '@/data/siteConfig'

interface NodeFs {
  readFileSync: (filePath: string, encoding: string) => string
  existsSync: (filePath: string) => boolean
}

interface NodePath {
  resolve: (...paths: string[]) => string
}

function getNodeModules(): { fs: NodeFs; path: NodePath } | null {
  try {
    // Dynamic access to avoid TS2591 in browser tsconfig
    // eslint-disable-next-line no-eval
    const req = eval('require')
    return {
      fs: req('node:fs'),
      path: req('node:path'),
    }
  } catch {
    return null
  }
}

/**
 * Verification suite for:
 * 1. index.html <title> strictly equals `${siteProfile.name} — ${siteProfile.title}`.
 * 2. vercel.json exists, is valid JSON, and defines single SPA rewrite "/(.*)" -> "/index.html".
 * 3. index.html contains all required production SEO, OG, Twitter, canonical, and theme-color tags.
 * 4. index.html strictly excludes og:image and twitter:image.
 * 5. siteConfig siteUrl equals "https://portfolio-new-one-liart.vercel.app".
 */
export function verifyProductionDeployment(): { passed: boolean; message: string } {
  // 1. Check siteConfig.siteUrl
  const expectedSiteUrl = 'https://portfolio-new-one-liart.vercel.app'
  if (siteMetadata.siteUrl !== expectedSiteUrl) {
    return {
      passed: false,
      message: `siteMetadata.siteUrl must be "${expectedSiteUrl}", got "${siteMetadata.siteUrl}"`,
    }
  }

  const nodeMods = getNodeModules()
  if (!nodeMods) {
    return {
      passed: false,
      message: 'Node fs/path modules are unavailable in current test environment',
    }
  }

  const { fs, path } = nodeMods
  // eslint-disable-next-line no-eval
  const cwd = eval('process.cwd()')

  // 2. Check vercel.json
  const vercelPath = path.resolve(cwd, 'vercel.json')
  if (!fs.existsSync(vercelPath)) {
    return { passed: false, message: 'vercel.json does not exist at repo root' }
  }

  let vercelConfig: { rewrites?: Array<{ source?: string; destination?: string }> }
  try {
    const vercelRaw = fs.readFileSync(vercelPath, 'utf-8')
    vercelConfig = JSON.parse(vercelRaw)
  } catch (err) {
    return { passed: false, message: `vercel.json is not valid JSON: ${err}` }
  }

  if (!Array.isArray(vercelConfig.rewrites) || vercelConfig.rewrites.length !== 1) {
    return {
      passed: false,
      message: 'vercel.json must define exactly one rewrite rule',
    }
  }

  const rewrite = vercelConfig.rewrites[0]
  if (rewrite.source !== '/(.*)' || rewrite.destination !== '/index.html') {
    return {
      passed: false,
      message: `vercel.json rewrite must be source "/(.*)" -> destination "/index.html", got source "${rewrite.source}" -> destination "${rewrite.destination}"`,
    }
  }

  // 3. Check index.html
  const indexPath = path.resolve(cwd, 'index.html')
  if (!fs.existsSync(indexPath)) {
    return { passed: false, message: 'index.html does not exist at repo root' }
  }

  const indexHtml = fs.readFileSync(indexPath, 'utf-8')

  // Check title
  const titleMatch = indexHtml.match(/<title>(.*?)<\/title>/)
  if (!titleMatch) {
    return { passed: false, message: 'index.html does not contain a <title> tag' }
  }

  const indexTitle = titleMatch[1].trim()
  const expectedTitle = `${siteProfile.name} — ${siteProfile.title}`
  if (indexTitle !== expectedTitle) {
    return {
      passed: false,
      message: `index.html <title> ("${indexTitle}") must strictly equal \${siteProfile.name} — \${siteProfile.title} ("${expectedTitle}")`,
    }
  }

  // Check description
  if (!indexHtml.includes('name="description"')) {
    return { passed: false, message: 'index.html must include meta name="description"' }
  }

  // Check theme-color
  if (!indexHtml.includes('name="theme-color"')) {
    return { passed: false, message: 'index.html must include meta name="theme-color"' }
  }

  // Check canonical
  if (!indexHtml.includes(`rel="canonical" href="${expectedSiteUrl}/"`)) {
    return {
      passed: false,
      message: `index.html must include canonical link to "${expectedSiteUrl}/"`,
    }
  }

  // Check Open Graph tags
  if (!indexHtml.includes('property="og:title"')) {
    return { passed: false, message: 'index.html must include meta property="og:title"' }
  }
  if (!indexHtml.includes('property="og:description"')) {
    return { passed: false, message: 'index.html must include meta property="og:description"' }
  }
  if (!indexHtml.includes('property="og:type" content="website"')) {
    return { passed: false, message: 'index.html must include meta property="og:type" content="website"' }
  }
  if (!indexHtml.includes(`property="og:url" content="${expectedSiteUrl}/"`)) {
    return {
      passed: false,
      message: `index.html must include meta property="og:url" content="${expectedSiteUrl}/"`,
    }
  }

  // Check Twitter tags
  if (!indexHtml.includes('name="twitter:card" content="summary"')) {
    return { passed: false, message: 'index.html must include meta name="twitter:card" content="summary"' }
  }

  // Exclude og:image and twitter:image
  if (indexHtml.includes('og:image') || indexHtml.includes('twitter:image')) {
    return {
      passed: false,
      message: 'index.html must NOT include og:image or twitter:image until a suitable 1200x630 asset exists',
    }
  }

  return {
    passed: true,
    message: 'All production deployment, index.html title/metadata, and vercel.json SPA rewrite checks passed',
  }
}
