import { motion, useReducedMotion } from 'motion/react'
import { LogoMark } from '../components/Logo'
import { AsciiField } from '../components/canvas/AsciiField'
import { MagneticButton } from '../components/MagneticButton'
import { TrustPrinciples } from '../components/TrustPrinciples'
import { scrollToId } from '../lib/scroll'
import { CONTACT_ID } from '../lib/nav'

export function Hero() {
  const reduce = useReducedMotion()

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
      className="relative flex min-h-[94vh] items-center overflow-hidden pt-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <AsciiField className="absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(125% 95% at 78% 38%, transparent 0%, var(--bg) 76%)',
          }}
        />
      </div>
      <div
        aria-hidden="true"
        className="accent-glow pointer-events-none absolute right-[6%] top-1/3 h-[40rem] w-[40rem] -translate-y-1/2 rounded-full blur-2xl"
      />

      <div className="shell relative w-full">
        <motion.p className="mono-eyebrow mb-6" {...rise(0)}>
          AI-Native Trust Infrastructure
        </motion.p>

        <motion.h1
          className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl"
          {...rise(0.08)}
        >
          Trust Infrastructure for the AI Economy
        </motion.h1>

        <motion.p
          className="mt-7 max-w-2xl text-lg text-muted md:text-xl"
          {...rise(0.18)}
        >
          The future of AI is not just about intelligence. It is about{' '}
          <span className="text-ink">trusted intelligence.</span>
        </motion.p>

        <motion.div className="mt-10 flex items-center gap-5" {...rise(0.28)}>
          <MagneticButton onClick={() => scrollToId(CONTACT_ID)}>
            Request access
          </MagneticButton>
          <LogoMark size={48} tone="gradient" animate />
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
