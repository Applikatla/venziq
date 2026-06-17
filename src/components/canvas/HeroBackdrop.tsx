import { lazy, Suspense, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { AsciiField } from './AsciiField'

const WebGLLattice = lazy(() =>
  import('./WebGLLattice').then((m) => ({ default: m.WebGLLattice })),
)

/*
  Chooses the hero backdrop: the WebGL trust lattice on capable desktops, else the
  Canvas 2D verification field (the guaranteed fallback). Gated on WebGL2 support,
  fine pointer, a roomy viewport, and reduced-motion.
*/
function canRunWebGL(reduce: boolean): boolean {
  if (reduce || typeof window === 'undefined') return false
  if (!window.matchMedia('(pointer: fine)').matches) return false
  if (window.innerWidth < 1024) return false
  try {
    const c = document.createElement('canvas')
    return !!c.getContext('webgl2')
  } catch {
    return false
  }
}

export function HeroBackdrop({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const [useWebGL] = useState(() => canRunWebGL(!!reduce))

  if (useWebGL) {
    return (
      <Suspense fallback={<AsciiField className={className} />}>
        <WebGLLattice className={className} />
      </Suspense>
    )
  }
  return <AsciiField className={className} />
}
