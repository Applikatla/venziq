import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

type Kind = 'ok' | 'verified' | 'sealed'

interface Line {
  channel: string
  payload: string
  status: string
  kind: Kind
}

// the core pattern, cycled across the three verticals from the brief
const SEQUENCE: Line[] = [
  { channel: 'agent.action', payload: 'submit_trade()', status: 'ok', kind: 'ok' },
  { channel: 'zk.verify', payload: 'authorization proof', status: 'verified ✓', kind: 'verified' },
  { channel: 'chain.commit', payload: 'audit record', status: 'block sealed', kind: 'sealed' },
  { channel: 'agent.action', payload: 'process_patient_data()', status: 'ok', kind: 'ok' },
  { channel: 'zk.verify', payload: 'privacy proof', status: 'verified ✓', kind: 'verified' },
  { channel: 'chain.commit', payload: 'disclosure record', status: 'block sealed', kind: 'sealed' },
  { channel: 'agent.action', payload: 'submit_citizen_request()', status: 'ok', kind: 'ok' },
  { channel: 'zk.verify', payload: 'credential proof', status: 'verified ✓', kind: 'verified' },
  { channel: 'chain.commit', payload: 'transparency record', status: 'block sealed', kind: 'sealed' },
]

const WINDOW = 3
const TICK_MS = 28
const DWELL_TICKS = 40

interface Row extends Line {
  id: number
}

interface State {
  rows: Row[]
  typed: number
  phase: 'typing' | 'dwell'
  dwell: number
  cursor: number
  nextId: number
}

function initial(): State {
  return {
    rows: SEQUENCE.slice(0, WINDOW).map((l, i) => ({ ...l, id: i })),
    typed: 0,
    phase: 'typing',
    dwell: 0,
    cursor: WINDOW,
    nextId: WINDOW,
  }
}

function advance(prev: State): State {
  const active = prev.rows[prev.rows.length - 1]
  if (prev.phase === 'typing') {
    if (prev.typed < active.payload.length) {
      return { ...prev, typed: prev.typed + 1 }
    }
    return { ...prev, phase: 'dwell', dwell: 0 }
  }
  if (prev.dwell < DWELL_TICKS) {
    return { ...prev, dwell: prev.dwell + 1 }
  }
  const next = SEQUENCE[prev.cursor % SEQUENCE.length]
  const rows = [...prev.rows, { ...next, id: prev.nextId }].slice(-WINDOW)
  return {
    rows,
    typed: 0,
    phase: 'typing',
    dwell: 0,
    cursor: prev.cursor + 1,
    nextId: prev.nextId + 1,
  }
}

function pushNext(prev: State): State {
  const next = SEQUENCE[prev.cursor % SEQUENCE.length]
  const rows = [...prev.rows, { ...next, id: prev.nextId }].slice(-WINDOW)
  return { ...prev, rows, cursor: prev.cursor + 1, nextId: prev.nextId + 1 }
}

function statusColor(kind: Kind): string {
  return kind === 'ok' ? 'var(--muted)' : 'var(--accent)'
}

export function ProofFeed() {
  const reduce = useReducedMotion()
  const [state, setState] = useState<State>(initial)

  useEffect(() => {
    if (reduce) {
      const id = setInterval(() => setState(pushNext), 1800)
      return () => clearInterval(id)
    }
    const id = setInterval(() => setState(advance), TICK_MS)
    return () => clearInterval(id)
  }, [reduce])

  const { rows, typed, phase } = state

  return (
    <div
      className="font-mono text-[0.78rem] sm:text-[0.85rem]"
      aria-hidden="true"
    >
      {/* fixed height + clipped so row cycling never shifts the section */}
      <div className="flex h-[4.75rem] flex-col justify-end gap-1.5 overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {rows.map((row, i) => {
            const isActive = i === rows.length - 1
            const typingThis = isActive && !reduce && phase === 'typing'
            const payloadText = typingThis ? row.payload.slice(0, typed) : row.payload
            const statusVisible = reduce || !isActive || phase === 'dwell'
            return (
              <motion.div
                key={row.id}
                initial={reduce ? false : { y: 22 }}
                animate={{ y: 0 }}
                exit={reduce ? {} : { y: -22 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 whitespace-nowrap"
              >
                <span style={{ color: 'var(--accent-2)' }} className="w-28 shrink-0">
                  {row.channel}
                </span>
                <span className="min-w-0 flex-1 truncate" style={{ color: 'var(--ink)' }}>
                  {payloadText}
                  {typingThis && (
                    <span className="ml-0.5 inline-block" style={{ color: 'var(--accent)' }}>
                      ▋
                    </span>
                  )}
                </span>
                <span
                  className="shrink-0 text-right"
                  style={{
                    color: statusColor(row.kind),
                    opacity: statusVisible ? 1 : 0,
                    transition: 'opacity 0.2s',
                  }}
                >
                  {row.status}
                </span>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
