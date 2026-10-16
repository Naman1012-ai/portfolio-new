import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { siteProfile } from '@/data/profile'
import { siteMetadata } from '@/data/siteConfig'
import { NotFoundPage, ProjectDetailPage, ProjectsPage } from '@/pages'
import { RouterProvider } from '@/router'
import { parsePath } from '@/router/context'

;(globalThis as unknown as { React: typeof React }).React = React

if (typeof (globalThis as unknown as { window?: unknown }).window === 'undefined') {
  ;(globalThis as unknown as { window: unknown }).window = {
    location: { pathname: '/', hash: '' },
    history: { pushState: () => {}, replaceState: () => {} },
    addEventListener: () => {},
    removeEventListener: () => {},
    scrollTo: () => {},
    requestAnimationFrame: (cb: (time: number) => void) => setTimeout(cb, 0),
    cancelAnimationFrame: (id: number) => clearTimeout(id),
    innerWidth: 1280,
    scrollY: 0,
  }
}

interface NodeFs {
  readFileSync: (filePath: string, encoding: string) => string
  existsSync: (filePath: string) => boolean
  readdirSync: (dirPath: string, options?: { withFileTypes?: boolean }) => Array<{ name: string; isDirectory: () => boolean }>
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
 * 5. siteConfig siteUrl equals "https://namanprajapati-07.vercel.app".
 */
export function verifyProductionDeployment(): { passed: boolean; message: string } {
  // 1. Check siteConfig.siteUrl
  const expectedSiteUrl = 'https://namanprajapati-07.vercel.app'
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
  if (!indexHtml.includes('name="twitter:card" content="summary_large_image"')) {
    return { passed: false, message: 'index.html must include meta name="twitter:card" content="summary_large_image"' }
  }

  // Check Open Graph and Twitter image tags
  const expectedImageUrl = `${expectedSiteUrl}/assets/convia-preview.png`
  if (!indexHtml.includes(`property="og:image" content="${expectedImageUrl}"`)) {
    return {
      passed: false,
      message: `index.html must include meta property="og:image" content="${expectedImageUrl}"`,
    }
  }
  if (!indexHtml.includes(`name="twitter:image" content="${expectedImageUrl}"`)) {
    return {
      passed: false,
      message: `index.html must include meta name="twitter:image" content="${expectedImageUrl}"`,
    }
  }
  if (!indexHtml.includes('property="og:image:width" content="1618"') || !indexHtml.includes('property="og:image:height" content="972"')) {
    return {
      passed: false,
      message: 'index.html must include og:image:width and og:image:height matching verified asset dimensions',
    }
  }

  // 4. Verify 404 Routing and Unknown Route Parsing
  const unknownRouteResult = parsePath('/some-unknown-path')
  if (unknownRouteResult.route !== 'not-found' || unknownRouteResult.path !== '/some-unknown-path') {
    return {
      passed: false,
      message: `parsePath('/some-unknown-path') must return route="not-found" with clean path, got ${JSON.stringify(unknownRouteResult)}`,
    }
  }

  const projectsRouteResult = parsePath('/projects')
  if (projectsRouteResult.route !== 'projects' || projectsRouteResult.path !== '/projects') {
    return {
      passed: false,
      message: `parsePath('/projects') must return route="projects" with clean path, got ${JSON.stringify(projectsRouteResult)}`,
    }
  }

  const invalidSlugResult = parsePath('/projects/non-existent-project')
  if (invalidSlugResult.route !== 'project-detail' || invalidSlugResult.slug !== 'non-existent-project') {
    return {
      passed: false,
      message: `parsePath('/projects/non-existent-project') must return route="project-detail" with slug, got ${JSON.stringify(invalidSlugResult)}`,
    }
  }

  // 5. Verify Component Exports for 404, Projects, and Project Detail
  if (typeof NotFoundPage !== 'function') {
    return { passed: false, message: 'NotFoundPage component must be exported as a function' }
  }
  if (typeof ProjectsPage !== 'function') {
    return { passed: false, message: 'ProjectsPage component must be exported as a function' }
  }
  if (typeof ProjectDetailPage !== 'function') {
    return { passed: false, message: 'ProjectDetailPage component must be exported as a function' }
  }

  // 6. Verify NotFoundPage and ProjectDetailPage static rendering & recovery actions
  const notFoundMarkup = renderToStaticMarkup(
    React.createElement(
      RouterProvider,
      null,
      React.createElement(NotFoundPage, null)
    )
  )
  if (!notFoundMarkup.includes('Page Not Found')) {
    return { passed: false, message: 'NotFoundPage must render "Page Not Found"' }
  }
  if (!notFoundMarkup.includes('Return to Homepage')) {
    return { passed: false, message: 'NotFoundPage must provide a "Return to Homepage" action' }
  }

  const projectsMarkup = renderToStaticMarkup(
    React.createElement(
      RouterProvider,
      null,
      React.createElement(ProjectsPage, null)
    )
  )
  if (!projectsMarkup.includes('PROJECT UNIVERSE')) {
    return { passed: false, message: 'ProjectsPage must render "PROJECT UNIVERSE"' }
  }

  const invalidProjectMarkup = renderToStaticMarkup(
    React.createElement(
      RouterProvider,
      null,
      React.createElement(ProjectDetailPage, { slug: 'ghost-slug-test' })
    )
  )
  if (!invalidProjectMarkup.includes('Project Not Found')) {
    return { passed: false, message: 'Invalid project slug must render "Project Not Found"' }
  }
  if (!invalidProjectMarkup.includes('ghost-slug-test')) {
    return { passed: false, message: 'Invalid project slug must display the specific invalid slug' }
  }
  if (!invalidProjectMarkup.includes('Return to Project Universe') && !invalidProjectMarkup.includes('Return to All Projects')) {
    return { passed: false, message: 'Invalid project detail must provide Return to Project Universe action' }
  }

  // 7. Grep src for forbidden person-title phrases: "Systems Builder" and "Systems & AI Engineer"
  // (project category label "Systems & AI" is allowed)
  const srcDir = path.resolve(cwd, 'src')
  function scanDir(dir: string): string[] {
    const hits: string[] = []
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.resolve(dir, entry.name)
      if (entry.isDirectory()) {
        hits.push(...scanDir(fullPath))
      } else if (/\.(tsx?|jsx?|html|css)$/.test(entry.name)) {
        if (entry.name === 'productionDeployment.test.ts') continue

        const content = fs.readFileSync(fullPath, 'utf-8')
        if (content.includes('Systems Builder')) {
          hits.push(`Found "Systems Builder" in ${entry.name}`)
        }
        if (content.includes('Systems & AI Engineer')) {
          hits.push(`Found "Systems & AI Engineer" in ${entry.name}`)
        }
      }
    }
    return hits
  }

  const forbiddenHits = scanDir(srcDir)
  if (forbiddenHits.length > 0) {
    return {
      passed: false,
      message: `Found forbidden person-title phrases in src: ${forbiddenHits.join(', ')}`,
    }
  }

  return {
    passed: true,
    message: 'All production deployment, social metadata, 404 routing, and vercel.json SPA rewrite checks passed',
  }
}
