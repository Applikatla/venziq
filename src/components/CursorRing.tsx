import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

const TRAIL_GLYPHS = '01x</>{}✓'
interface TrailDot {
  id: number
  x: number
  y: number
  g: string
}

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
  const [scanning, setScanning] = useState(false)
  const [trail, setTrail] = useState<TrailDot[]>([])
  const last = useRef({ x: 0, y: 0 })
  const idc = useRef(0)
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
      // drop a dissolving proof glyph every ~48px of travel
      const dx = e.clientX - last.current.x
      const dy = e.clientY - last.current.y
      if (dx * dx + dy * dy > 48 * 48) {
        last.current = { x: e.clientX, y: e.clientY }
        const id = idc.current++
        const g = TRAIL_GLYPHS[(Math.random() * TRAIL_GLYPHS.length) | 0]
        setTrail((t) => [...t.slice(-13), { id, x: e.clientX, y: e.clientY, g }])
        window.setTimeout(() => setTrail((t) => t.filter((d) => d.id !== id)), 620)
      }
    }
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
    document.addEventListener('pointerover', over, true)
    document.addEventListener('pointerout', out, true)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over, true)
      document.removeEventListener('pointerout', out, true)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <>
      {/* dissolving proof-glyph trail */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[58] hidden lg:block">
        <AnimatePresence>
          {trail.map((d) => (
            <motion.span
              key={d.id}
              className="absolute font-mono text-[0.6rem]"
              style={{ left: d.x, top: d.y, color: 'var(--accent)' }}
              initial={{ opacity: 0.55, y: 0, scale: 1 }}
              animate={{ opacity: 0, y: -16, scale: 0.8 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {d.g}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

    {/* reticle: only shown while scanning a [data-scan] element (no idle ring) */}
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden -translate-x-1/2 -translate-y-1/2 lg:block"
      style={{ x: sx, y: sy, opacity: scanning ? 1 : 0, transition: 'opacity 0.2s' }}
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
    </>
  )
}
