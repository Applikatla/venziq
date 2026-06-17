import { useEffect, useState } from 'react'
import { NAV_LINKS } from './nav'

/*
  Continuous scrollspy for the nav: returns the id of the NAV_LINKS section the
  reader is currently in. Throttled via rAF; runs the whole time (unlike the
  trust tracker, which stops once everything is verified).
*/
export function useActiveSection(): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    let raf = 0
    let queued = false
    const compute = () => {
      queued = false
      const line = (window.innerHeight || 800) * 0.3
      // The nav order is a marketing choice and does NOT match the page's DOM
      // order, so we can't rely on iteration order. The active section is the
      // one whose top has crossed above the line and sits closest to it.
      let current: string | null = null
      let bestTop = -Infinity
      for (const { id } of NAV_LINKS) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top - line
        if (top <= 0 && top > bestTop) {
          bestTop = top
          current = id
        }
      }
      setActive(current)
    }
    const onScroll = () => {
      if (queued) return
      queued = true
      raf = requestAnimationFrame(compute)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    raf = requestAnimationFrame(compute)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return active
}
