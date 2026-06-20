import { createContext, useContext } from 'react'

export interface TrackedSection {
  id: string
  label: string
}

/* Sections on the platform deep-dive page that the Proof Spine + Trust HUD track. */
export const TRACKED: TrackedSection[] = [
  { id: 'problem', label: 'problem' },
  { id: 'platform', label: 'platform' },
  { id: 'pattern', label: 'core pattern' },
  { id: 'playground', label: 'playground' },
  { id: 'zk', label: 'zero-knowledge' },
  { id: 'architecture', label: 'architecture' },
  { id: 'why', label: 'defensibility' },
  { id: 'vision', label: 'vision' },
]

export interface VerifiedRecord {
  id: string
  label: string
  hash: string
  block: number
}

export interface TrustValue {
  sessionId: string
  total: number
  verified: VerifiedRecord[]
  activeId: string | null
  isVerified: (id: string) => boolean
}

export const TrustContext = createContext<TrustValue | null>(null)

export function useTrust(): TrustValue {
  const ctx = useContext(TrustContext)
  if (!ctx) throw new Error('useTrust must be used within TrustProvider')
  return ctx
}
