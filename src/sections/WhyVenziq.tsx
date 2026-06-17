import { Rocket, Share2, Database, Cable, KeyRound, Landmark, type LucideIcon } from 'lucide-react'
import { Section, Eyebrow } from '../components/Section'
import { DecodeHeadline } from '../components/DecodeHeadline'
import { ScrollReveal } from '../components/ScrollReveal'

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
  return (
    <Section id="why" panel>
      <div className="max-w-3xl">
        <Eyebrow>Why VENZIQ</Eyebrow>
        <DecodeHeadline
          text="Built to be hard to replicate"
          className="text-4xl font-semibold md:text-5xl"
        />
        <p className="mt-6 text-lg text-muted">
          Defensibility comes from the shape of the system, not a single feature.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {POINTS.map((p, i) => {
          const Icon = p.icon
          return (
            <ScrollReveal key={p.title} delay={i * 0.05}>
              <div className="flex flex-col gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-[var(--radius)] border border-hairline"
                  style={{ background: 'var(--accent-soft)' }}
                >
                  <Icon size={18} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{p.desc}</p>
              </div>
            </ScrollReveal>
          )
        })}
      </div>
    </Section>
  )
}
