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
