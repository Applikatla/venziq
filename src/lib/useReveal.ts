import { useEffect, useRef, useState } from 'react'

/*
  Robust "reveal when scrolled into view".

  Implemented as a per-element rAF poll of getBoundingClientRect rather than an
  IntersectionObserver or scroll listener. IO/scroll-event triggers proved
  unreliable under smooth-scroll/embedded contexts (callbacks not firing on
  programmatic scroll), which can trap content at opacity 0. A rAF poll always
  sees the current geometry — Lenis already drives rAF — and self-terminates the
  moment the element reveals, so there is no lasting cost. Reduced motion shows
  immediately.

  setState is only called from the rAF callback (never directly in the effect
  body), satisfying the react-hooks rules.
*/
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    const tick = () => {
      if (reduce) {
        setShown(true)
        return
      }
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      // reveal once any part enters the lower 90% of the viewport
      if (r.top < vh * 0.9 && r.bottom > vh * 0.04) {
        setShown(true)
        return // stop polling
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
  }, [])

  return { ref, shown }
}
