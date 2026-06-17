import { useAnimatedCanvas, type Renderer } from './useAnimatedCanvas'
import { useThemeColors, withAlpha } from '../../lib/themeColors'

/*
  Hero verification field. A drifting grid of faint monospace glyphs. Near the
  cursor glyphs brighten toward the accent; periodically a small cluster resolves
  into a check before dissolving. Cheap per frame, ~30fps, DPR-capped, paused
  off-screen. Reduced motion: a single static dim grid.
*/

const GLYPHS = '01{}<>/\\xf9a+=:;·01'.split('')
const CELL = 22
const CURSOR_R = 130

interface ResolveEvent {
  x: number
  y: number
  born: number
  life: number
}

export function AsciiField({ className }: { className?: string }) {
  const colors = useThemeColors()

  const ref = useAnimatedCanvas(
    (): Renderer => {
      // per-instance mutable state, created inside the effect
      let cols = 0
      let rows = 0
      let glyphIndex = new Uint8Array(0)
      let lastW = -1
      let lastH = -1
      const events: ResolveEvent[] = []
      let nextEvent = 0.8

      const ensureGrid = (w: number, h: number) => {
        if (w === lastW && h === lastH) return
        lastW = w
        lastH = h
        cols = Math.ceil(w / CELL) + 1
        rows = Math.ceil(h / CELL) + 1
        glyphIndex = new Uint8Array(cols * rows)
        for (let i = 0; i < glyphIndex.length; i++) {
          glyphIndex[i] = (Math.random() * GLYPHS.length) | 0
        }
      }

      return {
        frame: ({ ctx, width, height, time, pointer }) => {
          ensureGrid(width, height)
          ctx.clearRect(0, 0, width, height)
          ctx.font = '13px JetBrains Mono, ui-monospace, monospace'
          ctx.textBaseline = 'middle'

          const ox = ((time * 6) % CELL) - CELL
          const oy = ((time * 4) % CELL) - CELL

          for (let k = 0; k < 14; k++) {
            glyphIndex[(Math.random() * glyphIndex.length) | 0] =
              (Math.random() * GLYPHS.length) | 0
          }

          if (time > nextEvent) {
            nextEvent = time + 1.2 + Math.random() * 1.6
            events.push({ x: Math.random() * width, y: Math.random() * height, born: time, life: 1.6 })
            if (events.length > 4) events.shift()
          }

          const px = pointer?.x ?? -9999
          const py = pointer?.y ?? -9999
          const r2 = CURSOR_R * CURSOR_R

          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              const x = c * CELL + ox
              const y = r * CELL + oy
              let alpha = 0.14
              let color = colors.faint
              let glyph = GLYPHS[glyphIndex[r * cols + c]]

              if (pointer) {
                const dx = x - px
                const dy = y - py
                const d2 = dx * dx + dy * dy
                if (d2 < r2) {
                  alpha = 0.14 + (1 - d2 / r2) * 0.7
                  color = colors.accent
                }
              }

              for (let e = 0; e < events.length; e++) {
                const ev = events[e]
                const age = time - ev.born
                if (age > ev.life) continue
                const dx = x - ev.x
                const dy = y - ev.y
                if (dx * dx + dy * dy < 26 * 26) {
                  const ramp =
                    age < 0.4 ? age / 0.4 : 1 - (age - 0.4) / (ev.life - 0.4)
                  if (ramp > 0.05) {
                    alpha = Math.max(alpha, ramp * 0.95)
                    color = colors.accent
                    glyph = '✓'
                  }
                }
              }

              ctx.fillStyle = withAlpha(color, alpha)
              ctx.fillText(glyph, x, y)
            }
          }
        },
        drawStatic: ({ ctx, width, height }) => {
          ctx.clearRect(0, 0, width, height)
          ctx.font = '13px JetBrains Mono, ui-monospace, monospace'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = withAlpha(colors.faint, 0.16)
          const c2 = Math.ceil(width / CELL) + 1
          const r2 = Math.ceil(height / CELL) + 1
          for (let r = 0; r < r2; r++) {
            for (let c = 0; c < c2; c++) {
              ctx.fillText(GLYPHS[(r * 7 + c * 3) % GLYPHS.length], c * CELL, r * CELL)
            }
          }
        },
      }
    },
    { fps: 30, deps: [colors] },
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
