import type { ReactNode } from 'react'
import { useReducedMotion } from 'motion/react'
import { useReveal } from '../lib/useReveal'

/*
  Fade + lift on first scroll into view, driven by the robust useReveal hook so
  content can never get stuck hidden. Reduced motion renders in place.
*/
export function ScrollReveal({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const { ref, shown } = useReveal<HTMLDivElement>()
  const visible = shown || reduce

  return (
    <div
      ref={ref}
      className={className}
      style={
        reduce
          ? undefined
          : {
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : `translateY(${y}px)`,
              transition: `opacity 0.6s ${delay}s cubic-bezier(0.22,1,0.36,1), transform 0.6s ${delay}s cubic-bezier(0.22,1,0.36,1)`,
              willChange: 'opacity, transform',
            }
      }
    >
      {children}
    </div>
  )
}
