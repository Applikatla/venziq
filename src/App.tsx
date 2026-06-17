import { useState } from 'react'
import { Logo, LogoMark } from './components/Logo'

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  return (
    <div
      data-theme={theme}
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--ink)',
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
      }}
    >
      <button
        onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        style={{
          alignSelf: 'flex-start',
          fontFamily: 'var(--font-mono)',
          padding: '0.5rem 1rem',
          border: '1px solid var(--hairline)',
          borderRadius: 8,
          color: 'var(--ink)',
          background: 'var(--glass)',
        }}
      >
        toggle theme ({theme})
      </button>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p className="mono-eyebrow">Lockup — static</p>
        <Logo height={48} />
        <p className="mono-eyebrow">Lockup — animated (reload to replay)</p>
        <Logo height={48} animate />
      </section>

      <section style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p className="mono-eyebrow">Mark · accent</p>
          <LogoMark size={96} tone="accent" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p className="mono-eyebrow">Mark · gradient · idle</p>
          <LogoMark size={96} tone="gradient" idle />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p className="mono-eyebrow">Mark · animated</p>
          <LogoMark size={96} tone="accent" animate />
        </div>
      </section>

      <section style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <p className="mono-eyebrow">Favicon</p>
        <img src="/favicon.svg" width={16} height={16} alt="16px" />
        <img src="/favicon.svg" width={32} height={32} alt="32px" />
        <img src="/favicon.svg" width={64} height={64} alt="64px" />
      </section>
    </div>
  )
}
