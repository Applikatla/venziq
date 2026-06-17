import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

/*
  An autonomous "agent" that roams the page on its own — drifts to an in-view
  element, scans it (ring pulse + tick stamp), then moves on. It performs the
  thesis that agents are primary actors. Decorative, pointer-events-none,
  fine-pointer + reduced-motion + tab-visibility gated.
*/
export function AutonomousAgent() {
  const reduce = useReducedMotion()
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches &&
      window.innerWidth >= 1024,
  )
  const [scanning, setScanning] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 26, damping: 14, mass: 1 })
  const sy = useSpring(y, { stiffness: 26, damping: 14, mass: 1 })

  useEffect(() => {
    if (reduce || !enabled) return
    let timers: ReturnType<typeof setTimeout>[] = []
    x.set(window.innerWidth * 0.5)
    y.set(window.innerHeight * 0.4)

    const pickTarget = () => {
      const vh = window.innerHeight
      const vw = window.innerWidth
      const els = [...document.querySelectorAll<HTMLElement>('[data-scan]')].filter((el) => {
        const r = el.getBoundingClientRect()
        return r.top > 90 && r.bottom < vh - 90 && r.width > 40
      })
      if (els.length) {
        const r = els[(Math.random() * els.length) | 0].getBoundingClientRect()
        return {
          tx: r.left + Math.min(r.width, 220) * (0.3 + Math.random() * 0.4),
          ty: r.top + r.height / 2,
        }
      }
      return { tx: vw * (0.25 + Math.random() * 0.5), ty: vh * (0.25 + Math.random() * 0.5) }
    }

    const cycle = () => {
      if (document.visibilityState !== 'visible') {
        timers.push(setTimeout(cycle, 2000))
        return
      }
      const { tx, ty } = pickTarget()
      x.set(tx)
      y.set(ty)
      // arrive, then scan
      timers.push(
        setTimeout(() => {
          setScanning(true)
          timers.push(setTimeout(() => setScanning(false), 900))
          timers.push(setTimeout(cycle, 2600 + Math.random() * 2000))
        }, 1900),
      )
    }
    timers.push(setTimeout(cycle, 2500))

    return () => {
      timers.forEach(clearTimeout)
      timers = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, reduce])

  if (!enabled || reduce) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[45] hidden -translate-x-1/2 -translate-y-1/2 lg:block"
      style={{ x: sx, y: sy }}
    >
      {/* core */}
      <div
        className="relative grid h-4 w-4 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
        style={{ border: '1px solid var(--accent)', background: 'var(--accent-soft)' }}
      >
        <span className="h-1 w-1 rounded-full" style={{ background: 'var(--accent)' }} />
      </div>

      {/* scan pulse + tick stamp */}
      <AnimatePresence>
        {scanning && (
          <>
            <motion.span
              className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ border: '1px solid var(--accent)' }}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
            <motion.span
              className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[0.6rem]"
              style={{ color: 'var(--accent)' }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -10 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              ✓
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
