import { useRef, type ReactNode, type MouseEvent, type PointerEvent } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

type Variant = 'primary' | 'ghost'

/*
  Primary CTA with a magnetic pull toward the cursor. Fine-pointer only; reduced
  motion and coarse pointers get a plain button with no movement.
*/
export function MagneticButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  strength = 0.3,
  ariaLabel,
}: {
  children: ReactNode
  onClick?: () => void
  variant?: Variant
  className?: string
  strength?: number
  ariaLabel?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 })

  const coarse =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches
  const magnetic = !reduce && !coarse

  const onMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (!magnetic || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const base =
    'relative inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors'
  const variantClass =
    variant === 'primary'
      ? ''
      : 'border border-hairline text-ink hover:bg-raised'

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick as ((e: MouseEvent<HTMLButtonElement>) => void) | undefined}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{
        x: magnetic ? sx : 0,
        y: magnetic ? sy : 0,
        ...(variant === 'primary'
          ? { background: 'var(--accent)', color: 'var(--accent-ink)' }
          : {}),
      }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      className={`${base} ${variantClass} ${className}`}
    >
      {children}
    </motion.button>
  )
}
