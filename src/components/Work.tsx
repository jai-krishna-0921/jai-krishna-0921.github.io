import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, type MotionValue } from 'motion/react'
import { PROJECTS } from '@/data/portfolio'
import { MOCKUPS } from '@/components/mockups/Mockups'
import { SlideIn } from '@/components/motion/Reveal'
import { X, ExternalLink } from 'lucide-react'

const KEY: Record<number, string> = {
  1: 'corvax', 2: 'serviceworker', 3: 'coven', 4: 'synapse', 5: 'fmodetect', 6: 'nofrin',
}

function SiGithub({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

/**
 * Stacked-card scroll deck. Each card pins to the viewport, then scales
 * down and fades as the next one rides up over it — the mechanic measured
 * on the reference (scale 1 → 0.6, opacity 1 → 0, progressive depth floors).
 */
export function Work() {
  const [open, setOpen] = useState<(typeof PROJECTS)[0] | null>(null)

  return (
    <section id="work" className="relative">
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-10">
        <SlideIn from="left">
          <div className="trace-pill mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-agent" />
            <span>selected work</span>
          </div>
        </SlideIn>
        <SlideIn from="left" delay={0.1}>
          <h2 className="headline text-[clamp(2rem,5vw,3.75rem)] max-w-2xl">
            Six systems, each one <span className="accent-word text-agent">shipped</span>.
          </h2>
        </SlideIn>
      </div>

      {/* The deck — sticky siblings sharing one scroll timeline, so each
          card physically stacks over the last instead of leaving a gap. */}
      <Deck onOpen={setOpen} />

      <AnimatePresence>{open && <Detail project={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  )
}

function Deck({ onOpen }: { onOpen: (p: (typeof PROJECTS)[0]) => void }) {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] })

  return (
    <div ref={container} className="relative">
      {PROJECTS.map((p, i) => (
        <StackCard
          key={p.id}
          project={p}
          index={i}
          total={PROJECTS.length}
          progress={scrollYProgress}
          onOpen={() => onOpen(p)}
        />
      ))}
    </div>
  )
}

function StackCard({
  project, index, total, progress, onOpen,
}: {
  project: (typeof PROJECTS)[0]
  index: number
  total: number
  progress: MotionValue<number>
  onOpen: () => void
}) {
  // Each slot is 190vh tall but pins only its first screenful, so the card
  // sits still and crisp for ~90vh before the next one starts rising over
  // it. DWELL is the fraction of the slice spent held, matching that ratio.
  const DWELL = 0.47
  const start = index / total
  const end = (index + 1) / total
  const held = start + (end - start) * DWELL
  const floor = 0.74 - (total - index - 1) * 0.012

  // Held perfectly still, then falls away beneath the incoming card.
  const scale = useTransform(progress, [start, held, end], [1, 1, floor])
  const opacity = useTransform(progress, [start, held, end], [1, 1, 0.18])
  const blurN = useTransform(progress, [start, held, end], [0, 0, 4.5])
  const filter = useTransform(blurN, (b) => (b < 0.05 ? 'none' : `blur(${b.toFixed(2)}px)`))
  const y = useTransform(progress, [start, held, end], [0, 0, -60])

  const Mock = MOCKUPS[KEY[project.id]]
  const flip = index % 2 === 1

  return (
    <div className="sticky top-0 h-[190vh]" style={{ zIndex: index + 1 }}>
      <div className="h-screen flex items-center px-6 md:px-10 relative">
        {/* Opaque backdrop so a stacked card fully occludes the one beneath it */}
        <motion.div style={{ opacity }} className="absolute inset-0 bg-ink" />
        <motion.div
          style={{ scale, opacity, filter, y }}
          className="relative max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center origin-center"
        >
          {/* Media — wipes open from the centre and blooms as the card settles */}
          <div className={`col-span-1 lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
            <motion.button
              onClick={onOpen}
              initial={{ clipPath: 'inset(42% 0% 42% 0% round 24px)', opacity: 0 }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 24px)', opacity: 1 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
              className="media group relative block w-full aspect-[16/10] cursor-pointer border border-[color:var(--hairline)]"
            >
              {/* Ambient bloom behind the mockup */}
              <motion.div
                aria-hidden="true"
                className="absolute -inset-16 pointer-events-none"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 1.5, delay: 0.25, ease: 'easeOut' }}
                style={{ background: 'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(232,121,249,0.16), transparent 70%)' }}
              />
              <motion.div
                className="absolute inset-0 p-4 sm:p-7"
                initial={{ scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {Mock && <Mock />}
              </motion.div>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(232,121,249,0.12), transparent 70%)' }}
              />
              <div className="shine absolute inset-0 bg-white/[0.07] pointer-events-none" />
            </motion.button>
          </div>

          {/* Copy — slides in from the opposite side */}
          <SlideIn
            from={flip ? 'left' : 'right'}
            distance={60}
            delay={0.12}
            className={`col-span-1 lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}
          >
            <div className="mono text-[11px] text-[color:var(--text-3)] mb-4 flex items-center gap-2.5">
              <span className="text-agent">◈</span>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span className="w-6 h-px bg-[color:var(--hairline)]" />
              <span>{project.year}</span>
              <span className="w-6 h-px bg-[color:var(--hairline)]" />
              <span>{String(total).padStart(2, '0')}</span>
            </div>

            <h3 className="headline text-[clamp(1.7rem,3.2vw,2.6rem)] mb-3">{project.title}</h3>
            <p className="mono text-[12px] text-agent/80 mb-5">{project.tagline}</p>
            <p className="text-[15px] leading-relaxed text-[color:var(--text-2)] mb-7 line-clamp-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-7">
              {project.tech.slice(0, 5).map((t) => (
                <span key={t} className="mono text-[11px] px-2.5 py-1 rounded-full border border-[color:var(--hairline)] text-[color:var(--text-3)]">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <button onClick={onOpen} className="group mono text-[12px] text-[color:var(--text)] inline-flex items-center gap-2">
                <span className="border-b border-agent/40 group-hover:border-agent transition-colors pb-0.5">read the case</span>
                <span className="text-agent transition-transform group-hover:translate-x-1">→</span>
              </button>

              <a
                href={project.github} target="_blank" rel="noopener noreferrer"
                className="group mono text-[12px] text-[color:var(--text-2)] hover:text-[color:var(--text)] inline-flex items-center gap-1.5 transition-colors"
              >
                <SiGithub />
                <span className="border-b border-transparent group-hover:border-white/25 pb-0.5">source</span>
              </a>

              {'link' in project && project.link && (
                <a
                  href={project.link as string} target="_blank" rel="noopener noreferrer"
                  className="group mono text-[12px] text-verified/90 hover:text-verified inline-flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink size={12} />
                  <span className="border-b border-transparent group-hover:border-verified/40 pb-0.5">
                    {(project.link as string).includes('npmjs') ? 'npm' : 'live demo'}
                  </span>
                </a>
              )}
            </div>
          </SlideIn>
        </motion.div>
      </div>
    </div>
  )
}

function Detail({ project, onClose }: { project: (typeof PROJECTS)[0]; onClose: () => void }) {
  const Mock = MOCKUPS[KEY[project.id]]
  return (
    <>
      <motion.div
        className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }} onClick={onClose}
      />
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8 pointer-events-none overflow-y-auto">
        <motion.div
          className="card relative w-full max-w-3xl pointer-events-auto my-auto overflow-hidden"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ type: 'spring', damping: 30, stiffness: 340 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="aspect-[16/9] p-5 sm:p-8 bg-[color:var(--ink-edge)]">{Mock && <Mock />}</div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center bg-black/50 text-[color:var(--text-2)] hover:text-white transition-colors"
          >
            <X size={15} />
          </button>
          <div className="p-6 sm:p-9">
            <div className="mono text-[11px] text-[color:var(--text-3)] mb-3">{project.year}</div>
            <h2 className="headline text-3xl mb-2">{project.title}</h2>
            <p className="mono text-[12px] text-agent/80 mb-6">{project.tagline}</p>
            <p className="text-[15px] leading-relaxed text-[color:var(--text-2)] mb-8">{project.description}</p>
            <div className="mono text-[11px] text-[color:var(--text-3)] mb-3">STACK</div>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((t) => (
                <span key={t} className="mono text-[11px] px-2.5 py-1 rounded-full border border-[color:var(--hairline)] text-[color:var(--text-2)]">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={project.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium bg-[color:var(--text)] text-ink hover:scale-[1.02] transition-transform"
              >
                <SiGithub size={14} /> Source
              </a>
              {'link' in project && project.link && (
                <a
                  href={project.link as string} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium border border-[color:var(--hairline)] text-[color:var(--text-2)] hover:text-white transition-colors"
                >
                  <ExternalLink size={14} /> Live
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
