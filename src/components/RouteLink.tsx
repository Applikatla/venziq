import type { MouseEvent, ReactNode } from 'react'
import Link from 'next/link'

/** Anchor that navigates client-side using next/link. */
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
  return (
    <Link href={to} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  )
}
