import { AnimatePresence, motion } from 'motion/react'
import { ShieldCheck, ShieldAlert } from 'lucide-react'
import { useUnprotected, toggleProtection } from '../lib/protection'

/* Nav control: flip the whole page between protected and unprotected worlds. */
export function ShieldToggle({ className = '' }: { className?: string }) {
  const off = useUnprotected()
  return (
    <button
      type="button"
      onClick={toggleProtection}
      aria-pressed={off}
      aria-label={off ? 'Exposed, re-enable protection' : 'Shielded, see the unprotected world'}
      title={off ? 'Protected' : 'See it without VENZIQ'}
      className={`inline-flex h-8 items-center gap-1.5 rounded-full border px-3 font-mono text-[0.68rem] transition-colors ${className}`}
      style={{
        borderColor: off ? 'var(--threat)' : 'var(--hairline)',
        color: off ? 'var(--threat)' : 'var(--muted)',
        background: off ? 'var(--threat-soft)' : 'transparent',
      }}
    >
      {off ? <ShieldAlert size={13} aria-hidden="true" /> : <ShieldCheck size={13} aria-hidden="true" />}
      {off ? 'exposed' : 'shielded'}
    </button>
  )
}

/* Full-screen degraded overlay shown while the world is unprotected. */
export function ShieldOverlay() {
  const off = useUnprotected()
  return (
    <AnimatePresence>
      {off && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[44]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* coral vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 90% at 50% 50%, transparent 55%, var(--threat-soft) 100%)',
            }}
          />
          {/* faint scanlines */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                'repeating-linear-gradient(to bottom, transparent 0 3px, var(--threat-soft) 3px 4px)',
            }}
          />
          {/* status label */}
          <div className="absolute left-1/2 top-24 -translate-x-1/2">
            <span
              className="flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.2em]"
              style={{
                borderColor: 'var(--threat)',
                color: 'var(--threat)',
                background: 'var(--threat-soft)',
              }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: 'var(--threat)', animation: 'vzqpulse 1.2s ease-in-out infinite' }}
              />
              unprotected · shield off
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
