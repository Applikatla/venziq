import { LogoMark } from '../components/Logo'

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[88vh] items-center overflow-hidden pt-28"
    >
      <div className="shell">
        <p className="mono-eyebrow mb-6">AI-Native Trust Infrastructure</p>
        <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
          Trust Infrastructure for the AI Economy
        </h1>
        <p className="mt-7 max-w-2xl text-lg text-muted md:text-xl">
          The future of AI is not just about intelligence. It is about{' '}
          <span className="text-ink">trusted intelligence.</span>
        </p>
        <div className="mt-10 flex items-center gap-5">
          <button
            className="rounded-full px-6 py-3 text-sm font-medium"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            Request access
          </button>
          <LogoMark size={44} tone="gradient" idle />
        </div>
      </div>
    </section>
  )
}
