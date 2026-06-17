import { useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react'
import { useAnimatedCanvas, type Renderer, type CanvasFrame } from './useAnimatedCanvas'
import { useThemeColors, withAlpha } from '../../lib/themeColors'

/*
  One-time scroll-driven moment between the problem and the platform: a noisy,
  glitching character field (threat-flecked) settles into a clean ordered lattice
  (accent). Vulnerability resolved into verified order. Reduced motion: the static
  resolved lattice.
*/

const GAP = 48
const GLYPHS = '01x{}/<>'.split('')

interface P {
  cx: number
  cy: number
  lx: number
  ly: number
  glyph: string
  phase: number
  /** current render coords for this frame */
  rx: number
  ry: number
}

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

export function ChaosToOrder() {
  const colors = useThemeColors()
  const reduce = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useRef(0)

  const [verified, setVerified] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    progress.current = v
    setVerified(v >= 0.46)
  })

  const canvasRef = useAnimatedCanvas(
    (): Renderer => {
      let nodes: P[] = []
      let cols = 0
      let rows = 0
      let lastW = -1
      let lastH = -1

      const ensure = (w: number, h: number) => {
        if (w === lastW && h === lastH) return
        lastW = w
        lastH = h
        cols = Math.max(2, Math.floor(w / GAP))
        rows = Math.max(2, Math.floor(h / GAP))
        const offX = (w - (cols - 1) * GAP) / 2
        const offY = (h - (rows - 1) * GAP) / 2
        nodes = []
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            nodes.push({
              cx: Math.random() * w,
              cy: Math.random() * h,
              lx: offX + c * GAP,
              ly: offY + r * GAP,
              glyph: GLYPHS[(Math.random() * GLYPHS.length) | 0],
              phase: Math.random() * Math.PI * 2,
              rx: 0,
              ry: 0,
            })
          }
        }
      }

      const render = (f: CanvasFrame, forceOrder: boolean) => {
        const { ctx, width, height, time } = f
        ensure(width, height)
        ctx.clearRect(0, 0, width, height)

        const raw = forceOrder
          ? 1
          : Math.min(1, Math.max(0, (progress.current - 0.12) / 0.5))
        const e = easeInOut(raw)

        ctx.font = '12px JetBrains Mono, ui-monospace, monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        // positions
        for (const n of nodes) {
          const jitter = (1 - e) * 7
          const jx = forceOrder ? 0 : Math.sin(time * 3 + n.phase) * jitter
          const jy = forceOrder ? 0 : Math.cos(time * 2.4 + n.phase) * jitter
          n.rx = n.lx * e + n.cx * (1 - e) + jx
          n.ry = n.ly * e + n.cy * (1 - e) + jy
        }

        // edges form as order resolves
        if (e > 0.35) {
          ctx.strokeStyle = withAlpha(colors.accent, ((e - 0.35) / 0.65) * 0.18)
          ctx.lineWidth = 1
          ctx.beginPath()
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              const n = nodes[r * cols + c]
              if (c < cols - 1) {
                const right = nodes[r * cols + c + 1]
                ctx.moveTo(n.rx, n.ry)
                ctx.lineTo(right.rx, right.ry)
              }
              if (r < rows - 1) {
                const down = nodes[(r + 1) * cols + c]
                ctx.moveTo(n.rx, n.ry)
                ctx.lineTo(down.rx, down.ry)
              }
            }
          }
          ctx.stroke()
        }

        // glyphs (chaos / threat) crossfade into dots (order / accent)
        for (const n of nodes) {
          if (e < 0.98) {
            ctx.fillStyle = withAlpha(colors.threat, (1 - e) * 0.5)
            ctx.fillText(n.glyph, n.rx, n.ry)
          }
          if (e > 0.2) {
            ctx.fillStyle = withAlpha(colors.accent, (e - 0.2) / 0.8)
            ctx.beginPath()
            ctx.arc(n.rx, n.ry, 1.7, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      return {
        frame: (f) => render(f, false),
        drawStatic: (f) => render(f, true),
      }
    },
    { fps: 30, pointer: false, deps: [colors] },
  )

  return (
    <div
      ref={containerRef}
      className={reduce ? 'relative h-[60vh] overflow-hidden' : 'relative h-[160vh]'}
      aria-hidden="true"
    >
      <div
        className={
          reduce
            ? 'absolute inset-0'
            : 'sticky top-0 flex h-screen items-center overflow-hidden'
        }
      >
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {reduce ? (
            <span className="mono-eyebrow" style={{ color: 'var(--accent)' }}>
              verified order
            </span>
          ) : (
            <AnimatePresence mode="wait">
              <motion.span
                key={verified ? 'v' : 'u'}
                className="whitespace-nowrap font-mono text-sm uppercase tracking-[0.25em]"
                style={{ color: verified ? 'var(--accent)' : 'var(--threat)' }}
                initial={{ opacity: 0, filter: 'blur(6px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(6px)' }}
                transition={{ duration: 0.3 }}
              >
                {verified ? 'verified order ✓' : 'unverified'}
              </motion.span>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  )
}
