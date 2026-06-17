import { lazy, Suspense } from 'react'
import { ScrollReveal } from '../components/ScrollReveal'
import { MagneticButton } from '../components/MagneticButton'
import { scrollToId } from '../lib/scroll'
import { CONTACT_ID } from '../lib/nav'

const NodeLattice = lazy(() =>
  import('../components/canvas/NodeLattice').then((m) => ({ default: m.NodeLattice })),
)

/*
  The closing moment. Forced dark in both themes (the darkest beat of the page),
  with the ambient node lattice behind and the signature triad line.
*/
export function Vision() {
  return (
    <section
      id="vision"
      data-theme="dark"
      className="relative overflow-hidden scroll-mt-20"
      style={{ background: 'var(--bg)', color: 'var(--ink)' }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <Suspense fallback={null}>
          <NodeLattice className="absolute inset-0" density={30000} />
        </Suspense>
      </div>
      <div
        aria-hidden="true"
        className="accent-glow pointer-events-none absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
      />

      <div className="shell relative py-32 md:py-48">
        <p className="mono-eyebrow mb-10">Vision 2035</p>

        <div className="space-y-2 md:space-y-3">
          <ScrollReveal>
            <p className="text-3xl font-semibold tracking-tight md:text-5xl">
              The future of AI is autonomous.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <p className="text-3xl font-semibold tracking-tight text-muted md:text-5xl">
              The future of autonomy is verifiable.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.24}>
            <p className="text-3xl font-semibold tracking-tight md:text-5xl">
              The future of verification is{' '}
              <span className="text-gradient">VENZIQ.</span>
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.1}>
          <p className="mt-12 max-w-2xl text-lg text-muted">
            The trust layer of the autonomous economy: citizen digital identity and
            AI verification for governments, secure AI trading and compliance for
            financial institutions, privacy-preserving diagnostics for healthcare,
            and verifiable identities for AI agents.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-12">
            <MagneticButton onClick={() => scrollToId(CONTACT_ID)} strength={0.4}>
              Request access
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
