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
import {
  BlackBoxRecorderPage,
  AgentAuditTrailPage,
  ArchitecturePage,
  SecurityPage,
  DevelopersPage,
  LangsmithComparePage,
  UseCasesPage,
  BlogFoundationPage
} from './pages/SEOPages'

export default function App() {
  const reduce = useReducedMotion()
  const route = useRoute()

  useEffect(() => {
    if (reduce) return
    return initLenis()
  }, [reduce])

  const renderPage = () => {
    if (route.startsWith('/platform')) return <PlatformPage />
    if (route.startsWith('/architecture')) return <ArchitecturePage />
    if (route.startsWith('/ai-black-box-recorder')) return <BlackBoxRecorderPage />
    if (route.startsWith('/ai-agent-audit-trail')) return <AgentAuditTrailPage />
    if (route.startsWith('/security')) return <SecurityPage />
    if (route.startsWith('/developers')) return <DevelopersPage />
    if (route.startsWith('/compare/langsmith-vs-venziq')) return <LangsmithComparePage />
    if (route.startsWith('/use-cases')) return <UseCasesPage />
    if (route.startsWith('/blog')) return <BlogFoundationPage />
    return <LandingPage />
  }

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
      {renderPage()}
      <SiteFooter />
    </>
  )
}
