import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { Logo } from '../Logo'
import { ThemeToggle } from '../ThemeToggle'
import { NAV_LINKS, CONTACT_ID } from '../../lib/nav'
import { scrollToId, scrollToTop } from '../../lib/scroll'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // lock body scroll while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'var(--glass)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(150%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(150%)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--hairline)' : 'transparent'}`,
      }}
    >
      <nav
        className="shell flex items-center justify-between transition-all duration-300"
        style={{ height: scrolled ? 60 : 78 }}
        aria-label="Primary"
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            scrollToTop()
          }}
          className="flex items-center"
          aria-label="VENZIQ home"
        >
          <Logo height={scrolled ? 24 : 27} />
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="text-[0.9rem] text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </button>
          ))}
          <span
            aria-disabled="true"
            title="Investors — coming soon"
            className="cursor-not-allowed select-none text-[0.9rem] text-faint/70"
          >
            Investors
          </span>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden sm:inline-flex" />
          <button
            onClick={() => go(CONTACT_ID)}
            className="hidden rounded-full px-4 py-2 text-[0.85rem] font-medium sm:inline-flex"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            Request access
          </button>
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="glass-strong fixed inset-x-3 top-[68px] z-40 origin-top rounded-2xl p-5 lg:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="rounded-lg px-3 py-3 text-left text-base text-ink hover:bg-raised"
                >
                  {l.label}
                </button>
              ))}
              <div className="mt-2 flex items-center justify-between border-t border-hairline pt-4">
                <ThemeToggle />
                <button
                  onClick={() => go(CONTACT_ID)}
                  className="rounded-full px-4 py-2 text-sm font-medium"
                  style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
                >
                  Request access
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
