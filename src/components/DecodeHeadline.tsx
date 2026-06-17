import {
  useEffect,
  useState,
  type ComponentType,
  type ElementType,
  type ReactNode,
} from 'react'

type TagProps = {
  className?: string
  'aria-label'?: string
  'data-scan'?: string
  children?: ReactNode
}
import { useReducedMotion } from 'motion/react'
import { useReveal } from '../lib/useReveal'

const SCRAMBLE = 'ABCDEF0123456789{}<>/=+*·xz'

/*
  Section headline that resolves from scrambled monospace glyphs into the final
  text on first reveal. Decoding == revealing verified truth. The accessible name
  is always the final text (aria-label); the scrambling glyphs are aria-hidden.
  Reduced motion: text appears normally. Trigger uses the robust useReveal hook.
*/
export function DecodeHeadline({
  text,
  as: Tag = 'h2',
  className,
  trigger = 'view',
}: {
  text: string
  as?: ElementType
  className?: string
  /** 'view' decodes on scroll-in; 'mount' decodes immediately on load */
  trigger?: 'view' | 'mount'
}) {
  const reduce = useReducedMotion()
  const { ref, shown } = useReveal<HTMLSpanElement>()
  const [display, setDisplay] = useState(text)
  const active = trigger === 'mount' || shown

  useEffect(() => {
    if (reduce || !active) return
    // time-based (not frame-count) so throttled frames still reflect true
    // progress and the decode always completes by wall clock
    const DURATION = 22 * text.length + 350
    let raf = 0
    let start = 0
    const tick = (t: number) => {
      if (!start) start = t
      const p = Math.min(1, (t - start) / DURATION)
      const revealed = Math.floor(p * text.length)
      let out = ''
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        if (ch === ' ' || ch === '\n') out += ch
        else if (i < revealed) out += ch
        else out += SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0]
      }
      setDisplay(out)
      if (p < 1) raf = requestAnimationFrame(tick)
      else setDisplay(text)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, reduce, text])

  const Comp = Tag as ComponentType<TagProps>
  return (
    <Comp className={className} aria-label={text} data-scan="">
      <span ref={ref} aria-hidden="true">
        {display}
      </span>
    </Comp>
  )
}
