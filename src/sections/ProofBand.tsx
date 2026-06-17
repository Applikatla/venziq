import { ProofFeed } from '../components/ProofFeed'

export function ProofBand() {
  return (
    <div className="border-y border-hairline bg-panel">
      <div className="shell flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-8">
        <div className="flex shrink-0 items-center gap-2.5">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: 'var(--accent)' }}
          />
          <span className="mono-eyebrow" style={{ letterSpacing: '0.2em' }}>
            Proof feed
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <ProofFeed />
        </div>
      </div>
    </div>
  )
}
