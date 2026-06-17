import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

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

  return (
    <div className="flex gap-5">
      {/* data-flow rail */}
      <div className="relative w-px shrink-0 bg-hairline" aria-hidden="true">
        {!reduce &&
          [0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 h-8 w-px -translate-x-1/2"
              style={{
                background: 'linear-gradient(var(--accent), transparent)',
              }}
              initial={{ top: '-10%' }}
              animate={{ top: '110%' }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.8,
              }}
            />
          ))}
      </div>

      <ul className="flex-1 space-y-2">
        {LAYERS.map((layer, i) => {
          const isActive = active === i
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
                  transform: isActive && !reduce ? 'translateX(10px)' : 'none',
                  background: isActive ? 'var(--glass-strong)' : 'var(--glass)',
                  borderLeft: `2px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
                }}
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-xs"
                  style={{ color: isActive ? 'var(--accent)' : 'var(--faint)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1">
                  <span className="block font-medium text-ink">{layer.name}</span>
                  <span
                    className="block overflow-hidden text-sm text-muted transition-all duration-300"
                    style={{
                      maxHeight: isActive ? 40 : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                  >
                    {layer.desc}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
