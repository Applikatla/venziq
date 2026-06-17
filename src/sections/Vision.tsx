import { lazy, Suspense } from 'react'
import { ScrollReveal } from '../components/ScrollReveal'
import { MagneticButton } from '../components/MagneticButton'
import { openContact } from '../lib/nav'
import { useTrust } from '../lib/trust-context'

const NodeLattice = lazy(() =>
  import('../components/canvas/NodeLattice').then((m) => ({ default: m.NodeLattice })),
)

/*
  The closing moment. Forced dark in both themes (the darkest beat of the page),
  with the ambient node lattice behind and the signature triad line.
*/
export function Vision() {
  const { sessionId, verified, total } = useTrust()
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
            <MagneticButton onClick={openContact} strength={0.4}>
              Let&apos;s connect
            </MagneticButton>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="mt-14 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-hairline px-4 py-2 font-mono text-[0.72rem] text-faint">
            <span style={{ color: 'var(--accent)' }}>session {sessionId}</span>
            <span aria-hidden="true">·</span>
            <span>
              {verified.length}/{total} sections verified
            </span>
            <span aria-hidden="true">·</span>
            <span style={{ color: verified.length >= total ? 'var(--accent)' : 'var(--muted)' }}>
              {verified.length >= total ? 'sealed ✓' : 'sealing…'}
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
