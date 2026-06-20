import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { HELP_OPEN_EVENT } from '../lib/command'

/*
  Press "?" to reveal the site's interactive features - most are hidden by design
  (command palette, the verify easter egg, the shield switch, tamper, the flip
  cards). This is the discoverability layer.
*/
interface Item {
  keys: string
  label: string
}
const ITEMS: Item[] = [
  { keys: '⌘K', label: 'Command palette: jump, run a verification, toggle theme' },
  { keys: 'type "verify"', label: 'Run a page-wide re-verification sweep' },
  { keys: 'shield', label: 'Nav toggle: flip the site into the unprotected world' },
  { keys: 'tamper', label: 'In the playground: forge a proof and watch the chain reject it' },
  { keys: 'hover', label: 'Headings and cards get scanned by the cursor reticle' },
  { keys: 'tap', label: 'Flip a use-case card to reveal its sealed audit trail' },
  { keys: '?', label: 'This menu' },
]

export function HelpOverlay() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)
      if (e.key === '?' && !typing) {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener(HELP_OPEN_EVENT, onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(HELP_OPEN_EVENT, onOpen)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Interactive features"
        >
          <motion.div
            className="glass-strong w-full max-w-md p-6"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="mono-eyebrow">Interactive features</p>
              <span className="mono-eyebrow text-[0.6rem]">esc</span>
            </div>
            <ul className="space-y-3">
              {ITEMS.map((it) => (
                <li key={it.keys} className="flex items-start gap-3">
                  <span
                    className="shrink-0 rounded-md border border-hairline px-2 py-1 font-mono text-[0.66rem]"
                    style={{ color: 'var(--accent)', minWidth: 84, textAlign: 'center' }}
                  >
                    {it.keys}
                  </span>
                  <span className="pt-1 text-sm leading-snug text-muted">{it.label}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
