import { useRef, useState, type PointerEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Rocket, Share2, Database, Cable, KeyRound, Landmark, Check, type LucideIcon } from 'lucide-react'
import { Section, Eyebrow } from '../components/Section'
import { DecodeHeadline } from '../components/DecodeHeadline'
import { SpecimenCard } from '../components/SpecimenCard'

interface Point {
  icon: LucideIcon
  title: string
  desc: string
}

const POINTS: Point[] = [
  { icon: Rocket, title: 'First mover', desc: 'We define a category rather than compete inside one.' },
  { icon: Share2, title: 'Network effects', desc: 'Each pillar strengthens the others as the network grows.' },
  { icon: Database, title: 'Trust-graph moat', desc: 'A data and trust graph that improves with every action.' },
  { icon: Cable, title: 'Switching costs', desc: 'Deep enterprise integrations that are hard to unwind.' },
  { icon: KeyRound, title: 'Cryptographic IP', desc: 'Zero-knowledge and blockchain work that is hard to replicate.' },
  { icon: Landmark, title: 'Standards seat', desc: 'Active engagement with regulators and standards bodies.' },
]

export function WhyVenziq() {
  const reduce = useReducedMotion()
  const gridRef = useRef<HTMLDivElement>(null)
  const [examined, setExamined] = useState<Set<number>>(() => new Set())

  // cursor-tracked spotlight (written straight to CSS vars, no re-render)
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = gridRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  const mark = (i: number) =>
    setExamined((prev) => {
      if (prev.has(i)) return prev
      const next = new Set(prev)
      next.add(i)
      return next
    })

  const count = examined.size
  const total = POINTS.length
  const complete = count >= total

  return (
    <Section id="why" panel>
      <div className="max-w-3xl">
        <Eyebrow>Why VENZIQ</Eyebrow>
        <DecodeHeadline text="Built to be hard to replicate" className="text-4xl font-semibold md:text-5xl" />
        <p className="mt-6 text-lg text-muted">
          Defensibility comes from the shape of the system, not a single feature. The moat
          completes as you examine each edge.
        </p>
      </div>

      {/* moat-integrity meter */}
      <div className="mt-10 flex items-center gap-4">
        <span className="mono-eyebrow shrink-0">moat integrity</span>
        <div className="relative h-1 flex-1 overflow-hidden rounded-full" style={{ background: 'var(--hairline)' }}>
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ background: 'var(--accent)' }}
            initial={false}
            animate={{ width: `${(count / total) * 100}%` }}
            transition={reduce ? { duration: 0 } : { duration: 0.4, ease: 'easeOut' }}
          />
        </div>
        <span
          className="shrink-0 font-mono text-xs"
          style={{ color: complete ? 'var(--accent)' : 'var(--muted)' }}
        >
          {complete ? 'mapped ✓' : `${count}/${total}`}
        </span>
      </div>

      <div
        ref={gridRef}
        onPointerMove={onMove}
        className="group relative mt-8"
        style={{ '--mx': '50%', '--my': '50%' } as React.CSSProperties}
      >
        {/* cursor spotlight */}
        {!reduce && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(360px circle at var(--mx) var(--my), var(--accent-soft), transparent 60%)',
            }}
          />
        )}

        <div className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {POINTS.map((p, i) => {
            const Icon = p.icon
            const seen = examined.has(i)
            return (
              <div
                key={p.title}
                tabIndex={0}
                role="group"
                aria-label={`${p.title}. ${p.desc}`}
                onMouseEnter={() => mark(i)}
                onFocus={() => mark(i)}
                className="rounded-[var(--radius)] outline-none"
              >
                <SpecimenCard
                  serial={`DEF-${String(i + 1).padStart(2, '0')}`}
                  interactive
                  tilt
                  className="h-full"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-[var(--radius)] border transition-colors duration-300"
                      style={{
                        background: seen ? 'var(--accent)' : 'var(--accent-soft)',
                        borderColor: seen ? 'var(--accent)' : 'var(--hairline)',
                      }}
                    >
                      <Icon size={18} style={{ color: seen ? 'var(--accent-ink)' : 'var(--accent)' }} aria-hidden="true" />
                    </div>
                    {seen && <Check size={15} style={{ color: 'var(--accent)' }} aria-hidden="true" />}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
                </SpecimenCard>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
