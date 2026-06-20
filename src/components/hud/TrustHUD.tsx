import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useTrust } from '../../lib/trust-context'
import { LogoMark } from '../Logo'

/*
  The living-instrument readout: a glass panel that proves the page as you scroll.
  Shows the per-visit session id, a progress ring, and the latest verification
  event. Decorative (aria-hidden); hidden on small screens. Reduced motion shows
  the sealed summary with no streaming.
*/
const R = 16
const C = 2 * Math.PI * R

export function TrustHUD() {
  const { sessionId, total, verified } = useTrust()
  const reduce = useReducedMotion()
  const done = verified.length
  const complete = done >= total
  const latest = verified[verified.length - 1]
  const progress = total ? done / total : 0

  return (
    <div
      className="glass fixed bottom-5 right-5 z-30 hidden w-[280px] p-4 md:block"
      aria-hidden="true"
    >
      <div className="flex items-center gap-3.5">
        {/* progress ring */}
        <div className="relative grid h-11 w-11 shrink-0 place-items-center">
          <svg width="44" height="44" viewBox="0 0 44 44" className="-rotate-90">
            <circle cx="22" cy="22" r={R} fill="none" stroke="var(--hairline)" strokeWidth="3" />
            <motion.circle
              cx="22"
              cy="22"
              r={R}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={C}
              initial={false}
              animate={{ strokeDashoffset: C * (1 - progress) }}
              transition={reduce ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
            />
          </svg>
          <span className="absolute grid place-items-center">
            {complete ? (
              <LogoMark decorative animate size={18} tone="accent" />
            ) : (
              <span className="font-mono text-[0.6rem] text-ink">
                {done}/{total}
              </span>
            )}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{
                background: complete ? 'var(--accent)' : 'var(--accent-2)',
                animation: complete || reduce ? 'none' : 'vzqpulse 1.6s ease-in-out infinite',
              }}
            />
            <span className="mono-eyebrow text-[0.6rem]" style={{ letterSpacing: '0.16em' }}>
              trust session
            </span>
          </div>

          <div className="mt-1.5 h-4 overflow-hidden font-mono text-[0.72rem]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={complete ? 'sealed' : latest?.id ?? 'idle'}
                initial={reduce ? false : { y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={reduce ? { opacity: 0 } : { y: -12, opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                {complete ? (
                  <span style={{ color: 'var(--accent)' }}>page integrity verified ✓</span>
                ) : latest ? (
                  <>
                    <span className="text-muted">verify</span>
                    <span className="truncate text-ink">{latest.label}</span>
                    <span style={{ color: 'var(--accent)' }}>✓</span>
                  </>
                ) : (
                  <span className="text-faint">initializing…</span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="mt-0.5 truncate font-mono text-[0.62rem] text-faint">
            {latest && !complete
              ? `${latest.hash} · #${latest.block}`
              : `session ${sessionId}`}
          </p>
        </div>
      </div>
    </div>
  )
}
