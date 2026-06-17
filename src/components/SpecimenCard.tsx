import { useRef, useState, type ReactNode, type PointerEvent } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

/*
  A "specimen" panel: glassmorphism card with corner registration ticks and an
  optional mono serial, so content reads as an exhibit being verified rather than
  a generic SaaS card. Optional 3D pointer-tilt + cursor-following sheen (fine
  pointer + non-reduced-motion only); the sheen is written straight to the DOM to
  avoid per-move re-renders.
*/

const MAX_TILT = 6.5

function CornerTicks() {
  const tick = (
    <svg width="9" height="9" viewBox="0 0 9 9" aria-hidden="true">
      <path d="M4.5 0V9M0 4.5H9" stroke="var(--faint)" strokeWidth="1" opacity="0.5" />
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
  tilt = false,
}: {
  serial?: string
  children: ReactNode
  className?: string
  interactive?: boolean
  ticks?: boolean
  tilt?: boolean
}) {
  const reduce = useReducedMotion()
  const [fine] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches,
  )
  const enableTilt = tilt && !reduce && fine

  const ref = useRef<HTMLDivElement>(null)
  const sheenRef = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 200, damping: 18, mass: 0.4 })
  const sry = useSpring(ry, { stiffness: 200, damping: 18, mass: 0.4 })

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!enableTilt || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 2 * MAX_TILT)
    rx.set(-(py - 0.5) * 2 * MAX_TILT)
    if (sheenRef.current) {
      sheenRef.current.style.background = `radial-gradient(260px circle at ${px * 100}% ${py * 100}%, var(--accent-soft), transparent 62%)`
      sheenRef.current.style.opacity = '1'
    }
  }
  const onLeave = () => {
    if (!enableTilt) return
    rx.set(0)
    ry.set(0)
    if (sheenRef.current) sheenRef.current.style.opacity = '0'
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={enableTilt ? onMove : undefined}
      onPointerLeave={enableTilt ? onLeave : undefined}
      style={
        enableTilt
          ? { rotateX: srx, rotateY: sry, transformPerspective: 1000 }
          : undefined
      }
      className={`glass relative p-6 transition-colors duration-300 ${
        interactive ? 'hover:bg-glass-strong' : ''
      } ${className}`}
    >
      {ticks && <CornerTicks />}
      {enableTilt && (
        <div
          ref={sheenRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[var(--radius)]"
          style={{ opacity: 0, transition: 'opacity 0.3s' }}
        />
      )}
      {serial && (
        <span className="mono-eyebrow absolute right-4 top-4 text-[0.6rem] text-faint">
          {serial}
        </span>
      )}
      {children}
    </motion.div>
  )
}
