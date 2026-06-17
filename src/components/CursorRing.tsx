import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

/*
  Cursor as a verification scanner. A thin ring trails the pointer on fine-pointer
  desktops; over a [data-scan] element it expands into a reticle and sweeps the
  element with a one-shot scan line. Additive (native cursor stays); hidden on
  coarse pointers and reduced motion.
*/
export function CursorRing() {
  const reduce = useReducedMotion()
  const [finePointer] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches,
  )
  const [visible, setVisible] = useState(false)
  const [scanning, setScanning] = useState(false)
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

    const over = (e: Event) => {
      const target = (e.target as HTMLElement | null)?.closest('[data-scan]')
      if (!target) return
      setScanning(true)
      if (target.getAttribute('data-scanning') === '1') return
      target.setAttribute('data-scanning', '1')
      const line = document.createElement('span')
      line.className = 'vzq-scanline'
      target.appendChild(line)
      window.setTimeout(() => {
        line.remove()
        target.removeAttribute('data-scanning')
      }, 640)
    }
    const out = (e: Event) => {
      const to = (e as PointerEvent).relatedTarget as HTMLElement | null
      if (!to || !to.closest('[data-scan]')) setScanning(false)
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerout', leave)
    document.addEventListener('pointerover', over, true)
    document.addEventListener('pointerout', out, true)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerout', leave)
      document.removeEventListener('pointerover', over, true)
      document.removeEventListener('pointerout', out, true)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden -translate-x-1/2 -translate-y-1/2 lg:block"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0, transition: 'opacity 0.2s' }}
    >
      <motion.div
        animate={{
          width: scanning ? 34 : 22,
          height: scanning ? 34 : 22,
          borderRadius: scanning ? 6 : 999,
          opacity: scanning ? 0.9 : 0.5,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{ border: '1px solid var(--accent)' }}
        className="grid -translate-x-1/2 -translate-y-1/2 place-items-center"
      >
        {scanning && (
          <span
            className="h-1 w-1 rounded-full"
            style={{ background: 'var(--accent)' }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}
