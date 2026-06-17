import { AlertTriangle, ArrowRight } from 'lucide-react'
import { Section, Eyebrow } from '../components/Section'
import { DecodeHeadline } from '../components/DecodeHeadline'
import { ScrollReveal } from '../components/ScrollReveal'

const FAILURES = [
  'AI actions are untraceable and unverifiable, creating accountability gaps',
  'AI workloads open new attack surfaces that legacy security never anticipated',
  'AI-generated decisions lack immutable audit trails for compliance and governance',
  'Adversarial attacks like prompt injection and model exploitation keep escalating',
  'Regulation is expanding faster than enterprises can adapt',
  'Identity systems were designed for people, not autonomous agents',
]

const LEGACY = [
  { tool: 'Identity & access', does: 'Authenticates humans', miss: 'Not AI agents' },
  { tool: 'Network security', does: 'Defends a perimeter', miss: 'Not AI workloads' },
  { tool: 'Workflow automation', does: 'Human-triggered', miss: 'No autonomous trust' },
  { tool: 'Compliance tooling', does: 'Tracks human actions', miss: 'Not AI transactions' },
]

export function Problem() {
  return (
    <Section id="problem">
      <div className="max-w-3xl">
        <Eyebrow>The problem</Eyebrow>
        <DecodeHeadline
          text="The gap is structural, not incremental"
          className="text-4xl font-semibold md:text-5xl"
        />
        <p className="mt-6 text-lg text-muted">
          Current infrastructure was built for humans, not autonomous agents. As
          AI agents take on real work, that gap becomes dangerous.
        </p>
      </div>

      <div className="mt-14 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {FAILURES.map((f, i) => (
          <ScrollReveal key={f} delay={i * 0.05}>
            <div className="flex gap-3">
              <AlertTriangle
                size={18}
                className="mt-0.5 shrink-0"
                style={{ color: 'var(--threat)' }}
                aria-hidden="true"
              />
              <p className="text-[0.98rem] leading-relaxed text-ink">{f}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div className="mt-20">
          <p className="mono-eyebrow mb-6">Why legacy tools fail</p>
          <div className="overflow-hidden rounded-[var(--radius)] border border-hairline">
            {LEGACY.map((row, i) => (
              <div
                key={row.tool}
                className={`grid grid-cols-1 items-center gap-2 px-5 py-4 sm:grid-cols-[1fr_1fr_1fr] sm:gap-6 ${
                  i !== LEGACY.length - 1 ? 'border-b border-hairline' : ''
                }`}
              >
                <span className="font-mono text-sm text-ink">{row.tool}</span>
                <span className="text-sm text-muted">{row.does}</span>
                <span
                  className="flex items-center gap-2 text-sm"
                  style={{ color: 'var(--threat)' }}
                >
                  <ArrowRight size={14} aria-hidden="true" />
                  {row.miss}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <p className="mt-16 max-w-2xl text-xl font-medium text-ink md:text-2xl">
          A new infrastructure category is required.
        </p>
      </ScrollReveal>
    </Section>
  )
}
