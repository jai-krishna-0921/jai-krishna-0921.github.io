import { motion } from 'motion/react'
import { PERSONAL, ACHIEVEMENTS } from '@/data/portfolio'
import { ArrowUpRight } from 'lucide-react'

const LINKS = [
  { label: 'Email', value: PERSONAL.email, href: `mailto:${PERSONAL.email}` },
  { label: 'GitHub', value: 'jai-krishna-0921', href: PERSONAL.github },
  { label: 'LinkedIn', value: 'Jai Krishna K', href: PERSONAL.linkedin },
]

export function Contact() {
  return (
    <section id="contact" className="relative pt-28 md:pt-36 px-6 md:px-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Recognition - quiet, factual */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-28 md:mb-36">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              className="card p-6"
            >
              <div className="mono text-[10px] text-pending mb-4 flex items-center gap-1.5">
                <span>★</span><span>recognition</span>
              </div>
              <h3 className="text-[15px] font-medium mb-1.5 leading-snug">{a.title}</h3>
              <p className="mono text-[11px] text-[color:var(--text-3)] mb-3">{a.org}</p>
              <p className="text-[13px] leading-relaxed text-[color:var(--text-2)]">{a.description}</p>
            </motion.div>
          ))}
        </div>

        {/* The close */}
        <div className="relative text-center pb-28 md:pb-36">
          <div className="glow-well" />
          <div className="relative z-10">
            <div className="trace-pill mx-auto mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-verified animate-pulse-soft" />
              <span className="text-sweep">open to opportunities</span>
            </div>

            <h2 className="headline text-[clamp(2.4rem,7vw,5.5rem)] mb-7 max-w-3xl mx-auto">
              Let's build something <span className="accent-word text-agent">worth</span> proving.
            </h2>

            <p className="text-[15px] text-[color:var(--text-2)] max-w-md mx-auto mb-11 leading-relaxed">
              I'm looking for AI engineering work where the systems have to hold up
              under real load, and someone has to prove they do.
            </p>

            <a
              href={`mailto:${PERSONAL.email}`}
              className="group relative inline-flex overflow-hidden rounded-full px-9 py-4 text-[15px] font-medium text-ink bg-[color:var(--text)] transition-transform hover:scale-[1.03]"
            >
              <span className="relative z-10">{PERSONAL.email}</span>
              <span className="shine absolute inset-0 bg-white/40" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-[color:var(--hairline)]">
        <div className="max-w-6xl mx-auto py-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group"
              >
                <div className="mono text-[10px] text-[color:var(--text-3)] mb-1.5 uppercase tracking-wider">{l.label}</div>
                <div className="text-[14px] text-[color:var(--text-2)] group-hover:text-[color:var(--text)] transition-colors inline-flex items-center gap-1.5">
                  {l.value}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-60 transition-opacity" />
                </div>
              </a>
            ))}
          </div>

          {/* Oversized wordmark, as both references do */}
          <div className="relative select-none pointer-events-none mb-10" aria-hidden="true">
            <div className="headline text-[clamp(3.5rem,16vw,13rem)] leading-[0.82] text-white/[0.045]">
              Jai <span className="accent-word">Krishna</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mono text-[11px] text-[color:var(--text-3)]">
            <span>{PERSONAL.location}</span>
            <span>© 2026 · built from scratch</span>
          </div>
        </div>
      </footer>
    </section>
  )
}
