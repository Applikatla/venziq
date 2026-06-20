import { useRef, type PointerEvent } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { LogoMark } from '../components/Logo'
import { DecodeHeadline } from '../components/DecodeHeadline'
import { HeroBackdrop } from '../components/canvas/HeroBackdrop'
import { MagneticButton } from '../components/MagneticButton'
import { TrustPrinciples } from '../components/TrustPrinciples'
import { openContact } from '../lib/nav'
import { RouteLink } from '../components/RouteLink'

export function Hero() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  // cursor-following glow
  const gx = useMotionValue(0.7)
  const gy = useMotionValue(0.34)
  const sgx = useSpring(gx, { stiffness: 60, damping: 20 })
  const sgy = useSpring(gy, { stiffness: 60, damping: 20 })
  const glowLeft = useTransform(sgx, (v) => `${v * 100}%`)
  const glowTop = useTransform(sgy, (v) => `${v * 100}%`)

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || !sectionRef.current) return
    const r = sectionRef.current.getBoundingClientRect()
    gx.set((e.clientX - r.left) / r.width)
    gy.set((e.clientY - r.top) / r.height)
  }

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={onMove}
      className="relative flex min-h-[94vh] items-center overflow-hidden pt-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <HeroBackdrop className="absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            // clear the field behind the headline, keep it alive on the right,
            // fade to bg at the far edges
            background:
              'radial-gradient(58% 64% at 30% 46%, var(--bg) 0%, transparent 72%), radial-gradient(125% 95% at 80% 36%, transparent 0%, var(--bg) 82%)',
          }}
        />
      </div>
      {/* cursor-tracking accent glow */}
      <motion.div
        aria-hidden="true"
        className="accent-glow pointer-events-none absolute h-[40rem] w-[40rem] rounded-full blur-2xl"
        style={{
          left: glowLeft,
          top: glowTop,
          x: '-50%',
          y: '-50%',
        }}
      />

      <div className="shell relative w-full">
        <motion.p className="mono-eyebrow mb-6" {...rise(0)}>
          Trust layer for enterprise AI agents
        </motion.p>

        <motion.div {...rise(0.08)}>
          <DecodeHeadline
            as="h1"
            trigger="mount"
            text="Make every AI action provable"
            className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl"
          />
        </motion.div>

        <motion.p
          className="mt-7 max-w-2xl text-lg text-muted md:text-xl"
          {...rise(0.18)}
        >
          VENZIQ is the trust layer for enterprise AI agents. Every action an agent takes is{' '}
          <span className="text-ink">
            secured, verified with zero-knowledge proofs, and sealed as an immutable audit trail
          </span>{' '}
          — so autonomous AI stays compliant and accountable.
        </motion.p>

        <motion.div className="mt-10 flex flex-wrap items-center gap-4" {...rise(0.28)}>
          <MagneticButton onClick={openContact}>Let&apos;s connect</MagneticButton>
          <RouteLink
            to="/platform"
            className="inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-accent"
          >
            See how it works
            <ArrowRight size={15} aria-hidden="true" />
          </RouteLink>
          <LogoMark size={42} tone="gradient" animate className="ml-1 hidden sm:block" />
        </motion.div>

        <motion.div
          className="mt-16 border-t border-hairline pt-8 md:mt-20"
          {...rise(0.4)}
        >
          <TrustPrinciples />
        </motion.div>
      </div>
    </section>
  )
}
