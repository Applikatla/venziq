import { useEffect, useState } from 'react'
import { scrollToId, resetScroll } from './scroll'

/*
  Minimal dependency-free router (History API). The site has just two routes -
  the landing page ("/") and the platform deep-dive ("/platform") - so a tiny
  custom router keeps the bundle lean and avoids pulling in react-router.
  A `public/_redirects` SPA fallback makes refresh/deep-links work on Netlify.
*/

const NAV_EVENT = 'vzq:navigate'

/** Programmatic navigation. Pushes history, notifies listeners, resets scroll. */
export function navigate(to: string): void {
  const [path, hash] = to.split('#')
  if (path && path !== window.location.pathname) {
    window.history.pushState({}, '', to)
    window.dispatchEvent(new Event(NAV_EVENT))
    // wait for the new page to paint, then jump to the hash target or the top
    if (hash) {
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(hash)))
    } else {
      resetScroll()
    }
  } else if (hash) {
    scrollToId(hash)
  }
}

/** Current pathname, re-rendering on navigation (push or back/forward). */
export function useRoute(): string {
  const [path, setPath] = useState(() =>
    typeof window === 'undefined' ? '/' : window.location.pathname,
  )
  useEffect(() => {
    const onChange = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onChange)
    window.addEventListener(NAV_EVENT, onChange)
    return () => {
      window.removeEventListener('popstate', onChange)
      window.removeEventListener(NAV_EVENT, onChange)
    }
  }, [])
  return path
}
