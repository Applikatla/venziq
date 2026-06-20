import { useEffect, useState } from 'react'

/*
  Global "protection" state - the Threat <-> Trust world switch. When unprotected,
  a [data-unprotected] attribute on <html> recolors the accent to the threat tone
  and a degraded overlay appears, flipping the whole page into the "without VENZIQ"
  reality. Backed by a custom event so any component can react.
*/
const EVENT = 'venziq-protection'

export function isUnprotected(): boolean {
  return typeof document !== 'undefined' && document.documentElement.hasAttribute('data-unprotected')
}

export function setUnprotected(v: boolean): void {
  document.documentElement.toggleAttribute('data-unprotected', v)
  window.dispatchEvent(new CustomEvent<boolean>(EVENT, { detail: v }))
}

export function toggleProtection(): void {
  setUnprotected(!isUnprotected())
}

export function useUnprotected(): boolean {
  const [v, setV] = useState(isUnprotected)
  useEffect(() => {
    const h = (e: Event) => setV((e as CustomEvent<boolean>).detail)
    window.addEventListener(EVENT, h)
    return () => window.removeEventListener(EVENT, h)
  }, [])
  return v
}
