import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

/*
  A thin ring that trails the pointer on fine-pointer desktops. Additive (the
  native cursor stays), so it degrades cleanly. Hidden on coarse pointers and
  reduced motion.
*/
export function CursorRing() {
  const reduce = useReducedMotion()
  const [finePointer] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches,
  )
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 600, damping: 30, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 600, damping: 30, mass: 0.3 })
  const enabled = !reduce && finePointer

  useEffect(() => {
    if (!enabled) return

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerout', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerout', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full lg:block"
      style={{
        x: sx,
        y: sy,
        border: '1px solid var(--accent)',
        opacity: visible ? 0.5 : 0,
        transition: 'opacity 0.2s',
      }}
    />
  )
}
