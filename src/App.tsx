import { useEffect } from 'react'
import { useReducedMotion } from 'motion/react'
import { Nav } from './components/layout/Nav'
import { SiteFooter } from './components/layout/SiteFooter'
import { CursorRing } from './components/CursorRing'
import { AmbientLayer } from './components/ambient/AmbientLayer'
import { CommandPalette } from './components/CommandPalette'
import { BootSequence } from './components/BootSequence'
import { ShieldOverlay } from './components/Shield'
import { VerifySweep } from './components/VerifySweep'
import { HelpOverlay } from './components/HelpOverlay'
import { initLenis } from './lib/scroll'
import { useRoute } from './lib/router'
import { LandingPage } from './pages/LandingPage'
import { PlatformPage } from './pages/PlatformPage'

export default function App() {
  const reduce = useReducedMotion()
  const route = useRoute()
  const isPlatform = route.startsWith('/platform')

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
      <CommandPalette />
      <Nav />
      {isPlatform ? <PlatformPage /> : <LandingPage />}
      <SiteFooter />
    </>
  )
}
