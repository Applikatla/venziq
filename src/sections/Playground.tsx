import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Play, Check } from 'lucide-react'
import { Section, Eyebrow } from '../components/Section'
import { DecodeHeadline } from '../components/DecodeHeadline'
import { SpecimenCard } from '../components/SpecimenCard'

const PRESETS = [
  'submit_trade()',
  'process_patient_data()',
  'verify_credential()',
  'approve_payout()',
]

const HEX = '0123456789abcdef'
function randHex(len: number): string {
  let s = ''
  for (let i = 0; i < len; i++) s += HEX[(Math.random() * 16) | 0]
  return s
}

type Stage = 'idle' | 'action' | 'zk' | 'chain' | 'done'
const ORDER: Stage[] = ['action', 'zk', 'chain', 'done']

interface Run {
  action: string
  hash: string
  block: string
}

function reached(stage: Stage, target: Stage): boolean {
  if (stage === 'idle') return false
  return ORDER.indexOf(stage) >= ORDER.indexOf(target)
}

export function Playground() {
  const reduce = useReducedMotion()
  const [action, setAction] = useState(PRESETS[0])
  const [stage, setStage] = useState<Stage>('idle')
  const [run, setRun] = useState<Run | null>(null)
  const [hashDisplay, setHashDisplay] = useState('')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const scrambleIv = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearAll = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    if (scrambleIv.current) clearInterval(scrambleIv.current)
    scrambleIv.current = null
  }

  useEffect(() => () => clearAll(), [])

  const start = () => {
    if (stage !== 'idle' && stage !== 'done') return
    clearAll()
    const clean = (action.trim() || 'agent_action()').slice(0, 40)
    const next: Run = {
      action: clean,
      hash: '0x' + randHex(24),
      block: String(18_400_000 + ((Math.random() * 900000) | 0)),
    }
    setRun(next)

    if (reduce) {
      setHashDisplay(next.hash)
      setStage('done')
      return
    }

    setHashDisplay('0x' + randHex(24))
    setStage('action')
    timers.current.push(setTimeout(() => setStage('zk'), 650))
    // scramble the proof hash while verifying
    timers.current.push(
      setTimeout(() => {
        scrambleIv.current = setInterval(
          () => setHashDisplay('0x' + randHex(24)),
          55,
        )
      }, 650),
    )
    timers.current.push(
      setTimeout(() => {
        if (scrambleIv.current) clearInterval(scrambleIv.current)
        setHashDisplay(next.hash)
        setStage('chain')
      }, 1900),
    )
    timers.current.push(setTimeout(() => setStage('done'), 2900))
  }

  const running = stage !== 'idle' && stage !== 'done'

  return (
    <Section id="playground">
      <div className="max-w-3xl">
        <Eyebrow>Verification playground</Eyebrow>
        <DecodeHeadline
          text="Run it yourself"
          className="text-4xl font-semibold md:text-5xl"
        />
        <p className="mt-6 text-lg text-muted">
          Pick an AI agent action and watch it pass through the trust layer: a
          zero-knowledge proof verifies it, and the blockchain seals the record.
        </p>
      </div>

      <SpecimenCard serial="VZQ-RUN" className="mt-12" ticks>
        {/* action picker */}
        <div className="flex flex-wrap items-center gap-2">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setAction(p)}
              disabled={running}
              className="rounded-full border px-3 py-1.5 font-mono text-xs transition-colors disabled:opacity-50"
              style={{
                borderColor: action === p ? 'var(--accent)' : 'var(--hairline)',
                color: action === p ? 'var(--accent)' : 'var(--muted)',
                background: action === p ? 'var(--accent-soft)' : 'transparent',
              }}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="vzq-action">
            AI agent action
          </label>
          <input
            id="vzq-action"
            value={action}
            onChange={(e) => setAction(e.target.value)}
            disabled={running}
            spellCheck={false}
            className="flex-1 rounded-[var(--radius)] border border-hairline bg-bg px-4 py-3 font-mono text-sm text-ink outline-none focus-visible:border-accent disabled:opacity-50"
            placeholder="type an action, e.g. settle_invoice()"
          />
          <button
            type="button"
            onClick={start}
            disabled={running}
            className="inline-flex items-center justify-center gap-2 rounded-[var(--radius)] px-5 py-3 text-sm font-medium disabled:opacity-60"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            {running ? (
              <>
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent-ink)]" />
                Verifying
              </>
            ) : (
              <>
                <Play size={15} aria-hidden="true" /> Run verification
              </>
            )}
          </button>
        </div>

        {/* pipeline output */}
        <div
          className="mt-6 rounded-[var(--radius)] border border-hairline bg-bg p-5 font-mono text-[0.82rem]"
          aria-live="polite"
        >
          {stage === 'idle' && run === null ? (
            <p className="text-faint">// awaiting action — press run</p>
          ) : (
            <div className="space-y-3">
              <PipeRow
                channel="agent.action"
                value={run?.action ?? ''}
                done={reached(stage, 'action')}
                status="accepted"
                statusAccent={false}
              />
              <PipeRow
                channel="zk.verify"
                value={reached(stage, 'zk') ? hashDisplay : ''}
                pending={stage === 'zk'}
                done={reached(stage, 'chain')}
                status="verified ✓"
              />
              <PipeRow
                channel="chain.commit"
                value={reached(stage, 'chain') ? `block #${run?.block ?? ''}` : ''}
                pending={stage === 'chain'}
                done={stage === 'done'}
                status="sealed"
              />
            </div>
          )}

          <AnimatePresence>
            {stage === 'done' && (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 flex items-center gap-2 border-t border-hairline pt-4"
              >
                <Check size={15} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                <span style={{ color: 'var(--accent)' }}>trusted autonomy</span>
                <span className="text-faint">— action verified, proof sealed</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SpecimenCard>
    </Section>
  )
}

function PipeRow({
  channel,
  value,
  status,
  done = false,
  pending = false,
  statusAccent = true,
}: {
  channel: string
  value: string
  status: string
  done?: boolean
  pending?: boolean
  statusAccent?: boolean
}) {
  const showStatus = done
  return (
    <div className="flex items-center gap-3 whitespace-nowrap">
      <span className="w-28 shrink-0" style={{ color: 'var(--accent-2)' }}>
        {channel}
      </span>
      <span className="min-w-0 flex-1 truncate text-ink">
        {value || (pending ? 'working…' : '—')}
      </span>
      <span
        className="shrink-0 text-right"
        style={{
          color: showStatus ? (statusAccent ? 'var(--accent)' : 'var(--muted)') : 'var(--faint)',
        }}
      >
        {showStatus ? status : '···'}
      </span>
    </div>
  )
}
