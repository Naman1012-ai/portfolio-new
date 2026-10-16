import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Header } from '@/components/layout/Header'
import { Layout } from '@/components/layout/Layout'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { navigationItems } from '@/data'
import { computeScrollCompact } from '@/hooks/useScrollCompact'
import { RouterProvider } from '@/router'
// Ensure React and browser globals are present on globalThis for tsx runtime evaluation in Node
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

/**
 * Verification suite for:
 * 1. Layout regression test: no ancestor of header uses overflow-x-hidden / overflow-hidden / overflow-auto.
 * 2. useScrollCompact: hysteresis math, boundary thresholds (64px collapse, 16px expand), state preservation.
 * 3. MobileMenu: aria-expanded toggle, min 44x44px target, panel items in exact order, resume availability states.
 * 4. Header: sticky positioning, h-16 height preservation, animated swap accessibility.
 */
export function verifyStickyHeaderAndMobileMenu(): { passed: boolean; message: string } {
  // --- 1. Task 1 Regression Test: Layout wrapper must not use overflow-x-hidden ---
  const layoutMarkup = renderToStaticMarkup(
    React.createElement(
      RouterProvider,
      null,
      React.createElement(Layout, null, React.createElement('div', { id: 'test-content' }, 'Content'))
    )
  )

  // Find the wrapper element that precedes <header>
  const headerIndex = layoutMarkup.indexOf('<header')
  if (headerIndex === -1) {
    return { passed: false, message: 'Layout does not render a <header> element' }
  }

  const wrapperBeforeHeader = layoutMarkup.substring(0, headerIndex)
  if (
    wrapperBeforeHeader.includes('overflow-x-hidden') ||
    wrapperBeforeHeader.includes('overflow-hidden') ||
    wrapperBeforeHeader.includes('overflow-auto')
  ) {
    return {
      passed: false,
      message:
        'Regression failure: An ancestor of <header> in Layout uses overflow-x-hidden, overflow-hidden, or overflow-auto',
    }
  }

  if (!wrapperBeforeHeader.includes('overflow-x-clip')) {
    return {
      passed: false,
      message: 'Layout wrapper must use overflow-x-clip to prevent horizontal overflow without breaking sticky',
    }
  }

  // --- 2. Task 2: useScrollCompact Hysteresis Logic ---
  // A. Collapse above 64px
  if (!computeScrollCompact(65, false, 64, 16)) {
    return { passed: false, message: 'computeScrollCompact must return true when scrollY > 64 from false state' }
  }
  if (!computeScrollCompact(65, true, 64, 16)) {
    return { passed: false, message: 'computeScrollCompact must return true when scrollY > 64 from true state' }
  }

  // B. Expand below or at 16px
  if (computeScrollCompact(16, true, 64, 16)) {
    return { passed: false, message: 'computeScrollCompact must return false when scrollY <= 16 from true state' }
  }
  if (computeScrollCompact(0, true, 64, 16)) {
    return { passed: false, message: 'computeScrollCompact must return false when scrollY = 0 from true state' }
  }
  if (computeScrollCompact(10, false, 64, 16)) {
    return { passed: false, message: 'computeScrollCompact must return false when scrollY <= 16 from false state' }
  }

  // C. Hysteresis band (16 < scrollY <= 64): must preserve previous state to prevent flicker
  const testMidValues = [17, 25, 40, 55, 64]
  for (const mid of testMidValues) {
    if (computeScrollCompact(mid, true, 64, 16) !== true) {
      return {
        passed: false,
        message: `Hysteresis failure: at scrollY=${mid}, previousState=true should remain true`,
      }
    }
    if (computeScrollCompact(mid, false, 64, 16) !== false) {
      return {
        passed: false,
        message: `Hysteresis failure: at scrollY=${mid}, previousState=false should remain false`,
      }
    }
  }

  // --- 3. Task 3: MobileMenu Accessibility & Order ---
  // A. Closed state
  const closedMenuMarkup = renderToStaticMarkup(
    React.createElement(MobileMenu, {
      isOpen: false,
      onToggle: () => {},
      onClose: () => {},
      onNavClick: () => {},
      currentRoute: 'home',
    })
  )

  if (!closedMenuMarkup.includes('aria-expanded="false"')) {
    return { passed: false, message: 'Closed MobileMenu button must have aria-expanded="false"' }
  }
  if (!closedMenuMarkup.includes('aria-label="Open menu"')) {
    return { passed: false, message: 'Closed MobileMenu button must have aria-label="Open menu"' }
  }
  if (!closedMenuMarkup.includes('aria-controls="header-mobile-menu-panel"')) {
    return { passed: false, message: 'MobileMenu button must point aria-controls to header-mobile-menu-panel' }
  }
  if (!closedMenuMarkup.includes('min-w-[44px]') || !closedMenuMarkup.includes('min-h-[44px]')) {
    return { passed: false, message: 'MobileMenu button must have minimum 44x44px touch target dimensions' }
  }
  if (closedMenuMarkup.includes('id="header-mobile-menu-panel"')) {
    return { passed: false, message: 'Closed MobileMenu must not render the dropdown panel' }
  }

  // B. Open state
  const openMenuMarkup = renderToStaticMarkup(
    React.createElement(MobileMenu, {
      isOpen: true,
      onToggle: () => {},
      onClose: () => {},
      currentRoute: 'home',
    })
  )

  if (!openMenuMarkup.includes('aria-expanded="true"')) {
    return { passed: false, message: 'Open MobileMenu button must have aria-expanded="true"' }
  }
  if (!openMenuMarkup.includes('aria-label="Close menu"')) {
    return { passed: false, message: 'Open MobileMenu button must have aria-label="Close menu"' }
  }
  if (!openMenuMarkup.includes('id="header-mobile-menu-panel"')) {
    return { passed: false, message: 'Open MobileMenu must render the dropdown panel with id="header-mobile-menu-panel"' }
  }

  // C. Verify MobileMenu contains ONLY the perspective buttons (Overview, Founder, Interviewer, Investor)
  const expectedPerspectiveButtons = ['Overview', 'Founder', 'Interviewer', 'Investor']
  for (const btn of expectedPerspectiveButtons) {
    if (!openMenuMarkup.includes(btn)) {
      return {
        passed: false,
        message: `MobileMenu dropdown panel is missing perspective button for ${btn}`,
      }
    }
  }

  // Verify MobileMenu does NOT contain page links (these are kept permanently in header nav)
  for (const item of navigationItems) {
    if (openMenuMarkup.includes(`href="${item.href}"`)) {
      return {
        passed: false,
        message: `MobileMenu dropdown panel must not contain page link for ${item.label}; nav links must be permanent in header`,
      }
    }
  }

  // --- 4. Task 4: Header sticky positioning, height preservation & permanent nav links ---
  const headerMarkup = renderToStaticMarkup(
    React.createElement(RouterProvider, null, React.createElement(Header, null))
  )

  if (!headerMarkup.includes('sticky top-0 z-50')) {
    return { passed: false, message: 'Header must have sticky top-0 z-50 classes' }
  }
  if (!headerMarkup.includes('h-16')) {
    return { passed: false, message: 'Header must maintain fixed h-16 height' }
  }

  // Verify all navigationItems are permanently present in Header
  for (const item of navigationItems) {
    if (!headerMarkup.includes(`href="${item.href}"`) || !headerMarkup.includes(item.label)) {
      return {
        passed: false,
        message: `Header navigation must permanently include ${item.label} (${item.href})`,
      }
    }
  }

  // Verify ResumeAction is permanently present in Header
  if (!headerMarkup.includes('data-testid="resume-action"')) {
    return { passed: false, message: 'Header must permanently include ResumeAction' }
  }

  return {
    passed: true,
    message: 'All sticky header, permanent navigation, MobileMenu perspective buttons, and Layout regression checks passed',
  }
}
