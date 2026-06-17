import { LogoMark } from '../components/Logo'
import { AsciiField } from '../components/canvas/AsciiField'
import { MagneticButton } from '../components/MagneticButton'
import { scrollToId } from '../lib/scroll'
import { CONTACT_ID } from '../lib/nav'

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] items-center overflow-hidden pt-28"
    >
      {/* verification field behind the headline */}
      <div className="pointer-events-none absolute inset-0">
        <AsciiField className="absolute inset-0" />
        {/* mask the field toward the headline side for legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 90% at 75% 40%, transparent 0%, var(--bg) 78%)',
          }}
        />
      </div>
      {/* soft accent glow behind the mark area */}
      <div
        aria-hidden="true"
        className="accent-glow pointer-events-none absolute right-[8%] top-1/3 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full blur-2xl"
      />

      <div className="shell relative">
        <p className="mono-eyebrow mb-6">AI-Native Trust Infrastructure</p>
        <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
          Trust Infrastructure for the AI Economy
        </h1>
        <p className="mt-7 max-w-2xl text-lg text-muted md:text-xl">
          The future of AI is not just about intelligence. It is about{' '}
          <span className="text-ink">trusted intelligence.</span>
        </p>
        <div className="mt-10 flex items-center gap-5">
          <MagneticButton onClick={() => scrollToId(CONTACT_ID)}>
            Request access
          </MagneticButton>
          <LogoMark size={44} tone="gradient" idle />
        </div>
      </div>
    </section>
  )
}
