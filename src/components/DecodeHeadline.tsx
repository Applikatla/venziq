import { useEffect, useRef, useState, type ElementType } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

const SCRAMBLE = 'ABCDEF0123456789{}<>/=+*·xz'

/*
  Section headline that resolves from scrambled monospace glyphs into the final
  text on first reveal. Decoding == revealing verified truth. The accessible name
  is always the final text (aria-label); the scrambling glyphs are aria-hidden.
  Reduced motion: text appears normally.
*/
export function DecodeHeadline({
  text,
  as: Tag = 'h2',
  className,
}: {
  text: string
  as?: ElementType
  className?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (reduce || !inView) return
    let frame = 0
    const total = text.length
    const id = setInterval(() => {
      frame += 1
      const revealed = Math.floor(frame / 1.6)
      let out = ''
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        if (ch === ' ' || ch === '\n') out += ch
        else if (i < revealed) out += ch
        else out += SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0]
      }
      setDisplay(out)
      if (revealed >= total) clearInterval(id)
    }, 28)
    return () => clearInterval(id)
  }, [inView, reduce, text])

  return (
    <Tag className={className} aria-label={text}>
      <span ref={ref} aria-hidden="true">
        {display}
      </span>
    </Tag>
  )
}
