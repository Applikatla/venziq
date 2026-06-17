import Lenis from 'lenis'

let lenis: Lenis | null = null

/** Start Lenis smooth scrolling. Returns a teardown fn. Caller gates on reduced-motion. */
export function initLenis(): () => void {
  lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  let frame = 0
  const raf = (time: number) => {
    lenis?.raf(time)
    frame = requestAnimationFrame(raf)
  }
  frame = requestAnimationFrame(raf)

  if (import.meta.env.DEV) {
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis
  }

  return () => {
    cancelAnimationFrame(frame)
    lenis?.destroy()
    lenis = null
  }
}

const NAV_OFFSET = -72

/** Scroll to an element by id, via Lenis when active, else native. */
export function scrollToId(id: string): void {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el, { offset: NAV_OFFSET })
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

export function scrollToTop(): void {
  if (lenis) lenis.scrollTo(0)
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}
