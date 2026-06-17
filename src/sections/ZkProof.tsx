import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Lock, ArrowRight, Check, X } from 'lucide-react'
import { Section, Eyebrow } from '../components/Section'
import { DecodeHeadline } from '../components/DecodeHeadline'
import { SpecimenCard } from '../components/SpecimenCard'

const HEX = '0123456789abcdef'
const randHex = (n: number) => Array.from({ length: n }, () => HEX[(Math.random() * 16) | 0]).join('')

type Result = null | 'valid' | 'invalid'

/*
  Zero-knowledge, made tangible: prove "age >= 18" so the verifier learns only the
  result, never the age. The prover panel holds the secret; the verifier panel
  only ever sees a proof hash and a boolean.
*/
export function ZkProof() {
  const reduce = useReducedMotion()
  const [age, setAge] = useState(24)
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

  const generate = () => {
    if (iv.current) clearInterval(iv.current)
    timers.current.forEach(clearTimeout)
    timers.current = []
    const final = '0x' + randHex(18)
    const ok = age >= 18 ? 'valid' : 'invalid'
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
        <DecodeHeadline text="Prove it without revealing it" className="text-4xl font-semibold md:text-5xl" />
        <p className="mt-6 text-lg text-muted">
          A zero-knowledge proof lets an agent prove a fact is true while keeping the underlying
          data private. Set a secret age, then prove you are over 18 — the verifier never sees the
          number.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 items-stretch gap-5 md:grid-cols-[1fr_auto_1fr]">
        {/* prover */}
        <SpecimenCard serial="PROVER" className="flex flex-col">
          <p className="mono-eyebrow">prover · your device</p>
          <div className="mt-6 flex items-baseline gap-2">
            <Lock size={14} style={{ color: 'var(--accent)' }} aria-hidden="true" />
            <span className="font-mono text-sm text-muted">secret age</span>
            <span className="ml-auto font-mono text-2xl font-medium text-ink">{age}</span>
          </div>
          <label className="sr-only" htmlFor="zk-age">
            Secret age
          </label>
          <input
            id="zk-age"
            type="range"
            min={1}
            max={99}
            value={age}
            onChange={(e) => {
              setAge(Number(e.target.value))
              setResult(null)
            }}
            className="mt-3 w-full"
            style={{ accentColor: 'var(--accent)' }}
          />
          <p className="mt-3 font-mono text-[0.66rem] text-faint">stays on the prover — never transmitted</p>
          <button
            type="button"
            onClick={generate}
            disabled={proving}
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-[var(--radius)] px-5 py-3 text-sm font-medium disabled:opacity-60"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            {proving ? 'Generating proof…' : 'Prove age ≥ 18'}
          </button>
        </SpecimenCard>

        {/* connector */}
        <div className="flex items-center justify-center md:flex-col md:gap-2">
          <ArrowRight size={18} className="text-faint md:rotate-0" aria-hidden="true" />
          <span className="mono-eyebrow text-[0.58rem]">zk proof</span>
        </div>

        {/* verifier */}
        <SpecimenCard serial="VERIFIER" className="flex flex-col">
          <p className="mono-eyebrow">verifier</p>
          <div className="mt-6">
            <p className="font-mono text-sm text-muted">age received</p>
            <p className="mt-1 flex items-center gap-2 font-mono text-2xl font-medium text-faint">
              <Lock size={16} aria-hidden="true" /> ••
            </p>
          </div>
          <p className="mt-4 font-mono text-[0.72rem] text-muted">
            proof <span className="text-ink">{hash || '—'}</span>
          </p>
          <div className="mt-auto pt-4">
            {result === null ? (
              <span className="font-mono text-sm text-faint">{proving ? 'verifying…' : 'awaiting proof'}</span>
            ) : (
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 font-mono text-sm"
                style={{ color: result === 'valid' ? 'var(--accent)' : 'var(--threat)' }}
              >
                {result === 'valid' ? <Check size={15} /> : <X size={15} />}
                {result === 'valid' ? 'valid ✓ — age ≥ 18' : 'invalid ✗ — under 18'}
              </motion.span>
            )}
          </div>
        </SpecimenCard>
      </div>

      <p className="mt-6 font-mono text-[0.72rem] text-faint">
        // the verifier learns only true / false — your age never left the prover
      </p>
    </Section>
  )
}
