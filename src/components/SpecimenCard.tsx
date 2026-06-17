import type { ReactNode } from 'react'

/*
  A "specimen" panel: glassmorphism card with corner registration ticks and an
  optional mono serial, so content reads as an exhibit being verified rather than
  a generic SaaS card.
*/

function CornerTicks() {
  const tick = (
    <svg width="9" height="9" viewBox="0 0 9 9" aria-hidden="true">
      <path
        d="M4.5 0V9M0 4.5H9"
        stroke="var(--faint)"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  )
  return (
    <div aria-hidden="true">
      <span className="pointer-events-none absolute -left-[4px] -top-[4px]">{tick}</span>
      <span className="pointer-events-none absolute -right-[4px] -top-[4px]">{tick}</span>
      <span className="pointer-events-none absolute -bottom-[4px] -left-[4px]">{tick}</span>
      <span className="pointer-events-none absolute -bottom-[4px] -right-[4px]">{tick}</span>
    </div>
  )
}

export function SpecimenCard({
  serial,
  children,
  className = '',
  interactive = false,
  ticks = true,
}: {
  serial?: string
  children: ReactNode
  className?: string
  interactive?: boolean
  ticks?: boolean
}) {
  return (
    <div
      className={`glass relative p-6 transition-colors duration-300 ${
        interactive ? 'hover:bg-glass-strong' : ''
      } ${className}`}
    >
      {ticks && <CornerTicks />}
      {serial && (
        <span className="mono-eyebrow absolute right-4 top-4 text-[0.6rem] text-faint">
          {serial}
        </span>
      )}
      {children}
    </div>
  )
}
