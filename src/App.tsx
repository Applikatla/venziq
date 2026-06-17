import { lazy, Suspense, useEffect } from 'react'
import { useReducedMotion } from 'motion/react'
import { Nav } from './components/layout/Nav'
import { SiteFooter } from './components/layout/SiteFooter'
import { CursorRing } from './components/CursorRing'
import { AmbientLayer } from './components/ambient/AmbientLayer'
import { ProofSpine } from './components/ProofSpine'
import { TrustHUD } from './components/hud/TrustHUD'
import { CommandPalette } from './components/CommandPalette'
import { BootSequence } from './components/BootSequence'
import { ShieldOverlay } from './components/Shield'
import { VerifySweep } from './components/VerifySweep'
import { HelpOverlay } from './components/HelpOverlay'
import { initLenis } from './lib/scroll'
import { Hero } from './sections/Hero'
import { ProofBand } from './sections/ProofBand'
import { Problem } from './sections/Problem'
import { Platform } from './sections/Platform'

const ChaosToOrder = lazy(() =>
  import('./components/canvas/ChaosToOrder').then((m) => ({ default: m.ChaosToOrder })),
)
import { CorePattern } from './sections/CorePattern'
import { Playground } from './sections/Playground'
import { ZkProof } from './sections/ZkProof'
import { Architecture } from './sections/Architecture'
import { WhyVenziq } from './sections/WhyVenziq'
import { Vision } from './sections/Vision'

export default function App() {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    return initLenis()
  }, [reduce])

  return (
    <>
      <BootSequence />
      <AmbientLayer />
      <CursorRing />
      <ShieldOverlay />
      <VerifySweep />
      <HelpOverlay />
      <ProofSpine />
      <TrustHUD />
      <CommandPalette />
      <Nav />
      <main>
        <Hero />
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
      <SiteFooter />
    </>
  )
}
