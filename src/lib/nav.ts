export interface NavLink {
  id: string
  label: string
}

/** Anchor targets shared by the nav and footer. */
export const NAV_LINKS: NavLink[] = [
  { id: 'platform', label: 'Platform' },
  { id: 'problem', label: 'Problem' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'use-cases', label: 'Use cases' },
  { id: 'vision', label: 'Vision' },
]

export const CONTACT_ID = 'contact'
export const CONTACT_URL = 'https://venziq.com'

export const CONTACT_EMAIL = 'reachus@venziq.com'
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Let's connect with VENZIQ",
)}`

/** Open the user's mail client to the VENZIQ contact address. */
export function openContact() {
  window.location.href = CONTACT_MAILTO
}
