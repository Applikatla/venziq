import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Play, Check } from 'lucide-react'

interface Layer {
  name: string
  desc: string
}

// top to bottom, per the brief's unified architecture
const LAYERS: Layer[] = [
  { name: 'Applications', desc: 'Where enterprises and users meet the system.' },
  { name: 'AI Agent layer', desc: 'Autonomous agents that take real action.' },
  { name: 'AI Security layer', desc: 'Governance, monitoring, and prompt protection.' },
  { name: 'Identity & Verification', desc: 'Who and what is allowed to act.' },
  { name: 'Zero-Knowledge infrastructure', desc: 'Prove without exposing the underlying data.' },
  { name: 'Blockchain Trust layer', desc: 'Immutable audit trails and trust registries.' },
  { name: 'Enterprise integrations', desc: 'Connects into existing enterprise systems.' },
]

export function ArchitectureStack() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(-1)
  const [trace, setTrace] = useState(-1) // packet position during a trace
  const [sealed, setSealed] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout)
    },
    [],
  )

  const runTrace = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setSealed(false)
    if (reduce) {
      setTrace(LAYERS.length - 1)
      setSealed(true)
      timers.current.push(setTimeout(() => setTrace(-1), 1200))
      return
    }
    LAYERS.forEach((_, i) => {
      timers.current.push(setTimeout(() => setTrace(i), i * 300))
    })
    timers.current.push(
      setTimeout(() => setSealed(true), LAYERS.length * 300),
    )
    timers.current.push(
      setTimeout(() => {
        setTrace(-1)
        setSealed(false)
      }, LAYERS.length * 300 + 1400),
    )
  }

  const tracing = trace >= 0

  return (
    <div>
      <button
        type="button"
        onClick={runTrace}
        disabled={tracing}
        className="mb-5 inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2 font-mono text-xs text-ink transition-colors hover:bg-raised disabled:opacity-60"
      >
        {sealed ? (
          <>
            <Check size={13} style={{ color: 'var(--accent)' }} /> request sealed
          </>
        ) : (
          <>
            <Play size={13} style={{ color: 'var(--accent)' }} /> trace a request
          </>
        )}
      </button>

      <div className="flex gap-5">
        {/* data-flow rail */}
        <div className="relative w-px shrink-0 bg-hairline" aria-hidden="true">
          {!reduce && !tracing &&
            [0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 h-8 w-px -translate-x-1/2"
                style={{ background: 'linear-gradient(var(--accent), transparent)' }}
                initial={{ top: '-10%' }}
                animate={{ top: '110%' }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'linear', delay: i * 0.8 }}
              />
            ))}
          {/* trace packet */}
          {tracing && (
            <motion.span
              className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full"
              style={{ background: 'var(--accent)', boxShadow: '0 0 12px var(--accent)' }}
              initial={false}
              animate={{ top: `${(trace / (LAYERS.length - 1)) * 100}%` }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
            />
          )}
        </div>

        <ul className="flex-1 space-y-2">
          {LAYERS.map((layer, i) => {
            const isActive = active === i
            const isTraced = tracing && trace >= i
            const isPacket = trace === i
            const lit = isActive || isPacket
            return (
              <li key={layer.name}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(-1)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(-1)}
                  className="glass flex w-full items-center gap-4 px-5 py-4 text-left transition-all duration-300"
                  style={{
                    transform: lit && !reduce ? 'translateX(10px)' : 'none',
                    background: lit ? 'var(--glass-strong)' : 'var(--glass)',
                    borderLeft: `2px solid ${lit || isTraced ? 'var(--accent)' : 'transparent'}`,
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs"
                    style={{ color: lit || isTraced ? 'var(--accent)' : 'var(--faint)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1">
                    <span className="block font-medium text-ink">{layer.name}</span>
                    <span
                      className="block overflow-hidden text-sm text-muted transition-all duration-300"
                      style={{ maxHeight: isActive ? 40 : 0, opacity: isActive ? 1 : 0 }}
                    >
                      {layer.desc}
                    </span>
                  </span>
                  {isPacket && (
                    <span className="font-mono text-[0.65rem]" style={{ color: 'var(--accent)' }}>
                      ▸
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
