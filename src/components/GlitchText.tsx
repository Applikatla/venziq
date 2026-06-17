import {
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react'
import { useReducedMotion } from 'motion/react'

type TagProps = {
  className?: string
  onMouseEnter?: () => void
  style?: CSSProperties
  children?: ReactNode
}

const GLYPHS = '!<>{}[]/\\=+*#%01xz'

/*
  Momentary corruption on hover — text briefly glitches into threat-colored glyphs
  then restores. Used in the problem section to make risk feel unstable. Reduced
  motion: no glitch.
*/
export function GlitchText({
  text,
  className,
  as: Tag = 'span',
}: {
  text: string
  className?: string
  as?: ElementType
}) {
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(text)
  const [glitching, setGlitching] = useState(false)
  const raf = useRef(0)

  const run = () => {
    if (reduce) return
    cancelAnimationFrame(raf.current)
    setGlitching(true)
    const DURATION = 420
    let start = 0
    const tick = (t: number) => {
      if (!start) start = t
      const p = (t - start) / DURATION
      if (p >= 1) {
        setDisplay(text)
        setGlitching(false)
        return
      }
      // intensity peaks mid-hover then settles
      const intensity = Math.sin(p * Math.PI) * 0.5
      let out = ''
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        out += ch !== ' ' && Math.random() < intensity ? GLYPHS[(Math.random() * GLYPHS.length) | 0] : ch
      }
      setDisplay(out)
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }

  const Comp = Tag as ComponentType<TagProps>
  return (
    <Comp
      className={className}
      onMouseEnter={run}
      style={glitching ? { color: 'var(--threat)' } : undefined}
    >
      {display}
    </Comp>
  )
}
