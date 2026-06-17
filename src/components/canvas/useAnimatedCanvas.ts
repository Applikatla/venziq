import { useEffect, useRef } from 'react'

export interface CanvasFrame {
  ctx: CanvasRenderingContext2D
  /** CSS pixels */
  width: number
  height: number
  dpr: number
  /** seconds since start */
  time: number
  /** pointer position in CSS px relative to the canvas, or null when absent */
  pointer: { x: number; y: number } | null
}

export type DrawFn = (f: CanvasFrame) => void

export interface Renderer {
  frame: DrawFn
  /** rendered once for reduced-motion */
  drawStatic?: DrawFn
}

interface Options {
  fps?: number
  /** disable pointer reactivity (e.g. coarse pointers) */
  pointer?: boolean
  /** values that, when changed, rebuild the renderer (e.g. theme colours) */
  deps?: unknown[]
}

const DPR_CAP = 2

/*
  One render loop behind every canvas effect.
  - `setup()` is called INSIDE the effect and returns the draw fns; any mutable
    per-instance state lives in its closure (created in effect scope, not render).
  - caps DPR at 2, resizes via ResizeObserver, throttles to `fps`
  - pauses with IntersectionObserver off-screen
  - honours prefers-reduced-motion (single static frame, no loop)
  - tracks pointer in CSS px relative to the canvas
*/
export function useAnimatedCanvas(setup: () => Renderer, opts: Options = {}) {
  const { fps = 30, pointer = true, deps = [] } = opts
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const { frame: drawFrame, drawStatic } = setup()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)

    let width = 0
    let height = 0
    const pointerPos = { x: -9999, y: -9999 }
    let hasPointer = false

    const makeFrame = (time: number): CanvasFrame => ({
      ctx,
      width,
      height,
      dpr,
      time,
      pointer: pointer && hasPointer ? pointerPos : null,
    })

    const renderStatic = () => (drawStatic ?? drawFrame)(makeFrame(0))

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (reduce) renderStatic()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    let clientX = 0
    let clientY = 0
    const onMove = (e: PointerEvent) => {
      clientX = e.clientX
      clientY = e.clientY
      hasPointer = true
    }
    const onLeave = () => {
      hasPointer = false
    }
    if (pointer && !reduce) {
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerleave', onLeave)
    }

    if (reduce) {
      renderStatic()
      return () => {
        ro.disconnect()
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerleave', onLeave)
      }
    }

    let visible = true
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    let raf = 0
    let start = 0
    let last = 0
    const interval = 1000 / fps

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible) {
        last = t
        return
      }
      if (t - last < interval) return
      last = t
      if (!start) start = t
      if (pointer) {
        const rect = canvas.getBoundingClientRect()
        pointerPos.x = clientX - rect.left
        pointerPos.y = clientY - rect.top
      }
      drawFrame(makeFrame((t - start) / 1000))
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
    // setup is intentionally re-run only when deps change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fps, pointer, ...deps])

  return ref
}
