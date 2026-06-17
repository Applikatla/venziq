import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { LogoMark } from './Logo'

/*
  First-load-only "trust layer initializing" overlay. Streams a few proof lines,
  then dissolves to reveal the hero. Skippable (click / Esc). Shown once per
  session (sessionStorage). Reduced motion skips it entirely.
*/

const HEX = '0123456789abcdef'
const randHex = (n: number) => Array.from({ length: n }, () => HEX[(Math.random() * 16) | 0]).join('')

const LINES = [
  'trust layer · initializing',
  'verification engine · online',
  'zero-knowledge prover · ready',
  `session 0x${randHex(10)} · established`,
]

function shouldBoot(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    if (sessionStorage.getItem('venziq-booted')) return false
  } catch {
    return false
  }
  return true
}

export function BootSequence() {
  const [visible, setVisible] = useState(shouldBoot)
  const [step, setStep] = useState(0)

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem('venziq-booted', '1')
    } catch {
      /* ignore */
    }
    document.body.style.overflow = ''
    setVisible(false)
  }, [])

  useEffect(() => {
    if (!visible) return
    const timers: ReturnType<typeof setTimeout>[] = []
    LINES.forEach((_, i) => timers.push(setTimeout(() => setStep(i + 1), 220 + i * 230)))
    timers.push(setTimeout(() => dismiss(), 220 + LINES.length * 230 + 350))
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [visible, dismiss])

  const done = step >= LINES.length

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: 'var(--bg)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          onClick={dismiss}
          role="presentation"
        >
          <LogoMark size={56} tone="gradient" animate />

          <div className="mt-8 h-24 w-[280px] font-mono text-xs">
            {LINES.slice(0, step).map((l, i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 py-0.5"
              >
                <span style={{ color: 'var(--accent)' }}>›</span>
                <span className={i === step - 1 && !done ? 'text-ink' : 'text-faint'}>{l}</span>
              </motion.div>
            ))}
            {done && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 py-0.5"
                style={{ color: 'var(--accent)' }}
              >
                <span>✓</span>
                <span>secure — entering</span>
              </motion.div>
            )}
          </div>

          {/* progress */}
          <div className="mt-2 h-px w-[280px] overflow-hidden" style={{ background: 'var(--hairline)' }}>
            <motion.div
              className="h-full"
              style={{ background: 'var(--accent)' }}
              initial={{ width: '0%' }}
              animate={{ width: `${(step / LINES.length) * 100}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>

          <button
            type="button"
            onClick={dismiss}
            className="mono-eyebrow absolute bottom-8 text-[0.6rem]"
          >
            skip ↵
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
