import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { BlurFade } from '@/components/ui/blur-fade'
import { PERSONAL } from '@/data/portfolio'

const BLOCKS = [
  {
    id: 0,
    label: 'Who I Am',
    heading: 'Turning ideas into\nintelligent systems',
    body: "I'm an AI Engineer and Full-Stack Developer who thrives at the intersection of machine learning and production engineering. I build multi-agent AI systems that don't just demo well — they ship, scale, and deliver measurable business impact.",
    accent: '#34d399',
  },
  {
    id: 1,
    label: 'What I Do',
    heading: 'From LLMs to\nlive deployments',
    body: "I architect end-to-end AI pipelines — RAG frameworks, autonomous testing orchestrators, voice-driven workspace assistants — then deploy them on cloud infrastructure with security-first practices. AWS, Docker, Pulumi, Redis: these aren't buzzwords, they're my toolkit.",
    accent: '#fbbf24',
  },
  {
    id: 2,
    label: 'My Edge',
    heading: 'Speed and quality\nwithout compromise',
    body: "Employee of the Quarter in my first full-time role. Reduced QA time from 45 minutes to 3. Shipped a production platform in 2 weeks. I combine deep technical depth with relentless execution — and I'm always building the next thing.",
    accent: '#38bdf8',
  },
]

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Each block gets generous overlap-free breathing room
  const block0Opacity = useTransform(scrollYProgress, [0, 0.12, 0.25, 0.35], [1, 1, 0.3, 0])
  const block1Opacity = useTransform(scrollYProgress, [0.28, 0.40, 0.55, 0.68], [0, 1, 1, 0])
  const block2Opacity = useTransform(scrollYProgress, [0.65, 0.78, 0.92, 1], [0, 1, 1, 1])

  const block0Y = useTransform(scrollYProgress, [0, 0.35], [0, -40])
  const block1Y = useTransform(scrollYProgress, [0.28, 0.55, 0.68], [30, 0, -30])
  const block2Y = useTransform(scrollYProgress, [0.65, 0.92], [30, 0])

  const opacities = [block0Opacity, block1Opacity, block2Opacity]
  const ys = [block0Y, block1Y, block2Y]

  // Progress indicator
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="about" ref={containerRef} className="relative" style={{ height: '420vh' }}>
      {/* Sticky panel */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 70%)',
          }} />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
          {/* Section header */}
          <BlurFade inView delay={0.1}>
            <div className="mb-16 text-center">
              <span className="section-label mb-4 inline-block">About</span>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: animated stat cards */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { value: 'Fast', label: 'Quick Learner', sub: 'Adapts rapidly to new stacks & domains', icon: '⚡' },
                { value: 'SoTA', label: 'Architectures', sub: 'Builds with state-of-the-art AI systems', icon: '🧠' },
                { value: '360°', label: 'Solutioning', sub: 'End-to-end problem ownership', icon: '🎯' },
                { value: 'Ship', label: 'Impact-Driven', sub: 'Measurable results in every role', icon: '🚀' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="glass-card rounded-2xl p-5"
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-sm font-semibold text-white/60">{stat.label}</div>
                  <div className="text-xs text-white/35 mt-0.5">{stat.sub}</div>
                </motion.div>
              ))}
            </div>

            {/* Right: rotating text blocks */}
            <div className="relative h-72 lg:h-80">
              {BLOCKS.map((block, i) => (
                <motion.div
                  key={block.id}
                  style={{ opacity: opacities[i], y: ys[i] }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <div
                    className="section-label mb-4 self-start"
                    style={{ borderColor: `${block.accent}40`, color: block.accent, background: `${block.accent}12` }}
                  >
                    {block.label}
                  </div>
                  <h2
                    className="text-3xl sm:text-4xl font-black text-white leading-tight mb-5 whitespace-pre-line"
                    style={{ textShadow: `0 0 40px ${block.accent}30` }}
                  >
                    {block.heading}
                  </h2>
                  <p className="text-white/55 text-base leading-relaxed max-w-lg">
                    {block.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scroll progress bar */}
          <div className="mt-16 max-w-xs mx-auto">
            <div className="h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
                style={{ width: progressWidth }}
              />
            </div>
            <div className="flex justify-between mt-2">
              {BLOCKS.map((b, i) => (
                <span key={i} className="text-xs text-white/20">{b.label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
