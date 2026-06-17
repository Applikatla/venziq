import type { ReactNode } from 'react'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  /** render a panel-tinted background block for contrast */
  panel?: boolean
  'aria-label'?: string
}

export function Section({ id, children, className, panel, ...rest }: SectionProps) {
  return (
    <section
      id={id}
      className={`section-pad relative scroll-mt-20 ${panel ? 'bg-panel' : ''} ${className ?? ''}`}
      {...rest}
    >
      <div className="shell">{children}</div>
    </section>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mono-eyebrow mb-5">{children}</p>
}
