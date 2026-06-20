export interface NavLink {
  id: string
  label: string
}

/** In-page anchors on the landing page ("/"). */
export const LANDING_LINKS: NavLink[] = [
  { id: 'how', label: 'How it works' },
  { id: 'use-cases', label: 'Use cases' },
]

/**
 * Anchor targets on the platform deep-dive page ("/platform"). Also used by the
 * footer and command palette. Order matches the page; the scrollspy is
 * order-independent regardless.
 */
export const NAV_LINKS: NavLink[] = [
  { id: 'problem', label: 'Problem' },
  { id: 'platform', label: 'Platform' },
  { id: 'pattern', label: 'Core pattern' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'vision', label: 'Vision' },
]

export const CONTACT_ID = 'contact'
export const CONTACT_URL = 'https://venziq.com'

export const CONTACT_EMAIL = 'reachus@venziq.com'
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Let's connect with VENZIQ",
)}`

/** Open the VENZIQ contact email in a new tab, leaving the site on the same page. */
export function openContact() {
  window.open(CONTACT_MAILTO, '_blank', 'noopener,noreferrer')
}
