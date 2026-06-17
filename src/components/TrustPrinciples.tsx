import { BadgeCheck, ShieldCheck, EyeOff, Scale, type LucideIcon } from 'lucide-react'

interface Principle {
  icon: LucideIcon
  label: string
  desc: string
}

const PRINCIPLES: Principle[] = [
  { icon: BadgeCheck, label: 'Verifiable', desc: 'Every AI action is cryptographically provable' },
  { icon: ShieldCheck, label: 'Secure', desc: 'Enterprise-grade protection for AI workloads' },
  { icon: EyeOff, label: 'Private', desc: 'Zero-knowledge proofs preserve confidentiality' },
  { icon: Scale, label: 'Compliant', desc: 'Adherence to global AI regulations built in' },
]

/* The four trust principles as a quiet mono icon row. */
export function TrustPrinciples({ className = '' }: { className?: string }) {
  return (
    <ul
      className={`grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4 ${className}`}
      aria-label="Trust principles"
    >
      {PRINCIPLES.map(({ icon: Icon, label, desc }) => (
        <li key={label} className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon size={16} style={{ color: 'var(--accent)' }} aria-hidden="true" />
            <span
              className="font-mono text-xs uppercase tracking-[0.18em]"
              style={{ color: 'var(--ink)' }}
            >
              {label}
            </span>
          </div>
          <p className="text-[0.82rem] leading-snug text-muted">{desc}</p>
        </li>
      ))}
    </ul>
  )
}
