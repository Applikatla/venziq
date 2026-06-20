import { useMemo, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { Landmark, HeartPulse, Building2, RotateCw, Check, type LucideIcon } from 'lucide-react'
import { Section, Eyebrow } from '../components/Section'
import { DecodeHeadline } from '../components/DecodeHeadline'
import { ScrollReveal } from '../components/ScrollReveal'

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

function mulberry32(a: number) {
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
function seedHex(rng: () => number, n: number): string {
  let s = ''
  for (let i = 0; i < n; i++) s += '0123456789abcdef'[(rng() * 16) | 0]
  return s
}

/* A use-case card that flips to reveal a sealed audit trail on the back. */
function UseCaseFlip({ uc, index }: { uc: UseCase; index: number }) {
  const reduce = useReducedMotion()
  const [flipped, setFlipped] = useState(false)
  const Icon = uc.icon

  const records = useMemo(
    () =>
      uc.steps.map((step, s) => {
        const rng = mulberry32(index * 131 + s * 17 + 3)
        return {
          step,
          hash: '0x' + seedHex(rng, 8),
          block: 18_400_000 + ((rng() * 900000) | 0),
        }
      }),
    [uc, index],
  )

  const face =
    'glass absolute inset-0 p-6 [backface-visibility:hidden] [transform-style:preserve-3d]'

  return (
    <div style={{ perspective: 1200 }} className="h-[360px]">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-label={`${uc.industry} — ${flipped ? 'show steps' : 'show audit trail'}`}
        className="relative h-full w-full cursor-pointer text-left outline-none"
        style={{
          transformStyle: 'preserve-3d',
          transition: reduce ? 'none' : 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
          transform: flipped ? 'rotateY(180deg)' : 'none',
        }}
      >
        {/* front */}
        <div className={face}>
          <span className="mono-eyebrow absolute right-4 top-4 text-[0.6rem] text-faint">
            UC-{String(index + 1).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-2.5">
            <Icon size={20} style={{ color: 'var(--accent)' }} aria-hidden="true" />
            <h3 className="text-lg font-semibold tracking-tight">{uc.industry}</h3>
          </div>
          <ol className="mt-5 space-y-4">
            {uc.steps.map((step, s) => (
              <li key={step} className="flex gap-3">
                <span className="mt-0.5 font-mono text-xs" style={{ color: 'var(--accent)' }} aria-hidden="true">
                  0{s + 1}
                </span>
                <span className="text-sm leading-relaxed text-ink">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 border-t border-hairline pt-4 text-sm text-muted">{uc.outcome}</p>
          <p className="mt-4 flex items-center gap-1.5 font-mono text-[0.62rem] text-faint">
            <RotateCw size={11} aria-hidden="true" /> tap for audit trail
          </p>
        </div>

        {/* back — sealed audit trail */}
        <div className={`${face} [transform:rotateY(180deg)]`}>
          <span className="mono-eyebrow absolute right-4 top-4 text-[0.6rem] text-faint">
            UC-{String(index + 1).padStart(2, '0')}
          </span>
          <p className="mono-eyebrow">audit trail · {uc.industry}</p>
          <ul className="mt-5 space-y-4">
            {records.map((r) => (
              <li key={r.hash} className="font-mono text-[0.72rem]">
                <div className="flex items-center gap-2">
                  <Check size={12} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                  <span className="truncate text-ink">{r.step}</span>
                </div>
                <div className="mt-0.5 pl-5 text-faint">
                  {r.hash} · #{r.block}
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-5 flex items-center gap-1.5 font-mono text-[0.62rem] text-faint">
            <RotateCw size={11} aria-hidden="true" /> tap to flip back
          </p>
        </div>
      </button>
    </div>
  )
}

/* The "where it matters most" scenarios — concrete, skimmable, and self-explanatory. */
export function UseCases({ panel = false }: { panel?: boolean }) {
  return (
    <Section id="use-cases" panel={panel}>
      <div className="max-w-3xl">
        <Eyebrow>Where it matters most</Eyebrow>
        <DecodeHeadline
          text="Built for high-stakes, regulated work"
          className="text-4xl font-semibold md:text-5xl"
        />
        <p className="mt-6 text-lg text-muted">
          The same pattern — act, prove, seal — secures autonomous AI exactly where mistakes are
          most costly. A few of the scenarios it unlocks:
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {USE_CASES.map((uc, i) => (
          <ScrollReveal key={uc.industry} delay={i * 0.08}>
            <UseCaseFlip uc={uc} index={i} />
          </ScrollReveal>
        ))}
      </div>
    </Section>
  )
}
