import { useAnimatedCanvas, type Renderer, type CanvasFrame } from './useAnimatedCanvas'
import { useThemeColors, withAlpha } from '../../lib/themeColors'

/*
  Ambient node-and-edge lattice - the connective-tissue motif. Low density, low
  opacity, cursor-reactive. Background, never the star. Paused off-screen,
  reduced motion renders a single static frame.
*/

interface Node {
  x: number
  y: number
  vx: number
  vy: number
}

const CONNECT = 150
const CONNECT2 = CONNECT * CONNECT
const POINTER_R = 200
const POINTER_R2 = POINTER_R * POINTER_R

export function NodeLattice({
  className,
  density = 26000,
}: {
  className?: string
  density?: number
}) {
  const colors = useThemeColors()

  const ref = useAnimatedCanvas(
    (): Renderer => {
      let nodes: Node[] = []
      let lastW = -1
      let lastH = -1
      let prevTime = 0

      const ensure = (w: number, h: number) => {
        if (w === lastW && h === lastH) return
        lastW = w
        lastH = h
        const count = Math.max(8, Math.min(46, Math.round((w * h) / density)))
        nodes = Array.from({ length: count }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 14,
          vy: (Math.random() - 0.5) * 14,
        }))
      }

      const render = (f: CanvasFrame, animate: boolean) => {
        const { ctx, width, height, time, pointer } = f
        ensure(width, height)
        ctx.clearRect(0, 0, width, height)

        if (animate) {
          const dt = Math.min(0.05, time - prevTime)
          prevTime = time
          for (const n of nodes) {
            n.x += n.vx * dt
            n.y += n.vy * dt
            if (n.x < 0 || n.x > width) n.vx *= -1
            if (n.y < 0 || n.y > height) n.vy *= -1
            n.x = Math.max(0, Math.min(width, n.x))
            n.y = Math.max(0, Math.min(height, n.y))
          }
        }

        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i]
            const b = nodes[j]
            const dx = a.x - b.x
            const dy = a.y - b.y
            const d2 = dx * dx + dy * dy
            if (d2 < CONNECT2) {
              ctx.strokeStyle = withAlpha(colors.accent2, (1 - d2 / CONNECT2) * 0.16)
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.stroke()
            }
          }
        }

        const px = pointer?.x ?? -9999
        const py = pointer?.y ?? -9999
        for (const n of nodes) {
          let alpha = 0.4
          let color = colors.accent2
          if (pointer) {
            const dx = n.x - px
            const dy = n.y - py
            const d2 = dx * dx + dy * dy
            if (d2 < POINTER_R2) {
              const t = 1 - d2 / POINTER_R2
              alpha = 0.4 + t * 0.55
              color = colors.accent
              ctx.strokeStyle = withAlpha(colors.accent, t * 0.22)
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(n.x, n.y)
              ctx.lineTo(px, py)
              ctx.stroke()
            }
          }
          ctx.fillStyle = withAlpha(color, alpha)
          ctx.beginPath()
          ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      return {
        frame: (f) => render(f, true),
        drawStatic: (f) => render(f, false),
      }
    },
    { fps: 30, deps: [colors, density] },
  )

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  )
}
