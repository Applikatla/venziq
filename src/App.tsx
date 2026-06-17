import { lazy, Suspense, useEffect } from 'react'
import { useReducedMotion } from 'motion/react'
import { Nav } from './components/layout/Nav'
import { SiteFooter } from './components/layout/SiteFooter'
import { CursorRing } from './components/CursorRing'
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
      <CursorRing />
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
        <Architecture />
        <WhyVenziq />
        <Vision />
      </main>
      <SiteFooter />
    </>
  )
}
