import { Fragment, useState } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { Landmark, HeartPulse, Building2, type LucideIcon } from 'lucide-react'
import { Plus } from 'lucide-react'
import { Section, Eyebrow } from '../components/Section'
import { DecodeHeadline } from '../components/DecodeHeadline'
import { SpecimenCard } from '../components/SpecimenCard'
import { ScrollReveal } from '../components/ScrollReveal'
import { useReveal } from '../lib/useReveal'

const TERMS = ['AI action', 'ZK verification', 'blockchain audit'] as const

const EXPLAIN: Record<string, string> = {
  'AI action': 'An autonomous agent performs a real operation.',
  'ZK verification': 'A zero-knowledge proof confirms it was authorized — without revealing the data.',
  'blockchain audit': 'An immutable record is sealed on-chain for anyone to verify.',
  'trusted autonomy': 'The agent acts on its own, and every action stays provable.',
}

function EquationFlow() {
  const reduce = useReducedMotion()
  const { ref, shown } = useReveal<HTMLDivElement>()
  const [hovered, setHovered] = useState<string | null>(null)

  const parent: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.22, delayChildren: 0.1 } },
  }
  const node: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <div>
      <motion.div
        ref={ref}
        className="relative flex flex-col items-center gap-4 md:flex-row md:flex-wrap md:justify-center"
        variants={reduce ? undefined : parent}
        initial={reduce ? undefined : 'hidden'}
        animate={reduce ? undefined : shown ? 'show' : 'hidden'}
      >
        {TERMS.map((term, i) => (
          <Fragment key={term}>
            {i > 0 && (
              <motion.span variants={reduce ? undefined : node} className="text-faint" aria-hidden="true">
                <Plus size={16} />
              </motion.span>
            )}
            <motion.button
              type="button"
              variants={reduce ? undefined : node}
              onMouseEnter={() => setHovered(term)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(term)}
              onBlur={() => setHovered(null)}
              className="rounded-full border bg-glass px-4 py-2 font-mono text-sm text-ink transition-colors"
              style={{ borderColor: hovered === term ? 'var(--accent)' : 'var(--hairline)' }}
            >
              {term}
            </motion.button>
          </Fragment>
        ))}
        <motion.span variants={reduce ? undefined : node} className="px-1 font-mono text-lg text-faint" aria-hidden="true">
          =
        </motion.span>
        <motion.button
          type="button"
          variants={reduce ? undefined : node}
          onMouseEnter={() => setHovered('trusted autonomy')}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered('trusted autonomy')}
          onBlur={() => setHovered(null)}
          className="rounded-full px-5 py-2.5 font-mono text-sm font-medium"
          style={{ background: 'var(--accent)', color: 'var(--accent-ink)', boxShadow: '0 0 40px var(--accent-soft)' }}
        >
          trusted autonomy
        </motion.button>
      </motion.div>

      <p className="mt-6 text-center text-sm text-muted" aria-live="polite">
        {hovered ? EXPLAIN[hovered] : 'Hover each term to inspect the flow.'}
      </p>
    </div>
  )
}

interface UseCase {
  industry: string
  icon: LucideIcon
  steps: string[]
  outcome: string
}

const USE_CASES: UseCase[] = [
  {
    industry: 'Financial services',
    icon: Landmark,
    steps: [
      'An AI agent submits a trade',
      'A ZK proof verifies its authorization',
      'The blockchain records an immutable audit trail',
    ],
    outcome: 'Autonomous operations with full regulatory compliance.',
  },
  {
    industry: 'Healthcare',
    icon: HeartPulse,
    steps: [
      'An AI system processes patient data',
      'Privacy-preserving verification keeps it compliant',
      'Selective disclosure shares only what is needed',
    ],
    outcome: 'AI diagnostics without privacy violations.',
  },
  {
    industry: 'Government',
    icon: Building2,
    steps: [
      'A citizen agent submits a request',
      'Identity is verified through verifiable credentials',
      'An immutable record provides transparency',
    ],
    outcome: 'Faster processing with full auditability.',
  },
]

export function CorePattern() {
  return (
    <Section id="use-cases" panel>
      <div className="max-w-3xl">
        <Eyebrow>The core pattern</Eyebrow>
        <DecodeHeadline
          text="Every use case follows one shape"
          className="text-4xl font-semibold md:text-5xl"
        />
        <p className="mt-6 text-lg text-muted">
          An AI agent acts, a zero-knowledge proof verifies it, and the blockchain
          seals an immutable audit trail.
        </p>
      </div>

      <div className="mt-14 rounded-[var(--radius)] border border-hairline px-6 py-12">
        <EquationFlow />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {USE_CASES.map((uc, i) => {
          const Icon = uc.icon
          return (
            <ScrollReveal key={uc.industry} delay={i * 0.08}>
              <SpecimenCard serial={`UC-${String(i + 1).padStart(2, '0')}`} className="h-full" tilt>
                <div className="flex items-center gap-2.5">
                  <Icon size={20} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                  <h3 className="text-lg font-semibold tracking-tight">{uc.industry}</h3>
                </div>
                <ol className="mt-5 space-y-4">
                  {uc.steps.map((step, s) => (
                    <li key={step} className="flex gap-3">
                      <span
                        className="mt-0.5 font-mono text-xs"
                        style={{ color: 'var(--accent)' }}
                        aria-hidden="true"
                      >
                        0{s + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-ink">{step}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-6 border-t border-hairline pt-4 text-sm text-muted">
                  {uc.outcome}
                </p>
              </SpecimenCard>
            </ScrollReveal>
          )
        })}
      </div>
    </Section>
  )
}
