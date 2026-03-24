import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { motion } from 'motion/react'
import { BlurFade } from '@/components/ui/blur-fade'
import { EXPERIENCE } from '@/data/portfolio'
import { MapPin, Calendar, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Key metric per role
const METRICS = [
  { value: '50%', label: 'efficiency gain', sub: 'hyper-automation platform' },
  { value: '60%+', label: 'test coverage', sub: 'DOM traversal expansion' },
  { value: '35%', label: 'productivity boost', sub: 'automated doc generation' },
  { value: '85%', label: 'detection accuracy', sub: 'defect-detection model' },
]

export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const section = sectionRef.current
      if (!track || !section) return

      // Slide track based on section scroll - no GSAP pin, use CSS sticky
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 80),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    // tall section creates the scrollable space
    <section
      ref={sectionRef}
      id="experience"
      style={{ height: `${EXPERIENCE.length * 65 + 60}vh` }}
      className="relative"
    >
      {/* Sticky container - fills one viewport, clips overflow */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden bg-[#050810] flex flex-col"
      >
        {/* Ambient */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 70% 40% at 15% 50%, rgba(34,211,238,0.05) 0%, transparent 60%)',
          }} />
        </div>

        {/* Header */}
        <div className="relative z-10 pt-24 pb-8 px-8 md:px-20 flex-shrink-0">
          <BlurFade inView>
            <span className="section-label mb-4 inline-block">Experience</span>
          </BlurFade>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <BlurFade inView delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight font-display">
                Where I've{' '}
                <span className="animate-gradient-text">shipped impact</span>
              </h2>
            </BlurFade>
            <BlurFade inView delay={0.15}>
              <p className="text-white/30 text-sm flex items-center gap-2">
                <span className="w-8 h-px bg-white/20" />
                Scroll to explore
              </p>
            </BlurFade>
          </div>
        </div>

        {/* Horizontal track */}
        <div className="relative z-10 flex-1 flex items-center">
          <div
            ref={trackRef}
            className="flex gap-5 pl-8 md:pl-20 pr-20 items-stretch will-change-transform"
          >
            {EXPERIENCE.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} metric={METRICS[i]} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#050810] to-transparent pointer-events-none" />
      </div>
    </section>
  )
}

function ExperienceCard({
  exp,
  metric,
  index,
}: {
  exp: (typeof EXPERIENCE)[0]
  metric: { value: string; label: string; sub: string }
  index: number
}) {
  return (
    <motion.div
      className="exp-card flex-shrink-0 w-[300px] flex flex-col rounded-2xl overflow-hidden relative group"
      style={{
        background: '#0d1117',
        border: `1px solid ${exp.color}20`,
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ borderColor: `${exp.color}45`, y: -4 }}
    >
      {/* Visual header - gradient + icon */}
      <div
        className="h-36 relative flex items-end p-5 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${exp.color}25 0%, ${exp.color}08 50%, #0d1117 100%)` }}
      >
        {/* Pattern dots */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(${exp.color} 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />
        {/* Glow orb */}
        <div
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-40"
          style={{ background: exp.color }}
        />

        {/* Type badge */}
        <span
          className="absolute top-4 left-5 text-[11px] font-semibold px-2.5 py-1 rounded-full"
          style={{ background: `${exp.color}20`, color: exp.color, border: `1px solid ${exp.color}30` }}
        >
          {exp.type}
        </span>

        {/* Number */}
        <span
          className="absolute top-4 right-5 text-4xl font-black opacity-15 font-display"
          style={{ color: exp.color }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Company + role */}
        <div className="relative z-10">
          <p className="text-white font-bold text-base leading-tight">{exp.role}</p>
          <p className="text-white/50 text-sm mt-0.5">{exp.company}</p>
        </div>
      </div>

      {/* Content body */}
      <div className="flex-1 flex flex-col p-5">
        {/* Period */}
        <div className="flex items-center gap-2 text-xs text-white/30 mb-5">
          <Calendar size={11} />
          <span>{exp.period}</span>
          <span className="mx-1 opacity-40">·</span>
          <MapPin size={11} />
          <span>Chennai</span>
        </div>

        {/* BIG metric */}
        <div
          className="flex-1 flex flex-col justify-center rounded-xl p-4 mb-4"
          style={{ background: `${exp.color}08`, border: `1px solid ${exp.color}15` }}
        >
          <div
            className="text-4xl font-black font-display leading-none mb-1"
            style={{ color: exp.color }}
          >
            {metric.value}
          </div>
          <div className="text-sm font-semibold text-white/70">{metric.label}</div>
          <div className="text-xs text-white/30 mt-0.5">{metric.sub}</div>
        </div>

        {/* Tech tags - compact */}
        <div className="flex flex-wrap gap-1.5">
          {exp.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-[10px] font-mono px-2 py-0.5 rounded-full"
              style={{
                background: `${exp.color}10`,
                color: `${exp.color}aa`,
                border: `1px solid ${exp.color}18`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
