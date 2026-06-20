import { Fragment, useState } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { Plus } from 'lucide-react'
import { Section, Eyebrow } from '../components/Section'
import { DecodeHeadline } from '../components/DecodeHeadline'
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

export function CorePattern() {
  return (
    <Section id="pattern" panel>
      <div className="max-w-3xl">
        <Eyebrow>The core pattern</Eyebrow>
        <DecodeHeadline
          text="Every use case follows one shape"
          className="text-4xl font-semibold md:text-5xl"
        />
        <p className="mt-6 text-lg text-muted">
          An AI agent acts, a zero-knowledge proof verifies it, and the blockchain
          seals an immutable audit trail. Hover any term to see what it means.
        </p>
      </div>

      <div className="mt-14 rounded-[var(--radius)] border border-hairline px-6 py-12">
        <EquationFlow />
      </div>
    </Section>
  )
}
