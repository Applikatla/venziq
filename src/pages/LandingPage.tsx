import { motion, useReducedMotion } from 'motion/react'
import { ShieldCheck, FileCheck2, Boxes, ArrowRight } from 'lucide-react'
import { Hero } from '../sections/Hero'
import { UseCases } from '../sections/UseCases'
import { Section, Eyebrow } from '../components/Section'
import { DecodeHeadline } from '../components/DecodeHeadline'
import { ScrollReveal } from '../components/ScrollReveal'
import { MagneticButton } from '../components/MagneticButton'
import { RouteLink } from '../components/RouteLink'
import { openContact } from '../lib/nav'

const STEPS = [
  {
    n: '01',
    icon: ShieldCheck,
    title: 'An agent acts',
    body: 'Your AI agent performs a real operation on its own: a trade, a data request, a transaction.',
  },
  {
    n: '02',
    icon: FileCheck2,
    title: 'Its authority is proven',
    body: 'A zero-knowledge proof confirms the agent was authorized, without exposing the underlying data.',
  },
  {
    n: '03',
    icon: Boxes,
    title: 'The record is sealed',
    body: 'An immutable audit trail is written on-chain. Anyone can verify exactly what happened, and the record is permanent.',
  },
]

function HowItWorks() {
  return (
    <Section id="how">
      <div className="max-w-3xl">
        <Eyebrow>How it works</Eyebrow>
        <DecodeHeadline
          text="One simple pattern, every time"
          className="text-4xl font-semibold md:text-5xl"
        />
        <p className="mt-6 text-lg text-muted">
          You shouldn&apos;t have to take an AI agent&apos;s word for it. With VENZIQ, every action
          an agent takes comes with a proof you can check for yourself.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {STEPS.map((s, i) => {
          const Icon = s.icon
          return (
            <ScrollReveal key={s.n} delay={i * 0.08}>
              <div className="glass h-full p-6">
                <div className="flex items-center justify-between">
                  <Icon size={22} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                  <span className="mono-eyebrow text-[0.7rem] text-faint">{s.n}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            </ScrollReveal>
          )
        })}
      </div>

      <ScrollReveal>
        <p className="mt-10 font-mono text-sm text-muted">
          <span style={{ color: 'var(--accent-2)' }}>AI action</span>{' '}
          <span className="text-faint">+</span>{' '}
          <span style={{ color: 'var(--accent-2)' }}>zero-knowledge proof</span>{' '}
          <span className="text-faint">+</span>{' '}
          <span style={{ color: 'var(--accent-2)' }}>blockchain audit</span>{' '}
          <span className="text-faint">=</span>{' '}
          <span style={{ color: 'var(--accent)' }}>trusted autonomy</span>
        </p>
      </ScrollReveal>
    </Section>
  )
}

const FIT = [
  {
    title: 'You run AI agents in production',
    body: 'Autonomous systems that take real actions, not just chatbots answering questions.',
  },
  {
    title: 'You operate under real scrutiny',
    body: 'Regulated, high-stakes environments where every action must be auditable and compliant.',
  },
  {
    title: 'Mistakes are expensive',
    body: 'Finance, healthcare, government, critical infrastructure. In these fields, unverifiable AI is a liability.',
  },
]

function WhoItsFor() {
  return (
    <Section id="who" panel>
      <div className="max-w-3xl">
        <Eyebrow>Who it&apos;s for</Eyebrow>
        <DecodeHeadline
          text="Built for enterprises, not chatbots"
          className="text-4xl font-semibold md:text-5xl"
        />
        <p className="mt-6 text-lg text-muted">
          VENZIQ is for organizations putting autonomous AI to work where the stakes are real. If
          any of these sound like you, this is built for you.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3">
        {FIT.map((f, i) => (
          <ScrollReveal key={f.title} delay={i * 0.06}>
            <div className="border-t border-hairline pt-5">
              <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>
                0{i + 1}
              </span>
              <h3 className="mt-2 text-lg font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  )
}

function LandingCTA() {
  const reduce = useReducedMotion()
  return (
    <Section>
      <ScrollReveal>
        <div className="glass relative overflow-hidden p-8 text-center md:p-14">
          <motion.div
            aria-hidden="true"
            className="accent-glow pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/3 rounded-full blur-2xl"
            initial={reduce ? false : { opacity: 0.5 }}
            animate={reduce ? undefined : { opacity: [0.4, 0.7, 0.4] }}
            transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
              Want the full picture?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              See the products, the technology, and the live verification demos behind the platform.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <RouteLink
                to="/platform"
                className="vzq-accent-btn inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
                aria-label="Explore the platform"
              >
                Explore the platform
                <ArrowRight size={15} aria-hidden="true" />
              </RouteLink>
              <MagneticButton onClick={openContact}>Let&apos;s connect</MagneticButton>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  )
}

export function LandingPage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <WhoItsFor />
      <UseCases />
      <LandingCTA />
    </main>
  )
}
