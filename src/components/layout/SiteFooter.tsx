import { LogoMark } from '../Logo'
import { NAV_LINKS, CONTACT_URL } from '../../lib/nav'
import { scrollToId } from '../../lib/scroll'

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline" id={'contact'}>
      <div className="shell py-16">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <LogoMark size={26} tone="accent" />
              <span
                className="text-lg font-semibold tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                VENZIQ
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Trust infrastructure for the AI economy. Built for the autonomous
              economy, not for human users.
            </p>
            <a
              href={CONTACT_URL}
              className="mono-eyebrow mt-5 inline-block text-accent"
              style={{ color: 'var(--accent)' }}
            >
              venziq.com
            </a>
          </div>

          <nav className="flex gap-16" aria-label="Footer">
            <div>
              <p className="mono-eyebrow mb-4">Navigate</p>
              <ul className="space-y-3">
                {NAV_LINKS.map((l) => (
                  <li key={l.id}>
                    <button
                      onClick={() => scrollToId(l.id)}
                      className="text-sm text-muted transition-colors hover:text-ink"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mono-eyebrow mb-4">Company</p>
              <ul className="space-y-3 text-sm text-muted">
                <li>
                  <a href={CONTACT_URL} className="transition-colors hover:text-ink">
                    Contact
                  </a>
                </li>
                <li>
                  <span
                    aria-disabled="true"
                    title="Coming soon"
                    className="cursor-not-allowed text-faint/70"
                  >
                    Investors
                  </span>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-hairline pt-6 sm:flex-row sm:items-center">
          <p className="mono-eyebrow" style={{ letterSpacing: '0.16em' }}>
            © 2026 VENZIQ
          </p>
          <p className="mono-eyebrow" style={{ letterSpacing: '0.16em' }}>
            The future of verification is VENZIQ
          </p>
        </div>
      </div>
    </footer>
  )
}
