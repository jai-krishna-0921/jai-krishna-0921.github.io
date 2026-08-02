import { useLayoutEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import gsap from 'gsap'
import { PERSONAL } from '@/data/portfolio'
import { ArrowDown } from 'lucide-react'

/** Rows of a live agent trace - the page's signature vocabulary. */
const TRACE = [
  { agent: 'conductor', task: 'route the brief', mark: '✓' },
  { agent: 'builder', task: 'ship the system', mark: '✓' },
  { agent: 'reviewer', task: 'prove it holds', mark: '✓' },
]

export function Hero() {
  const root = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 700], [0, 140])
  const fade = useTransform(scrollY, [0, 480], [1, 0])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.h-badge', { y: 14, opacity: 0, duration: 0.5, delay: 0.15 })
        .from('.h-line', { y: 44, opacity: 0, duration: 0.85, stagger: 0.09 }, '-=0.2')
        .from('.h-sub', { y: 16, opacity: 0, duration: 0.6 }, '-=0.45')
        .from('.h-trace-row', { x: -14, opacity: 0, duration: 0.5, stagger: 0.11 }, '-=0.3')
        .from('.h-cta', { y: 14, opacity: 0, duration: 0.5 }, '-=0.35')
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Atmospheric backdrop. Swap hero-atmos.svg for a photoreal
          render at the same path to upgrade it - nothing else changes. */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/img/hero-atmos.svg"
          alt=""
          aria-hidden="true"
          className="absolute right-0 top-0 h-full w-[62%] object-cover opacity-0 transition-opacity duration-[1200ms]"
          onLoad={(e) => { e.currentTarget.style.opacity = '0.9' }}
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <div
          className="absolute inset-y-0 left-0 w-3/5"
          style={{ background: 'linear-gradient(to right, #08080a 46%, transparent)' }}
        />
      </div>

      <motion.div style={{ y, opacity: fade }} className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 pt-24">
        <div className="h-badge trace-pill mb-9">
          <span className="w-1.5 h-1.5 rounded-full bg-verified animate-pulse-soft" />
          <span className="text-sweep">available for AI engineering roles</span>
        </div>

        {/* Mixed-face headline - Satoshi with Instrument Serif italic
            accent words. This is the reference's core typographic move. */}
        <h1 className="headline text-[clamp(2.6rem,7.4vw,6.5rem)] max-w-4xl mb-8">
          <span className="h-line block">I build systems that</span>
          <span className="h-line block">
            <span className="accent-word text-agent">reason</span>, then{' '}
            <span className="accent-word">prove</span>
          </span>
          <span className="h-line block">they were right.</span>
        </h1>

        <p className="h-sub text-[15px] sm:text-base text-[color:var(--text-2)] max-w-lg leading-relaxed mb-10">
          {PERSONAL.name.split(' ')[0]}, AI engineer in {PERSONAL.location.split(',')[0]}. Multi-agent
          orchestration, durable AI platforms, and the guardrails that keep them
          honest in production.
        </p>

        {/* The trace - three rows that read like coven's own output */}
        <div className="mb-11 space-y-2">
          {TRACE.map((r) => (
            <div key={r.agent} className="h-trace-row mono text-[12px] sm:text-[13px] flex items-center gap-3">
              <span className="text-verified">{r.mark}</span>
              <span className="text-agent">◈ {r.agent}</span>
              <span className="text-[color:var(--text-3)]">⟩ {r.task}</span>
            </div>
          ))}
          <div className="h-trace-row mono text-[12px] sm:text-[13px] flex items-center gap-3 pt-1">
            <span className="text-[color:var(--text-3)]">❯</span>
            <span className="w-2 h-4 bg-agent caret inline-block" />
          </div>
        </div>

        <div className="h-cta flex flex-wrap items-center gap-4">
          <a
            href="#work"
            onClick={(e) => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="group relative overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium text-ink bg-[color:var(--text)] transition-transform hover:scale-[1.02]"
          >
            <span className="relative z-10">See the work</span>
            <span className="shine absolute inset-0 bg-white/40" />
          </a>
          <a
            href={`mailto:${PERSONAL.email}`}
            className="rounded-full px-7 py-3.5 text-sm font-medium border border-[color:var(--hairline)] text-[color:var(--text-2)] hover:text-[color:var(--text)] hover:border-white/25 transition-colors"
          >
            Get in touch
          </a>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="mono text-[10px] tracking-[0.22em] text-[color:var(--text-3)] uppercase">scroll</span>
        <ArrowDown size={13} className="text-[color:var(--text-3)]" />
      </motion.div>
    </section>
  )
}
