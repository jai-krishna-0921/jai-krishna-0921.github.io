import { useLayoutEffect, useRef, useState } from 'react'
import {
  motion, useScroll, useTransform, useVelocity, useSpring, useMotionValueEvent,
} from 'motion/react'
import { STATS } from '@/data/portfolio'
import { SlideIn } from '@/components/motion/Reveal'

/**
 * Horizontal scrubbed slider. The track translates left as you scroll
 * down, with velocity-driven motion blur and a synced index on the left.
 */
export function Impact() {
  const ref = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const [active, setActive] = useState(0)
  const n = STATS.length

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // One card's advance = its width + the flex gap. Travelling (n-1) steps
  // lands the LAST card exactly where the first began, so every card takes
  // the featured slot in turn instead of the tail drifting off-screen.
  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      const cards = track.children
      if (cards.length < 2) return
      const a = cards[0].getBoundingClientRect()
      const b = cards[1].getBoundingClientRect()
      setStep(Math.round(b.left - a.left))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Stepped timeline: each card holds in the featured slot, then advances.
  const { inputs, outputs } = (() => {
    const inp: number[] = []
    const out: number[] = []
    const HOLD = 0.55
    for (let i = 0; i < n; i++) {
      const segStart = i / n
      const segEnd = (i + 1) / n
      inp.push(segStart, segStart + (segEnd - segStart) * HOLD)
      out.push(-i * step, -i * step)
    }
    inp.push(1)
    out.push(-(n - 1) * step)
    return { inputs: inp, outputs: out }
  })()

  const x = useTransform(scrollYProgress, inputs, outputs)
  const smoothX = useSpring(x, { stiffness: 130, damping: 32, mass: 0.5 })

  const velocity = useVelocity(scrollYProgress)
  const smoothV = useSpring(velocity, { damping: 45, stiffness: 320 })
  const blurN = useTransform(smoothV, [-3, 0, 3], [8, 0, 8], { clamp: true })
  const filter = useTransform(blurN, (b) => (b > 0.35 ? `blur(${b.toFixed(1)}px)` : 'none'))
  const skew = useTransform(smoothV, [-3, 0, 3], [-2.5, 0, 2.5], { clamp: true })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n))))
  })

  // One screenful of dwell per card, plus a lead-in.
  return (
    <section ref={ref} id="impact" className="relative" style={{ height: `${n * 90 + 100}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-10 w-full mb-12">
          <SlideIn from="left">
            <div className="trace-pill mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-verified" />
              <span>measured impact</span>
            </div>
          </SlideIn>
          <SlideIn from="left" delay={0.1}>
            <h2 className="headline text-[clamp(1.9rem,4.6vw,3.4rem)] max-w-2xl">
              Numbers that survived <span className="accent-word text-agent">production</span>.
            </h2>
          </SlideIn>
        </div>

        <div className="flex gap-10 items-start px-6 md:px-10 max-w-6xl mx-auto w-full">
          {/* Synced index */}
          <div className="hidden lg:flex flex-col gap-3 w-56 shrink-0 pt-3">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="mono text-[12px] transition-all duration-500 flex items-center gap-2.5"
                style={{
                  color: active === i ? 'var(--text)' : 'var(--text-3)',
                  transform: active === i ? 'translateX(6px)' : 'none',
                }}
              >
                <span
                  className="h-px transition-all duration-500"
                  style={{
                    width: active === i ? 20 : 8,
                    background: active === i ? 'var(--agent)' : 'var(--hairline)',
                  }}
                />
                {s.label}
              </div>
            ))}
          </div>

          {/* The moving track */}
          <div className="overflow-hidden flex-1">
            <motion.div ref={trackRef} style={{ x: smoothX, filter, skewX: skew }} className="flex gap-5 w-max will-change-transform">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="card w-[280px] sm:w-[340px] p-7 shrink-0 transition-colors duration-500"
                  style={{ borderColor: active === i ? 'rgba(232,121,249,0.4)' : undefined }}
                >
                  <div className="mono text-[10px] text-verified mb-5 flex items-center gap-1.5">
                    <span>✓</span><span>verified</span>
                  </div>
                  <div className="headline text-[clamp(2.6rem,5.5vw,4rem)] mb-3 leading-none">
                    {s.value}<span className="text-agent">{s.suffix}</span>
                  </div>
                  <div className="text-[15px] text-[color:var(--text)] mb-2">{s.label}</div>
                  <div className="text-[13px] leading-relaxed text-[color:var(--text-3)]">{s.description}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Progress rail */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 w-full mt-12">
          <div className="h-px bg-[color:var(--hairline)] relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-agent"
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
