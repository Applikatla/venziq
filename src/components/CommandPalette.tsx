import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Search, ArrowRight, CornerDownLeft } from 'lucide-react'
import { useTheme } from '../lib/theme-context'
import { NAV_LINKS, openContact } from '../lib/nav'
import { toggleProtection } from '../lib/protection'
import { navigate } from '../lib/router'
import { COMMAND_OPEN_EVENT, openHelp } from '../lib/command'

interface Cmd {
  id: string
  label: string
  hint?: string
  run: () => void
}

export function CommandPalette() {
  const reduce = useReducedMotion()
  const { toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const commands = useMemo<Cmd[]>(() => {
    const nav: Cmd[] = NAV_LINKS.map((l) => ({
      id: `go-${l.id}`,
      label: `Go to ${l.label}`,
      hint: 'section',
      run: () => navigate(`/platform#${l.id}`),
    }))
    return [
      {
        id: 'run-verify',
        label: 'Run a verification',
        hint: 'playground',
        run: () => {
          navigate('/platform#playground')
          window.setTimeout(() => {
            const btn = [...document.querySelectorAll('#playground button')].find((b) =>
              /Run verification/.test(b.textContent ?? ''),
            ) as HTMLButtonElement | undefined
            btn?.click()
          }, 900)
        },
      },
      { id: 'go-playground', label: 'Go to playground', hint: 'section', run: () => navigate('/platform#playground') },
      ...nav,
      { id: 'contact', label: "Let's connect", hint: 'email', run: openContact },
      { id: 'protection', label: 'Toggle protection (threat ⇄ trust)', hint: 'demo', run: toggleProtection },
      { id: 'help', label: 'Show interactive features', hint: '?', run: openHelp },
      { id: 'toggle-theme', label: 'Toggle light / dark theme', hint: 'theme', run: toggle },
    ]
  }, [toggle])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => c.label.toLowerCase().includes(q))
  }, [commands, query])

  // global open shortcut + esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      const typing = tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement)?.isContentEditable
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (e.key === '/' && !typing && !open) {
        e.preventDefault()
        setOpen(true)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener(COMMAND_OPEN_EVENT, onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(COMMAND_OPEN_EVENT, onOpen)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const id = window.setTimeout(() => {
      setQuery('')
      setActive(0)
      inputRef.current?.focus()
    }, 30)
    document.body.style.overflow = 'hidden'
    return () => {
      window.clearTimeout(id)
      document.body.style.overflow = ''
    }
  }, [open])

  // clamp at render rather than via a state-setting effect
  const activeIdx = filtered.length ? Math.min(active, filtered.length - 1) : 0

  const exec = (c: Cmd | undefined) => {
    if (!c) return
    setOpen(false)
    c.run()
  }

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      exec(filtered[activeIdx])
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[18vh]"
          style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            className="glass-strong w-full max-w-lg overflow-hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onListKey}
          >
            <div className="flex items-center gap-3 border-b border-hairline px-4 py-3">
              <Search size={16} className="text-faint" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Verify console — jump, run, toggle…"
                className="flex-1 bg-transparent font-mono text-sm text-ink outline-none placeholder:text-faint"
                aria-label="Command search"
              />
              <span className="mono-eyebrow hidden text-[0.6rem] sm:inline">esc</span>
            </div>
            <ul className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-3 text-sm text-faint">No commands</li>
              )}
              {filtered.map((c, i) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => exec(c)}
                    className="flex w-full items-center gap-3 rounded-[var(--radius)] px-3 py-2.5 text-left"
                    style={{ background: i === activeIdx ? 'var(--raised)' : 'transparent' }}
                  >
                    <ArrowRight
                      size={14}
                      style={{ color: i === activeIdx ? 'var(--accent)' : 'var(--faint)' }}
                      aria-hidden="true"
                    />
                    <span className="flex-1 text-sm text-ink">{c.label}</span>
                    {c.hint && (
                      <span className="mono-eyebrow text-[0.58rem]">{c.hint}</span>
                    )}
                    {i === activeIdx && (
                      <CornerDownLeft size={13} className="text-faint" aria-hidden="true" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
