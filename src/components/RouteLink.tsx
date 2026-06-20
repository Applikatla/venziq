import type { MouseEvent, ReactNode } from 'react'
import { navigate } from '../lib/router'

/** Anchor that navigates client-side (keeps a real href for accessibility / new-tab). */
export function RouteLink({
  to,
  className,
  children,
  'aria-label': ariaLabel,
}: {
  to: string
  className?: string
  children: ReactNode
  'aria-label'?: string
}) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // let modified clicks (new tab, etc.) behave natively
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    navigate(to)
  }
  return (
    <a href={to} onClick={onClick} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  )
}
