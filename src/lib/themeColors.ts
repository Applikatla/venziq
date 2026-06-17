import { useMemo } from 'react'
import { useTheme } from './theme-context'

export interface ThemeColors {
  bg: string
  ink: string
  muted: string
  faint: string
  accent: string
  accent2: string
  threat: string
  isLight: boolean
}

function read(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

/** Read resolved palette hex values for the active theme (for canvas drawing). */
export function useThemeColors(): ThemeColors {
  const { theme } = useTheme()
  return useMemo<ThemeColors>(
    () => ({
      bg: read('--bg') || '#0a0d12',
      ink: read('--ink') || '#ecede8',
      muted: read('--muted') || '#9aa0ac',
      faint: read('--faint') || '#8c94a2',
      accent: read('--accent') || '#b6f25f',
      accent2: read('--accent-2') || '#a78bfa',
      threat: read('--threat') || '#ff5e3a',
      isLight: theme === 'light',
    }),
    // re-read whenever the theme flips
    [theme],
  )
}

/** "#rrggbb" + alpha 0..1 -> "rgba(...)". Falls back to the input on parse fail. */
export function withAlpha(hex: string, alpha: number): string {
  const m = hex.replace('#', '')
  if (m.length !== 6) return hex
  const r = parseInt(m.slice(0, 2), 16)
  const g = parseInt(m.slice(2, 4), 16)
  const b = parseInt(m.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
