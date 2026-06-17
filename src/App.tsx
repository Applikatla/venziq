import { useEffect } from 'react'
import { useReducedMotion } from 'motion/react'
import { Nav } from './components/layout/Nav'
import { SiteFooter } from './components/layout/SiteFooter'
import { initLenis } from './lib/scroll'
import { Hero } from './sections/Hero'
import { ProofBand } from './sections/ProofBand'
import { Problem } from './sections/Problem'
import { Platform } from './sections/Platform'
import { CorePattern } from './sections/CorePattern'
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
      <Nav />
      <main>
        <Hero />
        <ProofBand />
        <Problem />
        <Platform />
        <CorePattern />
        <Architecture />
        <WhyVenziq />
        <Vision />
      </main>
      <SiteFooter />
    </>
  )
}
