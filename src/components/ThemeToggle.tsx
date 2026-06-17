import { motion, useReducedMotion } from 'motion/react'
import { useTheme } from '../lib/theme-context'

/*
  Theme toggle as a small instrument: a two-stop track with a lit indicator that
  slides. Mono labels, accent indicator — on brand, not a generic sun/moon.
*/
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const reduce = useReducedMotion()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={!isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className={`group relative inline-flex h-8 items-center gap-1 rounded-full border border-hairline bg-glass px-1 ${className ?? ''}`}
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <span className="relative z-10 flex h-6 w-7 items-center justify-center">
        <DotIcon active={isDark} />
      </span>
      <span className="relative z-10 flex h-6 w-7 items-center justify-center">
        <RingIcon active={!isDark} />
      </span>
      <motion.span
        aria-hidden="true"
        className="absolute top-1 z-0 h-6 w-7 rounded-full"
        style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent)' }}
        animate={{ left: isDark ? 4 : 36 }}
        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 34 }}
      />
    </button>
  )
}

function DotIcon({ active }: { active: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <circle
        cx="7"
        cy="7"
        r="4"
        fill={active ? 'var(--accent)' : 'var(--faint)'}
      />
    </svg>
  )
}

function RingIcon({ active }: { active: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <circle
        cx="7"
        cy="7"
        r="4.5"
        fill="none"
        stroke={active ? 'var(--accent)' : 'var(--faint)'}
        strokeWidth="1.6"
      />
    </svg>
  )
}
