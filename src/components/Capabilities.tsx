import { motion } from 'motion/react'
import { WHAT_I_DO, SKILLS } from '@/data/portfolio'
import { SlideIn } from '@/components/motion/Reveal'

export function Capabilities() {
  return (
    <section id="capabilities" className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 md:mb-20">
          <SlideIn from="left">
            <div className="trace-pill mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-command" />
              <span>capabilities</span>
            </div>
          </SlideIn>
          <SlideIn from="left" delay={0.1}>
            <h2 className="headline text-[clamp(2rem,5vw,3.75rem)] max-w-2xl">
              Three layers, one <span className="accent-word text-agent">system</span>.
            </h2>
          </SlideIn>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {WHAT_I_DO.map((s, i) => (
            <SlideIn
              key={s.id}
              from={i === 0 ? 'left' : i === 2 ? 'right' : 'up'}
              delay={i * 0.11}
              distance={70}
              className="h-full"
            >
              <div className="card p-7 flex flex-col h-full group hover:border-agent/30 transition-colors duration-500">
                <div className="mono text-[11px] text-agent mb-6">◈ {s.id}</div>
                <h3 className="headline text-xl mb-3">{s.title}</h3>
                <p className="text-[14px] leading-relaxed text-[color:var(--text-2)] mb-6 flex-1">{s.summary}</p>
                <ul className="space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="mono text-[11.5px] text-[color:var(--text-3)] flex gap-2">
                      <span className="text-agent/50">//</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SlideIn>
          ))}
        </div>

        {/* Toolkit - dense, quiet, scannable */}
        <div className="border-t border-[color:var(--hairline)] pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-9">
            {SKILLS.map((cat, i) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mono text-[11px] text-[color:var(--text-3)] mb-3 pb-2 border-b border-[color:var(--hairline)]">
                  {cat.category}
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                  {cat.skills.map((s) => (
                    <span key={s} className="text-[13px] text-[color:var(--text-2)]">{s}</span>
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
