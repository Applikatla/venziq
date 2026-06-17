import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  TRACKED,
  TrustContext,
  type TrackedSection,
  type TrustValue,
  type VerifiedRecord,
} from './trust-context'

/*
  Shared "trust session" state — the spine of the living-instrument concept.
  An rAF poll marks each tracked section "verified" (once) as its top crosses the
  viewport's upper-middle, assigning a proof hash + block number. The Proof Spine
  and Trust HUD both read this. Reduced motion verifies everything immediately.
*/

const HEX = '0123456789abcdef'
function randHex(n: number): string {
  let s = ''
  for (let i = 0; i < n; i++) s += HEX[(Math.random() * 16) | 0]
  return s
}
function makeRecord(s: TrackedSection): VerifiedRecord {
  return {
    id: s.id,
    label: s.label,
    hash: '0x' + randHex(10),
    block: 18_400_000 + ((Math.random() * 900000) | 0),
  }
}

export function TrustProvider({ children }: { children: ReactNode }) {
  const [sessionId] = useState(() => '0x' + randHex(10))
  const [verified, setVerified] = useState<VerifiedRecord[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const verifiedIds = useRef<Set<string>>(new Set())

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      verifiedIds.current = new Set(TRACKED.map((s) => s.id))
      const id = requestAnimationFrame(() => {
        setVerified(TRACKED.map(makeRecord))
        setActiveId(TRACKED[TRACKED.length - 1].id)
      })
      return () => cancelAnimationFrame(id)
    }

    let raf = 0
    let last = 0
    let activeLocal: string | null = null

    const tick = (t: number) => {
      if (t - last > 110) {
        last = t
        const vh = window.innerHeight || 800
        let newlyActive: string | null = activeLocal
        const additions: VerifiedRecord[] = []

        for (const s of TRACKED) {
          const el = document.getElementById(s.id)
          if (!el) continue
          const top = el.getBoundingClientRect().top
          if (top < vh * 0.55) newlyActive = s.id
          if (top < vh * 0.6 && !verifiedIds.current.has(s.id)) {
            verifiedIds.current.add(s.id)
            additions.push(makeRecord(s))
          }
        }
        if (additions.length) setVerified((prev) => [...prev, ...additions])
        if (newlyActive !== activeLocal) {
          activeLocal = newlyActive
          setActiveId(newlyActive)
        }
        if (verifiedIds.current.size >= TRACKED.length) return // stop polling
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const value: TrustValue = {
    sessionId,
    total: TRACKED.length,
    verified,
    activeId,
    isVerified: (id) => verifiedIds.current.has(id),
  }

  return <TrustContext.Provider value={value}>{children}</TrustContext.Provider>
}
