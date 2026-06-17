import { motion, useReducedMotion } from 'motion/react'
import { Check } from 'lucide-react'
import { TRACKED, useTrust } from '../lib/trust-context'
import { scrollToId } from '../lib/scroll'

/*
  The connective device: a thin fixed rail on the left edge with one node per
  tracked section. As each section verifies, its node lights lime + ticks and the
  fill advances. Decorative + a quiet jump affordance. Hidden on small screens.
*/
export function ProofSpine() {
  const { verified, activeId, isVerified } = useTrust()
  const reduce = useReducedMotion()
  const total = TRACKED.length
  const doneCount = verified.length
  const fillPct = total > 1 ? (doneCount - 1) / (total - 1) : 0

  return (
    <div
      className="pointer-events-none fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
      aria-hidden="true"
    >
      <div className="relative flex flex-col items-center gap-7">
        {/* base line */}
        <div
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
          style={{ background: 'var(--hairline)' }}
        />
        {/* lime fill */}
        <motion.div
          className="absolute left-1/2 top-0 w-px -translate-x-1/2 origin-top"
          style={{ background: 'var(--accent)' }}
          initial={false}
          animate={{ height: `${Math.max(0, fillPct) * 100}%` }}
          transition={reduce ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
        />
        {TRACKED.map((s) => {
          const done = isVerified(s.id)
          const active = activeId === s.id
          return (
            <button
              key={s.id}
              type="button"
              tabIndex={-1}
              onClick={() => scrollToId(s.id)}
              className="pointer-events-auto relative grid h-3.5 w-3.5 place-items-center rounded-full"
              style={{
                background: done ? 'var(--accent)' : 'var(--bg)',
                border: `1px solid ${done ? 'var(--accent)' : 'var(--hairline)'}`,
                boxShadow: active && !done ? '0 0 0 4px var(--accent-soft)' : 'none',
                transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
              }}
            >
              {done && (
                <Check size={9} strokeWidth={3} style={{ color: 'var(--accent-ink)' }} />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
