import { motion, useReducedMotion } from 'motion/react'
import { ProofFeed } from '../components/ProofFeed'

function Equalizer() {
  const reduce = useReducedMotion()
  const bars = [0, 1, 2, 3, 4, 5]
  return (
    <div className="flex h-5 items-end gap-[3px]" aria-hidden="true">
      {bars.map((b) => (
        <motion.span
          key={b}
          className="w-[3px] rounded-full"
          style={{ background: 'var(--accent)' }}
          initial={{ height: reduce ? 6 + ((b * 3) % 12) : 4 }}
          animate={reduce ? undefined : { height: [4, 6 + ((b * 7) % 14), 4] }}
          transition={
            reduce
              ? undefined
              : { duration: 0.9 + b * 0.12, repeat: Infinity, ease: 'easeInOut', delay: b * 0.08 }
          }
        />
      ))}
    </div>
  )
}

export function ProofBand() {
  return (
    <div className="border-y border-hairline bg-panel">
      <div className="shell flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-8">
        <div className="flex shrink-0 items-center gap-2.5">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: 'var(--accent)', animation: 'vzqpulse 1.6s ease-in-out infinite' }}
          />
          <span className="mono-eyebrow" style={{ letterSpacing: '0.2em' }}>
            Live ledger
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <ProofFeed />
        </div>
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Equalizer />
          <span className="mono-eyebrow text-[0.62rem]" style={{ color: 'var(--accent)' }}>
            throughput nominal
          </span>
        </div>
      </div>
    </div>
  )
}
