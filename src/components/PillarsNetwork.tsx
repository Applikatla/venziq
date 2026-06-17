import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  ShieldCheck,
  Bot,
  Fingerprint,
  Boxes,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { SpecimenCard } from './SpecimenCard'
import { useReveal } from '../lib/useReveal'

/* Five strokes folding into the single Q trust-fabric mark. */
function ConvergeMark() {
  const reduce = useReducedMotion()
  const { ref, shown } = useReveal<SVGSVGElement>()
  const lit = shown || reduce
  const sources = [16, 32, 48, 64, 80]
  return (
    <svg ref={ref} viewBox="0 0 150 96" className="mb-4 h-16 w-24" aria-hidden="true">
      {sources.map((y, i) => (
        <motion.path
          key={y}
          d={`M10 ${y} C 50 ${y}, 70 48, 96 48`}
          fill="none"
          stroke="var(--accent-2)"
          strokeWidth="1"
          strokeOpacity="0.5"
          initial={reduce ? false : { pathLength: 0 }}
          animate={lit ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
        />
      ))}
      {/* the Q mark they fold into */}
      <motion.g
        fill="none"
        stroke="var(--accent)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { opacity: 0, scale: 0.6 }}
        animate={lit ? { opacity: 1, scale: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        style={{ transformOrigin: '116px 48px' }}
      >
        <circle cx="116" cy="48" r="16" />
        <path d="M110 52 L120 62 L140 30" />
      </motion.g>
    </svg>
  )
}

interface Pillar {
  name: string
  desc: string
  items: string[]
  analogy: string
  icon: LucideIcon
  /** AI/agent pillars use the supporting accent for their icon */
  ai?: boolean
}

const PILLARS: Pillar[] = [
  {
    name: 'AI Security Platform',
    desc: 'Governance, monitoring, and prompt protection for AI workloads.',
    items: ['Governance', 'Risk', 'Monitoring', 'Prompt protection'],
    analogy: 'Palo Alto Networks for AI Security',
    icon: ShieldCheck,
  },
  {
    name: 'AI Agent Platform',
    desc: 'Enterprise agents and multi-agent orchestration for autonomous processes.',
    items: ['Enterprise agents', 'Orchestration', 'Workflow automation', 'Autonomy'],
    analogy: 'OpenAI for Enterprise Automation',
    icon: Bot,
    ai: true,
  },
  {
    name: 'Zero-Knowledge Infrastructure',
    desc: 'Passwordless auth and privacy-preserving compliance.',
    items: ['Passwordless auth', 'Document verification', 'ZK-KYC', 'Private compliance'],
    analogy: 'Okta for Identity & Authorization',
    icon: Fingerprint,
  },
  {
    name: 'Blockchain Trust Layer',
    desc: 'Immutable audit trails, trust registries, and credential verification.',
    items: ['Audit trails', 'Compliance logs', 'Trust registries', 'Credentials'],
    analogy: 'Chainlink for Trust Infrastructure',
    icon: Boxes,
  },
  {
    name: 'AI + Blockchain',
    desc: 'Verifiable AI actions, autonomous compliance, and machine-to-machine trust.',
    items: ['Verifiable actions', 'Autonomous compliance', 'M2M trust'],
    analogy: 'The connective tissue across all pillars',
    icon: Workflow,
    ai: true,
  },
]

interface Line {
  x1: number
  y1: number
  x2: number
  y2: number
}

export function PillarsNetwork() {
  const reduce = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(-1)
  const [lines, setLines] = useState<Line[]>([])

  const activate = (i: number) => {
    setActive(i)
    const container = containerRef.current
    const fromEl = cardRefs.current[i]
    if (!container || !fromEl) return
    const base = container.getBoundingClientRect()
    const center = (el: HTMLElement) => {
      const r = el.getBoundingClientRect()
      return { x: r.left - base.left + r.width / 2, y: r.top - base.top + r.height / 2 }
    }
    const from = center(fromEl)
    const next: Line[] = []
    cardRefs.current.forEach((el, j) => {
      if (j === i || !el) return
      const to = center(el)
      next.push({ x1: from.x, y1: from.y, x2: to.x, y2: to.y })
    })
    setLines(next)
  }

  const deactivate = () => {
    setActive(-1)
    setLines([])
  }

  return (
    <div ref={containerRef} className="relative">
      {/* connection overlay — above the cards so the network reads */}
      <svg
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
        aria-hidden="true"
      >
        {lines.map((l, i) => (
          <g key={`${active}-${i}`}>
            <motion.line
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="var(--accent)"
              strokeWidth={1}
              strokeOpacity={0.5}
              initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
              animate={reduce ? undefined : { pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
            <circle cx={l.x2} cy={l.y2} r={3} fill="var(--accent)" />
          </g>
        ))}
        {lines.length > 0 && (
          <circle cx={lines[0].x1} cy={lines[0].y1} r={4} fill="var(--accent)" />
        )}
      </svg>

      <div className="relative z-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PILLARS.map((p, i) => {
          const Icon = p.icon
          const isActive = active === i
          return (
            <div
              key={p.name}
              ref={(el) => {
                cardRefs.current[i] = el
              }}
              tabIndex={0}
              role="group"
              aria-label={`${p.name}. ${p.analogy}`}
              className="rounded-[var(--radius)] outline-none"
              onMouseEnter={() => activate(i)}
              onMouseLeave={deactivate}
              onFocus={() => activate(i)}
              onBlur={deactivate}
            >
              <SpecimenCard
                serial={`VZQ-${String(i + 1).padStart(2, '0')}`}
                interactive
                tilt
                className="h-full"
              >
                <Icon
                  size={22}
                  aria-hidden="true"
                  style={{ color: p.ai ? 'var(--accent-2)' : 'var(--accent)' }}
                />
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-full border border-hairline px-2.5 py-1 font-mono text-[0.68rem] text-faint"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
                <p
                  className="mt-4 font-mono text-[0.72rem] transition-opacity duration-300"
                  style={{
                    color: 'var(--accent)',
                    opacity: isActive ? 1 : 0,
                  }}
                  aria-hidden={!isActive}
                >
                  // {p.analogy}
                </p>
              </SpecimenCard>
            </div>
          )
        })}

        {/* tagline tile fills the sixth cell */}
        <div className="flex flex-col justify-center rounded-[var(--radius)] border border-dashed border-hairline p-6">
          <ConvergeMark />
          <p className="text-xl font-semibold leading-snug">
            One platform. Five pillars.{' '}
            <span className="text-gradient">Infinite trust.</span>
          </p>
          <p className="mt-3 text-sm text-muted">
            The only integrated AI trust infrastructure in the market. Each pillar
            stands alone; together they form one trust fabric.
          </p>
        </div>
      </div>
    </div>
  )
}
