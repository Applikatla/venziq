import { motion, useReducedMotion } from 'motion/react'
import { useTheme } from '../lib/theme-context'
import { LogoMark } from './Logo'

/*
  Theme toggle as a small instrument: a two-stop track whose sliding knob IS the
  VENZIQ Q mark. The Q re-draws itself each time you flip themes and glides
  between the dark/light stops - on brand, not a generic sun/moon. The two stops
  sit faded behind the knob so the switch still reads as a two-position control.
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
      {/* faded stops behind the knob */}
      <span className="flex h-6 w-7 items-center justify-center opacity-40">
        <DotIcon active={isDark} />
      </span>
      <span className="flex h-6 w-7 items-center justify-center opacity-40">
        <RingIcon active={!isDark} />
      </span>

      {/* sliding Q knob - re-keyed on theme so the mark re-draws on every toggle */}
      <motion.span
        aria-hidden="true"
        className="absolute top-1 z-10 grid h-6 w-7 place-items-center rounded-full"
        style={{
          background: 'var(--accent-soft)',
          border: '1px solid var(--accent)',
          boxShadow: '0 0 10px var(--accent-soft)',
          overflow: 'visible',
        }}
        animate={{ left: isDark ? 4 : 36 }}
        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 34 }}
      >
        <LogoMark key={theme} decorative animate size={15} tone="accent" />
      </motion.span>
    </button>
  )
}

function DotIcon({ active }: { active: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <circle cx="7" cy="7" r="4" fill={active ? 'var(--accent)' : 'var(--faint)'} />
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
