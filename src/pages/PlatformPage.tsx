import { lazy, Suspense } from 'react'
import { ArrowLeft } from 'lucide-react'
import { DecodeHeadline } from '../components/DecodeHeadline'
import { ProofBand } from '../sections/ProofBand'
import { Problem } from '../sections/Problem'
import { Platform } from '../sections/Platform'
import { CorePattern } from '../sections/CorePattern'
import { Playground } from '../sections/Playground'
import { ZkProof } from '../sections/ZkProof'
import { Architecture } from '../sections/Architecture'
import { WhyVenziq } from '../sections/WhyVenziq'
import { Vision } from '../sections/Vision'
import { ProofSpine } from '../components/ProofSpine'
import { TrustHUD } from '../components/hud/TrustHUD'
import { RouteLink } from '../components/RouteLink'

const ChaosToOrder = lazy(() =>
  import('../components/canvas/ChaosToOrder').then((m) => ({ default: m.ChaosToOrder })),
)

function PlatformIntro() {
  return (
    <section id="top" className="relative overflow-hidden pb-2 pt-32">
      <div className="shell">
        <RouteLink
          to="/"
          className="mono-eyebrow inline-flex items-center gap-2 text-faint transition-colors hover:text-ink"
        >
          <ArrowLeft size={13} aria-hidden="true" /> back to home
        </RouteLink>
        <p className="mono-eyebrow mb-5 mt-8">The platform</p>
        <DecodeHeadline
          as="h1"
          trigger="mount"
          text="How VENZIQ makes AI provable"
          className="max-w-4xl text-4xl font-semibold leading-[1.04] tracking-tight md:text-6xl"
        />
        <p className="mt-6 max-w-2xl text-lg text-muted">
          The products, the technology, and the live demos behind the trust layer — the problem it
          solves, the five pillars, and the act → prove → seal pattern you can try yourself.
        </p>
      </div>
    </section>
  )
}

export function PlatformPage() {
  return (
    <>
      <main>
        <PlatformIntro />
        <ProofBand />
        <Problem />
        <Suspense fallback={<div className="h-[70vh]" />}>
          <ChaosToOrder />
        </Suspense>
        <Platform />
        <CorePattern />
        <Playground />
        <ZkProof />
        <Architecture />
        <WhyVenziq />
        <Vision />
      </main>
      <ProofSpine />
      <TrustHUD />
    </>
  )
}
