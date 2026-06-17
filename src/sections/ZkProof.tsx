import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  Lock,
  ArrowRight,
  Check,
  X,
  Banknote,
  HeartPulse,
  Rocket,
  FileSignature,
  type LucideIcon,
} from 'lucide-react'
import { Section, Eyebrow } from '../components/Section'
import { DecodeHeadline } from '../components/DecodeHeadline'
import { SpecimenCard } from '../components/SpecimenCard'

const HEX = '0123456789abcdef'
const randHex = (n: number) => Array.from({ length: n }, () => HEX[(Math.random() * 16) | 0]).join('')

interface Action {
  id: string
  label: string
  cap: string
  level: number
  icon: LucideIcon
}

/* A sensitive action the verifier wants authorized, and the public policy it requires. */
const ACTIONS: Action[] = [
  { id: 'transfer', label: 'Transfer funds', cap: 'finance', level: 3, icon: Banknote },
  { id: 'records', label: 'Read patient records', cap: 'healthcare', level: 2, icon: HeartPulse },
  { id: 'deploy', label: 'Deploy a model', cap: 'deploy', level: 4, icon: Rocket },
  { id: 'contract', label: 'Sign a contract', cap: 'legal', level: 3, icon: FileSignature },
]

const CAPS = ['finance', 'healthcare', 'deploy', 'legal', 'data'] as const

type Result = null | 'authorized' | 'denied'

/*
  Zero-knowledge, made tangible — and on-thesis for VENZIQ: an AI agent proves it
  is AUTHORIZED to perform a chosen sensitive action, without revealing its
  credentials. The prover (agent device) holds a secret clearance level and a set
  of capabilities; the verifier picks an action with a public policy and only ever
  learns the boolean "authorized / denied" plus a proof hash — never the secret.
*/
export function ZkProof() {
  const reduce = useReducedMotion()
  const [actionIdx, setActionIdx] = useState(0)
  const [clearance, setClearance] = useState(3)
  const [caps, setCaps] = useState<Record<string, boolean>>({
    finance: true,
    healthcare: false,
    deploy: false,
    legal: false,
    data: true,
  })
  const [proving, setProving] = useState(false)
  const [result, setResult] = useState<Result>(null)
  const [hash, setHash] = useState('')
  const iv = useRef<ReturnType<typeof setInterval> | null>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(
    () => () => {
      if (iv.current) clearInterval(iv.current)
      timers.current.forEach(clearTimeout)
    },
    [],
  )

  const action = ACTIONS[actionIdx]
  const reset = () => setResult(null)
  const toggleCap = (c: string) => {
    setCaps((prev) => ({ ...prev, [c]: !prev[c] }))
    reset()
  }

  const generate = () => {
    if (iv.current) clearInterval(iv.current)
    timers.current.forEach(clearTimeout)
    timers.current = []
    const final = '0x' + randHex(18)
    const ok: Result = clearance >= action.level && caps[action.cap] ? 'authorized' : 'denied'
    if (reduce) {
      setHash(final)
      setResult(ok)
      return
    }
    setProving(true)
    setResult(null)
    iv.current = setInterval(() => setHash('0x' + randHex(18)), 50)
    timers.current.push(
      setTimeout(() => {
        if (iv.current) clearInterval(iv.current)
        setHash(final)
        setProving(false)
        setResult(ok)
      }, 1100),
    )
  }

  return (
    <Section id="zk">
      <div className="max-w-3xl">
        <Eyebrow>Zero-knowledge · illustrated</Eyebrow>
        <DecodeHeadline
          text="Prove it without revealing it"
          className="text-4xl font-semibold md:text-5xl"
        />
        <p className="mt-6 text-lg text-muted">
          A zero-knowledge proof lets an AI agent prove it is{' '}
          <span className="text-ink">authorized</span> to act — without revealing its credentials.
          Choose an action, set the agent&apos;s secret clearance and capabilities, then generate a
          proof. The verifier only ever learns <span className="text-ink">authorized</span> or{' '}
          <span className="text-ink">denied</span> — never how.
        </p>
      </div>

      {/* the verifier's request — pick a sensitive action */}
      <div className="mt-10">
        <p className="mono-eyebrow">verifier request · action to authorize</p>
        <div
          role="radiogroup"
          aria-label="Choose an action to authorize"
          className="mt-3 flex flex-wrap gap-2"
        >
          {ACTIONS.map((a, i) => {
            const Icon = a.icon
            const sel = i === actionIdx
            return (
              <button
                key={a.id}
                type="button"
                role="radio"
                aria-checked={sel}
                onClick={() => {
                  setActionIdx(i)
                  reset()
                }}
                className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 font-mono text-[0.72rem] transition-colors"
                style={{
                  borderColor: sel ? 'var(--accent)' : 'var(--hairline)',
                  background: sel ? 'var(--accent-soft)' : 'transparent',
                  color: sel ? 'var(--ink)' : 'var(--muted)',
                }}
              >
                <Icon
                  size={14}
                  aria-hidden="true"
                  style={{ color: sel ? 'var(--accent)' : 'var(--faint)' }}
                />
                {a.label}
              </button>
            )
          })}
        </div>
        <p className="mt-3 font-mono text-[0.72rem] text-muted">
          policy · requires <span className="text-ink">{action.cap}</span> capability + clearance{' '}
          <span className="text-ink">≥ L{action.level}</span>
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 items-stretch gap-5 md:grid-cols-[1fr_auto_1fr]">
        {/* prover */}
        <SpecimenCard serial="PROVER" className="flex flex-col">
          <p className="mono-eyebrow">prover · agent device</p>

          {/* secret clearance */}
          <div className="mt-6 flex items-baseline gap-2">
            <Lock size={14} style={{ color: 'var(--accent)' }} aria-hidden="true" />
            <span className="font-mono text-sm text-muted">secret clearance</span>
            <span className="ml-auto font-mono text-2xl font-medium text-ink">L{clearance}</span>
          </div>
          <label className="sr-only" htmlFor="zk-clearance">
            Secret clearance level
          </label>
          <input
            id="zk-clearance"
            type="range"
            min={1}
            max={5}
            value={clearance}
            onChange={(e) => {
              setClearance(Number(e.target.value))
              reset()
            }}
            className="mt-3 w-full"
            style={{ accentColor: 'var(--accent)' }}
          />

          {/* secret capabilities */}
          <p className="mt-5 font-mono text-sm text-muted">secret capabilities</p>
          <div role="group" aria-label="Agent capabilities" className="mt-2 flex flex-wrap gap-1.5">
            {CAPS.map((c) => {
              const on = caps[c]
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleCap(c)}
                  className="rounded-full border px-2.5 py-1 font-mono text-[0.68rem] transition-colors"
                  style={{
                    borderColor: on ? 'var(--accent)' : 'var(--hairline)',
                    background: on ? 'var(--accent-soft)' : 'transparent',
                    color: on ? 'var(--accent)' : 'var(--faint)',
                  }}
                >
                  {c}
                </button>
              )
            })}
          </div>

          <p className="mt-4 font-mono text-[0.66rem] text-faint">
            stays on the agent — never transmitted
          </p>
          <button
            type="button"
            onClick={generate}
            disabled={proving}
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-[var(--radius)] px-5 py-3 text-sm font-medium disabled:opacity-60"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            {proving ? 'Generating proof…' : 'Generate authorization proof'}
          </button>
        </SpecimenCard>

        {/* connector */}
        <div className="flex items-center justify-center md:flex-col md:gap-2">
          <ArrowRight size={18} className="text-faint" aria-hidden="true" />
          <span className="mono-eyebrow text-[0.58rem]">zk proof</span>
        </div>

        {/* verifier */}
        <SpecimenCard serial="VERIFIER" className="flex flex-col">
          <p className="mono-eyebrow">verifier</p>
          <div className="mt-6">
            <p className="font-mono text-sm text-muted">credential received</p>
            <p className="mt-1 flex items-center gap-2 font-mono text-2xl font-medium text-faint">
              <Lock size={16} aria-hidden="true" /> •••••
            </p>
          </div>
          <p className="mt-4 font-mono text-[0.72rem] text-muted">
            proof <span className="text-ink">{hash || '—'}</span>
          </p>
          <p className="mt-2 font-mono text-[0.72rem] text-muted">
            checking · <span className="text-ink">{action.label}</span>
          </p>
          <div className="mt-auto pt-4">
            {result === null ? (
              <span className="font-mono text-sm text-faint">
                {proving ? 'verifying…' : 'awaiting proof'}
              </span>
            ) : (
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 font-mono text-sm"
                style={{ color: result === 'authorized' ? 'var(--accent)' : 'var(--muted)' }}
              >
                {result === 'authorized' ? <Check size={15} /> : <X size={15} />}
                {result === 'authorized' ? 'authorized ✓ — policy satisfied' : 'denied — policy not met'}
              </motion.span>
            )}
          </div>
        </SpecimenCard>
      </div>

      <p className="mt-6 font-mono text-[0.72rem] text-faint">
        // the verifier learns only authorized / denied — the agent&apos;s clearance and
        capabilities never left its device
      </p>
    </Section>
  )
}
