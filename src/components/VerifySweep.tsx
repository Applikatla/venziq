import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Check } from 'lucide-react'

/*
  Easter egg: type "verify" anywhere (outside inputs) to run a one-shot page-wide
  verification sweep — a lime scan line passes top to bottom and a toast confirms.
  Reduced motion shows just the toast.
*/
export function VerifySweep() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(false)
  const buf = useRef('')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
      if (e.key.length === 1 && /[a-z]/i.test(e.key)) {
        buf.current = (buf.current + e.key.toLowerCase()).slice(-6)
        if (buf.current === 'verify') {
          buf.current = ''
          setActive(true)
          window.setTimeout(() => setActive(false), 1500)
        }
      } else {
        buf.current = ''
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <AnimatePresence>
      {active && (
        <div className="pointer-events-none fixed inset-0 z-[70]" aria-hidden="true">
          {!reduce && (
            <motion.div
              className="absolute inset-x-0 h-24"
              style={{
                background:
                  'linear-gradient(to bottom, transparent, var(--accent-soft) 45%, var(--accent) 50%, var(--accent-soft) 55%, transparent)',
              }}
              initial={{ top: '-15%', opacity: 0 }}
              animate={{ top: ['-15%', '100%'], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
            />
          )}
          <motion.div
            className="absolute left-1/2 top-28 -translate-x-1/2"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <span
              className="glass-strong flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs"
              style={{ color: 'var(--accent)' }}
            >
              <Check size={14} aria-hidden="true" /> page re-verified
            </span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
