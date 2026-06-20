import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Menu, X, Command, ArrowUpRight } from 'lucide-react'
import { Logo } from '../Logo'
import { ThemeToggle } from '../ThemeToggle'
import { ShieldToggle } from '../Shield'
import { openCommandPalette } from '../../lib/command'
import { NAV_LINKS, LANDING_LINKS, openContact } from '../../lib/nav'
import { scrollToId, scrollToTop } from '../../lib/scroll'
import { useActiveSection } from '../../lib/useActiveSection'
import { useTrust } from '../../lib/trust-context'
import { navigate, useRoute } from '../../lib/router'

function SessionDot() {
  const { verified, total } = useTrust()
  const complete = verified.length >= total
  return (
    <span
      className="hidden items-center gap-1.5 font-mono text-[0.62rem] text-faint lg:inline-flex"
      title={`Session integrity ${verified.length}/${total}`}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{
          background: complete ? 'var(--accent)' : 'var(--accent-2)',
          animation: complete ? 'none' : 'vzqpulse 1.6s ease-in-out infinite',
        }}
      />
      {verified.length}/{total}
    </span>
  )
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const active = useActiveSection()
  const route = useRoute()
  const isPlatform = route.startsWith('/platform')
  const links = isPlatform ? NAV_LINKS : LANDING_LINKS

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
  const goHome = () => {
    setOpen(false)
    if (isPlatform) navigate('/')
    else scrollToTop()
  }
  const goPlatform = () => {
    setOpen(false)
    navigate('/platform')
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
          href={isPlatform ? '/' : '#top'}
          onClick={(e) => {
            e.preventDefault()
            goHome()
          }}
          className="flex items-center"
          aria-label="VENZIQ home"
        >
          <Logo height={scrolled ? 24 : 27} />
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => {
            const isActive = isPlatform && active === l.id
            return (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                aria-current={isActive ? 'true' : undefined}
                className="relative text-[0.9rem] transition-colors hover:text-ink"
                style={{ color: isActive ? 'var(--ink)' : 'var(--muted)' }}
              >
                {l.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1.5 left-0 right-0 mx-auto h-1 w-1 rounded-full"
                    style={{ background: 'var(--accent)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
          {isPlatform ? (
            <span
              aria-disabled="true"
              title="Investors (coming soon)"
              className="cursor-not-allowed select-none text-[0.9rem] text-faint/70"
            >
              Investors
            </span>
          ) : (
            <button
              onClick={goPlatform}
              className="inline-flex items-center gap-1 text-[0.9rem] text-muted transition-colors hover:text-ink"
            >
              Platform
              <ArrowUpRight size={14} aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isPlatform && <SessionDot />}
          {isPlatform && <ShieldToggle className="hidden lg:inline-flex" />}
          <button
            onClick={() => openCommandPalette()}
            aria-label="Open command palette"
            className="hidden h-8 items-center gap-1.5 rounded-full border border-hairline px-3 font-mono text-[0.7rem] text-muted transition-colors hover:text-ink lg:inline-flex"
          >
            <Command size={12} aria-hidden="true" />K
          </button>
          <ThemeToggle className="hidden sm:inline-flex" />
          <button
            onClick={openContact}
            className="hidden rounded-full px-4 py-2 text-[0.85rem] font-medium sm:inline-flex"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            Let&apos;s connect
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
          <>
            <motion.div
              className="fixed inset-0 z-30 lg:hidden"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed inset-x-3 top-[68px] z-40 origin-top overflow-hidden rounded-2xl border border-hairline p-5 lg:hidden"
              style={{ background: 'var(--raised)', boxShadow: 'var(--glass-shadow)' }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-1">
                {links.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => go(l.id)}
                    className="rounded-lg px-3 py-3 text-left text-base text-ink hover:bg-raised"
                  >
                    {l.label}
                  </button>
                ))}
                <button
                  onClick={isPlatform ? goHome : goPlatform}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-3 text-left text-base text-ink hover:bg-raised"
                >
                  {isPlatform ? 'Home' : 'Platform'}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </button>
                <div className="mt-2 flex items-center justify-between border-t border-hairline pt-4">
                  <ThemeToggle />
                  <button
                    onClick={() => {
                      setOpen(false)
                      openContact()
                    }}
                    className="rounded-full px-4 py-2 text-sm font-medium"
                    style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
                  >
                    Let&apos;s connect
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
