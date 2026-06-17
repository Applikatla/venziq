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
      let current: string | null = null
      for (const { id } of NAV_LINKS) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top - line <= 0) current = id
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
