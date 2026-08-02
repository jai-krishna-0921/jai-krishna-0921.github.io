import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { EXPERIENCE, STATS } from '@/data/portfolio'

/**
 * Career as an execution trace: each role is a completed step,
 * each metric a verified result. Order matters here, so the
 * numbering earns its place.
 */
export function Trace() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.4'] })
  const railHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="trace" className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <header className="mb-16 md:mb-20">
          <div className="trace-pill mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-verified" />
            <span>the trace</span>
          </div>
          <h2 className="headline text-[clamp(2rem,5vw,3.75rem)] max-w-2xl">
            Four roles, each one <span className="accent-word text-agent">measured</span>.
          </h2>
        </header>

        {/* Metrics — verified results */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20 md:mb-28">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="card p-5 sm:p-6"
            >
              <div className="mono text-[10px] text-verified mb-3 flex items-center gap-1.5">
                <span>✓</span><span>verified</span>
              </div>
              <div className="headline text-[clamp(1.8rem,3.6vw,2.75rem)] mb-1.5">
                {s.value}<span className="text-agent">{s.suffix}</span>
              </div>
              <div className="text-[13px] text-[color:var(--text-2)] mb-1">{s.label}</div>
              <div className="text-[11px] leading-snug text-[color:var(--text-3)]">{s.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Timeline rail */}
        <div ref={ref} className="relative pl-8 sm:pl-12">
          <div className="absolute left-[3px] sm:left-[7px] top-2 bottom-2 w-px bg-[color:var(--hairline)]" />
          <motion.div
            style={{ height: railHeight }}
            className="absolute left-[3px] sm:left-[7px] top-2 w-px bg-gradient-to-b from-agent via-agent/60 to-transparent"
          />

          <div className="space-y-14 sm:space-y-16">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className="relative"
              >
                <span className="absolute -left-8 sm:-left-12 top-1.5 w-[9px] h-[9px] rounded-full bg-agent ring-4 ring-ink" />

                <div className="mono text-[11px] text-[color:var(--text-3)] mb-2.5 flex flex-wrap items-center gap-2.5">
                  <span className="text-agent">◈ {String(i + 1).padStart(2, '0')}</span>
                  <span>{exp.period}</span>
                  <span className="px-2 py-0.5 rounded-full border border-[color:var(--hairline)]">{exp.type}</span>
                </div>

                <h3 className="headline text-xl sm:text-2xl mb-1">{exp.role}</h3>
                <div className="text-[14px] text-[color:var(--text-2)] mb-4">{exp.company}</div>

                <ul className="space-y-2 mb-5">
                  {exp.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-[14px] leading-relaxed text-[color:var(--text-2)]">
                      <span className="mono text-verified text-[12px] mt-0.5 shrink-0">✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span key={t} className="mono text-[10.5px] px-2 py-0.5 rounded-full border border-[color:var(--hairline)] text-[color:var(--text-3)]">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
