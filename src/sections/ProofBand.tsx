import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ProofFeed } from '../components/ProofFeed'

function Equalizer() {
  const reduce = useReducedMotion()
  const bars = [0, 1, 2, 3, 4, 5]
  return (
    <div className="flex h-4 items-end gap-[3px]" aria-hidden="true">
      {bars.map((b) => (
        <motion.span
          key={b}
          className="w-[3px] rounded-full"
          style={{ background: 'var(--accent)' }}
          initial={{ height: reduce ? 5 + ((b * 3) % 10) : 4 }}
          animate={reduce ? undefined : { height: [4, 5 + ((b * 7) % 12), 4] }}
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

/* Live, incrementing block height - gives the ledger a sense of a running chain. */
function BlockHeight() {
  const reduce = useReducedMotion()
  const [h, setH] = useState(18_493_204)
  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setH((v) => v + 1 + ((Math.random() * 2) | 0)), 3200)
    return () => clearInterval(id)
  }, [reduce])
  return (
    <span className="font-mono text-[0.7rem] text-faint">
      block <span className="text-muted">#{h.toLocaleString()}</span>
    </span>
  )
}

export function ProofBand() {
  return (
    <div className="shell py-16 md:py-20">
      <div className="glass relative overflow-hidden">
        {/* console header */}
        <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: 'var(--accent)', animation: 'vzqpulse 1.6s ease-in-out infinite' }}
            />
            <span className="mono-eyebrow" style={{ letterSpacing: '0.2em' }}>
              Live ledger
            </span>
            <span className="hidden font-mono text-[0.7rem] text-faint sm:inline">· trust mainnet</span>
          </div>
          <BlockHeight />
        </div>

        {/* streaming feed */}
        <div className="px-5 py-4">
          <ProofFeed />
        </div>

        {/* console footer */}
        <div className="flex items-center justify-between border-t border-hairline px-5 py-3">
          <span className="font-mono text-[0.66rem] text-faint">// real-time verification stream</span>
          <div className="flex items-center gap-3">
            <Equalizer />
            <span className="mono-eyebrow text-[0.62rem]" style={{ color: 'var(--accent)' }}>
              throughput nominal
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
