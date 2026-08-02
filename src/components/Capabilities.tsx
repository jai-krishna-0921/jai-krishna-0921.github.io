import { motion } from 'motion/react'
import { WHAT_I_DO, SKILLS } from '@/data/portfolio'

export function Capabilities() {
  return (
    <section id="capabilities" className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 md:mb-20">
          <div className="trace-pill mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-command" />
            <span>capabilities</span>
          </div>
          <h2 className="headline text-[clamp(2rem,5vw,3.75rem)] max-w-2xl">
            Three layers, one <span className="accent-word text-agent">system</span>.
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {WHAT_I_DO.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09, duration: 0.6 }}
              className="card p-7 flex flex-col"
            >
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
            </motion.div>
          ))}
        </div>

        {/* Toolkit — dense, quiet, scannable */}
        <div className="border-t border-[color:var(--hairline)] pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-9">
            {SKILLS.map((cat, i) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
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
