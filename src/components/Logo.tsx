import { useId, useState } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'

/*
  VENZIQ mark - "the letter is the proof".
  A Q whose tail starts inside the bowl, crosses the lower-right edge, and rises
  up-right into a verification tick. One shape carries the letter and the proof.

  Geometry (mark-local space, viewBox 0 0 116 96):
    bowl  : circle cx=46 cy=46 r=34
    tail  : M33 54 L54 76 L104 18   (the long arm exits through the bowl's right
                                      edge near cy, so it reads as a Q tail)
*/

const BOWL = { cx: 46, cy: 46, r: 34 }
const TAIL_FULL = 'M33 54 L54 76 L104 18'
// split for Option-C colouring: ink body + accent tip
const TAIL_INK = 'M33 54 L54 76 L88 30'
const TAIL_TIP = 'M88 30 L104 18'
const STROKE = 10

type Tone = 'accent' | 'gradient' | 'currentColor'

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  shown: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.16, duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      opacity: { delay: i * 0.16, duration: 0.01 },
    },
  }),
}

interface LogoMarkProps {
  size?: number
  tone?: Tone
  animate?: boolean
  /** quiet idle re-verification pulse on the tick - hero only */
  idle?: boolean
  className?: string
  title?: string
  /** purely decorative use (e.g. inside a labelled control): no role/label, aria-hidden */
  decorative?: boolean
}

/** Standalone mark - used in the hero (large, animated) and as the favicon source. */
export function LogoMark({
  size = 40,
  tone = 'accent',
  animate = false,
  idle = false,
  className,
  title = 'VENZIQ',
  decorative = false,
}: LogoMarkProps) {
  const gradId = useId()
  const reduce = useReducedMotion()
  const shouldAnimate = animate && !reduce
  const stroke =
    tone === 'gradient'
      ? `url(#${gradId})`
      : tone === 'accent'
        ? 'var(--accent)'
        : 'currentColor'

  const common = {
    fill: 'none',
    stroke,
    strokeWidth: STROKE,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  return (
    <svg
      width={(size * 116) / 96}
      height={size}
      viewBox="0 0 116 96"
      className={className}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : title}
      aria-hidden={decorative ? 'true' : undefined}
    >
      {tone === 'gradient' && (
        <defs>
          <linearGradient id={gradId} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>
      )}

      {shouldAnimate ? (
        <motion.g initial="hidden" animate="shown">
          <motion.circle {...common} cx={BOWL.cx} cy={BOWL.cy} r={BOWL.r} custom={0} variants={draw} />
          <motion.path {...common} d={TAIL_FULL} custom={1} variants={draw} />
        </motion.g>
      ) : (
        <g>
          <circle {...common} cx={BOWL.cx} cy={BOWL.cy} r={BOWL.r} />
          <motion.path
            {...common}
            d={TAIL_FULL}
            animate={idle && !reduce ? { opacity: [1, 0.5, 1] } : undefined}
            transition={
              idle && !reduce
                ? { duration: 3.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2.6 }
                : undefined
            }
          />
        </g>
      )}
    </svg>
  )
}

interface LogoProps {
  /** rendered pixel height of the lockup */
  height?: number
  className?: string
}

/*
  Horizontal lockup rendered as a single SVG so the wordmark and the special Q
  share one coordinate system (no flex/baseline kerning drift). "VENZI" is set in
  the display font; the final Q is the proof mark. Option-C colour: ink body,
  accent tip. viewBox is 3:1.
*/
export function Logo({ height = 30, className }: LogoProps) {
  const reduce = useReducedMotion()
  // dynamic: the tick draws on mount and re-draws on hover (re-keyed group)
  const [replay, setReplay] = useState(0)
  const animated = !reduce

  // Q glyph transform: scale the mark to the wordmark cap height and seat it
  // snug after "VENZI". Tuned against Space Grotesk 700 at this size.
  const Q = (
    <g transform="translate(202 13.5) scale(0.8)">
      {animated ? (
        <motion.g key={replay} initial="hidden" animate="shown">
          <motion.circle
            fill="none" stroke="var(--ink)" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round"
            cx={BOWL.cx} cy={BOWL.cy} r={BOWL.r} custom={1} variants={draw}
          />
          <motion.path
            fill="none" stroke="var(--ink)" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round"
            d={TAIL_INK} custom={2} variants={draw}
          />
          <motion.path
            fill="none" stroke="var(--accent)" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round"
            d={TAIL_TIP} custom={3} variants={draw}
          />
        </motion.g>
      ) : (
        <g fill="none" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round">
          <circle stroke="var(--ink)" cx={BOWL.cx} cy={BOWL.cy} r={BOWL.r} />
          <path stroke="var(--ink)" d={TAIL_INK} />
          <path stroke="var(--accent)" d={TAIL_TIP} />
        </g>
      )}
    </g>
  )

  return (
    <svg
      width={height * 3}
      height={height}
      viewBox="0 0 300 100"
      className={className}
      aria-hidden="true"
      onPointerEnter={() => animated && setReplay((r) => r + 1)}
      style={{ overflow: 'visible' }}
    >
      <text
        x="2" y="78"
        fontFamily="var(--font-display)" fontWeight={700} fontSize={78}
        letterSpacing="-2" fill="var(--ink)"
      >
        VENZI
      </text>
      {Q}
    </svg>
  )
}
